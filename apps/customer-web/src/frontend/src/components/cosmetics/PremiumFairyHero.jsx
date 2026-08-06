import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Sparkles, ArrowRight } from 'lucide-react';
import { fonts } from '../../constants/theme';
import cinematicHero from '../../assets/images/cosmetics_hero_cinematic.png';

export default function PremiumFairyHero() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Parallax mouse effect
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 20; // max 20px movement
      const yPos = (clientY / innerHeight - 0.5) * 20;
      
      gsap.to('.hero-bg-image', {
        x: xPos,
        y: yPos,
        duration: 1.5,
        ease: 'power2.out'
      });
      
      gsap.to('.floating-particles', {
        x: -xPos * 1.5,
        y: -yPos * 1.5,
        duration: 2,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100vh] min-h-[700px] overflow-hidden bg-[#FFEAEF] flex items-center cursor-pointer"
      onClick={handleScrollDown}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 hero-bg-image">
        <img 
          src={cinematicHero} 
          alt="Premium Fairy Cosmetics"
          className="w-full h-full object-cover object-right"
        />
        {/* Soft gradient overlay on the left for seamless blending and text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFEAEF] via-[#FFEAEF]/40 to-transparent w-[80%] md:w-[60%]" />
      </div>

      {/* Floating Particles Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none floating-particles">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white blur-[1px]"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.2
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              x: [0, Math.random() * 50 - 25],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Text Content */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 lg:px-12 flex justify-start items-center h-full">
        <div className="max-w-3xl text-left pt-32 lg:pt-40">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 mb-4"
          >
            <Sparkles className="w-4 h-4 text-[#C17A8A]" />
            <span className="text-[#C17A8A] text-xs font-bold tracking-[0.3em] uppercase">
              Flower Knows
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-5xl md:text-6xl lg:text-[4.5rem] font-black text-[#75263F] leading-[1.1] tracking-tight mb-4 whitespace-nowrap"
            style={{ fontFamily: fonts.cosmetics.heading }}
          >
            FAIRY BEAUTY, <br/>
            <span className="text-[#D38B9D] font-normal italic inline-block mt-1">
              MADE FOR YOU
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[#965A6E] text-lg md:text-xl font-medium max-w-lg mb-8 leading-relaxed"
          >
            Enchanting cosmetics for every fairy in you. Step into a dreamy world of romantic shades.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <button className="group relative overflow-hidden rounded-full bg-[#8E3B54] text-white px-8 py-4 text-sm font-bold tracking-[0.2em] transition-all hover:bg-[#75263F] hover:shadow-[0_0_20px_rgba(117,38,63,0.4)] flex items-center gap-3">
              <span className="relative z-10">EXPLORE COLLECTION</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
