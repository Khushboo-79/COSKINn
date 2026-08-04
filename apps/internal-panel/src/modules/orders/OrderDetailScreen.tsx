import { toast } from 'sonner';
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '../../core/api/orders';
import { ArrowLeft, MapPin, CreditCard, Receipt, Clock, Package, Edit3, Fingerprint, Ban, Truck, Phone, Mail, User } from 'lucide-react';
import { UpdateStatusModal } from './components/UpdateStatusModal';
import { CancelOrderModal } from './components/CancelOrderModal';

export const OrderDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const { data: order, isLoading } = useQuery({
    queryKey: ['admin', 'order', id],
    queryFn: () => orderApi.getOrderById(id as string),
    enabled: !!id,
  });

  const shipmentMutation = useMutation({
    mutationFn: () => orderApi.createShipment({
      orderId: id as string,
      warehouseId: 'default-warehouse', // In a full app, this would be selected
      boxLength: 10,
      boxWidth: 10,
      boxHeight: 10,
      boxWeight: 0.5
    }),
    onSuccess: () => {
      toast.success('Action successful');
      queryClient.invalidateQueries({ queryKey: ['admin', 'order', id] });
    },
    onError: (err: any) => {
      toast.error('An error occurred');
    }
  });

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center text-slate-500">
          <div className="h-10 w-10 border-4 border-[#FF3E7F] border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(255,62,127,0.3)]"></div>
          <p className="font-semibold animate-pulse">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-slate-500">
        <Package className="h-16 w-16 mb-4 text-slate-200" />
        <h2 className="text-2xl font-bold text-slate-700">Order Not Found</h2>
        <p className="mt-2 text-sm">The requested order does not exist or has been removed.</p>
        <Link to="/orders" className="mt-6 px-6 py-2.5 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors shadow-lg">Back to Orders</Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'PLACED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PAYMENT_CONFIRMED': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'PROCESSING': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'PACKED': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'SHIPPED': return 'bg-violet-100 text-violet-800 border-violet-200';
      case 'OUT_FOR_DELIVERY': return 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200';
      case 'DELIVERED': return 'bg-green-100 text-green-800 border-green-200';
      case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
      case 'RETURN_REQUESTED': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Premium Header */}
      <div className="relative bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#FF3E7F]/10 to-transparent rounded-bl-full pointer-events-none"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <Link to="/orders" className="h-10 w-10 flex items-center justify-center bg-slate-50 hover:bg-[#FF3E7F]/10 text-slate-500 hover:text-[#FF3E7F] rounded-full transition-all group shrink-0">
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
            </Link>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                  Order #{order.id?.slice(-8).toUpperCase() || 'UNKNOWN'}
                </h1>
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                  {order.status || 'UNKNOWN'}
                </span>
              </div>
              <p className="text-slate-500 text-sm mt-1.5 flex items-center">
                <Clock className="h-4 w-4 mr-1.5 opacity-70" />
                Placed on {order.createdAt ? new Date(order.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : 'N/A'}
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 flex-wrap">
            {order.status === 'PACKED' && (
              <button 
                onClick={() => shipmentMutation.mutate()}
                disabled={shipmentMutation.isPending}
                className="px-5 py-2.5 bg-[#FF3E7F] text-white rounded-xl font-bold hover:bg-[#e02b66] transition-all shadow-[0_4px_14px_rgba(255,62,127,0.3)] hover:shadow-[0_6px_20px_rgba(255,62,127,0.4)] flex items-center disabled:opacity-50"
              >
                <Truck className="h-4 w-4 mr-2" />
                {shipmentMutation.isPending ? 'Generating...' : 'Generate AWB'}
              </button>
            )}

            {['PLACED', 'PAYMENT_CONFIRMED', 'PROCESSING'].includes(order.status) && (
              <button 
                onClick={() => setIsCancelModalOpen(true)}
                className="px-5 py-2.5 bg-white border border-rose-200 text-rose-600 rounded-xl font-bold hover:bg-rose-50 hover:border-rose-300 transition-all shadow-sm flex items-center"
              >
                <Ban className="h-4 w-4 mr-2" />
                Cancel
              </button>
            )}

            <button 
              onClick={() => navigate(`/support/tickets/new?orderId=${order.id}`)}
              className="px-5 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-100 hover:text-slate-900 transition-all shadow-sm flex items-center"
            >
              Support
            </button>

            <button 
              onClick={() => setIsUpdateModalOpen(true)}
              className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md flex items-center"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Update
            </button>
            
            <button 
              onClick={() => navigate(`/orders/${order.id}/invoice`)}
              className="px-5 py-2.5 bg-[#FF3E7F]/10 text-[#FF3E7F] rounded-xl font-bold hover:bg-[#FF3E7F]/20 transition-all flex items-center"
            >
              <Receipt className="h-4 w-4 mr-2" />
              Invoice
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Items & Timeline */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Order Items */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="text-lg font-black text-slate-900 flex items-center">
                <Package className="h-5 w-5 mr-2 text-[#FF3E7F]" />
                Order Items
              </h3>
              <span className="bg-slate-200 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-full">{order.items?.length || 0}</span>
            </div>
            <div className="divide-y divide-slate-50">
              {order.items?.map((item: any) => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-5 hover:bg-slate-50/50 transition-colors group">
                  <div className="h-20 w-20 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300 border border-slate-200 group-hover:border-[#FF3E7F]/30 transition-colors shrink-0">
                    <Package className="h-8 w-8" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-900 text-base group-hover:text-[#FF3E7F] transition-colors">{item.variant?.product?.name || item.productName || 'Unknown Product'}</h4>
                        <div className="flex items-center gap-2 mt-1.5">
                          <p className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">SKU: {item.variant?.sku || item.sku}</p>
                          {['PLACED', 'PAYMENT_CONFIRMED', 'PROCESSING'].includes(order.status) && (
                            <span className="text-[9px] uppercase font-black tracking-wider px-2 py-1 rounded-md bg-amber-50 text-amber-600 border border-amber-100" title="Reserved in inventory">
                              Reserved
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-slate-900 text-lg">₹{item.price}</p>
                        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status Timeline */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-black text-slate-900 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-[#FF3E7F]" />
                Status History
              </h3>
            </div>
            <div className="p-8">
              {order.statusHistory && order.statusHistory.length > 0 ? (
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#FF3E7F]/30 before:to-transparent">
                  {order.statusHistory.map((history: any, index: number) => (
                    <div key={history.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-white bg-[#FF3E7F] text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <div className="h-2 w-2 bg-white rounded-full"></div>
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm group-hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-black text-slate-900">{history.status}</p>
                          <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-1 rounded-full border border-slate-100">
                            {new Date(history.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-slate-500 mt-1">{new Date(history.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                        {history.notes && <p className="text-xs font-medium text-slate-600 mt-3 bg-white p-3 rounded-xl border border-slate-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">"{history.notes}"</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                  <Clock className="h-10 w-10 mb-3 opacity-20" />
                  <p className="text-sm font-semibold">No tracking history available yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Customer, Shipping, Payment */}
        <div className="space-y-8">
          
          {/* Customer */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden relative">
            <div className="h-1 bg-gradient-to-r from-blue-400 to-indigo-500 w-full absolute top-0"></div>
            <div className="p-6">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center">
                <User className="h-4 w-4 mr-2" />
                Customer Info
              </h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xl border border-blue-100 shrink-0">
                  {order.user?.firstName?.charAt(0) || order.shippingAddress?.fullName?.charAt(0) || 'G'}
                </div>
                <div>
                  <p className="font-black text-slate-900 text-lg leading-tight">{order.user ? `${order.user.firstName || ''} ${order.user.lastName || ''}`.trim() || order.shippingAddress?.fullName || 'Guest User' : order.shippingAddress?.fullName || 'Guest User'}</p>
                  <p className="text-xs font-bold text-slate-400 mt-0.5">{order.user?.id ? 'Registered Account' : 'Guest Checkout'}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center text-sm font-medium text-slate-600 bg-slate-50 p-3 rounded-xl">
                  <Mail className="h-4 w-4 mr-3 text-slate-400 shrink-0" />
                  <span className="truncate">{order.user?.email || order.shippingAddress?.email || 'N/A'}</span>
                </div>
                <div className="flex items-center text-sm font-medium text-slate-600 bg-slate-50 p-3 rounded-xl">
                  <Phone className="h-4 w-4 mr-3 text-slate-400 shrink-0" />
                  {order.user?.phone || order.shippingAddress?.mobile || 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden relative">
             <div className="h-1 bg-gradient-to-r from-[#FF3E7F] to-orange-400 w-full absolute top-0"></div>
            <div className="p-6">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Shipping To
              </h3>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
                  <MapPin className="h-24 w-24" />
                </div>
                <p className="font-black text-slate-900 mb-2 relative z-10">{order.shippingAddress?.fullName}</p>
                <p className="text-sm text-slate-600 font-medium leading-relaxed relative z-10">
                  {order.shippingAddress?.addressLine1}<br/>
                  {order.shippingAddress?.addressLine2 && <>{order.shippingAddress.addressLine2}<br/></>}
                  {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden relative">
            <div className="h-1 bg-gradient-to-r from-emerald-400 to-teal-500 w-full absolute top-0"></div>
            <div className="p-6">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center">
                <Receipt className="h-4 w-4 mr-2" />
                Payment Summary
              </h3>
              
              <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                    <CreditCard className="h-5 w-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Method</p>
                    <p className="font-black text-slate-900 text-sm">{order.paymentMode}</p>
                  </div>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  order.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700 border border-green-200' 
                  : order.paymentStatus === 'FAILED' ? 'bg-red-100 text-red-700 border border-red-200'
                  : 'bg-amber-100 text-amber-700 border border-amber-200'
                }`}>
                  {order.paymentStatus}
                </span>
              </div>

              {order.paymentMode === 'ONLINE' && order.razorpayOrderId && (
                <div className="bg-slate-900 text-slate-300 rounded-2xl p-5 mb-6 shadow-md relative overflow-hidden">
                  <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
                    <Fingerprint className="h-24 w-24 -translate-y-4 translate-x-4" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-3">
                      Gateway Reference
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                        <span>Order ID</span>
                        <span className="font-mono text-white text-[10px] sm:text-xs truncate ml-2">{order.razorpayOrderId}</span>
                      </div>
                      {order.razorpayPaymentId && (
                        <div className="flex justify-between items-center text-sm">
                          <span>Payment ID</span>
                          <span className="font-mono text-white text-[10px] sm:text-xs truncate ml-2">{order.razorpayPaymentId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-3 px-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-slate-500">Subtotal</span>
                  <span className="font-bold text-slate-900">₹{order.subTotal}</span>
                </div>
                {order.discountTotal > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-slate-500">Discount</span>
                    <span className="font-bold text-emerald-500">-₹{order.discountTotal}</span>
                  </div>
                )}
                {order.walletApplied > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-slate-500">Wallet Used</span>
                    <span className="font-bold text-emerald-500">-₹{order.walletApplied}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-slate-500">Shipping Fee</span>
                  <span className="font-bold text-slate-900">₹{order.shippingFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-slate-500">Tax (GST)</span>
                  <span className="font-bold text-slate-900">₹{order.taxTotal}</span>
                </div>
                
                <div className="pt-4 mt-4 border-t-2 border-dashed border-slate-200">
                  <div className="flex justify-between items-end bg-[#FF3E7F]/5 p-4 rounded-2xl border border-[#FF3E7F]/10">
                    <span className="font-black text-slate-900 uppercase tracking-widest text-xs">Final Total</span>
                    <span className="font-black text-2xl text-[#FF3E7F]">₹{(order.finalAmount || order.totalAmount || 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {isUpdateModalOpen && (
        <UpdateStatusModal
          orderId={order.id}
          currentStatus={order.status}
          onClose={() => setIsUpdateModalOpen(false)}
        />
      )}
      
      {isCancelModalOpen && (
        <CancelOrderModal
          orderId={order.id}
          onClose={() => setIsCancelModalOpen(false)}
        />
      )}
    </div>
  );
};
