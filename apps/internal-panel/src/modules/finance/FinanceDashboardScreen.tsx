import { useQuery } from '@tanstack/react-query';
import { financeApi } from '../../core/api/finance';
import { IndianRupee, TrendingUp, CreditCard, Clock, Activity, BarChart3 } from 'lucide-react';

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
              <TrendingUp className="h-3 w-3" /> +12%
            </span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{formatCurrency(overview?.totalRevenue || 0)}</div>
          <div className="text-sm font-medium text-slate-500">Gross Revenue (YTD)</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <CreditCard className="h-6 w-6" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{overview?.totalTransactions || 0}</div>
          <div className="text-sm font-medium text-slate-500">Total Transactions</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
              <Activity className="h-6 w-6" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{formatCurrency(overview?.pendingSettlements || 0)}</div>
          <div className="text-sm font-medium text-slate-500">Pending Settlements</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <BarChart3 className="h-6 w-6" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{formatCurrency(overview?.taxCollected || 0)}</div>
          <div className="text-sm font-medium text-slate-500">Total Tax Collected</div>
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
