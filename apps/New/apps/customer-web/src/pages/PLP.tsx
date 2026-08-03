import React, { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';
import { ArrowLeft, Star, SlidersHorizontal, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FilterSidebar from '../components/shop/FilterSidebar';

const PLP: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { mode } = useTheme();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const location = useLocation();
  const isGlam = mode === 'glam';
  
  const fromSection = location.state?.from === 'bestsellers' ? 'bestsellers' : 'shop-by-category';
  const backText = fromSection === 'bestsellers' ? 'Back to bestsellers' : 'Back to categories';

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Use the exact wording from the reference site
  const pageTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Shop all';
  const subtitle = "Pick your flavour";

  const products = [
    { id: 1, name: isGlam ? 'Midnight Elixir Serum' : 'Peachy Glow Vitamin C Serum', category: 'Serums', price: 3499, rating: 4.8, reviews: 1284, image: isGlam ? 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80' : 'https://images.pexels.com/photos/8101534/pexels-photo-8101534.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 2, name: isGlam ? 'Velvet Finish Foundation' : 'Watermelon Burst Hydrator', category: isGlam ? 'Makeup' : 'Moisturizers', price: 2999, rating: 4.9, reviews: 856, image: isGlam ? 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80' : 'https://images.pexels.com/photos/27393236/pexels-photo-27393236.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 3, name: isGlam ? 'Scarlet Kiss Lipstick' : 'Berry Bounce Sleep Mask', category: isGlam ? 'Lips' : 'Masks', price: 1999, rating: 4.7, reviews: 2103, image: isGlam ? 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80' : 'https://images.pexels.com/photos/9306017/pexels-photo-9306017.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 4, name: isGlam ? 'Golden Hour Highlighter' : 'Avocado Melt Eye Cream', category: isGlam ? 'Makeup' : 'Eye Care', price: 2499, rating: 4.6, reviews: 542, image: isGlam ? 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80' : 'https://images.unsplash.com/photo-1615397323133-c90a2a16d557?auto=format&fit=crop&q=80' },
    { id: 5, name: isGlam ? 'Midnight Elixir Serum' : 'Peachy Glow Vitamin C Serum', category: 'Serums', price: 3499, rating: 4.8, reviews: 1284, image: isGlam ? 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80' : 'https://images.pexels.com/photos/8101534/pexels-photo-8101534.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 6, name: isGlam ? 'Velvet Finish Foundation' : 'Watermelon Burst Hydrator', category: isGlam ? 'Makeup' : 'Moisturizers', price: 2999, rating: 4.9, reviews: 856, image: isGlam ? 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80' : 'https://images.pexels.com/photos/27393236/pexels-photo-27393236.jpeg?auto=compress&cs=tinysrgb&w=800' },
  ];

  return (
    <div className={`min-h-screen ${isGlam ? 'bg-[#faf9f6]' : 'bg-white'}`}>
      
      {/* Page Header */}
      <div className={`py-12 md:py-20 border-b relative ${isGlam ? 'border-gray-200 bg-[#faf9f6]' : 'border-[#ffe4e8] bg-gradient-to-b from-[#ffe4e8]/30 to-white'}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          <Link 
            to={`/#${fromSection}`} 
            className={`absolute left-6 lg:left-10 top-0 md:-top-4 flex items-center text-sm font-bold transition-colors ${isGlam ? 'text-[#7a1b26] hover:text-[#2a2a2a]' : 'text-[#ff9aa8] hover:text-[#ff7b8c]'}`}
          >
            <ArrowLeft className="mr-1.5 w-4 h-4" />
            {backText}
          </Link>
          <div className="flex flex-col items-center text-center mt-8 md:mt-0">
            <p className={`text-sm font-bold uppercase tracking-widest mb-4 ${isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}`}>
              {subtitle}
            </p>
            <h1 className={`text-4xl md:text-6xl font-extrabold text-[#2a2a2a] ${isGlam ? 'font-serif' : 'font-display'}`}>
              {pageTitle}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex justify-between items-center mb-6">
            <p className="font-bold text-gray-500">{products.length} products</p>
            <button 
              onClick={() => setMobileFiltersOpen(true)}
              className={`flex items-center px-6 py-3 rounded-xl font-bold text-sm ${isGlam ? 'bg-[#2a2a2a] text-[#e5b376]' : 'bg-gray-100 text-[#2a2a2a]'}`}
            >
              <SlidersHorizontal size={16} className="mr-2" /> Filters
            </button>
          </div>

          {/* Sidebar Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar />
          </div>

          {/* Product Grid */}
          <div className="flex-grow">
            <div className="hidden lg:flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
              <p className="font-bold text-gray-500">{products.length} products</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-400">Sort by:</span>
                <select className={`text-sm font-bold bg-transparent outline-none cursor-pointer ${isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}`}>
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {products.map((product, idx) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group cursor-pointer"
                >
                  <Link to={`/product/${product.id}`} className="block">
                    <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-gray-100 mb-4">
                      <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    
                    {/* Wishlist Button */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (isInWishlist(product.id.toString())) {
                          removeFromWishlist(product.id.toString());
                        } else {
                            addToWishlist({ id: product.id.toString(), name: product.name, price: formatPrice(product.price), image: product.image, category: product.category });
                        }
                      }}
                      className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Heart size={16} fill={isInWishlist(product.id.toString()) ? "currentColor" : "none"} className={isInWishlist(product.id.toString()) ? "text-red-500" : ""} />
                    </button>

                    <div className="absolute bottom-4 left-4 right-4 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart({ id: product.id.toString(), name: product.name, price: product.price, image: product.image, quantity: 1 });
                        }}
                        className={`w-full py-3 rounded-xl font-bold text-sm shadow-xl ${
                        isGlam ? 'bg-[#7a1b26] text-white hover:bg-[#5a121b]' : 'bg-white text-gray-900 hover:bg-[#ff9aa8] hover:text-white'
                      }`}>
                        Quick Add
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{product.category}</span>
                      <div className="flex items-center text-xs font-bold text-gray-700">
                        <Star size={12} className={isGlam ? 'text-[#7a1b26] mr-1' : 'text-yellow-400 mr-1'} fill="currentColor" />
                        {product.rating} <span className="text-gray-400 font-normal ml-1">({product.reviews})</span>
                      </div>
                    </div>
                    <h3 className={`font-bold text-lg leading-tight mb-1 text-[#2a2a2a] group-hover:underline ${isGlam ? 'font-serif' : 'font-sans'}`}>
                      {product.name}
                    </h3>
                    <p className="font-bold text-gray-900">{formatPrice(product.price)}</p>
                  </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Load More */}
            <div className="mt-16 flex justify-center">
              <button className={`w-full md:w-auto px-8 py-4 rounded-full font-bold text-sm border-2 transition-colors ${
                isGlam ? 'border-[#7a1b26] text-[#7a1b26] hover:bg-[#7a1b26] hover:text-white' : 'border-[#ff9aa8] text-[#ff9aa8] hover:bg-[#ff9aa8] hover:text-white'
              }`}>
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className={`fixed inset-y-0 right-0 w-full max-w-sm shadow-2xl z-50 p-6 overflow-y-auto ${isGlam ? 'bg-[#faf9f6]' : 'bg-white'}`}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className={`text-2xl font-bold ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-[#2a2a2a]'}`}>Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-gray-900">
                  <X size={20} />
                </button>
              </div>
              <FilterSidebar />
              <div className="mt-8">
                <button 
                  onClick={() => setMobileFiltersOpen(false)}
                  className={`w-full py-4 rounded-xl font-bold text-white shadow-xl ${
                    isGlam ? 'bg-[#7a1b26]' : 'bg-[#ff9aa8]'
                  }`}
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PLP;
