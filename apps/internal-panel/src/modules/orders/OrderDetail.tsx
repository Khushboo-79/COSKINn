import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { ArrowLeft, Package, Truck, User, Clock, CreditCard, FileText, Ban, AlertCircle } from 'lucide-react';

const statusColors: Record<string, string> = {
  DRAFT: 'bg-slate-100 text-slate-700',
  PLACED: 'bg-blue-100 text-blue-700',
  PACKED: 'bg-indigo-100 text-indigo-700',
  SHIPPED: 'bg-purple-100 text-purple-700',
  DELIVERED: 'bg-emerald-100 text-emerald-700',
  CANCELLED: 'bg-rose-100 text-rose-700',
};

const allowedTransitions: Record<string, string[]> = {
  PLACED: ['PACKED', 'CANCELLED'],
  PACKED: ['SHIPPED', 'CANCELLED'],
  SHIPPED: ['DELIVERED', 'CANCELLED'],
};

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [updateNotes, setUpdateNotes] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [showCancel, setShowCancel] = useState(false);

  const { data: order, isLoading } = useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      const res = await api.get(`/admin/orders/${id}`);
      return res.data;
    },
    enabled: !!id
  });

  const updateMutation = useMutation({
    mutationFn: async (newStatus: string) => {
      return api.put(`/admin/orders/${id}/status`, { status: newStatus, notes: updateNotes });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', id] });
      setUpdateNotes('');
    }
  });

  const cancelMutation = useMutation({
    mutationFn: async (reason: string) => {
      return api.post(`/admin/orders/${id}/cancel`, { reason });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', id] });
      setShowCancel(false);
      setCancelReason('');
    }
  });

  const downloadInvoice = async () => {
    try {
      const res = await api.get(`/admin/orders/${id}/invoice`);
      // Mock download logic
      const blob = new Blob([res.data.mockHtml], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${res.data.invoiceNumber || 'invoice'}.html`;
      a.click();
    } catch (e) {
      console.error('Failed to fetch invoice', e);
      alert('Failed to fetch invoice. Check console.');
    }
  };

  if (isLoading) return <div className="p-8 text-center text-slate-500">Loading order details...</div>;
  if (!order) return <div className="p-8 text-center text-rose-500">Order not found.</div>;

  const availableNextStatuses = allowedTransitions[order.status] || [];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/orders" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: '"Expletus Sans", sans-serif' }}>
              Order #{order.id.split('-')[0].toUpperCase()}
            </h2>
            <p className="text-sm text-slate-500">Placed on {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusColors[order.status] || 'bg-slate-100'}`}>
            {order.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Items */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 font-bold text-slate-800 flex items-center gap-2">
              <Package className="w-5 h-5 text-indigo-500" />
              Order Items
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {order.items?.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                    <div>
                      <div className="font-semibold text-slate-800">{item.name}</div>
                      <div className="text-xs text-slate-500">SKU: {item.sku}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-slate-800">₹{item.price.toFixed(2)}</div>
                      <div className="text-xs text-slate-500">Qty: {item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span>₹{order.totalAmount?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Shipping</span>
                  <span>₹{order.shippingFee?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-emerald-600">
                  <span>Discount</span>
                  <span>-₹{order.discountAmt?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-slate-800 pt-2">
                  <span>Total</span>
                  <span>₹{order.finalAmount?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer & Shipping */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 font-bold text-slate-800 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" />
                Customer Info
              </div>
              <div className="p-6 text-sm text-slate-600 space-y-2">
                <div className="font-medium text-slate-800">{order.user?.firstName} {order.user?.lastName}</div>
                <div>{order.user?.email}</div>
                <div>{order.user?.mobile}</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 font-bold text-slate-800 flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-500" />
                Shipping Address
              </div>
              <div className="p-6 text-sm text-slate-600 space-y-1">
                {order.address ? (
                  <>
                    <div className="font-medium text-slate-800">{order.address.fullName}</div>
                    <div>{order.address.addressLine1}</div>
                    {order.address.addressLine2 && <div>{order.address.addressLine2}</div>}
                    <div>{order.address.city}, {order.address.state} {order.address.pincode}</div>
                    <div className="pt-2 text-xs">Phone: {order.address.phone}</div>
                  </>
                ) : (
                  <span className="italic text-slate-400">No address provided</span>
                )}
              </div>
            </div>
          </div>

          {/* Payments & Shipments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 font-bold text-slate-800 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-500" />
                Payments
              </div>
              <div className="p-6">
                {order.payments?.length > 0 ? (
                  <div className="space-y-4">
                    {order.payments.map((p: any) => (
                      <div key={p.id} className="border-b border-slate-50 pb-3 last:pb-0 last:border-0">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-slate-800">₹{p.amount.toFixed(2)}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {p.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 flex justify-between">
                          <span>{p.method || 'Unknown Method'}</span>
                          <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-slate-500 italic">No payment records found.</div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 font-bold text-slate-800 flex items-center gap-2">
                <Package className="w-5 h-5 text-emerald-500" />
                Shipments
              </div>
              <div className="p-6">
                {order.shipments?.length > 0 ? (
                  <div className="space-y-4">
                    {order.shipments.map((s: any) => (
                      <div key={s.id} className="border-b border-slate-50 pb-3 last:pb-0 last:border-0">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-slate-800">{s.awbNumber || 'Pending AWB'}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{s.status}</span>
                        </div>
                        <div className="text-xs text-slate-500">
                          {s.courierPartner || 'Partner Unassigned'}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-slate-500 italic">No shipments generated yet.</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Actions & Timeline */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 font-bold text-slate-800">
              Update Status
            </div>
            <div className="p-6 space-y-4">
              <button
                onClick={downloadInvoice}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition-colors mb-4"
              >
                <FileText className="w-4 h-4 text-slate-500" />
                Download Invoice (Mock)
              </button>

              {order.cancellations?.length > 0 && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-sm mb-4">
                  <div className="font-bold flex items-center gap-2 mb-1">
                    <AlertCircle className="w-4 h-4" /> Order Cancelled
                  </div>
                  <div>Reason: {order.cancellations[0].reason}</div>
                </div>
              )}

              {availableNextStatuses.length > 0 ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Optional Notes</label>
                    <textarea 
                      className="w-full text-sm p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                      rows={2}
                      placeholder="Reason for update..."
                      value={updateNotes}
                      onChange={(e) => setUpdateNotes(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {availableNextStatuses.map(s => (
                      <button
                        key={s}
                        onClick={() => updateMutation.mutate(s)}
                        disabled={updateMutation.isPending}
                        className={`flex-1 min-w-[100px] py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-lg border shadow-sm transition-all disabled:opacity-50
                          ${s === 'CANCELLED' ? 'border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100' : 'border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100'}`}
                      >
                        Mark {s}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-sm text-slate-500 text-center py-2 italic">
                  No further transitions allowed from {order.status}.
                </div>
              )}

              {/* Cancel Button */}
              {order.status !== 'CANCELLED' && order.status !== 'SHIPPED' && order.status !== 'DELIVERED' && (
                <div className="pt-4 border-t border-slate-100 mt-4">
                  {!showCancel ? (
                    <button
                      onClick={() => setShowCancel(true)}
                      className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-rose-50 text-rose-700 font-semibold hover:bg-rose-100 transition-colors"
                    >
                      <Ban className="w-4 h-4" />
                      Cancel Order
                    </button>
                  ) : (
                    <div className="space-y-3 bg-rose-50 p-4 rounded-lg border border-rose-100">
                      <label className="block text-xs font-semibold text-rose-700">Reason for Cancellation</label>
                      <input 
                        type="text" 
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                        placeholder="e.g. Customer request"
                        className="w-full text-sm p-2 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => cancelMutation.mutate(cancelReason)}
                          disabled={cancelMutation.isPending || !cancelReason}
                          className="flex-1 py-2 bg-rose-600 text-white rounded-lg text-sm font-semibold hover:bg-rose-700 disabled:opacity-50"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setShowCancel(false)}
                          className="flex-1 py-2 bg-white text-slate-700 rounded-lg text-sm font-semibold border border-slate-200 hover:bg-slate-50"
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 font-bold text-slate-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              Status History
            </div>
            <div className="p-6">
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                {order.statusHistory?.map((h: any) => (
                  <div key={h.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-slate-50 shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <div className={`text-xs font-bold uppercase ${statusColors[h.status] ? statusColors[h.status].split(' ')[1] : 'text-slate-700'}`}>
                          {h.status}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {new Date(h.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </div>
                      <div className="text-xs text-slate-500 mb-1">
                        {new Date(h.createdAt).toLocaleDateString()}
                      </div>
                      {h.notes && (
                        <div className="text-xs text-slate-600 mt-2 p-2 bg-white rounded border border-slate-100">
                          {h.notes}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {!order.statusHistory?.length && (
                  <div className="text-sm text-slate-500 text-center italic">No history found.</div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
