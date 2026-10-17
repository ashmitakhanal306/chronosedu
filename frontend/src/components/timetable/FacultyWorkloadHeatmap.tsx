import { useState } from 'react';
import { BarChart3, ChevronDown, ChevronUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { EntryMap, School, Subject, Teacher } from '../../domain/types';

interface Props {
  school: School;
  entries: EntryMap;
  subjectMap: Record<string, Subject>;
  teacherMap: Record<string, Teacher>;
  onSelectTeacher: (teacherId: string) => void;
}

export function FacultyWorkloadHeatmap({ school, entries, subjectMap, onSelectTeacher }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const maxCap = school.rules.maxTeacherPeriodsPerDay;

  // Compute workload matrix for every teacher
  const teacherRows = school.teachers.map(t => {
    const dailyCounts: Record<string, number> = {};
    let totalWeekly = 0;

    school.workingDays.forEach(day => {
      let dayCount = 0;
      for (let p = 1; p <= school.rules.seniorEndPeriod; p++) {
        school.classes.forEach(c => {
          const subKey = `${day}-${p}-${c.id}`;
          const entry = entries[subKey];
          if (!entry) return;
          const effectiveTeacherId = school.substitutions[subKey] || entry.teacherId;
          if (effectiveTeacherId === t.id) {
            dayCount++;
          }
        });
      }
      dailyCounts[day] = dayCount;
      totalWeekly += dayCount;
    });

    const isOverCap = Object.values(dailyCounts).some(c => c > maxCap);
    const isAtCap = Object.values(dailyCounts).some(c => c === maxCap);

    return {
      teacher: t,
      dailyCounts,
      totalWeekly,
      isOverCap,
      isAtCap,
    };
  });

  const totalSlotsAllTeachers = teacherRows.reduce((acc, r) => acc + r.totalWeekly, 0);
  const averageLoadPerDay = (totalSlotsAllTeachers / (school.teachers.length * school.workingDays.length)).toFixed(1);

  const getBadgeStyle = (count: number) => {
    if (count === 0) return 'bg-slate-100 text-slate-500 border-slate-200';
    if (count <= 3) return 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold';
    if (count === 4) return 'bg-sky-50 text-sky-700 border-sky-200 font-bold';
    if (count === maxCap) return 'bg-amber-50 text-amber-800 border-amber-300 font-bold';
    return 'bg-rose-100 text-rose-800 border-rose-300 font-bold animate-pulse';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      {/* Header bar with toggle */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-4 py-3 bg-slate-50/70 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 cursor-pointer hover:bg-slate-100/60 transition"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <BarChart3 className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-900 flex items-center gap-2">
              <span>Faculty Workload Visual Heatmap</span>
              <span className="px-1.5 py-0.2 rounded-md text-[10px] bg-indigo-100 text-indigo-700 font-semibold">
                {school.teachers.length} Faculty
              </span>
            </h4>
            <p className="text-[10px] text-slate-500">
              Fatigue cap: <strong>≤ {maxCap} periods/day</strong> • Average load: <strong>{averageLoadPerDay} periods/day</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          {/* Legend */}
          <div className="hidden sm:flex items-center gap-2 text-[10px]">
            <span className="flex items-center gap-1 text-slate-600">
              <span className="w-2 h-2 rounded-xs bg-emerald-400" />
              <span>1–3 Light</span>
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <span className="w-2 h-2 rounded-xs bg-sky-400" />
              <span>4 Optimal</span>
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <span className="w-2 h-2 rounded-xs bg-amber-400" />
              <span>5 Cap</span>
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700">
            <span>{isExpanded ? 'Collapse Matrix' : 'Expand Matrix'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </div>
        </div>
      </div>

      {/* Expanded Table */}
      {isExpanded && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 text-[10px] uppercase tracking-wider text-slate-500">
                <th className="py-2 px-4 font-semibold w-48">Instructor</th>
                {school.workingDays.map(d => (
                  <th key={d} className="py-2 px-2.5 font-semibold text-center w-20">
                    {d.slice(0, 3)}
                  </th>
                ))}
                <th className="py-2 px-2.5 font-semibold text-center w-24">Weekly Total</th>
                <th className="py-2 px-4 font-semibold text-right">Capacity Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {teacherRows.map(r => {
                const qualifiedNames = r.teacher.subjects.map(sid => subjectMap[sid]?.name).filter(Boolean).join(', ');
                return (
                  <tr
                    key={r.teacher.id}
                    onClick={() => onSelectTeacher(r.teacher.id)}
                    className="hover:bg-indigo-50/40 transition cursor-pointer group"
                    title={`Click to view ${r.teacher.name}'s schedule`}
                  >
                    <td className="py-2 px-4">
                      <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition">
                        {r.teacher.name}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[180px]">
                        {qualifiedNames || 'General Faculty'}
                      </div>
                    </td>

                    {school.workingDays.map(d => {
                      const count = r.dailyCounts[d] || 0;
                      return (
                        <td key={d} className="py-2 px-2.5 text-center">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-md border text-[11px] min-w-[30px] ${getBadgeStyle(count)}`}
                          >
                            {count}
                          </span>
                        </td>
                      );
                    })}

                    <td className="py-2 px-2.5 text-center">
                      <span className="font-bold text-slate-800 text-xs">
                        {r.totalWeekly}
                      </span>
                      <span className="text-[9px] text-slate-400 block -mt-0.5">periods</span>
                    </td>

                    <td className="py-2 px-4 text-right">
                      {r.isOverCap ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-50 border border-rose-200 text-rose-700 font-bold text-[10px]">
                          <AlertCircle className="w-3 h-3" />
                          <span>Exceeds Cap</span>
                        </span>
                      ) : r.isAtCap ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-700 font-bold text-[10px]">
                          <span>At Cap (5/5)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 font-medium text-[10px]">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Optimal (Sub Ready)</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
