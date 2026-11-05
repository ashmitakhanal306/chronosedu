import { useState } from 'react';
import { BarChart3, ChevronDown, ChevronUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { EntryMap, School, Subject, Teacher } from '../../domain/types';
import { Badge, Button, Card } from '../ui/primitives';

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
    if (count === 0) return 'bg-neutral-100 text-neutral-500 border-neutral-200';
    if (count <= 3) return 'bg-positive-50 text-positive-700 border-positive-200 font-bold';
    if (count === 4) return 'bg-info-50 text-info-700 border-info-200 font-bold';
    if (count === maxCap) return 'bg-warning-50 text-warning-800 border-warning-300 font-bold';
    return 'bg-danger-100 text-danger-800 border-danger-300 font-bold animate-pulse';
  };

  return (
    <Card className="bg-surface rounded-card border border-neutral-200 shadow-2xs overflow-hidden">
      {/* Header bar with toggle */}
      <Button
        variant="ghost"
        type="button"
        aria-expanded={isExpanded}
        aria-controls="faculty-workload-rows"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left px-4 py-3 bg-neutral-50/70 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 cursor-pointer hover:bg-neutral-100/60 transition"
      >
        <span className="flex items-center gap-2.5">
          <Badge className="w-7 h-7 rounded-control bg-brand-600 text-white flex items-center justify-center shadow-xs">
            <BarChart3 className="w-3.5 h-3.5" />
          </Badge>
          <span>
            <span role="heading" aria-level={4} className="font-bold text-xs text-neutral-900 flex items-center gap-2">
              <span>Faculty Workload Visual Heatmap</span>
              <Badge className="px-1.5 py-0.2 rounded-tight text-xs bg-brand-100 text-brand-700 font-semibold">
                {school.teachers.length} Faculty
              </Badge>
            </span>
            <span className="block text-xs text-neutral-500">
              Fatigue cap: <strong>≤ {maxCap} periods/day</strong> • Average load: <strong>{averageLoadPerDay} periods/day</strong>
            </span>
          </span>
        </span>

        <span className="flex items-center gap-3 text-xs">
          {/* Legend */}
          <span className="hidden sm:flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-neutral-600">
              <span className="w-2 h-2 rounded-xs bg-positive-400" />
              <span>1–3 Light</span>
            </span>
            <span className="flex items-center gap-1 text-neutral-600">
              <span className="w-2 h-2 rounded-xs bg-info-400" />
              <span>4 Optimal</span>
            </span>
            <span className="flex items-center gap-1 text-neutral-600">
              <span className="w-2 h-2 rounded-xs bg-warning-400" />
              <span>5 Cap</span>
            </span>
          </span>

          <span className="flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700">
            <span>{isExpanded ? 'Collapse Matrix' : 'Expand Matrix'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </span>
        </span>
      </Button>

      {/* Expanded Table */}
      {isExpanded && (
        <div id="faculty-workload-rows" className="w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain">
          <table className="w-full min-w-[640px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/50 text-xs uppercase tracking-wider text-neutral-500">
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
            <tbody className="divide-y divide-neutral-100 text-xs">
              {teacherRows.map(r => {
                const qualifiedNames = r.teacher.subjects.map(sid => subjectMap[sid]?.name).filter(Boolean).join(', ');
                return (
                  <tr
                    key={r.teacher.id}
                    onClick={() => onSelectTeacher(r.teacher.id)}
                    className="hover:bg-brand-50/40 transition cursor-pointer group"
                    title={`Click to view ${r.teacher.name}'s schedule`}
                  >
                    <td className="py-2 px-4">
                      <Button
                        variant="ghost"
                        type="button"
                        aria-label={`View ${r.teacher.name}'s schedule`}
                        onClick={event => {
                          event.stopPropagation();
                          onSelectTeacher(r.teacher.id);
                        }}
                        className="w-full min-h-0 justify-start rounded-tight px-0 py-0 text-left font-bold text-neutral-900 group-hover:text-brand-600 transition focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-1"
                      >
                        {r.teacher.name}
                      </Button>
                      <div className="text-xs text-neutral-600 truncate max-w-[180px]">
                        {qualifiedNames || 'General Faculty'}
                      </div>
                    </td>

                    {school.workingDays.map(d => {
                      const count = r.dailyCounts[d] || 0;
                      return (
                        <td key={d} className="py-2 px-2.5 text-center">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-tight border text-xs min-w-[30px] ${getBadgeStyle(count)}`}
                          >
                            {count}
                          </span>
                        </td>
                      );
                    })}

                    <td className="py-2 px-2.5 text-center">
                      <span className="font-bold text-neutral-800 text-xs">
                        {r.totalWeekly}
                      </span>
                      <span className="text-xs text-neutral-600 block -mt-0.5">periods</span>
                    </td>

                    <td className="py-2 px-4 text-right">
                      {r.isOverCap ? (
                        <Badge className="inline-flex items-center gap-1 px-2 py-0.5 rounded-tight bg-danger-50 border border-danger-200 text-danger-700 font-bold text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>Exceeds Cap</span>
                        </Badge>
                      ) : r.isAtCap ? (
                        <Badge className="inline-flex items-center gap-1 px-2 py-0.5 rounded-tight bg-warning-50 border border-warning-200 text-warning-700 font-bold text-xs">
                          <span>At Cap (5/5)</span>
                        </Badge>
                      ) : (
                        <Badge className="inline-flex items-center gap-1 px-2 py-0.5 rounded-tight bg-positive-50 border border-positive-200 text-positive-700 font-medium text-xs">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Optimal (Sub Ready)</span>
                        </Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
