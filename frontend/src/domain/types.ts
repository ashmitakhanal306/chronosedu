// DOMAIN LAYER — pure types mirroring the blueprint's data model (section 6).
// No React, no I/O. Everything else depends on this; this depends on nothing.

export type Tier = 'Primary' | 'Senior';
export type Role = 'admin' | 'teacher' | 'student';
export type SubjectType = 'academic' | 'activity';
export type AdminTab = 'timetable' | 'substitutions' | 'setup';
export type ViewMode = 'class' | 'teacher';

export interface SchoolRules {
  primaryEndPeriod: number;
  seniorEndPeriod: number;
  maxTeacherPeriodsPerDay: number;
  activityDay: string;
  activityPeriods: number[];
  zeroPeriodLabel: string;
  lunchAfterPeriod: number;
}

export interface SolverPreferences {
  spreadSubjects: boolean;
  smoothTeacherWorkload: boolean;
  minimizeTeacherGaps: boolean;
  morningCorePriority: boolean;
  consecutiveDoublePeriods: boolean;
}

export const DEFAULT_SOLVER_PREFERENCES: SolverPreferences = {
  spreadSubjects: true,
  smoothTeacherWorkload: true,
  minimizeTeacherGaps: false,
  morningCorePriority: false,
  consecutiveDoublePeriods: true,
};


export interface PeriodSlot {
  number: number | string;
  label: string;
  time: string;
  isBreak: boolean;
  type?: 'zero' | 'break' | 'lunch';
  seniorOnly?: boolean;
  note?: string;
}

export interface ClassSection {
  id: string;
  name: string;
  grade: string;
  tier: Tier;
  room: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  type: SubjectType;
  room?: string;
  color: string;
  freqPrimary: number;
  freqSenior: number;
  requiresDoublePeriod?: boolean;
}

export interface Teacher {
  id: string;
  name: string;
  email?: string;
  subjects: string[];
  maxPerDay: number;
  unavailableDays: string[];
}

export interface Absence {
  id: string;
  teacherId: string;
  day: string;
  reason: string;
}

export interface TimingConfig {
  startTime: string; // "08:00"
  periodDurationMinutes: number; // 45
  hasZeroPeriod: boolean;
  zeroPeriodDurationMinutes: number; // 30
  zeroPeriodLabel: string; // "Zero Period (Homeroom / Assembly)"
  recessAfterPeriod: number; // 2
  recessDurationMinutes: number; // 15
  recessLabel: string; // "Short Break"
  lunchAfterPeriod: number; // 4
  lunchDurationMinutes: number; // 30
  lunchLabel: string; // "Lunch Break"
  lunchSeniorOnly?: boolean; // false = synchronized lunch for all classes
}

export const DEFAULT_TIMING_CONFIG: TimingConfig = {
  startTime: '08:00',
  periodDurationMinutes: 45,
  hasZeroPeriod: true,
  zeroPeriodDurationMinutes: 30,
  zeroPeriodLabel: 'Zero Period (Homeroom / Assembly)',
  recessAfterPeriod: 2,
  recessDurationMinutes: 15,
  recessLabel: 'Short Break',
  lunchAfterPeriod: 4,
  lunchDurationMinutes: 30,
  lunchLabel: 'Lunch Break',
  lunchSeniorOnly: false,
};

export interface SubjectPaletteItem {
  name: string;
  color: string;
  dot: string;
}

export const SUBJECT_PALETTE: SubjectPaletteItem[] = [
  { name: 'Blue', color: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
  { name: 'Indigo', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', dot: 'bg-indigo-500' },
  { name: 'Violet', color: 'bg-violet-50 text-violet-700 border-violet-200', dot: 'bg-violet-500' },
  { name: 'Purple', color: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-purple-500' },
  { name: 'Fuchsia', color: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200', dot: 'bg-fuchsia-500' },
  { name: 'Rose', color: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' },
  { name: 'Amber', color: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  { name: 'Emerald', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  { name: 'Teal', color: 'bg-teal-50 text-teal-700 border-teal-200', dot: 'bg-teal-500' },
  { name: 'Cyan', color: 'bg-cyan-50 text-cyan-700 border-cyan-200', dot: 'bg-cyan-500' },
];

export interface School {
  id: string;
  name: string;
  subdomain: string;
  timezone: string;
  term: string;
  published: boolean;
  workingDays: string[];
  rules: SchoolRules;
  timingConfig?: TimingConfig;
  periodSlots: PeriodSlot[];
  classes: ClassSection[];
  subjects: Subject[];
  teachers: Teacher[];
  absences: Absence[];
  /** key: `${day}-${period}-${classId}` -> substitute teacher id */
  substitutions: Record<string, string>;
}

export interface TimetableEntry {
  id?: string;
  classId: string;
  day: string;
  period: number;
  subjectId: string;
  teacherId: string;
  room: string;
  isActivity: boolean;
  isManualOverride?: boolean;
  substituteTeacherId?: string;
  substituteTeacherName?: string;
}

export interface Diagnostic {
  type: 'error' | 'warning';
  title: string;
  detail: string;
}

/** key: `${day}-${period}-${classId}` */
export type EntryMap = Record<string, TimetableEntry>;

export interface ScheduleResult {
  entries: EntryMap;
  diagnostics: Diagnostic[];
  generatedAt?: string;
}

export interface SubstituteCandidate extends Teacher {
  assignedToday: number;
  freePeriodsToday: number;
}

export interface EditingSlot {
  day: string;
  period: number;
  classId: string;
  currentEntry?: TimetableEntry;
}

export type ToastType = 'success' | 'warning' | 'info';
export interface ToastState {
  msg: string;
  type: ToastType;
}

export const slotKey = (day: string, period: number | string, classId: string): string =>
  `${day}-${period}-${classId}`;
