import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, ShieldCheck, Lock, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';

export default function WalletFlow({ provider, amount, onCancel, onSuccess }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  const steps = [
    "Connecting to selected wallet...",
    "Redirecting to secure wallet...",
    "Waiting for payment confirmation...",
    "Processing Payment...",
    "Receiving payment status..."
  ];

  useEffect(() => {
    if (failed) return;
    
    if (stepIndex < steps.length) {
      const timer = setTimeout(() => {
        setStepIndex(prev => prev + 1);
      }, 1500); // Wait 1.5s per step
      return () => clearTimeout(timer);
    } else {
      // Completed all steps
      setTimeout(() => {
        onSuccess({
          provider,
          transactionId: `TXN${Date.now()}`
        });
      }, 500);
    }
  }, [stepIndex, failed]);

  return (
    <div className="fixed inset-0 bg-white z-[9999] overflow-y-auto selection:bg-theme-secondary selection:text-theme-dark font-sans flex flex-col">
      {/* Wallet Header */}
      <div className="w-full bg-[#fafafa] border-b border-black/5 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={onCancel} className="p-2 hover:bg-black/5 rounded-full transition-colors disabled:opacity-30" disabled={stepIndex > 0 && stepIndex < steps.length && !failed}>
            <ArrowLeft className="w-5 h-5 text-black/70" />
          </button>
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-theme-primary" />
            <span className="font-bold text-lg">{provider} Secure Checkout</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-black/50 uppercase tracking-widest hidden md:flex">
          <Lock className="w-4 h-4 text-green-500" /> End-to-End Encrypted
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white min-h-[600px]">
        
        <AnimatePresence mode="wait">
          {!failed && stepIndex < steps.length && (
            <motion.div 
              key="processing"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="w-full max-w-sm text-center"
            >
              <div className="relative w-24 h-24 mx-auto mb-8">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute inset-0 rounded-full border-4 border-black/5 border-t-theme-primary" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Wallet className="w-8 h-8 text-theme-primary" />
                </div>
              </div>
              
              <h2 className="text-2xl font-heading font-bold mb-4">{steps[stepIndex]}</h2>
              <p className="text-black/50 text-sm mb-8">Please do not refresh or close this window.</p>
              
              <div className="bg-[#fafafa] rounded-xl p-4 border border-black/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-black/50 font-bold text-xs uppercase tracking-wider">Amount</span>
                  <span className="font-bold text-black">₹{amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black/50 font-bold text-xs uppercase tracking-wider">Wallet</span>
                  <span className="font-bold text-black">{provider}</span>
                </div>
              </div>

              {/* Dev Toggle to simulate failure */}
              <button onClick={() => setFailed(true)} className="mt-8 text-xs font-bold text-black/20 hover:text-red-500 transition-colors uppercase tracking-widest">
                Simulate Payment Failure
              </button>
            </motion.div>
          )}

          {failed && (
            <motion.div 
              key="failed"
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md text-center"
            >
               <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <AlertCircle className="w-12 h-12 text-red-500" />
              </div>
              <h2 className="text-4xl font-heading font-bold mb-4">Payment Failed</h2>
              <p className="text-black/60 text-lg mb-10 max-w-sm mx-auto">We couldn't process your payment with {provider}. Your account has not been charged.</p>
              
              <div className="flex flex-col gap-4">
                <button onClick={() => { setFailed(false); setStepIndex(0); }} className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-theme-primary transition-colors">
                  Retry Payment
                </button>
                <button onClick={onCancel} className="w-full py-4 bg-white border border-black/10 text-black font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-[#fafafa] transition-colors">
                  Choose Another Payment Method
                </button>
                <button onClick={onCancel} className="w-full py-4 text-black/50 font-bold uppercase tracking-widest text-sm hover:text-black transition-colors">
                  Return to Checkout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
