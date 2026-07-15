import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Star, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { skincareProducts } from '../constants/skincareProducts';
import ProductCard from '../components/common/ProductCard';
import Footer from '../components/common/Footer';

import gentleCleanserImg from '../assets/images/gentle_cleanser.webp';
import faceMistImg from '../assets/images/face_mist.webp';
import overnightMaskImg from '../assets/images/overnight_mask.webp';
import lipBalmImg from '../assets/images/lip_balm.webp';
import weekendHeroImg from '../assets/images/weekend_hero_lifestyle.webp';

const WEEKEND_PICKS_IDS = [104, 102, 101, 103, 106, 107, 108, 111];
const WEEKEND_PICKS = WEEKEND_PICKS_IDS.map(id => 
  skincareProducts.find(p => p.id === id)
).filter(Boolean);

const WEEKEND_RITUALS = [
  { id: 1, name: "Saturday Morning Glow", desc: "Awaken your skin with a gentle cleanse and fresh mist.", img: "https://images.pexels.com/photos/4052959/pexels-photo-4052959.jpeg" },
  { id: 2, name: "Saturday Evening Repair", desc: "Nourish deeply after a day out with rich hydration.", img: "https://images.pexels.com/photos/3785806/pexels-photo-3785806.jpeg" },
  { id: 3, name: "Sunday Refresh", desc: "A slow start with targeted treatments and eye care.", img: "https://images.pexels.com/photos/3762881/pexels-photo-3762881.jpeg" },
  { id: 4, name: "Sunday Night Recovery", desc: "Prepare for the week ahead with our Overnight Mask.", img: "https://images.pexels.com/photos/4465121/pexels-photo-4465121.jpeg" },
];

const SIGNATURE_FRUITS = [
  { id: 1, name: "Sweet Orange", benefit: "Vitamin C Boost", img: "https://images.pexels.com/photos/2090903/pexels-photo-2090903.jpeg", color: "#FF8C00" },
  { id: 2, name: "Wild Strawberry", benefit: "Brightening", img: "https://images.pexels.com/photos/70746/strawberries-red-fruit-royalty-free-70746.jpeg", color: "#FF2D7A" },
  { id: 3, name: "Mango Extract", benefit: "Deep Hydration", img: "https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg", color: "#FFB800" },
  { id: 4, name: "Blueberry", benefit: "Antioxidants", img: "https://images.pexels.com/photos/1153655/pexels-photo-1153655.jpeg", color: "#4A90E2" },
  { id: 5, name: "Pomegranate", benefit: "Skin Renewal", img: "https://images.pexels.com/photos/5946081/pexels-photo-5946081.jpeg", color: "#D0021B" },
  { id: 6, name: "Green Tea", benefit: "Soothing", img: "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg", color: "#7ED321" },
];

export default function WeekendCollectionPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] overflow-x-hidden font-sans text-[#1B1B1B]">
      
      {/* SECTION 1: EDITORIAL HERO */}
      <section className="relative w-full h-[90vh] min-h-[700px] lg:min-h-[850px] flex items-start overflow-hidden bg-gradient-to-br from-[#FFFAFA] via-[#FFF0F5] to-[#F7DCE0]/40">
        
        {/* Soft Background Glows */}
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.5, 0.4], x: [0, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[900px] h-[900px] bg-[#F7DCE0] blur-[150px] rounded-full z-0 pointer-events-none translate-x-1/3 -translate-y-1/3" 
        />
        
        {/* Background Image with Mask */}
        <div className="absolute inset-0 w-full h-full lg:w-1/2 lg:right-0 lg:left-auto flex justify-end overflow-hidden z-10 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full bg-cover bg-[center_top] bg-no-repeat mix-blend-multiply z-10"
            style={{ 
              backgroundImage: `url(${weekendHeroImg})`,
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 20%, black 65%, black 100%)',
              maskImage: 'linear-gradient(to right, transparent 0%, transparent 20%, black 65%, black 100%)'
            }} 
          />

          {/* Composite Products & Fruits on Side Table */}
          <div className="absolute inset-0 w-full max-w-[1400px] mx-auto h-full flex items-end pb-[5%] pl-[40%] lg:pl-[45%] z-20">
            <div className="relative w-full max-w-[700px] h-[60vh] lg:h-[700px]">
              
              {/* Product: Cleanser */}
              <motion.img src={gentleCleanserImg} alt="Cleanser" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: [0, -8, 0] }} transition={{ opacity: { duration: 1, delay: 0.2 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.2 } }}
                className="absolute w-[20%] max-w-[120px] drop-shadow-2xl mix-blend-multiply bottom-[40%] left-[10%]" />

              {/* Product: Face Mist */}
              <motion.img src={faceMistImg} alt="Face Mist" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: [0, -10, 0] }} transition={{ opacity: { duration: 1, delay: 0.4 }, y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
                className="absolute w-[22%] max-w-[130px] drop-shadow-2xl mix-blend-multiply bottom-[25%] left-[25%]" />

              {/* Product: Overnight Mask */}
              <motion.img src={overnightMaskImg} alt="Overnight Mask" initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: [0, -6, 0] }} transition={{ opacity: { duration: 1, delay: 0.6 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 } }}
                className="absolute w-[25%] max-w-[150px] drop-shadow-[0_30px_30px_rgba(0,0,0,0.2)] mix-blend-multiply bottom-[15%] left-[45%] z-30" />

              {/* Product: Lip Balm */}
              <motion.img src={lipBalmImg} alt="Lip Balm" initial={{ opacity: 0, y: 80, rotate: 15 }} animate={{ opacity: 1, y: [0, -5, 0], rotate: 15 }} transition={{ opacity: { duration: 1, delay: 0.7 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
                className="absolute w-[15%] max-w-[90px] drop-shadow-2xl mix-blend-multiply bottom-[20%] left-[70%] z-20" />
              
              {/* Floating Fruit Elements (Masked to be circular/soft) */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.8, y: [0, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute w-20 h-20 bottom-[45%] left-[30%] z-10"
                style={{ backgroundImage: `url('https://images.pexels.com/photos/70746/strawberries-red-fruit-royalty-free-70746.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center', WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)' }} />
                
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.7, y: [0, 5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute w-24 h-24 bottom-[30%] left-[5%] z-10"
                style={{ backgroundImage: `url('https://images.pexels.com/photos/161559/background-bitter-orange-citrus-citrus-fruit-161559.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center', WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)' }} />
                
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.75, y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute w-16 h-16 bottom-[10%] left-[35%] z-40"
                style={{ backgroundImage: `url('https://images.pexels.com/photos/1153655/pexels-photo-1153655.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center', WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)' }} />

            </div>
          </div>
        </div>

        {/* Foreground Content Container */}
        <div className="w-full max-w-[1400px] mx-auto relative z-20 h-full flex flex-col lg:flex-row pt-32 lg:pt-40 px-6 pointer-events-none">
          <div className="w-full lg:w-[45%] flex flex-col items-start text-left z-30 lg:pr-12 pointer-events-auto">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="px-5 py-2 bg-white/60 backdrop-blur-md rounded-full text-[#FF2D7A] font-bold text-xs uppercase tracking-[0.25em] shadow-sm mb-8 border border-white/40"
            >
              Weekend Collection
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-[80px] font-heading font-black leading-[1.05] mb-6 text-[#1B1B1B] tracking-tight drop-shadow-sm"
            >
              Slow Down.<br />
              <span className="text-[#FF2D7A] font-heading font-medium italic">Glow Better.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg lg:text-xl text-gray-600 font-medium mb-10 max-w-lg leading-relaxed drop-shadow-sm"
            >
              Escape the busy week and indulge in a relaxing self-care ritual with COSKINn Weekend Collection.
            </motion.p>
            
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              onClick={() => { document.getElementById('weekend-picks').scrollIntoView({ behavior: 'smooth' }) }}
              className="px-10 py-5 bg-gradient-to-r from-[#FF2D7A] to-[#FF5E95] text-white rounded-full font-bold uppercase tracking-widest hover:shadow-[0_20px_40px_rgba(255,45,122,0.3)] transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
            >
              Explore Collection
            </motion.button>
          </div>
        </div>
      </section>

      {/* SECTION 2: WEEKEND SELF-CARE PICKS */}
      <section id="weekend-picks" className="w-full py-24 bg-[#FAFAFA] px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-black mb-4 text-[#1B1B1B]">Weekend Self-Care Picks</h2>
            <p className="text-gray-600 font-medium text-lg max-w-2xl mx-auto">
              Elevate your days off with these luxurious essentials designed to repair, refresh, and restore your natural glow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WEEKEND_PICKS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: WEEKEND RITUAL */}
      <section className="w-full py-24 bg-white px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl lg:text-5xl font-heading font-black mb-4 text-[#1B1B1B]">The Weekend Ritual</h2>
              <p className="text-gray-600 font-medium text-lg">
                Four essential moments. Discover how to pace your weekend self-care routine from Saturday sunrise to Sunday sleep.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WEEKEND_RITUALS.map((ritual, index) => (
              <motion.div
                key={ritual.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative h-[450px] lg:h-[550px] rounded-[30px] overflow-hidden cursor-pointer"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                  style={{ backgroundImage: `url('${ritual.img}')` }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white z-10">
                  <span className="text-[#FF2D7A] font-bold text-xs uppercase tracking-[0.2em] mb-3 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full w-fit border border-white/20">
                    Step 0{index + 1}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-2 group-hover:-translate-y-2 transition-transform duration-500">{ritual.name}</h3>
                  <p className="text-gray-200 text-sm md:text-base font-medium opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500">
                    {ritual.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: SIGNATURE 6 FRUIT COMPLEX */}
      <section className="w-full py-24 bg-[#FFF8F5] px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-black mb-4 text-[#1B1B1B]">Signature Fruit Complex</h2>
            <p className="text-gray-600 font-medium text-lg max-w-2xl mx-auto">
              Real fruits. Real results. Our core formulas are powered by nature's most potent antioxidants.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {SIGNATURE_FRUITS.map((fruit, index) => (
              <motion.div
                key={fruit.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative w-36 h-36 lg:w-44 lg:h-44 rounded-full overflow-hidden mb-6 shadow-xl border-4 border-white group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src={fruit.img} alt={fruit.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#1B1B1B] mb-1">{fruit.name}</h3>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: fruit.color }}>
                  {fruit.benefit}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: COMPLETE YOUR WEEKEND ROUTINE */}
      <section className="w-full py-24 bg-white px-6 overflow-hidden border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto mb-12 flex flex-col md:flex-row items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl lg:text-4xl font-heading font-black text-[#1B1B1B]">Complete Your Routine</h2>
            <p className="text-gray-600 mt-2 font-medium">Pair your weekend essentials with our award-winning formulas.</p>
          </div>
          <div className="hidden md:flex gap-4">
            <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#FF2D7A] hover:text-[#FF2D7A] transition-colors">
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <button className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF2D7A] to-[#FF5E95] text-white flex items-center justify-center shadow-lg hover:-translate-y-1 transition-transform">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="w-full max-w-[1400px] mx-auto">
          <div className="flex gap-6 overflow-x-auto pb-12 pt-4 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {[...WEEKEND_PICKS, WEEKEND_PICKS[0], WEEKEND_PICKS[1]].map((product, index) => (
              <div key={`routine-${index}`} className="min-w-[280px] lg:min-w-[320px] snap-start">
                <ProductCard product={{...product, id: `${product.id}-slider-${index}`}} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: NEWSLETTER */}
      <section className="w-full py-16 px-6 bg-gradient-to-br from-[#FFFAFA] to-[#FFF0F5] relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F7DCE0]/50 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#FF2D7A]/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="max-w-[1000px] mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/40 backdrop-blur-xl border border-white/60 p-10 lg:p-14 rounded-[30px] shadow-[0_20px_40px_rgba(255,45,122,0.05)] text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-black text-[#1B1B1B] mb-4">Join The Weekend Club</h2>
            <p className="text-gray-600 font-medium mb-8 max-w-lg mx-auto">
              Sign up for exclusive access to new collection drops, relaxing weekend rituals, and special VIP offers.
            </p>

            <form className="max-w-md mx-auto relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full px-6 py-4 rounded-full bg-white/80 border border-white/50 focus:outline-none focus:ring-2 focus:ring-[#FF2D7A]/30 focus:border-[#FF2D7A] shadow-inner text-[#1B1B1B] placeholder-gray-400 font-medium transition-all"
                required
              />
              <button 
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-[#FF2D7A] to-[#FF5E95] text-white rounded-full font-bold text-sm tracking-wide hover:shadow-[0_10px_20px_rgba(255,45,122,0.2)] transition-all hover:-translate-y-0.5"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
