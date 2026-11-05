import { useState } from 'react';
import { Building2, Sparkles, Layers, Globe, Calendar, X, Check, ArrowRight } from 'lucide-react';
import type { TimetableApp } from '../../hooks/useTimetableApp';
import { Badge, Button, Card, Input, Select } from '../ui/primitives';

interface Props {
  app: TimetableApp;
  isOpen: boolean;
  onClose: () => void;
}

export function NewSchoolModal({ app, isOpen, onClose }: Props) {
  const { addSchool, setAdminTab } = app;

  const [name, setName] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [term, setTerm] = useState('Academic Year 2026–27 (Term 1)');
  const [timezone, setTimezone] = useState('IST (UTC+5:30)');
  const [template, setTemplate] = useState<'starter' | 'blank' | 'greenwood_issues'>('starter');

  if (!isOpen) return null;

  const handleNameChange = (val: string) => {
    setName(val);
    const slug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    setSubdomain(slug);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addSchool({
      name: name.trim(),
      subdomain: subdomain.trim() || undefined,
      term: term.trim() || undefined,
      timezone,
      template,
    });

    // Navigate to setup tab so user can review or customize
    setAdminTab('setup');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs animate-in fade-in duration-200">
      <Card
        className="rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-indigo-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shadow-inner">
              <Building2 className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                <span>Create New School</span>
                <Badge className="uppercase tracking-wider bg-indigo-500/30 text-indigo-100 border-indigo-400/40">
                  Tenant
                </Badge>
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">Provision a new dedicated school environment in ChronosEdu</p>
            </div>
          </div>
          <Button variant="ghost"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
          {/* School Name */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-700 text-xs">
              School Name <span className="text-rose-500">*</span>
            </label>
            <Input
              type="text"
              required
              autoFocus
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. St. Xavier's International School"
              className="px-3.5 py-2.5 rounded-xl font-semibold"
            />
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs text-slate-600 font-semibold uppercase">Presets:</span>
              {["Greenwood Public School", "St. Xavier's International", "Delhi Public Academy", "Kendriya Vidyalaya No. 1"].map(s => (
                <Button variant="secondary"
                  key={s}
                  type="button"
                  onClick={() => {
                    handleNameChange(s);
                    if (s === "Greenwood Public School") {
                      setTemplate('greenwood_issues');
                    }
                  }}
                  className="px-2 rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-semibold"
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>

          {/* Subdomain & Timezone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Subdomain */}
            <div className="space-y-1.5">
              <label className="block font-semibold text-slate-700">
                Portal Subdomain
              </label>
              <div className="flex items-center">
                <Input
                  type="text"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  placeholder="st-xaviers"
                  className="flex-1 rounded-l-xl rounded-r-none border-r-0 px-3 py-2 font-mono"
                />
                <span className="px-2.5 py-2 rounded-r-xl border border-slate-300 bg-slate-100 text-slate-700 font-semibold text-xs whitespace-nowrap">
                  .chronos.edu
                </span>
              </div>
            </div>

            {/* Timezone */}
            <div className="space-y-1.5">
              <label className="block font-semibold text-slate-700 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-indigo-500" />
                Timezone
              </label>
              <Select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="px-3 py-2 rounded-xl font-medium"
              >
                <option value="IST (UTC+5:30)">IST (UTC+5:30) — India</option>
                <option value="UTC+0">UTC+0 — London / GMT</option>
                <option value="UTC+1">UTC+1 — Paris / Berlin</option>
                <option value="UTC+2">UTC+2 — Cairo / Athens</option>
                <option value="UTC+3">UTC+3 — Riyadh / Nairobi</option>
                <option value="UTC+4">UTC+4 — Dubai (GST)</option>
                <option value="UTC+7">UTC+7 — Bangkok / Jakarta</option>
                <option value="UTC+8">UTC+8 — Singapore / Perth</option>
                <option value="UTC-5">UTC-5 — New York (EST)</option>
                <option value="UTC-6">UTC-6 — Chicago (CST)</option>
                <option value="UTC-8">UTC-8 — Los Angeles (PST)</option>
              </Select>
            </div>
          </div>

          {/* Academic Term */}
          <div className="space-y-1.5">
            <label className="block font-semibold text-slate-700 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
              Academic Term / Year
            </label>
            <Input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="e.g. Academic Year 2026–27 (Term 1)"
              className="px-3 py-2 rounded-xl"
            />
          </div>

          {/* Starter Template vs Blank vs Dataset 2 */}
          <div className="space-y-2">
            <label className="block font-bold text-slate-700">Choose Starting Configuration</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Starter Template */}
              <div
                onClick={() => setTemplate('starter')}
                className={`p-3.5 rounded-2xl border-2 transition cursor-pointer space-y-1 relative ${
                  template === 'starter'
                    ? 'border-indigo-600 bg-indigo-50/70 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>Complete K-12 Template</span>
                  </div>
                  {template === 'starter' && (
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Standard cohorts, CBSE curriculum, rooms, and balanced faculty. 100% solver ready with zero conflicts.
                </p>
                <Badge className="mt-1 border-indigo-200 bg-indigo-100/80 text-indigo-800 uppercase tracking-wider">
                  1-Click Ready
                </Badge>
              </div>

              {/* Blank Slate */}
              <div
                onClick={() => setTemplate('blank')}
                className={`p-3.5 rounded-2xl border-2 transition cursor-pointer space-y-1 relative ${
                  template === 'blank'
                    ? 'border-indigo-600 bg-indigo-50/70 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                    <Layers className="w-4 h-4 text-slate-700" />
                    <span>Blank Canvas</span>
                  </div>
                  {template === 'blank' && (
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Empty cohorts and staff. Step through our 1-click batch generators in Setup Wizard to build from scratch.
                </p>
                <Badge className="mt-1 border-slate-200 bg-slate-100 text-slate-700 uppercase tracking-wider">
                  Wizard Onboarding
                </Badge>
              </div>

              {/* Dataset 2 Testbed */}
              <div
                onClick={() => {
                  setTemplate('greenwood_issues');
                  if (!name || name === "St. Xavier's International" || name === 'Delhi Public Academy') {
                    handleNameChange('Greenwood Public School');
                  }
                }}
                className={`col-span-1 sm:col-span-2 p-3.5 rounded-2xl border-2 transition cursor-pointer space-y-1 relative ${
                  template === 'greenwood_issues'
                    ? 'border-amber-600 bg-amber-50/80 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                    <span className="text-amber-600">🧪</span>
                    <span>Greenwood Public School (Dataset 2 — Real-World Issues Testbed)</span>
                  </div>
                  {template === 'greenwood_issues' && (
                    <span className="w-4 h-4 rounded-full bg-amber-700 text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  55 Sections, 99 Staff, 67 Rooms with 23 real-world challenges: teacher maternity leave, physics shortage, computer lab overbooking, room overcrowding, and cross-subject balancing.
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <Badge className="border-amber-200 bg-amber-100 text-amber-900 uppercase tracking-wider">
                    23 Testbed Issues
                  </Badge>
                  <span className="text-xs font-semibold text-slate-700">
                    Perfect for testing Step 10 Pre-Flight Feasibility &amp; 1-Click Auto-Fixes
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <Button variant="ghost"
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold transition cursor-pointer"
            >
              Cancel
            </Button>
            <Button variant="primary"
              type="submit"
              disabled={!name.trim()}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold transition shadow-xs cursor-pointer ${
                name.trim()
                  ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              <span>Create & Launch School</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
