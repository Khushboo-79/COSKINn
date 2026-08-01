import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { ShieldAlert, Key, BarChart4, Package, RefreshCcw, Gift, Activity } from 'lucide-react';
import { ActivityLogScreen } from './ActivityLogScreen';
import { SessionLogScreen } from './SessionLogScreen';
import { FinancialReportsScreen } from './FinancialReportsScreen';
import { InventoryReportsScreen } from './InventoryReportsScreen';
import { RefundReportsScreen } from './RefundReportsScreen';
import { RewardUsageScreen } from './RewardUsageScreen';

const AuditorNav = () => {
  const location = useLocation();
  
  const tabs = [
    { name: 'Activity Logs', path: '/audit/activity', icon: ShieldAlert },
    { name: 'Session Logs', path: '/audit/sessions', icon: Key },
    { name: 'Financial Reports', path: '/audit/finance', icon: BarChart4 },
    { name: 'Inventory Logs', path: '/audit/inventory', icon: Package },
    { name: 'Refunds Ledger', path: '/audit/refunds', icon: RefreshCcw },
    { name: 'Reward Usage', path: '/audit/rewards', icon: Gift },
  ];

  return (
    <div className="flex border-b border-slate-200 bg-white mb-6 rounded-2xl shadow-sm overflow-x-auto px-2 scrollbar-hide">
      {tabs.map((tab) => {
        const isActive = location.pathname.startsWith(tab.path);
        const Icon = tab.icon;
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex items-center whitespace-nowrap px-4 py-4 text-sm font-medium border-b-2 transition-colors ${
              isActive
                ? 'border-rose-600 text-rose-700 bg-rose-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50/50'
            }`}
          >
            <Icon className="h-4 w-4 mr-2" />
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
};

export const AuditRouter = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 p-6 overflow-y-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-black text-slate-900 flex items-center">
          <Activity className="h-6 w-6 mr-2 text-rose-600" />
          Auditor Panel
        </h1>
        <p className="text-sm text-slate-500 mt-1">Strict read-only oversight and system-wide logging.</p>
      </div>
      
      <AuditorNav />
      <Routes>
        <Route path="/" element={<Navigate to="/audit/activity" replace />} />
        <Route path="/activity" element={<ActivityLogScreen />} />
        <Route path="/sessions" element={<SessionLogScreen />} />
        <Route path="/finance" element={<FinancialReportsScreen />} />
        <Route path="/inventory" element={<InventoryReportsScreen />} />
        <Route path="/refunds" element={<RefundReportsScreen />} />
        <Route path="/rewards" element={<RewardUsageScreen />} />
        <Route path="*" element={<Navigate to="/audit/activity" replace />} />
      </Routes>
    </div>
  );
};
