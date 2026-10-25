import { useState, useMemo } from 'react';
import {
  Edit3, Search, X, Clock, RefreshCw, Cpu, CheckCircle2, AlertTriangle,
  XCircle, ChevronDown, ChevronUp, History, Send, Sparkles
} from 'lucide-react';
import type { TimetableApp } from '../../hooks/useTimetableApp';
import { ClassTimetableGrid } from '../../components/timetable/ClassTimetableGrid';
import { TeacherTimetableGrid } from '../../components/timetable/TeacherTimetableGrid';
import { FacultyWorkloadHeatmap } from '../../components/timetable/FacultyWorkloadHeatmap';
import { SolverPreferencesCard } from './SolverPreferencesCard';
import { QualityReportCard } from './QualityReportCard';
import { computeBellSchedule } from '../../engine/bellSchedule';
import { DEFAULT_TIMING_CONFIG, DEFAULT_SOLVER_PREFERENCES } from '../../domain/types';
import { sortClasses, sortTeachers } from '../../utils/sorting';

export function TimetableTab({ app }: { app: TimetableApp }) {
  const {
    activeSchool, currentSchedule, subjectMap, teacherMap, classMap, selectedClass, selectedTeacher,
    timetableViewMode, setTimetableViewMode, setSelectedClassId, setSelectedTeacherId, openManualOverride,
    runSolver, isSyncing, solverPreferences, toggleSolverPreference, setSolverPreferences, setAdminTab,
    setWizardStep,
  } = app;

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'substitutions' | 'activity' | 'academic'>('all');
  const [showPreferences, setShowPreferences] = useState(false);
  const [diagExpanded, setDiagExpanded] = useState(true);
  const [showQualityReport, setShowQualityReport] = useState(true);
  const [classWingFilter, setClassWingFilter] = useState<'all' | 'pre_primary' | 'primary' | 'middle' | 'secondary' | 'senior'>('all');
  const [classSelectorSearch, setClassSelectorSearch] = useState('');

  const sortedClasses = useMemo(() => sortClasses(activeSchool.classes), [activeSchool.classes]);
  const sortedTeachers = useMemo(() => sortTeachers(activeSchool.teachers), [activeSchool.teachers]);

  const filteredSelectorClasses = useMemo(() => {
    return sortedClasses.filter(c => {
      if (classWingFilter !== 'all') {
        const n = (c.name + ' ' + c.grade).toLowerCase();
        let wing: 'pre_primary' | 'primary' | 'middle' | 'secondary' | 'senior' = 'middle';
        if (n.includes('nur') || n.includes('lkg') || n.includes('ukg') || n.includes('kg')) {
          wing = 'pre_primary';
        } else {
          const match = n.match(/\b(10|11|12|[1-9])\b/);
          if (match) {
            const num = parseInt(match[1], 10);
            if (num <= 5) wing = 'primary';
            else if (num <= 8) wing = 'middle';
            else if (num <= 10) wing = 'secondary';
            else wing = 'senior';
          } else if (c.tier === 'Primary') {
            wing = 'primary';
          } else {
            wing = 'secondary';
          }
        }
        if (wing !== classWingFilter) return false;
      }
      if (classSelectorSearch.trim()) {
        const q = classSelectorSearch.toLowerCase().trim();
        return c.name.toLowerCase().includes(q) || c.grade.toLowerCase().includes(q);
      }
      return true;
    });
  }, [sortedClasses, classWingFilter, classSelectorSearch]);

  const timing = activeSchool.timingConfig || DEFAULT_TIMING_CONFIG;
  const bellSchedule = computeBellSchedule(timing, activeSchool.rules);
  const totalPeriods = bellSchedule.slots.filter(s => !s.isBreak).length;

  const errors = currentSchedule.diagnostics.filter(d => d.type === 'error');
  const warnings = currentSchedule.diagnostics.filter(d => d.type === 'warning');
  const activePrefsCount = solverPreferences ? Object.values(solverPreferences).filter(Boolean).length : 2;

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Studio & Solver Action Toolbar */}
      <div className="no-print bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-100/70 px-2 py-0.5 rounded-full">
                Layer B • Automated Engine
              </span>
              <h2 className="text-sm font-bold text-slate-900">Timetable Studio &amp; Constraint Solver</h2>
            </div>
            <p className="text-[11px] text-slate-500">
              Google OR-Tools CP-SAT multi-objective solver enforces 100% hard constraints (H1–H7) and soft preferences.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Tune Solver Button */}
          <button
            type="button"
            onClick={() => setShowPreferences(prev => !prev)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
              showPreferences
                ? 'bg-indigo-50 text-indigo-700 border-indigo-300 shadow-2xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-indigo-600" />
            <span>Tune Solver</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-100 text-indigo-700 font-bold">
              {activePrefsCount}/5
            </span>
          </button>

          {/* Pre-Flight Test Button */}
          <button
            onClick={() => {
              setAdminTab('setup');
              setWizardStep(10);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-900 shadow-2xs transition cursor-pointer"
            title="Run pre-flight feasibility and conflict audit before generating"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>🧪 Pre-Flight Audit (Step 10)</span>
          </button>

          {/* Generate Timetable Button */}
          <button
            onClick={() => runSolver()}
            disabled={isSyncing}
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-xs font-semibold shadow-sm transition cursor-pointer overflow-hidden"
          >
            {isSyncing && (
              <span className="absolute inset-0 rounded-xl animate-pulse bg-indigo-400/30" />
            )}
            <RefreshCw className={`w-3.5 h-3.5 relative z-10 ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="relative z-10">{isSyncing ? 'Solving...' : 'Generate Timetable'}</span>
          </button>

          {/* Versions / Publish Link */}
          <button
            onClick={() => setAdminTab('versions')}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition cursor-pointer"
          >
            <History className="w-3.5 h-3.5 text-slate-500" />
            <span>Versions &amp; Publish</span>
          </button>
        </div>
      </div>

      {/* Tunable CP-SAT Preferences Panel */}
      {showPreferences && (
        <div className="no-print animate-in fade-in slide-in-from-top-2 duration-150">
          <SolverPreferencesCard
            preferences={solverPreferences}
            onToggle={toggleSolverPreference}
            onRunSolver={runSolver}
            onResetDefaults={() => setSolverPreferences(DEFAULT_SOLVER_PREFERENCES)}
            isSyncing={isSyncing}
          />
        </div>
      )}

      {/* Solver Diagnostics Banner */}
      {currentSchedule.diagnostics.length > 0 ? (
        <div className={`no-print rounded-2xl border overflow-hidden shadow-sm ${
          errors.length > 0 ? 'border-rose-200 bg-rose-50/60' : 'border-amber-200 bg-amber-50/60'
        }`}>
          <div className={`px-4 py-3 flex flex-wrap items-center justify-between gap-3 ${
            errors.length > 0 ? 'bg-rose-100/80 border-b border-rose-200' : 'bg-amber-100/80 border-b border-amber-200'
          }`}>
            <div className="flex items-center gap-2.5">
              {errors.length > 0
                ? <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                : <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />}
              <div>
                <div className={`font-bold text-sm ${errors.length > 0 ? 'text-rose-950' : 'text-amber-950'}`}>
                  Pre-Flight Feasibility Conflicts Identified
                </div>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  {errors.length > 0 && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-600 text-white">
                      {errors.length} High-Level Conflict{errors.length > 1 ? 's' : ''}
                    </span>
                  )}
                  {warnings.length > 0 && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white">
                      {warnings.length} Warning{warnings.length > 1 ? 's' : ''}
                    </span>
                  )}
                  <span className="text-[11px] text-slate-600">
                    Friendly root-cause explanations and 1-click solutions below
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAdminTab('setup');
                  setWizardStep(10);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-rose-300 text-rose-900 text-xs font-bold hover:bg-rose-50 transition cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                <span>Fix in Step 10 (Review &amp; Check)</span>
              </button>
              <button
                onClick={() => setDiagExpanded(x => !x)}
                className="p-1.5 rounded-lg hover:bg-black/10 transition cursor-pointer"
              >
                {diagExpanded ? <ChevronUp className="w-4 h-4 text-slate-700" /> : <ChevronDown className="w-4 h-4 text-slate-700" />}
              </button>
            </div>
          </div>

          {diagExpanded && (
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentSchedule.diagnostics.map((d, idx) => (
                  <div key={idx} className="rounded-xl border p-4 bg-white shadow-xs border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                          {d.type === 'error' ? '🔴' : '🟡'} {d.title}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                          d.type === 'error' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {d.type === 'error' ? 'Shortage / Bottleneck' : 'Warning'}
                        </span>
                      </div>
                      <p className="text-[12px] text-slate-600 leading-relaxed">{d.detail}</p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-medium">Resolution available</span>
                      <button
                        onClick={() => {
                          setAdminTab('setup');
                          setWizardStep(10);
                        }}
                        className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline transition cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>Resolve in Step 10 →</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="no-print bg-emerald-50/80 border border-emerald-200 rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-900 shadow-2xs">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>All Hard Constraints &amp; Soft Preferences Satisfied:</strong> Zero clashes, Primary dismissal {bellSchedule.primaryDismissalTime}, Senior dismissal {bellSchedule.seniorDismissalTime}, {activeSchool.rules.activityDay} activity block locked, teacher caps strictly honored.
            </span>
          </div>
          <span className="text-emerald-700 font-mono text-[11px]">Last solved: {currentSchedule.generatedAt || '—'}</span>
        </div>
      )}

      {/* Quality & Workload Audit Report */}
      {currentSchedule.qualityReport && showQualityReport && (
        <QualityReportCard
          report={currentSchedule.qualityReport}
          onClose={() => setShowQualityReport(false)}
        />
      )}

      {/* Filter Bar: View by Class or Teacher */}
      <div className="no-print bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-xl bg-slate-100 p-1">
            <button
              onClick={() => setTimetableViewMode('class')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                timetableViewMode === 'class' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              By Class Section
            </button>
            <button
              onClick={() => setTimetableViewMode('teacher')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                timetableViewMode === 'teacher' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              By Teacher Schedule
            </button>
          </div>

          {timetableViewMode === 'class' ? (
            <div className="space-y-2.5 w-full">
              {/* Wing Filter Pills & Class Search */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                <div className="flex flex-wrap items-center gap-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Wing:</span>
                  {[
                    { id: 'all', label: `All Wings (${sortedClasses.length})` },
                    { id: 'pre_primary', label: '🟡 Pre-Primary' },
                    { id: 'primary', label: '🟢 Primary (1–5)' },
                    { id: 'middle', label: '🔵 Middle (6–8)' },
                    { id: 'secondary', label: '🟣 Secondary (9–10)' },
                    { id: 'senior', label: '🔴 Senior (11–12)' },
                  ].map(w => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setClassWingFilter(w.id as any)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        classWingFilter === w.id
                          ? 'bg-slate-900 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search class (e.g. 11-PCM)..."
                    value={classSelectorSearch}
                    onChange={e => setClassSelectorSearch(e.target.value)}
                    className="pl-8 pr-6 py-1 rounded-lg border border-slate-200 text-xs bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-36 sm:w-48"
                  />
                  {classSelectorSearch && (
                    <button
                      type="button"
                      onClick={() => setClassSelectorSearch('')}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Class Buttons Grid */}
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                {filteredSelectorClasses.map(cls => (
                  <button
                    key={cls.id}
                    onClick={() => setSelectedClassId(cls.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-1 ${
                      selectedClass?.id === cls.id
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cls.name}</span>
                    <span className="opacity-75 font-normal text-[10px]">({cls.tier})</span>
                  </button>
                ))}
                {filteredSelectorClasses.length === 0 && (
                  <span className="text-xs text-slate-400 italic py-1">No classes match this wing or search query.</span>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Select Teacher:</span>
              <select
                value={selectedTeacher?.id}
                onChange={(e) => setSelectedTeacherId(e.target.value)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 bg-white cursor-pointer min-w-48"
              >
                {sortedTeachers.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
          <span>Click any slot to <strong>Manually Override / Lock</strong> with conflict checking</span>
        </div>
      </div>

      {/* Instant Search & Multi-Filter Bar */}
      <div className="no-print bg-white rounded-2xl border border-slate-200 p-3 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teacher, subject, or room..."
            className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Filter:</span>
          {[
            { id: 'all' as const, label: 'All Slots' },
            { id: 'substitutions' as const, label: '⚡ Substitutions', badge: Object.keys(activeSchool.substitutions).length },
            { id: 'activity' as const, label: '🎨 Activity Blocks' },
            { id: 'academic' as const, label: '📚 Academic Only' },
          ].map(f => {
            const active = filterType === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3 py-1.5 rounded-xl font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
                  active
                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{f.label}</span>
                {(f.badge ?? 0) > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    active ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {f.badge}
                  </span>
                )}
              </button>
            );
          })}

          {(searchQuery || filterType !== 'all') && (
            <button
              onClick={() => { setSearchQuery(''); setFilterType('all'); }}
              className="px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Bell Schedule Summary */}
      <div className="bg-white rounded-2xl border border-slate-200 px-4 py-2.5 flex flex-wrap items-center gap-3 shadow-2xs text-xs">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-indigo-500" />
          Today's Bell
        </span>
        <span className="font-semibold text-slate-600">
          Starts <strong className="text-slate-900">{timing.startTime}</strong>
        </span>
        <span className="text-slate-300">|</span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-800">
          Primary out {bellSchedule.primaryDismissalTime}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[11px] font-bold text-sky-800">
          Senior out {bellSchedule.seniorDismissalTime}
        </span>
        <span className="text-slate-300">|</span>
        <span className="text-[11px] text-slate-500">
          {activeSchool.workingDays.length} working days • {totalPeriods} periods • {activeSchool.classes.length} class sections
        </span>
      </div>

      {/* Faculty Workload Heatmap Matrix */}
      <FacultyWorkloadHeatmap
        school={activeSchool}
        entries={currentSchedule.entries}
        subjectMap={subjectMap}
        teacherMap={teacherMap}
        onSelectTeacher={(teacherId) => {
          setTimetableViewMode('teacher');
          setSelectedTeacherId(teacherId);
        }}
      />

      {/* Timetable Grid */}
      {timetableViewMode === 'class' && selectedClass && (
        <ClassTimetableGrid
          school={activeSchool}
          cls={selectedClass}
          entries={currentSchedule.entries}
          subjectMap={subjectMap}
          teacherMap={teacherMap}
          isAdmin={true}
          onSlotClick={openManualOverride}
          searchQuery={searchQuery}
          filterType={filterType}
        />
      )}

      {timetableViewMode === 'teacher' && selectedTeacher && (
        <TeacherTimetableGrid
          school={activeSchool}
          teacher={selectedTeacher}
          entries={currentSchedule.entries}
          subjectMap={subjectMap}
          classMap={classMap}
          teacherMap={teacherMap}
          searchQuery={searchQuery}
          filterType={filterType}
        />
      )}
    </div>
  );
}
