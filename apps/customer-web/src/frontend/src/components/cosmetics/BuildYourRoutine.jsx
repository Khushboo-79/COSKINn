import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cosmeticColors, fonts } from '../../constants/theme';

// Editorial Model Images
import naturalGlowModel from '../../assets/images/cosmetics_before_model.webp';
import softGlamModel from '../../assets/images/cosmetics_editorial_lifestyle.png';
import partyGlamModel from '../../assets/images/cosmetics_after_model.webp';
import boldEveningModel from '../../assets/images/cosmetics_main_hero.webp';

// Products
import brushImg from '../../assets/images/cat_makeup_brushes.webp';
import blurImg from '../../assets/images/cat_blur.webp';
import mascaraImg from '../../assets/images/cat_mascara.webp';
import blushImg from '../../assets/images/cat_blush.webp';
import lipstickImg from '../../assets/images/cat_magnetic_lipstick.webp';
import lipLinerImg from '../../assets/images/cat_lip_liner.webp';
import paletteImg from '../../assets/images/cat_eyeshadow_palette.webp';

const signatureLooks = [
  {
    title: "Natural Glow",
    description: "A flawless, breathable canvas that enhances your natural beauty with a luminous, lit-from-within radiance.",
    image: naturalGlowModel,
    products: [
      { name: "COSKINn Professional Brush Set", image: brushImg },
      { name: "COSKINn Lip & Cheek Blur", image: blurImg },
      { name: "COSKINn Lift & Curl Mascara", image: mascaraImg }
    ]
  },
  {
    title: "Soft Glam",
    description: "Elevate your everyday with soft, diffused contours and velvety, plush textures that whisper effortless luxury.",
    image: softGlamModel,
    products: [
      { name: "COSKINn Velvet Blush", image: blushImg },
      { name: "COSKINn Magnetic Lipstick", image: lipstickImg },
      { name: "COSKINn Precision Lip Liner", image: lipLinerImg }
    ]
  },
  {
    title: "Party Glam",
    description: "Command the room with striking depth, mesmerizing shimmers, and bold definitions crafted for the spotlight.",
    image: partyGlamModel,
    products: [
      { name: "COSKINn Eyeshadow Palette", image: paletteImg },
      { name: "COSKINn Lift & Curl Mascara", image: mascaraImg },
      { name: "COSKINn Magnetic Lipstick", image: lipstickImg }
    ]
  },
  {
    title: "Bold Evening",
    description: "Unleash intense pigments and dramatic artistry for an unforgettable, high-fashion evening masterpiece.",
    image: boldEveningModel,
    products: [
      { name: "COSKINn Eyeshadow Palette", image: paletteImg },
      { name: "COSKINn Velvet Blush", image: blushImg },
      { name: "COSKINn Lip & Cheek Blur", image: blurImg }
    ]
  }
];

export default function BuildYourRoutine() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full pt-10 md:pt-12 pb-20 md:pb-32 overflow-hidden"
      style={{ 
        fontFamily: fonts.cosmetics.body,
        background: `linear-gradient(135deg, ${cosmeticColors.secondary} 0%, ${cosmeticColors.primary}15 50%, ${cosmeticColors.secondary} 100%)`
      }}
    >
      {/* Luxury Gradient Background Layering */}
      <motion.div 
        className="absolute top-0 right-0 w-[70vw] h-[70vw] rounded-bl-full pointer-events-none opacity-30 mix-blend-multiply"
        style={{ 
          background: `radial-gradient(circle at top right, ${cosmeticColors.primary}40 0%, transparent 70%)`,
          y: bgY
        }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-[60vw] h-[60vw] rounded-tr-full pointer-events-none opacity-20 mix-blend-multiply"
        style={{ 
          background: `radial-gradient(circle at bottom left, ${cosmeticColors.primary}50 0%, transparent 70%)`
        }}
      />
      
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Editorial Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-6 py-2 mb-6 rounded-full inline-block"
            style={{ border: `1px solid ${cosmeticColors.primary}40`, backgroundColor: `${cosmeticColors.primary}05` }}
          >
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-gray-800">
              THE LOOKBOOK
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-7xl font-normal text-gray-900 tracking-tight"
            style={{ fontFamily: fonts.cosmetics.heading }}
          >
            Create Your <br className="md:hidden" />
            <span className="italic" style={{ color: cosmeticColors.primary }}>Signature Look</span>
          </motion.h2>
        </div>

        {/* Alternating Editorial Panels */}
        <div className="flex flex-col gap-24 md:gap-32">
          {signatureLooks.map((look, index) => {
            const isImageRight = index % 2 !== 0;
            
            return (
              <div 
                key={index} 
                className={`flex flex-col ${isImageRight ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-center gap-12 md:gap-16 lg:gap-24 max-w-6xl mx-auto`}
              >
                
                {/* Look Image Panel */}
                <motion.div 
                  className="w-[90%] md:w-5/12 lg:w-4/12 relative group mx-auto md:mx-0"
                  initial={{ opacity: 0, x: isImageRight ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <div 
                    className="relative w-full aspect-[3/4] overflow-hidden"
                    style={{ 
                      boxShadow: `0 20px 50px -15px ${cosmeticColors.primary}30`,
                      border: `1px solid ${cosmeticColors.primary}20` 
                    }}
                  >
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
                    <img 
                      src={look.image} 
                      alt={look.title} 
                      className="w-full h-full object-cover filter brightness-[1.02] transform transition-transform duration-[1.5s] group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Accent Deco */}
                  <div 
                    className={`absolute -bottom-6 ${isImageRight ? '-left-6' : '-right-6'} w-32 h-32 border-b-2 ${isImageRight ? 'border-l-2' : 'border-r-2'} pointer-events-none opacity-30`}
                    style={{ borderColor: cosmeticColors.primary }}
                  />
                </motion.div>

                {/* Content Panel */}
                <motion.div 
                  className={`w-full md:w-1/2 lg:w-5/12 flex flex-col justify-center ${isImageRight ? 'md:items-end md:text-right' : 'md:items-start text-left'}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                >
                  <span className="text-xs tracking-[0.2em] font-bold uppercase text-gray-400 mb-6 block">
                    Look 0{index + 1}
                  </span>
                  
                  <h3 className="text-4xl lg:text-5xl font-normal text-gray-900 mb-8" style={{ fontFamily: fonts.cosmetics.heading }}>
                    {look.title}
                  </h3>
                  
                  <p className="text-gray-600 font-light text-base lg:text-lg leading-relaxed max-w-md mb-14">
                    {look.description}
                  </p>
                  
                  {/* Products Used List */}
                  <div className={`w-full max-w-md mb-14 flex flex-col ${isImageRight ? 'items-end' : 'items-start'}`}>
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-gray-800 mb-6 border-b pb-2 inline-block" style={{ borderBottomColor: `${cosmeticColors.primary}40` }}>
                      Products Used
                    </span>
                    
                    <div className="flex flex-col gap-4 w-full">
                      {look.products.map((product, pIndex) => (
                        <div key={pIndex} className={`flex items-center gap-4 group cursor-pointer ${isImageRight ? 'flex-row-reverse justify-start' : 'flex-row'}`}>
                          <div 
                            className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-2 relative overflow-hidden transition-transform duration-300 group-hover:scale-110"
                            style={{ 
                              border: `1px solid ${cosmeticColors.primary}20`,
                              boxShadow: `0 5px 15px -5px ${cosmeticColors.primary}20` 
                            }}
                          >
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                          </div>
                          <span className={`text-sm font-medium text-gray-700 transition-colors duration-300 group-hover:text-black ${isImageRight ? 'text-right' : 'text-left'}`}>
                            {product.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Shop This Look Button */}
                  <button 
                    className="relative overflow-hidden group px-8 py-4 text-white transition-transform duration-500 hover:-translate-y-1"
                    style={{
                      background: `linear-gradient(135deg, ${cosmeticColors.primary} 0%, #ff3385 100%)`,
                      boxShadow: `0 10px 30px -10px ${cosmeticColors.primary}80`
                    }}
                  >
                    <span className="relative z-10 text-[11px] tracking-[0.25em] uppercase font-bold block">
                      Shop This Look
                    </span>
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-in-out" />
                  </button>

                </motion.div>
                
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
