// ENGINE LAYER — timetable generation. Pure functions, no React, no I/O.
// Mirrors the blueprint's "Timetable engine" layer; this greedy JS version is the
// in-browser prototype. The production solver is engine/ (Python + OR-Tools CP-SAT).
import type { School, ScheduleResult, Diagnostic, EntryMap, Subject, Teacher } from '../domain/types';

export function generateSchoolTimetable(school: School): ScheduleResult {
  const { workingDays, rules, classes, subjects, teachers } = school;
  const diagnostics: Diagnostic[] = [];
  const entries: EntryMap = {}; // key: `${day}-${period}-${classId}` -> { classId, day, period, subjectId, teacherId, room, isActivity }

  // Helper structures for tracking hard constraints
  // teacherBusy[day][period][teacherId] = classId
  const teacherBusy: Record<string, Record<number, Record<string, string>>> = {};
  // teacherDailyCount[day][teacherId] = number of periods assigned on that day
  const teacherDailyCount: Record<string, Record<string, number>> = {};
  // classSubjectDayCount[classId][day][subjectId] = count (for soft constraint: spread across week)
  const classSubjectDayCount: Record<string, Record<string, Record<string, number>>> = {};

  workingDays.forEach(day => {
    teacherBusy[day] = {};
    teacherDailyCount[day] = {};
    teachers.forEach(t => { teacherDailyCount[day][t.id] = 0; });
    for (let p = 1; p <= rules.seniorEndPeriod; p++) {
      teacherBusy[day][p] = {};
    }
  });

  classes.forEach(cls => {
    classSubjectDayCount[cls.id] = {};
    workingDays.forEach(day => {
      classSubjectDayCount[cls.id][day] = {};
    });
  });

  // 1. Pre-check total weekly required slots vs available slots per class
  for (const cls of classes) {
    const maxP = cls.tier === 'Primary' ? rules.primaryEndPeriod : rules.seniorEndPeriod;
    const totalAvailableSlots = workingDays.length * maxP;
    const requiredSlots = subjects.reduce((sum, sub) => {
      return sum + (cls.tier === 'Primary' ? sub.freqPrimary : sub.freqSenior);
    }, 0);

    if (requiredSlots > totalAvailableSlots) {
      diagnostics.push({
        type: 'error',
        title: `Over-scheduled Class: ${cls.name} (${cls.tier})`,
        detail: `${cls.name} requires ${requiredSlots} weekly periods across subjects, but ${cls.tier} tier only has ${totalAvailableSlots} periods/week (${workingDays.length} days × ${maxP} periods/day ending at ${cls.tier === 'Primary' ? '12:00 PM' : '2:00 PM'}).`
      });
    }
  }

  // Build remaining demand pool per class
  // demand[classId] = [ { subject, remaining } ]
  const demand: Record<string, { subject: Subject; remaining: number }[]> = {};
  classes.forEach(cls => {
    demand[cls.id] = subjects.map(sub => ({
      subject: sub,
      remaining: cls.tier === 'Primary' ? sub.freqPrimary : sub.freqSenior
    })).filter(d => d.remaining > 0);
  });

  // Helper to find best valid teacher for (subjectId, day, period)
  const findBestTeacher = (
    subjectId: string,
    day: string,
    period: number,
  ): { teacher: Teacher | null; reason: string | null } => {
    const qualified = teachers.filter(t => t.subjects.includes(subjectId));
    if (qualified.length === 0) return { teacher: null, reason: 'No teacher qualified for this subject' };

    const candidates = qualified.filter(t => {
      if ((t.unavailableDays || []).includes(day)) return false;
      if (teacherBusy[day][period][t.id]) return false; // Hard Constraint: No double booking
      const maxCap = Math.min(t.maxPerDay || 5, rules.maxTeacherPeriodsPerDay || 5);
      if (teacherDailyCount[day][t.id] >= maxCap) return false; // Hard Constraint: <= 5 periods/day
      return true;
    });

    if (candidates.length === 0) {
      return { teacher: null, reason: 'All qualified teachers are either busy in another class or reached their 5-period daily cap' };
    }

    // Soft Constraint: Balance teacher load (pick teacher with fewest periods today, then fewest overall)
    candidates.sort((a, b) => teacherDailyCount[day][a.id] - teacherDailyCount[day][b.id]);
    return { teacher: candidates[0], reason: null };
  };

  // STEP A: Lock in Fixed Weekly Activity Block first (Hard Constraint)
  const actDay = rules.activityDay;
  if (workingDays.includes(actDay)) {
    for (const period of rules.activityPeriods) {
      for (const cls of classes) {
        const maxP = cls.tier === 'Primary' ? rules.primaryEndPeriod : rules.seniorEndPeriod;
        if (period > maxP) continue;

        const actDemands = demand[cls.id].filter(d => d.subject.type === 'activity' && d.remaining > 0);
        if (actDemands.length > 0) {
          // Pick an activity subject that has an available specialist teacher
          let assigned = false;
          for (const dItem of actDemands) {
            const { teacher } = findBestTeacher(dItem.subject.id, actDay, period);
            if (teacher) {
              const key = `${actDay}-${period}-${cls.id}`;
              entries[key] = {
                classId: cls.id,
                day: actDay,
                period,
                subjectId: dItem.subject.id,
                teacherId: teacher.id,
                room: dItem.subject.room || cls.room,
                isActivity: true
              };
              teacherBusy[actDay][period][teacher.id] = cls.id;
              teacherDailyCount[actDay][teacher.id] += 1;
              dItem.remaining -= 1;
              classSubjectDayCount[cls.id][actDay][dItem.subject.id] = (classSubjectDayCount[cls.id][actDay][dItem.subject.id] || 0) + 1;
              assigned = true;
              break;
            }
          }
          if (!assigned) {
            diagnostics.push({
              type: 'error',
              title: `Specialist Teacher Bottleneck (${actDay}, Period ${period})`,
              detail: `Could not schedule Activity Block for class ${cls.name} because all specialist activity teachers are busy with other classes during Period ${period}.`
            });
          }
        }
      }
    }
  }

  // STEP B: Schedule all remaining Academic periods across the week
  // Iterate period by period, day by day, to spread subjects evenly across the week (Soft Constraint)
  for (const day of workingDays) {
    for (let period = 1; period <= rules.seniorEndPeriod; period++) {
      for (const cls of classes) {
        const maxP = cls.tier === 'Primary' ? rules.primaryEndPeriod : rules.seniorEndPeriod;
        if (period > maxP) continue; // Hard Constraint: Primary ends at Period 4 (12:00 PM)

        const key = `${day}-${period}-${cls.id}`;
        if (entries[key]) continue; // Already locked by Activity Block

        // Get remaining academic (or leftover activity) subjects for this class
        const availableDemands = demand[cls.id].filter(d => d.remaining > 0);
        if (availableDemands.length === 0) continue;

        // Sort candidates by:
        // 1. Not taught today yet in this class (Soft Constraint: spread subjects across week)
        // 2. Highest remaining weekly frequency first (Most constrained first heuristic)
        availableDemands.sort((a, b) => {
          const countTodayA = classSubjectDayCount[cls.id][day][a.subject.id] || 0;
          const countTodayB = classSubjectDayCount[cls.id][day][b.subject.id] || 0;
          if (countTodayA !== countTodayB) return countTodayA - countTodayB;
          return b.remaining - a.remaining;
        });

        let slotAssigned = false;
        let lastFailureReason = '';

        for (const dItem of availableDemands) {
          const { teacher, reason } = findBestTeacher(dItem.subject.id, day, period);
          if (teacher) {
            entries[key] = {
              classId: cls.id,
              day,
              period,
              subjectId: dItem.subject.id,
              teacherId: teacher.id,
              room: dItem.subject.room || cls.room,
              isActivity: dItem.subject.type === 'activity'
            };
            teacherBusy[day][period][teacher.id] = cls.id;
            teacherDailyCount[day][teacher.id] += 1;
            dItem.remaining -= 1;
            classSubjectDayCount[cls.id][day][dItem.subject.id] = (classSubjectDayCount[cls.id][day][dItem.subject.id] || 0) + 1;
            slotAssigned = true;
            break;
          } else {
            lastFailureReason = `${dItem.subject.name}: ${reason}`;
          }
        }

        if (!slotAssigned && availableDemands.length > 0) {
          diagnostics.push({
            type: 'error',
            title: `Infeasible Slot: Class ${cls.name} on ${day}, Period ${period}`,
            detail: `Unable to assign remaining subjects (${availableDemands.map(d => d.subject.code).join(', ')}). Reason: ${lastFailureReason}.`
          });
        }
      }
    }
  }

  // Check if any subject did not meet its exact weekly frequency
  classes.forEach(cls => {
    demand[cls.id].forEach(d => {
      if (d.remaining > 0) {
        diagnostics.push({
          type: 'warning',
          title: `Unfulfilled Frequency: ${cls.name} — ${d.subject.name}`,
          detail: `${d.remaining} required weekly period(s) could not be scheduled without violating hard teacher or day-length constraints.`
        });
      }
    });
  });

  return {
    entries,
    diagnostics,
    generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  };
}
