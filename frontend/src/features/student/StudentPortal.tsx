import { useState } from 'react';
import { 
  GraduationCap, 
  Clock, 
  MapPin, 
  Calendar, 
  Printer, 
  CheckCircle, 
  BookOpen
} from 'lucide-react';
import type { TimetableApp } from '../../hooks/useTimetableApp';
import { ClassTimetableGrid } from '../../components/timetable/ClassTimetableGrid';
import { Badge, Button, Card, Feedback, Input, Select } from '../../components/ui/primitives';

export function StudentPortal({ app }: { app: TimetableApp }) {
  const [classSearch, setClassSearch] = useState('');
  const { 
    activeSchool, 
    currentSchedule, 
    subjectMap, 
    teacherMap, 
    selectedClass, 
    setSelectedClassId,
    currentUser,
    exportPrintPdf,
    sortedClasses,
  } = app;

  const isStudentRole = currentUser.role === 'student';
  const isPrimary = selectedClass?.tier === 'Primary';
  const dismissalTime = isPrimary ? '12:00 PM (After Period 4)' : '02:00 PM (After Period 6)';
  const visibleClasses = (sortedClasses || activeSchool.classes).filter(cls =>
    `${cls.name} ${cls.grade || ''} ${cls.tier}`.toLowerCase().includes(classSearch.trim().toLowerCase())
  );

  // Calculate subject counts for this class
  const classEntries = Object.values(currentSchedule.entries).filter(e => e.classId === selectedClass?.id);
  const subjectFrequencyMap: Record<string, number> = {};
  classEntries.forEach(e => {
    subjectFrequencyMap[e.subjectId] = (subjectFrequencyMap[e.subjectId] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      {/* Student Portal Header Card */}
      <Card className="rounded-3xl p-4 sm:p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="text-emerald-800 bg-emerald-50 border-emerald-200 uppercase tracking-wider">
                  Student & Parent Portal
                </Badge>
                {isStudentRole && (
                  <Badge className="gap-1 text-emerald-800 bg-emerald-50 border-emerald-200">
                    <CheckCircle className="w-3 h-3" />
                    Enrolled Student
                  </Badge>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                {selectedClass ? `Class ${selectedClass.name}` : 'Choose your child’s class'}{' '}
                <span className="text-base font-semibold text-slate-500">
                  ({selectedClass?.grade} • {selectedClass?.tier} Tier)
                </span>
              </h1>

              <p className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-600" />
                  <span>Home Classroom: <strong>{selectedClass?.room}</strong></span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-600" />
                  <span>Daily Dismissal: <strong>{dismissalTime}</strong></span>
                </span>
              </p>
            </div>
          </div>

          {/* Actions & Print */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Button variant="primary" onClick={exportPrintPdf} className="bg-slate-900 hover:bg-slate-800">
              <Printer className="w-3.5 h-3.5 text-slate-300" />
              <span>Print Timetable Card</span>
            </Button>
          </div>
        </div>

        {/* Class Switcher Chips (Permitted if admin previewing or viewing other classes) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <label htmlFor="parent-class-select" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Calendar className="w-4 h-4 text-slate-600" />
            <span>Select your child’s class</span>
          </label>
          <div className="w-full sm:max-w-sm space-y-2">
          <Input aria-label="Search classes" placeholder="Search by class or grade" value={classSearch} onChange={e => setClassSearch(e.target.value)} />
          <Select id="parent-class-select" aria-label="Select your child’s class" value={selectedClass?.id || ''} onChange={e => setSelectedClassId(e.target.value)}>
            {!selectedClass && <option value="">Choose a class</option>}
            {Object.entries(visibleClasses.reduce<Record<string, typeof activeSchool.classes>>((groups, cls) => {
              const grade = cls.grade || 'Other classes';
              (groups[grade] ||= []).push(cls);
              return groups;
            }, {})).map(([grade, classes]) => (
              <optgroup key={grade} label={grade}>
                {classes.map(cls => <option key={cls.id} value={cls.id}>{cls.name} · {cls.tier} tier</option>)}
              </optgroup>
            ))}
          </Select>
          {visibleClasses.length === 0 && <p role="status" className="text-sm text-slate-600">No classes match that search.</p>}
          </div>
        </div>

        {/* Weekly Curriculum Subject Summary for Class */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-semibold text-slate-700 mb-3">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              <span>Curriculum Breakdown ({classEntries.length} total periods scheduled / week):</span>
            </span>
            <span className="text-xs text-slate-600">
              {activeSchool.rules.activityDay} Activity Block: Periods {activeSchool.rules.activityPeriods.join(', ')}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.keys(subjectFrequencyMap).length === 0 && <Feedback variant="empty" message="No curriculum periods are scheduled for this class yet." className="w-full" />}
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
                  <span className="px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-xs font-bold text-slate-600">
                    {count}x / wk
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Class Timetable Grid Component */}
      {selectedClass ? <ClassTimetableGrid
        school={activeSchool}
        cls={selectedClass}
        entries={currentSchedule.entries}
        subjectMap={subjectMap}
        teacherMap={teacherMap}
        isAdmin={false}
        onSlotClick={() => {}}
      /> : <Card className="p-4">
        <Feedback variant="empty" message="Choose a class above to view its weekly schedule." />
      </Card>}
    </div>
  );
}
