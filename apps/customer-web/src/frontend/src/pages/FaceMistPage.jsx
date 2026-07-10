import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag, Heart, Star, ChevronRight, Eye, ChevronLeft,
  Droplets, Sparkles, Sun, Moon, Briefcase, Plane, Brush
} from 'lucide-react';
import { skincareProducts } from '../constants/skincareProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Footer from '../components/common/Footer';

import faceMistImg from '../assets/images/face_mist.webp';
import faceMistLifestyleImg from '../assets/images/face_mist_lifestyle.webp';

// ─── Constants ────────────────────────────────────────────────────────────────
const FILTERS = ['All', 'Hydrating', 'Glow Boosting', 'Rose', 'Aloe Vera', 'Vitamin C', 'Travel Size'];
const SORT_OPTIONS = ['Popular', 'Newest', 'Price Low to High', 'Price High to Low'];

const USAGE_OCCASIONS = [
  {
    id: 'morning',
    icon: Sun,
    emoji: '🌞',
    label: 'Morning Routine',
    why: 'Start your day with an instant hydration reset. The lightweight mist refreshes skin, primes it for serum absorption, and gives you that coveted just-woke-up dewy glow.',
    benefit: 'Hydration + Glow Prep',
    matchBadges: ['BEST SELLER', 'GLOW BOOSTER'],
  },
  {
    id: 'before-makeup',
    icon: Brush,
    emoji: '💄',
    label: 'Before Makeup',
    why: 'A light spritz before foundation creates a smooth, hydrated canvas that helps makeup apply more evenly and last significantly longer throughout the day.',
    benefit: 'Smooth Canvas + Makeup Longevity',
    matchBadges: ['GLOW BOOSTER', 'NEW LAUNCH'],
  },
  {
    id: 'after-makeup',
    icon: Sparkles,
    emoji: '✨',
    label: 'After Makeup',
    why: 'Set your finished look and melt away that powdery finish. A setting mist blends your makeup seamlessly and adds a natural, skin-like finish for hours.',
    benefit: 'Makeup Setting + Natural Finish',
    matchBadges: ['BEST SELLER', 'REFRESHING'],
  },
  {
    id: 'office',
    icon: Briefcase,
    emoji: '🏢',
    label: 'During Office',
    why: 'Combat screen dryness and air-conditioned environments. A mid-day mist revives tired, dehydrated skin without disturbing your makeup.',
    benefit: 'Instant Refresh + Anti-dryness',
    matchBadges: ['ANTIOXIDANT', 'SOOTHING'],
  },
  {
    id: 'travel',
    icon: Plane,
    emoji: '✈',
    label: 'During Travel',
    why: 'Aircraft cabin air is notoriously dehydrating. Keep a travel-size mist in your carry-on to counteract cabin dehydration and arrive glowing.',
    benefit: 'Cabin Hydration + Compact',
    matchBadges: ['TRAVEL SIZE', 'SOOTHING'],
  },
  {
    id: 'night',
    icon: Moon,
    emoji: '🌙',
    label: 'Night Routine',
    why: 'Prep your skin for overnight regeneration. A night mist helps seal in moisture before your heavier treatments and supports the skin\'s natural repair cycle.',
    benefit: 'Overnight Repair + Deep Hydration',
    matchBadges: ['NIGHT RITUAL', 'SOOTHING'],
  },
];

const BENEFITS = [
  {
    id: 'hydration',
    emoji: '💧',
    title: '24-Hour Hydration',
    short: 'Hyaluronic acid locks moisture in all day.',
    detail: 'Our multi-weight hyaluronic acid complex penetrates all layers of the skin to deliver deep, lasting hydration that lasts up to 24 hours. Plumper, bouncier skin from the very first spray.',
  },
  {
    id: 'glow',
    emoji: '✨',
    title: 'Instant Glow',
    short: 'Niacinamide and antioxidants for radiance.',
    detail: 'A potent combination of niacinamide, Vitamin C, and light-reflecting particles work synergistically to brighten your complexion, fade dark spots, and deliver that coveted glass-skin luminosity.',
  },
  {
    id: 'botanical',
    emoji: '🌿',
    title: 'Botanical Ingredients',
    short: 'Pure plant extracts, no harsh chemicals.',
    detail: 'We source only certified organic botanical extracts — rose water, green tea, aloe vera, chamomile — to deliver nature\'s best in every bottle. Free from parabens, sulfates, and synthetic dyes.',
  },
  {
    id: 'lightweight',
    emoji: '🌸',
    title: 'Lightweight Formula',
    short: 'Never heavy, never sticky. Just refreshed.',
    detail: 'Our ultra-fine micro-mist technology delivers a weightless veil of hydration that absorbs instantly. No heaviness, no white residue — just fresh, comfortable skin you can feel in seconds.',
  },
  {
    id: 'barrier',
    emoji: '🛡',
    title: 'Skin Barrier Support',
    short: 'Ceramides strengthen your skin\'s shield.',
    detail: 'Ceramides and panthenol work together to reinforce your skin\'s natural barrier, reducing moisture loss and protecting against environmental stressors like pollution and harsh weather.',
  },
  {
    id: 'refresh',
    emoji: '🌬',
    title: 'Refresh Anytime',
    short: 'On-the-go hydration, no rinse needed.',
    detail: 'Designed for real life. Spritz over bare skin or makeup alike, morning, noon or night. The no-rinse formula means you can refresh your skin anywhere — desk, gym, flight, or festival.',
  },
];

const HYDRATION_ROUTINE = [
  { id: 104, step: '1. Cleanse' },
  { id: 109, step: '2. Face Mist' },
  { id: 114, step: '3. Serum' },
  { id: 112, step: '4. Moisturise' },
  { id: 109, step: '5. Final Mist' },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function FaceMistPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState('All');
  const [activeSort, setActiveSort] = useState('Popular');
  const [activeOccasion, setActiveOccasion] = useState('morning');
  const [expandedBenefit, setExpandedBenefit] = useState(null);
  const carouselRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const allFaceMists = useMemo(() =>
    skincareProducts.filter(p => p.name.toLowerCase().includes('mist') || p.name.toLowerCase().includes('face mist')),
  []);

  const filtered = useMemo(() => {
    let result = [...allFaceMists];
    if (activeFilter !== 'All') {
      const map = {
        'Hydrating': p => p.benefits?.some(b => b.toLowerCase().includes('hydrat')),
        'Glow Boosting': p => p.benefits?.some(b => b.toLowerCase().includes('glow')),
        'Rose': p => p.name.toLowerCase().includes('rose') || p.keyIngredients?.some(i => i.toLowerCase().includes('rose')),
        'Aloe Vera': p => p.keyIngredients?.some(i => i.toLowerCase().includes('aloe')),
        'Vitamin C': p => p.keyIngredients?.some(i => i.toLowerCase().includes('vitamin c')),
        'Travel Size': p => p.badge === 'TRAVEL SIZE' || p.name.toLowerCase().includes('mini') || p.name.toLowerCase().includes('travel'),
      };
      if (map[activeFilter]) result = result.filter(map[activeFilter]);
    }
    switch (activeSort) {
      case 'Price Low to High': result.sort((a, b) => a.price - b.price); break;
      case 'Price High to Low': result.sort((a, b) => b.price - a.price); break;
      case 'Newest': result.sort((a, b) => b.id - a.id); break;
      default: result.sort((a, b) => b.reviews - a.reviews);
    }
    return result;
  }, [allFaceMists, activeFilter, activeSort]);

  const occasionData = useMemo(() => {
    const occ = USAGE_OCCASIONS.find(o => o.id === activeOccasion);
    let recs = allFaceMists.filter(p => occ.matchBadges.includes(p.badge));
    if (!recs.length) recs = allFaceMists.slice(0, 3);
    return { occ, recs: recs.slice(0, 4) };
  }, [allFaceMists, activeOccasion]);

  const routineProducts = useMemo(() =>
    HYDRATION_ROUTINE.map(r => ({
      ...skincareProducts.find(p => p.id === r.id),
      step: r.step,
    })).filter(p => p.id),
  []);

  const handleBuyNow = (product) => { addToCart(product, 1); navigate('/checkout'); };

  // Drag-to-scroll carousel
  const onMouseDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.pageX - carouselRef.current.offsetLeft;
    dragScrollLeft.current = carouselRef.current.scrollLeft;
    carouselRef.current.style.cursor = 'grabbing';
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    carouselRef.current.scrollLeft = dragScrollLeft.current - (x - dragStartX.current) * 1.5;
  };
  const onMouseUp = () => { isDragging.current = false; if (carouselRef.current) carouselRef.current.style.cursor = 'grab'; };

  const scrollCarousel = (dir) => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-theme-bg overflow-x-hidden font-sans text-theme-text mt-[72px]">

      {/* Breadcrumbs */}
      <div className="w-full border-b border-black/5 bg-white/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-xs font-medium text-black/50 tracking-wide">
          <Link to="/" className="hover:text-[#FF0069] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/skincare" className="hover:text-[#FF0069] transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black font-bold">Face Care</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#FF0069] font-bold">COSKINn Face Mist</span>
        </div>
      </div>

      {/* ══ SECTION 1: HERO ══════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[600px] lg:min-h-[88vh] bg-gradient-to-br from-[#FFF0F5] via-[#FFF8F0] to-[#FFEDE8] overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#FF0069]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#FFD498]/25 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/30 rounded-full blur-[80px]" />
        </div>

        {/* Mist particle effects */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/60 pointer-events-none"
            style={{
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [-20, 20, -20], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 }}
          />
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 lg:py-20 flex flex-col lg:flex-row items-center gap-12">

          {/* LEFT */}
          <div className="w-full lg:w-1/2 flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-white shadow-sm mb-6"
            >
              <span className="w-2 h-2 bg-[#FF0069] rounded-full animate-pulse" />
              <span className="text-[11px] font-bold tracking-widest text-[#FF0069] uppercase">New Hydration Essential</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-black leading-[1.0] mb-5"
            >
              COSKINn<br />
              <span className="text-[#FF0069]">Face Mist</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
              className="text-2xl md:text-3xl font-heading font-bold text-gray-700 mb-5 leading-tight"
            >
              Refresh.<br />Hydrate.<br />
              <span className="text-[#FF0069]">Glow Anytime.</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
              className="text-base text-gray-600 leading-relaxed mb-6 max-w-lg"
            >
              Instantly refresh and hydrate your skin with the lightweight COSKINn Face Mist enriched with botanical extracts for a healthy radiant glow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center gap-3 mb-5 bg-white/60 backdrop-blur-sm py-2.5 px-4 rounded-2xl border border-white/80 w-max"
            >
              <div className="flex text-[#FF0069]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="font-bold text-black">4.9</span>
              <span className="text-gray-500 text-sm">(7,500+ Reviews)</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-8"
            >
              <span className="text-xs text-gray-500 uppercase tracking-widest font-bold block">Starting from</span>
              <span className="text-3xl font-black text-black">₹499</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => document.getElementById('collection').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-[#FF0069] text-white font-bold rounded-full shadow-[0_10px_30px_rgba(255,0,105,0.35)] hover:scale-105 hover:shadow-[0_14px_40px_rgba(255,0,105,0.45)] transition-all text-sm uppercase tracking-widest"
              >
                Shop Collection
              </button>
              <button
                onClick={() => document.getElementById('when-to-use').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-black font-bold rounded-full border border-black/10 hover:bg-black/5 transition-all text-sm uppercase tracking-widest"
              >
                Discover Refreshment
              </button>
            </motion.div>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-1/2 relative flex items-center justify-center h-[480px] lg:h-[680px]">
            {/* Glow */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 m-auto w-80 h-80 bg-gradient-to-br from-[#FF0069]/20 to-[#FFD498]/30 rounded-full blur-[80px]"
            />

            {/* Lifestyle image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: 'easeOut' }}
              className="relative z-10 w-full h-full max-w-[480px]"
            >
              <img
                src={faceMistLifestyleImg}
                alt="COSKINn Face Mist Lifestyle"
                className="w-full h-full object-cover rounded-[3rem] shadow-2xl border-4 border-white/50"
              />

              {/* Floating product bottle */}
              <motion.div
                animate={{ y: [-12, 12, -12] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-10 -left-8 w-36 md:w-44 bg-white/80 backdrop-blur-xl p-3 rounded-3xl shadow-2xl border border-white flex items-center justify-center"
                style={{ height: '200px' }}
              >
                <img src={faceMistImg} alt="COSKINn Face Mist Bottle" className="w-full h-full object-contain" />
              </motion.div>

              {/* Droplet badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute top-16 -right-4 md:-right-8 bg-white/80 backdrop-blur-lg px-5 py-4 rounded-2xl shadow-xl border border-white flex items-center gap-3"
              >
                <div className="w-11 h-11 bg-gradient-to-br from-[#FF0069] to-[#FFD498] rounded-full flex items-center justify-center shrink-0 shadow">
                  <Droplets size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-black whitespace-nowrap">Botanical Mist</div>
                  <div className="text-[11px] text-gray-500 whitespace-nowrap">24-Hour Hydration</div>
                </div>
              </motion.div>

              {/* Mist particle dots decoration */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#FF0069]/40 pointer-events-none"
                  style={{ top: `${20 + i * 12}%`, right: `${10 + (i % 3) * 8}%` }}
                  animate={{ y: [-8, 8, -8], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 2: PRODUCT COLLECTION ════════════════════════════════════ */}
      <section id="collection" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10 border-b border-black/8 pb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-black text-black">COSKINn Face Mist Collection</h2>
            <p className="text-gray-500 mt-2 font-medium">{filtered.length} products · Instant hydration, anytime</p>
          </div>
          <select
            value={activeSort}
            onChange={e => setActiveSort(e.target.value)}
            className="px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-black outline-none focus:border-[#FF0069] transition-colors cursor-pointer"
          >
            {SORT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        {/* Filters */}
        <div className="flex overflow-x-auto hide-scrollbar gap-3 mb-10 pb-2">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeFilter === f
                ? 'bg-[#FF0069] text-white shadow-[0_5px_15px_rgba(255,0,105,0.3)]'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-[#FF0069] hover:text-[#FF0069]'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filtered.map(product => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-[24px] overflow-hidden border border-black/5 hover:border-[#FF0069]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all flex flex-col"
              >
                {/* Image */}
                <div
                  className="relative aspect-[4/5] bg-[#FFF5F8] overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {product.discountBadge && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#FF0069] text-white text-[10px] font-bold tracking-widest rounded-full shadow w-max">
                      {product.discountBadge}
                    </div>
                  )}
                  {product.badge && (
                    <div className="absolute top-10 left-4 z-10 mt-1 px-3 py-1 bg-black text-white text-[10px] font-bold tracking-widest rounded-full shadow w-max">
                      {product.badge}
                    </div>
                  )}

                  <button
                    onClick={e => { e.stopPropagation(); toggleWishlist(product); }}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-[#FF0069] hover:bg-white transition-all shadow-sm"
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-[#FF0069] text-[#FF0069]' : ''}`} />
                  </button>

                  <img
                    src={product.image} alt={product.name} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Quick actions */}
                  <div className="absolute inset-x-4 bottom-4 translate-y-16 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-2">
                    <button
                      onClick={e => { e.stopPropagation(); addToCart(product, 1); }}
                      className="flex-1 bg-white/90 backdrop-blur-md text-black font-bold py-3 rounded-xl hover:bg-[#FF0069] hover:text-white transition-colors flex items-center justify-center gap-2 text-sm shadow-lg"
                    >
                      <ShoppingBag size={15} /> Add
                    </button>
                    <button
                      onClick={e => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
                      className="w-12 bg-black/90 backdrop-blur-md text-white rounded-xl hover:bg-[#FF0069] transition-colors flex items-center justify-center shadow-lg shrink-0"
                    >
                      <Eye size={15} />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div
                  className="p-5 flex-1 flex flex-col cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <h3 className="font-heading font-bold text-sm text-black group-hover:text-[#FF0069] transition-colors mb-2 line-clamp-2 leading-snug">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-auto">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold text-black">{product.rating}</span>
                    <span className="text-gray-400 text-[11px]">({product.reviews})</span>
                  </div>

                  <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-gray-400 text-xs line-through block">₹{product.originalPrice}</span>
                      <span className="text-lg font-black text-black">₹{product.price}</span>
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); handleBuyNow(product); }}
                      className="px-4 py-2 bg-black text-white text-xs font-bold rounded-xl hover:bg-[#FF0069] hover:shadow-lg transition-all"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="col-span-4 text-center py-20 text-gray-400 font-medium">
              No products match this filter. <button onClick={() => setActiveFilter('All')} className="text-[#FF0069] font-bold underline ml-1">Show All</button>
            </div>
          )}
        </div>
      </section>

      {/* ══ SECTION 3: WHEN TO USE ════════════════════════════════════════════ */}
      <section id="when-to-use" className="w-full bg-gradient-to-br from-[#FFF5F8] to-[#FFF8F0] py-24 border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-black text-black mb-3">When To Use Your Face Mist</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">
              Face mist is your skin's best friend — anytime, anywhere. Choose your moment below.
            </p>
          </div>

          {/* Occasion Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-14">
            {USAGE_OCCASIONS.map(occ => (
              <button
                key={occ.id}
                onClick={() => setActiveOccasion(occ.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all font-bold text-sm text-center ${activeOccasion === occ.id
                  ? 'border-[#FF0069] bg-white shadow-[0_8px_24px_rgba(255,0,105,0.15)] text-[#FF0069] scale-105'
                  : 'border-black/5 bg-white text-gray-600 hover:border-[#FF0069]/40 hover:text-[#FF0069]'}`}
              >
                <span className="text-3xl">{occ.emoji}</span>
                <span className="text-xs leading-tight">{occ.label}</span>
              </button>
            ))}
          </div>

          {/* Dynamic Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeOccasion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex flex-col lg:flex-row gap-10"
            >
              {/* Why panel */}
              <div className="w-full lg:w-2/5 bg-white rounded-3xl p-8 border border-black/5 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-5xl mb-5">{occasionData.occ.emoji}</div>
                  <h3 className="text-2xl font-heading font-black text-black mb-3">{occasionData.occ.label}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{occasionData.occ.why}</p>
                </div>
                <div className="inline-flex items-center gap-2 bg-[#FF0069]/8 px-4 py-2.5 rounded-full">
                  <Sparkles size={14} className="text-[#FF0069]" />
                  <span className="text-xs font-bold text-[#FF0069]">{occasionData.occ.benefit}</span>
                </div>
              </div>

              {/* Recommended products */}
              <div className="w-full lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {occasionData.recs.map(product => (
                  <div key={product.id} className="bg-white rounded-3xl p-4 flex gap-4 border border-black/5 hover:border-[#FF0069]/30 hover:shadow-xl transition-all group">
                    {/* Product image with wishlist on top-right */}
                    <div className="relative w-28 aspect-[3/4] rounded-2xl bg-[#FFF5F8] overflow-hidden shrink-0 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {/* Heart icon on top-right of image */}
                      <button
                        onClick={e => { e.stopPropagation(); toggleWishlist(product); }}
                        className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-[#FF0069] hover:bg-white transition-all shadow-sm"
                      >
                        <Heart size={13} className={isInWishlist(product.id) ? 'fill-[#FF0069] text-[#FF0069]' : ''} />
                      </button>
                    </div>

                    {/* Info */}
                    <div className="flex flex-col flex-1 py-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#FF0069] uppercase tracking-widest shrink-0">Recommended</span>
                      <h4
                        className="font-bold text-sm text-black hover:text-[#FF0069] transition-colors line-clamp-2 mt-1 cursor-pointer leading-snug"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >{product.name}</h4>
                      <p className="text-[11px] text-gray-500 mt-1 line-clamp-1 mb-3">{product.shortDescription}</p>

                      <span className="text-base font-black text-black block mb-3">₹{product.price}</span>

                      {/* Buttons — stacked full-width to prevent overflow */}
                      <div className="flex flex-col gap-2 mt-auto">
                        <button
                          onClick={() => addToCart(product, 1)}
                          className="w-full py-2.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-[#FF0069] transition-colors whitespace-nowrap text-center"
                        >Add to Cart</button>
                        <button
                          onClick={() => handleBuyNow(product)}
                          className="w-full py-2.5 bg-[#FF0069]/10 text-[#FF0069] text-xs font-bold rounded-xl hover:bg-[#FF0069] hover:text-white transition-colors whitespace-nowrap text-center"
                        >Buy Now</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══ SECTION 4: HYDRATION ROUTINE CAROUSEL ════════════════════════════ */}
      <section className="py-24 bg-white border-t border-black/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-black text-black mb-2">Complete Your Hydration Routine</h2>
            <p className="text-gray-500 font-medium">A curated 5-step ritual for round-the-clock glow.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => scrollCarousel('left')}
              className="w-12 h-12 rounded-full border border-black/10 bg-gray-50 flex items-center justify-center hover:bg-[#FF0069] hover:text-white hover:border-[#FF0069] transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="w-12 h-12 rounded-full border border-black/10 bg-gray-50 flex items-center justify-center hover:bg-[#FF0069] hover:text-white hover:border-[#FF0069] transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="flex overflow-x-auto gap-6 px-6 md:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pb-8 hide-scrollbar snap-x snap-mandatory select-none"
          style={{ cursor: 'grab', scrollBehavior: 'smooth' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {routineProducts.map((product, idx) => (
            <div key={`${product.id}-${idx}`} className="w-[260px] md:w-[280px] shrink-0 snap-start flex flex-col group">
              <div className="text-xs font-bold text-[#FF0069] uppercase tracking-widest mb-3 flex items-center justify-between">
                <span>{product.step}</span>
                {idx < routineProducts.length - 1 && <ChevronRight size={14} className="text-gray-300" />}
              </div>

              <div
                className="relative aspect-[4/5] bg-[#FFF5F8] rounded-3xl overflow-hidden mb-4 border border-black/5 group-hover:border-[#FF0069]/30 transition-colors cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={product.image} alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={e => { e.stopPropagation(); toggleWishlist(product); }}
                  className="absolute top-4 right-4 w-9 h-9 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-[#FF0069] transition-all shadow-sm"
                >
                  <Heart size={15} className={isInWishlist(product.id) ? 'fill-[#FF0069] text-[#FF0069]' : ''} />
                </button>
              </div>

              <h3
                className="font-bold text-black group-hover:text-[#FF0069] transition-colors mb-1 truncate cursor-pointer text-sm"
                onClick={() => navigate(`/product/${product.id}`)}
              >{product.name}</h3>
              <span className="text-base font-black text-black mb-4">₹{product.price}</span>

              <button
                onClick={() => addToCart(product, 1)}
                className="w-full py-3.5 border-2 border-black rounded-xl font-bold text-sm hover:bg-[#FF0069] hover:border-[#FF0069] hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag size={15} /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SECTION 5: HYDRATION BENEFITS ════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-[#FFF5F8] to-[#FFF8F0] border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-black text-black mb-3">Why COSKINn Face Mist?</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">Click any benefit to discover the science and ingredients behind the glow.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map(b => (
              <motion.div
                key={b.id}
                layout
                whileHover={{ y: expandedBenefit === b.id ? 0 : -4 }}
                onClick={() => setExpandedBenefit(expandedBenefit === b.id ? null : b.id)}
                className={`bg-white rounded-3xl border-2 cursor-pointer transition-all duration-300 overflow-hidden ${expandedBenefit === b.id
                  ? 'border-[#FF0069] shadow-[0_20px_50px_rgba(255,0,105,0.15)]'
                  : 'border-black/5 hover:border-[#FF0069]/30 hover:shadow-xl'}`}
              >
                <div className="p-7 flex flex-col gap-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-all ${expandedBenefit === b.id ? 'bg-[#FF0069] scale-110 shadow-[0_8px_20px_rgba(255,0,105,0.3)]' : 'bg-[#FFF5F8]'}`}>
                    {b.emoji}
                  </div>
                  <div>
                    <h3 className={`font-heading font-bold text-lg mb-1 transition-colors ${expandedBenefit === b.id ? 'text-[#FF0069]' : 'text-black'}`}>{b.title}</h3>
                    <p className="text-sm text-gray-500">{b.short}</p>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedBenefit === b.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-7 pb-7">
                        <div className="h-px bg-[#FF0069]/15 mb-5" />
                        <p className="text-sm text-gray-600 leading-relaxed">{b.detail}</p>
                        <button
                          onClick={e => { e.stopPropagation(); document.getElementById('collection').scrollIntoView({ behavior: 'smooth' }); }}
                          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#FF0069] hover:gap-3 transition-all"
                        >
                          Shop Now <ChevronRight size={15} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
