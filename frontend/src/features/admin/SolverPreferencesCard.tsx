import React from 'react';
import { Cpu, Calendar, Scale, Coffee, Sun, RefreshCw, CheckCircle2, RotateCcw, Sparkles, FlaskConical } from 'lucide-react';
import type { SolverPreferences } from '../../domain/types';
import { DEFAULT_SOLVER_PREFERENCES } from '../../domain/types';

interface Props {
  preferences: SolverPreferences;
  onToggle: (key: keyof SolverPreferences) => void;
  onRunSolver: () => void;
  onResetDefaults?: () => void;
  isSyncing: boolean;
  className?: string;
  compact?: boolean;
}

interface PreferenceOption {
  key: keyof SolverPreferences;
  name: string;
  shortDesc: string;
  detail: string;
  weightLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  colorClass: string;
  badgeBg: string;
}

const PREFERENCE_OPTIONS: PreferenceOption[] = [
  {
    key: 'spreadSubjects',
    name: 'Spread Subjects Across Days',
    shortDesc: 'Disperse classes throughout the week',
    detail: 'Prevents cramming multiple periods of the same academic subject onto a single day, ensuring even spaced learning.',
    weightLabel: 'Weight: -10 penalty / clustering event',
    icon: Calendar,
    tag: 'Student Retention',
    colorClass: 'text-indigo-600',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  {
    key: 'smoothTeacherWorkload',
    name: 'Smooth Faculty Daily Workload',
    shortDesc: 'Target ≤ 4 teaching periods per day',
    detail: 'Minimizes peak load imbalances across the week, protecting educators from marathon teaching days.',
    weightLabel: 'Weight: -4 penalty / period over 4',
    icon: Scale,
    tag: 'Teacher Wellness',
    colorClass: 'text-emerald-600',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    key: 'minimizeTeacherGaps',
    name: 'Minimize Faculty Split Shifts & Idle Gaps',
    shortDesc: 'Eliminate isolated 1-period downtime',
    detail: 'Keeps teaching blocks contiguous so faculty members do not face awkward idle waiting gaps between classes.',
    weightLabel: 'Weight: -15 penalty / idle gap',
    icon: Coffee,
    tag: 'Schedule Compactness',
    colorClass: 'text-amber-600',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    key: 'morningCorePriority',
    name: 'Morning Priority for Core STEM Subjects',
    shortDesc: 'Schedule Math, Science & CS before lunch',
    detail: 'Places cognitively demanding subjects in morning periods (P1–P3) during peak student alertness.',
    weightLabel: 'Weight: -5 penalty / post-lunch core period',
    icon: Sun,
    tag: 'Peak Focus Hours',
    colorClass: 'text-sky-600',
    badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  {
    key: 'consecutiveDoublePeriods',
    name: 'Consecutive Double Periods (Labs & Practicals)',
    shortDesc: 'Schedule 2 back-to-back periods',
    detail: 'Schedules 2 uninterrupted back-to-back periods for Science Labs, Art & Craft, and Computer Practicals.',
    weightLabel: 'Weight: -40 penalty / missing double block',
    icon: FlaskConical,
    tag: 'Hands-on Practicals',
    colorClass: 'text-purple-600',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
  },
];

export function SolverPreferencesCard({
  preferences,
  onToggle,
  onRunSolver,
  onResetDefaults,
  isSyncing,
  className = '',
  compact = false,
}: Props) {
  const activeCount = Object.values(preferences).filter(Boolean).length;

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all ${className}`}>
      {/* Header bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white">
                  Constraint Engine Soft Optimization Preferences
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Google OR-Tools CP-SAT
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Tune heuristic objective weights. Hard constraints remain 100% strictly enforced.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/10 text-slate-200 border border-white/15">
              {activeCount} of {PREFERENCE_OPTIONS.length} Objectives Active
            </span>
            {onResetDefaults && (
              <button
                type="button"
                onClick={onResetDefaults}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
                title="Reset to recommended default preferences"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main preference toggles */}
      <div className={`p-4 sm:p-5 ${compact ? 'space-y-2' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}`}>
        {PREFERENCE_OPTIONS.map((opt) => {
          const isEnabled = preferences[opt.key];
          const Icon = opt.icon;

          return (
            <div
              key={opt.key}
              onClick={() => onToggle(opt.key)}
              className={`group relative p-4 rounded-xl border transition-all cursor-pointer select-none ${
                isEnabled
                  ? 'bg-indigo-50/40 border-indigo-300 shadow-2xs hover:border-indigo-400'
                  : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={`p-2 rounded-xl border shrink-0 transition-colors ${
                      isEnabled
                        ? 'bg-white border-indigo-200 text-indigo-600 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {opt.name}
                      </h4>
                      <span className={`text-[10px] font-semibold px-2 py-0.2 rounded-full border ${opt.badgeBg}`}>
                        {opt.tag}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {opt.detail}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[11px] font-mono text-slate-500">
                        {opt.weightLabel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Switch toggle control */}
                <div
                  role="switch"
                  aria-checked={isEnabled}
                  tabIndex={0}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${
                    isEnabled ? 'bg-indigo-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer action bar */}
      <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Preferences are passed directly to CP-SAT objective penalty terms during generation.
          </span>
        </div>

        <button
          type="button"
          onClick={onRunSolver}
          disabled={isSyncing}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-xs sm:text-sm font-bold shadow-sm transition cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Solving with CP-SAT…' : 'Re-Solve Timetable with Preferences'}</span>
        </button>
      </div>
    </div>
  );
}
