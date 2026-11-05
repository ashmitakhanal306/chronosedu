import { useState, useEffect } from 'react';
import { History, ShieldCheck, Send, RotateCcw, Calendar, Clock, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import type { TimetableApp } from '../../hooks/useTimetableApp';
import { api, type ApiAuditLog } from '../../services/api';
import { Badge, Card, Feedback } from '../../components/ui/primitives';

export function VersionsTab({ app }: { app: TimetableApp }) {
  const { activeSchool, approveVersion, publishVersion, rollbackVersion, isSyncing, showToast } = app;

  const [effectiveDate, setEffectiveDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [confirmRollbackId, setConfirmRollbackId] = useState<string | null>(null);
  const [auditLogs, setAuditLogs] = useState<ApiAuditLog[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [auditLogError, setAuditLogError] = useState(false);
  const [auditRetry, setAuditRetry] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function loadLogs() {
      setIsLoadingLogs(true);
      setAuditLogError(false);
      try {
        const logs = await api.listAuditLogs(activeSchool.id);
        if (!cancelled) setAuditLogs(logs);
      } catch {
        if (!cancelled) setAuditLogError(true);
      } finally {
        if (!cancelled) setIsLoadingLogs(false);
      }
    }
    loadLogs();
    return () => { cancelled = true; };
  }, [activeSchool.id, auditRetry]);

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
    <div className="w-full min-w-0 space-y-4 sm:space-y-5 animate-in fade-in duration-200">
      {/* Subheader Banner */}
      <Card className="rounded-2xl p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
            <History className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-100/70 px-2 py-0.5 rounded-full">
                Layer C • Human Governance
              </span>
              <h2 className="text-base font-bold text-slate-900">Publish, Version Governance &amp; Audit Trail</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Drafts remain private to administrators. Once approved and published, the timetable is visible in Teacher and Student portals.
            </p>
          </div>
        </div>

        {latestVersion && (
          <div className="flex items-center gap-2">
              <Badge className={`uppercase tracking-wider ${
              latestVersion.state === 'published'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : latestVersion.state === 'approved'
                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}>
              Active State: {latestVersion.state} (v{latestVersion.versionNumber})
              </Badge>
          </div>
        )}
      </Card>

      {/* Active Version Control Card */}
      {latestVersion ? (
        <Card className="rounded-2xl p-4 sm:p-6 space-y-5 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-slate-900 font-mono">
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
              <span className="text-xs text-slate-500 flex items-center gap-1.5 mt-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-slate-600" />
                Created: {new Date(latestVersion.createdAt).toLocaleString()}
              </span>
            </div>

            {/* Workflow Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {latestVersion.state === 'draft' && (
                <button
                  onClick={() => handleApprove(latestVersion.id)}
                  disabled={isSyncing}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Approve Version {latestVersion.versionNumber}</span>
                </button>
              )}

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs">
                  <Calendar className="w-3.5 h-3.5 text-slate-600" />
                  <label htmlFor="versions-effective-date" className="text-slate-500 font-medium">Effective Date:</label>
                  <input
                    id="versions-effective-date"
                    type="date"
                    value={effectiveDate}
                    onChange={(e) => setEffectiveDate(e.target.value)}
                    className="font-medium text-slate-800 bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 cursor-pointer"
                  />
                </div>

                <button
                  onClick={() => handlePublish(latestVersion.id)}
                  disabled={isSyncing}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{latestVersion.state === 'published' ? 'Re-Publish' : 'Publish to Portals'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-600 font-bold uppercase tracking-wider block">Scheduled Lessons</span>
              <span className="text-lg font-bold text-slate-900 font-mono mt-0.5 block">{latestVersion.entryCount} entries</span>
              <span className="text-xs text-slate-500">100% hard rule conflict-free</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-600 font-bold uppercase tracking-wider block">Effective Calendar Date</span>
              <span className="text-lg font-bold text-slate-900 mt-0.5 block">{latestVersion.effectiveFrom || 'Immediate'}</span>
              <span className="text-xs text-slate-500">Active timetable start date</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-600 font-bold uppercase tracking-wider block">Live Portal Visibility</span>
              <span className={`text-lg font-bold mt-0.5 block ${latestVersion.state === 'published' ? 'text-emerald-700' : 'text-amber-800'}`}>
                {latestVersion.state === 'published' ? 'Live to Teachers & Students' : 'Restricted to Admins (Draft)'}
              </span>
              <span className="text-xs text-slate-500">Multi-tenant role filter active</span>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-6 rounded-2xl text-center space-y-2">
          <p className="text-sm font-semibold text-slate-700">No versions created yet.</p>
          <p className="text-xs text-slate-500">Run the solver in Setup Wizard or Timetable Studio to generate draft Version 1.</p>
        </Card>
      )}

      {/* Version History & Rollback Table */}
      <Card className="rounded-2xl p-4 sm:p-5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
            Version History &amp; Reversion Log
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            {versions.length} total versions
          </span>
        </div>

        <div className="w-full min-w-0 border border-slate-200 rounded-xl overflow-x-auto overscroll-x-contain divide-y divide-slate-100">
          {versions.map(v => (
            <div key={v.id} className="p-4 flex flex-wrap items-center justify-between gap-3 hover:bg-slate-50/70 transition">
              <div className="flex items-center gap-3">
                <span className="font-mono font-extrabold text-slate-900 text-sm">
                  v{v.versionNumber}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  v.state === 'published'
                    ? 'bg-emerald-100 text-emerald-800'
                    : v.state === 'approved'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {v.state}
                </span>
                <span className="text-xs text-slate-600">
                  {v.entryCount} lessons
                </span>
                {v.effectiveFrom && (
                  <span className="text-xs text-slate-600">
                    • Effective: {v.effectiveFrom}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-600 font-mono">
                  {new Date(v.createdAt).toLocaleDateString()}
                </span>

                {v.id !== latestVersion?.id && (
                  confirmRollbackId === v.id ? (
                    <div className="flex items-center gap-1.5 animate-in fade-in duration-150">
                      <span className="text-xs text-rose-600 font-bold">Revert to v{v.versionNumber}?</span>
                      <button
                        onClick={() => handleRollback(v.id)}
                        disabled={isSyncing}
                        className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition cursor-pointer"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirmRollbackId(null)}
                        className="px-2 py-1 rounded-lg border border-slate-200 text-slate-600 text-xs hover:bg-slate-100 transition cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmRollbackId(v.id)}
                      disabled={isSyncing}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-semibold hover:bg-white transition cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                      <span>Rollback to this</span>
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Audit Log Table */}
      <Card className="rounded-2xl p-4 sm:p-5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
            Operational Audit Trail
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            {auditLogs.length} logged actions
          </span>
        </div>

        <div aria-busy={isLoadingLogs} className="w-full min-w-0 border border-slate-200 rounded-xl overflow-auto overscroll-x-contain overscroll-y-auto divide-y divide-slate-100 max-h-72">
          {auditLogError ? (
            <Feedback variant="error" message="Audit activity could not be loaded." actionLabel="Retry" onAction={() => setAuditRetry(value => value + 1)} className="m-2" />
          ) : isLoadingLogs ? (
            <Feedback variant="loading" message="Loading audit trail…" className="m-2" />
          ) : auditLogs.length > 0 ? (
            auditLogs.map(log => (
              <div key={log.id} className="p-3 text-xs flex flex-wrap items-center justify-between gap-2 hover:bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className="font-bold uppercase tracking-wider text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono">
                    {log.action}
                  </span>
                  <span className="text-slate-700 font-medium">{log.detail || log.entity_type}</span>
                </div>
                <span className="text-xs text-slate-600 font-mono">
                  {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))
          ) : (
            <Feedback variant="empty" message="No audit entries recorded yet." className="m-2" />
          )}
        </div>
      </Card>
    </div>
  );
}
