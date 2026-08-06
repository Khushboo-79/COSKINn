import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag, Heart, Star, ChevronRight, Eye, ChevronLeft,
  Sun, Moon, Briefcase, Zap, ShieldCheck, Droplets
} from 'lucide-react';
import { skincareProducts } from '../constants/skincareProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Footer from '../components/common/Footer';

import handCreamModelImg from '../assets/images/hand_cream_model.webp';
import handCreamTextureImg from '../assets/images/hand_cream_texture.webp';
import handCreamBottleImg from '../assets/images/hand_cream_bottle.webp';

// ─── Constants ────────────────────────────────────────────────────────────────

const INGREDIENTS = [
  { name: 'Shea Butter', desc: 'Deep nourishment', emoji: '🧈' },
  { name: 'Rose Extract', desc: 'Natural softness', emoji: '🌹' },
  { name: 'Avocado Oil', desc: 'Repairs dry skin', emoji: '🥑' },
  { name: 'Vitamin E', desc: 'Barrier protection', emoji: '🛡️' },
  { name: 'Hyaluronic Acid', desc: 'Locks moisture', emoji: '💧' },
];

const FEATURES = [
  { title: 'Fast Absorbing', icon: Zap },
  { title: '24 Hour Moisture', icon: Droplets },
  { title: 'Non Sticky', icon: Moon },
  { title: 'Silky Finish', icon: Star },
  { title: 'Dermatologically Tested', icon: ShieldCheck },
];

const TIMELINE = [
  { time: 'Morning', icon: Sun },
  { time: 'After Hand Wash', icon: Droplets },
  { time: 'Office', icon: Briefcase },
  { time: 'Night Repair', icon: Moon },
  { time: 'Healthy Soft Hands', icon: Heart },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function HandCreamPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const carouselRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const collectionProducts = useMemo(() => {
    let products = skincareProducts.filter(p => p.name.toLowerCase().includes('hand'));
    if (products.length < 4) {
      products = [...products, ...skincareProducts.slice(0, 5 - products.length)];
    }
    return products.map((p, idx) => {
        const customNames = ['COSKINn Classic Hand Cream', 'Travel Hand Cream', 'Night Repair Hand Cream', 'Rose Hand Cream', 'Gift Duo'];
        return { ...p, name: p.name.toLowerCase().includes('hand') ? p.name : customNames[idx] };
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
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-black/50 tracking-wide mb-6 lg:mb-8">
              <Link to="/" className="hover:text-[#FF0069] transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/skincare" className="hover:text-[#FF0069] transition-colors">Shop</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-black font-bold">Body & Lips</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#FF0069] font-bold">COSKINn Hand Cream</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-white shadow-sm mb-6"
            >
              <span className="w-2 h-2 bg-[#FF0069] rounded-full animate-pulse" />
              <span className="text-[11px] font-bold tracking-widest text-[#FF0069] uppercase">BODY CARE ESSENTIAL</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-black leading-[1.0] mb-5"
            >
              COSKINn<br />
              <span className="text-[#FF0069]">Hand Cream</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
              className="text-2xl md:text-3xl font-heading font-bold text-gray-700 mb-5 leading-tight"
            >
              Soft Hands.<br />Deep Nourishment.<br />
              <span className="text-[#FF0069]">Every Touch Matters.</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
              className="text-base text-gray-600 leading-relaxed mb-6 max-w-lg"
            >
              A luxurious fast-absorbing hand cream enriched with Shea Butter, Hyaluronic Acid and Botanical Oils that deeply hydrates, repairs dry skin and leaves your hands silky smooth without stickiness.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center gap-3 mb-8 bg-white/60 backdrop-blur-sm py-2.5 px-4 rounded-2xl border border-white/80 w-max"
            >
              <div className="flex text-[#FF0069]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="font-bold text-black">4.9</span>
              <span className="text-gray-500 text-sm">(2,500+ Reviews)</span>
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
              src={handCreamModelImg}
              alt="COSKINn Hand Cream Lifestyle"
              loading="lazy"
              className="w-full h-full object-cover relative z-10 max-h-[90%]"
            />

            <motion.img
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, y: [-15, 15, -15] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              src={handCreamBottleImg}
              alt="Floating COSKINn Hand Cream"
              loading="lazy"
              className="absolute bottom-10 -left-6 w-32 md:w-40 drop-shadow-[0_20px_30px_rgba(255,0,105,0.2)] z-20 object-cover"
            />
          </div>
        </div>
      </section>

      {/* ══ SECTION 2: SIGNATURE INGREDIENTS ════════════════════════════════════ */}
      <section id="ingredients" className="w-full bg-[#FFF8F5] py-20 border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-black text-black mb-3">Signature Ingredients</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">
              Powered by nature, crafted for luxury. Deeply nourishing ingredients for visibly softer hands.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {INGREDIENTS.map((ing, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className="bg-white/60 backdrop-blur-md rounded-[2rem] p-6 text-center border border-white shadow-sm hover:shadow-[0_15px_30px_rgba(255,0,105,0.15)] hover:bg-[#FFF0F5] transition-all group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{ing.emoji}</div>
                <h3 className="font-heading font-bold text-black text-lg mb-1">{ing.name}</h3>
                <p className="text-gray-500 text-sm font-medium">{ing.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 3: TEXTURE EXPERIENCE ════════════════════════════════════ */}
      <section className="w-full bg-white py-20 border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <div className="relative rounded-[3rem] overflow-hidden group">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img src={handCreamTextureImg} alt="Hand Cream Texture" loading="lazy" className="w-full h-[500px] object-cover" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#FF0069]/20 to-transparent mix-blend-overlay"></div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-heading font-black text-black mb-8">Texture Experience</h2>
            <div className="space-y-6">
              {FEATURES.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-full bg-[#FFF0F5] flex items-center justify-center shrink-0">
                      <Icon className="text-[#FF0069] w-6 h-6" />
                    </div>
                    <span className="font-heading font-bold text-xl text-black">{feat.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 4: COMPLETE COLLECTION ════════════════════════════════════ */}
      <section id="collection" className="w-full bg-gradient-to-br from-[#FFF5F8] to-[#FFF8F0] py-20 border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-black text-black mb-2">Complete Collection</h2>
              <p className="text-gray-500 font-medium">Discover your perfect hand care companion.</p>
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

      {/* ══ SECTION 5: LUXURY SELF CARE RITUAL ════════════════════════════════════ */}
      <section className="w-full bg-white py-24 border-t border-black/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-black text-black mb-16">Luxury Self Care Ritual</h2>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 mb-20 max-w-5xl mx-auto">
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#FF0069]/30 to-transparent -translate-y-1/2 -z-10" />
            
            {TIMELINE.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex flex-col items-center gap-4 relative group">
                  {/* Mobile connecting line */}
                  {idx !== TIMELINE.length - 1 && (
                    <div className="md:hidden absolute top-[calc(100%+1rem)] left-1/2 w-px h-6 bg-[#FF0069]/20 -translate-x-1/2 -z-10" />
                  )}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-20 h-20 rounded-full bg-white border-2 border-[#FF0069]/20 flex items-center justify-center shadow-[0_10px_20px_rgba(255,0,105,0.05)] group-hover:border-[#FF0069] group-hover:shadow-[0_15px_30px_rgba(255,0,105,0.2)] transition-all bg-gradient-to-br from-white to-[#FFF0F5]"
                  >
                    <Icon className="text-[#FF0069] w-8 h-8" />
                  </motion.div>
                  <span className="font-heading font-bold text-black text-sm uppercase tracking-widest">{item.time}</span>
                </div>
              );
            })}
          </div>

          <button onClick={() => navigate('/skincare')} className="px-10 py-5 bg-gradient-to-r from-[#FF0069] to-[#FF5EA8] text-white rounded-full font-bold text-sm uppercase tracking-widest hover:shadow-[0_10px_25px_rgba(255,0,105,0.4)] hover:-translate-y-1 transition-all inline-flex items-center gap-3">
            Complete Body Care Collection <ChevronRight size={18} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
