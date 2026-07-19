import React, { useRef, useState, useEffect } from 'react';
import { motion, useTransform, useSpring } from 'framer-motion';
import { cosmeticColors, fonts } from '../../constants/theme';
import { ArrowRight, Sparkles, Heart, ShieldCheck, Clock, Gem } from 'lucide-react';
import heroImage from '../../assets/images/cosmetics_hero_cluster.webp';

export default function Hero() {
  const containerRef = useRef(null);

  // Scroll Parallax removed

  // 4. Mouse Parallax setup
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };

  const mouseX = useSpring(mousePosition.x * 20, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(mousePosition.y * 20, { stiffness: 50, damping: 20 });

  const imageX = useTransform(mouseX, value => value * -0.5); // Image moves slightly 
  const imageY = useTransform(mouseY, value => value * -0.5);
  const textX = useTransform(mouseX, value => value * -0.2);  // Text moves less
  const textY = useTransform(mouseY, value => value * -0.2);

  // 10. Luxury Light Particles
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    setParticles(Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 5
    })));
  }, []);

  return (
    <motion.section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{ backgroundColor: '#FCF8F9' }}
      className="relative w-full min-h-[90vh] lg:min-h-[850px] overflow-hidden flex items-center transform-gpu"
    >

      {/* 
        =========================================
        5. Background Motion
        =========================================
      */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      >
        <div
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[70%] rounded-[100%] blur-[100px]"
          style={{ background: cosmeticColors.primary }}
        />
        <div
          className="absolute right-[5%] top-[10%] w-[50vw] h-[80vh] border-[1px] rounded-full opacity-20"
          style={{ borderColor: cosmeticColors.accent }}
        />
      </motion.div>

      {/* 
        =========================================
        10. Luxury Light Particles
        =========================================
      */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ y: `${p.y}vh`, x: `${p.x}vw`, opacity: 0 }}
            animate={{
              y: [`${p.y}vh`, `${p.y - 20}vh`],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute rounded-full bg-white blur-[1px]"
            style={{ width: p.size, height: p.size }}
          />
        ))}
      </div>

      {/* 
        =========================================
        HERO IMAGE (Requirement 2, 3, 4)
        =========================================
      */}
      <motion.div
        style={{ x: imageX, y: imageY }}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="hidden lg:block absolute top-0 right-0 w-[65%] h-full pointer-events-none z-0"
      >
        {/* 2. Luxury Product Floating Effect */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full relative"
        >
          {/* 3. Soft Product Glow */}
          <motion.div
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-white/30 blur-3xl mix-blend-overlay"
          />
          <img
            src={heroImage}
            alt="COSKINn Luxury Cosmetics Collection"
            className="w-full h-full object-cover object-[center_right]"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 100%)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 100%)'
            }}
          />
        </motion.div>
      </motion.div>

      {/* 
        =========================================
        CONTENT COMPOSITION (Requirement 1)
        =========================================
      */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-2 h-full pt-[100px] lg:pt-0 pb-10 lg:pb-0 items-center pointer-events-auto">

        {/* --- DESKTOP ONLY SIDE: TYPOGRAPHY & BUTTONS --- */}
        <motion.div
          style={{ x: textX, y: textY }}
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="hidden lg:flex flex-col justify-center w-full max-w-xl z-20 mt-4 lg:mt-0"
        >
          {/* Badge */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="flex items-center gap-2 mb-4 lg:mb-6"
          >
            <span className="text-[10px] lg:text-xs tracking-[0.25em] font-bold uppercase flex items-center gap-2" style={{ color: cosmeticColors.accent }}>
              New Collection <Sparkles size={14} />
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
            }}
            className="text-[42px] md:text-6xl lg:text-[5rem] xl:text-[5.5rem] font-normal text-gray-900 leading-[1.1] mb-4 lg:mb-6"
            style={{ fontFamily: fonts.cosmetics.heading }}
          >
            Reveal Your <br />
            <span className="italic text-[44px] md:text-6xl lg:text-[5rem] xl:text-[5.5rem]" style={{ color: cosmeticColors.accent, fontWeight: 300 }}>
              Natural Glow
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="text-[15px] lg:text-lg text-gray-700 font-medium max-w-md leading-[1.6] lg:leading-[1.7] mb-6 lg:mb-10"
            style={{ fontFamily: fonts.cosmetics.body }}
          >
            High-performance cosmetics that enhance your natural beauty with elegance and confidence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="flex flex-col sm:flex-row items-center gap-3 lg:gap-4 w-full sm:w-auto mb-6 lg:mb-12"
          >
            <button
              className="w-full sm:w-auto px-8 py-3.5 lg:py-3.5 text-white rounded-full transition-transform duration-500 hover:-translate-y-1 relative overflow-hidden group shadow-[0_10px_25px_-5px_rgba(255,143,177,0.5)]"
              style={{ background: `linear-gradient(90deg, ${cosmeticColors.accent} 0%, ${cosmeticColors.primary} 100%)` }}
            >
              <span className="relative z-10 text-[13px] lg:text-xs tracking-[0.1em] font-bold uppercase flex items-center justify-center gap-2">
                Shop Cosmetics
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                animate={{ x: ['-200%', '300%'] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: "linear" }}
                className="absolute inset-0 w-[30%] bg-white/30 -skew-x-12 z-0"
              />
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-in-out" />
            </button>

            <button
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-transparent text-gray-900 border border-gray-300 transition-all duration-500 hover:-translate-y-1 hover:border-gray-500 hover:bg-white"
            >
              <span className="text-[13px] lg:text-xs tracking-[0.1em] font-bold uppercase flex items-center justify-center">
                Explore Collection
              </span>
            </button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="grid grid-cols-2 gap-x-2 lg:gap-x-4 gap-y-4 lg:gap-y-6 max-w-lg"
          >
            <div className="flex items-center gap-2 lg:gap-3 group cursor-default">
              <Heart size={16} strokeWidth={1.5} className="text-gray-800 transition-transform group-hover:scale-110 lg:w-5 lg:h-5" />
              <div className="flex flex-col">
                <span className="text-[10px] lg:text-[11px] font-bold text-gray-900 leading-tight">Cruelty Free</span>
                <span className="text-[9px] lg:text-[10px] text-gray-500">Love Animals</span>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3 group cursor-default">
              <ShieldCheck size={16} strokeWidth={1.5} className="text-gray-800 transition-transform group-hover:scale-110 lg:w-5 lg:h-5" />
              <div className="flex flex-col">
                <span className="text-[10px] lg:text-[11px] font-bold text-gray-900 leading-tight">Dermatologist Tested</span>
                <span className="text-[9px] lg:text-[10px] text-gray-500">Gentle on Skin</span>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3 group cursor-default">
              <Sparkles size={16} strokeWidth={1.5} className="text-gray-800 transition-transform group-hover:scale-110 lg:w-5 lg:h-5" />
              <div className="flex flex-col">
                <span className="text-[10px] lg:text-[11px] font-bold text-gray-900 leading-tight">Long Lasting</span>
                <span className="text-[9px] lg:text-[10px] text-gray-500">All Day Wear</span>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3 group cursor-default">
              <Gem size={16} strokeWidth={1.5} className="text-gray-800 transition-transform group-hover:scale-110 lg:w-5 lg:h-5" />
              <div className="flex flex-col">
                <span className="text-[10px] lg:text-[11px] font-bold text-gray-900 leading-tight">Premium Quality</span>
                <span className="text-[9px] lg:text-[10px] text-gray-500">Made With Care</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 
          =========================================
          MOBILE ONLY DEDICATED LAYOUT
          =========================================
        */}
        <div className="flex lg:hidden flex-col items-center w-full z-20 pt-16 pb-12 relative text-center">
          
          {/* Subtle Mobile Particles */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <motion.div animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-10 left-10 w-1.5 h-1.5 bg-white rounded-full blur-[1px]" />
            <motion.div animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-40 right-6 w-2 h-2 bg-pink-200 rounded-full blur-[2px]" />
            <motion.div animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 3, repeat: Infinity }} className="absolute bottom-40 left-8 w-1 h-1 bg-white rounded-full" />
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[90vw] h-[30vh] bg-white/20 blur-[60px] rounded-full" />
          </div>

          <div className="relative z-10 flex flex-col items-center w-full">
            
            {/* Label */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="mb-6">
              <span className="text-[10px] tracking-[0.25em] font-bold uppercase flex items-center justify-center gap-2" style={{ color: cosmeticColors.accent }}>
                New Collection <Sparkles size={12} />
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
              className="text-[44px] font-normal text-gray-900 leading-[1.05] mb-5"
              style={{ fontFamily: fonts.cosmetics.heading }}
            >
              Reveal Your <br />
              <span className="italic text-[48px]" style={{ color: cosmeticColors.accent, fontWeight: 300 }}>
                Natural Glow
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-[15px] text-gray-700 font-medium max-w-[280px] leading-[1.6] mb-8"
              style={{ fontFamily: fonts.cosmetics.body }}
            >
              Luxury cosmetics crafted to enhance beauty.
            </motion.p>

            {/* Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center w-full max-w-[280px] gap-6 mb-2"
            >
              <button
                className="w-full py-4 text-white rounded-full transition-transform duration-500 hover:-translate-y-1 relative overflow-hidden shadow-[0_15px_30px_-10px_rgba(255,143,177,0.6)]"
                style={{ background: `linear-gradient(90deg, ${cosmeticColors.accent} 0%, ${cosmeticColors.primary} 100%)` }}
              >
                <span className="relative z-10 text-[12px] tracking-[0.15em] font-bold uppercase flex items-center justify-center">
                  Shop Cosmetics
                </span>
                <motion.div animate={{ x: ['-200%', '300%'] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: "linear" }} className="absolute inset-0 w-[30%] bg-white/30 -skew-x-12 z-0" />
              </button>
              
              <button className="text-[12px] tracking-[0.1em] font-bold uppercase text-gray-500 flex items-center gap-1 hover:text-gray-900 transition-colors">
                Explore Collection <ArrowRight size={14} />
              </button>
            </motion.div>

            {/* Floating Luxury Image Composition */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
              className="w-full relative mt-8 mb-12 flex justify-center items-center"
            >
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="w-[120%] max-w-[450px] relative z-10 flex justify-center -ml-4">
                {/* 
                  mix-blend-multiply dissolves the white bounding box of the image, 
                  making the products appear seamlessly floating on the editorial background 
                */}
                <img
                  src={heroImage}
                  alt="Floating Cosmetics"
                  className="w-full h-auto object-contain mix-blend-multiply"
                />
                {/* Back glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-white/70 blur-[40px] rounded-full -z-10" />
                {/* Ground shadow simulation */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[60%] h-6 bg-[#FF0069]/10 blur-xl rounded-full -z-10" />
              </motion.div>
            </motion.div>

            {/* 2x2 Minimal Feature Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="grid grid-cols-2 gap-x-8 gap-y-10 w-full max-w-[320px]"
            >
              <div className="flex flex-col items-center gap-2.5">
                <Heart size={20} strokeWidth={1} className="text-gray-900" />
                <span className="text-[10px] font-bold text-gray-900 tracking-wider uppercase text-center">Cruelty Free</span>
              </div>
              <div className="flex flex-col items-center gap-2.5">
                <ShieldCheck size={20} strokeWidth={1} className="text-gray-900" />
                <span className="text-[10px] font-bold text-gray-900 tracking-wider uppercase text-center">Dermatologist<br/>Tested</span>
              </div>
              <div className="flex flex-col items-center gap-2.5">
                <Sparkles size={20} strokeWidth={1} className="text-gray-900" />
                <span className="text-[10px] font-bold text-gray-900 tracking-wider uppercase text-center">Long Lasting</span>
              </div>
              <div className="flex flex-col items-center gap-2.5">
                <Gem size={20} strokeWidth={1} className="text-gray-900" />
                <span className="text-[10px] font-bold text-gray-900 tracking-wider uppercase text-center">Premium<br/>Quality</span>
              </div>
            </motion.div>

          </div>
        </div>

        <div className="hidden lg:block pointer-events-none" />
      </div>
    </motion.section>
  );
}
