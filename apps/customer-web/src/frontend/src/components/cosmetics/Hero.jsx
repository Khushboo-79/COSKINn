import React, { useRef, useState, useEffect } from 'react';
import { motion, useTransform, useSpring, useScroll, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fonts } from '../../constants/theme';
import { Sparkles, ArrowDown } from 'lucide-react';

// Product Images
import fairyPaletteClean from '../../assets/images/eyeshadow_hero_transparent.png';
import fairyBlushClean from '../../assets/images/velvet_blush.png';
import catPerfume from '../../assets/images/pocket_perfume.png';
// Background
import cosmeticsMagicalHeroBg from '../../assets/images/cosmetics_magical_hero_bg.png';

const FloatingCrystal = ({ style, className }) => (
  <motion.div className={`absolute ${className} aspect-[2/3]`} style={style}>
    {/* Real Glass/Refractive Diamond using CSS Glassmorphism */}
    <div
      className="w-full h-full absolute top-0 left-0"
      style={{
        clipPath: 'polygon(50% 0%, 100% 30%, 50% 100%, 0% 30%)',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.02) 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* 3D Facet Lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/50"></div>
      <div className="absolute top-[30%] left-0 w-full h-[1px] bg-white/40"></div>

      {/* Shiny edge reflection */}
      <div
        className="absolute top-0 left-0 w-[50%] h-full"
        style={{
          background: 'linear-gradient(to right, rgba(255,255,255,0.3) 0%, transparent 100%)',
          clipPath: 'polygon(100% 0%, 100% 100%, 0% 30%)'
        }}
      ></div>
    </div>
  </motion.div>
);

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Scroll Parallax for Crystals
  const c1Scale = useTransform(scrollY, [0, 800], [1, 6]);
  const c1X = useTransform(scrollY, [0, 800], [0, -300]);
  const c1Y = useTransform(scrollY, [0, 800], [0, -100]);
  const c1Rotate = useTransform(scrollY, [0, 800], [15, -45]);

  const c2Scale = useTransform(scrollY, [0, 800], [0.8, 5]);
  const c2X = useTransform(scrollY, [0, 800], [0, 400]);
  const c2Y = useTransform(scrollY, [0, 800], [0, 200]);
  const c2Rotate = useTransform(scrollY, [0, 800], [-20, 60]);

  const c3Scale = useTransform(scrollY, [0, 800], [0.6, 4.5]);
  const c3Y = useTransform(scrollY, [0, 800], [0, -250]);
  const c3Rotate = useTransform(scrollY, [0, 800], [45, 90]);

  // Mouse Parallax setup with useMotionValue to prevent React re-renders
  const mouseXRaw = useMotionValue(0);
  const mouseYRaw = useMotionValue(0);

  const mouseX = useSpring(mouseXRaw, { stiffness: 60, damping: 22 });
  const mouseY = useSpring(mouseYRaw, { stiffness: 60, damping: 22 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseXRaw.set(x);
    mouseYRaw.set(y);
  };

  // Parallax transforms for products
  const px1 = useTransform(mouseX, (x) => x * -20);
  const py1 = useTransform(mouseY, (y) => y * -20);
  const px2 = useTransform(mouseX, (x) => x * 35);
  const py2 = useTransform(mouseY, (y) => y * 35);
  const px3 = useTransform(mouseX, (x) => x * -40);
  const py3 = useTransform(mouseY, (y) => y * -40);
  const px4 = useTransform(mouseX, (x) => x * 25);
  const py4 = useTransform(mouseY, (y) => y * 25);

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 50, damping: 15 }
    }
  };

  const productFloat = {
    animate: (custom) => ({
      y: [0, custom.y, 0],
      rotate: [custom.r, custom.r + 2, custom.r - 2, custom.r],
      transition: {
        duration: custom.duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: custom.delay
      }
    })
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="cosmetics-hero-wrapper relative w-full h-[100vh]"
    >
      {/* =========================================
          FIXED LAYER: Background & Products
          This stays pinned in place while the page scrolls!
          ========================================= */}
      <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">

        {/* Magical Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={cosmeticsMagicalHeroBg}
            alt="Magical Background"
            className="w-full h-full object-cover object-center opacity-90 mix-blend-multiply"
          />
          <div className="hero-bg-overlay absolute inset-0 bg-gradient-to-r from-[#FFF0F4]/80 via-[#FFF0F4]/30 to-transparent"></div>

          {/* Glowing Arch Simulation */}
          <div className="absolute top-1/2 right-[25%] -translate-y-1/2 w-[60vh] h-[60vh] rounded-full border-[10px] border-white/20 shadow-[0_0_80px_rgba(255,255,255,0.4)] pointer-events-none"></div>
          <div className="absolute top-1/2 right-[25%] -translate-y-1/2 w-[55vh] h-[55vh] rounded-full bg-white/10 blur-xl pointer-events-none"></div>
        </div>

        {/* Floating Sparks */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_3px_rgba(255,255,255,0.8)]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.8, 0.2]
              }}
              transition={{
                duration: Math.random() * 3 + 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        {/* Scroll-Animated Floating Crystals */}
        <FloatingCrystal
          className="top-[20%] left-[10%] w-[90px] z-10"
          style={{ scale: c1Scale, x: c1X, y: c1Y, rotate: c1Rotate }}
        />
        <FloatingCrystal
          className="top-[45%] right-[25%] w-[110px] z-10"
          style={{ scale: c2Scale, x: c2X, y: c2Y, rotate: c2Rotate }}
        />
        <FloatingCrystal
          className="bottom-[15%] left-[45%] w-[70px] z-10"
          style={{ scale: c3Scale, y: c3Y, rotate: c3Rotate }}
        />

        {/* Fixed Products Layout */}
        <div className="relative z-10 w-full h-full max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 pt-32 lg:pt-40">
          {/* Empty spacer for the left side text */}
          <div className="w-full lg:w-[45%] hidden lg:block"></div>

          {/* RIGHT: Staggered Floating Products */}
          <motion.div
            className="w-full lg:w-[55%] h-full relative mt-10 lg:mt-0"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {/* 1. Eyeshadow Palette (Center Right) */}
            <motion.div variants={itemVariants} className="hero-product absolute top-[25%] right-[5%] lg:right-[10%] w-[380px] lg:w-[480px] z-40">
              <motion.div style={{ x: px3, y: py3 }}>
                <motion.img
                  custom={{ y: -15, r: -5, duration: 6, delay: 0.2 }}
                  variants={productFloat}
                  animate="animate"
                  src={fairyPaletteClean}
                  alt="Eyeshadow Palette"
                  className="w-full object-contain drop-shadow-[0_25px_50px_rgba(117,38,63,0.35)]"
                />
              </motion.div>
            </motion.div>

            {/* 2. Velvet Blush (Bottom Left) */}
            <motion.div variants={itemVariants} className="hero-product absolute bottom-[15%] left-[5%] lg:left-[15%] w-[260px] lg:w-[320px] z-30">
              <motion.div style={{ x: px4, y: py4 }}>
                <motion.img
                  custom={{ y: -25, r: 10, duration: 5, delay: 0.5 }}
                  variants={productFloat}
                  animate="animate"
                  src={fairyBlushClean}
                  alt="Velvet Blush"
                  className="w-full object-contain drop-shadow-[0_20px_40px_rgba(117,38,63,0.35)]"
                />
              </motion.div>
            </motion.div>

            {/* 3. Pocket Perfume (Top Center) */}
            <motion.div variants={itemVariants} className="hero-product absolute top-[10%] right-[40%] lg:right-[45%] w-[160px] lg:w-[220px] z-20">
              <motion.div style={{ x: px2, y: py1 }}>
                <motion.img
                  custom={{ y: -18, r: 15, duration: 5.5, delay: 0.8 }}
                  variants={productFloat}
                  animate="animate"
                  src={catPerfume}
                  alt="Pocket Perfume"
                  className="w-full object-contain drop-shadow-[0_20px_40px_rgba(117,38,63,0.35)]"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* =========================================
          RELATIVE LAYER: Text Content
          This scrolls up naturally with the page!
          ========================================= */}
      <div className="relative z-10 w-full h-full max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 pt-32 lg:pt-40 pointer-events-none">

        {/* LEFT: Text Content */}
        <motion.div
          className="hero-text-content w-full lg:w-[45%] flex flex-col justify-center text-[#75263F] z-20 mt-16 lg:mt-12 pointer-events-auto"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-[#D74D76]"></div>
            <span className="text-xs font-bold tracking-[0.25em] text-[#D74D76] uppercase">
              THE FAIRYTALE COLLECTION
            </span>
            <Sparkles className="w-4 h-4 text-[#D74D76]" />
          </div>

          <h1 className="text-6xl md:text-[5.5rem] lg:text-[6.5rem] leading-[1.05] tracking-tight mb-6" style={{ fontFamily: fonts.cosmetics.heading }}>
            Where <span className="font-cursive italic text-[#D74D76] font-normal pr-4">Magic</span><br />
            Meets Beauty
          </h1>

          <p className="text-base md:text-lg text-[#75263F]/80 max-w-md font-medium mb-10 leading-relaxed" style={{ fontFamily: fonts.cosmetics.body }}>
            Luxury cosmetics crafted with enchanted elegance and timeless beauty.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <Link to="/shop" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#D74D76] to-[#E56B91] text-white text-xs font-bold tracking-widest uppercase rounded-md shadow-[0_10px_25px_rgba(215,77,118,0.3)] hover:shadow-[0_15px_30px_rgba(215,77,118,0.4)] transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
              Explore Collection <Sparkles className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              <img src="https://i.pravatar.cc/100?img=5" alt="User" className="w-10 h-10 rounded-full border-2 border-[#FFF0F4] object-cover" />
              <img src="https://i.pravatar.cc/100?img=1" alt="User" className="w-10 h-10 rounded-full border-2 border-[#FFF0F4] object-cover" />
              <img src="https://i.pravatar.cc/100?img=9" alt="User" className="w-10 h-10 rounded-full border-2 border-[#FFF0F4] object-cover" />
              <img src="https://i.pravatar.cc/100?img=4" alt="User" className="w-10 h-10 rounded-full border-2 border-[#FFF0F4] object-cover" />
              <div className="w-10 h-10 rounded-full border-2 border-[#FFF0F4] bg-[#D74D76] text-white text-[10px] font-bold flex items-center justify-center z-10">
                50K+
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#75263F]">50K+ Happy Beauty Lovers</span>
              <span className="text-xs text-[#75263F]/70 font-medium">Trusted by beauty creators worldwide</span>
            </div>
          </div>
        </motion.div>

        {/* Empty space on right so the fixed products show through */}
        <div className="w-full lg:w-[55%] h-full hidden lg:block"></div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 opacity-70">
        <span className="text-[9px] font-bold tracking-[0.2em] text-[#75263F] uppercase">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-[#75263F]" />
        </motion.div>
      </div>

    </div>
  );
}
