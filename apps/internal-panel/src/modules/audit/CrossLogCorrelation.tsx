import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExportButtons } from './components/ExportButtons';
import { AddRemarkModal } from './components/AddRemarkModal';

export const CrossLogCorrelation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Mock data showing a single entity (Order ID) moving across multiple systems
  const mockCorrelationLogs = [
    {
      id: 1,
      timestamp: '2026-07-04 10:15:00',
      system: 'Order Management',
      action: 'ORDER_CREATED',
      actor: 'jane.doe@example.com (Customer)',
      details: 'Order ORD-104990 created with 2 items. Total: ₹145.00',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      id: 2,
      timestamp: '2026-07-04 10:15:05',
      system: 'Payment Gateway (Razorpay)',
      action: 'PAYMENT_CAPTURED',
      actor: 'System Webhook',
      details: 'Txn: pay_Mxyz901 | Amount: ₹145.00 | Status: SUCCESS | Signature: VALID',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      id: 3,
      timestamp: '2026-07-04 10:15:08',
      system: 'Marketing / Rewards',
      action: 'POINTS_EARNED',
      actor: 'System (Automated)',
      details: 'Credited 145 Loyalty Points to jane.doe@example.com',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      id: 4,
      timestamp: '2026-07-04 10:16:00',
      system: 'Inventory Module',
      action: 'STOCK_ALLOCATED',
      actor: 'System (Automated)',
      details: 'Allocated 1x SKU-8801, 1x SKU-9918. Decremented available stock.',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    {
      id: 5,
      timestamp: '2026-07-04 11:30:22',
      system: 'Order Management',
      action: 'STATUS_OVERRIDE',
      actor: 'support_admin@coskinn.com (Admin)',
      details: 'Manual override: PROCESSING -> ON_HOLD. Reason: Customer requested address change.',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      flagged: true,
    }
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
        <h2 className="text-2xl font-bold text-rose-900">Cross-Log Correlation</h2>
      </div>

      <div className="bg-gradient-to-r from-rose-50 to-white p-6 rounded-xl border border-rose-100 shadow-sm">
        <h3 className="text-lg font-bold text-rose-900 mb-2">Universal Search Engine</h3>
        <p className="text-sm text-gray-600 mb-4">
          Enter an Order ID, SKU, User Email, or Transaction ID to instantly surface and correlate every related audit event across all internal systems.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              aria-label="Universal Search Input"
              defaultValue="ORD-104990"
              className="w-full pl-10 border-rose-300 rounded-lg shadow-sm p-3 bg-white text-gray-900 focus:ring-rose-500 focus:border-rose-500 font-mono"
            />
          </div>
          <button className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-lg shadow-sm transition-colors md:w-auto w-full">
            Correlate Logs
          </button>
          <ExportButtons />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-rose-100 p-6">
        <h3 className="text-md font-bold text-gray-800 mb-6 border-b border-gray-100 pb-3">
          Timeline for: <span className="text-rose-600 font-mono">ORD-104990</span>
        </h3>
        
        <div className="relative border-l-2 border-rose-100 ml-4 space-y-8 pb-4">
          {mockCorrelationLogs.map((log) => (
            <div key={log.id} className="relative pl-8">
              {/* Timeline dot */}
              <div className={`absolute -left-[13px] top-1 h-6 w-6 rounded-full border-4 border-white ${log.iconBg} ${log.iconColor} flex items-center justify-center shadow-sm`}>
                <div className="h-2 w-2 bg-current rounded-full"></div>
              </div>
              
              <div className={`bg-white border ${log.flagged ? 'border-red-200 shadow-sm' : 'border-gray-100'} rounded-lg p-4 hover:shadow-md transition-shadow`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2">
                      {log.system}
                    </span>
                    <span className="font-bold text-gray-900">{log.action}</span>
                    {log.flagged && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-800">
                        FLAGGED
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 font-mono">{log.timestamp}</div>
                </div>
                
                <p className="text-sm text-gray-700 mb-3">{log.details}</p>
                
                <div className="flex justify-between items-center text-xs border-t border-gray-50 pt-3 mt-3">
                  <div className="text-gray-500">
                    <span className="font-semibold text-gray-700 mr-1">Actor:</span> 
                    {log.actor}
                  </div>
                  <button onClick={() => setIsModalOpen(true)} className="text-rose-600 hover:text-rose-800 font-medium transition-colors">
                    + Add Remark
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <AddRemarkModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
