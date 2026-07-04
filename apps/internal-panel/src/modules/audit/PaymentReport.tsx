import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExportButtons } from './components/ExportButtons';
import { AddRemarkModal } from './components/AddRemarkModal';

export const PaymentReport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Mock data for Day 12 UI scaffolding
  const mockReports = [
    {
      id: 1,
      timestamp: '2026-07-04 15:30:00',
      orderId: 'ORD-104992',
      txnId: 'pay_Mxyz901',
      gateway: 'Razorpay',
      amount: '₹120.00',
      status: 'SUCCESS',
      webhookEvent: 'payment.captured',
      signatureValid: true,
    },
    {
      id: 2,
      timestamp: '2026-07-04 14:15:22',
      orderId: 'ORD-104991',
      txnId: 'pay_Mxyz900',
      gateway: 'Razorpay',
      amount: '₹45.00',
      status: 'FAILED',
      webhookEvent: 'payment.failed',
      signatureValid: true,
    },
    {
      id: 3,
      timestamp: '2026-07-03 23:55:10',
      orderId: 'ORD-104900',
      txnId: 'pay_Mxyz850',
      gateway: 'Razorpay',
      amount: '₹210.00',
      status: 'SUSPICIOUS',
      webhookEvent: 'payment.authorized',
      signatureValid: false,
    },
    {
      id: 4,
      timestamp: '2026-07-03 10:20:00',
      orderId: 'ORD-104882',
      txnId: 'wallet_txn_77',
      gateway: 'Internal Wallet',
      amount: '₹55.00',
      status: 'SUCCESS',
      webhookEvent: 'wallet.deducted',
      signatureValid: true,
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
        <h2 className="text-2xl font-bold text-rose-900">Payment & Webhook Reports</h2>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100">
          <div className="text-sm text-gray-500 mb-1">Total Processed (MTD)</div>
          <div className="text-2xl font-bold text-gray-800">₹64,250.00</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100">
          <div className="text-sm text-gray-500 mb-1">Successful Txns</div>
          <div className="text-2xl font-bold text-green-600">1,342</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100">
          <div className="text-sm text-gray-500 mb-1">Failed Txns</div>
          <div className="text-2xl font-bold text-rose-500">48</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100 bg-amber-50">
          <div className="text-sm text-amber-700 mb-1">Signature Failures</div>
          <div className="text-2xl font-bold text-red-600">2</div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-rose-800 mb-1">Txn ID / Order ID</label>
          <input type="text" placeholder="Search..." className="w-full border-rose-200 rounded-md shadow-sm p-2 bg-rose-50/30 text-rose-900 focus:ring-rose-500 focus:border-rose-500 placeholder-rose-300" />
        </div>
        
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-rose-800 mb-1">Gateway</label>
          <select className="w-full border-rose-200 rounded-md shadow-sm p-2 bg-rose-50/30 text-rose-900 focus:ring-rose-500 focus:border-rose-500">
            <option>All Gateways</option>
            <option>Razorpay</option>
            <option>Internal Wallet</option>
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-rose-800 mb-1">Signature Validation</label>
          <select className="w-full border-rose-200 rounded-md shadow-sm p-2 bg-rose-50/30 text-rose-900 focus:ring-rose-500 focus:border-rose-500">
            <option>All</option>
            <option>Valid Only</option>
            <option>Failures Only</option>
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
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Txn / Order</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Gateway & Amount</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Webhook Event</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Signature</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Remarks</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-rose-50">
            {mockReports.map((report) => (
              <tr key={report.id} className={`transition-colors ${!report.signatureValid ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-rose-50/30'}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.timestamp}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="font-mono text-gray-900">{report.txnId}</div>
                  <div className="text-gray-500 text-xs mt-1">Order: {report.orderId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="font-bold text-gray-900">{report.amount}</div>
                  <div className="text-gray-500 text-xs">{report.gateway}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 font-mono">
                    {report.webhookEvent}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {report.signatureValid ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Valid
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      INVALID
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    report.status === 'SUCCESS' ? 'bg-green-100 text-green-800' :
                    report.status === 'FAILED' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {report.status}
                  </span>
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
