import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../../components/common/ProductCard';
import { skincareProducts } from '../../constants/skincareProducts';
import { cosmeticsProducts } from '../../constants/cosmeticsProducts';
import { Clock, ArrowRight, Tag, Star } from 'lucide-react';
import premiumModelImg from '../../assets/images/premium_hero_model.webp';
import floatingLipstickImg from '../../assets/images/cosmetics_lipstick.webp';
import floatingBlushImg from '../../assets/images/velvet_blush.webp';

export default function SaleCollectionPage() {
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Combine and filter products on sale
  const allProducts = [...skincareProducts, ...cosmeticsProducts];
  const saleProducts = allProducts.filter(p => 
    (p.originalPrice && p.price < p.originalPrice) || 
    p.discountBadge || 
    (p.badge && (p.badge.includes('OFF') || p.badge.includes('SALE')))
  );

  // Sort logic
  const sortedProducts = [...saleProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'discount') {
      const discountA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) : 0;
      const discountB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) : 0;
      return discountB - discountA;
    }
    return 0; // featured
  });

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] font-sans text-[#1B1B1B]">
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-[#FFF5F7]">
        {/* Navbar Readability Overlay */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/80 to-transparent z-40 pointer-events-none" />

        {/* Soft Background Gradients & Bokeh */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }} 
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-gradient-to-br from-[#FFB6C1] to-[#FF6B6B] rounded-full blur-[120px] mix-blend-multiply opacity-50"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} 
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-gradient-to-tr from-[#FFC0CB] to-[#FF1493] rounded-full blur-[100px] mix-blend-multiply opacity-40"
          />
          {/* Subtle light particles overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Side: Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left pt-12 lg:pt-0">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="w-full flex flex-col items-center lg:items-start">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-[#FF0069] text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
                <Tag size={14} /> Limited Time Only
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#1B1B1B] mb-6 leading-[1.1] tracking-tight">
                Beauty <br className="hidden lg:block"/> Festival Sale
              </h1>
              
              <p className="text-lg text-gray-600 font-medium max-w-lg mb-8 leading-relaxed">
                Experience unparalleled luxury. Enjoy up to 40% off our most coveted skincare and premium cosmetics. Elevate your beauty ritual today.
              </p>
              
              {/* Countdown Timer */}
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-10">
                <div className="flex flex-col items-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/80 min-w-[70px] shadow-sm">
                  <span className="text-2xl font-black text-[#FF0069]">02</span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Days</span>
                </div>
                <span className="text-2xl font-black text-gray-300">:</span>
                <div className="flex flex-col items-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/80 min-w-[70px] shadow-sm">
                  <span className="text-2xl font-black text-[#FF0069]">14</span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Hours</span>
                </div>
                <span className="text-2xl font-black text-gray-300">:</span>
                <div className="flex flex-col items-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/80 min-w-[70px] shadow-sm">
                  <span className="text-2xl font-black text-[#FF0069]">59</span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Mins</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <button onClick={() => window.scrollBy({top: 600, behavior: 'smooth'})} className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] text-white font-black rounded-full shadow-[0_8px_25px_rgba(255,0,105,0.3)] hover:shadow-[0_12px_35px_rgba(255,0,105,0.4)] hover:-translate-y-1 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2">
                  Shop the Sale <ArrowRight size={18} />
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-white/60 backdrop-blur-md text-[#FF0069] font-black rounded-full border border-[#FF0069]/20 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                  Explore Collections
                </button>
              </div>

            </motion.div>
          </div>

          {/* Right Side: Visuals */}
          <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[700px] flex items-center justify-center mt-16 lg:mt-0">
            
            {/* Main Model Image - Soft Blended Edges */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative w-full max-w-[500px] lg:max-w-[650px] h-full z-10 flex items-center justify-center"
            >
              <img 
                src={premiumModelImg} 
                alt="Luxury Beauty Campaign" 
                className="w-full h-full object-cover object-center"
                style={{ 
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
                  maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)'
                }}
              />
            </motion.div>

            {/* Floating Glass Cards */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, y: [-5, 5, -5] }}
              transition={{ opacity: { duration: 0.8, delay: 0.5 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute top-[20%] lg:top-[25%] -right-[2%] lg:-right-[5%] bg-white/50 backdrop-blur-md border border-white/70 p-5 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] z-20 flex flex-col items-center gap-1"
            >
              <span className="text-3xl lg:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#FF0069] to-[#FF6B6B]">40%</span>
              <span className="text-xs font-bold text-gray-800 uppercase tracking-widest">OFF</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, y: [5, -5, 5] }}
              transition={{ opacity: { duration: 0.8, delay: 0.7 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
              className="absolute bottom-[20%] lg:bottom-[25%] -left-[2%] lg:-left-[5%] bg-white/50 backdrop-blur-md border border-white/70 px-6 py-4 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] z-20 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-yellow-100/80 text-yellow-600 flex items-center justify-center shadow-sm">
                <Star size={16} fill="currentColor" />
              </div>
              <div>
                <p className="text-sm font-black text-gray-900 leading-tight">Bestseller</p>
                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Collection</p>
              </div>
            </motion.div>

            {/* Floating Product Card 1 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, y: [-8, 8, -8], rotate: [-5, 0, -5] }}
              transition={{ opacity: { duration: 0.8, delay: 0.6 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute top-[10%] lg:top-[15%] left-[5%] lg:left-[5%] bg-white/60 backdrop-blur-md border border-white/80 p-3 rounded-2xl shadow-xl z-20 flex items-center justify-center"
            >
               <img src={floatingLipstickImg} alt="Lipstick" className="w-16 lg:w-20 mix-blend-multiply" />
            </motion.div>
            
            {/* Floating Product Card 2 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, y: [8, -8, 8], rotate: [5, 0, 5] }}
              transition={{ opacity: { duration: 0.8, delay: 0.8 }, y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }, rotate: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
              className="absolute bottom-[5%] lg:bottom-[10%] right-[5%] lg:right-[5%] bg-white/60 backdrop-blur-md border border-white/80 p-4 rounded-2xl shadow-xl z-20 flex items-center justify-center"
            >
               <img src={floatingBlushImg} alt="Blush" className="w-20 lg:w-28 mix-blend-multiply" />
            </motion.div>

          </div>

        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
          <p className="text-gray-500 font-medium">Showing {sortedProducts.length} premium products on sale</p>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold uppercase tracking-wider text-gray-500">Sort By:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 text-black font-medium py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0069]/20 focus:border-[#FF0069] transition-all cursor-pointer"
            >
              <option value="featured">Featured Deals</option>
              <option value="discount">Highest Discount</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {sortedProducts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-400">No active sales at the moment.</h3>
            <p className="text-gray-500 mt-2">Please check back later for exclusive deals!</p>
          </div>
        )}
      </section>
    </div>
  );
}
