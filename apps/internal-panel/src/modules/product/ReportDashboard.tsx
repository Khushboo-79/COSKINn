import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { PieChartIcon, TrendingUp, DollarSign, Package } from 'lucide-react';
import { CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis } from 'recharts';

export default function ReportDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['product-stats'],
    queryFn: async () => {
      const { data } = await api.get('/product/stats/reports');
      return data;
    },
  });

  if (isLoading) {
    return <div className="h-full flex items-center justify-center text-slate-400">Loading reports...</div>;
  }

  const COLORS = ['#f43f5e', '#ec4899', '#d946ef', '#8b5cf6', '#6366f1', '#3b82f6'];

  return (
    <div className="h-full flex flex-col space-y-6 overflow-y-auto pr-2 pb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <PieChartIcon className="w-6 h-6 text-fuchsia-500" />
          Product Reports & Analytics
        </h1>
        <p className="text-slate-500 text-sm mt-1">Deep dive into category distribution, pricing analysis, and inventory insights.</p>
      </div>

      {/* High level KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 shrink-0">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center mb-4">
            <Package className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Total Catalog Value</p>
          <h3 className="text-3xl font-bold text-slate-800">₹{stats?.totalCatalogValue?.toLocaleString() || 0}</h3>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Avg Selling Price</p>
          <h3 className="text-3xl font-bold text-slate-800">₹{stats?.averageSellingPrice?.toFixed(2) || 0}</h3>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Avg Discount %</p>
          <h3 className="text-3xl font-bold text-slate-800">{stats?.averageDiscountPercentage?.toFixed(1) || 0}%</h3>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center mb-4">
            <Package className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Total Variants</p>
          <h3 className="text-3xl font-bold text-slate-800">{stats?.totalVariants || 0}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 min-h-[400px]">
        {/* Category Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Category Distribution</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats?.categoryDistribution || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                  label={({name, percent = 0}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {(stats?.categoryDistribution || []).map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pricing tiers */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Products by Pricing Tier</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.pricingTiers || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
