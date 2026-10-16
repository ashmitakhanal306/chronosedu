import { Calendar, ShieldCheck, UserCheck, Building2, GraduationCap } from 'lucide-react';
import type { TimetableApp } from '../../hooks/useTimetableApp';

export function Header({ app }: { app: TimetableApp }) {
  const { schools, activeSchool, activeRole, setActiveSchoolId, setActiveRole } = app;
  return (
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Brand & Tenant Switcher */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center shadow-inner">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold tracking-tight text-base">ChronosEdu</span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                    Multi-Tenant SaaS
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">Automated School Constraint Solver & Substitution Engine</p>
              </div>
            </div>

            <div className="h-6 w-px bg-slate-800 hidden md:block" />

            {/* Tenant Selector */}
            <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-lg px-2.5 py-1.5">
              <Building2 className="w-4 h-4 text-indigo-400 shrink-0" />
              <div className="text-xs">
                <span className="text-slate-400 block text-[10px] leading-none">Active Tenant (School)</span>
                <select
                  value={activeSchool.id}
                  onChange={(e) => setActiveSchoolId(e.target.value)}
                  className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer pr-2"
                >
                  {schools.map(s => (
                    <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Role Portal Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden lg:inline mr-1">Switch Role View:</span>
            <div className="inline-flex rounded-xl bg-slate-800 p-1 border border-slate-700">
              {[
                { id: 'admin' as const, label: 'Admin Portal', icon: ShieldCheck },
                { id: 'teacher' as const, label: 'Teacher Portal', icon: UserCheck },
                { id: 'student' as const, label: 'Student / Parent', icon: GraduationCap },
              ].map(role => {
                const Icon = role.icon;
                const active = activeRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setActiveRole(role.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      active
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{role.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sub-bar with School Metadata & Quick Status */}
        <div className="bg-slate-950/60 border-t border-slate-800/80 px-4 sm:px-6 py-2">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
            <div className="flex flex-wrap items-center gap-4">
              <span>Tenant Domain: <strong className="text-slate-200">{activeSchool.subdomain}</strong></span>
              <span>•</span>
              <span>Primary Cutoff: <strong className="text-emerald-400">12:00 PM (Period {activeSchool.rules.primaryEndPeriod})</strong></span>
              <span>•</span>
              <span>Senior Cutoff: <strong className="text-sky-400">02:00 PM (Period {activeSchool.rules.seniorEndPeriod})</strong></span>
              <span>•</span>
              <span>Activity Block: <strong className="text-purple-400">{activeSchool.rules.activityDay} (P{activeSchool.rules.activityPeriods.join(', P')})</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                activeSchool.published
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${activeSchool.published ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                {activeSchool.published ? 'Published Live' : 'Draft Mode'}
              </span>
            </div>
          </div>
        </div>
      </header>
  );
}
