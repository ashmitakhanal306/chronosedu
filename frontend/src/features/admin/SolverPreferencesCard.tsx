import React from 'react';
import { Cpu, Calendar, Scale, Coffee, Sun, RefreshCw, CheckCircle2, RotateCcw, Sparkles, FlaskConical } from 'lucide-react';
import type { SolverPreferences } from '../../domain/types';
import { DEFAULT_SOLVER_PREFERENCES } from '../../domain/types';
import { Badge, Button, Card } from '../../components/ui/primitives';

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
    colorClass: 'text-brand-600',
    badgeBg: 'bg-brand-50 text-brand-700 border-brand-200',
  },
  {
    key: 'smoothTeacherWorkload',
    name: 'Smooth Faculty Daily Workload',
    shortDesc: 'Target ≤ 4 teaching periods per day',
    detail: 'Minimizes peak load imbalances across the week, protecting educators from marathon teaching days.',
    weightLabel: 'Weight: -4 penalty / period over 4',
    icon: Scale,
    tag: 'Teacher Wellness',
    colorClass: 'text-positive-600',
    badgeBg: 'bg-positive-50 text-positive-700 border-positive-200',
  },
  {
    key: 'minimizeTeacherGaps',
    name: 'Minimize Faculty Split Shifts & Idle Gaps',
    shortDesc: 'Eliminate isolated 1-period downtime',
    detail: 'Keeps teaching blocks contiguous so faculty members do not face awkward idle waiting gaps between classes.',
    weightLabel: 'Weight: -15 penalty / idle gap',
    icon: Coffee,
    tag: 'Schedule Compactness',
    colorClass: 'text-warning-600',
    badgeBg: 'bg-warning-50 text-warning-700 border-warning-200',
  },
  {
    key: 'morningCorePriority',
    name: 'Morning Priority for Core STEM Subjects',
    shortDesc: 'Schedule Math, Science & CS before lunch',
    detail: 'Places cognitively demanding subjects in morning periods (P1–P3) during peak student alertness.',
    weightLabel: 'Weight: -5 penalty / post-lunch core period',
    icon: Sun,
    tag: 'Peak Focus Hours',
    colorClass: 'text-info-600',
    badgeBg: 'bg-info-50 text-info-700 border-info-200',
  },
  {
    key: 'consecutiveDoublePeriods',
    name: 'Consecutive Double Periods (Labs & Practicals)',
    shortDesc: 'Schedule 2 back-to-back periods',
    detail: 'Schedules 2 uninterrupted back-to-back periods for Science Labs, Art & Craft, and Computer Practicals.',
    weightLabel: 'Weight: -40 penalty / missing double block',
    icon: FlaskConical,
    tag: 'Hands-on Practicals',
    colorClass: 'text-rule-600',
    badgeBg: 'bg-rule-50 text-rule-700 border-rule-200',
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
    <Card className={`bg-surface rounded-card border border-neutral-200 shadow-sm overflow-hidden transition-all ${className}`}>
      {/* Header bar */}
      <div className="bg-gradient-to-r from-neutral-900 via-brand-950 to-neutral-900 text-white p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-soft bg-brand-500/20 border border-brand-400/30 text-brand-300">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white">
                  Constraint Engine Soft Optimization Preferences
                </h3>
                <Badge className="text-xs font-bold px-2 py-0.5 rounded-full bg-brand-500/30 text-brand-200 border border-brand-400/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Google OR-Tools CP-SAT
                </Badge>
              </div>
              <p className="text-xs text-neutral-300 mt-0.5">
                Tune heuristic objective weights. Hard constraints remain 100% strictly enforced.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="text-xs font-semibold px-2.5 py-1 rounded-control bg-surface/10 text-neutral-200 border border-white/15">
              {activeCount} of {PREFERENCE_OPTIONS.length} Objectives Active
            </Badge>
            {onResetDefaults && (
              <Button
                type="button"
                onClick={onResetDefaults}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-control text-xs font-medium text-neutral-300 hover:text-white hover:bg-surface/10 transition cursor-pointer"
                title="Reset to recommended default preferences"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </Button>
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
              className={`group relative p-4 rounded-soft border transition-all cursor-pointer select-none ${
                isEnabled
                  ? 'bg-brand-50/40 border-brand-300 shadow-2xs hover:border-brand-400'
                  : 'bg-neutral-50/60 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={`p-2 rounded-soft border shrink-0 transition-colors ${
                      isEnabled
                        ? 'bg-surface border-brand-200 text-brand-600 shadow-2xs'
                        : 'bg-surface border-neutral-200 text-neutral-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-brand-600 transition-colors">
                        {opt.name}
                      </h4>
                      <Badge className={`text-xs font-semibold px-2 py-0.2 rounded-full border ${opt.badgeBg}`}>
                        {opt.tag}
                      </Badge>
                    </div>

                    <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                      {opt.detail}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-mono text-neutral-500">
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
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 ${
                    isEnabled ? 'bg-brand-600' : 'bg-neutral-300'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-surface shadow ring-0 transition duration-200 ease-in-out ${
                      isEnabled ? 'tranneutral-x-5' : 'tranneutral-x-0'
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer action bar */}
      <div className="bg-neutral-50 border-t border-neutral-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-neutral-600">
          <CheckCircle2 className="w-4 h-4 text-positive-600 shrink-0" />
          <span>
            Preferences are passed directly to CP-SAT objective penalty terms during generation.
          </span>
        </div>

        <Button
          type="button"
          onClick={onRunSolver}
          disabled={isSyncing}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-soft bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-xs sm:text-sm font-bold shadow-sm transition cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Solving with CP-SAT…' : 'Re-Solve Timetable with Preferences'}</span>
        </Button>
      </div>
    </Card>
  );
}
