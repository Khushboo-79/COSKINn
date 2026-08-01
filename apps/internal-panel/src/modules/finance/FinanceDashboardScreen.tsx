import { useQuery } from '@tanstack/react-query';
import { financeApi } from '../../core/api/finance';
import { IndianRupee, TrendingUp, CreditCard, Clock, Activity, BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

export const FinanceDashboardScreen = () => {
  const { data: overview, isLoading: loadingOverview } = useQuery({
    queryKey: ['finance', 'overview'],
    queryFn: () => financeApi.getOverview()
  });

  const { data: monthlyBreakdown, isLoading: loadingMonthly } = useQuery({
    queryKey: ['finance', 'monthlyBreakdown'],
    queryFn: () => financeApi.getMonthlyBreakdown()
  });

  if (loadingOverview || loadingMonthly) {
    return <div className="p-12 text-center text-slate-500">Loading financial data...</div>;
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Finance Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time P&L, revenue, and transaction summaries.</p>
        </div>
        <div className="text-sm font-medium text-slate-500 bg-white px-4 py-2 border border-slate-200 rounded-lg shadow-sm flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Last synced: Just now
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <IndianRupee className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> {overview?.revenueTrend || '+12%'}
            </span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{formatCurrency(overview?.revenue || 0)}</div>
          <div className="text-sm font-medium text-slate-500">Gross Revenue (YTD)</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <CreditCard className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> {overview?.profitTrend || '+18%'}
            </span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{formatCurrency(overview?.profit || 0)}</div>
          <div className="text-sm font-medium text-slate-500">Net Profit</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
              <Activity className="h-6 w-6" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{formatCurrency(overview?.pendingPayments || 0)}</div>
          <div className="text-sm font-medium text-slate-500">Pending Payments</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <BarChart3 className="h-6 w-6" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{formatCurrency(overview?.taxes || 0)}</div>
          <div className="text-sm font-medium text-slate-500">Total Tax Collected</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Revenue vs Net (Monthly)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyBreakdown || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(value) => `₹${value / 1000}k`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Area type="monotone" dataKey="revenue" name="Gross Revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="net" name="Net Profit" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorNet)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Tax & Refunds (Monthly)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyBreakdown || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(value) => `₹${value / 1000}k`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Bar dataKey="tax" name="Tax Collected" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="refunds" name="Refunds Issued" fill="#e11d48" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-900">Monthly Breakdown</h2>
        </div>
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Month</th>
                <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Revenue</th>
                <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Tax</th>
                <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Refunds</th>
                <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Net</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {monthlyBreakdown?.map((month: any, i: number) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 font-medium text-slate-900">{month.month}</td>
                  <td className="py-4 px-4 text-right font-medium text-slate-700">{formatCurrency(month.revenue)}</td>
                  <td className="py-4 px-4 text-right text-slate-600">{formatCurrency(month.tax)}</td>
                  <td className="py-4 px-4 text-right text-rose-600 font-medium">-{formatCurrency(month.refunds)}</td>
                  <td className="py-4 px-4 text-right font-bold text-slate-900">{formatCurrency(month.net)}</td>
                </tr>
              ))}
              {(!monthlyBreakdown || monthlyBreakdown.length === 0) && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    No monthly data available yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
