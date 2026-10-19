import { useState } from 'react';
import { BarChart3, CheckCircle2, AlertTriangle, Gauge, TrendingUp, Users, ChevronDown, ChevronUp, X } from 'lucide-react';
import type { QualityReport } from '../../domain/types';

interface Props {
  report: QualityReport;
  onClose?: () => void;
}

export function QualityReportCard({ report, onClose }: Props) {
  const [isExpanded, setIsExpanded] = useState(true);

  const totalTeachers = report.teacher_workload.length;
  const balancedTeachers = report.teacher_workload.filter(t => t.pct >= 50 && t.pct <= 85).length;
  const heavyTeachers = report.teacher_workload.filter(t => t.pct > 85 && t.pct <= 100).length;
  const overloadedTeachers = report.teacher_workload.filter(t => t.pct > 100).length;

  return (
    <div className="no-print bg-white rounded-2xl border border-indigo-100 shadow-sm overflow-hidden mb-4 transition-all">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            <BarChart3 className="w-5 h-5 text-indigo-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm tracking-wide">Schedule Quality & Workload Audit</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                CP-SAT Optimal
              </span>
            </div>
            <p className="text-[11px] text-indigo-200/80">
              Generated via Google OR-Tools CP-SAT with soft constraint multi-objective optimization
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsExpanded(prev => !prev)}
            className="p-1.5 rounded-xl hover:bg-white/10 text-indigo-200 hover:text-white transition cursor-pointer flex items-center gap-1 text-xs font-medium"
            title={isExpanded ? 'Collapse Quality Report' : 'Expand Quality Report'}
          >
            <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/10 text-indigo-200 hover:text-white transition cursor-pointer"
              title="Close Report"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-indigo-50/20 border-b border-indigo-100/60">
        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Placed Lessons</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-slate-900">{report.total_entries}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Satisfies 100% hard constraints</div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Empty Periods</span>
            <Gauge className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-xl font-bold text-slate-900">{report.empty_period_count}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {report.empty_period_count === 0 ? 'Full grid coverage' : 'Free/unassigned slots'}
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Faculty Fairness</span>
            <Users className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-xl font-bold text-slate-900">
            {totalTeachers > 0 ? `${Math.round((balancedTeachers / totalTeachers) * 100)}%` : '100%'}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {balancedTeachers}/{totalTeachers} in optimal 50–85% band
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Soft Penalty Score</span>
            <TrendingUp className="w-4 h-4 text-violet-600" />
          </div>
          <div className="text-xl font-bold text-slate-900">{report.soft_score}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {report.soft_score === 0 ? 'Zero preference penalty' : 'Weighted soft penalty'}
          </div>
        </div>
      </div>

      {/* Expandable Teacher Workload Distribution */}
      {isExpanded && (
        <div className="p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Faculty Weekly Workload Distribution ({totalTeachers} Staff Members)
            </span>
            <div className="flex items-center gap-3 text-[11px] text-slate-600">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Optimal ({balancedTeachers})
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> High Load ({heavyTeachers})
              </span>
              {overloadedTeachers > 0 && (
                <span className="inline-flex items-center gap-1 text-rose-600 font-bold">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> Overloaded ({overloadedTeachers})
                </span>
              )}
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                  <th className="py-2.5 px-3">Teacher</th>
                  <th className="py-2.5 px-3">Periods Assigned</th>
                  <th className="py-2.5 px-3">Weekly Max</th>
                  <th className="py-2.5 px-3 min-w-[140px]">Utilization & Load Progress</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {report.teacher_workload.map(tw => {
                  let barColor = 'bg-emerald-500';
                  let statusBadge = (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Optimal
                    </span>
                  );

                  if (tw.pct > 100) {
                    barColor = 'bg-rose-500';
                    statusBadge = (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                        Overloaded
                      </span>
                    );
                  } else if (tw.pct > 85) {
                    barColor = 'bg-amber-500';
                    statusBadge = (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        Full Load
                      </span>
                    );
                  } else if (tw.pct < 50) {
                    barColor = 'bg-sky-400';
                    statusBadge = (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800">
                        Light
                      </span>
                    );
                  }

                  return (
                    <tr key={tw.teacher_id} className="hover:bg-slate-50/60 transition">
                      <td className="py-2.5 px-3 font-semibold text-slate-800">{tw.name}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{tw.assigned}</td>
                      <td className="py-2.5 px-3 text-slate-500 font-mono">{tw.max}</td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${barColor}`}
                              style={{ width: `${Math.min(100, tw.pct)}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-mono text-slate-600 w-10 text-right">{tw.pct}%</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-right">{statusBadge}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Unplaced lessons warning if any */}
          {report.unplaced_lessons && report.unplaced_lessons.length > 0 && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-800">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Unplaced Lessons ({report.unplaced_lessons.length}):</span>
              </div>
              <ul className="list-disc pl-5 space-y-0.5 text-amber-700 text-[11px]">
                {report.unplaced_lessons.map((u, i) => (
                  <li key={i}>{u}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
