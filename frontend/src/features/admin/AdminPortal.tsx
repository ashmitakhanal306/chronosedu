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
    { id: 'overview', label: '1. Overview & Architecture', icon: LayoutDashboard },
    { id: 'wizard', label: '2. Setup Wizard (10 Steps)', icon: Sliders },
    { id: 'studio', label: '3. Timetable Studio & Solver', icon: Calendar },
    {
      id: 'substitutes',
      label: '4. Absences & Substitutes',
      icon: UserCheck,
      badge: activeSchool.absences.length > 0 ? activeSchool.absences.length : undefined,
    },
    { id: 'versions', label: '5. Publish, Versions & Audit', icon: ShieldCheck },
    { id: 'analytics', label: '6. Room Heatmap & What-If', icon: BarChart3 },
    { id: 'exports', label: '7. Exports & Print Views', icon: Printer },
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
      <div className="no-print bg-slate-900 border border-slate-800 rounded-2xl p-1.5 shadow-sm overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex items-center gap-1 min-w-max">
          {TABS.map(tab => {
            const active = normalizedTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setAdminTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                  active
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500 text-white font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

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
