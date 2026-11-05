import { ArrowRight, Cpu, Calendar, ShieldCheck, Users, Layers, Sparkles, DoorOpen, BookOpen, ListChecks } from 'lucide-react';
import type { TimetableApp } from '../../hooks/useTimetableApp';
import { Badge, Button, Card } from '../../components/ui/primitives';

export function OverviewTab({ app }: { app: TimetableApp }) {
  const { activeSchool, currentSchedule, setAdminTab, setWizardStep, runSolver, isSyncing } = app;

  const totalClasses = activeSchool.classes.length;
  const totalTeachers = activeSchool.teachers.length;
  const totalSubjects = activeSchool.subjects.length;
  const totalRooms = (activeSchool as any).rooms?.length || 10;
  const totalAssignments = (activeSchool.assignments || []).length;
  const totalEntries = Object.keys(currentSchedule.entries || {}).length;

  const stats = [
    { label: 'Classes', value: totalClasses, detail: 'Primary & Senior', icon: Users, tint: 'text-brand-700 bg-brand-50' },
    { label: 'Teachers', value: totalTeachers, detail: 'Teaching staff', icon: Users, tint: 'text-subject-sky-text bg-subject-sky-bg' },
    { label: 'Subjects', value: totalSubjects, detail: 'Catalog entries', icon: BookOpen, tint: 'text-subject-plum-text bg-subject-plum-bg' },
    { label: 'Rooms', value: totalRooms, detail: 'Registered spaces', icon: DoorOpen, tint: 'text-subject-lime-text bg-subject-lime-bg' },
    { label: 'Assignments', value: totalAssignments, detail: 'Teacher bindings', icon: ListChecks, tint: 'text-subject-orange-text bg-subject-orange-bg' },
    { label: 'Scheduled slots', value: totalEntries, detail: 'Current schedule', icon: Calendar, tint: 'text-brand-700 bg-brand-50' },
  ];

  return (
    <div className="w-full min-w-0 space-y-4 sm:space-y-5 animate-in fade-in duration-200">
      <Card className="flex flex-col gap-4 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="min-w-0">
          <Badge className="border-brand-100 bg-brand-50 text-brand-700">
            <Sparkles className="mr-1 h-3.5 w-3.5" aria-hidden="true" />Admin overview
          </Badge>
          <h1 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{activeSchool.name}</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            Continue school setup, review your schedule, and publish timetable updates.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <Button
            variant="primary"
            onClick={() => { setAdminTab('wizard'); setWizardStep(8); }}
            className="w-full justify-center gap-2 sm:w-auto"
          >
            <span>Continue setup</span><ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            onClick={() => runSolver()}
            disabled={isSyncing}
            className="w-full justify-center gap-2 sm:w-auto"
          >
            <Cpu className="h-4 w-4 text-brand-600" />
            <span>{isSyncing ? 'Solving…' : 'Generate timetable'}</span>
          </Button>
        </div>
      </Card>

      <section aria-label="School overview statistics" className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {stats.map(({ label, value, detail, icon: Icon, tint }) => (
          <Card key={label} className="min-w-0 rounded-xl p-3 sm:p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-600">{label}</span>
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${tint}`}>
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-2 text-2xl font-bold leading-none text-slate-900">{value}</div>
            <div className="mt-1 text-xs text-slate-600">{detail}</div>
          </Card>
        ))}
      </section>

      <section aria-label="Timetable workflow" className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-3">
        <Card className="min-w-0 space-y-3 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <Badge className="border-emerald-200 bg-emerald-50 text-emerald-800">Setup</Badge>
            <Users className="h-5 w-5 text-emerald-700" aria-hidden="true" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Configure school details</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Set bell schedules, classes, staff, rooms, subjects, and teacher assignments in the setup wizard.
          </p>
          <Button variant="ghost" onClick={() => { setAdminTab('wizard'); setWizardStep(1); }} className="justify-start gap-1 px-0 text-brand-700">
            <span>Open setup wizard</span><ArrowRight className="h-4 w-4" />
          </Button>
        </Card>

        <Card className="min-w-0 space-y-3 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <Badge className="border-brand-100 bg-brand-50 text-brand-700">Scheduling</Badge>
            <Cpu className="h-5 w-5 text-brand-700" aria-hidden="true" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Build the timetable</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Generate a schedule, review class and teacher views, and resolve conflicts in the Timetable Studio.
          </p>
          <Button variant="ghost" onClick={() => setAdminTab('studio')} className="justify-start gap-1 px-0 text-brand-700">
            <span>Open Timetable Studio</span><ArrowRight className="h-4 w-4" />
          </Button>
        </Card>

        <Card className="min-w-0 space-y-3 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <Badge className="border-slate-200 bg-slate-50 text-slate-700">Governance</Badge>
            <ShieldCheck className="h-5 w-5 text-slate-700" aria-hidden="true" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Review and publish</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Approve versions, review the audit trail, and publish schedules to teacher and student portals.
          </p>
          <Button variant="ghost" onClick={() => setAdminTab('versions')} className="justify-start gap-1 px-0 text-brand-700">
            <span>Manage versions</span><ArrowRight className="h-4 w-4" />
          </Button>
        </Card>
      </section>
    </div>
  );
}
