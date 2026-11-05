import { useState } from 'react';
import { 
  UserCheck, 
  Calendar, 
  Clock, 
  BookOpen, 
  ShieldAlert, 
  Printer, 
  CheckCircle,
  FileText
} from 'lucide-react';
import type { TimetableApp } from '../../hooks/useTimetableApp';
import { TeacherTimetableGrid } from '../../components/timetable/TeacherTimetableGrid';
import { Badge, Button, Card, Feedback, Input, Select } from '../../components/ui/primitives';

export function TeacherPortal({ app }: { app: TimetableApp }) {
  const {
    activeSchool,
    currentSchedule,
    subjectMap,
    classMap,
    teacherMap,
    selectedTeacher,
    setSelectedTeacherId,
    toggleTeacherUnavailable,
    addAbsence,
    currentUser,
    exportPrintPdf,
    sortedTeachers,
  } = app;

  const [isAbsenceModalOpen, setIsAbsenceModalOpen] = useState(false);
  const [absenceDay, setAbsenceDay] = useState(activeSchool.workingDays[0] || 'Monday');
  const [absenceReason, setAbsenceReason] = useState('Medical Leave');
  const [isSubmittingAbsence, setIsSubmittingAbsence] = useState(false);
  const [absenceError, setAbsenceError] = useState('');

  // Compute workload statistics for selected teacher
  const allEntries = Object.values(currentSchedule.entries);
  const teacherEntries = allEntries.filter(e => e.teacherId === selectedTeacher?.id);
  const totalWeeklyPeriods = teacherEntries.length;

  // Periods per day count
  const periodsByDay: Record<string, number> = {};
  activeSchool.workingDays.forEach(d => { periodsByDay[d] = 0; });
  teacherEntries.forEach(e => {
    periodsByDay[e.day] = (periodsByDay[e.day] || 0) + 1;
  });

  const maxPeriodsInAnyDay = Math.max(0, ...Object.values(periodsByDay));
  const isSelf = currentUser.role === 'teacher';

  const handleReportAbsence = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeacher) return;
    setIsSubmittingAbsence(true);
    setAbsenceError('');
    try {
      await addAbsence(selectedTeacher.id, absenceDay, absenceReason);
      setIsAbsenceModalOpen(false);
    } catch {
      setAbsenceError('The absence could not be submitted. Please try again.');
    } finally {
      setIsSubmittingAbsence(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Teacher Profile & Controls Bar */}
      <Card className="rounded-3xl p-4 sm:p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
              {selectedTeacher?.name ? selectedTeacher.name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Coach|Maestro)\s*/i, '').charAt(0) : 'T'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="text-indigo-800 bg-indigo-50 border-indigo-200 uppercase tracking-wider">
                  Teacher View
                </Badge>
                {isSelf && (
                  <Badge className="gap-1 text-emerald-800 bg-emerald-50 border-emerald-200">
                    <CheckCircle className="w-3 h-3" />
                    Verified Session
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-1">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {selectedTeacher?.name}
                </h1>
                <div className="flex flex-wrap items-center gap-1.5 min-w-0 max-w-full text-xs text-slate-600 bg-slate-50 px-3 py-1 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="font-semibold text-slate-500">Teacher:</span>
                  <Select
                    value={selectedTeacher?.id}
                    onChange={(e) => setSelectedTeacherId(e.target.value)}
                    aria-label="Choose teacher schedule"
                    className="w-auto min-w-0 max-w-full min-h-10 bg-transparent font-bold text-indigo-700 cursor-pointer"
                  >
                    {(sortedTeachers || activeSchool.teachers).map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </Select>
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-1">
                {activeSchool.name} • Capped at max {selectedTeacher?.maxPerDay || 5} teaching periods/day
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Button variant="secondary" onClick={() => setIsAbsenceModalOpen(true)} className="border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span>Report Absence</span>
            </Button>

            <Button variant="secondary" onClick={exportPrintPdf}>
              <Printer className="w-3.5 h-3.5" />
              <span>Print Schedule</span>
            </Button>
          </div>
        </div>

        {/* Workload Stats & Subject Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          <Card className="p-3.5 bg-slate-50 shadow-none">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Weekly Workload</span>
              <BookOpen className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-lg font-extrabold text-slate-900 mt-1">
              {totalWeeklyPeriods} <span className="text-xs font-normal text-slate-500">periods / week</span>
            </div>
            <div className="text-xs text-slate-600 mt-0.5">
              Avg {(totalWeeklyPeriods / (activeSchool.workingDays.length || 1)).toFixed(1)} periods/day
            </div>
          </Card>

          <Card className="p-3.5 bg-slate-50 shadow-none">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Peak Daily Load</span>
              <Clock className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-lg font-extrabold text-slate-900 mt-1">
              {maxPeriodsInAnyDay} / {selectedTeacher?.maxPerDay || 5}
              <span className="text-xs font-normal text-slate-500"> max periods</span>
            </div>
            <div className="text-xs text-emerald-700 font-semibold mt-0.5">
              {maxPeriodsInAnyDay <= (selectedTeacher?.maxPerDay || 5) ? '✓ Within daily limit' : '⚠ Cap exceeded'}
            </div>
          </Card>

          <Card className="p-3.5 bg-slate-50 shadow-none sm:col-span-2">
            <div className="text-xs text-slate-500 font-medium mb-1.5 flex items-center justify-between">
              <span>Qualified Subjects</span>
              <span className="text-xs text-slate-600">{selectedTeacher?.subjects.length} subjects qualified</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selectedTeacher?.subjects.map(sid => {
                const sub = subjectMap[sid];
                return (
                  <Badge key={sid} className="gap-1 bg-white text-slate-700 border-slate-200">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span>{sub?.name || sid}</span>
                    <span className="text-xs text-slate-600 uppercase">({sub?.code || 'SUB'})</span>
                  </Badge>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Teacher Self-Service Unavailability Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>Unavailable Days:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {activeSchool.workingDays.map(day => {
              const isUnavail = (selectedTeacher?.unavailableDays || []).includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleTeacherUnavailable(selectedTeacher.id, day)}
                  className={`min-h-11 px-4 py-2 rounded-xl text-sm font-bold border transition-colors cursor-pointer ${
                    isUnavail
                      ? 'bg-rose-600 text-white border-rose-600 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                  title={isUnavail ? `Click to mark ${day} available` : `Click to mark ${day} unavailable`}
                >
                  {day} {isUnavail ? '(Off Duty)' : ''}
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Teacher Weekly Grid */}
      <TeacherTimetableGrid
        school={activeSchool}
        teacher={selectedTeacher}
        entries={currentSchedule.entries}
        subjectMap={subjectMap}
        classMap={classMap}
        teacherMap={teacherMap}
      />

      {/* Self-Service Absence Modal */}
      {isAbsenceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="bg-amber-700 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-5 h-5" />
                <h3 className="font-bold text-base">Report Absence</h3>
              </div>
              <Button variant="ghost"
                type="button"
                onClick={() => setIsAbsenceModalOpen(false)}
                aria-label="Close absence dialog"
                className="min-h-10 text-white hover:bg-white/10 hover:text-white"
              >
                ✕
              </Button>
            </div>

            <form onSubmit={handleReportAbsence} className="p-5 space-y-4">
              <p className="text-xs text-slate-500">
                Reporting an absence will trigger the automated Substitute Ranking Engine to propose qualified replacements for your scheduled classes.
              </p>

              <div>
                <label htmlFor="absence-teacher" className="text-xs font-bold text-slate-700 block mb-1">
                  Teacher:
                </label>
                <Input
                  id="absence-teacher"
                  type="text"
                  disabled
                  value={selectedTeacher?.name}
                  className="bg-slate-100 font-semibold text-slate-700"
                />
              </div>

              <div>
                <label htmlFor="absence-day" className="text-xs font-bold text-slate-700 block mb-1">
                  Select Day of Absence:
                </label>
                <Select
                  id="absence-day"
                  value={absenceDay}
                  onChange={(e) => setAbsenceDay(e.target.value)}
                  className="font-medium"
                >
                  {activeSchool.workingDays.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </Select>
              </div>

              <div>
                <label htmlFor="absence-reason" className="text-xs font-bold text-slate-700 block mb-1">
                  Reason for Leave:
                </label>
                <Input
                  id="absence-reason"
                  type="text"
                  required
                  value={absenceReason}
                  onChange={(e) => setAbsenceReason(e.target.value)}
                  placeholder="e.g. Medical Leave, Professional Development, Personal Emergency"
                  className="font-medium"
                />
              </div>

              {absenceError && <Feedback variant="error" message={absenceError} className="w-full" />}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button variant="secondary"
                  type="button"
                  onClick={() => setIsAbsenceModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary"
                  type="submit"
                  disabled={isSubmittingAbsence}
                  className="bg-amber-700 hover:bg-amber-800"
                >
                  {isSubmittingAbsence ? 'Submitting...' : 'Confirm Absence'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
