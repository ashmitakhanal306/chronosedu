// ENGINE LAYER — substitute ranking (blueprint 4.2 / section 5).
// Hard: only currently-free teachers under the daily cap. Soft: most free periods first.
import type { EntryMap, School, SubstituteCandidate } from '../domain/types';
import { slotKey } from '../domain/types';

export function getSubstituteCandidatesForSlot(
  school: School,
  entries: EntryMap,
  day: string,
  period: number,
  absentTeacherId: string,
): SubstituteCandidate[] {
  const maxCap = school.rules.maxTeacherPeriodsPerDay || 5;

  // Teachers busy in (day, period), including those already acting as a substitute then.
  const busyTeacherIdsInPeriod = new Set<string>();
  Object.values(entries).forEach(e => {
    if (e.day === day && e.period === period) {
      busyTeacherIdsInPeriod.add(e.teacherId);
      const sub = school.substitutions[slotKey(day, period, e.classId)];
      if (sub) busyTeacherIdsInPeriod.add(sub);
    }
  });

  // Periods each teacher teaches on `day`, counting assigned substitutions.
  const assignedCountOnDay = (teacherId: string): number => {
    let count = 0;
    Object.values(entries).forEach(e => {
      if (e.day === day) {
        const effective = school.substitutions[slotKey(day, e.period, e.classId)] || e.teacherId;
        if (effective === teacherId) count++;
      }
    });
    return count;
  };

  const totalDayPeriods = school.rules.seniorEndPeriod;
  const absentToday = new Set(school.absences.filter(a => a.day === day).map(a => a.teacherId));

  const candidates: SubstituteCandidate[] = school.teachers
    .filter(t => {
      if (t.id === absentTeacherId) return false;
      if (absentToday.has(t.id)) return false;
      if ((t.unavailableDays || []).includes(day)) return false;
      if (busyTeacherIdsInPeriod.has(t.id)) return false; // only currently free teachers
      if (assignedCountOnDay(t.id) >= Math.min(t.maxPerDay || 5, maxCap)) return false; // daily cap
      return true;
    })
    .map(t => {
      const assignedToday = assignedCountOnDay(t.id);
      return { ...t, assignedToday, freePeriodsToday: totalDayPeriods - assignedToday };
    });

  // Most free periods first.
  // NOTE: tie-breaker is an open decision (blueprint section 10); currently stable order.
  candidates.sort((a, b) => b.freePeriodsToday - a.freePeriodsToday);
  return candidates;
}

/** Top-ranked substitute for every slot the absent teacher would have taught. */
export function autoAssignSubstitutes(
  school: School,
  entries: EntryMap,
  absence: { teacherId: string; day: string },
): { substitutions: Record<string, string>; assignedCount: number } {
  const { teacherId, day } = absence;
  const affected = Object.values(entries).filter(e => e.day === day && e.teacherId === teacherId);
  const substitutions = { ...school.substitutions };
  let assignedCount = 0;

  affected.forEach(entry => {
    const candidates = getSubstituteCandidatesForSlot(school, entries, day, entry.period, teacherId);
    if (candidates.length > 0) {
      substitutions[slotKey(day, entry.period, entry.classId)] = candidates[0].id;
      assignedCount++;
    }
  });

  return { substitutions, assignedCount };
}
