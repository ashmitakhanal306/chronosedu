// DOMAIN LAYER — pure types mirroring the blueprint's data model (section 6).
// No React, no I/O. Everything else depends on this; this depends on nothing.

export type Tier = 'Primary' | 'Senior';
export type Role = 'admin' | 'teacher' | 'student';
export type SubjectType = 'academic' | 'activity';
export type AdminTab = 'timetable' | 'substitutions' | 'setup' | 'roadmap';
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
}

export interface Teacher {
  id: string;
  name: string;
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

export interface School {
  id: string;
  name: string;
  subdomain: string;
  timezone: string;
  term: string;
  published: boolean;
  workingDays: string[];
  rules: SchoolRules;
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
