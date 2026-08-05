import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../core/rbac/AuthContext';
import { ReturnListScreen } from '../orders/ReturnListScreen';
import { ReturnsQCScreen } from '../warehouse/ReturnsQCScreen';
import { RefreshCcw, PackageSearch } from 'lucide-react';

export const ReturnsRouter = () => {
  const { user } = useAuth();
  const location = useLocation();

  const hasSupportAccess = user?.panel_access.includes('admin') || user?.panel_access.includes('support') || user?.panel_access.includes('orders');
  const hasWarehouseAccess = user?.panel_access.includes('admin') || user?.panel_access.includes('warehouse');

  const tabs = [];
  if (hasSupportAccess) {
    tabs.push({ id: 'requests', label: 'Return Requests', path: '/returns/requests', icon: RefreshCcw });
  }
  if (hasWarehouseAccess) {
    tabs.push({ id: 'qc', label: 'Physical QC', path: '/returns/qc', icon: PackageSearch });
  }

  // If no tabs available, this shouldn't happen due to RequirePanel, but fallback to 403
  if (tabs.length === 0) {
    return <Navigate to="/403" replace />;
  }

  // If at root /returns, redirect to the first available tab
  if (location.pathname === '/returns' || location.pathname === '/returns/') {
    return <Navigate to={tabs[0].path} replace />;
  }

  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      {/* Module Header & Tabs */}
      <div className="bg-white border-b border-slate-200 px-8 py-4">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center mb-4">
          <RefreshCcw className="h-6 w-6 mr-3 text-primary-500" />
          Returns & QC Panel
        </h1>
        
        {/* Navigation Tabs */}
        {tabs.length > 1 && (
          <div className="flex space-x-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = location.pathname.startsWith(tab.path);
              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                  className={`flex items-center pb-3 border-b-2 font-medium transition-colors ${
                    isActive
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        <Routes>
          {hasSupportAccess && <Route path="/requests" element={<ReturnListScreen />} />}
          {hasWarehouseAccess && <Route path="/qc" element={<ReturnsQCScreen />} />}
          <Route path="*" element={<Navigate to={tabs[0].path} replace />} />
        </Routes>
      </div>
    </div>
  );
};
