import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCurrency } from '../context/CurrencyContext';
import { CheckCircle2, Package, ArrowRight, MapPin, FileText, Download, X, Printer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OrderSuccess: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  const { currency, formatPrice } = useCurrency();
  const [showInvoice, setShowInvoice] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
    }, 1500);
  };

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
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Order #CSK-9824</p>
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
                <p className="text-sm text-gray-500 font-medium">Thursday, Nov 12 - Saturday, Nov 14</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-4">
              <MapPin className="text-gray-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Shipping Address</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  Priya Sharma<br/>
                  14 Cosmos Apartments, Linking Road<br/>
                  Mumbai, Maharashtra 400050
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
                  <button onClick={handleDownload} className={`p-2 rounded-lg transition-colors flex items-center gap-2 font-bold text-sm ${isGlam ? 'bg-[#e5b376] text-[#1a1a1a] hover:bg-white' : 'bg-[#ff9aa8] text-white hover:bg-[#ff8091]'}`}>
                    {downloading ? <span className="animate-pulse">Generating...</span> : <><Download size={16} /> Download PDF</>}
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
                    <p className="font-bold text-gray-900">#CSK-9824</p>
                    <p className="text-sm text-gray-500">Date: Nov 10, 2026</p>
                  </div>
                </div>

                {/* Addresses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Billed To</h4>
                    <p className="text-sm text-gray-800 font-medium leading-relaxed">
                      Priya Sharma<br/>
                      14 Cosmos Apartments, Linking Road<br/>
                      Mumbai, Maharashtra 400050<br/>
                      priya.sharma@example.com
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Shipped To</h4>
                    <p className="text-sm text-gray-800 font-medium leading-relaxed">
                      Priya Sharma<br/>
                      14 Cosmos Apartments, Linking Road<br/>
                      Mumbai, Maharashtra 400050<br/>
                      +91 98765 43210
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
                  <div className="py-4 border-b border-gray-100 grid grid-cols-12 items-center text-sm font-medium text-gray-800">
                    <div className="col-span-6">Glaze Hydration Serum</div>
                    <div className="col-span-2 text-center">1</div>
                    <div className="col-span-2 text-right">{formatPrice(35)}</div>
                    <div className="col-span-2 text-right">{formatPrice(35)}</div>
                  </div>
                  <div className="py-4 border-b border-gray-100 grid grid-cols-12 items-center text-sm font-medium text-gray-800">
                    <div className="col-span-6">Peach Glow Tint</div>
                    <div className="col-span-2 text-center">2</div>
                    <div className="col-span-2 text-right">{formatPrice(22)}</div>
                    <div className="col-span-2 text-right">{formatPrice(44)}</div>
                  </div>
                </div>

                {/* Totals */}
                <div className="flex justify-end">
                  <div className="w-full md:w-1/2 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="font-medium text-gray-800">{formatPrice(79)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span className="font-medium text-gray-800">{formatPrice(5)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Tax (8%)</span>
                      <span className="font-medium text-gray-800">{formatPrice(6.32)}</span>
                    </div>
                    <div className={`flex justify-between pt-4 mt-2 border-t border-gray-200 text-lg font-bold ${isGlam ? 'text-[#2a2a2a]' : 'text-[#ff9aa8]'}`}>
                      <span>Total</span>
                      <span>{formatPrice(90.32)}</span>
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
