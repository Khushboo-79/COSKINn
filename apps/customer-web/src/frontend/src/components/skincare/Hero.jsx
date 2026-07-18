import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Leaf, Droplets, FlaskConical, Rabbit } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const themesData = [
  {
    id: 'orange',
    bg: '/bg-orange.webp',
    heading: 'Brighten Your Skin Naturally',
    subheading: 'Vitamin C powered skincare for radiant, glowing skin.',
    filterStyle: 'hue-rotate(-160deg) saturate(1.8) brightness(1.2)'
  },
  {
    id: 'strawberry',
    bg: '/bg-strawberry.webp',
    heading: 'Glow with Every Drop',
    subheading: 'Reveal naturally radiant and youthful-looking skin.',
    filterStyle: 'hue-rotate(130deg) saturate(1.3) brightness(1.1)'
  },
  {
    id: 'pomegranate',
    bg: '/bg-pomegranate.webp',
    heading: 'Powerful Antioxidant Care',
    subheading: 'Protect, repair and revive your skin every day.',
    filterStyle: 'hue-rotate(170deg) saturate(1.5) brightness(0.85)'
  },
  {
    id: 'blueberry',
    bg: '/bg-blueberry.webp',
    heading: 'Deep Hydration Starts Here',
    subheading: 'Lock in moisture for soft and healthy skin.',
    filterStyle: 'hue-rotate(10deg) saturate(1.2)'
  },
  {
    id: 'greentea',
    bg: '/bg-greentea.webp',
    heading: 'Calm. Balance. Refresh.',
    subheading: 'Gentle skincare that soothes sensitive skin.',
    filterStyle: 'hue-rotate(-50deg) saturate(1.2) brightness(1.1)'
  },
  {
    id: 'mango',
    bg: '/bg-mango.webp',
    heading: 'Nourish Your Natural Beauty',
    subheading: 'Rich hydration for soft and glowing skin.',
    filterStyle: 'hue-rotate(-200deg) saturate(2) brightness(1.15)'
  },
];

// Staggered variants for page load (only runs once)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: "spring", stiffness: 70, damping: 20 }
  }
};

export default function Hero() {
  const { theme } = useTheme();
  const [bgIndex, setBgIndex] = useState(0);
  const navigate = useNavigate();

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Preload next image dynamically to save bandwidth and boost LCP
  useEffect(() => {
    const nextTheme = themesData[(bgIndex + 1) % themesData.length];
    const img = new Image();
    img.src = nextTheme.bg;
  }, [bgIndex]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth < 1024) return; // Disable parallax on mobile
      // Normalize from -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Carousel logic (2 seconds)
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % themesData.length);
    }, 2000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  const activeTheme = themesData[bgIndex];

  // Smooth springs for parallax
  const springConfig = { damping: 30, stiffness: 80 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Layer translations
  const bgX = useTransform(smoothX, [-1, 1], ['-1.5%', '1.5%']);
  const bgY = useTransform(smoothY, [-1, 1], ['-1.5%', '1.5%']);
  const productX = useTransform(smoothX, [-1, 1], ['-1%', '1%']);
  const productY = useTransform(smoothY, [-1, 1], ['-1%', '1%']);
  const bubbleSlowX = useTransform(smoothX, [-1, 1], ['3%', '-3%']);
  const bubbleSlowY = useTransform(smoothY, [-1, 1], ['3%', '-3%']);
  const bubbleFastX = useTransform(smoothX, [-1, 1], ['6%', '-6%']);
  const bubbleFastY = useTransform(smoothY, [-1, 1], ['6%', '-6%']);

  return (
    <section className="relative w-[100vw] ml-[calc(50%-50vw)] min-h-[100svh] lg:min-h-[100vh] overflow-hidden bg-gradient-to-br from-white via-white to-gray-50 flex items-center">

      {/* Layer 1: Parallax Animated Background Carousel */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-end overflow-hidden">
        {/* Soft gradient to fade image into left content */}
        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10 w-full lg:w-[75%]"></div>

        <motion.div style={{ x: bgX, y: bgY, scale: 1.05 }} className="w-full h-[110%] absolute inset-0">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={activeTheme.id}
              src={activeTheme.bg}
              initial={bgIndex === 0 ? false : { opacity: 0 }}
              animate={{ opacity: 0.95 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              alt={`COSKINn ${activeTheme.id} Background`}
              className={`absolute inset-0 w-full h-full object-cover object-left lg:object-[80%_center] ${theme === 'cosmetics' ? 'hue-rotate-[15deg] sepia-[0.3]' : ''}`}
            />
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Layer 1.5: Foreground Products with Transition Animations */}
      <div className="absolute inset-0 z-[5] pointer-events-none flex justify-end items-center lg:right-[8%]">

        {/* Continuous Floating Wrapper */}
        <motion.div
          style={{ x: productX, y: productY }}
          whileInView={{ y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-[75%] lg:w-[50%] mt-32 lg:mt-24"
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeTheme.id}
              initial={bgIndex === 0 ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-full relative flex justify-center"
            >
              {/* Light Sweep (clipped to product area) */}
              <div className="absolute inset-0 overflow-hidden rounded-[20%] pointer-events-none z-10">
                <motion.div
                  initial={{ left: '-100%', opacity: 0 }}
                  animate={{ left: '100%', opacity: 0.35 }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                  className="absolute top-0 bottom-0 w-[50%] bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-25deg] mix-blend-overlay"
                />
              </div>

              <img
                src="/hero-products.webp"
                alt="COSKINn Premium Products"
                style={{ filter: activeTheme.filterStyle }}
                className="w-[85%] object-contain drop-shadow-[0_20px_40px_rgba(43,89,104,0.3)]"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Layer 2: Floating CSS Glass Bubbles (True Parallax Depth) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <motion.div
          style={{ x: bubbleSlowX, y: bubbleSlowY }}
          whileInView={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[30%] w-16 h-16 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm shadow-[inset_0_4px_15px_rgba(255,255,255,0.6),0_10px_30px_rgba(0,0,0,0.05)]"
        />
        <motion.div
          style={{ x: bubbleFastX, y: bubbleFastY }}
          whileInView={{ y: [0, -30, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[40%] right-[10%] w-24 h-24 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm shadow-[inset_0_4px_20px_rgba(255,255,255,0.4),0_10px_40px_rgba(0,0,0,0.05)]"
        />
        <motion.div
          style={{ x: bubbleSlowX, y: bubbleSlowY }}
          whileInView={{ y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[25%] right-[40%] w-10 h-10 rounded-full border border-white/50 bg-white/20 backdrop-blur-md shadow-[inset_0_4px_10px_rgba(255,255,255,0.7),0_10px_20px_rgba(0,0,0,0.05)]"
        />
      </div>

      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-8 lg:px-12 pt-32 pb-8 lg:pt-40 lg:pb-8 flex flex-col justify-center flex-1">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-[48%] flex flex-col items-start z-20"
          >



            {/* Dynamic Animated Heading */}
            <motion.div variants={itemVariants} className="h-[200px] sm:h-[220px] lg:h-[250px] w-full relative mb-6">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={activeTheme.id + "-h"}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem] font-heading leading-[1.05] tracking-tight"
                >
                  <span className="text-[#1F1F1F] block font-semibold">{activeTheme.heading.split(' ').slice(0, 2).join(' ')}</span>
                  <span className="text-[#FF0069] block font-medium">{activeTheme.heading.split(' ').slice(2).join(' ')}</span>
                </motion.h1>
              </AnimatePresence>
            </motion.div>

            {/* Dynamic Animated Subheading */}
            <motion.div variants={itemVariants} className="h-[60px] relative mb-10 w-full max-w-[420px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeTheme.id + "-p"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 text-[17px] sm:text-[19px] text-[#555555] leading-relaxed font-body font-medium"
                >
                  {activeTheme.subheading}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center mb-16">
              <button onClick={() => navigate('/shop-all-skincare')} className="group flex items-center justify-center gap-2 btn-primary-skincare px-8 py-4 text-[14px] font-body font-semibold tracking-wide">
                Shop Now
                <ArrowRight size={18} strokeWidth={2} className="group-hover:translate-x-1 transition-transform ml-1" />
              </button>
            </motion.div>

            <motion.div variants={containerVariants} className="flex items-center gap-6 lg:gap-8 pt-4 flex-wrap">
              <motion.div variants={itemVariants} className="flex items-center gap-3">
                <Leaf size={22} className="text-[#FF0069]" strokeWidth={1.5} />
                <span className="text-[10px] sm:text-[11px] font-body font-semibold text-[#555555] leading-tight">Safe & Gentle<br />for all skin types</span>
              </motion.div>
              <motion.div variants={itemVariants} className="w-[1px] h-8 bg-gray-300/50 hidden sm:block"></motion.div>
              <motion.div variants={itemVariants} className="flex items-center gap-3">
                <Droplets size={22} className="text-[#FF0069]" strokeWidth={1.5} />
                <span className="text-[10px] sm:text-[11px] font-body font-semibold text-[#555555] leading-tight">Dermatologically<br />Tested</span>
              </motion.div>
              <motion.div variants={itemVariants} className="w-[1px] h-8 bg-gray-300/50 hidden sm:block"></motion.div>
              <motion.div variants={itemVariants} className="flex items-center gap-3">
                <FlaskConical size={22} className="text-[#FF0069]" strokeWidth={1.5} />
                <span className="text-[10px] sm:text-[11px] font-body font-semibold text-[#555555] leading-tight">Clean & Ethical<br />Skincare</span>
              </motion.div>
              <motion.div variants={itemVariants} className="w-[1px] h-8 bg-gray-300/50 hidden lg:block"></motion.div>
              <motion.div variants={itemVariants} className="flex items-center gap-3">
                <Rabbit size={22} className="text-[#FF0069]" strokeWidth={1.5} />
                <span className="text-[10px] sm:text-[11px] font-body font-semibold text-[#555555] leading-tight">Cruelty Free<br />Always</span>
              </motion.div>
            </motion.div>

          </motion.div>
          <div className="hidden lg:block w-[50%] h-[600px]"></div>
        </div>
      </div>
    </section>
  );
}
