import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExportButtons } from './components/ExportButtons';
import { AddRemarkModal } from './components/AddRemarkModal';

export const RewardUsageLog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Mock data for Day 7 UI scaffolding
  const mockLogs = [
    {
      id: 1,
      timestamp: '2026-07-04 16:30:00',
      user: 'alice@example.com',
      eventType: 'COUPON_REDEMPTION',
      value: '-₹15.00',
      referenceId: 'SUMMER_SALE_2026',
      flagged: false,
      details: 'Applied 15% off coupon to order ORD-105001',
    },
    {
      id: 2,
      timestamp: '2026-07-03 14:15:22',
      user: 'bob@example.com',
      eventType: 'REFERRAL_CREDIT',
      value: '+₹50.00',
      referenceId: 'REF-8849',
      flagged: true,
      details: 'ANOMALY: Multiple referrals credited to same device ID',
    },
    {
      id: 3,
      timestamp: '2026-07-02 09:10:00',
      user: 'charlie@example.com',
      eventType: 'POINTS_REDEEMED',
      value: '-500 pts',
      referenceId: 'ORD-104882',
      flagged: false,
      details: 'Redeemed 500 loyalty points for ₹5 off',
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
        <h2 className="text-2xl font-bold text-rose-900">Coupon & Rewards Usage</h2>
      </div>
      
      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-rose-800 mb-1">User / Email</label>
          <input type="text" placeholder="Search user..." className="w-full border-rose-200 rounded-md shadow-sm p-2 bg-rose-50/30 text-rose-900 focus:ring-rose-500 focus:border-rose-500 placeholder-rose-300" />
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-rose-800 mb-1">Event Type</label>
          <select className="w-full border-rose-200 rounded-md shadow-sm p-2 bg-rose-50/30 text-rose-900 focus:ring-rose-500 focus:border-rose-500">
            <option>All Events</option>
            <option>COUPON_REDEMPTION</option>
            <option>WALLET_TOPUP</option>
            <option>REFERRAL_CREDIT</option>
            <option>POINTS_REDEEMED</option>
            <option>POINTS_EARNED</option>
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-rose-800 mb-1">Anomaly Flags</label>
          <select className="w-full border-rose-200 rounded-md shadow-sm p-2 bg-rose-50/30 text-rose-900 focus:ring-rose-500 focus:border-rose-500">
            <option>All Entries</option>
            <option>Flagged Only</option>
            <option>Normal Only</option>
          </select>
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-rose-800 mb-1">Start Date</label>
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
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Event / Value</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Details</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Remarks</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-rose-50">
            {mockLogs.map((log) => (
              <tr key={log.id} className={`transition-colors ${log.flagged ? 'bg-amber-50 hover:bg-amber-100/50' : 'hover:bg-rose-50/30'}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-rose-900">{log.user}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="font-semibold text-gray-700">{log.eventType}</div>
                  <div className={`text-xs font-bold ${log.value.startsWith('+') ? 'text-green-600' : 'text-rose-500'}`}>
                    {log.value}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="text-xs text-gray-500 font-mono mb-1">Ref: {log.referenceId}</div>
                  <div className={log.flagged ? 'text-amber-800 font-medium' : ''}>{log.details}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {log.flagged ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-200 text-amber-900 border border-amber-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      ANOMALY
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Normal
                    </span>
                  )}
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
