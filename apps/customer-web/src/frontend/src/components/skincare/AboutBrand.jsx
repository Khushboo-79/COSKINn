import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* =========================================
   1. DATA
   ========================================= */

const ingredients = [
  { name: 'Orange', benefit: 'Vitamin C & Brightening' },
  { name: 'Strawberry', benefit: 'Antioxidant Defense' },
  { name: 'Pomegranate', benefit: 'Cellular Renewal' },
  { name: 'Blueberry', benefit: 'Skin Protection' },
  { name: 'Green Tea', benefit: 'Calming Balance' },
  { name: 'Mango', benefit: 'Deep Hydration' }
];

/* =========================================
   2. MAIN COMPONENT
   ========================================= */

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth parallax values for different elements to create depth
  const yImage1 = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const yImage2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const yBg = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#fcfaf9] py-32 lg:py-48 overflow-hidden font-body text-black selection:bg-theme-secondary selection:text-black"
    >
      {/* 
        =========================================
        LUXURY LAYERED BACKGROUND
        =========================================
      */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(247,220,224,0.3)_0%,rgba(202,186,177,0.05)_50%,rgba(255,255,255,0)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(151,181,194,0.1)_0%,rgba(255,255,255,0)_60%)]" />
        
        <motion.div 
          style={{ y: yBg }}
          className="absolute top-[10%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-theme-secondary/20 blur-[140px] mix-blend-multiply"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-theme-accent/15 blur-[150px]"
        />

        {/* Ambient background typography */}
        <div className="absolute top-[20%] left-[-5%] opacity-[0.03] select-none pointer-events-none whitespace-nowrap">
          <h1 className="font-heading text-[18vw] leading-none tracking-tight">PHILOSOPHY</h1>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* 
          =========================================
          SCENE 1: EDITORIAL HEADER & MAIN VISUAL
          =========================================
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          
          {/* Main Typography Block */}
          <motion.div 
            style={{ y: yText }}
            className="lg:col-span-5 lg:col-start-2 pt-10 lg:pt-0 pb-10 lg:pb-24 z-20"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-8 lg:mb-12"
            >
              <div className="h-[1px] w-12 bg-black/40" />
              <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-black/60">Our Story</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-heading text-[3.8rem] sm:text-[4.5rem] lg:text-[5.5rem] leading-[1.05] tracking-tight text-black"
            >
              Nature <br/>
              <span className="italic font-light text-theme-accent">inspires</span>.<br/>
              Science <br/>
              <span className="italic font-light text-theme-primary">perfects</span>.
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-12 text-[17px] sm:text-[18px] text-black/75 font-medium leading-[2] max-w-[450px]"
            >
              COSKINn believes skincare should feel luxurious, gentle and effective. Every product is carefully designed for healthy glowing skin.
            </motion.p>
          </motion.div>

          {/* Main Visual Composition */}
          <div className="lg:col-span-6 relative z-10 lg:-mt-20">
            <motion.div 
              style={{ y: window.innerWidth >= 1024 ? yImage1 : 0 }}
              className="relative w-full aspect-[3/4] lg:aspect-[4/5] rounded-[40px] lg:rounded-[60px] overflow-hidden shadow-[0_40px_100px_rgba(43,89,104,0.15)] bg-white/10 backdrop-blur-sm border border-white/60 group"
            >
              <div className="absolute inset-0 bg-black/5 mix-blend-overlay z-10 pointer-events-none" />
              
              {/* Product Branding Requirement Guarantee */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none opacity-80 mix-blend-overlay">
                <span className="font-heading text-white text-6xl lg:text-[5.5rem] font-light tracking-[0.3em] uppercase rotate-[-90deg] translate-x-4">COSKINn</span>
              </div>

              <motion.img 
                src="/premium_skincare_collection.webp" 
                alt="COSKINn Premium Skincare" 
                className="w-full h-full object-cover scale-[1.05] group-hover:scale-[1.08] transition-transform duration-[2s] ease-out" 
              />
              
              {/* Luxury Lighting Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent z-10 opacity-70 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-theme-secondary/20 to-transparent z-10 mix-blend-multiply pointer-events-none" />
            </motion.div>

            {/* Floating Glass Orb for depth */}
            <div className="absolute -left-10 bottom-20 w-24 h-24 rounded-full bg-white/20 backdrop-blur-xl border border-white/50 shadow-[0_10px_30px_rgba(43,89,104,0.1)] z-20" />
          </div>

        </div>

        {/* 
          =========================================
          SCENE 2: INGREDIENT STORY & SECONDARY VISUAL
          =========================================
        */}
        <div className="mt-32 lg:mt-56 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center">
          
          {/* Secondary Aesthetic Visual */}
          <div className="lg:col-span-5 lg:col-start-2 relative z-10">
            <motion.div 
              style={{ y: window.innerWidth >= 1024 ? yImage2 : 0 }}
              className="relative w-[85%] lg:w-full aspect-square rounded-[40px] overflow-hidden shadow-[0_30px_80px_rgba(43,89,104,0.1)] border border-white/50 group"
            >
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay z-10 pointer-events-none" />
              
              {/* Product Branding Requirement Guarantee */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none opacity-70 mix-blend-overlay">
                <span className="font-heading text-white text-5xl font-light tracking-[0.3em] uppercase rotate-[90deg] -translate-x-4">COSKINn</span>
              </div>

              <img loading="lazy" 
                src="/mockup_product_1.webp" 
                alt="COSKINn Formula Details" 
                className="w-full h-full object-cover scale-105 group-hover:scale-[1.08] transition-transform duration-[2s] ease-out" 
              />
            </motion.div>
          </div>

          {/* The Six Signature Ingredients (Overlapping Glass Panel) */}
          <div className="lg:col-span-6 relative z-20 lg:-ml-24">
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="bg-white/40 backdrop-blur-2xl border border-white/60 p-10 sm:p-14 lg:p-16 rounded-[48px] shadow-[0_25px_60px_rgba(43,89,104,0.06)] overflow-hidden relative"
            >
              {/* Inner Soft Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none z-0" />
              
              <div className="relative z-10">
                <h3 className="font-heading text-[26px] lg:text-[32px] font-medium text-black mb-10 leading-tight">
                  Six Signature Botanicals.<br/>
                  <span className="italic font-light text-theme-accent">One Harmonious Blend.</span>
                </h3>
                
                <div className="flex flex-col gap-6">
                  {ingredients.map((ing, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex items-center gap-6 group cursor-default"
                    >
                      <div className="w-2 h-2 rounded-full bg-black/10 group-hover:bg-theme-accent transition-colors duration-500 shrink-0" />
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 w-full">
                        <span className="text-[14px] lg:text-[15px] font-bold tracking-[0.2em] uppercase text-black/70 group-hover:text-black transition-colors duration-500 min-w-[140px]">
                          {ing.name}
                        </span>
                        
                        <div className="hidden sm:block flex-1 h-[1px] bg-black/5 group-hover:bg-black/15 transition-colors duration-500" />
                        
                        <span className="text-[14px] lg:text-[15px] font-medium text-black/50 group-hover:text-black/80 transition-colors duration-500">
                          {ing.benefit}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
