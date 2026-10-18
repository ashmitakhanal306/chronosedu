import { 
  GraduationCap, 
  Clock, 
  MapPin, 
  Calendar, 
  Printer, 
  CheckCircle, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import type { TimetableApp } from '../../hooks/useTimetableApp';
import { ClassTimetableGrid } from '../../components/timetable/ClassTimetableGrid';

export function StudentPortal({ app }: { app: TimetableApp }) {
  const { 
    activeSchool, 
    currentSchedule, 
    subjectMap, 
    teacherMap, 
    selectedClass, 
    setSelectedClassId,
    currentUser,
    exportPrintPdf,
  } = app;

  const isStudentRole = currentUser.role === 'student';
  const isPrimary = selectedClass?.tier === 'Primary';
  const dismissalTime = isPrimary ? '12:00 PM (After Period 4)' : '02:00 PM (After Period 6)';

  // Calculate subject counts for this class
  const classEntries = Object.values(currentSchedule.entries).filter(e => e.classId === selectedClass?.id);
  const subjectFrequencyMap: Record<string, number> = {};
  classEntries.forEach(e => {
    subjectFrequencyMap[e.subjectId] = (subjectFrequencyMap[e.subjectId] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      {/* Student Portal Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                  Student & Parent Portal
                </span>
                {isStudentRole && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle className="w-3 h-3" />
                    Enrolled Student
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                Class {selectedClass?.name}{' '}
                <span className="text-base font-semibold text-slate-500">
                  ({selectedClass?.grade} • {selectedClass?.tier} Tier)
                </span>
              </h1>

              <p className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Home Classroom: <strong>{selectedClass?.room}</strong></span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Daily Dismissal: <strong>{dismissalTime}</strong></span>
                </span>
              </p>
            </div>
          </div>

          {/* Actions & Print */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={exportPrintPdf}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-2xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-300" />
              <span>Print Timetable Card</span>
            </button>
          </div>
        </div>

        {/* Class Switcher Chips (Permitted if admin previewing or viewing other classes) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Select Class Roster:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {activeSchool.classes.map(cls => {
              const isSelected = selectedClass?.id === cls.id;
              return (
                <button
                  key={cls.id}
                  type="button"
                  onClick={() => setSelectedClassId(cls.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cls.name} <span className="text-[10px] opacity-80">({cls.tier})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Weekly Curriculum Subject Summary for Class */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              <span>Curriculum Breakdown ({classEntries.length} total periods scheduled / week):</span>
            </span>
            <span className="text-[11px] text-slate-400">
              {activeSchool.rules.activityDay} Activity Block: Periods {activeSchool.rules.activityPeriods.join(', ')}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.entries(subjectFrequencyMap).map(([sid, count]) => {
              const sub = subjectMap[sid];
              const isAct = sub?.type === 'activity';
              return (
                <div
                  key={sid}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold ${
                    isAct
                      ? 'bg-purple-50 text-purple-800 border-purple-200'
                      : 'bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isAct ? 'bg-purple-500' : 'bg-indigo-500'}`} />
                  <span>{sub?.name || sid}</span>
                  <span className="px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-bold text-slate-600">
                    {count}x / wk
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Class Timetable Grid Component */}
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
