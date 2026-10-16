import type { TimetableApp } from '../../hooks/useTimetableApp';
import { ClassTimetableGrid } from '../../components/timetable/ClassTimetableGrid';

export function StudentPortal({ app }: { app: TimetableApp }) {
  const { activeSchool, currentSchedule, subjectMap, teacherMap, selectedClass, setSelectedClassId } = app;
  return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Student & Parent Portal</span>
                <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                  Class {selectedClass?.name} ({selectedClass?.grade} — {selectedClass?.tier} Tier)
                </h2>
                <p className="text-xs text-slate-500">
                  Home Classroom: <strong>{selectedClass?.room}</strong> • School Day Ends at{' '}
                  <strong>{selectedClass?.tier === 'Primary' ? '12:00 PM (After Period 4)' : '02:00 PM (After Period 6)'}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500">Switch Class:</span>
                {activeSchool.classes.map(cls => (
                  <button
                    key={cls.id}
                    onClick={() => setSelectedClassId(cls.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                      selectedClass?.id === cls.id
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {cls.name} ({cls.tier})
                  </button>
                ))}
              </div>
            </div>

            <ClassTimetableGrid
              school={activeSchool}
              cls={selectedClass}
              entries={currentSchedule.entries}
              subjectMap={subjectMap}
              teacherMap={teacherMap}
              isAdmin={false}
              onSlotClick={() => {}}
            />
          </div>
  );
}
