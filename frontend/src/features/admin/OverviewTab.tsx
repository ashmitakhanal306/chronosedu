import { ArrowRight, CheckCircle2, Cpu, Calendar, ShieldCheck, Users, Layers, Award, Sparkles } from 'lucide-react';
import type { TimetableApp } from '../../hooks/useTimetableApp';

export function OverviewTab({ app }: { app: TimetableApp }) {
  const { activeSchool, currentSchedule, setAdminTab, setWizardStep, runSolver, isSyncing } = app;

  const totalClasses = activeSchool.classes.length;
  const totalTeachers = activeSchool.teachers.length;
  const totalSubjects = activeSchool.subjects.length;
  const totalRooms = (activeSchool as any).rooms?.length || 10;
  const totalAssignments = (activeSchool.assignments || []).length;
  const totalEntries = Object.keys(currentSchedule.entries || {}).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white border border-indigo-800/40 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>Human-Centric Constraint Solving Architecture</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            ChronosEdu Academic Timetable Engine
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Not everything can or should be automated. ChronosEdu separates school timetable generation into three distinct layers:
            Admin Enters Facts (Layer A), Mathematical Solver Places Lessons (Layer B), and Admin Reviews, Locks & Publishes (Layer C).
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => {
                setAdminTab('wizard');
                setWizardStep(8);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-md transition cursor-pointer"
            >
              <span>Setup Wizard (Step 8: Teacher Matrix)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => runSolver()}
              disabled={isSyncing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs sm:text-sm font-semibold transition cursor-pointer disabled:opacity-50"
            >
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>{isSyncing ? 'Solving...' : 'Run Google OR-Tools CP-SAT Solver'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3-Layer Architecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Layer A */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Layer A • Admin Control
            </span>
            <Users className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Admin Enters the Facts</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Define bell schedules per grade tier, homeroom classes, faculty qualifications, room capacities, and the
            <strong> Class + Subject ➔ ONE Teacher</strong> assignment matrix in the 10-step setup wizard.
          </p>
          <div className="pt-2">
            <button
              onClick={() => { setAdminTab('wizard'); setWizardStep(1); }}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
            >
              <span>Open 10-Step Wizard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Layer B */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
              Layer B • Automated Engine
            </span>
            <Cpu className="w-5 h-5 text-indigo-500" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">System Places the Lessons</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Google OR-Tools CP-SAT constraint solver finds a globally optimal schedule satisfying zero clashes (H1–H7),
            room capacity bounds, teacher daily/weekly caps, pinned lessons, and blocked slots.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setAdminTab('studio')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
            >
              <span>Open Timetable Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Layer C */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              Layer C • Human Governance
            </span>
            <ShieldCheck className="w-5 h-5 text-amber-500" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Admin Reviews & Publishes</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Click any cell to manually override, pin/lock lessons, inspect faculty workload fairness, approve draft versions,
            publish with an effective date, or rollback if needed.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setAdminTab('versions')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
            >
              <span>Manage Versions &amp; Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* School Setup Statistics */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
            {activeSchool.name} • Operational Setup Status
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            {activeSchool.subdomain}.chronos.edu
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Classes</span>
            <span className="text-xl font-bold text-slate-900">{totalClasses}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Primary &amp; Senior</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Faculty</span>
            <span className="text-xl font-bold text-slate-900">{totalTeachers}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Qualified teachers</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Subjects</span>
            <span className="text-xl font-bold text-slate-900">{totalSubjects}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Labs &amp; Activities</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Assignments</span>
            <span className="text-xl font-bold text-indigo-600">{totalAssignments}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Step 8 Bound</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Scheduled Slots</span>
            <span className="text-xl font-bold text-emerald-600">{totalEntries}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Conflict-free</span>
          </div>
        </div>
      </div>
    </div>
  );
}
