import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ChevronRight, Camera, RefreshCw, Undo2, MapPin, Calendar, Clock, CreditCard, Building } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useOrders } from '../../context/OrderContext';

export default function ReturnReplaceModal({ isOpen, onClose, order, mode }) {
  const { showToast } = useToast();
  const { updateOrderStatus } = useOrders();
  
  // mode is either 'return' or 'replace'
  const isReturn = mode === 'return';

  const [step, setStep] = useState(1);
  const [reason, setReason] = useState('');
  const [condition, setCondition] = useState('');
  const [images, setImages] = useState([]);
  const [addressChoice, setAddressChoice] = useState('saved');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  
  // Bank Details for COD Returns
  const [bankDetails, setBankDetails] = useState({
    name: '', bankName: '', accountNo: '', confirmAccountNo: '', ifsc: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !order) return null;

  const returnReasons = [
    "Damaged Product", "Wrong Product Received", "Missing Item", 
    "Expired Product", "Product Doesn't Suit My Skin", "Quality Issue", 
    "Changed My Mind", "Other"
  ];

  const replaceReasons = [
    "Wrong Product Received", "Damaged Product", "Leaking Bottle", 
    "Broken Packaging", "Missing Item", "Defective Product", "Other"
  ];

  const conditions = [
    "Unopened", "Opened but unused", "Slightly used", "Damaged during delivery"
  ];

  const dates = ["Tomorrow", "In 2 Days", "In 3 Days"];
  const times = ["Morning (9 AM - 12 PM)", "Afternoon (12 PM - 4 PM)", "Evening (4 PM - 8 PM)"];

  const primaryClass = "bg-[#FF0069] text-white hover:bg-pink-700";

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      
      const newTimeline = isReturn ? [
        { status: 'Return Requested', date: 'Today', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), desc: 'Your return request has been submitted.', done: true },
        { status: 'Pickup Scheduled', date: pickupDate, time: pickupTime.split(' ')[0], desc: 'Courier will arrive for pickup.', done: false },
        { status: 'Pickup Completed', date: '-', time: '-', desc: 'Item collected by courier.', done: false },
        { status: 'Inspection', date: '-', time: '-', desc: 'Quality check at warehouse.', done: false },
        { status: 'Return Approved', date: '-', time: '-', desc: 'Return meets policy requirements.', done: false },
        { status: 'Refund Initiated', date: '-', time: '-', desc: 'Refund sent to bank.', done: false },
        { status: 'Refund Processing', date: '-', time: '-', desc: 'Processing by payment gateway.', done: false },
        { status: 'Refund Completed', date: '-', time: '-', desc: `₹${order.totalAmount} refunded successfully.`, done: false }
      ] : [
        { status: 'Replacement Requested', date: 'Today', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), desc: 'Your replacement request has been submitted.', done: true },
        { status: 'Pickup Scheduled', date: pickupDate, time: pickupTime.split(' ')[0], desc: 'Courier will arrive for pickup.', done: false },
        { status: 'Old Product Picked Up', date: '-', time: '-', desc: 'Item collected by courier.', done: false },
        { status: 'Quality Inspection', date: '-', time: '-', desc: 'Checked at warehouse.', done: false },
        { status: 'Replacement Approved', date: '-', time: '-', desc: 'Approved for replacement.', done: false },
        { status: 'Packed', date: '-', time: '-', desc: 'New item packed.', done: false },
        { status: 'Shipped', date: '-', time: '-', desc: 'Replacement dispatched.', done: false },
        { status: 'Out For Delivery', date: '-', time: '-', desc: 'Out for delivery.', done: false },
        { status: 'Delivered', date: '-', time: '-', desc: 'Replacement delivered.', done: false }
      ];

      updateOrderStatus(order.id, isReturn ? 'Return Requested' : 'Replacement Requested', newTimeline);
      setStep(isReturn ? 10 : 7); // Success Step
      
      if (showToast) {
        showToast(isReturn ? 'Return Request Submitted' : 'Replacement Request Submitted', 'success');
      }
    }, 1500);
  };

  const handleClose = () => {
    setStep(1); setReason(''); setCondition(''); setImages([]);
    setAddressChoice('saved'); setPickupDate(''); setPickupTime('');
    setBankDetails({name: '', bankName: '', accountNo: '', confirmAccountNo: '', ifsc: ''});
    onClose();
  };

  const handleImageUpload = () => {
    if (images.length >= 5) return;
    setImages([...images, `MockImage_${images.length + 1}.jpg`]);
  };

  // Dynamic step logic
  const renderStep = () => {
    // ----------------------------------------------------
    // STEP 1: CONFIRMATION
    // ----------------------------------------------------
    if (step === 1) {
      return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="text-xl font-bold text-black mb-4">
            {isReturn ? 'Return this product?' : 'Replace this product?'}
          </h3>
          <p className="text-gray-600 mb-8">
            Are you sure you want to {isReturn ? 'return' : 'replace'} this product?
          </p>
          <div className="flex gap-4">
            <button onClick={handleClose} className="flex-1 px-6 py-3.5 rounded-xl font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
              Keep Product
            </button>
            <button onClick={() => setStep(2)} className={`flex-1 px-6 py-3.5 rounded-xl font-bold transition-all ${primaryClass}`}>
              Continue {isReturn ? 'Return' : 'Replacement'}
            </button>
          </div>
        </div>
      );
    }

    // ----------------------------------------------------
    // STEP 2: REASON
    // ----------------------------------------------------
    if (step === 2) {
      const reasons = isReturn ? returnReasons : replaceReasons;
      return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="text-lg font-bold text-black mb-4">Reason for {isReturn ? 'Return' : 'Replacement'}</h3>
          <div className="flex flex-col gap-3">
            {reasons.map((r, idx) => (
              <label 
                key={idx} 
                onClick={() => setReason(r)}
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${reason === r ? 'border-[#FF0069] bg-pink-50' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${reason === r ? 'border-[#FF0069]' : 'border-gray-300'}`}>
                  {reason === r && <div className="w-2.5 h-2.5 rounded-full bg-[#FF0069]" />}
                </div>
                <span className="font-medium text-gray-800">{r}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }

    // ----------------------------------------------------
    // STEP 3: PRODUCT CONDITION (ONLY RETURN) OR UPLOAD (REPLACE)
    // ----------------------------------------------------
    if (step === 3 && isReturn) {
      return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="text-lg font-bold text-black mb-4">What is the condition of the product?</h3>
          <div className="flex flex-col gap-3">
            {conditions.map((c, idx) => (
              <label 
                key={idx} 
                onClick={() => setCondition(c)}
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${condition === c ? 'border-[#FF0069] bg-pink-50' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${condition === c ? 'border-[#FF0069]' : 'border-gray-300'}`}>
                  {condition === c && <div className="w-2.5 h-2.5 rounded-full bg-[#FF0069]" />}
                </div>
                <span className="font-medium text-gray-800">{c}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }

    // Step 3 (Replace) or Step 4 (Return) -> IMAGE UPLOAD
    if ((isReturn && step === 4) || (!isReturn && step === 3)) {
      return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="text-lg font-bold text-black mb-2">Upload Images</h3>
          <p className="text-gray-500 text-sm mb-6">Upload up to 5 images showing the issue (JPG, PNG, WEBP).</p>
          
          <div onClick={handleImageUpload} className="border-2 border-dashed border-gray-300 rounded-2xl p-10 hover:bg-gray-50 transition-colors cursor-pointer flex flex-col items-center justify-center mb-6">
            <Camera size={28} className="text-[#FF0069] mb-4" />
            <p className="font-medium text-black">Click to upload (Dummy)</p>
          </div>
          
          {images.length > 0 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <div key={i} className="relative w-20 h-20 rounded-xl bg-gray-100 border border-gray-200 shrink-0 flex items-center justify-center text-xs text-gray-500">
                  Img {i+1}
                  <button onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Step 5 (Return) or Step 4 (Replace) -> ADDRESS
    if ((isReturn && step === 5) || (!isReturn && step === 4)) {
      return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="text-lg font-bold text-black mb-4">Pickup Address</h3>
          
          <label onClick={() => setAddressChoice('saved')} className={`flex items-start gap-4 p-5 rounded-2xl border mb-4 cursor-pointer transition-colors ${addressChoice === 'saved' ? 'border-[#FF0069] bg-pink-50' : 'border-gray-200'}`}>
            <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${addressChoice === 'saved' ? 'border-[#FF0069]' : 'border-gray-300'}`}>
              {addressChoice === 'saved' && <div className="w-2.5 h-2.5 rounded-full bg-[#FF0069]" />}
            </div>
            <div>
              <p className="font-bold text-black mb-1 flex items-center gap-2"><MapPin size={16} /> Use Delivery Address</p>
              <p className="text-sm text-gray-600">{order.shippingAddress || 'Your Saved Address'}</p>
            </div>
          </label>

          <label onClick={() => setAddressChoice('new')} className={`flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-colors ${addressChoice === 'new' ? 'border-[#FF0069] bg-pink-50' : 'border-gray-200'}`}>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${addressChoice === 'new' ? 'border-[#FF0069]' : 'border-gray-300'}`}>
              {addressChoice === 'new' && <div className="w-2.5 h-2.5 rounded-full bg-[#FF0069]" />}
            </div>
            <p className="font-bold text-black">Add New Pickup Address</p>
          </label>

          {addressChoice === 'new' && (
            <div className="mt-4 p-4 border border-gray-200 rounded-2xl grid grid-cols-2 gap-4 bg-gray-50">
              <input type="text" placeholder="Name" className="col-span-2 p-3 rounded-xl border border-gray-200 focus:border-[#FF0069] outline-none" />
              <input type="text" placeholder="Mobile Number" className="col-span-2 p-3 rounded-xl border border-gray-200 focus:border-[#FF0069] outline-none" />
              <input type="text" placeholder="House No." className="p-3 rounded-xl border border-gray-200 focus:border-[#FF0069] outline-none" />
              <input type="text" placeholder="Street" className="p-3 rounded-xl border border-gray-200 focus:border-[#FF0069] outline-none" />
              <input type="text" placeholder="PIN Code" className="col-span-2 p-3 rounded-xl border border-gray-200 focus:border-[#FF0069] outline-none" />
            </div>
          )}
        </div>
      );
    }

    // Step 6 (Return) or Step 5 (Replace) -> SLOT
    if ((isReturn && step === 6) || (!isReturn && step === 5)) {
      return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="text-lg font-bold text-black mb-4">Pickup Slot</h3>
          
          <p className="font-medium text-gray-700 mb-2 flex items-center gap-2"><Calendar size={18} /> Select Date</p>
          <div className="flex gap-3 overflow-x-auto pb-4 mb-4">
            {dates.map((d, i) => (
              <button key={i} onClick={() => setPickupDate(d)} className={`px-5 py-3 rounded-xl font-bold shrink-0 border transition-colors ${pickupDate === d ? 'border-[#FF0069] bg-[#FF0069] text-white' : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'}`}>
                {d}
              </button>
            ))}
          </div>

          <p className="font-medium text-gray-700 mb-2 flex items-center gap-2"><Clock size={18} /> Select Time</p>
          <div className="flex flex-col gap-3">
            {times.map((t, i) => (
              <label key={i} onClick={() => setPickupTime(t)} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${pickupTime === t ? 'border-[#FF0069] bg-pink-50' : 'border-gray-200 hover:border-gray-50'}`}>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${pickupTime === t ? 'border-[#FF0069]' : 'border-gray-300'}`}>
                  {pickupTime === t && <div className="w-2.5 h-2.5 rounded-full bg-[#FF0069]" />}
                </div>
                <span className="font-medium text-gray-800">{t}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }

    // Step 7 (Return) -> REFUND SUMMARY
    if (isReturn && step === 7) {
      return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="text-lg font-bold text-black mb-4">Refund Summary</h3>
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-3">
            <div className="flex justify-between text-gray-600"><span>Product Price</span> <span>₹{order.subtotal}</span></div>
            {order.discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span> <span>-₹{order.discount}</span></div>}
            <div className="flex justify-between text-gray-600"><span>Shipping</span> <span>{order.shipping === 0 ? 'Free' : '₹' + order.shipping}</span></div>
            <div className="flex justify-between text-gray-600"><span>GST</span> <span>₹{order.gst}</span></div>
            <div className="flex justify-between font-bold text-lg text-black pt-3 border-t border-gray-200 mt-2">
              <span>Refund Amount</span> <span className="text-[#FF0069]">₹{order.totalAmount}</span>
            </div>
          </div>
        </div>
      );
    }

    // Step 8 (Return) -> REFUND METHOD
    if (isReturn && step === 8) {
      const isCOD = order.paymentMethod === 'Cash On Delivery';
      return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="text-lg font-bold text-black mb-4">Refund Method</h3>
          {!isCOD ? (
            <div className="bg-green-50 p-5 rounded-2xl border border-green-100 flex gap-4">
              <CreditCard className="text-green-600 shrink-0" />
              <div>
                <p className="font-bold text-green-800">Refund to Original Source</p>
                <p className="text-sm text-green-700 mt-1">Amount will be credited back to your original payment method in 3-5 working days.</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3 mb-6">
                <Building className="text-blue-600 shrink-0" />
                <p className="text-sm text-blue-800">Please provide your bank details for the COD refund transfer.</p>
              </div>
              <div className="space-y-4">
                <input value={bankDetails.name} onChange={e=>setBankDetails({...bankDetails, name: e.target.value})} type="text" placeholder="Account Holder Name *" className="w-full p-3.5 rounded-xl border border-gray-200 focus:border-[#FF0069] outline-none" />
                <input value={bankDetails.bankName} onChange={e=>setBankDetails({...bankDetails, bankName: e.target.value})} type="text" placeholder="Bank Name *" className="w-full p-3.5 rounded-xl border border-gray-200 focus:border-[#FF0069] outline-none" />
                <input value={bankDetails.accountNo} onChange={e=>setBankDetails({...bankDetails, accountNo: e.target.value})} type="text" placeholder="Account Number *" className="w-full p-3.5 rounded-xl border border-gray-200 focus:border-[#FF0069] outline-none" />
                <input value={bankDetails.confirmAccountNo} onChange={e=>setBankDetails({...bankDetails, confirmAccountNo: e.target.value})} type="password" placeholder="Confirm Account Number *" className="w-full p-3.5 rounded-xl border border-gray-200 focus:border-[#FF0069] outline-none" />
                <input value={bankDetails.ifsc} onChange={e=>setBankDetails({...bankDetails, ifsc: e.target.value})} type="text" placeholder="IFSC Code *" className="w-full p-3.5 rounded-xl border border-gray-200 focus:border-[#FF0069] outline-none uppercase" />
              </div>
            </div>
          )}
        </div>
      );
    }

    // Step 9 (Return) or Step 6 (Replace) -> REVIEW
    if ((isReturn && step === 9) || (!isReturn && step === 6)) {
      return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="text-lg font-bold text-black mb-4">Review Request</h3>
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Reason</span>
              <span className="font-bold text-black">{reason}</span>
            </div>
            {isReturn && (
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Condition</span>
                <span className="font-bold text-black">{condition}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Pickup</span>
              <span className="font-bold text-black text-right">{pickupDate}<br/>{pickupTime}</span>
            </div>
            {isReturn && (
              <div className="flex justify-between pt-3 border-t border-gray-200">
                <span className="text-gray-500 font-medium">Refund Amount</span>
                <span className="font-bold text-[#FF0069] text-base">₹{order.totalAmount}</span>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Step 10 (Return) or Step 7 (Replace) -> SUCCESS
    if ((isReturn && step === 10) || (!isReturn && step === 7)) {
      return (
        <div className="animate-in fade-in zoom-in-95 duration-500 text-center py-8">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-green-500 w-12 h-12" strokeWidth={3} />
          </div>
          <h3 className="text-2xl font-heading font-medium text-black mb-2">Request Submitted Successfully</h3>
          <p className="text-gray-600 mb-8">
            Your {isReturn ? 'return' : 'replacement'} request has been initiated.
          </p>
          <div className="bg-gray-50 rounded-2xl p-5 text-left border border-gray-100 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 font-medium">Reference ID</span>
              <span className="font-bold text-black font-mono">REQ-{Math.floor(Math.random()*900000)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 font-medium">Pickup Date</span>
              <span className="font-bold text-black">{pickupDate}</span>
            </div>
            {isReturn && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 font-medium">Refund Amount</span>
                <span className="font-bold text-[#FF0069]">₹{order.totalAmount}</span>
              </div>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  // Check valid step to enable 'Continue' button
  let canContinue = false;
  if (step === 2 && reason) canContinue = true;
  if (step === 3 && isReturn && condition) canContinue = true;
  if (step === 4 && isReturn) canContinue = true; // Image upload optional/dummy
  if (step === 3 && !isReturn) canContinue = true; // Image upload
  if (step === 5 && isReturn) canContinue = true; // Address
  if (step === 4 && !isReturn) canContinue = true; // Address
  if (step === 6 && isReturn && pickupDate && pickupTime) canContinue = true; // Slot
  if (step === 5 && !isReturn && pickupDate && pickupTime) canContinue = true; // Slot
  if (step === 7 && isReturn) canContinue = true; // Summary
  if (step === 8 && isReturn) {
    if (order.paymentMethod === 'Cash On Delivery') {
      if (
        bankDetails.name && 
        bankDetails.bankName && 
        bankDetails.accountNo && 
        bankDetails.accountNo === bankDetails.confirmAccountNo && 
        /^[A-Z]{4}0[A-Z0-9]{6}$/i.test(bankDetails.ifsc)
      ) {
        canContinue = true;
      }
    } else {
      canContinue = true;
    }
  }
  if ((step === 9 && isReturn) || (step === 6 && !isReturn)) canContinue = true; // Review

  const finalStepNum = isReturn ? 10 : 7;
  const reviewStepNum = isReturn ? 9 : 6;

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
          <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white shrink-0">
            <h2 className="text-xl font-heading font-medium text-black">
              {step === finalStepNum ? 'Request Successful' : (isReturn ? 'Return Product' : 'Replace Product')}
            </h2>
            {step !== finalStepNum && (
              <button onClick={handleClose} className="p-2 bg-gray-50 text-gray-500 rounded-full hover:bg-gray-100 transition-colors">
                <X size={20} />
              </button>
            )}
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-1 font-body">
            {renderStep()}
          </div>

          {/* Footer Navigation */}
          {step > 1 && step < finalStepNum && (
            <div className="p-6 border-t border-gray-100 flex gap-4 bg-gray-50/50 shrink-0">
              <button 
                onClick={() => setStep(prev => prev - 1)}
                className="px-6 py-3.5 rounded-xl font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors w-1/3"
                disabled={isProcessing}
              >
                Back
              </button>
              
              {step === reviewStepNum ? (
                <button 
                  onClick={handleConfirm}
                  disabled={isProcessing}
                  className={`flex-1 px-6 py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 transition-all ${isProcessing ? 'bg-gray-300 cursor-not-allowed' : primaryClass}`}
                >
                  {isProcessing ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Submit Request'}
                </button>
              ) : (
                <button 
                  onClick={() => setStep(prev => prev + 1)}
                  disabled={!canContinue}
                  className={`flex-1 px-6 py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 transition-all ${
                    !canContinue ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : primaryClass
                  }`}
                >
                  Continue <ChevronRight size={18} />
                </button>
              )}
            </div>
          )}

          {step === finalStepNum && (
            <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4 bg-gray-50/50 shrink-0">
              <button onClick={handleClose} className="flex-1 px-6 py-3.5 rounded-xl font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
                Back to My Orders
              </button>
              <button onClick={handleClose} className={`flex-1 px-6 py-3.5 rounded-xl font-bold transition-all ${primaryClass}`}>
                Track Request
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
