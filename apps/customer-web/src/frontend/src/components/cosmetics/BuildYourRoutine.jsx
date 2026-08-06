import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cosmeticColors, fonts } from '../../constants/theme';
import { ArrowRight, Sparkle } from 'lucide-react';

import routinePrep from '../../assets/images/routine_prep_1784312636157.webp';
import routinePrime from '../../assets/images/routine_prime_1784312648965.webp';
import routineGlow from '../../assets/images/routine_glow_1784312658823.webp';
import routineFinish from '../../assets/images/routine_finish_1784312670197.webp';

const steps = [
  {
    id: "01",
    title: "PREP",
    desc: "Create a flawless canvas. Remove impurities and hydrate deeply.",
    image: routinePrep
  },
  {
    id: "02",
    title: "PRIME",
    desc: "Smooth texture and lock in moisture for all-day wear.",
    image: routinePrime
  },
  {
    id: "03",
    title: "COLOR",
    desc: "Add a radiant, buildable flush of natural pigment.",
    image: routineGlow
  },
  {
    id: "04",
    title: "FINISH",
    desc: "Seal your look with a signature scent and lasting hold.",
    image: routineFinish
  }
];

export default function BuildYourRoutine() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-[#FFF5F7] overflow-hidden relative" ref={containerRef}>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[60vh] rounded-full blur-[120px] opacity-30 pointer-events-none" style={{ background: cosmeticColors.primary }} />
      <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[50vh] rounded-full blur-[100px] opacity-20 pointer-events-none" style={{ background: cosmeticColors.accent }} />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkle size={14} style={{ color: cosmeticColors.primary, opacity: 0.6 }} />
            <span className="text-xs tracking-[0.2em] font-bold uppercase" style={{ color: cosmeticColors.primary }}>
              The COSKINn Ritual
            </span>
            <Sparkle size={14} style={{ color: cosmeticColors.primary, opacity: 0.6 }} />
          </div>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl text-gray-900 font-normal leading-[1.1] mb-6"
            style={{ fontFamily: fonts.cosmetics.heading }}
          >
            Build Your <span className="italic font-light" style={{ color: cosmeticColors.primary }}>Routine</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto font-medium" style={{ fontFamily: fonts.cosmetics.body }}>
            Four simple steps to enhance your natural beauty.
          </p>
        </motion.div>

        {/* Steps Grid - Premium Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
              className="group relative bg-white rounded-[2rem] p-4 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-15px_rgba(255,0,105,0.15)] transition-all duration-500 hover:-translate-y-2 border border-pink-50"
            >
              
              {/* Large Background Step Number Watermark */}
              <div className="absolute top-20 right-6 text-[8rem] font-bold text-gray-50/50 select-none pointer-events-none z-0" style={{ fontFamily: fonts.cosmetics.heading }}>
                {step.id}
              </div>

              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden mb-6 z-10 bg-[#FCF8F9]">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full"
                >
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                  />
                </motion.div>
                
                {/* Step Badge Over Image */}
                <div 
                  className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                  style={{ backgroundColor: cosmeticColors.primary }}
                >
                  {step.id}
                </div>
              </div>

              {/* Content */}
              <div className="px-4 pb-4 relative z-10 text-center">
                <h3 className="text-xl text-gray-900 font-medium tracking-wide mb-3" style={{ fontFamily: fonts.cosmetics.heading }}>
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {step.desc}
                </p>
                <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 group-hover:text-[#FF0069]" style={{ color: cosmeticColors.accent }}>
                  Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
