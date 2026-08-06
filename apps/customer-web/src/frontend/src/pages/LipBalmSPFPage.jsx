import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag, Heart, Star, ChevronRight, Eye, ChevronLeft,
  Sun, Moon, ShieldCheck, Droplets, Smile, Sparkles, Coffee,
  ArrowRight, CheckCircle2, ChevronRight as ChevronRightIcon, ChevronLeft as ChevronLeftIcon, Check
} from 'lucide-react';
import { skincareProducts } from '../constants/skincareProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Footer from '../components/common/Footer';

import lipBalmModelImg from '../assets/images/lip_balm_model.webp';
import lipBalmPremiumTubeImg from '../assets/images/lip_balm_premium_tube.webp';
import lipBalmGlossyLipsImg from '../assets/images/lip_balm_glossy_lips.webp';
import lipBalmLifestyleImg from '../assets/images/lip_balm_lifestyle.webp';

// ─── Constants ────────────────────────────────────────────────────────────────

const LIP_CONCERNS = [
  { id: 'dry', label: 'Dry Lips', title: 'Deep Hydration', desc: 'Instantly moisturizes and banishes dry flakes with nourishing Shea Butter.', glow: '#FF0069' },
  { id: 'chapped', label: 'Chapped Lips', title: 'Intense Repair', desc: 'Heals irritated lips with Vitamin E and protective botanical waxes.', glow: '#FF5EA8' },
  { id: 'sun', label: 'Sun Damage', title: 'SPF 30 Protection', desc: 'Shields delicate lip skin from harmful UV rays preventing premature aging.', glow: '#FF8DA1' },
  { id: 'dull', label: 'Dull Lips', title: 'Natural Glow', desc: 'Restores a healthy, natural pink tint and glossy finish to dull lips.', glow: '#FFA6C9' },
  { id: 'cracked', label: 'Cracked Lips', title: 'Barrier Defense', desc: 'Seals in moisture and repairs cracks for a smooth, flawless pout.', glow: '#FF3385' },
];

const INGREDIENT_CAPSULES = [
  { name: 'Shea Butter', desc: 'Intense 24h moisture', top: '15%', left: '10%' },
  { name: 'Vitamin E', desc: 'Antioxidant repair', top: '10%', left: '60%' },
  { name: 'SPF 30', desc: 'UVA/UVB Defense', top: '45%', left: '75%' },
  { name: 'Jojoba Oil', desc: 'Deep nourishment', top: '80%', left: '65%' },
  { name: 'Coconut Oil', desc: 'Softens & smooths', top: '75%', left: '15%' },
  { name: 'Botanical Wax', desc: 'Locks in hydration', top: '40%', left: '5%' },
];

const JOURNEY_STEPS = [
  { time: 'Morning', title: 'Awaken & Prep', icon: Sun },
  { time: 'Before Makeup', title: 'Smooth Canvas', icon: Sparkles },
  { time: 'Outdoor', title: 'SPF Protection', icon: ShieldCheck },
  { time: 'Coffee Break', title: 'Reapply Shine', icon: Coffee },
  { time: 'Evening', title: 'Soothe', icon: Smile },
  { time: 'Night', title: 'Deep Repair', icon: Moon },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function LipBalmSPFPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const carouselRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  const [activeConcern, setActiveConcern] = useState(LIP_CONCERNS[0]);
  const [hoveredIngredient, setHoveredIngredient] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const collectionProducts = useMemo(() => {
    let products = skincareProducts.filter(p => p.name.toLowerCase().includes('lip'));
    if (products.length < 5) {
      products = [...products, ...skincareProducts.slice(0, 5 - products.length)];
    }
    return products.slice(0, 5).map((p, idx) => {
      const customNames = ['COSKINn Classic SPF Lip Balm', 'COSKINn Tinted Lip Balm', 'COSKINn Berry Lip Balm', 'COSKINn Rose Lip Balm', 'COSKINn Night Lip Mask'];
      return { ...p, name: customNames[idx] };
    });
  }, []);

  const handleBuyNow = (product) => { addToCart(product, 1); navigate('/checkout'); };

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
    <div className="w-full min-h-screen bg-theme-bg overflow-x-hidden font-sans text-theme-text">

      {/* ══ SECTION 1: HERO ══════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[600px] lg:min-h-[88vh] bg-gradient-to-br from-[#FFF0F5] via-[#FFF8F0] to-[#FFEDE8] overflow-hidden pt-[140px] lg:pt-[150px]">
        {/* Ambient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#FF0069]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#FFD498]/25 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/30 rounded-full blur-[80px]" />
        </div>

        {/* Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#FF0069]/20 pointer-events-none"
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
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-black/50 tracking-wide mb-6 lg:mb-8">
              <Link to="/" className="hover:text-[#FF0069] transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/skincare" className="hover:text-[#FF0069] transition-colors">Shop</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-black font-bold">Body & Lips</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#FF0069] font-bold">COSKINn Lip Balm SPF</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-white shadow-sm mb-6"
            >
              <span className="w-2 h-2 bg-[#FF0069] rounded-full animate-pulse" />
              <span className="text-[11px] font-bold tracking-widest text-[#FF0069] uppercase">SUN PROTECTION FOR LIPS</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-black leading-[1.0] mb-5"
            >
              COSKINn<br />
              <span className="text-[#FF0069]">Lip Balm SPF</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
              className="text-2xl md:text-3xl font-heading font-bold text-gray-700 mb-5 leading-tight"
            >
              Soft Lips.<br />Protected Daily.<br />
              <span className="text-[#FF0069]">Naturally Beautiful.</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
              className="text-base text-gray-600 leading-relaxed mb-6 max-w-lg"
            >
              A luxurious SPF Lip Balm enriched with Shea Butter, Vitamin E and Natural Botanical Oils that hydrates, repairs dry lips and protects against harmful UV rays while giving a healthy natural shine.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center gap-3 mb-8 bg-white/60 backdrop-blur-sm py-2.5 px-4 rounded-2xl border border-white/80 w-max"
            >
              <div className="flex text-[#FF0069]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="font-bold text-black">4.9</span>
              <span className="text-gray-500 text-sm">(3,000+ Reviews)</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => document.getElementById('collection').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-[#FF0069] to-[#FF5EA8] text-white rounded-full font-bold text-sm uppercase tracking-widest hover:shadow-[0_8px_20px_rgba(255,0,105,0.4)] hover:-translate-y-1 transition-all"
              >
                Explore Collection
              </button>
              <button
                onClick={() => document.getElementById('ingredients').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white/80 text-[#FF0069] border border-[#FF0069]/30 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white hover:border-[#FF0069] transition-all"
              >
                Learn More
              </button>
            </motion.div>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-1/2 relative flex items-center justify-center h-[480px] lg:h-[680px]">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 m-auto w-[400px] h-[400px] bg-gradient-to-br from-[#FF0069]/30 to-[#FFD498]/30 rounded-full blur-[90px] -z-10"
            />

            <motion.img
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }}
              src={lipBalmModelImg}
              alt="COSKINn Lip Balm Lifestyle"
              loading="lazy"
              className="w-full h-full object-contain relative z-10 max-h-[90%] mix-blend-multiply drop-shadow-xl"
            />

            <motion.img
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, y: [-15, 15, -15] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              src={lipBalmPremiumTubeImg}
              alt="Floating COSKINn Lip Balm"
              loading="lazy"
              className="absolute bottom-10 -left-6 w-32 md:w-48 drop-shadow-[0_30px_40px_rgba(255,0,105,0.25)] z-20 object-contain mix-blend-multiply"
            />
          </div>
        </div>
      </section>

      {/* ══ SECTION 2: INTERACTIVE LIP CONCERNS ════════════════════════════════════ */}
      <section className="w-full bg-[#FFF8F5] py-16 lg:py-24 border-t border-black/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Dynamic Illustration */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              className="relative aspect-[4/5] lg:aspect-square rounded-[3rem] overflow-hidden"
              animate={{ boxShadow: `0 0 80px -20px ${activeConcern.glow}` }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={lipBalmGlossyLipsImg}
                alt="Healthy Glossy Lips"
                className="w-full h-full object-cover mix-blend-multiply"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent"></div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeConcern.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-10 left-10 right-10 bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/50 shadow-xl"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="text-[#FF0069] w-6 h-6" />
                    <h3 className="font-heading font-black text-black text-2xl">{activeConcern.title}</h3>
                  </div>
                  <p className="text-gray-600 font-medium leading-relaxed">{activeConcern.desc}</p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right: Concern Selector */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-heading font-black text-black mb-4">Target Your Concerns</h2>
            <p className="text-gray-500 font-medium mb-10 text-lg">Select a concern to see how COSKINn Lip Balm SPF transforms your lips.</p>

            <div className="flex flex-col gap-3 lg:gap-4">
              {LIP_CONCERNS.map((concern) => {
                const isActive = activeConcern.id === concern.id;
                return (
                  <motion.button
                    key={concern.id}
                    onClick={() => setActiveConcern(concern)}
                    className={`relative w-full text-left p-5 lg:p-6 rounded-3xl border-2 transition-all duration-300 overflow-hidden ${isActive
                        ? 'border-[#FF0069] bg-white shadow-[0_20px_40px_rgba(255,0,105,0.1)]'
                        : 'border-transparent bg-white/40 hover:bg-white/80 hover:shadow-sm'
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeGlow"
                        className="absolute inset-0 bg-gradient-to-r from-[#FF0069]/5 to-transparent pointer-events-none"
                      />
                    )}
                    <div className="flex items-center justify-between relative z-10">
                      <span className={`text-xl font-bold transition-colors duration-300 ${isActive ? 'text-[#FF0069]' : 'text-gray-600'}`}>
                        {concern.label}
                      </span>
                      {/* <ArrowRight className={`transition-all duration-300 ${isActive ? 'text-[#FF0069] translate-x-0 opacity-100' : 'text-gray-400 -translate-x-4 opacity-0'}`} /> */}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3: INGREDIENT SPOTLIGHT (REDESIGNED) ════════════════════════════════════ */}
      <section id="ingredients" className="relative w-full bg-white py-16 lg:py-24 border-t border-black/5 overflow-hidden">
        {/* Background elements to visually fill space */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-[#FFF0F5] to-transparent rounded-full opacity-70 blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-gradient-to-tr from-[#FFEDE8] to-transparent rounded-full opacity-60 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* LEFT SIDE (45%) */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center pr-0 lg:pr-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#FF0069]/20 bg-[#FF0069]/5 w-max mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF0069] animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest text-[#FF0069] uppercase">POWERED BY BOTANICAL SCIENCE</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-heading font-black text-black leading-[1.1] mb-6">
              Why Every Ingredient<br />
              <span className="text-[#FF0069]">Matters</span>
            </h2>

            <p className="text-gray-600 text-lg mb-10 leading-relaxed font-medium">
              Experience the perfect harmony of nature and science. Our COSKINn Lip Balm SPF deeply hydrates, locks in moisture, and shields against harmful UV rays—all without a sticky finish.
            </p>

            <div className="flex flex-col gap-3">
              {[
                { icon: Droplets, name: 'Shea Butter', benefit: 'Instantly banishes dry flakes' },
                { icon: Sparkles, name: 'Vitamin E', benefit: 'Antioxidant repair & barrier defense' },
                { icon: ShieldCheck, name: 'SPF 30', benefit: 'Broad-spectrum sun protection' },
                { icon: Smile, name: 'Jojoba Oil', benefit: 'Deep penetration & lasting softness' },
                { icon: Moon, name: 'Botanical Wax', benefit: 'Seals moisture for 24 hours' },
              ].map((ing, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group relative flex items-center gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-black/5 hover:bg-white hover:shadow-[0_15px_30px_rgba(255,0,105,0.08)] hover:border-[#FF0069]/30 transition-all cursor-default overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF0069]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFF0F5] to-white border border-[#FF0069]/10 flex items-center justify-center shrink-0 group-hover:shadow-[0_0_15px_rgba(255,0,105,0.2)] transition-all">
                    <ing.icon className="text-[#FF0069] w-5 h-5" />
                  </div>
                  <div className="relative z-10 flex-1">
                    <h4 className="font-bold text-black text-sm">{ing.name}</h4>
                    <p className="text-xs text-gray-500 font-medium group-hover:text-gray-700 transition-colors">{ing.benefit}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE (55%) */}
          <div className="w-full lg:w-[55%] relative h-[600px] lg:h-[750px] bg-[#FFF8F5]/50 rounded-[3rem] border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.03)] flex items-center justify-center overflow-hidden group">

            {/* Background elements */}
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.05, 1] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#FF0069]/10 to-[#FFD498]/10 blur-[60px]"
            />

            {/* Particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none"
                style={{
                  width: Math.random() * 6 + 3,
                  height: Math.random() * 6 + 3,
                  left: `${Math.random() * 90 + 5}%`,
                  top: `${Math.random() * 90 + 5}%`,
                }}
                animate={{ y: [-15, 15, -15], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}

            {/* Central Product */}
            <motion.div
              animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-20 w-[180px] md:w-[240px] lg:w-[280px]"
            >
              <img src={lipBalmPremiumTubeImg} alt="COSKINn Premium Tube" className="w-full h-auto drop-shadow-[0_40px_50px_rgba(255,0,105,0.25)] mix-blend-multiply" />
            </motion.div>

            {/* Floating Glass Capsules */}
            {INGREDIENT_CAPSULES.map((ing, idx) => {
              const isHovered = hoveredIngredient === idx;
              return (
                <motion.div
                  key={idx}
                  onHoverStart={() => setHoveredIngredient(idx)}
                  onHoverEnd={() => setHoveredIngredient(null)}
                  className="absolute z-30 cursor-pointer"
                  style={{ top: ing.top, left: ing.left }}
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.4 }}
                >
                  <motion.div
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    className={`relative backdrop-blur-xl border border-white/80 rounded-full px-5 py-3 shadow-[0_15px_30px_rgba(0,0,0,0.06)] transition-colors flex flex-col items-center justify-center ${isHovered ? 'bg-gradient-to-r from-[#FF0069] to-[#FF5EA8] text-white' : 'bg-white/70 text-black hover:bg-white/95'
                      }`}
                  >
                    <span className="font-bold text-sm tracking-wide">{ing.name}</span>

                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden mt-1"
                        >
                          <span className="text-white/90 text-[11px] font-medium whitespace-nowrap block pt-1 border-t border-white/20">
                            {ing.desc}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Glowing connector effect on hover */}
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute -inset-2 bg-[#FF0069]/20 rounded-full blur-md -z-10"
                      />
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ══ SECTION 4: VISIBLE HYDRATION (REDESIGNED) ════════════════════════════════════ */}
      <section className="w-full bg-[#FFF8F5] py-16 lg:py-24 border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* LEFT SIDE: Lifestyle Image */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] overflow-hidden"
              style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
            >
              <img
                src={lipBalmLifestyleImg}
                alt="Applying COSKINn Lip Balm"
                className="w-full h-full object-cover mix-blend-multiply"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FFF0F5]/40 to-transparent mix-blend-overlay"></div>

              {/* Organic border overlay */}
              <div className="absolute inset-0 border-[8px] border-white/40" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}></div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Content & Progress */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-heading font-black text-black leading-[1.1] mb-6">
              Visible Hydration.<br />
              <span className="text-[#FF0069]">Instant Comfort.</span>
            </h2>
            <p className="text-gray-600 font-medium mb-10 text-lg leading-relaxed">
              Experience the ultimate transformation. Our SPF-infused formula melts into your lips, delivering a surge of moisture, repairing damage, and providing a sheer, natural glow that lasts all day.
            </p>

            {/* Progress Bars */}
            <div className="flex flex-col gap-6 mb-10">
              {[
                { label: 'Hydration', val: 98, text: '98%' },
                { label: 'Repair', val: 96, text: '96%' },
                { label: 'Sun Protection', val: 100, text: 'SPF 30' },
                { label: 'Softness', val: 95, text: '95%' },
                { label: 'Natural Glow', val: 97, text: '97%' },
              ].map((stat, idx) => (
                <div key={idx} className="w-full">
                  <div className="flex justify-between font-bold text-black mb-2 text-sm uppercase tracking-wide">
                    <span>{stat.label}</span>
                    <span className="text-[#FF0069]">{stat.text}</span>
                  </div>
                  <div className="h-2.5 w-full bg-black/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stat.val}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.15, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#FF0069] to-[#FF5EA8] rounded-full relative"
                    >
                      <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/20 blur-sm animate-[shimmer_2s_infinite]"></div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Benefit Cards */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              {[
                '24 Hour Moisture', 'Non Sticky Formula', 'Healthy Natural Shine'
              ].map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + (idx * 0.1) }}
                  className="flex items-center gap-3 bg-white px-5 py-3 rounded-full border border-black/5 shadow-sm hover:shadow-md transition-shadow cursor-default"
                >
                  <div className="w-5 h-5 rounded-full bg-[#FF0069] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </div>
                  <span className="font-bold text-sm text-black">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 5: DAILY LIP CARE JOURNEY ════════════════════════════════════ */}
      <section className="w-full bg-white py-16 lg:py-24 border-t border-black/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl md:text-5xl font-heading font-black text-black mb-4">Your Daily Journey</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg">
              Experience non-stop hydration and protection from morning till night.
            </p>
          </div>

          <div className="relative">
            {/* Desktop Curved SVG Path */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full -translate-y-1/2 z-0 pointer-events-none overflow-visible">
              <svg viewBox="0 0 1200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
                <path d="M50 100 Q 250 10, 450 100 T 850 100 T 1150 100" stroke="url(#gradient-line)" strokeWidth="4" strokeLinecap="round" strokeDasharray="12 12" />
                <defs>
                  <linearGradient id="gradient-line" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFF0F5" />
                    <stop offset="0.5" stopColor="#FF0069" />
                    <stop offset="1" stopColor="#FFF0F5" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Mobile Vertical Line */}
            <div className="lg:hidden absolute top-0 bottom-0 left-[39px] w-1 bg-gradient-to-b from-[#FFF0F5] via-[#FF0069] to-[#FFF0F5] z-0 rounded-full" />

            <div className="flex flex-col lg:flex-row justify-between relative z-10 gap-12 lg:gap-4 px-4 lg:px-0">
              {JOURNEY_STEPS.map((step, idx) => {
                const Icon = step.icon;
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={idx}
                    className="flex flex-row lg:flex-col items-center lg:items-center gap-6 lg:gap-4 group cursor-default"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-[#FFF0F5] group-hover:border-[#FF0069] flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.05)] group-hover:shadow-[0_15px_30px_rgba(255,0,105,0.2)] transition-all duration-300 relative bg-gradient-to-br from-white to-[#FFF0F5] shrink-0">
                      <Icon className="text-[#FF0069] w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                      {/* Glow Behind Icon */}
                      <div className="absolute inset-0 bg-[#FF0069] rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </div>

                    <div className={`flex flex-col lg:items-center lg:text-center ${!isEven ? 'lg:mt-16' : 'lg:-mt-16 lg:order-first'}`}>
                      <span className="font-heading font-black text-[#FF0069] uppercase tracking-widest text-xs mb-1">{step.time}</span>
                      <span className="font-bold text-black text-lg group-hover:text-[#FF0069] transition-colors">{step.title}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ══ SECTION 6: COMPLETE LIP COLLECTION ════════════════════════════════════ */}
      <section id="collection" className="w-full bg-gradient-to-br from-[#FFF5F8] to-[#FFF8F0] py-16 lg:py-24 border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-black text-black mb-2">Complete Lip Collection</h2>
              <p className="text-gray-500 font-medium">Find your perfect shade and formula.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => scrollCarousel('left')} className="w-12 h-12 rounded-full border border-black/10 bg-white flex items-center justify-center hover:border-[#FF0069] hover:text-[#FF0069] transition-all">
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => scrollCarousel('right')} className="w-12 h-12 rounded-full border border-black/10 bg-white flex items-center justify-center hover:border-[#FF0069] hover:text-[#FF0069] transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x snap-mandatory select-none"
            style={{ cursor: 'grab', scrollBehavior: 'smooth' }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            {collectionProducts.map((product) => (
              <div key={product.id} className="w-[280px] shrink-0 snap-start flex flex-col group bg-white rounded-3xl p-4 border border-black/5 hover:border-[#FF0069]/30 hover:shadow-[0_15px_30px_rgba(255,0,105,0.1)] transition-all">
                <div className="relative aspect-[4/5] bg-[#FFF5F8] rounded-2xl overflow-hidden mb-4 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white text-[#FF0069] font-bold text-[10px] tracking-widest rounded-full shadow-sm z-10">
                    SPECIAL OFFER
                  </div>
                  <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                  <div className="absolute inset-x-3 bottom-3 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex gap-2">
                    <button onClick={e => { e.stopPropagation(); navigate(`/product/${product.id}`); }} className="flex-1 bg-white/90 backdrop-blur font-bold text-[#FF0069] text-xs py-2.5 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-1 shadow-sm">
                      <Eye size={14} /> Quick View
                    </button>
                  </div>

                  <button
                    onClick={e => { e.stopPropagation(); toggleWishlist(product); }}
                    className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-[#FF0069] transition-all shadow-sm"
                  >
                    <Heart size={14} className={isInWishlist(product.id) ? 'fill-[#FF0069] text-[#FF0069]' : ''} />
                  </button>
                </div>

                <h3 className="font-heading font-bold text-black group-hover:text-[#FF0069] transition-colors mb-1 truncate text-base cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>{product.name}</h3>
                <div className="flex items-center justify-between mb-4 mt-auto pt-2">
                  <span className="text-xl font-black text-black">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button onClick={() => addToCart(product, 1)} className="flex-1 py-3 bg-gradient-to-r from-[#FF0069] to-[#FF5EA8] text-white rounded-xl font-bold text-xs hover:shadow-[0_5px_15px_rgba(255,0,105,0.4)] transition-all flex items-center justify-center gap-2">
                    <ShoppingBag size={14} /> Add
                  </button>
                  <button onClick={() => handleBuyNow(product)} className="flex-1 py-3 bg-[#FFF0F5] text-[#FF0069] border border-[#FF0069]/20 rounded-xl font-bold text-xs hover:bg-[#FF0069] hover:text-white transition-all">
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 7: CUSTOMER REVIEWS ════════════════════════════════════ */}
      <section className="w-full bg-[#FFF8F5] py-16 lg:py-24 border-t border-black/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-black text-black mb-3">Customer Reviews</h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex text-[#FF0069]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <span className="font-bold text-black text-xl">4.9</span>
            </div>
            <p className="text-gray-500 font-medium">Based on 3,000+ reviews</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah J.", role: "Verified Buyer", text: "Best lip balm I've ever used. The SPF protection is a bonus and it leaves such a beautiful natural shine. Highly recommend!", rating: 5, before: "Dry, chapped lips", after: "Soft, hydrated lips" },
              { name: "Priya M.", role: "Verified Buyer", text: "I carry this everywhere. It's not sticky at all, smells amazing, and keeps my lips hydrated all day. Even under matte lipsticks!", rating: 5, before: "Dull lips", after: "Healthy glow" },
              { name: "Emily R.", role: "Verified Buyer", text: "Finally an SPF lip balm that doesn't taste weird or leave a white cast. The packaging feels so premium. Worth every penny.", rating: 5, before: "Sun damaged lips", after: "Protected, smooth lips" }
            ].map((review, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF0069] to-[#FF5EA8] text-white flex items-center justify-center font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-black">{review.name}</h4>
                    <span className="text-xs text-gray-400 uppercase tracking-wider">{review.role}</span>
                  </div>
                </div>
                <div className="flex text-[#FF0069] mb-4">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-600 mb-6 italic">"{review.text}"</p>

                <div className="bg-[#FFF5F8] rounded-xl p-4 flex justify-between items-center text-sm">
                  <div className="text-center w-1/2 border-r border-black/5">
                    <span className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1">Before</span>
                    <span className="font-medium text-black">{review.before}</span>
                  </div>
                  <div className="text-center w-1/2">
                    <span className="block text-[10px] text-[#FF0069] uppercase tracking-widest mb-1">After</span>
                    <span className="font-medium text-[#FF0069]">{review.after}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
