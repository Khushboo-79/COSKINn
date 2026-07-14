import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCart, cart, updateQuantity, removeFromCart, cartSubtotal } = useCart();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const SHIPPING_COST = 0; // Free shipping for luxury
  const TAX = cartSubtotal * 0.18; // 18% GST (mock)
  const TOTAL = cartSubtotal + SHIPPING_COST + TAX;

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150]"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-theme-bg shadow-2xl z-[160] flex flex-col font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/5 bg-white">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-theme-primary" />
                <h2 className="font-heading font-bold text-xl text-black">Your Cart</h2>
              </div>
              <button 
                onClick={closeCart}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors"
              >
                <X className="w-5 h-5 text-black/60" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 hide-scrollbar bg-[#fafafa]">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                  <ShoppingBag className="w-16 h-16 mb-4 text-black/30" />
                  <p className="font-body font-medium text-lg text-black">Your luxury cart is empty.</p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {cart.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-black/5 relative group"
                    >
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-black/10 rounded-full flex items-center justify-center text-black/40 hover:text-red-500 hover:border-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <X className="w-3 h-3" />
                      </button>

                      <div className="w-20 h-20 rounded-xl bg-theme-secondary/20 overflow-hidden flex-shrink-0">
                        <img loading="lazy" src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex flex-col flex-1">
                        <h3 className="font-heading font-bold text-sm text-black leading-tight mb-1 pr-4">{item.name}</h3>
                        <p className="text-theme-primary font-bold text-sm mb-auto">₹{item.price}</p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-3 bg-black/5 px-2 py-1 rounded-full">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-black/60 hover:text-black">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-bold text-xs w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-black/60 hover:text-black">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-bold text-black text-sm">₹{item.price * item.quantity}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer / Summary */}
            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-black/5 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex justify-between text-sm font-medium text-black/60">
                    <span>Subtotal</span>
                    <span>₹{cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-black/60">
                    <span>Tax (GST 18%)</span>
                    <span>₹{TAX.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-black/60">
                    <span>Shipping</span>
                    <span className="text-theme-primary font-bold">FREE</span>
                  </div>
                  <div className="h-px bg-black/5 w-full my-1"></div>
                  <div className="flex justify-between items-end">
                    <span className="text-base font-bold text-black">Grand Total</span>
                    <span className="text-2xl font-bold text-black">₹{TOTAL.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  className={`w-full py-4 font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-2 group ${
                    theme === 'skincare'
                      ? 'btn-primary-skincare'
                      : 'bg-theme-primary text-white rounded-full shadow-lg hover:bg-pink-700 transition-colors'
                  }`}
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
