import { useState } from 'react';
import { AlertTriangle, CheckCircle2, Lock, Pin, Unlock, X } from 'lucide-react';
import type { TimetableApp } from '../../hooks/useTimetableApp';

export function OverrideModal({ app }: { app: TimetableApp }) {
  const {
    activeSchool, classMap, subjectMap, editingSlot, overrideSubjectId, overrideTeacherId, overrideConflicts,
    setEditingSlot, setOverrideSubjectId, setOverrideTeacherId, saveManualOverride,
    addPinnedLesson, deletePinnedLesson,
  } = app;

  if (!editingSlot) return null;

  const existingPin = (activeSchool.pinnedLessons || []).find(
    p => p.classId === editingSlot.classId && p.day === editingSlot.day && p.period === editingSlot.period
  );

  const [lockSlot, setLockSlot] = useState<boolean>(Boolean(existingPin));

  const handleApply = async () => {
    // If locking was requested and not already pinned
    if (lockSlot && !existingPin) {
      await addPinnedLesson({
        classId: editingSlot.classId,
        subjectId: overrideSubjectId,
        teacherId: overrideTeacherId,
        day: editingSlot.day,
        period: editingSlot.period,
      });
    } else if (!lockSlot && existingPin) {
      await deletePinnedLesson(existingPin.id);
    }
    await saveManualOverride();
  };

  const handleTogglePinOnly = async () => {
    if (existingPin) {
      await deletePinnedLesson(existingPin.id);
      setLockSlot(false);
    } else {
      await addPinnedLesson({
        classId: editingSlot.classId,
        subjectId: overrideSubjectId,
        teacherId: overrideTeacherId,
        day: editingSlot.day,
        period: editingSlot.period,
      });
      setLockSlot(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900">Manual Slot Edit & Lock</h3>
            <p className="text-xs text-slate-500">
              Class {classMap[editingSlot.classId]?.name} • {editingSlot.day}, Period {editingSlot.period}
            </p>
          </div>
          <button onClick={() => setEditingSlot(null)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Pin / Lock Status Banner */}
        {existingPin ? (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 font-semibold text-amber-800">
              <Pin className="w-4 h-4 text-amber-600 shrink-0" />
              <span>This slot is Locked (Pinned in Solver)</span>
            </div>
            <button
              type="button"
              onClick={handleTogglePinOnly}
              className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg bg-amber-200/80 hover:bg-amber-200 text-amber-900 transition cursor-pointer"
            >
              <Unlock className="w-3 h-3" />
              <span>Unlock</span>
            </button>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 font-medium">
              <Lock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Slot is moveable by solver</span>
            </div>
            <button
              type="button"
              onClick={handleTogglePinOnly}
              className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 transition cursor-pointer"
            >
              <Pin className="w-3 h-3" />
              <span>Lock Now</span>
            </button>
          </div>
        )}

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

          <div className="pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 select-none">
              <input
                type="checkbox"
                checked={lockSlot}
                onChange={(e) => setLockSlot(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500"
              />
              <span>Lock / Pin this slot (Solver will strictly freeze this placement)</span>
            </label>
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
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition cursor-pointer"
          >
            Apply &amp; Save
          </button>
        </div>
      </div>
    </div>
  );
}
