import { BookOpen, Layers, Sliders, Upload, FileSpreadsheet, Trash2, Plus, Minus, Users, DoorOpen, Sparkles, Check, AlertCircle, Clock, Calendar, Coffee, Utensils, Sun, Building2, Globe, Pencil, ChevronDown, Palette, FlaskConical } from 'lucide-react';
import { useState } from 'react';
import { DEFAULT_TIMING_CONFIG, DEFAULT_SOLVER_PREFERENCES, SUBJECT_PALETTE, type School, type SchoolRules, type Tier, type TimingConfig } from '../../domain/types';
import { computeBellSchedule } from '../../engine/bellSchedule';
import { BulkImportModal } from './BulkImportModal';
import { NewSchoolModal } from '../../components/layout/NewSchoolModal';
import { SolverPreferencesCard } from './SolverPreferencesCard';
import type { TimetableApp } from '../../hooks/useTimetableApp';

interface Props {
  school: School;
  updateSchool: (updater: (s: School) => School) => void;
  onRunSolver: () => void;
  app?: TimetableApp;
}

export function AdminSetupPanel({ school, updateSchool, onRunSolver, app }: Props) {
  // Class creation state
  const [newClassName, setNewClassName] = useState('');
  const [newClassGrade, setNewClassGrade] = useState('Grade 6');
  const [newClassTier, setNewClassTier] = useState<Tier>('Primary');
  const [newClassRoom, setNewClassRoom] = useState('');

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

  const handleUpdateTiming = (newTiming: TimingConfig, newRules?: Partial<SchoolRules>, newDays?: string[]) => {
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
  const primaryCap = school.workingDays.length * school.rules.primaryEndPeriod; // e.g. 5 * 4 = 20 or 6 * 4 = 24
  const seniorCap = school.workingDays.length * school.rules.seniorEndPeriod;   // e.g. 5 * 6 = 30 or 6 * 6 = 36

  const totalPrimaryFreq = school.subjects.reduce((sum, s) => sum + (s.freqPrimary || 0), 0);
  const totalSeniorFreq = school.subjects.reduce((sum, s) => sum + (s.freqSenior || 0), 0);

  const primaryDiff = primaryCap - totalPrimaryFreq; // >0: free slots, <0: over-scheduled, 0: balanced
  const seniorDiff = seniorCap - totalSeniorFreq;   // >0: free slots, <0: over-scheduled, 0: balanced

  const handleAddClass = () => {
    if (!newClassName.trim()) return;
    const roomName = newClassRoom.trim() || `Room ${school.classes.length + 101}`;
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
    setNewClassName('');
    setNewClassRoom('');
    setTimeout(() => onRunSolver(), 150);
  };

  const handleDeleteClass = (classId: string) => {
    if (school.classes.length <= 1) {
      alert('At least one class section must remain in the school.');
      return;
    }
    updateSchool(s => ({
      ...s,
      classes: s.classes.filter(c => c.id !== classId),
    }));
    setTimeout(() => onRunSolver(), 150);
  };

  const handleAddTeacher = () => {
    if (!newTeacherName.trim()) return;
    const subs = newTeacherSubjects.length > 0 ? newTeacherSubjects : [school.subjects[0]?.id || 'sub-math'];
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
    setNewTeacherName('');
    setNewTeacherSubjects([]);
    setTimeout(() => onRunSolver(), 150);
  };

  const handleDeleteTeacher = (teacherId: string) => {
    if (school.teachers.length <= 1) {
      alert('At least one faculty instructor must remain in the school.');
      return;
    }
    updateSchool(s => ({
      ...s,
      teachers: s.teachers.filter(t => t.id !== teacherId),
      absences: s.absences.filter(a => a.teacherId !== teacherId),
    }));
    setTimeout(() => onRunSolver(), 150);
  };

  const toggleSubjectForNewTeacher = (subId: string) => {
    setNewTeacherSubjects(prev =>
      prev.includes(subId) ? prev.filter(id => id !== subId) : [...prev, subId]
    );
  };

  const handleAddSubject = () => {
    if (!newSubName.trim()) return;
    const subId = `sub-${Date.now().toString(36)}`;
    const code = newSubCode.trim().toUpperCase() || newSubName.trim().slice(0, 4).toUpperCase();
    const color = newSubType === 'activity'
      ? 'bg-purple-100 text-purple-800 border-purple-300'
      : (newSubColor || SUBJECT_PALETTE[school.subjects.length % SUBJECT_PALETTE.length].color);

    updateSchool(s => {
      let updatedTeachers = [...s.teachers];
      if (newSubTeacherId === 'auto') {
        // Auto-assign: pick the teacher with fewest subjects to balance the faculty load
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

    setNewSubName('');
    setNewSubCode('');
    setNewSubRoom('');
    setNewSubDoublePeriod(false);
    setTimeout(() => onRunSolver(), 150);
  };

  const handleDeleteSubject = (subjectId: string) => {
    if (school.subjects.length <= 1) {
      alert('At least one subject must remain in the school.');
      return;
    }
    updateSchool(s => ({
      ...s,
      subjects: s.subjects.filter(sub => sub.id !== subjectId),
      teachers: s.teachers.map(t => ({
        ...t,
        subjects: t.subjects.filter(sid => sid !== subjectId),
      })),
    }));
    setTimeout(() => onRunSolver(), 150);
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

  // Smart Auto-Balance Algorithm: proportional scaling and fit to exact weekly capacities
  const handleAutoBalance = () => {
    updateSchool(s => {
      const pCap = s.workingDays.length * s.rules.primaryEndPeriod;
      const sCap = s.workingDays.length * s.rules.seniorEndPeriod;

      const subjectsCopy = s.subjects.map(sub => ({ ...sub }));

      // 1. Balance Primary Tier
      let currentP = subjectsCopy.reduce((sum, sub) => sum + (sub.freqPrimary || 0), 0);
      let diffP = pCap - currentP;

      if (diffP < 0) {
        // Over-scheduled: trim from highest-frequency academic subjects
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
        // Under-scheduled: add to lowest-frequency academic subjects
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
        // Over-scheduled: trim from highest-frequency academic subjects
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
        // Under-scheduled: add to lowest-frequency academic subjects
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

  return (
    <div className="space-y-6">
      {/* Fast-Track Onboarding Banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <Upload className="w-5 h-5 text-indigo-300" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
              <span>Fast-Track School Onboarding</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                CSV Bulk Ingestion
              </span>
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Upload or paste whole class grade sections and faculty rosters in seconds with automated duplicate validation.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsBulkModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition cursor-pointer"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Launch Bulk CSV Importer</span>
        </button>
      </div>

      <BulkImportModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        school={school}
        updateSchool={updateSchool}
        onRunSolver={onRunSolver}
      />

      {/* ── School Identity Card ───────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        {/* Multi-School Switcher / Actions bar */}
        {app && (
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tenants:</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {app.schools.map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => app.setActiveSchoolId(s.id)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                      s.id === school.id
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Building2 className="w-3 h-3" />
                    <span>{s.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsNewSchoolOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New School</span>
              </button>

              {app.schools.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete "${school.name}"? This action cannot be undone.`)) {
                      app.deleteSchool(school.id);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 text-xs font-bold transition cursor-pointer"
                  title="Delete this school instance"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete School</span>
                </button>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-indigo-600" />
            <span>School Identity &amp; Academic Term</span>
          </h3>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {school.published ? '🟢 Published' : '🟡 Draft'}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* School Name */}
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
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Academic Term */}
          <div className="lg:col-span-2">
            <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
              Academic Term
            </label>
            <input
              type="text"
              value={school.term}
              onChange={e => updateSchool(s => ({ ...s, term: e.target.value }))}
              placeholder="e.g. Academic Year 2026–27 (Term 1)"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Timezone */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-500" />
              Timezone
            </label>
            <select
              value={school.timezone}
              onChange={e => updateSchool(s => ({ ...s, timezone: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            >
              <option value="IST (UTC+5:30)">IST (UTC+5:30) — India</option>
              <option value="UTC+0">UTC+0 — London</option>
              <option value="UTC+1">UTC+1 — Central Europe</option>
              <option value="UTC+2">UTC+2 — Eastern Europe</option>
              <option value="UTC+3">UTC+3 — Gulf / EAT</option>
              <option value="UTC+4">UTC+4 — GST / Dubai</option>
              <option value="UTC+5">UTC+5 — PKT / Ekaterinburg</option>
              <option value="UTC+7">UTC+7 — WIB / Bangkok</option>
              <option value="UTC+8">UTC+8 — AWST / Singapore / CST</option>
              <option value="UTC-5">UTC-5 — EST / New York</option>
              <option value="UTC-6">UTC-6 — CST / Chicago</option>
              <option value="UTC-7">UTC-7 — MST / Denver</option>
              <option value="UTC-8">UTC-8 — PST / Los Angeles</option>
            </select>
          </div>

          {/* Subdomain */}
          <div className="lg:col-span-3">
            <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Pencil className="w-3.5 h-3.5 text-indigo-500" />
              Portal Subdomain
            </label>
            <div className="flex items-center gap-0">
              <input
                type="text"
                value={school.subdomain.replace(/\.chronos\.edu$/, '').replace(/\.chronosedu$/, '')}
                onChange={e => {
                  const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/--+/g, '-').replace(/^-|-$/g, '');
                  updateSchool(s => ({ ...s, subdomain: `${slug}.chronos.edu` }));
                }}
                placeholder="your-school"
                className="flex-1 px-3 py-2 rounded-l-xl border border-r-0 border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
              <span className="px-3 py-2 rounded-r-xl border border-slate-300 bg-slate-100 text-slate-500 font-semibold text-[11px] whitespace-nowrap">.chronos.edu</span>
            </div>
          </div>
        </div>

        {/* Live preview pill */}
        <div className="mt-3 flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
          <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Preview:</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-[12px] font-bold text-indigo-800">
            <Building2 className="w-3 h-3" />
            {school.name || 'School Name'}
          </span>
          <span className="text-slate-400 text-[11px]">&middot;</span>
          <span className="text-[11px] text-slate-500">{school.term || 'Academic Term'}</span>
          <span className="text-slate-400 text-[11px]">&middot;</span>
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
            <Globe className="w-3 h-3" />
            {school.timezone}
          </span>
          <span className="text-slate-400 text-[11px]">&middot;</span>
          <span className="text-[11px] font-mono text-slate-500">{school.subdomain}</span>
        </div>
      </div>

      {/* 2x2 Grid of School Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Bell Schedule, Start Time & Working Days */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>1. Bell Schedule, Start Time & Working Days</span>
            </h3>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
              {school.workingDays.length} Working Days • {computedSchedule.slots.filter(s => !s.isBreak).length} Periods/Day
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Working Days Selector & Quick Presets */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Working Days Calendar</span>
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
                    6-Day (Mon–Sat Full Day)
                  </button>
                </div>
              </div>

              {/* Day selection chips */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => {
                  const isActive = school.workingDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleToggleDay(day)}
                      className={`py-1.5 px-2 rounded-xl text-center font-bold text-xs border transition cursor-pointer flex items-center justify-center gap-1 ${
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
              {school.workingDays.includes('Saturday') && (
                <div className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-2 flex items-center gap-1.5">
                  <span className="font-bold">✨ Saturday Operations Active:</span> Timetable slots are generated across full Monday to Saturday week ({primaryCap} Primary / {seniorCap} Senior total weekly periods).
                </div>
              )}
            </div>

            {/* School Start Time & Period Length */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-100">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  School Opening / Start Time
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={timing.startTime}
                    onChange={(e) => handleUpdateTiming({ ...timing, startTime: e.target.value })}
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 font-bold bg-white text-slate-800"
                  />
                  <div className="flex items-center gap-1">
                    {['07:30', '08:00', '08:30'].map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => handleUpdateTiming({ ...timing, startTime: t })}
                        className={`px-1.5 py-1 rounded text-[10px] font-semibold border transition cursor-pointer ${
                          timing.startTime === t ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-bold' : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Standard Period Duration
                </label>
                <select
                  value={timing.periodDurationMinutes}
                  onChange={(e) => handleUpdateTiming({ ...timing, periodDurationMinutes: Number(e.target.value) || 45 })}
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300 font-bold bg-white text-slate-800"
                >
                  <option value={30}>30 Minutes</option>
                  <option value={35}>35 Minutes</option>
                  <option value={40}>40 Minutes</option>
                  <option value={45}>45 Minutes (Standard)</option>
                  <option value={50}>50 Minutes</option>
                  <option value={55}>55 Minutes</option>
                  <option value={60}>60 Minutes (1 Hour)</option>
                </select>
              </div>
            </div>

            {/* Periods Per Day — Primary & Senior */}
            <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-950 text-xs flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-600" />
                  Periods Per Day (Full-Day Lengths)
                </span>
                <span className="text-[10px] text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full font-semibold">
                  Controls school-day length per tier
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Primary */}
                <div className="bg-white rounded-xl border border-emerald-200 p-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-900">🟢 Primary Classes</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">Out at {computedSchedule.primaryDismissalTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const next = Math.max(2, school.rules.primaryEndPeriod - 1);
                        handleUpdateTiming(timing, { primaryEndPeriod: next });
                      }}
                      className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-base flex items-center justify-center hover:bg-emerald-200 transition cursor-pointer select-none"
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
                      className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-base flex items-center justify-center hover:bg-emerald-200 transition cursor-pointer select-none"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-[10px] text-emerald-600 text-center">
                    {school.rules.primaryEndPeriod} periods × {school.workingDays.length} days = <strong>{primaryCap} periods/wk</strong>
                  </div>
                </div>

                {/* Senior */}
                <div className="bg-white rounded-xl border border-sky-200 p-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-sky-900">🔵 Senior Classes</span>
                    <span className="text-[10px] text-sky-600 font-semibold">Out at {computedSchedule.seniorDismissalTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const next = Math.max(school.rules.primaryEndPeriod, school.rules.seniorEndPeriod - 1);
                        handleUpdateTiming(timing, { seniorEndPeriod: next });
                      }}
                      className="w-7 h-7 rounded-lg bg-sky-100 text-sky-800 font-bold text-base flex items-center justify-center hover:bg-sky-200 transition cursor-pointer select-none"
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
                      className="w-7 h-7 rounded-lg bg-sky-100 text-sky-800 font-bold text-base flex items-center justify-center hover:bg-sky-200 transition cursor-pointer select-none"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-[10px] text-sky-600 text-center">
                    {school.rules.seniorEndPeriod} periods × {school.workingDays.length} days = <strong>{seniorCap} periods/wk</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Zero Period / Morning Assembly */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-800 flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={timing.hasZeroPeriod}
                    onChange={(e) => handleUpdateTiming({ ...timing, hasZeroPeriod: e.target.checked })}
                    className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                  />
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Zero Period / Morning Assembly</span>
                </label>
                {timing.hasZeroPeriod && (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    {timing.zeroPeriodDurationMinutes} mins
                  </span>
                )}
              </div>

              {timing.hasZeroPeriod && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                  <input
                    value={timing.zeroPeriodLabel}
                    onChange={(e) => handleUpdateTiming({ ...timing, zeroPeriodLabel: e.target.value }, { zeroPeriodLabel: e.target.value })}
                    placeholder="Assembly & Homeroom"
                    className="px-2.5 py-1 rounded-lg border border-slate-300 bg-white"
                  />
                  <select
                    value={timing.zeroPeriodDurationMinutes}
                    onChange={(e) => handleUpdateTiming({ ...timing, zeroPeriodDurationMinutes: Number(e.target.value) || 30 })}
                    className="px-2.5 py-1 rounded-lg border border-slate-300 bg-white font-semibold"
                  >
                    <option value={15}>15 Minutes</option>
                    <option value={20}>20 Minutes</option>
                    <option value={25}>25 Minutes</option>
                    <option value={30}>30 Minutes</option>
                    <option value={40}>40 Minutes</option>
                  </select>
                </div>
              )}
            </div>

            {/* Recess & Lunch Breaks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Recess Break */}
              <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                    <Coffee className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Recess Break</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    {timing.recessDurationMinutes} mins
                  </span>
                </div>
                {/* Editable recess label */}
                <input
                  value={timing.recessLabel}
                  onChange={(e) => handleUpdateTiming({ ...timing, recessLabel: e.target.value })}
                  placeholder="Short Break"
                  className="w-full px-2.5 py-1 rounded-lg border border-emerald-300 bg-white text-xs font-semibold text-emerald-900"
                />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-emerald-800 font-semibold block mb-0.5">After Period:</label>
                    <select
                      value={timing.recessAfterPeriod}
                      onChange={(e) => handleUpdateTiming({ ...timing, recessAfterPeriod: Number(e.target.value) || 2 })}
                      className="w-full px-2 py-1 rounded-lg border border-emerald-300 bg-white text-xs font-semibold"
                    >
                      {Array.from({ length: Math.max(1, school.rules.primaryEndPeriod - 1) }, (_, i) => i + 1).map(p => (
                        <option key={p} value={p}>Period {p}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-emerald-800 font-semibold block mb-0.5">Duration:</label>
                    <select
                      value={timing.recessDurationMinutes}
                      onChange={(e) => handleUpdateTiming({ ...timing, recessDurationMinutes: Number(e.target.value) || 15 })}
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

              {/* Lunch Break */}
              <div className="p-3 rounded-xl bg-sky-50/60 border border-sky-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sky-950 flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-sky-700" />
                    <span>Lunch Break</span>
                  </span>
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md">
                    {timing.lunchDurationMinutes} mins
                  </span>
                </div>
                {/* Editable lunch label */}
                <input
                  value={timing.lunchLabel}
                  onChange={(e) => handleUpdateTiming({ ...timing, lunchLabel: e.target.value })}
                  placeholder="Lunch Break"
                  className="w-full px-2.5 py-1 rounded-lg border border-sky-300 bg-white text-xs font-semibold text-sky-900"
                />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-sky-800 font-semibold block mb-0.5">After Period:</label>
                    <select
                      value={timing.lunchAfterPeriod}
                      onChange={(e) => handleUpdateTiming({ ...timing, lunchAfterPeriod: Number(e.target.value) || 4 }, { lunchAfterPeriod: Number(e.target.value) || 4 })}
                      className="w-full px-2 py-1 rounded-lg border border-sky-300 bg-white text-xs font-semibold"
                    >
                      {Array.from(
                        { length: Math.max(1, school.rules.seniorEndPeriod - timing.recessAfterPeriod - 1) },
                        (_, i) => timing.recessAfterPeriod + 1 + i
                      ).map(p => (
                        <option key={p} value={p}>Period {p}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-sky-800 font-semibold block mb-0.5">Duration:</label>
                    <select
                      value={timing.lunchDurationMinutes}
                      onChange={(e) => handleUpdateTiming({ ...timing, lunchDurationMinutes: Number(e.target.value) || 30 })}
                      className="w-full px-2 py-1 rounded-lg border border-sky-300 bg-white text-xs font-semibold"
                    >
                      <option value={20}>20 Mins</option>
                      <option value={25}>25 Mins</option>
                      <option value={30}>30 Mins</option>
                      <option value={40}>40 Mins</option>
                      <option value={45}>45 Mins</option>
                      <option value={60}>60 Mins</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <label className="text-[10px] font-semibold text-sky-900 flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!timing.lunchSeniorOnly}
                      onChange={(e) => handleUpdateTiming({ ...timing, lunchSeniorOnly: !e.target.checked })}
                      className="rounded text-sky-600 focus:ring-sky-500 w-3.5 h-3.5"
                    />
                    <span>Synchronized for all classes</span>
                  </label>
                  <span className="text-[10px] text-sky-600">
                    {!timing.lunchSeniorOnly ? 'All Classes' : 'Senior Only'}
                  </span>
                </div>
              </div>
            </div>



            {/* Activity Block & Teacher Cap */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-100">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Weekly Activity Block Day</label>
                <select
                  value={school.rules.activityDay}
                  onChange={(e) => {
                    updateSchool(s => ({
                      ...s,
                      rules: { ...s.rules, activityDay: e.target.value }
                    }));
                    setTimeout(() => onRunSolver(), 150);
                  }}
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300 font-semibold bg-white"
                >
                  {school.workingDays.map(d => (
                    <option key={d} value={d}>{d} (Periods 1 & 2 Locked)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Teacher Daily Cap (Max Periods / Day)
                </label>
                <input
                  type="number"
                  min={3}
                  max={6}
                  value={school.rules.maxTeacherPeriodsPerDay}
                  onChange={(e) => {
                    const val = Number(e.target.value) || 5;
                    updateSchool(s => ({
                      ...s,
                      rules: { ...s.rules, maxTeacherPeriodsPerDay: val }
                    }));
                    setTimeout(() => onRunSolver(), 150);
                  }}
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300 font-bold bg-white"
                />
              </div>
            </div>

            {/* Live Visual Timeline Preview */}
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
                {computedSchedule.slots.map(s => {
                  if (s.type === 'zero') {
                    return (
                      <span key={s.label} className="px-2 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium">
                        🌅 {s.label} ({s.time})
                      </span>
                    );
                  }
                  if (s.type === 'break') {
                    return (
                      <span key={s.label} className="px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                        ☕ {s.label} ({s.time})
                      </span>
                    );
                  }
                  if (s.type === 'lunch') {
                    return (
                      <span key={s.label} className="px-2 py-1 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/30 font-medium">
                        🍱 {s.label} ({s.time})
                      </span>
                    );
                  }
                  return (
                    <span
                      key={s.label}
                      className={`px-2 py-1 rounded-md font-medium border ${
                        s.seniorOnly
                          ? 'bg-slate-800 text-sky-300 border-sky-500/30'
                          : 'bg-slate-800 text-slate-200 border-slate-700'
                      }`}
                    >
                      P{s.number}: {s.time}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Card 1.5: Google OR-Tools CP-SAT Soft Optimization Preferences */}
        {app && (
          <SolverPreferencesCard
            preferences={app.solverPreferences}
            onToggle={app.toggleSolverPreference}
            onRunSolver={onRunSolver}
            onResetDefaults={() => app.setSolverPreferences(DEFAULT_SOLVER_PREFERENCES)}
            isSyncing={app.isSyncing}
          />
        )}

        {/* Card 2: Classes, Grade Tiers & Classrooms (with Custom Room & Delete) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>2. Classes & Custom Rooms ({school.classes.length})</span>
            </h3>
            <span className="text-[11px] text-slate-400">Total Cohorts: {school.classes.length}</span>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {school.classes.map(c => (
              <div
                key={c.id}
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 text-xs hover:border-slate-300 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">Class {c.name}</span>
                  <span className="text-slate-500">({c.grade})</span>
                  <span
                    className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${
                      c.tier === 'Primary' ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'
                    }`}
                  >
                    {c.tier}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-600 font-semibold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[11px] flex items-center gap-1">
                    <DoorOpen className="w-3 h-3 text-slate-500" />
                    <span>{c.room}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteClass(c.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                    title={`Delete Class ${c.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Class Section Form */}
          <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
            <div className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-indigo-600" />
              <span>Add New Class Section with Custom Room</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <input
                placeholder="Class (e.g. 7A)"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 font-medium"
              />
              <input
                placeholder="Grade 7"
                value={newClassGrade}
                onChange={(e) => setNewClassGrade(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 font-medium"
              />
              <select
                value={newClassTier}
                onChange={(e) => setNewClassTier(e.target.value as Tier)}
                className="px-2 py-1.5 rounded-lg border border-slate-300 font-medium"
              >
                <option value="Primary">Primary</option>
                <option value="Senior">Senior</option>
              </select>
              <input
                placeholder="Room (e.g. Room 108)"
                value={newClassRoom}
                onChange={(e) => setNewClassRoom(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 font-medium"
              />
            </div>
            <button
              onClick={handleAddClass}
              className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold cursor-pointer transition shadow-xs"
            >
              + Add Class Section
            </button>
          </div>
        </div>

        {/* Card 3: Faculty & Staff Roster Management */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              <span>3. Faculty & Staff Roster ({school.teachers.length})</span>
            </h3>
            <span className="text-[11px] text-slate-400">Instructors: {school.teachers.length}</span>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1 text-xs">
            {school.teachers.map(t => (
              <div
                key={t.id}
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 text-xs hover:border-slate-300 transition"
              >
                <div className="space-y-1">
                  <div className="font-bold text-slate-900">{t.name}</div>
                  <div className="flex flex-wrap gap-1">
                    {t.subjects.map(sid => {
                      const sub = school.subjects.find(s => s.id === sid);
                      return (
                        <span
                          key={sid}
                          className="px-1.5 py-0.2 rounded text-[10px] bg-indigo-50 text-indigo-700 font-medium border border-indigo-100"
                        >
                          {sub?.name || sid}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-md">
                    ≤ {t.maxPerDay} p/day
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteTeacher(t.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                    title={`Delete Teacher ${t.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Teacher Form */}
          <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
            <div className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-indigo-600" />
              <span>Add New Faculty Member</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <input
                placeholder="Name (e.g. Dr. Emily Watson)"
                value={newTeacherName}
                onChange={(e) => setNewTeacherName(e.target.value)}
                className="col-span-2 px-2.5 py-1.5 rounded-lg border border-slate-300 font-medium"
              />
              <div className="flex items-center gap-1">
                <span className="text-slate-500 text-[10px]">Max:</span>
                <input
                  type="number"
                  min={1}
                  max={6}
                  value={newTeacherMaxPerDay}
                  onChange={(e) => setNewTeacherMaxPerDay(Number(e.target.value) || 5)}
                  className="w-full px-2 py-1.5 rounded-lg border border-slate-300 font-bold"
                />
              </div>
            </div>

            {/* Subject Selector Pills */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-500 font-medium">Select Teaching Subjects:</label>
              <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto p-1 bg-slate-50 rounded-lg border border-slate-200">
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
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleAddTeacher}
              className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold cursor-pointer transition shadow-xs"
            >
              + Add Faculty Member
            </button>
          </div>
        </div>

        {/* Card 4: Dynamic Subjects, Weekly Frequencies & Smart Auto-Balance */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>4. Dynamic Subjects & Weekly Frequencies ({school.subjects.length})</span>
            </h3>

            <button
              type="button"
              onClick={handleAutoBalance}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs cursor-pointer transition"
              title="Auto-adjust subject frequencies to fit the exact weekly period capacity"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Smart Auto-Balance</span>
            </button>
          </div>

          {/* Weekly Capacity Indicators */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Weekly Period Budget / Capacity:</span>
              <span className="text-[11px] text-slate-500">
                {primaryDiff === 0 && seniorDiff === 0 ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Timetable 100% Balanced
                  </span>
                ) : (
                  <span className="text-amber-700 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Click 'Smart Auto-Balance' to calibrate
                  </span>
                )}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className={`p-2 rounded-xl border flex items-center justify-between transition ${
                primaryDiff === 0 ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' :
                primaryDiff < 0 ? 'bg-rose-50 border-rose-200 text-rose-950' :
                'bg-amber-50 border-amber-200 text-amber-950'
              }`}>
                <div>
                  <div className="font-bold text-[11px]">Primary Cohorts</div>
                  <div className="text-[11px] opacity-75">{totalPrimaryFreq} / {primaryCap} periods/wk</div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  primaryDiff === 0 ? 'bg-emerald-200 text-emerald-800' :
                  primaryDiff < 0 ? 'bg-rose-200 text-rose-800' : 'bg-amber-200 text-amber-800'
                }`}>
                  {primaryDiff === 0 ? 'Balanced' : primaryDiff < 0 ? `${-primaryDiff} Over` : `${primaryDiff} Free`}
                </span>
              </div>

              <div className={`p-2 rounded-xl border flex items-center justify-between transition ${
                seniorDiff === 0 ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' :
                seniorDiff < 0 ? 'bg-rose-50 border-rose-200 text-rose-950' :
                'bg-amber-50 border-amber-200 text-amber-950'
              }`}>
                <div>
                  <div className="font-bold text-[11px]">Senior Cohorts</div>
                  <div className="text-[11px] opacity-75">{totalSeniorFreq} / {seniorCap} periods/wk</div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  seniorDiff === 0 ? 'bg-emerald-200 text-emerald-800' :
                  seniorDiff < 0 ? 'bg-rose-200 text-rose-800' : 'bg-amber-200 text-amber-800'
                }`}>
                  {seniorDiff === 0 ? 'Balanced' : seniorDiff < 0 ? `${-seniorDiff} Over` : `${seniorDiff} Free`}
                </span>
              </div>
            </div>
          </div>

          {/* Subject List with Frequency Tuners & Delete */}
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1 text-xs">
            {school.subjects.map(sub => {
              const qualifiedTeachers = school.teachers.filter(t => t.subjects.includes(sub.id));
              return (
                <div
                  key={sub.id}
                  className="p-2.5 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 hover:border-slate-300 transition"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{sub.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">({sub.code})</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded uppercase ${
                          sub.type === 'activity' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {sub.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                      {sub.room && (
                        <span className="px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 border border-purple-200">
                          {sub.room}
                        </span>
                      )}
                      <span className={`px-1.5 py-0.2 rounded ${
                        qualifiedTeachers.length > 0 ? 'bg-slate-100 text-slate-700' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {qualifiedTeachers.length > 0 ? `${qualifiedTeachers.length} qualified teacher(s)` : '⚠️ Auto-fallback teacher'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Color Swatch Badge & Popover */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setColorPickerSubId(colorPickerSubId === sub.id ? null : sub.id)}
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[11px] font-semibold transition cursor-pointer ${
                          sub.color || 'bg-slate-50 text-slate-700 border-slate-200'
                        } hover:opacity-100 shadow-2xs`}
                        title="Change subject theme color"
                      >
                        <Palette className="w-3 h-3 opacity-70" />
                        <span className="hidden sm:inline">Color</span>
                        <ChevronDown className="w-2.5 h-2.5 opacity-60" />
                      </button>

                      {colorPickerSubId === sub.id && (
                        <div className="absolute right-0 top-full mt-1.5 z-40 p-2 bg-white rounded-2xl shadow-xl border border-slate-200 w-52 grid grid-cols-2 gap-1.5 animate-in fade-in zoom-in-95 duration-150">
                          <div className="col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1 pb-1 border-b border-slate-100">
                            Choose Color Theme
                          </div>
                          {SUBJECT_PALETTE.map((pal) => (
                            <button
                              key={pal.name}
                              type="button"
                              onClick={() => handleChangeSubjectColor(sub.id, pal.color)}
                              className={`p-1.5 rounded-lg text-left text-[11px] font-semibold border flex items-center gap-1.5 cursor-pointer transition hover:scale-105 ${pal.color}`}
                            >
                              <span className={`w-2.5 h-2.5 rounded-full ${pal.dot} shrink-0`} />
                              <span className="truncate">{pal.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Double Period Toggle Pill */}
                    <button
                      type="button"
                      onClick={() => {
                        updateSchool(s => ({
                          ...s,
                          subjects: s.subjects.map(item => item.id === sub.id ? { ...item, requiresDoublePeriod: !item.requiresDoublePeriod } : item)
                        }));
                        setTimeout(() => onRunSolver(), 150);
                      }}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border text-[11px] font-semibold transition cursor-pointer ${
                        sub.requiresDoublePeriod
                          ? 'bg-purple-50 text-purple-700 border-purple-300 shadow-2xs'
                          : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                      }`}
                      title="Require a consecutive 2-period double block (e.g. for Lab, Practical, or Art)"
                    >
                      <FlaskConical className="w-3 h-3 text-purple-600" />
                      <span className="hidden sm:inline">{sub.requiresDoublePeriod ? '2P Block' : 'Single'}</span>
                    </button>

                    {/* Inline Frequency Tuners */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                        <span className="text-slate-500 font-semibold text-[10px]">P:</span>
                        <span className="font-bold">{sub.freqPrimary}/w</span>
                        <button
                          type="button"
                          onClick={() => handleUpdateSubjectFreq(sub.id, 'primary', -1)}
                          className="p-0.5 rounded hover:bg-slate-200 text-slate-600 cursor-pointer"
                          title="Decrease Primary frequency"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateSubjectFreq(sub.id, 'primary', 1)}
                          className="p-0.5 rounded hover:bg-slate-200 text-slate-600 cursor-pointer"
                          title="Increase Primary frequency"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                        <span className="text-slate-500 font-semibold text-[10px]">S:</span>
                        <span className="font-bold">{sub.freqSenior}/w</span>
                        <button
                          type="button"
                          onClick={() => handleUpdateSubjectFreq(sub.id, 'senior', -1)}
                          className="p-0.5 rounded hover:bg-slate-200 text-slate-600 cursor-pointer"
                          title="Decrease Senior frequency"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateSubjectFreq(sub.id, 'senior', 1)}
                          className="p-0.5 rounded hover:bg-slate-200 text-slate-600 cursor-pointer"
                          title="Increase Senior frequency"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteSubject(sub.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                      title={`Delete Subject ${sub.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Subject Form */}
          <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
            <div className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-indigo-600" />
              <span>Add New Subject with Auto-Teacher Assignment</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <input
                placeholder="Subject Name (e.g. Robotics)"
                value={newSubName}
                onChange={(e) => setNewSubName(e.target.value)}
                className="col-span-2 sm:col-span-1 px-2.5 py-1.5 rounded-lg border border-slate-300 font-medium"
              />
              <input
                placeholder="Code (e.g. ROB)"
                value={newSubCode}
                onChange={(e) => setNewSubCode(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 font-medium"
              />
              <select
                value={newSubType}
                onChange={(e) => setNewSubType(e.target.value as 'academic' | 'activity')}
                className="px-2 py-1.5 rounded-lg border border-slate-300 font-medium"
              >
                <option value="academic">Academic</option>
                <option value="activity">Activity Block</option>
              </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="flex items-center gap-1">
                <span className="text-slate-500 text-[10px]">Primary:</span>
                <input
                  type="number"
                  min={0}
                  max={8}
                  value={newSubFreqPrimary}
                  onChange={(e) => setNewSubFreqPrimary(Number(e.target.value) || 0)}
                  className="w-full px-2 py-1.5 rounded-lg border border-slate-300 font-bold"
                  placeholder="Prim/wk"
                />
              </div>

              <div className="flex items-center gap-1">
                <span className="text-slate-500 text-[10px]">Senior:</span>
                <input
                  type="number"
                  min={0}
                  max={8}
                  value={newSubFreqSenior}
                  onChange={(e) => setNewSubFreqSenior(Number(e.target.value) || 0)}
                  className="w-full px-2 py-1.5 rounded-lg border border-slate-300 font-bold"
                  placeholder="Sen/wk"
                />
              </div>

              <input
                placeholder="Room (e.g. STEM Lab)"
                value={newSubRoom}
                onChange={(e) => setNewSubRoom(e.target.value)}
                className="col-span-2 px-2.5 py-1.5 rounded-lg border border-slate-300 font-medium"
              />
            </div>

            {/* Double Period Checkbox */}
            <div className="flex items-center gap-2 pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={newSubDoublePeriod}
                  onChange={e => setNewSubDoublePeriod(e.target.checked)}
                  className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="flex items-center gap-1.5">
                  <FlaskConical className="w-3.5 h-3.5 text-purple-600" />
                  <span>Require 2-Period Consecutive Block (Science Lab / Practical / Art)</span>
                </span>
              </label>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-[11px] shrink-0">Assign Teacher:</span>
              <select
                value={newSubTeacherId}
                onChange={(e) => setNewSubTeacherId(e.target.value)}
                className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-300 font-medium text-xs bg-white"
              >
                <option value="auto">Auto-assign to available teacher (Recommended)</option>
                {school.teachers.map(t => (
                  <option key={t.id} value={t.id}>{t.name} (≤ {t.maxPerDay} p/day)</option>
                ))}
              </select>
            </div>

            {/* Color Palette Selector */}
            <div className="space-y-1.5 pt-1">
              <span className="text-slate-600 text-[11px] font-semibold flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-indigo-500" />
                <span>Card Color Theme:</span>
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {SUBJECT_PALETTE.map((pal) => {
                  const isSelected = newSubColor === pal.color;
                  return (
                    <button
                      key={pal.name}
                      type="button"
                      onClick={() => setNewSubColor(pal.color)}
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg border text-[10px] font-semibold transition cursor-pointer ${
                        pal.color
                      } ${isSelected ? 'ring-2 ring-indigo-600 ring-offset-1 scale-105 font-bold shadow-xs' : 'opacity-70 hover:opacity-100'}`}
                      title={pal.name}
                    >
                      <span className={`w-2 h-2 rounded-full ${pal.dot}`} />
                      <span>{pal.name}</span>
                      {isSelected && <Check className="w-2.5 h-2.5 ml-0.5 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleAddSubject}
              className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold cursor-pointer transition shadow-xs"
            >
              + Add Subject &amp; Balance Timetable
            </button>
          </div>
        </div>
      </div>

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


