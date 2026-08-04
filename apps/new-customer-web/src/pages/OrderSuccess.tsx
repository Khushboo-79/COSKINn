import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCurrency } from '../context/CurrencyContext';
import { CheckCircle2, Package, MapPin, FileText, Download, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const OrderSuccess: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  const { formatPrice } = useCurrency();
  const { orderId } = useParams();

  const [showInvoice, setShowInvoice] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      api.get(`/orders/${orderId}`)
        .then(res => {
          setOrder(res.data.data || res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to load order details', err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [orderId]);

  const handleDownload = async () => {
    if (!order) return;
    setDownloading(true);
    try {
      const res = await api.get(`/orders/${order.id}/invoice`);
      const invoiceUrl = res.data?.url || res.data?.data?.url;
      if (invoiceUrl) {
        window.open(invoiceUrl, '_blank');
      } else {
        alert('Invoice generation failed or not ready.');
      }
    } catch (err) {
      console.error('Failed to fetch invoice', err);
      alert('Failed to fetch invoice');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isGlam ? 'bg-[#faf9f6]' : 'bg-[#fcfaf9]'}`}>
        <Loader2 className="animate-spin text-gray-400" size={48} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center ${isGlam ? 'bg-[#faf9f6]' : 'bg-[#fcfaf9]'}`}>
        <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
        <Link to="/" className="text-blue-500 hover:underline">Return Home</Link>
      </div>
    );
  }

  // Calculate estimated delivery (e.g., 3-5 days from now)
  const orderDate = new Date(order.createdAt);
  const deliveryStart = new Date(orderDate);
  deliveryStart.setDate(orderDate.getDate() + 3);
  const deliveryEnd = new Date(orderDate);
  deliveryEnd.setDate(orderDate.getDate() + 5);

  const formatDate = (d: Date) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className={`min-h-screen py-16 px-4 sm:px-6 transition-colors duration-500 ${isGlam ? 'bg-[#faf9f6]' : 'bg-[#fcfaf9]'}`}>
      <div className="max-w-2xl mx-auto mt-10 md:mt-20">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className={`rounded-[32px] p-8 md:p-12 shadow-xl border ${
            isGlam ? 'bg-white border-[#e5b376]/20' : 'bg-white border-[#ffe4e8]'
          }`}
        >
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
              isGlam ? 'bg-[#7a1b26]/10 text-[#7a1b26]' : 'bg-[#ff9aa8]/10 text-[#ff9aa8]'
            }`}>
              <CheckCircle2 size={40} strokeWidth={1.5} />
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Order #{order.id.slice(0, 8)}</p>
            <h1 className={`text-4xl md:text-5xl font-extrabold text-[#2a2a2a] mb-4 ${isGlam ? 'font-serif' : 'font-display'}`}>
              Thank you!
            </h1>
            <p className="text-gray-500 font-medium">
              Your order has been confirmed. You will receive an email confirmation shortly.
            </p>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-4">
              <Package className="text-gray-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Estimated Delivery</h3>
                <p className="text-sm text-gray-500 font-medium">{formatDate(deliveryStart)} - {formatDate(deliveryEnd)}</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-4">
              <MapPin className="text-gray-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Shipping Address</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  {order.address?.fullName}<br/>
                  {order.address?.addressLine1}{order.address?.addressLine2 ? `, ${order.address?.addressLine2}` : ''}<br/>
                  {order.address?.city}, {order.address?.state} {order.address?.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setShowInvoice(true)}
              className={`flex-1 py-4 px-6 rounded-xl font-bold text-center transition-all flex justify-center items-center gap-2 ${
                isGlam ? 'bg-[#2a2a2a] text-[#e5b376] hover:bg-black' : 'bg-[#ff9aa8] text-white hover:bg-[#ff8091] shadow-lg shadow-[#ff9aa8]/30'
              }`}
            >
              <FileText size={18} /> View Invoice
            </button>
            <Link 
              to="/"
              className="flex-1 py-4 px-6 rounded-xl font-bold text-center text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Return Home
            </Link>
          </div>

        </motion.div>

      </div>

      {/* Invoice Modal */}
      <AnimatePresence>
        {showInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden ${isGlam ? 'bg-[#faf9f6]' : 'bg-white'}`}
            >
              {/* Modal Header */}
              <div className={`px-6 py-4 border-b flex justify-between items-center ${isGlam ? 'bg-[#1a1a1a] border-[#e5b376]/20 text-[#e5b376]' : 'bg-gray-50 border-gray-100'}`}>
                <h2 className={`text-xl font-bold ${isGlam ? 'font-serif' : 'font-display text-gray-900'}`}>Invoice Details</h2>
                <div className="flex gap-2">
                  <button onClick={handleDownload} disabled={downloading} className={`p-2 rounded-lg transition-colors flex items-center gap-2 font-bold text-sm ${isGlam ? 'bg-[#e5b376] text-[#1a1a1a] hover:bg-white' : 'bg-[#ff9aa8] text-white hover:bg-[#ff8091]'} ${downloading ? 'opacity-70' : ''}`}>
                    {downloading ? <span className="animate-pulse">Loading...</span> : <><Download size={16} /> Download PDF</>}
                  </button>
                  <button onClick={() => setShowInvoice(false)} className={`p-2 rounded-lg transition-colors ${isGlam ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-200 text-gray-500'}`}>
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Invoice Content */}
              <div className="p-6 md:p-10 overflow-y-auto">
                {/* Header info */}
                <div className="flex flex-col md:flex-row justify-between border-b pb-8 mb-8 border-gray-200">
                  <div>
                    <h1 className={`text-3xl font-medium tracking-tight mb-2 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-gray-900'}`}>
                      COSKIN<span className={isGlam ? 'text-[#e5b376]' : 'text-[#ff9aa8]'}>n</span>
                    </h1>
                    <p className="text-sm text-gray-500">
                      123 Beauty Blvd, Suite 400<br/>
                      Los Angeles, CA 90012<br/>
                      hello@fairenne.com
                    </p>
                  </div>
                  <div className="mt-6 md:mt-0 md:text-right">
                    <h2 className="text-4xl font-black text-gray-100 tracking-tighter mb-2">INVOICE</h2>
                    <p className="font-bold text-gray-900">#{order.id.slice(0, 8).toUpperCase()}</p>
                    <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                  </div>
                </div>

                {/* Addresses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Billed To</h4>
                    <p className="text-sm text-gray-800 font-medium leading-relaxed">
                      {order.address?.fullName}<br/>
                      {order.address?.addressLine1}{order.address?.addressLine2 ? `, ${order.address?.addressLine2}` : ''}<br/>
                      {order.address?.city}, {order.address?.state} {order.address?.pincode}<br/>
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Shipped To</h4>
                    <p className="text-sm text-gray-800 font-medium leading-relaxed">
                      {order.address?.fullName}<br/>
                      {order.address?.addressLine1}{order.address?.addressLine2 ? `, ${order.address?.addressLine2}` : ''}<br/>
                      {order.address?.city}, {order.address?.state} {order.address?.pincode}<br/>
                      {order.address?.phone}
                    </p>
                  </div>
                </div>

                {/* Items Table */}
                <div className="mb-10">
                  <div className="grid grid-cols-12 pb-2 border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-400">
                    <div className="col-span-6">Description</div>
                    <div className="col-span-2 text-center">Qty</div>
                    <div className="col-span-2 text-right">Price</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>
                  {order.items?.map((item: any) => (
                    <div key={item.id} className="py-4 border-b border-gray-100 grid grid-cols-12 items-center text-sm font-medium text-gray-800">
                      <div className="col-span-6">{item.name}</div>
                      <div className="col-span-2 text-center">{item.quantity}</div>
                      <div className="col-span-2 text-right">{formatPrice(item.price)}</div>
                      <div className="col-span-2 text-right">{formatPrice(item.total)}</div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="flex justify-end">
                  <div className="w-full md:w-1/2 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="font-medium text-gray-800">{formatPrice(order.totalAmount)}</span>
                    </div>
                    {order.discountAmt > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Discount</span>
                        <span className="font-medium text-green-600">-{formatPrice(order.discountAmt)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span className="font-medium text-gray-800">{formatPrice(order.shippingFee)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Tax</span>
                      <span className="font-medium text-gray-800">{formatPrice(order.taxAmount)}</span>
                    </div>
                    <div className={`flex justify-between pt-4 mt-2 border-t border-gray-200 text-lg font-bold ${isGlam ? 'text-[#2a2a2a]' : 'text-[#ff9aa8]'}`}>
                      <span>Total</span>
                      <span>{formatPrice(order.finalAmount)}</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default OrderSuccess;
