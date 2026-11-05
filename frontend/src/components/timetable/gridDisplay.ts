const SUBJECT_CELL_STYLES = [
  { legacy: 'bg-blue-50', classes: 'bg-subject-blue-bg text-subject-blue-text border-subject-blue-border print:bg-blue-50 print:text-blue-700 print:border-blue-200' },
  { legacy: 'bg-indigo-50', classes: 'bg-subject-violet-bg text-subject-violet-text border-subject-violet-border print:bg-indigo-50 print:text-indigo-700 print:border-indigo-200' },
  { legacy: 'bg-violet-50', classes: 'bg-subject-violet-bg text-subject-violet-text border-subject-violet-border print:bg-violet-50 print:text-violet-700 print:border-violet-200' },
  { legacy: 'bg-purple-50', classes: 'bg-subject-plum-bg text-subject-plum-text border-subject-plum-border print:bg-purple-50 print:text-purple-700 print:border-purple-200' },
  { legacy: 'bg-fuchsia-50', classes: 'bg-subject-fuchsia-bg text-subject-fuchsia-text border-subject-fuchsia-border print:bg-fuchsia-50 print:text-fuchsia-700 print:border-fuchsia-200' },
  { legacy: 'bg-rose-50', classes: 'bg-subject-fuchsia-bg text-subject-fuchsia-text border-subject-fuchsia-border print:bg-rose-50 print:text-rose-700 print:border-rose-200' },
  { legacy: 'bg-amber-50', classes: 'bg-subject-orange-bg text-subject-orange-text border-subject-orange-border print:bg-amber-50 print:text-amber-700 print:border-amber-200' },
  { legacy: 'bg-emerald-50', classes: 'bg-subject-lime-bg text-subject-lime-text border-subject-lime-border print:bg-emerald-50 print:text-emerald-700 print:border-emerald-200' },
  { legacy: 'bg-teal-50', classes: 'bg-subject-sky-bg text-subject-sky-text border-subject-sky-border print:bg-teal-50 print:text-teal-700 print:border-teal-200' },
  { legacy: 'bg-cyan-50', classes: 'bg-subject-sky-bg text-subject-sky-text border-subject-sky-border print:bg-cyan-50 print:text-cyan-700 print:border-cyan-200' },
];

export function getSubjectCellClasses(color: string | undefined): string {
  return SUBJECT_CELL_STYLES.find(item => color?.includes(item.legacy))?.classes ??
    `${color ?? ''} bg-subject-slate-bg text-subject-slate-text border-subject-slate-border`;
}

export function getTodayColumn(workingDays: string[], date = new Date()): string | undefined {
  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
  return workingDays.find(day => day.toLowerCase() === weekday.toLowerCase());
}

export function isCurrentPeriod(timeRange: string, date = new Date()): boolean {
  const times = [...timeRange.matchAll(/(\d{1,2}):(\d{2})/g)];
  if (times.length < 2) return false;
  const minutes = (match: RegExpMatchArray) => Number(match[1]) * 60 + Number(match[2]);
  const currentMinutes = date.getHours() * 60 + date.getMinutes();
  return currentMinutes >= minutes(times[0]) && currentMinutes < minutes(times[1]);
}
