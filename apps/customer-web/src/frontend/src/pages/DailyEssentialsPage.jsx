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
import sunscreenImg from '../assets/images/sunscreen_spf50.webp';
import faceMistImg from '../assets/images/face_mist.webp';
import lipBalmImg from '../assets/images/lip_balm.webp';
import handCreamImg from '../assets/images/hand_cream.webp';
import pocketPerfumeImg from '../assets/images/pocket_perfume.webp';
import overnightMaskImg from '../assets/images/overnight_mask.webp';

const DAILY_ESSENTIALS_IDS = [104, 101, 102, 106, 107, 108, 103, 105];
const DAILY_ESSENTIALS_PRODUCTS = DAILY_ESSENTIALS_IDS.map(id => 
  skincareProducts.find(p => p.id === id)
).filter(Boolean);

const FRUITS = [
  { id: 1, name: 'Orange', benefit: 'Vitamin C Boost', color: '#FF9100', img: 'https://images.pexels.com/photos/2090903/pexels-photo-2090903.jpeg' },
  { id: 2, name: 'Strawberry', benefit: 'Brightening', color: '#FF006E', img: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg' },
  { id: 3, name: 'Blueberry', benefit: 'Antioxidants', color: '#7B1FA2', img: 'https://images.pexels.com/photos/1153655/pexels-photo-1153655.jpeg' },
  { id: 4, name: 'Mango', benefit: 'Deep Hydration', color: '#FFB300', img: 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg' },
  { id: 5, name: 'Pomegranate', benefit: 'Anti-Aging', color: '#C62828', img: 'https://images.pexels.com/photos/5946081/pexels-photo-5946081.jpeg' },
  { id: 6, name: 'Green Tea', benefit: 'Soothing', color: '#388E3C', img: 'https://images.pexels.com/photos/1493080/pexels-photo-1493080.jpeg' }
];

const CONCERNS = [
  { id: 'dry', name: 'Dry Skin', desc: 'Deep hydration & barrier repair' },
  { id: 'oily', name: 'Oily Skin', desc: 'Balance sebum & minimize pores' },
  { id: 'sensitive', name: 'Sensitive Skin', desc: 'Calming & redness relief' },
  { id: 'dull', name: 'Dull Skin', desc: 'Instant glow & brightening' },
  { id: 'uneven', name: 'Uneven Tone', desc: 'Fade spots & smooth texture' },
  { id: 'dehydrated', name: 'Dehydrated Skin', desc: 'Plump & retain moisture' }
];

const ROUTINE = [
  { id: 1, name: "COSKINn Cleanser", time: "Morning", img: gentleCleanserImg },
  { id: 2, name: "COSKINn Sunscreen", time: "Morning", img: sunscreenImg },
  { id: 3, name: "COSKINn Face Mist", time: "Anytime", img: faceMistImg },
  { id: 4, name: "COSKINn Lip Balm SPF", time: "Anytime", img: lipBalmImg },
  { id: 5, name: "COSKINn Overnight Mask", time: "Night", img: overnightMaskImg }
];

export default function DailyEssentialsPage() {
  return (
    <div className="w-full min-h-screen bg-[#FFF8F5] overflow-x-hidden font-sans text-[#1B1B1B]">
      
      {/* SECTION 1: EDITORIAL HERO */}
      <section className="relative w-full h-[90vh] min-h-[700px] lg:min-h-[800px] flex items-start overflow-hidden bg-gradient-to-br from-[#FFF8F5] via-[#FFF0F5] to-[#F7DCE0]/30">
        
        {/* Soft Background Glows */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3], x: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#F7DCE0] blur-[150px] rounded-full z-0 pointer-events-none translate-x-1/3 -translate-y-1/3" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#97B5C2]/30 blur-[140px] rounded-full z-0 pointer-events-none translate-y-1/3" 
        />

        {/* Full Width Background: Masked Lifestyle & Floating Products */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-hidden">
          
          {/* Soft glow behind model */}
          <motion.div 
            animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-10 top-1/4 w-[60%] h-[60%] bg-[#FF2D7A]/15 blur-[120px] rounded-full z-0" 
          />

          {/* Seamlessly Masked Lifestyle Image Full Width */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full bg-cover bg-[center_top] bg-no-repeat mix-blend-multiply z-10"
            style={{ 
              backgroundImage: `url('https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg')`,
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 25%, black 65%, black 100%)',
              maskImage: 'linear-gradient(to right, transparent 0%, transparent 25%, black 65%, black 100%)'
            }} 
          />

          {/* The 6 Floating Products */}
          <div className="absolute inset-0 w-full max-w-[1400px] mx-auto h-full flex items-end pb-[2%] pl-[40%] lg:pl-[45%] z-20">
            <div className="relative w-full max-w-[650px] h-[55vh] lg:h-[650px]">
              
              {/* 1. Cleanser (Back left) */}
              <motion.img src={gentleCleanserImg} alt="Cleanser" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: [0, -10, 0] }} transition={{ opacity: { duration: 1, delay: 0.2 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.2 } }}
                className="absolute w-[22%] max-w-[130px] drop-shadow-2xl mix-blend-multiply bottom-[45%] left-[5%]" />

              {/* 2. Face Mist (Middle left) */}
              <motion.img src={faceMistImg} alt="Face Mist" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: [0, -12, 0] }} transition={{ opacity: { duration: 1, delay: 0.4 }, y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
                className="absolute w-[25%] max-w-[140px] drop-shadow-2xl mix-blend-multiply bottom-[25%] left-[20%]" />

              {/* 3. Sunscreen (Front center left) */}
              <motion.img src={sunscreenImg} alt="Sunscreen" initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: [0, -8, 0] }} transition={{ opacity: { duration: 1, delay: 0.6 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 } }}
                className="absolute w-[28%] max-w-[160px] drop-shadow-[0_30px_30px_rgba(0,0,0,0.2)] mix-blend-multiply bottom-[10%] left-[38%] z-30" />

              {/* 4. Lip Balm (Front center right) */}
              <motion.img src={lipBalmImg} alt="Lip Balm" initial={{ opacity: 0, y: 80, rotate: -15 }} animate={{ opacity: 1, y: [0, -5, 0], rotate: -15 }} transition={{ opacity: { duration: 1, delay: 0.7 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
                className="absolute w-[18%] max-w-[100px] drop-shadow-2xl mix-blend-multiply bottom-[15%] left-[62%] z-20" />
              
              {/* 5. Hand Cream (Back right) */}
              <motion.img src={handCreamImg} alt="Hand Cream" initial={{ opacity: 0, y: 50, rotate: 10 }} animate={{ opacity: 1, y: [0, -8, 0], rotate: 10 }} transition={{ opacity: { duration: 1, delay: 0.8 }, y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 } }}
                className="absolute w-[20%] max-w-[120px] drop-shadow-2xl mix-blend-multiply bottom-[30%] left-[70%] z-10" />

              {/* 6. Pocket Perfume (Far right bottom) */}
              <motion.img src={pocketPerfumeImg} alt="Perfume" initial={{ opacity: 0, y: 40, rotate: 20 }} animate={{ opacity: 1, y: [0, -6, 0], rotate: 20 }} transition={{ opacity: { duration: 1, delay: 0.9 }, y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 } }}
                className="absolute w-[15%] max-w-[90px] drop-shadow-2xl mix-blend-multiply bottom-[12%] left-[82%] z-10" />

            </div>
          </div>
        </div>

        {/* Foreground Content Container */}
        <div className="w-full max-w-[1400px] mx-auto relative z-20 h-full flex flex-col lg:flex-row pt-28 lg:pt-36 px-6 pointer-events-none">
          
          {/* Top Left Content */}
          <div className="w-full lg:w-[40%] flex flex-col items-start text-left z-30 lg:pr-8 pointer-events-auto">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="px-4 py-1.5 bg-white/70 backdrop-blur-md rounded-full text-[#FF2D7A] font-bold text-[11px] uppercase tracking-[0.25em] shadow-sm mb-6 border border-white/50"
            >
              Daily Essentials
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-[75px] font-heading font-black leading-[1.05] mb-6 text-[#1B1B1B] tracking-tight drop-shadow-sm"
            >
              Your Everyday <br />
              Skincare Ritual <br />
              <span className="text-[#FF2D7A] font-heading font-medium italic">Starts Here</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg lg:text-xl text-gray-600 font-medium mb-10 max-w-md leading-relaxed drop-shadow-sm"
            >
              Curated for your daily life. Experience the perfect harmony of deep hydration, vital protection, and lasting glow.
            </motion.p>
            
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              onClick={() => { document.getElementById('shop-essentials').scrollIntoView({ behavior: 'smooth' }) }}
              className="px-10 py-5 bg-[#FF2D7A] text-white rounded-full font-bold uppercase tracking-widest hover:shadow-[0_20px_40px_rgba(255,45,122,0.3)] transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
            >
              Explore Collection
            </motion.button>
          </div>
        </div>
      </section>

      {/* SECTION 2: SHOP DAILY ESSENTIALS */}
      <section id="shop-essentials" className="w-full py-24 bg-[#FFF8F5] px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-black mb-4 text-[#1B1B1B]">Shop Daily Essentials</h2>
            <p className="text-gray-600 font-medium text-lg max-w-2xl mx-auto">
              Elevate your daily routine with our curated selection of premium skincare. Formulated to protect, hydrate, and renew.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {DAILY_ESSENTIALS_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: MORNING TO NIGHT ROUTINE */}
      <section className="w-full py-24 bg-gradient-to-br from-[#F7DCE0]/40 to-[#FFF0F5] px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/40 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-black mb-4 text-[#1B1B1B]">Morning To Night Routine</h2>
            <p className="text-gray-600 font-medium text-lg max-w-2xl mx-auto">
              Follow our simple, effective 5-step ritual designed to seamlessly fit into your busy schedule.
            </p>
          </div>

          <div className="flex flex-col xl:flex-row items-center justify-between gap-6 lg:gap-4 w-full">
            {ROUTINE.map((step, index) => (
              <React.Fragment key={step.id}>
                
                {/* Product Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="w-full xl:w-[18%] flex flex-col items-center bg-white/60 backdrop-blur-xl border border-white p-6 rounded-[30px] shadow-sm hover:shadow-[0_20px_40px_rgba(255,45,122,0.1)] transition-all duration-300"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF2D7A] mb-4 bg-white px-3 py-1 rounded-full shadow-sm">
                    {step.time}
                  </span>
                  <div className="w-32 h-32 mb-6 relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FF2D7A]/5 to-transparent rounded-full blur-xl" />
                    <img src={step.img} alt={step.name} className="w-full h-full object-contain drop-shadow-xl relative z-10 mix-blend-multiply" />
                  </div>
                  <h3 className="font-heading font-bold text-center text-[#1B1B1B] leading-tight">
                    Step {index + 1}
                    <br />
                    <span className="text-gray-600 font-medium text-sm mt-1 block">{step.name}</span>
                  </h3>
                </motion.div>

                {/* Arrow Separator */}
                {index < ROUTINE.length - 1 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="hidden xl:flex text-gray-300/50"
                  >
                    <ArrowRight className="w-8 h-8" />
                  </motion.div>
                )}
                
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: PICK BY SKIN CONCERN */}
      <section className="w-full py-24 bg-white px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-black mb-4 text-[#1B1B1B]">Target Your Concerns</h2>
            <p className="text-gray-600 font-medium text-lg max-w-2xl mx-auto">
              Discover the perfect essentials tailored to your unique skin profile.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {CONCERNS.map((concern, index) => (
              <motion.button
                key={concern.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                onClick={() => document.getElementById('shop-essentials').scrollIntoView({ behavior: 'smooth' })}
                className="group relative overflow-hidden bg-[#FFF8F5] rounded-3xl p-8 text-left border border-black/5 hover:shadow-[0_20px_40px_rgba(255,45,122,0.08)] transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF2D7A]/5 rounded-full blur-2xl group-hover:bg-[#FF2D7A]/15 transition-colors duration-500" />
                <h3 className="font-heading font-bold text-2xl text-[#1B1B1B] mb-2 group-hover:text-[#FF2D7A] transition-colors relative z-10">{concern.name}</h3>
                <p className="text-gray-500 font-medium relative z-10">{concern.desc}</p>
                <div className="absolute bottom-8 right-8 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10">
                  <ArrowRight className="w-5 h-5 text-[#FF2D7A]" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: FRUIT POWERED INGREDIENTS */}
      <section className="w-full py-24 bg-gradient-to-br from-[#FFF8F5] via-[#F7DCE0]/40 to-[#97B5C2]/20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-black mb-4 text-[#1B1B1B]">Signature Fruit Complex</h2>
            <p className="text-gray-600 font-medium text-lg max-w-2xl mx-auto">
              Nature's most potent antioxidants, expertly extracted to power your daily glow.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {FRUITS.map((fruit, index) => (
              <motion.div
                key={fruit.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative h-[300px] rounded-[30px] overflow-hidden flex flex-col items-center justify-end p-6 border border-white bg-white/60 backdrop-blur-xl shadow-sm hover:shadow-[0_20px_40px_rgba(43,89,104,0.1)] transition-all duration-300"
              >
                {/* Background Glow */}
                <div 
                  className="absolute inset-0 opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500"
                  style={{ backgroundColor: fruit.color }}
                />
                
                {/* Floating Image */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-8 w-32 h-32 rounded-full overflow-hidden shadow-xl border-4 border-white"
                >
                  <img src={fruit.img} alt={fruit.name} className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700" />
                </motion.div>

                <div className="relative z-10 w-full text-center mt-auto bg-white/80 backdrop-blur-md py-3 rounded-2xl border border-white/50 shadow-sm">
                  <h3 className="font-heading font-bold text-[#1B1B1B] text-lg">{fruit.name}</h3>
                  <p className="text-[11px] font-bold uppercase tracking-widest mt-1 text-[#FF2D7A]">
                    {fruit.benefit}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: YOU MAY ALSO LIKE */}
      <section className="w-full py-24 bg-[#FFF8F5] px-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl lg:text-4xl font-heading font-black text-[#1B1B1B]">You May Also Like</h2>
            <p className="text-gray-600 mt-2 font-medium">Complete your routine with our award-winning favorites.</p>
          </div>
          <div className="hidden md:flex gap-4">
            <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#FF2D7A] hover:text-[#FF2D7A] transition-colors">
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <button className="w-12 h-12 rounded-full bg-[#FF2D7A] text-white flex items-center justify-center shadow-lg hover:-translate-y-1 transition-transform">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Slider */}
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {/* Duplicating the array to simulate 10 products for the slider */}
            {[...DAILY_ESSENTIALS_PRODUCTS, ...DAILY_ESSENTIALS_PRODUCTS].slice(0, 10).map((product, index) => (
              <div key={`slider-${index}`} className="min-w-[280px] lg:min-w-[320px] snap-start">
                <ProductCard product={{...product, id: `${product.id}-slider-${index}`}} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: NEWSLETTER */}
      <section className="w-full py-16 px-6 bg-[#FFF8F5]">
        <div className="max-w-[1200px] mx-auto bg-gradient-to-r from-[#FFF0F5] to-[#F7DCE0] rounded-[40px] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl border border-white/60 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/40 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-heading font-black text-[#1B1B1B] mb-2">Join the COSKINn Glow Club</h2>
            <p className="text-gray-600 font-medium text-lg">Unlock exclusive drops, expert skincare tips, and early access.</p>
          </div>
          
          <div className="relative z-10 w-full max-w-md flex bg-white rounded-full p-2 shadow-lg border border-white/50">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-transparent border-none outline-none px-6 text-[#1B1B1B] placeholder-gray-400 font-medium"
            />
            <button className="bg-[#FF2D7A] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95 text-sm">
              Subscribe
            </button>
          </div>
          
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
