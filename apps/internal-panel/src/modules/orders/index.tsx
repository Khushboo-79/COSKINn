import { Routes, Route, Navigate } from 'react-router-dom';
import OrderList from './OrderList';
import OrderDetail from './OrderDetail';
import ReturnQueue from './ReturnQueue';
import { ShieldAlert } from 'lucide-react';

export function OrderModuleRoutes() {
  // In a real app, you'd check context. 
  // We'll mock a simple role check assuming ORDER_MANAGER for now.
  const hasAccess = true;

  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
        <ShieldAlert className="w-16 h-16 text-rose-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800">Access Denied</h2>
        <p className="mt-2">You don't have permission to access the Order Management module.</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<OrderList />} />
      <Route path="/returns" element={<ReturnQueue />} />
      <Route path="/:id" element={<OrderDetail />} />
      <Route path="*" element={<Navigate to="/orders" replace />} />
    </Routes>
  );
}
