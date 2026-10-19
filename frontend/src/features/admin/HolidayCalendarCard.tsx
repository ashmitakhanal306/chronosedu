import { useState } from 'react';
import { Calendar, Plus, Trash2, Sun, Sparkles, AlertCircle, Clock } from 'lucide-react';
import type { School, Holiday } from '../../domain/types';
import type { TimetableApp } from '../../hooks/useTimetableApp';

interface Props {
  school: School;
  app?: TimetableApp;
}

export function HolidayCalendarCard({ school, app }: Props) {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState<'school' | 'national' | 'exam' | 'staff_day'>('school');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const holidays: Holiday[] = school.holidays || [];

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !startDate || !endDate) return;

    if (new Date(endDate) < new Date(startDate)) {
      alert('End date cannot be earlier than start date.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (app?.addHoliday) {
        await app.addHoliday({
          name: name.trim(),
          startDate,
          endDate,
          type,
        });
      }
      setName('');
      setStartDate('');
      setEndDate('');
      setType('school');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (app?.deleteHoliday) {
      await app.deleteHoliday(id);
    }
  };

  const calculateDays = (start: string, end: string) => {
    try {
      const s = new Date(start);
      const e = new Date(end);
      const diffTime = Math.abs(e.getTime() - s.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays === 1 ? '1 day' : `${diffDays} days`;
    } catch {
      return '';
    }
  };

  const getTypeBadge = (hType?: string) => {
    switch (hType) {
      case 'national':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">National / Public</span>;
      case 'exam':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Exam Period</span>;
      case 'staff_day':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">Staff Training</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">School Break</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span>Holiday Calendar &amp; School Closures</span>
        </h3>
        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
          {holidays.length} Event{holidays.length === 1 ? '' : 's'} Configured
        </span>
      </div>

      <p className="text-xs text-slate-500">
        Non-teaching periods, national holidays, exam blocks, and staff development days. Lessons will not be scheduled on dates falling within these ranges.
      </p>

      {/* Add Holiday Form */}
      <form onSubmit={handleAdd} className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Holiday / Closure Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Diwali Break, Winter Recess, Staff Day"
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2">
            <label className="text-[11px] font-bold text-slate-600">Category:</label>
            <select
              value={type}
              onChange={e => setType(e.target.value as any)}
              className="px-2.5 py-1 rounded-lg border border-slate-300 text-xs bg-white font-medium"
            >
              <option value="school">School Holiday / Vacation</option>
              <option value="national">National / Gazetted Holiday</option>
              <option value="exam">Examination Block</option>
              <option value="staff_day">Teacher In-Service / Staff Day</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !name.trim() || !startDate || !endDate}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs shadow-xs transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Calendar</span>
          </button>
        </div>
      </form>

      {/* Holidays List */}
      <div className="space-y-2">
        {holidays.length === 0 ? (
          <div className="p-4 rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-400">
            No holidays registered yet. Add school breaks or exam weeks above.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
            {holidays.map(h => (
              <div
                key={h.id}
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/20 transition group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-slate-900">{h.name}</span>
                    {getTypeBadge(h.type)}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{h.startDate} &rarr; {h.endDate}</span>
                    <span className="text-slate-400">&bull;</span>
                    <span className="font-medium text-emerald-700">{calculateDays(h.startDate, h.endDate)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(h.id)}
                  className="opacity-60 group-hover:opacity-100 p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                  title="Remove holiday"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
