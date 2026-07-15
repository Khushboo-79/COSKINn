import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { Search, Ban, CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';

const statusColors: Record<string, string> = {
  PENDING_APPROVAL: 'bg-amber-100 text-amber-700',
  APPROVED: 'bg-emerald-100 text-emerald-700',
  REJECTED: 'bg-rose-100 text-rose-700',
  CANCELLED: 'bg-emerald-100 text-emerald-700', // Mapping CANCELLED to our green approved look
};

const refundColors: Record<string, string> = {
  NOT_INITIATED: 'text-slate-500 bg-slate-100',
  PROCESSING: 'text-amber-600 bg-amber-50',
  REFUNDED: 'text-emerald-600 bg-emerald-50',
  NA: 'text-slate-400 bg-slate-50',
};

export default function CancellationsScreen() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: cancellations = [], isLoading, error } = useQuery({
    queryKey: ['cancelledOrders'],
    queryFn: async () => {
      const res = await api.get('/admin/orders?status=CANCELLED');
      // Adding mock cancellation reasons/refund status since these aren't returned currently
      return res.data.map((order: any) => ({
        ...order,
        reason: 'Customer requested cancellation',
        refundStatus: order.paymentMode === 'ONLINE' ? 'PROCESSING' : 'NA'
      }));
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-rose-500">Failed to load cancellations.</div>;
  }

  const filteredCancellations = cancellations.filter((cancel: any) => 
    cancel.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (cancel.user?.email && cancel.user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: '"Expletus Sans", sans-serif' }}>
            Cancellations
          </h2>
          <p className="text-sm text-slate-500 mt-1">Manage order cancellation requests and refunds</p>
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
                <th className="px-6 py-4">Order & Customer</th>
                <th className="px-6 py-4">Reason</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Refund Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCancellations.map((cancel: any) => (
                <tr key={cancel.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800 text-xs">{cancel.id.split('-')[0]}...</div>
                    <div className="text-xs text-slate-500 mt-0.5">{cancel.user?.email || 'Guest'}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{new Date(cancel.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-slate-600">{cancel.reason}</div>
                    <div className="text-xs font-medium text-slate-800 mt-1">₹{cancel.finalAmount}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${statusColors[cancel.status] || 'bg-slate-100 text-slate-700'}`}>
                      {cancel.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-wider ${refundColors[cancel.refundStatus]}`}>
                      {cancel.refundStatus.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCancellations.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No cancellations found.
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
