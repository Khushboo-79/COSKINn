import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const Philosophy: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  return (
    <section className={`relative w-full overflow-hidden ${isGlam ? 'bg-white py-8 md:py-12 px-4 md:px-8' : 'pb-24 md:pb-32 pt-0 bg-[#f0fbf5]'}`}>
      {!isGlam && (
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,100 L0,50 C 120,40 240,60 360,30 C 480,0 600,70 720,40 C 840,10 960,60 1080,20 C 1200,-20 1320,50 1440,30 L1440,100 Z" fill="#ffffff" />
          </svg>
        </div>
      )}
      
      <div className={`mx-auto ${isGlam ? 'max-w-[1400px] bg-[#e8dcc7] flex flex-col items-center text-center py-12 md:py-16 lg:py-20 px-6 md:px-12 rounded-sm' : 'max-w-[1200px] px-6 lg:px-10'}`}>
        {isGlam ? (
          <div className="max-w-[850px] mx-auto w-full flex flex-col items-center">
            {/* Top Divider */}
            <div className="flex items-center gap-4 w-full justify-center mb-6">
              <div className="h-[1px] w-12 md:w-20 bg-[#d2b27b]/40"></div>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-sans font-medium text-[#cba76b]">OUR PHILOSOPHY</span>
              <div className="h-[1px] w-12 md:w-20 bg-[#d2b27b]/40"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-[3rem] font-serif text-[#1a1a1a] leading-[1.2] mb-6 tracking-tight max-w-[750px]">
              Every compact is a keepsake. Every shade is a small chapter of a story you're writing.
            </h2>
            
            <p className="text-[13px] md:text-[15px] text-[#5c5c5c] font-sans leading-relaxed max-w-[650px] mb-8 lg:mb-10">
              We source our pigments from small European mills, blend our formulas by hand in our Lisbon atelier, and case each product in embossed metal that we hope you'll pass on.
            </p>
            
            {/* Bottom Divider */}
            <div className="flex items-center gap-4 w-full justify-center">
              <div className="h-[1px] w-16 md:w-24 bg-[#d2b27b]/40"></div>
              <span className="text-[12px] md:text-[13px] font-serif italic text-[#cba76b]">Since MMXXIV</span>
              <div className="h-[1px] w-16 md:w-24 bg-[#d2b27b]/40"></div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 lg:gap-10 items-center">
            
            {/* Content Side */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-3 text-[#ff9aa8]">
                Our philosophy
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight text-[#2a2a2a] font-display">
                Skincare that tastes like summer.
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed font-sans">
                We built Fairenne on a simple idea: the fun of choosing your favorite fruit shouldn't stop at the grocery store. Every drop is packed with real fruit extracts and clinically proven actives.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-bold mb-1 text-[#2a2a2a] font-display">
                    100% Vegan
                  </h4>
                  <p className="text-xs md:text-sm text-gray-500">Never tested on animals, always kind.</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1 text-[#2a2a2a] font-display">
                    Clean formulas
                  </h4>
                  <p className="text-xs md:text-sm text-gray-500">No sulfates, parabens, or bad vibes.</p>
                </div>
              </div>
            </motion.div>
  
            {/* Image Side */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-video md:aspect-[16/10] rounded-[24px] overflow-hidden">
                <img 
                  src="https://www.dotandkey.com/cdn/shop/files/Banner_Desktop_cdcfa928-5948-4a5c-a344-7992702ed0b9.jpg"
                  alt="Philosophy" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative Element */}
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#ffe4e8] rounded-full -z-10 blur-2xl" />
            </motion.div>
  
          </div>
        )}
      </div>
    </section>
  );
};

export default Philosophy;
