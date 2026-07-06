import React from 'react';
import { motion } from 'framer-motion';
import { cosmeticColors, fonts } from '../../constants/theme';

import catMagneticLipstick from '../../assets/images/cat_magnetic_lipstick.png';
import catMakeupBrushes from '../../assets/images/cat_makeup_brushes.png';
import catEyeshadowPalette from '../../assets/images/cat_eyeshadow_palette.png';
import catHolographic from '../../assets/images/cat_holographic.png';
import catBlush from '../../assets/images/cat_blush.png';
import catLipLiner from '../../assets/images/cat_lip_liner.png';
import catBlur from '../../assets/images/cat_blur.png';
import catMascara from '../../assets/images/cat_mascara.png';

const categories = [
  {
    id: 1,
    title: "Magnetic Lipstick",
    description: "Intense color with a flawless satin finish.",
    image: catMagneticLipstick,
    className: "col-span-1 md:col-span-2 md:row-span-2 h-[400px] md:h-[600px]",
  },
  {
    id: 2,
    title: "Luminous Blush",
    description: "A soft, radiant flush of color.",
    image: catBlush,
    className: "col-span-1 md:col-span-1 md:row-span-1 h-[300px] md:h-[290px]",
  },
  {
    id: 3,
    title: "Lip & Cheek Blur",
    description: "Weightless matte color for everywhere.",
    image: catBlur,
    className: "col-span-1 md:col-span-1 md:row-span-1 h-[300px] md:h-[290px]",
  },
  {
    id: 4,
    title: "Holographic Edition",
    description: "Iridescent luxury for the bold.",
    image: catHolographic,
    className: "col-span-1 md:col-span-2 md:row-span-1 h-[300px] md:h-[290px]",
    isComingSoon: true,
  },
  {
    id: 5,
    title: "Eyeshadow Palette",
    description: "High-pigment shimmer and matte shades.",
    image: catEyeshadowPalette,
    className: "col-span-1 md:col-span-2 md:row-span-2 h-[400px] md:h-[600px]",
  },
  {
    id: 6,
    title: "Volume Mascara",
    description: "Dramatic lift and separation.",
    image: catMascara,
    className: "col-span-1 md:col-span-1 md:row-span-2 h-[400px] md:h-[600px]",
  },
  {
    id: 7,
    title: "Precision Lip Liner",
    description: "Define and shape with perfection.",
    image: catLipLiner,
    className: "col-span-1 md:col-span-1 md:row-span-1 h-[300px] md:h-[290px]",
  },
  {
    id: 8,
    title: "Luxury Brushes",
    description: "Premium tools for flawless application.",
    image: catMakeupBrushes,
    className: "col-span-1 md:col-span-1 md:row-span-1 h-[300px] md:h-[290px]",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function FeaturedCategories() {
  return (
    <section 
      className="relative w-full py-24 md:py-32 bg-[#fafafa] overflow-hidden"
      style={{ fontFamily: fonts.cosmetics.body }}
    >
      {/* Background Soft Glows */}
      <div 
        className="absolute top-0 left-0 w-[40vw] h-[40vw] rounded-full mix-blend-multiply filter blur-[150px] opacity-30 pointer-events-none"
        style={{ backgroundColor: cosmeticColors.secondary }}
      />
      <div 
        className="absolute bottom-0 right-0 w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[150px] opacity-20 pointer-events-none"
        style={{ backgroundColor: cosmeticColors.primary }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 
            className="text-5xl md:text-6xl font-bold mb-6 text-black tracking-tight"
            style={{ fontFamily: fonts.cosmetics.heading }}
          >
            The Collection
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Discover our meticulously crafted line of luxury cosmetics, designed to elevate your everyday glamour with unparalleled elegance.
          </p>
        </motion.div>

        {/* Editorial Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category) => (
            <motion.div 
              key={category.id}
              variants={itemVariants}
              whileHover="hover"
              className={`relative rounded-[2rem] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500 bg-white ${category.className}`}
            >
              {/* Image Background */}
              <div className="absolute inset-0 w-full h-full">
                <motion.img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover"
                  variants={{
                    hover: { scale: 1.05 }
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>

              {/* Holographic Special Effects */}
              {category.isComingSoon && (
                <motion.div 
                  className="absolute inset-0 opacity-50 mix-blend-overlay pointer-events-none"
                  style={{
                    background: `linear-gradient(120deg, transparent, rgba(255,255,255,0.8), transparent)`
                  }}
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
              
              {/* Hover Light Reflection */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 pointer-events-none"
                variants={{
                  hover: { opacity: 1, x: ['-100%', '100%'] }
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />

              {/* Content Box */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                
                {category.isComingSoon && (
                  <div className="absolute top-6 right-6">
                    <span 
                      className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md bg-white/20 border border-white/30"
                      style={{ color: cosmeticColors.accent }}
                    >
                      Coming Soon
                    </span>
                  </div>
                )}
                
                <motion.div
                  variants={{
                    hover: { y: -5 }
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <h3 
                    className="text-3xl md:text-4xl text-white font-bold mb-2 drop-shadow-md"
                    style={{ fontFamily: fonts.cosmetics.heading }}
                  >
                    {category.title}
                  </h3>
                  
                  <motion.p 
                    className="text-white/80 font-light text-base md:text-lg mb-4"
                    variants={{
                      hover: { opacity: 1, y: 0 }
                    }}
                    initial={{ opacity: 0.7 }}
                  >
                    {category.description}
                  </motion.p>
                  
                  {/* Explore Link */}
                  <motion.div 
                    className="flex items-center gap-2 overflow-hidden"
                    variants={{
                      hover: { opacity: 1 }
                    }}
                    initial={{ opacity: 0 }}
                  >
                    <span 
                      className="text-sm font-bold uppercase tracking-widest"
                      style={{ color: cosmeticColors.secondary }}
                    >
                      Explore
                    </span>
                    <motion.div 
                      className="h-[1px] bg-current"
                      style={{ backgroundColor: cosmeticColors.secondary }}
                      variants={{
                        hover: { width: "40px" }
                      }}
                      initial={{ width: "0px" }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    />
                  </motion.div>
                </motion.div>
                
              </div>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
