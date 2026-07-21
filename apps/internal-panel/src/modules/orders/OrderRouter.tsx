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
