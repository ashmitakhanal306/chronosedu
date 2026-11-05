import {
  LayoutDashboard,
  Sliders,
  Calendar,
  UserCheck,
  ShieldCheck,
  BarChart3,
  Printer,
} from 'lucide-react';
import type { TimetableApp } from '../../hooks/useTimetableApp';
import type { AdminTab } from '../../domain/types';
import { OverviewTab } from './OverviewTab';
import { AdminSetupPanel } from './AdminSetupPanel';
import { TimetableTab } from './TimetableTab';
import { SubstitutionsTab } from './SubstitutionsTab';
import { VersionsTab } from './VersionsTab';
import { RoomHeatmapTab } from './RoomHeatmapTab';
import { ExportsTab } from './ExportsTab';

export function AdminPortal({ app }: { app: TimetableApp }) {
  const { activeSchool, adminTab, setAdminTab, runSolver, updateActiveSchool } = app;

  // Canonical tabs definition mirroring chronosedu-gray.vercel.app
  const TABS: { id: AdminTab; label: string; icon: any; badge?: number }[] = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'wizard', label: 'Setup Wizard', icon: Sliders },
    { id: 'studio', label: 'Timetable Studio', icon: Calendar },
    {
      id: 'substitutes',
      label: 'Absences',
      icon: UserCheck,
      badge: activeSchool.absences.length > 0 ? activeSchool.absences.length : undefined,
    },
    { id: 'versions', label: 'Versions', icon: ShieldCheck },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'exports', label: 'Exports', icon: Printer },
  ];

  // Map legacy tab IDs to canonical ones
  const normalizedTab: AdminTab =
    adminTab === 'timetable' ? 'studio' :
    adminTab === 'setup' ? 'wizard' :
    adminTab === 'substitutions' ? 'substitutes' :
    adminTab;

  return (
    <div className="space-y-6">
      {/* Sleek horizontal 7-tab sub-navbar mirroring chronosedu-gray.vercel.app */}
      <nav aria-label="Admin sections" className="no-print w-full min-w-0 bg-slate-900 border border-slate-800 rounded-2xl p-1.5 shadow-sm overflow-x-auto overscroll-x-contain scrollbar-thin scrollbar-thumb-slate-600">
        <div className="flex w-max min-w-full items-center gap-1">
          {TABS.map(tab => {
            const active = normalizedTab === tab.id;
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setAdminTab(tab.id)}
                aria-current={active ? 'page' : undefined}
                aria-pressed={active}
                aria-label={tab.badge ? `${tab.label}, ${tab.badge} active absences` : tab.label}
                className={`inline-flex min-h-10 shrink-0 items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-300 ${
                  active
                    ? 'bg-brand-600 text-white shadow-sm ring-1 ring-white/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <TabIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className="px-1.5 py-0.2 rounded-full text-xs bg-rose-500 text-white font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Render Active Tab Canvas */}
      {normalizedTab === 'overview' && <OverviewTab app={app} />}

      {normalizedTab === 'wizard' && (
        <AdminSetupPanel
          school={activeSchool}
          updateSchool={updateActiveSchool}
          onRunSolver={runSolver}
          app={app}
        />
      )}

      {normalizedTab === 'studio' && <TimetableTab app={app} />}

      {normalizedTab === 'substitutes' && <SubstitutionsTab app={app} />}

      {normalizedTab === 'versions' && <VersionsTab app={app} />}

      {normalizedTab === 'analytics' && <RoomHeatmapTab app={app} />}

      {normalizedTab === 'exports' && <ExportsTab app={app} />}
    </div>
  );
}
