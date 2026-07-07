import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cosmeticColors, fonts } from '../../constants/theme';

import mainModel from '../../assets/images/cosmetics_why_choose_main.webp';
import secondaryModel from '../../assets/images/cat_blur.webp';
import floatLipstick from '../../assets/images/cosmetics_lipstick.webp';
import floatBlush from '../../assets/images/cosmetics_blush.webp';

const features = [
  { id: 1, title: "Luxury Formula", desc: "Crafted for elegance.", delay: 0.2 },
  { id: 2, title: "Highly Pigmented", desc: "Rich, vibrant colors.", delay: 0.4 },
  { id: 3, title: "Skin Friendly", desc: "Nourishes as it beautifies.", delay: 0.6 },
];

const stats = [
  { value: "100%", label: "Cruelty Free" },
  { value: "20+", label: "Premium Shades" },
  { value: "24H", label: "Long Lasting" },
];

export default function AboutBrand() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallaxFast = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const yParallaxReverse = useTransform(scrollYProgress, [0, 1], ["20%", "-30%"]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-24 md:py-32 overflow-hidden bg-white"
      style={{ fontFamily: fonts.cosmetics.body }}
    >
      {/* Background Soft Glows & Textures */}
      <div 
        className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full mix-blend-multiply filter blur-[150px] opacity-10 pointer-events-none"
        style={{ backgroundColor: cosmeticColors.primary }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] rounded-full mix-blend-multiply filter blur-[150px] opacity-10 pointer-events-none"
        style={{ backgroundColor: cosmeticColors.secondary }}
      />
      
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          
          {/* Left Content Area (Storytelling) */}
          <motion.div 
            className="w-full lg:w-1/2 flex flex-col justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h4 
              className="text-sm md:text-base font-bold tracking-[0.25em] uppercase mb-6"
              style={{ color: cosmeticColors.primary }}
            >
              The COSKINn Story
            </h4>
            
            <h2 
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 text-black"
              style={{ fontFamily: fonts.cosmetics.heading }}
            >
              Express Your <br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${cosmeticColors.gradientStart}, ${cosmeticColors.gradientEnd})` }}>
                Signature Beauty
              </span>
            </h2>
            
            <div className="space-y-6 text-lg text-gray-600 font-light max-w-lg mb-12">
              <p>
                COSKINn is more than makeup. It is a celebration of confidence, creativity, and modern femininity. We believe that true luxury lies in products that enhance your natural beauty without hiding it.
              </p>
              <p>
                Designed for the bold and the beautiful, our professional-quality formulas blend rich pigments with elegant finishes, empowering you to create your own everyday masterpiece.
              </p>
            </div>

            {/* Interactive Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {features.map((feature) => (
                <motion.div 
                  key={feature.id}
                  className="relative p-5 rounded-[1.5rem] bg-white/50 backdrop-blur-md border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden group cursor-pointer"
                  whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,1)', boxShadow: `0 15px 30px -10px ${cosmeticColors.secondary}60` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: feature.delay }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent opacity-0 group-hover:opacity-100 mix-blend-overlay pointer-events-none"
                    variants={{ hover: { x: ['-100%', '100%'] } }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                  <h3 className="font-bold text-gray-900 mb-1" style={{ fontFamily: fonts.cosmetics.heading }}>{feature.title}</h3>
                  <p className="text-xs text-gray-500 font-light">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: `0 15px 35px -10px ${cosmeticColors.primary}` }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full text-white font-bold text-lg tracking-wide transition-all shadow-lg flex items-center gap-3 w-fit group border border-white/20 relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${cosmeticColors.primary} 0%, #ff3385 100%)` }}
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                <span className="relative z-10" style={{ fontFamily: fonts.cosmetics.body }}>Discover the Collection</span>
              </motion.button>
            </motion.div>

          </motion.div>

          {/* Right Content Area (Editorial Composition) */}
          <div className="w-full lg:w-1/2 relative min-h-[600px] lg:min-h-[800px] flex items-center justify-center mt-10 lg:mt-0">
            
            {/* Main Portrait */}
            <motion.div 
              className="absolute right-0 lg:right-10 w-[80%] max-w-[450px] aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-10 border-[8px] border-white"
              style={{ y: yParallaxSlow }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>
              <img loading="lazy" src={mainModel} alt="COSKINn Beauty Model" className="w-full h-full object-cover" />
            </motion.div>

            {/* Overlapping Secondary Portrait */}
            <motion.div 
              className="absolute left-0 bottom-10 lg:bottom-20 w-[50%] max-w-[280px] aspect-square rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.25)] z-20 border-[6px] border-white"
              style={{ y: yParallaxFast }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 pointer-events-none"></div>
              <img loading="lazy" src={secondaryModel} alt="COSKINn Editorial" className="w-full h-full object-cover object-top" />
            </motion.div>

            {/* Floating Product - Lipstick */}
            <motion.div 
              className="absolute top-5 left-5 lg:top-10 lg:-left-10 w-24 md:w-32 z-30 drop-shadow-[0_20px_30px_rgba(255,0,105,0.2)] pointer-events-none"
              style={{ y: yParallaxReverse }}
            >
              <motion.img 
                src={floatLipstick} 
                alt="COSKINn Lipstick" 
                className="w-full h-auto object-contain"
                animate={{ y: [-15, 15, -15], rotate: [-5, 5, -5] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Floating Product - Blush */}
            <motion.div 
              className="absolute -bottom-5 right-5 lg:-bottom-10 lg:right-10 w-32 md:w-40 z-30 drop-shadow-[0_20px_30px_rgba(255,212,152,0.4)] pointer-events-none"
              animate={{ y: [10, -10, 10], rotate: [10, -10, 10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <img loading="lazy" src={floatBlush} alt="COSKINn Blush" className="w-full h-auto object-contain" />
            </motion.div>

            {/* Floating Glass Element */}
            <motion.div 
              className="absolute top-1/4 -right-5 lg:-right-16 z-30 backdrop-blur-xl bg-white/40 border border-white/60 rounded-full w-20 h-20 md:w-24 md:h-24 flex items-center justify-center shadow-xl pointer-events-none"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/40"></div>
            </motion.div>

          </div>
        </div>

        {/* Bottom Premium Statistics */}
        <div className="mt-32 lg:mt-40 border-t border-gray-200/50 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group cursor-default"
              >
                <motion.h3 
                  className="text-5xl md:text-6xl font-bold mb-3 transition-colors duration-500"
                  style={{ fontFamily: fonts.cosmetics.heading, color: cosmeticColors.primary }}
                  whileHover={{ scale: 1.05 }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
