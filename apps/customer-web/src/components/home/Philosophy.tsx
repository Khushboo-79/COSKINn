import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const Philosophy: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  return (
    <section className={`pb-24 md:pb-32 pt-0 relative overflow-visible ${isGlam ? 'bg-[#faf9f6]' : 'bg-[#f0fbf5]'}`}>
      {!isGlam && (
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,100 L0,50 C 120,40 240,60 360,30 C 480,0 600,70 720,40 C 840,10 960,60 1080,20 C 1200,-20 1320,50 1440,30 L1440,100 Z" fill="#ffffff" />
          </svg>
        </div>
      )}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10 items-center">
          
          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`max-w-xl ${isGlam ? 'order-last md:order-first' : ''}`}
          >
            <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}`}>
              Our philosophy
            </p>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight text-[#2a2a2a] ${isGlam ? 'font-serif' : 'font-display'}`}>
              {isGlam ? 'Artistry without compromise.' : 'Skincare that tastes like summer.'}
            </h2>
            <p className={`text-base md:text-lg text-gray-600 mb-6 leading-relaxed ${isGlam ? 'font-serif' : 'font-sans'}`}>
              {isGlam 
                ? 'We built COSKINn on a simple idea: true luxury should be effortless. We curate the finest pigments and most elegant textures so you can express your signature style without limits.' 
                : 'We built COSKINn on a simple idea: the fun of choosing your favorite fruit shouldn\'t stop at the grocery store. Every drop is packed with real fruit extracts and clinically proven actives.'}
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className={`text-lg font-bold mb-1 text-[#2a2a2a] ${isGlam ? 'font-serif' : 'font-display'}`}>
                  {isGlam ? 'Cruelty-Free' : '100% Vegan'}
                </h4>
                <p className="text-xs md:text-sm text-gray-500">Never tested on animals, always kind.</p>
              </div>
              <div>
                <h4 className={`text-lg font-bold mb-1 text-[#2a2a2a] ${isGlam ? 'font-serif' : 'font-display'}`}>
                  {isGlam ? 'High Impact' : 'Clean formulas'}
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
            <div className={`relative aspect-video md:aspect-[16/10] rounded-[24px] overflow-hidden ${isGlam ? 'border-4 border-white shadow-xl' : ''}`}>
              <img 
                src={
                  isGlam 
                    ? "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80"
                    : "https://images.pexels.com/photos/9306017/pexels-photo-9306017.jpeg?auto=compress&cs=tinysrgb&w=1200"
                }
                alt="Philosophy" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative Element */}
            {!isGlam && (
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#ffe4e8] rounded-full -z-10 blur-2xl" />
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Philosophy;
