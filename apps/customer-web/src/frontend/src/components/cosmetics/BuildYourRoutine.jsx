import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cosmeticColors, fonts } from '../../constants/theme';

// Reusing generated images
import beforeModel from '../../assets/images/cosmetics_before_model.webp';
import afterModel from '../../assets/images/cosmetics_after_model.webp';

import brushImg from '../../assets/images/cat_makeup_brushes.webp';
import lipLinerImg from '../../assets/images/cat_lip_liner.webp';
import blushImg from '../../assets/images/cat_blush.webp';
import paletteImg from '../../assets/images/cat_eyeshadow_palette.webp';
import mascaraImg from '../../assets/images/cat_mascara.webp';
import lipstickImg from '../../assets/images/cosmetics_lipstick.webp';
import blurImg from '../../assets/images/cat_blur.webp';
import holoImg from '../../assets/images/cat_holographic.webp';

const routineSteps = [
  { 
    step: "01", 
    title: "Prepare Base", 
    desc: "A flawless, breathable canvas begins with absolute precision. Prime your skin for ultimate luxury.", 
    product: { name: "COSKINn Brush Set", image: brushImg },
    badge: "Essential", 
    icon: "✨", 
    layout: "left",
    bgGradient: `linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 100%)`
  },
  { 
    step: "02", 
    title: "Define Contours", 
    desc: "Sculpt and elevate your natural architecture with seamless, rich pigments.", 
    product: { name: "COSKINn Lip Liner", image: lipLinerImg },
    badge: "Precision", 
    icon: "✦", 
    layout: "right",
    bgGradient: `linear-gradient(225deg, rgba(255,0,105,0.05) 0%, rgba(255,255,255,0.7) 100%)`
  },
  { 
    step: "03", 
    title: "Luminous Flush", 
    desc: "Awaken your complexion with a radiant, universally flattering liquid glow.", 
    product: { name: "COSKINn Blush", image: blushImg },
    badge: "Radiance", 
    icon: "🌸", 
    layout: "left-overlap",
    bgGradient: `linear-gradient(180deg, rgba(255,212,152,0.15) 0%, rgba(255,255,255,0.8) 100%)`
  },
  { 
    step: "04", 
    title: "Mesmerize", 
    desc: "Intense, magnetic pigments crafted for unforgettable depth and editorial drama.", 
    product: { name: "COSKINn Eyeshadow Palette", image: paletteImg },
    badge: "Pigment", 
    icon: "👁", 
    layout: "right-overlap",
    bgGradient: `linear-gradient(45deg, rgba(255,255,255,0.85) 0%, rgba(0,0,0,0.02) 100%)`
  },
  { 
    step: "05", 
    title: "Volumize", 
    desc: "Defy gravity with dramatic, feather-light luxury volume that lasts all night.", 
    product: { name: "COSKINn Mascara", image: mascaraImg },
    badge: "Drama", 
    icon: "✧", 
    layout: "left",
    bgGradient: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,0,105,0.08) 100%)`
  },
  { 
    step: "06", 
    title: "The Finish", 
    desc: "A velvet magnetic signature that commands the room. The ultimate COSKINn touch.", 
    product: { name: "COSKINn Magnetic Lipstick", image: lipstickImg },
    badge: "Signature", 
    icon: "💋", 
    layout: "centered",
    bgGradient: `linear-gradient(to top, rgba(255,0,105,0.15) 0%, rgba(255,255,255,0.8) 100%)`
  }
];

export default function BuildYourRoutine() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Fade the makeup in as the user scrolls through the routine
  const makeupOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const baseScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#fbfbfb] overflow-hidden"
      style={{ fontFamily: fonts.cosmetics.body }}
    >
      {/* Massive Sticky Background - The Beauty Campaign Visual */}
      {/* This fills the entire background, solving all empty space issues while acting as the focal point */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          {/* Ambient Overlays */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-30"></div>
          
          <div 
            className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] rounded-full mix-blend-multiply filter blur-[150px] opacity-30 z-20"
            style={{ backgroundColor: cosmeticColors.primary }}
          />
          <div 
            className="absolute bottom-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full mix-blend-multiply filter blur-[150px] opacity-20 z-20"
            style={{ backgroundColor: cosmeticColors.secondary }}
          />

          {/* Model Base - Pushed slightly to the right to balance the left-heavy text usually found in zigzags */}
          <motion.img 
            src={beforeModel} 
            alt="Natural Beauty Canvas"
            className="absolute inset-0 w-full h-full object-cover object-center lg:object-[70%_center] z-10"
            style={{ scale: baseScale }}
          />

          {/* Model Glam - Fades in */}
          <motion.img 
            src={afterModel} 
            alt="Complete COSKINn Glamour"
            className="absolute inset-0 w-full h-full object-cover object-center lg:object-[70%_center] z-20"
            style={{ opacity: makeupOpacity, scale: baseScale }}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 pb-40">
        
        {/* Section Header */}
        <div className="pt-32 pb-20 text-center relative z-20">
          <h4 
            className="text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-4 drop-shadow-md"
            style={{ color: cosmeticColors.primary }}
          >
            Your Beauty Journey
          </h4>
          <h2 
            className="text-6xl md:text-8xl font-bold mb-6 text-black tracking-tight drop-shadow-xl"
            style={{ fontFamily: fonts.cosmetics.heading }}
          >
            Signature <br className="md:hidden" />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${cosmeticColors.gradientStart}, ${cosmeticColors.gradientEnd})` }}>
              Routine
            </span>
          </h2>
        </div>

        {/* Zig-Zag Timeline Container */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative">
          
          {/* The Glowing Connection Path */}
          <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-white/80 to-transparent z-0 shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>

          <div className="flex flex-col gap-24 lg:gap-32">
            {routineSteps.map((step, index) => {
              
              // Determine Zig-Zag Position
              let alignClass = "lg:mx-auto lg:w-[60%]"; 
              let dotClass = "hidden";
              if (index === 1) { alignClass = "lg:mr-auto lg:ml-0 lg:w-[45%]"; dotClass = "lg:block left-full translate-x-1/2"; }
              if (index === 2) { alignClass = "lg:ml-auto lg:mr-0 lg:w-[45%]"; dotClass = "lg:block right-full -translate-x-1/2"; }
              if (index === 3) { alignClass = "lg:mr-auto lg:ml-0 lg:w-[45%]"; dotClass = "lg:block left-full translate-x-1/2"; }
              if (index === 4) { alignClass = "lg:ml-auto lg:mr-0 lg:w-[45%]"; dotClass = "lg:block right-full -translate-x-1/2"; }

              // Card Layout Logics
              const isRightHeavy = step.layout.includes('right');
              const isCentered = step.layout === 'centered';
              const isOverlap = step.layout.includes('overlap');

              return (
                <motion.div 
                  key={step.step}
                  className={`relative w-full ${alignClass} z-10 flex flex-col group`}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-150px" }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} 
                >
                  
                  {/* Timeline Node Connector */}
                  <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_20px_rgba(255,0,105,0.6)] border-4 z-0 ${dotClass}`} style={{ borderColor: cosmeticColors.primary }}></div>

                  {/* Redesigned Premium Glassmorphism Card */}
                  <div 
                    className={`relative w-full p-8 md:p-12 rounded-[3rem] backdrop-blur-2xl border border-white/60 shadow-[0_30px_70px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col ${isCentered ? 'items-center text-center' : 'md:flex-row'} gap-8 md:gap-12 transition-all duration-700 hover:shadow-[0_40px_80px_rgba(255,0,105,0.15)] hover:-translate-y-2`}
                    style={{ background: step.bgGradient }}
                  >
                    
                    {/* Animated Abstract Background Glows inside the Card */}
                    <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full mix-blend-overlay filter blur-[50px] opacity-40 group-hover:opacity-70 transition-opacity duration-700" style={{ backgroundColor: cosmeticColors.primary }}></div>
                    <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full mix-blend-overlay filter blur-[50px] opacity-20 group-hover:opacity-60 transition-opacity duration-700" style={{ backgroundColor: cosmeticColors.secondary }}></div>

                    {/* Vertical Luxury Badge (Hidden on Mobile) */}
                    {!isCentered && (
                      <div className="hidden md:flex absolute top-10 right-10 flex-col items-center gap-4 z-20">
                        <span className="w-[2px] h-12 bg-gradient-to-b from-pink-500 to-transparent"></span>
                        <span className="text-[10px] tracking-[0.4em] font-black uppercase rotate-90 origin-center text-gray-500 mt-12 opacity-60 group-hover:opacity-100 transition-opacity">
                          {step.badge}
                        </span>
                      </div>
                    )}

                    {/* Text Information Layer */}
                    <div className={`w-full ${isCentered ? 'md:w-3/4' : 'md:w-1/2'} flex flex-col justify-center relative z-20 ${isRightHeavy ? 'md:order-last' : ''}`}>
                      
                      {/* Giant Number Watermark */}
                      <div className={`text-[130px] font-black leading-none opacity-[0.04] absolute -top-8 select-none pointer-events-none ${isCentered ? 'left-1/2 -translate-x-1/2' : '-left-6'}`} style={{ color: cosmeticColors.primary }}>
                        {step.step}
                      </div>

                      <div className="flex items-center gap-3 mb-4 relative z-10">
                        <span className="text-2xl">{step.icon}</span>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-pink-500">{step.badge}</span>
                      </div>
                      
                      <h3 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900 leading-tight relative z-10" style={{ fontFamily: fonts.cosmetics.heading }}>
                        {step.title}
                      </h3>
                      
                      <p className={`text-gray-700 font-light text-lg leading-relaxed mb-8 relative z-10 ${isCentered ? 'mx-auto' : ''}`}>
                        {step.desc}
                      </p>
                      
                      <button className={`self-start text-xs font-bold tracking-[0.2em] uppercase border-b-2 pb-1 transition-all duration-300 relative z-10 ${isCentered ? 'mx-auto' : ''}`} style={{ borderColor: cosmeticColors.primary }}>
                        <span className="group-hover:text-pink-600">Discover Step {step.step}</span>
                      </button>
                    </div>

                    {/* Product Presentation Layer */}
                    <div className={`w-full ${isCentered ? 'md:w-2/3 h-[400px]' : 'md:w-1/2 min-h-[300px]'} relative z-20 flex flex-col items-center justify-center ${isOverlap && !isRightHeavy ? 'md:-ml-12' : ''} ${isOverlap && isRightHeavy ? 'md:-mr-12' : ''}`}>
                      
                      {/* Product Base Glow */}
                      <div className="absolute inset-0 bg-white/40 rounded-full filter blur-2xl scale-50 group-hover:scale-90 transition-transform duration-1000 ease-out z-0"></div>
                      
                      {/* Floating Product Image */}
                      <motion.img 
                        src={step.product.image} 
                        alt={step.product.name}
                        className={`w-full object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.15)] relative z-20 ${isCentered ? 'max-h-[350px]' : 'max-h-[280px]'}`}
                        whileHover={{ scale: 1.15, rotate: isRightHeavy ? 5 : -5, y: -15 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />

                      {/* Floating Glass Brand Label */}
                      <motion.div 
                        className="absolute bottom-0 md:-bottom-4 left-1/2 -translate-x-1/2 backdrop-blur-xl bg-white/70 border border-white/60 px-6 py-3 rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.1)] whitespace-nowrap z-30 flex flex-col items-center pointer-events-none"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-0.5">COSKINn</span>
                        <span className="text-xs font-black uppercase tracking-wider text-gray-900" style={{ fontFamily: fonts.cosmetics.heading }}>{step.product.name}</span>
                      </motion.div>

                      {/* Small Floating Particles around Product */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 rounded-full bg-white shadow-lg z-10"
                          style={{
                            left: `${Math.random() * 80 + 10}%`,
                            top: `${Math.random() * 80 + 10}%`,
                          }}
                          animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
                          transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}
                        />
                      ))}
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Final CTA */}
          <motion.div 
            className="pt-24 flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: `0 25px 50px -12px ${cosmeticColors.primary}` }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 rounded-full text-white font-bold text-xl tracking-widest transition-all shadow-2xl border border-white/40 group overflow-hidden relative"
              style={{ background: `linear-gradient(135deg, ${cosmeticColors.primary} 0%, #ff3385 100%)` }}
            >
              <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
              <span className="relative z-10 uppercase" style={{ fontFamily: fonts.cosmetics.body }}>Shop Your Signature Look</span>
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
