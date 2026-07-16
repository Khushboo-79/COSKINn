import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cosmeticColors, fonts } from '../../constants/theme';
import { CheckCircle2 } from 'lucide-react';

import mainModel from '../../assets/images/cat_lip_liner_model.webp';

const features = [
  "Cruelty Free",
  "Dermatologist Tested",
  "Lightweight Formula",
  "Long Lasting Wear",
  "Skin Loving Ingredients",
  "Everyday Luxury"
];

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function CosmeticsAbout() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-16 lg:py-24 overflow-hidden bg-white"
    >
      {/* Subtle Ambient Light (No dark backgrounds, no glass-heavy cards) */}
      <div 
        className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full mix-blend-multiply filter blur-[150px] opacity-[0.1]"
        style={{ backgroundColor: cosmeticColors.primary }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[30vw] h-[30vw] rounded-full mix-blend-multiply filter blur-[150px] opacity-[0.05]"
        style={{ backgroundColor: cosmeticColors.primary }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          
          {/* Left: Dominant Luxury Editorial Image */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-start">
            <motion.div 
              className="relative w-full max-w-[600px] aspect-[4/5] rounded-[32px] overflow-hidden"
              style={{ 
                y: yParallax,
                boxShadow: `0 20px 50px -15px ${cosmeticColors.primary}40`
              }}
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent z-10 pointer-events-none"></div>
              <img 
                src={mainModel} 
                alt="COSKINn Premium Cosmetics Campaign" 
                className="w-full h-full object-cover object-top transition-transform duration-[10s] hover:scale-105"
              />
            </motion.div>
          </div>

          {/* Right: Brand Story & Icon Rows */}
          <motion.div 
            className="w-full lg:w-1/2 flex flex-col justify-center text-left"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Luxury Badge */}
            <motion.div variants={fadeUp} className="mb-6">
              <span 
                className="px-5 py-2.5 rounded-full border bg-white/60 text-[11px] font-black tracking-[0.2em] uppercase" 
                style={{ borderColor: cosmeticColors.primary, color: cosmeticColors.accent }}
              >
                About COSKINn Cosmetics
              </span>
            </motion.div>

            {/* Premium Heading */}
            <motion.h2 
              variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-[70px] leading-[1.05] font-black mb-6 text-[#1b1b1b] tracking-tight"
              style={{ fontFamily: fonts.cosmetics.heading }}
            >
              Beauty That <br/> Feels Like You.
            </motion.h2>

            {/* Short Paragraph */}
            <motion.p 
              variants={fadeUp}
              className="text-xl font-medium leading-relaxed max-w-lg mb-10 text-gray-600" 
              style={{ fontFamily: fonts.cosmetics.body }}
            >
              COSKINn creates cosmetics that combine modern beauty with skin-friendly ingredients. 
              Every formula is lightweight, comfortable, cruelty-free, and designed to inspire 
              everyday confidence through beauty.
            </motion.p>

            {/* Premium Feature Rows */}
            <motion.div 
              variants={fadeUp}
              className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 mb-12"
            >
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div 
                    className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110" 
                    style={{ color: cosmeticColors.accent }}
                  >
                    <CheckCircle2 size={20} strokeWidth={2.5} />
                  </div>
                  <span 
                    className="text-base font-semibold text-gray-700 tracking-wide transition-colors duration-300 group-hover:text-gray-900"
                    style={{ fontFamily: fonts.cosmetics.body }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={fadeUp}>
              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: `0 15px 35px -10px ${cosmeticColors.accent}` }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 rounded-full text-white font-bold tracking-[0.15em] uppercase text-sm shadow-lg flex items-center gap-3 transition-all group"
                style={{ 
                  background: `linear-gradient(135deg, ${cosmeticColors.accent}, ${cosmeticColors.primary})`, 
                  fontFamily: fonts.cosmetics.heading 
                }}
              >
                Explore Cosmetics
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </motion.button>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
