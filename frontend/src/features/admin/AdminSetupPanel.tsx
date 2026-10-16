import { BookOpen, Layers, Sliders } from 'lucide-react';
import { useState } from 'react';
import type { School, Tier } from '../../domain/types';

interface Props {
  school: School;
  updateSchool: (updater: (s: School) => School) => void;
  onRunSolver: () => void;
}

export function AdminSetupPanel({ school, updateSchool, onRunSolver }: Props) {
  const [newClassName, setNewClassName] = useState('');
  const [newClassGrade, setNewClassGrade] = useState('Grade 6');
  const [newClassTier, setNewClassTier] = useState<Tier>('Primary');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Column 1: School Rules & Activity Block */}
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
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer"
          >
            Save Rules & Re-Generate Timetable
          </button>
        </div>
      </div>

      {/* Column 2: Classes & Grade Tiers */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-600" />
          <span>2. Classes & Grade Tiers ({school.classes.length})</span>
        </h3>

        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {school.classes.map(c => (
            <div key={c.id} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="font-bold text-slate-900">Class {c.name}</span> ({c.grade})
                <span className={`ml-2 px-2 py-0.5 rounded-md font-semibold ${
                  c.tier === 'Primary' ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'
                }`}>
                  {c.tier}
                </span>
              </div>
              <span className="text-slate-400">{c.room}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
          <div className="font-semibold text-slate-700">Add Class Section</div>
          <div className="grid grid-cols-3 gap-2">
            <input
              placeholder="e.g. 6A"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300"
            />
            <input
              placeholder="Grade 6"
              value={newClassGrade}
              onChange={(e) => setNewClassGrade(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300"
            />
            <select
              value={newClassTier}
              onChange={(e) => setNewClassTier(e.target.value as Tier)}
              className="px-2 py-1.5 rounded-lg border border-slate-300"
            >
              <option value="Primary">Primary</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
          <button
            onClick={() => {
              if (!newClassName.trim()) return;
              updateSchool(s => ({
                ...s,
                classes: [
                  ...s.classes,
                  {
                    id: `c-${Date.now()}`,
                    name: newClassName.trim(),
                    grade: newClassGrade,
                    tier: newClassTier,
                    room: `Room ${s.classes.length + 105}`
                  }
                ]
              }));
              setNewClassName('');
            }}
            className="w-full py-2 rounded-xl bg-slate-900 text-white font-semibold cursor-pointer"
          >
            + Add Class Section
          </button>
        </div>
      </div>

      {/* Column 3: Subjects & Weekly Frequencies */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <span>3. Subjects & Weekly Frequencies</span>
        </h3>
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1 text-xs">
          {school.subjects.map(sub => (
            <div key={sub.id} className="p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span>{sub.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded uppercase ${
                    sub.type === 'activity' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {sub.type}
                  </span>
                </div>
                <div className="text-slate-500 mt-0.5">
                  Primary: <strong>{sub.freqPrimary}/wk</strong> • Senior: <strong>{sub.freqSenior}/wk</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
