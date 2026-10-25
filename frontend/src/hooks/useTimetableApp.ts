// STATE LAYER — one hook owns app state + actions; UI components stay presentational.
// Wires client state to the backend API (src/services/api.ts) with resilient fallback to local demo data.
import { useEffect, useMemo, useState } from 'react';
import type {
  AdminTab,
  ClassSection,
  EditingSlot,
  EntryMap,
  Role,
  Room,
  ScheduleResult,
  School,
  Subject,
  Teacher,
  TeachingAssignment,
  Holiday,
  PinnedLesson,
  BlockedSlot,
  TimetableVersion,
  AuditLog,
  TimetableEntry,
  ViewMode,
  SolverPreferences,
  Tier,
} from '../domain/types';
import { slotKey, DEFAULT_TIMING_CONFIG, DEFAULT_SOLVER_PREFERENCES } from '../domain/types';
import { INITIAL_SCHOOLS, DEMO_SCHOOL_ID } from '../data/demoSchools';
import { createGreenwoodIssuesSchool, GREENWOOD_ISSUES_SCHOOL_ID } from '../data/greenwoodIssuesSchool';
import { computeBellSchedule } from '../engine/bellSchedule';
import { generateSchoolTimetable } from '../engine/generateTimetable';
import { autoAssignSubstitutes, getSubstituteCandidatesForSlot } from '../engine/substitutes';
import { checkManualOverrideConflict } from '../engine/conflicts';
import { exportTimetableCsv, exportTimetableExcel, exportTimetablePrint } from '../services/exportFormats';
import { api, type ApiEntryOut } from '../services/api';
import { useToast } from './useToast';
import { sortClasses, sortTeachers } from '../utils/sorting';

export interface CreateSchoolOptions {
  name: string;
  template?: 'starter' | 'blank' | 'greenwood_issues';
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
  const [adminTab, setAdminTab] = useState<AdminTab>('wizard');
  const [wizardStep, setWizardStep] = useState<number>(8);
  const [selectedClassId, setSelectedClassId] = useState(currentUser.classId || '');
  const [selectedTeacherId, setSelectedTeacherId] = useState(currentUser.teacherId || '');
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

  const sortedClasses = useMemo(() => sortClasses(activeSchool.classes), [activeSchool.classes]);
  const sortedTeachers = useMemo(() => sortTeachers(activeSchool.teachers), [activeSchool.teachers]);

  const selectedClass = classMap[selectedClassId] || sortedClasses[0] || activeSchool.classes[0];
  const selectedTeacher = teacherMap[selectedTeacherId] || sortedTeachers[0] || activeSchool.teachers[0];

  // Auto-sync selected IDs to active school entities
  useEffect(() => {
    if (activeSchool.teachers.length > 0 && (!selectedTeacherId || !teacherMap[selectedTeacherId])) {
      const fallback = sortedTeachers[0]?.id || activeSchool.teachers[0]?.id;
      if (fallback) setSelectedTeacherId(fallback);
    }
  }, [activeSchool.teachers, selectedTeacherId, teacherMap, sortedTeachers]);

  useEffect(() => {
    if (activeSchool.classes.length > 0 && (!selectedClassId || !classMap[selectedClassId])) {
      const fallback = sortedClasses[0]?.id || activeSchool.classes[0]?.id;
      if (fallback) setSelectedClassId(fallback);
    }
  }, [activeSchool.classes, selectedClassId, classMap, sortedClasses]);

  const handleSetSelectedTeacherId = (id: string) => {
    setSelectedTeacherId(id);
    if (currentUser.role === 'teacher') {
      setCurrentUser(prev => {
        const teacher = teacherMap[id] || activeSchool.teachers.find(t => t.id === id);
        const updated = {
          ...prev,
          teacherId: id,
          name: teacher?.name || prev.name,
        };
        if (typeof window !== 'undefined') {
          localStorage.setItem('chronos_user', JSON.stringify(updated));
        }
        return updated;
      });
    }
  };

  const handleSetSelectedClassId = (id: string) => {
    setSelectedClassId(id);
    if (currentUser.role === 'student') {
      setCurrentUser(prev => {
        const cls = classMap[id] || activeSchool.classes.find(c => c.id === id);
        const updated = {
          ...prev,
          classId: id,
          name: cls?.name ? `Student (${cls.name})` : prev.name,
        };
        if (typeof window !== 'undefined') {
          localStorage.setItem('chronos_user', JSON.stringify(updated));
        }
        return updated;
      });
    }
  };

  const switchRole = (newRole: Role) => {
    let targetTeacherId = selectedTeacherId;
    if (newRole === 'teacher') {
      const valid = activeSchool.teachers.some(t => t.id === targetTeacherId);
      if (!valid) {
        targetTeacherId = sortedTeachers[0]?.id || activeSchool.teachers[0]?.id;
      }
      if (targetTeacherId) {
        setSelectedTeacherId(targetTeacherId);
      }
    }

    let targetClassId = selectedClassId;
    if (newRole === 'student') {
      const valid = activeSchool.classes.some(c => c.id === targetClassId);
      if (!valid) {
        targetClassId = sortedClasses[0]?.id || activeSchool.classes[0]?.id;
      }
      if (targetClassId) {
        setSelectedClassId(targetClassId);
      }
    }

    setCurrentUser(prev => {
      const teacher = targetTeacherId ? (teacherMap[targetTeacherId] || activeSchool.teachers.find(t => t.id === targetTeacherId)) : null;
      const cls = targetClassId ? (classMap[targetClassId] || activeSchool.classes.find(c => c.id === targetClassId)) : null;

      const updated: CurrentUser = {
        ...prev,
        role: newRole,
        teacherId: newRole === 'teacher' ? targetTeacherId : undefined,
        classId: newRole === 'student' ? targetClassId : undefined,
        name: newRole === 'teacher'
          ? (teacher?.name || 'Faculty Teacher')
          : newRole === 'student'
            ? `Student (${cls?.name || 'Class'})`
            : `Admin (${activeSchool.name})`,
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('chronos_user', JSON.stringify(updated));
      }
      return updated;
    });
    showToast(`Switched view to ${newRole === 'admin' ? 'School Admin' : newRole === 'teacher' ? 'Teacher Portal' : 'Student / Parent Portal'}`, 'info');
  };

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

  // Load tenant data & timetable from backend API sequentially
  useEffect(() => {
    let isCancelled = false;

    async function initAndSync() {
      try {
        setIsSyncing(true);

        // 1. Ensure authenticated session first before making protected requests
        if (!api.getAuthToken()) {
          try {
            await api.login({
              school_id: activeSchool.id,
              email: currentUser.email || 'admin@greenwood.edu',
              password: 'AdminPass123!',
            });
          } catch {
            // Offline demo fallback if backend unavailable
          }
        }
        if (isCancelled) return;

        // 2. Sync full school structure from backend if available
        try {
          const full = await api.getFullSchool(activeSchool.id);
          if (full && full.classes && full.classes.length > 0 && !isCancelled) {
            updateActiveSchool(s => ({
              ...s,
              classes: full.classes,
              subjects: full.subjects,
              teachers: full.teachers,
              assignments: full.assignments || s.assignments || [],
              holidays: (full.holidays || []).map((h: any) => ({
                id: h.id,
                name: h.name,
                startDate: h.startDate || h.start_date,
                endDate: h.endDate || h.end_date,
                type: h.type || h.holiday_type || 'school',
              })),
              pinnedLessons: (full.pinnedLessons || []).map((p: any) => ({
                id: p.id,
                classId: p.classId || p.class_id,
                subjectId: p.subjectId || p.subject_id,
                teacherId: p.teacherId || p.teacher_id,
                className: p.className || p.class_name,
                subjectName: p.subjectName || p.subject_name,
                teacherName: p.teacherName || p.teacher_name,
                day: p.day,
                period: p.period,
              })),
              blockedSlots: (full.blockedSlots || []).map((b: any) => ({
                id: b.id,
                scope: b.scope,
                scopeId: b.scopeId || b.scope_id,
                day: b.day,
                period: b.period,
                label: b.label,
                onDate: b.onDate || b.on_date,
              })),
              versions: (full.versions || []).map((v: any) => ({
                id: v.id,
                versionNumber: v.versionNumber || v.version_number,
                state: v.state,
                effectiveFrom: v.effectiveFrom || v.effective_from,
                publishedAt: v.publishedAt || v.published_at,
                notes: v.notes,
                entryCount: v.entryCount || v.entry_count || 0,
                createdAt: v.createdAt || v.created_at,
              })),
              rooms: full.rooms && full.rooms.length > 0 ? full.rooms : s.rooms,
              workingDays: full.workingDays || s.workingDays,
              rules: full.rules ? { ...s.rules, ...full.rules } : s.rules,
              timingConfig: full.timingConfig ? { ...s.timingConfig, ...full.timingConfig } : s.timingConfig,
              periodSlots: full.periodSlots && full.periodSlots.length > 0 ? full.periodSlots : s.periodSlots,
              absences: full.absences || s.absences,
              substitutions: full.substitutions || s.substitutions,
            }));
          }
        } catch {
          // Non-fatal: keep current school in memory
        }
        if (isCancelled) return;

        // 3. Fetch active timetable entries
        // If the authenticated user has unrestricted access (Admin or demo session), fetch full school timetable
        const isRestrictedStudent = currentUser.role === 'student' && Boolean(currentUser.classId) && currentUser.userId.startsWith('student-');
        const isRestrictedTeacher = currentUser.role === 'teacher' && Boolean(currentUser.teacherId) && currentUser.userId.startsWith('teacher-');

        const filterClass = isRestrictedStudent ? currentUser.classId : undefined;
        const filterTeacher = isRestrictedTeacher ? currentUser.teacherId : undefined;

        const apiEntries = await api.getTimetable(activeSchool.id, filterClass, filterTeacher);
        if (isCancelled) return;

        if (apiEntries && apiEntries.length > 0) {
          const entryMap: EntryMap = {};
          apiEntries.forEach(e => {
            entryMap[slotKey(e.day, e.period, e.class_id)] = mapApiEntry(e);
          });
          setSchedulesBySchool(prev => {
            const existingEntries = prev[activeSchool.id]?.entries || {};
            // If full school timetable loaded (or no filters applied), replace completely
            if (!filterClass && !filterTeacher) {
              return {
                ...prev,
                [activeSchool.id]: { entries: entryMap, diagnostics: [] },
              };
            }
            // For filtered requests, merge so we never destroy other teachers/classes
            return {
              ...prev,
              [activeSchool.id]: {
                entries: { ...existingEntries, ...entryMap },
                diagnostics: prev[activeSchool.id]?.diagnostics || [],
              },
            };
          });
        }
      } catch (err: any) {
        if (err?.status === 403) {
          showToast(`Access Restricted: ${err.message}`, 'warning');
        }
      } finally {
        if (!isCancelled) setIsSyncing(false);
      }
    }

    initAndSync();
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
      setSelectedClassId(sortedClasses[0]?.id || activeSchool.classes[0].id);
    }
    if (activeSchool.teachers.length > 0 && !activeSchool.teachers.some(t => t.id === selectedTeacherId)) {
      setSelectedTeacherId(sortedTeachers[0]?.id || activeSchool.teachers[0].id);
    }
  }, [activeSchool, selectedClassId, selectedTeacherId, sortedClasses, sortedTeachers]);

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
        const mappedQualityReport = res.quality_report ? {
          total_entries: res.quality_report.total_entries,
          empty_period_count: res.quality_report.empty_period_count,
          unplaced_lessons: res.quality_report.unplaced_lessons || [],
          teacher_workload: res.quality_report.teacher_workload || [],
          soft_score: res.quality_report.soft_score || 0,
        } : undefined;
        setSchedulesBySchool(prev => ({
          ...prev,
          [activeSchool.id]: {
            entries: entryMap,
            diagnostics: [],
            generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            qualityReport: mappedQualityReport,
          },
        }));

        try {
          const versions = await api.listVersions(activeSchool.id);
          if (versions && versions.length > 0) {
            updateActiveSchool(s => ({
              ...s,
              versions: versions.map(v => ({
                id: v.id,
                versionNumber: v.version_number,
                state: v.state,
                effectiveFrom: v.effective_from || undefined,
                publishedAt: v.published_at || undefined,
                notes: v.notes || undefined,
                entryCount: v.entry_count,
                createdAt: v.created_at,
              })),
            }));
          }
        } catch {}

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
    } catch (err: any) {
      showToast(err?.message || 'Backend offline — cannot generate timetable.', 'warning');
    } finally {
      setIsSyncing(false);
    }
  };

  const upsertAssignment = async (classId: string, subjectId: string, teacherId: string) => {
    setIsSyncing(true);
    try {
      const res = await api.upsertAssignment(activeSchool.id, {
        class_id: classId,
        subject_id: subjectId,
        teacher_id: teacherId,
      });
      updateActiveSchool(s => {
        const existing = s.assignments || [];
        const idx = existing.findIndex(a => a.classId === classId && a.subjectId === subjectId);
        const mapped: TeachingAssignment = {
          id: res.id,
          classId: res.class_id,
          subjectId: res.subject_id,
          teacherId: res.teacher_id,
          className: res.class_name || undefined,
          subjectName: res.subject_name || undefined,
          teacherName: res.teacher_name || undefined,
          teacherWeeklyLoad: res.teacher_weekly_load,
        };
        const next = idx >= 0
          ? existing.map((a, i) => (i === idx ? mapped : a))
          : [...existing, mapped];
        return { ...s, assignments: next };
      });
      showToast('Assignment updated successfully.', 'success');
    } catch (err: any) {
      showToast(err?.message || 'Failed to update assignment', 'warning');
    } finally {
      setIsSyncing(false);
    }
  };

  const deleteAssignment = async (assignmentId: string) => {
    setIsSyncing(true);
    try {
      await api.deleteAssignment(activeSchool.id, assignmentId);
      updateActiveSchool(s => ({
        ...s,
        assignments: (s.assignments || []).filter(a => a.id !== assignmentId),
      }));
      showToast('Assignment removed.', 'info');
    } catch (err: any) {
      showToast(err?.message || 'Failed to delete assignment', 'warning');
    } finally {
      setIsSyncing(false);
    }
  };

  const suggestAssignments = async () => {
    setIsSyncing(true);
    try {
      let res: any = null;
      try {
        res = await api.suggestAssignments(activeSchool.id);
        if (res.suggestions && res.suggestions.length > 0) {
          for (const sug of res.suggestions) {
            await api.upsertAssignment(activeSchool.id, {
              class_id: sug.class_id,
              subject_id: sug.subject_id,
              teacher_id: sug.teacher_id,
            });
          }
          const full = await api.getFullSchool(activeSchool.id);
          if (full?.assignments) {
            updateActiveSchool(s => ({ ...s, assignments: full.assignments }));
          }
          showToast(
            `Auto-assigned ${res.suggestions.length} class-subject pairs!${res.warnings.length ? ` (${res.warnings.length} warning(s))` : ''}`,
            res.warnings.length ? 'warning' : 'success'
          );
          return res;
        }
      } catch (e) {
        // Fall back to client-side smart balancer
      }

      // Client-Side Smart Workload-Balanced Auto-Assignment Engine
      const classes = activeSchool.classes || [];
      const subjects = activeSchool.subjects || [];
      const teachers = activeSchool.teachers || [];
      const workingDaysCount = activeSchool.workingDays?.length || 6;

      if (teachers.length === 0 || subjects.length === 0 || classes.length === 0) {
        showToast('Please configure classes, subjects, and teachers before auto-assigning.', 'warning');
        return null;
      }

      // Track teacher current weekly load
      const teacherLoadMap = new Map<string, number>();
      teachers.forEach(t => {
        teacherLoadMap.set(t.id, 0);
      });

      // Keep existing manual assignments if any
      const existingAssignments = activeSchool.assignments || [];
      const assignedPairKeys = new Set<string>();
      existingAssignments.forEach(a => {
        assignedPairKeys.add(`${a.classId}_${a.subjectId}`);
        const cur = teacherLoadMap.get(a.teacherId) || 0;
        const cls = classes.find(c => c.id === a.classId);
        const sub = subjects.find(s => s.id === a.subjectId);
        const freq = cls?.tier === 'Primary' ? (sub?.freqPrimary || 0) : (sub?.freqSenior || 0);
        teacherLoadMap.set(a.teacherId, cur + freq);
      });

      const newAssignments: TeachingAssignment[] = [...existingAssignments];
      let assignedCount = 0;

      // Iterate through classes and subjects
      classes.forEach(c => {
        subjects.forEach(s => {
          const pairKey = `${c.id}_${s.id}`;
          if (assignedPairKeys.has(pairKey)) return;

          const freq = c.tier === 'Primary' ? (s.freqPrimary || 0) : (s.freqSenior || 0);
          if (freq <= 0) return; // Not taught in this tier

          // Find qualified teachers who teach this subject
          const qualified = teachers.filter(t => t.subjects.includes(s.id));
          const candidatePool = qualified.length > 0 ? qualified : teachers;

          // Pick candidate with lowest load relative to their max capacity
          const sorted = [...candidatePool].sort((a, b) => {
            const loadA = teacherLoadMap.get(a.id) || 0;
            const loadB = teacherLoadMap.get(b.id) || 0;
            const maxA = (a.maxPerDay || 5) * workingDaysCount;
            const maxB = (b.maxPerDay || 5) * workingDaysCount;
            const ratioA = loadA / maxA;
            const ratioB = loadB / maxB;
            return ratioA - ratioB;
          });

          const chosen = sorted[0];
          if (chosen) {
            const newAssign: TeachingAssignment = {
              id: `assign-${c.id}-${s.id}-${Date.now().toString(36)}`,
              classId: c.id,
              subjectId: s.id,
              teacherId: chosen.id,
              className: c.name,
              subjectName: s.name,
              teacherName: chosen.name,
              weeklyFrequency: freq,
            };
            newAssignments.push(newAssign);
            assignedPairKeys.add(pairKey);
            const curLoad = teacherLoadMap.get(chosen.id) || 0;
            teacherLoadMap.set(chosen.id, curLoad + freq);
            assignedCount++;
          }
        });
      });

      updateActiveSchool(s => ({
        ...s,
        assignments: newAssignments,
      }));

      showToast(`⚡ Smart Auto-Assigned ${assignedCount} class-subject pairs with balanced workloads!`, 'success');
      return { suggestions: newAssignments, warnings: [] };
    } catch (err: any) {
      showToast(err?.message || 'Failed to auto-assign faculty', 'warning');
      return null;
    } finally {
      setIsSyncing(false);
    }
  };

  const addHoliday = async (data: { name: string; startDate: string; endDate: string; type?: string }) => {
    setIsSyncing(true);
    try {
      const res = await api.createHoliday(activeSchool.id, {
        name: data.name,
        start_date: data.startDate,
        end_date: data.endDate,
        holiday_type: data.type || 'school',
      });
      const mapped: Holiday = {
        id: res.id,
        name: res.name,
        startDate: res.start_date,
        endDate: res.end_date,
        type: (res.holiday_type as any) || 'school',
      };
      updateActiveSchool(s => ({
        ...s,
        holidays: [...(s.holidays || []), mapped],
      }));
      showToast(`Holiday "${data.name}" added to calendar.`, 'success');
    } catch (err: any) {
      showToast(err?.message || 'Failed to add holiday', 'warning');
    } finally {
      setIsSyncing(false);
    }
  };

  const deleteHoliday = async (holidayId: string) => {
    setIsSyncing(true);
    try {
      await api.deleteHoliday(activeSchool.id, holidayId);
      updateActiveSchool(s => ({
        ...s,
        holidays: (s.holidays || []).filter(h => h.id !== holidayId),
      }));
      showToast('Holiday removed from calendar.', 'info');
    } catch (err: any) {
      showToast(err?.message || 'Failed to delete holiday', 'warning');
    } finally {
      setIsSyncing(false);
    }
  };

  const addPinnedLesson = async (data: { classId: string; subjectId: string; teacherId: string; day: string; period: number }) => {
    setIsSyncing(true);
    try {
      const res = await api.createPinnedLesson(activeSchool.id, {
        class_id: data.classId,
        subject_id: data.subjectId,
        teacher_id: data.teacherId,
        day: data.day,
        period: data.period,
      });
      const mapped: PinnedLesson = {
        id: res.id,
        classId: res.class_id,
        subjectId: res.subject_id,
        teacherId: res.teacher_id,
        className: res.class_name || undefined,
        subjectName: res.subject_name || undefined,
        teacherName: res.teacher_name || undefined,
        day: res.day,
        period: res.period,
      };
      updateActiveSchool(s => ({
        ...s,
        pinnedLessons: [...(s.pinnedLessons || []), mapped],
      }));
      showToast(`Lesson pinned to ${data.day} Period ${data.period}.`, 'success');
    } catch (err: any) {
      showToast(err?.message || 'Failed to pin lesson (clash detected)', 'warning');
    } finally {
      setIsSyncing(false);
    }
  };

  const deletePinnedLesson = async (pinId: string) => {
    setIsSyncing(true);
    try {
      await api.deletePinnedLesson(activeSchool.id, pinId);
      updateActiveSchool(s => ({
        ...s,
        pinnedLessons: (s.pinnedLessons || []).filter(p => p.id !== pinId),
      }));
      showToast('Pinned lesson rule removed.', 'info');
    } catch (err: any) {
      showToast(err?.message || 'Failed to remove pinned lesson', 'warning');
    } finally {
      setIsSyncing(false);
    }
  };

  const addBlockedSlot = async (data: { scope?: string; scopeId?: string | null; day: string; period: number; label: string; onDate?: string | null }) => {
    setIsSyncing(true);
    try {
      const res = await api.createBlockedSlot(activeSchool.id, {
        scope: data.scope,
        scope_id: data.scopeId,
        day: data.day,
        period: data.period,
        label: data.label,
        on_date: data.onDate,
      });
      const mapped: BlockedSlot = {
        id: res.id,
        scope: res.scope as any,
        scopeId: res.scope_id || undefined,
        day: res.day,
        period: res.period,
        label: res.label,
        onDate: res.on_date || undefined,
      };
      updateActiveSchool(s => ({
        ...s,
        blockedSlots: [...(s.blockedSlots || []), mapped],
      }));
      showToast(`Blocked slot "${data.label}" saved.`, 'success');
    } catch (err: any) {
      showToast(err?.message || 'Failed to block slot', 'warning');
    } finally {
      setIsSyncing(false);
    }
  };

  const deleteBlockedSlot = async (slotId: string) => {
    setIsSyncing(true);
    try {
      await api.deleteBlockedSlot(activeSchool.id, slotId);
      updateActiveSchool(s => ({
        ...s,
        blockedSlots: (s.blockedSlots || []).filter(b => b.id !== slotId),
      }));
      showToast('Blocked slot removed.', 'info');
    } catch (err: any) {
      showToast(err?.message || 'Failed to remove blocked slot', 'warning');
    } finally {
      setIsSyncing(false);
    }
  };

  const addTeacher = async (name: string, subjectIds: string[], maxPerDay: number = 5) => {
    setIsSyncing(true);
    try {
      const res = await api.addTeacher(activeSchool.id, {
        name,
        max_periods_per_day: maxPerDay,
        subject_ids: subjectIds,
      });
      const newTeacher: Teacher = {
        id: res.id,
        name: res.name,
        subjects: res.subject_ids || subjectIds,
        maxPerDay: res.max_periods_per_day || maxPerDay,
        unavailableDays: res.unavailable_days || [],
      };
      updateActiveSchool(s => ({
        ...s,
        teachers: [...s.teachers, newTeacher],
      }));
      showToast(`Teacher "${name}" saved to database.`, 'success');
      return newTeacher;
    } catch (err: any) {
      showToast(err?.message || 'Failed to add teacher', 'warning');
      return null;
    } finally {
      setIsSyncing(false);
    }
  };

  const deleteTeacher = async (teacherId: string) => {
    if (activeSchool.teachers.length <= 1) {
      showToast('At least one faculty teacher must remain.', 'warning');
      return;
    }
    setIsSyncing(true);
    try {
      await api.deleteTeacher(activeSchool.id, teacherId);
      updateActiveSchool(s => ({
        ...s,
        teachers: s.teachers.filter(t => t.id !== teacherId),
      }));
      showToast('Teacher removed from database.', 'info');
    } catch (err: any) {
      showToast(err?.message || 'Failed to delete teacher', 'warning');
    } finally {
      setIsSyncing(false);
    }
  };

  const addSubject = async (data: { name: string; code: string; type: 'academic' | 'activity'; freqPrimary: number; freqSenior: number; color?: string; room?: string }) => {
    setIsSyncing(true);
    try {
      const res = await api.addSubject(activeSchool.id, {
        name: data.name,
        code: data.code,
        type: data.type,
      });
      const newSub: Subject = {
        id: res.id,
        name: res.name,
        code: res.code,
        type: res.type as any,
        freqPrimary: data.freqPrimary,
        freqSenior: data.freqSenior,
        color: data.color || 'bg-indigo-50 border-indigo-200 text-indigo-900',
        room: data.room || undefined,
      };
      updateActiveSchool(s => ({
        ...s,
        subjects: [...s.subjects, newSub],
      }));
      showToast(`Subject "${data.name}" saved to database.`, 'success');
      return newSub;
    } catch (err: any) {
      showToast(err?.message || 'Failed to add subject', 'warning');
      return null;
    } finally {
      setIsSyncing(false);
    }
  };

  const deleteSubject = async (subjectId: string) => {
    if (activeSchool.subjects.length <= 1) {
      showToast('At least one subject must remain.', 'warning');
      return;
    }
    setIsSyncing(true);
    try {
      await api.deleteSubject(activeSchool.id, subjectId);
      updateActiveSchool(s => ({
        ...s,
        subjects: s.subjects.filter(sub => sub.id !== subjectId),
      }));
      showToast('Subject removed from database.', 'info');
    } catch (err: any) {
      showToast(err?.message || 'Failed to delete subject', 'warning');
    } finally {
      setIsSyncing(false);
    }
  };

  const addClass = async (data: { name: string; grade: string; tier: Tier; room: string }) => {
    setIsSyncing(true);
    try {
      const full = await api.getFullSchool(activeSchool.id);
      const grades = full?.grades || [];
      const matchGrade = grades.find((g: any) => g.name === data.grade) || grades[0];
      const res = await api.addClassSection(activeSchool.id, {
        section: data.name,
        grade_id: matchGrade ? matchGrade.id : activeSchool.id,
      });
      const newClass: ClassSection = {
        id: res.id,
        name: res.section || data.name,
        grade: data.grade,
        tier: data.tier,
        room: data.room,
      };
      updateActiveSchool(s => {
        const existingRooms = s.rooms || [];
        const roomName = (data.room || `Room ${data.name}`).trim();
        const roomExists = existingRooms.some(r => r.name.toLowerCase() === roomName.toLowerCase());
        const updatedRooms = roomExists
          ? existingRooms.map(r =>
              r.name.toLowerCase() === roomName.toLowerCase()
                ? { ...r, homeroomForClassId: newClass.id, homeroomForClassName: newClass.name }
                : r
            )
          : [
              ...existingRooms,
              {
                id: `r-${Date.now()}`,
                name: roomName,
                type: 'classroom',
                capacity: 35,
                homeroomForClassId: newClass.id,
                homeroomForClassName: newClass.name,
              },
            ];

        return {
          ...s,
          classes: [...s.classes, newClass],
          rooms: updatedRooms,
        };
      });
      showToast(`Class "${data.name}" saved and homeroom registered.`, 'success');
      return newClass;
    } catch (err: any) {
      showToast(err?.message || 'Failed to add class', 'warning');
      return null;
    } finally {
      setIsSyncing(false);
    }
  };

  const addClassesBatch = async (
    newClassesList: Array<{ name: string; grade: string; tier: Tier; room: string }>,
    replaceExisting: boolean = false
  ) => {
    setIsSyncing(true);
    try {
      const generatedSections: ClassSection[] = newClassesList.map((item, idx) => ({
        id: `c-gen-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
        name: item.name,
        grade: item.grade,
        tier: item.tier,
        room: item.room,
      }));

      updateActiveSchool(s => {
        const baseClasses = replaceExisting ? [] : s.classes;
        const mergedClasses = [...baseClasses, ...generatedSections];

        // Maintain rooms: for every new class section, ensure its room exists in s.rooms
        const existingRooms = replaceExisting
          ? (s.rooms || []).filter(r => r.type !== 'classroom')
          : [...(s.rooms || [])];
        const roomMap = new Map<string, Room>();
        for (const r of existingRooms) {
          roomMap.set(r.name.toLowerCase().trim(), { ...r });
        }

        generatedSections.forEach(cls => {
          const roomKey = cls.room.toLowerCase().trim();
          if (!roomMap.has(roomKey)) {
            roomMap.set(roomKey, {
              id: `r-gen-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
              name: cls.room.trim(),
              type: 'classroom',
              capacity: 35,
              homeroomForClassId: cls.id,
              homeroomForClassName: cls.name,
            });
          } else {
            const existing = roomMap.get(roomKey)!;
            roomMap.set(roomKey, {
              ...existing,
              homeroomForClassId: cls.id,
              homeroomForClassName: cls.name,
            });
          }
        });

        return {
          ...s,
          classes: mergedClasses,
          rooms: Array.from(roomMap.values()),
        };
      });

      showToast(
        `Successfully ${replaceExisting ? 'configured' : 'added'} ${generatedSections.length} classes and registered homerooms!`,
        'success'
      );
      return generatedSections;
    } catch (err: any) {
      showToast(err?.message || 'Failed to batch generate classes', 'warning');
      return [];
    } finally {
      setIsSyncing(false);
    }
  };

  const deleteClass = async (classId: string) => {
    if (activeSchool.classes.length <= 1) {
      showToast('At least one class section must remain.', 'warning');
      return;
    }
    setIsSyncing(true);
    try {
      await api.deleteClassSection(activeSchool.id, classId);
      updateActiveSchool(s => ({
        ...s,
        classes: s.classes.filter(c => c.id !== classId),
        rooms: (s.rooms || []).map(r =>
          r.homeroomForClassId === classId
            ? { ...r, homeroomForClassId: null, homeroomForClassName: null }
            : r
        ),
      }));
      showToast('Class section removed.', 'info');
    } catch (err: any) {
      showToast(err?.message || 'Failed to delete class', 'warning');
    } finally {
      setIsSyncing(false);
    }
  };

  const addRoom = async (data: { name: string; type: string; capacity: number; homeroomForClassId?: string }) => {
    setIsSyncing(true);
    try {
      let resId = `r-${Date.now()}`;
      try {
        const res = await api.addRoom(activeSchool.id, {
          name: data.name,
          type: data.type,
          capacity: data.capacity,
        });
        if (res && res.id) resId = res.id;
      } catch {
        // Fallback for offline mode
      }

      const matchingClass = data.homeroomForClassId ? activeSchool.classes.find(c => c.id === data.homeroomForClassId) : null;
      const newRoom: Room = {
        id: resId,
        name: data.name,
        type: data.type,
        capacity: data.capacity,
        homeroomForClassId: data.homeroomForClassId || null,
        homeroomForClassName: matchingClass?.name || null,
      };

      updateActiveSchool(s => {
        const existingRooms = s.rooms || [];
        const updatedClasses = data.homeroomForClassId
          ? s.classes.map(c => c.id === data.homeroomForClassId ? { ...c, room: data.name } : c)
          : s.classes;
        return {
          ...s,
          rooms: [...existingRooms, newRoom],
          classes: updatedClasses,
        };
      });

      showToast(`Facility "${data.name}" added successfully.`, 'success');
      return newRoom;
    } catch (err: any) {
      showToast(err?.message || 'Failed to add facility', 'warning');
      return null;
    } finally {
      setIsSyncing(false);
    }
  };

  const updateRoom = async (roomId: string, data: { name: string; type: string; capacity: number; homeroomForClassId?: string }) => {
    setIsSyncing(true);
    try {
      try {
        await api.updateRoom(activeSchool.id, roomId, {
          name: data.name,
          type: data.type,
          capacity: data.capacity,
        });
      } catch {
        // Fallback for offline mode
      }

      const matchingClass = data.homeroomForClassId ? activeSchool.classes.find(c => c.id === data.homeroomForClassId) : null;

      updateActiveSchool(s => {
        const existingRooms = s.rooms || [];
        const updatedRooms = existingRooms.map(r => {
          if (r.id !== roomId) return r;
          return {
            ...r,
            name: data.name,
            type: data.type,
            capacity: data.capacity,
            homeroomForClassId: data.homeroomForClassId || null,
            homeroomForClassName: matchingClass?.name || null,
          };
        });

        const updatedClasses = s.classes.map(c => {
          if (data.homeroomForClassId && c.id === data.homeroomForClassId) {
            return { ...c, room: data.name };
          }
          return c;
        });

        return {
          ...s,
          rooms: updatedRooms,
          classes: updatedClasses,
        };
      });

      showToast(`Facility "${data.name}" updated successfully.`, 'success');
    } catch (err: any) {
      showToast(err?.message || 'Failed to update facility', 'warning');
    } finally {
      setIsSyncing(false);
    }
  };

  const deleteRoom = async (roomId: string) => {
    setIsSyncing(true);
    try {
      try {
        await api.deleteRoom(activeSchool.id, roomId);
      } catch {
        // Fallback for offline mode
      }

      updateActiveSchool(s => {
        const existingRooms = s.rooms || [];
        return {
          ...s,
          rooms: existingRooms.filter(r => r.id !== roomId),
        };
      });

      showToast('Facility removed.', 'info');
    } catch (err: any) {
      showToast(err?.message || 'Failed to delete facility', 'warning');
    } finally {
      setIsSyncing(false);
    }
  };

  const approveVersion = async (versionId: string) => {
    setIsSyncing(true);
    try {
      const res = await api.approveVersion(activeSchool.id, versionId);
      updateActiveSchool(s => ({
        ...s,
        versions: (s.versions || []).map(v =>
          v.id === versionId ? { ...v, state: 'approved' as const } : v
        ),
      }));
      showToast(`Timetable Version v${res.version_number} approved!`, 'success');
    } catch (err: any) {
      showToast(err?.message || 'Failed to approve version', 'warning');
    } finally {
      setIsSyncing(false);
    }
  };

  const publishVersion = async (versionId: string, effectiveFrom?: string) => {
    setIsSyncing(true);
    try {
      const res = await api.publishVersion(activeSchool.id, versionId, effectiveFrom);
      updateActiveSchool(s => ({
        ...s,
        published: true,
        versions: (s.versions || []).map(v =>
          v.id === versionId
            ? { ...v, state: 'published' as const, publishedAt: res.published_at || new Date().toISOString(), effectiveFrom: res.effective_from || undefined }
            : v
        ),
      }));
      showToast(`Timetable Version v${res.version_number} published to portals!`, 'success');
    } catch (err: any) {
      showToast(err?.message || 'Failed to publish version', 'warning');
    } finally {
      setIsSyncing(false);
    }
  };

  const rollbackVersion = async (versionId: string) => {
    setIsSyncing(true);
    try {
      const res = await api.rollbackVersion(activeSchool.id, versionId);
      const apiEntries = await api.getTimetable(activeSchool.id);
      const entryMap: EntryMap = {};
      apiEntries.forEach(e => {
        entryMap[slotKey(e.day, e.period, e.class_id)] = mapApiEntry(e);
      });
      setSchedulesBySchool(prev => ({
        ...prev,
        [activeSchool.id]: { entries: entryMap, diagnostics: [] },
      }));
      const versions = await api.listVersions(activeSchool.id);
      updateActiveSchool(s => ({
        ...s,
        versions: versions.map(v => ({
          id: v.id,
          versionNumber: v.version_number,
          state: v.state,
          effectiveFrom: v.effective_from || undefined,
          publishedAt: v.published_at || undefined,
          notes: v.notes || undefined,
          entryCount: v.entry_count,
          createdAt: v.created_at,
        })),
      }));
      showToast(`Rolled back to Version v${res.version_number}. Active timetable updated.`, 'success');
    } catch (err: any) {
      showToast(err?.message || 'Failed to rollback version', 'warning');
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

    if (template === 'greenwood_issues') {
      newSchool = {
        ...createGreenwoodIssuesSchool(),
        id,
        name: name || 'Greenwood Public School (Dataset 2 — Issues Testbed)',
        subdomain,
        term,
        timezone,
      };
    } else if (template === 'starter') {
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
      template === 'greenwood_issues'
        ? `"${name}" loaded with 55 Sections, 99 Staff, and real-world issues for testing!`
        : template === 'starter'
        ? `"${name}" launched with starter curriculum & conflict-free timetable!`
        : `"${name}" created with blank slate! Configure in Setup or upload CSV.`,
      'success'
    );
  };

  const loadTestDataset2 = () => {
    const dataset2School = createGreenwoodIssuesSchool();
    setSchools(prev => {
      const filtered = prev.filter(s => s.id !== dataset2School.id);
      return [...filtered, dataset2School];
    });
    setActiveSchoolId(dataset2School.id);
    const schedule = generateSchoolTimetable(dataset2School);
    setSchedulesBySchool(prev => ({ ...prev, [dataset2School.id]: schedule }));
    setAdminTab('setup');
    setWizardStep(10);
    showToast('🧪 Loaded Test Dataset 2: Greenwood Public School with 23 real-world issues!', 'info');
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
    schools, activeSchool, activeRole, currentUser, isAuthModalOpen, adminTab, wizardStep, timetableViewMode,
    selectedClass, selectedTeacher, currentSchedule, entries,
    subjectMap, teacherMap, classMap, sortedClasses, sortedTeachers,
    editingSlot, overrideSubjectId, overrideTeacherId, overrideConflicts, toast, showToast, isSyncing,
    solverPreferences,
    // setters
    setActiveSchoolId, setAdminTab, setWizardStep, setTimetableViewMode, setIsAuthModalOpen,
    setSelectedClassId: handleSetSelectedClassId, setSelectedTeacherId: handleSetSelectedTeacherId,
    setEditingSlot, setOverrideSubjectId, setOverrideTeacherId,
    setSolverPreferences, toggleSolverPreference,
    // auth
    login, logout, switchRole,
    // actions
    updateActiveSchool, runSolver, resetDemoData, addSchool, deleteSchool, togglePublish, exportCsv, exportExcel, exportPrintPdf,
    loadTestDataset2,
    getCandidates, assignSubstitute, autoAssign, addAbsence, removeAbsence, toggleTeacherUnavailable,
    openManualOverride, saveManualOverride,
    upsertAssignment, deleteAssignment, suggestAssignments,
    addTeacher, deleteTeacher,
    addSubject, deleteSubject,
    addClass, addClassesBatch, deleteClass,
    addRoom, updateRoom, deleteRoom,
    addHoliday, deleteHoliday,
    addPinnedLesson, deletePinnedLesson,
    addBlockedSlot, deleteBlockedSlot,
    approveVersion, publishVersion, rollbackVersion,
  };
}

export type TimetableApp = ReturnType<typeof useTimetableApp>;
