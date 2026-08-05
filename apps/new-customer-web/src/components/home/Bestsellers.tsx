import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCurrency } from '../../context/CurrencyContext';
import { ArrowRight, Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { ProductData } from '../../hooks/useHomeData';

interface BestsellersProps {
  products: ProductData[];
  title?: string;
}

const Bestsellers: React.FC<BestsellersProps> = ({ products = [] }) => {
  const { mode } = useTheme();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const isGlam = mode === 'glam';

  return (
    <section id="bestsellers" className={`py-16 relative scroll-mt-20 ${isGlam ? 'bg-[#f4ebe1]' : 'bg-[#ffe4eb]'}`}>
      {!isGlam && (
        <>
          {/* Top Brushed Edge */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0 -translate-y-full pointer-events-none">
            <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
              <path d="M0,100 L0,50 C 120,40 240,60 360,30 C 480,0 600,70 720,40 C 840,10 960,60 1080,20 C 1200,-20 1320,50 1440,30 L1440,100 Z" fill="#ffe4eb" />
            </svg>
          </div>
          
          {/* Bottom Brushed Edge */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 translate-y-full pointer-events-none">
            <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
              <path d="M0,0 L0,50 C 120,60 240,40 360,70 C 480,100 600,30 720,60 C 840,90 960,40 1080,80 C 1200,120 1320,50 1440,70 L1440,0 Z" fill="#ffe4eb" />
            </svg>
          </div>

          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div 
              className="absolute top-[10%] left-[-5%] w-[40%] h-[400px] bg-[#ffb3c6] blur-[80px] rounded-full transform-gpu" 
              style={{ animation: 'float 15s ease-in-out infinite' }}
            ></div>
            <div 
              className="absolute top-[30%] left-[30%] w-[50%] h-[300px] bg-[#a3e6d8] blur-[80px] rounded-full transform-gpu" 
              style={{ animation: 'float 18s ease-in-out infinite reverse' }}
            ></div>
            <div 
              className="absolute top-[20%] right-[-5%] w-[40%] h-[400px] bg-[#ffefb3] blur-[80px] rounded-full transform-gpu" 
              style={{ animation: 'float 12s ease-in-out infinite' }}
            ></div>

            {/* Fade out edges to prevent rigid lines where blobs hit the container bounds */}
            <div className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-b from-[#ffe4eb] to-transparent z-[1]"></div>
            <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-[#ffe4eb] to-transparent z-[1]"></div>
          </div>
        </>
      )}

      <div className={`${isGlam ? 'max-w-[1150px]' : 'max-w-[1400px]'} mx-auto px-6 lg:px-10 relative z-10`}>
        
        {/* Header */}
        {isGlam ? (
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <div className="flex items-center w-full max-w-[500px] mb-4 opacity-70">
              <div className="flex-1 h-[1px] bg-[#d2b27b]"></div>
              <span className="px-6 text-[11px] uppercase tracking-[0.3em] font-sans italic text-[#d2b27b] font-medium whitespace-nowrap">
                MAISON FAVOURITES
              </span>
              <div className="flex-1 h-[1px] bg-[#d2b27b]"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#141824] italic tracking-tight">
              Bestsellers
            </h2>
            <Link to="/collections" state={{ from: 'bestsellers' }} className="mt-6 group flex items-center text-[11px] font-bold tracking-[0.15em] text-[#831826] uppercase border-b-[1.5px] border-[#831826] pb-[2px] hover:opacity-70 transition-opacity">
              VIEW ALL
              <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <p className="text-[clamp(0.65rem,1.5vw,0.85rem)] font-bold uppercase tracking-[0.25em] mb-2 text-[#FF7F50]">
                The juicy hits
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#2a2a2a] font-display">
                Bestsellers
              </h2>
            </div>
            <Link to="/collections" state={{ from: 'bestsellers' }} className="mt-4 md:mt-0 flex items-center font-bold text-sm transition-colors text-gray-500 hover:text-[#ff9aa8]">
              Shop all <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        )}

        {/* Grid / Carousel */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-10 pb-8 md:pb-0">
          {products.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="w-[45%] sm:w-[30%] md:w-[22%] lg:w-[20%] max-w-[240px] flex flex-col group cursor-pointer"
            >

              <Link to={`/product/${product.id}`} state={{ from: 'bestsellers' }} className={`block h-full relative ${isGlam ? '' : ''}`}>
                {/* Image Container */}
                <div className={`relative ${isGlam ? 'aspect-[4/5] bg-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.05)]' : 'aspect-[4/5] rounded-[40px] shadow-[0_8px_0px_rgba(0,0,0,0.1)]'} overflow-hidden mb-4 group-hover:shadow-[0_12px_0px_rgba(0,0,0,0.15)] transition-all duration-300`}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  
                  {isGlam && product.badge && (
                    <div className="absolute top-0 left-0 bg-[#7a1b26] text-white text-[10px] font-bold tracking-widest px-3 py-1.5 uppercase z-10">
                      {product.badge}
                    </div>
                  )}
                  
                  {/* Quick Add Button - only visible on hover */}
                  <div className="absolute bottom-6 left-6 right-6 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart({
                          id: 'temp-' + product.id.toString(),
                          productId: product.id.toString(),
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          quantity: 1
                        });
                      }}
                      className={`w-full py-3.5 rounded-full font-bold text-sm shadow-xl flex items-center justify-center ${isGlam ? 'bg-[#2a2a2a] text-[#e5b376] hover:bg-black' : 'bg-white text-gray-900 hover:bg-[#ff9aa8] hover:text-white'}`}
                    >
                      <ShoppingBag size={18} className="mr-2" /> Add to Bag
                    </button>
                  </div>
                </div>

                {!isGlam && (
                  <div>
                    <span className="text-sm text-[#ff9aa8] font-bold uppercase tracking-wider mb-2 block">
                      {product.category || 'Product'}
                    </span>
                    <h3 className="font-extrabold text-xl mb-1 text-gray-900 group-hover:underline">
                      {product.name}
                    </h3>
                    <p className="font-bold text-gray-900">{formatPrice(product.price)}</p>
                  </div>
                )}
                
                {isGlam && (
                  <div className="absolute bottom-[10px] left-[-10px] bg-[#faf9f6] border border-[#d2b27b] p-3 shadow-md z-20 w-[130px] h-[95px] flex flex-col justify-between group-hover:translate-y-[-5px] transition-transform duration-300">
                    <div>
                      <div className="text-[8px] uppercase tracking-[0.2em] font-bold text-[#8e95a1] mb-1 truncate">
                        {product.badge || 'Featured'}
                      </div>
                      <div className="font-serif text-[13px] text-[#2c3338] leading-tight line-clamp-2">
                        {product.name}
                      </div>
                    </div>
                    <div className="text-[#8b1527] font-bold text-[12px] font-sans">
                      {formatPrice(product.price)}
                    </div>
                  </div>
                )}
              </Link>

              {/* Wishlist Button */}
              <motion.button 
                whileTap={{ scale: 0.7 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isInWishlist(product.id.toString())) {
                    removeFromWishlist(product.id.toString());
                  } else {
                    addToWishlist({
                      id: product.id.toString(),
                      name: product.name,
                      price: formatPrice(product.price),
                      image: product.image,
                      category: product.category
                    });
                  }
                }}
                className={`absolute ${isGlam ? 'top-3 right-3 w-7 h-7 bg-white shadow-md' : 'top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-md shadow-sm hover:bg-white text-gray-500'} z-30 flex items-center justify-center rounded-full hover:text-red-500 transition-colors`}
              >
                <motion.div
                  animate={{ scale: isInWishlist(product.id.toString()) ? [1, 1.4, 1] : 1 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Heart size={isGlam ? 14 : 16} fill={isInWishlist(product.id.toString()) ? 'currentColor' : 'none'} className={isInWishlist(product.id.toString()) ? 'text-red-500' : ''} />
                </motion.div>
              </motion.button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Bestsellers;
