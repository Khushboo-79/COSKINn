import { useState } from 'react';
import { Download, Filter, FileSpreadsheet, Calendar, BarChart } from 'lucide-react';

export default function OrderReportsScreen() {
  const [dateRange, setDateRange] = useState('Last 30 Days');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: '"Expletus Sans", sans-serif' }}>
            Order Reports & Analytics
          </h2>
          <p className="text-sm text-slate-500 mt-1">Export detailed order data, sales summaries, and operational metrics</p>
        </div>
        <button className="bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-700 transition-colors flex items-center gap-2 shadow-sm shadow-slate-200">
          <Download className="w-4 h-4" /> Export All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['Daily Sales Report', 'Fulfillment Metrics', 'Return Analysis', 'Courier Performance'].map((report, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-100 hover:shadow-md transition-all cursor-pointer group">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                {idx % 2 === 0 ? <BarChart className="w-5 h-5" /> : <FileSpreadsheet className="w-5 h-5" />}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-bold text-slate-800">{report}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">Detailed breakdown of {report.toLowerCase()} over the selected period.</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xs font-semibold text-indigo-600">View Report</span>
              <Download className="w-4 h-4 text-slate-400 hover:text-indigo-600" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-800">Generate Custom Report</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Report Type</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              <option>Order History (All Data)</option>
              <option>Sales by SKU</option>
              <option>Cancellations & Returns</option>
              <option>Tax Liability Report</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Date Range</label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <select 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option>Today</option>
                <option>Yesterday</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Month</option>
                <option>Custom Date Range</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Format</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              <option>CSV (Comma Separated)</option>
              <option>Excel (.xlsx)</option>
              <option>PDF Document</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
            Generate & Download
          </button>
        </div>
      </div>
    </div>
  );
}
