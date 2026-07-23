import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/common/Footer';
import SEO from '../components/common/SEO';
import { cosmeticsProducts } from '../constants/cosmeticsProducts';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Star, Gift } from 'lucide-react';

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
import fairytaleDesktopHero from '../assets/images/fairytale_desktop_hero.webp';
import fairytaleDesktopHeroNoFlowers from '../assets/images/fairytale_desktop_hero_noflowers.webp';
import fairyPaletteClean from '../assets/images/fairy_palette_clean.webp';
import fairyBlushClean from '../assets/images/fairy_blush_clean.webp';
import fairyCollectionDisplay from '../assets/images/fairy_collection_display.webp';
import fairyLipstickClean from '../assets/images/fairy_lipstick_clean.webp';
import fairyGiftBoxMain from '../assets/images/fairy_gift_box_main.webp';
import fairySetRosyDaydream from '../assets/images/fairy_set_rosy_daydream.webp';
import fairySetUnicornTreasure from '../assets/images/fairy_set_unicorn_treasure.webp';
import fairySetUnicornGrace from '../assets/images/fairy_set_unicorn_grace.webp';
import fairyRewardsCampaign from '../assets/images/fairy_rewards_campaign.webp';
import fairyEventsCampaignBright from '../assets/images/fairy_events_campaign_bright.webp';
import fairyCarriageBanner from '../assets/images/fairy_carriage_banner.webp';
import fairyGiftBannerProducts from '../assets/images/fairy_gift_banner_products.webp';

import enchantedButterfliesHeroClean from '../assets/images/enchanted_butterflies_hero_clean.webp';


// New Hover Images
import heroHover1 from '../assets/images/cat_blush_model.webp';
import giftHover from '../assets/images/hamper_valentine.webp';
import rewardsHover from '../assets/images/cosmetics_main_hero_1783264780176.webp';
import catEyesModel from '../assets/images/cat_eyes_1784312591092.webp';
import catLipModel from '../assets/images/cat_lip_liner_model.webp';

export default function CosmeticsPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX - window.innerWidth / 2) / 35;
      const y = (clientY - window.innerHeight / 2) / 35;
      setMousePosition({ x, y });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] font-body text-[#4A4A4A] overflow-x-hidden">
      <SEO title="COSKINn Cosmetics | Official Site" description="Luxury fairytale cosmetics." />

      <style>{`
        @keyframes shine-sweep {
          0% { transform: translateX(-150%) rotate(30deg); }
          100% { transform: translateX(150%) rotate(30deg); }
        }
        .luxury-shine {
          position: relative;
          overflow: hidden;
        }
        .luxury-shine::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -60%;
          width: 30%;
          height: 200%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.75) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(30deg);
          animation: shine-sweep 6s infinite ease-in-out;
        }

        @keyframes ripple-wave {
          0% { transform: scale(0.95); opacity: 0.2; }
          50% { transform: scale(1.05); opacity: 0.35; }
          100% { transform: scale(1.15); opacity: 0; }
        }
        .ripple-effect {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 25%;
          background: radial-gradient(circle at 75% 100%, rgba(255,224,233,0.3) 0%, transparent 70%);
          pointer-events: none;
        }
        .ripple-effect::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 15%;
          width: 350px;
          height: 80px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.35);
          animation: ripple-wave 8s infinite ease-in-out;
          pointer-events: none;
        }

        @keyframes dust-float-slow {
          0% { transform: translateY(0) translateX(0) scale(0.8); opacity: 0; }
          15% { opacity: 0.5; }
          85% { opacity: 0.5; }
          100% { transform: translateY(-90px) translateX(30px) scale(1.1); opacity: 0; }
        }
        .dust-particle {
          animation: dust-float-slow infinite linear;
        }

        @keyframes sparkle-glow {
          0%, 100% { opacity: 0.1; transform: scale(0.8); }
          50% { opacity: 0.95; transform: scale(1.2); }
        }
        .sparkle-decor {
          animation: sparkle-glow 3s infinite ease-in-out;
        }
      `}</style>

      {/* =========================================
          1. LUXURY COSMETICS HERO
          ========================================= */}
      <section className="relative w-full h-[95vh] lg:h-[100vh] flex items-center overflow-hidden pt-[62px] bg-[#FFF2F5]">

        {/* Full Width Background Image - Single Premium Product Display */}
        <div className="absolute inset-0 z-0">
          <img
            src={enchantedButterfliesHeroClean}
            alt="COSKINn Enchanted Butterflies Collection"
            className="absolute inset-0 w-full h-full object-cover object-center scale-[1.03]"
            style={{
              transform: `translate3d(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.15 + scrollY * 0.1}px, 0)`,
              transition: 'transform 0.4s ease-out'
            }}
          />
          {/* Reflective floor ripple wave */}
          <div className="ripple-effect"></div>
        </div>

        {/* Magic Dust: Low opacity floating particles */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {[...Array(25)].map((_, i) => {
            const randomSize = Math.random() * 3 + 1.5;
            const randomLeft = Math.random() * 100;
            const randomBottom = Math.random() * 40 + 10;
            const randomDelay = Math.random() * 8;
            const randomDuration = Math.random() * 8 + 7;
            return (
              <div
                key={`dust-${i}`}
                className="absolute rounded-full bg-white shadow-[0_0_6px_1.5px_rgba(255,200,215,0.7)] dust-particle"
                style={{
                  width: `${randomSize}px`,
                  height: `${randomSize}px`,
                  left: `${randomLeft}%`,
                  bottom: `${randomBottom}%`,
                  animationDuration: `${randomDuration}s`,
                  animationDelay: `${randomDelay}s`,
                  willChange: 'transform, opacity'
                }}
              />
            );
          })}
        </div>

        {/* Random Ethereal Stars & Diamonds in Background */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {[...Array(10)].map((_, i) => {
            const randomLeft = Math.random() * 100;
            const randomTop = Math.random() * 60;
            const randomDelay = Math.random() * 5;
            const randomDuration = Math.random() * 4 + 3;
            return (
              <div
                key={`sparkle-${i}`}
                className="absolute text-[#FFEAEF] sparkle-decor pointer-events-none opacity-40"
                style={{
                  left: `${randomLeft}%`,
                  top: `${randomTop}%`,
                  animationDelay: `${randomDelay}s`,
                  animationDuration: `${randomDuration}s`
                }}
              >
                <Sparkles className="w-4 h-4 text-white/50" />
              </div>
            );
          })}
        </div>

        {/* Floating Glass/Pearl Orbs */}
        <div
          className="absolute inset-0 pointer-events-none z-15 hidden lg:block overflow-hidden"
          style={{
            transform: `translate3d(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px, 0)`,
            transition: 'transform 0.4s ease-out'
          }}
        >
          <div className="absolute top-[18%] right-[42%] w-4 h-4 rounded-full bg-white/45 blur-[0.5px] border border-white/20 shadow-md"></div>
          <div className="absolute bottom-[35%] right-[28%] w-3 h-3 rounded-full bg-white/55 blur-[0.5px] border border-white/25 shadow-md"></div>
          <div className="absolute top-[50%] right-[8%] w-5 h-5 rounded-full bg-white/35 blur-[0.5px] border border-white/10 shadow-md"></div>
        </div>

        {/* Floating 3D Butterflies */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          {[...Array(4)].map((_, i) => {
            const delay = i * 2;
            const leftPos = 55 + i * 8;
            const topPos = 18 + i * 15;
            const scale = 0.7 + (i % 2) * 0.3;
            return (
              <motion.div
                key={`bf-${i}`}
                className="absolute pointer-events-none"
                style={{
                  left: `${leftPos}%`,
                  top: `${topPos}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, 20, 0],
                  rotateY: [0, 50, 0],
                  rotateZ: [0, 12, 0]
                }}
                transition={{
                  duration: 7 + i * 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: delay
                }}
              >
                <svg width="55" height="55" viewBox="0 0 100 100" fill="none" className="opacity-80 drop-shadow-[0_4px_12px_rgba(255,143,177,0.55)]" style={{ transform: `scale(${scale})` }}>
                  <path d="M50 50 C40 30, 20 20, 15 35 C10 50, 30 60, 50 55 C70 60, 90 50, 85 35 C80 20, 60 30, 50 50 Z" fill="url(#bf-grad-${i})" />
                  <path d="M50 50 C45 70, 30 90, 25 80 C20 70, 35 60, 50 55 C65 60, 80 70, 75 80 C70 90, 55 70, 50 50 Z" fill="url(#bf-grad-bottom-${i})" />
                  <defs>
                    <linearGradient id={`bf-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFF2F5" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#FFA6BD" stopOpacity="0.95" />
                    </linearGradient>
                    <linearGradient id={`bf-grad-bottom-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFA6BD" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#FFF2F5" stopOpacity="0.85" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            );
          })}
        </div>

        <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row h-full relative z-25 px-6 lg:px-12">

          {/* Content Area - Premium Direct Text Overlay */}
          <div className="w-full lg:w-[48%] flex flex-col justify-center pb-20 pt-32 lg:pb-32 lg:pt-36 z-25 text-[#5E1930] text-left">
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                transform: `translate3d(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4 + scrollY * 0.08}px, 0)`,
                transition: 'transform 0.4s ease-out'
              }}
            >
              {/* Subtitle Badge */}
              <div className="flex items-center gap-2 mb-3 opacity-90">
                <Sparkles className="w-3.5 h-3.5 text-[#E39BB0]" />
                <span className="text-xs font-bold tracking-[0.3em] text-[#C96E8A] uppercase">
                  FAIRY TALE BEAUTY
                </span>
              </div>

              {/* Title: Where Beauty Meets Magic */}
              <h1 className="text-6xl md:text-7xl font-heading font-medium mb-3 leading-[1.15] tracking-tight text-[#5E1930] font-playfair">
                Where Beauty <br />
                Meets <span className="font-cursive text-7xl md:text-8xl text-[#D74D76] font-normal italic inline-block mt-1 pl-2">Magic</span>
              </h1>

              {/* Delicate Plaque Divider */}
              <div className="flex items-center gap-4 my-6 opacity-80">
                <div className="h-[1px] bg-[#EFA8A8] w-12"></div>
                <div className="w-1.5 h-1.5 rotate-45 bg-[#EFA8A8]"></div>
                <div className="h-[1px] bg-[#EFA8A8] w-12"></div>
              </div>

              {/* Paragraph Description */}
              <p className="text-[#5E1930]/80 text-sm md:text-base leading-relaxed mb-10 max-w-md font-medium">
                Step into a world of enchantment with COSKINn. Luxury cosmetics inspired by fairytales, crafted to make you feel like the most beautiful you.
              </p>

              {/* Plaque Style Button */}
              <motion.div
                whileHover={{
                  y: -3,
                  boxShadow: "0 10px 25px rgba(215,77,118,0.4)",
                  scale: 1.02
                }}
                transition={{ type: "spring", stiffness: 450, damping: 14 }}
                className="inline-block"
              >
                <Link to="/shop" className="relative group px-10 py-4 bg-gradient-to-r from-[#D74D76] to-[#E56B91] text-white text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-3 border border-[#F4B4C8]/50 overflow-hidden shadow-md">
                  {/* Decorative Corner Plaque Notches */}
                  <div className="absolute top-1 left-1 w-1 h-1 bg-white/40"></div>
                  <div className="absolute top-1 right-1 w-1 h-1 bg-white/40"></div>
                  <div className="absolute bottom-1 left-1 w-1 h-1 bg-white/40"></div>
                  <div className="absolute bottom-1 right-1 w-1 h-1 bg-white/40"></div>

                  <span className="relative z-10">Discover Collection</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </section>
      {/* =========================================
          2. VELVET FAIRYTALE (CLEAN LAYOUT WITH MAGIC)
          ========================================= */}
      <section className="w-full bg-[#F7F7F9] flex flex-col lg:flex-row relative overflow-hidden mt-[2px]">

        {/* Magical Background Animations (Sparkles) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,143,177,0.6)]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -60],
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0]
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            />
          ))}
          {/* Subtle Glow Orbs */}
          <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-white/40 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-[-10%] left-[50%] w-[500px] h-[500px] bg-[#FFE0E9]/30 rounded-full blur-[100px]"></div>
        </div>

        {/* Left Side: Header & Product Grid */}
        <div className="w-full lg:w-[70%] px-8 lg:px-16 py-16 flex flex-col justify-center relative z-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <p className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-2">DISCOVER WHAT'S NEW</p>
              <h2 className="text-4xl lg:text-5xl font-heading text-[#333]">Velvet Fairytale Collection</h2>
            </div>
            <Link to="/shop" className="mt-6 md:mt-0 bg-[#EFA8A8] text-white px-8 py-3 text-xs tracking-widest font-bold uppercase hover:bg-[#E59292] transition-all duration-300 hover:shadow-[0_10px_20px_rgba(239,168,168,0.4)]">
              View Full Collection
            </Link>
          </div>

          {/* Product Cards Horizontal Scroll */}
          <div className="flex flex-row gap-6 overflow-x-auto pt-16 pb-8 snap-x snap-mandatory -mt-16 scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-transparent">

            {/* Card 1: Eyeshadow Palette */}
            <Link to="/collections/eyeshadow" className="snap-start min-w-[280px] md:min-w-[300px] w-[280px] md:w-[300px] flex-shrink-0 bg-[#FFEAEF]/90 backdrop-blur-sm flex flex-col items-center text-center p-6 hover:shadow-[0_30px_50px_rgba(239,168,168,0.2)] transition-all duration-500 border border-white relative group">
              <div className="w-full aspect-square mb-6 flex items-center justify-center p-4 relative">
                <motion.img
                  animate={{ y: [0, -10, 0] }}
                  whileHover={{ scale: 1.25, rotate: 2, y: -28, zIndex: 50 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  src={fairyPaletteClean}
                  alt="Palette"
                  className="w-[90%] object-contain drop-shadow-[0_15px_20px_rgba(117,38,63,0.15)] hover:drop-shadow-[0_25px_30px_rgba(117,38,63,0.3)] transition-all duration-500 relative z-10 cursor-pointer"
                />
              </div>
              <h3 className="text-sm font-body text-[#333] mb-2 font-medium">COSKINn Fairytale 6-Color Palette</h3>
              <p className="text-gray-500 text-sm mb-4">₹2,899</p>
              <div className="flex gap-2">
                <span className="w-4 h-4 rounded-full bg-[#F3D1D7] ring-1 ring-gray-200" />
                <span className="w-4 h-4 rounded-full bg-[#D1C6BB] ring-1 ring-gray-200" />
                <span className="w-4 h-4 rounded-full bg-[#8CA4B5] ring-1 ring-gray-200" />
              </div>
            </Link>

            {/* Card 2: Satin Blush */}
            <Link to="/collections/blush" className="snap-start min-w-[280px] md:min-w-[300px] w-[280px] md:w-[300px] flex-shrink-0 bg-[#FFEAEF]/90 backdrop-blur-sm flex flex-col items-center text-center p-6 hover:shadow-[0_30px_50px_rgba(239,168,168,0.2)] transition-all duration-500 border border-white relative group">
              <div className="w-full aspect-square mb-6 flex items-center justify-center p-4 relative">
                <motion.img
                  animate={{ y: [0, -12, 0] }}
                  whileHover={{ scale: 1.25, rotate: -2, y: -28, zIndex: 50 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  src={fairyBlushClean}
                  alt="Blush"
                  className="w-[90%] object-contain drop-shadow-[0_15px_20px_rgba(117,38,63,0.15)] hover:drop-shadow-[0_25px_30px_rgba(117,38,63,0.3)] transition-all duration-500 relative z-10 cursor-pointer"
                />
              </div>
              <h3 className="text-sm font-body text-[#333] mb-2 font-medium">COSKINn Fairytale Satin Blush</h3>
              <p className="text-gray-500 text-sm mb-4">₹2,199</p>
              <div className="flex gap-2">
                <span className="w-4 h-4 rounded-full bg-[#FFAFC5] ring-1 ring-gray-200" />
                <span className="w-4 h-4 rounded-full bg-[#E7869E] ring-1 ring-gray-200" />
                <span className="w-4 h-4 rounded-full bg-[#D8A39C] ring-1 ring-gray-200" />
              </div>
            </Link>

            {/* Card 3: Magnetic Lipstick */}
            <Link to="/collections/lips" className="snap-start min-w-[280px] md:min-w-[300px] w-[280px] md:w-[300px] flex-shrink-0 bg-[#FFEAEF]/90 backdrop-blur-sm flex flex-col items-center text-center p-6 hover:shadow-[0_30px_50px_rgba(239,168,168,0.2)] transition-all duration-500 border border-white relative group">
              <div className="w-full aspect-square mb-6 flex items-center justify-center p-4 relative">
                <motion.img
                  animate={{ y: [0, -11, 0] }}
                  whileHover={{ scale: 1.25, rotate: 2, y: -28, zIndex: 50 }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  src={fairyLipstickClean}
                  alt="Lipstick"
                  className="w-[90%] object-contain drop-shadow-[0_15px_20px_rgba(117,38,63,0.15)] hover:drop-shadow-[0_25px_30px_rgba(117,38,63,0.3)] transition-all duration-500 relative z-10 cursor-pointer"
                />
              </div>
              <h3 className="text-sm font-body text-[#333] mb-2 font-medium">COSKINn Magnetic Crystal Lipstick</h3>
              <p className="text-gray-500 text-sm mb-4">₹1,699</p>
              <div className="flex gap-2">
                <span className="w-4 h-4 rounded-full bg-[#B25367] ring-1 ring-gray-200" />
                <span className="w-4 h-4 rounded-full bg-[#E68A9D] ring-1 ring-gray-200" />
              </div>
            </Link>

            {/* Card 4: Pocket Perfume */}
            <Link to="/collections/perfume" className="snap-start min-w-[280px] md:min-w-[300px] w-[280px] md:w-[300px] flex-shrink-0 bg-[#FFEAEF]/90 backdrop-blur-sm flex flex-col items-center text-center p-6 hover:shadow-[0_30px_50px_rgba(239,168,168,0.2)] transition-all duration-500 border border-white relative group">
              <div className="w-full aspect-square mb-6 flex items-center justify-center p-4 relative">
                <motion.img
                  animate={{ y: [0, -10, 0] }}
                  whileHover={{ scale: 1.25, rotate: 3, y: -28, zIndex: 50 }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  src={catPerfume}
                  alt="Pocket Perfume"
                  className="w-[80%] object-contain drop-shadow-[0_15px_20px_rgba(117,38,63,0.15)] hover:drop-shadow-[0_25px_30px_rgba(117,38,63,0.3)] transition-all duration-500 relative z-10 cursor-pointer"
                />
              </div>
              <h3 className="text-sm font-body text-[#333] mb-2 font-medium">COSKINn Fairytale Pocket Perfume</h3>
              <p className="text-gray-500 text-sm mb-4">₹3,699</p>
              <div className="flex gap-2">
                <span className="w-4 h-4 rounded-full bg-[#E8DDF2] ring-1 ring-gray-200" />
                <span className="w-4 h-4 rounded-full bg-[#F2DDED] ring-1 ring-gray-200" />
              </div>
            </Link>

            {/* Card 5: Makeup Brushes */}
            <Link to="/collections/brushes" className="snap-start min-w-[280px] md:min-w-[300px] w-[280px] md:w-[300px] flex-shrink-0 bg-[#FFEAEF]/90 backdrop-blur-sm flex flex-col items-center text-center p-6 hover:shadow-[0_30px_50px_rgba(239,168,168,0.2)] transition-all duration-500 border border-white relative group">
              <div className="w-full aspect-square mb-6 flex items-center justify-center p-4 relative">
                <motion.img
                  animate={{ y: [0, -13, 0] }}
                  whileHover={{ scale: 1.25, rotate: -2, y: -28, zIndex: 50 }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  src={catBrushes}
                  alt="Makeup Brushes"
                  className="w-[90%] object-contain drop-shadow-[0_15px_20px_rgba(117,38,63,0.15)] hover:drop-shadow-[0_25px_30px_rgba(117,38,63,0.3)] transition-all duration-500 relative z-10 cursor-pointer"
                />
              </div>
              <h3 className="text-sm font-body text-[#333] mb-2 font-medium">COSKINn Fairytale Brush Set</h3>
              <p className="text-gray-500 text-sm mb-4">₹3,999</p>
              <div className="flex gap-2">
                <span className="w-4 h-4 rounded-full bg-[#D4AF37] ring-1 ring-gray-200" />
                <span className="w-4 h-4 rounded-full bg-[#E5B582] ring-1 ring-gray-200" />
              </div>
            </Link>

            {/* Card 6: Lift & Curl Mascara */}
            <Link to="/collections/eyes" className="snap-start min-w-[280px] md:min-w-[300px] w-[280px] md:w-[300px] flex-shrink-0 bg-[#FFEAEF]/90 backdrop-blur-sm flex flex-col items-center text-center p-6 hover:shadow-[0_30px_50px_rgba(239,168,168,0.2)] transition-all duration-500 border border-white relative group">
              <div className="w-full aspect-square mb-6 flex items-center justify-center p-4 relative">
                <motion.img
                  animate={{ y: [0, -9, 0] }}
                  whileHover={{ scale: 1.25, rotate: 2, y: -28, zIndex: 50 }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  src={luxuryMascara}
                  alt="Mascara"
                  className="w-[85%] object-contain drop-shadow-[0_15px_20px_rgba(117,38,63,0.15)] hover:drop-shadow-[0_25px_30px_rgba(117,38,63,0.3)] transition-all duration-500 relative z-10 cursor-pointer"
                />
              </div>
              <h3 className="text-sm font-body text-[#333] mb-2 font-medium">COSKINn Lift & Curl Mascara</h3>
              <p className="text-gray-500 text-sm mb-4">₹1,999</p>
              <div className="flex gap-2">
                <span className="w-4 h-4 rounded-full bg-[#000000] ring-1 ring-gray-200" />
              </div>
            </Link>

          </div>
        </div>

        {/* Right Side: Generated Luxury Fairytale Campaign Image */}
        <div className="w-full lg:w-[30%] min-h-[600px] lg:min-h-full relative overflow-hidden bg-white z-20">
          <img
            src={fairyCollectionDisplay}
            alt="Velvet Fairytale Campaign"
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[10s] hover:scale-105"
          />
          {/* Soft inner shadow/glow over the image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
        </div>
      </section>

      {/* =========================================
          4. CAMPAIGN BANNER
          ========================================= */}
      <section className="relative w-full h-[40vh] bg-black flex items-center justify-center overflow-hidden">
        <img
          src={fairyGiftBannerProducts}
          alt="Campaign"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] hover:scale-110 scale-105 blur-[3px]"
        />
        {/* Dark overlay to ensure white text is highly readable */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

        <div className="relative z-10 text-center px-4">
          <h2 className="text-3xl md:text-5xl font-heading text-white mb-6 select-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
            Spend ₹6,500+, Get a Random Full-Size product
          </h2>
          <span className="bg-white text-black px-6 py-2 text-xs font-bold tracking-widest uppercase shadow-sm">
            LIMITED TIME OFFER
          </span>
        </div>
      </section>

      {/* =========================================
          5. READY TO GIFT (Image + Grid)
          ========================================= */}
      <section className="w-full flex flex-col lg:flex-row bg-[#F7F7F9]">
        {/* Left Side: Campaign Gift Box Image */}
        <div className="w-full lg:w-[40%] h-[50vh] lg:h-[70vh] relative overflow-hidden group">
          <img
            src={fairyGiftBoxMain}
            alt="Fairy Gift Wrapping"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] hover:scale-105"
          />
          {/* Subtle gradient overlay to blend edges */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent pointer-events-none"></div>
        </div>

        {/* Right Side: Gift sets horizontal scrolling list */}
        <div className="w-full lg:w-[60%] flex flex-col px-8 lg:px-16 py-16 justify-center relative overflow-hidden">

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <h2 className="text-4xl lg:text-5xl font-heading text-[#333] mb-4">Ready-To-Gift</h2>
              <p className="text-gray-500 font-medium">Gift sets are here for you & everyone on your list</p>
            </div>
            <Link to="/shop" className="mt-6 md:mt-0 bg-[#EFA8A8] text-white px-8 py-3 text-xs tracking-widest font-bold uppercase hover:bg-[#E59292] transition-colors shadow-[0_10px_20px_rgba(239,168,168,0.3)]">
              View Full Collection
            </Link>
          </div>

          {/* Cards Row (Horizontal Scroll) */}
          <div className="flex flex-row gap-6 overflow-x-auto pt-16 pb-8 snap-x snap-mandatory -mt-16 scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-transparent">

            {/* Card 1: Rosy Daydream Set */}
            <div className="snap-start min-w-[280px] md:min-w-[300px] w-[280px] md:w-[300px] flex-shrink-0 bg-[#FFEAEF]/90 backdrop-blur-sm flex flex-col items-center text-center p-6 hover:shadow-[0_30px_50px_rgba(239,168,168,0.2)] transition-all duration-500 border border-white relative group">
              <span className="absolute top-4 right-4 bg-[#EFA8A8] text-white text-[10px] px-2 py-1 font-bold z-20 shadow-sm">VALUE ₹11,199</span>
              <span className="absolute top-4 left-4 bg-white/80 text-[#75263F] text-[9px] px-2 py-1 font-semibold z-20 border border-pink-100 uppercase tracking-wider rounded">Limited Deal</span>

              <div className="w-full aspect-square mb-6 flex items-center justify-center p-4 relative">
                <motion.img
                  animate={{ y: [0, -10, 0] }}
                  whileHover={{ scale: 1.25, rotate: 2, y: -28, zIndex: 50 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  src={fairySetRosyDaydream}
                  alt="Rosy Daydream Set"
                  className="w-[90%] object-contain drop-shadow-[0_15px_20px_rgba(117,38,63,0.15)] hover:drop-shadow-[0_25px_30px_rgba(117,38,63,0.3)] transition-all duration-500 relative z-10 cursor-pointer"
                />
              </div>
              <h3 className="text-sm font-body text-[#333] mb-2 font-medium">COSKINn Rosy Daydream Set</h3>
              <p className="text-gray-500 text-sm font-bold">₹5,799</p>
            </div>

            {/* Card 2: Unicorn Treasure Chest Set */}
            <div className="snap-start min-w-[280px] md:min-w-[300px] w-[280px] md:w-[300px] flex-shrink-0 bg-[#FFEAEF]/90 backdrop-blur-sm flex flex-col items-center text-center p-6 hover:shadow-[0_30px_50px_rgba(239,168,168,0.2)] transition-all duration-500 border border-white relative group">
              <span className="absolute top-4 right-4 bg-[#EFA8A8] text-white text-[10px] px-2 py-1 font-bold z-20 shadow-sm">VALUE ₹15,599</span>
              <span className="absolute top-4 left-4 bg-white/80 text-[#75263F] text-[9px] px-2 py-1 font-semibold z-20 border border-pink-100 uppercase tracking-wider rounded">Best Seller</span>

              <div className="w-full aspect-square mb-6 flex items-center justify-center p-4 relative">
                <motion.img
                  animate={{ y: [0, -12, 0] }}
                  whileHover={{ scale: 1.25, rotate: -2, y: -28, zIndex: 50 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  src={fairySetUnicornTreasure}
                  alt="Unicorn Treasure Chest Set"
                  className="w-[90%] object-contain drop-shadow-[0_15px_20px_rgba(117,38,63,0.15)] hover:drop-shadow-[0_25px_30px_rgba(117,38,63,0.3)] transition-all duration-500 relative z-10 cursor-pointer"
                />
              </div>
              <h3 className="text-sm font-body text-[#333] mb-2 font-medium">COSKINn Unicorn Treasure Set</h3>
              <p className="text-gray-500 text-sm font-bold">₹9,999</p>
            </div>

            {/* Card 3: Unicorn Folding Grace Set */}
            <div className="snap-start min-w-[280px] md:min-w-[300px] w-[280px] md:w-[300px] flex-shrink-0 bg-[#FFEAEF]/90 backdrop-blur-sm flex flex-col items-center text-center p-6 hover:shadow-[0_30px_50px_rgba(239,168,168,0.2)] transition-all duration-500 border border-white relative group">
              <span className="absolute top-4 right-4 bg-[#EFA8A8] text-white text-[10px] px-2 py-1 font-bold z-20 shadow-sm">VALUE ₹11,799</span>
              <span className="absolute top-4 left-4 bg-white/80 text-[#75263F] text-[9px] px-2 py-1 font-semibold z-20 border border-pink-100 uppercase tracking-wider rounded">Fairy Choice</span>

              <div className="w-full aspect-square mb-6 flex items-center justify-center p-4 relative">
                <motion.img
                  animate={{ y: [0, -10, 0] }}
                  whileHover={{ scale: 1.25, rotate: 3, y: -28, zIndex: 50 }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  src={fairySetUnicornGrace}
                  alt="Unicorn Folding Grace Set"
                  className="w-[90%] object-contain drop-shadow-[0_15px_20px_rgba(117,38,63,0.15)] hover:drop-shadow-[0_25px_30px_rgba(117,38,63,0.3)] transition-all duration-500 relative z-10 cursor-pointer"
                />
              </div>
              <h3 className="text-sm font-body text-[#333] mb-2 font-medium">COSKINn Unicorn Folding Grace</h3>
              <p className="text-gray-500 text-sm font-bold">₹7,599</p>
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
      <section className="w-full flex flex-col-reverse lg:flex-row bg-[#FFFDFD] relative overflow-hidden border-t border-[#FFE0E9]">
        {/* Background ambient glow */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#FFF0F4] to-[#FFFDFD]"></div>
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#FF8FB1] rounded-full mix-blend-multiply filter blur-[150px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#FF0069] rounded-full mix-blend-multiply filter blur-[150px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center px-10 lg:px-24 py-12 lg:py-16 relative z-10 text-[#75263F]">
          <div className="inline-flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-[#FF0069] fill-[#FF0069]" />
            <h4 className="text-xs font-bold tracking-[0.2em] text-[#FF8FB1] uppercase">Join The VIP Club</h4>
          </div>

          <h2 className="text-4xl lg:text-5xl font-heading font-black mb-4 leading-[1.1]">
            Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Rewarded</span><br />
            While You Shop
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-md font-medium">
            Join the COSKINn Coven. Earn points on every magical purchase, unlock exclusive birthday gifts, and get early access to our most enchanting collections.
          </p>

          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#FFE0E9] shadow-sm">
                <Gift className="w-5 h-5 text-[#FF0069]" />
              </div>
              <span className="font-bold tracking-wide text-sm">100 Points = ₹800 Reward</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#FFE0E9] shadow-sm">
                <Sparkles className="w-5 h-5 text-[#FF0069]" />
              </div>
              <span className="font-bold tracking-wide text-sm">Exclusive Birthday Magic Gift</span>
            </div>
          </div>

          <Link to="/login" className="group flex items-center justify-center gap-3 bg-[#FF0069] text-white px-8 py-4 rounded-full text-xs font-black tracking-widest uppercase w-max hover:bg-[#75263F] transition-all duration-500 shadow-[0_10px_30px_rgba(255,0,105,0.3)] hover:shadow-[0_15px_40px_rgba(117,38,63,0.4)] mb-2">
            Join & Get 100 Points
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
        <div className="w-full lg:w-1/2 min-h-[40vh] lg:min-h-[50vh] relative overflow-hidden group">
          <img
            src={fairyRewardsCampaign}
            alt="Rewards Campaign"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] hover:scale-105"
          />
        </div>
      </section>

      {/* =========================================
          6.5 COSKINn EVENTS SPLIT
          ========================================= */}
      <section className="w-full flex flex-col lg:flex-row bg-[#FFF6F7] relative overflow-hidden border-t border-[#FFE0E9]">
        {/* Left Side: Campaign Events Image */}
        <div className="w-full lg:w-1/2 min-h-[40vh] lg:min-h-[50vh] relative overflow-hidden group z-10">
          <img
            src={fairyEventsCampaignBright}
            alt="COSKINn Events"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] hover:scale-105"
          />
        </div>

        {/* Right Side: Text & Explore Button */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-10 lg:px-24 py-12 lg:py-16 relative z-10 text-[#75263F]">
          <div className="flex flex-col mb-4">
            <span className="text-xs font-bold tracking-[0.2em] text-[#FF8FB1] uppercase mb-3">COSKINn Events</span>
            <h2 className="text-4xl lg:text-5xl font-heading font-black mb-4 leading-[1.1] max-w-lg">
              Connections and Exclusive Events Await - Let's Celebrate Beauty Together!
            </h2>
          </div>

          <Link to="/events" className="group flex items-center justify-center gap-3 bg-[#EFA8A8] text-white px-10 py-4 rounded-none text-xs font-bold tracking-widest uppercase w-max hover:bg-[#E59292] transition-all duration-500 shadow-[0_10px_30px_rgba(239,168,168,0.3)]">
            Explore
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </section>

      {/* =========================================
          7. PREVIOUS COLLECTIONS GRID
          ========================================= */}
      <section className="w-full bg-[#FCF8F9] py-24 px-6 lg:px-12 text-center border-t border-[#FFE0E9]">
        <h2 className="text-4xl lg:text-5xl font-heading text-[#333] mb-4">Explore Previous Collections</h2>
        <p className="text-gray-500 max-w-md mx-auto mb-16 font-medium text-sm">Step back in time and discover the magic of our vintage fairytale launches.</p>

        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card 1: Velvet Blush Collection */}
          <Link to="/collections/velvet-blush" className="relative w-full aspect-[4/5] overflow-hidden group bg-[#FFEAEF]/40 border border-pink-100/50 shadow-sm flex items-center justify-center rounded-2xl hover:shadow-xl transition-all duration-500">
            <img src={fairyBlushClean} alt="Velvet Blush Collection" className="absolute inset-0 w-[80%] h-[80%] object-contain mx-auto my-auto p-4 transition-opacity duration-700 opacity-100 group-hover:opacity-0 z-10" />
            <img src={fairySetRosyDaydream} alt="Velvet Blush Hover" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 scale-100 group-hover:scale-105 z-0" />

            {/* Elegant Label Overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#75263F]/90 via-[#75263F]/50 to-transparent p-6 z-20 flex flex-col justify-end text-left h-1/2 opacity-95 group-hover:opacity-100 transition-opacity">
              <span className="text-[9px] text-[#FF8FB1] uppercase tracking-[0.2em] font-bold mb-1">COSKINn Vintage</span>
              <h3 className="font-heading text-lg text-white leading-tight font-bold">Velvet Blush Collection</h3>
            </div>
          </Link>

          {/* Card 2: Crystal Mascara Collection */}
          <Link to="/collections/mascara" className="relative w-full aspect-[4/5] overflow-hidden group bg-[#FFEAEF]/40 border border-pink-100/50 shadow-sm flex items-center justify-center rounded-2xl hover:shadow-xl transition-all duration-500">
            <img src={luxuryMascara} alt="Crystal Mascara Collection" className="absolute inset-0 w-[75%] h-[75%] object-contain mx-auto my-auto p-4 transition-opacity duration-700 opacity-100 group-hover:opacity-0 z-10" />
            <img src={fairyRewardsCampaign} alt="Crystal Mascara Hover" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 scale-100 group-hover:scale-105 z-0" />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#75263F]/90 via-[#75263F]/50 to-transparent p-6 z-20 flex flex-col justify-end text-left h-1/2 opacity-95 group-hover:opacity-100 transition-opacity">
              <span className="text-[9px] text-[#FF8FB1] uppercase tracking-[0.2em] font-bold mb-1">COSKINn Archive</span>
              <h3 className="font-heading text-lg text-white leading-tight font-bold">Crystal Mascara Collection</h3>
            </div>
          </Link>

          {/* Card 3: Fairy Eyeshadow Collection */}
          <Link to="/collections/eyeshadow" className="relative w-full aspect-[4/5] overflow-hidden group bg-[#FFEAEF]/40 border border-pink-100/50 shadow-sm flex items-center justify-center rounded-2xl hover:shadow-xl transition-all duration-500">
            <img src={fairyPaletteClean} alt="Fairy Eyeshadow Collection" className="absolute inset-0 w-[80%] h-[80%] object-contain mx-auto my-auto p-4 transition-opacity duration-700 opacity-100 group-hover:opacity-0 z-10" />
            <img src={fairyCollectionDisplay} alt="Fairy Eyeshadow Hover" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 scale-100 group-hover:scale-105 z-0" />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#75263F]/90 via-[#75263F]/50 to-transparent p-6 z-20 flex flex-col justify-end text-left h-1/2 opacity-95 group-hover:opacity-100 transition-opacity">
              <span className="text-[9px] text-[#FF8FB1] uppercase tracking-[0.2em] font-bold mb-1">COSKINn Vintage</span>
              <h3 className="font-heading text-lg text-white leading-tight font-bold">Fairy Eyeshadow Collection</h3>
            </div>
          </Link>

          {/* Card 4: Magnetic Lipstick Collection */}
          <Link to="/collections/magnetic-lipstick" className="relative w-full aspect-[4/5] overflow-hidden group bg-[#FFEAEF]/40 border border-pink-100/50 shadow-sm flex items-center justify-center rounded-2xl hover:shadow-xl transition-all duration-500">
            <img src={fairyLipstickClean} alt="Magnetic Lipstick Collection" className="absolute inset-0 w-[80%] h-[80%] object-contain mx-auto my-auto p-4 transition-opacity duration-700 opacity-100 group-hover:opacity-0 z-10" />
            <img src={fairyEventsCampaignBright} alt="Magnetic Lipstick Hover" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 scale-100 group-hover:scale-105 z-0" />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#75263F]/90 via-[#75263F]/50 to-transparent p-6 z-20 flex flex-col justify-end text-left h-1/2 opacity-95 group-hover:opacity-100 transition-opacity">
              <span className="text-[9px] text-[#FF8FB1] uppercase tracking-[0.2em] font-bold mb-1">COSKINn Archive</span>
              <h3 className="font-heading text-lg text-white leading-tight font-bold">Magnetic Lipstick Collection</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* =========================================
          8. LIVE YOUR FAIRYTALES CARRIAGE BANNER
          ========================================= */}
      <section className="relative w-full h-[35vh] md:h-[45vh] overflow-hidden flex items-center justify-center bg-black">
        <img
          src={fairyCarriageBanner}
          alt="Live Your Fairytales"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.03] transition-transform duration-[12s] hover:scale-105"
        />

        {/* Soft dark overlay to make text pop */}
        <div className="absolute inset-0 bg-black/15 pointer-events-none"></div>

        {/* Center Text with sparkles */}
        <div className="relative z-10 text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-7xl font-heading text-white select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] tracking-widest leading-none font-bold relative group">
            Live Your Fairytales
            {/* Sparkle decorative icons around the text */}
            <span className="absolute -top-6 -right-6 text-white animate-pulse">
              <Sparkles className="w-5 h-5 text-[#FFEAEF]" />
            </span>
            <span className="absolute -bottom-6 -left-6 text-white animate-pulse" style={{ animationDelay: '1s' }}>
              <Sparkles className="w-4 h-4 text-[#FFEAEF]" />
            </span>
          </h2>
        </div>
      </section>

      <Footer />
    </div>
  );
}
