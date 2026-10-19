import { Download, FileSpreadsheet, Printer, CheckCircle2, FileText, Calendar, Building2 } from 'lucide-react';
import type { TimetableApp } from '../../hooks/useTimetableApp';

export function ExportsTab({ app }: { app: TimetableApp }) {
  const { activeSchool, exportCsv, exportExcel, exportPrintPdf } = app;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Subheader */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
            <Printer className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider bg-indigo-100/70 px-2 py-0.5 rounded-full">
                Reporting &amp; Dispatch
              </span>
              <h2 className="text-base font-bold text-slate-900">Exports &amp; Print-Ready Timetables</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Export conflict-free schedules for parent handbooks, classroom notices, and staff room notice boards.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            {activeSchool.name} ({activeSchool.workingDays.length} Days)
          </span>
        </div>
      </div>

      {/* Export Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* CSV Export */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Standard CSV Export</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Raw tabular data including Class, Day, Period, Subject, Teacher, Room, and Override flags. Compatible with Google Sheets, Excel, and SIS software.
            </p>
          </div>

          <button
            onClick={exportCsv}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV (.csv)</span>
          </button>
        </div>

        {/* Excel Export */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Formatted Excel Spreadsheet</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Color-coded workbook with individual class sections and teacher workloads formatted for administration distribution.
            </p>
          </div>

          <button
            onClick={exportExcel}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Download Excel (.xls)</span>
          </button>
        </div>

        {/* Print / PDF Export */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-700">
              <Printer className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Print-Ready PDF Views</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              A4 Landscape grid with school header, bell schedule timings, teacher names, and room locations. Uses browser print engine for crystal clear PDF saving.
            </p>
          </div>

          <button
            onClick={exportPrintPdf}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Open Print / Save PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
