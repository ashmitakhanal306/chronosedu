import { Edit3 } from 'lucide-react';
import type { TimetableApp } from '../../hooks/useTimetableApp';
import { ClassTimetableGrid } from '../../components/timetable/ClassTimetableGrid';
import { TeacherTimetableGrid } from '../../components/timetable/TeacherTimetableGrid';

export function TimetableTab({ app }: { app: TimetableApp }) {
  const {
    activeSchool, currentSchedule, subjectMap, teacherMap, classMap, selectedClass, selectedTeacher,
    timetableViewMode, setTimetableViewMode, setSelectedClassId, setSelectedTeacherId, openManualOverride,
  } = app;
  return (
              <div className="space-y-4">
                {/* Filter Bar: View by Class or Teacher */}
                <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex rounded-xl bg-slate-100 p-1">
                      <button
                        onClick={() => setTimetableViewMode('class')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                          timetableViewMode === 'class' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                        }`}
                      >
                        By Class Section
                      </button>
                      <button
                        onClick={() => setTimetableViewMode('teacher')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                          timetableViewMode === 'teacher' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                        }`}
                      >
                        By Teacher Schedule
                      </button>
                    </div>

                    {timetableViewMode === 'class' ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-500">Select Class:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeSchool.classes.map(cls => (
                            <button
                              key={cls.id}
                              onClick={() => setSelectedClassId(cls.id)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                                selectedClass?.id === cls.id
                                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                              }`}
                            >
                              {cls.name} <span className="opacity-75 font-normal">({cls.tier})</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-500">Select Teacher:</span>
                        <select
                          value={selectedTeacher?.id}
                          onChange={(e) => setSelectedTeacherId(e.target.value)}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 bg-white"
                        >
                          {activeSchool.teachers.map(t => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Click any class slot to <strong>Manually Override</strong> with real-time conflict checking</span>
                  </div>
                </div>

                {/* TIMETABLE GRID */}
                {timetableViewMode === 'class' && selectedClass && (
                  <ClassTimetableGrid
                    school={activeSchool}
                    cls={selectedClass}
                    entries={currentSchedule.entries}
                    subjectMap={subjectMap}
                    teacherMap={teacherMap}
                    isAdmin={true}
                    onSlotClick={openManualOverride}
                  />
                )}

                {timetableViewMode === 'teacher' && selectedTeacher && (
                  <TeacherTimetableGrid
                    school={activeSchool}
                    teacher={selectedTeacher}
                    entries={currentSchedule.entries}
                    subjectMap={subjectMap}
                    classMap={classMap}
                    teacherMap={teacherMap}
                  />
                )}
              </div>
  );
}
