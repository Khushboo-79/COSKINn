import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { skincareColors, fonts } from '../../constants/theme';
import cleanserImg from '../../assets/images/strawberry_glow_cleanser.webp';
import serumImg from '../../assets/images/niacinamide_serum.webp';
import moisturizerImg from '../../assets/images/daily_moisturiser.webp';
import sunscreenImg from '../../assets/images/vitamin_c_sunscreen.webp';
import editorialImage from '../../assets/images/skincare_transformation_face.png';

const routineProducts = [
  { step: "01", name: "COSKINn Strawberry Glow Cleanser", benefit: "Purifies & brightens the skin canvas", image: cleanserImg },
  { step: "02", name: "COSKINn Niacinamide Serum", benefit: "Refines pores and evens tone deeply", image: serumImg },
  { step: "03", name: "COSKINn Daily Moisturiser", benefit: "Locks in intense hydration & barrier repair", image: moisturizerImg },
  { step: "04", name: "COSKINn Vitamin C Sunscreen", benefit: "SPF 50 broad spectrum protection with a glow", image: sunscreenImg }
];

export default function TransformationShowcase() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const shapeY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-16 md:py-24 overflow-hidden" 
      style={{ 
        fontFamily: fonts.skincare.body,
        background: `linear-gradient(160deg, #FFFFFF 0%, ${skincareColors.secondary}15 100%)`
      }}
    >
      {/* Subtle organic background shape */}
      <motion.div 
        className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-bl-[100px] mix-blend-multiply opacity-20 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${skincareColors.secondary}80 0%, transparent 70%)`, y: shapeY }}
      />
      
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Top Section: Editorial Story */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center mb-24">
          
          {/* Left Column: Editorial Image */}
          <div className="w-full lg:w-5/12 relative">
            <motion.div 
              className="relative w-full aspect-[4/5] rounded-t-full overflow-hidden bg-white"
              style={{ boxShadow: `0 25px 60px -15px ${skincareColors.primary}20` }}
            >
              <motion.img 
                style={{ y: imgY }}
                src={editorialImage} 
                alt="COSKINn Skin Transformation" 
                className="w-full h-[120%] object-cover object-center absolute top-[-10%]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </motion.div>
            
            {/* Floating Luxury Tag */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -bottom-8 -left-4 md:-left-8 bg-white p-6 md:p-8 rounded-sm shadow-xl z-20"
              style={{ borderTop: `2px solid ${skincareColors.primary}` }}
            >
              <p className="text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase mb-1" style={{ color: skincareColors.primary }}>Real Results</p>
              <h4 className="text-xl md:text-2xl font-normal text-gray-900" style={{ fontFamily: fonts.skincare.heading }}>Luminous Skin</h4>
            </motion.div>
          </div>

          {/* Right Column: Narrative */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-6" style={{ color: skincareColors.primary }}>
                The Art of Beauty
              </span>
              <h2 
                className="text-4xl md:text-5xl lg:text-7xl font-normal text-gray-900 mb-8 leading-[1.1]"
                style={{ fontFamily: fonts.skincare.heading }}
              >
                Visible Skin <br />
                <span className="italic relative inline-block mt-2">
                  Transformation
                  <span className="absolute bottom-2 md:bottom-3 left-0 w-full h-2 md:h-3 opacity-20 -z-10" style={{ backgroundColor: skincareColors.primary }}></span>
                </span>
              </h2>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-lg mb-10 tracking-wide"
            >
              A carefully curated ritual designed to restore your natural glow. Experience the profound, healthy-looking radiance that comes from consistent nourishment and clinical-grade botanical extracts.
            </motion.p>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="w-24 h-[1px] origin-left"
              style={{ backgroundColor: skincareColors.primary }}
            />
          </div>
        </div>

        {/* Bottom Section: The Routine Showcase */}
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-normal text-gray-900 mb-3" style={{ fontFamily: fonts.skincare.heading }}>
              The COSKINn Routine
            </h3>
            <p className="text-xs md:text-sm tracking-[0.2em] uppercase font-bold text-gray-400">4 Steps to Radiance</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {routineProducts.map((product, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.2 + (index * 0.15) }}
                className="flex flex-col items-center group cursor-default"
              >
                {/* Arch Product Display */}
                <div 
                  className="w-full aspect-[4/5] bg-white rounded-t-full p-8 flex items-center justify-center relative overflow-hidden transition-all duration-700" 
                  style={{ 
                    boxShadow: `0 15px 40px -20px ${skincareColors.primary}20`,
                    borderBottom: `2px solid transparent`
                  }}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2 mix-blend-multiply" 
                    loading="lazy" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
                
                {/* Details */}
                <div className="w-full text-center mt-8 px-2 relative">
                  <span 
                    className="absolute -top-16 left-1/2 -translate-x-1/2 text-[70px] font-bold opacity-[0.03] pointer-events-none transition-opacity duration-500 group-hover:opacity-[0.06]" 
                    style={{ fontFamily: fonts.skincare.heading, color: skincareColors.primary }}
                  >
                    {product.step}
                  </span>
                  <p className="text-[10px] tracking-[0.2em] font-bold uppercase mb-3" style={{ color: skincareColors.primary }}>Step {product.step}</p>
                  <h4 className="text-base md:text-lg font-medium text-gray-900 mb-2 leading-snug" style={{ fontFamily: fonts.skincare.heading }}>{product.name}</h4>
                  <p className="text-xs md:text-sm text-gray-500 font-light tracking-wide">{product.benefit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
