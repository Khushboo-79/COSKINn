import { useQuery } from '@tanstack/react-query';
import { auditApi } from '../../core/api/audit';
import { Loader2, RefreshCcw, Wallet, CreditCard, CheckCircle2, Clock } from 'lucide-react';
import { format } from 'date-fns';

export const RefundReportsScreen = () => {
  const { data: refunds, isLoading } = useQuery({
    queryKey: ['audit', 'refunds'],
    queryFn: () => auditApi.getRefundReport()
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin mb-4 text-slate-400" />
        <p>Loading global refund ledger...</p>
      </div>
    );
  }

  // Calculate some basic stats
  const successfulRefunds = refunds?.filter((r: any) => r.status === 'PROCESSED' || r.status === 'SUCCESS').length || 0;
  const pendingRefunds = refunds?.filter((r: any) => r.status === 'PENDING').length || 0;
  
  const walletRefunds = refunds?.filter((r: any) => r.type === 'WALLET') || [];
  const gatewayRefunds = refunds?.filter((r: any) => r.type === 'GATEWAY') || [];

  const totalWalletRefunded = walletRefunds.reduce((sum: number, r: any) => sum + r.amount, 0);
  const totalGatewayRefunded = gatewayRefunds.reduce((sum: number, r: any) => sum + r.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center">
            <RefreshCcw className="h-6 w-6 mr-3 text-indigo-600" />
            Global Refunds Ledger
          </h2>
          <p className="text-sm text-slate-500 mt-1">Read-only audit trail of all refunds processed across Wallet and Payment Gateways.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center text-emerald-600 mb-2">
            <CheckCircle2 className="h-4 w-4 mr-1.5" />
            <h3 className="font-semibold text-xs uppercase tracking-wider">Processed Refunds</h3>
          </div>
          <p className="text-2xl font-black text-slate-900">{successfulRefunds}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center text-amber-600 mb-2">
            <Clock className="h-4 w-4 mr-1.5" />
            <h3 className="font-semibold text-xs uppercase tracking-wider">Pending Processing</h3>
          </div>
          <p className="text-2xl font-black text-slate-900">{pendingRefunds}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 bg-gradient-to-br from-white to-sky-50">
          <div className="flex items-center text-sky-600 mb-2">
            <Wallet className="h-4 w-4 mr-1.5" />
            <h3 className="font-semibold text-xs uppercase tracking-wider">Total Wallet Credits</h3>
          </div>
          <p className="text-2xl font-black text-sky-900">₹{totalWalletRefunded.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 bg-gradient-to-br from-white to-indigo-50">
          <div className="flex items-center text-indigo-600 mb-2">
            <CreditCard className="h-4 w-4 mr-1.5" />
            <h3 className="font-semibold text-xs uppercase tracking-wider">Total Gateway Reversals</h3>
          </div>
          <p className="text-2xl font-black text-indigo-900">₹{totalGatewayRefunded.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        {!refunds || refunds.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            No refunds processed yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-600">Refund ID</th>
                  <th className="px-6 py-4 font-semibold text-slate-600">Order ID</th>
                  <th className="px-6 py-4 font-semibold text-slate-600">Type</th>
                  <th className="px-6 py-4 font-semibold text-slate-600">Amount</th>
                  <th className="px-6 py-4 font-semibold text-slate-600">Status</th>
                  <th className="px-6 py-4 font-semibold text-slate-600">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {refunds.map((refund: any) => (
                  <tr key={refund.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{refund.id}</td>
                    <td className="px-6 py-4 font-mono text-xs font-bold text-slate-700">{refund.orderId}</td>
                    <td className="px-6 py-4">
                      {refund.type === 'WALLET' ? (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-sky-100 text-sky-700">
                          <Wallet className="h-3 w-3 mr-1" />
                          WALLET
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-indigo-100 text-indigo-700">
                          <CreditCard className="h-3 w-3 mr-1" />
                          GATEWAY
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">₹{refund.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                        refund.status === 'PROCESSED' || refund.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-700' :
                        refund.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {refund.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-xs font-mono">
                      {format(new Date(refund.createdAt), 'dd MMM yyyy, HH:mm')}
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
};
