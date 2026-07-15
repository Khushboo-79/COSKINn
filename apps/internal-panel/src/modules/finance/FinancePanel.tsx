import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import PanelHeader from '../../components/PanelHeader';
import StatCard from '../../components/StatCard';
import { TrendingUp, TrendingDown, PieChart,
  CreditCard, Receipt, ArrowUpRight, ArrowDownRight,
   Filter, Download, IndianRupee, Wallet, BarChart3 } from 'lucide-react';

// Mock data — will be replaced with real API calls later
const useFinanceOverview = () => useQuery({
  queryKey: ['financeOverview'],
  queryFn: async () => {
    const res = await api.get('/admin/finance/overview');
    return res.data;
  }
});

const useRecentTransactions = () => useQuery({
  queryKey: ['financeTransactions'],
  queryFn: async () => {
    const res = await api.get('/admin/finance/transactions');
    return res.data;
  }
});

const useMonthlyBreakdown = () => useQuery({
  queryKey: ['monthlyBreakdown'],
  queryFn: async () => {
    const res = await api.get('/admin/finance/monthly-breakdown');
    return res.data;
  }
});

export default function FinancePanel() {
  const [dateFilter, setDateFilter] = useState('This Month');
  const { data: overview, isLoading: overviewLoading } = useFinanceOverview();
  const { data: transactions, isLoading: txnLoading } = useRecentTransactions();
  const { data: monthly } = useMonthlyBreakdown();

  return (
    <div className="space-y-6 p-4 overflow-y-auto h-full">
      <PanelHeader
        title="Finance & Accounting"
        subtitle="Revenue, expenses, and payment tracking"
        icon={IndianRupee}
        actionLabel="Export Report"
        onAction={() => alert('Export report (coming soon)')}
        actionIcon={Download}
      />

      {/* Date Filter Bar */}
      <div className="flex items-center gap-3">
        {['Today', 'This Week', 'This Month', 'This Quarter', 'This Year'].map(f => (
          <button
            key={f}
            onClick={() => setDateFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              dateFilter === f
                ? 'bg-gradient-to-r from-[#FF0069] to-[#FFD498] text-white shadow-md shadow-[#FF0069]/20'
                : 'bg-white/60 text-gray-600 hover:bg-white hover:shadow-sm border border-gray-100'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      {overviewLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-white/40 animate-pulse" />
          ))}
        </div>
      ) : overview && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard label="Total Revenue" value={overview.revenue} icon={TrendingUp} prefix="₹" trend={overview.revenueTrend} trendUp />
          <StatCard label="Total Expenses" value={overview.expenses} icon={TrendingDown} prefix="₹" trend={overview.expenseTrend} trendUp={false} />
          <StatCard label="Net Profit" value={overview.profit} icon={Wallet} prefix="₹" trend={overview.profitTrend} trendUp />
          <StatCard label="Pending Payments" value={overview.pendingPayments} icon={CreditCard} prefix="₹" />
          <StatCard label="Refunds Issued" value={overview.refunds} icon={Receipt} prefix="₹" />
          <StatCard label="Tax Collected" value={overview.taxes} icon={PieChart} prefix="₹" />
        </div>
      )}

      {/* Monthly Revenue Chart (Simple bar visualization) */}
      {monthly && (
        <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#FF0069]" />
              <h3 className="text-lg font-bold text-gray-900">Monthly Revenue vs Expenses</h3>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#FF0069]" /> Revenue</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#FFD498]" /> Expenses</span>
            </div>
          </div>
          <div className="flex items-end gap-3 h-48">
            {monthly.map((m: any) => {
              const maxVal = Math.max(...monthly.map((x: any) => x.revenue));
              const revH = (m.revenue / maxVal) * 100;
              const expH = (m.expenses / maxVal) * 100;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end gap-1 h-40">
                    <div
                      className="flex-1 rounded-t-lg bg-gradient-to-t from-[#FF0069] to-[#FF0069]/60 transition-all duration-500 hover:opacity-80"
                      style={{ height: `${revH}%` }}
                      title={`Revenue: ₹${m.revenue.toLocaleString('en-IN')}`}
                    />
                    <div
                      className="flex-1 rounded-t-lg bg-gradient-to-t from-[#FFD498] to-[#FFD498]/60 transition-all duration-500 hover:opacity-80"
                      style={{ height: `${expH}%` }}
                      title={`Expenses: ₹${m.expenses.toLocaleString('en-IN')}`}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-500">{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Transactions */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-[#FF0069]" />
            <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
          </div>
          <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#FF0069] transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        {txnLoading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/60">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Transaction ID</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions?.map((txn: any) => (
                  <tr key={txn.id} className="hover:bg-white/60 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-mono text-gray-700">{txn.id}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{txn.date}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                        txn.type === 'Refund'
                          ? 'bg-orange-100 text-orange-700'
                          : txn.type === 'Subscription'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {txn.type === 'Refund' ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                        {txn.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-700">{txn.customer}</td>
                    <td className={`px-5 py-3.5 text-sm font-bold text-right ${txn.amount < 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                      {txn.amount < 0 ? '-' : '+'}₹{Math.abs(txn.amount).toLocaleString('en-IN')}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        txn.status === 'Completed' ? 'bg-green-100 text-green-700'
                        : txn.status === 'Pending' ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-blue-100 text-blue-700'
                      }`}>
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
