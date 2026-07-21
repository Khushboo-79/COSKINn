import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cosmeticColors, fonts } from '../../constants/theme';
import { ArrowRight, Sparkle } from 'lucide-react';

import imgLipstick from '../../assets/images/cat_magnetic_lipstick.webp';
import imgLipLiner from '../../assets/images/cat_lip_liner.webp';
import imgLipBlur from '../../assets/images/cat_blur.webp';
import imgMascara from '../../assets/images/cat_mascara.webp';
import imgEyeshadow from '../../assets/images/cat_eyeshadow_palette.webp';
import imgBlush from '../../assets/images/cat_blush.webp';
import imgBrushes from '../../assets/images/cat_makeup_brushes.webp';
// Using a generic cosmetic image for Brush Holder since there is no specific one
import imgBrushHolder from '../../assets/images/cat_makeup_brushes.webp'; 
import imgPerfume from '../../assets/images/pocket_perfume.webp';

const categories = [
  { id: 1, title: "Lipstick", image: imgLipstick, link: "/collections/magnetic-lipstick" },
  { id: 2, title: "Lip Liner", image: imgLipLiner, link: "/collections/precision-lip-liner" },
  { id: 3, title: "Lip Blur", image: imgLipBlur, link: "/collections/lip-blur" },
  { id: 4, title: "Mascara", image: imgMascara, link: "/collections/lift-curl-mascara" },
  { id: 5, title: "Eyeshadow Palette", image: imgEyeshadow, link: "/collections/eyeshadow-palette" },
  { id: 6, title: "Blush", image: imgBlush, link: "/shop/blush" },
  { id: 7, title: "Makeup Brushes", image: imgBrushes, link: "/shop/brushes" },
  { id: 8, title: "Brush Holder", image: imgBrushHolder, link: "/shop/brush-holder" },
  { id: 9, title: "Pocket Perfume", image: imgPerfume, link: "/shop/perfume" },
];

export default function FeaturedCategories() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-white" ref={containerRef}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center justify-center gap-3 mb-16"
        >
          <Sparkle size={14} style={{ color: cosmeticColors.accent, opacity: 0.6 }} />
          <h2 
            className="text-2xl md:text-3xl lg:text-4xl text-gray-900 font-medium tracking-wide uppercase"
            style={{ fontFamily: fonts.cosmetics.heading }}
          >
            Featured Categories
          </h2>
          <Sparkle size={14} style={{ color: cosmeticColors.accent, opacity: 0.6 }} />
        </motion.div>

        {/* Horizontal Scrolling Container */}
        <div className="w-full overflow-hidden">
          <div className="flex overflow-x-auto gap-8 lg:gap-12 pb-8 pt-4 px-4 -mx-4 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="flex flex-col items-center group cursor-pointer snap-start shrink-0"
              >
                {/* Circular Image Container (Premium Card Design Maintained) */}
                <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-[#FFF5F7] mb-6 overflow-hidden relative shadow-sm border border-pink-50/50 flex items-center justify-center">
                  <motion.img 
                    src={category.image} 
                    alt={`COSKINn ${category.title}`}
                    className="w-[110%] h-[110%] object-cover object-center group-hover:-translate-y-1 group-hover:scale-[1.03] transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                  />
                </div>

                {/* Title & Link */}
                <h3 
                  className="text-lg md:text-xl text-gray-900 font-medium tracking-wider mb-2 transition-colors duration-300 group-hover:text-[#FF0069] text-center"
                  style={{ fontFamily: fonts.cosmetics.heading }}
                >
                  {category.title}
                </h3>
                
                <div className="flex items-center justify-center gap-1 text-sm font-medium transition-transform duration-300 group-hover:translate-x-1" style={{ color: cosmeticColors.primary }}>
                  Shop Now <ArrowRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
      
      {/* Hide scrollbar styles using a scoped style tag as fallback */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
