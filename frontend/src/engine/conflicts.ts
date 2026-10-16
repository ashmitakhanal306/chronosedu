// ENGINE LAYER — validation of manual overrides (blueprint 4.6 conflict-resolution).
import type { EntryMap, School } from '../domain/types';

export function checkManualOverrideConflict(
  school: School,
  entries: EntryMap,
  day: string,
  period: number,
  classId: string,
  newTeacherId: string,
): string[] {
  const conflicts: string[] = [];
  if (!newTeacherId) return conflicts;

  // 1. Teacher already teaching another class in the same period
  Object.values(entries).forEach(e => {
    if (e.day === day && e.period === period && e.classId !== classId && e.teacherId === newTeacherId) {
      const other = school.classes.find(c => c.id === e.classId);
      conflicts.push(
        `Double-booking Clash: Teacher is already scheduled in Class ${other?.name || e.classId} during ${day} Period ${period}.`,
      );
    }
  });

  // 2. Daily workload cap
  let dailyLoad = 0;
  Object.values(entries).forEach(e => {
    if (e.day === day && e.classId !== classId && e.teacherId === newTeacherId) dailyLoad++;
  });
  if (dailyLoad + 1 > school.rules.maxTeacherPeriodsPerDay) {
    conflicts.push(
      `Workload Cap Clash: Assigning this slot gives the teacher ${dailyLoad + 1} periods on ${day}, exceeding the hard cap of ${school.rules.maxTeacherPeriodsPerDay} periods/day.`,
    );
  }

  return conflicts;
}
