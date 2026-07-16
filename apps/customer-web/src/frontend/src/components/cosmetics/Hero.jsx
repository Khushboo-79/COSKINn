import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cosmeticColors, fonts } from '../../constants/theme';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';

// Premium cosmetics campaign images for the crossfade
import img1 from '../../assets/images/luxury_hero_banner.webp';
import img2 from '../../assets/images/cosmetics_after_model.webp';
import img3 from '../../assets/images/cat_mascara_model.webp';
import img4 from '../../assets/images/cat_blush_model.webp';
import img5 from '../../assets/images/cat_magnetic_lipstick.webp';

const HERO_IMAGES = [
  { src: img1, position: 'object-[center_right] xl:object-[center_top]' },
  { src: img2, position: 'object-[center_top]' },
  { src: img3, position: 'object-center' },
  { src: img4, position: 'object-[center_top]' },
  { src: img5, position: 'object-[center_bottom]' }
];

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 }
};

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Elegant, seamless auto-crossfade every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[750px] lg:min-h-[850px] overflow-hidden flex items-center" style={{ backgroundColor: cosmeticColors.secondary }}>
      
      {/* Edge-to-Edge Premium Editorial Image Layer */}
      {/* Added overflow-hidden to prevent scaling images from bleeding past the gradient and creating a vertical line */}
      <div className="absolute top-0 right-0 w-full lg:w-[75%] h-full z-0 bg-white overflow-hidden">
        
        {/* Seamless Fade Gradient: White/Secondary Color -> Transparent */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to right, ${cosmeticColors.secondary} 0%, ${cosmeticColors.secondary}99 30%, transparent 100%)` }}
        ></div>
        
        {/* Mobile bottom fade to ensure text readability */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none lg:hidden"
          style={{ background: `linear-gradient(to top, ${cosmeticColors.secondary} 0%, ${cosmeticColors.secondary}99 40%, transparent 100%)` }}
        ></div>
        
        {/* Smooth Image Crossfade with Preloading (Overlapping Fade) */}
        {HERO_IMAGES.map((item, idx) => {
          const isActive = currentIndex === idx;
          const isPrevious = (currentIndex - 1 + HERO_IMAGES.length) % HERO_IMAGES.length === idx;

          return (
            <motion.img 
              key={idx}
              src={item.src} 
              alt="COSKINn Premium Cosmetics Campaign" 
              className={`absolute top-0 right-0 w-full h-full object-cover ${item.position}`}
              initial={false}
              animate={{ 
                // The incoming image fades to 1. The previous image STAYS at 1 to prevent background flashing.
                opacity: isActive ? 1 : (isPrevious ? 1 : 0), 
                // Subtle scale and soft blur fade as requested for luxury cinematic feel
                scale: isActive ? 1.03 : 1.0,
                filter: isActive ? 'blur(0px)' : 'blur(8px)',
                // The incoming image is placed on top of the previous image
                zIndex: isActive ? 5 : (isPrevious ? 0 : -1)
              }}
              transition={{ 
                // Only the incoming image has a fade duration. Previous image drops instantly to 0 when no longer previous.
                opacity: { duration: isActive ? 1.5 : 0, ease: "easeInOut" }, 
                filter: { duration: isActive ? 1.5 : 0, ease: "easeOut" },
                scale: { duration: 6, ease: "linear" } 
              }}
            />
          );
        })}
      </div>

      {/* Content Layer (Seamlessly sits over the faded left edge of the image) */}
      <div className="container mx-auto px-6 lg:px-12 relative z-20 h-full flex items-center pt-40 lg:pt-52 pb-20 pointer-events-none">
        
        {/* Content restricted to the left half, preventing overlap with the crisp part of the image */}
        <div className="w-full lg:w-[55%] flex flex-col items-start text-left pointer-events-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.15, duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            {/* Minimal Premium Badge */}
            <motion.div variants={fadeUp} className="mb-6 inline-flex">
              <span 
                className="px-5 py-2.5 rounded-full border bg-white/60 backdrop-blur-md shadow-sm text-[11px] font-black tracking-[0.2em] uppercase" 
                style={{ borderColor: cosmeticColors.primary, color: cosmeticColors.accent }}
              >
                The Signature Collection
              </span>
            </motion.div>

            {/* Luxury Heading */}
            <motion.h1 
              variants={fadeUp}
              className="text-5xl md:text-7xl lg:text-[85px] xl:text-[95px] leading-[1.02] font-black mb-6 tracking-tight text-[#1b1b1b]"
              style={{ fontFamily: fonts.cosmetics.heading }}
            >
              Define Your <br/>
              <span 
                className="text-transparent bg-clip-text" 
                style={{ backgroundImage: `linear-gradient(to right, ${cosmeticColors.accent}, ${cosmeticColors.primary})` }}
              >
                Radiance.
              </span>
            </motion.h1>

            {/* Concise Editorial Copy */}
            <motion.p 
              variants={fadeUp}
              className="text-lg md:text-xl text-gray-700 mb-10 max-w-[500px] leading-relaxed font-medium drop-shadow-sm"
              style={{ fontFamily: fonts.cosmetics.body }}
            >
              Discover high-performance cosmetics that merge bold pigment with lightweight, skin-loving ingredients. Designed for the modern glow.
            </motion.p>

            {/* Action Buttons (Strictly Cosmetics Colors, NO Black) */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: `0 15px 35px -10px ${cosmeticColors.accent}` }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-10 py-5 rounded-full text-white font-bold tracking-[0.15em] uppercase text-sm transition-all flex items-center justify-center gap-3 group shadow-[0_10px_30px_rgba(255,143,177,0.3)]"
                style={{ backgroundColor: cosmeticColors.accent, fontFamily: fonts.cosmetics.heading }}
              >
                Shop Cosmetics
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </motion.button>
              
              <motion.button 
                whileHover={{ backgroundColor: cosmeticColors.primary, color: cosmeticColors.secondary, borderColor: cosmeticColors.primary }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-10 py-5 rounded-full font-bold tracking-[0.15em] uppercase text-sm border-[2px] transition-all flex items-center justify-center bg-white/40 backdrop-blur-md"
                style={{ borderColor: cosmeticColors.accent, color: cosmeticColors.accent, fontFamily: fonts.cosmetics.heading }}
              >
                Explore Looks
              </motion.button>
            </motion.div>

            {/* Subtle Trust Indicators */}
            <motion.div variants={fadeUp} className="mt-16 flex flex-wrap items-center justify-start gap-8 lg:gap-12 pt-8">
              {[
                { icon: <Heart size={22} />, text: "Cruelty Free" },
                { icon: <ShieldCheck size={22} />, text: "Dermatologist Tested" },
                { icon: <Sparkles size={22} />, text: "100% Vegan" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3 group">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-sm border" 
                    style={{ backgroundColor: cosmeticColors.primary, color: cosmeticColors.secondary, borderColor: cosmeticColors.secondary }}
                  >
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center max-w-[80px] leading-tight">
                    {item.text}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
