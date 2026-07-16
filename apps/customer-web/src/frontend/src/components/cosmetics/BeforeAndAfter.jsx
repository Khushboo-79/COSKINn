import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cosmeticColors, skincareColors, fonts } from '../../constants/theme';
import editorialBefore from '../../assets/images/cosmetics_before_model.webp';
import editorialAfter from '../../assets/images/cosmetics_after_model.webp';
import lipstickImg from '../../assets/images/cat_magnetic_lipstick.webp';
import blushImg from '../../assets/images/cat_blush.webp';
import mascaraImg from '../../assets/images/cat_mascara.webp';
import paletteImg from '../../assets/images/cat_eyeshadow_palette.webp';

const productsUsed = [
  { step: "Base", name: "COSKINn Velvet Blush", image: blushImg },
  { step: "Eyes", name: "COSKINn Eyeshadow Palette", image: paletteImg },
  { step: "Lashes", name: "COSKINn Lift & Curl Mascara", image: mascaraImg },
  { step: "Lips", name: "COSKINn Magnetic Lipstick", image: lipstickImg }
];

export default function BeforeAndAfter() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start end", "end start"] 
  });
  
  const yImage1 = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const yImage2 = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const shapeOpacity = useTransform(scrollYProgress, [0, 1], [0.1, 0.4]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full pt-6 md:pt-8 pb-16 md:pb-24 overflow-hidden" 
      style={{ 
        fontFamily: fonts.cosmetics.body,
        background: `linear-gradient(145deg, #FFFFFF 0%, ${cosmeticColors.primary}15 100%)`
      }}
    >
      {/* Background Ambience */}
      <motion.div 
        className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply pointer-events-none" 
        style={{ 
          background: `radial-gradient(circle, ${cosmeticColors.primary}30 0%, transparent 70%)`,
          opacity: shapeOpacity 
        }}
      />
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[60px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Editorial Heading & Description */}
        <div className="text-center mb-16 md:mb-20 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-6 py-2 mb-6 rounded-full inline-block"
            style={{ border: `1px solid ${cosmeticColors.primary}40`, backgroundColor: `${cosmeticColors.primary}05` }}
          >
            <p className="text-[10px] md:text-xs font-bold tracking-[0.35em] uppercase text-gray-800">
              The Art of Metamorphosis
            </p>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-normal text-gray-900 mb-6 leading-[1.1]"
            style={{ fontFamily: fonts.cosmetics.heading }}
          >
            Editorial <span className="italic" style={{ color: cosmeticColors.primary }}>Glamour</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto tracking-wide leading-relaxed"
          >
            A symphony of high-pigment formulations and flawless finishes. Discover the luxury of effortless beauty and bold transformation that elevates your daily ritual.
          </motion.p>
        </div>

        {/* Interactive Transformation Showcase (Side-by-Side Composition) */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center justify-center mb-12">
          
          {/* Before Image - The Canvas */}
          <motion.div 
            className="w-full md:w-5/12 relative flex justify-end"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <div className="w-[85%] md:w-[70%] aspect-[3/4] relative overflow-hidden group rounded-sm" style={{ border: `1px solid ${cosmeticColors.primary}20` }}>
              <div className="absolute top-4 left-4 md:top-6 md:left-6 px-5 py-2 rounded-full shadow-lg z-20 backdrop-blur-md bg-white/95" style={{ boxShadow: `0 10px 25px -5px ${skincareColors.primary}40` }}>
                <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase" style={{ color: skincareColors.primary }}>Before</span>
              </div>
              <motion.img 
                style={{ y: yImage1 }}
                src={editorialBefore} 
                alt="COSKINn Before" 
                className="w-full h-[120%] absolute top-[-10%] object-cover grayscale-[0.15] contrast-[0.95]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 px-5 py-2 bg-white/90 backdrop-blur-md shadow-lg">
                <span className="text-[9px] md:text-[10px] font-bold tracking-[0.25em] uppercase text-gray-900">The Canvas</span>
              </div>
            </div>
          </motion.div>

          {/* After Image - The Masterpiece */}
          <motion.div 
            className="w-full md:w-6/12 relative flex justify-start mt-8 md:mt-0"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="w-[85%] md:w-[70%] aspect-[3/4] relative overflow-hidden group shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] rounded-sm" style={{ border: `1px solid ${cosmeticColors.primary}40` }}>
              <div className="absolute top-4 left-4 md:top-6 md:left-6 px-5 py-2 rounded-full shadow-lg z-20 backdrop-blur-md bg-white/95" style={{ boxShadow: `0 10px 25px -5px ${skincareColors.primary}40` }}>
                <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase" style={{ color: skincareColors.primary }}>After</span>
              </div>
              <motion.img 
                style={{ y: yImage2 }}
                src={editorialAfter} 
                alt="COSKINn After" 
                className="w-full h-[120%] absolute top-[-10%] object-cover brightness-[1.05]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <div className="absolute bottom-8 right-8 px-6 py-3 bg-white shadow-xl" style={{ borderTop: `2px solid ${cosmeticColors.primary}` }}>
                <span className="text-[10px] md:text-[11px] font-bold tracking-[0.25em] uppercase text-gray-900">The Masterpiece</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* COSKINn Products Used Collection */}
        <div className="w-full border-t pt-10 md:pt-12" style={{ borderColor: `${cosmeticColors.primary}20` }}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-normal text-gray-900 mb-3" style={{ fontFamily: fonts.cosmetics.heading }}>The Collection</h3>
            <p className="text-xs tracking-[0.2em] uppercase font-bold text-gray-400">Crafting the look</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {productsUsed.map((product, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.1 + (idx * 0.15) }}
                className="flex flex-col items-center group text-center cursor-default"
              >
                {/* Product Image Circle */}
                <div 
                  className="w-full aspect-square bg-white rounded-full flex items-center justify-center p-8 mb-6 relative overflow-hidden transition-all duration-700 group-hover:scale-105 group-hover:-translate-y-2"
                  style={{ 
                    border: `1px solid ${cosmeticColors.primary}15`, 
                    boxShadow: `0 15px 35px -10px ${cosmeticColors.primary}20` 
                  }}
                >
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
                
                {/* Product Details */}
                <span className="text-[9px] md:text-[10px] tracking-[0.25em] font-bold uppercase mb-2" style={{ color: cosmeticColors.primary }}>{product.step}</span>
                <h4 className="text-sm md:text-base font-medium text-gray-900 px-4 leading-snug" style={{ fontFamily: fonts.cosmetics.heading }}>{product.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
