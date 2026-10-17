import { AlertTriangle, CheckCircle2, X } from 'lucide-react';
import type { TimetableApp } from '../../hooks/useTimetableApp';

export function OverrideModal({ app }: { app: TimetableApp }) {
  const {
    activeSchool, classMap, subjectMap, editingSlot, overrideSubjectId, overrideTeacherId, overrideConflicts,
    setEditingSlot, setOverrideSubjectId, setOverrideTeacherId, saveManualOverride,
  } = app;
  if (!editingSlot) return null;
  return (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900">Manual Slot Override</h3>
                <p className="text-xs text-slate-500">
                  Class {classMap[editingSlot.classId]?.name} • {editingSlot.day}, Period {editingSlot.period}
                </p>
              </div>
              <button onClick={() => setEditingSlot(null)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                <select
                  value={overrideSubjectId}
                  onChange={(e) => setOverrideSubjectId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                >
                  {activeSchool.subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.type})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Teacher</label>
                <select
                  value={overrideTeacherId}
                  onChange={(e) => setOverrideTeacherId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                >
                  {activeSchool.teachers.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.subjects.map(sid => subjectMap[sid]?.code).join(', ')})
                    </option>
                  ))}
                </select>
              </div>

              {/* Real-time Conflict Detection */}
              {(() => {
                const conflicts = overrideConflicts;
                if (conflicts.length === 0) {
                  return (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>No teacher clashes or daily workload cap violations detected.</span>
                    </div>
                  );
                }
                return (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-rose-700">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>Constraint Clash Warning:</span>
                    </div>
                    {conflicts.map((c, i) => <div key={i}>• {c}</div>)}
                  </div>
                );
              })()}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingSlot(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={saveManualOverride}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
              >
                Apply Override
              </button>
            </div>
          </div>
        </div>
  );
}
