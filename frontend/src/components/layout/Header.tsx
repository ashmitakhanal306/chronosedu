import { Calendar, ShieldCheck, UserCheck, Building2, GraduationCap, Key } from 'lucide-react';
import type { TimetableApp } from '../../hooks/useTimetableApp';

export function Header({ app }: { app: TimetableApp }) {
  const { schools, activeSchool, currentUser, setActiveSchoolId, setIsAuthModalOpen } = app;
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

          {/* Authenticated User Identity & Login Switcher */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl px-3 py-1.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                {currentUser.role === 'admin' && <ShieldCheck className="w-4 h-4" />}
                {currentUser.role === 'teacher' && <UserCheck className="w-4 h-4" />}
                {currentUser.role === 'student' && <GraduationCap className="w-4 h-4" />}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-xs font-semibold text-white">{currentUser.name}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {currentUser.role}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5 leading-none">
                  JWT Verified • {activeSchool.name}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition cursor-pointer"
              title="Authenticate as different tenant or role"
            >
              <Key className="w-3.5 h-3.5 text-indigo-400" />
              <span>Switch User / Login</span>
            </button>
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
