import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Heart, Star, CheckCircle, ChevronDown, 
  Minus, Plus, Eye, Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { skincareProducts } from '../constants/skincareProducts';
import Footer from '../components/common/Footer';

// Use strictly local WebP images
import giftGlowEssentialsImg from '../assets/images/gift_glow_essentials.webp';
import gentleCleanserImg from '../assets/images/gentle_cleanser.webp';
import faceMistImg from '../assets/images/face_mist.webp';
import lipBalmImg from '../assets/images/lip_balm.webp';
import overnightMaskImg from '../assets/images/overnight_mask.webp';

// Lifestyle / Alt images as premium placeholders for Unboxing & Fruits
import premiumGiftImg from '../assets/images/gift_premium.webp';
import fruitStrawImg from '../assets/images/lip_balm_texture.webp';
import fruitOrangeImg from '../assets/images/sunscreen_spf50_lifestyle.webp';
import fruitMangoImg from '../assets/images/cleansing_balm.webp';
import fruitBlueImg from '../assets/images/overnight_mask_lifestyle.webp';
import fruitPomImg from '../assets/images/tinted_sunscreen_lifestyle.webp';
import fruitGreenImg from '../assets/images/face_mist.webp';

import occSelfcareImg from '../assets/images/occ_selfcare.webp';
import occMotherImg from '../assets/images/occ_mother.webp';
import occValentineImg from '../assets/images/occ_valentine.webp';
import lipBalmModelImg from '../assets/images/lip_balm_model.webp';

const FAQS = [
  { q: "What's included in the Glow Kit?", a: "The Glow Kit includes four full-sized products: COSKINn Gentle Cleanser, Face Mist, Lip Balm SPF, and Overnight Mask. Everything you need for a complete day-to-night routine." },
  { q: "How long does it last?", a: "With daily use, the complete kit is designed to last approximately 60-90 days." },
  { q: "Is it suitable for sensitive skin?", a: "Yes! All products in the Glow Kit are dermatologist-tested, hypoallergenic, and formulated with gentle fruit extracts suitable for all skin types, including sensitive skin." },
  { q: "Can I gift this?", a: "Absolutely. The Glow Kit arrives in a premium, reusable luxury gift box with custom tissue paper, making it the perfect gift." },
  { q: "What are the shipping details?", a: "We offer free expedited shipping on all Glow Kit orders. Orders typically arrive within 2-3 business days." }
];

const REVIEWS = [
  { name: "Sophia M.", role: "Verified Buyer", text: "This kit completely transformed my skin texture. The overnight mask is a miracle worker. Truly a luxury experience from unboxing to applying.", rating: 5, img: occSelfcareImg },
  { name: "Elena R.", role: "Verified Buyer", text: "Worth every penny. The packaging feels incredibly premium, and the products themselves smell divine and work flawlessly together.", rating: 5, img: occMotherImg },
  { name: "Aisha K.", role: "Verified Buyer", text: "I threw out all my other skincare. This 4-step routine is all I need. My skin is glowing and perfectly hydrated all day.", rating: 5, img: occValentineImg },
];

const FRUITS = [
  { id: 'strawberry', name: 'Strawberry', img: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400', desc: 'Brightens and evens skin tone' },
  { id: 'orange', name: 'Orange', img: 'https://images.pexels.com/photos/54370/pexels-photo-54370.jpeg?auto=compress&cs=tinysrgb&w=400', desc: 'Powerful antioxidant protection' },
  { id: 'mango', name: 'Mango', img: 'https://images.pexels.com/photos/112811/pexels-photo-112811.jpeg?auto=compress&cs=tinysrgb&w=400', desc: 'Deeply nourishes and softens' },
  { id: 'blueberry', name: 'Blueberry', img: 'https://images.pexels.com/photos/1153655/pexels-photo-1153655.jpeg?auto=compress&cs=tinysrgb&w=400', desc: 'Calms and repairs skin barrier' },
  { id: 'pomegranate', name: 'Pomegranate', img: 'https://images.pexels.com/photos/568163/pexels-photo-568163.jpeg?auto=compress&cs=tinysrgb&w=400', desc: 'Promotes skin regeneration' },
  { id: 'greentea', name: 'Green Tea', img: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=400', desc: 'Soothes and reduces redness' }
];

export default function GlowKitPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [activeRoutine, setActiveRoutine] = useState(null);
  const [activeFaq, setActiveFaq] = useState(0);
  const [hoveredFruit, setHoveredFruit] = useState(null);
  
  // Extract products
  const glowKitProduct = skincareProducts.find(p => p.id === 8001);
  const youMayAlsoLike = skincareProducts.filter(p => p.id !== 8001).slice(0, 10);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBuyNow = (product) => {
    addToCart(product, 1);
    navigate('/checkout');
  };

  const ROUTINE = [
    { name: "COSKINn Cleanser", time: "Morning & Night", desc: "Start with a clean slate. Gently wash away impurities without stripping natural oils.", img: gentleCleanserImg },
    { name: "COSKINn Face Mist", time: "Morning & Anytime", desc: "Spritz for instant hydration and a dewy, glowing finish.", img: faceMistImg },
    { name: "COSKINn Lip Balm SPF", time: "Morning & Anytime", desc: "Protect and nourish your lips with broad-spectrum SPF and rich fruit butter.", img: lipBalmImg },
    { name: "COSKINn Overnight Mask", time: "Night", desc: "Lock in moisture and repair your skin barrier while you sleep.", img: overnightMaskImg }
  ];

  if (!glowKitProduct) return <div>Product not found</div>;

  return (
    <div className="w-full min-h-screen bg-[#FFF8F5] overflow-x-hidden font-sans text-[#1B1B1B]">
      
      {/* SECTION 1: LUXURY EDITORIAL HERO */}
      <section className="relative w-full h-[85vh] min-h-[650px] lg:min-h-[750px] flex items-start overflow-hidden bg-gradient-to-br from-[#FFF5F8] to-[#FFF0F5]">
        
        {/* Soft Fruit-Inspired Abstract Shapes (5-8% opacity) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {FRUITS.map((fruit, idx) => {
            const positions = [
              { top: '5%', left: '10%', size: '150px' },
              { top: '70%', left: '5%', size: '200px' },
              { top: '15%', right: '25%', size: '180px' },
              { bottom: '5%', right: '40%', size: '160px' },
              { top: '45%', left: '35%', size: '120px' },
              { bottom: '20%', right: '15%', size: '190px' },
            ];
            const pos = positions[idx % positions.length];
            return (
              <motion.img 
                key={idx}
                src={fruit.img}
                alt={fruit.name}
                animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 8 + idx, repeat: Infinity, ease: "easeInOut" }}
                className="absolute object-cover rounded-full opacity-[0.07] blur-[6px] mix-blend-multiply"
                style={{ ...pos, width: pos.size, height: pos.size }}
              />
            );
          })}
        </div>

        <div className="w-full max-w-[1400px] mx-auto relative z-10 h-full flex flex-col lg:flex-row pt-24 lg:pt-32 px-6">
          
          {/* Top Left Content */}
          <div className="w-full lg:w-[40%] flex flex-col items-start text-left z-20 lg:pr-6">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="px-4 py-1.5 bg-white/60 backdrop-blur-md rounded-full text-[#FF006E] font-bold text-xs uppercase tracking-[0.2em] shadow-sm mb-6 border border-[#FFD6E7]/50"
            >
              Limited Edition Glow Kit
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-[70px] xl:text-[80px] font-heading font-black leading-[1.05] mb-6 text-black tracking-tight drop-shadow-sm"
            >
              Reveal Your <br className="hidden md:block" />
              Natural Glow <br className="hidden md:block" />
              <span className="text-[#FF006E] font-heading font-medium italic">with COSKINn</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg lg:text-xl text-gray-600 font-medium mb-10 max-w-md leading-relaxed drop-shadow-sm"
            >
              A curated 4-step ritual crafted with our signature fruit complex. Experience the pinnacle of luxurious, radiant skincare.
            </motion.p>
            
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              onClick={() => { document.getElementById('glow-kit-inside').scrollIntoView({ behavior: 'smooth' }) }}
              className="px-10 py-5 bg-gradient-to-r from-[#FF006E] to-[#FF5EA8] text-white rounded-full font-bold uppercase tracking-widest hover:shadow-[0_20px_40px_rgba(255,0,110,0.4)] transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
            >
              Explore Glow Kit
            </motion.button>
          </div>
          
          {/* Masked Lifestyle Model & Floating Products */}
          <div className="absolute right-0 top-0 w-full lg:w-[60%] h-full z-10 pointer-events-none overflow-hidden lg:overflow-visible">
            
            {/* Soft pink glow behind the model */}
            <motion.div 
              animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-10 top-1/4 w-[60%] h-[60%] bg-[#FF006E]/15 blur-[100px] rounded-full z-0" 
            />

            {/* Seamlessly Masked Lifestyle Image */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat mix-blend-multiply z-10"
              style={{ 
                backgroundImage: `url('https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg')`,
                WebkitMaskImage: 'radial-gradient(ellipse 80% 90% at 70% 50%, black 20%, transparent 70%)',
                maskImage: 'radial-gradient(ellipse 80% 90% at 70% 50%, black 20%, transparent 70%)'
              }} 
            />

            {/* The 4 Products floating elegantly beside her (positioned to the bottom left of her) */}
            <div className="absolute inset-0 w-full h-full flex items-end pb-[5%] pl-[5%] lg:pl-[15%] z-20">
              <div className="relative w-full max-w-[500px] h-[50vh] lg:h-[600px]">
                
                {/* Product 3: Overnight Mask */}
                <motion.img
                  src={overnightMaskImg}
                  alt="Overnight Mask"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: [0, -10, 0], scale: 1 }}
                  transition={{ 
                    opacity: { duration: 1, delay: 0.2 },
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
                  }}
                  className="absolute w-[35%] max-w-[180px] drop-shadow-[0_30px_30px_rgba(0,0,0,0.15)] mix-blend-multiply bottom-[15%] left-0 lg:left-[5%]"
                />

                {/* Product 2: Face Mist */}
                <motion.img
                  src={faceMistImg}
                  alt="Face Mist"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: [0, -15, 0] }}
                  transition={{ 
                    opacity: { duration: 1, delay: 0.4 },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }
                  }}
                  className="absolute w-[22%] max-w-[130px] drop-shadow-2xl mix-blend-multiply bottom-[25%] left-[30%] lg:left-[35%]"
                />

                {/* Product 1: Cleanser */}
                <motion.img
                  src={gentleCleanserImg}
                  alt="Cleanser"
                  initial={{ opacity: 0, y: 70 }}
                  animate={{ opacity: 1, y: [0, -8, 0] }}
                  transition={{ 
                    opacity: { duration: 1, delay: 0.6 },
                    y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }
                  }}
                  className="absolute w-[20%] max-w-[110px] drop-shadow-2xl mix-blend-multiply bottom-[40%] left-[45%] lg:left-[50%]"
                />

                {/* Product 4: Lip Balm */}
                <motion.img
                  src={lipBalmImg}
                  alt="Lip Balm"
                  initial={{ opacity: 0, y: 80, rotate: 12 }}
                  animate={{ opacity: 1, y: [0, -5, 0], rotate: 12 }}
                  transition={{ 
                    opacity: { duration: 1, delay: 0.8 },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                  }}
                  className="absolute w-[18%] max-w-[90px] drop-shadow-2xl mix-blend-multiply bottom-[10%] left-[50%] lg:left-[55%]"
                />

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT'S INSIDE */}
      <section id="glow-kit-inside" className="w-full py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-[40px] z-10" />
            <img src={premiumGiftImg} alt="Luxury Box" className="w-full h-full object-cover rounded-[40px] shadow-2xl" />
            <div className="absolute bottom-8 left-8 z-20">
              <h2 className="text-white text-3xl font-heading font-black mb-2">What's Inside</h2>
              <p className="text-white/90 font-medium">Your Luxury Glow Box</p>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ROUTINE.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-[#FFF8F5] p-6 rounded-3xl border border-[#FFD6E7]/30 hover:border-[#FF006E]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 bg-white text-[#FF006E] text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full shadow-sm z-10">
                  Included
                </div>
                <div className="w-20 h-20 mb-4 bg-white rounded-2xl p-2 shadow-sm flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#FFD6E7]/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-2xl" />
                  <img src={item.img} alt={item.name} className="relative z-10 w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-1 group-hover:text-[#FF006E] transition-colors">{item.name}</h3>
                <p className="text-gray-500 text-xs font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: YOU MAY ALSO LIKE (Premium Grid) */}
      <section className="w-full bg-[#FFF8F5] py-16 lg:py-24 border-t border-[#FFD6E7]/40">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-black text-black mb-2">✨ You May Also <span className="text-[#FF006E]">Like</span></h2>
            <p className="text-gray-500 font-medium">Complete your skincare routine with our premium COSKINn collection.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {youMayAlsoLike.map((product) => {
              const discountPercent = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
              return (
              <div key={product.id} className="w-full flex flex-col group bg-white rounded-3xl p-4 border border-black/5 hover:border-[#FF006E]/30 hover:shadow-[0_15px_30px_rgba(255,0,110,0.1)] transition-all">
                <div className="relative aspect-[4/5] bg-[#FFF5F8] rounded-2xl overflow-hidden mb-4 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                  {discountPercent > 0 && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-white text-[#FF006E] font-bold text-[10px] tracking-widest rounded-full shadow-sm z-10">
                      {discountPercent}% OFF
                    </div>
                  )}
                  <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                  <div className="absolute inset-x-3 bottom-3 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex gap-2">
                    <button onClick={e => { e.stopPropagation(); navigate(`/product/${product.id}`); }} className="flex-1 bg-white/90 backdrop-blur font-bold text-[#FF006E] text-xs py-2.5 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-1 shadow-sm">
                      <Eye size={14} /> Quick View
                    </button>
                  </div>

                  <button
                    onClick={e => { e.stopPropagation(); toggleWishlist(product); }}
                    className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-[#FF006E] transition-all shadow-sm"
                  >
                    <Heart size={14} className={isInWishlist(product.id) ? 'fill-[#FF006E] text-[#FF006E]' : ''} />
                  </button>
                </div>

                <h3 className="font-heading font-bold text-black group-hover:text-[#FF006E] transition-colors mb-1 truncate text-base cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>{product.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex text-[#FF006E]">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold">({product.reviews || 120})</span>
                </div>

                <div className="flex items-center justify-between mb-4 mt-auto pt-2">
                  <span className="text-xl font-black text-black">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button onClick={() => addToCart(product, 1)} className="flex-1 py-3 bg-gradient-to-r from-[#FF006E] to-[#FF5EA8] text-white rounded-xl font-bold text-xs hover:shadow-[0_5px_15px_rgba(255,0,110,0.4)] transition-all flex items-center justify-center gap-2">
                    <ShoppingBag size={14} /> Add
                  </button>
                  <button onClick={() => handleBuyNow(product)} className="flex-1 py-3 bg-gradient-to-r from-[#FF5EA8] to-[#FF006E] text-white rounded-xl font-bold text-xs hover:shadow-[0_5px_15px_rgba(255,0,110,0.4)] transition-all flex items-center justify-center gap-2">
                    Buy Now
                  </button>
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* SECTION INTERACTIVE: INSIDE YOUR GLOW KIT */}
      <section className="w-full py-24 bg-gradient-to-b from-white to-[#FFF8F5] px-6 overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-4">Inside Your <span className="text-[#FF006E]">Glow Kit</span></h2>
            <p className="text-gray-500 font-medium text-lg">Hover to reveal the magic inside your premium gift box.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            
            {/* Left Side: Dynamic Image Area */}
            <div className="w-full lg:w-1/2 relative flex justify-center items-center h-[400px] lg:h-[500px]">
              {/* The main Kit Image (dimmed when something is active) */}
              <motion.div 
                animate={{ opacity: activeRoutine !== null ? 0.15 : 1, filter: activeRoutine !== null ? 'blur(12px)' : 'blur(0px)' }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center z-0"
              >
                <img src={giftGlowEssentialsImg} alt="Glow Kit" className="w-[90%] max-w-[500px] h-auto object-contain mix-blend-multiply" />
              </motion.div>

              {/* The Highlighted Product */}
              <AnimatePresence mode="wait">
                {activeRoutine !== null && (
                  <motion.div
                    key={activeRoutine}
                    initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                  >
                    <div className="relative w-64 h-64 lg:w-80 lg:h-80 flex items-center justify-center">
                      <div className="absolute inset-0 bg-[#FF006E]/30 blur-[60px] rounded-full animate-pulse" />
                      <img src={ROUTINE[activeRoutine].img} alt={ROUTINE[activeRoutine].name} className="w-full h-full object-contain relative z-10 drop-shadow-2xl mix-blend-multiply" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Side: 4 Interactive Cards */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              {ROUTINE.map((item, idx) => {
                const isActive = activeRoutine === idx;
                return (
                  <div 
                    key={idx}
                    className={`relative overflow-hidden rounded-3xl border p-5 lg:p-6 cursor-pointer transition-all duration-500 flex flex-col justify-center
                      ${isActive ? 'bg-white border-[#FF006E] shadow-[0_20px_40px_rgba(255,0,110,0.12)] scale-[1.02]' : 'bg-white/60 backdrop-blur-sm border-[#FFD6E7]/50 hover:bg-white hover:border-[#FFD6E7]'}
                    `}
                    onMouseEnter={() => setActiveRoutine(idx)}
                    onMouseLeave={() => setActiveRoutine(null)}
                    onClick={() => setActiveRoutine(isActive ? null : idx)}
                  >
                    <div className="flex items-center gap-5 relative z-10">
                      <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 overflow-hidden bg-[#FFF5F8]
                        ${isActive ? 'shadow-inner border border-[#FFD6E7]' : 'opacity-70'}
                      `}>
                        <img src={item.img} alt={item.name} className={`w-[85%] h-[85%] object-contain transition-transform duration-500 mix-blend-multiply ${isActive ? 'scale-110' : ''}`} />
                      </div>
                      
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`font-bold text-lg lg:text-xl transition-colors duration-300 ${isActive ? 'text-[#FF006E]' : 'text-black'}`}>
                            {item.name}
                          </h4>
                          <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full transition-colors duration-300 ${isActive ? 'bg-[#FF006E] text-white shadow-md shadow-[#FF006E]/30' : 'bg-[#FFF0F5] text-[#FF006E]'}`}>
                            Included
                          </span>
                        </div>
                        
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="text-gray-500 text-sm lg:text-base font-medium mt-1 leading-relaxed">
                                {item.desc}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: SIGNATURE 6 FRUIT COMPLEX */}
      <section className="relative w-full py-24 bg-gradient-to-b from-[#FFF0F5]/30 to-white px-6 overflow-hidden flex flex-col items-center border-y border-[#FFD6E7]/30">
        
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-4">COSKINn Signature 6 <span className="text-[#FF006E]">Fruit Complex</span></h2>
          <p className="text-gray-500 font-medium text-lg max-w-lg mx-auto">Potent antioxidants and deep hydration delivered directly to your skin.</p>
        </div>

        <div className="relative w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 z-10">
          
          {/* Left Fruits */}
          <div className="flex flex-col gap-6 w-full lg:w-1/3">
            {FRUITS.slice(0, 3).map((fruit, idx) => (
              <motion.div 
                key={fruit.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 bg-white/70 backdrop-blur-md p-4 rounded-3xl border border-[#FF006E]/20 shadow-lg hover:shadow-[0_10px_30px_rgba(255,0,110,0.15)] hover:border-[#FF006E]/40 transition-all cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 shadow-inner">
                  <img src={fruit.img} alt={fruit.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-bold text-[#FF006E] text-base mb-0.5">{fruit.name}</h4>
                  <p className="text-xs text-gray-600 font-medium">{fruit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center Kit */}
          <div className="w-[280px] h-[280px] lg:w-[350px] lg:h-[350px] shrink-0 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-white rounded-full shadow-[0_20px_50px_rgba(255,0,110,0.15)] border-4 border-[#FFF0F5] z-0 pointer-events-none" />
            <img src={giftGlowEssentialsImg} alt="Glow Kit" className="w-[115%] h-auto object-cover relative z-10 mix-blend-multiply" />
          </div>

          {/* Right Fruits */}
          <div className="flex flex-col gap-6 w-full lg:w-1/3">
            {FRUITS.slice(3, 6).map((fruit, idx) => (
              <motion.div 
                key={fruit.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 bg-white/70 backdrop-blur-md p-4 rounded-3xl border border-[#FF006E]/20 shadow-lg hover:shadow-[0_10px_30px_rgba(255,0,110,0.15)] hover:border-[#FF006E]/40 transition-all cursor-pointer group flex-row-reverse text-right"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 shadow-inner">
                  <img src={fruit.img} alt={fruit.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-bold text-[#FF006E] text-base mb-0.5">{fruit.name}</h4>
                  <p className="text-xs text-gray-600 font-medium">{fruit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5: LUXURY UNBOXING */}
      <section className="w-full py-16 bg-[#FFF8F5] px-6 border-y border-[#FFD6E7]/40">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-4">
              The Luxury <span className="text-[#FF006E]">Unboxing</span>
            </h2>
            <p className="text-gray-500 font-medium text-lg mb-8 max-w-lg">
              Every Glow Kit is hand-packed with care in our signature reusable box, nestled in custom tissue paper, and includes a personalized thank you card.
            </p>
            <ul className="space-y-4 mb-8">
              {['Premium Reusable Gift Box', 'Custom Pink Tissue Paper', 'Personalized Thank You Card', 'Eco-friendly Packaging'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-bold text-black">
                  <CheckCircle className="text-[#FF006E] w-5 h-5" /> {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => handleBuyNow(glowKitProduct)}
              className="px-8 py-4 bg-gradient-to-r from-[#FF006E] to-[#FF5EA8] text-white rounded-full font-bold uppercase tracking-widest hover:shadow-[0_10px_30px_rgba(255,0,110,0.3)] transition-all hover:-translate-y-1 active:scale-[0.98]"
            >
              Gift The Glow Kit
            </button>
          </div>
          
          <div className="w-full lg:w-1/2 relative min-h-[350px] lg:min-h-[400px]">
            <img src={premiumGiftImg} alt="Premium Gift Box" className="w-full h-full object-cover rounded-3xl shadow-xl mix-blend-multiply" />
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="absolute bottom-6 left-6 lg:-left-6 bg-white/90 backdrop-blur-md border border-[#FFD6E7] rounded-2xl p-5 shadow-xl w-60 -rotate-2 hover:rotate-0 transition-transform"
            >
              <span className="block text-[10px] uppercase tracking-widest font-bold text-[#FF006E] mb-2">Exclusive</span>
              <p className="font-bold text-sm leading-relaxed text-black">"The most beautiful packaging I've ever received from a skincare brand."</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CLINICAL RESULTS */}
      <section className="w-full py-16 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-3">Clinically <span className="text-[#FF006E]">Proven</span></h2>
            <p className="text-gray-500 font-medium text-lg">Results from a 4-week consumer study of 50 women.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: '96', text: 'Skin Felt Instantly Hydrated' },
              { num: '98', text: 'Reported a Healthy Radiant Glow' },
              { num: '95', text: 'Saw Brighter Looking Skin' },
              { num: '100', text: 'Cruelty Free & Vegan Formula' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-[#FFF8F5] rounded-3xl p-6 border border-[#FFD6E7] text-center hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(255,0,110,0.08)] hover:border-[#FF006E]/30 transition-all duration-300"
              >
                <div className="flex justify-center items-start mb-2 text-[#FF006E]">
                  <span className="text-5xl font-black font-heading tracking-tighter">{stat.num}</span>
                  <span className="text-2xl font-black font-heading mt-1">%</span>
                </div>
                <p className="font-bold text-black text-sm">{stat.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: CUSTOMER REVIEWS */}
      <section className="w-full py-16 bg-[#FFF8F5] px-6 border-t border-[#FFD6E7]/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-black mb-2">Glow <span className="text-[#FF006E]">Stories</span></h2>
              <p className="text-gray-500 font-medium">Hear from our community of glow-getters.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black text-[#FF006E]">4.9</span>
              <div className="flex flex-col">
                <div className="flex text-[#FF006E]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Based on {glowKitProduct.reviews} Reviews</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
            {REVIEWS.map((review, idx) => (
              <div key={idx} className="min-w-[300px] md:min-w-[360px] bg-white rounded-3xl p-6 border border-[#FFD6E7]/50 shadow-sm snap-start">
                <div className="flex items-center gap-4 mb-4">
                  <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full object-cover border border-[#FFD6E7]" />
                  <div>
                    <h4 className="font-bold text-black">{review.name}</h4>
                    <span className="text-[10px] font-bold text-[#FF006E] uppercase tracking-widest flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> {review.role}
                    </span>
                  </div>
                </div>
                <div className="flex text-[#FF006E] mb-3">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                <p className="text-gray-600 font-medium text-sm leading-relaxed italic">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: FAQ */}
      <section className="w-full py-24 bg-[#FFF8F5] px-6 border-t border-[#FFD6E7]/30">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 relative rounded-[40px] overflow-hidden shadow-2xl h-[400px] lg:h-[600px]">
            <img src={lipBalmModelImg} alt="Skincare Glow" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <h2 className="text-white text-4xl lg:text-5xl font-heading font-black mb-2">Got <span className="text-[#FF006E]">Questions?</span></h2>
              <p className="text-white/90 font-medium">Everything you need to know about your new glow.</p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx}
                className={`rounded-3xl overflow-hidden transition-all duration-500 border ${activeFaq === idx ? 'bg-white shadow-[0_20px_40px_rgba(255,0,110,0.08)] border-[#FF006E]/30' : 'bg-white/50 border-[#FFD6E7]/50 hover:bg-white hover:border-[#FFD6E7]'}`}
              >
                <button 
                  className="w-full flex items-center justify-between p-6 text-left group"
                  onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
                >
                  <span className={`font-bold text-lg transition-colors duration-300 ${activeFaq === idx ? 'text-[#FF006E]' : 'text-black group-hover:text-[#FF006E]'}`}>{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeFaq === idx ? 'bg-[#FF006E] text-white rotate-180' : 'bg-[#FFF0F5] text-[#FF006E]'}`}>
                    {activeFaq === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-gray-600 font-medium leading-relaxed"
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



      <Footer />
    </div>
  );
}
