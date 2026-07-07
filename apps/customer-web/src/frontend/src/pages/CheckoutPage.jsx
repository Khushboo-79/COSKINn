import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, CheckCircle, Package, ArrowLeft, ShieldCheck, Lock, QrCode, Smartphone, RefreshCw, AlertCircle, Download, Truck, Building2, Wallet, Zap, Trash2, Plus, Minus, Tag } from 'lucide-react';
import BnplFlow from '../components/checkout/BnplFlow';
import WalletFlow from '../components/checkout/WalletFlow';

export default function CheckoutPage() {
  const { cart, cartSubtotal, clearCart, addToCart, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Steps: 1: Cart, 2: Address, 3: Review, 4: Payment, 5: Success/Failed
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
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle | processing | failed | success
  
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [selectedBank, setSelectedBank] = useState('');
  const [bnplProvider, setBnplProvider] = useState('');
  const [walletProvider, setWalletProvider] = useState('');

  // Coupon Logic
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    // If cart is empty and order not placed, redirect
    if (cart.length === 0 && paymentStatus !== 'success') {
      navigate('/new-arrivals');
    }
    window.scrollTo(0, 0);
  }, [cart, paymentStatus, navigate, currentStep]);

  const SHIPPING_COST = cartSubtotal > 999 ? 0 : 99;
  const TAX = cartSubtotal * 0.18;
  
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.code === 'WELCOME10') discount = cartSubtotal * 0.10;
    else if (appliedCoupon.code === 'COSKINN15') discount = cartSubtotal * 0.15;
    else if (appliedCoupon.code === 'LUXE20') discount = cartSubtotal * 0.20;
  }

  const TOTAL = (cartSubtotal + SHIPPING_COST + TAX) - discount;

  const handleApplyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    if (['WELCOME10', 'COSKINN15', 'LUXE20'].includes(code)) {
      setAppliedCoupon({ code, message: `${code} Applied Successfully!` });
      setCouponError('');
    } else {
      setCouponError('Invalid or expired coupon code.');
      setAppliedCoupon(null);
    }
  };

  const processPayment = () => {
    if (paymentMethod === 'bnpl') {
      setPaymentStatus('bnpl-flow');
      return;
    }
    if (paymentMethod === 'wallet') {
      setPaymentStatus('wallet-flow');
      return;
    }

    setPaymentStatus('processing');
    
    // Simulate real-world delay for gateway
    setTimeout(() => {
      completeOrder();
    }, 2500);
  };

  const handleWalletSuccess = (walletDetails) => {
    setOrderDetails({
      orderId: `ORD-${Math.floor(Math.random() * 900000) + 100000}`,
      transactionId: walletDetails.transactionId,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      amount: TOTAL.toFixed(2),
      method: 'WALLET',
      provider: walletDetails.provider,
      delivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' }),
      status: 'Paid'
    });
    setPaymentStatus('success');
    clearCart();
    setCurrentStep(5);
  };

  const handleBnplSuccess = (bnplDetails) => {
    setOrderDetails({
      orderId: `ORD-${Math.floor(Math.random() * 900000) + 100000}`,
      transactionId: `TXN${Date.now()}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      amount: TOTAL.toFixed(2),
      method: 'BNPL',
      provider: bnplDetails.provider,
      nextDueDate: bnplDetails.nextDueDate,
      creditLimit: bnplDetails.creditLimit,
      delivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' }),
      status: 'Authorized'
    });
    setPaymentStatus('success');
    clearCart();
    setCurrentStep(5);
  };

  const completeOrder = () => {
    setOrderDetails({
      orderId: `ORD-${Math.floor(Math.random() * 900000) + 100000}`,
      transactionId: paymentMethod === 'cod' ? 'N/A' : `TXN${Date.now()}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      amount: TOTAL.toFixed(2),
      method: paymentMethod.toUpperCase(),
      delivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' }),
      status: paymentMethod === 'cod' ? 'Payment Pending' : 'Paid'
    });
    setPaymentStatus('success');
    clearCart();
    setCurrentStep(5);
  };

  const updateQuantity = (product, delta) => {
    const newQty = (product.quantity || 1) + delta;
    if (newQty > 0) {
      addToCart(product, 1); // The context addToCart adds the quantity to existing
      // Note: To properly decrement, our context might not support negative. We should use removeFromCart or custom logic if delta is negative.
      // Since context doesn't expose decrement easily, let's assume `addToCart(product, quantity)` sets it or adds it. 
      // We will just allow removal for now if delta is negative and qty is 1.
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-theme-secondary selection:text-theme-dark relative">
      
      {/* Checkout Header (Replacement for Navbar) */}
      {(paymentStatus !== 'bnpl-flow' && paymentStatus !== 'wallet-flow') && (
        <div className="w-full bg-white border-b border-black/5 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
          <Link to="/" className="text-2xl font-heading font-black tracking-widest text-black">
            COSKINn
          </Link>
          <div className="flex items-center gap-2 text-xs font-bold text-black/60 uppercase tracking-widest">
            <ShieldCheck className="w-5 h-5 text-green-500" /> 100% Secure Checkout
          </div>
        </div>
      )}

      {/* BNPL Flow Overlay */}
      {paymentStatus === 'bnpl-flow' && (
        <BnplFlow 
          provider={bnplProvider || 'Simpl'} 
          amount={TOTAL} 
          onCancel={() => setPaymentStatus('idle')}
          onSuccess={handleBnplSuccess}
        />
      )}

      {/* Wallet Flow Overlay */}
      {paymentStatus === 'wallet-flow' && (
        <WalletFlow 
          provider={walletProvider || 'Paytm'} 
          amount={TOTAL} 
          onCancel={() => setPaymentStatus('idle')}
          onSuccess={handleWalletSuccess}
        />
      )}

      {/* Full Screen Processing Loader */}
      <AnimatePresence>
        {paymentStatus === 'processing' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-xl z-[9999] flex flex-col items-center justify-center"
          >
            <div className="relative w-32 h-32 mb-8">
              <motion.div 
                animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute inset-0 rounded-full border-4 border-black/5 border-t-theme-primary"
              />
              <div className="absolute inset-0 flex items-center justify-center text-4xl font-heading font-black text-theme-primary">
                C
              </div>
            </div>
            
            <h2 className="font-heading font-bold text-3xl mb-3 text-black">
              {paymentMethod === 'bnpl' ? 'Redirecting to Provider for KYC...' : 'Processing Payment...'}
            </h2>
            <p className="text-black/50 font-medium mb-8">
              {paymentMethod === 'bnpl' 
                ? 'COSKINn does not collect Aadhaar or PAN details. Verification is securely handled by the provider.'
                : 'Please do not refresh or press back on this page.'}
            </p>
            
            <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-black/40">
              <div className="flex items-center gap-2"><Lock className="w-4 h-4" /> 256-bit Secure</div>
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> PCI DSS Compliant</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {paymentStatus === 'failed' ? (
          <div className="bg-white rounded-[3rem] p-12 md:p-24 text-center shadow-xl border border-black/5 flex flex-col items-center">
             <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
              className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-8"
            >
              <AlertCircle className="w-12 h-12 text-red-500" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Payment Failed</h2>
            <p className="text-black/60 text-lg mb-10 max-w-md mx-auto">We couldn't process your payment. Your account has not been charged. Please try again or use a different payment method.</p>
            
            <button 
              onClick={() => setPaymentStatus('idle')}
              className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-theme-primary transition-colors shadow-xl"
            >
              Retry Payment
            </button>
          </div>
        ) : currentStep === 5 ? (
          <div className="bg-white rounded-[3rem] p-10 lg:p-16 text-center shadow-xl border border-black/5 flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-8"
            >
              <CheckCircle className="w-12 h-12 text-green-500" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              {orderDetails?.method === 'COD' ? 'Order Confirmed!' : orderDetails?.method === 'BNPL' ? 'Payment Authorized' : 'Payment Successful!'}
            </h2>
            <p className="text-black/60 text-lg mb-10">
              {orderDetails?.method === 'COD' 
                ? 'Your order has been placed. Pay at the time of delivery.' 
                : orderDetails?.method === 'BNPL'
                  ? 'Your Buy Now Pay Later request has been successfully approved.'
                  : `Thank you for your purchase, ${user?.name?.split(' ')[0] || 'Beautiful'}.`}
            </p>
            
            {/* Tracking Timeline */}
            <div className="w-full max-w-3xl mb-12 py-8 px-4 border-y border-black/5">
              <div className="relative flex justify-between items-center">
                <div className="absolute left-0 right-0 top-1/2 h-1 bg-black/5 -z-10"></div>
                <div className="absolute left-0 w-1/4 top-1/2 h-1 bg-theme-primary -z-10"></div>
                
                <div className="flex flex-col items-center gap-2 bg-white px-2">
                  <div className="w-8 h-8 rounded-full bg-theme-primary text-white flex items-center justify-center shadow-lg"><CheckCircle className="w-4 h-4" /></div>
                  <span className="text-xs font-bold text-black uppercase">Confirmed</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-white px-2">
                  <div className="w-8 h-8 rounded-full bg-theme-primary text-white flex items-center justify-center shadow-lg"><Package className="w-4 h-4" /></div>
                  <span className="text-xs font-bold text-black uppercase">Packed</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-white px-2">
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-black/10 text-black/30 flex items-center justify-center"><Truck className="w-4 h-4" /></div>
                  <span className="text-xs font-bold text-black/40 uppercase">Shipped</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-white px-2">
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-black/10 text-black/30 flex items-center justify-center"><MapPin className="w-4 h-4" /></div>
                  <span className="text-xs font-bold text-black/40 uppercase">Out for Delivery</span>
                </div>
              </div>
            </div>

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
                  <p className="text-xs text-black/50 font-bold uppercase tracking-wider mb-1">Status</p>
                  <p className={`font-bold ${orderDetails?.status === 'Paid' ? 'text-green-600' : orderDetails?.status === 'Authorized' ? 'text-blue-600' : 'text-orange-500'}`}>{orderDetails?.status}</p>
                </div>
                
                {orderDetails?.method === 'BNPL' && (
                  <>
                    <div className="col-span-2 md:col-span-1 mt-2">
                      <p className="text-xs text-black/50 font-bold uppercase tracking-wider mb-1">BNPL Provider</p>
                      <p className="font-bold text-black text-sm">{orderDetails?.provider}</p>
                    </div>
                    <div className="col-span-2 md:col-span-1 mt-2">
                      <p className="text-xs text-black/50 font-bold uppercase tracking-wider mb-1">Next Due Date</p>
                      <p className="font-bold text-black text-sm text-theme-primary">{orderDetails?.nextDueDate}</p>
                    </div>
                  </>
                )}

                {orderDetails?.method === 'WALLET' && (
                  <div className="col-span-2 md:col-span-2 mt-2">
                    <p className="text-xs text-black/50 font-bold uppercase tracking-wider mb-1">Wallet Used</p>
                    <p className="font-bold text-black text-sm">{orderDetails?.provider}</p>
                  </div>
                )}

                <div className={`col-span-2 md:col-span-4 mt-2 border-t border-black/5 pt-4 ${(orderDetails?.method === 'BNPL' || orderDetails?.method === 'WALLET') ? '' : 'pt-2'}`}>
                  <p className="text-xs text-black/50 font-bold uppercase tracking-wider mb-1">Transaction ID</p>
                  <p className="font-bold text-black text-sm">{orderDetails?.transactionId}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/new-arrivals" className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-theme-primary transition-colors shadow-xl">
                Continue Shopping
              </Link>
              <button className="px-8 py-4 bg-white border border-black/10 text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-black/5 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" /> Download Invoice
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
            {/* Main Checkout Area */}
            <div className="xl:col-span-2 flex flex-col gap-6">
              
              {/* Step 1: Shopping Cart */}
              <div className={`bg-white rounded-3xl p-6 md:p-8 transition-all duration-300 border ${currentStep === 1 ? 'border-theme-primary shadow-lg ring-4 ring-theme-primary/5' : 'border-black/5 opacity-70 cursor-pointer hover:border-black/20'}`} onClick={() => currentStep > 1 && setCurrentStep(1)}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${currentStep >= 1 ? 'bg-theme-primary text-white shadow-md' : 'bg-black/10 text-black/50'}`}>1</div>
                  <h3 className="font-heading font-bold text-2xl">Shopping Cart</h3>
                </div>

                <AnimatePresence>
                  {currentStep === 1 && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="flex flex-col gap-4 mb-8">
                        {cart.map((item) => (
                          <div key={item.id} className="flex gap-4 p-4 border border-black/5 rounded-2xl items-center relative group">
                            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-theme-secondary/20 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-base truncate">{item.name}</h4>
                              <p className="text-black/50 text-sm mt-1 mb-2">{item.category}</p>
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-theme-primary">₹{item.price}</span>
                                <div className="flex items-center gap-3">
                                  <span className="text-sm font-bold text-black/50">Qty: {item.quantity}</span>
                                </div>
                              </div>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="absolute top-4 right-4 text-black/30 hover:text-red-500 transition-colors">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-end">
                        <button onClick={() => setCurrentStep(2)} className="px-10 py-4 bg-black text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-theme-primary transition-colors shadow-lg">
                          Continue to Shipping
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {currentStep > 1 && (
                  <div className="ml-14 text-black/60 font-medium text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" /> {cart.length} items in cart
                  </div>
                )}
              </div>

              {/* Step 2: Shipping Address */}
              <div className={`bg-white rounded-3xl p-6 md:p-8 transition-all duration-300 border ${currentStep === 2 ? 'border-theme-primary shadow-lg ring-4 ring-theme-primary/5' : 'border-black/5 opacity-70 cursor-pointer hover:border-black/20'}`} onClick={() => currentStep > 2 && setCurrentStep(2)}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${currentStep >= 2 ? 'bg-theme-primary text-white shadow-md' : 'bg-black/10 text-black/50'}`}>2</div>
                  <h3 className="font-heading font-bold text-2xl">Shipping Address</h3>
                </div>

                <AnimatePresence>
                  {currentStep === 2 && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <input type="text" placeholder="Full Name" value={address.name} onChange={(e) => setAddress({...address, name: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-black/10 focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary bg-[#fafafa]" />
                        <input type="tel" placeholder="Mobile Number" value={address.mobile} onChange={(e) => setAddress({...address, mobile: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-black/10 focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary bg-[#fafafa]" />
                        <input type="text" placeholder="Street Address" value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-black/10 focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary bg-[#fafafa] md:col-span-2" />
                        <input type="text" placeholder="City" value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-black/10 focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary bg-[#fafafa]" />
                        <div className="flex gap-4">
                          <input type="text" placeholder="State" value={address.state} onChange={(e) => setAddress({...address, state: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-black/10 focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary bg-[#fafafa]" />
                          <input type="text" placeholder="PIN Code" value={address.pincode} onChange={(e) => setAddress({...address, pincode: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-black/10 focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary bg-[#fafafa]" />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button 
                          disabled={!address.name || !address.street || !address.city || !address.pincode}
                          onClick={() => setCurrentStep(3)}
                          className="px-10 py-4 bg-black text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-theme-primary disabled:opacity-50 disabled:hover:bg-black transition-colors shadow-lg"
                        >
                          Deliver Here
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {currentStep > 2 && (
                  <div className="ml-14 text-black/70 text-sm bg-[#fafafa] p-4 rounded-xl border border-black/5">
                    <p className="font-bold text-black mb-1">{address.name} <span className="font-normal text-black/50 ml-2">{address.mobile}</span></p>
                    <p>{address.street}, {address.city}</p>
                    <p>{address.state} - {address.pincode}</p>
                  </div>
                )}
              </div>

              {/* Step 3: Order Review */}
              <div className={`bg-white rounded-3xl p-6 md:p-8 transition-all duration-300 border ${currentStep === 3 ? 'border-theme-primary shadow-lg ring-4 ring-theme-primary/5' : 'border-black/5 opacity-70 cursor-pointer hover:border-black/20'}`} onClick={() => currentStep > 3 && setCurrentStep(3)}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${currentStep >= 3 ? 'bg-theme-primary text-white shadow-md' : 'bg-black/10 text-black/50'}`}>3</div>
                  <h3 className="font-heading font-bold text-2xl">Order Review</h3>
                </div>

                <AnimatePresence>
                  {currentStep === 3 && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="text-black/60 font-medium mb-6">Please review your final order amount and apply any coupons before proceeding to payment.</p>
                      
                      <div className="flex justify-end">
                        <button onClick={() => setCurrentStep(4)} className="px-10 py-4 bg-black text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-theme-primary transition-colors shadow-lg">
                          Proceed to Payment
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {currentStep > 3 && (
                  <div className="ml-14 text-black/60 font-medium text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" /> Order verified
                  </div>
                )}
              </div>

              {/* Step 4: Payment Methods */}
              <div className={`bg-white rounded-3xl p-6 md:p-8 transition-all duration-300 border ${currentStep === 4 ? 'border-theme-primary shadow-lg ring-4 ring-theme-primary/5' : 'border-black/5 opacity-70'}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${currentStep >= 4 ? 'bg-theme-primary text-white shadow-md' : 'bg-black/10 text-black/50'}`}>4</div>
                  <h3 className="font-heading font-bold text-2xl">Payment Method</h3>
                </div>

                <AnimatePresence>
                  {currentStep === 4 && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="flex flex-col gap-4 mb-10">
                        
                        {/* 1. UPI */}
                        <div className={`border-2 rounded-2xl overflow-hidden transition-colors ${paymentMethod === 'upi' ? 'border-theme-primary bg-theme-primary/5' : 'border-black/5 hover:border-black/20'}`}>
                          <label className="flex items-center gap-4 p-5 cursor-pointer">
                            <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="w-5 h-5 text-theme-primary accent-theme-primary" />
                            <Smartphone className="w-6 h-6 text-black/70" />
                            <div className="flex-1">
                              <span className="font-bold text-base block">UPI</span>
                              <span className="text-xs text-black/50 font-medium">Google Pay, PhonePe, Paytm, BHIM</span>
                            </div>
                          </label>
                          <AnimatePresence>
                            {paymentMethod === 'upi' && (
                              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white border-t border-black/5">
                                <div className="p-6 flex flex-col md:flex-row gap-8 items-center">
                                  <div className="w-40 h-40 bg-[#fafafa] rounded-2xl border border-black/10 flex items-center justify-center p-3 shadow-inner">
                                    <QrCode className="w-full h-full text-black/80" />
                                  </div>
                                  <div className="flex-1 w-full">
                                    <p className="text-sm font-bold mb-4">Scan QR or enter UPI ID</p>
                                    <div className="flex gap-2 mb-4">
                                      <input type="text" placeholder="example@upi" className="flex-1 px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-theme-primary bg-[#fafafa]" />
                                      <button className="px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-theme-primary transition-colors text-sm">Verify</button>
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                      <span className="px-4 py-2 border border-black/10 rounded-lg text-xs font-bold text-black/60 bg-[#fafafa]">GPay</span>
                                      <span className="px-4 py-2 border border-black/10 rounded-lg text-xs font-bold text-black/60 bg-[#fafafa]">PhonePe</span>
                                      <span className="px-4 py-2 border border-black/10 rounded-lg text-xs font-bold text-black/60 bg-[#fafafa]">Paytm</span>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* 2. Credit/Debit Card */}
                        <div className={`border-2 rounded-2xl overflow-hidden transition-colors ${paymentMethod === 'card' ? 'border-theme-primary bg-theme-primary/5' : 'border-black/5 hover:border-black/20'}`}>
                          <label className="flex items-center gap-4 p-5 cursor-pointer">
                            <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-5 h-5 text-theme-primary accent-theme-primary" />
                            <CreditCard className="w-6 h-6 text-black/70" />
                            <div className="flex-1">
                              <span className="font-bold text-base block">Credit / Debit Card</span>
                              <span className="text-xs text-black/50 font-medium">Visa, Mastercard, RuPay, Amex</span>
                            </div>
                          </label>
                          <AnimatePresence>
                            {paymentMethod === 'card' && (
                              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white border-t border-black/5">
                                <div className="p-6 grid grid-cols-2 gap-4">
                                  <input type="text" placeholder="Card Number" maxLength="16" value={cardDetails.number} onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})} className="col-span-2 px-5 py-4 rounded-xl border border-black/10 focus:outline-none focus:border-theme-primary bg-[#fafafa]" />
                                  <input type="text" placeholder="Name on Card" value={cardDetails.name} onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})} className="col-span-2 px-5 py-4 rounded-xl border border-black/10 focus:outline-none focus:border-theme-primary bg-[#fafafa]" />
                                  <input type="text" placeholder="MM/YY" maxLength="5" value={cardDetails.expiry} onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})} className="px-5 py-4 rounded-xl border border-black/10 focus:outline-none focus:border-theme-primary bg-[#fafafa]" />
                                  <input type="password" placeholder="CVV" maxLength="4" value={cardDetails.cvv} onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})} className="px-5 py-4 rounded-xl border border-black/10 focus:outline-none focus:border-theme-primary bg-[#fafafa]" />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* 3. Net Banking */}
                        <div className={`border-2 rounded-2xl overflow-hidden transition-colors ${paymentMethod === 'netbanking' ? 'border-theme-primary bg-theme-primary/5' : 'border-black/5 hover:border-black/20'}`}>
                          <label className="flex items-center gap-4 p-5 cursor-pointer">
                            <input type="radio" name="payment" value="netbanking" checked={paymentMethod === 'netbanking'} onChange={() => setPaymentMethod('netbanking')} className="w-5 h-5 text-theme-primary accent-theme-primary" />
                            <Building2 className="w-6 h-6 text-black/70" />
                            <div className="flex-1">
                              <span className="font-bold text-base block">Net Banking</span>
                              <span className="text-xs text-black/50 font-medium">All major Indian banks supported</span>
                            </div>
                          </label>
                          <AnimatePresence>
                            {paymentMethod === 'netbanking' && (
                              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white border-t border-black/5">
                                <div className="p-6">
                                  <p className="text-sm font-bold mb-4">Select Bank</p>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                    {['SBI', 'HDFC', 'ICICI', 'Axis'].map(bank => (
                                      <button 
                                        key={bank}
                                        onClick={() => setSelectedBank(bank)}
                                        className={`py-4 border rounded-xl text-sm font-bold transition-all ${selectedBank === bank ? 'border-theme-primary text-theme-primary bg-theme-primary/5 shadow-sm' : 'border-black/10 text-black/60 hover:border-black/30 bg-[#fafafa]'}`}
                                      >
                                        {bank}
                                      </button>
                                    ))}
                                  </div>
                                  <select 
                                    className="w-full px-5 py-4 rounded-xl border border-black/10 focus:outline-none focus:border-theme-primary text-sm font-medium text-black/70 bg-[#fafafa]"
                                    onChange={(e) => setSelectedBank(e.target.value)}
                                  >
                                    <option value="">Other Banks</option>
                                    <option value="kotak">Kotak Mahindra</option>
                                    <option value="pnb">Punjab National Bank</option>
                                    <option value="bob">Bank of Baroda</option>
                                    <option value="canara">Canara Bank</option>
                                    <option value="idfc">IDFC First</option>
                                    <option value="indusind">IndusInd Bank</option>
                                    <option value="yes">Yes Bank</option>
                                  </select>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* 4. Wallets */}
                        <div className={`border-2 rounded-2xl overflow-hidden transition-colors ${paymentMethod === 'wallet' ? 'border-theme-primary bg-theme-primary/5' : 'border-black/5 hover:border-black/20'}`}>
                          <label className="flex items-center gap-4 p-5 cursor-pointer">
                            <input type="radio" name="payment" value="wallet" checked={paymentMethod === 'wallet'} onChange={() => setPaymentMethod('wallet')} className="w-5 h-5 text-theme-primary accent-theme-primary" />
                            <Wallet className="w-6 h-6 text-black/70" />
                            <div className="flex-1">
                              <span className="font-bold text-base block">Wallets</span>
                              <span className="text-xs text-black/50 font-medium">Amazon Pay, Paytm, PhonePe, Mobikwik</span>
                            </div>
                          </label>
                          <AnimatePresence>
                            {paymentMethod === 'wallet' && (
                              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white border-t border-black/5">
                                <div className="p-6 grid grid-cols-2 gap-3">
                                  {['Amazon Pay', 'Paytm', 'PhonePe', 'Mobikwik'].map(wallet => (
                                      <button 
                                        key={wallet}
                                        onClick={() => setWalletProvider(wallet)}
                                        className={`py-4 border rounded-xl text-sm font-bold transition-all ${walletProvider === wallet ? 'border-theme-primary text-theme-primary bg-theme-primary/5 shadow-sm' : 'border-black/10 text-black/60 hover:border-black/30 bg-[#fafafa]'}`}
                                      >
                                        {wallet}
                                      </button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* 5. BNPL */}
                        <div className={`border-2 rounded-2xl overflow-hidden transition-colors ${paymentMethod === 'bnpl' ? 'border-theme-primary bg-theme-primary/5' : 'border-black/5 hover:border-black/20'}`}>
                          <label className="flex items-center gap-4 p-5 cursor-pointer">
                            <input type="radio" name="payment" value="bnpl" checked={paymentMethod === 'bnpl'} onChange={() => setPaymentMethod('bnpl')} className="w-5 h-5 text-theme-primary accent-theme-primary" />
                            <Zap className="w-6 h-6 text-black/70" />
                            <div className="flex-1">
                              <span className="font-bold text-base block">Buy Now, Pay Later</span>
                              <span className="text-xs text-black/50 font-medium">Simpl, LazyPay, Amazon Pay Later</span>
                            </div>
                          </label>
                          <AnimatePresence>
                            {paymentMethod === 'bnpl' && (
                              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white border-t border-black/5">
                                <div className="p-6">
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                                    {['Simpl', 'LazyPay', 'Amazon Pay Later', 'ICICI PayLater'].map(provider => (
                                      <button 
                                        key={provider}
                                        onClick={() => setBnplProvider(provider)}
                                        className={`py-4 border rounded-xl text-xs font-bold transition-all ${bnplProvider === provider ? 'border-theme-primary text-theme-primary bg-theme-primary/5 shadow-sm' : 'border-black/10 text-black/60 hover:border-black/30 bg-[#fafafa]'}`}
                                      >
                                        {provider}
                                      </button>
                                    ))}
                                  </div>
                                  <div className="bg-theme-secondary/20 rounded-xl p-4 border border-theme-secondary/40">
                                    <p className="text-xs text-black/70 font-medium leading-relaxed">
                                      <strong className="text-black">Note:</strong> You will be securely redirected to the provider's portal for authentication. 
                                      <strong> COSKINn does not collect or store PAN/Aadhaar details.</strong> All KYC verification is handled exclusively by the provider.
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* 6. COD */}
                        <div className={`border-2 rounded-2xl overflow-hidden transition-colors ${paymentMethod === 'cod' ? 'border-theme-primary bg-theme-primary/5' : 'border-black/5 hover:border-black/20'}`}>
                          <label className="flex items-center gap-4 p-5 cursor-pointer">
                            <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-5 h-5 text-theme-primary accent-theme-primary" />
                            <Package className="w-6 h-6 text-black/70" />
                            <div className="flex-1">
                              <span className="font-bold text-base block">Cash on Delivery</span>
                              <span className="text-xs text-black/50 font-medium">Pay via Cash or UPI at your doorstep</span>
                            </div>
                          </label>
                          <AnimatePresence>
                            {paymentMethod === 'cod' && (
                              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white border-t border-black/5">
                                <div className="p-6">
                                  <p className="text-sm font-bold text-black mb-1">Cash on Delivery Selected</p>
                                  <p className="text-sm text-black/60 mb-4">Pay when your order is delivered to your address.</p>
                                  <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-yellow-200">
                                    Extra ₹50 COD Charge Applied
                                  </div>
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
                          (paymentMethod === 'netbanking' && !selectedBank) ||
                          (paymentMethod === 'bnpl' && !bnplProvider) ||
                          (paymentMethod === 'wallet' && !walletProvider)
                        }
                        className="w-full py-5 bg-theme-primary text-white font-bold uppercase tracking-widest text-sm rounded-full shadow-lg shadow-theme-primary/30 hover:shadow-xl hover:bg-theme-primary/90 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-theme-primary disabled:shadow-none"
                      >
                        {paymentMethod === 'cod' 
                          ? 'Place Order' 
                          : paymentMethod === 'bnpl' 
                            ? 'Continue to Provider'
                            : `Pay Securely ₹${(TOTAL + (paymentMethod === 'cod' ? 50 : 0)).toFixed(2)}`}
                      </button>

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Sticky Price Breakdown */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-black/5 border border-black/5 sticky top-24">
                <h3 className="font-heading font-bold text-xl mb-6 border-b border-black/5 pb-4">Order Summary</h3>
                
                {/* Coupon Section */}
                <div className="mb-6 pb-6 border-b border-black/5">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                      <input 
                        type="text" 
                        placeholder="Promo Code" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-theme-primary text-sm uppercase bg-[#fafafa]"
                      />
                    </div>
                    <button 
                      onClick={handleApplyCoupon}
                      className="px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-theme-primary transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-red-500 text-xs font-bold mt-2 ml-1">{couponError}</p>}
                  {appliedCoupon && (
                    <div className="flex items-center justify-between mt-3 bg-green-50 px-4 py-2.5 rounded-lg border border-green-100">
                      <span className="text-green-700 text-xs font-bold flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" /> {appliedCoupon.message}</span>
                      <button onClick={() => setAppliedCoupon(null)} className="text-black/40 hover:text-red-500 text-xs font-bold uppercase">Remove</button>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex justify-between text-sm font-medium text-black/70">
                    <span>Items Total ({cart.reduce((a,b)=>a+(b.quantity||1),0)})</span>
                    <span>₹{cartSubtotal.toFixed(2)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-sm font-bold text-green-600">
                      <span>Coupon Discount</span>
                      <span>- ₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-medium text-black/70">
                    <span>Tax (GST 18%)</span>
                    <span>₹{TAX.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-black/70">
                    <span>Shipping</span>
                    {SHIPPING_COST === 0 ? (
                      <span className="text-green-500 font-bold">FREE</span>
                    ) : (
                      <span>₹{SHIPPING_COST.toFixed(2)}</span>
                    )}
                  </div>
                  {paymentMethod === 'cod' && (
                    <div className="flex justify-between text-sm font-medium text-yellow-600">
                      <span>COD Charge</span>
                      <span>+ ₹50.00</span>
                    </div>
                  )}
                </div>

                <div className="h-px bg-black/10 w-full my-4"></div>
                
                <div className="flex justify-between items-end mb-6">
                  <span className="text-lg font-bold text-black">Total Amount</span>
                  <span className="text-3xl font-bold text-theme-primary">
                    ₹{(TOTAL + (paymentMethod === 'cod' ? 50 : 0)).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-center items-center gap-6 text-black/40 mt-8 pt-6 border-t border-black/5">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                    <Lock className="w-4 h-4" /> 100% Secure
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" /> SSL Encrypted
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
