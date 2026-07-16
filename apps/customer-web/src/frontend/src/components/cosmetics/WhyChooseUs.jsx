import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cosmeticColors, fonts } from '../../constants/theme';
import editorialImage from '../../assets/images/cosmetics_editorial_lifestyle.png';

const products = [
  { name: "COSKINn Magnetic Lipstick", feature: "High Pigment Formula" },
  { name: "COSKINn Velvet Blush", feature: "Smooth Blendability" },
  { name: "COSKINn Lift & Curl Mascara", feature: "Long Lasting Wear" },
  { name: "COSKINn Eyeshadow Palette", feature: "Skin Loving Ingredients" },
  { name: "COSKINn Precision Lip Liner", feature: "Lightweight Finish" },
];

export default function WhyChooseUs() {
  const containerRef = useRef(null);
  
  // Parallax configuration
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const shape1Y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const shape2Y = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full overflow-hidden flex flex-col items-center justify-center py-16 md:py-20 lg:py-24"
      style={{ 
        fontFamily: fonts.cosmetics.body,
        background: `linear-gradient(135deg, ${cosmeticColors.secondary} 0%, ${cosmeticColors.primary}20 50%, ${cosmeticColors.secondary} 100%)`
      }}
    >
      {/* Background: Subtle Abstract Textures & Layered Shapes */}
      <motion.div 
        className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full mix-blend-multiply opacity-50 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at center, ${cosmeticColors.primary}40 0%, transparent 70%)`,
          y: shape1Y
        }}
      />
      <motion.div 
        className="absolute bottom-[-10%] left-[-20%] w-[60vw] h-[60vw] rounded-[30%] mix-blend-multiply opacity-40 pointer-events-none rotate-[20deg]"
        style={{ 
          background: `radial-gradient(circle at center, ${cosmeticColors.primary}30 0%, transparent 70%)`,
          y: shape2Y
        }}
      />
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
          
          {/* Left Column: Premium Lifestyle Editorial Image */}
          <div className="w-full lg:w-5/12 relative h-full flex flex-col justify-center">
            <motion.div 
              className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden"
              style={{ 
                y: imageY, 
                boxShadow: `0 25px 60px -15px ${cosmeticColors.primary}60` 
              }}
            >
              <img 
                src={editorialImage}
                alt="COSKINn Luxury Cosmetics Editorial"
                className="w-full h-full object-cover scale-[1.02]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
            </motion.div>
            
            {/* Elegant Brand Tag */}
            <motion.div 
              className="absolute -bottom-10 md:-bottom-12 -right-4 md:-right-10 bg-white p-8 md:p-10 z-20 flex flex-col justify-center"
              style={{
                boxShadow: `0 20px 40px -10px ${cosmeticColors.primary}30`,
                borderTop: `3px solid ${cosmeticColors.primary}`
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              <h3 className="text-3xl md:text-4xl font-normal tracking-[0.15em] text-gray-900 mb-2" style={{ fontFamily: fonts.cosmetics.heading }}>COSKINn</h3>
              <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold" style={{ color: cosmeticColors.primary }}>Maison De Beauté</span>
            </motion.div>
          </div>

          {/* Right Column: Editorial Storytelling & Product Highlights */}
          <motion.div 
            className="w-full lg:w-7/12 flex flex-col justify-center mt-12 lg:mt-0"
            style={{ y: contentY }}
          >
            {/* Typography Hierarchy Section */}
            <div className="mb-14">
              <motion.span 
                className="block text-xs md:text-sm tracking-[0.4em] uppercase mb-4 font-bold"
                style={{ color: cosmeticColors.primary }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                The Art of Beauty
              </motion.span>
              <motion.h2 
                className="text-4xl md:text-6xl lg:text-7xl font-normal leading-[1.1] text-gray-900 mb-6"
                style={{ fontFamily: fonts.cosmetics.heading }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                Uncompromising <br className="hidden md:block" />
                <span className="italic relative inline-block mt-1">
                  Luxury
                  <span className="absolute bottom-2 left-0 w-full h-2 md:h-3 opacity-30 -z-10" style={{ backgroundColor: cosmeticColors.primary }}></span>
                </span>
              </motion.h2>
              <motion.p 
                className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-2xl tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Elevate your daily ritual with our meticulously crafted formulations. High-pigment brilliance and weightless perfection, exclusively designed for you.
              </motion.p>
            </div>

            {/* Luxury Feature Panels - Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
              {products.map((product, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-6 md:p-8 flex flex-col justify-center group relative overflow-hidden transition-colors duration-500"
                  style={{
                    boxShadow: `0 10px 30px -15px ${cosmeticColors.primary}40`,
                    border: `1px solid ${cosmeticColors.primary}15`
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                  whileHover={{ 
                    y: -4,
                    boxShadow: `0 20px 40px -10px ${cosmeticColors.primary}70`,
                    borderColor: `${cosmeticColors.primary}40`
                  }}
                >
                  <span className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-bold mb-3 block" style={{ color: cosmeticColors.primary }}>
                    {product.feature}
                  </span>
                  <h4 className="text-lg md:text-xl font-medium text-gray-900 leading-snug" style={{ fontFamily: fonts.cosmetics.heading }}>
                    {product.name}
                  </h4>
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none" style={{ backgroundImage: `linear-gradient(to bottom left, ${cosmeticColors.primary}, transparent)` }}></div>
                </motion.div>
              ))}
              
              {/* Highlight Accent Panel */}
              <motion.div 
                className="p-6 md:p-8 flex flex-col justify-center items-center text-center relative overflow-hidden group"
                style={{
                  backgroundColor: cosmeticColors.primary,
                  boxShadow: `0 15px 35px -10px ${cosmeticColors.primary}70`
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.9 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h4 className="text-2xl md:text-3xl font-normal text-white mb-2" style={{ fontFamily: fonts.cosmetics.heading }}>Cruelty Free</h4>
                <p className="text-[11px] md:text-xs text-white/90 font-bold uppercase tracking-[0.2em]">& Dermatologist Tested</p>
              </motion.div>
            </div>

            {/* Premium CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <button 
                className="relative overflow-hidden group px-10 md:px-14 py-5 md:py-6 text-white transition-all duration-700 hover:-translate-y-1"
                style={{
                  backgroundColor: cosmeticColors.primary,
                  boxShadow: `0 15px 40px -10px ${cosmeticColors.primary}90`
                }}
              >
                <span className="relative z-10 text-xs md:text-sm tracking-[0.25em] uppercase font-bold flex items-center justify-center gap-4">
                  Shop the Collection
                  <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-in-out"></div>
              </button>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
