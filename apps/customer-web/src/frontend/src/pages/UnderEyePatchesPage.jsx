import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Star, ChevronDown, ChevronRight, Eye, Droplets, Sparkles, Snowflake, Sunrise, ArrowRight } from 'lucide-react';
import { skincareProducts } from '../constants/skincareProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Footer from '../components/common/Footer';

// Images
import patchesImg from '../assets/images/under_eye_patches.webp';
import patchesLifestyleImg from '../assets/images/under_eye_patches_lifestyle.webp';
import patchesBackImg from '../assets/images/under_eye_patches_back.webp';
import patchesSideImg from '../assets/images/under_eye_patches_side.webp';
import patchesModelImg from '../assets/images/premium_under_eye_model_transparent.webp';

const MASK_IMG = patchesImg || 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800&auto=format&fit=crop';
const GALLERY = [patchesImg, patchesLifestyleImg, patchesBackImg, patchesSideImg];

const TABS = [
  { id: 'description', label: 'Description' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'how-to-use', label: 'How To Use' },
  { id: 'ingredients', label: 'Ingredients' },
  { id: 'specifications', label: 'Specifications' },
];

const TAB_CONTENT = {
  description: "Revitalize tired eyes in just 15 minutes. Our premium hydrogel Under Eye Patches instantly soothe, depuff, and brighten the delicate eye area. Infused with hyaluronic acid and caffeine, they deliver an intense burst of hydration while visibly reducing dark circles.",
  benefits: "• Visibly reduces dark circles and puffiness\n• Instantly cools and soothes tired eyes\n• Plumps fine lines with intense hydration\n• Brightens the under-eye area\n• Perfect for pre-makeup prep or morning recovery",
  'how-to-use': "1. Cleanse and dry your face thoroughly.\n2. Use the provided spatula to lift and separate a patch.\n3. Apply the patch gently under the eye, adjusting for a snug fit.\n4. Leave on for 15-20 minutes.\n5. Remove and gently pat any remaining serum into the skin.",
  ingredients: "Water, Glycerin, Niacinamide, Caffeine Extract, Hyaluronic Acid, Collagen Amino Acids, Aloe Barbadensis Leaf Juice, Centella Asiatica Extract, Chondrus Crispus Powder (Hydrogel Base).",
  specifications: "• Quantity: 60 Patches (30 Pairs)\n• Texture: Cooling Hydrogel\n• Skin Type: All Skin Types (Including Sensitive)\n• Fragrance: Unscented\n• Shelf Life: 24 Months"
};

const FEATURES = [
  { id: 1, icon: <Sunrise size={28} />, title: "Reduces Dark Circles", desc: "Brightens pigmentation." },
  { id: 2, icon: <Snowflake size={28} />, title: "Reduces Puffiness", desc: "Instant cooling effect." },
  { id: 3, icon: <Droplets size={28} />, title: "Deep Hydration", desc: "Plumps fine lines." },
  { id: 4, icon: <Sparkles size={28} />, title: "Brightens Eyes", desc: "Awakens tired skin." },
];

export default function UnderEyePatchesPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [activeTab, setActiveTab] = useState('description');

  const detailsRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToDetails = () => {
    detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const product = {
    id: 111,
    name: "COSKINn Under Eye Patches",
    price: 899,
    originalPrice: 1099,
    image: MASK_IMG,
    rating: 4.8,
    reviews: 840,
    shortDescription: "Cooling hydrogel patches for instantly brighter eyes."
  };

  return (
    <div className="w-full min-h-screen bg-theme-bg overflow-x-hidden font-sans text-theme-text">
      
      {/* SECTION 1 — PREMIUM LUXURY HERO */}
      <section className="relative w-full min-h-[82vh] flex items-center bg-gradient-to-br from-[#FFF5F8] via-[#FFFAF3] to-[#FFFFFF] overflow-hidden pt-[140px] lg:pt-[150px] pb-20">
        
        {/* Abstract Luxury Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Soft blush pink radial glow */}
          <div className="absolute top-[10%] right-[10%] w-[50%] h-[60%] rounded-full bg-[#FFD1E5]/30 blur-[120px]" />
          
          {/* Warm cream glow */}
          <div className="absolute bottom-[0%] left-[5%] w-[40%] h-[50%] rounded-full bg-[#FFF0E0]/60 blur-[100px]" />
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
              <Link to="/skincare" className="hover:text-[#FF0069] transition-colors">Shop</Link>
              <ChevronRight className="w-3 h-3 text-black/25" />
              <span className="text-black font-bold truncate">Face Care</span>
              <ChevronRight className="w-3 h-3 text-black/25" />
              <span className="text-[#FF0069] font-bold truncate">Under Eye Patches</span>
            </div>

            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/5 bg-white/80 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-xs font-bold tracking-[0.2em] uppercase mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF0069] shadow-[0_0_8px_rgba(255,0,105,0.6)] animate-pulse"></span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-black/70">New Arrival</span>
            </motion.div>
            
            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-heading font-black text-black leading-[1.05] tracking-tight mb-6">
              COSKINn<br/>
              <span className="font-light italic tracking-normal text-black/80 font-serif">Under Eye Patches</span>
            </h1>

            {/* Subtitle */}
            <h2 className="text-xl sm:text-2xl font-body font-medium text-[#FF0069] leading-relaxed mb-6">
              Wake Up To Brighter,<br/>
              Refreshed Eyes.
            </h2>
            
            {/* Description */}
            <p className="text-base sm:text-lg text-black/60 mb-8 max-w-[420px] leading-relaxed font-normal">
              A transformative cooling formula that instantly depuffs, deeply hydrates, and diminishes dark circles. The ultimate luxury quick-fix for tired, stressed eyes.
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-10 bg-white/60 backdrop-blur-md py-2 px-4 rounded-full border border-white/80 shadow-sm">
              <div className="flex items-center text-[#FFD498]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current drop-shadow-sm" />)}
              </div>
              <span className="text-sm font-bold text-black/80">4.9 <span className="text-black/40 font-normal">| 2,400+ Reviews</span></span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
              <button 
                onClick={scrollToDetails}
                className="group relative overflow-hidden w-full sm:w-auto px-10 py-4 font-bold uppercase tracking-[0.15em] text-[11px] text-white bg-gradient-to-r from-[#FF0069] to-[#FF5EA8] rounded-full shadow-[0_15px_30px_rgba(255,0,105,0.3)] transition-transform hover:scale-[1.02]"
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
                onClick={scrollToDetails}
                className="w-full sm:w-auto px-10 py-4 font-bold uppercase tracking-[0.15em] text-[11px] text-[#FF0069] bg-white border border-[#FF0069]/30 rounded-full hover:bg-[#FFF5F8] transition-colors mt-4 sm:mt-0"
              >
                Learn More
              </button>
            </div>
          </motion.div>

          {/* RIGHT SIDE CAMPAIGN COMPOSITION (Model Only) */}
          <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-full min-h-[500px] flex items-center justify-center lg:justify-end">
            
            {/* Soft pink glow behind the model - animating */}
            <motion.div 
              animate={{ opacity: [0.6, 0.9, 0.6], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[#FF0069]/10 rounded-full blur-[100px] z-0 pointer-events-none" 
            />
            
            {/* Soft radial light behind model */}
            <div className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-[#FFF0E0]/40 rounded-full blur-[80px] z-0 pointer-events-none" />

            {/* Sparkle particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute z-20 text-[#FF0069]/30 pointer-events-none"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.7, 0.2], rotate: [0, 90, 180] }}
                transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 }}
              >
                <Sparkles size={Math.random() * 12 + 8} />
              </motion.div>
            ))}

            {/* Foreground Transparent Cutout Model */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
              className="relative z-30 w-[95%] sm:w-[85%] lg:w-[95%] h-full flex items-center justify-center lg:justify-end"
            >
              <motion.img
                animate={{ y: [-4, 4, -4], scale: [1, 1.01, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                src={patchesModelImg}
                alt="Luxury Skincare Model Wearing Eye Patches"
                className="w-full h-full object-contain object-bottom md:object-right-bottom opacity-[0.98] pointer-events-none drop-shadow-[0_20px_40px_rgba(255,0,105,0.15)]"
              />
            </motion.div>
          </div>

        </div>
      </section>

      {/* ══ SECTION 2: EDUCATIONAL ═════════════════════════════════════════════ */}
      <section ref={detailsRef} className="py-20 lg:py-28 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            {/* Left: Illustration / Image */}
            <div className="w-full lg:w-1/2 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-square md:aspect-[4/5] lg:aspect-square bg-[#FFF5F8] rounded-[3rem] p-8 lg:p-12 overflow-hidden flex items-center justify-center shadow-inner"
              >
                {/* Decorative blob behind image */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white rounded-full blur-[80px] opacity-70 pointer-events-none" />
                <img 
                  src={patchesSideImg} 
                  alt="Eye Care Illustration" 
                  className="w-full h-full object-contain mix-blend-multiply relative z-10 hover:scale-105 transition-transform duration-700" 
                />
              </motion.div>
            </div>

            {/* Right: Educational Content */}
            <div className="w-full lg:w-1/2 flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-black leading-tight mb-4">
                  Why Your Eyes Need <br className="hidden md:block" />
                  <span className="text-[#FF0069]">Extra Care</span>
                </h2>
                <p className="text-lg text-gray-500 font-medium leading-relaxed mb-12 max-w-lg">
                  The skin around your eyes is up to 10 times thinner than the rest of your face. It requires targeted, intensive treatments to prevent premature aging and fatigue.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: '🌙', title: "Overnight Repair", desc: "Deep cellular renewal while you sleep." },
                  { icon: '💧', title: "Hydration Lock", desc: "Prevents transepidermal water loss." },
                  { icon: '✨', title: "Brightening Effect", desc: "Targets stubborn dark circles." },
                  { icon: '❄', title: "Cooling & Depuffing", desc: "Soothes and reduces morning puffiness." }
                ].map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-white/80 backdrop-blur-xl border border-gray-100 p-6 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(255,0,105,0.12)] hover:border-[#FFD1E5] transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-[#FFF5F8] text-2xl flex items-center justify-center rounded-2xl mb-4 group-hover:scale-110 group-hover:bg-[#FF0069]/10 transition-transform">
                      {card.icon}
                    </div>
                    <h3 className="font-heading font-black text-lg text-black mb-2 group-hover:text-[#FF0069] transition-colors">{card.title}</h3>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">{card.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ SECTION 2: EYE CONCERN SOLUTION ═════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-[#FFF5F8] to-[#FFF8F0] border-t border-black/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-black mb-4">Targeted Solutions</h2>
            <p className="text-gray-500 font-medium max-w-xl mx-auto text-lg">
              Address your specific under-eye concerns with clinical precision and soothing hydration.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* Left: Interactive Cards Slider (Mobile) / Grid (Desktop) */}
            <div className="w-full lg:w-5/12">
              <div className="flex overflow-x-auto hide-scrollbar lg:grid lg:grid-cols-1 gap-4 pb-4 lg:pb-0 snap-x">
                {[
                  { id: 'dark-circles', title: "Dark Circles", icon: <Sunrise size={24} />, desc: "Brightens pigmentation and evens tone." },
                  { id: 'puffy-eyes', title: "Puffy Eyes", icon: <Snowflake size={24} />, desc: "Instantly cools, soothes, and depuffs." },
                  { id: 'fine-lines', title: "Fine Lines", icon: <Sparkles size={24} />, desc: "Plumps and smooths delicate skin." },
                  { id: 'dry-eyes', title: "Dry Under Eyes", icon: <Droplets size={24} />, desc: "Delivers a surge of deep hydration." }
                ].map((concern) => (
                  <button
                    key={concern.id}
                    onClick={() => setActiveTab(concern.id)}
                    onMouseEnter={() => setActiveTab(concern.id)}
                    className={`snap-center shrink-0 w-[240px] lg:w-full text-left p-6 rounded-3xl border transition-all duration-300 flex items-start gap-5 ${
                      activeTab === concern.id 
                        ? 'bg-white border-[#FFD1E5] shadow-[0_15px_40px_rgba(255,0,105,0.12)] scale-100 lg:scale-105 z-10' 
                        : 'bg-white/50 border-transparent hover:bg-white/80 scale-100'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                      activeTab === concern.id ? 'bg-[#FF0069] text-white' : 'bg-[#FFF5F8] text-[#FF0069]'
                    }`}>
                      {concern.icon}
                    </div>
                    <div>
                      <h3 className={`font-heading font-black text-lg mb-1 ${activeTab === concern.id ? 'text-[#FF0069]' : 'text-black'}`}>
                        {concern.title}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">{concern.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Dynamic Content Display */}
            <div className="w-full lg:w-7/12 flex items-center justify-center min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white flex flex-col md:flex-row items-center gap-10 w-full relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#FF0069]/5 to-transparent rounded-bl-full pointer-events-none" />
                  
                  <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full bg-[#FFF5F8] p-4 relative flex items-center justify-center shadow-inner">
                    <motion.img 
                      initial={{ rotate: -10, scale: 0.8 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ duration: 0.6, type: "spring" }}
                      src={patchesImg} 
                      alt="Solution" 
                      className="w-full h-full object-contain"
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 border-4 border-[#FF0069]/20 rounded-full"
                    />
                  </div>

                  <div className="flex-1 text-center md:text-left relative z-10">
                    <motion.span 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                      className="text-[#FF0069] text-xs font-bold tracking-widest uppercase mb-3 block"
                    >
                      Clinically Proven
                    </motion.span>
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                      className="text-2xl md:text-3xl font-heading font-black text-black mb-4"
                    >
                      {activeTab === 'dark-circles' && "Say Goodbye to Dark Circles"}
                      {activeTab === 'puffy-eyes' && "Instant Depuffing Action"}
                      {activeTab === 'fine-lines' && "Plump & Smooth Fine Lines"}
                      {activeTab === 'dry-eyes' && "Intense Deep Hydration"}
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                      className="text-gray-600 leading-relaxed font-medium"
                    >
                      {activeTab === 'dark-circles' && "Formulated with potent Niacinamide and Caffeine extract, our hydrogel technology actively targets pigmentation, brightening the entire orbital area in just 15 minutes."}
                      {activeTab === 'puffy-eyes' && "Experience an instant cooling sensation as the hydrogel adheres to your skin. The cold-therapy effect combined with Aloe Vera immediately reduces morning puffiness."}
                      {activeTab === 'fine-lines' && "Infused with Collagen Amino Acids, these patches deliver concentrated firming ingredients directly into the epidermis, visibly smoothing out crow's feet and fine lines."}
                      {activeTab === 'dry-eyes' && "A powerful surge of Hyaluronic Acid locks in moisture, reviving tired, dehydrated skin and leaving your under-eyes feeling exceptionally soft, supple, and refreshed."}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* ══ SECTION 3: BEFORE BED ROUTINE ═══════════════════════════════════ */}
      <section className="py-24 bg-white border-t border-black/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-black mb-4">Before Bed Routine</h2>
            <p className="text-gray-500 font-medium max-w-xl mx-auto text-lg">
              Follow these simple steps for maximum absorption and waking up to perfectly glowing skin.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Timeline Line (Desktop) */}
            <div className="hidden lg:block absolute top-[100px] left-[10%] right-[10%] h-1 bg-gray-100 rounded-full">
              <motion.div 
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-[#FF0069]/20 via-[#FF0069] to-[#FF0069]/20 rounded-full"
              />
            </div>

            <div className="flex overflow-x-auto lg:overflow-visible hide-scrollbar lg:grid lg:grid-cols-4 gap-6 lg:gap-8 snap-x pb-8">
              {[
                { step: 1, title: "Cleanse", name: "COSKINn Cleanser", desc: "Remove impurities and makeup.", img: MASK_IMG, delay: 0.2 },
                { step: 2, title: "Prep", name: "COSKINn Face Mist", desc: "Balance and hydrate the canvas.", img: MASK_IMG, delay: 0.4 },
                { step: 3, title: "Treat", name: "Under Eye Patches", desc: "Target dark circles and puffiness.", img: patchesImg, delay: 0.6 },
                { step: 4, title: "Seal", name: "Overnight Mask", desc: "Lock in moisture while you sleep.", img: MASK_IMG, delay: 0.8 },
              ].map((routine, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: routine.delay }}
                  className="snap-center shrink-0 w-[280px] lg:w-full group relative flex flex-col items-center text-center"
                >
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-[#FF0069] text-[#FF0069] font-bold flex items-center justify-center text-xs mb-6 relative z-10 shadow-[0_0_15px_rgba(255,0,105,0.2)] group-hover:bg-[#FF0069] group-hover:text-white transition-colors">
                    {routine.step}
                  </div>
                  
                  <div className="w-full aspect-square rounded-[2rem] bg-[#FFF5F8] p-8 mb-6 relative overflow-hidden flex items-center justify-center group-hover:shadow-[0_20px_40px_rgba(255,0,105,0.1)] transition-all duration-500 cursor-pointer">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FF0069]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <img 
                      src={routine.img} 
                      alt={routine.title}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 relative z-10"
                    />
                  </div>

                  <h4 className="text-[#FF0069] text-xs font-bold tracking-widest uppercase mb-2">Step {routine.step}: {routine.title}</h4>
                  <h3 className="font-heading font-black text-xl text-black mb-2">{routine.name}</h3>
                  
                  <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                    <p className="text-sm text-gray-500 font-medium mt-2">{routine.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 5: RECOMMENDED PRODUCTS ═════════════════════════════════ */}
      <section className="py-24 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-black/8 pb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-black text-black mb-2">Complete Your Routine</h2>
              <p className="text-gray-500 font-medium">Perfect pairings for your COSKINn Under Eye Patches.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skincareProducts.filter(p => [104, 109, 114, 110].includes(p.id)).slice(0, 4).map((item) => (
              <div 
                key={item.id}
                className="group bg-white rounded-[24px] overflow-hidden border border-black/5 hover:border-[#FF0069]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all flex flex-col"
              >
                <div 
                  className="relative aspect-[4/5] bg-[#FFF5F8] overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <button 
                    onClick={e => { e.stopPropagation(); toggleWishlist(item); }}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-[#FF0069] hover:bg-white transition-all shadow-sm"
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(item.id) ? 'fill-[#FF0069] text-[#FF0069]' : ''}`} />
                  </button>

                  <img 
                    src={item.image} alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />

                  <div className="absolute inset-x-4 bottom-4 translate-y-16 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-2">
                    <button 
                      onClick={e => { e.stopPropagation(); addToCart(item, 1); }}
                      className="flex-1 btn-secondary-skincare py-3 flex items-center justify-center gap-2 text-sm font-bold"
                    >
                      <ShoppingBag size={15} /> Add
                    </button>
                    <button 
                      onClick={e => { e.stopPropagation(); navigate(`/product/${item.id}`); }}
                      className="w-12 btn-primary-skincare flex items-center justify-center shrink-0 py-3"
                    >
                      <Eye size={15} />
                    </button>
                  </div>
                </div>

                <div 
                  className="p-5 flex-1 flex flex-col cursor-pointer"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <h3 className="font-heading font-bold text-sm text-black group-hover:text-[#FF0069] transition-colors mb-2 line-clamp-2 leading-snug">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-auto">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold text-black">{item.rating}</span>
                  </div>

                  <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-lg font-black text-black">₹{item.price}</span>
                    </div>
                    <button 
                      onClick={e => { e.stopPropagation(); addToCart(item, 1); navigate('/checkout'); }}
                      className="px-4 py-2 btn-primary-skincare text-xs font-bold"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
