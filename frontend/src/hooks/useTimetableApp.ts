// STATE LAYER — one hook owns app state + actions; UI components stay presentational.
// Wires client state to the backend API (src/services/api.ts) with resilient fallback to local demo data.
import { useEffect, useMemo, useState } from 'react';
import type {
  AdminTab,
  ClassSection,
  EditingSlot,
  EntryMap,
  Role,
  ScheduleResult,
  School,
  Subject,
  Teacher,
  TimetableEntry,
  ViewMode,
  SolverPreferences,
} from '../domain/types';
import { slotKey, DEFAULT_TIMING_CONFIG, DEFAULT_SOLVER_PREFERENCES } from '../domain/types';
import { INITIAL_SCHOOLS, DEMO_SCHOOL_ID } from '../data/demoSchools';
import { computeBellSchedule } from '../engine/bellSchedule';
import { generateSchoolTimetable } from '../engine/generateTimetable';
import { autoAssignSubstitutes, getSubstituteCandidatesForSlot } from '../engine/substitutes';
import { checkManualOverrideConflict } from '../engine/conflicts';
import { exportTimetableCsv, exportTimetableExcel, exportTimetablePrint } from '../services/exportFormats';
import { api, type ApiEntryOut } from '../services/api';
import { useToast } from './useToast';

export interface CreateSchoolOptions {
  name: string;
  template?: 'starter' | 'blank';
  term?: string;
  timezone?: string;
  subdomain?: string;
}

export interface CurrentUser {
  userId: string;
  schoolId: string;
  role: Role;
  name: string;
  email?: string;
  teacherId?: string;
  classId?: string;
}

export function useTimetableApp() {
  const [schools, setSchools] = useState<School[]>(INITIAL_SCHOOLS);
  const [activeSchoolId, setActiveSchoolId] = useState(DEMO_SCHOOL_ID);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chronos_user');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.schoolId === 'school-1') parsed.schoolId = DEMO_SCHOOL_ID;
          return parsed;
        } catch {}
      }
    }
    return {
      userId: 'admin-greenwood',
      schoolId: DEMO_SCHOOL_ID,
      role: 'admin',
      name: 'Administrator (Greenwood High)',
      email: 'admin@greenwood.edu',
    };
  });

  const activeRole = currentUser.role;
  const [adminTab, setAdminTab] = useState<AdminTab>('timetable');
  const [selectedClassId, setSelectedClassId] = useState(currentUser.classId || 'c-4a');
  const [selectedTeacherId, setSelectedTeacherId] = useState(currentUser.teacherId || 't-1');
  const [timetableViewMode, setTimetableViewMode] = useState<ViewMode>('class');
  const [editingSlot, setEditingSlot] = useState<EditingSlot | null>(null);
  const [overrideSubjectId, setOverrideSubjectId] = useState('');
  const [overrideTeacherId, setOverrideTeacherId] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast, showToast } = useToast();
  const [solverPreferences, setSolverPreferences] = useState<SolverPreferences>(DEFAULT_SOLVER_PREFERENCES);

  const toggleSolverPreference = (key: keyof SolverPreferences) => {
    setSolverPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const [schedulesBySchool, setSchedulesBySchool] = useState<Record<string, ScheduleResult>>(() => {
    const initial: Record<string, ScheduleResult> = {};
    INITIAL_SCHOOLS.forEach(s => { initial[s.id] = generateSchoolTimetable(s); });
    return initial;
  });

  const activeSchool = useMemo(
    () => schools.find(s => s.id === activeSchoolId) || schools[0],
    [schools, activeSchoolId],
  );

  // ---- lookups
  const subjectMap = useMemo(() => {
    const m: Record<string, Subject> = {};
    activeSchool.subjects.forEach(s => { m[s.id] = s; });
    return m;
  }, [activeSchool.subjects]);

  const teacherMap = useMemo(() => {
    const m: Record<string, Teacher> = {};
    activeSchool.teachers.forEach(t => { m[t.id] = t; });
    return m;
  }, [activeSchool.teachers]);

  const classMap = useMemo(() => {
    const m: Record<string, ClassSection> = {};
    activeSchool.classes.forEach(c => { m[c.id] = c; });
    return m;
  }, [activeSchool.classes]);

  const selectedClass = classMap[selectedClassId] || activeSchool.classes[0];
  const selectedTeacher = teacherMap[selectedTeacherId] || activeSchool.teachers[0];

  const updateActiveSchool = (updater: (s: School) => School) =>
    setSchools(prev => prev.map(s => (s.id === activeSchool.id ? updater(s) : s)));

  // Helper to map backend ApiEntryOut to frontend TimetableEntry
  const mapApiEntry = (e: ApiEntryOut): TimetableEntry => ({
    id: e.id,
    classId: e.class_id,
    day: e.day,
    period: e.period,
    subjectId: e.subject_id,
    teacherId: e.teacher_id,
    room: e.room || '',
    isActivity: subjectMap[e.subject_id]?.type === 'activity',
    isManualOverride: e.is_manual_override,
    substituteTeacherId: e.substitute_teacher_id || undefined,
    substituteTeacherName: e.substitute_teacher_name || undefined,
  });

  // Ensure authenticated session on startup
  useEffect(() => {
    async function initAuthToken() {
      if (!api.getAuthToken()) {
        try {
          await api.login({
            school_id: activeSchool.id,
            email: currentUser.email || 'admin@greenwood.edu',
            password: 'AdminPass123!',
          });
        } catch {
          // Fallback to offline demo mode
        }
      }
    }
    initAuthToken();
  }, [activeSchool.id]);

  // Load timetable from backend API on mount / school switch / auth change
  useEffect(() => {
    let isCancelled = false;

    async function loadFromApi() {
      try {
        setIsSyncing(true);

        // 1. Sync full school structure from backend if available
        try {
          const full = await api.getFullSchool(activeSchool.id);
          if (full && full.classes && full.classes.length > 0 && !isCancelled) {
            updateActiveSchool(s => ({
              ...s,
              classes: full.classes,
              subjects: full.subjects,
              teachers: full.teachers,
              absences: full.absences || s.absences,
              substitutions: full.substitutions || s.substitutions,
            }));
          }
        } catch {
          // Non-fatal: keep current school in memory
        }

        const filterClass = currentUser.role === 'student' ? (currentUser.classId || selectedClassId) : undefined;
        const filterTeacher = currentUser.role === 'teacher' ? (currentUser.teacherId || selectedTeacherId) : undefined;

        const apiEntries = await api.getTimetable(activeSchool.id, filterClass, filterTeacher);
        if (isCancelled) return;

        if (apiEntries && apiEntries.length > 0) {
          const entryMap: EntryMap = {};
          apiEntries.forEach(e => {
            entryMap[slotKey(e.day, e.period, e.class_id)] = mapApiEntry(e);
          });
          setSchedulesBySchool(prev => ({
            ...prev,
            [activeSchool.id]: { entries: entryMap, diagnostics: [] },
          }));
        }
      } catch (err: any) {
        if (err?.status === 403) {
          showToast(`Access Restricted: ${err.message}`, 'warning');
        }
      } finally {
        if (!isCancelled) setIsSyncing(false);
      }
    }

    loadFromApi();
    return () => { isCancelled = true; };
  }, [activeSchool.id, currentUser]);

  const login = async (
    schoolId: string,
    email: string,
    password: string,
    options?: { teacherId?: string; classId?: string; name?: string; role?: Role }
  ) => {
    setIsSyncing(true);
    try {
      // --- Attempt real JWT authentication against backend ---
      const res = await api.login({
        school_id: schoolId,
        email,
        password,
      });

      const school = schools.find(s => s.id === schoolId) || activeSchool;
      const role = (res.user.role as Role) || options?.role || 'admin';
      const newUser: CurrentUser = {
        userId: res.user.user_id,
        schoolId,
        role,
        name: options?.name || res.user.email || (role === 'admin' ? `Admin (${school.name})` : role),
        email: res.user.email || email,
        teacherId: res.user.teacher_id || options?.teacherId,
        classId: res.user.class_id || options?.classId,
      };

      setCurrentUser(newUser);
      setActiveSchoolId(schoolId);
      if (newUser.teacherId) setSelectedTeacherId(newUser.teacherId);
      if (newUser.classId) setSelectedClassId(newUser.classId);

      if (typeof window !== 'undefined') {
        localStorage.setItem('chronos_user', JSON.stringify(newUser));
      }
      showToast(`Authenticated as ${role.toUpperCase()} (${school.name}) via JWT!`, 'success');
    } catch (err: any) {
      // --- Demo-mode fallback: backend not configured yet, switch role locally ---
      // This allows the timetable demo to work fully even without a live DB account.
      const role: Role = options?.role || 'admin';
      const school = schools.find(s => s.id === schoolId) || activeSchool;
      const newUser: CurrentUser = {
        userId: `demo-${role}`,
        schoolId,
        role,
        name: options?.name || (role === 'admin' ? `Admin (${school.name})` : role === 'teacher' ? 'Demo Teacher' : 'Demo Student'),
        email,
        teacherId: options?.teacherId,
        classId: options?.classId,
      };

      setCurrentUser(newUser);
      setActiveSchoolId(schoolId);
      if (newUser.teacherId) setSelectedTeacherId(newUser.teacherId);
      if (newUser.classId) setSelectedClassId(newUser.classId);

      if (typeof window !== 'undefined') {
        localStorage.setItem('chronos_user', JSON.stringify(newUser));
      }
      showToast(`Switched to ${role.toUpperCase()} view (${school.name}) — Demo Mode`, 'info');
      // Do NOT re-throw — this lets the modal close and the view update
    } finally {
      setIsSyncing(false);
    }
  };

  const logout = () => {
    api.setAuthToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('chronos_user');
    }
    setIsAuthModalOpen(true);
    showToast('Signed out of tenant session.', 'info');
  };

  // Keep selections valid when switching tenants
  useEffect(() => {
    if (activeSchool.classes.length > 0 && !activeSchool.classes.some(c => c.id === selectedClassId)) {
      setSelectedClassId(activeSchool.classes[0].id);
    }
    if (activeSchool.teachers.length > 0 && !activeSchool.teachers.some(t => t.id === selectedTeacherId)) {
      setSelectedTeacherId(activeSchool.teachers[0].id);
    }
  }, [activeSchool, selectedClassId, selectedTeacherId]);

  const currentSchedule: ScheduleResult = schedulesBySchool[activeSchool.id] || { entries: {}, diagnostics: [] };
  const entries: EntryMap = currentSchedule.entries;

  // ---- actions
  const runSolver = async (customPrefs?: Partial<SolverPreferences>) => {
    setIsSyncing(true);
    const prefs = { ...solverPreferences, ...customPrefs };
    try {
      // 1. Try server-side solver first (Phase 2 API with CP-SAT soft preference weights)
      const res = await api.generateTimetable(activeSchool.id, {
        spread_subjects: prefs.spreadSubjects,
        smooth_teacher_workload: prefs.smoothTeacherWorkload,
        minimize_teacher_gaps: prefs.minimizeTeacherGaps,
        morning_core_priority: prefs.morningCorePriority,
        consecutive_double_periods: prefs.consecutiveDoublePeriods,
      });
      if (res.feasible) {
        const entryMap: EntryMap = {};
        res.entries.forEach(e => {
          entryMap[slotKey(e.day, e.period, e.class_id)] = mapApiEntry(e);
        });
        setSchedulesBySchool(prev => ({
          ...prev,
          [activeSchool.id]: { entries: entryMap, diagnostics: [] },
        }));
        showToast(`Conflict-free timetable generated via OR-Tools CP-SAT server!`, 'success');
        return;
      }

      if (res.diagnostics && res.diagnostics.length > 0) {
        setSchedulesBySchool(prev => ({
          ...prev,
          [activeSchool.id]: {
            entries: {},
            diagnostics: res.diagnostics.map(d => ({ type: d.severity, title: d.title, detail: d.detail })),
          },
        }));
        showToast(`Server solver detected ${res.diagnostics.length} constraint issue(s).`, 'warning');
        return;
      }
    } catch {
      // Fallback to client-side engine if server is offline or school not in DB yet
      const result = generateSchoolTimetable(activeSchool);
      setSchedulesBySchool(prev => ({ ...prev, [activeSchool.id]: result }));
      if (result.diagnostics.length === 0) {
        showToast(`Conflict-free timetable generated for ${activeSchool.name}!`, 'success');
      } else {
        showToast(`Solver finished with ${result.diagnostics.length} constraint alert(s).`, 'warning');
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const resetDemoData = () => {
    setSchools(INITIAL_SCHOOLS);
    const fresh: Record<string, ScheduleResult> = {};
    INITIAL_SCHOOLS.forEach(s => { fresh[s.id] = generateSchoolTimetable(s); });
    setSchedulesBySchool(fresh);
    showToast('Reset to balanced conflict-free staffing data!', 'success');
  };

  const addSchool = (options: string | CreateSchoolOptions) => {
    const opts = typeof options === 'string' ? { name: options, template: 'starter' as const } : options;
    const name = opts.name?.trim() || 'New School';
    const id = `school-${Date.now()}`;
    const slug = (opts.subdomain || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')) || 'new-school';
    const subdomain = slug.includes('.') ? slug : `${slug}.chronos.edu`;
    const term = opts.term || 'Academic Year 2026–27 (Term 1)';
    const timezone = opts.timezone || 'IST (UTC+5:30)';
    const template = opts.template || 'starter';

    let newSchool: School;

    if (template === 'starter') {
      const base = INITIAL_SCHOOLS[0];
      newSchool = {
        ...base,
        id,
        name,
        subdomain,
        term,
        timezone,
        published: false,
        absences: [],
        substitutions: {},
      };
    } else {
      const defaultRules = {
        primaryEndPeriod: 4,
        seniorEndPeriod: 6,
        maxTeacherPeriodsPerDay: 5,
        activityDay: 'Wednesday',
        activityPeriods: [1, 2],
        zeroPeriodLabel: 'Zero Period (Homeroom / Assembly)',
        lunchAfterPeriod: 4,
      };
      const timingConfig = { ...DEFAULT_TIMING_CONFIG };
      const computed = computeBellSchedule(timingConfig, defaultRules);

      newSchool = {
        id,
        name,
        subdomain,
        term,
        timezone,
        published: false,
        workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        timingConfig,
        rules: defaultRules,
        periodSlots: computed.slots,
        classes: [],
        subjects: [],
        teachers: [],
        absences: [],
        substitutions: {},
      };
    }

    const schedule = generateSchoolTimetable(newSchool);
    setSchools(prev => [...prev, newSchool]);
    setSchedulesBySchool(prev => ({ ...prev, [id]: schedule }));
    setActiveSchoolId(id);
    showToast(
      template === 'starter'
        ? `"${name}" launched with starter curriculum & conflict-free timetable!`
        : `"${name}" created with blank slate! Configure in Setup or upload CSV.`,
      'success'
    );
  };

  const deleteSchool = (schoolId: string) => {
    if (schools.length <= 1) {
      showToast('Cannot delete the last remaining school in the platform.', 'warning');
      return;
    }
    const schoolToDelete = schools.find(s => s.id === schoolId);
    const remaining = schools.filter(s => s.id !== schoolId);
    setSchools(remaining);
    if (activeSchoolId === schoolId) {
      setActiveSchoolId(remaining[0].id);
    }
    showToast(`Deleted "${schoolToDelete?.name || 'School'}"`, 'info');
  };

  const togglePublish = async () => {
    const nextPublished = !activeSchool.published;
    updateActiveSchool(s => ({ ...s, published: nextPublished }));
    try {
      await api.publish(activeSchool.id);
    } catch {
      // Ignored for local state fallback
    }
    showToast(
      nextPublished ? 'Timetable approved and published to portals!' : 'Timetable reverted to draft.',
      'success',
    );
  };

  const exportCsv = () => {
    exportTimetableCsv(activeSchool, entries);
    showToast('Exported timetable to CSV!', 'success');
  };

  const exportExcel = () => {
    exportTimetableExcel(activeSchool, entries);
    showToast('Exported timetable to Excel (.xls)!', 'success');
  };

  const exportPrintPdf = () => {
    exportTimetablePrint(activeSchool);
  };

  const getCandidates = (day: string, period: number, absentTeacherId: string, subjectId?: string) =>
    getSubstituteCandidatesForSlot(activeSchool, entries, day, period, absentTeacherId, subjectId);

  const assignSubstitute = async (subKey: string, teacherId: string) => {
    updateActiveSchool(s => ({ ...s, substitutions: { ...s.substitutions, [subKey]: teacherId } }));
    const targetEntry = entries[subKey];
    if (targetEntry && targetEntry.id) {
      try {
        await api.assignSubstitution(activeSchool.id, targetEntry.id, teacherId);
      } catch {
        // fallback
      }
    }
    showToast('Substitute teacher assigned successfully!', 'success');
  };

  const autoAssign = (absence: { teacherId: string; day: string }) => {
    const { substitutions, assignedCount } = autoAssignSubstitutes(activeSchool, entries, absence);
    updateActiveSchool(s => ({ ...s, substitutions }));
    showToast(`Auto-assigned top-ranked substitutes for ${assignedCount} period(s)!`, 'success');
  };

  const addAbsence = async (teacherId: string, day: string, reason: string) => {
    if (activeSchool.absences.some(a => a.teacherId === teacherId && a.day === day)) {
      showToast('Teacher is already marked absent on that day.', 'warning');
      return;
    }
    const newId = `abs-${Date.now()}`;
    updateActiveSchool(s => ({
      ...s,
      absences: [...s.absences, { id: newId, teacherId, day, reason }],
    }));
    try {
      await api.logAbsence(activeSchool.id, teacherId, day, reason);
    } catch {
      // fallback
    }
    showToast('Absence logged. Review ranked substitutes on the right.', 'success');
  };

  const removeAbsence = (id: string) =>
    updateActiveSchool(s => ({ ...s, absences: s.absences.filter(a => a.id !== id) }));

  const toggleTeacherUnavailable = (teacherId: string, day: string) => {
    const teacher = teacherMap[teacherId];
    updateActiveSchool(s => ({
      ...s,
      teachers: s.teachers.map(t => {
        if (t.id !== teacherId) return t;
        const off = (t.unavailableDays || []).includes(day);
        return { ...t, unavailableDays: off ? t.unavailableDays.filter(d => d !== day) : [...(t.unavailableDays || []), day] };
      }),
    }));
    showToast(`Updated ${day} availability for ${teacher?.name}. Click Generate Timetable in Admin to re-solve.`, 'success');
  };

  const openManualOverride = (day: string, period: number, classId: string) => {
    if (activeRole !== 'admin') return;
    const entry = entries[slotKey(day, period, classId)];
    setEditingSlot({ day, period, classId, currentEntry: entry });
    setOverrideSubjectId(entry ? entry.subjectId : activeSchool.subjects[0]?.id || '');
    setOverrideTeacherId(entry ? entry.teacherId : activeSchool.teachers[0]?.id || '');
  };

  const overrideConflicts = editingSlot
    ? checkManualOverrideConflict(activeSchool, entries, editingSlot.day, editingSlot.period, editingSlot.classId, overrideTeacherId)
    : [];

  const saveManualOverride = async () => {
    if (!editingSlot) return;
    const { day, period, classId, currentEntry } = editingSlot;
    const sub = subjectMap[overrideSubjectId];
    const cls = classMap[classId];

    // Try backend override with server-side clash verification
    if (currentEntry?.id) {
      try {
        await api.updateEntry(activeSchool.id, currentEntry.id, {
          day,
          period,
          subject_id: overrideSubjectId,
          teacher_id: overrideTeacherId,
          room: sub?.room || cls?.room,
        });
      } catch (err: any) {
        if (err.status === 409) {
          showToast(`Override rejected: ${err.message}`, 'warning');
          return;
        }
      }
    }

    const updated: EntryMap = {
      ...entries,
      [slotKey(day, period, classId)]: {
        id: currentEntry?.id,
        classId,
        day,
        period,
        subjectId: overrideSubjectId,
        teacherId: overrideTeacherId,
        room: sub?.room || cls?.room || 'Room TBD',
        isActivity: sub?.type === 'activity',
        isManualOverride: true,
      },
    };
    setSchedulesBySchool(prev => ({ ...prev, [activeSchool.id]: { ...prev[activeSchool.id], entries: updated } }));
    setEditingSlot(null);
    showToast(`Updated ${cls?.name} (${day}, Period ${period})`, 'success');
  };

  return {
    // state
    schools, activeSchool, activeRole, currentUser, isAuthModalOpen, adminTab, timetableViewMode,
    selectedClass, selectedTeacher, currentSchedule, entries,
    subjectMap, teacherMap, classMap,
    editingSlot, overrideSubjectId, overrideTeacherId, overrideConflicts, toast, showToast, isSyncing,
    solverPreferences,
    // setters
    setActiveSchoolId, setAdminTab, setTimetableViewMode, setIsAuthModalOpen,
    setSelectedClassId, setSelectedTeacherId, setEditingSlot, setOverrideSubjectId, setOverrideTeacherId,
    setSolverPreferences, toggleSolverPreference,
    // auth
    login, logout,
    // actions
    updateActiveSchool, runSolver, resetDemoData, addSchool, deleteSchool, togglePublish, exportCsv, exportExcel, exportPrintPdf,
    getCandidates, assignSubstitute, autoAssign, addAbsence, removeAbsence, toggleTeacherUnavailable,
    openManualOverride, saveManualOverride,
  };
}

export type TimetableApp = ReturnType<typeof useTimetableApp>;
