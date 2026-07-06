import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { RotateCcw, AlertCircle, Package, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const statusColors: Record<string, string> = {
  REQUESTED: 'bg-amber-100 text-amber-700 border-amber-200',
  APPROVED: 'bg-blue-100 text-blue-700 border-blue-200',
  PICKED_UP: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  RECEIVED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  REJECTED: 'bg-rose-100 text-rose-700 border-rose-200',
};

export default function ReturnQueue() {
  const queryClient = useQueryClient();
  const [filterStatus, setFilterStatus] = useState<string>('');

  const { data: returns, isLoading } = useQuery({
    queryKey: ['returns', filterStatus],
    queryFn: async () => {
      const res = await api.get('/returns', { params: { status: filterStatus || undefined } });
      return res.data;
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      return api.patch(`/returns/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['returns'] });
    }
  });

  // Mock generator
  const createMockMutation = useMutation({
    mutationFn: async () => {
      // Fetch an order to attach to
      const res = await api.get('/orders', { params: { page: 1, limit: 1 } });
      if (!res.data.orders.length) throw new Error("No orders exist to return. Create one first.");
      const orderId = res.data.orders[0].id;
      
      return api.post('/returns/test-mock', {
        orderId,
        reason: 'Product damaged during transit',
        refundType: 'ORIGINAL_SOURCE'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['returns'] });
    },
    onError: (e: any) => {
      alert(e.response?.data?.message || e.message);
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: '"Expletus Sans", sans-serif' }}>Return Queue</h2>
          <p className="text-sm text-slate-500">Manage customer return requests and reverse logistics</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => createMockMutation.mutate()}
            disabled={createMockMutation.isPending}
            className="py-2 px-4 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 border border-slate-300"
          >
            <AlertCircle className="w-4 h-4" />
            Inject Mock Request
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <select 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="REQUESTED">Requested</option>
            <option value="APPROVED">Approved</option>
            <option value="PICKED_UP">Picked Up</option>
            <option value="RECEIVED">Received</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500">Loading returns...</div>
        ) : returns?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Return ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Order Ref</th>
                  <th className="px-6 py-4">Reason</th>
                  <th className="px-6 py-4">Refund</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {returns.map((r: any) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-slate-600">{r.id.split('-')[0].toUpperCase()}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {r.order?.user?.firstName || 'Unknown'}<br/>
                      <span className="text-xs text-slate-500 font-normal">{r.order?.user?.email}</span>
                    </td>
                    <td className="px-6 py-4 font-mono">
                      <Link to={`/orders/${r.orderId}`} className="text-indigo-600 hover:underline">
                        {r.orderId.split('-')[0].toUpperCase()}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-slate-600 max-w-[200px] truncate" title={r.reason}>
                      {r.reason}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {r.refundType}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${statusColors[r.status] || 'bg-slate-100'}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      {r.status === 'REQUESTED' && (
                        <>
                          <button 
                            onClick={() => updateMutation.mutate({ id: r.id, status: 'APPROVED' })}
                            className="px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-xs font-semibold"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => updateMutation.mutate({ id: r.id, status: 'REJECTED' })}
                            className="px-3 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded text-xs font-semibold"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {r.status === 'APPROVED' && (
                        <button 
                          onClick={() => updateMutation.mutate({ id: r.id, status: 'PICKED_UP' })}
                          className="px-3 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded text-xs font-semibold"
                        >
                          Mark Picked Up
                        </button>
                      )}
                      {r.status === 'PICKED_UP' && (
                        <button 
                          onClick={() => updateMutation.mutate({ id: r.id, status: 'RECEIVED' })}
                          className="px-3 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-xs font-semibold flex items-center gap-1 ml-auto"
                        >
                          <Package className="w-3 h-3" /> Receive
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center flex flex-col items-center justify-center text-slate-500">
            <RotateCcw className="w-12 h-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-700">Queue Empty</h3>
            <p className="mt-1">No return requests found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
