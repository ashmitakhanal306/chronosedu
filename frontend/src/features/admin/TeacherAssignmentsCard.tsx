import React, { useState, useMemo } from 'react';
import { Users, Sparkles, Check, AlertCircle, AlertTriangle, ShieldCheck, UserCheck, BookOpen, ChevronDown } from 'lucide-react';
import type { School, Teacher, Subject, ClassSection, TeachingAssignment } from '../../domain/types';
import type { TimetableApp } from '../../hooks/useTimetableApp';

interface Props {
  school: School;
  app?: TimetableApp;
}

export function TeacherAssignmentsCard({ school, app }: Props) {
  const [filterClassId, setFilterClassId] = useState<string>('all');
  const [isSuggesting, setIsSuggesting] = useState(false);

  const assignments = school.assignments || [];

  // Map (classId_subjectId) -> TeachingAssignment
  const assignmentMap = useMemo(() => {
    const map: Record<string, TeachingAssignment> = {};
    assignments.forEach(a => {
      map[`${a.classId}_${a.subjectId}`] = a;
    });
    return map;
  }, [assignments]);

  // Teachers indexed by subject
  const teachersBySubject = useMemo(() => {
    const map: Record<string, Teacher[]> = {};
    school.subjects.forEach(s => {
      map[s.id] = school.teachers.filter(t => t.subjects.includes(s.id));
    });
    return map;
  }, [school.subjects, school.teachers]);

  // Compute teacher weekly assigned workloads
  const teacherWorkloads = useMemo(() => {
    const loads: Record<string, { assigned: number; max: number; pct: number; overloaded: boolean }> = {};
    school.teachers.forEach(t => {
      loads[t.id] = {
        assigned: 0,
        max: t.maxPerWeek || 30,
        pct: 0,
        overloaded: false,
      };
    });

    assignments.forEach(a => {
      if (!loads[a.teacherId]) return;
      const cls = school.classes.find(c => c.id === a.classId);
      const sub = school.subjects.find(s => s.id === a.subjectId);
      if (!cls || !sub) return;

      const freq = cls.tier === 'Primary' ? (sub.freqPrimary || 0) : (sub.freqSenior || 0);
      loads[a.teacherId].assigned += freq;
    });

    Object.keys(loads).forEach(tid => {
      const item = loads[tid];
      item.pct = Math.round((item.assigned / item.max) * 100);
      item.overloaded = item.assigned > item.max;
    });

    return loads;
  }, [assignments, school.classes, school.subjects, school.teachers]);

  // Calculate pairs that require teaching (frequency > 0)
  const requiredPairs = useMemo(() => {
    const pairs: { classObj: ClassSection; subjectObj: Subject; freq: number }[] = [];
    school.classes.forEach(c => {
      school.subjects.forEach(s => {
        const freq = c.tier === 'Primary' ? (s.freqPrimary || 0) : (s.freqSenior || 0);
        if (freq > 0) {
          pairs.push({ classObj: c, subjectObj: s, freq });
        }
      });
    });
    return pairs;
  }, [school.classes, school.subjects]);

  const assignedCount = useMemo(() => {
    return requiredPairs.filter(p => !!assignmentMap[`${p.classObj.id}_${p.subjectObj.id}`]).length;
  }, [requiredPairs, assignmentMap]);

  const totalRequired = requiredPairs.length;
  const isAllAssigned = totalRequired > 0 && assignedCount === totalRequired;
  const missingCount = totalRequired - assignedCount;

  const handleSelectTeacher = async (classId: string, subjectId: string, teacherId: string) => {
    if (!app) return;
    if (!teacherId || teacherId === 'unassigned') {
      const existing = assignmentMap[`${classId}_${subjectId}`];
      if (existing) {
        await app.deleteAssignment(existing.id);
      }
    } else {
      await app.upsertAssignment(classId, subjectId, teacherId);
    }
  };

  const handleAutoSuggest = async () => {
    if (!app || isSuggesting) return;
    setIsSuggesting(true);
    try {
      await app.suggestAssignments();
    } finally {
      setIsSuggesting(false);
    }
  };

  const displayedClasses = filterClassId === 'all'
    ? school.classes
    : school.classes.filter(c => c.id === filterClassId);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-5 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 mb-1">
            <span>⭐ STEP 8 — MOST IMPORTANT ARCHITECTURAL LAYER</span>
          </div>
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
            <span>Teacher Assignment Matrix (Class + Subject → ONE Teacher)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Select one dedicated teacher for every Class × Subject pair. The solver will never swap teachers across days.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Completion Badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
              isAllAssigned
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}
          >
            {isAllAssigned ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{assignedCount}/{totalRequired} All Assigned</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{missingCount} Unassigned ({assignedCount}/{totalRequired})</span>
              </>
            )}
          </span>

          {/* Auto-suggest Button */}
          {app && (
            <button
              type="button"
              onClick={handleAutoSuggest}
              disabled={isSuggesting}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-bold shadow-xs cursor-pointer transition disabled:opacity-50"
              title="Automatically match qualified teachers by lowest weekly load"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isSuggesting ? 'Matching...' : 'Auto-Suggest All'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Teacher Workload Meters */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-indigo-500" />
            <span>Teacher Workload Balancer</span>
          </span>
          <span className="text-[11px] text-slate-400">Target: ≤ 30 periods/week</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {school.teachers.map(t => {
            const wl = teacherWorkloads[t.id] || { assigned: 0, max: 30, pct: 0, overloaded: false };
            const isNearCap = wl.pct >= 85 && !wl.overloaded;

            return (
              <div
                key={t.id}
                className={`p-2.5 rounded-xl border text-xs transition ${
                  wl.overloaded
                    ? 'bg-rose-50/70 border-rose-300 ring-1 ring-rose-300'
                    : isNearCap
                    ? 'bg-amber-50/50 border-amber-200'
                    : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-800 truncate" title={t.name}>
                    {t.name}
                  </span>
                  {wl.overloaded && (
                    <span className="text-[10px] font-bold text-rose-600 bg-rose-100 px-1 rounded-sm">
                      OVER
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
                  <span>{wl.assigned} / {wl.max} p/wk</span>
                  <span className={`font-bold ${wl.overloaded ? 'text-rose-600' : wl.pct > 75 ? 'text-amber-600' : 'text-slate-600'}`}>
                    {wl.pct}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      wl.overloaded
                        ? 'bg-rose-500'
                        : isNearCap
                        ? 'bg-amber-500'
                        : 'bg-indigo-500'
                    }`}
                    style={{ width: `${Math.min(100, wl.pct)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Class Filter Bar */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Filter Class:</span>
          <select
            value={filterClassId}
            onChange={e => setFilterClassId(e.target.value)}
            className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">All Classes ({school.classes.length})</option>
            {school.classes.map(c => (
              <option key={c.id} value={c.id}>
                Class {c.name} ({c.grade})
              </option>
            ))}
          </select>
        </div>

        <span className="text-[11px] text-slate-400 hidden sm:inline">
          💡 Select qualified teachers with free capacity to prevent solver infeasibility.
        </span>
      </div>

      {/* Assignment Matrix Grid */}
      <div className="border border-slate-200 rounded-xl overflow-x-auto shadow-2xs">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200">
              <th className="py-2.5 px-3 font-bold text-slate-700 sticky left-0 bg-slate-50/95 z-10 min-w-32">
                Class / Section
              </th>
              {school.subjects.map(sub => (
                <th key={sub.id} className="py-2.5 px-3 font-bold text-slate-700 min-w-44">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${sub.color ? sub.color.split(' ')[0] : 'bg-indigo-500'}`} />
                    <span className="truncate" title={sub.name}>{sub.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({sub.code})</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {displayedClasses.map(cls => (
              <tr key={cls.id} className="hover:bg-slate-50/50 transition">
                {/* Class Column */}
                <td className="py-2.5 px-3 font-bold text-slate-900 sticky left-0 bg-white z-10 border-r border-slate-100">
                  <div className="flex items-center gap-2">
                    <span>{cls.name}</span>
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-md ${
                        cls.tier === 'Primary'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-sky-50 text-sky-700 border border-sky-200'
                      }`}
                    >
                      {cls.grade}
                    </span>
                  </div>
                </td>

                {/* Subject Cells */}
                {school.subjects.map(sub => {
                  const freq = cls.tier === 'Primary' ? (sub.freqPrimary || 0) : (sub.freqSenior || 0);
                  const isRequired = freq > 0;
                  const currentAsgn = assignmentMap[`${cls.id}_${sub.id}`];
                  const qualifiedTeachers = teachersBySubject[sub.id] || [];
                  const assignedTeacher = currentAsgn ? school.teachers.find(t => t.id === currentAsgn.teacherId) : null;
                  const isOverloaded = assignedTeacher ? (teacherWorkloads[assignedTeacher.id]?.overloaded || false) : false;

                  if (!isRequired) {
                    return (
                      <td key={sub.id} className="py-2 px-2.5 text-center text-slate-300 bg-slate-50/30">
                        <span className="text-[11px]">—</span>
                      </td>
                    );
                  }

                  return (
                    <td key={sub.id} className="py-2 px-2.5">
                      <div className="space-y-1">
                        <div className="relative">
                          <select
                            value={currentAsgn?.teacherId || 'unassigned'}
                            onChange={e => handleSelectTeacher(cls.id, sub.id, e.target.value)}
                            className={`w-full appearance-none pl-2 pr-6 py-1.5 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                              !currentAsgn
                                ? 'bg-amber-50/70 border-amber-300 text-amber-800'
                                : isOverloaded
                                ? 'bg-rose-50/70 border-rose-300 text-rose-800'
                                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                            }`}
                          >
                            <option value="unassigned">⚠️ Unassigned ({freq} p/wk)</option>
                            {qualifiedTeachers.map(t => {
                              const wl = teacherWorkloads[t.id];
                              return (
                                <option key={t.id} value={t.id}>
                                  {t.name} ({wl?.assigned || 0}/{wl?.max || 30} p/wk)
                                </option>
                              );
                            })}
                          </select>
                          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        {/* Status caption under cell */}
                        <div className="flex items-center justify-between text-[10px] px-0.5">
                          <span className="text-slate-400">{freq} p/wk</span>
                          {!currentAsgn ? (
                            <span className="text-amber-600 font-bold flex items-center gap-0.5">
                              🔴 Required
                            </span>
                          ) : isOverloaded ? (
                            <span className="text-rose-600 font-bold flex items-center gap-0.5">
                              🟡 Overloaded
                            </span>
                          ) : (
                            <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                              <Check className="w-2.5 h-2.5 stroke-[3]" /> Assigned
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
