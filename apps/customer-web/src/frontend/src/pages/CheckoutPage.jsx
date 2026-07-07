import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, CheckCircle, Package, ArrowLeft, ShieldCheck, Lock, QrCode, Smartphone, RefreshCw, AlertCircle, Download, Truck, Building2, Wallet } from 'lucide-react';
import Footer from '../components/common/Footer';

export default function CheckoutPage() {
  const { cart, cartSubtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderDetails, setOrderDetails] = useState(null);
  
  const [address, setAddress] = useState({
    name: user?.name || '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    mobile: user?.mobile || ''
  });

  const [paymentMethod, setPaymentMethod] = useState('upi');
  
  // New Payment States
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle | processing | verifying | failed | success
  const [shouldFail, setShouldFail] = useState(false); // Toggle for testing failure
  
  // Card Details State
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  
  // Net Banking State
  const [selectedBank, setSelectedBank] = useState('');

  useEffect(() => {
    if (cart.length === 0 && paymentStatus !== 'success') {
      navigate('/new-arrivals');
    }
  }, [cart, paymentStatus, navigate]);

  const SHIPPING_COST = 0;
  const TAX = cartSubtotal * 0.18;
  const TOTAL = cartSubtotal + SHIPPING_COST + TAX;

  const handleNextStep = () => setCurrentStep(prev => prev + 1);
  
  const processPayment = () => {
    // If COD, instantly succeed
    if (paymentMethod === 'cod') {
      completeOrder();
      return;
    }

    setPaymentStatus('processing');
    
    // Simulate Processing Delay
    setTimeout(() => {
      setPaymentStatus('verifying');
      
      // Simulate Verification Delay
      setTimeout(() => {
        if (shouldFail) {
          setPaymentStatus('failed');
        } else {
          completeOrder();
        }
      }, 2000);
    }, 2500);
  };

  const completeOrder = () => {
    setOrderDetails({
      orderId: `ORD-${Math.floor(Math.random() * 900000) + 100000}`,
      transactionId: `TXN${Date.now()}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      amount: TOTAL.toFixed(2),
      method: paymentMethod.toUpperCase(),
      delivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })
    });
    setPaymentStatus('success');
    clearCart();
    setCurrentStep(4);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-12 font-sans selection:bg-theme-secondary selection:text-theme-dark relative">
      
      {/* Full Screen Loaders */}
      <AnimatePresence>
        {(paymentStatus === 'processing' || paymentStatus === 'verifying') && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/90 backdrop-blur-md z-[200] flex flex-col items-center justify-center"
          >
            <div className="relative w-24 h-24 mb-8">
              <motion.div 
                animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute inset-0 rounded-full border-4 border-black/10 border-t-theme-primary"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-theme-primary" />
              </div>
            </div>
            
            <h2 className="font-heading font-bold text-3xl mb-3 text-black">
              {paymentStatus === 'processing' ? 'Processing Payment...' : 'Verifying Payment...'}
            </h2>
            <p className="text-black/50 font-medium">Please do not close this window or press back.</p>
            
            <div className="mt-12 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black/40">
              <Lock className="w-4 h-4" /> 256-bit Secure Connection
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-6">
        
        {currentStep < 4 && paymentStatus !== 'failed' && (
          <div className="mb-10 flex justify-between items-end">
            <div>
              <Link to="/new-arrivals" className="inline-flex items-center gap-2 text-black/60 hover:text-black font-medium text-sm transition-colors mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Shopping
              </Link>
              <h1 className="text-4xl font-heading font-bold">Checkout</h1>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-black/10 text-xs font-bold text-black/60 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-green-500" /> 100% Secure
            </div>
          </div>
        )}

        {paymentStatus === 'failed' ? (
          <div className="bg-white rounded-[3rem] p-12 md:p-24 text-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/5 flex flex-col items-center">
             <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
              className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-8"
            >
              <AlertCircle className="w-12 h-12 text-red-500" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Payment Failed</h2>
            <p className="text-black/60 text-lg mb-10 max-w-md mx-auto">We couldn't process your payment. Your account has not been charged. Please try again or use a different payment method.</p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => { setPaymentStatus('idle'); setShouldFail(false); }}
                className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-theme-primary transition-colors shadow-xl"
              >
                Retry Payment
              </button>
            </div>
          </div>
        ) : currentStep === 4 ? (
          <div className="bg-white rounded-[3rem] p-12 lg:p-20 text-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/5 flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-8"
            >
              <CheckCircle className="w-12 h-12 text-green-500" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Payment Successful!</h2>
            <p className="text-black/60 text-lg mb-10">Thank you for your purchase, {user?.name.split(' ')[0] || 'Beautiful'}.</p>
            
            <div className="w-full max-w-2xl bg-[#fafafa] rounded-3xl p-8 mb-10 text-left border border-black/5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-xs text-black/50 font-bold uppercase tracking-wider mb-1">Order ID</p>
                  <p className="font-bold text-black">{orderDetails?.orderId}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50 font-bold uppercase tracking-wider mb-1">Amount</p>
                  <p className="font-bold text-black">₹{orderDetails?.amount}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50 font-bold uppercase tracking-wider mb-1">Method</p>
                  <p className="font-bold text-black">{orderDetails?.method}</p>
                </div>
                <div>
                  <p className="text-xs text-black/50 font-bold uppercase tracking-wider mb-1">Est. Delivery</p>
                  <p className="font-bold text-black">{orderDetails?.delivery}</p>
                </div>
                <div className="col-span-2 md:col-span-4 mt-2">
                  <p className="text-xs text-black/50 font-bold uppercase tracking-wider mb-1">Transaction ID</p>
                  <p className="font-bold text-black text-sm">{orderDetails?.transactionId}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/account?tab=orders" className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-theme-primary transition-colors shadow-xl flex items-center gap-2">
                <Truck className="w-4 h-4" /> Track Order
              </Link>
              <button className="px-8 py-4 bg-white border border-black/10 text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-black/5 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" /> Invoice
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Checkout Area */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* Step 1: Delivery Address */}
              <div className={`bg-white rounded-3xl p-8 shadow-sm border ${currentStep === 1 ? 'border-theme-primary shadow-[0_10px_30px_rgba(255,0,105,0.05)]' : 'border-black/5 opacity-70'}`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading font-bold text-xl flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep >= 1 ? 'bg-theme-primary text-white' : 'bg-black/10 text-black/50'}`}>1</div>
                    Delivery Address
                  </h3>
                  {currentStep > 1 && (
                    <button onClick={() => setCurrentStep(1)} className="text-theme-primary font-bold text-sm hover:underline">Edit</button>
                  )}
                </div>

                <AnimatePresence>
                  {currentStep === 1 && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <input type="text" placeholder="Full Name" value={address.name} onChange={(e) => setAddress({...address, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-theme-primary" />
                        <input type="tel" placeholder="Mobile Number" value={address.mobile} onChange={(e) => setAddress({...address, mobile: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-theme-primary" />
                        <input type="text" placeholder="Street Address" value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-theme-primary md:col-span-2" />
                        <input type="text" placeholder="City" value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-theme-primary" />
                        <div className="flex gap-4">
                          <input type="text" placeholder="State" value={address.state} onChange={(e) => setAddress({...address, state: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-theme-primary" />
                          <input type="text" placeholder="PIN Code" value={address.pincode} onChange={(e) => setAddress({...address, pincode: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-theme-primary" />
                        </div>
                      </div>
                      <button 
                        disabled={!address.name || !address.street || !address.city || !address.pincode}
                        onClick={handleNextStep}
                        className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-theme-primary disabled:opacity-50 disabled:hover:bg-black transition-colors"
                      >
                        Deliver Here
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
                {currentStep > 1 && (
                  <div className="ml-11 text-black/70 text-sm">
                    <p className="font-bold text-black">{address.name}</p>
                    <p>{address.street}, {address.city}, {address.state} - {address.pincode}</p>
                    <p>{address.mobile}</p>
                  </div>
                )}
              </div>

              {/* Step 2: Order Summary */}
              <div className={`bg-white rounded-3xl p-8 shadow-sm border ${currentStep === 2 ? 'border-theme-primary shadow-[0_10px_30px_rgba(255,0,105,0.05)]' : 'border-black/5 opacity-70'}`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading font-bold text-xl flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep >= 2 ? 'bg-theme-primary text-white' : 'bg-black/10 text-black/50'}`}>2</div>
                    Order Summary
                  </h3>
                  {currentStep > 2 && (
                    <button onClick={() => setCurrentStep(2)} className="text-theme-primary font-bold text-sm hover:underline">Edit</button>
                  )}
                </div>

                <AnimatePresence>
                  {currentStep === 2 && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="flex flex-col gap-4 mb-6">
                        {cart.map((item) => (
                          <div key={item.id} className="flex gap-4 p-4 border border-black/5 rounded-2xl items-center">
                            <img loading="lazy" src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover bg-black/5" />
                            <div className="flex-1">
                              <h4 className="font-bold text-sm">{item.name}</h4>
                              <p className="text-black/50 text-xs mt-1">Qty: {item.quantity}</p>
                            </div>
                            <span className="font-bold">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                      <button onClick={handleNextStep} className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-theme-primary transition-colors">
                        Continue to Payment
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Step 3: Payment Details */}
              <div className={`bg-white rounded-3xl p-8 shadow-sm border ${currentStep === 3 ? 'border-theme-primary shadow-[0_10px_30px_rgba(255,0,105,0.05)]' : 'border-black/5 opacity-70'}`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading font-bold text-xl flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep >= 3 ? 'bg-theme-primary text-white' : 'bg-black/10 text-black/50'}`}>3</div>
                    Payment Options
                  </h3>
                  {currentStep === 3 && (
                    <label className="flex items-center gap-2 text-xs font-bold text-black/50 cursor-pointer hover:text-black">
                      <input type="checkbox" checked={shouldFail} onChange={(e) => setShouldFail(e.target.checked)} className="accent-red-500" />
                      Simulate Failure
                    </label>
                  )}
                </div>

                <AnimatePresence>
                  {currentStep === 3 && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="flex flex-col gap-4 mb-8">
                        
                        {/* UPI Accordion */}
                        <div className={`border rounded-2xl overflow-hidden transition-colors ${paymentMethod === 'upi' ? 'border-theme-primary bg-theme-primary/5' : 'border-black/10 hover:border-black/30'}`}>
                          <label className="flex items-center gap-4 p-4 cursor-pointer">
                            <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="w-4 h-4 text-theme-primary accent-theme-primary" />
                            <Smartphone className="w-5 h-5 text-black/70" />
                            <span className="font-bold text-sm flex-1">UPI (Google Pay, PhonePe, Paytm)</span>
                          </label>
                          <AnimatePresence>
                            {paymentMethod === 'upi' && (
                              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white border-t border-black/5">
                                <div className="p-6 flex flex-col md:flex-row gap-6 items-center">
                                  <div className="w-32 h-32 bg-[#fafafa] rounded-xl border border-black/10 flex items-center justify-center p-2">
                                    <QrCode className="w-full h-full text-black/80" />
                                  </div>
                                  <div className="flex-1 text-center md:text-left">
                                    <p className="text-sm font-bold mb-2">Scan QR or use apps to pay</p>
                                    <p className="text-xs text-black/50 mb-4">UPI ID: coskinn@ybl</p>
                                    <div className="flex gap-2 justify-center md:justify-start">
                                      <button className="px-4 py-2 border border-black/10 rounded-lg text-xs font-bold hover:bg-black/5">GPay</button>
                                      <button className="px-4 py-2 border border-black/10 rounded-lg text-xs font-bold hover:bg-black/5">PhonePe</button>
                                      <button className="px-4 py-2 border border-black/10 rounded-lg text-xs font-bold hover:bg-black/5">Paytm</button>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Credit/Debit Card Accordion */}
                        <div className={`border rounded-2xl overflow-hidden transition-colors ${paymentMethod === 'card' ? 'border-theme-primary bg-theme-primary/5' : 'border-black/10 hover:border-black/30'}`}>
                          <label className="flex items-center gap-4 p-4 cursor-pointer">
                            <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-4 h-4 text-theme-primary accent-theme-primary" />
                            <CreditCard className="w-5 h-5 text-black/70" />
                            <span className="font-bold text-sm flex-1">Credit / Debit Card</span>
                          </label>
                          <AnimatePresence>
                            {paymentMethod === 'card' && (
                              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white border-t border-black/5">
                                <div className="p-6 grid grid-cols-2 gap-4">
                                  <input type="text" placeholder="Card Number" maxLength="16" value={cardDetails.number} onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})} className="col-span-2 px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-theme-primary" />
                                  <input type="text" placeholder="Name on Card" value={cardDetails.name} onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})} className="col-span-2 px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-theme-primary" />
                                  <input type="text" placeholder="MM/YY" maxLength="5" value={cardDetails.expiry} onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})} className="px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-theme-primary" />
                                  <input type="password" placeholder="CVV" maxLength="3" value={cardDetails.cvv} onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})} className="px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-theme-primary" />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Net Banking Accordion */}
                        <div className={`border rounded-2xl overflow-hidden transition-colors ${paymentMethod === 'netbanking' ? 'border-theme-primary bg-theme-primary/5' : 'border-black/10 hover:border-black/30'}`}>
                          <label className="flex items-center gap-4 p-4 cursor-pointer">
                            <input type="radio" name="payment" value="netbanking" checked={paymentMethod === 'netbanking'} onChange={() => setPaymentMethod('netbanking')} className="w-4 h-4 text-theme-primary accent-theme-primary" />
                            <Building2 className="w-5 h-5 text-black/70" />
                            <span className="font-bold text-sm flex-1">Net Banking</span>
                          </label>
                          <AnimatePresence>
                            {paymentMethod === 'netbanking' && (
                              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white border-t border-black/5">
                                <div className="p-6">
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                    {['HDFC', 'SBI', 'ICICI', 'Axis'].map(bank => (
                                      <button 
                                        key={bank}
                                        onClick={() => setSelectedBank(bank)}
                                        className={`py-3 border rounded-xl text-xs font-bold transition-all ${selectedBank === bank ? 'border-theme-primary text-theme-primary bg-theme-primary/5' : 'border-black/10 text-black/60 hover:border-black/30'}`}
                                      >
                                        {bank}
                                      </button>
                                    ))}
                                  </div>
                                  <select className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-theme-primary text-sm font-medium text-black/70 bg-white">
                                    <option value="">Select Other Bank</option>
                                    <option value="kotak">Kotak Mahindra</option>
                                    <option value="pnb">Punjab National Bank</option>
                                    <option value="bob">Bank of Baroda</option>
                                  </select>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Wallet Accordion */}
                        <div className={`border rounded-2xl overflow-hidden transition-colors ${paymentMethod === 'wallet' ? 'border-theme-primary bg-theme-primary/5' : 'border-black/10 hover:border-black/30'}`}>
                          <label className="flex items-center gap-4 p-4 cursor-pointer">
                            <input type="radio" name="payment" value="wallet" checked={paymentMethod === 'wallet'} onChange={() => setPaymentMethod('wallet')} className="w-4 h-4 text-theme-primary accent-theme-primary" />
                            <Wallet className="w-5 h-5 text-black/70" />
                            <span className="font-bold text-sm flex-1">Wallets</span>
                          </label>
                        </div>

                        {/* COD Accordion */}
                        <div className={`border rounded-2xl overflow-hidden transition-colors ${paymentMethod === 'cod' ? 'border-theme-primary bg-theme-primary/5' : 'border-black/10 hover:border-black/30'}`}>
                          <label className="flex items-center gap-4 p-4 cursor-pointer">
                            <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-4 h-4 text-theme-primary accent-theme-primary" />
                            <Package className="w-5 h-5 text-black/70" />
                            <span className="font-bold text-sm flex-1">Cash on Delivery</span>
                          </label>
                          <AnimatePresence>
                            {paymentMethod === 'cod' && (
                              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white border-t border-black/5">
                                <div className="p-6">
                                  <p className="text-sm font-medium text-black/60">Pay by cash or UPI at the time of delivery.</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                      </div>

                      <button 
                        onClick={processPayment} 
                        disabled={
                          (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv)) ||
                          (paymentMethod === 'netbanking' && !selectedBank)
                        }
                        className="w-full py-4 bg-theme-primary text-white font-bold uppercase tracking-widest text-sm rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
                      >
                        {paymentMethod === 'cod' ? 'Place Order' : `Pay ₹${TOTAL.toFixed(2)}`}
                      </button>

                      {/* Security Trust Indicators */}
                      <div className="flex justify-center items-center gap-6 mt-8 text-black/40">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                          <Lock className="w-4 h-4" /> SSL Encrypted
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                          <ShieldCheck className="w-4 h-4" /> PCI DSS Secure
                        </div>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Sticky Price Breakdown */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-black/5 sticky top-24">
                <h3 className="font-heading font-bold text-xl mb-6">Price Details</h3>
                
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex justify-between text-sm font-medium text-black/70">
                    <span>Subtotal ({cart.reduce((a,b)=>a+b.quantity,0)} items)</span>
                    <span>₹{cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-black/70">
                    <span>Tax (GST 18%)</span>
                    <span>₹{TAX.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-black/70">
                    <span>Shipping</span>
                    <span className="text-green-500 font-bold">FREE</span>
                  </div>
                </div>

                <div className="h-px bg-black/10 w-full my-4"></div>
                
                <div className="flex justify-between items-end mb-6">
                  <span className="text-lg font-bold text-black">Total Amount</span>
                  <span className="text-2xl font-bold text-theme-primary">₹{TOTAL.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-2 bg-green-50 p-4 rounded-xl text-green-700 text-sm font-medium mb-4">
                  <CheckCircle className="w-5 h-5" /> Free shipping applied to this order!
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
