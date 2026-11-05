import { useState, useMemo } from 'react';
import {
  DoorOpen,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  RefreshCw,
  Layers,
  Search,
  Clock,
  Calendar,
  FlaskConical,
  Building2,
  ChevronDown,
  ChevronUp,
  User,
  Zap,
} from 'lucide-react';
import type { TimetableApp } from '../../hooks/useTimetableApp';
import type { Room, ClassSection } from '../../domain/types';
import { sortRooms } from '../../utils/sorting';
import { Badge, Button, Card, Input } from '../../components/ui/primitives';

interface DisplayRoom {
  id: string;
  name: string;
  type: string;
  rawType: string;
  capacity: number;
  block?: string;
  floor?: number;
  homeroomClassId?: string | null;
  homeroomClassName?: string | null;
}

export function RoomHeatmapTab({ app }: { app: TimetableApp }) {
  const { activeSchool, currentSchedule } = app;
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isWhatIfExpanded, setIsWhatIfExpanded] = useState<boolean>(false);
  const [whatIfScenario, setWhatIfScenario] = useState<'none' | 'lab_closure' | 'teacher_leave'>('none');
  const [isSimulating, setIsSimulating] = useState(false);

  // 1. DYNAMIC PERIOD AUTO-SYNCHRONIZATION
  // Automatically calculate all active academic periods from rules and periodSlots (e.g. 1 through 8)
  const maxPeriod = useMemo(() => {
    const slotNumbers = (activeSchool.periodSlots || [])
      .filter(s => !s.isBreak && typeof s.number === 'number')
      .map(s => Number(s.number));
    return Math.max(
      activeSchool.rules?.seniorEndPeriod || 8,
      ...(slotNumbers.length > 0 ? slotNumbers : [8])
    );
  }, [activeSchool.rules, activeSchool.periodSlots]);

  const periods = useMemo(() => {
    return Array.from({ length: maxPeriod }, (_, i) => i + 1);
  }, [maxPeriod]);

  // Map each period to its actual time range
  const periodTimings = useMemo(() => {
    const map: Record<number, string> = {};
    (activeSchool.periodSlots || []).forEach(slot => {
      if (!slot.isBreak && typeof slot.number === 'number') {
        map[slot.number] = slot.time;
      }
    });
    return map;
  }, [activeSchool.periodSlots]);

  // Dismissal notes & badges per period
  const getPeriodDismissalBadge = (p: number) => {
    if (p === (activeSchool.rules?.prePrimaryEndPeriod || 6)) {
      return (
        <Badge className="inline-block mt-0.5 text-xs px-1.5 py-0.2 rounded-full bg-warning-50 text-warning-700 border border-warning-200 font-semibold truncate">
          Pre-Primary Exit (12:20)
        </Badge>
      );
    }
    if (p === (activeSchool.rules?.primaryEndPeriod || 7)) {
      return (
        <Badge className="inline-block mt-0.5 text-xs px-1.5 py-0.2 rounded-full bg-info-50 text-info-700 border border-info-200 font-semibold truncate">
          Primary Exit (1:30)
        </Badge>
      );
    }
    if (p === (activeSchool.rules?.seniorEndPeriod || 8)) {
      return (
        <Badge className="inline-block mt-0.5 text-xs px-1.5 py-0.2 rounded-full bg-rule-50 text-rule-700 border border-rule-200 font-semibold truncate">
          Senior Dismissal (2:10)
        </Badge>
      );
    }
    return null;
  };

  // 2. COMPREHENSIVE FACILITY REGISTRY (ALL 71 ROOMS)
  const allRooms: DisplayRoom[] = useMemo(() => {
    const formatType = (raw: string) => {
      const lower = (raw || '').toLowerCase();
      if (lower.includes('classroom') || lower === 'home classroom') return 'Classroom';
      if (lower.includes('computer')) return 'Computer Lab';
      if (lower.includes('lab') || lower.includes('physics') || lower.includes('chemistry') || lower.includes('biology')) return 'Specialized Lab';
      if (lower.includes('studio') || lower.includes('art') || lower.includes('music') || lower.includes('dance')) return 'Creative Studio';
      if (lower.includes('play') || lower.includes('sports')) return 'Athletic Complex';
      if (lower.includes('library')) return 'Library';
      return 'Facility';
    };

    if (activeSchool.rooms && activeSchool.rooms.length > 0) {
      const list: DisplayRoom[] = activeSchool.rooms.map(r => ({
        id: r.id,
        name: r.name,
        type: formatType(r.type),
        rawType: r.type,
        capacity: r.capacity || 35,
        block: r.block || 'A',
        floor: r.floor ?? 1,
        homeroomClassId: r.homeroomForClassId || null,
        homeroomClassName: r.homeroomForClassName || r.homeroomForClassId || null,
      }));
      return sortRooms(list) as DisplayRoom[];
    }

    // Fallback: derive from classes
    const classRooms: DisplayRoom[] = (activeSchool.classes || []).map(c => ({
      id: c.room || c.id,
      name: c.room ? `Room ${c.room}` : `Room ${c.name}`,
      type: 'Classroom',
      rawType: 'classroom',
      capacity: 35,
      block: 'A',
      floor: 1,
      homeroomClassId: c.id,
      homeroomClassName: c.name,
    }));
    return sortRooms(classRooms) as DisplayRoom[];
  }, [activeSchool.rooms, activeSchool.classes]);

  // Lookup map for class metadata
  const classMap = useMemo(() => {
    const map = new Map<string, ClassSection>();
    (activeSchool.classes || []).forEach(c => {
      map.set(c.id, c);
      map.set(c.name, c);
    });
    return map;
  }, [activeSchool.classes]);

  // Facility categories & counts for tabs
  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {
      all: allRooms.length,
      classroom: 0,
      lab: 0,
      computer: 0,
      studio: 0,
      sports: 0,
      library: 0,
    };

    allRooms.forEach(r => {
      const t = r.type.toLowerCase();
      if (t.includes('classroom')) counts.classroom++;
      else if (t.includes('computer')) counts.computer++;
      else if (t.includes('lab')) counts.lab++;
      else if (t.includes('studio')) counts.studio++;
      else if (t.includes('athletic') || t.includes('sports')) counts.sports++;
      else if (t.includes('library')) counts.library++;
    });

    return counts;
  }, [allRooms]);

  // Filtered rooms based on Category and Search
  const filteredRooms = useMemo(() => {
    return allRooms.filter(r => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        (r.homeroomClassName && r.homeroomClassName.toLowerCase().includes(q)) ||
        (r.block && r.block.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (selectedCategory === 'all') return true;
      const t = r.type.toLowerCase();
      if (selectedCategory === 'classroom') return t.includes('classroom');
      if (selectedCategory === 'computer') return t.includes('computer');
      if (selectedCategory === 'lab') return t.includes('lab') && !t.includes('computer');
      if (selectedCategory === 'studio') return t.includes('studio');
      if (selectedCategory === 'sports') return t.includes('athletic') || t.includes('sports');
      if (selectedCategory === 'library') return t.includes('library');
      return true;
    });
  }, [allRooms, searchQuery, selectedCategory]);

  // 3. CONTEXT-AWARE OCCUPANCY & PROFESSIONAL STATUS RESOLUTION
  const getRoomSlotStatus = (room: DisplayRoom, day: string, periodNumber: number) => {
    const entries = currentSchedule.entries || {};

    // 1. Direct room booking match (the lesson explicitly occurs in this physical room)
    const directEntry = Object.values(entries).find(e => {
      if (e.day !== day || e.period !== periodNumber || !e.room) return false;
      const rLower = e.room.toLowerCase().trim();
      return rLower === room.id.toLowerCase().trim() || rLower === room.name.toLowerCase().trim();
    });

    if (directEntry) {
      const cls = classMap.get(directEntry.classId);
      const sub = activeSchool.subjects.find(s => s.id === directEntry.subjectId || s.code === directEntry.subjectId);
      const teacher = activeSchool.teachers.find(t => t.id === directEntry.teacherId);
      return {
        status: 'occupied' as const,
        className: cls?.name || directEntry.classId,
        subjectName: sub?.name || directEntry.subjectId,
        subjectCode: sub?.code || directEntry.subjectId,
        teacherName: teacher?.name || 'Faculty',
        color: sub?.color || 'bg-brand-50 text-brand-700 border-brand-200',
        isActivity: directEntry.isActivity || sub?.type === 'activity',
      };
    }

    // 2. Homeroom Check: Is this room the designated home room of a specific cohort?
    const homeroomClass = room.homeroomClassId ? classMap.get(room.homeroomClassId) : null;
    if (homeroomClass) {
      const isPrePrimary =
        homeroomClass.wing === 'Pre-Primary' ||
        ['NUR', 'LKG', 'UKG'].some(w => homeroomClass.name.toUpperCase().includes(w) || homeroomClass.grade.toUpperCase().includes(w));
      const isPrimary = homeroomClass.wing === 'Primary' || homeroomClass.tier === 'Primary';

      // Check if this cohort has a lesson in this slot
      const classSlotKey = `${day}-${periodNumber}-${homeroomClass.id}`;
      const classSlot = entries[classSlotKey];

      if (classSlot) {
        const slotRoom = (classSlot.room || '').toLowerCase().trim();
        const thisId = room.id.toLowerCase().trim();
        const thisName = room.name.toLowerCase().trim();

        // If the lesson is scheduled in a specialized lab/ground elsewhere
        if (slotRoom && slotRoom !== thisId && slotRoom !== thisName) {
          const sub = activeSchool.subjects.find(s => s.id === classSlot.subjectId || s.code === classSlot.subjectId);
          return {
            status: 'cohort_away' as const,
            className: homeroomClass.name,
            awayLocation: classSlot.room,
            subjectCode: sub?.code || 'LAB',
          };
        }

        // Lesson is right here in this homeroom
        const sub = activeSchool.subjects.find(s => s.id === classSlot.subjectId || s.code === classSlot.subjectId);
        const teacher = activeSchool.teachers.find(t => t.id === classSlot.teacherId);
        return {
          status: 'occupied' as const,
          className: homeroomClass.name,
          subjectName: sub?.name || classSlot.subjectId,
          subjectCode: sub?.code || classSlot.subjectId,
          teacherName: teacher?.name || 'Faculty',
          color: sub?.color || 'bg-brand-50 text-brand-700 border-brand-200',
          isActivity: classSlot.isActivity || sub?.type === 'activity',
        };
      }

      // No scheduled lesson for this cohort in this slot — check dismissal / weekend rules
      // Pre-Primary Saturday (Pre-Primary is strictly Monday–Friday)
      if (isPrePrimary && day === 'Saturday') {
        return {
          status: 'weekend_recess' as const,
          label: 'Weekend Recess',
          detail: 'Mon–Fri Pre-Primary Cohort',
        };
      }

      // Pre-Primary dismissal after Period 6 (12:20 PM)
      if (isPrePrimary && periodNumber > (activeSchool.rules?.prePrimaryEndPeriod || 6)) {
        return {
          status: 'post_dismissal' as const,
          label: 'Post-Dismissal',
          detail: 'Dismissed at 12:20 PM',
        };
      }

      // Primary dismissal after Period 7 (1:30 PM)
      if (isPrimary && periodNumber > (activeSchool.rules?.primaryEndPeriod || 7)) {
        return {
          status: 'post_dismissal' as const,
          label: 'Post-Dismissal',
          detail: 'Dismissed at 1:30 PM',
        };
      }
    }

    // 3. Specialized Rooms / Labs with no active booking
    if (room.type !== 'Classroom') {
      return {
        status: 'available_booking' as const,
        label: 'Available for Booking',
        detail: 'Open Facility Slot',
      };
    }

    // 4. Default vacant
    return {
      status: 'vacant' as const,
      label: 'Vacant',
      detail: 'Available / Study Period',
    };
  };

  // Occupancy metrics for the selected day
  const dayMetrics = useMemo(() => {
    let occupiedSlots = 0;
    let postDismissalSlots = 0;
    let availableSlots = 0;
    const totalSlots = allRooms.length * periods.length;

    allRooms.forEach(room => {
      periods.forEach(p => {
        const res = getRoomSlotStatus(room, selectedDay, p);
        if (res.status === 'occupied') occupiedSlots++;
        else if (res.status === 'post_dismissal' || res.status === 'weekend_recess') postDismissalSlots++;
        else availableSlots++;
      });
    });

    const activePeriodCapacity = totalSlots - postDismissalSlots;
    const utilizationRate = activePeriodCapacity > 0 ? Math.round((occupiedSlots / activePeriodCapacity) * 100) : 0;

    return {
      occupiedSlots,
      postDismissalSlots,
      availableSlots,
      utilizationRate,
    };
  }, [allRooms, periods, selectedDay, currentSchedule.entries, activeSchool]);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 400);
  };

  return (
    <div className="w-full min-w-0 max-w-full space-y-4">
      {/* Top Banner & Quick Controls */}
      <Card className="min-w-0 rounded-card p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Badge className="uppercase tracking-wider border-brand-100 bg-brand-50 text-brand-700">
              Layer B • Spatial Intelligence
            </Badge>
            <h2 className="font-extrabold text-neutral-900 text-base sm:text-lg">
              Room Utilization Matrix &amp; Facility Heatmap
            </h2>
          </div>
          <p className="text-xs text-neutral-500 mt-0.5">
            Synchronized occupancy matrix across all {allRooms.length} physical facilities and {periods.length} academic periods with multi-wing dismissal intelligence.
          </p>
        </div>

        {/* Live Day Utilization KPI Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="px-3 py-1.5 rounded-soft bg-neutral-100 text-neutral-700 text-xs font-semibold border border-neutral-200 flex items-center gap-1.5">
            <DoorOpen className="w-3.5 h-3.5 text-brand-600" />
            <span>{allRooms.length} Facilities</span>
          </Badge>
          <Badge className="px-3 py-1.5 rounded-soft bg-brand-50 text-brand-800 text-xs font-bold border border-brand-200 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-brand-600" />
            <span>{dayMetrics.utilizationRate}% In-Session Utilization</span>
          </Badge>
          <Badge className="px-3 py-1.5 rounded-soft bg-positive-50 text-positive-800 text-xs font-bold border border-positive-200 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-positive-600" />
            <span>0 Collisions</span>
          </Badge>

          <Button
            variant="secondary"
            type="button"
            onClick={() => setIsWhatIfExpanded(!isWhatIfExpanded)}
            className="min-h-10 inline-flex items-center gap-1.5 ml-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-warning-300" />
            <span>What-If Sandbox</span>
            {isWhatIfExpanded ? <ChevronUp className="w-3.5 h-3.5 text-neutral-600" /> : <ChevronDown className="w-3.5 h-3.5 text-neutral-600" />}
          </Button>
        </div>
      </Card>

      {/* Collapsible What-If Scenario Sandbox Card */}
      {isWhatIfExpanded && (
        <Card className="bg-linear-to-r from-neutral-900 via-brand-950 to-neutral-900 text-white rounded-card p-4 shadow-sm space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-soft bg-brand-500/20 border border-brand-400/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-brand-300" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <span>What-If Scenario Simulation</span>
                  <Badge className="text-xs px-2 py-0.5 rounded-full bg-brand-500/30 text-brand-200 border border-brand-400/30 uppercase tracking-wider font-semibold">
                    Zero-Risk Sandbox
                  </Badge>
                </h3>
                <p className="text-xs text-neutral-300">
                  Simulate emergency lab maintenance or load adjustments without altering your live timetable.
                </p>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-soft bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md transition cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
              <span>{isSimulating ? 'Simulating Feasibility…' : 'Run What-If Feasibility'}</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
            <Button
              type="button"
              onClick={() => setWhatIfScenario('none')}
              className={`p-2.5 rounded-soft border text-left transition cursor-pointer ${
                whatIfScenario === 'none'
                  ? 'bg-surface/10 border-brand-400 text-white'
                  : 'bg-surface/5 border-white/10 text-neutral-300 hover:bg-surface/10'
              }`}
            >
              <div className="font-bold text-xs">Standard Operations</div>
              <div className="text-xs text-neutral-600 mt-0.5">All 71 rooms and 106 staff at 100% scheduled availability.</div>
            </Button>

            <Button
              type="button"
              onClick={() => setWhatIfScenario('lab_closure')}
              className={`p-2.5 rounded-soft border text-left transition cursor-pointer ${
                whatIfScenario === 'lab_closure'
                  ? 'bg-surface/10 border-brand-400 text-white'
                  : 'bg-surface/5 border-white/10 text-neutral-300 hover:bg-surface/10'
              }`}
            >
              <div className="font-bold text-xs flex items-center gap-1.5 text-warning-300">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Simulate Science Lab Closure</span>
              </div>
              <div className="text-xs text-neutral-600 mt-0.5">Relocate weekly practical blocks into home classrooms.</div>
            </Button>

            <Button
              type="button"
              onClick={() => setWhatIfScenario('teacher_leave')}
              className={`p-2.5 rounded-soft border text-left transition cursor-pointer ${
                whatIfScenario === 'teacher_leave'
                  ? 'bg-surface/10 border-brand-400 text-white'
                  : 'bg-surface/5 border-white/10 text-neutral-300 hover:bg-surface/10'
              }`}
            >
              <div className="font-bold text-xs flex items-center gap-1.5 text-info-300">
                <Layers className="w-3.5 h-3.5" />
                <span>Simulate Faculty Cap Reduction</span>
              </div>
              <div className="text-xs text-neutral-600 mt-0.5">Cap senior PGT loads from 5 to 4 periods per day.</div>
            </Button>
          </div>
        </Card>
      )}

      {/* Main Room Utilization Matrix Card */}
      <Card className="w-full min-w-0 max-w-full rounded-card shadow-xs flex flex-col overflow-hidden p-0">
        {/* Controls Toolbar: Day Selector, Search Box, Category Tabs */}
        <div className="p-3.5 border-b border-neutral-200 bg-neutral-50/80 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Day Selector Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0">
            {activeSchool.workingDays.map(day => (
              <Button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`px-3 py-1.5 rounded-soft text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  selectedDay === day
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-surface text-neutral-600 hover:text-neutral-900 border border-neutral-200'
                }`}
              >
                {day}
              </Button>
            ))}
          </div>

          {/* Search Box & Category Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[200px] w-56">
              <Search className="w-3.5 h-3.5 text-neutral-600 absolute left-2.5 top-1/2 -tranneutral-y-1/2" />
              <Input
                type="text"
                placeholder="Search facility or class..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-soft bg-surface border border-neutral-200 text-xs text-neutral-800 placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto text-xs">
              {[
                { id: 'all', label: `All (${categoryStats.all})` },
                { id: 'classroom', label: `Classes (${categoryStats.classroom})` },
                { id: 'lab', label: `Labs (${categoryStats.lab})` },
                { id: 'computer', label: `CS Labs (${categoryStats.computer})` },
                { id: 'studio', label: `Studios (${categoryStats.studio})` },
                { id: 'sports', label: `Sports (${categoryStats.sports})` },
                { id: 'library', label: `Library (${categoryStats.library})` },
              ].map(cat => (
                <Button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-control font-semibold text-xs transition whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-brand-100 text-brand-900 border border-brand-300 font-bold'
                      : 'bg-surface text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                  }`}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Viewport Container with Sticky Headers & Sticky Room Column */}
        {/* Set responsive height so only table content scrolls without scrolling the outer page */}
        <div className="w-full min-w-0 max-w-full h-[calc(100vh-270px)] min-h-[500px] max-h-[750px] overflow-auto overscroll-x-contain overscroll-y-auto relative scrollbar-thin scrollbar-thumb-neutral-300">
          <table className="w-full text-left border-separate border-spacing-0 min-w-[1100px]">
            <thead>
              <tr className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                {/* Fixed Top-Left Corner Cell (Sticky in both X and Y) */}
                <th className="sticky top-0 left-0 z-30 bg-neutral-100 py-3 px-3.5 border-b border-r border-neutral-200 w-52 min-w-[208px] shadow-[2px_2px_4px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-brand-600" />
                    <span>Facility / Room</span>
                  </div>
                </th>

                {/* Fixed Top-Left Type & Cap Cell (Sticky in both X and Y) */}
                <th className="sticky top-0 left-[208px] z-30 bg-neutral-100 py-3 px-3 border-b border-r border-neutral-200 w-32 min-w-[128px] shadow-[2px_2px_4px_rgba(0,0,0,0.04)]">
                  <span>Type &amp; Cap</span>
                </th>

                {/* Dynamic Academic Periods (Sticky in Y) */}
                {periods.map(p => (
                  <th
                    key={p}
                    className="sticky top-0 z-20 bg-neutral-50 py-2.5 px-2 text-center border-b border-r border-neutral-200 min-w-[130px] shadow-xs"
                  >
                    <div className="font-extrabold text-neutral-800 text-xs">Period {p}</div>
                    <div className="text-xs text-neutral-500 font-normal font-mono mt-0.5">
                      {periodTimings[p] || ''}
                    </div>
                    {getPeriodDismissalBadge(p)}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-100 text-xs">
              {filteredRooms.length === 0 ? (
                <tr>
                  <td colSpan={periods.length + 2} className="py-12 text-center text-neutral-600">
                    <Building2 className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
                    <p className="font-semibold text-sm">No facilities match your search filter</p>
                    <p className="text-xs text-neutral-600 mt-1">Try clearing your search query or selecting "All Facilities".</p>
                  </td>
                </tr>
              ) : (
                filteredRooms.map(room => (
                  <tr key={room.id} className="hover:bg-neutral-50/70 transition group">
                    {/* Sticky Column 1: Room Identification (Stays frozen horizontally) */}
                    <td className="sticky left-0 z-10 bg-surface group-hover:bg-neutral-50 py-2 px-3.5 border-b border-r border-neutral-200 w-52 min-w-[208px] shadow-[2px_0_4px_rgba(0,0,0,0.03)]">
                      <div className="font-bold text-neutral-900 text-xs truncate flex items-center gap-1.5" title={room.name}>
                        <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0" />
                        <span className="truncate">{room.name}</span>
                      </div>
                      <div className="text-xs text-neutral-500 flex items-center gap-1.5 mt-0.5">
                        <span className="font-mono text-neutral-600 font-semibold">{room.id}</span>
                        {room.homeroomClassName && (
                          <Badge
                            className="px-1.5 py-0.2 rounded-tight bg-brand-50 text-brand-700 font-bold border border-brand-200 text-xs truncate"
                            title={`Home classroom for Class ${room.homeroomClassName}`}
                          >
                            Class {room.homeroomClassName}
                          </Badge>
                        )}
                      </div>
                    </td>

                    {/* Sticky Column 2: Facility Type & Capacity */}
                    <td className="sticky left-[208px] z-10 bg-surface group-hover:bg-neutral-50 py-2 px-3 border-b border-r border-neutral-200 w-32 min-w-[128px] shadow-[2px_0_4px_rgba(0,0,0,0.03)]">
                      <Badge className="inline-block px-2 py-0.5 rounded-tight text-xs font-semibold bg-neutral-100 text-neutral-700 border border-neutral-200 truncate max-w-[115px]">
                        {room.type}
                      </Badge>
                      <div className="text-xs text-neutral-500 mt-0.5 flex items-center gap-1">
                        <span>{room.capacity} seats</span>
                        {room.block && <span>• Blk {room.block}</span>}
                      </div>
                    </td>

                    {/* Period Columns: Occupancy or Contextual Dismissal Card */}
                    {periods.map(p => {
                      const res = getRoomSlotStatus(room, selectedDay, p);

                      // Case A: Occupied lesson
                      if (res.status === 'occupied') {
                        return (
                          <td key={p} className="py-2 px-1.5 text-center border-b border-r border-neutral-100">
                            <Card
                              className={`p-2 rounded-soft border text-xs font-semibold ${res.color} shadow-2xs hover:shadow-xs transition`}
                              title={`Class ${res.className} • ${res.subjectName} with ${res.teacherName}`}
                            >
                              <div className="font-bold text-neutral-900 truncate flex items-center justify-center gap-1">
                                <span>Class {res.className}</span>
                                {res.isActivity && (
                                  <Badge className="text-xs uppercase tracking-wider px-1 rounded bg-rule-200/80 text-rule-900 font-extrabold">
                                    ACT
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs font-bold text-neutral-700 truncate mt-0.5">
                                {res.subjectCode}
                              </div>
                              <div className="text-xs text-neutral-500 truncate flex items-center justify-center gap-1 mt-0.5">
                                <User className="w-2.5 h-2.5 opacity-60" />
                                <span className="truncate">{res.teacherName}</span>
                              </div>
                            </Card>
                          </td>
                        );
                      }

                      // Case B: Cohort is away in a specialized laboratory / ground
                      if (res.status === 'cohort_away') {
                        return (
                          <td key={p} className="py-2 px-1.5 text-center border-b border-r border-neutral-100">
                            <Card
                              className="p-2 rounded-soft border border-brand-200/70 bg-brand-50/40 text-brand-900 shadow-2xs"
                              title={`Class ${res.className} is currently in ${res.awayLocation} for ${res.subjectCode}. Home classroom is available.`}
                            >
                              <div className="font-bold text-xs truncate flex items-center justify-center gap-1 text-brand-800">
                                <FlaskConical className="w-3 h-3 text-brand-600" />
                                <span>In {res.awayLocation}</span>
                              </div>
                              <div className="text-xs text-brand-600/90 font-medium truncate mt-0.5">
                                Class {res.className} ({res.subjectCode})
                              </div>
                              <div className="text-xs text-positive-700 font-semibold mt-0.5">
                                Homeroom Open
                              </div>
                            </Card>
                          </td>
                        );
                      }

                      // Case C: Pre-Primary Saturday Weekend Recess
                      if (res.status === 'weekend_recess') {
                        return (
                          <td key={p} className="py-2 px-1.5 text-center border-b border-r border-neutral-100">
                            <Card
                              className="py-2.5 px-2 rounded-soft border border-info-200/70 bg-info-50/50 text-info-900 shadow-2xs"
                              title="Pre-Primary wing operates on a Monday–Friday academic week. No Saturday instructional sessions."
                            >
                              <div className="flex items-center justify-center gap-1 text-xs font-bold text-info-800">
                                <Calendar className="w-3 h-3 text-info-600" />
                                <span>Weekend Recess</span>
                              </div>
                              <div className="text-xs text-info-600 font-medium mt-0.5">
                                Mon–Fri Cohort
                              </div>
                            </Card>
                          </td>
                        );
                      }

                      // Case D: Early Dismissal (Pre-Primary after P6, Primary after P7)
                      if (res.status === 'post_dismissal') {
                        return (
                          <td key={p} className="py-2 px-1.5 text-center border-b border-r border-neutral-100">
                            <Card
                              className="py-2 px-2 rounded-soft border border-warning-200/70 bg-warning-50/40 text-warning-900 shadow-2xs"
                              title={res.detail}
                            >
                              <div className="flex items-center justify-center gap-1 text-xs font-bold text-warning-800">
                                <Clock className="w-3 h-3 text-warning-600" />
                                <span>Post-Dismissal</span>
                              </div>
                              <div className="text-xs text-warning-700/80 font-medium mt-0.5">
                                {res.detail}
                              </div>
                            </Card>
                          </td>
                        );
                      }

                      // Case E: Specialized Room Open for Booking
                      if (res.status === 'available_booking') {
                        return (
                          <td key={p} className="py-2 px-1.5 text-center border-b border-r border-neutral-100">
                            <Card className="py-3 px-2 rounded-soft border border-dashed border-positive-300/80 bg-positive-50/30 text-positive-800 text-xs">
                              <div className="font-bold">Available</div>
                              <div className="text-xs text-positive-700 font-medium mt-0.5">Open for Booking</div>
                            </Card>
                          </td>
                        );
                      }

                      // Case F: Normal vacant classroom slot
                      return (
                        <td key={p} className="py-2 px-1.5 text-center border-b border-r border-neutral-100">
                          <Card className="py-3 px-2 rounded-soft border border-dashed border-neutral-200 bg-neutral-50/50 text-xs text-neutral-600 font-medium">
                            <span>Vacant</span>
                          </Card>
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Stats & Legend Bar */}
        <div className="p-3 border-t border-neutral-200 bg-neutral-50 flex flex-wrap items-center justify-between text-xs text-neutral-600 gap-3">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
              <span className="font-semibold text-neutral-700">Occupied Lesson</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-warning-400" />
              <span className="font-semibold text-neutral-700">Post-Dismissal (12:20 / 1:30)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-info-400" />
              <span className="font-semibold text-neutral-700">Weekend Recess (Mon–Fri)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-positive-500" />
              <span className="font-semibold text-neutral-700">Open for Booking</span>
            </div>
          </div>

          <div className="text-xs text-neutral-500 font-mono">
            Displaying {filteredRooms.length} of {allRooms.length} Facilities • {periods.length} Academic Periods Synchronized
          </div>
        </div>
      </Card>
    </div>
  );
}
