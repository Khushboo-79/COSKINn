import { useQuery } from '@tanstack/react-query';
import { orderApi } from '../../../core/api/orders';
import { ShoppingBag, TrendingUp, Package, Loader2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

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
  const deliveredCount = orders?.filter((o: any) => o.status === 'DELIVERED').length || 0;
  
  // Calculate total revenue from successful payments or total amounts
  const totalRevenue = orders?.reduce((sum: number, o: any) => sum + o.totalAmount, 0) || 0;

  const chartData = [
    { name: 'Pending Processing', value: pendingCount, color: '#fbbf24' },
    { name: 'Shipped', value: shippedCount, color: '#6366f1' },
    { name: 'Delivered', value: deliveredCount, color: '#10b981' }
  ].filter(d => d.value > 0);

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
        {chartData.length > 0 ? (
          <div className="h-40 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-40 mb-4 flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <p className="text-slate-400 text-sm font-medium">No recent orders found</p>
          </div>
        )}
        <div className="space-y-3">
          {chartData.map((data, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="flex items-center text-slate-600">
                <span className="h-2 w-2 rounded-full mr-2" style={{ backgroundColor: data.color }}></span> {data.name}
              </span>
              <span className="font-medium text-slate-900">{data.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
