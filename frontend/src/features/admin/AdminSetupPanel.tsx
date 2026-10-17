import { BookOpen, Layers, Sliders, Upload, FileSpreadsheet, Trash2, Plus, Users, DoorOpen } from 'lucide-react';
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

  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

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

        {/* Card 4: Subjects & Weekly Frequencies */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>4. Subjects & Weekly Frequencies</span>
            </h3>
            <span className="text-[11px] text-slate-400">Total: {school.subjects.length} Subjects</span>
          </div>

          <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1 text-xs">
            {school.subjects.map(sub => (
              <div
                key={sub.id}
                className="p-2.5 rounded-xl border border-slate-200 flex items-center justify-between hover:border-slate-300 transition"
              >
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{sub.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded uppercase ${
                        sub.type === 'activity' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {sub.type}
                    </span>
                  </div>
                  <div className="text-slate-500 mt-0.5 text-[11px]">
                    Primary: <strong>{sub.freqPrimary}/wk</strong> • Senior: <strong>{sub.freqSenior}/wk</strong>
                  </div>
                </div>

                {sub.room && (
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 font-medium">
                    Studio: {sub.room}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

