// ENGINE LAYER — timetable generation. Pure functions, no React, no I/O.
// Mirrors the blueprint's "Timetable engine" layer; this greedy JS version is the
// in-browser prototype. The production solver is engine/ (Python + OR-Tools CP-SAT).
import type { School, ScheduleResult, Diagnostic, EntryMap, Subject, Teacher, ClassSection } from '../domain/types';

// Helper to normalize subject comparison (e.g. 'PHY', 'sub-phy', 'phy')
function matchSubjectId(a?: string | null, b?: string | null): boolean {
  if (!a || !b) return false;
  if (a === b) return true;
  const cleanA = a.replace(/^sub-/, '').toUpperCase();
  const cleanB = b.replace(/^sub-/, '').toUpperCase();
  return cleanA === cleanB;
}

export function generateSchoolTimetable(school: School): ScheduleResult {
  const { workingDays, rules, classes, subjects, teachers } = school;
  const diagnostics: Diagnostic[] = [];
  const entries: EntryMap = {}; // key: `${day}-${period}-${classId}`

  // Helper structures for tracking hard constraints
  // teacherBusy[day][period][teacherId] = classId
  const teacherBusy: Record<string, Record<number, Record<string, string>>> = {};
  // teacherDailyCount[day][teacherId] = number of periods assigned on that day
  const teacherDailyCount: Record<string, Record<string, number>> = {};
  // teacherWeeklyCount[teacherId] = total periods assigned in week
  const teacherWeeklyCount: Record<string, number> = {};
  // classSubjectDayCount[classId][day][subjectId] = count (for soft constraint: spread across week)
  const classSubjectDayCount: Record<string, Record<string, Record<string, number>>> = {};

  teachers.forEach(t => {
    teacherWeeklyCount[t.id] = 0;
  });

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

  // Track teachers on known leave/absence
  const absentTeacherIds = new Set((school.absences || []).map(a => a.teacherId));

  // Helper to determine max periods per day for a class
  const getMaxPeriodForClass = (cls: ClassSection): number => {
    const isPrePrimary = cls.wing === 'Pre-Primary' || ['NUR', 'LKG', 'UKG'].some(w => cls.grade.toUpperCase().includes(w) || cls.name.toUpperCase().includes(w));
    if (isPrePrimary) return rules.prePrimaryEndPeriod || 5;
    return cls.tier === 'Primary' ? rules.primaryEndPeriod : rules.seniorEndPeriod;
  };

  // 1. Pre-check total weekly required slots vs available slots per class
  const overscheduledList: { clsName: string; required: number; available: number }[] = [];
  for (const cls of classes) {
    const maxP = getMaxPeriodForClass(cls);
    const totalAvailableSlots = workingDays.length * maxP;
    const requiredSlots = cls.subjectRequirements && cls.subjectRequirements.length > 0
      ? cls.subjectRequirements.reduce((sum, req) => sum + req.periodsPerWeek, 0)
      : subjects.reduce((sum, sub) => sum + (cls.tier === 'Primary' ? sub.freqPrimary : sub.freqSenior), 0);

    if (requiredSlots > totalAvailableSlots) {
      overscheduledList.push({ clsName: cls.name, required: requiredSlots, available: totalAvailableSlots });
    }
  }

  // AGGREGATE any over-scheduled classes into a single, clean diagnostic card instead of 55 repetitive cards!
  if (overscheduledList.length > 0) {
    const names = overscheduledList.map(o => o.clsName);
    diagnostics.push({
      type: 'error',
      title: `Over-scheduled Classes: ${overscheduledList.length} Sections Exceed Available Bell Slots`,
      detail: `${names.slice(0, 5).join(', ')}${names.length > 5 ? ` and ${names.length - 5} more` : ''} require more weekly periods than their bell schedule allows (${overscheduledList[0].required} needed vs ${overscheduledList[0].available} slots). Use 'Smart Auto-Balance' in Setup to automatically fit subjects.`
    });
  }

  // Build remaining demand pool per class
  // demand[classId] = [ { subject, remaining } ]
  const demand: Record<string, { subject: Subject; remaining: number }[]> = {};
  classes.forEach(cls => {
    if (cls.subjectRequirements && cls.subjectRequirements.length > 0) {
      demand[cls.id] = cls.subjectRequirements.map(req => {
        const matched = subjects.find(s => matchSubjectId(s.id, req.subjectId) || matchSubjectId(s.code, req.subjectId));
        const subObj: Subject = matched || {
          id: req.subjectId,
          name: req.subjectName || req.subjectId,
          code: req.subjectId,
          type: (['MUS', 'ART', 'DAN', 'PE', 'LIB', 'RHY'].includes(req.subjectId) ? 'activity' : 'academic'),
          color: 'bg-slate-50 text-slate-700 border-slate-200',
          freqPrimary: req.periodsPerWeek,
          freqSenior: req.periodsPerWeek
        };
        return {
          subject: subObj,
          remaining: req.periodsPerWeek
        };
      }).filter(d => d.remaining > 0);
    } else {
      demand[cls.id] = subjects.map(sub => ({
        subject: sub,
        remaining: cls.tier === 'Primary' ? sub.freqPrimary : sub.freqSenior
      })).filter(d => d.remaining > 0);
    }
  });

  // 0. Teaching Assignments (Class + Subject -> Teacher)
  // Step 8 / Rule: ONE teacher per class-subject always!
  const assignedTeacherMap: Record<string, string> = {};
  (school.assignments || []).forEach(a => {
    if (a.classId && a.subjectId && a.teacherId) {
      assignedTeacherMap[`${a.classId}_${a.subjectId}`] = a.teacherId;
    }
  });

  // Helper to get or lock dedicated teacher for (classId, subjectId)
  const getOrLockDedicatedTeacher = (classId: string, subjectId: string): Teacher | null => {
    const pairKey = `${classId}_${subjectId}`;
    const assignedTid = assignedTeacherMap[pairKey];
    if (assignedTid) {
      return teachers.find(t => t.id === assignedTid) || null;
    }

    const currentClass = classes.find(c => c.id === classId);
    const classWing = currentClass?.wing || (currentClass?.tier === 'Primary' ? 'Primary' : 'Senior');

    // Qualified teachers for this subject
    const qualified = teachers.filter(t => {
      // Don't assign teachers on long-term leave (e.g. Madhu Sinha on maternity leave)
      if (t.status === 'On Leave' || absentTeacherIds.has(t.id)) return false;
      return t.subjects.some(sid => matchSubjectId(sid, subjectId));
    });

    if (qualified.length === 0) return null;

    // Preference 1: If class has a classTeacher and they teach this subject, assign them!
    if (currentClass?.classTeacherId) {
      const ct = qualified.find(t => t.id === currentClass.classTeacherId);
      if (ct) {
        assignedTeacherMap[pairKey] = ct.id;
        return ct;
      }
    }

    // Preference 2: Wing matching (NTT for Pre-Primary, PRT for Primary, PGT for Senior Secondary, TGT for Middle/Secondary)
    const wingMatched = qualified.filter(t => {
      if (!t.teachingWings) return true;
      if (classWing === 'Pre-Primary' && t.teachingWings.includes('Pre-Primary')) return true;
      if (classWing === 'Primary' && t.teachingWings.includes('Primary')) return true;
      if (classWing === 'Senior Secondary' && (t.teachingWings.includes('Senior') || t.teachingWings.includes('Secondary'))) return true;
      if (classWing === 'Secondary' && (t.teachingWings.includes('Secondary') || t.teachingWings.includes('TGT'))) return true;
      if (classWing === 'Middle' && (t.teachingWings.includes('Middle') || t.teachingWings.includes('TGT'))) return true;
      return false;
    });

    const candidates = wingMatched.length > 0 ? wingMatched : qualified;

    // Pick teacher with fewest total assignments already locked (load balancing)
    const loadCount: Record<string, number> = {};
    candidates.forEach(t => { loadCount[t.id] = 0; });
    Object.values(assignedTeacherMap).forEach(tid => {
      if (loadCount[tid] !== undefined) loadCount[tid]++;
    });

    candidates.sort((a, b) => (loadCount[a.id] || 0) - (loadCount[b.id] || 0));
    const chosen = candidates[0];
    assignedTeacherMap[pairKey] = chosen.id;
    return chosen;
  };

  // Helper to find dedicated valid teacher for (classId, subjectId, day, period)
  const findBestTeacher = (
    classId: string,
    subjectId: string,
    day: string,
    period: number,
  ): { teacher: Teacher | null; reason: string | null } => {
    const dedicatedTeacher = getOrLockDedicatedTeacher(classId, subjectId);
    if (!dedicatedTeacher) {
      return { teacher: null, reason: 'No active qualified teacher available for this subject' };
    }

    // Check if teacher is unavailable on this day
    if ((dedicatedTeacher.unavailableDays || []).includes(day)) {
      return { teacher: null, reason: `${dedicatedTeacher.name} is unavailable on ${day}` };
    }

    // Check double-booking
    if (teacherBusy[day][period][dedicatedTeacher.id]) {
      const busyWithClassId = teacherBusy[day][period][dedicatedTeacher.id];
      const busyWithClass = classes.find(c => c.id === busyWithClassId)?.name || busyWithClassId;
      return { teacher: null, reason: `${dedicatedTeacher.name} is already teaching ${busyWithClass} during Period ${period}` };
    }

    // Check daily cap
    const maxDayCap = Math.min(dedicatedTeacher.maxPerDay || 5, rules.maxTeacherPeriodsPerDay || 5);
    if (teacherDailyCount[day][dedicatedTeacher.id] >= maxDayCap) {
      return { teacher: null, reason: `${dedicatedTeacher.name} reached daily cap of ${maxDayCap} periods on ${day}` };
    }

    // Check weekly cap
    const maxWeekCap = dedicatedTeacher.maxPerWeek || 30;
    if (teacherWeeklyCount[dedicatedTeacher.id] >= maxWeekCap) {
      return { teacher: null, reason: `${dedicatedTeacher.name} reached weekly cap of ${maxWeekCap} periods` };
    }

    return { teacher: dedicatedTeacher, reason: null };
  };

  // STEP A: Lock in Fixed Weekly Activity Block first (Wednesday / specified activityDay)
  const actDay = rules.activityDay;
  if (workingDays.includes(actDay)) {
    for (const period of rules.activityPeriods) {
      for (const cls of classes) {
        const maxP = getMaxPeriodForClass(cls);
        if (period > maxP) continue;

        const actDemands = demand[cls.id].filter(d => d.subject.type === 'activity' && d.remaining > 0);
        if (actDemands.length > 0) {
          let assigned = false;
          for (const dItem of actDemands) {
            const { teacher } = findBestTeacher(cls.id, dItem.subject.id, actDay, period);
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
              teacherWeeklyCount[teacher.id] += 1;
              dItem.remaining -= 1;
              classSubjectDayCount[cls.id][actDay][dItem.subject.id] = (classSubjectDayCount[cls.id][actDay][dItem.subject.id] || 0) + 1;
              assigned = true;
              break;
            }
          }
        }
      }
    }
  }

  // STEP B: Schedule Academic and remaining periods across the week
  for (const day of workingDays) {
    for (let period = 1; period <= rules.seniorEndPeriod; period++) {
      for (const cls of classes) {
        const maxP = getMaxPeriodForClass(cls);
        if (period > maxP) continue;

        const key = `${day}-${period}-${cls.id}`;
        if (entries[key]) continue; // Already locked by Activity Block

        const availableDemands = demand[cls.id].filter(d => d.remaining > 0);
        if (availableDemands.length === 0) continue;

        // Consecutive Double Period Heuristic
        const prevKey = `${day}-${period - 1}-${cls.id}`;
        const prevEntry = entries[prevKey];
        const prevSub = prevEntry ? subjects.find(s => matchSubjectId(s.id, prevEntry.subjectId)) : null;
        const hasRecess = school.timingConfig?.hasRecessBreak ?? true;
        const recessAfter = hasRecess ? (school.timingConfig?.recessAfterPeriod ?? 3) : -1;
        const hasLunch = school.timingConfig?.hasLunchBreak ?? true;
        const lunchAfter = hasLunch ? (school.timingConfig?.lunchAfterPeriod ?? 6) : -1;

        if (prevSub?.requiresDoublePeriod && (period - 1) !== recessAfter && (period - 1) !== lunchAfter) {
          const matchDemand = availableDemands.find(d => matchSubjectId(d.subject.id, prevSub.id) && d.remaining > 0);
          if (matchDemand && !teacherBusy[day][period][prevEntry.teacherId]) {
            const t = teachers.find(teach => teach.id === prevEntry.teacherId);
            const maxDayCap = Math.min(t?.maxPerDay || 5, rules.maxTeacherPeriodsPerDay || 5);
            const maxWeekCap = t?.maxPerWeek || 30;
            if (t && teacherDailyCount[day][t.id] < maxDayCap && teacherWeeklyCount[t.id] < maxWeekCap) {
              entries[key] = {
                classId: cls.id,
                day,
                period,
                subjectId: matchDemand.subject.id,
                teacherId: t.id,
                room: matchDemand.subject.room || cls.room,
                isActivity: matchDemand.subject.type === 'activity'
              };
              teacherBusy[day][period][t.id] = cls.id;
              teacherDailyCount[day][t.id] += 1;
              teacherWeeklyCount[t.id] += 1;
              matchDemand.remaining -= 1;
              classSubjectDayCount[cls.id][day][matchDemand.subject.id] = (classSubjectDayCount[cls.id][day][matchDemand.subject.id] || 0) + 1;
              continue;
            }
          }
        }

        // Sort candidates by:
        // 1. Not taught today yet in this class (spread subjects across week)
        // 2. Highest remaining weekly frequency first
        const isBadDoubleStart = (period === recessAfter || period === lunchAfter || period >= maxP);
        availableDemands.sort((a, b) => {
          if (isBadDoubleStart) {
            const aDbl = Boolean(a.subject.requiresDoublePeriod && a.remaining >= 2);
            const bDbl = Boolean(b.subject.requiresDoublePeriod && b.remaining >= 2);
            if (aDbl !== bDbl) return aDbl ? 1 : -1;
          }
          const countTodayA = classSubjectDayCount[cls.id][day][a.subject.id] || 0;
          const countTodayB = classSubjectDayCount[cls.id][day][b.subject.id] || 0;
          if (countTodayA !== countTodayB) return countTodayA - countTodayB;
          return b.remaining - a.remaining;
        });

        for (const dItem of availableDemands) {
          const { teacher } = findBestTeacher(cls.id, dItem.subject.id, day, period);
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
            teacherWeeklyCount[teacher.id] += 1;
            dItem.remaining -= 1;
            classSubjectDayCount[cls.id][day][dItem.subject.id] = (classSubjectDayCount[cls.id][day][dItem.subject.id] || 0) + 1;
            break;
          }
        }
      }
    }
  }

  // STEP C: Clean, Categorized, User-Friendly Summary of Unfulfilled Periods
  // Group unfulfilled demand by Subject to produce high-level, actionable cards instead of 1,000+ raw item dumps!
  const unfulfilledBySub: Record<string, { name: string; code: string; missing: number; classNames: string[] }> = {};

  classes.forEach(cls => {
    demand[cls.id].forEach(d => {
      if (d.remaining > 0) {
        const code = d.subject.code || d.subject.id;
        if (!unfulfilledBySub[code]) {
          unfulfilledBySub[code] = {
            name: d.subject.name,
            code,
            missing: 0,
            classNames: []
          };
        }
        unfulfilledBySub[code].missing += d.remaining;
        unfulfilledBySub[code].classNames.push(cls.name);
      }
    });
  });

  // Push user-friendly, actionable diagnostic summaries for each genuine shortage!
  Object.values(unfulfilledBySub).forEach(item => {
    const classCount = item.classNames.length;
    const sampleClasses = item.classNames.slice(0, 4).join(', ');
    const moreText = classCount > 4 ? ` +${classCount - 4} more` : '';

    diagnostics.push({
      type: 'error',
      title: `Staffing Shortage: ${item.name} (${item.code})`,
      detail: `${item.missing} weekly period(s) across ${classCount} section(s) (${sampleClasses}${moreText}) could not be scheduled. Current qualified teachers have reached their maximum weekly periods. Fix: Assign an additional teacher or adjust periods in Setup.`
    });
  });

  return {
    entries,
    diagnostics,
    generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  };
}
