import { Download, FileSpreadsheet, Printer, CheckCircle2, FileText, Calendar, Building2 } from 'lucide-react';
import type { TimetableApp } from '../../hooks/useTimetableApp';
import { Badge, Button, Card } from '../../components/ui/primitives';

export function ExportsTab({ app }: { app: TimetableApp }) {
  const { activeSchool, exportCsv, exportExcel, exportPrintPdf } = app;

  return (
    <div className="w-full min-w-0 space-y-4 sm:space-y-5 animate-in fade-in duration-200">
      {/* Subheader */}
      <Card className="rounded-2xl p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
            <Printer className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Badge className="uppercase tracking-wider border-brand-100 bg-brand-50 text-brand-700">
                Reporting &amp; Dispatch
              </Badge>
              <h2 className="text-base font-bold text-slate-900">Exports &amp; Print-Ready Timetables</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Export conflict-free schedules for parent handbooks, classroom notices, and staff room notice boards.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="border-slate-200 bg-slate-50 text-slate-700">
            {activeSchool.name} ({activeSchool.workingDays.length} Days)
          </Badge>
        </div>
      </Card>

      {/* Export Cards Grid */}
      <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        {/* CSV Export */}
        <Card className="min-w-0 rounded-2xl p-4 sm:p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Standard CSV Export</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Raw tabular data including Class, Day, Period, Subject, Teacher, Room, and Override flags. Compatible with Google Sheets, Excel, and SIS software.
            </p>
          </div>

          <Button
            variant="secondary"
            onClick={exportCsv}
            className="w-full justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV (.csv)</span>
          </Button>
        </Card>

        {/* Excel Export */}
        <Card className="min-w-0 rounded-2xl p-4 sm:p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Formatted Excel Spreadsheet</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Color-coded workbook with individual class sections and teacher workloads formatted for administration distribution.
            </p>
          </div>

          <Button
            variant="primary"
            onClick={exportExcel}
            className="w-full justify-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Download Excel (.xls)</span>
          </Button>
        </Card>

        {/* Print / PDF Export */}
        <Card className="min-w-0 rounded-2xl p-4 sm:p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-700">
              <Printer className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Print-Ready PDF Views</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              A4 Landscape grid with school header, bell schedule timings, teacher names, and room locations. Uses browser print engine for crystal clear PDF saving.
            </p>
          </div>

          <Button
            variant="secondary"
            onClick={exportPrintPdf}
            className="w-full justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Open Print / Save PDF</span>
          </Button>
        </Card>
      </div>
    </div>
  );
}
