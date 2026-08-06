import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { cosmeticColors, fonts } from '../../constants/theme';
import { ArrowUpRight } from 'lucide-react';
import aboutImg from '../../assets/images/about_editorial_1784312706240.webp';

export default function CosmeticsAbout() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  // Subtle scroll parallax for the image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yImage = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section className="py-16 md:py-20 bg-[#FCF8F9] overflow-hidden relative" ref={containerRef}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Awwwards Style Interlocking Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Side: Oversized Typography & Content */}
          <div className="w-full lg:w-1/2 flex flex-col z-20 relative">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h2 
                className="text-[3.5rem] md:text-[5rem] lg:text-[6rem] leading-[0.9] font-black text-gray-900 uppercase tracking-tighter mb-8"
                style={{ fontFamily: fonts.cosmetics.heading }}
              >
                The Art <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8A66]">
                  Of Glamour
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="bg-white/60 backdrop-blur-xl border border-white/80 p-8 rounded-[32px] shadow-[0_20px_40px_rgba(255,0,105,0.05)] max-w-lg relative group"
            >
              <div className="absolute top-0 left-8 w-12 h-1 bg-[#FF0069] rounded-b-md" />
              
              <p className="text-gray-800 text-lg md:text-xl font-medium leading-relaxed mb-4" style={{ fontFamily: fonts.cosmetics.body }}>
                COSKINn is more than just makeup—it's a celebration of beauty, confidence, and absolute self-expression.
              </p>
              
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8">
                Crafted with premium ingredients to bring out the best in you. We blend cutting-edge science with editorial artistry to deliver flawless, weightless formulas that elevate your natural glow.
              </p>

              <button className="flex items-center gap-4 group/btn">
                <span className="text-[#FF0069] font-bold tracking-[0.2em] uppercase text-xs transition-colors group-hover/btn:text-gray-900">
                  Discover Our Story
                </span>
                <div className="w-10 h-10 rounded-full border border-[#FF0069] flex items-center justify-center text-[#FF0069] transition-all duration-500 group-hover/btn:bg-[#FF0069] group-hover/btn:text-white group-hover/btn:rotate-45">
                  <ArrowUpRight size={18} />
                </div>
              </button>
            </motion.div>
          </div>

          {/* Right Side: Interactive Image Container */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative z-10">
            <motion.div 
              style={{ y: yImage }}
              className="relative w-full max-w-[500px] aspect-[4/5] rounded-[40px] overflow-hidden group shadow-2xl"
            >
              {/* Image with sleek hover scale */}
              <img 
                src={aboutImg} 
                alt="COSKINn Editorial" 
                className="w-full h-full object-cover scale-[1.02] transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
              />
              
              {/* Premium dark gradient overlay that reveals on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="absolute bottom-8 left-8 right-8 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 pointer-events-none">
                <h3 className="text-white text-2xl font-bold tracking-wide" style={{ fontFamily: fonts.cosmetics.heading }}>Precision & Luxury</h3>
                <p className="text-white/80 text-sm font-medium mt-1">Experience the difference.</p>
              </div>
            </motion.div>

            {/* Rotating Stamp (Awwwards staple interaction) */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-10 lg:-left-12 -right-4 lg:right-auto w-32 h-32 bg-white/90 backdrop-blur-md rounded-full shadow-[0_10px_30px_rgba(255,0,105,0.1)] border border-pink-50 flex items-center justify-center z-30"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full p-2 text-[#FF0069]">
                <path id="curve" d="M 50 50 m -35 0 a 35 35 0 1 1 70 0 a 35 35 0 1 1 -70 0" fill="transparent" />
                <text className="text-[11px] font-black tracking-widest uppercase">
                  <textPath href="#curve" startOffset="0%">
                    COSKINn • Premium Beauty • 
                  </textPath>
                </text>
              </svg>
              {/* Center Dot */}
              <div className="absolute inset-0 m-auto w-3 h-3 bg-[#FF0069] rounded-full" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
