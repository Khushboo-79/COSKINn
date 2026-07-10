import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Star, ChevronRight, Eye, Shield, Sun, Clock, Sparkles, ChevronLeft, Droplets, ArrowRight } from 'lucide-react';
import { skincareProducts } from '../constants/skincareProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Footer from '../components/common/Footer';

import sunscreenHeroImg from '../assets/images/sunscreen_spf50_lifestyle.webp';
import sunscreenProductImg from '../assets/images/sunscreen_spf50.webp';

const FILTERS = ["All", "SPF 30", "SPF 50", "Matte Finish", "Dewy Finish", "Water Resistant"];
const SORT_OPTIONS = ["Newest", "Popular", "Price Low to High", "Price High to Low"];

const SKIN_TYPES_RECOMMENDATIONS = [
  { id: 'oily', label: 'Oily Skin', badgeMatch: 'OILY SKIN' },
  { id: 'dry', label: 'Dry Skin', badgeMatch: 'DRY SKIN' },
  { id: 'sensitive', label: 'Sensitive Skin', badgeMatch: 'SENSITIVE SKIN' },
  { id: 'combination', label: 'Combination Skin', badgeMatch: 'OILY SKIN' }, // Fallback to oily for combination as per mock data
  { id: 'outdoor', label: 'Outdoor Activities', badgeMatch: 'SPORT' },
  { id: 'makeup', label: 'Under Makeup', badgeMatch: 'UNDER MAKEUP' },
];

const ROUTINE_STEPS = [
  { id: 104, step: "1. Cleanse", name: "COSKINn Gentle Cleanser" },
  { id: 109, step: "2. Tone", name: "COSKINn Face Mist" },
  { id: 114, step: "3. Treat", name: "COSKINn Niacinamide Serum" },
  { id: 112, step: "4. Moisturize", name: "COSKINn Daily Moisturiser" },
  { id: 101, step: "5. Protect", name: "COSKINn Sunscreen SPF 50" }
];

export default function SunscreenPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("All");
  const [activeSort, setActiveSort] = useState("Popular");
  const [activeSkinType, setActiveSkinType] = useState('oily');

  const carouselRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allSunscreens = useMemo(() => {
    return skincareProducts.filter(p => p.name.includes("Sunscreen"));
  }, []);

  const filteredAndSortedSunscreens = useMemo(() => {
    let result = [...allSunscreens];

    // Apply Filter
    if (activeFilter !== "All") {
      if (activeFilter === "SPF 30") result = result.filter(p => p.name.includes("SPF 30"));
      if (activeFilter === "SPF 50") result = result.filter(p => p.name.includes("SPF 50"));
      if (activeFilter === "Matte Finish") result = result.filter(p => p.benefits?.includes("Matte finish"));
      if (activeFilter === "Dewy Finish") result = result.filter(p => p.benefits?.includes("Dewy finish"));
      if (activeFilter === "Water Resistant") result = result.filter(p => p.benefits?.includes("Water Resistant"));
    }

    // Apply Sort
    switch (activeSort) {
      case "Price Low to High":
        result.sort((a, b) => a.price - b.price);
        break;
      case "Price High to Low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "Newest":
        result.sort((a, b) => b.id - a.id); // Assuming higher ID is newer
        break;
      case "Popular":
      default:
        result.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return result;
  }, [allSunscreens, activeFilter, activeSort]);

  const recommendedSunscreens = useMemo(() => {
    const activeMatch = SKIN_TYPES_RECOMMENDATIONS.find(s => s.id === activeSkinType)?.badgeMatch;
    let recs = allSunscreens.filter(p => p.badge === activeMatch);
    if (recs.length === 0) {
       recs = allSunscreens.slice(0, 3); // fallback
    }
    return recs;
  }, [allSunscreens, activeSkinType]);

  const morningRoutineProducts = useMemo(() => {
    return ROUTINE_STEPS.map(step => ({
      ...skincareProducts.find(p => p.id === step.id),
      routineStepLabel: step.step
    })).filter(p => p.id); // Ensure all are found
  }, []);

  const handleBuyNow = (product) => {
    addToCart(product, 1);
    navigate('/checkout');
  };

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-theme-bg overflow-x-hidden font-sans text-theme-text mt-[72px]">
      
      {/* Breadcrumbs */}
      <div className="w-full border-b border-black/5 bg-white/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-xs font-medium text-black/50 tracking-wide">
          <Link to="/" className="hover:text-theme-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/skincare" className="hover:text-theme-primary transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black font-bold truncate">Face Care</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#FF0069] font-bold truncate">COSKINn Sunscreen</span>
        </div>
      </div>

      {/* SECTION 1: PREMIUM HERO */}
      <section className="relative w-full min-h-[600px] lg:min-h-[85vh] bg-[#FFF5F8] overflow-hidden flex flex-col lg:flex-row items-center">
        {/* Abstract Gradient Background & Glassmorphism */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-gradient-to-br from-[#FF0069]/10 to-[#FFD498]/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-gradient-to-tl from-[#FFD498]/20 to-transparent rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 py-12 lg:py-20 flex flex-col lg:flex-row items-center relative z-10">
          {/* Left Side: Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start lg:pr-12 text-left mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-sm mb-6"
            >
              <span className="w-2 h-2 bg-[#FF0069] rounded-full animate-pulse"></span>
              <span className="text-[11px] font-bold tracking-widest text-[#FF0069] uppercase">New Daily Sun Protection</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-black leading-[1.05] mb-6"
            >
              COSKINn Sunscreen <br />
              <span className="text-[#FF0069] font-light italic">SPF 50 PA++++</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl md:text-3xl font-heading font-bold text-gray-800 mb-4"
            >
              Protect Your Glow. Every Day.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg"
            >
              Protect your skin from harmful UVA & UVB rays while keeping it hydrated, lightweight and radiant all day.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-3 mb-8 bg-white/50 backdrop-blur-sm py-2 px-4 rounded-2xl border border-white/50"
            >
              <div className="flex text-[#FF0069]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <span className="font-bold text-black">4.9</span>
              <span className="text-gray-500 text-sm font-medium">(9,000+ Reviews)</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-8"
            >
              <span className="text-sm text-gray-500 uppercase tracking-widest font-bold">Starting from</span>
              <div className="text-3xl font-black text-black">₹699</div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button 
                onClick={() => document.getElementById('product-collection').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-[#FF0069] text-white font-bold rounded-full shadow-[0_10px_30px_rgba(255,0,105,0.3)] hover:scale-105 transition-all text-sm uppercase tracking-widest"
              >
                Shop Collection
              </button>
              <button 
                onClick={() => document.getElementById('uv-guide').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-black border border-black/10 font-bold rounded-full hover:bg-black/5 transition-all text-sm uppercase tracking-widest"
              >
                Explore Protection
              </button>
            </motion.div>
          </div>

          {/* Right Side: Luxury Composition */}
          <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[700px] flex items-center justify-center mt-10 lg:mt-0">
            {/* Morning Sunlight Effect */}
            <motion.div 
              animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-10 right-10 w-48 h-48 bg-[#FFD498] rounded-full blur-[80px] z-0"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10 w-full h-full max-w-[500px] flex items-center justify-center"
            >
              <img 
                src={sunscreenHeroImg} 
                alt="COSKINn Sunscreen Model Applying" 
                className="w-full h-full max-h-[600px] object-cover rounded-[3rem] shadow-2xl border-4 border-white/40"
              />
              
              {/* Floating Product Image */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-10 -left-6 md:-left-10 w-40 md:w-48 h-56 md:h-64 bg-white/80 backdrop-blur-xl p-4 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-white flex items-center justify-center"
              >
                <img src={sunscreenProductImg} alt="COSKINn Sunscreen Bottle" className="w-full h-full object-contain" />
              </motion.div>

              {/* Glassmorphism Info Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute top-20 -right-4 md:-right-8 bg-white/70 backdrop-blur-lg px-4 md:px-6 py-4 rounded-2xl shadow-xl border border-white flex items-center gap-4"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-[#FF0069] shadow-sm shrink-0">
                  <Sun size={20} />
                </div>
                <div>
                  <div className="text-xs md:text-sm font-bold text-black whitespace-nowrap">Broad Spectrum</div>
                  <div className="text-[10px] md:text-xs text-gray-500 font-medium whitespace-nowrap">UVA/UVB Defense</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PRODUCT COLLECTION */}
      <section id="product-collection" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-black/10 pb-8 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-black text-black">COSKINn Sunscreen Collection</h2>
            <p className="text-gray-500 mt-2 font-medium">Find your perfect daily protection</p>
          </div>
          
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <select 
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-black outline-none focus:border-[#FF0069] transition-colors cursor-pointer"
            >
              {SORT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>

        {/* Filters */}
        <div className="flex overflow-x-auto hide-scrollbar gap-3 mb-10 pb-4">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeFilter === filter 
                  ? 'bg-[#FF0069] text-white shadow-[0_5px_15px_rgba(255,0,105,0.3)]' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-[#FF0069] hover:text-[#FF0069]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <AnimatePresence>
            {filteredAndSortedSunscreens.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white rounded-[24px] overflow-hidden border border-black/5 hover:border-[#FF0069]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all flex flex-col"
              >
                {/* Product Image Area */}
                <div className="relative aspect-[4/5] bg-theme-secondary/10 overflow-hidden cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {product.discountBadge && (
                      <div className="px-3 py-1 bg-[#FF0069] text-white text-[10px] font-bold tracking-widest rounded-full shadow-lg w-max">
                        {product.discountBadge}
                      </div>
                    )}
                    {product.badge && (
                      <div className="px-3 py-1 bg-black text-white text-[10px] font-bold tracking-widest rounded-full shadow-lg w-max">
                        {product.badge}
                      </div>
                    )}
                  </div>

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
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Quick Actions Hover */}
                  <div className="absolute inset-x-4 bottom-4 translate-y-16 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                      }}
                      className="flex-1 bg-white/90 backdrop-blur-md text-black font-bold py-3 rounded-xl hover:bg-[#FF0069] hover:text-white transition-colors flex items-center justify-center gap-2 text-sm shadow-lg"
                    >
                      <ShoppingBag size={16} /> Add
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product.id}`);
                      }}
                      className="w-12 bg-black/90 backdrop-blur-md text-white font-bold py-3 rounded-xl hover:bg-[#FF0069] transition-colors flex items-center justify-center shadow-lg shrink-0"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5 flex-1 flex flex-col justify-between cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                  <div>
                    <h3 className="font-heading font-bold text-base text-black group-hover:text-[#FF0069] transition-colors mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">SPF 50</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">PA++++</span>
                    </div>
                    
                    <div className="flex items-center gap-1 mb-4">
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-black font-bold text-xs ml-1">{product.rating}</span>
                      </div>
                      <span className="text-gray-400 text-[11px]">({product.reviews})</span>
                    </div>
                  </div>

                  <div className="flex items-end justify-between mt-2 pt-4 border-t border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs line-through">₹{product.originalPrice}</span>
                      <span className="text-lg font-black text-black">₹{product.price}</span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBuyNow(product);
                      }}
                      className="px-4 py-2 bg-black text-white text-xs font-bold rounded-lg hover:bg-[#FF0069] hover:shadow-lg transition-all"
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

      {/* SECTION 3: UV PROTECTION GUIDE */}
      <section id="uv-guide" className="w-full bg-gradient-to-br from-[#FF0069] to-[#FFD498] text-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-black mb-4">The COSKINn Protection Guide</h2>
            <p className="text-white/90 font-medium max-w-2xl mx-auto">Master the art of sun protection with our premium application ritual for flawless, protected skin.</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start relative">
            {/* Connecting Line Desktop */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-white/30 z-0" />
            {/* Connecting Line Mobile */}
            <div className="block md:hidden absolute top-0 bottom-0 left-[3.25rem] w-[2px] bg-white/30 z-0" />

            {[
              { icon: Sun, title: "Apply Before Exposure", desc: "Apply generously 15 minutes before stepping into the sun." },
              { icon: Droplets, title: "Use Two Finger Amount", desc: "Squeeze two lines on your index and middle finger for face & neck." },
              { icon: Clock, title: "Reapply Every 2 Hours", desc: "Maintain protection by reapplying, especially after sweating." },
              { icon: Sparkles, title: "Stay Protected All Day", desc: "Enjoy radiant, shielded skin from morning until sunset." }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="relative z-10 flex flex-row md:flex-col items-center md:text-center gap-6 md:gap-4 w-full md:w-1/4 mb-10 md:mb-0 group cursor-default"
              >
                <div className="w-24 h-24 shrink-0 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center group-hover:bg-white group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] transition-all duration-300 backdrop-blur-sm">
                  <step.icon size={32} className="text-white group-hover:text-[#FF0069] transition-colors" />
                </div>
                <div>
                  <h4 className="text-lg font-bold font-heading mb-2 text-white">{step.title}</h4>
                  <p className="text-sm text-white/90 leading-relaxed max-w-[200px] mx-auto text-left md:text-center">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: FIND YOUR PERFECT SUNSCREEN */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-black text-black mb-4">Find Your Perfect Match</h2>
            <p className="text-gray-500 font-medium">Select your skin type or activity to reveal your ideal COSKINn Sunscreen.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left: Selectors */}
            <div className="w-full lg:w-1/3 flex flex-col gap-3">
              {SKIN_TYPES_RECOMMENDATIONS.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveSkinType(type.id)}
                  className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl transition-all duration-300 font-bold text-left border ${
                    activeSkinType === type.id
                      ? 'bg-black text-white border-black shadow-xl lg:translate-x-2'
                      : 'bg-white text-gray-600 border-black/5 hover:border-[#FF0069] hover:text-[#FF0069]'
                  }`}
                >
                  <span>{type.label}</span>
                  <ChevronRight size={20} className={activeSkinType === type.id ? 'text-[#FF0069]' : 'opacity-0'} />
                </button>
              ))}
            </div>

            {/* Right: Dynamic Recommendations */}
            <div className="w-full lg:w-2/3 min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSkinType}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {recommendedSunscreens.map((product) => (
                    <div key={product.id} className="bg-white rounded-3xl p-4 flex flex-row md:flex-col lg:flex-row gap-4 border border-black/5 hover:border-[#FF0069]/30 hover:shadow-xl transition-all group">
                      <div className="w-2/5 md:w-full lg:w-2/5 aspect-[3/4] rounded-2xl bg-theme-secondary/10 overflow-hidden shrink-0 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="flex flex-col justify-center flex-1 py-2">
                        <div className="text-[10px] font-bold text-[#FF0069] uppercase tracking-widest mb-2">Recommended</div>
                        <h4 className="font-bold text-black mb-1 leading-tight line-clamp-2 cursor-pointer hover:text-[#FF0069] transition-colors" onClick={() => navigate(`/product/${product.id}`)}>
                          {product.name}
                        </h4>
                        <div className="text-xs font-bold text-gray-400 mb-4 flex gap-2 items-center">
                          <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">SPF 50</span>
                        </div>
                        <div className="text-lg font-black text-black mb-4">₹{product.price}</div>
                        
                        <div className="flex gap-2 mt-auto">
                          <button 
                            onClick={() => addToCart(product, 1)}
                            className="flex-1 py-2.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-[#FF0069] shadow-md transition-colors"
                          >
                            Add to Cart
                          </button>
                          <button 
                            onClick={() => toggleWishlist(product)}
                            className="w-10 h-10 flex items-center justify-center border border-black/10 rounded-xl hover:border-[#FF0069] hover:text-[#FF0069] transition-colors shrink-0 bg-gray-50"
                          >
                            <Heart size={16} className={isInWishlist(product.id) ? 'fill-[#FF0069] text-[#FF0069]' : ''} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: COMPLETE YOUR MORNING ROUTINE */}
      <section className="py-24 bg-white overflow-hidden border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-black text-black mb-2">Complete Your Morning Routine</h2>
            <p className="text-gray-500 font-medium">The ultimate 5-step protection ritual for glowing skin.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => scrollCarousel('left')} className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-[#FF0069] hover:text-white hover:border-[#FF0069] transition-all bg-gray-50">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scrollCarousel('right')} className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-[#FF0069] hover:text-white hover:border-[#FF0069] transition-all bg-gray-50">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="w-full relative">
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto gap-6 px-6 md:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pb-10 hide-scrollbar snap-x snap-mandatory"
            style={{ scrollBehavior: 'smooth' }}
          >
            {morningRoutineProducts.map((product, idx) => (
              <div key={product.id} className="w-[260px] md:w-[280px] shrink-0 snap-start flex flex-col group">
                <div className="text-sm font-bold text-[#FF0069] uppercase tracking-widest mb-4 flex items-center justify-between">
                  <span>{product.routineStepLabel}</span>
                  {idx < morningRoutineProducts.length - 1 && <ArrowRight size={16} className="text-gray-300" />}
                </div>
                
                <div className="relative aspect-[4/5] bg-theme-secondary/10 rounded-3xl overflow-hidden mb-5 border border-black/5 group-hover:border-[#FF0069]/30 transition-colors cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                   <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   
                   <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-[#FF0069] hover:bg-white transition-all shadow-sm"
                  >
                    <Heart size={16} className={isInWishlist(product.id) ? 'fill-[#FF0069] text-[#FF0069]' : ''} />
                  </button>
                </div>

                <h3 className="font-bold text-black group-hover:text-[#FF0069] transition-colors mb-1 truncate cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                  {product.name}
                </h3>
                <div className="text-sm font-black text-black mb-4">₹{product.price}</div>
                
                <button 
                  onClick={() => handleBuyNow(product)}
                  className="w-full py-3.5 border-2 border-black rounded-xl font-bold text-sm hover:bg-[#FF0069] hover:border-[#FF0069] hover:text-white transition-all flex items-center justify-center gap-2"
                >
                   Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
