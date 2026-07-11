import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Star, ChevronRight, Eye } from 'lucide-react';
import { skincareProducts } from '../constants/skincareProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Footer from '../components/common/Footer';

// Hero Images
import cleanserHeroImg from '../assets/images/cleanser_hero_lifestyle.webp';

const SKIN_TYPES = ["All", "Dry Skin", "Oily Skin", "Combination Skin", "Sensitive Skin", "Normal Skin", "Acne Prone"];
const SKIN_CONCERNS = ["Acne", "Dryness", "Blackheads", "Whiteheads", "Pigmentation", "Dullness", "Oil Control", "Large Pores"];

export default function CleanserPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const [activeSkinType, setActiveSkinType] = useState("All");
  const [activeConcern, setActiveConcern] = useState(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter products where subcategory === "Cleanser" or category contains "Face Care" and name contains "Cleanser"
  const allCleansers = useMemo(() => {
    return skincareProducts.filter(p => p.name.includes("Cleanser") && p.id >= 301); 
  }, []);

  const filteredCleansers = useMemo(() => {
    let filtered = allCleansers;

    if (activeSkinType !== "All") {
      filtered = filtered.filter(p => p.skinTypes?.includes(activeSkinType));
    }

    if (activeConcern) {
      filtered = filtered.filter(p => p.concerns?.includes(activeConcern));
    }

    return filtered;
  }, [allCleansers, activeSkinType, activeConcern]);

  const handleBuyNow = (product) => {
    addToCart(product, 1);
    navigate('/checkout');
  };

  return (
    <div className="w-full min-h-screen bg-theme-bg overflow-x-hidden font-sans text-theme-text">
      
      {/* Hero Section — Full Screen Background Image */}
      <section className="relative w-full min-h-[600px] lg:min-h-[750px] xl:min-h-[85vh] overflow-hidden flex items-end md:items-center pt-[140px] lg:pt-[150px]">

        {/* Full-screen background image */}
        <motion.img
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          src={cleanserHeroImg}
          alt="COSKINn Gentle Daily Cleanser — lifestyle"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Gradient overlays for luxury text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF0069]/80 via-[#FF0069]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

        {/* Glow Blobs on top of image */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] left-[-5%] w-[45vw] h-[45vw] max-w-xl bg-[#FF0069]/30 rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.35, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-0 right-[10%] w-[35vw] h-[35vw] max-w-md bg-[#FFD498]/30 rounded-full blur-[80px] pointer-events-none"
        />

        {/* Floating Particles */}
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.9, 0],
              y: [0, -(80 + i * 12)],
              x: [(i % 2 === 0 ? 1 : -1) * (i * 4)]
            }}
            transition={{
              duration: 5 + i * 0.4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeOut'
            }}
            className="absolute rounded-full bg-white/70 pointer-events-none"
            style={{
              width: `${3 + (i % 5) * 2}px`,
              height: `${3 + (i % 5) * 2}px`,
              bottom: `${5 + (i * 6) % 35}%`,
              left: `${(i * 7) % 50}%`,
            }}
          />
        ))}

        {/* Content overlaid on full-screen image */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 py-16 lg:py-24">
          <div className="max-w-xl">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-white/70 tracking-wide mb-6 lg:mb-8">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white font-bold truncate">COSKINn Cleansers</span>
            </div>

            {/* Premium Label Chip */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
            >
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              Dermatologist Tested
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black text-white leading-[1.05] mb-6 drop-shadow-xl"
            >
              COSKINn<br />
              <span className="italic font-light">Gentle Daily</span><br />
              Cleanser
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-base md:text-xl text-white/90 font-medium mb-8 tracking-wide leading-relaxed drop-shadow"
            >
              Cleanse • Hydrate • Protect Your Skin Barrier
            </motion.p>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {["Sulphate Free", "Paraben Free", "Cruelty Free"].map(badge => (
                <span key={badge} className="text-xs font-bold text-white border border-white/30 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm">
                  ✓ {badge}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  document.getElementById('products-grid').scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-10 py-4 bg-white text-[#FF0069] font-bold rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.2)] text-sm uppercase tracking-widest"
              >
                Shop Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  const el = document.getElementById('ingredients-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-10 py-4 bg-white/10 backdrop-blur-md border-2 border-white text-white font-bold rounded-full text-sm uppercase tracking-widest"
              >
                Know Ingredients
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Floating Info Badges */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="absolute bottom-8 right-6 md:right-10 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-3 z-20"
        >
          <div className="w-10 h-10 bg-[#FF0069]/10 rounded-full flex items-center justify-center shrink-0">
            <span className="text-[#FF0069] font-black">★</span>
          </div>
          <div>
            <div className="text-black font-black text-sm">4.9 / 5</div>
            <div className="text-gray-500 text-[11px] font-medium">1,450+ Reviews</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.7, duration: 0.7 }}
          className="absolute top-24 right-6 md:right-10 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl px-5 py-3 z-20"
        >
          <div className="text-[#FF0069] font-black text-xs uppercase tracking-widest">✦ New Formula</div>
          <div className="text-black font-bold text-sm">With Ceramides</div>
        </motion.div>
      </section>

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Shop by Skin Type */}
        <div className="mb-12">
          <h2 className="text-2xl font-heading font-bold text-black mb-6">Shop by Skin Type</h2>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 snap-x">
            {SKIN_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setActiveSkinType(type)}
                className={`shrink-0 snap-start px-6 py-4 rounded-2xl border-2 font-bold transition-all ${
                  activeSkinType === type 
                    ? 'border-[#FF0069] bg-[#FF0069] text-white shadow-[0_5px_15px_rgba(255,0,105,0.3)]' 
                    : 'border-gray-200 bg-white text-gray-600 hover:border-[#FF0069] hover:text-[#FF0069]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Shop by Concern */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-heading font-bold text-black">Shop by Concern</h2>
            {activeConcern && (
              <button 
                onClick={() => setActiveConcern(null)}
                className="text-sm font-medium text-[#FF0069] hover:underline"
              >
                Clear Filter
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {SKIN_CONCERNS.map((concern) => (
              <button
                key={concern}
                onClick={() => setActiveConcern(concern === activeConcern ? null : concern)}
                className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all ${
                  activeConcern === concern
                    ? 'bg-[#FF0069] border-[#FF0069] text-white shadow-md'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-[#FF0069] hover:text-[#FF0069]'
                }`}
              >
                {concern}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section id="products-grid" className="max-w-7xl mx-auto px-6 py-8 mb-20 bg-gray-50/50 rounded-3xl">
        <h2 className="text-3xl font-heading font-black text-black mb-10">
          The Cleanser Collection
          <span className="block text-sm font-sans font-medium text-gray-500 mt-2 tracking-wide uppercase">
            {filteredCleansers.length} {filteredCleansers.length === 1 ? 'Product' : 'Products'} Found
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence>
            {filteredCleansers.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white rounded-3xl overflow-hidden border border-black/5 hover:border-[#FF0069]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all flex flex-col"
              >
                {/* Product Image Area */}
                <div className="relative aspect-[4/5] bg-theme-secondary/10 overflow-hidden cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                  {/* Badge */}
                  {product.discountBadge && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white border border-[#FFD1E5] text-[#FF0069] text-[10px] font-bold tracking-widest rounded-full shadow-[0_4px_10px_rgba(255,0,105,0.15)] w-max">
                      {product.discountBadge}
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-[#FF0069] hover:bg-white transition-all shadow-sm"
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-[#FF0069] text-[#FF0069]' : ''}`} />
                  </button>

                  <img 
                    src={product.image} 
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Quick Actions Hover */}
                  <div className="absolute inset-x-4 bottom-4 translate-y-16 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                      }}
                      className="flex-1 btn-secondary-skincare py-3 flex items-center justify-center gap-2 text-sm font-bold"
                    >
                      <ShoppingBag size={16} /> Add
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product.id}`);
                      }}
                      className="w-12 btn-primary-skincare flex items-center justify-center shrink-0 py-3"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 flex-1 flex flex-col justify-between cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-black group-hover:text-[#FF0069] transition-colors mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-black font-bold text-sm ml-1">{product.rating}</span>
                      </div>
                      <span className="text-gray-400 text-xs">({product.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-gray-400 text-sm line-through mr-2">₹{product.originalPrice}</span>
                      <span className="text-xl font-bold text-black">₹{product.price}</span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBuyNow(product);
                      }}
                      className="px-5 py-2.5 btn-primary-skincare text-sm font-bold"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
}
