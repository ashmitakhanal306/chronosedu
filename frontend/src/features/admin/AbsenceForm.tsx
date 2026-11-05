import { useState } from 'react';
import type { School } from '../../domain/types';
import { Button, Input, Select } from '../../components/ui/primitives';

export function AbsenceForm({ school, onAddAbsence }: { school: School; onAddAbsence: (teacherId: string, day: string, reason: string) => void }) {
  const [teacherId, setTeacherId] = useState(school.teachers[0]?.id || '');
  const [day, setDay] = useState(school.workingDays[0] || 'Monday');
  const [reason, setReason] = useState('Medical / Personal Leave');

  return (
    <div className="space-y-4 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
      <div>
        <label htmlFor="admin-absence-teacher" className="block font-semibold text-slate-700 mb-1">Absent Teacher</label>
        <Select
          id="admin-absence-teacher"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          className="w-full min-h-10 rounded-lg"
        >
          {school.teachers.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </Select>
      </div>

      <div>
        <label htmlFor="admin-absence-day" className="block font-semibold text-slate-700 mb-1">Day of Absence</label>
        <Select
          id="admin-absence-day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="w-full min-h-10 rounded-lg"
        >
          {school.workingDays.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </Select>
      </div>

      <div>
        <label htmlFor="admin-absence-reason" className="block font-semibold text-slate-700 mb-1">Reason</label>
        <Input
          id="admin-absence-reason"
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full min-h-10 rounded-lg"
        />
      </div>

      <Button
        variant="primary"
        onClick={() => onAddAbsence(teacherId, day, reason)}
        className="w-full justify-center"
      >
        Mark Absent & Rank Substitutes
      </Button>
    </div>
  );
}
