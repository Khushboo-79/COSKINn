import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

/* =========================================
   1. DATA
   ========================================= */

const routines = {
  morning: [
    {
      id: "m1",
      step: "01",
      name: "Purifying Cleanser",
      type: "Cleanse",
      ingredient: "Green Tea Extract",
      ingredientDetail: "Calms inflammation and gently removes morning impurities without stripping the natural barrier.",
      image: "/cleanser_bottle_coskin.webp",
      bgImg: "/bg-greentea.webp",
      modelImg: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200&auto=format&fit=crop",
      gradient: "from-gray-100/40 to-white"
    },
    {
      id: "m2",
      step: "02",
      name: "Botanical Face Mist",
      type: "Tone & Prep",
      ingredient: "Strawberry & Rose",
      ingredientDetail: "Provides an instant burst of antioxidant hydration to awaken and plump the skin.",
      image: "/mockup_product_1.webp",
      bgImg: "/bg-strawberry.webp",
      modelImg: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1200&auto=format&fit=crop",
      gradient: "from-theme-accent/40 to-white"
    },
    {
      id: "m3",
      step: "03",
      name: "Daily Sunscreen SPF 50",
      type: "Protect",
      ingredient: "Mango Butter",
      ingredientDetail: "Deeply hydrates while offering invisible, weightless UV protection for a glowing finish.",
      image: "/mockup_product_2.webp",
      bgImg: "/bg-mango.webp",
      modelImg: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1200&auto=format&fit=crop",
      gradient: "from-theme-secondary/50 to-white"
    }
  ],
  night: [
    {
      id: "n1",
      step: "01",
      name: "Double Cleanse Oil",
      type: "Deep Cleanse",
      ingredient: "Pomegranate Seed",
      ingredientDetail: "Melts away makeup, SPF, and urban pollution while promoting intense cellular renewal.",
      image: "/cleanser_bottle_coskin.webp",
      bgImg: "/bg-pomegranate.webp",
      modelImg: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop",
      gradient: "from-theme-accent/30 to-white" 
    },
    {
      id: "n2",
      step: "02",
      name: "Overnight Repair Mask",
      type: "Treat & Repair",
      ingredient: "Blueberry Complex",
      ingredientDetail: "A potent antioxidant shield that aggressively repairs environmental damage while you sleep.",
      image: "/serum_bottle_coskin.webp",
      bgImg: "/bg-blueberry.webp",
      modelImg: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1200&auto=format&fit=crop",
      gradient: "from-theme-primary/40 to-white"
    },
    {
      id: "n3",
      step: "03",
      name: "Intensive Lip Balm",
      type: "Nourish",
      ingredient: "Orange & Vitamin C",
      ingredientDetail: "Brightens and deeply conditions lips overnight for a soft, deeply nourished morning reveal.",
      image: "/mockup_product_3.webp",
      bgImg: "/bg-mango.webp",
      modelImg: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=1200&auto=format&fit=crop",
      gradient: "from-gray-100/50 to-white"
    }
  ]
};

/* =========================================
   2. REUSABLE EDITORIAL STEP COMPONENT
   ========================================= */

const RoutineStep = ({ data, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex flex-col items-center justify-center w-[95%] max-w-[1500px] mx-auto gap-0 group my-10 lg:my-14 
        ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}
    `}>
       
       {/* 
         =========================================
         VISUAL COMPOSITION (Product + Model Reveal)
         ========================================= 
       */}
       <div className="relative w-full lg:w-[65%] h-[350px] lg:h-[480px] rounded-[32px] lg:rounded-[56px] overflow-hidden shadow-[0_20px_50px_rgba(43,89,104,0.06)] bg-white border border-white/60 z-10 cursor-default">
          
          {/* Base Gradient & Organic Botanical Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${data.gradient} z-0 transition-opacity duration-[1.2s] group-hover:opacity-10`} />
          <div className="absolute inset-0 opacity-40 group-hover:opacity-0 transition-opacity duration-[1.2s] mix-blend-overlay z-0 pointer-events-none">
             <img loading="lazy" src={data.bgImg} alt={data.ingredient} className="w-full h-full object-cover blur-[3px]" />
          </div>

          {/* Premium Model Lifestyle Reveal (Fades in on hover) */}
          <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-[1.2s] ease-in-out overflow-hidden pointer-events-none">
             <img loading="lazy" 
               src={data.modelImg} 
               className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[4s] ease-out" 
               alt="Lifestyle usage"
             />
             <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
             <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-80" />
          </div>

          {/* Product Composition & Brand Overlay */}
          <div className="absolute inset-0 z-20 flex items-center justify-center p-8 overflow-hidden pointer-events-none">
             
             {/* Guaranteed Brand Presence */}
             <div className="absolute inset-0 flex items-center justify-center mix-blend-overlay opacity-50 z-30 transition-all duration-[1.2s] ease-out group-hover:opacity-40 group-hover:-translate-x-[25%] lg:group-hover:-translate-x-[35%] group-hover:scale-75 group-hover:rotate-[-5deg]">
                <span className="font-heading text-black text-[4.5rem] lg:text-[7rem] tracking-[0.3em] font-light rotate-[-90deg]">COSKINn</span>
             </div>
             
             <img loading="lazy" 
               src={data.image} 
               alt={data.name} 
               className="w-full h-full object-cover lg:object-contain mix-blend-multiply drop-shadow-[0_40px_80px_rgba(0,0,0,0.1)] scale-[1.05] transition-all duration-[1.2s] ease-out group-hover:scale-[0.8] lg:group-hover:scale-[0.7] group-hover:-translate-x-[25%] lg:group-hover:-translate-x-[35%] group-hover:translate-y-[10%] group-hover:rotate-[-5deg] group-hover:drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-20" 
             />
          </div>

          {/* Soft Light Sweep */}
          <div className="absolute top-0 bottom-0 -left-[100%] w-[50%] bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-[30deg] z-30 group-hover:left-[200%] transition-all duration-[2.5s] ease-in-out pointer-events-none" />

          {/* Step Marker Floating INSIDE the visual area */}
          <div className={`absolute top-6 ${isEven ? 'left-6' : 'right-6'} w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 flex items-center justify-center shadow-lg z-40 transition-transform duration-700 group-hover:scale-110`}>
             <span className="text-[12px] lg:text-[14px] font-bold text-black tracking-widest">{data.step}</span>
          </div>
          
          {/* Floating Glass Decorative Blob */}
          <motion.div 
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
            className={`absolute hidden lg:block w-24 h-24 rounded-[30px] bg-white/20 backdrop-blur-xl border border-white/50 shadow-2xl z-40 pointer-events-none
              ${isEven ? '-bottom-5 -right-5' : '-top-5 -left-5'}
            `}
          />

       </div>

       {/* 
         =========================================
         OVERLAPPING GLASS INFORMATION CARD
         ========================================= 
       */}
       <div className={`w-[90%] lg:w-[42%] relative z-30 mt-[-50px] lg:mt-0 
          ${isEven ? 'lg:ml-[-12%]' : 'lg:mr-[-12%]'}
       `}>
          <div className="bg-white/50 backdrop-blur-3xl border border-white/70 p-7 lg:p-10 xl:p-12 rounded-[28px] lg:rounded-[40px] shadow-[0_25px_60px_rgba(43,89,104,0.08)] transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(43,89,104,0.12)] group-hover:-translate-y-2 group-hover:bg-white/70">
             
             <span className="text-[10px] lg:text-[11px] font-bold tracking-[0.25em] uppercase text-theme-accent mb-3 lg:mb-4 block">
               {data.type}
             </span>
             <h3 className="font-heading text-[24px] lg:text-[32px] xl:text-[36px] font-medium text-black mb-4 leading-tight">
               {data.name}
             </h3>
             
             <div className="w-12 h-[1px] bg-black/15 mb-5 lg:mb-6" />

             <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-theme-primary animate-pulse shadow-[0_0_10px_rgba(151,181,194,0.5)]" />
                   <span className="text-[11px] lg:text-[12px] font-bold uppercase tracking-widest text-black/80">
                     {data.ingredient}
                   </span>
                </div>
                <p className="text-[13.5px] lg:text-[15px] text-black/70 font-medium leading-[1.7] lg:leading-[1.8]">
                   {data.ingredientDetail}
                </p>
             </div>

          </div>
       </div>

    </div>
  );
};

/* =========================================
   3. MAIN COMPONENT
   ========================================= */

export default function Routine() {
  const [activeRoutine, setActiveRoutine] = useState('morning');
  const containerRef = useRef(null);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#fcfaf9] pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden font-body text-black transition-colors duration-[1.5s]"
      style={{ backgroundColor: activeRoutine === 'night' ? '#f4f6f7' : '#fcfaf9' }}
    >
      {/* 
        =========================================
        LUXURY LAYERED BACKGROUND (Dynamic)
        =========================================
      */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <AnimatePresence mode="wait">
          {activeRoutine === 'morning' ? (
            <motion.div 
              key="morning-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(247,220,224,0.4)_0%,rgba(255,255,255,0)_60%)]" />
              <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] bg-theme-accent/20 blur-[150px] rounded-full mix-blend-multiply" />
              <div className="absolute bottom-[20%] left-[-10%] w-[45vw] h-[45vw] bg-theme-secondary/30 blur-[130px] rounded-full mix-blend-multiply" />
            </motion.div>
          ) : (
            <motion.div 
              key="night-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(151,181,194,0.25)_0%,rgba(255,255,255,0)_60%)]" />
              <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] bg-black/10 blur-[150px] rounded-full mix-blend-multiply" />
              <div className="absolute bottom-[20%] left-[-10%] w-[45vw] h-[45vw] bg-theme-primary/15 blur-[130px] rounded-full mix-blend-multiply" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full mx-auto relative z-10">
        
        {/* 
          =========================================
          SECTION HEADER & TOGGLE
          =========================================
        */}
        <div className="flex flex-col items-center text-center mb-10 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-6 lg:mb-8"
          >
            <div className="h-[1px] w-12 bg-black/30" />
            <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-black/70">
              The Ritual
            </span>
            <div className="h-[1px] w-12 bg-black/30" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-[3.2rem] lg:text-[4.5rem] leading-[1.05] tracking-tight text-black mb-8 lg:mb-10"
          >
            Build Your <br/>
            <span className="italic font-light text-theme-primary">Routine</span>.
          </motion.h2>

          {/* Premium Interactive Toggle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex bg-white/50 backdrop-blur-2xl border border-white/70 p-1.5 rounded-full shadow-[0_15px_40px_rgba(43,89,104,0.06)] relative"
          >
            {/* Active Indicator Blob */}
            <motion.div 
              className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow-sm border border-white"
              animate={{ left: activeRoutine === 'morning' ? '6px' : 'calc(50%)' }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            />
            
            <button 
              onClick={() => setActiveRoutine('morning')} 
              className={`relative z-10 px-8 lg:px-12 py-3 lg:py-3.5 rounded-full text-[11px] lg:text-[12px] font-bold tracking-[0.2em] uppercase transition-colors duration-500 flex items-center gap-2 ${activeRoutine === 'morning' ? 'text-black' : 'text-black/50 hover:text-black/80'}`}
            >
              <span>Morning</span>
              <span className="text-[14px]">☀️</span>
            </button>
            <button 
              onClick={() => setActiveRoutine('night')} 
              className={`relative z-10 px-8 lg:px-12 py-3 lg:py-3.5 rounded-full text-[11px] lg:text-[12px] font-bold tracking-[0.2em] uppercase transition-colors duration-500 flex items-center gap-2 ${activeRoutine === 'night' ? 'text-black' : 'text-black/50 hover:text-black/80'}`}
            >
              <span>Night</span>
              <span className="text-[14px]">🌙</span>
            </button>
          </motion.div>
        </div>

        {/* 
          =========================================
          EDITORIAL ROUTINE PATHWAY
          =========================================
        */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeRoutine}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="flex flex-col w-full relative z-10"
            >
              {routines[activeRoutine].map((step, idx) => (
                <RoutineStep 
                  key={step.id} 
                  data={step} 
                  index={idx} 
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
