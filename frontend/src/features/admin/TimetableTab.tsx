import { useState } from 'react';
import { Edit3, Search, X } from 'lucide-react';
import type { TimetableApp } from '../../hooks/useTimetableApp';
import { ClassTimetableGrid } from '../../components/timetable/ClassTimetableGrid';
import { TeacherTimetableGrid } from '../../components/timetable/TeacherTimetableGrid';
import { FacultyWorkloadHeatmap } from '../../components/timetable/FacultyWorkloadHeatmap';

export function TimetableTab({ app }: { app: TimetableApp }) {
  const {
    activeSchool, currentSchedule, subjectMap, teacherMap, classMap, selectedClass, selectedTeacher,
    timetableViewMode, setTimetableViewMode, setSelectedClassId, setSelectedTeacherId, openManualOverride,
  } = app;

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'substitutions' | 'activity' | 'academic'>('all');

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

                {/* Instant Search & Multi-Filter Bar */}
                <div className="bg-white rounded-2xl border border-slate-200 p-3 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
                  {/* Left: Search input */}
                  <div className="relative flex-1 min-w-[240px] max-w-md">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search teacher, subject, or room (e.g. Aris, Math, 101)..."
                      className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Right: Filter chips */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Filter:</span>
                    {[
                      { id: 'all' as const, label: 'All Slots' },
                      { id: 'substitutions' as const, label: '⚡ Substitutions', badge: Object.keys(activeSchool.substitutions).length },
                      { id: 'activity' as const, label: '🎨 Activity Blocks' },
                      { id: 'academic' as const, label: '📚 Academic Only' },
                    ].map(f => {
                      const active = filterType === f.id;
                      return (
                        <button
                          key={f.id}
                          onClick={() => setFilterType(f.id)}
                          className={`px-3 py-1.5 rounded-xl font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
                            active
                              ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <span>{f.label}</span>
                          {(f.badge ?? 0) > 0 && (
                            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                              active ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {f.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}

                    {(searchQuery || filterType !== 'all') && (
                      <button
                        onClick={() => { setSearchQuery(''); setFilterType('all'); }}
                        className="px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                      >
                        Reset Filter
                      </button>
                    )}
                  </div>
                </div>

                {/* Faculty Workload Heatmap Matrix */}
                <FacultyWorkloadHeatmap
                  school={activeSchool}
                  entries={currentSchedule.entries}
                  subjectMap={subjectMap}
                  teacherMap={teacherMap}
                  onSelectTeacher={(teacherId) => {
                    setTimetableViewMode('teacher');
                    setSelectedTeacherId(teacherId);
                  }}
                />

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
                    searchQuery={searchQuery}
                    filterType={filterType}
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
                    searchQuery={searchQuery}
                    filterType={filterType}
                  />
                )}
              </div>
  );
}
