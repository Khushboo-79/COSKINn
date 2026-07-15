import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { ExportButtons } from './components/ExportButtons';

const useAuditLogs = (entity: string) => useQuery({
  queryKey: ['auditLogs', entity],
  queryFn: async () => {
    const { data } = await api.get(`/admin/audit/logs?entity=${entity}`);
    return data;
  }
});

export const TaxReport = () => {
  const { data: logs, isLoading } = useAuditLogs('TaxReport');


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
        <h2 className="text-2xl font-bold text-rose-900">Tax & GST Reports (Read-Only)</h2>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100">
          <div className="text-sm text-gray-500 mb-1">Total Tax Collected (MTD)</div>
          <div className="text-2xl font-bold text-rose-900">₹14,850.00</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100">
          <div className="text-sm text-gray-500 mb-1">Total CGST (MTD)</div>
          <div className="text-2xl font-bold text-gray-800">₹6,045.00</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100">
          <div className="text-sm text-gray-500 mb-1">Total SGST (MTD)</div>
          <div className="text-2xl font-bold text-gray-800">₹6,045.00</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100">
          <div className="text-sm text-gray-500 mb-1">Total IGST (MTD)</div>
          <div className="text-2xl font-bold text-rose-600">₹2,760.00</div>
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
          <label className="block text-sm font-medium text-rose-800 mb-1">Tax Type</label>
          <select className="w-full border-rose-200 rounded-md shadow-sm p-2 bg-rose-50/30 text-rose-900 focus:ring-rose-500 focus:border-rose-500">
            <option>All Types</option>
            <option>Intra-State (CGST+SGST)</option>
            <option>Inter-State (IGST)</option>
          </select>
        </div>
        
        <div className="w-auto flex space-x-2">
          <button className="bg-rose-500 hover:bg-rose-600 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors">
            Generate Report
          </button>
          <ExportButtons />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm border border-rose-100 overflow-hidden">
        <table className="min-w-full divide-y divide-rose-100">
          <thead className="bg-rose-50/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Invoice Ref</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-rose-800 uppercase tracking-wider">Taxable Amount</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-rose-800 uppercase tracking-wider">CGST</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-rose-800 uppercase tracking-wider">SGST</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-rose-800 uppercase tracking-wider">IGST</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-rose-800 uppercase tracking-wider">Total Tax</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-rose-50">
            {isLoading ? (
              <tr><td colSpan={7} className="text-center p-4">Loading...</td></tr>
            ) : logs?.map((log: any) => {
              const r = log.newData ? JSON.parse(log.newData) : {};
              return (
                <tr key={log.id} className="hover:bg-rose-50/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(log.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-rose-900">{r.invoiceNumber || log.entityId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700">{r.taxableAmount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">{r.cgst}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">{r.sgst}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">{r.igst}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-rose-700">{r.totalTax}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};
