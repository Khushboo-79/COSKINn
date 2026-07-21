import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { LayoutGrid, ClipboardList, PackageCheck, PackageOpen, Truck, LayoutDashboard, BoxSelect, AlertTriangle, Settings2 } from 'lucide-react';
import { BinManagementScreen } from './BinManagementScreen';
import { PurchaseOrderScreen } from './PurchaseOrderScreen';
import { GRNScreen } from './GRNScreen';
import { OutboundScreen } from './OutboundScreen';
import { HandoverScreen } from './HandoverScreen';
import { WarehouseDashboard } from './WarehouseDashboard';
import { ReturnsQCScreen } from './ReturnsQCScreen';
import { ExceptionsScreen } from './ExceptionsScreen';
import { StockAdjustmentScreen } from './StockAdjustmentScreen';

const WarehouseNav = () => {
  const location = useLocation();
  const tabs = [
    { name: 'Dashboard', path: '/warehouse/dashboard', icon: LayoutDashboard },
    { name: 'POs', path: '/warehouse/pos', icon: ClipboardList },
    { name: 'Inbound (GRN)', path: '/warehouse/grn', icon: PackageCheck },
    { name: 'Outbound (Pick)', path: '/warehouse/outbound', icon: PackageOpen },
    { name: 'Handover', path: '/warehouse/handover', icon: Truck },
    { name: 'Returns QC', path: '/warehouse/returns-qc', icon: BoxSelect },
    { name: 'Exceptions', path: '/warehouse/exceptions', icon: AlertTriangle },
    { name: 'Adjustments', path: '/warehouse/adjustments', icon: Settings2 },
    { name: 'Bins', path: '/warehouse/bins', icon: LayoutGrid },
  ];

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-2 mb-6 -mx-6 -mt-6">
      <nav className="flex space-x-6">
        {tabs.map((tab) => {
          const isActive = tab.exact ? location.pathname === tab.path : location.pathname.startsWith(tab.path);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.name}
              to={tab.path}
              className={`flex items-center py-3 border-b-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {tab.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export const WarehouseRouter = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 p-6">
      <WarehouseNav />
      <Routes>
        <Route path="/" element={<Navigate to="/warehouse/dashboard" replace />} />
        <Route path="/dashboard" element={<WarehouseDashboard />} />
        <Route path="/pos" element={<PurchaseOrderScreen />} />
        <Route path="/grn" element={<GRNScreen />} />
        <Route path="/bins" element={<BinManagementScreen />} />
        <Route path="/outbound" element={<OutboundScreen />} />
        <Route path="/handover" element={<HandoverScreen />} />
        <Route path="/returns-qc" element={<ReturnsQCScreen />} />
        <Route path="/exceptions" element={<ExceptionsScreen />} />
        <Route path="/adjustments" element={<StockAdjustmentScreen />} />
        <Route path="*" element={<Navigate to="/warehouse/dashboard" replace />} />
      </Routes>
    </div>
  );
};
