import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle2, ChevronRight, Camera, RefreshCw, Undo2, Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useOrders } from '../../context/OrderContext';

export default function ReturnOrderModal({ isOpen, onClose, order, onReturnSuccess }) {
  const { showToast } = useToast();
  const { updateOrderStatus } = useOrders();
  
  // Steps: 1: Policy, 2: Reason, 3: Photo (Mock), 4: Action (Replace/Refund), 5: Success
  const [step, setStep] = useState(1);
  const [reason, setReason] = useState('');
  const [action, setAction] = useState('refund'); // 'refund' or 'replace'
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !order) return null;

  const reasons = [
    "Product is damaged/defective",
    "Received wrong item",
    "Item missing from package",
    "Quality not as expected",
    "Other"
  ];

  const primaryClass = "bg-[#FF0069] text-white hover:bg-pink-700";

  // Check 7-day policy (mock logic: assuming always eligible for prototype)
  const isEligible = true; 

  const handleConfirmReturn = () => {
    setIsProcessing(true);
    // Simulate API Call
    setTimeout(() => {
      setIsProcessing(false);
      
      const actionText = action === 'replace' ? 'Replacement' : 'Refund';
      
      const newTimeline = [
        { status: 'Return Requested', date: 'Today', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), desc: `Your request for ${actionText.toLowerCase()} has been received.`, done: true },
        { status: 'Request Approved', date: 'Today', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), desc: 'Return request approved.', done: true },
        { status: 'Pickup Pending', date: '-', time: '-', desc: 'Courier will contact you for pickup.', done: false },
        { status: 'Quality Check', date: '-', time: '-', desc: 'Item will be inspected once received.', done: false },
        { status: `${actionText} Processed`, date: '-', time: '-', desc: `Pending ${actionText.toLowerCase()}.`, done: false }
      ];
      updateOrderStatus(order.id, 'Return Requested', newTimeline);
      
      setStep(5); // Go to Success
      
      if (showToast) {
        setTimeout(() => showToast(`Email Sent: ${actionText} request approved.`, "success"), 500);
      }
    }, 1500);
  };

  const handleClose = () => {
    if (step === 5) {
      if (onReturnSuccess) onReturnSuccess(order.id);
    }
    setStep(1);
    setReason('');
    setAction('refund');
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <h2 className="text-xl font-heading font-medium text-black">
              {step === 5 ? 'Request Successful' : 'Return / Replace Order'}
            </h2>
            {step !== 5 && (
              <button onClick={handleClose} className="p-2 bg-gray-50 text-gray-500 rounded-full hover:bg-gray-100 transition-colors">
                <X size={20} />
              </button>
            )}
          </div>

          <div className="p-6 overflow-y-auto flex-1 font-body">
            
            {/* Step 1: Policy */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-lg font-bold text-black mb-4">Return Policy</h3>
                <div className="bg-green-50 text-green-800 p-5 rounded-xl flex gap-4 mb-6 border border-green-100">
                  <CheckCircle2 className="shrink-0 mt-1 text-green-600" size={24} />
                  <div className="space-y-2">
                    <h4 className="font-bold text-lg">Eligible for Return</h4>
                    <p className="text-sm flex justify-between items-center">
                      <span className="font-medium">Return Window</span>
                      <span className="font-bold">7 Days</span>
                    </p>
                    <p className="text-sm text-green-700">This order was delivered recently and is eligible for a free return or replacement.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Reason */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-lg font-bold text-black mb-4">Why are you returning this?</h3>
                <div className="flex flex-col gap-3">
                  {reasons.map((r, idx) => (
                    <label 
                      key={idx} 
                      onClick={() => setReason(r)}
                      className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${reason === r ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <input 
                        type="radio" 
                        name="returnReason" 
                        value={r} 
                        checked={reason === r}
                        onChange={() => setReason(r)}
                        className="hidden" 
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${reason === r ? 'border-[#FF0069]' : 'border-gray-300'}`}>
                        {reason === r && <div className="w-2.5 h-2.5 rounded-full bg-[#FF0069]" />}
                      </div>
                      <span className="font-medium text-gray-800">{r}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Photo Upload */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 text-center py-6">
                <h3 className="text-lg font-bold text-black mb-2">Upload Photo</h3>
                <p className="text-gray-500 text-sm mb-6">Please upload a photo of the product showing the issue.</p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 hover:bg-gray-50 transition-colors cursor-pointer flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center text-[#FF0069] mb-4">
                    <Camera size={28} />
                  </div>
                  <p className="font-medium text-black">Click to browse or drag & drop</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 5MB (Simulated)</p>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 text-yellow-800 rounded-xl flex items-start gap-3 text-sm text-left">
                  <AlertCircle className="shrink-0 mt-0.5 text-yellow-600" size={18} />
                  <p>For this prototype, photo upload is simulated. You can just click Continue.</p>
                </div>
              </div>
            )}

            {/* Step 4: Action Selection */}
            {step === 4 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-lg font-bold text-black mb-4">What would you like?</h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <label 
                    onClick={() => setAction('replace')}
                    className={`flex flex-col p-5 rounded-2xl border cursor-pointer transition-colors ${action === 'replace' ? 'border-[#FF0069] bg-pink-50' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${action === 'replace' ? 'border-[#FF0069]' : 'border-gray-300'}`}>
                        {action === 'replace' && <div className="w-2.5 h-2.5 rounded-full bg-[#FF0069]" />}
                      </div>
                      <span className="font-bold text-black flex items-center gap-2">
                        <RefreshCw size={18} className={action === 'replace' ? 'text-[#FF0069]' : 'text-gray-500'} />
                        Replace Product
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 ml-8">We will pick up the current item and deliver a brand new one to your address.</p>
                  </label>

                  <label 
                    onClick={() => setAction('refund')}
                    className={`flex flex-col p-5 rounded-2xl border cursor-pointer transition-colors ${action === 'refund' ? 'border-[#FF0069] bg-pink-50' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${action === 'refund' ? 'border-[#FF0069]' : 'border-gray-300'}`}>
                        {action === 'refund' && <div className="w-2.5 h-2.5 rounded-full bg-[#FF0069]" />}
                      </div>
                      <span className="font-bold text-black flex items-center gap-2">
                        <Undo2 size={18} className={action === 'refund' ? 'text-[#FF0069]' : 'text-gray-500'} />
                        Refund Order
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 ml-8">We will pick up the item and refund ₹{order.totalAmount} to your original payment method.</p>
                  </label>
                </div>
              </div>
            )}

            {/* Step 5: Success */}
            {step === 5 && (
              <div className="animate-in fade-in zoom-in-95 duration-500 text-center py-8">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="text-green-500 w-12 h-12" strokeWidth={3} />
                </div>
                <h3 className="text-2xl font-heading font-medium text-black mb-2">Request Submitted</h3>
                <p className="text-gray-600 mb-8">Your request for {action === 'replace' ? 'replacement' : 'refund'} has been successfully initiated.</p>
                
                <div className="bg-gray-50 rounded-2xl p-5 text-left border border-gray-100 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-medium">Order ID</span>
                    <span className="font-bold text-black">{order.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-medium">Action</span>
                    <span className="font-bold text-[#FF0069] capitalize">{action}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-medium">Pickup Expected</span>
                    <span className="font-medium text-black">Within 24-48 Hours</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {step !== 5 && (
            <div className="p-6 border-t border-gray-100 flex gap-4 bg-gray-50/50 shrink-0">
              
              {step === 1 && (
                <>
                  <button 
                    onClick={() => onClose()}
                    className="flex-1 px-6 py-3.5 rounded-xl font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setStep(2)}
                    className={`flex-1 px-6 py-3.5 rounded-xl font-bold transition-all ${primaryClass}`}
                  >
                    Proceed
                  </button>
                </>
              )}

              {step > 1 && step < 4 && (
                <>
                  <button 
                    onClick={() => setStep(prev => prev - 1)}
                    className="px-6 py-3.5 rounded-xl font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors w-1/3"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setStep(prev => prev + 1)}
                    disabled={step === 2 && !reason}
                    className={`flex-1 px-6 py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 transition-all ${
                      (step === 2 && !reason) ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : primaryClass
                    }`}
                  >
                    Continue
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {step === 4 && (
                <>
                  <button 
                    onClick={() => setStep(prev => prev - 1)}
                    className="flex-1 px-6 py-3.5 rounded-xl font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    disabled={isProcessing}
                  >
                    Go Back
                  </button>
                  <button 
                    onClick={handleConfirmReturn}
                    disabled={isProcessing}
                    className={`flex-1 px-6 py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 transition-all ${isProcessing ? 'bg-gray-300 text-white cursor-not-allowed' : primaryClass}`}
                  >
                    {isProcessing ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'Confirm Request'
                    )}
                  </button>
                </>
              )}
            </div>
          )}

          {step === 5 && (
            <div className="p-6 border-t border-gray-100 flex gap-4 bg-gray-50/50 shrink-0">
              <button 
                onClick={handleClose}
                className={`w-full px-6 py-3.5 rounded-xl font-bold text-sm transition-all ${primaryClass}`}
              >
                Track Request
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
