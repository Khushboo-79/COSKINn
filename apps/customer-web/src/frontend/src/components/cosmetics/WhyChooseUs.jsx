import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cosmeticColors, fonts } from '../../constants/theme';
import mainImage from '../../assets/images/cosmetics_why_choose_main.png';
import floatingImage from '../../assets/images/cosmetics_why_choose_floating.png';

const trustPoints = [
  { id: 1, title: "Luxury Formula", desc: "Weightless feel, flawless finish.", stat: "24H" },
  { id: 2, title: "Cruelty Free", desc: "Never tested on animals.", stat: "100%" },
  { id: 3, title: "Highly Pigmented", desc: "One swipe color payoff.", stat: "Pro" },
  { id: 4, title: "Dermatologically Tested", desc: "Skin loving ingredients.", stat: "Safe" },
];

export default function WhyChooseUs() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const yFloat = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-24 md:py-32 overflow-hidden bg-white"
      style={{ fontFamily: fonts.cosmetics.body }}
    >
      {/* Background Gradients */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[140px] opacity-20 pointer-events-none"
        style={{ backgroundColor: cosmeticColors.primary }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply filter blur-[160px] opacity-20 pointer-events-none"
        style={{ backgroundColor: cosmeticColors.secondary }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left Side: Interactive Content */}
        <motion.div 
          className="w-full lg:w-[45%] flex flex-col justify-center order-2 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-10 text-center lg:text-left">
            <h4 
              className="text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: cosmeticColors.primary }}
            >
              The COSKINn Difference
            </h4>
            <h2 
              className="text-5xl md:text-6xl font-bold leading-[1.1] mb-6 text-black"
              style={{ fontFamily: fonts.cosmetics.heading }}
            >
              Why Choose <br className="hidden lg:block" /> 
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${cosmeticColors.gradientStart}, ${cosmeticColors.gradientEnd})` }}>
                COSKINn?
              </span>
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-lg mx-auto lg:mx-0">
              Elevate your beauty ritual. Every product is meticulously crafted to deliver professional performance, luxurious textures, and skin-loving benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {trustPoints.map((point, index) => (
              <motion.div
                key={point.id}
                className="relative p-6 rounded-[2rem] bg-white border border-gray-100/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden group cursor-pointer"
                whileHover={{ y: -5, boxShadow: `0 20px 40px -10px ${cosmeticColors.secondary}40` }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Glass Shine Hover Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/80 to-white/0 opacity-0 group-hover:opacity-100 pointer-events-none z-10"
                  variants={{ hover: { x: ['-100%', '100%'] } }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
                
                <div className="flex items-start justify-between mb-3">
                  <h3 
                    className="text-xl font-bold text-gray-900 leading-tight"
                    style={{ fontFamily: fonts.cosmetics.heading }}
                  >
                    {point.title}
                  </h3>
                  <span 
                    className="text-2xl font-bold opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                    style={{ color: cosmeticColors.primary, fontFamily: fonts.cosmetics.heading }}
                  >
                    {point.stat}
                  </span>
                </div>
                <p className="text-gray-500 font-light text-sm">
                  {point.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Editorial Image Composition */}
        <motion.div 
          className="w-full lg:w-[55%] relative min-h-[500px] md:min-h-[600px] lg:min-h-[750px] flex items-center justify-center order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Main Image Mask */}
          <motion.div 
            className="relative w-full max-w-[450px] aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl z-10 border-[6px] border-white/70"
            style={{ y: yImage }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10 mix-blend-overlay pointer-events-none"></div>
            <img 
              src={mainImage} 
              alt="COSKINn Beauty Model" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Floating Product Layer */}
          <motion.div 
            className="absolute -bottom-10 -left-5 md:bottom-10 md:-left-10 lg:bottom-16 lg:-left-20 w-48 md:w-56 lg:w-72 z-20 pointer-events-none drop-shadow-[0_20px_40px_rgba(255,0,105,0.25)]"
            style={{ y: yFloat }}
          >
            <motion.img 
              src={floatingImage} 
              alt="COSKINn Luxury Lipstick" 
              className="w-full h-auto object-contain"
              animate={{ y: [-15, 15, -15], rotate: [-3, 3, -3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Abstract Aesthetic Ring */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] md:w-[100%] aspect-square rounded-full border border-gray-200/60 opacity-60 z-0 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          />

          {/* Glassmorphism Badge */}
          <motion.div 
            className="absolute top-5 right-0 md:top-10 md:-right-10 z-30 backdrop-blur-xl bg-white/60 border border-white/60 rounded-[2rem] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex items-center justify-center flex-col"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-3xl font-bold" style={{ color: cosmeticColors.primary, fontFamily: fonts.cosmetics.heading }}>#1</span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-800 mt-1">Premium</span>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
