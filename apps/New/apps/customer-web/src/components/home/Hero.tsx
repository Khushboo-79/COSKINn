import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight, Leaf, Shield, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  return (
    <section className={`relative overflow-hidden w-full flex flex-col transition-colors duration-700 ${
      isGlam ? 'bg-[#faf9f6]' : 'bg-[#fcfaf9]'
    }`}>
      
      {/* Background Glows for SKIN Mode */}
      {!isGlam && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Extra Blurry Fruity Effects Behind Right Section */}
          <div className="absolute top-[0] left-[0] w-full h-full overflow-hidden z-0 pointer-events-none">
            <div 
              className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[60%] bg-[#ff9aa8] blur-[140px] rounded-full opacity-40 mix-blend-multiply transform-gpu" 
              style={{ animation: 'float 15s ease-in-out infinite' }}
            ></div>
            <div 
              className="absolute bottom-[10%] left-[10%] w-[40%] h-[50%] bg-[#ffefb3] blur-[120px] rounded-full opacity-30 mix-blend-multiply transform-gpu" 
              style={{ animation: 'float 12s ease-in-out infinite reverse' }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Decorative Separator for Glam Mode */}
      {isGlam && (
        <div className="absolute top-0 left-0 w-full flex items-center justify-center pt-8 z-20">
          <div className="w-full max-w-[1150px] flex items-center px-4 sm:px-6 lg:px-8">
            <div className="flex-1 h-[1px] bg-[#d2b27b] opacity-50"></div>
            <span 
              className="px-6 text-[12px] md:text-[14px] uppercase tracking-[0.25em] font-serif italic text-[#d2b27b] font-medium whitespace-nowrap"
              style={{ marginLeft: '0.25em' }}
            >
              MAISON COSKINN
            </span>
            <div className="flex-1 h-[1px] bg-[#d2b27b] opacity-50"></div>
            {/* The little dot on the right, seen in Image 2 */}
            <div className="w-[3px] h-[3px] rounded-full bg-[#d2b27b] ml-1 opacity-60 hidden md:block"></div>
          </div>
        </div>
      )}

      <div className={`relative z-10 w-full h-full ${isGlam ? 'max-w-[1150px]' : 'max-w-[1400px]'} mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between pt-16 md:pt-0`}>
        
        {/* Left Side: Content */}
        <div className={`w-full ${isGlam ? 'md:w-[50%]' : 'md:w-[60%]'} h-full pr-0 md:pr-12 flex flex-col justify-center items-start text-left z-20 pb-16 md:pb-24`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={isGlam ? 'glam-content' : 'skin-content'}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-start w-full"
            >
              {!isGlam && (
                <div className="inline-flex items-center space-x-3 mb-8 px-6 lg:px-8 py-1.5 lg:py-2 rounded-full text-[10px] lg:text-[12px] font-bold tracking-[0.2em] uppercase shadow-[0_4px_15px_rgba(255,154,168,0.15)] bg-white text-[#ff9aa8]">
                  <span className="text-[14px] lg:text-[16px]">🍑</span>
                  <span>New season · Peach + Vitamin C</span>
                </div>
              )}
              
              {isGlam ? (
                <h1 className="text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] leading-[0.9] tracking-tight mb-4 mt-2">
                  <span className="block font-serif text-[#2a2a2a]">Painted</span>
                  <span className="block font-serif italic text-[#8b1527]">like a</span>
                  <span className="block font-serif text-[#2a2a2a]">Fairytale.</span>
                </h1>
              ) : (
                <h1 className="text-[3rem] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5rem] leading-[0.95] tracking-tight mb-6 mt-4 font-display font-black text-[#2a2022]">
                  Juicy skin,<br/>
                  <span className="text-[#ff9aa8]">ripe for</span> the picking.
                </h1>
              )}
              
              <p className={`text-[14px] lg:text-[16px] mb-8 max-w-[420px] xl:max-w-[480px] leading-[1.6] ${
                isGlam ? 'text-[#8e95a1] font-sans' : 'text-[#6b6b6b] font-sans'
              }`}>
                {isGlam 
                  ? 'A house of ornate, hand-crafted cosmetics inspired by rococo portraits, antique jewellery boxes, and the quiet drama of candlelight.' 
                  : 'Fruit-forward serums, gels and masks that leave your skin dewy, bouncy and slightly obsessed with itself. Squeezed fresh, formulated cleaner.'}
              </p>
              
              <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 w-full sm:w-auto">
                {isGlam ? (
                  <>
                    <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link to="/collections" className="group flex items-center justify-center px-8 lg:px-10 py-3.5 lg:py-4 text-[11px] lg:text-[12px] font-bold tracking-[0.15em] font-serif uppercase transition-all duration-300 w-full sm:w-auto bg-[#7a1b26] text-white border border-[#d2b27b] hover:bg-[#5a111a] shadow-[3px_3px_0px_rgba(210,178,123,0.3)]">
                        <span>Enter the atelier</span>
                      </Link>
                    </motion.div>
                    <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link to="/onboarding" className="group flex items-center justify-center px-8 lg:px-10 py-3.5 lg:py-4 text-[11px] lg:text-[12px] font-bold tracking-[0.15em] font-serif uppercase border border-[#e5e5e5] transition-all duration-300 w-full sm:w-auto text-[#3a4454] bg-transparent hover:bg-black/5">
                        <span>View the lookbook</span>
                      </Link>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
                      <Link to="/collections" className="group flex items-center justify-center px-8 lg:px-10 py-3.5 lg:py-4 rounded-full text-[14px] lg:text-[15px] font-bold transition-all duration-300 w-full sm:w-auto bg-[#ff9aa8] text-white hover:bg-[#ff8f9f] shadow-md shadow-[#ff9aa8]/20">
                        <span>Shop the fresh drop</span>
                        <span className="ml-2 text-[16px] lg:text-[18px] font-light leading-none group-hover:translate-x-1 transition-transform">→</span>
                      </Link>
                    </motion.div>
                    <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
                      <Link to="/onboarding" className="group flex items-center justify-center px-8 lg:px-10 py-3.5 lg:py-4 rounded-full text-[14px] lg:text-[15px] font-bold border border-[#e5e5e5] transition-all duration-300 w-full sm:w-auto text-[#2a2022] hover:bg-gray-50 shadow-sm">
                        <span>Take the skin quiz</span>
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>

              {isGlam && (
                <div className="flex items-center justify-between w-full max-w-[400px] mt-12 mb-4">
                  <div className="flex flex-col items-center">
                    <span className="font-serif text-[#7a1b26] text-[20px] lg:text-[24px]">12k+</span>
                    <span className="font-sans text-[#8e95a1] uppercase text-[10px] tracking-[0.2em] mt-1">REVIEWS</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-serif text-[#7a1b26] text-[20px] lg:text-[24px]">Hand</span>
                    <span className="font-sans text-[#8e95a1] uppercase text-[10px] tracking-[0.2em] mt-1">POURED</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-serif text-[#7a1b26] text-[20px] lg:text-[24px]">Since</span>
                    <div className="flex items-center relative">
                      <span className="font-sans text-[#8e95a1] uppercase text-[10px] tracking-[0.2em] mt-1">MMXXIV</span>
                      <div className="absolute -right-3 bottom-[2px] w-[3px] h-[3px] rounded-full bg-[#e5b376]"></div>
                    </div>
                  </div>
                </div>
              )}

              {!isGlam && (
                <div className="flex items-center gap-6 mt-8 opacity-70">
                  <div className="flex items-center gap-2 text-[10px] lg:text-[11px] text-[#2a2022] font-medium">
                    <Leaf size={14} strokeWidth={1.5} />
                    <span>Clean · Vegan</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] lg:text-[11px] text-[#2a2022] font-medium">
                    <Shield size={14} strokeWidth={1.5} />
                    <span>Derm-tested</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] lg:text-[11px] text-[#2a2022] font-medium">
                    <Award size={14} strokeWidth={1.5} />
                    <span>Cruelty-free</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Image Composition */}
        <div className={`w-full ${isGlam ? 'md:w-[50%]' : 'md:w-[40%]'} h-[90%] relative hidden md:block self-center`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={isGlam ? 'glam-images' : 'skin-images'}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute inset-0 w-full h-full"
            >
              {isGlam ? (
                <div className="relative w-full h-full border border-[#e5b376] p-2 flex mx-auto mt-4">
                  {/* Top Left Corner Bracket */}
                  <div className="absolute top-[-1px] left-[-1px] w-[15px] h-[15px] border-t-2 border-l-2 border-[#e5b376] z-30"></div>
                  <div className="w-full h-full relative overflow-hidden bg-white shadow-xl flex items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80" alt="Glam Collection" className="w-full h-full object-cover" />
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  {/* Middle Left Image (Jar) */}
                  <div className="absolute top-[25%] left-[0%] w-[45%] h-[50%] rounded-[32px] overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.18)] z-20 bg-white">
                    <img src="https://images.pexels.com/photos/8101534/pexels-photo-8101534.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Jar" className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Top Right Image */}
                  <div className="absolute top-[0%] right-[0%] w-[45%] h-[55%] rounded-[32px] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.12)] z-10 bg-white">
                    <img src="https://images.pexels.com/photos/27393236/pexels-photo-27393236.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Dropper" className="w-full h-full object-cover object-center" />
                  </div>

                  {/* Bottom Right Image */}
                  <div className="absolute bottom-[0%] right-[10%] w-[48%] h-[45%] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-30 bg-white">
                    <img src="https://images.pexels.com/photos/9306017/pexels-photo-9306017.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Dropper 2" className="w-full h-full object-cover object-center" />
                  </div>
                  
                  {/* Price Badge */}
                  <div className="absolute bottom-[5%] left-[50%] w-[90px] h-[90px] lg:w-[120px] lg:h-[120px] rounded-full bg-[#ff9aa8] text-white flex flex-col items-center justify-center shadow-[0_15px_30px_rgba(255,154,168,0.4)] z-40 transform -translate-x-1/2">
                    <span className="text-[10px] lg:text-[11px] font-extrabold uppercase tracking-widest leading-none mb-1">From</span>
                    <span className="text-[22px] lg:text-[28px] font-black leading-none tracking-tight">$26</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Hero;
