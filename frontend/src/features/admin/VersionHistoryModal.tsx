import { useState } from 'react';
import { History, CheckCircle2, Send, RotateCcw, X, Calendar, ShieldCheck, Clock, FileText } from 'lucide-react';
import type { TimetableApp } from '../../hooks/useTimetableApp';

interface Props {
  app: TimetableApp;
  isOpen: boolean;
  onClose: () => void;
}

export function VersionHistoryModal({ app, isOpen, onClose }: Props) {
  const { activeSchool, approveVersion, publishVersion, rollbackVersion, isSyncing } = app;
  const [effectiveDate, setEffectiveDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [confirmRollbackId, setConfirmRollbackId] = useState<string | null>(null);

  if (!isOpen) return null;

  const versions = [...(activeSchool.versions || [])].sort((a, b) => b.versionNumber - a.versionNumber);
  const latestVersion = versions[0];

  const handleApprove = async (versionId: string) => {
    await approveVersion(versionId);
  };

  const handlePublish = async (versionId: string) => {
    await publishVersion(versionId, effectiveDate);
  };

  const handleRollback = async (versionId: string) => {
    await rollbackVersion(versionId);
    setConfirmRollbackId(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Timetable Versions & Governance</h2>
              <p className="text-xs text-slate-500">
                Layer C Control: Edit, Lock, Approve, Publish, and Rollback
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Status Card */}
        {latestVersion ? (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-base text-slate-900">
                  Version {latestVersion.versionNumber}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  latestVersion.state === 'published'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : latestVersion.state === 'approved'
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  {latestVersion.state}
                </span>
              </div>
              <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Created: {new Date(latestVersion.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-600">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/70">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Scheduled Lessons</span>
                <span className="font-bold text-slate-900">{latestVersion.entryCount} entries</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/70">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Effective Date</span>
                <span className="font-bold text-slate-900">{latestVersion.effectiveFrom || 'Immediate'}</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/70 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Portal Visibility</span>
                <span className={`font-bold ${latestVersion.state === 'published' ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {latestVersion.state === 'published' ? 'Live to Teachers & Students' : 'Admin Draft Only'}
                </span>
              </div>
            </div>

            {/* Workflow Action Buttons for Latest Version */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/60">
              {latestVersion.state === 'draft' && (
                <button
                  onClick={() => handleApprove(latestVersion.id)}
                  disabled={isSyncing}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition cursor-pointer disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Approve Version {latestVersion.versionNumber}</span>
                </button>
              )}

              <div className="flex items-center gap-2 ml-auto">
                <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-500">Effective:</span>
                  <input
                    type="date"
                    value={effectiveDate}
                    onChange={(e) => setEffectiveDate(e.target.value)}
                    className="font-medium text-slate-800 bg-transparent focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => handlePublish(latestVersion.id)}
                  disabled={isSyncing}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{latestVersion.state === 'published' ? 'Re-Publish' : 'Publish to Portals'}</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
            <span>No saved versions yet. Generate a schedule to create version 1.</span>
          </div>
        )}

        {/* Complete Version History List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-semibold">
            <span>Version Audit History</span>
            <span>{versions.length} recorded versions</span>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 max-h-60 overflow-y-auto">
            {versions.map(v => (
              <div key={v.id} className="p-3.5 flex flex-wrap items-center justify-between gap-3 hover:bg-slate-50 transition">
                <div className="flex items-center gap-3">
                  <div className="font-mono font-bold text-slate-800 text-sm">
                    v{v.versionNumber}
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    v.state === 'published'
                      ? 'bg-emerald-100 text-emerald-800'
                      : v.state === 'approved'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {v.state}
                  </span>
                  <span className="text-xs text-slate-500">
                    {v.entryCount} lessons
                  </span>
                  {v.effectiveFrom && (
                    <span className="text-xs text-slate-400">
                      • Effective: {v.effectiveFrom}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-mono">
                    {new Date(v.createdAt).toLocaleDateString()}
                  </span>

                  {v.id !== latestVersion?.id && (
                    confirmRollbackId === v.id ? (
                      <div className="flex items-center gap-1.5 animate-in fade-in duration-150">
                        <span className="text-[11px] text-rose-600 font-bold">Revert to v{v.versionNumber}?</span>
                        <button
                          onClick={() => handleRollback(v.id)}
                          disabled={isSyncing}
                          className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-[11px] font-bold hover:bg-rose-700 transition cursor-pointer"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setConfirmRollbackId(null)}
                          className="px-2 py-1 rounded-lg border border-slate-200 text-slate-600 text-[11px] hover:bg-slate-100 transition cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmRollbackId(v.id)}
                        disabled={isSyncing}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 text-xs font-semibold hover:bg-white transition cursor-pointer"
                        title={`Revert timetable to version ${v.versionNumber}`}
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                        <span>Rollback</span>
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
