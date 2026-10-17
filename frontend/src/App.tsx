// COMPOSITION ROOT — wires state (hook) to role-specific portals. No business logic here.
import { useTimetableApp } from './hooks/useTimetableApp';
import { Header } from './components/layout/Header';
import { Toast } from './components/layout/Toast';
import { OverrideModal } from './components/timetable/OverrideModal';
import { LoginModal } from './components/layout/LoginModal';
import { AdminPortal } from './features/admin/AdminPortal';
import { TeacherPortal } from './features/teacher/TeacherPortal';
import { StudentPortal } from './features/student/StudentPortal';

export default function App() {
  const app = useTimetableApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Toast toast={app.toast} />
      <Header app={app} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {app.activeRole === 'admin' && <AdminPortal app={app} />}
        {app.activeRole === 'teacher' && <TeacherPortal app={app} />}
        {app.activeRole === 'student' && <StudentPortal app={app} />}
      </main>

      <OverrideModal app={app} />
      {app.isAuthModalOpen && <LoginModal app={app} />}
    </div>
  );
}
