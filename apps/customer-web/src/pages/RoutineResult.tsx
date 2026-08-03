import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Star, Redo2 } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  badge: string;
}

const skinRoutine: Product[] = [
  {
    id: 'quiz-101',
    name: 'Peachy Glow Vitamin C Serum',
    price: 36,
    image: 'https://www.dotandkey.com/cdn/shop/files/VitaminCSunscreenListing1_24ade7b6-5667-43a8-8cbf-a750fae616a4.jpg',
    description: 'Brightens and evens skin tone with 15% Vitamin C.',
    badge: 'Best Seller',
  },
  {
    id: 'quiz-102',
    name: 'Hydra-Bloom Moisturiser',
    price: 28,
    image: 'https://www.dotandkey.com/cdn/shop/files/1a_3ef32ac6-5192-495c-b4bb-dafb0e806260.jpg',
    description: 'Deep 72-hour hydration with Ceramides & Hyaluronic Acid.',
    badge: 'Fan Favourite',
  },
  {
    id: 'quiz-103',
    name: 'Avocado Melt Eye Cream',
    price: 22,
    image: 'https://www.dotandkey.com/cdn/shop/files/1_de25ac2d-c470-43f2-9217-538f92860f78.jpg',
    description: 'Reduces dark circles and puffiness overnight.',
    badge: 'New',
  },
];

const glamRoutine: Product[] = [
  {
    id: 'quiz-201',
    name: 'Midnight Elixir Retinol Serum',
    price: 54,
    image: 'https://www.dotandkey.com/cdn/shop/files/Artboard1_95ac3e40-4665-40b5-ae87-a3379ff9847e.jpg',
    description: 'Clinical-grade Retinol 0.5% for visibly firm, youthful skin.',
    badge: 'Luxury Pick',
  },
  {
    id: 'quiz-202',
    name: 'Velvet Noir Nourishing Cream',
    price: 48,
    image: 'https://www.dotandkey.com/cdn/shop/files/1-175.jpg',
    description: 'Rich barrier-repair cream with Squalane and Peptides.',
    badge: 'Best Seller',
  },
  {
    id: 'quiz-203',
    name: 'Golden Hour Eye Serum',
    price: 38,
    image: 'https://www.dotandkey.com/cdn/shop/files/ann_2_1_9036910d-d727-4641-ae46-a916a0408fcf.jpg',
    description: '24K gold-infused formula to lift and firm the eye area.',
    badge: 'Signature',
  },
];

const RoutineResult: React.FC = () => {
  const { mode } = useTheme();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const isGlam = mode === 'glam';
  const location = useLocation();

  const routine = isGlam ? glamRoutine : skinRoutine;
  const totalPrice = routine.reduce((sum, p) => sum + p.price, 0);

  const handleAddAll = () => {
    routine.forEach(product => {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    });
  };

  return (
    <div className={`min-h-screen pb-24 transition-colors duration-500 ${isGlam ? 'bg-[#faf9f6]' : 'bg-[#fcfaf9]'}`}>

      {/* Hero Result Header */}
      <div className={`py-20 md:py-28 px-6 text-center ${isGlam ? 'bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]' : 'bg-gradient-to-b from-[#ff9aa8]/20 to-transparent'}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-5xl mb-6 block">✨</span>
          <p className={`text-sm font-bold uppercase tracking-widest mb-4 ${isGlam ? 'text-[#e5b376]' : 'text-[#ff9aa8]'}`}>
            Your personalised routine is ready
          </p>
          <h1 className={`text-4xl md:text-6xl font-extrabold mb-6 ${isGlam ? 'font-serif text-white' : 'font-display text-gray-900'}`}>
            {isGlam ? 'Your Signature Glam Routine' : 'Your Glow Routine'}
          </h1>
          <p className={`text-lg max-w-xl mx-auto font-medium ${isGlam ? 'text-gray-400' : 'text-gray-600'}`}>
            {isGlam
              ? 'Curated by our experts. Three luxury essentials tailored to your complexion profile.'
              : 'We found your perfect 3-step routine. Add them all to your bag with one tap.'}
          </p>
        </motion.div>
      </div>

      {/* Product Cards */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 -mt-8 md:-mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {routine.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 + 0.3 }}
              className={`bg-white rounded-[32px] overflow-hidden border shadow-xl ${isGlam ? 'border-[#e5b376]/20' : 'border-[#ffe4e8]'}`}
            >
              {/* Product Image */}
              <div className="aspect-square overflow-hidden relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${isGlam ? 'bg-[#e5b376] text-[#2a2a2a]' : 'bg-[#ff9aa8] text-white'}`}>
                  {product.badge}
                </span>
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-bold text-gray-800">4.9</span>
                </div>
              </div>

              {/* Product Info */}
              {!isGlam && (
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500 font-medium mb-4 leading-relaxed">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                    <button
                      onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 })}
                      className="px-5 py-2.5 rounded-xl font-bold text-sm transition-all bg-gray-100 text-gray-800 hover:bg-gray-200"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}

              {isGlam && (
                <div className="p-6 relative pb-16">
                  <p className="text-sm text-gray-500 font-medium mb-4 leading-relaxed">{product.description}</p>
                  <div className="absolute bottom-[10px] left-[-10px] bg-[#faf9f6] border border-[#d2b27b] p-3 shadow-md z-20 w-[130px] h-[95px] flex flex-col justify-between group-hover:translate-y-[-5px] transition-transform duration-300">
                    <div>
                      <div className="text-[8px] uppercase tracking-[0.2em] font-bold text-[#8e95a1] mb-1 truncate flex items-center justify-between">
                        <span>{product.badge || 'Featured'}</span>
                      </div>
                      <div className="font-serif text-[13px] text-[#2c3338] leading-tight line-clamp-2">
                        {product.name}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-[#8b1527] font-bold text-[12px]">
                        {formatPrice(product.price)}
                      </div>
                      <button
                        onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 })}
                        className="px-2 py-1 bg-[#2a2a2a] text-[#e5b376] text-[9px] uppercase font-bold tracking-wider hover:bg-black"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Add All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={handleAddAll}
            className={`w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl ${
              isGlam
                ? 'bg-[#e5b376] text-[#2a2a2a] hover:bg-white shadow-[#e5b376]/30'
                : 'bg-[#ff9aa8] text-white hover:bg-[#ff8091] shadow-[#ff9aa8]/30'
            }`}
          >
            <ShoppingBag size={22} />
            Quick Add Full Routine — ₹{totalPrice}
          </button>

          <Link
            to="/quiz"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-5 rounded-2xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-all"
          >
            <Redo2 size={18} /> Retake Quiz
          </Link>
        </motion.div>

        {/* Continue Shopping */}
        <div className="text-center mt-8">
          <Link to="/collections" className={`inline-flex items-center gap-2 font-bold transition-all hover:underline ${isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}`}>
            Browse all products <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoutineResult;
