import { Building2, Bell, RotateCcw, Plus, Key, MoreHorizontal, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { TimetableApp } from '../../hooks/useTimetableApp';
import { NewSchoolModal } from './NewSchoolModal';
import { Badge, Button, Select } from '../ui/primitives';

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
      <header className="no-print relative z-30 bg-slate-900 text-white border-b border-slate-800 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Active School */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-extrabold text-lg shadow-inner text-white select-none">
              C
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-base text-white">ChronosEdu</span>
                <Badge className="uppercase tracking-wider bg-indigo-500/20 text-indigo-100 border-indigo-400/40">
                  v2.6
                </Badge>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-1.5 flex-wrap">
                <div className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <Select
                    value={activeSchool.id}
                    onChange={(e) => setActiveSchoolId(e.target.value)}
                    className="w-auto border-0 bg-transparent py-1 text-slate-100 font-semibold cursor-pointer hover:text-white"
                  >
                    {schools.map(s => (
                      <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                        {s.name}
                      </option>
                    ))}
                  </Select>
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
                <strong className="text-white">Setup:</strong> Facts &amp; Data ({isSetupReady ? 'Ready' : 'Needs Input'})
              </span>
            </div>
            <span className="text-slate-600">→</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span className="text-slate-300">
                <strong className="text-white">Solver:</strong> {currentSchedule.entries && Object.keys(currentSchedule.entries).length > 0 ? 'Optimal' : 'Idle'}
              </span>
            </div>
            <span className="text-slate-600">→</span>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${activeSchool.published ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span className="text-slate-300">
                <strong className="text-white">Published:</strong> {versionLabel}
              </span>
            </div>
          </div>

          {/* Role Switcher & Global Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <div role="group" aria-label="Choose portal role" className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
              <Button variant="ghost"
                type="button"
                onClick={() => switchRole('admin')}
                aria-pressed={activeRole === 'admin'}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeRole === 'admin'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-200 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                School Admin
              </Button>
              <Button variant="ghost"
                type="button"
                onClick={() => switchRole('teacher')}
                aria-pressed={activeRole === 'teacher'}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeRole === 'teacher'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-200 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                Teacher
              </Button>
              <Button variant="ghost"
                type="button"
                onClick={() => switchRole('student')}
                aria-pressed={activeRole === 'student'}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeRole === 'student'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-200 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                Student
              </Button>
            </div>

            <details className="relative">
              <summary aria-label="Open global actions" className="ui-button ui-button-ghost min-h-10 list-none inline-flex items-center gap-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-100 cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-300">
                <MoreHorizontal className="w-4 h-4" />
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </summary>
              <div aria-label="Global actions" className="absolute right-0 top-full z-50 mt-2 grid min-w-52 gap-1 rounded-xl border border-slate-700 bg-slate-800 p-2 shadow-xl">
            <Button variant="ghost"
              type="button"
              onClick={() => showToast('All hard rules (H1–H7) conflict-free. Zero blockers.', 'info')}
              className="relative min-h-10 justify-start px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 text-slate-200 transition cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-3.5 h-3.5 text-slate-300" />
              <Badge className="border-amber-400 bg-amber-500 text-slate-950">
                {activeSchool.absences.length > 0 ? activeSchool.absences.length : 1}
              </Badge>
            </Button>

            <Button variant="ghost"
              type="button"
              onClick={resetDemoData}
              className="inline-flex min-h-10 items-center gap-1.5 justify-start px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-700 transition cursor-pointer"
              title="Reset to default sample data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Data</span>
            </Button>

            {app.activeSchool.id.includes('issues') || app.activeSchool.name.toLowerCase().includes('issues') ? (
              <Button variant="ghost"
                type="button"
                onClick={app.loadCleanDataset1}
                className="inline-flex min-h-10 items-center gap-1.5 justify-start px-2.5 py-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-slate-700 text-xs font-semibold transition cursor-pointer"
                title="Switch to Clean Dataset"
              >
                <span>✨ Clean Data</span>
              </Button>
            ) : (
              <Button variant="ghost"
                type="button"
                onClick={app.loadTestDataset2}
                className="inline-flex min-h-10 items-center gap-1.5 justify-start px-2.5 py-1.5 rounded-lg text-amber-200 hover:text-white hover:bg-slate-700 text-xs font-semibold transition cursor-pointer"
                title="Load Test Scenario with Scheduling Issues"
              >
                <span>🧪 Test Scenario</span>
              </Button>
            )}

            <Button variant="ghost"
              type="button"
              onClick={() => setIsNewSchoolOpen(true)}
              className="inline-flex min-h-10 items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-200 hover:text-white hover:bg-slate-700 text-xs font-medium transition cursor-pointer"
              title="Add School"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden md:inline">School</span>
            </Button>

            <Button variant="ghost"
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="inline-flex min-h-10 items-center gap-1.5 justify-start px-2.5 py-1.5 rounded-lg text-slate-200 hover:text-white hover:bg-slate-700 text-xs transition cursor-pointer"
              title="Switch User"
            >
              <Key className="w-4 h-4 text-indigo-300" />
              <span>Switch User</span>
            </Button>
              </div>
            </details>
          </div>
        </div>
      </header>

      {isNewSchoolOpen && (
        <NewSchoolModal isOpen={isNewSchoolOpen} onClose={() => setIsNewSchoolOpen(false)} app={app} />
      )}
    </>
  );
}
