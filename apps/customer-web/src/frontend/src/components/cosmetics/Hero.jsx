import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cosmeticColors, fonts } from '../../constants/theme';

// Import Models
import modelLipstick from '../../assets/images/cosmetics_main_hero.webp';
import modelEye from '../../assets/images/cat_mascara_model.webp';
import modelBlush from '../../assets/images/cosmetics_why_choose_main.webp';
import modelSignature from '../../assets/images/cosmetics_after_model.webp';
import modelCollection from '../../assets/images/cat_lip_liner_model.webp';

// Import Products
import imgLipstick from '../../assets/images/cosmetics_lipstick.webp';
import imgMascara from '../../assets/images/cat_mascara.webp';
import imgPalette from '../../assets/images/cat_eyeshadow_palette.webp';
import imgBlush from '../../assets/images/cat_blush.webp';
import imgBrushes from '../../assets/images/cat_makeup_brushes.webp';
import imgBlur from '../../assets/images/cat_blur.webp';

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

// Ultra-premium Apple-style easing
const cinematicEase = [0.22, 1, 0.36, 1];
const premiumSpring = { type: "spring", stiffness: 60, damping: 20, mass: 1 };
const transitionDuration = 1.8; // Slow luxury timing

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 seconds auto-change
    return () => clearInterval(timer);
  }, []);

  // Memoize particles to avoid re-renders and stabilize random values so they don't stutter on slide change
  const particles = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 6 + 6,
      scale: Math.random() * 1.5 + 0.5,
      yDest: Math.random() * -150 - 50,
      opacityMax: Math.random() * 0.6 + 0.2
    }));
  }, []);

  // Collect next slide images dynamically for preloading just-in-time
  const nextSlideIndex = (currentSlide + 1) % slides.length;
  const nextSlideImages = useMemo(() => {
    const nextSlide = slides[nextSlideIndex];
    return [nextSlide.model, ...nextSlide.products.map(p => p.img)];
  }, [nextSlideIndex]);

  const isSlideActiveOrTransitioning = (index) => {
    const nextIndex = (currentSlide + 1) % slides.length;
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    return index === currentSlide || index === nextIndex || index === prevIndex;
  };

  return (
    <section className="relative w-full h-screen min-h-[800px] bg-black overflow-hidden select-none" style={{ transform: "translate3d(0,0,0)", backfaceVisibility: "hidden" }}>
      
      {/* Dynamic Preloader - strictly preloads next slide assets only to optimize LCP */}
      <div className="absolute opacity-0 pointer-events-none w-[1px] h-[1px] overflow-hidden -z-10">
        {nextSlideImages.map((src, i) => <img key={i} src={src} alt="" decoding="async" />)}
      </div>

      {/* Dynamic Theme Color Overlays for Bloom Effect (Constant continuous motion without jumps) */}
      <div className="absolute inset-0 z-[12] pointer-events-none overflow-hidden" style={{ transform: "translate3d(0,0,0)" }}>
        <motion.div 
          className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full opacity-40"
          style={{ backgroundColor: cosmeticColors.primary, mixBlendMode: 'screen', filter: 'blur(150px)', willChange: "transform" }}
          whileInView={{ x: [-30, 30, -30], y: [-30, 30, -30] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] rounded-full opacity-30"
          style={{ backgroundColor: cosmeticColors.secondary, mixBlendMode: 'screen', filter: 'blur(150px)', willChange: "transform" }}
          whileInView={{ x: [30, -30, 30], y: [30, -30, 30] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Background Slides Transitions (Only mount active or transitioning slides) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ transform: "translate3d(0,0,0)", backfaceVisibility: "hidden" }}>
        {slides.map((slide, index) => {
          if (!isSlideActiveOrTransitioning(index)) return null;
          return (
            <motion.div
              key={slide.id}
              className="absolute inset-0 w-full h-full"
              initial={false}
              animate={{ 
                opacity: currentSlide === index ? 1 : 0, 
                scale: currentSlide === index ? 1 : 1.02,
                filter: currentSlide === index ? "blur(0px)" : "blur(4px)",
                zIndex: currentSlide === index ? 10 : 0
              }}
              transition={{ duration: transitionDuration, ease: cinematicEase }} // Smooth overlap
              style={{ willChange: "transform, opacity, filter" }}
            >
              {/* Main Background Model - Seamlessly integrated */}
              <motion.img 
                src={slide.model} 
                alt={slide.title}
                className="w-full h-full object-cover object-[center_20%]"
                whileInView={{ scale: [1, 1.05] }} // Slow continuous zoom
                transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                style={{ willChange: "transform" }}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
              />

              {/* Luxury Soft Frosted Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-white/10 z-10 pointer-events-none mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-10 pointer-events-none"></div>
            </motion.div>
          );
        })}
      </div>

      {/* Foreground Content */}
      <div className="relative z-30 container mx-auto px-6 md:px-12 lg:px-16 min-h-screen py-32 md:py-40 pointer-events-none grid items-center" style={{ transform: "translate3d(0,0,0)", backfaceVisibility: "hidden" }}>
        {slides.map((slide, index) => {
          if (!isSlideActiveOrTransitioning(index)) return null;
          return (
            <motion.div 
              key={slide.id}
              className={`w-full max-w-4xl flex flex-col [grid-area:1/1] ${
                slide.alignment === 'right' ? 'justify-self-end items-end text-right' : 
                slide.alignment === 'center' ? 'justify-self-center items-center text-center' : 'justify-self-start items-start text-left'
              }`}
              initial={false}
              animate={{ 
                opacity: currentSlide === index ? 1 : 0, 
                y: currentSlide === index ? 0 : 10, // Tiny 10px Y movement for ultra luxury feel
                filter: currentSlide === index ? "blur(0px)" : "blur(4px)",
                zIndex: currentSlide === index ? 10 : 0
              }}
              transition={{ duration: transitionDuration, ease: cinematicEase }}
              style={{ 
                willChange: "transform, opacity, filter", 
                pointerEvents: currentSlide === index ? "auto" : "none" 
              }}
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
                  whileHover={{ scale: 1.03, boxShadow: `0 20px 40px -10px ${cosmeticColors.primary}80` }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.4, ease: cinematicEase }}
                  className="w-full sm:w-auto px-10 md:px-12 py-5 md:py-6 rounded-full text-white tracking-widest shadow-[0_15px_35px_rgba(255,0,105,0.4)] border border-white/30 group overflow-hidden relative flex items-center justify-center gap-3 backdrop-blur-xl pointer-events-auto"
                  style={{ background: `linear-gradient(135deg, ${cosmeticColors.primary} 0%, #ff4d94 100%)` }}
                >
                  {/* Continuous Shimmer Animation inside Button */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent z-0 w-1/2"
                    whileInView={{ x: ['-200%', '300%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                    style={{ willChange: "transform" }}
                  />
                  
                  <span className="relative z-10 font-bold uppercase text-sm md:text-base drop-shadow-md" style={{ fontFamily: fonts.cosmetics.heading }}>
                    Shop Collection
                  </span>
                  
                  <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-500 ease-out drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>

                {/* Secondary Button */}
                <motion.button 
                  whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,1)', color: '#000', borderColor: 'rgba(255,255,255,1)' }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.4, ease: cinematicEase }}
                  className="w-full sm:w-auto px-10 md:px-12 py-5 md:py-6 rounded-full text-white tracking-widest border border-white/50 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.3)] group overflow-hidden relative flex items-center justify-center bg-black/10 transition-colors duration-500 pointer-events-auto"
                >
                  {/* Hover Glass Wipe */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-in-out z-0"></div>
                  
                  <span className="relative z-10 font-semibold uppercase text-sm md:text-base" style={{ fontFamily: fonts.cosmetics.heading }}>
                    Explore Cosmetics
                  </span>
                </motion.button>
                
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Animated Products Layer (All mounted, fading opacity) */}
      <div className="absolute inset-0 z-20 pointer-events-none" style={{ transform: "translate3d(0,0,0)", backfaceVisibility: "hidden" }}>
        {slides.map((slide, index) => {
          if (!isSlideActiveOrTransitioning(index)) return null;
          return slide.products.map((prod, pIndex) => (
            <motion.div
              key={`${slide.id}-${pIndex}`}
              className={`absolute ${prod.style}`}
              initial={false}
              animate={{ 
                opacity: currentSlide === index ? 1 : 0,
                scale: currentSlide === index ? 1 : 0.95, // Tiny scale reduction (1 -> 0.95)
                y: currentSlide === index ? 0 : 10,       // Tiny Y movement
                filter: currentSlide === index ? "blur(0px)" : "blur(4px)",
                zIndex: currentSlide === index ? 10 : 0
              }}
              transition={{ 
                duration: transitionDuration, 
                delay: currentSlide === index ? prod.delay : 0, // Delay only on enter
                ease: cinematicEase 
              }}
              style={{ willChange: "transform, opacity, filter" }}
            >
              <motion.img 
                src={prod.img}
                className="w-full h-full object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.5)]"
                whileInView={{ 
                  y: [0, -12, 0], 
                  rotate: [0, 3, -3, 0] 
                }}
                transition={{ 
                  y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{ willChange: "transform" }}
              />
            </motion.div>
          ))
        })}
      </div>

      {/* Ambient Floating Sparkles/Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ transform: "translate3d(0,0,0)", backfaceVisibility: "hidden" }}>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 rounded-full bg-white shadow-[0_0_15px_#ffffff]"
            style={{ left: p.left, top: p.top, willChange: "transform, opacity" }}
            whileInView={{ 
              opacity: [0, p.opacityMax, 0], 
              scale: [0, p.scale, 0], 
              y: [0, p.yDest] 
            }}
            transition={{ 
              duration: p.duration, 
              repeat: Infinity, 
              delay: p.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Slide Indicators / Navigation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex gap-4 pointer-events-auto">
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
                transition={premiumSpring}
              />
            )}
          </button>
        ))}
      </div>
      
    </section>
  );
}
