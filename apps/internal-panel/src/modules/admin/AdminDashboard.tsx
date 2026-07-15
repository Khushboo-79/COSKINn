import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import StatCard from '../../components/StatCard';
import {
  CheckCircle2, XCircle,
  TrendingUp, Users, ShoppingCart, Activity, ShieldCheck, FileCheck,
  ArrowRight, Bell, DollarSign, Warehouse, Headphones
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell
} from 'recharts';

const useSystemOverview = () => useQuery({
  queryKey: ['systemOverview'],
  queryFn: async () => {
    const { data } = await api.get('/admin/config/overview');
    return data;
  }
});

const revenueData = [
  { month: 'Jan', revenue: 2100000, orders: 1800 },
  { month: 'Feb', revenue: 2800000, orders: 2200 },
  { month: 'Mar', revenue: 2400000, orders: 1950 },
  { month: 'Apr', revenue: 3200000, orders: 2800 },
  { month: 'May', revenue: 3800000, orders: 3100 },
  { month: 'Jun', revenue: 4200000, orders: 3500 },
  { month: 'Jul', revenue: 4800000, orders: 3900 },
];

const categoryData = [
  { name: 'Skincare', value: 42, color: '#f43f5e' },
  { name: 'Haircare', value: 28, color: '#fb7185' },
  { name: 'Supplements', value: 18, color: '#fda4af' },
  { name: 'Wellness', value: 12, color: '#fecdd3' },
];

const recentActivity = [
  { user: 'Priya Sharma', action: 'Approved product "Vitamin C Serum"', time: '2 min ago', type: 'approve' },
  { user: 'Rahul Singh', action: 'Created 3 new support tickets', time: '15 min ago', type: 'support' },
  { user: 'Anita Verma', action: 'Updated warehouse inventory batch', time: '32 min ago', type: 'warehouse' },
  { user: 'Vikram Patel', action: 'Processed ₹12,450 refund', time: '1 hr ago', type: 'finance' },
  { user: 'Sunita Rao', action: 'Added 5 new employee records', time: '2 hr ago', type: 'hr' },
];

const moduleCards = [
  { name: 'HR Panel', icon: Users, path: '/hr', stat: '142 Employees', color: 'from-violet-500 to-purple-600' },
  { name: 'Finance', icon: DollarSign, path: '/finance', stat: '₹48.9L Revenue', color: 'from-rose-500 to-pink-600' },
  { name: 'Warehouse', icon: Warehouse, path: '/warehouse', stat: '12,450 Units', color: 'from-amber-500 to-orange-600' },
  { name: 'Support', icon: Headphones, path: '/support', stat: '24 Open Tickets', color: 'from-sky-500 to-blue-600' },
  { name: 'Marketing', icon: Bell, path: '/marketing', stat: '8 Active Campaigns', color: 'from-emerald-500 to-green-600' },
  { name: 'Orders', icon: ShoppingCart, path: '/orders', stat: '3,782 Total', color: 'from-indigo-500 to-blue-600' },
];

export default function AdminDashboard() {
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
    <div className="space-y-6 pb-10 animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: '"Expletus Sans", sans-serif' }}>
            Superadmin Dashboard
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">Platform-wide overview — welcome back, Super Admin</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white px-4 py-2 rounded-xl border border-rose-100 shadow-sm">
          <Activity className="w-4 h-4 text-emerald-500" />
          All Systems Operational
        </div>
      </div>

      {/* KPI Cards */}
      {overviewLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-white/40 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Revenue (MTD)" value={overview?.totalRevenue ?? '48,94,510'} icon={TrendingUp} prefix="₹" trend="+22.5%" trendUp />
          <StatCard label="Active Users" value={overview?.activeUsers ?? '1,28,493'} icon={Users} trend="+18.3%" trendUp />
          <StatCard label="Total Orders" value={overview?.totalOrders ?? '3,782'} icon={ShoppingCart} trend="+15.7%" trendUp />
          <StatCard label="System Health" value={overview?.systemHealth ?? '99.9%'} icon={Activity} trend="Operational" trendUp />
        </div>
      )}

      {/* Revenue Chart + Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-rose-100/50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-slate-800">Revenue & Orders Overview</h3>
              <p className="text-xs text-slate-400 mt-0.5">Jan – Jul 2025</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-rose-500 inline-block" /> Revenue</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-rose-200 inline-block" /> Orders</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v) => `₹${v / 100000}L`} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -4px rgba(0,0,0,0.15)' }} />
                <Area type="monotone" dataKey="revenue" name="Revenue (₹)" stroke="#f43f5e" strokeWidth={2.5} fill="url(#revGrad)" dot={false} activeDot={{ r: 5, fill: '#f43f5e', stroke: '#fff', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100/50">
          <h3 className="font-bold text-slate-800 mb-4">Sales by Category</h3>
          <div className="flex items-center justify-center h-44 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} innerRadius={55} outerRadius={72} paddingAngle={2} dataKey="value" stroke="none">
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-lg font-bold text-slate-800">₹48.9L</span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Total</span>
            </div>
          </div>
          <div className="mt-4 space-y-2.5">
            {categoryData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Module Quick Access Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800">Module Overview</h3>
          <span className="text-xs text-slate-400">Click to open any module</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {moduleCards.map((mod) => (
            <a key={mod.name} href={mod.path} className="group bg-white rounded-2xl p-4 border border-rose-100/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <mod.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-bold text-slate-700">{mod.name}</p>
              <p className="text-xs text-slate-400 mt-0.5">{mod.stat}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Grid: Recent Activity + Pending Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Admin Activity */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100/50">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-rose-500" />
              <h3 className="font-bold text-slate-800">Recent Activity</h3>
            </div>
            <button className="flex items-center gap-1 text-xs text-rose-500 font-semibold hover:text-rose-700 transition-colors">
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-rose-500">{item.user.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate">{item.user}</p>
                  <p className="text-xs text-slate-500 truncate">{item.action}</p>
                </div>
                <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Product Approvals */}
        <div className="bg-white rounded-2xl shadow-sm border border-rose-100/50 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  Pending Approvals
                  <span className="bg-rose-500 text-white py-0.5 px-2 rounded-full text-[11px] font-bold">
                    {pendingProducts.length}
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Products awaiting review before going live</p>
              </div>
            </div>
          </div>

          {productsLoading ? (
            <div className="p-8 text-center text-slate-400 text-sm">Loading...</div>
          ) : pendingProducts.length === 0 ? (
            <div className="p-12 flex flex-col items-center justify-center text-slate-400">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
                <FileCheck className="w-6 h-6 text-emerald-500" />
              </div>
              <p className="font-bold text-slate-600">All caught up!</p>
              <p className="text-xs mt-1">No products pending approval.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
              {pendingProducts.map((product: any) => (
                <div key={product.id} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-800 truncate">{product.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">SKU: {product.sku} · ₹{product.discountPrice || product.mrp}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setRejectingId(product.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white border border-red-100 text-red-500 font-semibold text-xs rounded-xl hover:bg-red-50 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Reject
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Approve this product? It will go LIVE immediately.')) {
                            approveMutation.mutate(product.id);
                          }
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 text-white font-semibold text-xs rounded-xl hover:bg-emerald-600 transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                      </button>
                    </div>
                  </div>
                  {rejectingId === product.id && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-xl flex gap-3 items-start">
                      <input
                        type="text"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Reason for rejection..."
                        className="flex-1 px-3 py-2 bg-white border border-red-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-red-300"
                      />
                      <div className="flex gap-2">
                        <button onClick={() => { setRejectingId(null); setRejectionReason(''); }} className="px-3 py-2 text-xs text-slate-500 font-semibold hover:bg-white rounded-lg transition-colors">Cancel</button>
                        <button
                          onClick={() => rejectMutation.mutate({ id: product.id, reason: rejectionReason })}
                          disabled={!rejectionReason.trim()}
                          className="px-3 py-2 text-xs bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                          Confirm
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
    </div>
  );
}
