import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { Package, MapPin, Truck, CheckCircle2, ChevronLeft, Download, Info, ArrowLeft, RefreshCw, AlertTriangle } from 'lucide-react';
import CancelOrderModal from '../components/orders/CancelOrderModal';
import NeedHelpModal from '../components/orders/NeedHelpModal';
import ReturnReplaceModal from '../components/orders/ReturnReplaceModal';
import ReturnPolicyModal from '../components/orders/ReturnPolicyModal';
import { useOrders } from '../context/OrderContext';
import { downloadInvoice } from '../utils/downloadInvoice';
import apiClient from '../utils/apiClient';

export default function OrderTrackingPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getOrderById, loading } = useOrders();
  
  const [order, setOrder] = useState(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isReturnReplaceModalOpen, setIsReturnReplaceModalOpen] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('return');

  const mapOrderToFrontend = (backendOrder) => {
    if (!backendOrder) return null;
    
    // Map statusHistory to timeline
    // Timeline expects: status, date, time, desc, done
    let timeline = [];
    if (backendOrder.statusHistory && backendOrder.statusHistory.length > 0) {
      timeline = backendOrder.statusHistory.map((sh, idx) => {
        const d = new Date(sh.createdAt);
        return {
          status: sh.status,
          date: d.toLocaleDateString(),
          time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          desc: sh.comment || `Order is ${sh.status}`,
          done: true
        };
      });
    }

    return {
      ...backendOrder,
      timeline: timeline.length > 0 ? timeline : [
        { status: 'Order Placed', date: new Date(backendOrder.createdAt).toLocaleDateString(), time: new Date(backendOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), desc: 'Order received.', done: true }
      ]
    };
  };

  useEffect(() => {
    // Try to get from context first
    const found = getOrderById(orderId);
    if (found) {
      setOrder(mapOrderToFrontend(found));
    } else if (user && !loading) {
      // Fallback: Fetch from API directly if not found in context (e.g. direct link)
      apiClient.get(`/orders/${orderId}`)
        .then(res => setOrder(mapOrderToFrontend(res.data)))
        .catch(err => console.error("Failed to fetch order:", err));
    }
  }, [orderId, getOrderById, user, loading]);

  if (loading && !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-[#FF0069] animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="mx-auto w-12 h-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-heading font-medium text-black mb-2">Order Not Found</h2>
          <p className="text-gray-500 mb-6">We couldn't find the order you're looking for.</p>
          <button onClick={() => navigate('/account/orders')} className="px-6 py-2.5 rounded-xl bg-[#FF0069] text-white font-bold hover:bg-pink-700 transition-colors">
            Back to My Orders
          </button>
        </div>
      </div>
    );
  }

  const handleCancelSuccess = (cancelledOrderId) => {
    // Navigate back to orders or refresh page
    navigate('/account/orders');
  };

  const isCancelled = order.status === 'CANCELLED';
  const isReturned = order.status === 'RETURNED';
  const isReplaced = order.status === 'REPLACED';
  
  const isSpecialStatus = isCancelled || isReturned || isReplaced;

  const getTimelineTitle = () => {
    if (isCancelled) return 'Refund Status';
    if (isReturned) return 'Return Status';
    if (isReplaced) return 'Replacement Status';
    return 'Delivery Timeline';
  };

  const primaryClass = "bg-[#FF0069] text-white hover:bg-pink-700";

  return (
    <div className="min-h-screen bg-gray-50/50 pt-32 pb-20 font-body">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-8">
        
        {/* Breadcrumb / Header */}
        <button 
          onClick={() => navigate('/account/orders')}
          className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-sm tracking-widest uppercase">Back to Orders</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-heading font-medium text-black mb-2">Order Tracking</h1>
            <p className="text-gray-500 flex items-center gap-2">
              <span className="font-mono text-black font-medium">{order.id.split('-')[0]}...</span>
              <span>•</span>
              <span>Placed on {new Date(order.createdAt).toLocaleDateString()}</span>
            </p>
          </div>
          
          {!isCancelled && !['Delivered'].includes(order.status) && (
            <button 
              onClick={() => setIsCancelModalOpen(true)}
              className="px-6 py-2.5 rounded-xl font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 transition-colors w-full md:w-auto text-sm"
            >
              Cancel Order
            </button>
          )}
          {order.status === 'Delivered' && (
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button 
                onClick={() => { setModalMode('return'); setIsReturnReplaceModalOpen(true); }}
                className="px-6 py-2.5 rounded-xl font-bold text-[#FF0069] bg-pink-50 hover:bg-pink-100 border border-pink-100 transition-colors w-full sm:w-auto text-sm"
              >
                Return Product
              </button>
              <button 
                onClick={() => { setModalMode('replace'); setIsReturnReplaceModalOpen(true); }}
                className="px-6 py-2.5 rounded-xl font-bold text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 transition-colors w-full sm:w-auto text-sm"
              >
                Replace Product
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Left Col - 2 spans) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Timeline Section */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                {isSpecialStatus ? (
                  <RefreshCw className="text-[#FF0069]" />
                ) : (
                  <Truck className="text-[#FF0069]" />
                )}
                <h2 className="text-xl font-heading font-medium text-black">
                  {getTimelineTitle()}
                </h2>
              </div>
              
              <div className="relative pl-4 lg:pl-8">
                {/* Vertical Line */}
                <div className="absolute left-[27px] lg:left-[43px] top-4 bottom-8 w-[2px] bg-gray-100" />
                
                <div className="flex flex-col gap-8">
                  {order.timeline.map((step, idx) => (
                    <div key={idx} className="relative flex gap-6">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors duration-500
                        ${step.done ? (isSpecialStatus && idx === order.timeline.length - 1 ? 'bg-orange-100' : 'bg-[#FF0069]') : 'bg-gray-200'}
                      `}>
                        {step.done ? (
                          <CheckCircle2 size={16} className={isSpecialStatus && idx === order.timeline.length - 1 ? "text-orange-600" : "text-white"} />
                        ) : (
                          <div className="w-2.5 h-2.5 rounded-full bg-white" />
                        )}
                      </div>
                      <div className="flex-1 pb-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 mb-1">
                          <h4 className={`font-bold ${step.done ? 'text-black' : 'text-gray-400'}`}>{step.status}</h4>
                          {(step.date || step.time) && (
                            <span className="text-xs font-medium text-gray-400 shrink-0 bg-gray-50 px-2 py-1 rounded-md">
                              {step.date} {step.time ? `• ${step.time}` : ''}
                            </span>
                          )}
                        </div>
                        <p className={`text-sm ${step.done ? 'text-gray-500' : 'text-gray-400'}`}>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Live Status Info (If not cancelled, returned, replaced) */}
            {!isSpecialStatus && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-heading font-medium text-black mb-6">Delivery Information</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100">
                    <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">Courier Partner</p>
                    <p className="font-bold text-black">{order.courier}</p>
                  </div>
                  <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100">
                    <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">Tracking ID</p>
                    <p className="font-bold text-theme-primary font-mono">{order.trackingId}</p>
                  </div>
                  <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 sm:col-span-2">
                    <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">Delivery Address</p>
                    <p className="text-black text-sm leading-relaxed">{order.shippingAddress}</p>
                  </div>
                  {order.deliveryInstructions && (
                    <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100 sm:col-span-2">
                      <p className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-1">Delivery Instructions</p>
                      <p className="text-blue-900 text-sm">{order.deliveryInstructions}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Items Ordered */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-heading font-medium text-black mb-6">Items Ordered</h2>
              
              <div className="flex flex-col gap-4">
                {order.items.map(item => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors">
                    <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                      <img loading="lazy" src={item.product?.images?.[0] || 'https://via.placeholder.com/150'} alt={item.product?.name} className="w-full h-full object-cover mix-blend-multiply opacity-90" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-black text-sm truncate">{item.product?.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">Variant: Default</p>
                      <p className="text-xs font-medium text-gray-500 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-bold text-black text-right shrink-0">
                      ₹{item.price}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
          </div>

          {/* Sidebar (Right Col - 1 span) */}
          <div className="flex flex-col gap-6">
            
            {/* Price Breakdown */}
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-heading font-medium text-black mb-6">Price Details</h2>
              
              <div className="flex flex-col gap-3 text-sm text-gray-600 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-black">₹{order.totalAmount}</span>
                </div>
                {order.discountAmt > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{order.discountAmt}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST (included)</span>
                  <span className="font-medium text-black">₹{Math.round(order.totalAmount * 0.18)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="font-medium text-black">{order.shippingFee === 0 ? 'Free' : `₹${order.shippingFee}`}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center mb-6">
                <span className="font-bold text-black text-lg">Grand Total</span>
                <span className="font-bold text-[#FF0069] text-xl">₹{order.finalAmount}</span>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs font-medium text-gray-500 mb-1">Payment Method</p>
                <p className="font-bold text-black">{order.paymentMode}</p>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex flex-col gap-3">
              <button 
                onClick={() => downloadInvoice(order)}
                className="flex justify-between items-center p-4 bg-white rounded-2xl border border-gray-100 hover:border-[#FF0069] transition-colors group"
              >
                <span className="font-bold text-black text-sm flex items-center gap-3">
                  <Download size={18} className="text-gray-400 group-hover:text-[#FF0069] transition-colors" />
                  Download Invoice
                </span>
              </button>
              <button 
                onClick={() => setIsHelpModalOpen(true)}
                className="flex justify-between items-center p-4 bg-white rounded-2xl border border-gray-100 hover:border-[#FF0069] transition-colors group"
              >
                <span className="font-bold text-black text-sm flex items-center gap-3">
                  <Info size={18} className="text-gray-400 group-hover:text-[#FF0069] transition-colors" />
                  Need Help?
                </span>
              </button>
              <button 
                onClick={() => setIsPolicyModalOpen(true)}
                className="flex justify-between items-center p-4 bg-white rounded-2xl border border-gray-100 hover:border-[#FF0069] transition-colors group"
              >
                <span className="font-bold text-black text-sm flex items-center gap-3">
                  <AlertTriangle size={18} className="text-gray-400 group-hover:text-[#FF0069] transition-colors" />
                  Return Policy
                </span>
              </button>
            </motion.div>

          </div>
        </div>

      </div>

      <CancelOrderModal 
        isOpen={isCancelModalOpen} 
        onClose={() => setIsCancelModalOpen(false)} 
        order={order}
        onCancelSuccess={() => setIsCancelModalOpen(false)}
      />

      <NeedHelpModal 
        isOpen={isHelpModalOpen} 
        onClose={() => setIsHelpModalOpen(false)} 
        order={order}
      />

      <ReturnReplaceModal 
        isOpen={isReturnReplaceModalOpen} 
        onClose={() => setIsReturnReplaceModalOpen(false)} 
        order={order}
        mode={modalMode}
      />

      <ReturnPolicyModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
      />
    </div>
  );
}
