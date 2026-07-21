import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '../../core/api/orders';
import { IndianRupee, Wallet, CreditCard, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RefundListScreen = () => {
  const queryClient = useQueryClient();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const { data: refunds, isLoading } = useQuery({
    queryKey: ['admin', 'refunds'],
    queryFn: () => orderApi.getAllRefunds(),
  });

  const walletRefundMutation = useMutation({
    mutationFn: (data: { orderId: string, amount: number, reason: string }) => 
      orderApi.processWalletRefund(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'refunds'] });
      setProcessingId(null);
    },
    onError: (err: any) => {
      alert(`Error processing wallet refund: ${err.response?.data?.message || err.message}`);
      setProcessingId(null);
    }
  });

  const gatewayRefundMutation = useMutation({
    mutationFn: (data: { orderId: string, amount: number, reason: string }) => 
      orderApi.processGatewayRefund(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'refunds'] });
      setProcessingId(null);
    },
    onError: (err: any) => {
      alert(`Error processing gateway refund: ${err.response?.data?.message || err.message}`);
      setProcessingId(null);
    }
  });

  const handleRefund = (refund: any, type: 'WALLET' | 'GATEWAY') => {
    const reason = prompt(`Processing ₹${refund.amount} to ${type}.\nEnter a reason/note for this transaction:`, `Refund for order ${refund.orderId}`);
    if (reason === null) return;
    
    setProcessingId(refund.id);
    
    if (type === 'WALLET') {
      walletRefundMutation.mutate({ orderId: refund.orderId, amount: refund.amount, reason });
    } else {
      gatewayRefundMutation.mutate({ orderId: refund.orderId, amount: refund.amount, reason });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Refund Management</h1>
          <p className="text-slate-500 text-sm mt-1">Process and track customer financial refunds.</p>
        </div>
      </div>

      {/* Data List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Order</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p>Loading refunds...</p>
                    </div>
                  </td>
                </tr>
              ) : !refunds || refunds.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-slate-500 bg-slate-50">
                    <IndianRupee className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                    <p className="text-lg font-medium text-slate-700">No refunds found</p>
                  </td>
                </tr>
              ) : (
                refunds.map((refund: any) => (
                  <tr key={refund.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">
                        <Link to={`/orders/${refund.orderId}`} className="hover:text-primary-600">
                          Order #{refund.orderId.slice(-8).toUpperCase()}
                        </Link>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {new Date(refund.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-slate-900">₹{refund.amount.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-700">{refund.reason}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        refund.status === 'PENDING' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                        refund.status === 'COMPLETED' ? 'bg-green-100 text-green-800 border-green-200' :
                        'bg-red-100 text-red-800 border-red-200'
                      }`}>
                        {refund.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {refund.status === 'PENDING' && (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleRefund(refund, 'WALLET')}
                            disabled={processingId === refund.id}
                            className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center disabled:opacity-50 shadow-sm"
                            title="Credit to Customer Wallet"
                          >
                            <Wallet className="h-4 w-4 mr-1.5 text-blue-500" />
                            Wallet
                          </button>
                          <button
                            onClick={() => handleRefund(refund, 'GATEWAY')}
                            disabled={processingId === refund.id}
                            className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center disabled:opacity-50 shadow-sm"
                            title="Refund via Original Gateway"
                          >
                            <CreditCard className="h-4 w-4 mr-1.5 text-indigo-500" />
                            Source
                          </button>
                        </div>
                      )}
                      {refund.status === 'COMPLETED' && (
                        <span className="text-xs text-slate-400">Processed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
