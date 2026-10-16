import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import type { ToastState } from '../../domain/types';

export function Toast({ toast }: { toast: ToastState | null }) {
  if (!toast) return null;
  return (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all ${
          toast.type === 'warning'
            ? 'bg-amber-900 text-amber-50 border-amber-700'
            : toast.type === 'info'
            ? 'bg-indigo-900 text-indigo-50 border-indigo-700'
            : 'bg-slate-900 text-white border-slate-700'
        }`}>
          {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-indigo-300" />}
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          <span>{toast.msg}</span>
        </div>
  );
}
