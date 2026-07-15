import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { ExportButtons } from './components/ExportButtons';

export const SalesReport = () => {
  const { data: reports = [], isLoading } = useQuery({
    queryKey: ['auditSalesReport'],
    queryFn: async () => {
      const res = await api.get('/admin/audit/sales-report');
      return res.data;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Link 
          to="/audit" 
          className="group bg-white border border-rose-100 text-rose-700 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:border-rose-300 hover:text-rose-900 transition-all duration-300 font-semibold text-sm flex items-center px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>
        <h2 className="text-2xl font-bold text-rose-900">Sales Reports (Read-Only)</h2>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100">
          <div className="text-sm text-gray-500 mb-1">Total Net Sales (MTD)</div>
          <div className="text-2xl font-bold text-rose-900">₹58,950.00</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100">
          <div className="text-sm text-gray-500 mb-1">Total Orders (MTD)</div>
          <div className="text-2xl font-bold text-gray-800">1,255</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100">
          <div className="text-sm text-gray-500 mb-1">Total Discounts (MTD)</div>
          <div className="text-2xl font-bold text-rose-500">-₹4,500.00</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100">
          <div className="text-sm text-gray-500 mb-1">Total Refunds (MTD)</div>
          <div className="text-2xl font-bold text-red-500">-₹1,250.00</div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-rose-800 mb-1">Start Date</label>
          <input type="date" className="w-full border-rose-200 rounded-md shadow-sm p-2 bg-rose-50/30 text-rose-900 focus:ring-rose-500 focus:border-rose-500" />
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-rose-800 mb-1">End Date</label>
          <input type="date" className="w-full border-rose-200 rounded-md shadow-sm p-2 bg-rose-50/30 text-rose-900 focus:ring-rose-500 focus:border-rose-500" />
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-rose-800 mb-1">Aggregation</label>
          <select className="w-full border-rose-200 rounded-md shadow-sm p-2 bg-rose-50/30 text-rose-900 focus:ring-rose-500 focus:border-rose-500">
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>
        
        <div className="w-auto flex space-x-2">
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors">
            Generate Report
          </button>
          <ExportButtons data={reports} filename="sales_report" />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm border border-rose-100 overflow-hidden">
        <table className="min-w-full divide-y divide-rose-100">
          <thead className="bg-rose-50/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-rose-800 uppercase tracking-wider">Total Orders</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-rose-800 uppercase tracking-wider">Gross Sales</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-rose-800 uppercase tracking-wider">Discounts</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-rose-800 uppercase tracking-wider">Refunds</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-rose-800 uppercase tracking-wider">Net Sales</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-rose-50">
            {isLoading ? (
              <tr><td colSpan={6} className="px-6 py-4 text-center text-sm text-slate-500">Loading...</td></tr>
            ) : reports.map((report: any) => (
              <tr key={report.id} className="hover:bg-rose-50/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-rose-900">{report.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.totalOrders}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{report.grossSales.toLocaleString('en-IN')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-rose-600 font-medium">-₹{report.discounts.toLocaleString('en-IN')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-rose-600 font-medium">-₹{report.refunds.toLocaleString('en-IN')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-emerald-600">₹{report.netSales.toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};
