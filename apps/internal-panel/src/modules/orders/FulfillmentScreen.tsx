import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { Search, Package, CheckCircle, ArrowRight, MapPin, Box, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function FulfillmentScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['fulfillmentOrders'],
    queryFn: async () => {
      const [placed, packed] = await Promise.all([
        api.get('/admin/orders?status=PLACED'),
        api.get('/admin/orders?status=PACKED')
      ]);
      return [...placed.data, ...packed.data].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      await api.put(`/admin/orders/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fulfillmentOrders'] });
      queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
      toast.success('Order status updated');
    },
    onError: () => {
      toast.error('Failed to update order status');
    }
  });

  const handlePack = (id: string) => updateStatusMutation.mutate({ id, status: 'PACKED' });
  const handleReadyForShip = (id: string) => updateStatusMutation.mutate({ id, status: 'SHIPPED' });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-rose-500">Failed to load fulfillment orders.</div>;
  }

  const filteredOrders = orders.filter((order: any) => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (order.user?.email && order.user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: '"Expletus Sans", sans-serif' }}>
            Fulfillment Queue
          </h2>
          <p className="text-sm text-slate-500 mt-1">Pack and process orders for shipping</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Order ID or Customer..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer & Date</th>
                <th className="px-6 py-4">Allocation</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((order: any) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800 text-xs">
                    {order.id.split('-')[0]}...
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800">{order.user?.email || 'Guest'}</div>
                    <div className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1 text-xs text-slate-600">
                        <Box className="w-3 h-3" /> {order.items?.length || 0} Items
                      </span>
                      <span className="flex items-center gap-1 text-xs text-indigo-600 font-medium">
                        <MapPin className="w-3 h-3" /> Default Warehouse
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      order.status === 'PLACED' ? 'bg-blue-100 text-blue-700' : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {order.status === 'PLACED' ? (
                      <button 
                        onClick={() => handlePack(order.id)}
                        disabled={updateStatusMutation.isPending}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
                      >
                        <Package className="w-3.5 h-3.5" /> Pack Order
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleReadyForShip(order.id)}
                        disabled={updateStatusMutation.isPending}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> Ready for Ship
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No orders currently in fulfillment queue.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
