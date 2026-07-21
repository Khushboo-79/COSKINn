import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/common/Footer';
import SEO from '../components/common/SEO';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Images
import hero1 from '../assets/images/cosmetics_why_choose_main_new.webp';
import hero2 from '../assets/images/cosmetics_editorial_lifestyle.webp';
import hero3 from '../assets/images/cosmetics_after_model.webp';
import catEyeshadow from '../assets/images/cat_eyeshadow_palette.webp';
import catLipstick from '../assets/images/cat_magnetic_lipstick.webp';
import catBrushes from '../assets/images/makeup_brushes.png';
import catPerfume from '../assets/images/pocket_perfume.png';
import velvetBlush from '../assets/images/velvet_blush.png';
import luxuryMascara from '../assets/images/luxury_mascara_hero.png';
import giftHero from '../assets/images/gift_hero.webp';

// Hero Carousel Images
const heroImages = [
  { src: hero1, title: "The Midnight Garden", subtitle: "NEW ARRIVAL" },
  { src: hero2, title: "Royal Masquerade", subtitle: "LIMITED EDITION" },
  { src: hero3, title: "Fairy Tale Collection", subtitle: "BEST SELLER" }
];

export default function CosmeticsPage() {
  const [currentHero, setCurrentHero] = useState(0);

  // Auto-slide hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] font-body text-[#4A4A4A] overflow-x-hidden">
      <SEO title="COSKINn Cosmetics | Official Site" description="Luxury fairytale cosmetics." />

      {/* =========================================
          1. HERO CAROUSEL
          ========================================= */}
      <section className="relative w-full h-[80vh] lg:h-[90vh] overflow-hidden bg-gradient-to-br from-[#FFF0F4] to-[#FFE0E9] mt-[1px]">
        <AnimatePresence>
          <motion.img
            key={currentHero}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            src={heroImages[currentHero].src}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
        </AnimatePresence>

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 bg-black/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHero}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h3 className="text-white text-sm tracking-[0.2em] uppercase mb-4 font-medium">{heroImages[currentHero].subtitle}</h3>
              <h2 className="text-white text-5xl md:text-7xl font-heading italic mb-8 drop-shadow-md">{heroImages[currentHero].title}</h2>
              <Link to="/shop" className="bg-[#EFA8A8] text-white px-10 py-3 text-sm font-medium hover:bg-[#E59292] transition-colors tracking-widest uppercase">
                Shop Now
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentHero(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${currentHero === idx ? 'bg-white scale-125' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </section>

      {/* =========================================
          2. NEW COLLECTION SPLIT
          ========================================= */}
      <section className="w-full flex flex-col lg:flex-row bg-[#FAFAFA]">
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-10 lg:px-20 py-20 lg:py-0">
          <h4 className="text-xs tracking-widest text-gray-500 uppercase mb-4">Discover What's New</h4>
          <h2 className="text-4xl lg:text-5xl font-heading text-[#333] mb-10">Velvet Fairytale Collection</h2>
          <Link to="/collections/velvet-blush" className="bg-[#EFA8A8] text-white px-8 py-3 text-sm tracking-widest uppercase w-max hover:bg-[#E59292] transition-colors">
            View Full Collection
          </Link>
        </div>
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-[70vh]">
          <img src={hero1} alt="Collection" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* =========================================
          3. CLEAN PRODUCT CARDS
          ========================================= */}
      <section className="w-full bg-[#FAFAFA] py-16 px-6 lg:px-12 border-b border-gray-100">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <Link to="/collections/eyeshadow" className="group bg-white p-6 flex flex-col items-center text-center">
            <div className="w-full aspect-square mb-6 overflow-hidden flex items-center justify-center">
              <img src={catEyeshadow} alt="Eyeshadow" className="w-[80%] object-contain group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="text-lg font-heading text-[#333] mb-2">Fairytale 6-Color Eyeshadow</h3>
            <p className="text-gray-500">$35.00</p>
            <div className="flex gap-2 mt-4">
              <span className="w-4 h-4 rounded-full bg-[#F3D1D7]" />
              <span className="w-4 h-4 rounded-full bg-[#D1C6BB]" />
              <span className="w-4 h-4 rounded-full bg-[#E5B5B5]" />
            </div>
          </Link>

          {/* Card 2 */}
          <Link to="/collections/velvet-blush" className="group bg-white p-6 flex flex-col items-center text-center">
            <div className="w-full aspect-square mb-6 overflow-hidden flex items-center justify-center">
              <img src={velvetBlush} alt="Blush" className="w-[80%] object-contain group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="text-lg font-heading text-[#333] mb-2">Velvet Satin Blush</h3>
            <p className="text-gray-500">$26.00</p>
            <div className="flex gap-2 mt-4">
              <span className="w-4 h-4 rounded-full bg-[#FFAFC5]" />
              <span className="w-4 h-4 rounded-full bg-[#E7869E]" />
              <span className="w-4 h-4 rounded-full bg-[#F4C1C1]" />
            </div>
          </Link>

          {/* Card 3 */}
          <Link to="/collections/magnetic-lipstick" className="group bg-white p-6 flex flex-col items-center text-center">
            <div className="w-full aspect-square mb-6 overflow-hidden flex items-center justify-center">
              <img src={catLipstick} alt="Lipstick" className="w-[80%] object-contain group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="text-lg font-heading text-[#333] mb-2">Glazed Magnetic Lipstick</h3>
            <p className="text-gray-500">$20.00</p>
            <div className="flex gap-2 mt-4 text-xs text-gray-400 items-center">
              <span className="w-4 h-4 rounded-full bg-[#E08A8A]" />
              <span className="w-4 h-4 rounded-full bg-[#D4997D]" />
              <span className="w-4 h-4 rounded-full bg-[#C27070]" />
              <span className="ml-1">+3</span>
            </div>
          </Link>

        </div>
      </section>

      {/* =========================================
          4. CAMPAIGN BANNER
          ========================================= */}
      <section className="relative w-full h-[40vh] bg-[#C1D2E6] flex items-center justify-center overflow-hidden">
        <img src={hero2} alt="Campaign" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply" />
        <div className="relative z-10 text-center px-4">
          <h2 className="text-3xl md:text-5xl font-heading text-white mb-6">Spend $80+, Get a Random Full-Size product</h2>
          <span className="bg-white text-black px-6 py-2 text-xs font-bold tracking-widest uppercase">LIMITED TIME OFFER</span>
        </div>
      </section>

      {/* =========================================
          5. READY TO GIFT (Image + Grid)
          ========================================= */}
      <section className="w-full flex flex-col lg:flex-row bg-white">
        <div className="w-full lg:w-[40%] h-[50vh] lg:h-[70vh]">
          <img src={giftHero} alt="Gift Wrap" className="w-full h-full object-cover" />
        </div>
        <div className="w-full lg:w-[60%] flex flex-col px-10 py-16 justify-center">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl lg:text-5xl font-heading text-[#333] mb-4">Ready-To-Gift</h2>
              <p className="text-gray-500">Gift sets are here for you & everyone on your list</p>
            </div>
            <Link to="/shop" className="hidden lg:block bg-[#EFA8A8] text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#E59292] transition-colors">
              View Full Collection
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#FFF5F7] p-8 relative flex flex-col items-center">
              <span className="absolute top-4 right-4 bg-[#EFA8A8] text-white text-[10px] px-2 py-1 font-bold">VALUE $189</span>
              <img src={catBrushes} alt="Gift Set 1" className="w-[70%] object-contain mb-6 mix-blend-multiply" />
              <h4 className="font-heading text-[#333]">The Grand Collection Set</h4>
            </div>
            <div className="bg-[#FFF5F7] p-8 relative flex flex-col items-center">
              <span className="absolute top-4 right-4 bg-[#EFA8A8] text-white text-[10px] px-2 py-1 font-bold">VALUE $142</span>
              <img src={catPerfume} alt="Gift Set 2" className="w-[70%] object-contain mb-6 mix-blend-multiply" />
              <h4 className="font-heading text-[#333]">Perfume & Lip Bundle</h4>
            </div>
          </div>
          <Link to="/shop" className="block lg:hidden text-center mt-10 bg-[#EFA8A8] text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#E59292]">
            View Full Collection
          </Link>
        </div>
      </section>

      {/* =========================================
          6. REWARDS SPLIT
          ========================================= */}
      <section className="w-full flex flex-col-reverse lg:flex-row bg-[#FFF7F7]">
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-10 lg:px-24 py-20 lg:py-0">
          <h4 className="text-xs tracking-widest text-gray-500 uppercase mb-4">JOIN WITH 100 POINTS</h4>
          <h2 className="text-4xl lg:text-5xl font-heading text-[#333] mb-10">Get Rewarded While You Shop</h2>
          <Link to="/login" className="bg-[#EFA8A8] text-white px-8 py-3 text-sm tracking-widest uppercase w-max hover:bg-[#E59292] transition-colors">
            Join Now
          </Link>
        </div>
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-[70vh]">
          <img src={hero1} alt="Rewards" className="w-full h-full object-cover object-top" />
        </div>
      </section>

      {/* =========================================
          7. PREVIOUS COLLECTIONS GRID
          ========================================= */}
      <section className="w-full bg-white py-24 px-6 lg:px-12 text-center">
        <h2 className="text-4xl lg:text-5xl font-heading text-[#333] mb-16">Explore Previous Collections</h2>

        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/collections/velvet-blush" className="w-full aspect-[4/5] overflow-hidden group bg-[#FFF0F5] flex items-center justify-center">
            <img src={velvetBlush} alt="Velvet Blush Collection" className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700" />
          </Link>
          <Link to="/collections/mascara" className="w-full aspect-[4/5] overflow-hidden group">
            <img src={hero2} alt="Collection 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </Link>
          <Link to="/collections/eyeshadow" className="w-full aspect-[4/5] overflow-hidden group">
            <img src={hero1} alt="Collection 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </Link>
          <Link to="/collections/magnetic-lipstick" className="w-full aspect-[4/5] overflow-hidden group">
            <img src={catLipstick} alt="Magnetic Lipstick Collection" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
