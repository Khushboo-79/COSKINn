import { 
  ShoppingBag, RotateCcw, Truck, CheckCircle, 
  XCircle, ArrowUpRight, ArrowDownRight, Package, ShieldAlert,
  BarChart2, Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';

const statusColors: Record<string, string> = {
  PLACED: 'bg-indigo-100 text-indigo-700',
  PACKED: 'bg-indigo-100 text-indigo-700',
  PROCESSING: 'bg-amber-100 text-amber-700',
  SHIPPED: 'bg-indigo-100 text-indigo-700',
  DELIVERED: 'bg-emerald-100 text-emerald-700',
  CANCELLED: 'bg-rose-100 text-rose-700',
  RETURNED: 'bg-amber-100 text-amber-700',
};

export default function OrderDashboard() {
  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['adminOrders'],
    queryFn: async () => {
      const res = await api.get('/admin/orders');
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-rose-500 font-medium">
        Failed to load orders.
      </div>
    );
  }

  // Calculate stats from orders array
  const totalOrders = orders.length;
  const processingOrders = orders.filter((o: any) => ['PLACED', 'PACKED', 'PROCESSING'].includes(o.status)).length;
  const shippedOrders = orders.filter((o: any) => o.status === 'SHIPPED').length;
  const deliveredOrders = orders.filter((o: any) => o.status === 'DELIVERED').length;
  const cancelledOrders = orders.filter((o: any) => ['CANCELLED', 'RETURNED'].includes(o.status)).length;

  const stats = [
    { label: 'Total Orders', value: totalOrders.toString(), change: '+18%', isPositive: true, icon: ShoppingBag, color: 'bg-rose-50 text-rose-600 border-rose-100' },
    { label: 'Processing', value: processingOrders.toString(), change: '+12%', isPositive: true, icon: RotateCcw, color: 'bg-amber-50 text-amber-600 border-amber-100' },
    { label: 'Shipped', value: shippedOrders.toString(), change: '+15%', isPositive: true, icon: Truck, color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
    { label: 'Delivered', value: deliveredOrders.toString(), change: '+21%', isPositive: true, icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { label: 'Cancelled / Returned', value: cancelledOrders.toString(), change: '-8%', isPositive: false, icon: XCircle, color: 'bg-slate-50 text-slate-600 border-slate-100' },
  ];

  const pendingActions = [
    { label: 'Packed Orders', count: orders.filter((o: any) => o.status === 'PACKED').length, icon: Package, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Processing', count: processingOrders, icon: RotateCcw, color: 'text-amber-600 bg-amber-50' },
    { label: 'Cancelled', count: cancelledOrders, icon: XCircle, color: 'text-slate-600 bg-slate-50' },
  ];

  const shippingSummary = [
    { name: 'Delhivery', count: shippedOrders, percentage: shippedOrders ? '100%' : '0%', logo: 'D' },
    // Mocking others for now since courier data isn't in Order model currently
  ];

  const recentOrders = orders.slice(0, 5).map((o: any) => ({
    id: o.id,
    customer: o.user?.email || 'Guest',
    items: o.items?.length || 0,
    payment: o.paymentMode,
    status: o.status,
    date: new Date(o.createdAt).toLocaleDateString(),
    amount: `₹${o.finalAmount}`
  }));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl border ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</h3>
              <div className="flex items-center gap-1 mt-2">
                {stat.isPositive ? (
                  <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-rose-500" />
                )}
                <span className={`text-xs font-medium ${stat.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {stat.change} vs last month
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Charts Area (Mocked for Phase 1) */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-center min-h-[350px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Orders Overview</h3>
            <select className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-rose-500 text-slate-600 font-medium">
              <option>Last 30 Days</option>
              <option>This Week</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-xl bg-slate-50">
            <p className="text-slate-400 font-medium text-sm flex items-center gap-2">
              <BarChart2 className="w-5 h-5" /> Chart Component Placeholder
            </p>
          </div>
        </div>

        {/* Order Status Donut */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-center min-h-[350px]">
          <h3 className="font-bold text-slate-800 mb-6">Order Status</h3>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-xl bg-slate-50">
            <p className="text-slate-400 font-medium text-sm flex items-center gap-2">
              <BarChart2 className="w-5 h-5" /> Donut Chart Placeholder
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-6 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Recent Orders</h3>
            <Link to="/orders/list" className="text-sm font-semibold text-rose-600 hover:text-rose-700">View All</Link>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs font-semibold">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.map((order: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-800 text-xs">
                      {order.id.split('-')[0]}...
                    </td>
                    <td className="px-4 py-3 text-slate-600">{order.customer}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase ${statusColors[order.status] || 'bg-slate-100 text-slate-700'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{order.amount}</td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-slate-500">No recent orders found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Actions */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Pending Actions</h3>
          </div>
          <div className="p-4 space-y-3 flex-1">
            {pendingActions.map((action, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <action.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{action.label}</span>
                </div>
                <span className="text-sm font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md">
                  {action.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Summary */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Shipping Summary</h3>
          </div>
          <div className="p-4 space-y-3 flex-1">
            {shippingSummary.map((shipping, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs">
                    {shipping.logo}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{shipping.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-800">{shipping.count}</p>
                  <p className="text-xs font-medium text-slate-500">{shipping.percentage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
