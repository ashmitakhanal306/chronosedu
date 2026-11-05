import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button, Card } from '../ui/primitives';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled Chronos runtime error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
          <Card className="bg-slate-800 border-slate-700 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-4 text-white">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold">Something went wrong</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {this.state.error?.message || 'An unexpected client error occurred.'}
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Button variant="primary"
                type="button"
                onClick={() => {
                  try {
                    localStorage.removeItem('chronos_user');
                  } catch {}
                  window.location.reload();
                }}
                className="bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Platform</span>
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
