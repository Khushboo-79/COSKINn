import { useQuery } from '@tanstack/react-query';
import { orderApi } from '../../../core/api/orders';
import { ShoppingBag, TrendingUp, Package, Loader2 } from 'lucide-react';

export const SalesOrderWidget = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin', 'orders-widget'],
    queryFn: () => orderApi.getOrders({ limit: 100 }) // fetch recent 100 to get a sample
  });

  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-slate-300 mb-2" />
        <span className="text-slate-500 text-sm">Loading sales data...</span>
      </div>
    );
  }

  // Calculate some basic stats from the fetched orders
  const totalVolume = orders?.length || 0;
  const pendingCount = orders?.filter((o: any) => o.status === 'PENDING').length || 0;
  const shippedCount = orders?.filter((o: any) => o.status === 'SHIPPED').length || 0;
  
  // Calculate total revenue from successful payments or total amounts
  const totalRevenue = orders?.reduce((sum: number, o: any) => sum + o.totalAmount, 0) || 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-bold text-slate-900 flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2 text-indigo-600" />
            Sales & Orders
          </h3>
          <p className="text-xs text-slate-500 mt-1">Recent order volume and revenue snapshot</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-1">Total Revenue</p>
          <div className="flex items-end">
            <span className="text-2xl font-black text-slate-900">₹{totalRevenue.toLocaleString()}</span>
            <TrendingUp className="h-4 w-4 text-emerald-500 ml-2 mb-1.5" />
          </div>
        </div>
        
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-1">Order Volume</p>
          <div className="flex items-end">
            <span className="text-2xl font-black text-slate-900">{totalVolume}</span>
            <Package className="h-4 w-4 text-indigo-500 ml-2 mb-1.5" />
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Status Mix</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center text-slate-600">
              <span className="h-2 w-2 rounded-full bg-amber-400 mr-2"></span> Pending Processing
            </span>
            <span className="font-medium text-slate-900">{pendingCount}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center text-slate-600">
              <span className="h-2 w-2 rounded-full bg-indigo-500 mr-2"></span> Shipped
            </span>
            <span className="font-medium text-slate-900">{shippedCount}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center text-slate-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></span> Delivered
            </span>
            <span className="font-medium text-slate-900">{orders?.filter((o: any) => o.status === 'DELIVERED').length || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
