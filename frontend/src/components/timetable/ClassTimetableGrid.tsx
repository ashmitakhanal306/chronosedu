import type { ClassSection, EntryMap, School, Subject, Teacher } from '../../domain/types';
import { computeBellSchedule } from '../../engine/bellSchedule';
import { DEFAULT_TIMING_CONFIG } from '../../domain/types';
import { FlaskConical, Pin } from 'lucide-react';

interface Props {
  school: School;
  cls: ClassSection;
  entries: EntryMap;
  subjectMap: Record<string, Subject>;
  teacherMap: Record<string, Teacher>;
  isAdmin: boolean;
  onSlotClick: (day: string, period: number, classId: string) => void;
  searchQuery?: string;
  filterType?: 'all' | 'substitutions' | 'activity' | 'academic';
}

export function ClassTimetableGrid({
  school,
  cls,
  entries,
  subjectMap,
  teacherMap,
  isAdmin,
  onSlotClick,
  searchQuery = '',
  filterType = 'all',
}: Props) {
  const maxPeriod = cls.tier === 'Primary' ? school.rules.primaryEndPeriod : school.rules.seniorEndPeriod;
  const timing = school.timingConfig || DEFAULT_TIMING_CONFIG;
  const bellSchedule = computeBellSchedule(timing, school.rules);
  const dismissalTime = cls.tier === 'Primary' ? bellSchedule.primaryDismissalTime : bellSchedule.seniorDismissalTime;

  return (
    <div className="printable-timetable bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Print-Only Header */}
      <div className="hidden print:flex items-center justify-between p-4 border-b border-slate-300 bg-white">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{school.name}</h1>
          <p className="text-xs text-slate-600 font-medium">{school.term} • Official Timetable</p>
        </div>
        <div className="text-right text-xs text-slate-700">
          <div className="text-base font-bold text-slate-900">Class {cls.name} ({cls.grade})</div>
          <div>{cls.tier} Tier • Room {cls.room} • Dismissal: {dismissalTime}</div>
        </div>
      </div>

      <div className="no-print px-5 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 bg-slate-50/60">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-xl bg-slate-900 text-white font-bold text-sm">
            Class {cls.name}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
            cls.tier === 'Primary'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-sky-50 text-sky-700 border-sky-200'
          }`}>
            {cls.tier} Tier • {maxPeriod} periods/day • Out {dismissalTime}
          </span>
          <span className="text-xs text-slate-500">Default Room: <strong>{cls.room}</strong></span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-purple-500" />
            <span>Weekly Activity Block ({school.rules.activityDay})</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-amber-500" />
            <span>Substitute Assigned</span>
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
              <th className="py-3 px-4 w-36 font-semibold">Period / Time</th>
              {school.workingDays.map(day => {
                const isSat = day === 'Saturday';
                const isActivityDay = day === school.rules.activityDay;
                return (
                  <th key={day} className={`py-3 px-4 font-semibold min-w-[160px] ${
                    isSat ? 'bg-amber-50/60 border-l-2 border-amber-300' : ''
                  }`}>
                    <div className="flex items-center justify-between gap-1">
                      <div>
                        <div className={isSat ? 'text-amber-800' : ''}>{day}</div>
                        {isSat && (
                          <div className="text-[9px] font-normal normal-case tracking-normal text-amber-600 mt-0.5">Saturday school day</div>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-0.5">
                        {isActivityDay && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-bold">
                            Activity
                          </span>
                        )}
                        {isSat && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-200 text-amber-800 font-bold normal-case tracking-normal">
                            SAT
                          </span>
                        )}
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs">
            {school.periodSlots.map(slot => {
              // If Primary class and slot is seniorOnly, show greyed-out dismissal row
              if (cls.tier === 'Primary' && slot.seniorOnly) {
                return (
                  <tr key={slot.label} className="bg-slate-100/70 text-slate-400">
                    <td className="py-2.5 px-4 font-medium">
                      <div>{slot.label}</div>
                      <div className="text-[10px]">{slot.time}</div>
                    </td>
                    <td colSpan={school.workingDays.length} className="py-2.5 px-4 text-center italic font-medium">
                      Primary Tier Dismissed — Senior Classes Only ({slot.label} • {slot.time})
                    </td>
                  </tr>
                );
              }

              // Fixed Break / Zero Period / Lunch Row
              if (slot.isBreak) {
                return (
                  <tr key={slot.label} className="bg-amber-50/40 text-slate-600">
                    <td className="py-2.5 px-4 font-semibold text-slate-700 border-r border-slate-200">
                      <div>{slot.label}</div>
                      <div className="text-[10px] text-slate-400">{slot.time}</div>
                    </td>
                    <td colSpan={school.workingDays.length} className="py-2.5 px-4 text-center font-semibold tracking-wide text-slate-600">
                      {slot.type === 'zero' ? `🌅 ${slot.label} (${slot.time})` : slot.type === 'lunch' ? `🍱 ${slot.label} (${slot.time})` : `☕ ${slot.label} (${slot.time})`}
                    </td>
                  </tr>
                );
              }

              const periodNum = slot.number as number;
              if (periodNum > maxPeriod) return null;

              return (
                <tr key={slot.label} className="hover:bg-slate-50/50 transition">
                  <td className="py-3 px-4 border-r border-slate-200 align-top bg-slate-50/30">
                    <div className="font-bold text-slate-800">{slot.label}</div>
                    <div className="text-[11px] text-slate-500">{slot.time}</div>
                    {slot.note && (
                      <div className="mt-1 inline-block text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
                        {slot.note}
                      </div>
                    )}
                  </td>

                  {school.workingDays.map((day, dayIdx) => {
                    const isSatCol = day === 'Saturday';
                    const key = `${day}-${periodNum}-${cls.id}`;
                    const entry = entries[key];
                    const sub = entry ? subjectMap[entry.subjectId] : null;
                    const teacher = entry ? teacherMap[entry.teacherId] : null;
                    const subTeacherId = school.substitutions[key];
                    const subTeacher = subTeacherId ? teacherMap[subTeacherId] : null;
                    const isAbsent = school.absences.some(a => a.day === day && a.teacherId === entry?.teacherId);
                    const isActivitySlot = day === school.rules.activityDay && school.rules.activityPeriods.includes(periodNum);
                    const isPinned = (school.pinnedLessons || []).some(
                      p => p.classId === cls.id && p.day === day && p.period === periodNum
                    ) || Boolean(entry?.isLocked);
                    const blockedSlot = (school.blockedSlots || []).find(
                      b => (b.scope === 'school' || (b.scope === 'grade' && b.scopeId === cls.tier) || (b.scope === 'class' && b.scopeId === cls.id)) &&
                           b.day === day && b.period === periodNum
                    );

                    // Search & Filter matching
                    const hasSearch = Boolean(searchQuery && searchQuery.trim().length > 0);
                    const q = searchQuery ? searchQuery.trim().toLowerCase() : '';

                    let matchesSearch = true;
                    if (hasSearch) {
                      const matchesSub = sub ? (sub.name.toLowerCase().includes(q) || sub.code.toLowerCase().includes(q)) : false;
                      const matchesTeacher = teacher ? teacher.name.toLowerCase().includes(q) : false;
                      const matchesSubTeacher = subTeacher ? subTeacher.name.toLowerCase().includes(q) : false;
                      const matchesRoom = entry ? entry.room.toLowerCase().includes(q) : false;
                      const matchesClass = cls.name.toLowerCase().includes(q);
                      matchesSearch = Boolean(matchesSub || matchesTeacher || matchesSubTeacher || matchesRoom || matchesClass);
                    }

                    let matchesFilter = true;
                    if (filterType === 'substitutions') {
                      matchesFilter = Boolean(subTeacherId);
                    } else if (filterType === 'activity') {
                      matchesFilter = Boolean(entry?.isActivity || sub?.type === 'activity' || isActivitySlot);
                    } else if (filterType === 'academic') {
                      matchesFilter = Boolean(sub?.type === 'academic');
                    }

                    const isFilterActive = hasSearch || filterType !== 'all';
                    const isHighlighted = isFilterActive && matchesSearch && matchesFilter && Boolean(entry && sub);
                    const isDimmed = isFilterActive && (!matchesSearch || !matchesFilter || !entry);

                    const recessP = school.timingConfig?.recessAfterPeriod ?? 2;
                    const lunchP = school.timingConfig?.lunchAfterPeriod ?? 4;
                    const isConnNext = periodNum !== recessP && periodNum !== lunchP &&
                      entries[`${day}-${periodNum + 1}-${cls.id}`]?.subjectId === entry?.subjectId &&
                      entries[`${day}-${periodNum + 1}-${cls.id}`]?.teacherId === entry?.teacherId;
                    const isConnPrev = (periodNum - 1) !== recessP && (periodNum - 1) !== lunchP &&
                      entries[`${day}-${periodNum - 1}-${cls.id}`]?.subjectId === entry?.subjectId &&
                      entries[`${day}-${periodNum - 1}-${cls.id}`]?.teacherId === entry?.teacherId;
                    const isDoubleBlock = Boolean(entry && sub && sub.requiresDoublePeriod && (isConnNext || isConnPrev));

                    return (
                      <td
                        key={day}
                        onClick={() => isAdmin && onSlotClick(day, periodNum, cls.id)}
                        className={`p-2.5 border-r align-top transition ${
                          isSatCol ? 'bg-amber-50/20 border-amber-200' : 'border-slate-100'
                        } ${
                          isAdmin ? 'cursor-pointer hover:bg-indigo-50/40' : ''
                        } ${isActivitySlot ? 'bg-purple-50/30' : ''}`}
                      >
                        {entry && sub ? (
                          <div
                            className={`p-2.5 rounded-xl border ${sub.color} relative space-y-1.5 shadow-2xs transition-all duration-200 ${
                              isHighlighted
                                ? 'ring-2 ring-indigo-600 shadow-md scale-[1.02] z-10 bg-white/95'
                                : ''
                            } ${isDimmed ? 'opacity-20 grayscale-[30%]' : ''}`}
                          >
                            <div className="flex items-start justify-between gap-1">
                              <span className="font-bold text-xs leading-tight">{sub.name}</span>
                              <div className="flex items-center gap-1 shrink-0">
                                {isPinned && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500 text-white flex items-center gap-0.5 shadow-2xs" title="Pinned Slot: Solver will never move this lesson">
                                    <Pin className="w-2.5 h-2.5" />
                                    <span>Pinned</span>
                                  </span>
                                )}
                                {isDoubleBlock && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-600 text-white flex items-center gap-0.5 shadow-2xs" title="90-Minute Consecutive Lab / Practical Block">
                                    <FlaskConical className="w-2.5 h-2.5" />
                                    <span>90m</span>
                                  </span>
                                )}
                                {entry.isActivity && (
                                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-purple-700 text-white shrink-0">
                                    Activity
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="text-[11px] space-y-0.5">
                              {subTeacher ? (
                                <div className="text-amber-900 bg-amber-200/80 px-1.5 py-0.5 rounded font-semibold">
                                  Sub: {subTeacher.name}
                                  <span className="block text-[10px] line-through opacity-75">{teacher?.name}</span>
                                </div>
                              ) : isAbsent ? (
                                <div className="text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded font-semibold">
                                  ⚠️ {teacher?.name} (Absent)
                                </div>
                              ) : (
                                <div className="font-medium opacity-90">{teacher?.name}</div>
                              )}
                              <div className="text-[10px] opacity-75 flex items-center justify-between">
                                <span>📍 {entry.room}</span>
                                {entry.isManualOverride && <span className="underline">Edited</span>}
                              </div>
                            </div>
                          </div>
                        ) : blockedSlot ? (
                          <div
                            className={`h-16 rounded-xl border border-dashed border-rose-300 bg-rose-50/70 p-2 flex flex-col items-center justify-center text-center transition-opacity ${
                              isFilterActive ? 'opacity-20' : ''
                            }`}
                          >
                            <span className="text-[10px] font-bold text-rose-800 flex items-center gap-1">
                              🚫 {blockedSlot.label}
                            </span>
                            <span className="text-[9px] font-semibold text-rose-500 capitalize">
                              {blockedSlot.scope} Blocked
                            </span>
                          </div>
                        ) : (
                          <div
                            className={`h-16 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-[11px] transition-opacity ${
                              isFilterActive ? 'opacity-20' : ''
                            }`}
                          >
                            Unassigned
                          </div>
                        )}
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
