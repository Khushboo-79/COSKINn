import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, CreditCard, CheckCircle2, ChevronDown, ChevronUp, Loader2, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const loadRazorpay = () => new Promise((resolve) => {
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.onload = () => resolve(true);
  script.onerror = () => resolve(false);
  document.body.appendChild(script);
});

const Checkout: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  const { cartItems, getCartTotal, fetchCart } = useCart();
  const { currency, formatPrice } = useCurrency();
  const { token, user, isAuthenticated, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1); // 1: Shipping, 2: Payment
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);
  const [error, setError] = useState('');
  
  // Address States
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [stateForm, setStateForm] = useState('');
  const [addressId, setAddressId] = useState<string | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<'ONLINE' | 'COD'>('ONLINE');

  useEffect(() => {
    if (!isAuthenticated) {
      openAuthModal();
      navigate('/');
    }
  }, [isAuthenticated, navigate, openAuthModal]);

  useEffect(() => {
    if (pincode.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${pincode}`)
        .then(res => res.json())
        .then(data => {
          if (data && data[0].Status === 'Success') {
            const postOffice = data[0].PostOffice[0];
            setCity(postOffice.Block || postOffice.District || postOffice.Name);
            setStateForm(postOffice.State);
          }
        })
        .catch(err => console.error(err));
    }
  }, [pincode]);

  const subtotal = getCartTotal();
  const shipping = 5.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (step === 1) {
      setIsProcessingPayment(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/customer/addresses`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            label: 'Home',
            fullName: `${firstName} ${lastName}`,
            addressLine1,
            addressLine2,
            city,
            state: stateForm,
            country: 'India',
            pincode,
            phone
          })
        });

        if (!res.ok) {
          throw new Error('Failed to save address');
        }

        const data = await res.json();
        setAddressId(data.id);
        setStep(2);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsProcessingPayment(false);
      }
    } else {
      setIsProcessingPayment(true);
      try {
        // 1. Create Order in Backend
        const orderRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            addressId,
            paymentMode: paymentMethod
          })
        });

        if (!orderRes.ok) {
          const errData = await orderRes.json();
          throw new Error(errData.message || 'Failed to create order');
        }

        const orderData = await orderRes.json();
        
        if (paymentMethod === 'COD') {
          // COD Success
          setPaymentSuccess(true);
          await fetchCart(); // refresh cart (which should now be empty)
          setTimeout(() => {
            navigate('/order-success');
          }, 1500);
        } else {
          // ONLINE Payment - Razorpay
          const isScriptLoaded = await loadRazorpay();
          if (!isScriptLoaded) throw new Error('Razorpay SDK failed to load');

          const rzpRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/payments/create-order`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ orderId: orderData.id })
          });

          if (!rzpRes.ok) {
            throw new Error('Failed to initialize payment gateway');
          }

          const rzpData = await rzpRes.json();

          const options = {
            key: 'rzp_test_YourTestKeyId', // Replace with real key in production
            amount: rzpData.amount,
            currency: rzpData.currency,
            name: 'Fairenne',
            description: 'Order Payment',
            order_id: rzpData.id,
            handler: async function (response: any) {
              setPaymentSuccess(true);
              await fetchCart(); // Clear local cart
              setTimeout(() => {
                navigate('/order-success');
              }, 1500);
            },
            prefill: {
              name: `${firstName} ${lastName}`,
              email: email,
              contact: phone
            },
            theme: {
              color: isGlam ? '#7a1b26' : '#ff9aa8'
            }
          };

          const paymentObject = new (window as any).Razorpay(options);
          paymentObject.open();
          setIsProcessingPayment(false); // Modal closes, Razorpay UI takes over
        }

      } catch (err: any) {
        setError(err.message);
        setIsProcessingPayment(false);
      }
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className={`min-h-screen flex flex-col md:flex-row transition-colors duration-500 ${isGlam ? 'bg-[#faf9f6]' : 'bg-[#fcfaf9]'}`}>
      
      {/* Mobile Order Summary Toggle */}
      <div className={`md:hidden sticky top-0 z-40 w-full border-b ${isGlam ? 'bg-[#faf9f6] border-gray-200' : 'bg-white border-gray-100'}`}>
        <button 
          onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
          className="w-full flex items-center justify-between p-4 bg-gray-50 text-sm font-bold"
        >
          <span className="flex items-center text-gray-700">
            {mobileSummaryOpen ? 'Hide' : 'Show'} order summary
            {mobileSummaryOpen ? <ChevronUp size={16} className="ml-2" /> : <ChevronDown size={16} className="ml-2" />}
          </span>
          <span className="text-lg text-gray-900">{formatPrice(total)}</span>
        </button>
        <AnimatePresence>
          {mobileSummaryOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-white px-4 pb-6"
            >
              <div className="space-y-4 pt-4 border-t border-gray-100">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="relative w-12 h-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                          {item.quantity}
                        </span>
                      </div>
                      <span className="ml-4 font-bold text-gray-700 text-sm">{item.name}</span>
                    </div>
                    <span className="font-bold text-gray-900 text-sm">{formatPrice(item.price)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Left: Form Area */}
      <div className={`w-full md:w-[55%] lg:w-[60%] p-6 md:p-12 lg:p-20 order-2 md:order-1 ${isGlam ? 'bg-[#faf9f6]' : 'bg-white'}`}>
        <div className="max-w-xl mx-auto md:ml-auto md:mr-0">
          
          <Link to="/" className={`inline-block mb-10 text-3xl tracking-widest font-extrabold ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-gray-900'}`}>
            COSKIN<span className={isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}>n</span>
          </Link>

          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm font-bold text-gray-500 mb-10">
            <Link to="/cart" className={`transition-colors ${isGlam ? 'hover:text-[#7a1b26]' : 'hover:text-[#ff9aa8]'}`}>Cart</Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className={step >= 1 ? (isGlam ? 'text-[#2a2a2a]' : 'text-gray-900') : ''}>Information</span>
            <span className="mx-2 text-gray-300">/</span>
            <span className={step >= 2 ? (isGlam ? 'text-[#2a2a2a]' : 'text-gray-900') : ''}>Payment</span>
          </nav>

          <form onSubmit={handleNext}>
            {step === 1 ? (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div>
                  <h2 className={`text-2xl font-bold mb-4 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-gray-900'}`}>Contact</h2>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold mb-4 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-gray-900'}`}>Shipping Address</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First name" required className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                      <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name" required className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                    </div>
                    <input type="text" value={addressLine1} onChange={e => setAddressLine1(e.target.value)} placeholder="Address" required className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                    <input type="text" value={addressLine2} onChange={e => setAddressLine2(e.target.value)} placeholder="Apartment, suite, etc. (optional)" className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                    <div className="grid grid-cols-3 gap-4">
                      <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="City" required className="col-span-1 w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                      <input type="text" value={stateForm} onChange={e => setStateForm(e.target.value)} placeholder="State" required className="col-span-1 w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                      <input type="text" value={pincode} onChange={e => setPincode(e.target.value)} placeholder="ZIP code" inputMode="numeric" required className="col-span-1 w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                    </div>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div>
                  <h2 className={`text-2xl font-bold mb-4 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-gray-900'}`}>Payment</h2>
                  <p className="text-sm text-gray-500 mb-6 font-medium">All transactions are secure and encrypted.</p>
                  
                  <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                    {/* Credit Card Option */}
                    <label className={`p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer ${paymentMethod === 'ONLINE' ? 'bg-gray-50' : 'bg-white'}`}>
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          checked={paymentMethod === 'ONLINE'} 
                          onChange={() => setPaymentMethod('ONLINE')}
                          className={`w-4 h-4 ${isGlam ? 'accent-[#7a1b26]' : 'accent-[#ff9aa8]'}`} 
                        />
                        <span className="font-bold text-sm text-gray-900">Credit card / UPI / NetBanking</span>
                      </div>
                      <div className="flex gap-1"><CreditCard size={20} className="text-gray-400" /></div>
                    </label>

                    {paymentMethod === 'ONLINE' && (
                      <div className="p-4 space-y-4 bg-gray-50 opacity-60 pointer-events-none border-b border-gray-200">
                        <input type="text" placeholder="Card number (Simulated)" disabled className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                        <div className="grid grid-cols-2 gap-4">
                          <input type="text" placeholder="MM / YY" disabled className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                          <input type="text" placeholder="Security code" disabled className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                        </div>
                        <input type="text" placeholder="Name on card" disabled className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                      </div>
                    )}

                    {/* COD Option */}
                    <label className={`p-4 flex items-center justify-between cursor-pointer ${paymentMethod === 'COD' ? 'bg-gray-50' : 'bg-white'}`}>
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          checked={paymentMethod === 'COD'} 
                          onChange={() => setPaymentMethod('COD')}
                          className={`w-4 h-4 ${isGlam ? 'accent-[#7a1b26]' : 'accent-[#ff9aa8]'}`} 
                        />
                        <span className="font-bold text-sm text-gray-900">Cash on Delivery (COD)</span>
                      </div>
                      <FileText size={20} className="text-gray-900" />
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {error && <p className="mt-4 text-red-500 font-bold text-sm">{error}</p>}

            <div className="mt-10 pt-6 border-t border-gray-200 flex justify-between">
              {step === 2 && (
                <button type="button" onClick={() => setStep(1)} className="text-sm font-bold text-gray-500 hover:text-gray-900 flex items-center">
                  <ArrowLeft size={16} className="mr-2" /> Return to Information
                </button>
              )}
              <button 
                type="submit"
                disabled={isProcessingPayment}
                className={`py-4 px-8 rounded-xl font-bold text-lg w-full md:w-auto transition-all ml-auto ${
                  isGlam ? 'bg-[#2a2a2a] text-[#e5b376] hover:bg-black' : 'bg-[#ff9aa8] text-white hover:bg-[#ff8091] shadow-lg shadow-[#ff9aa8]/30'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {step === 1 ? 'Continue to payment' : (isProcessingPayment ? 'Processing...' : 'Pay now')}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right: Order Summary Desktop */}
      <div className={`hidden md:block w-full md:w-[45%] lg:w-[40%] p-6 md:p-12 lg:p-20 order-1 md:order-2 border-l ${isGlam ? 'bg-white border-gray-100' : 'bg-gray-50 border-gray-100'}`}>
        <div className="w-full max-w-lg sticky top-12">
          <h2 className="text-lg font-bold text-gray-900 mb-6 hidden">Order Summary</h2>
          <div className="space-y-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="relative w-16 h-16 rounded-xl bg-gray-100 overflow-hidden border border-gray-200">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-md">
                      {item.quantity}
                    </span>
                  </div>
                  <span className="ml-4 font-bold text-gray-700 max-w-[200px]">{item.name}</span>
                </div>
                <span className="font-bold text-gray-900">{formatPrice(item.price)}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 space-y-3 text-sm">
            <div className="flex justify-between text-gray-500 font-medium"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between text-gray-500 font-medium"><span>Shipping</span><span>{formatPrice(shipping)}</span></div>
            <div className="flex justify-between text-gray-500 font-medium"><span>Estimated taxes</span><span>{formatPrice(tax)}</span></div>
            <div className="flex justify-between font-black text-xl pt-6 border-t border-gray-200 text-gray-900 mt-6">
              <span>Total</span><span>{formatPrice(total)}</span>
            </div>
            <button 
              onClick={(e) => { e.preventDefault(); setShowBillModal(true); }}
              className={`mt-6 w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${isGlam ? 'bg-[#2a2a2a] text-[#e5b376] hover:bg-black' : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50'}`}
            >
              <FileText size={18} /> View Detailed Bill
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isProcessingPayment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-sm rounded-[2rem] p-10 flex flex-col items-center justify-center text-center shadow-2xl ${isGlam ? 'bg-[#1a1a1a] text-[#e5b376]' : 'bg-white'}`}
            >
              {!paymentSuccess ? (
                <>
                  <Loader2 size={48} className="animate-spin mb-6 text-current opacity-80" />
                  <h3 className={`text-2xl font-bold mb-2 ${isGlam ? 'font-serif' : 'font-display text-gray-900'}`}>Processing...</h3>
                  <p className={isGlam ? 'text-[#e5b376]/70' : 'text-gray-500'}>Please do not close this window...</p>
                </>
              ) : (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isGlam ? 'bg-[#e5b376]/20 text-[#e5b376]' : 'bg-green-100 text-green-500'}`}>
                    <CheckCircle2 size={40} strokeWidth={2} />
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${isGlam ? 'font-serif' : 'font-display text-gray-900'}`}>Success!</h3>
                  <p className={isGlam ? 'text-[#e5b376]/70' : 'text-gray-500'}>Redirecting you...</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}

        {showBillModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className={`w-full max-w-md rounded-t-[2rem] sm:rounded-[2rem] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto ${isGlam ? 'bg-[#1a1a1a] text-[#e5b376]' : 'bg-white'}`}
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className={`text-2xl font-bold ${isGlam ? 'font-serif' : 'font-display text-gray-900'}`}>Detailed Bill</h3>
                <button onClick={() => setShowBillModal(false)} className={`p-2 rounded-full transition-colors ${isGlam ? 'hover:bg-white/10' : 'hover:bg-gray-100 text-gray-500'}`}>
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${isGlam ? 'text-[#e5b376]/60' : 'text-gray-400'}`}>Items</h4>
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex justify-between items-start gap-4">
                        <div className="flex gap-3">
                          <span className={`font-medium ${isGlam ? 'text-[#e5b376]/70' : 'text-gray-500'}`}>{item.quantity}x</span>
                          <span className={`font-medium ${isGlam ? 'text-white' : 'text-gray-900'}`}>{item.name}</span>
                        </div>
                        <span className={`font-medium whitespace-nowrap ${isGlam ? 'text-white' : 'text-gray-900'}`}>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`pt-6 border-t ${isGlam ? 'border-[#e5b376]/20' : 'border-gray-100'}`}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className={isGlam ? 'text-[#e5b376]/70' : 'text-gray-500'}>Subtotal</span>
                      <span className={`font-medium ${isGlam ? 'text-white' : 'text-gray-900'}`}>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className={isGlam ? 'text-[#e5b376]/70' : 'text-gray-500'}>Shipping (Standard)</span>
                      <span className={`font-medium ${isGlam ? 'text-white' : 'text-gray-900'}`}>{formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className={isGlam ? 'text-[#e5b376]/70' : 'text-gray-500'}>Estimated Taxes (8%)</span>
                      <span className={`font-medium ${isGlam ? 'text-white' : 'text-gray-900'}`}>{formatPrice(tax)}</span>
                    </div>
                  </div>
                </div>

                <div className={`pt-6 border-t ${isGlam ? 'border-[#e5b376]/20' : 'border-gray-100'} flex justify-between items-center`}>
                  <span className={`text-lg font-bold ${isGlam ? 'text-[#e5b376]/70' : 'text-gray-500'}`}>Total Amount</span>
                  <span className={`text-2xl font-black ${isGlam ? 'text-white' : 'text-gray-900'}`}>{formatPrice(total)}</span>
                </div>
              </div>

              <button 
                onClick={() => setShowBillModal(false)}
                className={`mt-10 w-full py-4 rounded-xl font-bold transition-colors ${isGlam ? 'bg-[#e5b376] text-[#1a1a1a] hover:bg-white' : 'bg-gray-900 text-white hover:bg-black'}`}
              >
                Close Details
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Checkout;
