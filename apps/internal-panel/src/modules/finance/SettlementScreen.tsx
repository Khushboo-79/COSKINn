import { useQuery, useMutation } from '@tanstack/react-query';
import { orderApi } from '../../core/api/orders';
import { financeApi } from '../../core/api/finance';
import { CheckCircle2, ShieldCheck, Truck, RefreshCw, Loader2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export const SettlementScreen = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin', 'orders'],
    queryFn: () => orderApi.getOrders()
  });

  const syncMutation = useMutation({
    mutationFn: () => financeApi.syncSettlements([{ id: 'mock-settlement' }]),
    onMutate: () => {
      setIsSyncing(true);
      setSuccessMessage('');
    },
    onSuccess: () => {
      setTimeout(() => {
        setIsSyncing(false);
        setSuccessMessage('Settlements synced successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }, 1500); // Faking network delay for UX
    }
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  const razorpayOrders = orders?.filter((o: any) => o.paymentMethod === 'PREPAID') || [];
  const codOrders = orders?.filter((o: any) => o.paymentMethod === 'COD') || [];

  const calculateTotal = (orderList: any[]) => {
    return orderList.reduce((sum, order) => sum + order.totalAmount, 0);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settlement Reconciliation</h1>
          <p className="text-slate-500 text-sm mt-1">Match collected revenue from Razorpay and ShadowFox COD remissions.</p>
        </div>
        <div className="flex items-center gap-3">
          {successMessage && (
            <div className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2" /> {successMessage}
            </div>
          )}
          <button 
            onClick={() => syncMutation.mutate()}
            disabled={isSyncing}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            {isSyncing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
            {isSyncing ? 'Syncing...' : 'Sync Gateway Settlements'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Razorpay Ledger */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 bg-[#f4f8fb] flex items-center justify-between">
            <div className="flex items-center">
              <ShieldCheck className="h-6 w-6 text-[#0d2366] mr-3" />
              <div>
                <h2 className="text-lg font-bold text-[#0d2366]">Razorpay (Prepaid)</h2>
                <p className="text-xs text-slate-500">Gateway Settlements</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-900">{formatCurrency(calculateTotal(razorpayOrders))}</div>
              <div className="text-xs font-bold text-[#0d2366] uppercase tracking-wider">{razorpayOrders.length} Orders</div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto max-h-[600px] p-0">
            {isLoading ? (
              <div className="p-12 text-center text-slate-500">Loading prepaid orders...</div>
            ) : razorpayOrders.length === 0 ? (
              <div className="p-12 text-center text-slate-500">No prepaid orders found.</div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-white border-b border-slate-100 shadow-sm z-10">
                  <tr>
                    <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                    <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {razorpayOrders.map((order: any) => (
                    <tr key={order.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-medium text-slate-700">
                        {order.id.slice(0,8).toUpperCase()}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide ${
                          order.paymentStatus === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 
                          order.paymentStatus === 'REFUNDED' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {order.paymentStatus || 'UNKNOWN'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-slate-900">
                        {formatCurrency(order.totalAmount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* ShadowFox COD Ledger */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 bg-[#fff9eb] flex items-center justify-between">
            <div className="flex items-center">
              <Truck className="h-6 w-6 text-amber-600 mr-3" />
              <div>
                <h2 className="text-lg font-bold text-amber-900">ShadowFox (COD)</h2>
                <p className="text-xs text-slate-500">Courier Remittances</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-900">{formatCurrency(calculateTotal(codOrders))}</div>
              <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">{codOrders.length} Orders</div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto max-h-[600px] p-0">
            {isLoading ? (
              <div className="p-12 text-center text-slate-500">Loading COD orders...</div>
            ) : codOrders.length === 0 ? (
              <div className="p-12 text-center text-slate-500">No COD orders found.</div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-white border-b border-slate-100 shadow-sm z-10">
                  <tr>
                    <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                    <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Logistics Status</th>
                    <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {codOrders.map((order: any) => (
                    <tr key={order.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-medium text-slate-700">
                        {order.id.slice(0,8).toUpperCase()}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide flex items-center w-fit ${
                          order.status === 'DELIVERED' && order.paymentStatus === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 
                          order.status === 'DELIVERED' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status === 'DELIVERED' && order.paymentStatus !== 'PAID' && <AlertCircle className="h-3 w-3 mr-1" />}
                          {order.status === 'DELIVERED' && order.paymentStatus !== 'PAID' ? 'DELIVERED (UNREMITTED)' : order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-slate-900">
                        {formatCurrency(order.totalAmount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
