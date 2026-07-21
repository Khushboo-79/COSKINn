import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '../../core/api/orders';
import { ArrowLeft, MapPin, CreditCard, Receipt, Clock, Package, Edit3, Fingerprint, Ban, Truck } from 'lucide-react';
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
      alert('Shipment (AWB) generated successfully!');
      queryClient.invalidateQueries({ queryKey: ['admin', 'order', id] });
    },
    onError: (err: any) => {
      alert(`Error creating shipment: ${err.response?.data?.message || err.message}`);
    }
  });

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center text-slate-500">
          <div className="h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500">
        <Package className="h-12 w-12 mb-4 text-slate-300" />
        <h2 className="text-xl font-bold text-slate-700">Order Not Found</h2>
        <p className="mt-2 text-sm">The requested order does not exist.</p>
        <Link to="/orders" className="mt-4 text-primary-600 hover:underline">Back to Orders</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/orders" className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              Order #{order.id.slice(-8).toUpperCase()}
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                {order.status}
              </span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Placed on {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          {order.status === 'PACKED' && (
            <button 
              onClick={() => shipmentMutation.mutate()}
              disabled={shipmentMutation.isPending}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm flex items-center disabled:opacity-50"
            >
              <Truck className="h-4 w-4 mr-2" />
              {shipmentMutation.isPending ? 'Generating...' : 'Generate AWB'}
            </button>
          )}

          {['PLACED', 'PAYMENT_CONFIRMED', 'PROCESSING'].includes(order.status) && (
            <button 
              onClick={() => setIsCancelModalOpen(true)}
              className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors shadow-sm flex items-center"
            >
              <Ban className="h-4 w-4 mr-2" />
              Cancel Order
            </button>
          )}

          <button 
            onClick={() => navigate(`/support/tickets/new?orderId=${order.id}`)}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center"
          >
            Open Support Ticket
          </button>

          <button 
            onClick={() => setIsUpdateModalOpen(true)}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Update Status
          </button>
          <button 
            onClick={() => navigate(`/orders/${order.id}/invoice`)}
            className="px-4 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-sm flex items-center"
          >
            <Receipt className="h-4 w-4 mr-2" />
            View Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Items & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order Items */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 flex items-center">
                <Package className="h-4 w-4 mr-2 text-slate-500" />
                Order Items ({order.items?.length || 0})
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              {order.items?.map((item: any) => (
                <div key={item.id} className="p-6 flex gap-4">
                  <div className="h-16 w-16 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                    <Package className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-slate-900">{item.productName || 'Product'}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-slate-500">SKU: {item.sku}</p>
                          {['PLACED', 'PAYMENT_CONFIRMED', 'PROCESSING'].includes(order.status) && (
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200" title="This stock is actively locked in the global inventory pool.">
                              Reserved in Inventory
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">₹{item.price}</p>
                        <p className="text-sm text-slate-500 mt-1">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status Timeline */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 flex items-center">
                <Clock className="h-4 w-4 mr-2 text-slate-500" />
                Status History
              </h3>
            </div>
            <div className="p-6">
              {order.statusHistory && order.statusHistory.length > 0 ? (
                <div className="space-y-6">
                  {order.statusHistory.map((history: any, index: number) => (
                    <div key={history.id} className="flex gap-4 relative">
                      {index !== order.statusHistory.length - 1 && (
                        <div className="absolute left-3.5 top-8 bottom-0 w-px bg-slate-200"></div>
                      )}
                      <div className="h-7 w-7 rounded-full bg-primary-100 border-2 border-white flex items-center justify-center z-10 shrink-0">
                        <div className="h-2 w-2 rounded-full bg-primary-600"></div>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{history.status}</p>
                        <p className="text-xs text-slate-500 mt-1">{new Date(history.createdAt).toLocaleString()}</p>
                        {history.notes && <p className="text-sm text-slate-600 mt-2 bg-slate-50 p-2 rounded-lg">{history.notes}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm italic">No history available.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Customer, Shipping, Payment */}
        <div className="space-y-6">
          
          {/* Customer & Shipping */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-slate-500" />
                Customer & Shipping
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Customer</p>
                <p className="font-medium text-slate-900">{order.user?.name || 'Guest'}</p>
                <p className="text-sm text-slate-600 mt-1">{order.user?.email || order.shippingAddress?.email}</p>
                <p className="text-sm text-slate-600 mt-1">{order.user?.mobile || order.shippingAddress?.mobile}</p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Shipping Address</p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {order.shippingAddress?.fullName}<br/>
                  {order.shippingAddress?.addressLine1}<br/>
                  {order.shippingAddress?.addressLine2 && <>{order.shippingAddress.addressLine2}<br/></>}
                  {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900 flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-slate-500" />
                Payment Summary
              </h3>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-slate-500">Method</span>
                <span className="font-medium text-slate-900">{order.paymentMode}</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-slate-500">Status</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  order.paymentStatus === 'PAID' ? 'bg-green-100 text-green-800' 
                  : order.paymentStatus === 'FAILED' ? 'bg-red-100 text-red-800'
                  : 'bg-amber-100 text-amber-800'
                }`}>
                  {order.paymentStatus}
                </span>
              </div>

              {order.paymentMode === 'ONLINE' && order.razorpayOrderId && (
                <div className="bg-slate-50 rounded-lg p-3 mb-6 border border-slate-100 space-y-2">
                  <div className="flex items-center text-xs text-slate-500 mb-2 font-medium">
                    <Fingerprint className="h-3 w-3 mr-1" /> Gateway Reference
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Order ID</span>
                    <span className="font-mono text-slate-700">{order.razorpayOrderId}</span>
                  </div>
                  {order.razorpayPaymentId && (
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Payment ID</span>
                      <span className="font-mono text-slate-700">{order.razorpayPaymentId}</span>
                    </div>
                  )}
                </div>
              )}
              
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-medium text-slate-900">₹{order.subTotal}</span>
                </div>
                {order.discountTotal > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Discount</span>
                    <span className="font-medium text-green-600">-₹{order.discountTotal}</span>
                  </div>
                )}
                {order.walletApplied > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Wallet Used</span>
                    <span className="font-medium text-green-600">-₹{order.walletApplied}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Shipping</span>
                  <span className="font-medium text-slate-900">₹{order.shippingFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Tax (GST)</span>
                  <span className="font-medium text-slate-900">₹{order.taxTotal}</span>
                </div>
                <div className="flex justify-between items-center pt-3 mt-3 border-t border-slate-100">
                  <span className="font-bold text-slate-900">Final Total</span>
                  <span className="font-bold text-xl text-primary-600">₹{order.finalTotal}</span>
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
