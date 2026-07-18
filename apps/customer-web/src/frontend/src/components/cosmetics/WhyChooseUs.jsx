import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { cosmeticColors, fonts } from '../../constants/theme';
import { ArrowRight, Sparkle } from 'lucide-react';

import img1 from '../../assets/images/why_choose_us_1784312696420.png';
import img2 from '../../assets/images/routine_glow_1784312658823.png';
import img3 from '../../assets/images/after_makeup_1784312726460.png';
import img4 from '../../assets/images/about_editorial_1784312706240.png';

const features = [
  { 
    id: 1, 
    title: "Premium Ingredients", 
    desc: "Sourced globally for maximum efficacy. Crafted to bring out your absolute best.",
    image: img1
  },
  { 
    id: 2, 
    title: "Dermatologically Tested", 
    desc: "Safe, gentle, and rigorously proven for all skin types including sensitive skin.",
    image: img2
  },
  { 
    id: 3, 
    title: "Long Lasting Results", 
    desc: "Weightless formulas that stay flawless from morning coffee to midnight.",
    image: img3
  },
  { 
    id: 4, 
    title: "Cruelty Free & Vegan", 
    desc: "Ethical beauty without compromise. We absolutely never test on animals.",
    image: img4
  },
];

export default function WhyChooseUs() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 bg-white relative overflow-hidden" ref={containerRef}>
      
      {/* Decorative Soft Background Glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-t from-[#FFF0F4] to-transparent rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Interactive Feature List */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-12"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkle size={14} style={{ color: cosmeticColors.primary }} />
                <span className="text-[#FF0069] text-xs font-bold tracking-[0.2em] uppercase">The Standard</span>
              </div>
              <h2 
                className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight uppercase"
                style={{ fontFamily: fonts.cosmetics.heading }}
              >
                Why Choose <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8A66]">COSKINn</span>
              </h2>
            </motion.div>

            <div className="flex flex-col">
              {features.map((feature, index) => {
                const isActive = activeIndex === index;
                
                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.6, delay: 0.1 * index, ease: "easeOut" }}
                    onMouseEnter={() => setActiveIndex(index)}
                    className="group cursor-pointer py-6 border-b border-gray-100 flex items-start gap-6 relative"
                  >
                    {/* Active indicator line */}
                    <div 
                      className={`absolute left-0 top-0 bottom-0 w-1 bg-[#FF0069] transition-all duration-500 rounded-r-md ${isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`} 
                    />

                    <span 
                      className={`text-2xl font-light transition-colors duration-500 pl-4 ${isActive ? 'text-[#FF0069]' : 'text-gray-300'}`}
                      style={{ fontFamily: fonts.cosmetics.heading }}
                    >
                      0{index + 1}
                    </span>
                    
                    <div className="flex-1">
                      <h3 
                        className={`text-xl md:text-2xl font-bold transition-colors duration-300 mb-2 ${isActive ? 'text-gray-900' : 'text-gray-400'}`} 
                        style={{ fontFamily: fonts.cosmetics.heading }}
                      >
                        {feature.title}
                      </h3>
                      
                      {/* Animated Description Reveal */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.p 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="text-sm text-gray-500 font-medium leading-relaxed pr-4 overflow-hidden"
                          >
                            {feature.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className={`hidden md:flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 transform ${isActive ? 'bg-[#FF0069] text-white rotate-45' : 'border border-gray-200 text-transparent'}`}>
                      <ArrowRight size={18} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Dynamic Image Reveal */}
          <div className="w-full lg:w-[55%] flex items-center justify-center relative py-10 lg:py-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full max-w-[420px] aspect-[4/5] relative"
            >
              <div className="w-full h-full rounded-[32px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(255,0,105,0.15)] relative bg-white">
                {features.map((feature, index) => (
                  <div 
                    key={feature.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  >
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className={`w-full h-full object-cover transition-transform duration-[3s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${activeIndex === index ? 'scale-100' : 'scale-105'}`}
                    />
                    {/* Subtle vignette/gradient over images to make them blend beautifully */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                  </div>
                ))}
              </div>
              
              {/* Clean minimalist floating badge */}
              <div className="absolute -bottom-4 right-8 z-20 bg-white px-6 py-3.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#FF0069] animate-pulse" />
                <span className="text-xs font-bold tracking-widest uppercase text-gray-900">
                  {features[activeIndex].title}
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
