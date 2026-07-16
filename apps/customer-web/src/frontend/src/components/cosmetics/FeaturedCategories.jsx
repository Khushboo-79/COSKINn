import React from 'react';
import { motion } from 'framer-motion';
import { cosmeticColors, fonts } from '../../constants/theme';
import { ArrowRight } from 'lucide-react';

import catMagneticLipstick from '../../assets/images/cat_magnetic_lipstick.webp';
import catBlush from '../../assets/images/cat_blush.webp';
import catBlur from '../../assets/images/cat_blur.webp';
import catEyeshadowPalette from '../../assets/images/cat_eyeshadow_palette.webp';
import catMascara from '../../assets/images/cat_mascara.webp';
import catLipLiner from '../../assets/images/cat_lip_liner.webp';

const categories = [
  {
    id: 1,
    title: "COSKINn Magnetic Lipstick",
    description: "Intense color with a flawless satin finish. A true statement of everyday luxury.",
    image: catMagneticLipstick,
  },
  {
    id: 2,
    title: "COSKINn Velvet Blush",
    description: "A soft, radiant flush of color.",
    image: catBlush,
  },
  {
    id: 3,
    title: "COSKINn Blur Stick",
    description: "Weightless matte color for everywhere.",
    image: catBlur,
  },
  {
    id: 4,
    title: "COSKINn Palette",
    description: "High-pigment shimmer and matte shades.",
    image: catEyeshadowPalette,
  },
  {
    id: 5,
    title: "COSKINn Mascara",
    description: "Dramatic lift and separation.",
    image: catMascara,
  },
  {
    id: 6,
    title: "COSKINn Lip Liner",
    description: "Define and shape with perfection.",
    image: catLipLiner,
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
};

export default function FeaturedCategories() {
  return (
    <section className="relative w-full pb-24 lg:pb-32 bg-white overflow-hidden -mt-10 lg:-mt-20">
      <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-0">

        {/* --- BLOCK 1: Hero Category & Section Header --- */}
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-stretch justify-between gap-12 lg:gap-20 mb-16 lg:mb-20">
          
          {/* Left Side: Header & Text Anchor */}
          <div className="w-full lg:w-[50%] flex flex-col justify-between">
            {/* Main Header anchored at the top left */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="mb-16 lg:mb-0"
            >
              <span 
                className="inline-block mb-8 px-6 py-2.5 rounded-full border bg-white text-[11px] font-black tracking-[0.2em] uppercase shadow-sm"
                style={{ borderColor: cosmeticColors.primary, color: cosmeticColors.accent }}
              >
                Our Collection
              </span>
              <h2 
                className="text-5xl md:text-6xl lg:text-[75px] font-black text-[#1b1b1b] tracking-tight mb-8 leading-[1.05]"
                style={{ fontFamily: fonts.cosmetics.heading }}
              >
                The COSKINn <br/> Collection
              </h2>
              <p 
                className="text-lg md:text-xl text-gray-600 max-w-lg font-medium leading-relaxed"
                style={{ fontFamily: fonts.cosmetics.body }}
              >
                Discover our meticulously crafted line of luxury cosmetics, designed to elevate your everyday glamour with unparalleled elegance.
              </p>
            </motion.div>

            {/* Category Title anchored at the bottom */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="lg:pb-10 mt-12 lg:mt-32"
            >
              <h3 
                className="text-3xl md:text-5xl text-[#1b1b1b] font-bold mb-4" 
                style={{ fontFamily: fonts.cosmetics.heading }}
              >
                {categories[0].title}
              </h3>
              <p 
                className="text-gray-600 text-lg md:text-xl font-medium tracking-wide mb-8 max-w-md" 
                style={{ fontFamily: fonts.cosmetics.body }}
              >
                {categories[0].description}
              </p>
              <button 
                className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest transition-colors"
                style={{ color: cosmeticColors.accent }}
              >
                <span>Explore</span>
                <div 
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-all group-hover:scale-110 shadow-sm" 
                  style={{ borderColor: cosmeticColors.primary, color: cosmeticColors.accent }}
                >
                  <ArrowRight size={16} />
                </div>
              </button>
            </motion.div>
          </div>

          {/* Right Side: Hero Portrait Image */}
          <motion.div 
            className="w-full lg:w-[45%] flex justify-end"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <div className="w-full max-w-[550px] aspect-[3/4] relative rounded-[32px] overflow-hidden group cursor-pointer"
                 style={{ boxShadow: `0 30px 60px -15px ${cosmeticColors.primary}80` }}>
              <motion.img 
                src={categories[0].image} 
                alt={categories[0].title}
                className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.04]"
              />
            </div>
          </motion.div>

        </div>

        {/* --- BLOCK 2: Asymmetrical Dual Feature --- */}
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-12 lg:gap-24 mb-16 lg:mb-20">
          
          {/* Left Feature (Offset lower on desktop) */}
          <motion.div 
            className="w-full lg:w-[40%] flex flex-col lg:mt-32"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <div className="w-full aspect-[4/5] relative rounded-[32px] overflow-hidden group cursor-pointer mb-8"
                 style={{ boxShadow: `0 25px 50px -12px ${cosmeticColors.primary}70` }}>
              <motion.img 
                src={categories[1].image} 
                alt={categories[1].title}
                className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.04]"
              />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-[#1b1b1b] mb-2" style={{ fontFamily: fonts.cosmetics.heading }}>
              {categories[1].title}
            </h3>
            <p className="text-gray-500 text-lg font-medium tracking-wide" style={{ fontFamily: fonts.cosmetics.body }}>
              {categories[1].description}
            </p>
          </motion.div>

          {/* Right Feature (Offset higher) */}
          <motion.div 
            className="w-full lg:w-[40%] flex flex-col"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <div className="w-full aspect-square relative rounded-[32px] overflow-hidden group cursor-pointer mb-8"
                 style={{ boxShadow: `0 25px 50px -12px ${cosmeticColors.primary}70` }}>
              <motion.img 
                src={categories[2].image} 
                alt={categories[2].title}
                className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.04]"
              />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-[#1b1b1b] mb-2" style={{ fontFamily: fonts.cosmetics.heading }}>
              {categories[2].title}
            </h3>
            <p className="text-gray-500 text-lg font-medium tracking-wide" style={{ fontFamily: fonts.cosmetics.body }}>
              {categories[2].description}
            </p>
          </motion.div>

        </div>

        {/* --- BLOCK 3: Masonry Cluster Showcase --- */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-10">
          
          {/* Small Landscape (Palette) */}
          <motion.div 
            className="w-full lg:w-[35%] flex flex-col lg:mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <div className="w-full aspect-[4/3] relative rounded-[32px] overflow-hidden group cursor-pointer mb-6"
                 style={{ boxShadow: `0 20px 40px -10px ${cosmeticColors.primary}60` }}>
              <motion.img 
                src={categories[3].image} 
                alt={categories[3].title}
                className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.04]"
              />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-[#1b1b1b] mb-2" style={{ fontFamily: fonts.cosmetics.heading }}>
              {categories[3].title}
            </h3>
            <p className="text-gray-500 font-medium tracking-wide" style={{ fontFamily: fonts.cosmetics.body }}>
              {categories[3].description}
            </p>
          </motion.div>

          {/* Tall Portrait (Mascara) */}
          <motion.div 
            className="w-full lg:w-[30%] flex flex-col"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <div className="w-full aspect-[3/5] relative rounded-[32px] overflow-hidden group cursor-pointer mb-6"
                 style={{ boxShadow: `0 20px 40px -10px ${cosmeticColors.primary}60` }}>
              <motion.img 
                src={categories[4].image} 
                alt={categories[4].title}
                className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.04]"
              />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-[#1b1b1b] mb-2" style={{ fontFamily: fonts.cosmetics.heading }}>
              {categories[4].title}
            </h3>
            <p className="text-gray-500 font-medium tracking-wide" style={{ fontFamily: fonts.cosmetics.body }}>
              {categories[4].description}
            </p>
          </motion.div>

          {/* Square (Lip Liner) */}
          <motion.div 
            className="w-full lg:w-[35%] flex flex-col lg:mt-32"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <div className="w-full aspect-square relative rounded-[32px] overflow-hidden group cursor-pointer mb-6"
                 style={{ boxShadow: `0 20px 40px -10px ${cosmeticColors.primary}60` }}>
              <motion.img 
                src={categories[5].image} 
                alt={categories[5].title}
                className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.04]"
              />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-[#1b1b1b] mb-2" style={{ fontFamily: fonts.cosmetics.heading }}>
              {categories[5].title}
            </h3>
            <p className="text-gray-500 font-medium tracking-wide" style={{ fontFamily: fonts.cosmetics.body }}>
              {categories[5].description}
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
