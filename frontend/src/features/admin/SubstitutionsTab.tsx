import { CheckCircle2, UserCheck, Trash2 } from 'lucide-react';
import type { TimetableApp } from '../../hooks/useTimetableApp';
import { AbsenceForm } from './AbsenceForm';

export function SubstitutionsTab({ app }: { app: TimetableApp }) {
  const {
    activeSchool, currentSchedule, teacherMap, subjectMap, classMap,
    addAbsence, removeAbsence, autoAssign, getCandidates, assignSubstitute, showToast,
  } = app;
  return (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Mark Teacher Absent */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 h-fit">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-indigo-600" />
                      <span>Log Teacher Absence</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      When a teacher is marked absent, the engine finds all currently free teachers for each affected period and ranks them by <strong>most free periods on that day</strong>.
                    </p>
                  </div>

                  <AbsenceForm
                    school={activeSchool}
                    onAddAbsence={addAbsence}
                  />

                  <div className="border-t border-slate-100 pt-4 space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Absences</h4>
                    {activeSchool.absences.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">No teachers currently marked absent.</p>
                    ) : (
                      activeSchool.absences.map(abs => {
                        const t = teacherMap[abs.teacherId];
                        return (
                          <div key={abs.id} className="flex items-center justify-between p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs">
                            <div>
                              <div className="font-bold text-rose-950">{t?.name}</div>
                              <div className="text-rose-700">{abs.day} • {abs.reason}</div>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => autoAssign(abs)}
                                className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold cursor-pointer"
                              >
                                Auto-Fill Top Subs
                              </button>
                              <button
                                onClick={() => removeAbsence(abs.id)}
                                className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Right 2 Columns: Ranked Substitute Recommendations per Affected Slot */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-base text-slate-900">Substitute Ranking Queue (Most Free Periods First)</h3>
                      <p className="text-xs text-slate-500">
                        Hard Rule: Only teachers free during the period and under the 5-period daily cap are eligible. Soft Rule: Ranked highest-to-lowest by total free periods that day.
                      </p>
                    </div>
                  </div>

                  {activeSchool.absences.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-sm">
                      Mark a teacher absent on the left to inspect affected classes and ranked substitute teachers.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {activeSchool.absences.map(abs => {
                        const absentTeacher = teacherMap[abs.teacherId];
                        const affectedSlots = Object.values(currentSchedule.entries)
                          .filter(e => e.day === abs.day && e.teacherId === abs.teacherId)
                          .sort((a, b) => a.period - b.period);

                        return (
                          <div key={abs.id} className="border border-slate-200 rounded-2xl overflow-hidden">
                            <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between text-xs">
                              <div>
                                <span className="font-bold text-sm">{absentTeacher?.name}</span> — Absent on <span className="text-amber-300 font-semibold">{abs.day}</span> ({affectedSlots.length} affected classes)
                              </div>
                              <button
                                onClick={() => autoAssign(abs)}
                                className="px-3 py-1 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-semibold cursor-pointer"
                              >
                                1-Click Assign All Top Ranked
                              </button>
                            </div>

                            <div className="divide-y divide-slate-100">
                              {affectedSlots.map(slot => {
                                const cls = classMap[slot.classId];
                                const sub = subjectMap[slot.subjectId];
                                const subKey = `${slot.day}-${slot.period}-${slot.classId}`;
                                const assignedSubId = activeSchool.substitutions[subKey];
                                const assignedSub = teacherMap[assignedSubId];
                                const candidates = getCandidates(slot.day, slot.period, abs.teacherId);

                                return (
                                  <div key={subKey} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-2">
                                        <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 font-bold text-xs">
                                          Period {slot.period}
                                        </span>
                                        <span className="font-bold text-sm text-slate-900">Class {cls?.name} ({cls?.tier})</span>
                                        <span className={`text-xs px-2 py-0.5 rounded border ${sub?.color}`}>{sub?.name}</span>
                                      </div>
                                      {assignedSub ? (
                                        <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                                          <CheckCircle2 className="w-3.5 h-3.5" />
                                          <span>Assigned Substitute: {assignedSub.name}</span>
                                        </div>
                                      ) : (
                                        <div className="text-xs text-rose-600 font-medium">Unassigned — Select a ranked substitute below</div>
                                      )}
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">
                                      {candidates.slice(0, 4).map((cand, idx) => {
                                        const isSelected = assignedSubId === cand.id;
                                        return (
                                          <button
                                            key={cand.id}
                                            onClick={() => {
                                              assignSubstitute(subKey, cand.id);
                                              showToast(`Assigned ${cand.name} to Class ${cls?.name} (P${slot.period})`, 'success');
                                            }}
                                            className={`px-3 py-2 rounded-xl border text-left text-xs transition cursor-pointer ${
                                              isSelected
                                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                                : idx === 0
                                                ? 'bg-indigo-50/80 border-indigo-300 text-indigo-950 hover:bg-indigo-100'
                                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                            }`}
                                          >
                                            <div className="flex items-center gap-1.5 font-bold">
                                              {idx === 0 && !isSelected && (
                                                <span className="px-1.5 py-0.2 bg-indigo-600 text-white rounded text-[10px]">#1 Best</span>
                                              )}
                                              <span>{cand.name}</span>
                                            </div>
                                            <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                                              <strong>{cand.freePeriodsToday} free periods</strong> today ({cand.assignedToday}/5 used)
                                            </div>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
  );
}
