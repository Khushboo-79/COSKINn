import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../../core/api/admin';
import { SalesOrderWidget } from './widgets/SalesOrderWidget';
import { InventoryWidget } from './widgets/InventoryWidget';
import { FinanceWidget } from './widgets/FinanceWidget';
import { MarketingWidget } from './widgets/MarketingWidget';
import { HrWidget } from './widgets/HrWidget';
import { SupportWidget } from './widgets/SupportWidget';
import { LayoutDashboard, Settings, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboardScreen = () => {
  const { data: overview, isLoading } = useQuery({
    queryKey: ['admin', 'overview-system'],
    queryFn: () => adminApi.getOverview()
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header & Global System Status */}
      <div className="flex justify-between items-end bg-slate-900 rounded-3xl p-8 text-white shadow-xl bg-gradient-to-br from-slate-900 to-indigo-950">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <LayoutDashboard className="h-8 w-8 mr-3 text-indigo-400" />
            Master Dashboard
          </h1>
          <p className="text-slate-400 text-sm mt-2 max-w-lg">
            Global aggregation of operational data across Sales, Inventory, Finance, and HR panels.
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 flex flex-col items-end">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">System Health</span>
            <div className="flex items-center text-emerald-400 font-bold">
              <Activity className="h-4 w-4 mr-1.5" />
              {isLoading ? 'Checking...' : overview?.systemHealth || '100%'}
            </div>
          </div>
          <Link to="/admin/settings" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors rounded-xl p-4 border border-white/10 flex flex-col items-center justify-center">
            <Settings className="h-5 w-5 text-slate-300" />
            <span className="text-xs font-medium text-slate-300 mt-1">Settings</span>
          </Link>
        </div>
      </div>

      {/* Widget Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SalesOrderWidget />
        <InventoryWidget />
        <FinanceWidget />
        <MarketingWidget />
        <HrWidget />
        <SupportWidget />
      </div>
    </div>
  );
};
