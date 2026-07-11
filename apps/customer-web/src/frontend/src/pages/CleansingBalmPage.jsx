import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Star, ChevronRight, Eye, ChevronDown, ChevronUp, CheckCircle, Quote, ArrowRight, Sparkles, X, Gift } from 'lucide-react';
import { skincareProducts } from '../constants/skincareProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Footer from '../components/common/Footer';

// Image imports matching available assets
import premiumHeroModel from '../assets/images/premium_hero_model.webp';
import premiumBalmJar from '../assets/images/premium_balm_jar.webp';
import cleanserHeroImg from '../assets/images/cleanser_hero_lifestyle.webp';
import cleansingBalmLifestyle from '../assets/images/cleansing_balm_lifestyle.webp';
import cleansingBalmImg from '../assets/images/cleansing_balm.webp';
import sunscreenImg from '../assets/images/sunscreen_spf50.webp';
import faceMistImg from '../assets/images/face_mist.webp';
import gentleCleanserImg from '../assets/images/gentle_cleanser.webp';
import dailyMoisturiserImg from '../assets/images/daily_moisturiser.webp';
import niacinamideSerumImg from '../assets/images/niacinamide_serum.webp';

export default function CleansingBalmPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState('All');
  const [activeSort, setActiveSort] = useState('Popular');
  const [activeFaq, setActiveFaq] = useState(null);
  const [quickViewItem, setQuickViewItem] = useState(null);

  // Carousel slider ref & scroll logic
  const carouselRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter balm variants from our updated constants
  const allBalms = useMemo(() => {
    return skincareProducts.filter(p => p.id === 105 || (p.id >= 1051 && p.id <= 1057));
  }, []);

  const filteredBalms = useMemo(() => {
    let result = [...allBalms];

    // Filter
    if (activeFilter === 'Best Sellers') {
      result = result.filter(p => p.badge === 'VIRAL' || p.badge === 'BEST SELLER');
    } else if (activeFilter === 'New Launches') {
      result = result.filter(p => p.badge === 'NEW LAUNCH');
    } else if (activeFilter === 'Travel Size') {
      result = result.filter(p => p.badge === 'TRAVEL SIZE');
    }

    // Sort
    if (activeSort === 'Newest') {
      result.reverse();
    } else if (activeSort === 'Popular') {
      result.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    } else if (activeSort === 'Price Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'Price High to Low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [allBalms, activeFilter, activeSort]);

  const handleBuyNow = (product) => {
    addToCart(product, 1);
    navigate('/checkout');
  };

  // Timeline Step Data
  const steps = [
    {
      num: "01",
      title: "Scoop Balm",
      desc: "Take a dime-sized amount of the buttery cleansing balm using the dry spatula.",
      icon: "✨"
    },
    {
      num: "02",
      title: "Massage Dry Skin",
      desc: "Massage gently onto dry skin in circular motions. The balm transforms into a silky oil that dissolves makeup.",
      icon: "💆‍♀️"
    },
    {
      num: "03",
      title: "Emulsify & Rinse",
      desc: "Add warm water to emulsify the oil into a milky fluid, then rinse thoroughly and pat dry.",
      icon: "💧"
    }
  ];

  // Carousel product list
  const routineProducts = [
    { id: 105, name: "COSKINn Cleansing Balm", price: 719, originalPrice: 899, rating: 4.9, reviews: 1024, image: cleansingBalmImg },
    { id: 104, name: "COSKINn Gentle Cleanser", price: 499, originalPrice: 699, rating: 4.9, reviews: 4200, image: gentleCleanserImg },
    { id: 109, name: "COSKINn Hydrating Face Mist", price: 449, originalPrice: 599, rating: 4.6, reviews: 1120, image: faceMistImg },
    { id: 114, name: "COSKINn Niacinamide Serum", price: 899, originalPrice: 1199, rating: 4.9, reviews: 2450, image: niacinamideSerumImg },
    { id: 112, name: "COSKINn Daily Moisturiser", price: 649, originalPrice: 849, rating: 4.8, reviews: 2100, image: dailyMoisturiserImg },
    { id: 101, name: "COSKINn Sunscreen SPF 50", price: 699, originalPrice: 899, rating: 4.8, reviews: 3120, image: sunscreenImg }
  ];

  // Reviews Data
  const reviewsList = [
    {
      user: "Sarah M.",
      date: "04 May 2026",
      text: "This balm is an absolute game-changer. It melts away thick waterproof mascara and foundation effortlessly, leaving my skin super soft and hydrated instead of stripped. Worth every rupee!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150"
    },
    {
      user: "Rahul K.",
      date: "12 April 2026",
      text: "Usually, balms clog my combination skin, but the COSKINn Charcoal option is wonderful. Dissolves blackheads and makeup instantly. Highly recommended.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150"
    },
    {
      user: "Preeti S.",
      date: "28 March 2026",
      text: "Very gentle and soothing on my sensitive skin. Emulsifies beautifully and rinses clean without leaving any greasy film behind.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"
    }
  ];

  // FAQ Data
  const faqs = [
    { q: "Can I use this daily?", a: "Yes! The nourishing formulation is designed for daily double-cleansing routines. Use it every evening to remove SPF, sebum, and makeup." },
    { q: "Does it remove waterproof makeup?", a: "Absolutely. It dissolves even the most stubborn waterproof mascara, long-wear foundation, and liquid lipsticks within seconds." },
    { q: "Is it suitable for sensitive skin?", a: "Yes, our Rose Infused and Matcha variations are specifically formulated to soothe sensitive skin, while the standard balm is hypoallergenic and gentle." },
    { q: "Can oily skin use this?", a: "Yes, oil dissolves oil! The Charcoal Balm variation is excellent for oily skin as it balances sebum and cleanses clogged pores." },
    { q: "Will it clog pores?", a: "No, it emulsifies cleanly with water and washes off completely, leaving zero pore-clogging residue behind." },
    { q: "Is it fragrance free?", a: "We offer fragrance-free variations. The standard balm has a very subtle, natural citrus aroma from plant seed extracts, while our Rose version contains gentle damascena wax." }
  ];

  // Scroll utilities for routine builder carousel
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const offset = direction === 'left' ? -350 : 350;
      carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-theme-bg overflow-x-hidden font-sans text-theme-text">
      
      {/* SECTION 1 — PREMIUM LUXURY HERO */}
      <section className="relative w-full min-h-[90vh] flex items-center bg-[#FAFAFA] overflow-hidden pt-[140px] lg:pt-[150px] pb-20">
        
        {/* Abstract Luxury Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Soft pink radial glow */}
          <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[70%] rounded-full bg-gradient-to-bl from-[#FF0069]/10 to-transparent blur-[120px]" />
          
          {/* Peach highlight glow */}
          <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-gradient-to-tr from-[#FFD498]/20 to-transparent blur-[100px]" />
          
          {/* Glassmorphism abstract shape */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] left-[40%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] border border-white/40 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-3xl opacity-50"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10 h-full w-full">
          
          {/* LEFT SIDE CONTENT */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start text-left pt-12 lg:pt-0"
          >
            {/* Breadcrumbs */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-black/50 tracking-wide mb-6 lg:mb-8">
              <Link to="/" className="hover:text-[#FF0069] transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 text-black/25" />
              <Link to="/skincare" className="hover:text-[#FF0069] transition-colors">Skincare</Link>
              <ChevronRight className="w-3 h-3 text-black/25" />
              <span className="text-black font-bold truncate">Cleansing Balms</span>
            </div>

            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/5 bg-white/80 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-xs font-bold tracking-[0.2em] uppercase mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF0069] shadow-[0_0_8px_rgba(255,0,105,0.6)] animate-pulse"></span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-black/70">New COSKINn Collection</span>
            </motion.div>
            
            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-heading font-black text-black leading-[1.05] tracking-tight mb-6">
              COSKINn<br/>
              <span className="font-light italic tracking-normal text-black/80 font-serif">Cleansing Balm</span>
            </h1>
            
            {/* Tagline */}
            <h2 className="text-xl sm:text-2xl font-body font-medium text-[#FF0069] leading-relaxed mb-6">
              Melt Away Makeup.<br/>
              Reveal Naturally Radiant Skin.
            </h2>
            
            {/* Description */}
            <p className="text-base sm:text-lg text-black/60 mb-8 max-w-[420px] leading-relaxed font-normal">
              A transformative buttery formula that effortlessly dissolves impurities, SPF, and stubborn waterproof makeup while cocooning your skin in deep, barrier-restoring hydration.
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-8 bg-white/60 backdrop-blur-md py-2 px-4 rounded-full border border-white/80 shadow-sm">
              <div className="flex items-center text-[#FFD498]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current drop-shadow-sm" />)}
              </div>
              <span className="text-sm font-bold text-black/80">4.9 <span className="text-black/40 font-normal">| 8,500+ Reviews</span></span>
            </div>

            {/* Price */}
            <div className="text-3xl font-heading font-black text-black mb-10 flex items-baseline gap-2">
              <span className="text-xs tracking-widest text-black/40 font-body uppercase font-bold">Starting from</span>
              ₹799
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
              <button 
                onClick={() => document.getElementById('collection').scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="group relative overflow-hidden w-full sm:w-auto px-10 py-4 btn-primary-skincare font-bold uppercase tracking-[0.15em] text-[11px]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Shop Collection
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              </button>
              
              <button 
                onClick={() => document.getElementById('how-to-use').scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="w-full sm:w-auto px-10 py-4 btn-secondary-skincare font-bold uppercase tracking-[0.15em] text-[11px] mt-4 sm:mt-0"
              >
                Learn More
              </button>
            </div>
          </motion.div>

          {/* RIGHT SIDE CAMPAIGN COMPOSITION */}
          <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-full min-h-[500px] flex items-center justify-center lg:justify-end">
            
            {/* Background glowing aura behind model */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#FFD498]/20 rounded-full blur-[100px] z-0" />
            
            {/* Main Model Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="relative w-[90%] sm:w-[80%] lg:w-[95%] h-[85%] lg:h-[90%] rounded-t-full rounded-b-[40px] overflow-hidden border-[6px] border-white/80 shadow-[0_30px_80px_rgba(0,0,0,0.1)] z-10 group"
            >
              <img 
                src={premiumHeroModel} 
                alt="Luxury Skincare Model" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Soft overlay gradient for premium feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Foreground Floating Product Jar */}
            <motion.div
              initial={{ opacity: 0, y: 50, x: -30 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="absolute -bottom-10 -left-4 sm:left-4 lg:-left-12 z-30 w-48 sm:w-56 lg:w-72"
            >
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                {/* Glow behind product */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-[#FF0069]/20 rounded-full blur-2xl z-0" />
                
                {/* Glassmorphism pedestal */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-16 bg-white/30 backdrop-blur-md rounded-[100%] border border-white/50 shadow-xl z-10" />
                
                <img 
                  src={premiumBalmJar} 
                  alt="COSKINn Premium Cleansing Balm Jar" 
                  className="relative w-full object-contain z-20 drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
                />
              </motion.div>
            </motion.div>

            {/* Floating Luxury Elements */}
            {/* Petal 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="absolute top-1/4 -right-6 z-20 w-16 h-16 bg-gradient-to-br from-[#FF0069]/20 to-transparent backdrop-blur-sm rounded-[100%_0_100%_0] border border-white/40 rotate-12"
            >
              <motion.div 
                animate={{ y: [-15, 15, -15], rotate: [12, -5, 12] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-full"
              />
            </motion.div>

            {/* Petal 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute bottom-1/4 right-8 z-20 w-10 h-10 bg-gradient-to-bl from-[#FFD498]/40 to-transparent backdrop-blur-md rounded-[0_100%_0_100%] border border-white/50 -rotate-45"
            >
              <motion.div 
                animate={{ y: [10, -10, 10], rotate: [-45, -20, -45] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-full"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 2 — PRODUCT COLLECTION */}
      <section id="products-grid" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-24">
        
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-black/5 pb-10">
          <div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-black tracking-tight mb-3">Cleansing Balm Collection</h2>
            <p className="text-black/60 font-medium max-w-xl">Browse our viral melting cleansing balms, customized for all skin concerns and sizes.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <select 
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
              className="bg-white border-2 border-black/10 rounded-2xl px-5 py-3 text-sm font-bold text-black outline-none focus:border-[#FF0069] transition-all shadow-sm w-full sm:w-56"
            >
              <option>Popular</option>
              <option>Newest</option>
              <option>Price Low to High</option>
              <option>Price High to Low</option>
            </select>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-8 mb-12 border-b border-black/5">
          {['All', 'Best Sellers', 'New Launches', 'Travel Size'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeFilter === filter ? 'bg-[#FF0069] text-white shadow-lg shadow-[#FF0069]/20' : 'bg-white text-black/60 border border-black/5 hover:border-[#FF0069] hover:text-[#FF0069]'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredBalms.map((product) => {
              const isLowStock = product.stock <= 100;
              const isOutOfStock = product.stock === 0;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={product.id}
                  className="group relative bg-white rounded-[2rem] p-5 shadow-[0_5px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 border border-black/5 transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    {/* Badge */}
                    <div className="absolute top-8 left-8 z-10 flex flex-col gap-2">
                      {product.badge && (
                        <span className="px-3.5 py-1.5 bg-[#FF0069] text-white text-[10px] font-black tracking-widest uppercase rounded-full shadow-lg">
                          {product.badge}
                        </span>
                      )}
                      {product.discountBadge && (
                        <span className="px-3.5 py-1.5 bg-[#FF0069] text-white text-[10px] font-black tracking-widest uppercase rounded-full shadow-lg">
                          {product.discountBadge}
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button 
                      onClick={() => toggleWishlist(product)}
                      className={`absolute top-8 right-8 z-10 w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${isInWishlist(product.id) ? 'bg-white text-[#FF0069]' : 'bg-white/80 text-black/40 hover:text-[#FF0069] hover:bg-white'}`}
                    >
                      <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                    </button>

                    {/* Product Image Area */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-pink-50/10 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                      <img 
                        loading="lazy" 
                        decoding="async" 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                      />
                      
                      {/* Quick View Button Overlay */}
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewItem(product);
                          }}
                          className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#FF0069] hover:text-white transition-colors duration-300 flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 shadow-xl"
                        >
                          <Eye className="w-4 h-4" /> Quick View
                        </button>
                      </div>
                    </div>

                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-1.5 mb-2 px-2 text-yellow-400">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-bold text-black/60">{product.rating} ({product.reviews} Reviews)</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading font-black text-xl leading-tight mb-2 text-black px-2 group-hover:text-[#FF0069] transition-colors line-clamp-1" onClick={() => navigate(`/product/${product.id}`)}>
                      {product.name}
                    </h3>
                    
                    {/* Short Desc */}
                    <p className="text-xs text-black/50 px-2 line-clamp-2 mb-4 leading-relaxed font-medium">
                      {product.shortDescription}
                    </p>

                    {/* Stock Status */}
                    <div className="px-2 mb-4 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider">
                      {isOutOfStock ? (
                        <span className="text-red-500">Out of Stock</span>
                      ) : isLowStock ? (
                        <span className="text-amber-500">Only Few Left ({product.stock})</span>
                      ) : (
                        <span className="text-green-500">In Stock</span>
                      )}
                    </div>
                  </div>

                  {/* Price and Buttons */}
                  <div className="border-t border-black/5 pt-4 mt-2 px-2 flex flex-col gap-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-heading font-black text-black">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-black/40 line-through font-bold">₹{product.originalPrice}</span>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <button 
                        onClick={() => addToCart(product, 1)}
                        className="flex-1 py-3 btn-secondary-skincare font-bold uppercase tracking-widest text-[10px]"
                      >
                        Add to Cart
                      </button>
                      <button 
                        onClick={() => handleBuyNow(product)}
                        className="flex-1 py-3 btn-primary-skincare font-bold uppercase tracking-widest text-[10px]"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION 3 — HOW TO USE */}
      <section id="how-to-use" className="w-full py-24 bg-white border-t border-b border-black/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-20">
            <h4 className="text-xs font-bold text-[#FF0069] tracking-[0.25em] uppercase mb-4">Cleansing Ritual</h4>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-black">How To Melt Away Makeup</h2>
            <p className="text-black/60 font-medium max-w-md mx-auto mt-4">Follow these simple steps for perfectly emulsified, clean, and plump skin.</p>
          </div>

          {/* Desktop Timeline (Horizontal) */}
          <div className="hidden lg:grid grid-cols-3 gap-12 relative">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-100 via-theme-secondary/40 to-pink-100 -translate-y-8 z-0" />
            
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8 }}
                className="flex flex-col items-center text-center group relative z-10"
              >
                <div className="w-20 h-20 rounded-full border-4 border-white bg-pink-50 shadow-md flex items-center justify-center mb-8 text-3xl font-bold text-[#FF0069] transition-transform duration-500 group-hover:scale-110 group-hover:bg-[#FF0069] group-hover:text-white">
                  {step.icon}
                </div>
                <span className="text-xs font-heading font-black text-theme-primary mb-2">Step {step.num}</span>
                <h4 className="text-xl font-heading font-black text-black mb-3">{step.title}</h4>
                <p className="text-sm text-black/60 leading-relaxed max-w-xs font-medium">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Mobile Timeline (Vertical) */}
          <div className="flex lg:hidden flex-col gap-10 pl-6 border-l-2 border-pink-100 relative">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative flex flex-col items-start"
              >
                <div className="absolute -left-[45px] top-0 w-10 h-10 rounded-full border-2 border-white bg-pink-50 flex items-center justify-center text-lg font-bold text-[#FF0069]">
                  {step.icon}
                </div>
                <span className="text-[10px] font-bold text-theme-primary mb-1 uppercase tracking-wider">Step {step.num}</span>
                <h4 className="text-lg font-bold text-black mb-2">{step.title}</h4>
                <p className="text-sm text-black/60 leading-relaxed font-medium">{step.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4 — COMPLETE YOUR ROUTINE */}
      <section className="w-full py-24 bg-gradient-to-b from-transparent to-pink-50/10 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
          <div>
            <h4 className="text-xs font-bold text-[#FF0069] tracking-[0.25em] uppercase mb-4">Complete Routine</h4>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-black">Perfect Double Cleanse</h2>
            <p className="text-black/60 font-medium">Coordinate these luxury steps for maximum efficacy.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => scrollCarousel('left')}
              className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center bg-white hover:bg-[#FF0069] hover:text-white hover:border-transparent transition-all shadow-sm"
              aria-label="Scroll left"
            >
              ←
            </button>
            <button 
              onClick={() => scrollCarousel('right')}
              className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center bg-white hover:bg-[#FF0069] hover:text-white hover:border-transparent transition-all shadow-sm"
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>

        <div 
          ref={carouselRef}
          className="w-full overflow-x-auto hide-scrollbar pb-8 pt-4 px-6 snap-x snap-mandatory scroll-smooth"
        >
          <div className="flex gap-6 min-w-max ml-[5vw] lg:ml-[max(5vw,calc((100vw-80rem)/2))] pr-24">
            {routineProducts.map((item, idx) => (
              <div 
                key={item.id}
                className="group w-[280px] md:w-[320px] bg-white rounded-3xl p-4 flex flex-col border border-black/5 shadow-md hover:shadow-xl transition-all duration-300 flex-shrink-0 snap-start"
              >
                {/* Image */}
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-5 bg-pink-50/10 cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  {/* Wishlist Button */}
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(item); }}
                    className={`absolute top-4 right-4 w-9 h-9 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors shadow-sm ${isInWishlist(item.id) ? 'bg-white text-[#FF0069]' : 'bg-white/80 text-black/40 hover:text-[#FF0069] hover:bg-white'}`}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(item.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                
                {/* Details */}
                <div className="flex flex-col flex-1 text-center">
                  <h4 className="font-heading font-black text-md mb-2 group-hover:text-[#FF0069] transition-colors cursor-pointer truncate" onClick={() => navigate(`/product/${item.id}`)}>{item.name}</h4>
                  <div className="flex items-center justify-center gap-1.5 text-yellow-400 mb-3 text-xs">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-black font-bold">{item.rating} ({item.reviews})</span>
                  </div>
                  
                  <div className="font-heading font-black text-[#FF0069] text-lg mt-auto mb-4">₹{item.price}</div>
                  
                  <button
                    onClick={() => addToCart(item, 1)}
                    className="w-full py-3 btn-primary-skincare font-bold uppercase tracking-widest text-[10px]"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — CUSTOMER REVIEWS + FAQ */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-black/5">
        
        {/* Left Side: Reviews */}
        <div className="flex flex-col">
          <h3 className="text-3xl font-heading font-black text-black mb-8">Customer Reviews</h3>
          
          <div className="flex items-center gap-6 mb-10 bg-pink-50/20 border border-pink-100/30 rounded-3xl p-6">
            <div className="text-center shrink-0 border-r border-black/5 pr-6">
              <div className="text-5xl font-heading font-black text-black leading-none mb-2">4.9</div>
              <div className="flex text-yellow-400 justify-center mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-xs text-gray-500 font-bold">1,024 Reviews</span>
            </div>
            
            {/* Rating distribution list */}
            <div className="flex-1 flex flex-col gap-2">
              {[
                { stars: 5, pct: "94%" },
                { stars: 4, pct: "5%" },
                { stars: 3, pct: "1%" },
                { stars: 2, pct: "0%" },
                { stars: 1, pct: "0%" }
              ].map((row) => (
                <div key={row.stars} className="flex items-center gap-3 text-xs">
                  <span className="w-3 font-bold">{row.stars}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 rounded-full" style={{ width: row.pct }} />
                  </div>
                  <span className="w-8 text-gray-400 font-medium text-right">{row.pct}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {reviewsList.map((review, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold text-black text-sm flex items-center gap-1.5">
                        {review.user}
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-0.5">
                          ✓ Verified
                        </span>
                      </h4>
                      <span className="text-xs text-black/40 font-bold">{review.date}</span>
                    </div>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                </div>
                <p className="text-sm text-black/70 leading-relaxed font-medium">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: FAQ Accordion */}
        <div className="flex flex-col">
          <h3 className="text-3xl font-heading font-black text-black mb-8">Frequently Asked Questions</h3>
          
          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-black/5 overflow-hidden transition-all shadow-sm">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none bg-gray-50/50"
                >
                  <span className="font-bold text-black text-base">{faq.q}</span>
                  {activeFaq === idx ? (
                    <ChevronUp className="text-[#FF0069] w-5 h-5 shrink-0" />
                  ) : (
                    <ChevronDown className="text-black/30 w-5 h-5 shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 py-5 text-sm text-black/70 leading-relaxed font-medium border-t border-black/5 bg-white"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* QUICK VIEW MODAL OVERLAY */}
      <AnimatePresence>
        {quickViewItem && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/45 backdrop-blur-sm"
              onClick={() => setQuickViewItem(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl p-6 overflow-hidden flex flex-col font-sans z-10 border border-black/5"
            >
              <button 
                onClick={() => setQuickViewItem(null)} 
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
              >
                <X size={16} />
              </button>
              
              <div className="flex gap-6 items-start mt-4">
                <div className="w-1/3 aspect-square bg-pink-50/20 rounded-2xl overflow-hidden border border-pink-100/30 shrink-0">
                  <img src={quickViewItem.image} alt={quickViewItem.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] bg-pink-50 text-[#FF0069] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">COSKINn Skincare</span>
                  <h3 className="text-lg font-bold text-black mt-2 leading-tight truncate">
                    {quickViewItem.name}
                  </h3>
                  <p className="text-xl font-bold text-black mt-2">₹{quickViewItem.price}</p>
                  <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                    {quickViewItem.longDescription || quickViewItem.shortDescription}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button 
                  onClick={() => { addToCart(quickViewItem, 1); setQuickViewItem(null); }}
                  className="flex-1 py-3 bg-[#FF0069] hover:bg-[#D40057] text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all shadow-sm"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => { handleBuyNow(quickViewItem); setQuickViewItem(null); }}
                  className="flex-1 py-3 bg-pink-50 text-[#FF0069] hover:bg-pink-100/50 font-bold rounded-xl text-xs uppercase tracking-widest transition-all"
                >
                  Buy Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
