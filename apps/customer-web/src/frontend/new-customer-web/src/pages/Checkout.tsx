import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { ArrowLeft, CreditCard, CheckCircle2, ChevronDown, ChevronUp, Loader2, FileText, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

interface Address {
  id: string;
  type: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

const Checkout: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1); // 1: Shipping, 2: Payment
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Addresses State
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isCodAvailable, setIsCodAvailable] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'ONLINE' | 'COD'>('ONLINE');
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);

  // New Address Form State
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });

  const subtotal = getCartTotal();
  const shipping = 5.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart'); // or wherever empty cart goes
      return;
    }

    const fetchAddresses = async () => {
      try {
        const res = await api.get('/customer/addresses');
        const data = res.data?.data || res.data;
        if (Array.isArray(data)) {
          setAddresses(data);
          if (data.length > 0) {
            const def = data.find(a => a.isDefault);
            setSelectedAddressId(def ? def.id : data[0].id);
          } else {
            setIsAddingNew(true);
          }
        }
      } catch (err) {
        console.error('Failed to load addresses', err);
      } finally {
        setIsLoadingAddresses(false);
      }
    };
    fetchAddresses();
  }, [navigate, cartItems.length]);

  // Check pincode serviceability when typing new address
  useEffect(() => {
    if (newAddress.pincode.length === 6 && isAddingNew) {
      const checkPincode = async () => {
        try {
          // 1. Fetch real city/state from public API
          const postalRes = await fetch(`https://api.postalpincode.in/pincode/${newAddress.pincode}`);
          const postalData = await postalRes.json();
          let fetchedCity = '';
          let fetchedState = '';
          
          if (postalData && postalData[0].Status === 'Success') {
             const postOffice = postalData[0].PostOffice[0];
             fetchedCity = postOffice.Block || postOffice.District;
             fetchedState = postOffice.State;
          }

          // 2. Check our backend for COD availability (and local overrides)
          const res = await api.get(`/serviceable-pincode/check/${newAddress.pincode}`);
          
          setNewAddress(prev => ({
            ...prev,
            city: res.data?.details?.city || fetchedCity || prev.city,
            state: res.data?.details?.state || fetchedState || prev.state,
          }));
          
          if (res.data?.serviceable === false && res.data?.details) {
            // Only block if explicitly marked unserviceable in DB (details exist but isActive is false)
            setErrorMsg('Sorry, we do not deliver to this pincode yet.');
          } else {
            setErrorMsg('');
          }
        } catch (err) {
          // ignore error
        }
      };
      checkPincode();
    }
  }, [newAddress.pincode, isAddingNew]);

  // Check COD availability for selected address
  useEffect(() => {
    if (selectedAddressId && step === 2) {
      const selected = addresses.find(a => a.id === selectedAddressId);
      if (selected?.pincode) {
        api.get(`/serviceable-pincode/check/${selected.pincode}`)
          .then(res => {
            if (res.data?.details) {
               const canCod = res.data.details.isCod;
               setIsCodAvailable(canCod);
               if (!canCod && paymentMethod === 'COD') setPaymentMethod('ONLINE');
            } else {
               // If pincode not in DB, default to COD available
               setIsCodAvailable(true);
            }
          })
          .catch(() => setIsCodAvailable(true));
      }
    }
  }, [selectedAddressId, step, addresses, paymentMethod]);

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (step === 1) {
      if (isAddingNew) {
        // Save new address first
        try {
          setIsProcessingPayment(true);
          const res = await api.post('/customer/addresses', {
            ...newAddress,
            type: 'home',
            country: 'India',
            isDefault: addresses.length === 0
          });
          const added = res.data?.data || res.data;
          setAddresses([...addresses, added]);
          setSelectedAddressId(added.id);
          setIsAddingNew(false);
          setStep(2);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          console.error(err);
          setErrorMsg(err.response?.data?.message || 'Failed to save address');
        } finally {
          setIsProcessingPayment(false);
        }
      } else {
        if (!selectedAddressId) {
          setErrorMsg('Please select a shipping address');
          return;
        }
        setStep(2);
      }
      // Payment Step
      setIsProcessingPayment(true);
      try {
        // 1. Create Order
        const orderRes = await api.post('/orders', {
          addressId: selectedAddressId,
          paymentMode: paymentMethod
        });
        const orderId = orderRes.data.id || orderRes.data.data?.id;

        if (paymentMethod === 'ONLINE') {
          // 2. Mock Razorpay Initialization
          const rzpRes = await api.post('/payments/create-order', { orderId });
          const rzpOrderId = rzpRes.data.id;

          // 3. Trigger Mock Webhook for success
          await api.post('/payments/webhook', {
            event: 'mock.payment.success',
            payload: {
              payment: {
                entity: {
                  order_id: rzpOrderId
                }
              }
            }
          });
        }

        // 4. Clear Cart and Show Success
        clearCart();
        setPaymentSuccess(true);
        setTimeout(() => {
          navigate(`/order-success/${orderId}`);
        }, 1500);

      } catch (err: unknown) {
        console.error('Checkout failed', err);
        setErrorMsg(err.response?.data?.message || 'Failed to process checkout. Please try again.');
        setIsProcessingPayment(false);
      }
    }
  };

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
                      <span className="ml-4 text-sm font-bold text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{formatPrice(item.price)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 space-y-2 text-sm">
                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between text-gray-500"><span>Shipping</span><span>{formatPrice(shipping)}</span></div>
                <div className="flex justify-between text-gray-500"><span>Taxes</span><span>{formatPrice(tax)}</span></div>
                <div className="flex justify-between font-bold text-lg pt-4 border-t border-gray-100 text-gray-900">
                  <span>Total</span><span>{formatPrice(total)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Left: Form Area */}
      <div className="w-full md:w-[55%] lg:w-[60%] p-6 md:p-12 lg:p-20 order-2 md:order-1 flex justify-end">
        <div className="w-full max-w-2xl">
          <Link to="/cart" className="text-sm font-bold text-gray-500 hover:text-gray-900 mb-8 inline-block transition-colors">
            <ArrowLeft size={16} className="inline mr-2" /> Return to cart
          </Link>
          
          <div className="flex items-center space-x-2 text-sm font-bold mb-10 tracking-wide text-gray-400">
            <span className={step >= 1 ? (isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]') : ''}>Shipping</span>
            <span>/</span>
            <span className={step >= 2 ? (isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]') : ''}>Payment</span>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl font-bold text-sm">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleNext}>
            {step === 1 ? (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className={`text-2xl font-bold ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-gray-900'}`}>Shipping Address</h2>
                    {!isAddingNew && (
                      <button type="button" onClick={() => setIsAddingNew(true)} className={`text-sm font-bold flex items-center ${isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}`}>
                        <Plus size={16} className="mr-1" /> Add New
                      </button>
                    )}
                  </div>

                  {isLoadingAddresses ? (
                    <div className="py-8 flex justify-center"><Loader2 className="animate-spin text-gray-400" /></div>
                  ) : (
                    <div className="space-y-6">
                      {!isAddingNew && addresses.length > 0 && (
                        <div className="space-y-3">
                          {addresses.map((addr) => (
                            <label key={addr.id} className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all ${selectedAddressId === addr.id ? (isGlam ? 'border-[#7a1b26] bg-[#7a1b26]/5' : 'border-[#ff9aa8] bg-[#ff9aa8]/5') : 'border-gray-200 hover:border-gray-300'}`}>
                              <input 
                                type="radio" 
                                name="address" 
                                value={addr.id}
                                checked={selectedAddressId === addr.id}
                                onChange={(e) => setSelectedAddressId(e.target.value)}
                                className={`mt-1 mr-3 ${isGlam ? 'accent-[#7a1b26]' : 'accent-[#ff9aa8]'}`}
                              />
                              <div>
                                <p className="font-bold text-gray-900">{addr.fullName} <span className="text-gray-400 font-normal text-xs ml-2">({addr.phone})</span></p>
                                <p className="text-sm text-gray-500 mt-1">{addr.addressLine1} {addr.addressLine2 ? `, ${addr.addressLine2}` : ''}</p>
                                <p className="text-sm text-gray-500">{addr.city}, {addr.state} {addr.pincode}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                      )}

                      {isAddingNew && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Full name" required value={newAddress.fullName} onChange={e => setNewAddress({...newAddress, fullName: e.target.value})} className="col-span-2 w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                          </div>
                          <input type="text" placeholder="Address Line 1" required value={newAddress.addressLine1} onChange={e => setNewAddress({...newAddress, addressLine1: e.target.value})} className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                          <input type="text" placeholder="Apartment, suite, etc. (optional)" value={newAddress.addressLine2} onChange={e => setNewAddress({...newAddress, addressLine2: e.target.value})} className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                          <div className="grid grid-cols-3 gap-4">
                            <input type="text" placeholder="City" required value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} className="col-span-1 w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                            <input type="text" placeholder="State" required value={newAddress.state} onChange={e => setNewAddress({...newAddress, state: e.target.value})} className="col-span-1 w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                            <input type="text" placeholder="ZIP code" inputMode="numeric" required value={newAddress.pincode} onChange={e => setNewAddress({...newAddress, pincode: e.target.value})} className="col-span-1 w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                          </div>
                          <input type="tel" placeholder="Phone" required value={newAddress.phone} onChange={e => setNewAddress({...newAddress, phone: e.target.value})} className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                          
                          {addresses.length > 0 && (
                            <button type="button" onClick={() => setIsAddingNew(false)} className="text-sm font-bold text-gray-500 hover:text-gray-900 mt-2">
                              Cancel
                            </button>
                          )}
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div>
                  <h2 className={`text-2xl font-bold mb-4 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-gray-900'}`}>Payment</h2>
                  <p className="text-sm text-gray-500 mb-6 font-medium">All transactions are secure and encrypted. (Mock Payment)</p>
                  
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
                          <input type="text" placeholder="CVV" disabled className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                        </div>
                      </div>
                    )}

                    {/* Cash on Delivery Option */}
                    {isCodAvailable ? (
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
                    ) : (
                      <div className="p-4 flex items-center justify-between bg-gray-100 opacity-60">
                        <div className="flex items-center gap-3">
                          <input type="radio" disabled className="w-4 h-4" />
                          <span className="font-bold text-sm text-gray-500">Cash on Delivery (Not available for this location)</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            <div className="mt-10 pt-6 border-t border-gray-200 flex justify-between items-center">
              {step === 2 && (
                <button type="button" onClick={() => setStep(1)} className="text-sm font-bold text-gray-500 hover:text-gray-900">
                  &lt; Back to shipping
                </button>
              )}
              <button 
                type="submit"
                disabled={isProcessingPayment}
                className={`py-4 px-8 rounded-xl font-bold text-lg w-full md:w-auto transition-all ${
                  isGlam ? 'bg-[#2a2a2a] text-[#e5b376] hover:bg-black' : 'bg-[#ff9aa8] text-white hover:bg-[#ff8091] shadow-lg shadow-[#ff9aa8]/30'
                } ${isProcessingPayment ? 'opacity-70 cursor-not-allowed' : ''} ${step === 2 ? 'ml-auto' : 'w-full'}`}
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
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isProcessingPayment && step === 2 && (
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
                  <h3 className={`text-2xl font-bold mb-2 ${isGlam ? 'font-serif' : 'font-display text-gray-900'}`}>Processing Payment</h3>
                  <p className={isGlam ? 'text-[#e5b376]/70' : 'text-gray-500'}>Please do not close this window...</p>
                </>
              ) : (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isGlam ? 'bg-[#e5b376]/20 text-[#e5b376]' : 'bg-green-100 text-green-500'}`}>
                    <CheckCircle2 size={40} strokeWidth={2} />
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${isGlam ? 'font-serif' : 'font-display text-gray-900'}`}>Payment Successful!</h3>
                  <p className={isGlam ? 'text-[#e5b376]/70' : 'text-gray-500'}>Redirecting you to your order details...</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Checkout;

