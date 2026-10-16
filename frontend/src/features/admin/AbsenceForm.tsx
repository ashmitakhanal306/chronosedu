import { useState } from 'react';
import type { School } from '../../domain/types';

export function AbsenceForm({ school, onAddAbsence }: { school: School; onAddAbsence: (teacherId: string, day: string, reason: string) => void }) {
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
