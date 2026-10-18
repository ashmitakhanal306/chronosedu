import { Calendar, AlertTriangle, CheckCircle2, RefreshCw, Download, UserCheck, Lock, Unlock, Sliders, FileSpreadsheet, Printer, XCircle, ChevronDown, ChevronUp, Cpu } from 'lucide-react';
import { useState } from 'react';
import type { TimetableApp } from '../../hooks/useTimetableApp';
import { TimetableTab } from './TimetableTab';
import { SubstitutionsTab } from './SubstitutionsTab';
import { AdminSetupPanel } from './AdminSetupPanel';
import { SolverPreferencesCard } from './SolverPreferencesCard';
import { DEFAULT_SOLVER_PREFERENCES, DEFAULT_TIMING_CONFIG } from '../../domain/types';
import { computeBellSchedule } from '../../engine/bellSchedule';

export function AdminPortal({ app }: { app: TimetableApp }) {
  const {
    activeSchool, currentSchedule, adminTab, setAdminTab, runSolver, togglePublish,
    exportCsv, exportExcel, exportPrintPdf, resetDemoData, updateActiveSchool, isSyncing,
    solverPreferences, toggleSolverPreference, setSolverPreferences,
  } = app;

  const [diagExpanded, setDiagExpanded] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);

  const activePrefsCount = solverPreferences ? Object.values(solverPreferences).filter(Boolean).length : 2;

  const timing = activeSchool.timingConfig || DEFAULT_TIMING_CONFIG;
  const bellSchedule = computeBellSchedule(timing, activeSchool.rules);

  const errors = currentSchedule.diagnostics.filter(d => d.type === 'error');
  const warnings = currentSchedule.diagnostics.filter(d => d.type === 'warning');

  return (
    <>
            <div className="no-print bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'timetable' as const, label: 'Master Timetable & Solver', icon: Calendar },
                  { id: 'substitutions' as const, label: 'Substitutions & Absences', icon: UserCheck, badge: activeSchool.absences.length },
                  { id: 'setup' as const, label: 'School Rules, Classes & Staff Setup', icon: Sliders },
                ].map(tab => {
                  const Icon = tab.icon;
                  const active = adminTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setAdminTab(tab.id)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                        active
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                      {(tab.badge ?? 0) > 0 && (
                        <span className="px-1.5 py-0.2 rounded-full text-[11px] bg-rose-500 text-white">
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Tune Preferences Toggle Button */}
                <button
                  type="button"
                  id="tune-solver-btn"
                  onClick={() => setShowPreferences(prev => !prev)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition cursor-pointer ${
                    showPreferences
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-300 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                  title="Tune Google OR-Tools CP-SAT Soft Optimization Preferences"
                >
                  <Cpu className="w-4 h-4 text-indigo-600" />
                  <span>Tune Solver</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-100 text-indigo-700 font-bold">
                    {activePrefsCount}/5
                  </span>
                </button>

                {/* Generate Timetable — animated solving state */}
                <button
                  onClick={() => runSolver()}
                  disabled={isSyncing}
                  className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-xs sm:text-sm font-semibold shadow-sm transition cursor-pointer overflow-hidden"
                >
                  {isSyncing && (
                    <span className="absolute inset-0 rounded-xl animate-pulse bg-indigo-400/30" />
                  )}
                  <RefreshCw className={`w-4 h-4 relative z-10 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span className="relative z-10">{isSyncing ? 'Solving…' : 'Generate Timetable'}</span>
                </button>

                <button
                  onClick={togglePublish}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition cursor-pointer ${
                    activeSchool.published
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  {activeSchool.published ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  <span>{activeSchool.published ? 'Published' : 'Approve & Publish'}</span>
                </button>

                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-0.5">
                  <button
                    onClick={exportCsv}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-white text-xs font-medium transition cursor-pointer"
                    title="Export Timetable as CSV"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV</span>
                  </button>

                  <button
                    onClick={exportExcel}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-white text-xs font-medium transition cursor-pointer"
                    title="Export Timetable as Excel (.xls)"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Excel</span>
                  </button>

                  <button
                    onClick={exportPrintPdf}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-white text-xs font-medium transition cursor-pointer"
                    title="Print or Save Timetable as PDF"
                  >
                    <Printer className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Print / PDF</span>
                  </button>
                </div>
              </div>
            </div>

            {/* CONSTRAINT SOLVER DIAGNOSTICS BANNER */}
            {currentSchedule.diagnostics.length > 0 ? (
              <div className={`no-print rounded-2xl border overflow-hidden shadow-sm ${
                errors.length > 0 ? 'border-rose-200 bg-rose-50/60' : 'border-amber-200 bg-amber-50/60'
              }`}>
                {/* Header row */}
                <div className={`px-4 py-3 flex flex-wrap items-center justify-between gap-3 ${
                  errors.length > 0
                    ? 'bg-rose-100/80 border-b border-rose-200'
                    : 'bg-amber-100/80 border-b border-amber-200'
                }`}>
                  <div className="flex items-center gap-2.5">
                    {errors.length > 0
                      ? <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      : <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />}
                    <div>
                      <div className={`font-bold text-sm ${errors.length > 0 ? 'text-rose-950' : 'text-amber-950'}`}>
                        Constraint Solver Diagnostics
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        {errors.length > 0 && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-600 text-white">
                            {errors.length} Error{errors.length > 1 ? 's' : ''}
                          </span>
                        )}
                        {warnings.length > 0 && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white">
                            {warnings.length} Warning{warnings.length > 1 ? 's' : ''}
                          </span>
                        )}
                        <span className="text-[11px] text-slate-500">Some slots could not be scheduled — review below</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={resetDemoData}
                      className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-700 transition cursor-pointer"
                    >
                      Auto-Fix: Restore Balanced Data
                    </button>
                    <button
                      onClick={() => setDiagExpanded(x => !x)}
                      className="p-1.5 rounded-lg hover:bg-black/10 transition cursor-pointer"
                      title={diagExpanded ? 'Collapse' : 'Expand'}
                    >
                      {diagExpanded
                        ? <ChevronUp className="w-4 h-4 text-slate-700" />
                        : <ChevronDown className="w-4 h-4 text-slate-700" />}
                    </button>
                  </div>
                </div>

                {/* Diagnostic cards */}
                {diagExpanded && (
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentSchedule.diagnostics.map((d, idx) => {
                      const isError = d.type === 'error';
                      return (
                        <div
                          key={idx}
                          className={`rounded-xl border p-3.5 bg-white shadow-sm ${
                            isError ? 'border-rose-200' : 'border-amber-200'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {isError
                              ? <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                              : <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide ${
                                  isError ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                                }`}>
                                  {isError ? 'Error' : 'Warning'}
                                </span>
                                <span className="font-bold text-xs text-slate-900 leading-tight">{d.title}</span>
                              </div>
                              <p className="text-[11px] text-slate-600 leading-relaxed">{d.detail}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <div className="no-print bg-emerald-50/80 border border-emerald-200 rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-900">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>All Hard Constraints &amp; Soft Preferences Satisfied:</strong> Zero double-bookings, Primary out {bellSchedule.primaryDismissalTime}, Senior out {bellSchedule.seniorDismissalTime}, {activeSchool.rules.activityDay} Activity Block locked, teachers capped at ≤ {activeSchool.rules.maxTeacherPeriodsPerDay} periods/day.
                  </span>
                </div>
                <span className="text-emerald-700 font-mono text-[11px]">Last solved: {currentSchedule.generatedAt || '—'}</span>
              </div>
            )}

        {/* Tunable CP-SAT Soft Optimization Preferences Panel */}
        {showPreferences && (
          <div className="no-print animate-in fade-in slide-in-from-top-2 duration-200">
            <SolverPreferencesCard
              preferences={solverPreferences}
              onToggle={toggleSolverPreference}
              onRunSolver={runSolver}
              onResetDefaults={() => setSolverPreferences(DEFAULT_SOLVER_PREFERENCES)}
              isSyncing={isSyncing}
            />
          </div>
        )}

        {adminTab === 'timetable' && <TimetableTab app={app} />}
        {adminTab === 'substitutions' && <SubstitutionsTab app={app} />}
        {adminTab === 'setup' && (
          <AdminSetupPanel school={activeSchool} updateSchool={updateActiveSchool} onRunSolver={runSolver} app={app} />
        )}
    </>
  );
}
