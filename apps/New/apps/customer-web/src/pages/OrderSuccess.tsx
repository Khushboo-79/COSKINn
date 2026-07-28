import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { CheckCircle2, Package, ArrowRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderSuccess: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

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
                  Jane Doe<br/>
                  123 Beauty Lane, Apt 4B<br/>
                  New York, NY 10001
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link 
              to="/profile"
              className={`flex-1 py-4 px-6 rounded-xl font-bold text-center transition-all ${
                isGlam ? 'bg-[#2a2a2a] text-[#e5b376] hover:bg-black' : 'bg-[#ff9aa8] text-white hover:bg-[#ff8091] shadow-lg shadow-[#ff9aa8]/30'
              }`}
            >
              Track Order
            </Link>
            <Link 
              to="/"
              className="flex-1 py-4 px-6 rounded-xl font-bold text-center text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Return Home
            </Link>
          </div>

        </motion.div>

      </div>
    </div>
  );
};

export default OrderSuccess;
