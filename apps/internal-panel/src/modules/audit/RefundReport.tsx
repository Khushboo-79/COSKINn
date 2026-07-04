import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExportButtons } from './components/ExportButtons';
import { AddRemarkModal } from './components/AddRemarkModal';

export const RefundReport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Mock data for Day 10 UI scaffolding
  const mockReports = [
    {
      id: 1,
      initiationDate: '2026-07-04 10:15:00',
      orderId: 'ORD-104990',
      customer: 'jane.doe@example.com',
      amount: '₹145.00',
      method: 'Razorpay',
      status: 'COMPLETED',
      completionDate: '2026-07-04 14:20:00',
      txnRef: 'rfnd_Mxyz8839',
    },
    {
      id: 2,
      initiationDate: '2026-07-03 16:40:00',
      orderId: 'ORD-104812',
      customer: 'john.smith@example.com',
      amount: '₹35.00',
      method: 'Wallet (COD Default)',
      status: 'COMPLETED',
      completionDate: '2026-07-03 16:40:05',
      txnRef: 'txn_W99281',
    },
    {
      id: 3,
      initiationDate: '2026-07-04 09:00:00',
      orderId: 'ORD-105021',
      customer: 'alice.w@example.com',
      amount: '₹89.50',
      method: 'Razorpay',
      status: 'PROCESSING',
      completionDate: '-',
      txnRef: 'rfnd_Mabc1123',
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
        <h2 className="text-2xl font-bold text-rose-900">Refund Reports (Audit Trail)</h2>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100">
          <div className="text-sm text-gray-500 mb-1">Total Refunds Initiated (MTD)</div>
          <div className="text-2xl font-bold text-gray-800">45</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100">
          <div className="text-sm text-gray-500 mb-1">Total Refund Value (MTD)</div>
          <div className="text-2xl font-bold text-rose-900">₹2,450.00</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100">
          <div className="text-sm text-gray-500 mb-1">Pending Refunds</div>
          <div className="text-2xl font-bold text-amber-600">8</div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-rose-800 mb-1">Order ID / Customer</label>
          <input type="text" placeholder="Search..." className="w-full border-rose-200 rounded-md shadow-sm p-2 bg-rose-50/30 text-rose-900 focus:ring-rose-500 focus:border-rose-500 placeholder-rose-300" />
        </div>
        
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-rose-800 mb-1">Refund Method</label>
          <select className="w-full border-rose-200 rounded-md shadow-sm p-2 bg-rose-50/30 text-rose-900 focus:ring-rose-500 focus:border-rose-500">
            <option>All Methods</option>
            <option>Razorpay</option>
            <option>Wallet (COD Default)</option>
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-rose-800 mb-1">Status</label>
          <select className="w-full border-rose-200 rounded-md shadow-sm p-2 bg-rose-50/30 text-rose-900 focus:ring-rose-500 focus:border-rose-500">
            <option>All Statuses</option>
            <option>COMPLETED</option>
            <option>PROCESSING</option>
            <option>FAILED</option>
          </select>
        </div>
        
        <div className="w-auto flex space-x-2">
          <button className="bg-rose-500 hover:bg-rose-600 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors">
            Filter Report
          </button>
          <ExportButtons />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm border border-rose-100 overflow-hidden">
        <table className="min-w-full divide-y divide-rose-100">
          <thead className="bg-rose-50/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Initiated</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Order / Customer</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Method & Amount</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Status & Completed</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Txn Ref</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Remarks</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-rose-50">
            {mockReports.map((report) => (
              <tr key={report.id} className="hover:bg-rose-50/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.initiationDate}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="font-semibold text-rose-900">{report.orderId}</div>
                  <div className="text-gray-500 text-xs">{report.customer}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="font-bold text-gray-900">{report.amount}</div>
                  <div className="text-gray-500 text-xs">{report.method}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-1 ${
                    report.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {report.status}
                  </span>
                  <div className="text-xs text-gray-500">{report.completionDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                  {report.txnRef}
                </td>
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
