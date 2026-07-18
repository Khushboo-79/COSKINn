import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cosmeticColors, fonts } from '../../constants/theme';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import imgSkincarePromo from '../../assets/images/routine_prep_1784312636157.png';
import imgMakeupPromo from '../../assets/images/cosmetics_hero_cluster.png';

export default function PromotionalBanners() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const navigate = useNavigate();

  return (
    <section className="py-12 bg-white" ref={containerRef}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          
          {/* Banner 1: Special Offer */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 bg-[#FFF0F4] rounded-[24px] md:rounded-[30px] h-auto min-h-[220px] md:h-[280px] flex flex-col-reverse md:flex-row overflow-hidden shadow-[0_10px_30px_rgba(255,0,105,0.05)] border border-pink-50 relative group"
          >
            {/* Left Content */}
            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center z-10">
              <span className="text-[#FF0069] text-xs font-bold tracking-[0.2em] uppercase mb-3 drop-shadow-sm">
                SPECIAL OFFER
              </span>
              <h3 
                className="text-2xl md:text-3xl text-gray-900 font-medium leading-tight mb-6"
                style={{ fontFamily: fonts.cosmetics.heading }}
              >
                Up To 30% Off <br />
                On Skincare Products
              </h3>
              <div>
                <button 
                  onClick={() => navigate('/shop/skincare')}
                  className="px-6 py-2.5 bg-[#FF0069] text-white text-xs font-bold tracking-widest uppercase rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  SHOP NOW
                </button>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="w-full md:w-1/2 h-[180px] md:h-full relative flex items-center justify-center p-4">
              <motion.img 
                src={imgSkincarePromo} 
                alt="COSKINn Skincare Offer" 
                className="w-full h-full object-contain object-right md:object-center group-hover:-translate-y-1 group-hover:scale-[1.02] transition-transform duration-700 ease-out z-10"
              />
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full z-0 pointer-events-none transform scale-150" />
            </div>
          </motion.div>

          {/* Banner 2: New Arrivals */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex-1 bg-[#FFF5ED] rounded-[24px] md:rounded-[30px] h-auto min-h-[220px] md:h-[280px] flex flex-col-reverse md:flex-row overflow-hidden shadow-[0_10px_30px_rgba(255,180,100,0.05)] border border-orange-50 relative group"
          >
            {/* Left Content */}
            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center z-10">
              <span className="text-[#FF8A66] text-xs font-bold tracking-[0.2em] uppercase mb-3 drop-shadow-sm">
                NEW ARRIVALS
              </span>
              <h3 
                className="text-2xl md:text-3xl text-gray-900 font-medium leading-tight mb-6"
                style={{ fontFamily: fonts.cosmetics.heading }}
              >
                Fresh & Trendy <br />
                Makeup Collection
              </h3>
              <div>
                <button 
                  onClick={() => navigate('/shop/makeup')}
                  className="px-6 py-2.5 bg-[#FF0069] text-white text-xs font-bold tracking-widest uppercase rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  DISCOVER NOW
                </button>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="w-full md:w-1/2 h-[180px] md:h-full relative flex items-center justify-center p-4">
              <motion.img 
                src={imgMakeupPromo} 
                alt="COSKINn New Makeup Arrivals" 
                className="w-full h-full object-contain object-right md:object-center group-hover:-translate-y-1 group-hover:scale-[1.02] transition-transform duration-700 ease-out z-10"
              />
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-white/30 blur-2xl rounded-full z-0 pointer-events-none transform scale-150" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
