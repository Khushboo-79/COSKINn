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
    <div className={`relative flex flex-col lg:flex-row items-center justify-between w-full max-w-[1200px] mx-auto gap-8 lg:gap-16 group my-6 lg:my-10 px-6
        ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}
    `}>

      {/* Visual Composition */}
      <div className="relative w-full lg:w-[48%] h-[300px] lg:h-[400px] rounded-[32px] overflow-hidden shadow-sm bg-white border border-gray-100 z-10 cursor-default flex-shrink-0">
        
        {/* Base Gradient & Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${data.gradient} z-0 transition-opacity duration-700 group-hover:opacity-20`} />
        <div className="absolute inset-0 opacity-30 group-hover:opacity-0 transition-opacity duration-700 mix-blend-overlay z-0 pointer-events-none">
          <img loading="lazy" src={data.bgImg} alt={data.ingredient} className="w-full h-full object-cover blur-[2px]" />
        </div>

        {/* Model Reveal */}
        <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out pointer-events-none">
          <img loading="lazy" src={data.modelImg} alt="Lifestyle" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
        </div>

        {/* Product Image */}
        <div className="absolute inset-0 z-20 flex items-center justify-center p-6 lg:p-10 pointer-events-none">
          <img loading="lazy"
            src={data.image}
            alt={data.name}
            className="w-full h-full object-contain mix-blend-multiply drop-shadow-lg transition-transform duration-700 ease-out group-hover:scale-75 group-hover:-translate-x-12 group-hover:rotate-[-5deg]"
          />
        </div>

        {/* Step Marker */}
        <div className={`absolute top-6 ${isEven ? 'left-6' : 'right-6'} w-12 h-12 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center shadow-sm z-40 transition-transform duration-500 group-hover:scale-110`}>
          <span className="text-[14px] font-bold text-black">{data.step}</span>
        </div>
      </div>

      {/* Information Card */}
      <div className="w-full lg:w-[48%] relative z-30 flex flex-col justify-center mt-[-30px] lg:mt-0">
        <div className="bg-white/80 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none border border-white/50 lg:border-none p-6 lg:p-0 rounded-[24px] shadow-sm lg:shadow-none transition-all duration-500">
          
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#FF0069] mb-3 block">
            {data.type}
          </span>
          <h3 className="font-heading text-[28px] lg:text-[34px] font-medium text-black mb-4 leading-tight">
            {data.name}
          </h3>

          <div className="w-12 h-[1px] bg-gray-300 mb-5" />

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-theme-primary animate-pulse" />
              <span className="text-[12px] font-bold uppercase tracking-widest text-black/80">
                {data.ingredient}
              </span>
            </div>
            <p className="text-[15px] text-gray-600 font-medium leading-[1.7]">
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
      className="relative w-full bg-[#fcfaf9] py-10 lg:py-16 overflow-hidden font-body text-black transition-colors duration-[1.5s]"
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
        <div className="flex flex-col items-center text-center mb-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-3"
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
            className="font-heading text-[3.2rem] lg:text-[4.5rem] leading-[1.05] tracking-tight text-black mb-5"
          >
            Build Your <br />
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
