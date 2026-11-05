import type { ClassSection, EntryMap, School, Subject, Teacher, TimetableEntry } from '../../domain/types';
import { ArrowLeftRight, Clock3, FlaskConical, MapPin } from 'lucide-react';
import { Badge, Card } from '../ui/primitives';
import { getSubjectCellClasses, getTodayColumn, isCurrentPeriod } from './gridDisplay';

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
  const today = getTodayColumn(school.workingDays);
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
    <Card className="rounded-2xl shadow-xs overflow-hidden p-0">
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
                <span className="text-emerald-700 font-semibold">({st.free} free)</span>
              </div>
            );
          })}
        </div>
      </div>

      <div role="region" aria-label={`Weekly timetable for ${teacher.name}`} tabIndex={0} className="w-full min-w-0 max-w-full max-h-[75vh] overflow-auto overscroll-x-contain overscroll-y-auto focus-visible:outline-2 focus-visible:outline-brand-600 print:max-h-none print:overflow-visible print:static">
        <table aria-label={`${teacher.name} weekly timetable`} className="w-full min-w-[1000px] border-collapse text-left print:min-w-0">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <th scope="col" className="sticky top-0 left-0 z-30 py-3 px-4 w-40 min-w-40 whitespace-nowrap font-semibold bg-slate-50 print:static print:z-auto print:w-36 print:min-w-0">
                Period / Time
              </th>
              {school.workingDays.map(day => {
                const isSat = day === 'Saturday';
                const isToday = day === today;
                return (
                  <th key={day} scope="col" className={`sticky top-0 z-20 py-3 px-4 font-semibold min-w-[160px] bg-slate-50 print:static print:z-auto print:min-w-0 ${
                    isSat ? 'bg-amber-50/60 border-l-2 border-amber-300 print:bg-amber-50/60' : ''
                  } ${
                    isToday ? `border-b-2 border-brand-600 bg-brand-50 ${isSat ? 'print:bg-amber-50/60' : 'print:bg-slate-50'} print:border-b-0` : ''
                  }`}>
                    <div className={isSat && !isToday ? 'text-amber-800' : ''}>{day}</div>
                    {isToday && <Badge className="mt-1 border-brand-100 bg-brand-100 text-brand-700 print:hidden">Today</Badge>}
                    {isSat && (
                      <div className="text-xs print:text-[9px] font-normal normal-case tracking-normal text-amber-700 mt-0.5">Saturday school day</div>
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
                  <td className={`sticky left-0 z-10 py-3 px-4 border-r border-slate-200 bg-slate-50/40 print:static print:z-auto ${isCurrentPeriod(slot.time) ? 'border-l-4 border-l-brand-600 print:border-l-0' : ''}`}>
                    <div className="font-bold text-slate-800">{slot.label}</div>
                    <div className="text-xs text-slate-600">{slot.time}</div>
                    {isCurrentPeriod(slot.time) && <Badge className="mt-1 gap-1 border-brand-200 bg-brand-50 text-brand-700 print:hidden"><Clock3 className="h-3 w-3" />Now</Badge>}
                  </td>
                  {school.workingDays.map(day => {
                    const isSatCol = day === 'Saturday';
                    const isToday = day === today;
                    const isCurrentCell = isToday && isCurrentPeriod(slot.time);
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
                        <td key={day} className={`p-2.5 border-r print:ring-0 ${
                          isSatCol ? 'bg-amber-50/20 border-amber-200' : 'border-slate-100'
                        } ${isToday ? 'border-l-2 border-l-brand-300 print:border-l-0' : ''} ${isCurrentCell ? 'ring-2 ring-inset ring-brand-500' : ''}`}>
                          <div
                            className={`min-h-16 rounded-xl bg-emerald-50 border border-dashed border-emerald-300 p-2 flex flex-col items-center justify-center gap-1 text-emerald-900 transition-opacity ${
                              isFilterActive ? 'opacity-20' : ''
                            }`}
                          >
                            <span className="inline-flex items-center gap-1 font-semibold text-xs"><Clock3 className="h-3.5 w-3.5 print:hidden" aria-hidden="true" />Free period</span>
                            <span className="text-xs text-emerald-800 print:hidden">Available for cover</span>
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
                      <td key={day} className={`p-2.5 border-r print:ring-0 ${
                        isSatCol ? 'bg-amber-50/20 border-amber-200' : 'border-slate-100'
                      } ${isToday ? 'border-l-2 border-l-brand-300 print:border-l-0' : ''} ${isCurrentCell ? 'ring-2 ring-inset ring-brand-500' : ''}`}>
                        <div
                          className={`p-2.5 rounded-xl border transition-all duration-200 ${
                            isSubbing
                              ? 'bg-amber-100 border-amber-300 text-amber-950 print:bg-amber-100 print:border-amber-300 print:text-amber-950'
                              : coveredBySub
                              ? 'bg-slate-100 border-slate-300 text-slate-700 print:bg-slate-100 print:border-slate-300 print:text-slate-400 print:line-through'
                              : getSubjectCellClasses(sub?.color)
                          } ${
                            isHighlighted
                              ? 'ring-2 ring-indigo-600 shadow-md scale-[1.02] z-10 print:bg-white/95'
                              : ''
                          } ${isDimmed ? 'opacity-20 grayscale-[30%]' : ''}`}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <div className="min-w-0">
                              <div className="font-bold text-sm print:text-xs leading-tight">{sub?.name}</div>
                              <div className="text-xs text-slate-800 mt-1">Class {cls?.name}</div>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              {isDoubleBlock && (
                                <span className="text-xs print:text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-700 text-white flex items-center gap-1 shadow-2xs" title="90-Minute Consecutive Lab / Practical Block">
                                  <FlaskConical className="w-3 h-3 print:hidden" />
                                  <span>90m</span>
                                </span>
                              )}
                              {isSubbing && (
                                <Badge className="gap-1 border-amber-700 bg-amber-700 text-white print:hidden"><ArrowLeftRight className="h-3 w-3" />Sub duty</Badge>
                              )}
                            </div>
                          </div>
                          {isSubbing && <div className="text-xs text-amber-950 font-semibold print:hidden">Covering for {teacher.name}</div>}
                          {coveredBySub && (
                            <div className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-slate-800 no-underline print:hidden">
                              <ArrowLeftRight className="h-3.5 w-3.5" aria-hidden="true" />Covered by {coveredBySub.name}
                            </div>
                          )}
                          <div className="mt-1 inline-flex items-center gap-1 text-xs text-slate-700"><MapPin className="h-3 w-3 shrink-0 print:hidden" aria-hidden="true" />Room {matchedEntry.room}</div>
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
    </Card>
  );
}
