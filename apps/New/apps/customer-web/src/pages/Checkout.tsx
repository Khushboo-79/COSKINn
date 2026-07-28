import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { ArrowLeft, CreditCard, Apple, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  const { cartItems, getCartTotal } = useCart();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1); // 1: Shipping, 2: Payment
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  const subtotal = getCartTotal();
  const shipping = 5.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else navigate('/order-success');
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
                    <span className="text-sm font-medium text-gray-900">{item.price}</span>
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
          <Link to="/collections" className="text-sm font-bold text-gray-500 hover:text-gray-900 mb-8 inline-block transition-colors">
            <ArrowLeft size={16} className="inline mr-2" /> Return to shopping
          </Link>
          
          <div className="flex items-center space-x-2 text-sm font-bold mb-10 tracking-wide text-gray-400">
            <span className={step >= 1 ? (isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]') : ''}>Shipping</span>
            <span>/</span>
            <span className={step >= 2 ? (isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]') : ''}>Payment</span>
          </div>

          <form onSubmit={handleNext}>
            {step === 1 ? (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div>
                  <h2 className={`text-2xl font-bold mb-4 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-gray-900'}`}>Contact</h2>
                  <input type="email" placeholder="Email" required className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold mb-4 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-gray-900'}`}>Shipping Address</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="First name" required className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                      <input type="text" placeholder="Last name" required className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                    </div>
                    <input type="text" placeholder="Address" required className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                    <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                    <div className="grid grid-cols-3 gap-4">
                      <input type="text" placeholder="City" required className="col-span-1 w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                      <input type="text" placeholder="State" required className="col-span-1 w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                      <input type="text" placeholder="ZIP code" inputMode="numeric" required className="col-span-1 w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                    </div>
                    <input type="tel" placeholder="Phone" required className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
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
                    <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full border-[5px] border-[#2a2a2a] bg-white"></div>
                        <span className="font-bold text-sm">Credit card</span>
                      </div>
                      <div className="flex gap-1"><CreditCard size={20} className="text-gray-400" /></div>
                    </div>
                    <div className="p-4 space-y-4 bg-white">
                      <input type="text" placeholder="Card number" required className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Expiration date (MM / YY)" required className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                        <input type="text" placeholder="Security code" required className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                      </div>
                      <input type="text" placeholder="Name on card" required className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                    </div>

                    {/* Apple Pay Option */}
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                        <span className="font-bold text-sm">Apple Pay</span>
                      </div>
                      <Apple size={20} className="text-gray-900" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="mt-10 pt-6 border-t border-gray-200 flex justify-end">
              <button 
                type="submit"
                className={`py-4 px-8 rounded-xl font-bold text-lg w-full md:w-auto transition-all ${
                  isGlam ? 'bg-[#2a2a2a] text-[#e5b376] hover:bg-black' : 'bg-[#ff9aa8] text-white hover:bg-[#ff8091] shadow-lg shadow-[#ff9aa8]/30'
                }`}
              >
                {step === 1 ? 'Continue to payment' : 'Pay now'}
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

    </div>
  );
};

export default Checkout;
