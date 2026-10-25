import { useState, useMemo } from 'react';
import {
  Zap,
  X,
  Check,
  Sparkles,
  Info,
} from 'lucide-react';
import type { Tier } from '../../domain/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (newClasses: Array<{ name: string; grade: string; tier: Tier; room: string }>, replaceExisting: boolean) => void;
  existingCount: number;
}

interface GradeTemplate {
  id: string;
  name: string;
  label: string;
  codePrefix: string;
  tier: Tier;
  wing: 'pre_primary' | 'primary' | 'middle' | 'secondary' | 'senior_secondary';
  stream?: string;
}

const ALL_GRADE_TEMPLATES: GradeTemplate[] = [
  // Pre-Primary
  { id: 'nur', name: 'Nursery', label: 'Nursery', codePrefix: 'NUR', tier: 'Primary', wing: 'pre_primary' },
  { id: 'lkg', name: 'LKG', label: 'Lower KG (LKG)', codePrefix: 'LKG', tier: 'Primary', wing: 'pre_primary' },
  { id: 'ukg', name: 'UKG', label: 'Upper KG (UKG)', codePrefix: 'UKG', tier: 'Primary', wing: 'pre_primary' },

  // Primary
  { id: 'g1', name: 'Grade 1', label: 'Class 1', codePrefix: '1', tier: 'Primary', wing: 'primary' },
  { id: 'g2', name: 'Grade 2', label: 'Class 2', codePrefix: '2', tier: 'Primary', wing: 'primary' },
  { id: 'g3', name: 'Grade 3', label: 'Class 3', codePrefix: '3', tier: 'Primary', wing: 'primary' },
  { id: 'g4', name: 'Grade 4', label: 'Class 4', codePrefix: '4', tier: 'Primary', wing: 'primary' },
  { id: 'g5', name: 'Grade 5', label: 'Class 5', codePrefix: '5', tier: 'Primary', wing: 'primary' },

  // Middle
  { id: 'g6', name: 'Grade 6', label: 'Class 6', codePrefix: '6', tier: 'Primary', wing: 'middle' },
  { id: 'g7', name: 'Grade 7', label: 'Class 7', codePrefix: '7', tier: 'Primary', wing: 'middle' },
  { id: 'g8', name: 'Grade 8', label: 'Class 8', codePrefix: '8', tier: 'Primary', wing: 'middle' },

  // Secondary
  { id: 'g9', name: 'Grade 9', label: 'Class 9', codePrefix: '9', tier: 'Senior', wing: 'secondary' },
  { id: 'g10', name: 'Grade 10', label: 'Class 10', codePrefix: '10', tier: 'Senior', wing: 'secondary' },

  // Senior Secondary
  { id: 'g11_pcm', name: 'Class 11 Science (PCM)', label: 'Class 11 Science (PCM)', codePrefix: '11-PCM', tier: 'Senior', wing: 'senior_secondary', stream: 'Science (PCM)' },
  { id: 'g11_pcb', name: 'Class 11 Science (PCB)', label: 'Class 11 Science (PCB)', codePrefix: '11-PCB', tier: 'Senior', wing: 'senior_secondary', stream: 'Science (PCB)' },
  { id: 'g11_comm', name: 'Class 11 Commerce', label: 'Class 11 Commerce', codePrefix: '11-COMM', tier: 'Senior', wing: 'senior_secondary', stream: 'Commerce' },
  { id: 'g11_arts', name: 'Class 11 Humanities', label: 'Class 11 Humanities / Arts', codePrefix: '11-ARTS', tier: 'Senior', wing: 'senior_secondary', stream: 'Humanities' },

  { id: 'g12_pcm', name: 'Class 12 Science (PCM)', label: 'Class 12 Science (PCM)', codePrefix: '12-PCM', tier: 'Senior', wing: 'senior_secondary', stream: 'Science (PCM)' },
  { id: 'g12_pcb', name: 'Class 12 Science (PCB)', label: 'Class 12 Science (PCB)', codePrefix: '12-PCB', tier: 'Senior', wing: 'senior_secondary', stream: 'Science (PCB)' },
  { id: 'g12_comm', name: 'Class 12 Commerce', label: 'Class 12 Commerce', codePrefix: '12-COMM', tier: 'Senior', wing: 'senior_secondary', stream: 'Commerce' },
  { id: 'g12_arts', name: 'Class 12 Humanities', label: 'Class 12 Humanities / Arts', codePrefix: '12-ARTS', tier: 'Senior', wing: 'senior_secondary', stream: 'Humanities' },
];

export function BatchClassGeneratorModal({ isOpen, onClose, onGenerate, existingCount }: Props) {
  // Pre-selected grades (default to common K-10 + 11/12 PCM & Commerce)
  const [selectedGradeIds, setSelectedGradeIds] = useState<string[]>([
    'nur', 'lkg', 'ukg',
    'g1', 'g2', 'g3', 'g4', 'g5',
    'g6', 'g7', 'g8',
    'g9', 'g10',
    'g11_pcm', 'g11_comm',
    'g12_pcm', 'g12_comm',
  ]);

  // Section letters to generate per grade
  const [sections, setSections] = useState<string[]>(['A', 'B']);

  // Room numbering settings
  const [roomPrefix, setRoomPrefix] = useState('Classroom A-');
  const [startRoomNumber, setStartRoomNumber] = useState(101);
  const [replaceExisting, setReplaceExisting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const toggleGrade = (id: string) => {
    setSelectedGradeIds(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const toggleSection = (sec: string) => {
    if (sections.includes(sec) && sections.length === 1) return; // Keep at least 1 section
    setSections(prev =>
      prev.includes(sec) ? prev.filter(s => s !== sec) : [...prev, sec].sort()
    );
  };

  // Preset buttons
  const applyPreset = (type: 'all' | 'primary' | 'middle_high' | 'clear') => {
    if (type === 'all') {
      setSelectedGradeIds(ALL_GRADE_TEMPLATES.map(g => g.id));
    } else if (type === 'primary') {
      setSelectedGradeIds(ALL_GRADE_TEMPLATES.filter(g => g.wing === 'pre_primary' || g.wing === 'primary').map(g => g.id));
    } else if (type === 'middle_high') {
      setSelectedGradeIds(ALL_GRADE_TEMPLATES.filter(g => g.wing !== 'pre_primary' && g.wing !== 'primary').map(g => g.id));
    } else {
      setSelectedGradeIds([]);
    }
  };

  // Generated list calculation
  const generatedPreview = useMemo(() => {
    const list: Array<{ name: string; grade: string; tier: Tier; room: string }> = [];
    let roomNum = Number(startRoomNumber) || 101;

    ALL_GRADE_TEMPLATES.forEach(tpl => {
      if (!selectedGradeIds.includes(tpl.id)) return;

      sections.forEach(sec => {
        const className = `${tpl.codePrefix}-${sec}`;
        const roomName = `${roomPrefix}${roomNum}`;
        list.push({
          name: className,
          grade: tpl.name,
          tier: tpl.tier,
          room: roomName,
        });
        roomNum += 1;
      });
    });

    return list;
  }, [selectedGradeIds, sections, roomPrefix, startRoomNumber]);

  const handleExecute = () => {
    if (generatedPreview.length === 0) return;
    onGenerate(generatedPreview, replaceExisting);
    onClose();
  };

  if (!isOpen) return null;

  const wings = [
    { key: 'pre_primary', title: 'Pre-Primary Wing', color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { key: 'primary', title: 'Primary Wing (Grades 1–5)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { key: 'middle', title: 'Middle Wing (Grades 6–8)', color: 'text-sky-700 bg-sky-50 border-sky-200' },
    { key: 'secondary', title: 'Secondary Wing (Grades 9–10)', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' },
    { key: 'senior_secondary', title: 'Senior Secondary (Grades 11–12)', color: 'text-purple-700 bg-purple-50 border-purple-200' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-linear-to-r from-indigo-50/70 via-white to-violet-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Zap className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-base">
                  1-Click Class &amp; Section Generator
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                  Zero-Excel
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Quickly generate classes, sections, and homeroom assignments for your entire school in seconds.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs flex-1">
          
          {/* Quick Presets Bar */}
          <div className="flex items-center justify-between flex-wrap gap-2 p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="font-bold text-slate-700 flex items-center gap-1.5 pl-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Quick Presets:</span>
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => applyPreset('all')}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 text-slate-700 font-semibold text-[11px] transition cursor-pointer shadow-2xs"
              >
                All K–12
              </button>
              <button
                type="button"
                onClick={() => applyPreset('primary')}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-700 font-semibold text-[11px] transition cursor-pointer shadow-2xs"
              >
                Primary (Nur–Gr 5)
              </button>
              <button
                type="button"
                onClick={() => applyPreset('middle_high')}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-sky-50 hover:text-sky-700 border border-slate-200 text-slate-700 font-semibold text-[11px] transition cursor-pointer shadow-2xs"
              >
                Grades 6–12
              </button>
              <button
                type="button"
                onClick={() => applyPreset('clear')}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-rose-50 hover:text-rose-700 border border-slate-200 text-slate-500 font-semibold text-[11px] transition cursor-pointer shadow-2xs"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Wing & Grade Checkbox Groups */}
          <div className="space-y-3">
            <div className="font-bold text-slate-800 flex items-center justify-between">
              <span>1. Select Grade Levels &amp; Streams ({selectedGradeIds.length} Selected)</span>
              <span className="text-[11px] text-slate-500 font-normal">Click chips to toggle</span>
            </div>

            <div className="space-y-2.5">
              {wings.map(wing => {
                const wingTemplates = ALL_GRADE_TEMPLATES.filter(g => g.wing === wing.key);
                return (
                  <div key={wing.key} className="p-3 rounded-2xl border border-slate-200/90 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${wing.color}`}>
                        {wing.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const allInWingSelected = wingTemplates.every(t => selectedGradeIds.includes(t.id));
                          if (allInWingSelected) {
                            setSelectedGradeIds(prev => prev.filter(id => !wingTemplates.some(t => t.id === id)));
                          } else {
                            const newIds = wingTemplates.map(t => t.id);
                            setSelectedGradeIds(prev => Array.from(new Set([...prev, ...newIds])));
                          }
                        }}
                        className="text-[10px] text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                      >
                        {wingTemplates.every(t => selectedGradeIds.includes(t.id)) ? 'Deselect Wing' : 'Select All'}
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      {wingTemplates.map(tpl => {
                        const isSelected = selectedGradeIds.includes(tpl.id);
                        return (
                          <button
                            key={tpl.id}
                            type="button"
                            onClick={() => toggleGrade(tpl.id)}
                            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                              isSelected
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                            }`}
                          >
                            <span className="w-3.5 h-3.5 rounded-md border flex items-center justify-center text-[9px] shrink-0 font-bold border-white/60">
                              {isSelected ? '✓' : ''}
                            </span>
                            <span>{tpl.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section Letters & Room Numbering Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Sections Selector */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2.5">
              <label className="font-bold text-slate-800 block">
                2. Sections per Grade Level
              </label>
              <div className="flex items-center gap-2">
                {['A', 'B', 'C', 'D', 'E', 'F'].map(sec => {
                  const isChecked = sections.includes(sec);
                  return (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => toggleSection(sec)}
                      className={`w-10 h-10 rounded-xl font-bold text-xs flex items-center justify-center border transition cursor-pointer ${
                        isChecked
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs ring-2 ring-indigo-500/20'
                          : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Section {sec}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-500">
                Selected: {sections.join(', ')} ({sections.length} sections per grade cohort).
              </p>
            </div>

            {/* Room Automation Pattern */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2.5">
              <label className="font-bold text-slate-800 block">
                3. Homeroom Numbering Pattern
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Prefix</label>
                  <input
                    type="text"
                    value={roomPrefix}
                    onChange={e => setRoomPrefix(e.target.value)}
                    placeholder="e.g. Classroom A-"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-semibold bg-white text-xs mt-0.5"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Starting Number</label>
                  <input
                    type="number"
                    value={startRoomNumber}
                    onChange={e => setStartRoomNumber(Number(e.target.value) || 101)}
                    placeholder="101"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-semibold bg-white text-xs mt-0.5"
                  />
                </div>
              </div>
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <span>Rooms generated:</span>
                <strong className="text-slate-800 font-bold">{roomPrefix}{startRoomNumber}</strong>
                <span>to</span>
                <strong className="text-slate-800 font-bold">{roomPrefix}{startRoomNumber + Math.max(0, generatedPreview.length - 1)}</strong>
              </p>
            </div>
          </div>

          {/* Replace vs Append Option */}
          {existingCount > 0 && (
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <div className="flex-1 text-[11px]">
                Your school currently has <strong>{existingCount} existing classes</strong>.
              </div>
              <label className="flex items-center gap-1.5 font-bold cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={replaceExisting}
                  onChange={e => setReplaceExisting(e.target.checked)}
                  className="rounded border-amber-400 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Replace existing classes</span>
              </label>
            </div>
          )}

          {/* Preview Summary Card */}
          <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>
                  Ready to Generate <strong className="text-indigo-700">{generatedPreview.length} Class Sections</strong>
                </span>
                <span className="text-slate-500 font-normal">
                  ({selectedGradeIds.length} Grade Cohorts × {sections.length} Sections)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewOpen(!previewOpen)}
                className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                {previewOpen ? 'Hide Preview' : 'Show List Preview'}
              </button>
            </div>

            {previewOpen && (
              <div className="max-h-40 overflow-y-auto border-t border-indigo-100 pt-2 grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px]">
                {generatedPreview.map((item, i) => (
                  <div key={i} className="p-1.5 rounded-lg bg-white border border-indigo-100/80 flex items-center justify-between">
                    <span className="font-bold text-slate-800">{item.name}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{item.room}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-100 transition cursor-pointer text-xs"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={handleExecute}
            disabled={generatedPreview.length === 0}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition cursor-pointer ${
              generatedPreview.length > 0
                ? 'bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-indigo-500/20'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>Generate {generatedPreview.length} Classes Instantly</span>
          </button>
        </div>

      </div>
    </div>
  );
}
