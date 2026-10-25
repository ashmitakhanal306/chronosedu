import {
  BookOpen,
  Layers,
  Upload,
  FileSpreadsheet,
  Trash2,
  Plus,
  Minus,
  Users,
  DoorOpen,
  Sparkles,
  Check,
  AlertCircle,
  Clock,
  Calendar,
  Coffee,
  Utensils,
  Sun,
  Building2,
  Globe,
  Palette,
  FlaskConical,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Search,
  Pencil,
  X,
  Zap,
  GraduationCap,
  CalendarRange,
} from 'lucide-react';
import { useState, useMemo } from 'react';
import {
  DEFAULT_TIMING_CONFIG,
  SUBJECT_PALETTE,
  type School,
  type SchoolRules,
  type Tier,
  type TimingConfig,
  type Room,
  type Subject,
  type Teacher,
} from '../../domain/types';
import { computeBellSchedule } from '../../engine/bellSchedule';
import { BulkImportModal } from './BulkImportModal';
import { BatchClassGeneratorModal } from './BatchClassGeneratorModal';
import { BatchStaffGeneratorModal } from './BatchStaffGeneratorModal';
import { NewSchoolModal } from '../../components/layout/NewSchoolModal';
import { TeacherAssignmentsCard } from './TeacherAssignmentsCard';
import { SpecialRulesCard } from './SpecialRulesCard';
import { HolidayCalendarCard } from './HolidayCalendarCard';
import { Step10FeasibilityAudit } from './Step10FeasibilityAudit';
import type { TimetableApp } from '../../hooks/useTimetableApp';
import { sortClasses, sortRooms, sortTeachers } from '../../utils/sorting';

interface Props {
  school: School;
  updateSchool: (updater: (s: School) => School) => void;
  onRunSolver: () => void;
  app?: TimetableApp;
}

export function AdminSetupPanel({ school, updateSchool, onRunSolver, app }: Props) {
  const [localStep, setLocalStep] = useState(8);
  const currentStep = app?.wizardStep ?? localStep;
  const setStep = (step: number) => {
    if (app?.setWizardStep) {
      app.setWizardStep(step);
    }
    setLocalStep(step);
  };

  // Natural sorted entities for visual excellence and logical educational ordering
  const sortedClasses = useMemo(() => sortClasses(school.classes), [school.classes]);
  const sortedHomerooms = useMemo(() => sortRooms(school.classes), [school.classes]);
  const sortedTeachers = useMemo(() => sortTeachers(school.teachers), [school.teachers]);

  // Step 4: Facility & Room Management State
  const [step4Filter, setStep4Filter] = useState<'all' | 'classroom' | 'lab' | 'computer_lab' | 'specialist'>('all');
  const [step4Search, setStep4Search] = useState('');
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);
  const [editRoomName, setEditRoomName] = useState('');
  const [editRoomType, setEditRoomType] = useState('classroom');
  const [editRoomCapacity, setEditRoomCapacity] = useState(35);
  const [editRoomHomeroomClassId, setEditRoomHomeroomClassId] = useState('');

  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomType, setNewRoomType] = useState('classroom');
  const [newRoomCapacity, setNewRoomCapacity] = useState(35);
  const [newRoomHomeroomClassId, setNewRoomHomeroomClassId] = useState('');

  const allRooms: Room[] = useMemo(() => {
    const list: Room[] = school.rooms && school.rooms.length > 0 ? [...school.rooms] : [];
    const roomNameMap = new Map<string, Room>();
    list.forEach(r => roomNameMap.set(r.name.toLowerCase().trim(), r));

    // Automatically incorporate every homeroom assigned in Step 3
    (school.classes || []).forEach(c => {
      const roomName = (c.room || `Room ${c.name}`).trim();
      const existing = roomNameMap.get(roomName.toLowerCase());
      if (existing) {
        if (!existing.homeroomForClassId) {
          existing.homeroomForClassId = c.id;
          existing.homeroomForClassName = c.name;
        }
      } else {
        const autoRoom: Room = {
          id: `r-class-${c.id}`,
          name: roomName,
          type: 'classroom',
          capacity: 35,
          homeroomForClassId: c.id,
          homeroomForClassName: c.name,
        };
        list.push(autoRoom);
        roomNameMap.set(roomName.toLowerCase(), autoRoom);
      }
    });

    // Ensure standard specialist facilities are present if not already created
    const defaultSpecialist: Room[] = [
      { id: 'r-science-lab', name: 'Science Lab', type: 'lab', capacity: 40 },
      { id: 'r-computer-lab', name: 'Computer Lab', type: 'computer_lab', capacity: 36 },
      { id: 'r-sports-ground', name: 'Sports Ground', type: 'sports', capacity: 80 },
    ];
    defaultSpecialist.forEach(spec => {
      if (!roomNameMap.has(spec.name.toLowerCase())) {
        list.push(spec);
        roomNameMap.set(spec.name.toLowerCase(), spec);
      }
    });

    return list;
  }, [school.rooms, school.classes]);

  const sortedAllRooms = useMemo(() => sortRooms(allRooms), [allRooms]);

  const filteredRooms = useMemo(() => {
    return sortedAllRooms.filter(r => {
      if (step4Filter === 'classroom' && r.type !== 'classroom') return false;
      if (step4Filter === 'lab' && r.type !== 'lab') return false;
      if (step4Filter === 'computer_lab' && r.type !== 'computer_lab') return false;
      if (step4Filter === 'specialist' && r.type === 'classroom') return false;

      if (step4Search.trim()) {
        const q = step4Search.toLowerCase().trim();
        const matchesName = (r.name || '').toLowerCase().includes(q);
        const matchesClass = (r.homeroomForClassName || '').toLowerCase().includes(q);
        const matchesType = (r.type || '').toLowerCase().includes(q);
        return matchesName || matchesClass || matchesType;
      }
      return true;
    });
  }, [sortedAllRooms, step4Filter, step4Search]);

  const handleAddRoom = async () => {
    if (!newRoomName.trim()) return;
    const name = newRoomName.trim();
    const type = newRoomType;
    const capacity = Number(newRoomCapacity) || 35;
    const homeroomClassId = newRoomHomeroomClassId || undefined;

    if (app?.addRoom) {
      await app.addRoom({ name, type, capacity, homeroomForClassId: homeroomClassId });
    } else {
      const matchingClass = homeroomClassId ? school.classes.find(c => c.id === homeroomClassId) : null;
      const newR: Room = {
        id: `r-${Date.now()}`,
        name,
        type,
        capacity,
        homeroomForClassId: homeroomClassId || null,
        homeroomForClassName: matchingClass?.name || null,
      };
      updateSchool(s => ({
        ...s,
        rooms: [...(s.rooms || allRooms), newR],
        classes: homeroomClassId ? s.classes.map(c => c.id === homeroomClassId ? { ...c, room: name } : c) : s.classes,
      }));
    }
    setNewRoomName('');
    setNewRoomHomeroomClassId('');
  };

  const handleStartEditRoom = (room: Room) => {
    setEditingRoomId(room.id);
    setEditRoomName(room.name);
    setEditRoomType(room.type);
    setEditRoomCapacity(room.capacity || 35);
    setEditRoomHomeroomClassId(room.homeroomForClassId || '');
  };

  const handleSaveEditRoom = async () => {
    if (!editingRoomId || !editRoomName.trim()) return;
    const name = editRoomName.trim();
    const type = editRoomType;
    const capacity = Number(editRoomCapacity) || 35;
    const homeroomClassId = editRoomHomeroomClassId || undefined;

    if (app?.updateRoom) {
      await app.updateRoom(editingRoomId, { name, type, capacity, homeroomForClassId: homeroomClassId });
    } else {
      const matchingClass = homeroomClassId ? school.classes.find(c => c.id === homeroomClassId) : null;
      updateSchool(s => {
        const currentList = s.rooms || allRooms;
        return {
          ...s,
          rooms: currentList.map(r => r.id === editingRoomId ? {
            ...r,
            name,
            type,
            capacity,
            homeroomForClassId: homeroomClassId || null,
            homeroomForClassName: matchingClass?.name || null,
          } : r),
          classes: homeroomClassId ? s.classes.map(c => c.id === homeroomClassId ? { ...c, room: name } : c) : s.classes,
        };
      });
    }
    setEditingRoomId(null);
  };

  const handleDeleteRoom = async (room: Room) => {
    if (allRooms.length <= 1) {
      alert('At least one room or facility must remain in the school.');
      return;
    }
    if (room.homeroomForClassName) {
      const confirmMsg = `"${room.name}" is currently the dedicated homeroom for Class ${room.homeroomForClassName}. Are you sure you want to delete this room?`;
      if (!confirm(confirmMsg)) return;
    } else {
      if (!confirm(`Delete facility "${room.name}"?`)) return;
    }

    if (app?.deleteRoom) {
      await app.deleteRoom(room.id);
    } else {
      updateSchool(s => ({
        ...s,
        rooms: (s.rooms || allRooms).filter(r => r.id !== room.id),
      }));
    }
  };

  // Class creation state
  const [newClassName, setNewClassName] = useState('');
  const [newClassGrade, setNewClassGrade] = useState('Grade 6');
  const [newClassTier, setNewClassTier] = useState<Tier>('Primary');
  const [newClassRoom, setNewClassRoom] = useState('');
  const [step3Search, setStep3Search] = useState('');
  const [step3WingFilter, setStep3WingFilter] = useState<'all' | 'pre_primary' | 'primary' | 'middle' | 'secondary' | 'senior'>('all');
  const [step7Search, setStep7Search] = useState('');
  const [step7Filter, setStep7Filter] = useState<'all' | 'pgt' | 'tgt' | 'prt' | 'ntt' | 'specialist' | 'near_cap' | 'leave'>('all');
  const [step5Filter, setStep5Filter] = useState<'all' | 'academic' | 'activity' | 'lab'>('all');
  const [step5Search, setStep5Search] = useState('');
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);
  const [newTeacherDesignation, setNewTeacherDesignation] = useState('TGT');
  const [newTeacherWings, setNewTeacherWings] = useState('Middle');
  const [newTeacherWorkingDays, setNewTeacherWorkingDays] = useState('Mon-Sat');
  const [newTeacherMaxPerWeek, setNewTeacherMaxPerWeek] = useState<number>(30);
  const [isBatchClassModalOpen, setIsBatchClassModalOpen] = useState(false);
  const [isBatchStaffModalOpen, setIsBatchStaffModalOpen] = useState(false);

  const handleGenerateBatchStaff = async (newTeachers: Teacher[], replaceExisting: boolean) => {
    updateSchool(s => ({
      ...s,
      teachers: replaceExisting ? newTeachers : [...s.teachers, ...newTeachers],
    }));
  };

  // Live faculty assigned workload calculation for Step 7 (consistent with Step 8)
  const step7TeacherWorkloads = useMemo(() => {
    const loads: Record<string, { assigned: number; max: number; pct: number; overloaded: boolean }> = {};
    school.teachers.forEach(t => {
      loads[t.id] = {
        assigned: 0,
        max: t.maxPerWeek || 30,
        pct: 0,
        overloaded: false,
      };
    });

    const entries = app?.currentSchedule?.entries || {};
    const entriesList = Object.values(entries);
    if (entriesList.length > 0) {
      entriesList.forEach(entry => {
        if (loads[entry.teacherId]) {
          loads[entry.teacherId].assigned += 1;
        }
      });
    } else {
      (school.assignments || []).forEach(a => {
        if (!loads[a.teacherId]) return;
        if (typeof a.teacherWeeklyLoad === 'number' && a.teacherWeeklyLoad > 0) {
          loads[a.teacherId].assigned = a.teacherWeeklyLoad;
          return;
        }
        const cls = school.classes.find(c => c.id === a.classId);
        const sub = school.subjects.find(s => s.id === a.subjectId);
        if (!cls || !sub) return;
        const freq = a.weeklyFrequency ?? (cls.tier === 'Primary' ? (sub.freqPrimary || 0) : (sub.freqSenior || 0));
        loads[a.teacherId].assigned += freq;
      });
    }

    Object.keys(loads).forEach(tid => {
      const item = loads[tid];
      item.pct = Math.round((item.assigned / item.max) * 100);
      item.overloaded = item.assigned > item.max;
    });

    return loads;
  }, [school.teachers, school.assignments, school.classes, school.subjects, app?.currentSchedule?.entries]);

  const filteredStep3Classes = useMemo(() => {
    return sortedClasses.filter(c => {
      if (step3WingFilter !== 'all') {
        const wing = (c.wing || '').toLowerCase();
        const n = (c.name + ' ' + c.grade).toLowerCase();
        if (step3WingFilter === 'pre_primary') {
          if (!wing.includes('pre-primary') && !n.includes('nur') && !n.includes('lkg') && !n.includes('ukg') && !n.includes('kg')) return false;
        } else if (step3WingFilter === 'primary') {
          if (!wing.includes('primary') || wing.includes('pre')) {
            const m = n.match(/\b([1-5])\b/);
            if (!m) return false;
          }
        } else if (step3WingFilter === 'middle') {
          if (!wing.includes('middle')) {
            const m = n.match(/\b([6-8])\b/);
            if (!m) return false;
          }
        } else if (step3WingFilter === 'secondary') {
          if (!wing.includes('secondary') || wing.includes('senior')) {
            const m = n.match(/\b(9|10)\b/);
            if (!m) return false;
          }
        } else if (step3WingFilter === 'senior') {
          if (!wing.includes('senior')) {
            const m = n.match(/\b(11|12)\b/);
            if (!m) return false;
          }
        }
      }

      if (!step3Search.trim()) return true;
      const q = step3Search.toLowerCase().trim();
      return (
        c.name.toLowerCase().includes(q) ||
        c.grade.toLowerCase().includes(q) ||
        (c.room && c.room.toLowerCase().includes(q)) ||
        (c.classTeacherName && c.classTeacherName.toLowerCase().includes(q)) ||
        (c.stream && c.stream.toLowerCase().includes(q))
      );
    });
  }, [sortedClasses, step3WingFilter, step3Search]);

  const resolveTeacherDesignation = (t: Teacher): string => {
    if (t.designation && t.designation.trim()) return t.designation.trim();

    // Collect all subject names, codes, and IDs for this teacher
    const subjectTexts: string[] = [];
    (t.subjects || []).forEach(sid => {
      subjectTexts.push(sid.toLowerCase());
      const found = school.subjects.find(
        s => s.id === sid || s.code.toLowerCase() === sid.toLowerCase() || s.name.toLowerCase() === sid.toLowerCase()
      );
      if (found) {
        subjectTexts.push(found.name.toLowerCase());
        subjectTexts.push(found.code.toLowerCase());
        if (found.category) subjectTexts.push(found.category.toLowerCase());
      }
    });

    const wings = (t.teachingWings || '').toLowerCase();
    const joined = subjectTexts.join(' ');

    if (
      wings.includes('senior') ||
      joined.includes('physic') ||
      joined.includes('chemist') ||
      joined.includes('biolog') ||
      joined.includes('account') ||
      joined.includes('business') ||
      joined.includes('economic') ||
      joined.includes('politic') ||
      joined.includes('histor') ||
      joined.includes('psycholog') ||
      joined.includes('sociolog') ||
      joined.includes('computer') ||
      joined.includes('phy') ||
      joined.includes('che') ||
      joined.includes('bio') ||
      joined.includes('acc') ||
      joined.includes('bst') ||
      joined.includes('eco')
    ) {
      return 'PGT';
    }

    if (
      joined.includes('physical') ||
      joined.includes('sport') ||
      joined.includes('game') ||
      joined.includes('art') ||
      joined.includes('music') ||
      joined.includes('dance') ||
      joined.includes('yoga') ||
      joined.includes('library') ||
      joined.includes('counsel') ||
      joined.includes('activity')
    ) {
      return 'Specialist';
    }

    if (wings.includes('pre') || (t.classTeacherOf && (t.classTeacherOf.includes('NUR') || t.classTeacherOf.includes('KG') || t.classTeacherOf.includes('LKG') || t.classTeacherOf.includes('UKG')))) {
      return 'NTT';
    }

    if (wings.includes('primary') || (t.classTeacherOf && Boolean(t.classTeacherOf.match(/\b[1-5]\b/)))) {
      return 'PRT';
    }

    // Check teacher assignments to see if they teach high school vs primary
    const assignedClasses = (school.assignments || [])
      .filter(a => a.teacherId === t.id)
      .map(a => school.classes.find(c => c.id === a.classId))
      .filter(Boolean);

    if (assignedClasses.some(c => c?.tier === 'Senior' && Boolean(c?.grade?.match(/\b(11|12)\b/)))) {
      return 'PGT';
    }
    if (assignedClasses.length > 0 && assignedClasses.every(c => c?.tier === 'Primary')) {
      return 'PRT';
    }

    return 'TGT';
  };

  const step3WingCounts = useMemo(() => {
    const list = school.classes;
    return {
      all: list.length,
      pre_primary: list.filter(c => {
        const wing = (c.wing || '').toLowerCase();
        const n = (c.name + ' ' + c.grade).toLowerCase();
        return wing.includes('pre-primary') || n.includes('nur') || n.includes('lkg') || n.includes('ukg') || n.includes('kg');
      }).length,
      primary: list.filter(c => {
        const wing = (c.wing || '').toLowerCase();
        const n = (c.name + ' ' + c.grade).toLowerCase();
        return (wing.includes('primary') && !wing.includes('pre')) || Boolean(n.match(/\b([1-5])\b/));
      }).length,
      middle: list.filter(c => {
        const wing = (c.wing || '').toLowerCase();
        const n = (c.name + ' ' + c.grade).toLowerCase();
        return wing.includes('middle') || Boolean(n.match(/\b([6-8])\b/));
      }).length,
      secondary: list.filter(c => {
        const wing = (c.wing || '').toLowerCase();
        const n = (c.name + ' ' + c.grade).toLowerCase();
        return (wing.includes('secondary') && !wing.includes('senior')) || Boolean(n.match(/\b(9|10)\b/));
      }).length,
      senior: list.filter(c => {
        const wing = (c.wing || '').toLowerCase();
        const n = (c.name + ' ' + c.grade).toLowerCase();
        return wing.includes('senior') || Boolean(n.match(/\b(11|12)\b/));
      }).length,
    };
  }, [school.classes]);

  const filteredStep7Teachers = useMemo(() => {
    return sortedTeachers.filter(t => {
      const desig = resolveTeacherDesignation(t).toUpperCase();
      if (step7Filter === 'pgt' && desig !== 'PGT') return false;
      if (step7Filter === 'tgt' && desig !== 'TGT') return false;
      if (step7Filter === 'prt' && desig !== 'PRT') return false;
      if (step7Filter === 'ntt' && desig !== 'NTT') return false;
      if (step7Filter === 'specialist' && !['SPECIALIST', 'ACTIVITY', 'LIBRARIAN', 'COUNSELOR', 'PHYSICAL'].some(s => desig.includes(s))) return false;
      if (step7Filter === 'near_cap') {
        const wl = step7TeacherWorkloads[t.id];
        if (!wl || wl.pct < 85) return false;
      }
      if (step7Filter === 'leave' && t.status !== 'On Leave') return false;

      if (!step7Search.trim()) return true;
      const q = step7Search.toLowerCase().trim();
      const inName = t.name.toLowerCase().includes(q);
      const inDesig = desig.toLowerCase().includes(q);
      const inWings = (t.teachingWings || '').toLowerCase().includes(q);
      const inCT = (t.classTeacherOf || '').toLowerCase().includes(q);
      const inSubjects = t.subjects.some(sid => {
        const sub = school.subjects.find(s => s.id === sid);
        return (sub?.name || sid).toLowerCase().includes(q);
      });
      return inName || inDesig || inWings || inCT || inSubjects;
    });
  }, [sortedTeachers, step7Filter, step7Search, step7TeacherWorkloads, school.subjects]);

  const filteredStep5Subjects = useMemo(() => {
    return school.subjects.filter(sub => {
      if (step5Filter === 'academic' && sub.type !== 'academic') return false;
      if (step5Filter === 'activity' && sub.type !== 'activity') return false;
      if (step5Filter === 'lab' && !sub.requiresDoublePeriod && !sub.room) return false;

      if (!step5Search.trim()) return true;
      const q = step5Search.toLowerCase().trim();
      return (
        sub.name.toLowerCase().includes(q) ||
        sub.code.toLowerCase().includes(q) ||
        (sub.category && sub.category.toLowerCase().includes(q)) ||
        (sub.room && sub.room.toLowerCase().includes(q))
      );
    });
  }, [school.subjects, step5Filter, step5Search]);

  const step5Counts = useMemo(() => {
    const list = school.subjects;
    return {
      all: list.length,
      academic: list.filter(s => s.type === 'academic').length,
      activity: list.filter(s => s.type === 'activity').length,
      lab: list.filter(s => s.requiresDoublePeriod || Boolean(s.room)).length,
    };
  }, [school.subjects]);

  // Counts for filter pills
  const step7Counts = useMemo(() => {
    const list = school.teachers;
    return {
      all: list.length,
      pgt: list.filter(t => resolveTeacherDesignation(t).toUpperCase() === 'PGT').length,
      tgt: list.filter(t => resolveTeacherDesignation(t).toUpperCase() === 'TGT').length,
      prt: list.filter(t => resolveTeacherDesignation(t).toUpperCase() === 'PRT').length,
      ntt: list.filter(t => resolveTeacherDesignation(t).toUpperCase() === 'NTT').length,
      specialist: list.filter(t => ['SPECIALIST', 'ACTIVITY', 'LIBRARIAN', 'COUNSELOR', 'PHYSICAL'].some(s => resolveTeacherDesignation(t).toUpperCase().includes(s))).length,
      nearCap: list.filter(t => (step7TeacherWorkloads[t.id]?.pct || 0) >= 85).length,
      leave: list.filter(t => t.status === 'On Leave').length,
    };
  }, [school.teachers, step7TeacherWorkloads]);

  // Teacher creation state
  const [newTeacherName, setNewTeacherName] = useState('');
  const [newTeacherSubjects, setNewTeacherSubjects] = useState<string[]>([]);
  const [newTeacherMaxPerDay, setNewTeacherMaxPerDay] = useState<number>(5);

  // Subject creation & management state
  const [newSubName, setNewSubName] = useState('');
  const [newSubCode, setNewSubCode] = useState('');
  const [newSubType, setNewSubType] = useState<'academic' | 'activity'>('academic');
  const [newSubFreqPrimary, setNewSubFreqPrimary] = useState<number>(2);
  const [newSubFreqSenior, setNewSubFreqSenior] = useState<number>(2);
  const [newSubRoom, setNewSubRoom] = useState('');
  const [newSubTeacherId, setNewSubTeacherId] = useState<string>('auto');
  const [newSubDoublePeriod, setNewSubDoublePeriod] = useState(false);

  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isNewSchoolOpen, setIsNewSchoolOpen] = useState(false);
  const [newSubColor, setNewSubColor] = useState<string>(SUBJECT_PALETTE[0].color);
  const [colorPickerSubId, setColorPickerSubId] = useState<string | null>(null);

  const handleChangeSubjectColor = (subId: string, colorClass: string) => {
    updateSchool(s => ({
      ...s,
      subjects: s.subjects.map(sub => (sub.id === subId ? { ...sub, color: colorClass } : sub)),
    }));
    setColorPickerSubId(null);
  };

  // Dynamic timing and bell schedule state
  const timing = school.timingConfig || DEFAULT_TIMING_CONFIG;
  const computedSchedule = computeBellSchedule(timing, school.rules);

  const handleUpdateTiming = (
    newTiming: TimingConfig,
    newRules?: Partial<SchoolRules>,
    newDays?: string[]
  ) => {
    const updatedRules = { ...school.rules, ...(newRules || {}) };
    const computed = computeBellSchedule(newTiming, updatedRules);
    const updatedDays = newDays || school.workingDays;

    updateSchool(s => ({
      ...s,
      workingDays: updatedDays,
      rules: updatedRules,
      timingConfig: newTiming,
      periodSlots: computed.slots,
    }));
    setTimeout(() => onRunSolver(), 150);
  };

  const handleToggleDay = (day: string) => {
    const isPresent = school.workingDays.includes(day);
    let nextDays: string[];
    if (isPresent) {
      if (school.workingDays.length <= 1) return;
      nextDays = school.workingDays.filter(d => d !== day);
    } else {
      const ALL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      nextDays = ALL_DAYS.filter(d => school.workingDays.includes(d) || d === day);
    }
    handleUpdateTiming(timing, undefined, nextDays);
  };

  const handleUpdateDays = (days: string[]) => {
    handleUpdateTiming(timing, undefined, days);
  };

  // Weekly period capacity calculations
  const primaryCap = school.workingDays.length * school.rules.primaryEndPeriod;
  const seniorCap = school.workingDays.length * school.rules.seniorEndPeriod;

  const totalPrimaryFreq = school.subjects.reduce((sum, s) => sum + (s.freqPrimary || 0), 0);
  const totalSeniorFreq = school.subjects.reduce((sum, s) => sum + (s.freqSenior || 0), 0);

  const primaryDiff = primaryCap - totalPrimaryFreq;
  const seniorDiff = seniorCap - totalSeniorFreq;

  const handleAddClass = async () => {
    if (!newClassName.trim()) return;
    const roomName = newClassRoom.trim() || `Room ${school.classes.length + 101}`;
    if (app?.addClass) {
      await app.addClass({
        name: newClassName.trim(),
        grade: newClassGrade,
        tier: newClassTier,
        room: roomName,
      });
    } else {
      updateSchool(s => ({
        ...s,
        classes: [
          ...s.classes,
          {
            id: `c-${Date.now()}`,
            name: newClassName.trim(),
            grade: newClassGrade,
            tier: newClassTier,
            room: roomName,
          },
        ],
      }));
    }
    setNewClassName('');
    setNewClassRoom('');
  };

  const handleDeleteClass = async (classId: string) => {
    if (school.classes.length <= 1) {
      alert('At least one class section must remain in the school.');
      return;
    }
    if (app?.deleteClass) {
      await app.deleteClass(classId);
    } else {
      updateSchool(s => ({
        ...s,
        classes: s.classes.filter(c => c.id !== classId),
      }));
    }
  };

  const handleGenerateBatchClasses = async (
    generated: Array<{ name: string; grade: string; tier: Tier; room: string }>,
    replaceExisting: boolean
  ) => {
    if (app?.addClassesBatch) {
      await app.addClassesBatch(generated, replaceExisting);
    } else {
      const generatedSections = generated.map((item, idx) => ({
        id: `c-gen-${Date.now()}-${idx}`,
        name: item.name,
        grade: item.grade,
        tier: item.tier,
        room: item.room,
      }));
      updateSchool(s => ({
        ...s,
        classes: replaceExisting ? generatedSections : [...s.classes, ...generatedSections],
      }));
    }
  };

  const handleAddTeacher = async () => {
    if (!newTeacherName.trim()) return;
    const subs = newTeacherSubjects.length > 0 ? newTeacherSubjects : [school.subjects[0]?.id || ''];
    if (app?.addTeacher) {
      await app.addTeacher(newTeacherName.trim(), subs, newTeacherMaxPerDay || 5);
    } else {
      updateSchool(s => ({
        ...s,
        teachers: [
          ...s.teachers,
          {
            id: `t-${Date.now()}`,
            name: newTeacherName.trim(),
            subjects: subs,
            maxPerDay: newTeacherMaxPerDay || 5,
            unavailableDays: [],
          },
        ],
      }));
    }
    setNewTeacherName('');
    setNewTeacherSubjects([]);
  };

  const handleDeleteTeacher = async (teacherId: string) => {
    if (school.teachers.length <= 1) {
      alert('At least one faculty instructor must remain in the school.');
      return;
    }
    if (app?.deleteTeacher) {
      await app.deleteTeacher(teacherId);
    } else {
      updateSchool(s => ({
        ...s,
        teachers: s.teachers.filter(t => t.id !== teacherId),
        absences: s.absences.filter(a => a.teacherId !== teacherId),
      }));
    }
  };

  const toggleSubjectForNewTeacher = (subId: string) => {
    setNewTeacherSubjects(prev =>
      prev.includes(subId) ? prev.filter(id => id !== subId) : [...prev, subId]
    );
  };

  const handleAddSubject = async () => {
    if (!newSubName.trim()) return;
    const subId = `sub-${Date.now().toString(36)}`;
    const code = newSubCode.trim().toUpperCase() || newSubName.trim().slice(0, 4).toUpperCase();
    const color =
      newSubType === 'activity'
        ? 'bg-purple-100 text-purple-800 border-purple-300'
        : newSubColor || SUBJECT_PALETTE[school.subjects.length % SUBJECT_PALETTE.length].color;

    if (app?.addSubject) {
      await app.addSubject({
        name: newSubName.trim(),
        code,
        type: newSubType,
        freqPrimary: Number(newSubFreqPrimary) || 0,
        freqSenior: Number(newSubFreqSenior) || 0,
        room: newSubRoom.trim() || undefined,
        color,
      });
    } else {
      updateSchool(s => {
        let updatedTeachers = [...s.teachers];
        if (newSubTeacherId === 'auto') {
          if (updatedTeachers.length > 0) {
            const sorted = [...updatedTeachers].sort((a, b) => a.subjects.length - b.subjects.length);
            const chosen = sorted[0];
            updatedTeachers = updatedTeachers.map(t =>
              t.id === chosen.id ? { ...t, subjects: [...t.subjects, subId] } : t
            );
          }
        } else if (newSubTeacherId) {
          updatedTeachers = updatedTeachers.map(t =>
            t.id === newSubTeacherId ? { ...t, subjects: [...t.subjects, subId] } : t
          );
        }

        return {
          ...s,
          subjects: [
            ...s.subjects,
            {
              id: subId,
              name: newSubName.trim(),
              code,
              type: newSubType,
              color,
              freqPrimary: Number(newSubFreqPrimary) || 0,
              freqSenior: Number(newSubFreqSenior) || 0,
              room: newSubRoom.trim() || undefined,
              requiresDoublePeriod: newSubDoublePeriod,
            },
          ],
          teachers: updatedTeachers,
        };
      });
    }

    setNewSubName('');
    setNewSubCode('');
    setNewSubRoom('');
    setNewSubDoublePeriod(false);
  };

  const handleDeleteSubject = async (subjectId: string) => {
    if (school.subjects.length <= 1) {
      alert('At least one subject must remain in the school.');
      return;
    }
    if (app?.deleteSubject) {
      await app.deleteSubject(subjectId);
    } else {
      updateSchool(s => ({
        ...s,
        subjects: s.subjects.filter(sub => sub.id !== subjectId),
        teachers: s.teachers.map(t => ({
          ...t,
          subjects: t.subjects.filter(sid => sid !== subjectId),
        })),
      }));
    }
  };

  const handleApplyCbseCurriculum = (catalogType: 'cbse_full' | 'core_only' = 'cbse_full') => {
    const fullCatalog: Subject[] = [
      {
        id: 'sub-eng',
        name: 'English Language & Lit',
        code: 'ENG',
        type: 'academic',
        color: 'bg-blue-50 text-blue-700 border-blue-200',
        freqPrimary: 6,
        freqSenior: 7,
      },
      {
        id: 'sub-hin',
        name: 'Hindi Language & Lit',
        code: 'HIN',
        type: 'academic',
        color: 'bg-amber-50 text-amber-700 border-amber-200',
        freqPrimary: 5,
        freqSenior: 6,
      },
      {
        id: 'sub-math',
        name: 'Mathematics',
        code: 'MATH',
        type: 'academic',
        color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        freqPrimary: 7,
        freqSenior: 8,
      },
      {
        id: 'sub-sci',
        name: 'Science & Technology',
        code: 'SCI',
        type: 'academic',
        room: 'Science Lab',
        requiresDoublePeriod: true,
        color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        freqPrimary: 6,
        freqSenior: 8,
      },
      {
        id: 'sub-sst',
        name: 'Social Science / EVS',
        code: 'SST',
        type: 'academic',
        color: 'bg-teal-50 text-teal-700 border-teal-200',
        freqPrimary: 5,
        freqSenior: 6,
      },
      {
        id: 'sub-cs',
        name: 'Computer Science & AI',
        code: 'CS',
        type: 'academic',
        room: 'Computer Lab',
        requiresDoublePeriod: true,
        color: 'bg-purple-50 text-purple-700 border-purple-200',
        freqPrimary: 2,
        freqSenior: 4,
      },
      {
        id: 'sub-skt',
        name: 'Sanskrit / 3rd Lang',
        code: 'SKT',
        type: 'academic',
        color: 'bg-rose-50 text-rose-700 border-rose-200',
        freqPrimary: 0,
        freqSenior: 4,
      },
      {
        id: 'sub-pe',
        name: 'Physical Education & Sports',
        code: 'PE',
        type: 'activity',
        room: 'Sports Ground',
        color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        freqPrimary: 3,
        freqSenior: 3,
      },
      {
        id: 'sub-art',
        name: 'Visual Arts & Craft',
        code: 'ART',
        type: 'activity',
        color: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
        freqPrimary: 1,
        freqSenior: 1,
      },
      {
        id: 'sub-mus',
        name: 'Music & Performing Arts',
        code: 'MUS',
        type: 'activity',
        color: 'bg-cyan-50 text-cyan-700 border-cyan-200',
        freqPrimary: 1,
        freqSenior: 1,
      },
    ];

    const chosen = catalogType === 'core_only' ? fullCatalog.slice(0, 6) : fullCatalog;

    updateSchool(s => {
      const existingRooms = s.rooms || [];
      const roomNames = new Set(existingRooms.map(r => r.name.toLowerCase()));
      const extraRooms: Room[] = [];
      if (!roomNames.has('science lab')) {
        extraRooms.push({ id: `r-sci-lab`, name: 'Science Lab', type: 'lab', capacity: 40 });
      }
      if (!roomNames.has('computer lab')) {
        extraRooms.push({ id: `r-comp-lab`, name: 'Computer Lab', type: 'computer_lab', capacity: 36 });
      }
      if (!roomNames.has('sports ground')) {
        extraRooms.push({ id: `r-sports-ground`, name: 'Sports Ground', type: 'sports', capacity: 80 });
      }

      return {
        ...s,
        subjects: chosen,
        rooms: [...existingRooms, ...extraRooms],
      };
    });

    setTimeout(() => handleAutoBalance(), 60);
  };

  const handleUpdateSubjectFreq = (subId: string, tier: 'primary' | 'senior', delta: number) => {
    updateSchool(s => ({
      ...s,
      subjects: s.subjects.map(sub => {
        if (sub.id !== subId) return sub;
        if (tier === 'primary') {
          const next = Math.max(0, Math.min(10, sub.freqPrimary + delta));
          return { ...sub, freqPrimary: next };
        } else {
          const next = Math.max(0, Math.min(10, sub.freqSenior + delta));
          return { ...sub, freqSenior: next };
        }
      }),
    }));
    setTimeout(() => onRunSolver(), 150);
  };

  const handleApplyPresetFrequencies = (type: 'cbse_standard' | 'stem_focus') => {
    updateSchool(s => {
      const updated = s.subjects.map(sub => {
        const code = (sub.code || '').toUpperCase().trim();
        const name = sub.name.toLowerCase();

        let pFreq = sub.freqPrimary;
        let sFreq = sub.freqSenior;

        if (type === 'cbse_standard') {
          if (code === 'MATH' || name.includes('math')) { pFreq = 7; sFreq = 8; }
          else if (code === 'ENG' || name.includes('english')) { pFreq = 6; sFreq = 7; }
          else if (code === 'SCI' || name.includes('sci')) { pFreq = 6; sFreq = 8; }
          else if (code === 'SST' || name.includes('social') || name.includes('evs')) { pFreq = 5; sFreq = 6; }
          else if (code === 'HIN' || name.includes('hindi')) { pFreq = 5; sFreq = 6; }
          else if (code === 'CS' || name.includes('comp')) { pFreq = 2; sFreq = 4; }
          else if (code === 'SKT' || name.includes('sanskrit')) { pFreq = 0; sFreq = 4; }
          else if (code === 'PE' || name.includes('phys') || name.includes('sport')) { pFreq = 3; sFreq = 3; }
          else if (code === 'ART' || name.includes('art')) { pFreq = 1; sFreq = 1; }
          else if (code === 'MUS' || name.includes('music')) { pFreq = 1; sFreq = 1; }
        } else {
          // STEM Focus
          if (code === 'MATH' || name.includes('math')) { pFreq = 8; sFreq = 9; }
          else if (code === 'SCI' || name.includes('sci')) { pFreq = 8; sFreq = 9; }
          else if (code === 'CS' || name.includes('comp')) { pFreq = 4; sFreq = 5; }
          else if (code === 'ENG' || name.includes('english')) { pFreq = 5; sFreq = 6; }
          else if (code === 'SST' || name.includes('social')) { pFreq = 4; sFreq = 5; }
          else if (code === 'HIN' || name.includes('hindi')) { pFreq = 4; sFreq = 5; }
          else if (code === 'PE' || name.includes('phys')) { pFreq = 2; sFreq = 3; }
          else if (code === 'ART' || code === 'MUS') { pFreq = 1; sFreq = 1; }
        }

        return {
          ...sub,
          freqPrimary: pFreq,
          freqSenior: sFreq,
        };
      });

      return {
        ...s,
        subjects: updated,
      };
    });

    setTimeout(() => handleAutoBalance(), 60);
  };

  // Smart Auto-Balance Algorithm
  const handleAutoBalance = () => {
    updateSchool(s => {
      const pCap = s.workingDays.length * s.rules.primaryEndPeriod;
      const sCap = s.workingDays.length * s.rules.seniorEndPeriod;

      const subjectsCopy = s.subjects.map(sub => ({ ...sub }));

      // 1. Balance Primary Tier
      let currentP = subjectsCopy.reduce((sum, sub) => sum + (sub.freqPrimary || 0), 0);
      let diffP = pCap - currentP;

      if (diffP < 0) {
        let toTrim = Math.abs(diffP);
        while (toTrim > 0) {
          const eligible = subjectsCopy
            .filter(sub => sub.type === 'academic' && sub.freqPrimary > 1)
            .sort((a, b) => b.freqPrimary - a.freqPrimary);
          if (eligible.length === 0) break;
          eligible[0].freqPrimary -= 1;
          toTrim -= 1;
        }
      } else if (diffP > 0) {
        let toAdd = diffP;
        while (toAdd > 0) {
          const eligible = subjectsCopy
            .filter(sub => sub.type === 'academic')
            .sort((a, b) => a.freqPrimary - b.freqPrimary);
          if (eligible.length === 0) break;
          eligible[0].freqPrimary += 1;
          toAdd -= 1;
        }
      }

      // 2. Balance Senior Tier
      let currentS = subjectsCopy.reduce((sum, sub) => sum + (sub.freqSenior || 0), 0);
      let diffS = sCap - currentS;

      if (diffS < 0) {
        let toTrim = Math.abs(diffS);
        while (toTrim > 0) {
          const eligible = subjectsCopy
            .filter(sub => sub.type === 'academic' && sub.freqSenior > 1)
            .sort((a, b) => b.freqSenior - a.freqSenior);
          if (eligible.length === 0) break;
          eligible[0].freqSenior -= 1;
          toTrim -= 1;
        }
      } else if (diffS > 0) {
        let toAdd = diffS;
        while (toAdd > 0) {
          const eligible = subjectsCopy
            .filter(sub => sub.type === 'academic')
            .sort((a, b) => a.freqSenior - b.freqSenior);
          if (eligible.length === 0) break;
          eligible[0].freqSenior += 1;
          toAdd -= 1;
        }
      }

      return {
        ...s,
        subjects: subjectsCopy,
      };
    });

    setTimeout(() => onRunSolver(), 150);
  };

  // Steps definition for left sidebar with dedicated icons & dynamic subtitles
  const STEPS = [
    {
      num: 1,
      title: 'School Profile',
      subtitle: `${school.workingDays.length} Days • Term Setup`,
      icon: Building2,
      isDone: school.workingDays.length > 0 && !!school.name,
    },
    {
      num: 2,
      title: 'Time Structure',
      subtitle: `${school.rules.primaryEndPeriod}p Primary • ${school.rules.seniorEndPeriod}p Senior`,
      icon: Clock,
      isDone: !!school.timingConfig && school.rules.primaryEndPeriod > 0,
    },
    {
      num: 3,
      title: 'Grades & Classes',
      subtitle: `${school.classes.length} Cohorts & Homerooms`,
      icon: GraduationCap,
      isDone: school.classes.length > 0,
    },
    {
      num: 4,
      title: 'Rooms & Labs',
      subtitle: `${(school.rooms || []).length} Facilities & Suites`,
      icon: DoorOpen,
      isDone: (school.rooms || []).length > 0,
    },
    {
      num: 5,
      title: 'Subjects Catalog',
      subtitle: `${school.subjects.length} Subjects & Blocks`,
      icon: BookOpen,
      isDone: school.subjects.length > 0,
    },
    {
      num: 6,
      title: 'Weekly Periods',
      subtitle: 'Cohort × Subject Matrix',
      icon: CalendarRange,
      isDone: primaryDiff === 0 && seniorDiff === 0,
    },
    {
      num: 7,
      title: 'Faculty Roster',
      subtitle: `${school.teachers.length} Staff & Workloads`,
      icon: Users,
      isDone: school.teachers.length > 0,
    },
    {
      num: 8,
      title: 'Teacher Assignment',
      subtitle: 'Class + Subject → 1 Teacher ⭐',
      icon: Layers,
      isDone: (school.assignments || []).length > 0,
      badge: (school.assignments || []).length === 0 ? 'Action' : undefined,
    },
    {
      num: 9,
      title: 'Special Rules',
      subtitle: 'Pins, Blocks & Activities',
      icon: ShieldCheck,
      isDone: true,
    },
    {
      num: 10,
      title: 'Review & Check',
      subtitle: 'Pre-Flight Feasibility Audit',
      icon: Sparkles,
      isDone: true,
      badge: 'Audit',
    },
  ];

  const totalAssigned = (school.assignments || []).length;
  const doneStepsCount = STEPS.filter(s => s.isDone).length;
  const setupProgressPercent = Math.round((doneStepsCount / STEPS.length) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner mirroring chronosedu-gray.vercel.app */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
              Layer A • Setup Wizard
            </span>
            <h2 className="font-extrabold text-slate-900 text-base sm:text-lg">
              10-Step School Configuration &amp; Pre-Generation Checklist
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Every item can be edited or deleted at any time. The wizard blocks generation if any red readiness error exists.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {app?.loadTestDataset2 && (
            <button
              type="button"
              onClick={app.loadTestDataset2}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition shadow-2xs cursor-pointer"
              title="Load Greenwood Public School (Dataset 2 with 23 real-world issues)"
            >
              <span>🧪 Load Dataset 2 (Issues Testbed)</span>
            </button>
          )}

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Readiness Engine Active</span>
          </div>

          <button
            type="button"
            onClick={onRunSolver}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Generate Timetable Draft</span>
          </button>
        </div>
      </div>

      {/* Two-Column Master-Detail Layout */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Left Column: 10 Steps Sidebar (sticky on viewport, scrollable) */}
        <div className="w-full lg:w-64 xl:w-72 shrink-0 space-y-3 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto pr-1">
          {/* Progress Overview Card */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-4 text-white shadow-md border border-indigo-900/40 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Setup Readiness
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/10">
                {setupProgressPercent}% Ready
              </span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${setupProgressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2.5 text-[11px] text-slate-300">
              <span>{doneStepsCount} of {STEPS.length} Steps Complete</span>
              <span className="font-semibold text-emerald-400">
                {doneStepsCount === STEPS.length ? '✓ All Verified' : `${STEPS.length - doneStepsCount} Pending`}
              </span>
            </div>
          </div>

          {/* Stepper Navigation List with Timeline Spine */}
          <div className="relative space-y-1.5 before:absolute before:left-[23px] before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200/80 before:z-0">
            {STEPS.map(step => {
              const isActive = currentStep === step.num;
              const StepIcon = step.icon;
              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => setStep(step.num)}
                  className={`relative z-10 w-full text-left p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-2.5 cursor-pointer group ${
                    isActive
                      ? 'bg-white border-indigo-500 shadow-md ring-2 ring-indigo-500/20 translate-x-1'
                      : 'bg-white hover:bg-slate-50/90 text-slate-700 border-slate-200/90 shadow-2xs hover:border-slate-300 hover:translate-x-0.5'
                  }`}
                >
                  {/* Left Active Glow Accent */}
                  {isActive && (
                    <div className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-indigo-600 to-violet-600 rounded-r" />
                  )}

                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Step Icon Badge */}
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-xs scale-105'
                          : step.isDone
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}
                    >
                      <StepIcon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0 truncate">
                      <div
                        className={`text-xs truncate flex items-center gap-1 ${
                          isActive
                            ? 'text-indigo-950 font-extrabold'
                            : 'text-slate-800 font-semibold group-hover:text-slate-950'
                        }`}
                      >
                        <span className="text-[10px] font-mono opacity-50 mr-0.5">
                          {step.num < 10 ? `0${step.num}` : `${step.num}`}
                        </span>
                        <span className="truncate">{step.title}</span>
                      </div>
                      <div
                        className={`text-[11px] truncate ${
                          isActive
                            ? 'text-indigo-600 font-medium'
                            : 'text-slate-400 group-hover:text-slate-500'
                        }`}
                      >
                        {step.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Right Status Indicator */}
                  <div className="shrink-0 flex items-center gap-1.5">
                    {step.badge && !isActive && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        step.num === 10
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {step.badge}
                      </span>
                    )}
                    {step.isDone && !step.badge && (
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        isActive
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Step Content Area */}
        <div className="flex-1 min-w-0 space-y-5">
          {/* STEP 1: School Profile */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-indigo-600" />
                      <span>Step 1: School Identity &amp; Operating Profile</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Define multi-tenant school identity, term dates, and active working days.
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {school.published ? '🟢 Published' : '🟡 Draft'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="lg:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                      School Name
                    </label>
                    <input
                      type="text"
                      value={school.name}
                      onChange={e => updateSchool(s => ({ ...s, name: e.target.value }))}
                      placeholder="e.g. Greenwood High School"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                      Academic Term
                    </label>
                    <input
                      type="text"
                      value={school.term || ''}
                      onChange={e => updateSchool(s => ({ ...s, term: e.target.value }))}
                      placeholder="2026–2027 (Term 1)"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-indigo-500" />
                      Timezone
                    </label>
                    <input
                      type="text"
                      value={school.timezone}
                      onChange={e => updateSchool(s => ({ ...s, timezone: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                  </div>
                </div>

                {/* Working Days Selector */}
                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 text-xs flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Weekly Working Days Calendar</span>
                    </label>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleUpdateDays(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border transition cursor-pointer ${
                          school.workingDays.length === 5 && !school.workingDays.includes('Saturday')
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        5-Day (Mon–Fri)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateDays(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border transition cursor-pointer ${
                          school.workingDays.includes('Saturday')
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        6-Day (Mon–Sat)
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => {
                      const isActive = school.workingDays.includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => handleToggleDay(day)}
                          className={`py-2 px-2 rounded-xl text-center font-bold text-xs border transition cursor-pointer flex items-center justify-center gap-1 ${
                            isActive
                              ? day === 'Saturday'
                                ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                                : 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                              : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span>{day.slice(0, 3)}</span>
                          {isActive && <Check className="w-3 h-3 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Holiday Calendar Component */}
              <HolidayCalendarCard school={school} app={app} />
            </div>
          )}

          {/* STEP 2: Time Structure */}
          {currentStep === 2 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-5 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <span>Step 2: Time Structure &amp; Bell Schedule</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configure school hours, period durations, primary/senior dismissal times, and breaks.
                  </p>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {school.workingDays.length} Working Days • {computedSchedule.slots.filter(s => !s.isBreak).length} Periods/Day
                </span>
              </div>

              <div className="space-y-4 text-xs">
                {/* School Start Time & Period Length */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      School Opening / Start Time
                    </label>
                    <input
                      type="time"
                      value={timing.startTime}
                      onChange={e => handleUpdateTiming({ ...timing, startTime: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Standard Period Duration
                    </label>
                    <select
                      value={timing.periodDurationMinutes}
                      onChange={e => handleUpdateTiming({ ...timing, periodDurationMinutes: Number(e.target.value) || 45 })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white text-slate-800"
                    >
                      <option value={35}>35 Minutes</option>
                      <option value={40}>40 Minutes</option>
                      <option value={45}>45 Minutes (Standard)</option>
                      <option value={50}>50 Minutes</option>
                      <option value={60}>60 Minutes (1 Hour)</option>
                    </select>
                  </div>
                </div>

                {/* 1-Click Bell Schedule Templates */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-50 via-indigo-50/30 to-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>1-Click Bell Schedule Presets</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">Click to auto-configure start time, periods, breaks & working days</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        handleUpdateTiming(
                          {
                            ...timing,
                            startTime: '08:00',
                            periodDurationMinutes: 40,
                            hasZeroPeriod: true,
                            zeroPeriodDurationMinutes: 30,
                            hasRecessBreak: true,
                            recessAfterPeriod: 2,
                            recessDurationMinutes: 15,
                            hasLunchBreak: true,
                            lunchAfterPeriod: 4,
                            lunchDurationMinutes: 30,
                            lunchSeniorOnly: false,
                          },
                          { prePrimaryEndPeriod: 5, primaryEndPeriod: 6, seniorEndPeriod: 8 },
                          ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                        );
                      }}
                      className="p-2.5 rounded-xl border border-indigo-200 bg-white hover:bg-indigo-50/60 hover:border-indigo-400 text-left transition cursor-pointer group shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-indigo-950 group-hover:text-indigo-600 flex items-center gap-1">
                          <span>⚡ CBSE Standard</span>
                        </span>
                        <span className="text-[9px] font-bold bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">6 Days</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">8:00 AM • 40m • 8 Periods • Mon–Sat</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        handleUpdateTiming(
                          {
                            ...timing,
                            startTime: '08:00',
                            periodDurationMinutes: 45,
                            hasZeroPeriod: true,
                            zeroPeriodDurationMinutes: 25,
                            hasRecessBreak: true,
                            recessAfterPeriod: 2,
                            recessDurationMinutes: 15,
                            hasLunchBreak: true,
                            lunchAfterPeriod: 4,
                            lunchDurationMinutes: 35,
                            lunchSeniorOnly: false,
                          },
                          { prePrimaryEndPeriod: 5, primaryEndPeriod: 6, seniorEndPeriod: 8 },
                          ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
                        );
                      }}
                      className="p-2.5 rounded-xl border border-sky-200 bg-white hover:bg-sky-50/60 hover:border-sky-400 text-left transition cursor-pointer group shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-sky-950 group-hover:text-sky-600 flex items-center gap-1">
                          <span>⚡ Metro 5-Day</span>
                        </span>
                        <span className="text-[9px] font-bold bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded">5 Days</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">8:00 AM • 45m • 8 Periods • Mon–Fri</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        handleUpdateTiming(
                          {
                            ...timing,
                            startTime: '07:45',
                            periodDurationMinutes: 35,
                            hasZeroPeriod: false,
                            zeroPeriodDurationMinutes: 0,
                            hasRecessBreak: true,
                            recessAfterPeriod: 3,
                            recessDurationMinutes: 20,
                            hasLunchBreak: true,
                            lunchAfterPeriod: 5,
                            lunchDurationMinutes: 25,
                            lunchSeniorOnly: false,
                          },
                          { prePrimaryEndPeriod: 4, primaryEndPeriod: 6, seniorEndPeriod: 7 },
                          ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                        );
                      }}
                      className="p-2.5 rounded-xl border border-amber-200 bg-white hover:bg-amber-50/60 hover:border-amber-400 text-left transition cursor-pointer group shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-amber-950 group-hover:text-amber-600 flex items-center gap-1">
                          <span>⚡ Compact Morning</span>
                        </span>
                        <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">Fast Pace</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">7:45 AM • 35m • 7 Periods • Mon–Sat</div>
                    </button>
                  </div>
                </div>

                {/* Periods Per Day — Multi-Tier Dismissals (Pre-Primary, Primary, Senior) */}
                <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-3">
                  <div className="font-bold text-indigo-950 text-xs flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-600" />
                      Daily Academic Periods per Wing (Staggered Dismissals)
                    </span>
                    <span className="text-[10px] text-indigo-600 font-medium">Automatic bus &amp; dispersal coordination</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Pre-Primary Card */}
                    <div className="bg-white rounded-xl border border-amber-200 p-3 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-amber-900">🟡 Pre-Primary Wing</span>
                        <span className="text-[10px] text-amber-700 font-semibold">
                          {computedSchedule.prePrimaryDismissalTime ? `Out at ${computedSchedule.prePrimaryDismissalTime}` : 'Same as Primary'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const cur = school.rules.prePrimaryEndPeriod || (school.rules.primaryEndPeriod - 1);
                            const next = Math.max(3, cur - 1);
                            handleUpdateTiming(timing, { prePrimaryEndPeriod: next });
                          }}
                          className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 font-bold flex items-center justify-center hover:bg-amber-200 transition cursor-pointer"
                          title="Decrease Pre-Primary periods"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex-1 text-center">
                          <span className="text-xl font-extrabold text-amber-900">
                            {school.rules.prePrimaryEndPeriod || (school.rules.primaryEndPeriod - 1)}
                          </span>
                          <span className="text-[10px] text-amber-600 ml-1">periods/day</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const cur = school.rules.prePrimaryEndPeriod || (school.rules.primaryEndPeriod - 1);
                            const next = Math.min(school.rules.primaryEndPeriod, cur + 1);
                            handleUpdateTiming(timing, { prePrimaryEndPeriod: next });
                          }}
                          className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 font-bold flex items-center justify-center hover:bg-amber-200 transition cursor-pointer"
                          title="Increase Pre-Primary periods"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[10px] text-amber-700 text-center font-medium">
                        Nursery, LKG, UKG early release
                      </div>
                    </div>

                    {/* Primary Card */}
                    <div className="bg-white rounded-xl border border-emerald-200 p-3 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-emerald-900">🟢 Primary Wing</span>
                        <span className="text-[10px] text-emerald-600 font-semibold">Out at {computedSchedule.primaryDismissalTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const next = Math.max(2, school.rules.primaryEndPeriod - 1);
                            handleUpdateTiming(timing, { primaryEndPeriod: next });
                          }}
                          className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center hover:bg-emerald-200 transition cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex-1 text-center">
                          <span className="text-xl font-extrabold text-emerald-900">{school.rules.primaryEndPeriod}</span>
                          <span className="text-[10px] text-emerald-600 ml-1">periods/day</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const next = Math.min(school.rules.seniorEndPeriod, school.rules.primaryEndPeriod + 1);
                            handleUpdateTiming(timing, { primaryEndPeriod: next });
                          }}
                          className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center hover:bg-emerald-200 transition cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[10px] text-emerald-700 text-center font-medium">
                        Grades 1 through 5
                      </div>
                    </div>

                    {/* Senior Card */}
                    <div className="bg-white rounded-xl border border-sky-200 p-3 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-sky-900">🔵 Senior Wing</span>
                        <span className="text-[10px] text-sky-600 font-semibold">Out at {computedSchedule.seniorDismissalTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const next = Math.max(school.rules.primaryEndPeriod, school.rules.seniorEndPeriod - 1);
                            handleUpdateTiming(timing, { seniorEndPeriod: next });
                          }}
                          className="w-7 h-7 rounded-lg bg-sky-100 text-sky-800 font-bold flex items-center justify-center hover:bg-sky-200 transition cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex-1 text-center">
                          <span className="text-xl font-extrabold text-sky-900">{school.rules.seniorEndPeriod}</span>
                          <span className="text-[10px] text-sky-600 ml-1">periods/day</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const next = Math.min(10, school.rules.seniorEndPeriod + 1);
                            handleUpdateTiming(timing, { seniorEndPeriod: next });
                          }}
                          className="w-7 h-7 rounded-lg bg-sky-100 text-sky-800 font-bold flex items-center justify-center hover:bg-sky-200 transition cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[10px] text-sky-700 text-center font-medium">
                        Grades 6 through 12
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recess & Lunch Breaks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Recess Break Card */}
                  <div className={`p-3 rounded-xl border space-y-2 transition-all ${
                    (timing.hasRecessBreak ?? true)
                      ? 'bg-emerald-50/60 border-emerald-200'
                      : 'bg-slate-50 border-slate-200 opacity-80'
                  }`}>
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-emerald-950 flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={timing.hasRecessBreak ?? true}
                          onChange={e => handleUpdateTiming({ ...timing, hasRecessBreak: e.target.checked })}
                          className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5 cursor-pointer"
                        />
                        <Coffee className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Recess Break</span>
                      </label>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        (timing.hasRecessBreak ?? true)
                          ? 'text-emerald-700 bg-emerald-100'
                          : 'text-slate-500 bg-slate-200'
                      }`}>
                        {(timing.hasRecessBreak ?? true) ? `${timing.recessDurationMinutes} mins` : 'Disabled'}
                      </span>
                    </div>

                    {(timing.hasRecessBreak ?? true) ? (
                      <div className="space-y-2">
                        <input
                          value={timing.recessLabel || 'Short Break'}
                          onChange={e => handleUpdateTiming({ ...timing, recessLabel: e.target.value })}
                          placeholder="Short Break"
                          className="w-full px-2.5 py-1 rounded-lg border border-emerald-300 bg-white text-xs font-semibold text-emerald-900"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-emerald-800 font-semibold block mb-0.5">After Period:</label>
                            <select
                              value={timing.recessAfterPeriod}
                              onChange={e => handleUpdateTiming({ ...timing, recessAfterPeriod: Number(e.target.value) || 2 })}
                              className="w-full px-2 py-1 rounded-lg border border-emerald-300 bg-white text-xs font-semibold"
                            >
                              {Array.from(
                                { length: Math.max(1, (timing.hasLunchBreak ?? true) ? Math.min(timing.lunchAfterPeriod - 1, school.rules.primaryEndPeriod) : school.rules.seniorEndPeriod - 1) },
                                (_, i) => i + 1
                              ).map(p => (
                                <option key={p} value={p}>Period {p}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] text-emerald-800 font-semibold block mb-0.5">Duration:</label>
                            <select
                              value={timing.recessDurationMinutes}
                              onChange={e => handleUpdateTiming({ ...timing, recessDurationMinutes: Number(e.target.value) || 15 })}
                              className="w-full px-2 py-1 rounded-lg border border-emerald-300 bg-white text-xs font-semibold"
                            >
                              <option value={10}>10 Mins</option>
                              <option value={15}>15 Mins</option>
                              <option value={20}>20 Mins</option>
                              <option value={25}>25 Mins</option>
                              <option value={30}>30 Mins</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-500 italic py-2">
                        No short break. Periods proceed continuously without pause until lunch or dismissal.
                      </p>
                    )}
                  </div>

                  {/* Lunch Break Card */}
                  <div className={`p-3 rounded-xl border space-y-2 transition-all ${
                    (timing.hasLunchBreak ?? true)
                      ? 'bg-sky-50/60 border-sky-200'
                      : 'bg-slate-50 border-slate-200 opacity-80'
                  }`}>
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-sky-950 flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={timing.hasLunchBreak ?? true}
                          onChange={e => handleUpdateTiming({ ...timing, hasLunchBreak: e.target.checked })}
                          className="rounded text-sky-600 focus:ring-sky-500 w-3.5 h-3.5 cursor-pointer"
                        />
                        <Utensils className="w-3.5 h-3.5 text-sky-700" />
                        <span>Lunch Break</span>
                      </label>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        (timing.hasLunchBreak ?? true)
                          ? 'text-sky-700 bg-sky-100'
                          : 'text-slate-500 bg-slate-200'
                      }`}>
                        {(timing.hasLunchBreak ?? true) ? `${timing.lunchDurationMinutes} mins` : 'Disabled'}
                      </span>
                    </div>

                    {(timing.hasLunchBreak ?? true) ? (
                      <div className="space-y-2">
                        <input
                          value={timing.lunchLabel || 'Lunch Break'}
                          onChange={e => handleUpdateTiming({ ...timing, lunchLabel: e.target.value })}
                          placeholder="Lunch Break"
                          className="w-full px-2.5 py-1 rounded-lg border border-sky-300 bg-white text-xs font-semibold text-sky-900"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-sky-800 font-semibold block mb-0.5">After Period:</label>
                            <select
                              value={timing.lunchAfterPeriod}
                              onChange={e => handleUpdateTiming({ ...timing, lunchAfterPeriod: Number(e.target.value) || 4 })}
                              className="w-full px-2 py-1 rounded-lg border border-sky-300 bg-white text-xs font-semibold"
                            >
                              {(() => {
                                const isRecessOn = timing.hasRecessBreak ?? true;
                                const minP = isRecessOn ? Math.max(1, timing.recessAfterPeriod + 1) : 1;
                                const maxP = Math.max(minP, school.rules.seniorEndPeriod - 1);
                                const count = maxP - minP + 1;
                                return Array.from({ length: count }, (_, i) => minP + i).map(p => (
                                  <option key={p} value={p}>Period {p}</option>
                                ));
                              })()}
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] text-sky-800 font-semibold block mb-0.5">Duration:</label>
                            <select
                              value={timing.lunchDurationMinutes}
                              onChange={e => handleUpdateTiming({ ...timing, lunchDurationMinutes: Number(e.target.value) || 30 })}
                              className="w-full px-2 py-1 rounded-lg border border-sky-300 bg-white text-xs font-semibold"
                            >
                              <option value={15}>15 Mins</option>
                              <option value={20}>20 Mins</option>
                              <option value={25}>25 Mins</option>
                              <option value={30}>30 Mins</option>
                              <option value={35}>35 Mins</option>
                              <option value={40}>40 Mins</option>
                              <option value={45}>45 Mins</option>
                              <option value={50}>50 Mins</option>
                              <option value={55}>55 Mins</option>
                              <option value={60}>60 Mins (1 Hour)</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <label className="text-[10px] font-semibold text-sky-900 flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!timing.lunchSeniorOnly}
                              onChange={e => handleUpdateTiming({ ...timing, lunchSeniorOnly: !e.target.checked })}
                              className="rounded text-sky-600 focus:ring-sky-500 w-3.5 h-3.5"
                            />
                            <span>Synchronized for all classes</span>
                          </label>
                          <span className="text-[10px] text-sky-600 font-medium">
                            {!timing.lunchSeniorOnly ? 'All Classes' : 'Senior Only'}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-500 italic py-2">
                        No lunch break. Suitable for morning-only or half-day operations.
                      </p>
                    )}
                  </div>
                </div>

                {/* Calculated Timeline Preview */}
                <div className="p-3 rounded-xl bg-slate-900 text-white space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold flex items-center gap-1.5 text-indigo-300">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Calculated Daily Timeline</span>
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Starts {timing.startTime} • Primary Out {computedSchedule.primaryDismissalTime} • Senior Out {computedSchedule.seniorDismissalTime}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 text-[10px]">
                    {computedSchedule.slots.map(s => (
                      <span
                        key={s.label}
                        className={`px-2 py-1 rounded-md font-medium border ${
                          s.type === 'break'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : s.type === 'lunch'
                            ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                            : 'bg-slate-800 text-slate-200 border-slate-700'
                        }`}
                      >
                        {s.label}: {s.time}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Grades & Classes */}
          {currentStep === 3 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    <span>Step 3: Grades, Sections &amp; Classrooms ({school.classes.length})</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage student cohorts, grade levels, and assigned homeroom classrooms.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setIsBatchClassModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                    title="1-Click batch create Pre-Primary, Primary, Middle, Secondary, and Senior Secondary classes with auto-assigned homerooms"
                  >
                    <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>⚡ Batch Generate Classes</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddClassOpen(x => !x)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-2xs transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{isAddClassOpen ? 'Close Form' : 'Add Class'}</span>
                  </button>
                  <span className="text-[11px] text-slate-500 font-semibold bg-slate-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                    {filteredStep3Classes.length} of {school.classes.length} Cohorts
                  </span>
                </div>
              </div>

              {/* Wing Filter Tabs & Search Bar (Matching Step 7 & 8) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { id: 'all', label: `All (${step3WingCounts.all})` },
                    ...(step3WingCounts.pre_primary > 0 ? [{ id: 'pre_primary', label: `Pre-Primary (${step3WingCounts.pre_primary})` }] : []),
                    ...(step3WingCounts.primary > 0 ? [{ id: 'primary', label: `Primary (${step3WingCounts.primary})` }] : []),
                    ...(step3WingCounts.middle > 0 ? [{ id: 'middle', label: `Middle (${step3WingCounts.middle})` }] : []),
                    ...(step3WingCounts.secondary > 0 ? [{ id: 'secondary', label: `Secondary (${step3WingCounts.secondary})` }] : []),
                    ...(step3WingCounts.senior > 0 ? [{ id: 'senior', label: `Senior Sec (${step3WingCounts.senior})` }] : []),
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setStep3WingFilter(tab.id as any)}
                      className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer border ${
                        step3WingFilter === tab.id
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs font-bold'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="relative min-w-[200px] sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search cohorts, rooms, teachers..."
                    value={step3Search}
                    onChange={e => setStep3Search(e.target.value)}
                    className="w-full pl-8 pr-7 py-1.5 rounded-xl border border-slate-200 bg-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  {step3Search && (
                    <button
                      type="button"
                      onClick={() => setStep3Search('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Collapsible Add Class Form */}
              {isAddClassOpen && (
                <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-200 space-y-3 text-xs animate-in fade-in duration-200">
                  <div className="font-bold text-indigo-950 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-indigo-600" />
                      Add New Class Section
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAddClassOpen(false)}
                      className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <input
                      placeholder="Class (e.g. 7A)"
                      value={newClassName}
                      onChange={e => setNewClassName(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
                    />
                    <input
                      placeholder="Grade 7"
                      value={newClassGrade}
                      onChange={e => setNewClassGrade(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
                    />
                    <select
                      value={newClassTier}
                      onChange={e => setNewClassTier(e.target.value as Tier)}
                      className="px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
                    >
                      <option value="Primary">Primary</option>
                      <option value="Senior">Senior</option>
                    </select>
                    <input
                      placeholder="Room (e.g. Room 108)"
                      value={newClassRoom}
                      onChange={e => setNewClassRoom(e.target.value)}
                      list="step3-room-suggestions"
                      className="px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
                    />
                    <datalist id="step3-room-suggestions">
                      {allRooms.map(r => (
                        <option key={r.id} value={r.name}>
                          {r.name} ({r.type})
                        </option>
                      ))}
                    </datalist>
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAddClassOpen(false)}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-white text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        await handleAddClass();
                        setIsAddClassOpen(false);
                      }}
                      className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer transition shadow-xs"
                    >
                      Save Class Section
                    </button>
                  </div>
                </div>
              )}

              {/* Multi-Column Responsive Grid matching Step 7 & Step 8 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[560px] overflow-y-auto pr-1">
                {filteredStep3Classes.map(c => {
                  const wing = (c.wing || '').toLowerCase();
                  const n = (c.name + ' ' + c.grade).toLowerCase();
                  let wingLabel = c.wing || (c.tier === 'Primary' ? 'Primary' : 'Senior');
                  let avatarBg = 'bg-indigo-600 text-white';
                  let badgeColor = 'bg-indigo-50 text-indigo-700 border-indigo-200';

                  if (wing.includes('pre') || n.includes('nur') || n.includes('lkg') || n.includes('ukg') || n.includes('kg')) {
                    wingLabel = 'Pre-Primary';
                    avatarBg = 'bg-amber-500 text-white';
                    badgeColor = 'bg-amber-50 text-amber-800 border-amber-200';
                  } else if (wing.includes('primary') || n.match(/\b([1-5])\b/)) {
                    wingLabel = 'Primary';
                    avatarBg = 'bg-emerald-600 text-white';
                    badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                  } else if (wing.includes('middle') || n.match(/\b([6-8])\b/)) {
                    wingLabel = 'Middle';
                    avatarBg = 'bg-sky-600 text-white';
                    badgeColor = 'bg-sky-50 text-sky-700 border-sky-200';
                  } else if (wing.includes('senior') || n.match(/\b(11|12)\b/)) {
                    wingLabel = 'Senior Sec';
                    avatarBg = 'bg-violet-600 text-white';
                    badgeColor = 'bg-violet-50 text-violet-700 border-violet-200';
                  } else if (wing.includes('secondary') || n.match(/\b(9|10)\b/)) {
                    wingLabel = 'Secondary';
                    avatarBg = 'bg-indigo-600 text-white';
                    badgeColor = 'bg-indigo-50 text-indigo-700 border-indigo-200';
                  }

                  return (
                    <div
                      key={c.id}
                      className="p-3 rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between text-xs shadow-2xs space-y-2.5"
                    >
                      <div>
                        {/* Top: Cohort initials avatar + Name + Wing + Delete */}
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs ${avatarBg}`}>
                              {c.name.slice(0, 4)}
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-slate-900 text-xs truncate">
                                Class {c.name}
                              </div>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md uppercase tracking-wider border ${badgeColor}`}>
                                  {wingLabel}
                                </span>
                                <span className="text-[10px] text-slate-400 font-medium truncate max-w-[80px]">
                                  {c.grade}
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteClass(c.id)}
                            className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer shrink-0"
                            title={`Delete Class ${c.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Stream or Class Teacher details */}
                        <div className="space-y-1">
                          {c.stream && (
                            <div className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 w-fit">
                              Stream: {c.stream}
                            </div>
                          )}
                          {c.classTeacherName && (
                            <div className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1 w-fit">
                              <span>⭐ CT: {c.classTeacherName}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Footer: Homeroom + Capacity */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                        <span className="font-semibold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 flex items-center gap-1 text-[10px]">
                          <DoorOpen className="w-3 h-3 text-slate-500" />
                          <span className="truncate max-w-[110px]">{c.room || 'No Homeroom'}</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {c.strength ? `${c.strength} Students` : '40 Students'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredStep3Classes.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-500 border border-dashed border-slate-200 rounded-xl">
                  No classes match your current search or wing filter.
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Rooms & Labs */}
          {currentStep === 4 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                    <DoorOpen className="w-4 h-4 text-indigo-600" />
                    <span>Step 4: Rooms, Labs &amp; Specialized Facilities</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Physical inventory of classrooms, science labs, and computer suites with room capacities and homeroom assignments.
                  </p>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0 self-start sm:self-auto">
                  {allRooms.length} Facilities Configured
                </span>
              </div>

              {/* Filter Pills & Search */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { id: 'all', label: `All (${allRooms.length})` },
                    { id: 'classroom', label: `Classrooms (${allRooms.filter(r => r.type === 'classroom').length})` },
                    { id: 'lab', label: `Science Labs (${allRooms.filter(r => r.type === 'lab').length})` },
                    { id: 'computer_lab', label: `IT Suites (${allRooms.filter(r => r.type === 'computer_lab').length})` },
                    { id: 'specialist', label: `Other Facilities (${allRooms.filter(r => r.type !== 'classroom' && r.type !== 'lab' && r.type !== 'computer_lab').length})` },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setStep4Filter(tab.id as any)}
                      className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer border ${
                        step4Filter === tab.id
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="relative min-w-[200px] sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search room or class..."
                    value={step4Search}
                    onChange={e => setStep4Search(e.target.value)}
                    className="w-full pl-8 pr-7 py-1.5 rounded-xl border border-slate-200 bg-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  {step4Search && (
                    <button
                      type="button"
                      onClick={() => setStep4Search('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Grid of Room Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs max-h-[500px] overflow-y-auto pr-1">
                {filteredRooms.map(room => {
                  const isEditing = editingRoomId === room.id;
                  const t = (room.type || '').toLowerCase().replace(/_/g, ' ');
                  let badge = { label: 'Classroom', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
                  if (t.includes('computer') || t.includes('it')) {
                    badge = { label: 'IT Suite', bg: 'bg-sky-50 text-sky-700 border-sky-200' };
                  } else if (t.includes('science') || t.includes('lab') || t.includes('physics') || t.includes('chem') || t.includes('bio')) {
                    badge = { label: 'Science Lab', bg: 'bg-purple-50 text-purple-700 border-purple-200' };
                  } else if (t.includes('sport') || t.includes('ground') || t.includes('outdoor') || t.includes('field') || t.includes('pe')) {
                    badge = { label: 'Sports / Field', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
                  } else if (t.includes('art') || t.includes('music') || t.includes('dance') || t.includes('studio')) {
                    badge = { label: 'Creative Studio', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
                  } else if (t.includes('auditorium') || t.includes('hall')) {
                    badge = { label: 'Auditorium', bg: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200' };
                  } else if (t.includes('library')) {
                    badge = { label: 'Library', bg: 'bg-teal-50 text-teal-700 border-teal-200' };
                  }

                  if (isEditing) {
                    return (
                      <div key={room.id} className="p-3.5 rounded-xl border-2 border-indigo-500 bg-indigo-50/40 space-y-2 shadow-xs col-span-1 sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center justify-between font-bold text-xs text-indigo-950 border-b border-indigo-200 pb-1.5">
                          <span>Edit Facility</span>
                          <span className="text-[10px] text-slate-400">ID: {room.id.slice(0, 8)}...</span>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-600 uppercase">Room Name / Number</label>
                          <input
                            value={editRoomName}
                            onChange={e => setEditRoomName(e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-semibold bg-white text-xs"
                            placeholder="e.g. Classroom A-101"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] font-bold text-slate-600 uppercase">Facility Type</label>
                            <select
                              value={editRoomType}
                              onChange={e => setEditRoomType(e.target.value)}
                              className="w-full px-2 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-medium"
                            >
                              <option value="classroom">Classroom</option>
                              <option value="lab">Science Lab</option>
                              <option value="computer_lab">IT Suite / Computer Lab</option>
                              <option value="studio">Creative Studio</option>
                              <option value="sports">Sports Ground / Field</option>
                              <option value="auditorium">Auditorium / Hall</option>
                              <option value="library">Library</option>
                              <option value="other">Other Facility</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-600 uppercase">Capacity (Students)</label>
                            <input
                              type="number"
                              min={1}
                              max={200}
                              value={editRoomCapacity}
                              onChange={e => setEditRoomCapacity(Number(e.target.value) || 35)}
                              className="w-full px-2 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-600 uppercase">Dedicated Homeroom For (Optional)</label>
                          <select
                            value={editRoomHomeroomClassId}
                            onChange={e => setEditRoomHomeroomClassId(e.target.value)}
                            className="w-full px-2 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-medium"
                          >
                            <option value="">None (Shared Facility / Lab)</option>
                            {school.classes.map(c => (
                              <option key={c.id} value={c.id}>Class {c.name} ({c.grade})</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center justify-end gap-2 pt-1 border-t border-indigo-200">
                          <button
                            type="button"
                            onClick={() => setEditingRoomId(null)}
                            className="px-2.5 py-1 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 text-xs font-medium cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleSaveEditRoom}
                            className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={room.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs transition space-y-2 flex flex-col justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-start justify-between gap-1.5">
                          <span className="font-bold text-slate-900 text-xs break-words">{room.name}</span>
                          <div className="flex items-center gap-1 shrink-0">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.bg}`}>
                              {badge.label}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleStartEditRoom(room)}
                              className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition cursor-pointer"
                              title={`Edit ${room.name}`}
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteRoom(room)}
                              className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                              title={`Delete ${room.name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="text-[11px] text-slate-600 flex items-center gap-1">
                          {room.homeroomForClassName ? (
                            <span className="text-indigo-900 font-medium">
                              Dedicated Homeroom for <strong className="font-bold text-indigo-700">Class {room.homeroomForClassName}</strong>
                            </span>
                          ) : (
                            <span className="text-slate-500 italic">
                              Shared Facility for Practicals &amp; Curriculum
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                        <span>Capacity: <strong className="font-semibold text-slate-700">{room.capacity || 35} Students</strong></span>
                        <span className="text-slate-400">• Whiteboard &amp; AV</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredRooms.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-500 border border-dashed border-slate-200 rounded-xl">
                  No rooms or facilities match your current search or filter.
                </div>
              )}

              {/* Add Facility Form */}
              <div className="border-t border-slate-100 pt-4 space-y-3 text-xs">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-indigo-600" />
                  <span>Add New Facility / Room</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  <input
                    placeholder="Facility Name (e.g. Physics Lab 1)"
                    value={newRoomName}
                    onChange={e => setNewRoomName(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
                  />
                  <select
                    value={newRoomType}
                    onChange={e => setNewRoomType(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
                  >
                    <option value="classroom">Classroom</option>
                    <option value="lab">Science Lab</option>
                    <option value="computer_lab">IT Suite / Computer Lab</option>
                    <option value="studio">Creative Studio</option>
                    <option value="sports">Sports Ground / Field</option>
                    <option value="auditorium">Auditorium / Hall</option>
                    <option value="library">Library</option>
                    <option value="other">Other Facility</option>
                  </select>
                  <input
                    type="number"
                    min={1}
                    max={200}
                    placeholder="Capacity (e.g. 35)"
                    value={newRoomCapacity}
                    onChange={e => setNewRoomCapacity(Number(e.target.value) || 35)}
                    className="px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
                  />
                  <select
                    value={newRoomHomeroomClassId}
                    onChange={e => setNewRoomHomeroomClassId(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
                  >
                    <option value="">Homeroom: None (Shared)</option>
                    {school.classes.map(c => (
                      <option key={c.id} value={c.id}>Class {c.name} ({c.grade})</option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={handleAddRoom}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer transition shadow-xs"
                >
                  + Add Facility
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Subjects */}
          {currentStep === 5 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span>Step 5: Subject Catalog &amp; Specialist Requirements ({school.subjects.length})</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configure curriculum subjects, practical double-period blocks, and card themes.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleApplyCbseCurriculum('cbse_full')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                    title="1-Click apply standard CBSE / National Curriculum catalog (10 Subjects with lab links & colors)"
                  >
                    <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>⚡ Apply CBSE Curriculum</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyCbseCurriculum('core_only')}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-2xs transition cursor-pointer"
                    title="Apply Core 6 Academic Subjects only"
                  >
                    <span>Core 6 Only</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddSubjectOpen(x => !x)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-2xs transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{isAddSubjectOpen ? 'Close Form' : 'Add Subject'}</span>
                  </button>
                  <span className="text-[11px] text-slate-500 font-semibold bg-slate-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                    {filteredStep5Subjects.length} of {school.subjects.length} Subjects
                  </span>
                </div>
              </div>

              {/* Filter Tabs & Search Bar (Matching Step 7 & 8) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { id: 'all', label: `All (${step5Counts.all})` },
                    { id: 'academic', label: `Academic (${step5Counts.academic})` },
                    { id: 'activity', label: `Activity (${step5Counts.activity})` },
                    { id: 'lab', label: `Lab / Block (${step5Counts.lab})` },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setStep5Filter(tab.id as any)}
                      className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer border ${
                        step5Filter === tab.id
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs font-bold'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="relative min-w-[200px] sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search subjects, codes, labs..."
                    value={step5Search}
                    onChange={e => setStep5Search(e.target.value)}
                    className="w-full pl-8 pr-7 py-1.5 rounded-xl border border-slate-200 bg-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  {step5Search && (
                    <button
                      type="button"
                      onClick={() => setStep5Search('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Collapsible Add Subject Form */}
              {isAddSubjectOpen && (
                <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-200 space-y-3 text-xs animate-in fade-in duration-200">
                  <div className="font-bold text-indigo-950 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-indigo-600" />
                      Add New Subject
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAddSubjectOpen(false)}
                      className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <input
                      placeholder="Subject Name (e.g. Robotics)"
                      value={newSubName}
                      onChange={e => setNewSubName(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
                    />
                    <input
                      placeholder="Code (e.g. ROB)"
                      value={newSubCode}
                      onChange={e => setNewSubCode(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
                    />
                    <select
                      value={newSubType}
                      onChange={e => setNewSubType(e.target.value as 'academic' | 'activity')}
                      className="px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
                    >
                      <option value="academic">Academic</option>
                      <option value="activity">Activity Block</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 select-none">
                      <input
                        type="checkbox"
                        checked={newSubDoublePeriod}
                        onChange={e => setNewSubDoublePeriod(e.target.checked)}
                        className="rounded border-slate-300 text-indigo-600"
                      />
                      <FlaskConical className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Require 2-Period Consecutive Block (Science Lab / Art / Practical)</span>
                    </label>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAddSubjectOpen(false)}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-white text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        await handleAddSubject();
                        setIsAddSubjectOpen(false);
                      }}
                      className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer transition shadow-xs"
                    >
                      Save Subject
                    </button>
                  </div>
                </div>
              )}

              {/* Multi-Column Responsive Grid matching Step 7 & Step 8 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[560px] overflow-y-auto pr-1">
                {filteredStep5Subjects.map(sub => {
                  const isActivity = sub.type === 'activity';
                  const hasLab = Boolean(sub.room || sub.requiresDoublePeriod);

                  return (
                    <div
                      key={sub.id}
                      className="p-3 rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between text-xs shadow-2xs space-y-2.5"
                    >
                      <div>
                        {/* Top: Code avatar badge + Name + Type + Delete */}
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs ${
                              isActivity ? 'bg-purple-600 text-white' : 'bg-indigo-600 text-white'
                            }`}>
                              {(sub.code || sub.name.slice(0, 3)).toUpperCase().slice(0, 3)}
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-slate-900 text-xs truncate" title={sub.name}>
                                {sub.name}
                              </div>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md uppercase tracking-wider border ${
                                  isActivity
                                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                                    : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                }`}>
                                  {sub.type}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {sub.code}
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteSubject(sub.id)}
                            className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer shrink-0"
                            title={`Delete Subject ${sub.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Badges for Lab Room & Double-Period */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {sub.room ? (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
                              <DoorOpen className="w-3 h-3 text-purple-500" />
                              <span className="truncate max-w-[120px]">{sub.room}</span>
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 rounded text-[10px] text-slate-400 bg-slate-50 border border-slate-200">
                              Classroom
                            </span>
                          )}
                          {sub.requiresDoublePeriod && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                              <Zap className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                              <span>2-Period Block</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Footer: Weekly Periods Distribution */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                        <span className="text-[10px] text-slate-500">
                          Primary: <strong className="font-semibold text-slate-700">{sub.freqPrimary ?? 0}p</strong> • Senior: <strong className="font-semibold text-slate-700">{sub.freqSenior ?? 0}p</strong>
                        </span>
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-100">
                          {(sub.freqPrimary ?? 0) + (sub.freqSenior ?? 0)}p / wk
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredStep5Subjects.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-500 border border-dashed border-slate-200 rounded-xl">
                  No subjects match your current search or filter.
                </div>
              )}
            </div>
          )}

          {/* STEP 6: Weekly Periods */}
          {currentStep === 6 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    <span>Step 6: Weekly Period Budget &amp; Frequency Allocator</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Calibrate periods per week for every subject to fit school-day capacity.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleApplyPresetFrequencies('cbse_standard')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-200 bg-white hover:bg-indigo-50/60 text-indigo-900 font-bold text-xs shadow-2xs cursor-pointer transition"
                    title="Apply standard CBSE curriculum hour distribution across tiers"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>⚡ Standard CBSE Hours</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPresetFrequencies('stem_focus')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sky-200 bg-white hover:bg-sky-50/60 text-sky-900 font-bold text-xs shadow-2xs cursor-pointer transition"
                    title="Apply STEM & Practical lab focus distribution"
                  >
                    <Zap className="w-3.5 h-3.5 text-sky-500 fill-sky-500" />
                    <span>⚡ STEM &amp; Lab Focus</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleAutoBalance}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs cursor-pointer transition"
                    title="Automatically adjust frequencies to eliminate any remaining period deficit or surplus"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Smart Auto-Balance</span>
                  </button>
                </div>
              </div>

              {/* Weekly Capacity Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    primaryDiff === 0
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs">Primary Cohorts</div>
                    <div className="text-[11px] opacity-75">{totalPrimaryFreq} / {primaryCap} periods/week</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/80 shadow-2xs">
                    {primaryDiff === 0 ? '✓ Balanced' : `${primaryDiff} Remaining`}
                  </span>
                </div>

                <div
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    seniorDiff === 0
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs">Senior Cohorts</div>
                    <div className="text-[11px] opacity-75">{totalSeniorFreq} / {seniorCap} periods/week</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/80 shadow-2xs">
                    {seniorDiff === 0 ? '✓ Balanced' : `${seniorDiff} Remaining`}
                  </span>
                </div>
              </div>

              {/* Subject Frequency Matrix Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[520px] overflow-y-auto pr-1 text-xs">
                {school.subjects.map(sub => {
                  const isActivity = sub.type === 'activity';
                  const totalFreq = (sub.freqPrimary || 0) + (sub.freqSenior || 0);

                  return (
                    <div
                      key={sub.id}
                      className="p-3.5 rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between shadow-2xs space-y-3"
                    >
                      {/* Top Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs ${
                            isActivity ? 'bg-purple-600 text-white' : 'bg-indigo-600 text-white'
                          }`}>
                            {(sub.code || sub.name.slice(0, 3)).toUpperCase().slice(0, 3)}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 text-xs truncate" title={sub.name}>
                              {sub.name}
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md uppercase tracking-wider border ${
                                isActivity
                                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                                  : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                              }`}>
                                {sub.type}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {sub.code}
                              </span>
                            </div>
                          </div>
                        </div>

                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
                          {totalFreq} p/wk
                        </span>
                      </div>

                      {/* Steppers for Primary and Senior */}
                      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                        {/* Primary Stepper */}
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between">
                          <span className="text-[10px] font-semibold text-slate-500 mb-1">Primary Tier:</span>
                          <div className="flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() => handleUpdateSubjectFreq(sub.id, 'primary', -1)}
                              className="w-6 h-6 rounded-md bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition cursor-pointer shadow-2xs"
                              title="Decrease Primary frequency"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-bold text-slate-900 text-xs">{sub.freqPrimary}p</span>
                            <button
                              type="button"
                              onClick={() => handleUpdateSubjectFreq(sub.id, 'primary', 1)}
                              className="w-6 h-6 rounded-md bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition cursor-pointer shadow-2xs"
                              title="Increase Primary frequency"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Senior Stepper */}
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between">
                          <span className="text-[10px] font-semibold text-slate-500 mb-1">Senior Tier:</span>
                          <div className="flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() => handleUpdateSubjectFreq(sub.id, 'senior', -1)}
                              className="w-6 h-6 rounded-md bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition cursor-pointer shadow-2xs"
                              title="Decrease Senior frequency"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-bold text-slate-900 text-xs">{sub.freqSenior}p</span>
                            <button
                              type="button"
                              onClick={() => handleUpdateSubjectFreq(sub.id, 'senior', 1)}
                              className="w-6 h-6 rounded-md bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition cursor-pointer shadow-2xs"
                              title="Increase Senior frequency"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 7: Faculty Roster & Workload Caps */}
          {currentStep === 7 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-indigo-600" />
                    <span>Step 7: Faculty Roster &amp; Workload Limits ({school.teachers.length})</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Multi-tier instructor directory, qualified subjects, and weekly teaching workload caps.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setIsBatchStaffModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                    title="Batch import or generate faculty roster"
                  >
                    <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>⚡ Batch Setup Faculty</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddTeacherOpen(x => !x)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-2xs transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{isAddTeacherOpen ? 'Close Form' : 'Add Teacher'}</span>
                  </button>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 whitespace-nowrap">
                    {filteredStep7Teachers.length} of {school.teachers.length} Faculty
                  </span>
                </div>
              </div>

              {/* Filter Tabs & Search Bar (Matching Step 8 & Step 4) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { id: 'all', label: `All (${step7Counts.all})` },
                    ...(step7Counts.pgt > 0 ? [{ id: 'pgt', label: `PGT (${step7Counts.pgt})` }] : []),
                    ...(step7Counts.tgt > 0 ? [{ id: 'tgt', label: `TGT (${step7Counts.tgt})` }] : []),
                    ...(step7Counts.prt > 0 ? [{ id: 'prt', label: `PRT (${step7Counts.prt})` }] : []),
                    ...(step7Counts.ntt > 0 ? [{ id: 'ntt', label: `NTT (${step7Counts.ntt})` }] : []),
                    ...(step7Counts.specialist > 0 ? [{ id: 'specialist', label: `Specialist (${step7Counts.specialist})` }] : []),
                    { id: 'near_cap', label: `Near Cap (${step7Counts.nearCap})` },
                    ...(step7Counts.leave > 0 ? [{ id: 'leave', label: `On Leave (${step7Counts.leave})` }] : []),
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setStep7Filter(tab.id as any)}
                      className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer border ${
                        step7Filter === tab.id
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs font-bold'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="relative min-w-[200px] sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search name, subject, or wing..."
                    value={step7Search}
                    onChange={e => setStep7Search(e.target.value)}
                    className="w-full pl-8 pr-7 py-1.5 rounded-xl border border-slate-200 bg-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  {step7Search && (
                    <button
                      type="button"
                      onClick={() => setStep7Search('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Add Faculty Collapsible Panel */}
              {isAddTeacherOpen && (
                <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200 space-y-3 text-xs animate-in fade-in duration-150">
                  <div className="font-bold text-indigo-950 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-indigo-600" />
                      Add New Faculty Member
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAddTeacherOpen(false)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                    <input
                      placeholder="Full Name (e.g. Dr. Emily Watson)"
                      value={newTeacherName}
                      onChange={e => setNewTeacherName(e.target.value)}
                      className="sm:col-span-2 px-3 py-2 rounded-xl border border-slate-300 font-semibold bg-white text-xs"
                    />
                    <div>
                      <select
                        value={newTeacherDesignation}
                        onChange={e => setNewTeacherDesignation(e.target.value)}
                        className="w-full px-2.5 py-2 rounded-xl border border-slate-300 font-semibold bg-white text-xs"
                      >
                        <option value="PGT">PGT (Senior Sec)</option>
                        <option value="TGT">TGT (Middle/Secondary)</option>
                        <option value="PRT">PRT (Primary)</option>
                        <option value="NTT">NTT (Pre-Primary)</option>
                        <option value="Specialist">Specialist / Activity</option>
                      </select>
                    </div>
                    <div>
                      <select
                        value={newTeacherWings}
                        onChange={e => setNewTeacherWings(e.target.value)}
                        className="w-full px-2.5 py-2 rounded-xl border border-slate-300 font-semibold bg-white text-xs"
                      >
                        <option value="Senior Secondary">Senior Secondary</option>
                        <option value="Secondary">Secondary</option>
                        <option value="Middle">Middle</option>
                        <option value="Primary">Primary</option>
                        <option value="Pre-Primary">Pre-Primary</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500 font-medium text-[11px] whitespace-nowrap">Daily Max:</span>
                      <input
                        type="number"
                        min={1}
                        max={8}
                        value={newTeacherMaxPerDay}
                        onChange={e => setNewTeacherMaxPerDay(Number(e.target.value) || 5)}
                        className="w-full px-2 py-1.5 rounded-lg border border-slate-300 font-bold bg-white text-xs"
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500 font-medium text-[11px] whitespace-nowrap">Weekly Max:</span>
                      <input
                        type="number"
                        min={1}
                        max={40}
                        value={newTeacherMaxPerWeek}
                        onChange={e => setNewTeacherMaxPerWeek(Number(e.target.value) || 30)}
                        className="w-full px-2 py-1.5 rounded-lg border border-slate-300 font-bold bg-white text-xs"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <select
                        value={newTeacherWorkingDays}
                        onChange={e => setNewTeacherWorkingDays(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-medium bg-white text-xs"
                      >
                        <option value="Mon-Sat">Mon–Sat (Full Time 6 Days)</option>
                        <option value="Mon-Fri">Mon–Fri (Full Time 5 Days)</option>
                        <option value="Mon,Wed,Fri">Mon, Wed, Fri (Visiting Part-Time)</option>
                        <option value="Tue,Thu">Tue, Thu (Visiting Part-Time)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-600 font-bold">Select Qualified Teaching Subjects:</label>
                    <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-2 bg-white rounded-xl border border-slate-200">
                      {school.subjects.map(s => {
                        const selected = newTeacherSubjects.includes(s.id);
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => toggleSubjectForNewTeacher(s.id)}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border transition cursor-pointer ${
                              selected
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {s.name} ({s.code})
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAddTeacherOpen(false)}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-white text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        await handleAddTeacher();
                        setIsAddTeacherOpen(false);
                      }}
                      className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer transition shadow-xs"
                    >
                      Save Faculty Member
                    </button>
                  </div>
                </div>
              )}

              {/* Multi-Column Responsive Grid matching Step 8 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[560px] overflow-y-auto pr-1">
                {filteredStep7Teachers.map(t => {
                  const wl = step7TeacherWorkloads[t.id] || { assigned: 0, max: t.maxPerWeek || 30, pct: 0, overloaded: false };
                  const isNearCap = wl.pct >= 85 && !wl.overloaded;

                  // Initials for avatar
                  const parts = t.name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s*/i, '').split(' ');
                  const initials = parts.length > 1
                    ? (parts[0][0] + parts[1][0]).toUpperCase()
                    : t.name.slice(0, 2).toUpperCase();

                  // Role badge color
                  const resolvedDesig = resolveTeacherDesignation(t);
                  const desig = resolvedDesig.toUpperCase();
                  let roleColor = 'bg-slate-100 text-slate-700 border-slate-200';
                  let avatarBg = 'bg-slate-100 text-slate-700';
                  if (desig === 'PGT') {
                    roleColor = 'bg-violet-50 text-violet-700 border-violet-200';
                    avatarBg = 'bg-violet-600 text-white';
                  } else if (desig === 'TGT') {
                    roleColor = 'bg-indigo-50 text-indigo-700 border-indigo-200';
                    avatarBg = 'bg-indigo-600 text-white';
                  } else if (desig === 'PRT') {
                    roleColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                    avatarBg = 'bg-emerald-600 text-white';
                  } else if (desig === 'NTT') {
                    roleColor = 'bg-amber-50 text-amber-800 border-amber-200';
                    avatarBg = 'bg-amber-500 text-white';
                  } else if (desig.includes('SPECIALIST') || desig.includes('ACTIVITY')) {
                    roleColor = 'bg-pink-50 text-pink-700 border-pink-200';
                    avatarBg = 'bg-pink-600 text-white';
                  }

                  return (
                    <div
                      key={t.id}
                      className={`p-3 rounded-xl border text-xs transition-all duration-200 flex flex-col justify-between shadow-2xs hover:shadow-xs hover:border-slate-300 ${
                        wl.overloaded
                          ? 'bg-rose-50/70 border-rose-300 ring-1 ring-rose-300/40'
                          : isNearCap
                          ? 'bg-amber-50/60 border-amber-200'
                          : t.status === 'On Leave'
                          ? 'bg-slate-50/90 border-slate-300 opacity-80'
                          : 'bg-white border-slate-200/90'
                      }`}
                    >
                      {/* Top Header: Avatar + Name + Designation + Delete */}
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs ${avatarBg}`}>
                              {initials}
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-slate-900 text-xs truncate" title={t.name}>
                                {t.name}
                              </div>
                              <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md uppercase tracking-wider border ${roleColor}`}>
                                  {resolvedDesig}
                                </span>
                                {t.teachingWings && (
                                  <span className="text-[10px] text-slate-400 font-medium truncate max-w-[100px]">
                                    • {t.teachingWings}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteTeacher(t.id)}
                            className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer shrink-0"
                            title={`Delete Teacher ${t.name}`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Badges for Homeroom or Leave */}
                        {t.classTeacherOf && (
                          <div className="mb-2 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold flex items-center gap-1 w-fit">
                            <span>⭐ Class Teacher: {t.classTeacherOf}</span>
                          </div>
                        )}
                        {t.status === 'On Leave' && (
                          <div className="mb-2 px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200 text-[10px] font-bold flex items-center gap-1 w-fit">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                            <span>Maternity Leave (Inactive)</span>
                          </div>
                        )}

                        {/* Subjects Pills with Clean Names (No raw sub- prefixes!) */}
                        <div className="mb-2.5">
                          <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto">
                            {t.subjects.map(sid => {
                              const sub = school.subjects.find(s => s.id === sid || s.code === sid || s.id.replace(/^sub-/, '').toUpperCase() === sid.toUpperCase());
                              const subName = sub?.name || sid.replace(/^sub-/, '').toUpperCase();
                              const isPrimary = (t.primarySubject && (sub?.code === t.primarySubject || sid === t.primarySubject));
                              return (
                                <span
                                  key={sid}
                                  className={`px-1.5 py-0.5 rounded text-[10px] font-semibold flex items-center gap-0.5 border ${
                                    isPrimary
                                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200 font-bold'
                                      : 'bg-slate-50 text-slate-600 border-slate-200'
                                  }`}
                                  title={subName}
                                >
                                  <span className="truncate max-w-[110px]">{subName}</span>
                                  {isPrimary && <span className="text-[9px] text-indigo-500">★</span>}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Footer: Workload limits + Live Progress Bar (Consistent with Step 8!) */}
                      <div className="pt-2 border-t border-slate-100 space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] text-slate-500">
                          <div className="flex items-center gap-1 font-medium">
                            <span className="bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-bold">
                              ≤ {t.maxPerDay} p/day
                            </span>
                            <span className="text-slate-400">• {t.workingDays || 'Mon-Sat'}</span>
                          </div>
                          <div className="flex items-center gap-1 font-bold">
                            <span>{wl.assigned}/{wl.max} p/wk</span>
                            <span className={wl.overloaded ? 'text-rose-600' : isNearCap ? 'text-amber-600' : 'text-slate-600'}>
                              ({wl.pct}%)
                            </span>
                          </div>
                        </div>

                        {/* Workload Progress Bar */}
                        <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              wl.overloaded ? 'bg-rose-500' : isNearCap ? 'bg-amber-500' : 'bg-indigo-500'
                            }`}
                            style={{ width: `${Math.min(wl.pct, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 8: Teacher Assignments (Primary Architectural Layer) */}
          {currentStep === 8 && (
            <div className="space-y-4">
              <TeacherAssignmentsCard school={school} app={app} />
            </div>
          )}

          {/* STEP 9: Special Rules & Blocks */}
          {currentStep === 9 && (
            <div className="space-y-4">
              <SpecialRulesCard school={school} app={app} />
            </div>
          )}

          {/* STEP 10: Review & Check (Pre-Generation Feasibility & Conflict Audit) */}
          {currentStep === 10 && (
            <Step10FeasibilityAudit
              school={school}
              updateSchool={updateSchool}
              onRunSolver={onRunSolver}
              showToast={(msg, type) => app?.showToast(msg, type)}
              onLoadDataset2={app?.loadTestDataset2}
              setIsBulkModalOpen={setIsBulkModalOpen}
            />
          )}

          {/* Bottom Step Navigation Footer */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex items-center justify-between gap-4">
            <button
              type="button"
              disabled={currentStep <= 1}
              onClick={() => setStep(Math.max(1, currentStep - 1))}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Step</span>
            </button>

            <span className="text-xs font-bold text-slate-500">
              Step {currentStep} of 10
            </span>

            <button
              type="button"
              disabled={currentStep >= 10}
              onClick={() => setStep(Math.min(10, currentStep + 1))}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <BulkImportModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        school={school}
        updateSchool={updateSchool}
        onRunSolver={onRunSolver}
      />

      <BatchClassGeneratorModal
        isOpen={isBatchClassModalOpen}
        onClose={() => setIsBatchClassModalOpen(false)}
        onGenerate={handleGenerateBatchClasses}
        existingCount={school.classes.length}
      />

      <BatchStaffGeneratorModal
        isOpen={isBatchStaffModalOpen}
        onClose={() => setIsBatchStaffModalOpen(false)}
        onGenerate={handleGenerateBatchStaff}
        subjects={school.subjects}
        classes={school.classes}
        existingCount={school.teachers.length}
      />

      {app && (
        <NewSchoolModal
          app={app}
          isOpen={isNewSchoolOpen}
          onClose={() => setIsNewSchoolOpen(false)}
        />
      )}
    </div>
  );
}
