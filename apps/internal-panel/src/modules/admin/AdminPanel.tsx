import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { ShieldAlert, CheckCircle, XCircle, Package } from 'lucide-react';

export default function AdminPanel() {
  const queryClient = useQueryClient();
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await api.get('/product');
      return data;
    },
  });

  const pendingProducts = products?.filter((p: any) => p.status === 'PENDING_APPROVAL') || [];

  const approveMutation = useMutation({
    mutationFn: (id: string) => api.post(`/product/${id}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      alert('Product approved and is now LIVE!');
    }
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string, reason: string }) => api.post(`/product/${id}/reject`, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setRejectingId(null);
      setRejectionReason('');
      alert('Product rejected.');
    }
  });

  if (isLoading) return <div className="p-8 text-center text-slate-400">Loading admin dashboard...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-indigo-600" />
          Admin Dashboard
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            Pending Product Approvals
            <span className="bg-amber-100 text-amber-700 py-0.5 px-2.5 rounded-full text-xs font-bold">
              {pendingProducts.length}
            </span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">Review products submitted by Product Managers before they go live on the storefront.</p>
        </div>

        {pendingProducts.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center text-slate-400">
            <Package className="w-12 h-12 mb-4 text-slate-200" />
            <p className="text-lg font-medium text-slate-600">All caught up!</p>
            <p className="text-sm">There are no products waiting for approval.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {pendingProducts.map((product: any) => (
              <div key={product.id} className="p-6 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-800">{product.name}</h4>
                    <div className="text-sm text-slate-500 mt-1 flex flex-wrap gap-4">
                      <span><strong>Category:</strong> {product.category?.name}</span>
                      <span><strong>SKU:</strong> {product.sku}</span>
                      <span><strong>Price:</strong> ₹{product.discountPrice || product.mrp}</span>
                      <span className="text-indigo-600"><strong>Test Report:</strong> {product.testReportRef}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setRejectingId(product.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 hover:text-red-600 transition-colors"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                    <button 
                      onClick={() => {
                        if(confirm('Are you sure you want to approve this product? It will be LIVE immediately.')) {
                          approveMutation.mutate(product.id);
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
                    >
                      <CheckCircle className="w-4 h-4" /> Approve & Go Live
                    </button>
                  </div>
                </div>

                {rejectingId === product.id && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl flex gap-4 items-start">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-red-900 mb-2">Reason for Rejection</label>
                      <input 
                        type="text" 
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="e.g., Missing proper manufacturer details..."
                        className="w-full px-4 py-2 bg-white border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                      />
                    </div>
                    <div className="flex items-end gap-2 self-end">
                      <button 
                        onClick={() => { setRejectingId(null); setRejectionReason(''); }}
                        className="px-4 py-2 text-slate-600 hover:bg-white rounded-lg transition-colors text-sm font-medium"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => rejectMutation.mutate({ id: product.id, reason: rejectionReason })}
                        disabled={!rejectionReason.trim()}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50"
                      >
                        Confirm Rejection
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
