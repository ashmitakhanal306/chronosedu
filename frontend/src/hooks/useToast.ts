import { useCallback, useState } from 'react';
import type { ToastState, ToastType } from '../domain/types';

export function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null);
  const showToast = useCallback((msg: string, type: ToastType = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  }, []);
  return { toast, showToast };
}
