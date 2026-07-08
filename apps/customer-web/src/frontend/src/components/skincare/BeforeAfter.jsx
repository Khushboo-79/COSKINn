import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, animate, useInView } from 'framer-motion';
import { ChevronsLeftRight, Sparkles } from 'lucide-react';

/* =========================================
   1. ANIMATED STAT COUNTER
   ========================================= */

const StatCounter = ({ endValue, label, delay = 0 }) => {
  const count = useSpring(0, { stiffness: 40, damping: 20 });
  const rounded = useTransform(count, Math.round);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      count.set(endValue);
    }
  }, [isInView, endValue, count]);

  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="flex flex-col items-center justify-center text-center p-6 lg:p-10 bg-white/30 backdrop-blur-2xl border border-white/60 rounded-[40px] shadow-[0_20px_50px_rgba(43,89,104,0.06)] hover:shadow-[0_30px_60px_rgba(43,89,104,0.12)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-theme-secondary/20 to-theme-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="flex items-start relative z-10">
        <motion.span className="font-heading text-[4rem] lg:text-[5rem] text-black leading-none font-medium">
          {rounded}
        </motion.span>
        <span className="font-heading text-[2.5rem] lg:text-[3rem] text-[#FF0069] font-light ml-1">%</span>
      </div>
      <p className="text-[14px] lg:text-[15px] text-black/70 font-medium mt-4 max-w-[160px] leading-[1.6] uppercase tracking-[0.15em]">
        {label}
      </p>
    </motion.div>
  );
};

/* =========================================
   2. INTERACTIVE BEFORE/AFTER REVEAL
   ========================================= */

const BeforeAfterReveal = () => {
  const [sliderPos, setSliderPos] = useState(50);
  
  return (
    <div className="relative w-full aspect-[4/5] lg:aspect-[4/3] rounded-[48px] lg:rounded-[64px] overflow-hidden shadow-[0_40px_100px_rgba(43,89,104,0.15)] bg-white group border border-white/40">
      
      {/* AFTER IMAGE (Background) - Radiant, Glowing */}
      <img loading="lazy" 
        src="/why-choose-us-model.webp" 
        alt="After Transformation" 
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none" 
      />
      
      {/* Subtle Glow Overlay for After */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent mix-blend-overlay pointer-events-none" />
      
      {/* BEFORE IMAGE (Foreground) - Dull, Desaturated */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none border-r border-white/20"
        style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
      >
        <img loading="lazy" 
          src="/why-choose-us-model.webp" 
          alt="Before Transformation" 
          className="absolute inset-0 w-full h-full object-cover filter grayscale-[0.4] sepia-[0.3] brightness-90 contrast-75 blur-[1px] select-none" 
        />
        <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
      </div>

      {/* LABELS */}
      <div className="absolute top-6 lg:top-10 left-6 lg:left-10 px-5 py-2 bg-black/20 backdrop-blur-md rounded-full border border-white/10 pointer-events-none z-10 transition-opacity duration-300">
        <span className="text-[11px] lg:text-[12px] font-bold tracking-[0.2em] text-white/90 uppercase">Before</span>
      </div>
      <div className="absolute top-6 lg:top-10 right-6 lg:right-10 px-5 py-2 bg-white/30 backdrop-blur-md rounded-full border border-white/40 pointer-events-none z-10 transition-opacity duration-300">
        <span className="text-[11px] lg:text-[12px] font-bold tracking-[0.2em] text-black uppercase">After</span>
      </div>

      {/* DRAG HANDLE */}
      <div 
        className="absolute top-0 bottom-0 w-[1px] bg-white/80 shadow-[0_0_20px_rgba(255,255,255,1)] pointer-events-none z-20 transition-all duration-75"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/30 backdrop-blur-2xl border border-white/80 shadow-[0_15px_30px_rgba(43,89,104,0.2)] flex items-center justify-center transform transition-transform group-hover:scale-105">
           <ChevronsLeftRight className="text-white w-7 h-7 drop-shadow-md" strokeWidth={1.5} />
        </div>
      </div>

      {/* NATIVE RANGE INPUT (Accessible & Robust) */}
      <input 
        type="range" 
        min="0" max="100" 
        value={sliderPos}
        onChange={(e) => setSliderPos(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 touch-pan-y"
        aria-label="Drag to compare before and after results"
      />
    </div>
  )
}

/* =========================================
   3. DATA
   ========================================= */

const resultHighlights = [
  "Deep Hydration", "Natural Glow", "Skin Texture", 
  "Smoothness", "Radiance", "Healthy Skin Barrier", 
  "Deep Nourishment", "Fresh Appearance"
];

const ingredients = ["Orange", "Strawberry", "Pomegranate", "Blueberry", "Green Tea", "Mango"];

/* =========================================
   4. MAIN COMPONENT
   ========================================= */

export default function Results() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const yProduct = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-white py-32 lg:py-48 overflow-hidden font-body text-black selection:bg-theme-secondary selection:text-black"
    >
      {/* LUXURY BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(247,220,224,0.4)_0%,rgba(202,186,177,0.05)_60%,rgba(255,255,255,0)_100%)]" />
        
        <motion.div 
          style={{ y: yBg }}
          className="absolute top-[20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-theme-primary/10 blur-[150px] mix-blend-multiply"
        />
        <motion.div 
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-theme-accent/20 blur-[130px]"
        />
      </div>

      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* EDITORIAL HEADING */}
        <div className="flex flex-col items-center text-center mb-20 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] w-12 bg-black/30" />
            <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-black/70">
              Proven Efficacy
            </span>
            <div className="h-[1px] w-12 bg-black/30" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-[3.2rem] sm:text-[4.5rem] lg:text-[5.5rem] leading-[1.05] tracking-tight text-black mb-8"
          >
            The Art of <br />
            <span className="italic font-light text-theme-primary">Transformation</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[17px] text-black/70 font-medium leading-[2] max-w-[600px]"
          >
            Experience the harmony of six signature botanical extracts. Clinical results designed to nourish deeply, restoring your skin's natural balance and radiant luminosity.
          </motion.p>
        </div>

        {/* INTERACTIVE COMPARISON COMPOSITION */}
        <div className="relative mb-32 lg:mb-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Context & Ingredients */}
            <motion.div 
              style={{ y: window.innerWidth >= 1024 ? yContent : 0 }}
              className="lg:col-span-4 lg:col-start-1 relative z-20 flex flex-col gap-12 lg:pr-10 order-2 lg:order-1"
            >
              {/* Highlight List */}
              <div className="flex flex-col gap-6 bg-white/20 backdrop-blur-md border border-white/50 p-8 lg:p-10 rounded-[32px] shadow-[0_20px_50px_rgba(43,89,104,0.05)]">
                <h3 className="font-heading text-[22px] font-medium text-black mb-2">Visible Improvements</h3>
                <div className="flex flex-wrap gap-3">
                  {resultHighlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full border border-black/5">
                      <Sparkles size={12} className="text-[#FF0069]" />
                      <span className="text-[13px] font-bold text-black/80 tracking-wide">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botanical Infusion Story */}
              <div className="pl-4 lg:pl-8 border-l-2 border-theme-accent/30">
                <h4 className="font-heading text-[20px] font-medium text-black mb-4">Botanical Infusion</h4>
                <p className="text-[15px] text-black/60 font-medium leading-[1.9] mb-6">
                  Powered by our signature fruit complex, the formula penetrates deeply to repair and protect the skin barrier.
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {ingredients.map((ing, idx) => (
                    <span key={idx} className="text-[12px] font-bold uppercase tracking-[0.2em] text-black/50">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Interactive Reveal */}
            <div className="lg:col-span-8 relative z-10 order-1 lg:order-2">
              <BeforeAfterReveal />
              
              {/* Floating Product Guarantee Overlay */}
              <motion.div 
                style={{ y: yProduct }}
                className="absolute -right-4 lg:-right-20 -bottom-10 lg:-bottom-20 w-[140px] lg:w-[220px] aspect-[3/4] rounded-[24px] lg:rounded-[40px] overflow-hidden shadow-[0_30px_60px_rgba(43,89,104,0.2)] border border-white/60 z-40 hidden sm:block"
              >
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay z-10" />
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none opacity-80 mix-blend-overlay">
                  <span className="font-heading text-white text-3xl lg:text-5xl font-light tracking-[0.3em] uppercase rotate-[-90deg]">COSKINn</span>
                </div>
                <img loading="lazy" src="/mockup_product_3.webp" alt="COSKINn Serum" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-theme-secondary/20 to-transparent mix-blend-multiply z-10" />
              </motion.div>
            </div>
            
          </div>
        </div>

        {/* PREMIUM ANIMATED STATISTICS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          <StatCounter endValue={95} label="Reported softer, smoother skin" delay={0.1} />
          <StatCounter endValue={96} label="Noticed visible hydration" delay={0.2} />
          <StatCounter endValue={92} label="Experienced healthier glow" delay={0.3} />
          <StatCounter endValue={100} label="Cruelty free formulation" delay={0.4} />
        </div>

      </div>
    </section>
  );
}
