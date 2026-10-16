import type { TimetableApp } from '../../hooks/useTimetableApp';
import { TeacherTimetableGrid } from '../../components/timetable/TeacherTimetableGrid';

export function TeacherPortal({ app }: { app: TimetableApp }) {
  const {
    activeSchool, currentSchedule, subjectMap, classMap, teacherMap, selectedTeacher, setSelectedTeacherId, toggleTeacherUnavailable,
  } = app;
  return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
                  {selectedTeacher?.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Teacher Portal</span>
                    <select
                      value={selectedTeacher?.id}
                      onChange={(e) => setSelectedTeacherId(e.target.value)}
                      className="px-3 py-1 rounded-lg border border-slate-300 text-sm font-bold bg-white"
                    >
                      {activeSchool.teachers.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Personal read-only weekly schedule across all classes • Hard Capped at ≤ {activeSchool.rules.maxTeacherPeriodsPerDay} periods/day
                  </p>
                </div>
              </div>

              {/* Teacher Self-Service Unavailability Toggle */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-slate-600">Mark Day Unavailable:</span>
                {activeSchool.workingDays.map(day => {
                  const isUnavail = (selectedTeacher?.unavailableDays || []).includes(day);
                  return (
                    <button
                      key={day}
                      onClick={() => toggleTeacherUnavailable(selectedTeacher.id, day)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                        isUnavail
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {day.slice(0, 3)} {isUnavail ? '(Off)' : ''}
                    </button>
                  );
                })}
              </div>
            </div>

            <TeacherTimetableGrid
              school={activeSchool}
              teacher={selectedTeacher}
              entries={currentSchedule.entries}
              subjectMap={subjectMap}
              classMap={classMap}
              teacherMap={teacherMap}
            />
          </div>
  );
}
