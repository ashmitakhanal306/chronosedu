import { useState } from 'react';
import { History, CheckCircle2, Send, RotateCcw, X, Calendar, ShieldCheck, Clock, FileText } from 'lucide-react';
import type { TimetableApp } from '../../hooks/useTimetableApp';
import { Badge, Button, Card, Input } from '../../components/ui/primitives';

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
    <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <Card className="bg-surface rounded-panel max-w-2xl w-full p-6 shadow-2xl border border-neutral-200 space-y-5 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-card bg-brand-50 border border-brand-100 text-brand-600">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900">Timetable Versions & Governance</h2>
              <p className="text-xs text-neutral-500">
                Layer C Control: Edit, Lock, Approve, Publish, and Rollback
              </p>
            </div>
          </div>
          <Button
            onClick={onClose}
            aria-label="Close version history"
            className="p-2 rounded-soft text-neutral-600 hover:text-neutral-600 hover:bg-neutral-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Current Active Status Card */}
        {latestVersion ? (
          <Card className="bg-neutral-50 rounded-card border border-neutral-200 p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-base text-neutral-900">
                  Version {latestVersion.versionNumber}
                </span>
                <Badge className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  latestVersion.state === 'published'
                    ? 'bg-positive-100 text-positive-800 border border-positive-200'
                    : latestVersion.state === 'approved'
                    ? 'bg-info-100 text-info-800 border border-info-200'
                    : 'bg-warning-100 text-warning-800 border border-warning-200'
                }`}>
                  {latestVersion.state}
                </Badge>
              </div>
              <span className="text-xs text-neutral-500 flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-neutral-600" />
                Created: {new Date(latestVersion.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-neutral-600">
              <Card className="bg-surface p-2.5 rounded-soft border border-neutral-200/70">
                <span className="text-xs text-neutral-600 font-semibold uppercase block">Scheduled Lessons</span>
                <span className="font-bold text-neutral-900">{latestVersion.entryCount} entries</span>
              </Card>
              <Card className="bg-surface p-2.5 rounded-soft border border-neutral-200/70">
                <span className="text-xs text-neutral-600 font-semibold uppercase block">Effective Date</span>
                <span className="font-bold text-neutral-900">{latestVersion.effectiveFrom || 'Immediate'}</span>
              </Card>
              <Card className="bg-surface p-2.5 rounded-soft border border-neutral-200/70 col-span-2 sm:col-span-1">
                <span className="text-xs text-neutral-600 font-semibold uppercase block">Portal Visibility</span>
                <span className={`font-bold ${latestVersion.state === 'published' ? 'text-positive-700' : 'text-neutral-500'}`}>
                  {latestVersion.state === 'published' ? 'Live to Teachers & Students' : 'Admin Draft Only'}
                </span>
              </Card>
            </div>

            {/* Workflow Action Buttons for Latest Version */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200/60">
              {latestVersion.state === 'draft' && (
                <Button
                  onClick={() => handleApprove(latestVersion.id)}
                  disabled={isSyncing}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-soft bg-info-600 hover:bg-info-700 text-white text-xs font-semibold shadow-sm transition cursor-pointer disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Approve Version {latestVersion.versionNumber}</span>
                </Button>
              )}

              <div className="flex items-center gap-2 ml-auto">
                <div className="flex items-center gap-1.5 bg-surface border border-neutral-200 rounded-soft px-2.5 py-1 text-xs">
                  <Calendar className="w-3.5 h-3.5 text-neutral-600" />
                  <label htmlFor="history-effective-date" className="text-neutral-500">Effective:</label>
                  <Input
                    id="history-effective-date"
                    type="date"
                    value={effectiveDate}
                    onChange={(e) => setEffectiveDate(e.target.value)}
                    className="font-medium text-neutral-800 bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                  />
                </div>
                <Button
                  onClick={() => handlePublish(latestVersion.id)}
                  disabled={isSyncing}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-soft bg-positive-700 hover:bg-positive-800 text-white text-xs font-semibold shadow-sm transition cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{latestVersion.state === 'published' ? 'Re-Publish' : 'Publish to Portals'}</span>
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <div className="p-4 rounded-card bg-warning-50 border border-warning-200 text-xs text-warning-800 flex items-center gap-2">
            <span>No saved versions yet. Generate a schedule to create version 1.</span>
          </div>
        )}

        {/* Complete Version History List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-500 px-1 font-semibold">
            <span>Version Audit History</span>
            <span>{versions.length} recorded versions</span>
          </div>

          <Card className="border border-neutral-200 rounded-card overflow-hidden divide-y divide-neutral-100 max-h-60 overflow-y-auto">
            {versions.map(v => (
              <div key={v.id} className="p-3.5 flex flex-wrap items-center justify-between gap-3 hover:bg-neutral-50 transition">
                <div className="flex items-center gap-3">
                  <div className="font-mono font-bold text-neutral-800 text-sm">
                    v{v.versionNumber}
                  </div>
                  <Badge className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    v.state === 'published'
                      ? 'bg-positive-100 text-positive-800'
                      : v.state === 'approved'
                      ? 'bg-info-100 text-info-800'
                      : 'bg-warning-100 text-warning-800'
                  }`}>
                    {v.state}
                  </Badge>
                  <span className="text-xs text-neutral-500">
                    {v.entryCount} lessons
                  </span>
                  {v.effectiveFrom && (
                    <span className="text-xs text-neutral-600">
                      • Effective: {v.effectiveFrom}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-600 font-mono">
                    {new Date(v.createdAt).toLocaleDateString()}
                  </span>

                  {v.id !== latestVersion?.id && (
                    confirmRollbackId === v.id ? (
                      <div className="flex items-center gap-1.5 animate-in fade-in duration-150">
                        <span className="text-xs text-danger-600 font-bold">Revert to v{v.versionNumber}?</span>
                        <Button
                          onClick={() => handleRollback(v.id)}
                          disabled={isSyncing}
                          className="px-2.5 py-1 rounded-control bg-danger-600 text-white text-xs font-bold hover:bg-danger-700 transition cursor-pointer"
                        >
                          Confirm
                        </Button>
                        <Button
                          onClick={() => setConfirmRollbackId(null)}
                          className="px-2 py-1 rounded-control border border-neutral-200 text-neutral-600 text-xs hover:bg-neutral-100 transition cursor-pointer"
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => setConfirmRollbackId(v.id)}
                        disabled={isSyncing}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-control border border-neutral-200 hover:border-neutral-300 text-neutral-600 hover:text-neutral-900 text-xs font-semibold hover:bg-surface transition cursor-pointer"
                        title={`Revert timetable to version ${v.versionNumber}`}
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-neutral-500" />
                        <span>Rollback</span>
                      </Button>
                    )
                  )}
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Footer */}
        <div className="pt-2 flex items-center justify-end">
          <Button
            onClick={onClose}
            className="px-4 py-2 rounded-soft bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition cursor-pointer"
          >
            Done
          </Button>
        </div>
      </Card>
    </div>
  );
}
