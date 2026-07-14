import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { Search, CreditCard, Banknote, ShieldCheck, Loader2 } from 'lucide-react';

const statusColors: Record<string, string> = {
  SUCCESS: 'bg-emerald-100 text-emerald-700',
  PENDING: 'bg-amber-100 text-amber-700',
  FAILED: 'bg-rose-100 text-rose-700',
};

export default function PaymentsScreen() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['adminOrders'],
    queryFn: async () => {
      const res = await api.get('/admin/orders');
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-rose-500">Failed to load payments.</div>;
  }

  const payments = orders.map((order: any) => ({
    id: `PAY-${order.id.substring(0, 8).toUpperCase()}`,
    orderId: order.id,
    customer: order.user?.email || 'Guest',
    method: order.paymentMode === 'ONLINE' ? 'RAZORPAY_GATEWAY' : 'CASH',
    type: order.paymentMode === 'ONLINE' ? 'PREPAID' : 'COD',
    status: order.paymentMode === 'ONLINE' ? 'SUCCESS' : (order.status === 'DELIVERED' ? 'SUCCESS' : 'PENDING'),
    amount: `₹${order.finalAmount}`,
    date: new Date(order.createdAt).toLocaleDateString(),
    gatewayId: order.paymentMode === 'ONLINE' ? `pay_${order.id.substring(0, 8)}` : 'N/A'
  }));

  const filteredPayments = payments.filter((payment: any) => 
    payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) || 
    payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.gatewayId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: '"Expletus Sans", sans-serif' }}>
            Payments & COD
          </h2>
          <p className="text-sm text-slate-500 mt-1">Track payment statuses, verify COD collections</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Prepaid Collections</p>
              <h3 className="text-xl font-bold text-slate-800">
                ₹{payments.filter((p: any) => p.type === 'PREPAID').reduce((sum: number, p: any) => sum + parseInt(p.amount.replace('₹', '')), 0).toLocaleString()}
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Banknote className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Pending COD</p>
              <h3 className="text-xl font-bold text-slate-800">
                ₹{payments.filter((p: any) => p.type === 'COD' && p.status === 'PENDING').reduce((sum: number, p: any) => sum + parseInt(p.amount.replace('₹', '')), 0).toLocaleString()}
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Total Processed</p>
              <h3 className="text-xl font-bold text-slate-800">
                ₹{payments.filter((p: any) => p.status === 'SUCCESS').reduce((sum: number, p: any) => sum + parseInt(p.amount.replace('₹', '')), 0).toLocaleString()}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Payment ID, Order ID, or Gateway TXN..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Transaction Details</th>
                <th className="px-6 py-4">Order & Customer</th>
                <th className="px-6 py-4">Payment Method</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayments.map((payment: any) => (
                <tr key={payment.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800 text-sm">{payment.amount}</div>
                    <div className="text-xs text-slate-500 mt-1 font-mono">{payment.id}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{payment.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-indigo-600 hover:underline cursor-pointer text-xs">{payment.orderId.split('-')[0]}...</div>
                    <div className="text-xs text-slate-600 mt-0.5">{payment.customer}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {payment.type === 'PREPAID' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">PREPAID</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100">COD</span>
                      )}
                    </div>
                    <div className="text-xs font-medium text-slate-700 mt-1">{payment.method.replace(/_/g, ' ')}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{payment.gatewayId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${statusColors[payment.status] || 'bg-slate-100 text-slate-700'}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800">
                      View Log
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No payment records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
