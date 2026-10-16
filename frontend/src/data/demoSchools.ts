// DATA LAYER — demo tenants. In production this is replaced by API calls (services/api.ts).
import type { School } from '../domain/types';

// ==========================================
// INITIAL MULTI-TENANT DEMO DATA
// ==========================================
export const INITIAL_SCHOOLS: School[] = [
  {
    id: 'school-1',
    name: 'Greenwood High School',
    subdomain: 'greenwood.chronos.edu',
    timezone: 'IST (UTC+5:30)',
    term: 'Academic Year 2026-27 (Term 1)',
    published: true,
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    rules: {
      primaryEndPeriod: 4, // Ends at 12:00 PM (Zero + P1..P4 + Break)
      seniorEndPeriod: 6,  // Ends at 2:00 PM (Zero + P1..P6 + Break/Lunch)
      maxTeacherPeriodsPerDay: 5, // Hard constraint
      activityDay: 'Wednesday',
      activityPeriods: [1, 2], // P1 & P2 locked for Activity subjects
      zeroPeriodLabel: 'Zero Period (Homeroom / Assembly)',
      lunchAfterPeriod: 4, // After P4 (12:00 PM) Primary goes home, Senior has Lunch
    },
    periodSlots: [
      { number: 0, label: 'Zero Period', time: '08:00 - 08:30', isBreak: true, type: 'zero' },
      { number: 1, label: 'Period 1', time: '08:30 - 09:15', isBreak: false },
      { number: 2, label: 'Period 2', time: '09:15 - 10:00', isBreak: false },
      { number: 'B1', label: 'Short Break', time: '10:00 - 10:15', isBreak: true, type: 'break' },
      { number: 3, label: 'Period 3', time: '10:15 - 11:00', isBreak: false },
      { number: 4, label: 'Period 4', time: '11:00 - 12:00', isBreak: false, note: 'Primary Dismissal (12:00)' },
      { number: 'L1', label: 'Lunch Break', time: '12:00 - 12:30', isBreak: true, type: 'lunch', seniorOnly: true },
      { number: 5, label: 'Period 5', time: '12:30 - 01:15', isBreak: false, seniorOnly: true },
      { number: 6, label: 'Period 6', time: '01:15 - 02:00', isBreak: false, seniorOnly: true, note: 'Senior Dismissal (02:00)' },
    ],
    classes: [
      { id: 'c-4a', name: '4A', grade: 'Grade 4', tier: 'Primary', room: 'Room 101' },
      { id: 'c-5b', name: '5B', grade: 'Grade 5', tier: 'Primary', room: 'Room 102' },
      { id: 'c-9a', name: '9A', grade: 'Grade 9', tier: 'Senior', room: 'Room 201' },
      { id: 'c-10a', name: '10A', grade: 'Grade 10', tier: 'Senior', room: 'Room 202' },
    ],
    // Primary has 5 days * 4 periods = 20 total slots/week (2 activity + 18 academic)
    // Senior has 5 days * 6 periods = 30 total slots/week (2 activity + 28 academic)
    subjects: [
      // Academic Subjects
      { id: 'sub-math', name: 'Mathematics', code: 'MATH', type: 'academic', color: 'bg-blue-50 text-blue-700 border-blue-200', freqPrimary: 5, freqSenior: 6 },
      { id: 'sub-eng', name: 'English Lit', code: 'ENG', type: 'academic', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', freqPrimary: 5, freqSenior: 5 },
      { id: 'sub-sci', name: 'General Science', code: 'SCI', type: 'academic', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', freqPrimary: 4, freqSenior: 6 },
      { id: 'sub-sst', name: 'Social Studies', code: 'SST', type: 'academic', color: 'bg-amber-50 text-amber-700 border-amber-200', freqPrimary: 4, freqSenior: 5 },
      { id: 'sub-cs', name: 'Computer Sci', code: 'CS', type: 'academic', color: 'bg-cyan-50 text-cyan-700 border-cyan-200', freqPrimary: 0, freqSenior: 3 },
      { id: 'sub-hin', name: 'Second Language', code: 'LANG', type: 'academic', color: 'bg-rose-50 text-rose-700 border-rose-200', freqPrimary: 0, freqSenior: 3 },
      // Activity Subjects (2 periods/week locked in Activity Block)
      { id: 'sub-mus', name: 'Dance & Music', code: 'MUS', type: 'activity', room: 'Music Studio', color: 'bg-purple-100 text-purple-800 border-purple-300', freqPrimary: 1, freqSenior: 1 },
      { id: 'sub-art', name: 'Art & Craft', code: 'ART', type: 'activity', room: 'Art Atelier', color: 'bg-pink-100 text-pink-800 border-pink-300', freqPrimary: 1, freqSenior: 0 },
      { id: 'sub-gam', name: 'Sports & Games', code: 'GAME', type: 'activity', room: 'Sports Arena', color: 'bg-lime-100 text-lime-800 border-lime-300', freqPrimary: 0, freqSenior: 1 },
    ],
    teachers: [
      { id: 't-1', name: 'Dr. Aris Thorne', subjects: ['sub-math'], maxPerDay: 5, unavailableDays: [] },
      { id: 't-2', name: 'Ms. Priya Nair', subjects: ['sub-math', 'sub-cs'], maxPerDay: 5, unavailableDays: [] },
      { id: 't-3', name: 'Mr. David Miller', subjects: ['sub-eng'], maxPerDay: 5, unavailableDays: [] },
      { id: 't-4', name: 'Mrs. Kavita Rao', subjects: ['sub-eng', 'sub-hin'], maxPerDay: 5, unavailableDays: [] },
      { id: 't-5', name: 'Dr. Neha Verma', subjects: ['sub-sci'], maxPerDay: 5, unavailableDays: [] },
      { id: 't-6', name: 'Mr. Rohan Joshi', subjects: ['sub-sci', 'sub-cs'], maxPerDay: 5, unavailableDays: [] },
      { id: 't-7', name: 'Ms. Sarah Jenkins', subjects: ['sub-sst'], maxPerDay: 5, unavailableDays: [] },
      { id: 't-8', name: 'Mr. Vikram Singh', subjects: ['sub-sst', 'sub-hin'], maxPerDay: 5, unavailableDays: [] },
      // Specialist Activity Teachers
      { id: 't-9', name: 'Maestro Carlos (Music)', subjects: ['sub-mus'], maxPerDay: 5, unavailableDays: [] },
      { id: 't-10', name: 'Ms. Elena Rostova (Art)', subjects: ['sub-art', 'sub-mus'], maxPerDay: 5, unavailableDays: [] },
      { id: 't-11', name: 'Coach Marcus Vance (Sports)', subjects: ['sub-gam', 'sub-art'], maxPerDay: 5, unavailableDays: [] },
    ],
    absences: [
      // Pre-populated example absence so user can immediately see Substitute Ranking in action
      { id: 'abs-1', teacherId: 't-1', day: 'Tuesday', reason: 'Medical Leave' }
    ],
    substitutions: {} // key: `${day}-${period}-${classId}` -> substituteTeacherId
  },
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
    substitutions: {}
  }
];
