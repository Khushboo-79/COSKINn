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
    <div className="flex border-b border-slate-200 bg-white mb-6 rounded-2xl shadow-sm overflow-x-auto px-2 scrollbar-hide w-full">
        {tabs.map((tab) => {
          const isActive = tab.exact ? location.pathname === tab.path : location.pathname.startsWith(tab.path);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.name || tab.path}
              to={tab.path}
              className={`flex items-center whitespace-nowrap px-5 py-4 text-sm font-bold border-b-2 transition-all duration-300 ease-out active:scale-95 ${
                isActive
                  ? 'border-[#FF7F50] text-[#FF7F50] bg-gradient-to-t from-[#FF7F50]/10 to-transparent shadow-[inset_0_-2px_4px_rgba(255,127,80,0.1)]'
                  : 'border-transparent text-slate-500 hover:text-[#FF7F50] hover:bg-gradient-to-t hover:from-[#FF7F50]/5 hover:to-transparent'
              }`}
            >
              <Icon className={`h-4 w-4 mr-2.5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-6'}`} />
              {tab.name}
            </Link>
          );
        })}
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
