import { useState, useMemo } from 'react';
import { Pin, Ban, Plus, Trash2, ShieldAlert, Sparkles, Building2, Users, Layers } from 'lucide-react';
import type { School, PinnedLesson, BlockedSlot } from '../../domain/types';
import type { TimetableApp } from '../../hooks/useTimetableApp';
import { sortClasses, sortTeachers } from '../../utils/sorting';
import { Badge, Button, Card, Input, Select } from '../../components/ui/primitives';

interface Props {
  school: School;
  app?: TimetableApp;
}

export function SpecialRulesCard({ school, app }: Props) {
  const [activeTab, setActiveTab] = useState<'pinned' | 'blocked'>('pinned');

  const sortedClasses = useMemo(() => sortClasses(school.classes), [school.classes]);
  const sortedTeachers = useMemo(() => sortTeachers(school.teachers), [school.teachers]);

  // Pinned Lesson Form State
  const [pinClassId, setPinClassId] = useState(sortedClasses[0]?.id || school.classes[0]?.id || '');
  const [pinSubjectId, setPinSubjectId] = useState(school.subjects[0]?.id || '');
  const [pinTeacherId, setPinTeacherId] = useState(sortedTeachers[0]?.id || school.teachers[0]?.id || '');
  const [pinDay, setPinDay] = useState(school.workingDays[0] || 'Monday');
  const [pinPeriod, setPinPeriod] = useState<number>(1);
  const [isPinSubmitting, setIsPinSubmitting] = useState(false);

  // Blocked Slot Form State
  const [blockScope, setBlockScope] = useState<'school' | 'grade' | 'class'>('school');
  const [blockScopeId, setBlockScopeId] = useState('');
  const [blockDay, setBlockDay] = useState(school.workingDays[0] || 'Monday');
  const [blockPeriod, setBlockPeriod] = useState<number>(1);
  const [blockLabel, setBlockLabel] = useState('');
  const [isBlockSubmitting, setIsBlockSubmitting] = useState(false);

  const pinnedLessons: PinnedLesson[] = school.pinnedLessons || [];
  const blockedSlots: BlockedSlot[] = school.blockedSlots || [];

  // Determine periods available from school rules
  const maxPeriods = school.rules?.seniorEndPeriod || 6;
  const periodOptions = Array.from({ length: maxPeriods }, (_, i) => i + 1);

  // Auto-sync teacher for selected class + subject if assignment exists
  const matchingAssignment = useMemo(() => {
    return (school.assignments || []).find(
      a => a.classId === pinClassId && a.subjectId === pinSubjectId
    );
  }, [school.assignments, pinClassId, pinSubjectId]);

  const handleClassChange = (newClassId: string) => {
    setPinClassId(newClassId);
    const asgn = (school.assignments || []).find(
      a => a.classId === newClassId && a.subjectId === pinSubjectId
    );
    if (asgn) setPinTeacherId(asgn.teacherId);
  };

  const handleSubjectChange = (newSubId: string) => {
    setPinSubjectId(newSubId);
    const asgn = (school.assignments || []).find(
      a => a.classId === pinClassId && a.subjectId === newSubId
    );
    if (asgn) setPinTeacherId(asgn.teacherId);
  };

  const handleAddPin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinClassId || !pinSubjectId || !pinTeacherId || !pinDay || !pinPeriod) return;

    setIsPinSubmitting(true);
    try {
      if (app?.addPinnedLesson) {
        await app.addPinnedLesson({
          classId: pinClassId,
          subjectId: pinSubjectId,
          teacherId: matchingAssignment?.teacherId || pinTeacherId,
          day: pinDay,
          period: Number(pinPeriod),
        });
      }
    } finally {
      setIsPinSubmitting(false);
    }
  };

  const handleDeletePin = async (pinId: string) => {
    if (app?.deletePinnedLesson) {
      await app.deletePinnedLesson(pinId);
    }
  };

  const handleAddBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockLabel.trim() || !blockDay || !blockPeriod) return;

    setIsBlockSubmitting(true);
    try {
      if (app?.addBlockedSlot) {
        await app.addBlockedSlot({
          scope: blockScope,
          scopeId: blockScope === 'school' ? null : blockScopeId || null,
          day: blockDay,
          period: Number(blockPeriod),
          label: blockLabel.trim(),
        });
      }
      setBlockLabel('');
    } finally {
      setIsBlockSubmitting(false);
    }
  };

  const handleDeleteBlock = async (slotId: string) => {
    if (app?.deleteBlockedSlot) {
      await app.deleteBlockedSlot(slotId);
    }
  };

  // Grade list derived from classes
  const grades = useMemo(() => {
    const set = new Set<string>();
    school.classes.forEach(c => { if (c.grade) set.add(c.grade); });
    return Array.from(set).sort();
  }, [school.classes]);

  return (
    <Card className="w-full min-w-0 rounded-card p-4 sm:p-5 space-y-4 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
        <div className="space-y-0.5">
          <h3 className="font-bold text-base text-neutral-900 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rule-600" />
            <span>Special Rules &amp; Fixed Constraints (Step 9)</span>
          </h3>
          <p className="text-xs text-neutral-500">
            Hard administrative constraints. Pinned lessons force exact placements; blocked slots forbid scheduling.
          </p>
        </div>

        {/* Tab switch */}
        <div className="inline-flex rounded-soft bg-neutral-100 p-1">
          <Button
            type="button"
            onClick={() => setActiveTab('pinned')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-control text-xs font-semibold transition cursor-pointer ${
              activeTab === 'pinned'
                ? 'bg-surface text-rule-700 shadow-2xs font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Pin className="w-3.5 h-3.5" />
            <span>Pinned Lessons ({pinnedLessons.length})</span>
          </Button>
          <Button
            type="button"
            onClick={() => setActiveTab('blocked')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-control text-xs font-semibold transition cursor-pointer ${
              activeTab === 'blocked'
                ? 'bg-surface text-danger-700 shadow-2xs font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Ban className="w-3.5 h-3.5" />
            <span>Blocked Slots ({blockedSlots.length})</span>
          </Button>
        </div>
      </div>

      {activeTab === 'pinned' ? (
        <div className="space-y-4">
          {/* Pinned Lesson Form */}
          <form onSubmit={handleAddPin} className="bg-rule-50/50 rounded-soft p-3.5 border border-rule-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rule-900 flex items-center gap-1.5">
                <Pin className="w-3.5 h-3.5 text-rule-600" />
                <span>Pin a Mandatory Lesson to an Exact Slot</span>
              </span>
              {matchingAssignment && (
                <Badge className="text-xs font-semibold text-rule-700 bg-rule-100/70 px-2 py-0.5 rounded-tight">
                  Assigned: {matchingAssignment.teacherName || 'Teacher assigned'}
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-neutral-600 mb-1">Class Section</label>
                <Select
                  value={pinClassId}
                  onChange={e => handleClassChange(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-control border border-neutral-300 text-xs bg-surface font-medium"
                >
                  {sortedClasses.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.grade})</option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-600 mb-1">Subject</label>
                <Select
                  value={pinSubjectId}
                  onChange={e => handleSubjectChange(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-control border border-neutral-300 text-xs bg-surface font-medium"
                >
                  {school.subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-600 mb-1">Teacher</label>
                <Select
                  value={matchingAssignment ? matchingAssignment.teacherId : pinTeacherId}
                  onChange={e => setPinTeacherId(e.target.value)}
                  disabled={Boolean(matchingAssignment)}
                  className={`w-full px-2.5 py-1.5 rounded-control border border-neutral-300 text-xs bg-surface font-medium ${
                    matchingAssignment ? 'bg-neutral-100 text-neutral-600 cursor-not-allowed' : ''
                  }`}
                >
                  {sortedTeachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-600 mb-1">Day</label>
                <Select
                  value={pinDay}
                  onChange={e => setPinDay(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-control border border-neutral-300 text-xs bg-surface font-medium"
                >
                  {school.workingDays.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-600 mb-1">Period</label>
                <Select
                  value={pinPeriod}
                  onChange={e => setPinPeriod(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-control border border-neutral-300 text-xs bg-surface font-medium"
                >
                  {periodOptions.map(p => (
                    <option key={p} value={p}>Period {p}</option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <Button
                type="submit"
                disabled={isPinSubmitting}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-soft bg-rule-600 hover:bg-rule-700 disabled:opacity-50 text-white font-semibold text-xs shadow-xs transition cursor-pointer"
              >
                <Pin className="w-3.5 h-3.5" />
                <span>Pin Lesson (Force Slot)</span>
              </Button>
            </div>
          </form>

          {/* Pinned Lessons List */}
          <div className="space-y-2">
            {pinnedLessons.length === 0 ? (
              <div className="p-4 rounded-soft border border-dashed border-neutral-200 text-center text-xs text-neutral-600">
                No pinned lessons yet. Lessons are free for the solver to optimize unless pinned above.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {pinnedLessons.map(p => (
                  <Card
                    key={p.id}
                    className="flex items-center justify-between p-3 rounded-soft border border-rule-100 bg-rule-50/20 hover:border-rule-200 transition group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-rule-900">{p.className || p.classId}</span>
                        <span className="text-neutral-600">&bull;</span>
                        <span className="font-semibold text-xs text-neutral-700">{p.subjectName || p.subjectId}</span>
                      </div>
                      <div className="text-xs text-neutral-500">
                        {p.teacherName || p.teacherId}
                      </div>
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-tight bg-rule-100 text-rule-800 text-xs font-bold">
                        <span>{p.day}</span>
                        <span>Period {p.period}</span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={() => handleDeletePin(p.id)}
                      className="opacity-60 group-hover:opacity-100 p-1 rounded-control text-neutral-600 hover:text-danger-600 hover:bg-danger-50 transition cursor-pointer"
                      title="Unpin lesson"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Blocked Slot Form */}
          <form onSubmit={handleAddBlock} className="bg-danger-50/50 rounded-soft p-3.5 border border-danger-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-danger-900 flex items-center gap-1.5">
                <Ban className="w-3.5 h-3.5 text-danger-600" />
                <span>Block a Time Slot for Assembly, Sports, or Meetings</span>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-neutral-600 mb-1">Applies To (Scope)</label>
                <Select
                  value={blockScope}
                  onChange={e => setBlockScope(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 rounded-control border border-neutral-300 text-xs bg-surface font-medium"
                >
                  <option value="school">Whole School</option>
                  <option value="grade">Specific Grade</option>
                  <option value="class">Specific Class</option>
                </Select>
              </div>

              {blockScope !== 'school' && (
                <div>
                  <label className="block text-xs font-bold text-neutral-600 mb-1">
                    {blockScope === 'grade' ? 'Select Grade' : 'Select Class'}
                  </label>
                  {blockScope === 'grade' ? (
                    <Select
                      value={blockScopeId}
                      onChange={e => setBlockScopeId(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-control border border-neutral-300 text-xs bg-surface font-medium"
                    >
                      <option value="">-- Choose Grade --</option>
                      {grades.map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </Select>
                  ) : (
                    <Select
                      value={blockScopeId}
                      onChange={e => setBlockScopeId(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-control border border-neutral-300 text-xs bg-surface font-medium"
                    >
                      <option value="">-- Choose Class --</option>
                      {sortedClasses.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </Select>
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-neutral-600 mb-1">Day</label>
                <Select
                  value={blockDay}
                  onChange={e => setBlockDay(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-control border border-neutral-300 text-xs bg-surface font-medium"
                >
                  {school.workingDays.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-600 mb-1">Period</label>
                <Select
                  value={blockPeriod}
                  onChange={e => setBlockPeriod(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-control border border-neutral-300 text-xs bg-surface font-medium"
                >
                  {periodOptions.map(p => (
                    <option key={p} value={p}>Period {p}</option>
                  ))}
                </Select>
              </div>

              <div className={blockScope === 'school' ? 'sm:col-span-2' : ''}>
                <label className="block text-xs font-bold text-neutral-600 mb-1">Activity Label</label>
                <Input
                  type="text"
                  value={blockLabel}
                  onChange={e => setBlockLabel(e.target.value)}
                  placeholder="e.g. All-School Assembly, House Sports"
                  className="w-full px-2.5 py-1.5 rounded-control border border-neutral-300 text-xs bg-surface font-medium focus:ring-2 focus:ring-danger-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <Button
                type="submit"
                disabled={isBlockSubmitting || !blockLabel.trim()}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-soft bg-danger-600 hover:bg-danger-700 disabled:opacity-50 text-white font-semibold text-xs shadow-xs transition cursor-pointer"
              >
                <Ban className="w-3.5 h-3.5" />
                <span>Block Time Slot</span>
              </Button>
            </div>
          </form>

          {/* Blocked Slots List */}
          <div className="space-y-2">
            {blockedSlots.length === 0 ? (
              <div className="p-4 rounded-soft border border-dashed border-neutral-200 bg-neutral-50/70 text-center text-sm text-neutral-700">
                No blocked slots defined. All periods are open for regular lessons.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {blockedSlots.map(b => (
                  <Card
                    key={b.id}
                    className="flex items-center justify-between p-3 rounded-soft border border-danger-100 bg-danger-50/20 hover:border-danger-200 transition group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-danger-900">{b.label}</span>
                        <Badge className="px-2 py-0.5 rounded-full text-xs font-bold bg-danger-100 text-danger-800">
                          {b.scope === 'school' ? 'All-School' : b.scope === 'grade' ? `Grade: ${b.scopeId || 'All'}` : `Class: ${b.scopeId || 'Class'}`}
                        </Badge>
                      </div>
                      <div className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-600">
                        <span>{b.day}</span>
                        <span>&bull;</span>
                        <span>Period {b.period}</span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={() => handleDeleteBlock(b.id)}
                      className="opacity-60 group-hover:opacity-100 p-1 rounded-control text-neutral-600 hover:text-danger-600 hover:bg-danger-50 transition cursor-pointer"
                      title="Remove blocked slot"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
