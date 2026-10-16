import { useState } from 'react';
import { ShieldCheck, UserCheck, GraduationCap, Building2, Key, Check, AlertCircle, X } from 'lucide-react';
import type { TimetableApp } from '../../hooks/useTimetableApp';
import type { Role } from '../../domain/types';

export function LoginModal({ app }: { app: TimetableApp }) {
  const {
    schools,
    activeSchool,
    currentUser,
    isAuthModalOpen,
    setIsAuthModalOpen,
    login,
  } = app;

  const [selectedSchoolId, setSelectedSchoolId] = useState(activeSchool.id);
  const [selectedRole, setSelectedRole] = useState<Role>(currentUser.role);
  const [selectedTeacherId, setSelectedTeacherId] = useState(activeSchool.teachers[0]?.id || 't-1');
  const [selectedClassId, setSelectedClassId] = useState(activeSchool.classes[0]?.id || 'c-4a');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const currentSchool = schools.find(s => s.id === selectedSchoolId) || activeSchool;

  const handleLogin = async () => {
    setIsSubmitting(true);
    try {
      const teacher = currentSchool.teachers.find(t => t.id === selectedTeacherId);
      const cls = currentSchool.classes.find(c => c.id === selectedClassId);

      let name = `Admin (${currentSchool.name})`;
      let email = `admin@${currentSchool.subdomain}.edu`;

      if (selectedRole === 'teacher') {
        name = teacher?.name || 'Faculty Teacher';
        email = `${teacher?.name.toLowerCase().replace(/[^a-z]/g, '') || 'teacher'}@${currentSchool.subdomain}.edu`;
      } else if (selectedRole === 'student') {
        name = `Student (${cls?.name || 'Class'})`;
        email = `student.${cls?.name.toLowerCase()}@${currentSchool.subdomain}.edu`;
      }

      await login(selectedRole, selectedSchoolId, {
        teacherId: selectedRole === 'teacher' ? selectedTeacherId : undefined,
        classId: selectedRole === 'student' ? selectedClassId : undefined,
        email,
        name,
      });

      setIsAuthModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-inner">
              <Key className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Tenant Authentication</h3>
              <p className="text-xs text-slate-400">JWT Role-Based Access Control & RLS Isolation</p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {/* School Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>School Organization (Tenant)</span>
            </label>
            <select
              value={selectedSchoolId}
              onChange={(e) => {
                setSelectedSchoolId(e.target.value);
                const s = schools.find(x => x.id === e.target.value);
                if (s?.teachers[0]) setSelectedTeacherId(s.teachers[0].id);
                if (s?.classes[0]) setSelectedClassId(s.classes[0].id);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-medium text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {schools.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.subdomain}.chronosedu.com)
                </option>
              ))}
            </select>
          </div>

          {/* Role Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Authenticated Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'admin' as const, label: 'Admin', desc: 'Full Access', icon: ShieldCheck },
                { id: 'teacher' as const, label: 'Teacher', desc: 'Faculty View', icon: UserCheck },
                { id: 'student' as const, label: 'Student', desc: 'Class View', icon: GraduationCap },
              ].map(r => {
                const Icon = r.icon;
                const active = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id)}
                    className={`flex flex-col items-center p-3 rounded-2xl border text-center transition cursor-pointer ${
                      active
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-sm'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 text-slate-600'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-1 ${active ? 'text-indigo-600' : 'text-slate-500'}`} />
                    <span className="text-xs font-bold">{r.label}</span>
                    <span className="text-[10px] text-slate-400">{r.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Persona Detail selection if Teacher or Student */}
          {selectedRole === 'teacher' && (
            <div className="space-y-1.5 p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100">
              <label className="text-xs font-semibold text-indigo-900 block">
                Select Teacher Identity:
              </label>
              <select
                value={selectedTeacherId}
                onChange={(e) => setSelectedTeacherId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-indigo-200 bg-white text-sm font-medium text-slate-800"
              >
                {currentSchool.teachers.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
              <p className="text-[11px] text-indigo-700">
                Teacher tokens are restricted to their own schedule and self-absence reporting.
              </p>
            </div>
          )}

          {selectedRole === 'student' && (
            <div className="space-y-1.5 p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100">
              <label className="text-xs font-semibold text-emerald-900 block">
                Select Class Section:
              </label>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-emerald-200 bg-white text-sm font-medium text-slate-800"
              >
                {currentSchool.classes.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.grade} • {c.tier})</option>
                ))}
              </select>
              <p className="text-[11px] text-emerald-700">
                Student tokens are restricted to viewing only their assigned class schedule.
              </p>
            </div>
          )}

          {/* Security Notice */}
          <div className="flex items-start gap-2 p-3 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600">
            <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <span>
              Calls <strong>POST /api/auth/token</strong> to issue a signed JWT containing <code>school_id</code>, <code>role</code>, and identity claims verified by the FastAPI backend middleware.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(false)}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-200 transition"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleLogin}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-xs font-bold shadow-md transition cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>{isSubmitting ? 'Authenticating...' : 'Sign In with Signed JWT'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
