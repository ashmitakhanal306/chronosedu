import type { ClassSection, EntryMap, School, Subject, Teacher } from '../../domain/types';

interface Props {
  school: School;
  cls: ClassSection;
  entries: EntryMap;
  subjectMap: Record<string, Subject>;
  teacherMap: Record<string, Teacher>;
  isAdmin: boolean;
  onSlotClick: (day: string, period: number, classId: string) => void;
}

export function ClassTimetableGrid({ school, cls, entries, subjectMap, teacherMap, isAdmin, onSlotClick }: Props) {
  const maxPeriod = cls.tier === 'Primary' ? school.rules.primaryEndPeriod : school.rules.seniorEndPeriod;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 bg-slate-50/60">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-xl bg-slate-900 text-white font-bold text-sm">
            Class {cls.name}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
            cls.tier === 'Primary'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-sky-50 text-sky-700 border-sky-200'
          }`}>
            {cls.tier} Tier • Ends at {cls.tier === 'Primary' ? '12:00 PM (4 Periods)' : '02:00 PM (6 Periods)'}
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
              {school.workingDays.map(day => (
                <th key={day} className="py-3 px-4 font-semibold min-w-[160px]">
                  <div className="flex items-center justify-between">
                    <span>{day}</span>
                    {day === school.rules.activityDay && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-bold">
                        Activity Day
                      </span>
                    )}
                  </div>
                </th>
              ))}
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
                      Primary Tier Dismissed at 12:00 PM — Senior Classes Only ({slot.label})
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
                      {slot.type === 'zero' ? `🌅 ${school.rules.zeroPeriodLabel}` : slot.type === 'lunch' ? '🍱 School Lunch Break (12:00 - 12:30 PM)' : '☕ Short Recess Break (10:00 - 10:15 AM)'}
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

                  {school.workingDays.map(day => {
                    const key = `${day}-${periodNum}-${cls.id}`;
                    const entry = entries[key];
                    const sub = entry ? subjectMap[entry.subjectId] : null;
                    const teacher = entry ? teacherMap[entry.teacherId] : null;
                    const subTeacherId = school.substitutions[key];
                    const subTeacher = subTeacherId ? teacherMap[subTeacherId] : null;
                    const isAbsent = school.absences.some(a => a.day === day && a.teacherId === entry?.teacherId);
                    const isActivitySlot = day === school.rules.activityDay && school.rules.activityPeriods.includes(periodNum);

                    return (
                      <td
                        key={day}
                        onClick={() => isAdmin && onSlotClick(day, periodNum, cls.id)}
                        className={`p-2.5 border-r border-slate-100 align-top transition ${
                          isAdmin ? 'cursor-pointer hover:bg-indigo-50/40' : ''
                        } ${isActivitySlot ? 'bg-purple-50/30' : ''}`}
                      >
                        {entry && sub ? (
                          <div className={`p-2.5 rounded-xl border ${sub.color} relative space-y-1.5 shadow-2xs`}>
                            <div className="flex items-start justify-between gap-1">
                              <span className="font-bold text-xs leading-tight">{sub.name}</span>
                              {entry.isActivity && (
                                <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-purple-700 text-white shrink-0">
                                  Activity
                                </span>
                              )}
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
                        ) : (
                          <div className="h-16 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-[11px]">
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
