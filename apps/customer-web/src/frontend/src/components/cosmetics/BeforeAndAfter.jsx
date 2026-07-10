import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cosmeticColors, fonts } from '../../constants/theme';
import beforeImage from '../../assets/images/cosmetics_before_model.webp';
import afterImage from '../../assets/images/cosmetics_after_model.webp';
import paletteImage from '../../assets/images/cosmetics_floating_palette.webp';
import lipstickImage from '../../assets/images/cosmetics_lipstick.webp'; // Reused from Hero assets

export default function BeforeAndAfter() {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // Scroll animations for floating elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const yFloat = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  // Handle slider drag interaction
  const handlePointerDown = (e) => {
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  };

  const updateSliderPosition = (clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  useEffect(() => {
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [isDragging]);

  const trustHighlights = [
    { title: "Highly Pigmented", style: "top-[15%] left-[-10%]" },
    { title: "Professional Finish", style: "bottom-[20%] left-[-8%]" },
    { title: "Lightweight Formula", style: "top-[25%] right-[-12%]" },
    { title: "Long Lasting", style: "bottom-[25%] right-[-10%]" },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-24 md:py-32 overflow-hidden bg-[#fafafa]"
      style={{ fontFamily: fonts.cosmetics.body }}
    >
      {/* Background Soft Glows */}
      <div 
        className="absolute top-0 right-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[150px] opacity-30 pointer-events-none"
        style={{ backgroundColor: cosmeticColors.primary }}
      />
      <div 
        className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply filter blur-[150px] opacity-20 pointer-events-none"
        style={{ backgroundColor: cosmeticColors.secondary }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h4 
            className="text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4"
            style={{ color: cosmeticColors.primary }}
          >
            The COSKINn Transformation
          </h4>
          <h2 
            className="text-5xl md:text-6xl font-bold mb-6 text-black tracking-tight"
            style={{ fontFamily: fonts.cosmetics.heading }}
          >
            Reveal Your <br className="md:hidden" />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${cosmeticColors.gradientStart}, ${cosmeticColors.gradientEnd})` }}>
              True Glamour
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Experience the transformative power of luxury. From a natural glow to an editorial masterpiece in just a few applications.
          </p>
        </motion.div>

        {/* Main Interactive Comparison Area */}
        <div className="relative max-w-5xl mx-auto flex items-center justify-center">
          
          {/* Floating Information Cards */}
          {trustHighlights.map((highlight, index) => (
            <motion.div
              key={index}
              className={`hidden md:flex absolute z-40 backdrop-blur-xl bg-white/80 border border-white/60 rounded-full px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)] items-center gap-3 pointer-events-none ${highlight.style}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
              animate={{ y: [-10, 10, -10] }}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cosmeticColors.primary }}></div>
              <span className="font-bold text-gray-800 tracking-wide text-sm">{highlight.title}</span>
            </motion.div>
          ))}

          {/* Floating Products */}
          <motion.div 
            className="absolute -top-16 -left-10 md:-top-20 md:-left-16 lg:-top-24 lg:-left-24 w-32 md:w-40 lg:w-48 z-30 pointer-events-none drop-shadow-[0_20px_40px_rgba(255,0,105,0.15)]"
            style={{ y: yFloat }}
          >
            <motion.img 
              src={paletteImage} 
              alt="COSKINn Palette" 
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-contain"
              animate={{ y: [-15, 15, -15], rotate: [-5, 5, -5] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.div 
            className="absolute -bottom-10 -right-10 md:-bottom-12 md:-right-16 lg:-bottom-16 lg:-right-24 w-28 md:w-36 lg:w-44 z-30 pointer-events-none drop-shadow-[0_20px_40px_rgba(255,0,105,0.2)]"
            style={{ y: yParallax }}
          >
            <motion.img 
              src={lipstickImage} 
              alt="COSKINn Lipstick" 
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-contain"
              animate={{ y: [15, -15, 15], rotate: [5, -5, 5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </motion.div>

          {/* Slider Container */}
          <motion.div 
            className="relative w-full aspect-[4/5] md:aspect-[16/10] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] border-[8px] border-white z-20 cursor-ew-resize select-none touch-none"
            ref={sliderRef}
            onPointerDown={handlePointerDown}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Base Image (Before) */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <img loading="lazy" 
                decoding="async"
                src={beforeImage} 
                alt="Before COSKINn Makeup" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-6 right-6 backdrop-blur-md bg-black/40 border border-white/20 rounded-full px-6 py-2">
                <span className="text-white font-bold tracking-[0.15em] text-xs uppercase">Before</span>
              </div>
            </div>

            {/* Overlay Image (After) via clip-path */}
            <div 
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img loading="lazy" 
                decoding="async"
                src={afterImage} 
                alt="After COSKINn Makeup" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6 backdrop-blur-md bg-white/40 border border-white/50 rounded-full px-6 py-2">
                <span className="text-black font-bold tracking-[0.15em] text-xs uppercase drop-shadow-sm">After</span>
              </div>
            </div>

            {/* Interactive Drag Handle */}
            <div 
              className="absolute top-0 bottom-0 w-[3px] bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.4)] z-30 pointer-events-none transition-transform duration-75"
              style={{ left: `calc(${sliderPosition}% - 1.5px)` }}
            >
              <div 
                className={`w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center border-[3px] transition-transform duration-300 ${isDragging ? 'scale-110' : 'scale-100'}`}
                style={{ borderColor: cosmeticColors.primary }}
              >
                <div className="flex gap-1">
                  <div className="w-[3px] h-4 rounded-full bg-gray-300"></div>
                  <div className="w-[3px] h-4 rounded-full bg-gray-300"></div>
                </div>
              </div>
            </div>
            
            {/* Hover Glass Shine on Container */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 mix-blend-overlay pointer-events-none z-40"
              whileHover={{ opacity: 1, x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* Call To Action */}
        <motion.div 
          className="mt-20 text-center flex justify-center z-20 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: `0 15px 35px -10px ${cosmeticColors.primary}` }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 rounded-full text-white font-bold text-lg md:text-xl tracking-wide transition-all shadow-lg flex items-center gap-4 group border border-white/20"
            style={{ background: `linear-gradient(135deg, ${cosmeticColors.primary} 0%, #ff3385 100%)` }}
          >
            <span style={{ fontFamily: fonts.cosmetics.body }}>Shop the Transformation</span>
            <motion.span 
              className="inline-block group-hover:translate-x-2 transition-transform duration-300"
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
