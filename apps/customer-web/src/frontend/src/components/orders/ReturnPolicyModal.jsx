import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, RefreshCw, Clock, AlertTriangle } from 'lucide-react';

export default function ReturnPolicyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white shrink-0">
            <h2 className="text-xl font-heading font-medium text-black flex items-center gap-2">
              <ShieldCheck className="text-[#FF0069]" />
              Return & Refund Policy
            </h2>
            <button onClick={onClose} className="p-2 bg-gray-50 text-gray-500 rounded-full hover:bg-gray-100 transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-1 font-body text-sm text-gray-600 space-y-6">
            
            <div className="bg-pink-50 p-4 rounded-xl border border-pink-100 text-pink-800">
              <p className="font-bold flex items-center gap-2 mb-1">
                <Clock size={16} /> 7-Day Return Window
              </p>
              <p>You can return or replace any eligible product within 7 days of delivery.</p>
            </div>

            <div>
              <h3 className="font-bold text-black mb-2 text-base">Eligibility Conditions</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>The product must be unused, unsealed, and in its original packaging.</li>
                <li>Items damaged during transit, missing items, or wrong deliveries are fully eligible for replacement or refund.</li>
                <li>Used products cannot be returned due to hygiene reasons.</li>
                <li>Free gifts or promotional items must be returned along with the original product.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-black mb-2 text-base">Refund Process</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Refunds are initiated after the returned product passes our quality inspection.</li>
                <li><strong>Prepaid Orders:</strong> Refunded to the original payment source within 3-5 business days.</li>
                <li><strong>Cash on Delivery (COD):</strong> Refunded to the bank account provided by you within 5-7 business days.</li>
                <li>Shipping charges (if any) are non-refundable unless the return is due to our error.</li>
              </ul>
            </div>

            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 text-orange-800 flex gap-3">
              <AlertTriangle className="shrink-0 mt-0.5" size={18} />
              <div>
                <p className="font-bold mb-1">Non-Returnable Items</p>
                <p>Gift cards, personalized products, and items marked as 'Final Sale' are not eligible for returns or refunds.</p>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 flex justify-end bg-gray-50/50 shrink-0">
            <button 
              onClick={onClose}
              className="px-8 py-3 rounded-xl font-bold text-white bg-[#FF0069] hover:bg-pink-700 transition-colors w-full sm:w-auto"
            >
              I Understand
            </button>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
