import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Truck, RefreshCcw, IndianRupee } from 'lucide-react';
import { OrderListScreen } from './OrderListScreen';
import { OrderDetailScreen } from './OrderDetailScreen';
import { InvoiceScreen } from './InvoiceScreen';
import { ShipmentScreen } from './ShipmentScreen';
import { ReturnListScreen } from './ReturnListScreen';
import { RefundListScreen } from './RefundListScreen';

const OrderNav = () => {
  const location = useLocation();
  const tabs = [
    { name: 'All Orders', path: '/orders', icon: ShoppingBag, exact: true },
    { name: 'Shipments', path: '/orders/shipments', icon: Truck },
    { name: 'Returns QC', path: '/orders/returns', icon: RefreshCcw },
    { name: 'Refunds', path: '/orders/refunds', icon: IndianRupee },
  ];

  // Don't show nav on detail/invoice screens
  if (location.pathname.split('/').length > 2 && !['shipments', 'returns', 'refunds'].includes(location.pathname.split('/')[2])) {
    return null;
  }

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

export const OrderRouter = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 p-6">
      <OrderNav />
      <Routes>
        <Route path="/" element={<OrderListScreen />} />
        <Route path="/shipments" element={<ShipmentScreen />} />
        <Route path="/returns" element={<ReturnListScreen />} />
        <Route path="/refunds" element={<RefundListScreen />} />
        <Route path="/:id" element={<OrderDetailScreen />} />
        <Route path="/:id/invoice" element={<InvoiceScreen />} />
        <Route path="*" element={<Navigate to="/orders" replace />} />
      </Routes>
    </div>
  );
};
