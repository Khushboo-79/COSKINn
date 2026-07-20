import { useQuery } from '@tanstack/react-query';
import { auditApi } from '../../core/api/audit';
import { Loader2, TrendingUp, DollarSign, ArrowDownRight, CreditCard, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';

export const FinancialReportsScreen = () => {
  // Use auditor specific endpoints which guarantee read-only data
  const { data: plSummary, isLoading: plLoading } = useQuery({
    queryKey: ['audit', 'sales-report'],
    queryFn: () => auditApi.getSalesReport()
  });

  const { data: payments, isLoading: paymentsLoading } = useQuery({
    queryKey: ['audit', 'payment-report'],
    queryFn: () => auditApi.getPaymentReport()
  });

  const isLoading = plLoading || paymentsLoading;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin mb-4 text-slate-400" />
        <p>Generating secure financial reports...</p>
      </div>
    );
  }

  // Calculate totals from payments
  const successfulPayments = payments?.filter((p: any) => p.status === 'SUCCESS' || p.status === 'CAPTURED') || [];
  const totalRevenue = successfulPayments.reduce((sum: number, p: any) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center">
            <BarChart4 className="h-6 w-6 mr-3 text-emerald-600" />
            Financial & Sales Reports
          </h2>
          <p className="text-sm text-slate-500 mt-1">Immutable read-only view of P&L and payment ledgers.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center text-slate-500 mb-2">
            <DollarSign className="h-5 w-5 mr-1" />
            <h3 className="font-semibold text-sm">Total Revenue (Processed)</h3>
          </div>
          <p className="text-3xl font-black text-slate-900">₹{totalRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center text-emerald-600 mb-2">
            <TrendingUp className="h-5 w-5 mr-1" />
            <h3 className="font-semibold text-sm">Completed Transactions</h3>
          </div>
          <p className="text-3xl font-black text-emerald-700">{successfulPayments.length}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center text-rose-600 mb-2">
            <ArrowDownRight className="h-5 w-5 mr-1" />
            <h3 className="font-semibold text-sm">Failed / Pending</h3>
          </div>
          <p className="text-3xl font-black text-rose-700">
            {payments?.length - successfulPayments.length || 0}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center">
          <CreditCard className="h-5 w-5 text-slate-500 mr-2" />
          <h3 className="font-bold text-slate-800">Master Payment Ledger</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-600">Transaction ID</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Order ID</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Gateway</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Amount</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments?.slice(0, 50).map((txn: any) => (
                <tr key={txn.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">{txn.id}</td>
                  <td className="px-6 py-4 font-mono text-xs font-bold text-slate-700">{txn.orderId}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-slate-100 text-slate-700">
                      {txn.gateway || 'RAZORPAY'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">₹{txn.amount}</td>
                  <td className="px-6 py-4">
                    {txn.status === 'SUCCESS' || txn.status === 'CAPTURED' ? (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-emerald-100 text-emerald-700">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        SUCCESS
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-rose-100 text-rose-700">
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                        {txn.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-xs font-mono">
                    {format(new Date(txn.createdAt), 'dd MMM yyyy, HH:mm')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
