import React, { useState, useMemo, useEffect } from 'react';
import {
  Calendar, Users, BookOpen, Clock, ShieldCheck, AlertTriangle,
  Sparkles, CheckCircle2, RefreshCw, Download, Printer, UserCheck,
  Building2, GraduationCap, Layers, Plus, Trash2, Edit3, Lock,
  Unlock, ArrowRight, Info, Bell, Search, Filter, Check, X,Sliders
} from 'lucide-react';

// ==========================================
// INITIAL MULTI-TENANT DEMO DATA
// ==========================================
const INITIAL_SCHOOLS = [
  {
    id: 'school-1',
    name: 'Greenwood High School',
    subdomain: 'greenwood.chronos.edu',
    timezone: 'IST (UTC+5:30)',
    term: 'Academic Year 2026-27 (Term 1)',
    published: true,
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    rules: {
      primaryEndPeriod: 4, // Ends at 12:00 PM (Zero + P1..P4 + Break)
      seniorEndPeriod: 6,  // Ends at 2:00 PM (Zero + P1..P6 + Break/Lunch)
      maxTeacherPeriodsPerDay: 5, // Hard constraint
      activityDay: 'Wednesday',
      activityPeriods: [1, 2], // P1 & P2 locked for Activity subjects
      zeroPeriodLabel: 'Zero Period (Homeroom / Assembly)',
      lunchAfterPeriod: 4, // After P4 (12:00 PM) Primary goes home, Senior has Lunch
    },
    periodSlots: [
      { number: 0, label: 'Zero Period', time: '08:00 - 08:30', isBreak: true, type: 'zero' },
      { number: 1, label: 'Period 1', time: '08:30 - 09:15', isBreak: false },
      { number: 2, label: 'Period 2', time: '09:15 - 10:00', isBreak: false },
      { number: 'B1', label: 'Short Break', time: '10:00 - 10:15', isBreak: true, type: 'break' },
      { number: 3, label: 'Period 3', time: '10:15 - 11:00', isBreak: false },
      { number: 4, label: 'Period 4', time: '11:00 - 12:00', isBreak: false, note: 'Primary Dismissal (12:00)' },
      { number: 'L1', label: 'Lunch Break', time: '12:00 - 12:30', isBreak: true, type: 'lunch', seniorOnly: true },
      { number: 5, label: 'Period 5', time: '12:30 - 01:15', isBreak: false, seniorOnly: true },
      { number: 6, label: 'Period 6', time: '01:15 - 02:00', isBreak: false, seniorOnly: true, note: 'Senior Dismissal (02:00)' },
    ],
    classes: [
      { id: 'c-4a', name: '4A', grade: 'Grade 4', tier: 'Primary', room: 'Room 101' },
      { id: 'c-5b', name: '5B', grade: 'Grade 5', tier: 'Primary', room: 'Room 102' },
      { id: 'c-9a', name: '9A', grade: 'Grade 9', tier: 'Senior', room: 'Room 201' },
      { id: 'c-10a', name: '10A', grade: 'Grade 10', tier: 'Senior', room: 'Room 202' },
    ],
    // Primary has 5 days * 4 periods = 20 total slots/week (2 activity + 18 academic)
    // Senior has 5 days * 6 periods = 30 total slots/week (2 activity + 28 academic)
    subjects: [
      // Academic Subjects
      { id: 'sub-math', name: 'Mathematics', code: 'MATH', type: 'academic', color: 'bg-blue-50 text-blue-700 border-blue-200', freqPrimary: 5, freqSenior: 6 },
      { id: 'sub-eng', name: 'English Lit', code: 'ENG', type: 'academic', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', freqPrimary: 5, freqSenior: 5 },
      { id: 'sub-sci', name: 'General Science', code: 'SCI', type: 'academic', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', freqPrimary: 4, freqSenior: 6 },
      { id: 'sub-sst', name: 'Social Studies', code: 'SST', type: 'academic', color: 'bg-amber-50 text-amber-700 border-amber-200', freqPrimary: 4, freqSenior: 5 },
      { id: 'sub-cs', name: 'Computer Sci', code: 'CS', type: 'academic', color: 'bg-cyan-50 text-cyan-700 border-cyan-200', freqPrimary: 0, freqSenior: 3 },
      { id: 'sub-hin', name: 'Second Language', code: 'LANG', type: 'academic', color: 'bg-rose-50 text-rose-700 border-rose-200', freqPrimary: 0, freqSenior: 3 },
      // Activity Subjects (2 periods/week locked in Activity Block)
      { id: 'sub-mus', name: 'Dance & Music', code: 'MUS', type: 'activity', room: 'Music Studio', color: 'bg-purple-100 text-purple-800 border-purple-300', freqPrimary: 1, freqSenior: 1 },
      { id: 'sub-art', name: 'Art & Craft', code: 'ART', type: 'activity', room: 'Art Atelier', color: 'bg-pink-100 text-pink-800 border-pink-300', freqPrimary: 1, freqSenior: 0 },
      { id: 'sub-gam', name: 'Sports & Games', code: 'GAME', type: 'activity', room: 'Sports Arena', color: 'bg-lime-100 text-lime-800 border-lime-300', freqPrimary: 0, freqSenior: 1 },
    ],
    teachers: [
      { id: 't-1', name: 'Dr. Aris Thorne', subjects: ['sub-math'], maxPerDay: 5, unavailableDays: [] },
      { id: 't-2', name: 'Ms. Priya Nair', subjects: ['sub-math', 'sub-cs'], maxPerDay: 5, unavailableDays: [] },
      { id: 't-3', name: 'Mr. David Miller', subjects: ['sub-eng'], maxPerDay: 5, unavailableDays: [] },
      { id: 't-4', name: 'Mrs. Kavita Rao', subjects: ['sub-eng', 'sub-hin'], maxPerDay: 5, unavailableDays: [] },
      { id: 't-5', name: 'Dr. Neha Verma', subjects: ['sub-sci'], maxPerDay: 5, unavailableDays: [] },
      { id: 't-6', name: 'Mr. Rohan Joshi', subjects: ['sub-sci', 'sub-cs'], maxPerDay: 5, unavailableDays: [] },
      { id: 't-7', name: 'Ms. Sarah Jenkins', subjects: ['sub-sst'], maxPerDay: 5, unavailableDays: [] },
      { id: 't-8', name: 'Mr. Vikram Singh', subjects: ['sub-sst', 'sub-hin'], maxPerDay: 5, unavailableDays: [] },
      // Specialist Activity Teachers
      { id: 't-9', name: 'Maestro Carlos (Music)', subjects: ['sub-mus'], maxPerDay: 5, unavailableDays: [] },
      { id: 't-10', name: 'Ms. Elena Rostova (Art)', subjects: ['sub-art', 'sub-mus'], maxPerDay: 5, unavailableDays: [] },
      { id: 't-11', name: 'Coach Marcus Vance (Sports)', subjects: ['sub-gam', 'sub-art'], maxPerDay: 5, unavailableDays: [] },
    ],
    absences: [
      // Pre-populated example absence so user can immediately see Substitute Ranking in action
      { id: 'abs-1', teacherId: 't-1', day: 'Tuesday', reason: 'Medical Leave' }
    ],
    substitutions: {} // key: `${day}-${period}-${classId}` -> substituteTeacherId
  },
  {
    id: 'school-2',
    name: "St. Xavier's International",
    subdomain: 'stxaviers.chronos.edu',
    timezone: 'IST (UTC+5:30)',
    term: 'Fall Semester 2026',
    published: false,
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    rules: {
      primaryEndPeriod: 4,
      seniorEndPeriod: 6,
      maxTeacherPeriodsPerDay: 5,
      activityDay: 'Friday', // Configurable per school!
      activityPeriods: [1, 2],
      zeroPeriodLabel: 'Morning Prayer & Homeroom',
      lunchAfterPeriod: 4,
    },
    periodSlots: [
      { number: 0, label: 'Zero Period', time: '08:00 - 08:30', isBreak: true, type: 'zero' },
      { number: 1, label: 'Period 1', time: '08:30 - 09:15', isBreak: false },
      { number: 2, label: 'Period 2', time: '09:15 - 10:00', isBreak: false },
      { number: 'B1', label: 'Recess', time: '10:00 - 10:15', isBreak: true, type: 'break' },
      { number: 3, label: 'Period 3', time: '10:15 - 11:00', isBreak: false },
      { number: 4, label: 'Period 4', time: '11:00 - 12:00', isBreak: false, note: 'Primary Dismissal (12:00)' },
      { number: 'L1', label: 'Lunch Break', time: '12:00 - 12:30', isBreak: true, type: 'lunch', seniorOnly: true },
      { number: 5, label: 'Period 5', time: '12:30 - 01:15', isBreak: false, seniorOnly: true },
      { number: 6, label: 'Period 6', time: '01:15 - 02:00', isBreak: false, seniorOnly: true, note: 'Senior Dismissal (02:00)' },
    ],
    classes: [
      { id: 'x-3a', name: '3A', grade: 'Grade 3', tier: 'Primary', room: 'Block A-1' },
      { id: 'x-11a', name: '11A', grade: 'Grade 11', tier: 'Senior', room: 'Block C-4' },
    ],
    subjects: [
      { id: 'x-math', name: 'Mathematics', code: 'MATH', type: 'academic', color: 'bg-blue-50 text-blue-700 border-blue-200', freqPrimary: 6, freqSenior: 8 },
      { id: 'x-eng', name: 'English Core', code: 'ENG', type: 'academic', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', freqPrimary: 6, freqSenior: 6 },
      { id: 'x-sci', name: 'Physics & Chem', code: 'PHY', type: 'academic', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', freqPrimary: 6, freqSenior: 8 },
      { id: 'x-hum', name: 'Humanities', code: 'HUM', type: 'academic', color: 'bg-amber-50 text-amber-700 border-amber-200', freqPrimary: 0, freqSenior: 6 },
      { id: 'x-act1', name: 'Music & Choir', code: 'MUS', type: 'activity', room: 'Auditorium', color: 'bg-purple-100 text-purple-800 border-purple-300', freqPrimary: 1, freqSenior: 1 },
      { id: 'x-act2', name: 'Athletics', code: 'ATH', type: 'activity', room: 'Main Field', color: 'bg-lime-100 text-lime-800 border-lime-300', freqPrimary: 1, freqSenior: 1 },
    ],
    teachers: [
      { id: 'xt-1', name: 'Prof. Alan Grant', subjects: ['x-math'], maxPerDay: 5, unavailableDays: [] },
      { id: 'xt-2', name: 'Ms. Ellie Sattler', subjects: ['x-sci'], maxPerDay: 5, unavailableDays: [] },
      { id: 'xt-3', name: 'Dr. Ian Malcolm', subjects: ['x-eng', 'x-hum'], maxPerDay: 5, unavailableDays: [] },
      { id: 'xt-4', name: 'Coach John Hammond', subjects: ['x-act1', 'x-act2'], maxPerDay: 5, unavailableDays: [] },
      { id: 'xt-5', name: 'Ms. Claire Dearing', subjects: ['x-act1', 'x-act2', 'x-eng'], maxPerDay: 5, unavailableDays: [] },
    ],
    absences: [],
    substitutions: {}
  }
];

// ==========================================
// CONSTRAINT SOLVER ENGINE (CP-SAT HEURISTIC IN JS)
// ==========================================
function generateSchoolTimetable(school) {
  const { workingDays, rules, classes, subjects, teachers } = school;
  const diagnostics = [];
  const entries = {}; // key: `${day}-${period}-${classId}` -> { classId, day, period, subjectId, teacherId, room, isActivity }

  // Helper structures for tracking hard constraints
  // teacherBusy[day][period][teacherId] = classId
  const teacherBusy = {};
  // teacherDailyCount[day][teacherId] = number of periods assigned on that day
  const teacherDailyCount = {};
  // classSubjectDayCount[classId][day][subjectId] = count (for soft constraint: spread across week)
  const classSubjectDayCount = {};

  workingDays.forEach(day => {
    teacherBusy[day] = {};
    teacherDailyCount[day] = {};
    teachers.forEach(t => { teacherDailyCount[day][t.id] = 0; });
    for (let p = 1; p <= rules.seniorEndPeriod; p++) {
      teacherBusy[day][p] = {};
    }
  });

  classes.forEach(cls => {
    classSubjectDayCount[cls.id] = {};
    workingDays.forEach(day => {
      classSubjectDayCount[cls.id][day] = {};
    });
  });

  // 1. Pre-check total weekly required slots vs available slots per class
  for (const cls of classes) {
    const maxP = cls.tier === 'Primary' ? rules.primaryEndPeriod : rules.seniorEndPeriod;
    const totalAvailableSlots = workingDays.length * maxP;
    const requiredSlots = subjects.reduce((sum, sub) => {
      return sum + (cls.tier === 'Primary' ? sub.freqPrimary : sub.freqSenior);
    }, 0);

    if (requiredSlots > totalAvailableSlots) {
      diagnostics.push({
        type: 'error',
        title: `Over-scheduled Class: ${cls.name} (${cls.tier})`,
        detail: `${cls.name} requires ${requiredSlots} weekly periods across subjects, but ${cls.tier} tier only has ${totalAvailableSlots} periods/week (${workingDays.length} days × ${maxP} periods/day ending at ${cls.tier === 'Primary' ? '12:00 PM' : '2:00 PM'}).`
      });
    }
  }

  // Build remaining demand pool per class
  // demand[classId] = [ { subject, remaining } ]
  const demand = {};
  classes.forEach(cls => {
    demand[cls.id] = subjects.map(sub => ({
      subject: sub,
      remaining: cls.tier === 'Primary' ? sub.freqPrimary : sub.freqSenior
    })).filter(d => d.remaining > 0);
  });

  // Helper to find best valid teacher for (subjectId, day, period)
  const findBestTeacher = (subjectId, day, period) => {
    const qualified = teachers.filter(t => t.subjects.includes(subjectId));
    if (qualified.length === 0) return { teacher: null, reason: 'No teacher qualified for this subject' };

    const candidates = qualified.filter(t => {
      if ((t.unavailableDays || []).includes(day)) return false;
      if (teacherBusy[day][period][t.id]) return false; // Hard Constraint: No double booking
      const maxCap = Math.min(t.maxPerDay || 5, rules.maxTeacherPeriodsPerDay || 5);
      if (teacherDailyCount[day][t.id] >= maxCap) return false; // Hard Constraint: <= 5 periods/day
      return true;
    });

    if (candidates.length === 0) {
      return { teacher: null, reason: 'All qualified teachers are either busy in another class or reached their 5-period daily cap' };
    }

    // Soft Constraint: Balance teacher load (pick teacher with fewest periods today, then fewest overall)
    candidates.sort((a, b) => teacherDailyCount[day][a.id] - teacherDailyCount[day][b.id]);
    return { teacher: candidates[0], reason: null };
  };

  // STEP A: Lock in Fixed Weekly Activity Block first (Hard Constraint)
  const actDay = rules.activityDay;
  if (workingDays.includes(actDay)) {
    for (const period of rules.activityPeriods) {
      for (const cls of classes) {
        const maxP = cls.tier === 'Primary' ? rules.primaryEndPeriod : rules.seniorEndPeriod;
        if (period > maxP) continue;

        const actDemands = demand[cls.id].filter(d => d.subject.type === 'activity' && d.remaining > 0);
        if (actDemands.length > 0) {
          // Pick an activity subject that has an available specialist teacher
          let assigned = false;
          for (const dItem of actDemands) {
            const { teacher } = findBestTeacher(dItem.subject.id, actDay, period);
            if (teacher) {
              const key = `${actDay}-${period}-${cls.id}`;
              entries[key] = {
                classId: cls.id,
                day: actDay,
                period,
                subjectId: dItem.subject.id,
                teacherId: teacher.id,
                room: dItem.subject.room || cls.room,
                isActivity: true
              };
              teacherBusy[actDay][period][teacher.id] = cls.id;
              teacherDailyCount[actDay][teacher.id] += 1;
              dItem.remaining -= 1;
              classSubjectDayCount[cls.id][actDay][dItem.subject.id] = (classSubjectDayCount[cls.id][actDay][dItem.subject.id] || 0) + 1;
              assigned = true;
              break;
            }
          }
          if (!assigned) {
            diagnostics.push({
              type: 'error',
              title: `Specialist Teacher Bottleneck (${actDay}, Period ${period})`,
              detail: `Could not schedule Activity Block for class ${cls.name} because all specialist activity teachers are busy with other classes during Period ${period}.`
            });
          }
        }
      }
    }
  }

  // STEP B: Schedule all remaining Academic periods across the week
  // Iterate period by period, day by day, to spread subjects evenly across the week (Soft Constraint)
  for (const day of workingDays) {
    for (let period = 1; period <= rules.seniorEndPeriod; period++) {
      for (const cls of classes) {
        const maxP = cls.tier === 'Primary' ? rules.primaryEndPeriod : rules.seniorEndPeriod;
        if (period > maxP) continue; // Hard Constraint: Primary ends at Period 4 (12:00 PM)

        const key = `${day}-${period}-${cls.id}`;
        if (entries[key]) continue; // Already locked by Activity Block

        // Get remaining academic (or leftover activity) subjects for this class
        const availableDemands = demand[cls.id].filter(d => d.remaining > 0);
        if (availableDemands.length === 0) continue;

        // Sort candidates by:
        // 1. Not taught today yet in this class (Soft Constraint: spread subjects across week)
        // 2. Highest remaining weekly frequency first (Most constrained first heuristic)
        availableDemands.sort((a, b) => {
          const countTodayA = classSubjectDayCount[cls.id][day][a.subject.id] || 0;
          const countTodayB = classSubjectDayCount[cls.id][day][b.subject.id] || 0;
          if (countTodayA !== countTodayB) return countTodayA - countTodayB;
          return b.remaining - a.remaining;
        });

        let slotAssigned = false;
        let lastFailureReason = '';

        for (const dItem of availableDemands) {
          const { teacher, reason } = findBestTeacher(dItem.subject.id, day, period);
          if (teacher) {
            entries[key] = {
              classId: cls.id,
              day,
              period,
              subjectId: dItem.subject.id,
              teacherId: teacher.id,
              room: dItem.subject.room || cls.room,
              isActivity: dItem.subject.type === 'activity'
            };
            teacherBusy[day][period][teacher.id] = cls.id;
            teacherDailyCount[day][teacher.id] += 1;
            dItem.remaining -= 1;
            classSubjectDayCount[cls.id][day][dItem.subject.id] = (classSubjectDayCount[cls.id][day][dItem.subject.id] || 0) + 1;
            slotAssigned = true;
            break;
          } else {
            lastFailureReason = `${dItem.subject.name}: ${reason}`;
          }
        }

        if (!slotAssigned && availableDemands.length > 0) {
          diagnostics.push({
            type: 'error',
            title: `Infeasible Slot: Class ${cls.name} on ${day}, Period ${period}`,
            detail: `Unable to assign remaining subjects (${availableDemands.map(d => d.subject.code).join(', ')}). Reason: ${lastFailureReason}.`
          });
        }
      }
    }
  }

  // Check if any subject did not meet its exact weekly frequency
  classes.forEach(cls => {
    demand[cls.id].forEach(d => {
      if (d.remaining > 0) {
        diagnostics.push({
          type: 'warning',
          title: `Unfulfilled Frequency: ${cls.name} — ${d.subject.name}`,
          detail: `${d.remaining} required weekly period(s) could not be scheduled without violating hard teacher or day-length constraints.`
        });
      }
    });
  });

  return {
    entries,
    diagnostics,
    teacherDailyCount,
    teacherBusy,
    generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  };
}

// ==========================================
// MAIN APPLICATION COMPONENT
// ==========================================
export default function App() {
  const [schools, setSchools] = useState(INITIAL_SCHOOLS);
  const [activeSchoolId, setActiveSchoolId] = useState('school-1');
  const [activeRole, setActiveRole] = useState('admin'); // 'admin' | 'teacher' | 'student'
  const [adminTab, setAdminTab] = useState('timetable'); // 'timetable' | 'substitutions' | 'setup' | 'roadmap'

  // Selections for views
  const [selectedClassId, setSelectedClassId] = useState('c-4a');
  const [selectedTeacherId, setSelectedTeacherId] = useState('t-1');
  const [timetableViewMode, setTimetableViewMode] = useState('class'); // 'class' | 'teacher'

  // Modal State for Manual Override
  const [editingSlot, setEditingSlot] = useState(null); // { day, period, classId, currentEntry }
  const [overrideSubjectId, setOverrideSubjectId] = useState('');
  const [overrideTeacherId, setOverrideTeacherId] = useState('');
  const [toast, setToast] = useState(null);

  const activeSchool = useMemo(
    () => schools.find(s => s.id === activeSchoolId) || schools[0],
    [schools, activeSchoolId]
  );

  // Sync default class/teacher when switching schools
  useEffect(() => {
    if (activeSchool.classes.length > 0 && !activeSchool.classes.some(c => c.id === selectedClassId)) {
      setSelectedClassId(activeSchool.classes[0].id);
    }
    if (activeSchool.teachers.length > 0 && !activeSchool.teachers.some(t => t.id === selectedTeacherId)) {
      setSelectedTeacherId(activeSchool.teachers[0].id);
    }
  }, [activeSchool, selectedClassId, selectedTeacherId]);

  // Run Constraint Solver automatically or on trigger
  const [schedulesBySchool, setSchedulesBySchool] = useState(() => {
    const initial = {};
    INITIAL_SCHOOLS.forEach(s => {
      initial[s.id] = generateSchoolTimetable(s);
    });
    return initial;
  });

  const currentSchedule = schedulesBySchool[activeSchool.id] || { entries: {}, diagnostics: [] };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleRunSolver = () => {
    const result = generateSchoolTimetable(activeSchool);
    setSchedulesBySchool(prev => ({ ...prev, [activeSchool.id]: result }));
    if (result.diagnostics.length === 0) {
      showToast(`Conflict-free timetable generated for ${activeSchool.name}!`, 'success');
    } else {
      showToast(`Solver finished with ${result.diagnostics.length} constraint alert(s).`, 'warning');
    }
  };

  const updateActiveSchool = (updater) => {
    setSchools(prev => prev.map(s => s.id === activeSchool.id ? updater(s) : s));
  };

  // ==========================================
  // SUBSTITUTE TEACHER RANKING ALGORITHM
  // ==========================================
  // Requirement 4.2 & 5:
  // "When a teacher is absent, rank currently-free teachers for that period by number
  // of free periods that day, and assign the substitute with the most free periods first."
  const getSubstituteCandidatesForSlot = (day, period, absentTeacherId) => {
    const entries = currentSchedule.entries;
    const maxCap = activeSchool.rules.maxTeacherPeriodsPerDay || 5;

    // Find all teachers busy in (day, period) or already acting as a substitute in (day, period)
    const busyTeacherIdsInPeriod = new Set();
    Object.values(entries).forEach(e => {
      if (e.day === day && e.period === period) {
        busyTeacherIdsInPeriod.add(e.teacherId);
        const subKey = `${day}-${period}-${e.classId}`;
        if (activeSchool.substitutions[subKey]) {
          busyTeacherIdsInPeriod.add(activeSchool.substitutions[subKey]);
        }
      }
    });

    // Calculate how many periods each teacher is teaching on `day` (including assigned substitutions)
    const getTeacherAssignedCountOnDay = (teacherId) => {
      let count = 0;
      Object.values(entries).forEach(e => {
        if (e.day === day) {
          const subKey = `${day}-${e.period}-${e.classId}`;
          const effectiveTeacher = activeSchool.substitutions[subKey] || e.teacherId;
          if (effectiveTeacher === teacherId) count++;
        }
      });
      return count;
    };

    // Total working periods in the school day
    const totalDayPeriods = activeSchool.rules.seniorEndPeriod;

    const absentTeacherIdsToday = new Set(
      activeSchool.absences.filter(a => a.day === day).map(a => a.teacherId)
    );

    const candidates = activeSchool.teachers
      .filter(t => {
        if (t.id === absentTeacherId) return false;
        if (absentTeacherIdsToday.has(t.id)) return false;
        if ((t.unavailableDays || []).includes(day)) return false;
        if (busyTeacherIdsInPeriod.has(t.id)) return false; // Hard Rule: Only currently free teachers
        const assignedToday = getTeacherAssignedCountOnDay(t.id);
        if (assignedToday >= Math.min(t.maxPerDay || 5, maxCap)) return false; // Hard Rule: <= 5 periods/day
        return true;
      })
      .map(t => {
        const assignedToday = getTeacherAssignedCountOnDay(t.id);
        const freePeriodsToday = totalDayPeriods - assignedToday;
        return {
          ...t,
          assignedToday,
          freePeriodsToday
        };
      });

    // Sort descending by freePeriodsToday (Most free periods first!)
    candidates.sort((a, b) => b.freePeriodsToday - a.freePeriodsToday);
    return candidates;
  };

  // Auto-assign top-ranked substitutes for all affected classes of an absence
  const handleAutoAssignSubstitutes = (absence) => {
    const { teacherId, day } = absence;
    const affectedEntries = Object.values(currentSchedule.entries).filter(
      e => e.day === day && e.teacherId === teacherId
    );

    let assignedCount = 0;
    const newSubs = { ...activeSchool.substitutions };

    affectedEntries.forEach(entry => {
      const subKey = `${day}-${entry.period}-${entry.classId}`;
      const candidates = getSubstituteCandidatesForSlot(day, entry.period, teacherId);
      if (candidates.length > 0) {
        newSubs[subKey] = candidates[0].id;
        assignedCount++;
      }
    });

    updateActiveSchool(s => ({ ...s, substitutions: newSubs }));
    showToast(`Auto-assigned top-ranked substitutes for ${assignedCount} period(s)!`, 'success');
  };

  // ==========================================
  // MANUAL OVERRIDE & CONFLICT CHECKER
  // ==========================================
  const openManualOverride = (day, period, classId) => {
    if (activeRole !== 'admin') return;
    const key = `${day}-${period}-${classId}`;
    const entry = currentSchedule.entries[key];
    setEditingSlot({ day, period, classId, currentEntry: entry });
    setOverrideSubjectId(entry ? entry.subjectId : activeSchool.subjects[0]?.id || '');
    setOverrideTeacherId(entry ? entry.teacherId : activeSchool.teachers[0]?.id || '');
  };

  const checkManualOverrideConflict = (day, period, classId, newTeacherId) => {
    const conflicts = [];
    if (!newTeacherId) return conflicts;

    // 1. Check if teacher is already teaching another class in the same period
    Object.values(currentSchedule.entries).forEach(e => {
      if (e.day === day && e.period === period && e.classId !== classId && e.teacherId === newTeacherId) {
        const otherCls = activeSchool.classes.find(c => c.id === e.classId);
        conflicts.push(`Double-booking Clash: Teacher is already scheduled in Class ${otherCls?.name || e.classId} during ${day} Period ${period}.`);
      }
    });

    // 2. Check if teacher exceeds 5 periods on that day
    let dailyLoad = 0;
    Object.values(currentSchedule.entries).forEach(e => {
      if (e.day === day && e.classId !== classId && e.teacherId === newTeacherId) {
        dailyLoad++;
      }
    });
    if (dailyLoad + 1 > activeSchool.rules.maxTeacherPeriodsPerDay) {
      conflicts.push(`Workload Cap Clash: Assigning this slot gives the teacher ${dailyLoad + 1} periods on ${day}, exceeding the hard cap of ${activeSchool.rules.maxTeacherPeriodsPerDay} periods/day.`);
    }

    return conflicts;
  };

  const saveManualOverride = () => {
    if (!editingSlot) return;
    const { day, period, classId } = editingSlot;
    const key = `${day}-${period}-${classId}`;
    const sub = activeSchool.subjects.find(s => s.id === overrideSubjectId);
    const cls = activeSchool.classes.find(c => c.id === classId);

    const updatedEntries = {
      ...currentSchedule.entries,
      [key]: {
        classId,
        day,
        period,
        subjectId: overrideSubjectId,
        teacherId: overrideTeacherId,
        room: sub?.room || cls?.room || 'Room TBD',
        isActivity: sub?.type === 'activity',
        isManualOverride: true
      }
    };

    setSchedulesBySchool(prev => ({
      ...prev,
      [activeSchool.id]: {
        ...prev[activeSchool.id],
        entries: updatedEntries
      }
    }));
    setEditingSlot(null);
    showToast(`Updated ${cls?.name} (${day}, Period ${period})`, 'success');
  };

  // ==========================================
  // CSV EXPORT FUNCTION
  // ==========================================
  const handleExportCSV = () => {
    const rows = [['Class', 'Tier', 'Day', 'Period', 'Subject', 'Type', 'Teacher', 'Substitute', 'Room']];
    activeSchool.classes.forEach(cls => {
      activeSchool.workingDays.forEach(day => {
        for (let p = 1; p <= activeSchool.rules.seniorEndPeriod; p++) {
          const key = `${day}-${p}-${cls.id}`;
          const entry = currentSchedule.entries[key];
          if (entry) {
            const sub = activeSchool.subjects.find(s => s.id === entry.subjectId);
            const t = activeSchool.teachers.find(t => t.id === entry.teacherId);
            const subTeacherId = activeSchool.substitutions[key];
            const subTeacher = activeSchool.teachers.find(t => t.id === subTeacherId);
            rows.push([
              cls.name,
              cls.tier,
              day,
              `Period ${p}`,
              sub?.name || '',
              sub?.type || '',
              t?.name || '',
              subTeacher ? subTeacher.name : 'None',
              entry.room
            ]);
          }
        }
      });
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${activeSchool.name.replace(/\s+/g, '_')}_Timetable.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported timetable to CSV!', 'success');
  };

  // Helper lookup maps
  const subjectMap = useMemo(() => {
    const m = {};
    activeSchool.subjects.forEach(s => { m[s.id] = s; });
    return m;
  }, [activeSchool.subjects]);

  const teacherMap = useMemo(() => {
    const m = {};
    activeSchool.teachers.forEach(t => { m[t.id] = t; });
    return m;
  }, [activeSchool.teachers]);

  const classMap = useMemo(() => {
    const m = {};
    activeSchool.classes.forEach(c => { m[c.id] = c; });
    return m;
  }, [activeSchool.classes]);

  const selectedClass = classMap[selectedClassId] || activeSchool.classes[0];
  const selectedTeacher = teacherMap[selectedTeacherId] || activeSchool.teachers[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all ${
          toast.type === 'warning'
            ? 'bg-amber-900 text-amber-50 border-amber-700'
            : 'bg-slate-900 text-white border-slate-700'
        }`}>
          {toast.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-amber-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          <span>{toast.msg}</span>
        </div>
      )}

      {/* TOP MULTI-TENANT SAAS HEADER */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Brand & Tenant Switcher */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center shadow-inner">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold tracking-tight text-base">ChronosEdu</span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                    Multi-Tenant SaaS
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">Automated School Constraint Solver & Substitution Engine</p>
              </div>
            </div>

            <div className="h-6 w-px bg-slate-800 hidden md:block" />

            {/* Tenant Selector */}
            <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-lg px-2.5 py-1.5">
              <Building2 className="w-4 h-4 text-indigo-400 shrink-0" />
              <div className="text-xs">
                <span className="text-slate-400 block text-[10px] leading-none">Active Tenant (School)</span>
                <select
                  value={activeSchool.id}
                  onChange={(e) => setActiveSchoolId(e.target.value)}
                  className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer pr-2"
                >
                  {schools.map(s => (
                    <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Role Portal Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden lg:inline mr-1">Switch Role View:</span>
            <div className="inline-flex rounded-xl bg-slate-800 p-1 border border-slate-700">
              {[
                { id: 'admin', label: 'Admin Portal', icon: ShieldCheck },
                { id: 'teacher', label: 'Teacher Portal', icon: UserCheck },
                { id: 'student', label: 'Student / Parent', icon: GraduationCap },
              ].map(role => {
                const Icon = role.icon;
                const active = activeRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setActiveRole(role.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      active
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{role.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sub-bar with School Metadata & Quick Status */}
        <div className="bg-slate-950/60 border-t border-slate-800/80 px-4 sm:px-6 py-2">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
            <div className="flex flex-wrap items-center gap-4">
              <span>Tenant Domain: <strong className="text-slate-200">{activeSchool.subdomain}</strong></span>
              <span>•</span>
              <span>Primary Cutoff: <strong className="text-emerald-400">12:00 PM (Period {activeSchool.rules.primaryEndPeriod})</strong></span>
              <span>•</span>
              <span>Senior Cutoff: <strong className="text-sky-400">02:00 PM (Period {activeSchool.rules.seniorEndPeriod})</strong></span>
              <span>•</span>
              <span>Activity Block: <strong className="text-purple-400">{activeSchool.rules.activityDay} (P{activeSchool.rules.activityPeriods.join(', P')})</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                activeSchool.published
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${activeSchool.published ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                {activeSchool.published ? 'Published Live' : 'Draft Mode'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* ========================================== */}
        {/* ROLE 1: ADMIN / SCHOOL STAFF PORTAL        */}
        {/* ========================================== */}
        {activeRole === 'admin' && (
          <>
            {/* Admin Action Bar & Navigation Tabs */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'timetable', label: 'Master Timetable & Solver', icon: Calendar },
                  { id: 'substitutions', label: 'Substitutions & Absences', icon: UserCheck, badge: activeSchool.absences.length },
                  { id: 'setup', label: 'School Rules, Classes & Staff Setup', icon: Sliders },
                  { id: 'roadmap', label: 'What Remains for You (Production Guide)', icon: Sparkles },
                ].map(tab => {
                  const Icon = tab.icon;
                  const active = adminTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setAdminTab(tab.id)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                        active
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                      {tab.badge > 0 && (
                        <span className="px-1.5 py-0.2 rounded-full text-[11px] bg-rose-500 text-white">
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleRunSolver}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Generate Timetable</span>
                </button>

                <button
                  onClick={() => {
                    updateActiveSchool(s => ({ ...s, published: !s.published }));
                    showToast(
                      !activeSchool.published ? 'Timetable approved and published to portals!' : 'Timetable reverted to draft.',
                      'success'
                    );
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition cursor-pointer ${
                    activeSchool.published
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  {activeSchool.published ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  <span>{activeSchool.published ? 'Published' : 'Approve & Publish'}</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs sm:text-sm font-medium transition cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* CONSTRAINT SOLVER DIAGNOSTICS BANNER */}
            {currentSchedule.diagnostics.length > 0 ? (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>Constraint Solver Diagnostics ({currentSchedule.diagnostics.length} Infeasibility Alert)</span>
                  </div>
                  <button
                    onClick={() => {
                      setSchools(INITIAL_SCHOOLS);
                      const fresh = {};
                      INITIAL_SCHOOLS.forEach(s => { fresh[s.id] = generateSchoolTimetable(s); });
                      setSchedulesBySchool(fresh);
                      showToast('Reset to balanced conflict-free staffing data!', 'success');
                    }}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-900 text-white hover:bg-amber-800"
                  >
                    Auto-Fix / Restore Balanced Demo Data
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                  {currentSchedule.diagnostics.map((d, idx) => (
                    <div key={idx} className="bg-white/80 border border-amber-200 rounded-xl p-3 text-xs">
                      <div className="font-semibold text-amber-950">{d.title}</div>
                      <div className="text-amber-800 mt-0.5">{d.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-900">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>All 7 Hard Constraints & Soft Preferences Satisfied:</strong> Zero double-bookings, Primary ends 12:00 PM, Senior ends 2:00 PM, {activeSchool.rules.activityDay} Activity Block locked, and all teachers capped at ≤ {activeSchool.rules.maxTeacherPeriodsPerDay} periods/day.
                  </span>
                </div>
                <span className="text-emerald-700 font-mono">Last solved: {currentSchedule.generatedAt}</span>
              </div>
            )}

            {/* TAB 1: MASTER TIMETABLE GRID */}
            {adminTab === 'timetable' && (
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
            )}

            {/* TAB 2: AUTOMATED SUBSTITUTE RANKING ENGINE */}
            {adminTab === 'substitutions' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Mark Teacher Absent */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 h-fit">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-indigo-600" />
                      <span>Log Teacher Absence</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      When a teacher is marked absent, the engine finds all currently free teachers for each affected period and ranks them by <strong>most free periods on that day</strong>.
                    </p>
                  </div>

                  <AbsenceForm
                    school={activeSchool}
                    onAddAbsence={(teacherId, day, reason) => {
                      const exists = activeSchool.absences.some(a => a.teacherId === teacherId && a.day === day);
                      if (exists) {
                        showToast('Teacher is already marked absent on that day.', 'warning');
                        return;
                      }
                      updateActiveSchool(s => ({
                        ...s,
                        absences: [...s.absences, { id: `abs-${Date.now()}`, teacherId, day, reason }]
                      }));
                      showToast('Absence logged. Review ranked substitutes on the right.', 'success');
                    }}
                  />

                  <div className="border-t border-slate-100 pt-4 space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Absences</h4>
                    {activeSchool.absences.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">No teachers currently marked absent.</p>
                    ) : (
                      activeSchool.absences.map(abs => {
                        const t = teacherMap[abs.teacherId];
                        return (
                          <div key={abs.id} className="flex items-center justify-between p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs">
                            <div>
                              <div className="font-bold text-rose-950">{t?.name}</div>
                              <div className="text-rose-700">{abs.day} • {abs.reason}</div>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleAutoAssignSubstitutes(abs)}
                                className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold cursor-pointer"
                              >
                                Auto-Fill Top Subs
                              </button>
                              <button
                                onClick={() => {
                                  updateActiveSchool(s => ({
                                    ...s,
                                    absences: s.absences.filter(a => a.id !== abs.id)
                                  }));
                                }}
                                className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Right 2 Columns: Ranked Substitute Recommendations per Affected Slot */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-base text-slate-900">Substitute Ranking Queue (Most Free Periods First)</h3>
                      <p className="text-xs text-slate-500">
                        Hard Rule: Only teachers free during the period and under the 5-period daily cap are eligible. Soft Rule: Ranked highest-to-lowest by total free periods that day.
                      </p>
                    </div>
                  </div>

                  {activeSchool.absences.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-sm">
                      Mark a teacher absent on the left to inspect affected classes and ranked substitute teachers.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {activeSchool.absences.map(abs => {
                        const absentTeacher = teacherMap[abs.teacherId];
                        const affectedSlots = Object.values(currentSchedule.entries)
                          .filter(e => e.day === abs.day && e.teacherId === abs.teacherId)
                          .sort((a, b) => a.period - b.period);

                        return (
                          <div key={abs.id} className="border border-slate-200 rounded-2xl overflow-hidden">
                            <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between text-xs">
                              <div>
                                <span className="font-bold text-sm">{absentTeacher?.name}</span> — Absent on <span className="text-amber-300 font-semibold">{abs.day}</span> ({affectedSlots.length} affected classes)
                              </div>
                              <button
                                onClick={() => handleAutoAssignSubstitutes(abs)}
                                className="px-3 py-1 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-semibold cursor-pointer"
                              >
                                1-Click Assign All Top Ranked
                              </button>
                            </div>

                            <div className="divide-y divide-slate-100">
                              {affectedSlots.map(slot => {
                                const cls = classMap[slot.classId];
                                const sub = subjectMap[slot.subjectId];
                                const subKey = `${slot.day}-${slot.period}-${slot.classId}`;
                                const assignedSubId = activeSchool.substitutions[subKey];
                                const assignedSub = teacherMap[assignedSubId];
                                const candidates = getSubstituteCandidatesForSlot(slot.day, slot.period, abs.teacherId);

                                return (
                                  <div key={subKey} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-2">
                                        <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 font-bold text-xs">
                                          Period {slot.period}
                                        </span>
                                        <span className="font-bold text-sm text-slate-900">Class {cls?.name} ({cls?.tier})</span>
                                        <span className={`text-xs px-2 py-0.5 rounded border ${sub?.color}`}>{sub?.name}</span>
                                      </div>
                                      {assignedSub ? (
                                        <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                                          <CheckCircle2 className="w-3.5 h-3.5" />
                                          <span>Assigned Substitute: {assignedSub.name}</span>
                                        </div>
                                      ) : (
                                        <div className="text-xs text-rose-600 font-medium">Unassigned — Select a ranked substitute below</div>
                                      )}
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">
                                      {candidates.slice(0, 4).map((cand, idx) => {
                                        const isSelected = assignedSubId === cand.id;
                                        return (
                                          <button
                                            key={cand.id}
                                            onClick={() => {
                                              updateActiveSchool(s => ({
                                                ...s,
                                                substitutions: { ...s.substitutions, [subKey]: cand.id }
                                              }));
                                              showToast(`Assigned ${cand.name} to Class ${cls?.name} (P${slot.period})`, 'success');
                                            }}
                                            className={`px-3 py-2 rounded-xl border text-left text-xs transition cursor-pointer ${
                                              isSelected
                                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                                : idx === 0
                                                ? 'bg-indigo-50/80 border-indigo-300 text-indigo-950 hover:bg-indigo-100'
                                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                            }`}
                                          >
                                            <div className="flex items-center gap-1.5 font-bold">
                                              {idx === 0 && !isSelected && (
                                                <span className="px-1.5 py-0.2 bg-indigo-600 text-white rounded text-[10px]">#1 Best</span>
                                              )}
                                              <span>{cand.name}</span>
                                            </div>
                                            <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                                              <strong>{cand.freePeriodsToday} free periods</strong> today ({cand.assignedToday}/5 used)
                                            </div>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: SCHOOL RULES, CLASSES, SUBJECTS & STAFF CONFIGURATION */}
            {adminTab === 'setup' && (
              <AdminSetupPanel
                school={activeSchool}
                updateSchool={updateActiveSchool}
                onRunSolver={handleRunSolver}
                currentSchedule={currentSchedule}
              />
            )}

            {/* TAB 4: WHAT REMAINS FOR THE USER TO DO BY THEMSELVES */}
            {adminTab === 'roadmap' && (
              <WhatRemainsGuide />
            )}
          </>
        )}

        {/* ========================================== */}
        {/* ROLE 2: TEACHER PORTAL                     */}
        {/* ========================================== */}
        {activeRole === 'teacher' && (
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
                      onClick={() => {
                        updateActiveSchool(s => ({
                          ...s,
                          teachers: s.teachers.map(t => {
                            if (t.id !== selectedTeacher.id) return t;
                            const next = isUnavail
                              ? t.unavailableDays.filter(d => d !== day)
                              : [...(t.unavailableDays || []), day];
                            return { ...t, unavailableDays: next };
                          })
                        }));
                        showToast(`Updated ${day} availability for ${selectedTeacher.name}. Click Generate Timetable in Admin to re-solve.`, 'success');
                      }}
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
        )}

        {/* ========================================== */}
        {/* ROLE 3: STUDENT / PARENT PORTAL            */}
        {/* ========================================== */}
        {activeRole === 'student' && (
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
        )}
      </main>

      {/* MANUAL OVERRIDE MODAL (ADMIN ONLY) */}
      {editingSlot && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900">Manual Slot Override</h3>
                <p className="text-xs text-slate-500">
                  Class {classMap[editingSlot.classId]?.name} • {editingSlot.day}, Period {editingSlot.period}
                </p>
              </div>
              <button onClick={() => setEditingSlot(null)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                <select
                  value={overrideSubjectId}
                  onChange={(e) => setOverrideSubjectId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                >
                  {activeSchool.subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.type})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Teacher</label>
                <select
                  value={overrideTeacherId}
                  onChange={(e) => setOverrideTeacherId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                >
                  {activeSchool.teachers.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.subjects.map(sid => subjectMap[sid]?.code).join(', ')})
                    </option>
                  ))}
                </select>
              </div>

              {/* Real-time Conflict Detection */}
              {(() => {
                const conflicts = checkManualOverrideConflict(
                  editingSlot.day,
                  editingSlot.period,
                  editingSlot.classId,
                  overrideTeacherId
                );
                if (conflicts.length === 0) {
                  return (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>No teacher clashes or daily workload cap violations detected.</span>
                    </div>
                  );
                }
                return (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-rose-700">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>Constraint Clash Warning:</span>
                    </div>
                    {conflicts.map((c, i) => <div key={i}>• {c}</div>)}
                  </div>
                );
              })()}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingSlot(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={saveManualOverride}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
              >
                Apply Override
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// SUB-COMPONENT: CLASS TIMETABLE GRID
// ==========================================
function ClassTimetableGrid({ school, cls, entries, subjectMap, teacherMap, isAdmin, onSlotClick }) {
  const maxPeriod = cls.tier === 'Primary' ? school.rules.primaryEndPeriod : school.rules.seniorEndPeriod;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 bg-slate-50/60">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-xl bg-slate-900 text-white font-bold text-sm">
            Class {cls.name}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
            cls.tier === 'Primary'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-sky-50 text-sky-700 border-sky-200'
          }`}>
            {cls.tier} Tier • Ends at {cls.tier === 'Primary' ? '12:00 PM (4 Periods)' : '02:00 PM (6 Periods)'}
          </span>
          <span className="text-xs text-slate-500">Default Room: <strong>{cls.room}</strong></span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-purple-500" />
            <span>Weekly Activity Block ({school.rules.activityDay})</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-amber-500" />
            <span>Substitute Assigned</span>
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
              <th className="py-3 px-4 w-36 font-semibold">Period / Time</th>
              {school.workingDays.map(day => (
                <th key={day} className="py-3 px-4 font-semibold min-w-[160px]">
                  <div className="flex items-center justify-between">
                    <span>{day}</span>
                    {day === school.rules.activityDay && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-bold">
                        Activity Day
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs">
            {school.periodSlots.map(slot => {
              // If Primary class and slot is seniorOnly, show greyed-out dismissal row
              if (cls.tier === 'Primary' && slot.seniorOnly) {
                return (
                  <tr key={slot.label} className="bg-slate-100/70 text-slate-400">
                    <td className="py-2.5 px-4 font-medium">
                      <div>{slot.label}</div>
                      <div className="text-[10px]">{slot.time}</div>
                    </td>
                    <td colSpan={school.workingDays.length} className="py-2.5 px-4 text-center italic font-medium">
                      Primary Tier Dismissed at 12:00 PM — Senior Classes Only ({slot.label})
                    </td>
                  </tr>
                );
              }

              // Fixed Break / Zero Period / Lunch Row
              if (slot.isBreak) {
                return (
                  <tr key={slot.label} className="bg-amber-50/40 text-slate-600">
                    <td className="py-2.5 px-4 font-semibold text-slate-700 border-r border-slate-200">
                      <div>{slot.label}</div>
                      <div className="text-[10px] text-slate-400">{slot.time}</div>
                    </td>
                    <td colSpan={school.workingDays.length} className="py-2.5 px-4 text-center font-semibold tracking-wide text-slate-600">
                      {slot.type === 'zero' ? `🌅 ${school.rules.zeroPeriodLabel}` : slot.type === 'lunch' ? '🍱 School Lunch Break (12:00 - 12:30 PM)' : '☕ Short Recess Break (10:00 - 10:15 AM)'}
                    </td>
                  </tr>
                );
              }

              const periodNum = slot.number;
              if (periodNum > maxPeriod) return null;

              return (
                <tr key={slot.label} className="hover:bg-slate-50/50 transition">
                  <td className="py-3 px-4 border-r border-slate-200 align-top bg-slate-50/30">
                    <div className="font-bold text-slate-800">{slot.label}</div>
                    <div className="text-[11px] text-slate-500">{slot.time}</div>
                    {slot.note && (
                      <div className="mt-1 inline-block text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
                        {slot.note}
                      </div>
                    )}
                  </td>

                  {school.workingDays.map(day => {
                    const key = `${day}-${periodNum}-${cls.id}`;
                    const entry = entries[key];
                    const sub = entry ? subjectMap[entry.subjectId] : null;
                    const teacher = entry ? teacherMap[entry.teacherId] : null;
                    const subTeacherId = school.substitutions[key];
                    const subTeacher = subTeacherId ? teacherMap[subTeacherId] : null;
                    const isAbsent = school.absences.some(a => a.day === day && a.teacherId === entry?.teacherId);
                    const isActivitySlot = day === school.rules.activityDay && school.rules.activityPeriods.includes(periodNum);

                    return (
                      <td
                        key={day}
                        onClick={() => isAdmin && onSlotClick(day, periodNum, cls.id)}
                        className={`p-2.5 border-r border-slate-100 align-top transition ${
                          isAdmin ? 'cursor-pointer hover:bg-indigo-50/40' : ''
                        } ${isActivitySlot ? 'bg-purple-50/30' : ''}`}
                      >
                        {entry && sub ? (
                          <div className={`p-2.5 rounded-xl border ${sub.color} relative space-y-1.5 shadow-2xs`}>
                            <div className="flex items-start justify-between gap-1">
                              <span className="font-bold text-xs leading-tight">{sub.name}</span>
                              {entry.isActivity && (
                                <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-purple-700 text-white shrink-0">
                                  Activity
                                </span>
                              )}
                            </div>

                            <div className="text-[11px] space-y-0.5">
                              {subTeacher ? (
                                <div className="text-amber-900 bg-amber-200/80 px-1.5 py-0.5 rounded font-semibold">
                                  Sub: {subTeacher.name}
                                  <span className="block text-[10px] line-through opacity-75">{teacher?.name}</span>
                                </div>
                              ) : isAbsent ? (
                                <div className="text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded font-semibold">
                                  ⚠️ {teacher?.name} (Absent)
                                </div>
                              ) : (
                                <div className="font-medium opacity-90">{teacher?.name}</div>
                              )}
                              <div className="text-[10px] opacity-75 flex items-center justify-between">
                                <span>📍 {entry.room}</span>
                                {entry.isManualOverride && <span className="underline">Edited</span>}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="h-16 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-[11px]">
                            Unassigned
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// SUB-COMPONENT: TEACHER TIMETABLE GRID
// ==========================================
function TeacherTimetableGrid({ school, teacher, entries, subjectMap, classMap, teacherMap }) {
  // Compute teacher's daily load (including substitutions)
  const dailyStats = {};
  school.workingDays.forEach(day => {
    let count = 0;
    for (let p = 1; p <= school.rules.seniorEndPeriod; p++) {
      Object.values(entries).forEach(e => {
        if (e.day === day && e.period === p) {
          const subKey = `${day}-${p}-${e.classId}`;
          const effectiveTeacherId = school.substitutions[subKey] || e.teacherId;
          if (effectiveTeacherId === teacher.id) count++;
        }
      });
    }
    dailyStats[day] = {
      assigned: count,
      free: school.rules.seniorEndPeriod - count
    };
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-slate-50/60">
        <div>
          <h3 className="font-bold text-sm text-slate-900">
            {teacher.name} — Weekly Schedule & Daily Workload Meter
          </h3>
          <p className="text-xs text-slate-500">
            Qualified Subjects: {teacher.subjects.map(sid => subjectMap[sid]?.name).join(', ')}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {school.workingDays.map(day => {
            const st = dailyStats[day];
            const overCap = st.assigned > school.rules.maxTeacherPeriodsPerDay;
            return (
              <div key={day} className={`px-2.5 py-1 rounded-xl border text-xs ${
                overCap ? 'bg-rose-50 border-rose-300 text-rose-800' : 'bg-white border-slate-200 text-slate-700'
              }`}>
                <span className="font-bold">{day.slice(0, 3)}:</span> {st.assigned}/{school.rules.maxTeacherPeriodsPerDay} periods{' '}
                <span className="text-emerald-600 font-semibold">({st.free} free)</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
              <th className="py-3 px-4 w-36 font-semibold">Period / Time</th>
              {school.workingDays.map(day => (
                <th key={day} className="py-3 px-4 font-semibold min-w-[155px]">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs">
            {school.periodSlots.filter(s => !s.isBreak).map(slot => {
              const p = slot.number;
              return (
                <tr key={slot.label}>
                  <td className="py-3 px-4 border-r border-slate-200 bg-slate-50/40">
                    <div className="font-bold text-slate-800">{slot.label}</div>
                    <div className="text-[11px] text-slate-500">{slot.time}</div>
                  </td>
                  {school.workingDays.map(day => {
                    // Find if teacher is teaching a regular class or substituting
                    let matchedEntry = null;
                    let isSubbing = false;
                    let coveredBySub = null;

                    Object.values(entries).forEach(e => {
                      if (e.day === day && e.period === p) {
                        const subKey = `${day}-${p}-${e.classId}`;
                        const subId = school.substitutions[subKey];
                        if (subId === teacher.id) {
                          matchedEntry = e;
                          isSubbing = true;
                        } else if (e.teacherId === teacher.id) {
                          matchedEntry = e;
                          if (subId) coveredBySub = teacherMap[subId];
                        }
                      }
                    });

                    if (!matchedEntry) {
                      return (
                        <td key={day} className="p-2.5 border-r border-slate-100">
                          <div className="h-16 rounded-xl bg-emerald-50/40 border border-dashed border-emerald-200 flex flex-col items-center justify-center text-emerald-700">
                            <span className="font-semibold text-xs">Free Period</span>
                            <span className="text-[10px] opacity-75">Available for Sub</span>
                          </div>
                        </td>
                      );
                    }

                    const cls = classMap[matchedEntry.classId];
                    const sub = subjectMap[matchedEntry.subjectId];

                    return (
                      <td key={day} className="p-2.5 border-r border-slate-100">
                        <div className={`p-2.5 rounded-xl border ${
                          isSubbing
                            ? 'bg-amber-100 border-amber-300 text-amber-950'
                            : coveredBySub
                            ? 'bg-slate-100 border-slate-300 text-slate-400 line-through'
                            : sub?.color
                        }`}>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs">Class {cls?.name}</span>
                            {isSubbing && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-700 text-white text-[10px] font-bold">
                                SUB DUTY
                              </span>
                            )}
                          </div>
                          <div className="font-medium mt-1">{sub?.name}</div>
                          <div className="text-[10px] opacity-75 mt-0.5">📍 {matchedEntry.room}</div>
                          {coveredBySub && (
                            <div className="text-[10px] text-rose-600 font-semibold no-underline mt-1">
                              Covered by {coveredBySub.name}
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// SUB-COMPONENT: ABSENCE FORM
// ==========================================
function AbsenceForm({ school, onAddAbsence }) {
  const [teacherId, setTeacherId] = useState(school.teachers[0]?.id || '');
  const [day, setDay] = useState(school.workingDays[0] || 'Monday');
  const [reason, setReason] = useState('Medical / Personal Leave');

  return (
    <div className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
      <div>
        <label className="block font-semibold text-slate-700 mb-1">Absent Teacher</label>
        <select
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium"
        >
          {school.teachers.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold text-slate-700 mb-1">Day of Absence</label>
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium"
        >
          {school.workingDays.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold text-slate-700 mb-1">Reason</label>
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
        />
      </div>

      <button
        onClick={() => onAddAbsence(teacherId, day, reason)}
        className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition cursor-pointer"
      >
        Mark Absent & Rank Substitutes
      </button>
    </div>
  );
}

// ==========================================
// SUB-COMPONENT: ADMIN SETUP & RULES PANEL
// ==========================================
function AdminSetupPanel({ school, updateSchool, onRunSolver }) {
  const [newClassName, setNewClassName] = useState('');
  const [newClassGrade, setNewClassGrade] = useState('Grade 6');
  const [newClassTier, setNewClassTier] = useState('Primary');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Column 1: School Rules & Activity Block */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-600" />
          <span>1. School-Wide Scheduling Rules</span>
        </h3>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Weekly Activity Block Day</label>
            <select
              value={school.rules.activityDay}
              onChange={(e) => {
                updateSchool(s => ({
                  ...s,
                  rules: { ...s.rules, activityDay: e.target.value }
                }));
              }}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
            >
              {school.workingDays.map(d => (
                <option key={d} value={d}>{d} (Periods 1 & 2 Locked)</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="font-bold text-emerald-950">Primary Cutoff</div>
              <div className="text-emerald-700 mt-0.5">12:00 PM (4 Periods/day)</div>
            </div>
            <div className="p-3 rounded-xl bg-sky-50 border border-sky-200">
              <div className="font-bold text-sky-950">Senior Cutoff</div>
              <div className="text-sky-700 mt-0.5">02:00 PM (6 Periods/day)</div>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Hard Teacher Daily Cap (Max Periods / Day)
            </label>
            <input
              type="number"
              min={3}
              max={6}
              value={school.rules.maxTeacherPeriodsPerDay}
              onChange={(e) => {
                const val = Number(e.target.value) || 5;
                updateSchool(s => ({
                  ...s,
                  rules: { ...s.rules, maxTeacherPeriodsPerDay: val }
                }));
              }}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
            />
          </div>

          <button
            onClick={onRunSolver}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer"
          >
            Save Rules & Re-Generate Timetable
          </button>
        </div>
      </div>

      {/* Column 2: Classes & Grade Tiers */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-600" />
          <span>2. Classes & Grade Tiers ({school.classes.length})</span>
        </h3>

        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {school.classes.map(c => (
            <div key={c.id} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="font-bold text-slate-900">Class {c.name}</span> ({c.grade})
                <span className={`ml-2 px-2 py-0.5 rounded-md font-semibold ${
                  c.tier === 'Primary' ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'
                }`}>
                  {c.tier}
                </span>
              </div>
              <span className="text-slate-400">{c.room}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
          <div className="font-semibold text-slate-700">Add Class Section</div>
          <div className="grid grid-cols-3 gap-2">
            <input
              placeholder="e.g. 6A"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300"
            />
            <input
              placeholder="Grade 6"
              value={newClassGrade}
              onChange={(e) => setNewClassGrade(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300"
            />
            <select
              value={newClassTier}
              onChange={(e) => setNewClassTier(e.target.value)}
              className="px-2 py-1.5 rounded-lg border border-slate-300"
            >
              <option value="Primary">Primary</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
          <button
            onClick={() => {
              if (!newClassName.trim()) return;
              updateSchool(s => ({
                ...s,
                classes: [
                  ...s.classes,
                  {
                    id: `c-${Date.now()}`,
                    name: newClassName.trim(),
                    grade: newClassGrade,
                    tier: newClassTier,
                    room: `Room ${s.classes.length + 105}`
                  }
                ]
              }));
              setNewClassName('');
            }}
            className="w-full py-2 rounded-xl bg-slate-900 text-white font-semibold cursor-pointer"
          >
            + Add Class Section
          </button>
        </div>
      </div>

      {/* Column 3: Subjects & Weekly Frequencies */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <span>3. Subjects & Weekly Frequencies</span>
        </h3>
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1 text-xs">
          {school.subjects.map(sub => (
            <div key={sub.id} className="p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span>{sub.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded uppercase ${
                    sub.type === 'activity' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {sub.type}
                  </span>
                </div>
                <div className="text-slate-500 mt-0.5">
                  Primary: <strong>{sub.freqPrimary}/wk</strong> • Senior: <strong>{sub.freqSenior}/wk</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SUB-COMPONENT: PRODUCTION ROADMAP GUIDE
// ==========================================
function WhatRemainsGuide() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Project Delivery Handover</span>
        <h2 className="text-xl font-bold text-slate-900 mt-1">
          What Has Been Built vs. What Remains for You to Do Yourself
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          This interactive frontend prototype implements all core workflows, role portals, constraint validation, and the substitute ranking algorithm in-browser. To turn this into a live, multi-school SaaS product in production (as outlined in Sections 7–10 of your `.docx`), here is your step-by-step checklist:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="font-bold text-sm text-slate-900">1. Backend API & PostgreSQL Multi-Tenancy (Phase 0 & 2)</div>
          <p className="text-slate-600 leading-relaxed">
            Right now, state is stored in React memory. You need to set up a <strong>PostgreSQL</strong> database with tables keyed by <code>school_id</code> (Row-Level Security) and expose CRUD REST endpoints using <strong>Python + FastAPI</strong>.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="font-bold text-sm text-slate-900">2. Google OR-Tools CP-SAT Solver Service (Phase 1)</div>
          <p className="text-slate-600 leading-relaxed">
            While our in-browser JS constraint solver handles 4–10 classes easily, large schools with 40+ classes and 80+ teachers require <strong>Google OR-Tools (`ortools.sat.python.cp_model`)</strong> running on your FastAPI backend so complex mathematical optimization finishes in seconds.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="font-bold text-sm text-slate-900">3. Real Authentication & Role-Based Access (RBAC)</div>
          <p className="text-slate-600 leading-relaxed">
            Replace the top Role Switcher bar with real JWT/OAuth login (e.g., Clerk, Supabase Auth, or NextAuth) so Teachers can only view their own schedule and Students/Parents can only view their assigned Class Section.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="font-bold text-sm text-slate-900">4. Open Product Decisions from Section 10 of Your Docx</div>
          <p className="text-slate-600 leading-relaxed">
            Before piloting with your first school, finalize: (a) your tie-breaker rule when two free teachers have the exact same number of free periods, (b) SMS/WhatsApp/Email notifications (Twilio/Resend) when a substitute is assigned, and (c) Docker deployment on Render or Railway.
          </p>
        </div>
      </div>
    </div>
  );
}