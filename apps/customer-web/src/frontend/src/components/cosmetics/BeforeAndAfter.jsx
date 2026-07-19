import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cosmeticColors, fonts } from '../../constants/theme';
import { Sparkle } from 'lucide-react';

import beforeImg from '../../assets/images/before_makeup_1784312716727.webp';
import afterImg from '../../assets/images/after_makeup_1784312726460.webp';

const comparisons = [
  {
    id: 1,
    title: "Flawless Base",
    desc: "Seamless coverage that feels like second skin.",
    before: beforeImg,
    after: afterImg
  },
  {
    id: 2,
    title: "Radiant Glow",
    desc: "Instant hydration and luminous finish.",
    before: beforeImg,
    after: afterImg
  }
];

export default function BeforeAndAfter() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <section className="pt-[2px] pb-16 bg-white overflow-hidden w-full" ref={containerRef}>
      <div className="w-full px-4 md:px-8 lg:px-12">
        
        {/* Compact Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-10"
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkle size={14} style={{ color: cosmeticColors.primary, opacity: 0.6 }} />
            <h2 
              className="text-2xl md:text-3xl text-gray-900 font-medium tracking-wide"
              style={{ fontFamily: fonts.cosmetics.heading }}
            >
              Real <span className="italic font-light" style={{ color: cosmeticColors.primary }}>Results</span>
            </h2>
            <Sparkle size={14} style={{ color: cosmeticColors.primary, opacity: 0.6 }} />
          </div>
          <p className="text-sm text-gray-500 font-medium">Visible transformations with COSKINn.</p>
        </motion.div>

        {/* Compact Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {comparisons.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="relative group"
            >
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
                className="bg-gradient-to-br from-[#FFF5F7] to-[#FFF0F4] rounded-[24px] shadow-[0_10px_30px_rgba(255,0,105,0.08)] border border-pink-100 p-3 md:p-4 hover:shadow-[0_20px_50px_rgba(255,0,105,0.15)] transition-all duration-[1s]"
              >
                {/* Text Area */}
                <div className="px-2 pb-3 pt-1 flex justify-between items-end">
                  <div>
                    <h3 className="text-lg font-bold text-[#FF0069]" style={{ fontFamily: fonts.cosmetics.heading }}>{item.title}</h3>
                    <p className="text-xs text-gray-600 font-medium mt-0.5">{item.desc}</p>
                  </div>
                </div>

                {/* Side-by-Side Images */}
                <div className="flex w-full gap-2 relative">
                  
                  {/* Center Divider Shimmer (Subtle Glow) */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#FF0069] to-transparent z-20 shadow-[0_0_12px_rgba(255,0,105,0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-[1s]" />

                  {/* Before Image */}
                  <div className="w-1/2 relative bg-white/50 rounded-[16px] overflow-hidden flex items-center justify-center border border-white/60">
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-gray-800 text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full shadow-sm z-10 uppercase transition-transform duration-500 group-hover:scale-110 group-hover:text-[#FF0069]">
                      Before
                    </div>
                    <img 
                      src={item.before} 
                      alt={`COSKINn ${item.title} Before`}
                      className="w-full h-[220px] lg:h-[280px] object-contain object-center transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-[#FF0069]/0 group-hover:bg-[#FF0069]/5 transition-colors duration-[1s]" />
                  </div>

                  {/* After Image */}
                  <div className="w-1/2 relative bg-white/60 rounded-[16px] overflow-hidden flex items-center justify-center border border-white/60">
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-[#FF0069] text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full shadow-sm z-10 uppercase transition-transform duration-500 group-hover:scale-110">
                      After
                    </div>
                    <img 
                      src={item.after} 
                      alt={`COSKINn ${item.title} After`}
                      className="w-full h-[220px] lg:h-[280px] object-contain object-center transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-[#FF0069]/0 group-hover:bg-[#FF0069]/5 transition-colors duration-[1s]" />
                  </div>

                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
