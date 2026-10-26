// DATA LAYER — demo tenants. In production this is replaced by API calls (services/api.ts).
import type { School } from '../domain/types';
import { createGreenwoodCleanSchool, DEMO_SCHOOL_ID } from './greenwoodCleanSchool';

export { DEMO_SCHOOL_ID };

// ==========================================
// INITIAL MULTI-TENANT DEMO DATA
// ==========================================
export const INITIAL_SCHOOLS: School[] = [
  createGreenwoodCleanSchool(),

  {
    id: 'school-2',
    name: "St. Xavier's International",
    subdomain: 'stxaviers.chronos.edu',
    timezone: 'IST (UTC+5:30)',
    term: 'Fall Semester 2026',
    published: false,
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    rules: {
      primaryEndPeriod: 4,
      seniorEndPeriod: 6,
      maxTeacherPeriodsPerDay: 5,
      activityDay: 'Friday', // Configurable per school!
      activityPeriods: [1, 2],
      zeroPeriodLabel: 'Morning Prayer & Homeroom',
      lunchAfterPeriod: 4,
    },
    timingConfig: {
      startTime: '08:00',
      periodDurationMinutes: 45,
      hasZeroPeriod: true,
      zeroPeriodDurationMinutes: 30,
      zeroPeriodLabel: 'Morning Prayer & Homeroom',
      recessAfterPeriod: 2,
      recessDurationMinutes: 15,
      recessLabel: 'Recess',
      lunchAfterPeriod: 4,
      lunchDurationMinutes: 30,
      lunchLabel: 'Lunch Break',
      lunchSeniorOnly: false,
    },
    periodSlots: [
      { number: 0, label: 'Zero Period', time: '08:00 - 08:30', isBreak: true, type: 'zero' },
      { number: 1, label: 'Period 1', time: '08:30 - 09:15', isBreak: false },
      { number: 2, label: 'Period 2', time: '09:15 - 10:00', isBreak: false },
      { number: 'B1', label: 'Recess', time: '10:00 - 10:15', isBreak: true, type: 'break' },
      { number: 3, label: 'Period 3', time: '10:15 - 11:00', isBreak: false },
      { number: 4, label: 'Period 4', time: '11:00 - 12:00', isBreak: false, note: 'Primary Dismissal (12:00)' },
      { number: 'L1', label: 'Lunch Break', time: '12:00 - 12:30', isBreak: true, type: 'lunch', seniorOnly: true },
      { number: 5, label: 'Period 5', time: '12:30 - 01:15', isBreak: false, seniorOnly: true },
      { number: 6, label: 'Period 6', time: '01:15 - 02:00', isBreak: false, seniorOnly: true, note: 'Senior Dismissal (02:00)' },
    ],
    classes: [
      { id: 'x-3a', name: '3A', grade: 'Grade 3', tier: 'Primary', room: 'Block A-1' },
      { id: 'x-11a', name: '11A', grade: 'Grade 11', tier: 'Senior', room: 'Block C-4' },
    ],
    subjects: [
      { id: 'x-math', name: 'Mathematics', code: 'MATH', type: 'academic', color: 'bg-blue-50 text-blue-700 border-blue-200', freqPrimary: 6, freqSenior: 8 },
      { id: 'x-eng', name: 'English Core', code: 'ENG', type: 'academic', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', freqPrimary: 6, freqSenior: 6 },
      { id: 'x-sci', name: 'Physics & Chem', code: 'PHY', type: 'academic', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', freqPrimary: 6, freqSenior: 8 },
      { id: 'x-hum', name: 'Humanities', code: 'HUM', type: 'academic', color: 'bg-amber-50 text-amber-700 border-amber-200', freqPrimary: 0, freqSenior: 6 },
      { id: 'x-act1', name: 'Music & Choir', code: 'MUS', type: 'activity', room: 'Auditorium', color: 'bg-purple-100 text-purple-800 border-purple-300', freqPrimary: 1, freqSenior: 1 },
      { id: 'x-act2', name: 'Athletics', code: 'ATH', type: 'activity', room: 'Main Field', color: 'bg-lime-100 text-lime-800 border-lime-300', freqPrimary: 1, freqSenior: 1 },
    ],
    teachers: [
      { id: 'xt-1', name: 'Prof. Alan Grant', subjects: ['x-math'], maxPerDay: 5, unavailableDays: [] },
      { id: 'xt-2', name: 'Ms. Ellie Sattler', subjects: ['x-sci'], maxPerDay: 5, unavailableDays: [] },
      { id: 'xt-3', name: 'Dr. Ian Malcolm', subjects: ['x-eng', 'x-hum'], maxPerDay: 5, unavailableDays: [] },
      { id: 'xt-4', name: 'Coach John Hammond', subjects: ['x-act1', 'x-act2'], maxPerDay: 5, unavailableDays: [] },
      { id: 'xt-5', name: 'Ms. Claire Dearing', subjects: ['x-act1', 'x-act2', 'x-eng'], maxPerDay: 5, unavailableDays: [] },
    ],
    absences: [],
    assignments: [
      { id: 'x-asgn-1', classId: 'x-3a', subjectId: 'x-math', teacherId: 'xt-1' },
      { id: 'x-asgn-2', classId: 'x-3a', subjectId: 'x-eng', teacherId: 'xt-5' },
      { id: 'x-asgn-3', classId: 'x-3a', subjectId: 'x-sci', teacherId: 'xt-2' },
      { id: 'x-asgn-4', classId: 'x-3a', subjectId: 'x-act1', teacherId: 'xt-4' },
      { id: 'x-asgn-5', classId: 'x-3a', subjectId: 'x-act2', teacherId: 'xt-5' },
      { id: 'x-asgn-6', classId: 'x-11a', subjectId: 'x-math', teacherId: 'xt-1' },
      { id: 'x-asgn-7', classId: 'x-11a', subjectId: 'x-eng', teacherId: 'xt-3' },
      { id: 'x-asgn-8', classId: 'x-11a', subjectId: 'x-sci', teacherId: 'xt-2' },
      { id: 'x-asgn-9', classId: 'x-11a', subjectId: 'x-hum', teacherId: 'xt-3' },
      { id: 'x-asgn-10', classId: 'x-11a', subjectId: 'x-act1', teacherId: 'xt-5' },
      { id: 'x-asgn-11', classId: 'x-11a', subjectId: 'x-act2', teacherId: 'xt-4' },
    ],
    substitutions: {}
  }
];
