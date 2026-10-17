import { useState } from 'react';
import { Upload, Download, FileSpreadsheet, CheckCircle2, AlertTriangle, X, Plus } from 'lucide-react';
import type { School, Tier } from '../../domain/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  school: School;
  updateSchool: (updater: (s: School) => School) => void;
  onRunSolver: () => void;
}

export function BulkImportModal({ isOpen, onClose, school, updateSchool, onRunSolver }: Props) {
  const [importMode, setImportMode] = useState<'classes' | 'teachers'>('classes');
  const [csvText, setCsvText] = useState('');
  const [parsedItems, setParsedItems] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const downloadTemplate = (type: 'classes' | 'teachers') => {
    let content = '';
    let filename = '';
    if (type === 'classes') {
      content = 'name,grade,tier,room\n6A,Grade 6,Primary,Room 103\n6B,Grade 6,Primary,Room 104\n11B,Grade 11,Senior,Room 203\n12A,Grade 12,Senior,Room 204\n';
      filename = 'classes_sample_template.csv';
    } else {
      content = 'name,subjects,maxPerDay\nDr. Emily Watson,Mathematics;General Science,5\nMr. Arthur Clark,English Lit;Social Studies,5\nCoach Alex Mercer,Sports & Games;Art & Craft,5\n';
      filename = 'teachers_sample_template.csv';
    }

    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const parseCsv = (text: string) => {
    setErrorMsg('');
    const lines = text.trim().split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) {
      setParsedItems([]);
      return;
    }

    const headers = lines[0].toLowerCase().split(',').map(h => h.trim());

    if (importMode === 'classes') {
      const items: any[] = [];
      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',').map(p => p.trim());
        if (parts.length < 3) continue;

        const name = parts[0];
        const grade = parts[1] || 'Grade 6';
        const rawTier = parts[2]?.toLowerCase();
        const tier: Tier = rawTier.includes('sen') ? 'Senior' : 'Primary';
        const room = parts[3] || `Room ${school.classes.length + i + 100}`;

        const isDuplicate = school.classes.some(c => c.name.toLowerCase() === name.toLowerCase());

        items.push({
          id: `c-${Date.now()}-${i}`,
          name,
          grade,
          tier,
          room,
          isDuplicate,
          isValid: Boolean(name),
        });
      }
      setParsedItems(items);
    } else {
      const items: any[] = [];
      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',').map(p => p.trim());
        if (parts.length < 1 || !parts[0]) continue;

        const name = parts[0];
        const rawSubjects = parts[1] ? parts[1].split(';') : ['Mathematics'];
        const maxPerDay = Number(parts[2]) || 5;

        // Map subject names to IDs
        const matchedSubjectIds = rawSubjects.map(subName => {
          const s = school.subjects.find(sub => sub.name.toLowerCase().includes(subName.trim().toLowerCase()));
          return s ? s.id : school.subjects[0]?.id || 'sub-math';
        });

        const isDuplicate = school.teachers.some(t => t.name.toLowerCase() === name.toLowerCase());

        items.push({
          id: `t-${Date.now()}-${i}`,
          name,
          subjects: matchedSubjectIds,
          maxPerDay,
          unavailableDays: [],
          isDuplicate,
          isValid: Boolean(name),
        });
      }
      setParsedItems(items);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCsvText(e.target.value);
    parseCsv(e.target.value);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setCsvText(content);
      parseCsv(content);
    };
    reader.readAsText(file);
  };

  const loadSampleData = () => {
    let sample = '';
    if (importMode === 'classes') {
      sample = 'name,grade,tier,room\n6A,Grade 6,Primary,Room 103\n6B,Grade 6,Primary,Room 104\n11B,Grade 11,Senior,Room 203\n12A,Grade 12,Senior,Room 204';
    } else {
      sample = 'name,subjects,maxPerDay\nDr. Emily Watson,Mathematics;General Science,5\nMr. Arthur Clark,English Lit;Social Studies,5\nCoach Alex Mercer,Sports & Games;Art & Craft,5';
    }
    setCsvText(sample);
    parseCsv(sample);
  };

  const handleCommitImport = () => {
    const validItems = parsedItems.filter(item => item.isValid && !item.isDuplicate);
    if (validItems.length === 0) {
      setErrorMsg('No valid new records to import.');
      return;
    }

    if (importMode === 'classes') {
      updateSchool(s => ({
        ...s,
        classes: [...s.classes, ...validItems.map(({ isDuplicate, isValid, ...rest }) => rest)],
      }));
    } else {
      updateSchool(s => ({
        ...s,
        teachers: [...s.teachers, ...validItems.map(({ isDuplicate, isValid, ...rest }) => rest)],
      }));
    }

    onClose();
    setTimeout(() => {
      onRunSolver();
    }, 200);
  };

  const validCount = parsedItems.filter(i => i.isValid && !i.isDuplicate).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-inner">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">Bulk School Onboarding Importer</h3>
              <p className="text-xs text-slate-400">Import class sections or faculty staff rosters from CSV</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
          {/* Mode Selector & Template Download */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="inline-flex rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => {
                  setImportMode('classes');
                  setCsvText('');
                  setParsedItems([]);
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  importMode === 'classes' ? 'bg-white text-indigo-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                1. Import Class Sections
              </button>
              <button
                type="button"
                onClick={() => {
                  setImportMode('teachers');
                  setCsvText('');
                  setParsedItems([]);
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  importMode === 'teachers' ? 'bg-white text-indigo-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                2. Import Faculty Roster
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={loadSampleData}
                className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold transition cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Paste Sample</span>
              </button>
              <button
                type="button"
                onClick={() => downloadTemplate(importMode)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold transition cursor-pointer flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Template (.csv)</span>
              </button>
            </div>
          </div>

          {/* Upload or Paste */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-700">
                Paste CSV Data or Choose File:
              </label>
              <label className="text-indigo-600 font-semibold hover:underline cursor-pointer">
                <span>Browse .csv file</span>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <textarea
              rows={4}
              value={csvText}
              onChange={handleTextChange}
              placeholder={
                importMode === 'classes'
                  ? 'name,grade,tier,room\n6A,Grade 6,Primary,Room 103\n11B,Grade 11,Senior,Room 203'
                  : 'name,subjects,maxPerDay\nDr. Emily Watson,Mathematics;General Science,5\nMr. Arthur Clark,English Lit;Social Studies,5'
              }
              className="w-full p-3 font-mono text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            />
          </div>

          {/* Real-Time Preview Table */}
          {parsedItems.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>Parsed Preview ({parsedItems.length} records detected, {validCount} ready)</span>
                {validCount > 0 && (
                  <span className="text-emerald-600 font-semibold">✓ Ready to Ingest</span>
                )}
              </div>

              <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100">
                {parsedItems.map((item, idx) => (
                  <div key={idx} className="p-2.5 flex items-center justify-between text-xs hover:bg-slate-50">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{item.name}</span>
                      {importMode === 'classes' ? (
                        <>
                          <span className="text-slate-500">({item.grade})</span>
                          <span className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                            item.tier === 'Primary' ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'
                          }`}>
                            {item.tier}
                          </span>
                          <span className="text-slate-400">{item.room}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-slate-500 font-semibold">{item.maxPerDay} periods/day cap</span>
                        </>
                      )}
                    </div>

                    <div>
                      {item.isDuplicate ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Already Exists</span>
                        </span>
                      ) : item.isValid ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Valid</span>
                        </span>
                      ) : (
                        <span className="text-rose-600 font-semibold">Invalid</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-semibold text-xs">
              {errorMsg}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500">
            {validCount > 0 ? (
              <span><strong>{validCount}</strong> new record(s) will be added & solver will auto-run.</span>
            ) : (
              <span>Paste or upload CSV data above to begin.</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCommitImport}
              disabled={validCount === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs shadow-xs transition cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Import & Solve Timetable</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
