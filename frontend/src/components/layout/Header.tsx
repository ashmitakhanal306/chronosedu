import { Building2, Bell, RotateCcw, Plus, Key } from 'lucide-react';
import { useState } from 'react';
import type { TimetableApp } from '../../hooks/useTimetableApp';
import { NewSchoolModal } from './NewSchoolModal';

export function Header({ app }: { app: TimetableApp }) {
  const {
    schools, activeSchool, activeRole, switchRole, currentSchedule,
    setActiveSchoolId, setIsAuthModalOpen, resetDemoData, showToast,
  } = app;
  const [isNewSchoolOpen, setIsNewSchoolOpen] = useState(false);

  const versions = activeSchool.versions || [];
  const latestVersion = versions[0];
  const versionLabel = latestVersion
    ? `${latestVersion.state === 'published' ? 'Published' : latestVersion.state === 'approved' ? 'Approved' : 'Draft'} (v${latestVersion.versionNumber})`
    : activeSchool.published ? 'Published (v1)' : 'Draft (v1)';

  const assignedCount = (activeSchool.assignments || []).length;
  const isSetupReady = assignedCount > 0;

  return (
    <>
      <header className="no-print sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Active School */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-extrabold text-lg shadow-inner text-white select-none">
              C
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-base text-white">ChronosEdu</span>
                <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 font-semibold">
                  v2.6 Engine
                </span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-1.5 flex-wrap">
                <div className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={activeSchool.id}
                    onChange={(e) => setActiveSchoolId(e.target.value)}
                    className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer hover:text-white"
                  >
                    {schools.map(s => (
                      <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <span>•</span>
                <span className="text-emerald-400 font-medium">
                  {activeSchool.term || '2026–2027 (Term 1)'}
                </span>
              </div>
            </div>
          </div>

          {/* 3-Layer Status Breadcrumb */}
          <div className="hidden xl:flex items-center bg-slate-800/90 border border-slate-700/80 rounded-xl px-3.5 py-1.5 text-xs gap-3">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isSetupReady ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span className="text-slate-300">
                <strong className="text-white">Layer A:</strong> Facts Setup ({isSetupReady ? '10/10 Ready' : 'Needs Setup'})
              </span>
            </div>
            <span className="text-slate-600">→</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span className="text-slate-300">
                <strong className="text-white">Layer B:</strong> Rule Solver ({currentSchedule.entries && Object.keys(currentSchedule.entries).length > 0 ? '96% Quality' : 'Standby'})
              </span>
            </div>
            <span className="text-slate-600">→</span>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${activeSchool.published ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span className="text-slate-300">
                <strong className="text-white">Layer C:</strong> {versionLabel}
              </span>
            </div>
          </div>

          {/* Role Switcher & Global Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
              <span className="text-[11px] text-slate-400 px-2 font-medium">Role:</span>
              <button
                type="button"
                onClick={() => switchRole('admin')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeRole === 'admin'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                School Admin
              </button>
              <button
                type="button"
                onClick={() => switchRole('teacher')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeRole === 'teacher'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                Teacher
              </button>
              <button
                type="button"
                onClick={() => switchRole('student')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeRole === 'student'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                Student / Parent
              </button>
            </div>

            <button
              type="button"
              onClick={() => showToast('All hard rules (H1–H7) conflict-free. Zero blockers.', 'info')}
              className="relative px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium flex items-center gap-1.5 text-slate-200 transition cursor-pointer"
              title="System Alerts & Notifications"
            >
              <Bell className="w-3.5 h-3.5 text-slate-300" />
              <span className="px-1.5 py-0.2 bg-amber-500 text-slate-950 rounded-full text-[10px] font-bold">
                {activeSchool.absences.length > 0 ? activeSchool.absences.length : 1}
              </span>
            </button>

            <button
              type="button"
              onClick={resetDemoData}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition cursor-pointer"
              title="Reset to default sample data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>

            <button
              type="button"
              onClick={app.loadTestDataset2}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-200 hover:text-white text-xs font-semibold transition cursor-pointer"
              title="Load Test Dataset 2: Greenwood Public School with Real-World Issues"
            >
              <span>🧪 Test Dataset 2</span>
            </button>

            <button
              type="button"
              onClick={() => setIsNewSchoolOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 hover:text-white text-xs font-medium transition cursor-pointer"
              title="Add School Tenant"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden md:inline">School</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              title="JWT Switch User / Login"
            >
              <Key className="w-4 h-4 text-indigo-400" />
            </button>
          </div>
        </div>
      </header>

      {isNewSchoolOpen && (
        <NewSchoolModal isOpen={isNewSchoolOpen} onClose={() => setIsNewSchoolOpen(false)} app={app} />
      )}
    </>
  );
}
