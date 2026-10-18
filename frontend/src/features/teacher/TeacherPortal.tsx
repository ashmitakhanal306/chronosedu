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
  } = app;

  const [isAbsenceModalOpen, setIsAbsenceModalOpen] = useState(false);
  const [absenceDay, setAbsenceDay] = useState(activeSchool.workingDays[0] || 'Monday');
  const [absenceReason, setAbsenceReason] = useState('Medical Leave');
  const [isSubmittingAbsence, setIsSubmittingAbsence] = useState(false);

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
    try {
      await addAbsence(selectedTeacher.id, absenceDay, absenceReason);
      setIsAbsenceModalOpen(false);
    } finally {
      setIsSubmittingAbsence(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Teacher Profile & Controls Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
              {selectedTeacher?.name ? selectedTeacher.name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Coach|Maestro)\s*/i, '').charAt(0) : 'T'}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80">
                  Faculty Portal
                </span>
                {isSelf && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle className="w-3 h-3" />
                    Verified Session
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 mt-1">
                {isSelf ? (
                  <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    {selectedTeacher?.name}
                  </h1>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-semibold">Teacher:</span>
                    <select
                      value={selectedTeacher?.id}
                      onChange={(e) => setSelectedTeacherId(e.target.value)}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 text-base font-bold bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
                    >
                      {activeSchool.teachers.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <p className="text-xs text-slate-500 mt-1">
                {activeSchool.name} • Capped at max {selectedTeacher?.maxPerDay || 5} teaching periods/day
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsAbsenceModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold transition shadow-2xs cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span>Report Absence</span>
            </button>

            <button
              type="button"
              onClick={exportPrintPdf}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition shadow-2xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Schedule</span>
            </button>
          </div>
        </div>

        {/* Workload Stats & Subject Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Weekly Workload</span>
              <BookOpen className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-lg font-extrabold text-slate-900 mt-1">
              {totalWeeklyPeriods} <span className="text-xs font-normal text-slate-500">periods / week</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Avg {(totalWeeklyPeriods / (activeSchool.workingDays.length || 1)).toFixed(1)} periods/day
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Peak Daily Load</span>
              <Clock className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-lg font-extrabold text-slate-900 mt-1">
              {maxPeriodsInAnyDay} / {selectedTeacher?.maxPerDay || 5}
              <span className="text-xs font-normal text-slate-500"> max periods</span>
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              {maxPeriodsInAnyDay <= (selectedTeacher?.maxPerDay || 5) ? '✓ Fully within fatigue limits' : '⚠ Cap exceeded'}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 sm:col-span-2">
            <div className="text-xs text-slate-500 font-medium mb-1.5 flex items-center justify-between">
              <span>Teaching Qualifications</span>
              <span className="text-[10px] text-slate-400">{selectedTeacher?.subjects.length} subjects qualified</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selectedTeacher?.subjects.map(sid => {
                const sub = subjectMap[sid];
                return (
                  <span
                    key={sid}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-white border border-slate-200 text-slate-700 shadow-2xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span>{sub?.name || sid}</span>
                    <span className="text-[10px] text-slate-400 uppercase">({sub?.code || 'SUB'})</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Teacher Self-Service Unavailability Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>Standing Weekly Unavailable Days:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {activeSchool.workingDays.map(day => {
              const isUnavail = (selectedTeacher?.unavailableDays || []).includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleTeacherUnavailable(selectedTeacher.id, day)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
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
      </div>

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
            <div className="bg-amber-500 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-5 h-5" />
                <h3 className="font-bold text-base">Report Faculty Absence</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAbsenceModalOpen(false)}
                className="text-white/80 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReportAbsence} className="p-5 space-y-4">
              <p className="text-xs text-slate-500">
                Reporting an absence will trigger the automated Substitute Ranking Engine to propose qualified replacements for your scheduled classes.
              </p>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Absent Teacher:
                </label>
                <input
                  type="text"
                  disabled
                  value={selectedTeacher?.name}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-100 text-xs font-semibold text-slate-700"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Select Day of Absence:
                </label>
                <select
                  value={absenceDay}
                  onChange={(e) => setAbsenceDay(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {activeSchool.workingDays.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Reason for Leave:
                </label>
                <input
                  type="text"
                  required
                  value={absenceReason}
                  onChange={(e) => setAbsenceReason(e.target.value)}
                  placeholder="e.g. Medical Leave, Professional Development, Personal Emergency"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAbsenceModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingAbsence}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition disabled:opacity-60"
                >
                  {isSubmittingAbsence ? 'Submitting...' : 'Confirm Absence'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
