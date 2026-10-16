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
} from '../domain/types';
import { slotKey } from '../domain/types';
import { INITIAL_SCHOOLS } from '../data/demoSchools';
import { generateSchoolTimetable } from '../engine/generateTimetable';
import { autoAssignSubstitutes, getSubstituteCandidatesForSlot } from '../engine/substitutes';
import { checkManualOverrideConflict } from '../engine/conflicts';
import { exportTimetableCsv, exportTimetableExcel, exportTimetablePrint } from '../services/exportFormats';
import { api, type ApiEntryOut } from '../services/api';
import { useToast } from './useToast';

export function useTimetableApp() {
  const [schools, setSchools] = useState<School[]>(INITIAL_SCHOOLS);
  const [activeSchoolId, setActiveSchoolId] = useState('school-1');
  const [activeRole, setActiveRole] = useState<Role>('admin');
  const [adminTab, setAdminTab] = useState<AdminTab>('timetable');
  const [selectedClassId, setSelectedClassId] = useState('c-4a');
  const [selectedTeacherId, setSelectedTeacherId] = useState('t-1');
  const [timetableViewMode, setTimetableViewMode] = useState<ViewMode>('class');
  const [editingSlot, setEditingSlot] = useState<EditingSlot | null>(null);
  const [overrideSubjectId, setOverrideSubjectId] = useState('');
  const [overrideTeacherId, setOverrideTeacherId] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast, showToast } = useToast();

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

  // Load timetable from backend API on mount / school switch
  useEffect(() => {
    let isCancelled = false;

    async function loadFromApi() {
      try {
        setIsSyncing(true);
        const apiEntries = await api.getTimetable(activeSchool.id);
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
      } catch {
        // Backend not yet populated or offline; keep fallback local schedule
      } finally {
        if (!isCancelled) setIsSyncing(false);
      }
    }

    loadFromApi();
    return () => { isCancelled = true; };
  }, [activeSchool.id]);

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
  const runSolver = async () => {
    setIsSyncing(true);
    try {
      // 1. Try server-side solver first (Phase 2 API)
      const res = await api.generateTimetable(activeSchool.id);
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
    schools, activeSchool, activeRole, adminTab, timetableViewMode,
    selectedClass, selectedTeacher, currentSchedule, entries,
    subjectMap, teacherMap, classMap,
    editingSlot, overrideSubjectId, overrideTeacherId, overrideConflicts, toast, showToast, isSyncing,
    // setters
    setActiveSchoolId, setActiveRole, setAdminTab, setTimetableViewMode,
    setSelectedClassId, setSelectedTeacherId, setEditingSlot, setOverrideSubjectId, setOverrideTeacherId,
    // actions
    updateActiveSchool, runSolver, resetDemoData, togglePublish, exportCsv, exportExcel, exportPrintPdf,
    getCandidates, assignSubstitute, autoAssign, addAbsence, removeAbsence, toggleTeacherUnavailable,
    openManualOverride, saveManualOverride,
  };
}

export type TimetableApp = ReturnType<typeof useTimetableApp>;
