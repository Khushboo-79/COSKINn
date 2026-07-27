import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  return (
    <section className={`relative overflow-hidden w-full min-h-[750px] flex flex-col transition-colors duration-700 ${
      isGlam ? 'bg-[#faf9f6]' : 'bg-gradient-to-r from-[#ffe4e8] via-white to-[#e6f7f4]'
    }`}>
      
      {/* Decorative Separator for Glam Mode */}
      {isGlam && (
        <div className="w-full flex items-center justify-center pt-8">
          <div className="flex items-center w-full max-w-lg px-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#e5b376]/50"></div>
            <span className="px-6 text-[10px] uppercase tracking-[0.3em] font-serif text-[#cfa473] whitespace-nowrap">
              Maison COSKINn
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#e5b376]/50"></div>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between flex-1">
        
        {/* Left Side: Content */}
        <div className="w-full md:w-1/2 pr-0 md:pr-12 flex flex-col items-start text-left z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={isGlam ? 'glam-content' : 'skin-content'}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-start w-full"
            >
              {!isGlam && (
                <div className="inline-flex items-center space-x-2 mb-6 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase shadow-sm bg-white text-[#ff9aa8]">
                  <span>🍑</span>
                  <span>New season · Peach + Vitamin C</span>
                </div>
              )}
              
              {isGlam ? (
                <h1 className="text-[4rem] md:text-[5.5rem] leading-[1.1] tracking-tight mb-8">
                  <span className="block font-serif text-[#2a2a2a]">Painted</span>
                  <span className="block font-serif italic text-[#7a1b26]">like a</span>
                  <span className="block font-serif text-[#2a2a2a]">Fairytale.</span>
                </h1>
              ) : (
                <h1 className="text-[3.5rem] md:text-[5rem] leading-[1.05] tracking-tight mb-6 font-extrabold text-[#2a2a2a]">
                  Juicy skin, <br/>
                  <span className="text-[#ff9aa8]">ripe for</span> the picking.
                </h1>
              )}
              
              <p className={`text-lg mb-10 max-w-lg ${
                isGlam ? 'text-gray-600 font-serif' : 'text-gray-500 font-sans'
              }`}>
                {isGlam 
                  ? 'A house of ornate, hand-crafted cosmetics inspired by rococo portraits, antique jewellery boxes, and the quiet drama of candlelight.' 
                  : 'Fruit-forward serums, gels and masks that leave your skin dewy, bouncy and slightly obsessed with itself. Squeezed fresh, formulated cleaner.'}
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <button className={`group flex items-center justify-center px-8 py-4 rounded-full text-sm font-bold transition-all duration-300 ${
                  isGlam 
                    ? 'bg-[#e5b376] text-[#2a2a2a] hover:bg-[#cfa473]' 
                    : 'bg-[#ff9aa8] text-white hover:bg-[#ff8091] shadow-lg shadow-[#ff9aa8]/30'
                }`}>
                  <span>{isGlam ? 'Enter the atelier' : 'Shop the fresh drop'}</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className={`group flex items-center justify-center px-8 py-4 rounded-full text-sm font-bold border transition-all duration-300 ${
                  isGlam 
                    ? 'border-[#2a2a2a] text-[#2a2a2a] hover:bg-black/5' 
                    : 'border-[#ff9aa8]/50 text-[#ff9aa8] bg-white/50 hover:bg-white'
                }`}>
                  <span>{isGlam ? 'View the lookbook' : 'Take the skin quiz'}</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Image Composition */}
        <div className="w-full md:w-1/2 h-[600px] relative mt-12 md:mt-0 hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={isGlam ? 'glam-images' : 'skin-images'}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
              {isGlam ? (
                // GLAM IMAGE: Single large framed portrait
                <div className="relative w-[85%] h-[90%] border border-[#e5b376] p-2 flex">
                  <div className="w-full h-full relative overflow-hidden bg-white shadow-xl flex items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80" alt="Glam Collection" className="w-full h-full object-cover" />
                  </div>
                </div>
              ) : (
                // SKIN IMAGES (matching screenshot 3-image layout)
                <>
                  <div className="absolute top-[5%] right-[0%] w-[45%] h-[55%] rounded-[2rem] overflow-hidden shadow-xl z-10 border-4 border-white/50">
                    <img src="https://images.pexels.com/photos/27393236/pexels-photo-27393236.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Skin 1" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-[45%] left-[5%] w-[45%] h-[40%] rounded-[2rem] overflow-hidden shadow-2xl z-20 border-4 border-white">
                    <img src="https://images.pexels.com/photos/8101534/pexels-photo-8101534.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Skin 2" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] rounded-[2rem] overflow-hidden shadow-lg z-30 border-4 border-white/80">
                    <img src="https://images.pexels.com/photos/9306017/pexels-photo-9306017.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Skin 3" className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Decorative circles */}
                  <div className="absolute bottom-[5%] left-[0%] w-32 h-32 rounded-full bg-[#ff9aa8]/30 blur-2xl z-0"></div>
                  <div className="absolute top-[20%] left-[30%] w-48 h-48 rounded-full bg-[#99e6d8]/40 blur-3xl z-0"></div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Hero;
