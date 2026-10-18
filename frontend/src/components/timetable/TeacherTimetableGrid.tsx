import type { ClassSection, EntryMap, School, Subject, Teacher, TimetableEntry } from '../../domain/types';
import { FlaskConical } from 'lucide-react';

interface Props {
  school: School;
  teacher: Teacher;
  entries: EntryMap;
  subjectMap: Record<string, Subject>;
  classMap: Record<string, ClassSection>;
  teacherMap: Record<string, Teacher>;
  searchQuery?: string;
  filterType?: 'all' | 'substitutions' | 'activity' | 'academic';
}

export function TeacherTimetableGrid({
  school,
  teacher,
  entries,
  subjectMap,
  classMap,
  teacherMap,
  searchQuery = '',
  filterType = 'all',
}: Props) {
  // Compute teacher's daily load (including substitutions)
  const dailyStats: Record<string, { assigned: number; free: number }> = {};
  school.workingDays.forEach(day => {
    let count = 0;
    for (let p = 1; p <= school.rules.seniorEndPeriod; p++) {
      Object.values(entries).forEach(e => {
        if (e.day === day && e.period === p) {
          const subKey = `${day}-${p}-${e.classId}`;
          const effectiveTeacherId = school.substitutions[subKey] || e.teacherId;
          if (effectiveTeacherId === teacher.id) count++;
        }
      });
    }
    dailyStats[day] = {
      assigned: count,
      free: school.rules.seniorEndPeriod - count
    };
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-slate-50/60">
        <div>
          <h3 className="font-bold text-sm text-slate-900">
            {teacher.name} — Weekly Schedule & Daily Workload Meter
          </h3>
          <p className="text-xs text-slate-500">
            Qualified Subjects: {teacher.subjects.map(sid => subjectMap[sid]?.name).join(', ')}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {school.workingDays.map(day => {
            const st = dailyStats[day];
            const overCap = st.assigned > school.rules.maxTeacherPeriodsPerDay;
            return (
              <div key={day} className={`px-2.5 py-1 rounded-xl border text-xs ${
                overCap ? 'bg-rose-50 border-rose-300 text-rose-800' : 'bg-white border-slate-200 text-slate-700'
              }`}>
                <span className="font-bold">{day.slice(0, 3)}:</span> {st.assigned}/{school.rules.maxTeacherPeriodsPerDay} periods{' '}
                <span className="text-emerald-600 font-semibold">({st.free} free)</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
              <th className="py-3 px-4 w-36 font-semibold">Period / Time</th>
              {school.workingDays.map(day => {
                const isSat = day === 'Saturday';
                return (
                  <th key={day} className={`py-3 px-4 font-semibold min-w-[155px] ${
                    isSat ? 'bg-amber-50/60 border-l-2 border-amber-300' : ''
                  }`}>
                    <div className={isSat ? 'text-amber-800' : ''}>{day}</div>
                    {isSat && (
                      <div className="text-[9px] font-normal normal-case tracking-normal text-amber-600 mt-0.5">Saturday school day</div>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs">
            {school.periodSlots.filter(s => !s.isBreak).map(slot => {
              const p = slot.number as number;
              return (
                <tr key={slot.label}>
                  <td className="py-3 px-4 border-r border-slate-200 bg-slate-50/40">
                    <div className="font-bold text-slate-800">{slot.label}</div>
                    <div className="text-[11px] text-slate-500">{slot.time}</div>
                  </td>
                  {school.workingDays.map(day => {
                    const isSatCol = day === 'Saturday';
                    // Find if teacher is teaching a regular class or substituting
                    let matchedEntry = null as TimetableEntry | null;
                    let isSubbing = false;
                    let coveredBySub = null as Teacher | null;

                    Object.values(entries).forEach(e => {
                      if (e.day === day && e.period === p) {
                        const subKey = `${day}-${p}-${e.classId}`;
                        const subId = school.substitutions[subKey];
                        if (subId === teacher.id) {
                          matchedEntry = e;
                          isSubbing = true;
                        } else if (e.teacherId === teacher.id) {
                          matchedEntry = e;
                          if (subId) coveredBySub = teacherMap[subId];
                        }
                      }
                    });

                    // Search & Filter matching for teacher grid
                    const hasSearch = Boolean(searchQuery && searchQuery.trim().length > 0);
                    const q = searchQuery ? searchQuery.trim().toLowerCase() : '';

                    let matchesSearch = true;
                    if (hasSearch) {
                      if (matchedEntry) {
                        const mSub = subjectMap[matchedEntry.subjectId];
                        const mCls = classMap[matchedEntry.classId];
                        matchesSearch = Boolean(
                          mSub?.name.toLowerCase().includes(q) ||
                          mSub?.code.toLowerCase().includes(q) ||
                          teacher.name.toLowerCase().includes(q) ||
                          mCls?.name.toLowerCase().includes(q) ||
                          matchedEntry.room.toLowerCase().includes(q)
                        );
                      } else {
                        matchesSearch = false;
                      }
                    }

                    let matchesFilter = true;
                    if (filterType === 'substitutions') {
                      matchesFilter = isSubbing || Boolean(coveredBySub);
                    } else if (filterType === 'activity') {
                      const mSub = matchedEntry ? subjectMap[matchedEntry.subjectId] : null;
                      matchesFilter = Boolean(matchedEntry?.isActivity || mSub?.type === 'activity');
                    } else if (filterType === 'academic') {
                      const mSub = matchedEntry ? subjectMap[matchedEntry.subjectId] : null;
                      matchesFilter = Boolean(mSub?.type === 'academic');
                    }

                    const isFilterActive = hasSearch || filterType !== 'all';
                    const isHighlighted = isFilterActive && matchesSearch && matchesFilter && Boolean(matchedEntry);
                    const isDimmed = isFilterActive && (!matchesSearch || !matchesFilter);

                    if (!matchedEntry) {
                      return (
                        <td key={day} className={`p-2.5 border-r ${
                          isSatCol ? 'bg-amber-50/20 border-amber-200' : 'border-slate-100'
                        }`}>
                          <div
                            className={`h-16 rounded-xl bg-emerald-50/40 border border-dashed border-emerald-200 flex flex-col items-center justify-center text-emerald-700 transition-opacity ${
                              isFilterActive ? 'opacity-20' : ''
                            }`}
                          >
                            <span className="font-semibold text-xs">Free Period</span>
                            <span className="text-[10px] opacity-75">Available for Sub</span>
                          </div>
                        </td>
                      );
                    }

                    const currentEntry = matchedEntry;
                    const cls = classMap[currentEntry.classId];
                    const sub = subjectMap[currentEntry.subjectId];
                    const recessP = school.timingConfig?.recessAfterPeriod ?? 2;
                    const lunchP = school.timingConfig?.lunchAfterPeriod ?? 4;
                    const isConnNext = p !== recessP && p !== lunchP && Object.values(entries).some(e =>
                      e.day === day &&
                      e.period === p + 1 &&
                      e.classId === currentEntry.classId &&
                      e.subjectId === currentEntry.subjectId &&
                      (school.substitutions[`${e.day}-${e.period}-${e.classId}`] || e.teacherId) === teacher.id
                    );
                    const isConnPrev = (p - 1) !== recessP && (p - 1) !== lunchP && Object.values(entries).some(e =>
                      e.day === day &&
                      e.period === p - 1 &&
                      e.classId === currentEntry.classId &&
                      e.subjectId === currentEntry.subjectId &&
                      (school.substitutions[`${e.day}-${e.period}-${e.classId}`] || e.teacherId) === teacher.id
                    );
                    const isDoubleBlock = Boolean(sub?.requiresDoublePeriod && (isConnNext || isConnPrev));

                    return (
                      <td key={day} className={`p-2.5 border-r ${
                        isSatCol ? 'bg-amber-50/20 border-amber-200' : 'border-slate-100'
                      }`}>
                        <div
                          className={`p-2.5 rounded-xl border transition-all duration-200 ${
                            isSubbing
                              ? 'bg-amber-100 border-amber-300 text-amber-950'
                              : coveredBySub
                              ? 'bg-slate-100 border-slate-300 text-slate-400 line-through'
                              : sub?.color
                          } ${
                            isHighlighted
                              ? 'ring-2 ring-indigo-600 shadow-md scale-[1.02] z-10 bg-white/95'
                              : ''
                          } ${isDimmed ? 'opacity-20 grayscale-[30%]' : ''}`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-xs">Class {cls?.name}</span>
                            <div className="flex items-center gap-1 shrink-0">
                              {isDoubleBlock && (
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-600 text-white flex items-center gap-0.5 shadow-2xs" title="90-Minute Consecutive Lab / Practical Block">
                                  <FlaskConical className="w-2.5 h-2.5" />
                                  <span>90m</span>
                                </span>
                              )}
                              {isSubbing && (
                                <span className="px-1.5 py-0.2 rounded bg-amber-700 text-white text-[10px] font-bold">
                                  SUB DUTY
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="font-medium mt-1">{sub?.name}</div>
                          <div className="text-[10px] opacity-75 mt-0.5">📍 {matchedEntry.room}</div>
                          {coveredBySub && (
                            <div className="text-[10px] text-rose-600 font-semibold no-underline mt-1">
                              Covered by {coveredBySub.name}
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
