import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { ExportButtons } from './components/ExportButtons';
import { AddRemarkModal } from './components/AddRemarkModal';

const useAuditLogs = (entity: string) => useQuery({
  queryKey: ['auditLogs', entity],
  queryFn: async () => {
    const { data } = await api.get(`/admin/audit/logs?entity=${entity}`);
    return data;
  }
});

export const PriceChangeLog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: logs, isLoading } = useAuditLogs('ProductPrice');


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
        <h2 className="text-2xl font-bold text-rose-900">Price Change Logs</h2>
      </div>
      
      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-rose-800 mb-1">Product SKU / Name</label>
          <input type="text" placeholder="Search product..." className="w-full border-rose-200 rounded-md shadow-sm p-2 bg-rose-50/30 text-rose-900 focus:ring-rose-500 focus:border-rose-500 placeholder-rose-300" />
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-rose-800 mb-1">Start Date</label>
          <input type="date" className="w-full border-rose-200 rounded-md shadow-sm p-2 bg-rose-50/30 text-rose-900 focus:ring-rose-500 focus:border-rose-500" />
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-rose-800 mb-1">End Date</label>
          <input type="date" className="w-full border-rose-200 rounded-md shadow-sm p-2 bg-rose-50/30 text-rose-900 focus:ring-rose-500 focus:border-rose-500" />
        </div>
        
        <div className="w-auto flex space-x-2">
          <button className="bg-rose-500 hover:bg-rose-600 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors">
            Filter
          </button>
          <ExportButtons />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm border border-rose-100 overflow-hidden">
        <table className="min-w-full divide-y divide-rose-100">
          <thead className="bg-rose-50/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Before / After</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Changed By</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Remarks</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-rose-50">
            {isLoading ? (
              <tr><td colSpan={7} className="text-center p-4">Loading...</td></tr>
            ) : logs?.map((log: any) => {
              const oldD = log.oldData ? JSON.parse(log.oldData) : {};
              const newD = log.newData ? JSON.parse(log.newData) : {};
              return (
                <tr key={log.id} className="hover:bg-rose-50/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(log.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-rose-900">
                    <div className="font-semibold">{log.entityId}</div>
                    <div className="text-gray-500 text-xs">{newD.productName || 'Unknown'}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500 line-through">{oldD.price}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      <span className="font-medium text-rose-800">{newD.price}</span>
                    </div>
                    <div className="text-xs text-rose-500 mt-1">Reason: {newD.reason}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{log.adminId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="text-rose-600 hover:text-rose-900 hover:underline font-medium"
                    >
                      Add Remark
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
      <AddRemarkModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
