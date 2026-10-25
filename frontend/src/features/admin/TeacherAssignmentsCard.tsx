import React, { useState, useMemo } from 'react';
import {
  Users,
  Sparkles,
  Check,
  AlertCircle,
  AlertTriangle,
  ShieldCheck,
  UserCheck,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import type { School, Teacher, Subject, ClassSection, TeachingAssignment } from '../../domain/types';
import type { TimetableApp } from '../../hooks/useTimetableApp';
import { sortClasses, sortTeachers } from '../../utils/sorting';

interface Props {
  school: School;
  app?: TimetableApp;
}

export function TeacherAssignmentsCard({ school, app }: Props) {
  const [filterClassId, setFilterClassId] = useState<string>('all');
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [teacherSearch, setTeacherSearch] = useState('');
  const [teacherFilter, setTeacherFilter] = useState<'all' | 'near-cap' | 'overloaded' | 'available'>('all');
  const [isBalancerExpanded, setIsBalancerExpanded] = useState(false);
  const [classSearch, setClassSearch] = useState('');
  const [classTierFilter, setClassTierFilter] = useState<'all' | 'Primary' | 'Senior'>('all');

  const assignments = school.assignments || [];

  // Natural sorted entities
  const sortedClasses = useMemo(() => sortClasses(school.classes), [school.classes]);
  const sortedTeachers = useMemo(() => sortTeachers(school.teachers), [school.teachers]);

  // Map (classId_subjectId) -> TeachingAssignment
  const assignmentMap = useMemo(() => {
    const map: Record<string, TeachingAssignment> = {};
    assignments.forEach(a => {
      map[`${a.classId}_${a.subjectId}`] = a;
    });
    return map;
  }, [assignments]);

  // Teachers indexed by subject, sorted in dictionary pattern (A to Z)
  const teachersBySubject = useMemo(() => {
    const map: Record<string, Teacher[]> = {};
    school.subjects.forEach(s => {
      const qualified = school.teachers.filter(t => t.subjects.includes(s.id));
      map[s.id] = sortTeachers(qualified);
    });
    return map;
  }, [school.subjects, school.teachers]);

  // If timetable entries exist for the school, actual entries give the definitive scheduled workload
  const entriesCountByTeacher = useMemo(() => {
    const counts: Record<string, number> = {};
    if (app?.currentSchedule?.entries) {
      Object.values(app.currentSchedule.entries).forEach(slot => {
        if (slot?.teacherId) {
          counts[slot.teacherId] = (counts[slot.teacherId] || 0) + 1;
        }
      });
    }
    return counts;
  }, [app?.currentSchedule?.entries]);

  // Compute teacher weekly assigned workloads
  const teacherWorkloads = useMemo(() => {
    const loads: Record<string, { assigned: number; max: number; pct: number; overloaded: boolean }> = {};
    school.teachers.forEach(t => {
      loads[t.id] = {
        assigned: entriesCountByTeacher[t.id] ?? 0,
        max: t.maxPerWeek || 30,
        pct: 0,
        overloaded: false,
      };
    });

    // If no schedule entries exist yet, compute from assignments
    const hasEntries = Object.keys(entriesCountByTeacher).length > 0;
    if (!hasEntries) {
      assignments.forEach(a => {
        if (!loads[a.teacherId]) return;
        if (typeof a.teacherWeeklyLoad === 'number' && a.teacherWeeklyLoad > 0) {
          loads[a.teacherId].assigned = a.teacherWeeklyLoad;
          return;
        }
        const cls = school.classes.find(c => c.id === a.classId);
        const sub = school.subjects.find(s => s.id === a.subjectId);
        if (!cls || !sub) return;

        const freq = a.weeklyFrequency ?? (cls.tier === 'Primary' ? (sub.freqPrimary || 0) : (sub.freqSenior || 0));
        loads[a.teacherId].assigned += freq;
      });
    }

    Object.keys(loads).forEach(tid => {
      const item = loads[tid];
      item.pct = Math.round((item.assigned / item.max) * 100);
      item.overloaded = item.assigned > item.max;
    });

    return loads;
  }, [assignments, school.classes, school.subjects, school.teachers, entriesCountByTeacher]);

  // Calculate pairs that require teaching (frequency > 0)
  // For schools with specialized streams/curricula (>50 sections), required pairs are those with assigned/demanded requirements.
  const requiredPairs = useMemo(() => {
    const pairs: { classObj: ClassSection; subjectObj: Subject; freq: number }[] = [];
    if (assignments.length > 0) {
      assignments.forEach(a => {
        const cls = school.classes.find(c => c.id === a.classId);
        const sub = school.subjects.find(s => s.id === a.subjectId);
        if (cls && sub) {
          const freq = a.weeklyFrequency || (cls.tier === 'Primary' ? (sub.freqPrimary || 0) : (sub.freqSenior || 0));
          pairs.push({ classObj: cls, subjectObj: sub, freq });
        }
      });
      return pairs;
    }

    school.classes.forEach(c => {
      school.subjects.forEach(s => {
        const freq = c.tier === 'Primary' ? (s.freqPrimary || 0) : (s.freqSenior || 0);
        if (freq > 0) {
          pairs.push({ classObj: c, subjectObj: s, freq });
        }
      });
    });
    return pairs;
  }, [school.classes, school.subjects, assignments]);

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
    ? sortedClasses
    : sortedClasses.filter(c => c.id === filterClassId);

  // Teacher status metrics
  const teacherMetrics = useMemo(() => {
    let overloaded = 0;
    let nearCap = 0;
    let available = 0;
    sortedTeachers.forEach(t => {
      const wl = teacherWorkloads[t.id];
      if (!wl) return;
      if (wl.overloaded) overloaded++;
      else if (wl.pct >= 85) nearCap++;
      else available++;
    });
    return { overloaded, nearCap, available, total: sortedTeachers.length };
  }, [sortedTeachers, teacherWorkloads]);

  // Filtered teachers for workload balancer
  const filteredTeachers = useMemo(() => {
    return sortedTeachers.filter(t => {
      const wl = teacherWorkloads[t.id] || { pct: 0, overloaded: false };
      if (teacherFilter === 'overloaded' && !wl.overloaded) return false;
      if (teacherFilter === 'near-cap' && (wl.pct < 85 || wl.overloaded)) return false;
      if (teacherFilter === 'available' && (wl.pct >= 85 || wl.overloaded)) return false;
      if (teacherSearch.trim()) {
        const q = teacherSearch.toLowerCase().trim();
        return t.name.toLowerCase().includes(q);
      }
      return true;
    });
  }, [sortedTeachers, teacherWorkloads, teacherFilter, teacherSearch]);

  // Filtered classes for assignment matrix
  const filteredMatrixClasses = useMemo(() => {
    return displayedClasses.filter(c => {
      if (classTierFilter !== 'all' && c.tier !== classTierFilter) return false;
      if (classSearch.trim()) {
        const q = classSearch.toLowerCase().trim();
        return (
          c.name.toLowerCase().includes(q) ||
          c.grade.toLowerCase().includes(q) ||
          (c.room && c.room.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [displayedClasses, classTierFilter, classSearch]);

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
      <div className="bg-slate-50/70 rounded-2xl border border-slate-200/90 p-3.5 space-y-3">
        {/* Balancer Header & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-indigo-600" />
              <span>Teacher Workload Balancer</span>
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {teacherMetrics.total} Faculty
            </span>
          </div>

          {/* Quick Filter Status Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setTeacherFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer text-[11px] ${
                teacherFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              All ({teacherMetrics.total})
            </button>
            <button
              type="button"
              onClick={() => setTeacherFilter('near-cap')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer text-[11px] ${
                teacherFilter === 'near-cap'
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100'
              }`}
            >
              Near Cap ({teacherMetrics.nearCap})
            </button>
            {teacherMetrics.overloaded > 0 && (
              <button
                type="button"
                onClick={() => setTeacherFilter('overloaded')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer text-[11px] ${
                  teacherFilter === 'overloaded'
                    ? 'bg-rose-600 text-white shadow-2xs'
                    : 'bg-rose-50 border border-rose-200 text-rose-800 hover:bg-rose-100'
                }`}
              >
                Overloaded ({teacherMetrics.overloaded})
              </button>
            )}
            <button
              type="button"
              onClick={() => setTeacherFilter('available')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer text-[11px] ${
                teacherFilter === 'available'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              Available ({teacherMetrics.available})
            </button>
          </div>

          {/* Search & Expand Toggle */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search faculty..."
                value={teacherSearch}
                onChange={e => setTeacherSearch(e.target.value)}
                className="pl-8 pr-2.5 py-1 rounded-lg border border-slate-300 text-xs bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-36 sm:w-44"
              />
            </div>
            <button
              type="button"
              onClick={() => setIsBalancerExpanded(prev => !prev)}
              className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 bg-white border border-slate-200 px-2.5 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer shadow-2xs"
            >
              {isBalancerExpanded ? (
                <>
                  <ChevronUp className="w-3 h-3" />
                  <span>Collapse</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3" />
                  <span>Expand All</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Scrollable Cards Grid Container (4 rows visible at once) */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 pr-1 ${
            isBalancerExpanded ? '' : 'max-h-[308px] overflow-y-auto'
          }`}
        >
          {filteredTeachers.map(t => {
            const wl = teacherWorkloads[t.id] || { assigned: 0, max: 30, pct: 0, overloaded: false };
            const isNearCap = wl.pct >= 85 && !wl.overloaded;

            return (
              <div
                key={t.id}
                className={`p-2.5 rounded-xl border text-xs transition shadow-2xs ${
                  wl.overloaded
                    ? 'bg-rose-50 border-rose-300 ring-1 ring-rose-300'
                    : isNearCap
                    ? 'bg-amber-50/70 border-amber-200'
                    : 'bg-white border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-800 truncate text-[11px]" title={t.name}>
                    {t.name}
                  </span>
                  {wl.overloaded && (
                    <span className="text-[9px] font-bold text-rose-600 bg-rose-100 px-1 rounded-sm">
                      OVER
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1.5">
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
          {filteredTeachers.length === 0 && (
            <div className="col-span-full py-6 text-center text-xs text-slate-400 bg-white rounded-xl border border-dashed border-slate-200">
              No faculty found matching the filter &quot;{teacherSearch || teacherFilter}&quot;
            </div>
          )}
        </div>
      </div>

      {/* Class Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Filter Section:</span>
          <select
            value={filterClassId}
            onChange={e => setFilterClassId(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-2xs"
          >
            <option value="all">All Classes ({school.classes.length})</option>
            {sortedClasses.map(c => (
              <option key={c.id} value={c.id}>
                Class {c.name} ({c.grade})
              </option>
            ))}
          </select>

          {/* Quick Tier Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setClassTierFilter('all')}
              className={`px-2 py-0.5 rounded-md font-semibold text-[11px] transition cursor-pointer ${
                classTierFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setClassTierFilter('Primary')}
              className={`px-2 py-0.5 rounded-md font-semibold text-[11px] transition cursor-pointer ${
                classTierFilter === 'Primary' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Primary
            </button>
            <button
              type="button"
              onClick={() => setClassTierFilter('Senior')}
              className={`px-2 py-0.5 rounded-md font-semibold text-[11px] transition cursor-pointer ${
                classTierFilter === 'Senior' ? 'bg-white text-sky-800 shadow-2xs' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Senior
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Quick search class..."
              value={classSearch}
              onChange={e => setClassSearch(e.target.value)}
              className="pl-8 pr-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-36 sm:w-44 shadow-2xs"
            />
          </div>
        </div>

        <span className="text-[11px] text-slate-400 hidden lg:inline">
          Showing {filteredMatrixClasses.length} of {school.classes.length} classes • Scroll table horizontally &amp; vertically
        </span>
      </div>

      {/* Assignment Matrix Grid with Sticky Headers */}
      <div className="border border-slate-200 rounded-2xl overflow-auto max-h-[560px] shadow-2xs relative">
        <table className="w-full border-collapse text-left text-xs">
          <thead className="sticky top-0 z-20 bg-slate-100 border-b border-slate-200 shadow-xs">
            <tr>
              <th className="py-2.5 px-3 font-bold text-slate-800 sticky left-0 top-0 bg-slate-100 z-30 min-w-36 border-r border-slate-200 shadow-xs">
                Class / Section
              </th>
              {school.subjects.map(sub => (
                <th key={sub.id} className="py-2.5 px-3 font-bold text-slate-700 min-w-44 bg-slate-100">
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
            {filteredMatrixClasses.map(cls => (
              <tr key={cls.id} className="hover:bg-slate-50/50 transition">
                {/* Class Column */}
                <td className="py-2.5 px-3 font-bold text-slate-900 sticky left-0 bg-white z-10 border-r border-slate-200 shadow-2xs">
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
                  const currentAsgn = assignmentMap[`${cls.id}_${sub.id}`];
                  const rawFreq = cls.tier === 'Primary' ? (sub.freqPrimary || 0) : (sub.freqSenior || 0);
                  const isRequired = assignments.length > 0 ? Boolean(currentAsgn) : rawFreq > 0;
                  const freq = currentAsgn?.weeklyFrequency || rawFreq;
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
            {filteredMatrixClasses.length === 0 && (
              <tr>
                <td colSpan={school.subjects.length + 1} className="py-8 text-center text-xs text-slate-400">
                  No classes match your filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
