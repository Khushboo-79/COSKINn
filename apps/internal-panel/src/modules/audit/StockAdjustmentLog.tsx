import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExportButtons } from './components/ExportButtons';
import { AddRemarkModal } from './components/AddRemarkModal';

export const StockAdjustmentLog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Mock data for Day 4 UI scaffolding
  const mockLogs = [
    {
      id: 1,
      timestamp: '2026-07-04 12:05:00',
      productSku: 'SKU-8801',
      productName: 'Vitamin C Face Serum',
      changedBy: 'warehouse_mgr@coskinn.com',
      beforeQty: 150,
      afterQty: 132,
      reasonCode: 'DAMAGE_WRITEOFF',
      details: 'Damaged during transit',
    },
    {
      id: 2,
      timestamp: '2026-07-03 16:20:15',
      productSku: 'SKU-7722',
      productName: 'Niacinamide Cleanser',
      changedBy: 'inventory@coskinn.com',
      beforeQty: 200,
      afterQty: 190,
      reasonCode: 'EXPIRY_DISPOSAL',
      details: 'Expired batch #B-991',
    },
    {
      id: 3,
      timestamp: '2026-07-01 10:30:00',
      productSku: 'SKU-9918',
      productName: 'Retinol Night Cream',
      changedBy: 'admin@coskinn.com',
      beforeQty: 120,
      afterQty: 150,
      reasonCode: 'MANUAL_RESTOCK',
      details: 'Emergency restock from offline store',
    },
  ];

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
        <h2 className="text-2xl font-bold text-rose-900">Stock Adjustment Logs</h2>
      </div>
      
      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-rose-800 mb-1">Product SKU / Name</label>
          <input type="text" placeholder="Search product..." className="w-full border-rose-200 rounded-md shadow-sm p-2 bg-rose-50/30 text-rose-900 focus:ring-rose-500 focus:border-rose-500 placeholder-rose-300" />
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-rose-800 mb-1">Reason Code</label>
          <select className="w-full border-rose-200 rounded-md shadow-sm p-2 bg-rose-50/30 text-rose-900 focus:ring-rose-500 focus:border-rose-500">
            <option>All Reasons</option>
            <option>DAMAGE_WRITEOFF</option>
            <option>EXPIRY_DISPOSAL</option>
            <option>MANUAL_RESTOCK</option>
            <option>STOCK_TRANSFER</option>
          </select>
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
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Reason Code</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Quantity Change</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Changed By</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Remarks</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-rose-50">
            {mockLogs.map((log) => (
              <tr key={log.id} className="hover:bg-rose-50/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                <td className="px-6 py-4 text-sm text-rose-900">
                  <div className="font-semibold">{log.productSku}</div>
                  <div className="text-gray-500 text-xs">{log.productName}</div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                    {log.reasonCode}
                  </span>
                  <div className="text-xs text-gray-500 mt-1">{log.details}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">{log.beforeQty}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <span className={`font-semibold ${log.afterQty < log.beforeQty ? 'text-red-600' : 'text-green-600'}`}>
                      {log.afterQty}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{log.changedBy}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button onClick={() => setIsModalOpen(true)} className="text-rose-600 hover:text-rose-800 font-medium transition-colors text-xs">
                    + Add Remark
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <AddRemarkModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
