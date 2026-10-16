import { Calendar, AlertTriangle, Sparkles, CheckCircle2, RefreshCw, Download, UserCheck, Lock, Unlock, Sliders, FileSpreadsheet, Printer } from 'lucide-react';
import type { TimetableApp } from '../../hooks/useTimetableApp';
import { TimetableTab } from './TimetableTab';
import { SubstitutionsTab } from './SubstitutionsTab';
import { AdminSetupPanel } from './AdminSetupPanel';
import { WhatRemainsGuide } from './WhatRemainsGuide';

export function AdminPortal({ app }: { app: TimetableApp }) {
  const {
    activeSchool, currentSchedule, adminTab, setAdminTab, runSolver, togglePublish,
    exportCsv, exportExcel, exportPrintPdf, resetDemoData, updateActiveSchool, isSyncing,
  } = app;
  return (
    <>
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'timetable' as const, label: 'Master Timetable & Solver', icon: Calendar },
                  { id: 'substitutions' as const, label: 'Substitutions & Absences', icon: UserCheck, badge: activeSchool.absences.length },
                  { id: 'setup' as const, label: 'School Rules, Classes & Staff Setup', icon: Sliders },
                  { id: 'roadmap' as const, label: 'What Remains for You (Production Guide)', icon: Sparkles },
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
                <button
                  onClick={runSolver}
                  disabled={isSyncing}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-xs sm:text-sm font-semibold shadow-sm transition cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Solving...' : 'Generate Timetable'}</span>
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
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>Constraint Solver Diagnostics ({currentSchedule.diagnostics.length} Infeasibility Alert)</span>
                  </div>
                  <button
                    onClick={resetDemoData}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-900 text-white hover:bg-amber-800"
                  >
                    Auto-Fix / Restore Balanced Demo Data
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                  {currentSchedule.diagnostics.map((d, idx) => (
                    <div key={idx} className="bg-white/80 border border-amber-200 rounded-xl p-3 text-xs">
                      <div className="font-semibold text-amber-950">{d.title}</div>
                      <div className="text-amber-800 mt-0.5">{d.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-900">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>All 7 Hard Constraints & Soft Preferences Satisfied:</strong> Zero double-bookings, Primary ends 12:00 PM, Senior ends 2:00 PM, {activeSchool.rules.activityDay} Activity Block locked, and all teachers capped at ≤ {activeSchool.rules.maxTeacherPeriodsPerDay} periods/day.
                  </span>
                </div>
                <span className="text-emerald-700 font-mono">Last solved: {currentSchedule.generatedAt}</span>
              </div>
            )}

        {adminTab === 'timetable' && <TimetableTab app={app} />}
        {adminTab === 'substitutions' && <SubstitutionsTab app={app} />}
        {adminTab === 'setup' && (
          <AdminSetupPanel school={activeSchool} updateSchool={updateActiveSchool} onRunSolver={runSolver} />
        )}
        {adminTab === 'roadmap' && <WhatRemainsGuide />}
    </>
  );
}
