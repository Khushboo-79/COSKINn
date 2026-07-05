import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cosmeticColors, fonts } from '../../constants/theme';

// Import Models
import modelLipstick from '../../assets/images/cosmetics_main_hero.png';
import modelEye from '../../assets/images/cat_mascara_model.png';
import modelBlush from '../../assets/images/cosmetics_why_choose_main.png';
import modelSignature from '../../assets/images/cosmetics_after_model.png';
import modelCollection from '../../assets/images/cat_lip_liner_model.png';

// Import Products
import imgLipstick from '../../assets/images/cosmetics_lipstick.png';
import imgMascara from '../../assets/images/cat_mascara.png';
import imgPalette from '../../assets/images/cat_eyeshadow_palette.png';
import imgBlush from '../../assets/images/cat_blush.png';
import imgBrushes from '../../assets/images/cat_makeup_brushes.png';
import imgBlur from '../../assets/images/cat_blur.png';

const slides = [
  {
    id: 1,
    title: "Luxury Lipstick",
    subtitle: "The Signature Velvet Collection",
    model: modelLipstick,
    products: [
      { img: imgLipstick, style: "w-40 top-1/4 right-[10%] rotate-12", delay: 0.2 },
      { img: imgLipstick, style: "w-24 bottom-1/4 right-[25%] -rotate-12 blur-[2px]", delay: 0.4 },
      { img: imgLipstick, style: "w-56 bottom-[-5%] left-[5%] rotate-[30deg]", delay: 0.6 }
    ],
    alignment: "left"
  },
  {
    id: 2,
    title: "Mesmerizing Eyes",
    subtitle: "High-Pigment Editorial Glamour",
    model: modelEye,
    products: [
      { img: imgMascara, style: "w-32 top-1/3 left-[15%] -rotate-[20deg]", delay: 0.2 },
      { img: imgPalette, style: "w-64 bottom-[10%] left-[20%] rotate-6", delay: 0.4 },
      { img: imgMascara, style: "w-20 bottom-1/3 right-[5%] rotate-45 blur-[3px]", delay: 0.5 }
    ],
    alignment: "right"
  },
  {
    id: 3,
    title: "Luminous Blush",
    subtitle: "Radiant, Flawless Complexion",
    model: modelBlush,
    products: [
      { img: imgBlush, style: "w-48 top-[15%] right-[15%] rotate-12", delay: 0.2 },
      { img: imgBrushes, style: "w-56 bottom-[15%] right-[25%] -rotate-[15deg]", delay: 0.4 },
      { img: imgBlur, style: "w-32 bottom-1/4 left-[10%] rotate-[-25deg] blur-[1px]", delay: 0.5 }
    ],
    alignment: "left"
  },
  {
    id: 4,
    title: "Signature Look",
    subtitle: "A Complete Masterpiece",
    model: modelSignature,
    products: [
      { img: imgLipstick, style: "w-28 top-[20%] left-[20%] rotate-12", delay: 0.2 },
      { img: imgBlush, style: "w-32 bottom-[30%] left-[10%] -rotate-12", delay: 0.3 },
      { img: imgMascara, style: "w-24 top-[40%] right-[15%] rotate-[25deg]", delay: 0.4 }
    ],
    alignment: "center"
  },
  {
    id: 5,
    title: "The Collection",
    subtitle: "Ultimate Modern Luxury",
    model: modelCollection,
    products: [
      { img: imgLipstick, style: "w-32 top-[10%] left-[15%] rotate-[-20deg]", delay: 0.1 },
      { img: imgPalette, style: "w-48 bottom-[15%] left-[25%] rotate-[15deg]", delay: 0.2 },
      { img: imgBlush, style: "w-40 top-[25%] right-[10%] rotate-[10deg]", delay: 0.3 },
      { img: imgBrushes, style: "w-44 bottom-[20%] right-[20%] rotate-[-10deg]", delay: 0.4 }
    ],
    alignment: "left"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500); // Slightly longer than 3s to allow 1.5s transitions to breathe and users to read
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full h-screen min-h-[800px] bg-white overflow-hidden select-none">
      
      {/* Preload images to avoid flashing */}
      <div className="hidden">
        {slides.map(s => <img key={s.id} src={s.model} alt="preload" />)}
      </div>

      {/* Background Slides Transitions (Overlapping Crossfade) */}
      <AnimatePresence>
        <motion.div
          key={slide.id}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1, zIndex: 10 }}
          exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95, zIndex: 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }} // Smooth overlap without wait
        >
          {/* Main Background Model - Seamlessly integrated */}
          <motion.img 
            src={slide.model} 
            alt={slide.title}
            className="w-full h-full object-cover object-[center_20%]"
            animate={{ scale: [1, 1.05] }} // Slow continuous zoom
            transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          />

          {/* Luxury Soft Frosted Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-white/10 z-10 pointer-events-none mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-10 pointer-events-none"></div>
          
          {/* Dynamic Theme Color Overlays for Bloom Effect */}
          <motion.div 
            className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full filter blur-[150px] opacity-40 z-10 pointer-events-none"
            style={{ backgroundColor: cosmeticColors.primary, mixBlendMode: 'screen' }}
            animate={{ x: [-50, 50, -50], y: [-50, 50, -50] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] rounded-full filter blur-[150px] opacity-30 z-10 pointer-events-none"
            style={{ backgroundColor: cosmeticColors.secondary, mixBlendMode: 'screen' }}
            animate={{ x: [50, -50, 50], y: [50, -50, 50] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Foreground Content */}
      <div className="relative z-30 container mx-auto px-6 md:px-12 lg:px-16 min-h-screen py-32 md:py-40 pointer-events-none grid items-center">
        
        <AnimatePresence>
          <motion.div 
            key={slide.id}
            className={`w-full max-w-4xl flex flex-col pointer-events-auto [grid-area:1/1] ${
              slide.alignment === 'right' ? 'justify-self-end items-end text-right' : 
              slide.alignment === 'center' ? 'justify-self-center items-center text-center' : 'justify-self-start items-start text-left'
            }`}
            initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", zIndex: 10 }}
            exit={{ opacity: 0, y: -30, filter: "blur(5px)", zIndex: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <motion.h4 
              className="text-white/80 font-bold tracking-[0.4em] uppercase mb-4 text-xs md:text-sm drop-shadow-md"
              style={{ fontFamily: fonts.cosmetics.body }}
            >
              {slide.subtitle}
            </motion.h4>
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 text-white leading-[0.9] drop-shadow-2xl"
              style={{ fontFamily: fonts.cosmetics.heading }}
            >
              {slide.title.split(' ').map((word, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(45deg, ${cosmeticColors.primary}, ${cosmeticColors.secondary})` }}>
                      {word}
                    </span>
                  ) : word}
                </span>
              ))}
            </motion.h1>

            <motion.div className="flex flex-col sm:flex-row items-center gap-5 mt-10 md:mt-14 w-full md:w-auto">
              
              {/* Primary Button */}
              <motion.button 
                whileHover={{ scale: 1.04, boxShadow: `0 25px 50px -12px ${cosmeticColors.primary}90` }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-10 md:px-12 py-5 md:py-6 rounded-full text-white tracking-widest transition-all shadow-[0_15px_35px_rgba(255,0,105,0.5)] border border-white/30 group overflow-hidden relative flex items-center justify-center gap-3 backdrop-blur-xl"
                style={{ background: `linear-gradient(135deg, ${cosmeticColors.primary} 0%, #ff4d94 100%)` }}
              >
                {/* Continuous Shimmer Animation inside Button */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent z-0 w-1/2"
                  animate={{ x: ['-200%', '300%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
                />
                
                <span className="relative z-10 font-bold uppercase text-sm md:text-base drop-shadow-md" style={{ fontFamily: fonts.cosmetics.heading }}>
                  Shop Collection
                </span>
                
                <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300 drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>

              {/* Secondary Button */}
              <motion.button 
                whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,1)', color: '#000', borderColor: 'rgba(255,255,255,1)' }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-10 md:px-12 py-5 md:py-6 rounded-full text-white tracking-widest transition-colors duration-500 border border-white/50 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.3)] group overflow-hidden relative flex items-center justify-center bg-black/10"
              >
                {/* Hover Glass Wipe */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-in-out z-0"></div>
                
                <span className="relative z-10 font-semibold uppercase text-sm md:text-base" style={{ fontFamily: fonts.cosmetics.heading }}>
                  Explore Cosmetics
                </span>
              </motion.button>
              
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Animated Products Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <AnimatePresence>
          {slides.map((s, index) => 
            currentSlide === index && s.products.map((prod, pIndex) => (
              <motion.img 
                key={`${s.id}-${pIndex}`}
                src={prod.img}
                className={`absolute object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.5)] ${prod.style}`}
                initial={{ opacity: 0, scale: 0.5, y: 100, rotate: -20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: [0, -15, 0], 
                  rotate: [0, 5, -5, 0] // Gentle natural floating
                }}
                exit={{ opacity: 0, scale: 1.2, y: -100, filter: "blur(10px)" }}
                transition={{ 
                  opacity: { duration: 1.2, delay: prod.delay },
                  scale: { duration: 1.5, delay: prod.delay, ease: [0.16, 1, 0.3, 1] },
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: prod.delay },
                  rotate: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: prod.delay },
                  exit: { duration: 1, ease: "easeIn" }
                }}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Ambient Floating Sparkles/Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white shadow-[0_0_15px_#ffffff]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ 
              opacity: [0, Math.random() * 0.8 + 0.2, 0], 
              scale: [0, Math.random() * 2 + 1, 0], 
              y: [0, Math.random() * -100 - 50] 
            }}
            transition={{ 
              duration: Math.random() * 5 + 4, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
          />
        ))}
      </div>

      {/* Slide Indicators / Navigation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex gap-4">
        {slides.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentSlide(i)}
            className="relative h-1.5 rounded-full overflow-hidden transition-all duration-500 bg-white/20 hover:bg-white/40"
            style={{ width: currentSlide === i ? '3rem' : '1.5rem' }}
          >
            {currentSlide === i && (
              <motion.div 
                className="absolute inset-0 bg-white"
                layoutId="activeIndicator"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
      
    </section>
  );
}
