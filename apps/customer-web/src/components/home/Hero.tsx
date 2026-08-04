import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight, Leaf, Shield, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { MagicStars } from '../ui/MagicStars';
import { useState, useEffect } from 'react';

const skinImages = [
  {
    jar: 'https://www.dotandkey.com/cdn/shop/files/mob_11bd4c0e-4801-48c4-aeb8-fb07f1d46aba.jpg',
    topRight: 'https://www.dotandkey.com/cdn/shop/files/MOIST_DESK_be5518ac-2e4e-4dc4-878f-a803c7677b21.jpg',
    bottomRight: 'https://www.dotandkey.com/cdn/shop/files/MOIST_MOB_copy_2_33302a0c-5902-454d-89fb-b56be26e4b13.jpg'
  },
  {
    jar: 'https://images.pexels.com/photos/2587370/pexels-photo-2587370.jpeg?auto=compress&cs=tinysrgb&w=800',
    topRight: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=800',
    bottomRight: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    jar: 'https://images.pexels.com/photos/4465828/pexels-photo-4465828.jpeg?auto=compress&cs=tinysrgb&w=800',
    topRight: 'https://images.pexels.com/photos/4465121/pexels-photo-4465121.jpeg?auto=compress&cs=tinysrgb&w=800',
    bottomRight: 'https://images.pexels.com/photos/4465830/pexels-photo-4465830.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

const glamSlides = [
  { image: 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/ec25942077e080c392d7cb4696caea57.jpg?v=1761982588', id: 201 },
  { image: 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/20260722-162356.jpg?v=1784708678', id: 207 },
  { image: 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/01_2db59608-095a-442a-afec-9c7aafeb7fab.jpg?v=1758249299', id: 202 }
];

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex(prev => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`relative w-full h-[calc(100vh-80px)] min-h-[600px] flex flex-col transition-colors duration-700 ${isGlam ? 'bg-[#faf9f6]' : 'bg-[#fcfaf9] overflow-hidden'}`}>
      
      {/* Background Glows for SKIN Mode */}
      {!isGlam && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
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

          {/* Gel/Slime Curvy Smear (Bottom Left to Top Right) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="gelGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffb3c6" />
                <stop offset="50%" stopColor="#ffdf80" />
                <stop offset="100%" stopColor="#ff9aa8" />
              </linearGradient>
              <filter id="slightBlur" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="8" />
              </filter>
            </defs>
            
            {/* Primary Gel Wave */}
            <motion.path 
              animate={{ 
                d: [
                  "M-50,850 C200,750 250,550 400,550 C550,550 600,350 750,350 C900,350 950,150 1100,150 C1250,150 1300,-50 1500,-50",
                  "M-50,850 C100,700 300,700 450,500 C600,300 800,450 950,250 C1100,50 1300,200 1450,0 C1550,-100 1500,-50 1500,-50",
                  "M-50,850 C200,750 250,550 400,550 C550,550 600,350 750,350 C900,350 950,150 1100,150 C1250,150 1300,-50 1500,-50"
                ],
                strokeWidth: [40, 65, 40],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              fill="none" 
              stroke="url(#gelGradient)" 
              strokeLinecap="round" 
              filter="url(#slightBlur)"
            />

            {/* Secondary Mint Wave */}
            <motion.path 
              animate={{ 
                d: [
                  "M0,850 C150,650 300,750 450,550 C600,350 750,450 900,250 C1050,50 1200,150 1350,-50 C1450,-150 1500,-50 1500,-50",
                  "M0,850 C250,850 300,550 450,550 C600,550 650,250 800,250 C950,250 1000,-50 1150,-50 C1300,-50 1400,-150 1500,-50",
                  "M0,850 C150,650 300,750 450,550 C600,350 750,450 900,250 C1050,50 1200,150 1350,-50 C1450,-150 1500,-50 1500,-50"
                ],
                strokeWidth: [20, 35, 20],
                opacity: [0.6, 0.9, 0.6]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              fill="none" 
              stroke="#a3e6d8" 
              strokeLinecap="round" 
              filter="url(#slightBlur)"
            />

            {/* Tertiary Solid Pink Wave */}
            <motion.path 
              animate={{ 
                d: [
                  "M-100,800 C100,800 250,600 400,600 C550,600 700,400 850,400 C1000,400 1150,200 1300,200 C1450,200 1500,0 1500,0",
                  "M-100,800 C50,650 200,750 350,550 C500,350 650,450 800,250 C950,50 1100,150 1250,-50 C1400,-250 1500,0 1500,0",
                  "M-100,800 C100,800 250,600 400,600 C550,600 700,400 850,400 C1000,400 1150,200 1300,200 C1450,200 1500,0 1500,0"
                ],
                strokeWidth: [12, 22, 12],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              fill="none" 
              stroke="#ff9aa8" 
              strokeLinecap="round" 
              filter="url(#slightBlur)"
            />

            {/* Quaternary Light Pink Wave */}
            <motion.path 
              animate={{ 
                d: [
                  "M-150,900 C50,850 150,650 300,650 C450,650 600,450 750,450 C900,450 1050,250 1200,250 C1350,250 1450,50 1550,50",
                  "M-150,900 C100,750 250,850 400,650 C550,450 700,550 850,350 C1000,150 1150,250 1300,50 C1450,-150 1550,50 1550,50",
                  "M-150,900 C50,850 150,650 300,650 C450,650 600,450 750,450 C900,450 1050,250 1200,250 C1350,250 1450,50 1550,50"
                ],
                strokeWidth: [8, 14, 8],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              fill="none" 
              stroke="#ffa3b1" 
              strokeLinecap="round" 
              filter="url(#slightBlur)"
            />

            {/* Quinary Pale Yellow Highlight Wave */}
            <motion.path 
              animate={{ 
                d: [
                  "M-80,880 C120,780 220,580 370,580 C520,580 620,380 770,380 C920,380 1020,180 1170,180 C1320,180 1420,-20 1520,-20",
                  "M-80,880 C180,880 280,680 430,680 C580,680 680,480 830,480 C980,480 1080,280 1230,280 C1380,280 1480,80 1520,-20",
                  "M-80,880 C120,780 220,580 370,580 C520,580 620,380 770,380 C920,380 1020,180 1170,180 C1320,180 1420,-20 1520,-20"
                ],
                strokeWidth: [4, 8, 4],
                opacity: [0.9, 1, 0.9]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              fill="none" 
              stroke="#ffefb3" 
              strokeLinecap="round" 
              filter="url(#slightBlur)"
            />
          </svg>

          <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[50%] bg-[#ffa3b1] opacity-[0.35] blur-[120px] rounded-full transform-gpu"></div>
          <div className="absolute bottom-[-10%] left-[35%] w-[35%] h-[50%] bg-[#ffefb3] opacity-[0.4] blur-[100px] rounded-full transform-gpu"></div>
          <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[60%] bg-[#a3e6d8] opacity-[0.3] blur-[120px] rounded-full transform-gpu"></div>
          
          {/* Extra Blurry Fruity Effects Behind Right Section */}
          <div className="absolute top-[30%] right-[5%] w-[30%] h-[40%] bg-[#ffb3c6] opacity-[0.45] blur-[120px] rounded-full mix-blend-multiply transform-gpu"></div>
          <div className="absolute top-[50%] right-[-5%] w-[35%] h-[45%] bg-[#ffde85] opacity-[0.4] blur-[140px] rounded-full mix-blend-multiply transform-gpu"></div>
          <div className="absolute top-[10%] right-[15%] w-[25%] h-[35%] bg-[#b5e48c] opacity-[0.35] blur-[110px] rounded-full mix-blend-multiply transform-gpu"></div>
        </div>
      )}
      
      {/* Decorative Separator for Glam Mode */}
      {isGlam && (
        <div className="absolute top-0 left-0 w-full flex items-center justify-center pt-4 md:pt-6 z-20">
          <div className="w-full max-w-[800px] flex items-center px-4 sm:px-6 lg:px-8">
            <div className="flex-1 h-[1px] bg-[#d2b27b] opacity-50"></div>
            <span 
              className="px-6 text-[12px] md:text-[14px] uppercase tracking-[0.25em] font-serif italic text-[#d2b27b] font-medium whitespace-nowrap"
              style={{ marginLeft: '0.25em' }}
            >
              MAISON FAIRENNE
            </span>
            <div className="flex-1 h-[1px] bg-[#d2b27b] opacity-50"></div>
            {/* The little dot on the right, seen in Image 2 */}
            <div className="w-[3px] h-[3px] rounded-full bg-[#d2b27b] ml-1 opacity-60 hidden md:block"></div>
          </div>
        </div>
      )}

      <div className={`relative z-10 w-full min-h-screen mx-auto flex flex-col md:flex-row items-center justify-between pt-16 md:pt-0 ${
        isGlam ? 'max-w-full pl-4 sm:pl-8 lg:pl-12 pr-0 pb-40 lg:pb-48 md:pb-0' : 'max-w-[1400px] px-4 sm:px-6 lg:px-12'
      }`}>
        
        {/* Left Side: Content */}
        <div className={`w-full ${isGlam ? 'md:w-[55%] pt-16 md:pt-32 lg:pt-40 pb-8 md:pb-0' : 'md:w-[60%] pb-16 md:pb-32'} h-full pr-0 md:pr-12 lg:pr-20 flex flex-col justify-center items-start text-left z-20`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={isGlam ? 'glam-content' : 'skin-content'}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-start w-full"
            >
              {!isGlam && (
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className="inline-flex items-center space-x-3 mb-8 px-6 lg:px-8 py-1.5 lg:py-2 rounded-full text-[10px] lg:text-[12px] font-bold tracking-[0.2em] uppercase shadow-[0_4px_15px_rgba(255,154,168,0.15)] bg-white text-[#ff9aa8] cursor-pointer"
                >
                  <span className="text-[14px] lg:text-[16px]">🍑</span>
                  <span>New season · Peach + Vitamin C</span>
                </motion.div>
              )}
              
              {isGlam ? (
                <h1 className="text-[3rem] lg:text-[4.5rem] xl:text-[5.5rem] leading-[0.9] tracking-tight mb-4 mt-2">
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
              
              <p className={`text-[13px] lg:text-[15px] xl:text-[16px] mb-8 max-w-[420px] xl:max-w-[480px] leading-[1.6] ${
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
                      <Link to="/onboarding" className="group flex items-center justify-center px-8 lg:px-10 py-3.5 lg:py-4 rounded-full text-[14px] lg:text-[15px] font-bold border border-[#e5e5e5] transition-all duration-300 w-full sm:w-auto text-[#2a2022] bg-white hover:bg-gray-50 shadow-sm">
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
        <div className={`w-full ${isGlam ? 'md:w-[50%] h-[480px] mt-44' : 'md:w-[40%] h-[90%]'} relative hidden md:block self-center`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={isGlam ? 'glam-images' : 'skin-images'}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute inset-0 w-full h-full"
            >
              {isGlam ? (
                <div className="relative w-full h-full flex items-center justify-center pt-8">
                  
                  {/* Tertiary Frame (Top Left) */}
                  <motion.div 
                    className="absolute top-[8%] left-[5%] w-[38%] h-[34%] border border-[#e5b376] p-1.5 bg-white z-10 shadow-lg cursor-pointer"
                    whileHover={{ scale: 1.02, zIndex: 40 }}
                    onClick={() => navigate(`/product/${glamSlides[(imgIndex + 2) % 3].id}`)}
                  >
                    <div className="absolute top-[-1px] left-[-1px] w-[10px] h-[10px] border-t-2 border-l-2 border-[#e5b376] z-30"></div>
                    <div className="w-full h-full relative overflow-hidden bg-[#faf9f6]">
                      <AnimatePresence mode="popLayout">
                        <motion.img 
                          key={glamSlides[(imgIndex + 2) % 3].image}
                          src={glamSlides[(imgIndex + 2) % 3].image}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.2 }}
                          alt="Glam Collection Detail" 
                          className="absolute inset-0 w-full h-full object-cover sepia-[0.2]" 
                        />
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* Main Frame (Center) */}
                  <motion.div 
                    className="absolute top-[15%] left-[22%] w-[52%] h-[60%] border border-[#e5b376] p-2 bg-white z-20 shadow-xl cursor-pointer"
                    whileHover={{ scale: 1.02, zIndex: 40 }}
                    onClick={() => navigate(`/product/${glamSlides[imgIndex].id}`)}
                  >
                    <div className="absolute top-[-1px] left-[-1px] w-[15px] h-[15px] border-t-2 border-l-2 border-[#e5b376] z-30"></div>
                    <div className="w-full h-full relative overflow-hidden bg-[#faf9f6]">
                      <AnimatePresence mode="popLayout">
                        <motion.img 
                          key={glamSlides[imgIndex].image}
                          src={glamSlides[imgIndex].image}
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.2 }}
                          alt="Glam Collection Main" 
                          className="absolute inset-0 w-full h-full object-cover" 
                        />
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* Secondary Frame (Bottom Right) */}
                  <motion.div 
                    className="absolute bottom-[5%] right-[5%] w-[42%] h-[32%] border border-[#e5b376] p-1.5 bg-white z-30 shadow-2xl cursor-pointer"
                    whileHover={{ scale: 1.02, zIndex: 40 }}
                    onClick={() => navigate(`/product/${glamSlides[(imgIndex + 1) % 3].id}`)}
                  >
                    <div className="absolute top-[-1px] left-[-1px] w-[10px] h-[10px] border-t-2 border-l-2 border-[#e5b376] z-30"></div>
                    <div className="w-full h-full relative overflow-hidden bg-[#faf9f6]">
                      <AnimatePresence mode="popLayout">
                        <motion.img 
                          key={glamSlides[(imgIndex + 1) % 3].image}
                          src={glamSlides[(imgIndex + 1) % 3].image}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.2 }}
                          alt="Glam Collection Accent" 
                          className="absolute inset-0 w-full h-full object-cover" 
                        />
                      </AnimatePresence>
                    </div>
                  </motion.div>

                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1200px' }}>
                  
                  {/* Middle Left Image (Jar) */}
                  <div 
                    className="absolute top-[15%] left-[0%] w-[45%] h-[45%] rounded-[32px] overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.18)] z-20 bg-white cursor-pointer hover:scale-[1.03] transition-transform duration-300"
                    onClick={() => navigate('/product/101')}
                  >
                    <img src="https://www.dotandkey.com/cdn/shop/files/Banner_Desktop_cdcfa928-5948-4a5c-a344-7992702ed0b9.jpg" alt="Slide 1" className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Top Right Image */}
                  <div 
                    className="absolute top-[0%] right-[0%] w-[45%] h-[48%] rounded-[32px] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.12)] z-10 bg-white cursor-pointer hover:scale-[1.03] transition-transform duration-300"
                    onClick={() => navigate('/product/102')}
                  >
                    <img src="https://www.dotandkey.com/cdn/shop/files/Desktop_Banner_2.jpg" alt="Slide 2" className="w-full h-full object-cover object-center" />
                  </div>

                  {/* Bottom Right Image */}
                  <div 
                    className="absolute bottom-[12%] right-[10%] w-[48%] h-[40%] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-30 bg-white cursor-pointer hover:scale-[1.03] transition-transform duration-300"
                    onClick={() => navigate('/product/108')}
                  >
                    <img src="https://www.dotandkey.com/cdn/shop/files/Desk_c1390568-a6ba-43d9-98d3-b87e0790dfc5.png" alt="Slide 3" className="w-full h-full object-cover object-center" />
                  </div>
                  
                  {/* Price Badge removed as requested */}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      


      {/* Soft Wavy Bottom Divider */}
      {!isGlam && (
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg className="relative block w-full h-[40px] md:h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,100 L0,50 C 120,80 240,80 360,50 C 480,20 600,20 720,50 C 840,80 960,80 1080,50 C 1200,20 1320,20 1440,50 L1440,100 Z" fill="#ffffff" />
          </svg>
        </div>
      )}

      <MagicStars isGlam={isGlam} />
    </section>
  );
};

export default Hero;
