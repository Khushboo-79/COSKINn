import { BarChart, DownloadCloud, FileText, TrendingUp, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function ReportsScreen() {
  const [reportType, setReportType] = useState('valuation');
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Inventory Reports</h2>
          <p className="text-sm text-slate-500 mt-1">Generate and export detailed analytics on stock health.</p>
        </div>
        <button 
          onClick={() => setShowExportModal(true)}
          className="bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-700 transition-colors flex items-center gap-2 shadow-sm">
          <DownloadCloud className="w-4 h-4" /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 cursor-pointer hover:border-rose-300 transition-colors" onClick={() => setReportType('valuation')}>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${reportType === 'valuation' ? 'bg-rose-500 text-white shadow-md shadow-rose-200' : 'bg-slate-50 text-slate-500'}`}>
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Stock Valuation</p>
            <p className="text-xs text-slate-500">Current monetary value</p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 cursor-pointer hover:border-rose-300 transition-colors" onClick={() => setReportType('movement')}>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${reportType === 'movement' ? 'bg-rose-500 text-white shadow-md shadow-rose-200' : 'bg-slate-50 text-slate-500'}`}>
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Movement History</p>
            <p className="text-xs text-slate-500">In/Out velocity</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 cursor-pointer hover:border-rose-300 transition-colors" onClick={() => setReportType('aging')}>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${reportType === 'aging' ? 'bg-rose-500 text-white shadow-md shadow-rose-200' : 'bg-slate-50 text-slate-500'}`}>
            <BarChart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Inventory Aging</p>
            <p className="text-xs text-slate-500">Slow-moving items</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 min-h-[400px] flex flex-col items-center justify-center text-center">
        <FileText className="w-12 h-12 text-slate-300 mb-4" />
        <h3 className="text-lg font-bold text-slate-800">Report Ready to Generate</h3>
        <p className="text-sm text-slate-500 max-w-md mt-2">
          Select a date range and click generate to view the <span className="font-semibold text-slate-700 capitalize">{reportType}</span> report.
        </p>
        <div className="flex gap-4 mt-6">
          <input type="date" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none" />
          <input type="date" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none" />
          <button className="bg-rose-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-rose-700 transition-colors">
            Generate Data
          </button>
        </div>
      </div>

      {/* Export Config Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Export Report Options</h3>
              <button 
                onClick={() => setShowExportModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xl"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">File Format</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input type="radio" name="format" defaultChecked className="text-rose-600" />
                    CSV (Excel compatible)
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input type="radio" name="format" className="text-rose-600" />
                    PDF Document
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Data Scope</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500">
                  <option>Current View (Selected Date Range)</option>
                  <option>All Time History</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  onClick={() => setShowExportModal(false)}
                  className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    toast.success('Report downloaded! (Mock)');
                    setShowExportModal(false);
                  }}
                  className="flex-1 bg-rose-600 text-white py-3 rounded-xl font-semibold hover:bg-rose-700 transition-colors shadow-sm shadow-rose-200 flex items-center justify-center gap-2"
                >
                  <DownloadCloud className="w-4 h-4" /> Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
