import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle2, ChevronRight, Banknote, ShieldAlert, Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useOrders } from '../../context/OrderContext';

export default function CancelOrderModal({ isOpen, onClose, order, onCancelSuccess }) {
  const { showToast } = useToast();
  const { updateOrderStatus } = useOrders();
  
  // Steps: 1: Warning, 2: Reason, 3: Policy, 4: Refund Summary, 5: Refund Method, 6: Final Review, 7: Success
  const [step, setStep] = useState(1);
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [bankDetails, setBankDetails] = useState({
    accountName: '',
    bankName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
    upiId: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !order) return null;

  const reasons = [
    "Ordered by mistake",
    "Found a better price",
    "Delivery is taking too long",
    "Ordered the wrong product",
    "Need to change delivery address",
    "No longer needed",
    "Other"
  ];

  const primaryClass = "bg-[#FF0069] text-white hover:bg-pink-700";

  // Refund Calculation
  const isCOD = order.paymentMethod === 'Cash On Delivery';
  const refundAmount = order.totalAmount; 
  
  // Status check for eligibility
  const canCancel = ['Order Placed', 'Order Confirmed', 'Packed', 'Ready to Ship'].includes(order.status);
  
  const validateBankDetails = () => {
    const newErrors = {};
    if (!bankDetails.accountName) newErrors.accountName = "Account Name is required";
    if (!bankDetails.bankName) newErrors.bankName = "Bank Name is required";
    if (!bankDetails.accountNumber) newErrors.accountNumber = "Account Number is required";
    if (bankDetails.accountNumber !== bankDetails.confirmAccountNumber) {
      newErrors.confirmAccountNumber = "Account numbers do not match";
    }
    if (!bankDetails.ifscCode) newErrors.ifscCode = "IFSC Code is required";
    else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(bankDetails.ifscCode)) {
      newErrors.ifscCode = "Invalid IFSC Code format";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    // Validate Step 2: Reason
    if (step === 2 && !reason) return;
    if (step === 2 && reason === 'Other' && !otherReason) return;
    
    // Step 5: Validate Bank Details if COD
    if (step === 5 && isCOD) {
      if (!validateBankDetails()) return;
    }
    
    setStep(prev => prev + 1);
  };

  const handleConfirmCancellation = () => {
    setIsProcessing(true);
    // Simulate API Call
    setTimeout(() => {
      setIsProcessing(false);
      
      const newTimeline = [
        { status: 'Cancellation Requested', date: 'Today', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), desc: 'Your cancellation request has been received.', done: true },
        { status: 'Cancellation Approved', date: 'Today', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), desc: 'Your cancellation has been approved.', done: true },
        { status: 'Refund Initiated', date: 'Today', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), desc: 'Refund initiated successfully.', done: true },
        { status: 'Refund Processing', date: '-', time: '-', desc: 'Processing refund to original payment source.', done: false },
        { status: 'Refund Completed', date: '-', time: '-', desc: 'Pending transfer.', done: false }
      ];
      updateOrderStatus(order.id, 'Cancelled', newTimeline);
      
      setStep(7); // Go to Success
      
      // Simulated Notifications
      if (showToast) {
        setTimeout(() => showToast("Email Sent: Your cancellation has been approved.", "success"), 500);
        setTimeout(() => showToast("SMS Sent: Refund initiated successfully.", "success"), 2500);
      }
    }, 1500);
  };

  const handleClose = () => {
    if (step === 7) {
      onCancelSuccess(order.id);
    }
    setStep(1);
    setReason('');
    setOtherReason('');
    setErrors({});
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
              {step === 7 ? 'Cancellation Successful' : 'Cancel Order'}
            </h2>
            {step !== 7 && (
              <button onClick={handleClose} className="p-2 bg-gray-50 text-gray-500 rounded-full hover:bg-gray-100 transition-colors">
                <X size={20} />
              </button>
            )}
          </div>

          {/* Content Scrollable Area */}
          <div className="p-6 overflow-y-auto flex-1 font-body">
            
            {/* Step 1: Warning */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 text-center py-4">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="text-red-500 w-8 h-8" />
                </div>
                <h3 className="text-2xl font-heading font-medium text-black mb-3">Cancel this order?</h3>
                <p className="text-gray-600 mb-2">Are you sure you want to cancel this order?</p>
                <p className="text-gray-500 text-sm">This action cannot be undone once processed.</p>
              </div>
            )}

            {/* Step 2: Reason */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-lg font-bold text-black mb-4">Why are you cancelling this order?</h3>
                <div className="flex flex-col gap-3">
                  {reasons.map((r, idx) => (
                    <label 
                      key={idx} 
                      onClick={() => setReason(r)}
                      className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${reason === r ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <input 
                        type="radio" 
                        name="cancelReason" 
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
                
                {reason === 'Other' && (
                  <textarea 
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    placeholder="Please specify your reason..."
                    className="w-full mt-4 p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF0069] focus:ring-1 focus:ring-[#FF0069] resize-none h-24"
                  />
                )}
              </div>
            )}

            {/* Step 3: Cancellation Policy */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-lg font-bold text-black mb-4">Cancellation Policy</h3>
                {!canCancel ? (
                  <div className="bg-red-50 text-red-800 p-4 rounded-xl flex gap-3 mb-6 border border-red-100">
                    <ShieldAlert className="shrink-0 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-bold">Cancellation Not Allowed</h4>
                      <p className="text-sm mt-1">This order has already been shipped and cannot be cancelled.</p>
                      <p className="text-sm mt-1">You can reject the delivery or request a return after delivery if eligible.</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-50 text-green-800 p-5 rounded-xl flex gap-4 mb-6 border border-green-100">
                    <CheckCircle2 className="shrink-0 mt-1 text-green-600" size={24} />
                    <div className="space-y-2">
                      <h4 className="font-bold text-lg">Cancellation Allowed</h4>
                      <p className="text-sm flex justify-between items-center">
                        <span className="font-medium">Refund Eligible</span>
                        <CheckCircle2 size={16} className="text-green-600" />
                      </p>
                      <p className="text-sm flex justify-between items-center">
                        <span className="font-medium">Estimated Refund Time</span>
                        <span className="font-bold">3-7 Business Days</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Refund Summary */}
            {step === 4 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-lg font-bold text-black mb-4">Refund Summary</h3>
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Product Price</span>
                    <span className="font-medium text-black">₹{order.subtotal}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between items-center py-2 text-green-600">
                      <span>Discount</span>
                      <span>-₹{order.discount}</span>
                    </div>
                  )}
                  {order.couponDiscount > 0 && (
                    <div className="flex justify-between items-center py-2 text-green-600">
                      <span>Coupon Discount</span>
                      <span>-₹{order.couponDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Shipping Charge</span>
                    <span className="font-medium text-black">{order.shipping === 0 || !order.shipping ? '₹0' : `₹${order.shipping}`}</span>
                  </div>
                  {order.gst > 0 && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">GST (included)</span>
                      <span className="font-medium text-black">₹{order.gst}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 my-3" />
                  <div className="flex justify-between items-center py-2">
                    <span className="font-bold text-black text-lg">Refund Amount</span>
                    <span className="font-bold text-[#FF0069] text-xl">₹{refundAmount}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 mt-4">
                    <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Payment Method</span>
                    <span className="text-sm font-bold text-black px-3 py-1 bg-white border border-gray-200 rounded-lg shadow-sm">
                      {order.paymentMethod}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Refund Method / COD Form */}
            {step === 5 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-lg font-bold text-black mb-4">Refund Destination</h3>
                
                {isCOD ? (
                  <>
                    <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex gap-3 mb-6">
                      <AlertCircle className="shrink-0 mt-0.5" size={20} />
                      <p className="text-sm">Since you paid via Cash On Delivery, please provide your bank details. Refunds transferred to incorrect accounts cannot be reversed.</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name *</label>
                        <input 
                          type="text" 
                          value={bankDetails.accountName}
                          onChange={(e) => setBankDetails({...bankDetails, accountName: e.target.value})}
                          className={`w-full p-3 rounded-xl border ${errors.accountName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#FF0069] focus:ring-[#FF0069]'} focus:outline-none focus:ring-1`}
                          placeholder="As per bank records"
                        />
                        {errors.accountName && <p className="text-xs text-red-500 mt-1">{errors.accountName}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name *</label>
                        <input 
                          type="text" 
                          value={bankDetails.bankName}
                          onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                          className={`w-full p-3 rounded-xl border ${errors.bankName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#FF0069] focus:ring-[#FF0069]'} focus:outline-none focus:ring-1`}
                          placeholder="e.g. HDFC Bank"
                        />
                        {errors.bankName && <p className="text-xs text-red-500 mt-1">{errors.bankName}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Number *</label>
                        <input 
                          type="password" 
                          value={bankDetails.accountNumber}
                          onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                          className={`w-full p-3 rounded-xl border ${errors.accountNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#FF0069] focus:ring-[#FF0069]'} focus:outline-none focus:ring-1`}
                        />
                        {errors.accountNumber && <p className="text-xs text-red-500 mt-1">{errors.accountNumber}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Account Number *</label>
                        <input 
                          type="text" 
                          value={bankDetails.confirmAccountNumber}
                          onChange={(e) => setBankDetails({...bankDetails, confirmAccountNumber: e.target.value})}
                          className={`w-full p-3 rounded-xl border ${errors.confirmAccountNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#FF0069] focus:ring-[#FF0069]'} focus:outline-none focus:ring-1`}
                        />
                        {errors.confirmAccountNumber && <p className="text-xs text-red-500 mt-1">{errors.confirmAccountNumber}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code *</label>
                        <input 
                          type="text" 
                          value={bankDetails.ifscCode}
                          onChange={(e) => setBankDetails({...bankDetails, ifscCode: e.target.value.toUpperCase()})}
                          className={`w-full p-3 rounded-xl border ${errors.ifscCode ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#FF0069] focus:ring-[#FF0069]'} focus:outline-none focus:ring-1`}
                          placeholder="e.g. HDFC0001234"
                        />
                        {errors.ifscCode && <p className="text-xs text-red-500 mt-1">{errors.ifscCode}</p>}
                      </div>

                      <div className="pt-4 border-t border-gray-100">
                        <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID (Optional Alternative)</label>
                        <input 
                          type="text" 
                          value={bankDetails.upiId}
                          onChange={(e) => setBankDetails({...bankDetails, upiId: e.target.value})}
                          className={`w-full p-3 rounded-xl border ${errors.upiId ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#FF0069] focus:ring-[#FF0069]'} focus:outline-none focus:ring-1`}
                          placeholder="e.g. name@upi"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 text-center">
                    <Banknote className="mx-auto text-gray-400 mb-3" size={32} />
                    <h4 className="font-bold text-black mb-2">Original Payment Method</h4>
                    <p className="text-sm text-gray-600 mb-4">Refund will automatically go back to your original source.</p>
                    <div className="bg-white p-4 rounded-xl border border-gray-200 inline-block shadow-sm">
                      <p className="font-bold text-theme-primary text-lg">{order.paymentDetails || order.paymentMethod}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 6: Final Review */}
            {step === 6 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xl font-heading font-medium text-black mb-6 text-center">Final Review</h3>
                
                <div className="bg-gray-50 rounded-2xl p-5 text-left border border-gray-100 space-y-4">
                  <div className="flex justify-between items-start border-b border-gray-200 pb-4">
                    <span className="text-sm text-gray-500 uppercase tracking-widest font-bold">Order ID</span>
                    <span className="font-bold text-black">{order.id}</span>
                  </div>
                  <div className="flex justify-between items-start border-b border-gray-200 pb-4">
                    <span className="text-sm text-gray-500 uppercase tracking-widest font-bold">Reason</span>
                    <span className="font-medium text-black text-right max-w-[60%]">{reason === 'Other' ? otherReason : reason}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <span className="text-sm text-gray-500 uppercase tracking-widest font-bold">Refund Amount</span>
                    <span className="font-bold text-[#FF0069] text-xl">₹{refundAmount}</span>
                  </div>
                  <div className="flex justify-between items-start border-b border-gray-200 pb-4">
                    <span className="text-sm text-gray-500 uppercase tracking-widest font-bold">Refund Method</span>
                    <span className="font-medium text-black text-right max-w-[60%]">
                      {isCOD ? `${bankDetails.bankName} ending in ${bankDetails.accountNumber.slice(-4)}` : (order.paymentDetails || order.paymentMethod)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-gray-500 uppercase tracking-widest font-bold">Estimated Refund Date</span>
                    <span className="font-bold text-black">3-7 Business Days</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: Success */}
            {step === 7 && (
              <div className="animate-in fade-in zoom-in-95 duration-500 text-center py-8">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="text-green-500 w-12 h-12" strokeWidth={3} />
                </div>
                <h3 className="text-2xl font-heading font-medium text-black mb-2">✔ Order Cancelled Successfully</h3>
                
                <div className="bg-gray-50 rounded-2xl p-5 text-left border border-gray-100 mb-8 mt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-medium">Order ID</span>
                    <span className="font-bold text-black">{order.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-medium">Refund Amount</span>
                    <span className="font-bold text-[#FF0069] text-xl">₹{refundAmount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-medium">Refund Method</span>
                    <span className="font-medium text-black text-right max-w-[60%] truncate">
                      {isCOD ? `${bankDetails.bankName} (*${bankDetails.accountNumber.slice(-4)})` : (order.paymentDetails || order.paymentMethod)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-medium">Reference Number</span>
                    <span className="font-mono text-sm font-bold text-black">REF-{Math.floor(Math.random() * 90000000) + 10000000}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-medium">Expected Refund Date</span>
                    <span className="font-medium text-black">3-7 Business Days</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {step !== 7 && (
            <div className="p-6 border-t border-gray-100 flex gap-4 bg-gray-50/50 shrink-0">
              
              {/* Step 1 Actions */}
              {step === 1 && (
                <>
                  <button 
                    onClick={() => onClose()}
                    className="flex-1 px-6 py-3.5 rounded-xl font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    Keep Order
                  </button>
                  <button 
                    onClick={() => setStep(2)}
                    className={`flex-1 px-6 py-3.5 rounded-xl font-bold transition-all ${primaryClass}`}
                  >
                    Continue Cancellation
                  </button>
                </>
              )}

              {/* Step 2, 3, 4, 5 Actions */}
              {step > 1 && step < 6 && (
                <>
                  <button 
                    onClick={() => setStep(prev => prev - 1)}
                    className="px-6 py-3.5 rounded-xl font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors w-1/3"
                  >
                    Back
                  </button>
                  
                  {step === 3 && !canCancel ? (
                    <button 
                      className={`flex-1 px-6 py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 bg-gray-200 text-gray-400 cursor-not-allowed`}
                      disabled
                    >
                      Continue
                      <ChevronRight size={18} />
                    </button>
                  ) : (
                    <button 
                      onClick={handleNext}
                      disabled={
                        (step === 2 && !reason) || 
                        (step === 2 && reason === 'Other' && !otherReason)
                      }
                      className={`flex-1 px-6 py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 transition-all ${
                        ((step === 2 && !reason) || (step === 2 && reason === 'Other' && !otherReason)) 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : primaryClass
                      }`}
                    >
                      {step === 5 && isCOD ? 'Verify Details & Continue' : 'Continue'}
                      <ChevronRight size={18} />
                    </button>
                  )}
                </>
              )}

              {/* Step 6 Actions (Final Confirmation) */}
              {step === 6 && (
                <>
                  <button 
                    onClick={() => setStep(prev => prev - 1)}
                    className="flex-1 px-6 py-3.5 rounded-xl font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    disabled={isProcessing}
                  >
                    Go Back
                  </button>
                  <button 
                    onClick={handleConfirmCancellation}
                    disabled={isProcessing}
                    className={`flex-1 px-6 py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 transition-all ${isProcessing ? 'bg-red-300 text-white cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600 shadow-[0_10px_20px_rgba(239,68,68,0.2)]'}`}
                  >
                    {isProcessing ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'Confirm Cancellation'
                    )}
                  </button>
                </>
              )}
            </div>
          )}

          {/* Success Footer */}
          {step === 7 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex gap-4 shrink-0">
              <button 
                onClick={handleClose}
                className="flex-1 px-6 py-3.5 rounded-xl font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
              >
                Back to My Orders
              </button>
              <button 
                onClick={handleClose} // Realistically this would navigate to tracking, but handling in parent via state
                className={`flex-1 px-6 py-3.5 rounded-xl font-bold text-sm transition-all ${primaryClass}`}
              >
                Track Refund
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
