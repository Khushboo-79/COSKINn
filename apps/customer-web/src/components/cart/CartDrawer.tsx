import React, { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { useCurrency } from '../../context/CurrencyContext';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed top-0 right-0 h-full w-full sm:w-[400px] md:w-[450px] shadow-2xl z-[1000] flex flex-col ${
              isGlam ? 'bg-[#faf9f6]' : 'bg-white'
            }`}
          >
            {/* Header */}
            <div className={`p-6 flex items-center justify-between border-b ${isGlam ? 'border-[#e5b376]/20' : 'border-gray-100'}`}>
              <h2 className={`text-xl font-bold flex items-center ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display tracking-tight text-[#2a2022]'}`}>
                <ShoppingBag className="mr-2" size={20} />
                Your Bag ({cartItems.length})
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-gray-500">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p className="text-lg">Your bag is completely empty.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className={`mt-4 px-6 py-3 rounded-full font-bold text-sm ${
                      isGlam ? 'bg-[#2a2a2a] text-[#e5b376]' : 'bg-[#ff9aa8] text-white'
                    }`}
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className={`font-bold text-sm leading-tight mb-1 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-sans text-gray-900'}`}>
                            {item.name}
                          </h3>
                          <p className={`font-bold text-sm ${isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}`}>
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 p-1">
                          <X size={16} />
                        </button>
                      </div>

                      <div className="flex items-center border border-gray-200 rounded-full w-fit mt-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                          className="px-3 py-1 text-gray-500 hover:text-black"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 font-bold text-sm min-w-[2ch] text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                          className="px-3 py-1 text-gray-500 hover:text-black"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cartItems.length > 0 && (
              <div className={`p-6 border-t ${isGlam ? 'border-[#e5b376]/20 bg-[#f4efe8]' : 'border-[#ffe4e8] bg-white'}`}>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-gray-500">Subtotal</span>
                  <span className={`text-2xl font-bold ${isGlam ? 'text-[#7a1b26]' : 'text-gray-900'}`}>
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                
                <p className="text-xs text-center text-gray-500 mb-4">
                  Shipping & taxes calculated at checkout.
                </p>

                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center ${
                    isGlam 
                      ? 'bg-[#2a2a2a] text-[#e5b376] hover:bg-black' 
                      : 'bg-[#ff9aa8] text-white shadow-lg shadow-[#ff9aa8]/30 hover:bg-[#ff8f9f]'
                  }`}
                >
                  Checkout securely
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
