export function WhatRemainsGuide() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Project Delivery Handover</span>
        <h2 className="text-xl font-bold text-slate-900 mt-1">
          What Has Been Built vs. What Remains for You to Do Yourself
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          This interactive frontend prototype implements all core workflows, role portals, constraint validation, and the substitute ranking algorithm in-browser. To turn this into a live, multi-school SaaS product in production (as outlined in Sections 7–10 of your `.docx`), here is your step-by-step checklist:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="font-bold text-sm text-slate-900">1. Backend API & PostgreSQL Multi-Tenancy (Phase 0 & 2)</div>
          <p className="text-slate-600 leading-relaxed">
            Right now, state is stored in React memory. You need to set up a <strong>PostgreSQL</strong> database with tables keyed by <code>school_id</code> (Row-Level Security) and expose CRUD REST endpoints using <strong>Python + FastAPI</strong>.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="font-bold text-sm text-slate-900">2. Google OR-Tools CP-SAT Solver Service (Phase 1)</div>
          <p className="text-slate-600 leading-relaxed">
            While our in-browser JS constraint solver handles 4–10 classes easily, large schools with 40+ classes and 80+ teachers require <strong>Google OR-Tools (`ortools.sat.python.cp_model`)</strong> running on your FastAPI backend so complex mathematical optimization finishes in seconds.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="font-bold text-sm text-slate-900">3. Real Authentication & Role-Based Access (RBAC)</div>
          <p className="text-slate-600 leading-relaxed">
            Replace the top Role Switcher bar with real JWT/OAuth login (e.g., Clerk, Supabase Auth, or NextAuth) so Teachers can only view their own schedule and Students/Parents can only view their assigned Class Section.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="font-bold text-sm text-slate-900">4. Open Product Decisions from Section 10 of Your Docx</div>
          <p className="text-slate-600 leading-relaxed">
            Before piloting with your first school, finalize: (a) your tie-breaker rule when two free teachers have the exact same number of free periods, (b) SMS/WhatsApp/Email notifications (Twilio/Resend) when a substitute is assigned, and (c) Docker deployment on Render or Railway.
          </p>
        </div>
      </div>
    </div>
  );
}
