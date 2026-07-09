import { useQuery } from '@tanstack/react-query';
import { Package, FileText, Layers, CheckCircle2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { api } from '../../lib/axios';

export default function ProductDashboard() {
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await api.get('/product');
      return data;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get('/categories');
      return data;
    },
  });

  return (
    <div className="space-y-6">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-rose-100/50 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Products</p>
              <h3 className="text-2xl font-bold text-slate-800">{products?.length || 0}</h3>
            </div>
          </div>
          <p className="text-xs font-medium text-emerald-500 mt-4 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> 12% vs last month
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-rose-100/50 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Active Products</p>
              <h3 className="text-2xl font-bold text-slate-800">{products?.filter((p: any) => p.status === 'LIVE').length || 0}</h3>
            </div>
          </div>
          <p className="text-xs font-medium text-emerald-500 mt-4 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> 10% vs last month
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-rose-100/50 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Draft Products</p>
              <h3 className="text-2xl font-bold text-slate-800">{products?.filter((p: any) => p.status === 'DRAFT').length || 0}</h3>
            </div>
          </div>
          <p className="text-xs font-medium text-red-500 mt-4 flex items-center gap-1">
            <ArrowDownRight className="w-3 h-3" /> 5% vs last month
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-rose-100/50 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Categories</p>
              <h3 className="text-2xl font-bold text-slate-800">{categories?.length || 0}</h3>
            </div>
          </div>
          <p className="text-xs font-medium text-emerald-500 mt-4 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> 4% vs last month
          </p>
        </div>
      </div>

      {/* Charts & Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-rose-100/50 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-slate-800">Product Performance</h3>
            <select className="text-sm bg-slate-50 border-none rounded-lg px-3 py-1.5 focus:ring-0 cursor-pointer font-medium text-slate-600">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                { name: 'Jan', sales: 4000, units: 2400 },
                { name: 'Feb', sales: 3000, units: 1398 },
                { name: 'Mar', sales: 2000, units: 9800 },
                { name: 'Apr', sales: 2780, units: 3908 },
                { name: 'May', sales: 1890, units: 4800 },
                { name: 'Jun', sales: 2390, units: 3800 },
                { name: 'Jul', sales: 3490, units: 4300 },
                { name: 'Aug', sales: 4490, units: 5300 },
              ]} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(v) => `₹${v/1000}k`} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(v) => `${v/1000}k`} />
                <RechartsTooltip cursor={{stroke: '#f1f5f9', strokeWidth: 2}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Line yAxisId="left" type="monotone" dataKey="sales" name="Sales (₹)" stroke="#f43f5e" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                <Line yAxisId="right" type="monotone" dataKey="units" name="Units Sold" stroke="#cbd5e1" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-rose-100/50 p-6 flex flex-col">
          <h3 className="text-base font-bold text-slate-800 mb-6">Category Distribution</h3>
          <div className="flex-1 flex flex-col items-center justify-center relative min-h-[200px]">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={[
                  { name: 'Serums', value: 28, color: '#0ea5e9' },
                  { name: 'Cleansers', value: 20, color: '#f43f5e' },
                  { name: 'Moisturizers', value: 18, color: '#10b981' },
                  { name: 'Sunscreens', value: 15, color: '#f59e0b' },
                  { name: 'Toners', value: 10, color: '#8b5cf6' },
                  { name: 'Masks', value: 9, color: '#ec4899' },
                ]} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                  {[
                    { color: '#0ea5e9' }, { color: '#f43f5e' }, { color: '#10b981' }, 
                    { color: '#f59e0b' }, { color: '#8b5cf6' }, { color: '#ec4899' }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-slate-800">{categories?.length || 0}</span>
              <span className="text-xs text-slate-500 font-medium">Categories</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
