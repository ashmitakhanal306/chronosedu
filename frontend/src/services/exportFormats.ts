/**
 * Export services for Timetables (CSV, Excel, and Print/PDF).
 */
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

export function exportTimetableExcel(school: School, entries: EntryMap): void {
  let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
  <head><meta charset="utf-8"/><title>${school.name} Timetable</title>
  <style>
    th { background-color: #4F46E5; color: #FFFFFF; font-weight: bold; border: 1px solid #CBD5E1; padding: 8px; }
    td { border: 1px solid #CBD5E1; padding: 6px; }
  </style>
  </head><body>
  <h2>${school.name} — Master Timetable</h2>
  <p>Term: ${school.term || 'Academic Year'} | Published: ${school.published ? 'Yes' : 'Draft'}</p>
  <table>
    <thead>
      <tr>
        <th>Class</th><th>Tier</th><th>Day</th><th>Period</th><th>Subject</th><th>Type</th><th>Teacher</th><th>Substitute</th><th>Room</th>
      </tr>
    </thead>
    <tbody>`;

  school.classes.forEach(cls => {
    school.workingDays.forEach(day => {
      for (let p = 1; p <= school.rules.seniorEndPeriod; p++) {
        const key = slotKey(day, p, cls.id);
        const entry = entries[key];
        if (!entry) continue;
        const sub = school.subjects.find(s => s.id === entry.subjectId);
        const teacher = school.teachers.find(t => t.id === entry.teacherId);
        const subTeacher = school.teachers.find(t => t.id === school.substitutions[key]);
        html += `<tr>
          <td>${cls.name}</td>
          <td>${cls.tier}</td>
          <td>${day}</td>
          <td>Period ${p}</td>
          <td>${sub?.name || ''}</td>
          <td>${sub?.type || ''}</td>
          <td>${teacher?.name || ''}</td>
          <td>${subTeacher ? subTeacher.name : '—'}</td>
          <td>${entry.room || ''}</td>
        </tr>`;
      }
    });
  });

  html += `</tbody></table></body></html>`;

  const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${school.name.replace(/\s+/g, '_')}_Timetable.xls`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportTimetablePrint(school: School): void {
  window.print();
}
