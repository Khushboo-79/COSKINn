import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import PanelHeader from '../../components/PanelHeader';
import StatCard from '../../components/StatCard';
import { 
  LayoutDashboard, CheckCircle2, XCircle, Package, 
  TrendingUp, Users, ShoppingCart, Activity, ShieldCheck, FileCheck
} from 'lucide-react';

// Mock system-wide metrics for the Superadmin view
const useSystemOverview = () => useQuery({
  queryKey: ['systemOverview'],
  queryFn: async () => ({
    totalRevenue: 28_45_000,
    activeUsers: 14_250,
    totalOrders: 3_840,
    systemHealth: '99.9%',
    revenueTrend: '+12.5%',
    usersTrend: '+8.2%',
    ordersTrend: '+15.4%',
  })
});

export default function AdminPanel() {
  const queryClient = useQueryClient();
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const { data: overview, isLoading: overviewLoading } = useSystemOverview();

  const { data: products, isLoading: productsLoading } = useQuery({
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

  return (
    <div className="space-y-6 p-4 overflow-y-auto h-full">
      <PanelHeader
        title="Superadmin Dashboard"
        subtitle="Platform-wide metrics, system health, and global approvals"
        icon={LayoutDashboard}
      />

      {/* KPI Cards */}
      {overviewLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-white/40 animate-pulse" />
          ))}
        </div>
      ) : overview && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Revenue (MTD)" value={overview.totalRevenue} icon={TrendingUp} prefix="₹" trend={overview.revenueTrend} trendUp />
          <StatCard label="Active Users" value={overview.activeUsers} icon={Users} trend={overview.usersTrend} trendUp />
          <StatCard label="Total Orders" value={overview.totalOrders} icon={ShoppingCart} trend={overview.ordersTrend} trendUp />
          <StatCard label="System Health" value={overview.systemHealth} icon={Activity} />
        </div>
      )}

      {/* Global Action Items - Pending Approvals */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg overflow-hidden mt-8">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-white/40 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                Pending Product Approvals
                <span className="bg-[#FF0069] text-white py-0.5 px-2.5 rounded-full text-xs font-bold shadow-sm">
                  {pendingProducts.length}
                </span>
              </h3>
              <p className="text-sm text-gray-500">Review products submitted by Product Managers before they go live.</p>
            </div>
          </div>
        </div>

        {productsLoading ? (
          <div className="p-12 text-center text-gray-400">Loading products...</div>
        ) : pendingProducts.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-gray-400 bg-white/30">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
              <FileCheck className="w-8 h-8 text-emerald-500" />
            </div>
            <p className="text-lg font-bold text-gray-700">All caught up!</p>
            <p className="text-sm mt-1">There are no products waiting for approval across the platform.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100/60">
            {pendingProducts.map((product: any) => (
              <div key={product.id} className="p-6 hover:bg-white/80 transition-colors group">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#FF0069] transition-colors">{product.name}</h4>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
                        PENDING
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-2">
                      <span className="flex items-center gap-1.5"><Package className="w-4 h-4" /> SKU: <span className="font-mono text-gray-700">{product.sku}</span></span>
                      <span className="text-gray-300">•</span>
                      <span>Category: <strong className="text-gray-700">{product.category?.name || 'Uncategorized'}</strong></span>
                      <span className="text-gray-300">•</span>
                      <span>Price: <strong className="text-gray-700">₹{product.discountPrice || product.mrp}</strong></span>
                      {product.testReportRef && (
                        <>
                          <span className="text-gray-300">•</span>
                          <span className="text-[#FF0069] font-medium flex items-center gap-1">
                            <Activity className="w-3.5 h-3.5" /> Test Report: {product.testReportRef}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setRejectingId(product.id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-white border border-red-100 text-red-500 font-semibold text-sm rounded-xl hover:bg-red-50 transition-colors shadow-sm"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                    <button 
                      onClick={() => {
                        if(confirm('Are you sure you want to approve this product? It will be LIVE immediately.')) {
                          approveMutation.mutate(product.id);
                        }
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-semibold text-sm rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all hover:-translate-y-0.5"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Approve & Go Live
                    </button>
                  </div>
                </div>

                {/* Inline Rejection Form */}
                {rejectingId === product.id && (
                  <div className="mt-5 p-5 bg-red-50/50 border border-red-100 rounded-2xl flex gap-4 items-start animate-in slide-in-from-top-2">
                    <div className="flex-1">
                      <label className="block text-sm font-bold text-red-900 mb-2">Reason for Rejection</label>
                      <input 
                        type="text" 
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="e.g., Missing proper manufacturer details..."
                        className="w-full px-4 py-2.5 bg-white border border-red-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                      />
                    </div>
                    <div className="flex items-end gap-2 self-end">
                      <button 
                        onClick={() => { setRejectingId(null); setRejectionReason(''); }}
                        className="px-4 py-2.5 text-gray-500 hover:text-gray-700 hover:bg-white rounded-xl transition-colors text-sm font-semibold"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => rejectMutation.mutate({ id: product.id, reason: rejectionReason })}
                        disabled={!rejectionReason.trim()}
                        className="px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors text-sm font-semibold shadow-md disabled:opacity-50 disabled:hover:bg-red-600"
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
