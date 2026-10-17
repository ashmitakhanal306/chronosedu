import { BookOpen, Layers, Sliders, Upload, FileSpreadsheet, Trash2, Plus, Minus, Users, DoorOpen, Sparkles, Check, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import type { School, Tier } from '../../domain/types';
import { BulkImportModal } from './BulkImportModal';

interface Props {
  school: School;
  updateSchool: (updater: (s: School) => School) => void;
  onRunSolver: () => void;
}

export function AdminSetupPanel({ school, updateSchool, onRunSolver }: Props) {
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

  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

  // Weekly period capacity calculations
  const primaryCap = school.workingDays.length * school.rules.primaryEndPeriod; // e.g. 5 * 4 = 20
  const seniorCap = school.workingDays.length * school.rules.seniorEndPeriod;   // e.g. 5 * 6 = 30

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
    const PALETTE = [
      'bg-teal-50 text-teal-700 border-teal-200',
      'bg-violet-50 text-violet-700 border-violet-200',
      'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
      'bg-amber-50 text-amber-700 border-amber-200',
      'bg-sky-50 text-sky-700 border-sky-200',
      'bg-rose-50 text-rose-700 border-rose-200',
      'bg-emerald-50 text-emerald-700 border-emerald-200',
      'bg-indigo-50 text-indigo-700 border-indigo-200',
    ];
    const color = newSubType === 'activity'
      ? 'bg-purple-100 text-purple-800 border-purple-300'
      : PALETTE[school.subjects.length % PALETTE.length];

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
          },
        ],
        teachers: updatedTeachers,
      };
    });

    setNewSubName('');
    setNewSubCode('');
    setNewSubRoom('');
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

      {/* 2x2 Grid of School Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: School-Wide Scheduling Rules */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-600" />
            <span>1. School-Wide Scheduling Rules</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Weekly Activity Block Day</label>
              <select
                value={school.rules.activityDay}
                onChange={(e) => {
                  updateSchool(s => ({
                    ...s,
                    rules: { ...s.rules, activityDay: e.target.value }
                  }));
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
              >
                {school.workingDays.map(d => (
                  <option key={d} value={d}>{d} (Periods 1 & 2 Locked)</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="font-bold text-emerald-950">Primary Cutoff</div>
                <div className="text-emerald-700 mt-0.5">12:00 PM (4 Periods/day)</div>
              </div>
              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200">
                <div className="font-bold text-sky-950">Senior Cutoff</div>
                <div className="text-sky-700 mt-0.5">02:00 PM (6 Periods/day)</div>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Hard Teacher Daily Cap (Max Periods / Day)
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
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
              />
            </div>

            <button
              onClick={onRunSolver}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer transition shadow-xs"
            >
              Save Rules & Re-Generate Timetable
            </button>
          </div>
        </div>

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

                  <div className="flex items-center gap-3 shrink-0">
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

            <button
              onClick={handleAddSubject}
              className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold cursor-pointer transition shadow-xs"
            >
              + Add Subject & Balance Timetable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


