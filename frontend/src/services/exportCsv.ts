// SERVICE LAYER — side effects (file download). PDF/Excel export belongs here too (backend-rendered later).
import type { EntryMap, School } from '../domain/types';
import { slotKey } from '../domain/types';

export function exportTimetableCsv(school: School, entries: EntryMap): void {
  const rows: string[][] = [['Class', 'Tier', 'Day', 'Period', 'Subject', 'Type', 'Teacher', 'Substitute', 'Room']];

  school.classes.forEach(cls => {
    school.workingDays.forEach(day => {
      for (let p = 1; p <= school.rules.seniorEndPeriod; p++) {
        const key = slotKey(day, p, cls.id);
        const entry = entries[key];
        if (!entry) continue;
        const sub = school.subjects.find(s => s.id === entry.subjectId);
        const teacher = school.teachers.find(t => t.id === entry.teacherId);
        const subTeacher = school.teachers.find(t => t.id === school.substitutions[key]);
        rows.push([
          cls.name,
          cls.tier,
          day,
          `Period ${p}`,
          sub?.name || '',
          sub?.type || '',
          teacher?.name || '',
          subTeacher ? subTeacher.name : 'None',
          entry.room,
        ]);
      }
    });
  });

  const csv = 'data:text/csv;charset=utf-8,' + rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
  const link = document.createElement('a');
  link.setAttribute('href', encodeURI(csv));
  link.setAttribute('download', `${school.name.replace(/\s+/g, '_')}_Timetable.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
