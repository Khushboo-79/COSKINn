import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

export default function FinanceScreen() {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'ledgers'>('overview');

  const { data: overview, isLoading: isOverviewLoading } = useQuery({
    queryKey: ['finance-overview'],
    queryFn: async () => {
      const res = await api.get('/admin/finance/overview');
      return res.data;
    }
  });

  const { data: transactions, isLoading: isTransactionsLoading } = useQuery({
    queryKey: ['finance-transactions'],
    queryFn: async () => {
      const res = await api.get('/admin/finance/transactions');
      return res.data;
    }
  });

  const { data: ledgers, isLoading: isLedgersLoading } = useQuery({
    queryKey: ['finance-ledgers'],
    queryFn: async () => {
      const res = await api.get('/admin/finance/ledgers');
      return res.data;
    }
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Finance Center</h2>
          <p className="text-slate-500 mt-1">Manage revenue, ledgers, and transactions.</p>
        </div>
      </div>

      <div className="flex gap-4 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'overview' 
              ? 'border-[#FF0069] text-[#FF0069]' 
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'transactions' 
              ? 'border-[#FF0069] text-[#FF0069]' 
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Recent Transactions
        </button>
        <button
          onClick={() => setActiveTab('ledgers')}
          className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'ledgers' 
              ? 'border-[#FF0069] text-[#FF0069]' 
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Ledgers
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {isOverviewLoading ? (
            <div className="text-center p-8 text-slate-500">Loading...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Revenue</p>
                      <h3 className="text-3xl font-bold text-slate-800">₹{(overview?.revenue || 0).toLocaleString()}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                      <TrendingUp className="text-green-600" size={20} />
                    </div>
                  </div>
                  <div className="text-sm font-medium text-green-600 bg-green-50 inline-flex px-2 py-1 rounded-md">
                    {overview?.revenueTrend} vs last month
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Expenses</p>
                      <h3 className="text-3xl font-bold text-slate-800">₹{(overview?.expenses || 0).toLocaleString()}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                      <TrendingDown className="text-red-600" size={20} />
                    </div>
                  </div>
                  <div className="text-sm font-medium text-red-600 bg-red-50 inline-flex px-2 py-1 rounded-md">
                    {overview?.expenseTrend} vs last month
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#FF0069] to-[#FFD498] rounded-2xl p-6 shadow-lg shadow-[#FF0069]/20 text-white relative overflow-hidden">
                  <div className="absolute right-0 top-0 p-4 opacity-10">
                    <Activity size={100} />
                  </div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-1">Net Profit</p>
                        <h3 className="text-3xl font-bold text-white">₹{(overview?.profit || 0).toLocaleString()}</h3>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <DollarSign className="text-white" size={20} />
                      </div>
                    </div>
                    <div className="text-sm font-medium text-white/90 bg-white/20 inline-flex px-2 py-1 rounded-md backdrop-blur-sm">
                      {overview?.profitTrend} vs last month
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-6">Tax & Refund Liabilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                    <p className="text-sm text-slate-500 mb-1">Pending COD Collections</p>
                    <p className="text-xl font-bold text-slate-800">₹{(overview?.pendingPayments || 0).toLocaleString()}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                    <p className="text-sm text-slate-500 mb-1">Total Processed Refunds</p>
                    <p className="text-xl font-bold text-slate-800">₹{(overview?.refunds || 0).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {isTransactionsLoading ? (
            <div className="p-8 text-center text-slate-500">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 font-medium">
                  <tr>
                    <th className="px-6 py-4">Transaction ID</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4 text-right">Amount</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions?.map((tx: any) => (
                    <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-slate-600">{tx.id}</td>
                      <td className="px-6 py-4 text-slate-600">{tx.date}</td>
                      <td className="px-6 py-4 font-medium text-slate-800">{tx.customer}</td>
                      <td className="px-6 py-4 text-slate-600">{tx.type}</td>
                      <td className="px-6 py-4 text-right font-semibold text-slate-800">₹{tx.amount.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                          tx.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {transactions?.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-slate-500">No transactions found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'ledgers' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Chart of Accounts</h3>
          {isLedgersLoading ? (
            <div className="p-8 text-center text-slate-500">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ledgers?.map((ledger: any) => (
                <div key={ledger.id} className="p-5 rounded-xl border border-slate-200 hover:border-[#FF0069]/30 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-semibold text-slate-800">{ledger.accountName}</h4>
                    <span className="text-xs font-mono text-slate-400">ID: {ledger.id.substring(0,6).toUpperCase()}</span>
                  </div>
                  <p className="text-sm text-slate-500 mb-1">Current Balance</p>
                  <p className={`text-2xl font-bold ${ledger.balance >= 0 ? 'text-slate-800' : 'text-red-600'}`}>
                    ₹{ledger.balance.toLocaleString()}
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-xs text-slate-500">
                    <span>{ledger.entries?.length || 0} Entries</span>
                    <span>Updated {new Date(ledger.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
              {ledgers?.length === 0 && (
                <div className="col-span-full p-8 text-center text-slate-500 border border-dashed border-slate-200 rounded-xl">
                  No ledgers found. Use Postman to create ledgers.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
