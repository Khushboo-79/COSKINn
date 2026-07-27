import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const Philosophy: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  return (
    <section className={`py-16 overflow-hidden ${isGlam ? 'bg-[#faf9f6]' : 'bg-white'}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          
          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`max-w-xl ${isGlam ? 'order-last md:order-first' : ''}`}
          >
            <p className={`text-sm font-bold uppercase tracking-widest mb-4 ${isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}`}>
              Our philosophy
            </p>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-[#2a2a2a] ${isGlam ? 'font-serif' : 'font-display'}`}>
              {isGlam ? 'Artistry without compromise.' : 'Skincare that tastes like summer.'}
            </h2>
            <p className={`text-lg text-gray-600 mb-8 leading-relaxed ${isGlam ? 'font-serif' : 'font-sans'}`}>
              {isGlam 
                ? 'We built COSKINn on a simple idea: true luxury should be effortless. We curate the finest pigments and most elegant textures so you can express your signature style without limits.' 
                : 'We built COSKINn on a simple idea: the fun of choosing your favorite fruit shouldn\'t stop at the grocery store. Every drop is packed with real fruit extracts and clinically proven actives.'}
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className={`text-xl font-bold mb-2 text-[#2a2a2a] ${isGlam ? 'font-serif' : 'font-display'}`}>
                  {isGlam ? 'Cruelty-Free' : '100% Vegan'}
                </h4>
                <p className="text-sm text-gray-500">Never tested on animals, always kind.</p>
              </div>
              <div>
                <h4 className={`text-xl font-bold mb-2 text-[#2a2a2a] ${isGlam ? 'font-serif' : 'font-display'}`}>
                  {isGlam ? 'High Impact' : 'Clean formulas'}
                </h4>
                <p className="text-sm text-gray-500">No sulfates, parabens, or bad vibes.</p>
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
            <div className={`relative aspect-square md:aspect-[4/3] rounded-[32px] overflow-hidden ${isGlam ? 'border-8 border-white shadow-2xl' : ''}`}>
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
