import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const buttonVariantClass: Record<ButtonVariant, string> = {
  primary: 'ui-button-primary',
  secondary: 'ui-button-secondary',
  destructive: 'ui-button-destructive',
  ghost: 'ui-button-ghost',
};

export function Button({ variant = 'secondary', className = '', type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={`ui-button ${buttonVariantClass[variant]} ${className}`} {...props} />;
}

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`ui-card ${className}`} {...props} />;
}

export function Badge({ className = '', ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={`ui-badge ${className}`} {...props} />;
}

export function Input({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  const controlClass = props.type === 'checkbox' || props.type === 'radio' ? 'ui-checkbox' : 'ui-input';
  return <input className={`${controlClass} ${className}`} {...props} />;
}

export function Select({ className = '', ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={`ui-select ${className}`} {...props} />;
}

interface FeedbackProps {
  variant: 'loading' | 'empty' | 'error';
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function Feedback({ variant, message, actionLabel, onAction, className = '' }: FeedbackProps) {
  const styles = {
    loading: 'border-slate-200 bg-slate-50 text-slate-700',
    empty: 'border-slate-200 bg-slate-50 text-slate-700',
    error: 'border-rose-200 bg-rose-50 text-rose-800',
  };
  return (
    <div role={variant === 'error' ? 'alert' : 'status'} aria-busy={variant === 'loading'} className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-sm ${styles[variant]} ${className}`}>
      <span className="flex items-center gap-2">
        {variant === 'loading' && <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none" />}
        {message}
      </span>
      {actionLabel && onAction && <Button variant={variant === 'error' ? 'secondary' : 'ghost'} onClick={onAction} className="min-h-9">{actionLabel}</Button>}
    </div>
  );
}
