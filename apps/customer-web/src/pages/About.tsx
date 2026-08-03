import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

const About: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  const pageRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={pageRef} className={`min-h-screen transition-colors duration-500 ${isGlam ? 'bg-[#faf9f6]' : 'bg-[#fcfaf9]'}`}>
      
      {/* Hero Section */}
      <section className={`relative min-h-[100dvh] flex items-center pt-20 pb-20 ${isGlam ? 'bg-[#faf9f6]' : 'bg-[#ffe4eb]'}`}>
        {!isGlam && (
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 translate-y-[99%] pointer-events-none">
            <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
              <path d="M0,0 L0,50 C 120,60 240,40 360,70 C 480,100 600,30 720,60 C 840,90 960,40 1080,80 C 1200,120 1320,50 1440,70 L1440,0 Z" fill="#ffe4eb" />
            </svg>
          </div>
        )}
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`text-sm font-bold uppercase tracking-widest mb-6 ${isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}`}
            >
              Our Story
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`text-5xl md:text-7xl font-extrabold leading-[1.1] mb-8 text-[#2a2a2a] ${isGlam ? 'font-serif' : 'font-display'}`}
            >
              Uncomplicated skincare for complicated lives.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-2xl"
            >
              COSKINn was born out of a simple need: products that actually work without needing a 12-step routine.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Image / Values Section */}
      <section className="min-h-[100dvh] flex items-center py-20">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal scroll-reveal-left relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-xl">
              <img 
                src={isGlam ? 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/20260722-162356.jpg?v=1784708678' : 'https://www.dotandkey.com/cdn/shop/files/dfs.jpg'} 
                alt="COSKINn Lifestyle" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-12">
              <div className="scroll-reveal scroll-reveal-up">
                <h3 className={`text-3xl font-bold mb-4 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-gray-900'}`}>Clean Ingredients</h3>
                <p className="text-gray-600 font-medium text-lg leading-relaxed">
                  We formulate using only the highest quality, scientifically-backed ingredients. No parabens, no sulfates, just pure goodness that your skin will drink up.
                </p>
              </div>
              <div className="scroll-reveal scroll-reveal-up delay-200">
                <h3 className={`text-3xl font-bold mb-4 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-gray-900'}`}>Cruelty Free</h3>
                <p className="text-gray-600 font-medium text-lg leading-relaxed">
                  We love animals as much as we love glowing skin. Our entire product line is 100% vegan and leaping-bunny certified cruelty-free.
                </p>
              </div>
              <div className="scroll-reveal scroll-reveal-up delay-400">
                <h3 className={`text-3xl font-bold mb-4 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-gray-900'}`}>For Everyone</h3>
                <p className="text-gray-600 font-medium text-lg leading-relaxed">
                  Skincare shouldn't be exclusive. Whether you're a minimalist or a maximalist, our products are designed to fit seamlessly into any routine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`min-h-[100dvh] flex items-center py-20 relative ${isGlam ? 'bg-[#f4efe8]' : 'bg-[#ffe4eb]'}`}>
        {!isGlam && (
          <>
            {/* Top Brushed Edge */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0 -translate-y-[99%] pointer-events-none">
              <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
                <path d="M0,100 L0,50 C 120,40 240,60 360,30 C 480,0 600,70 720,40 C 840,10 960,60 1080,20 C 1200,-20 1320,50 1440,30 L1440,100 Z" fill="#ffe4eb" />
              </svg>
            </div>
            {/* Bottom Brushed Edge */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 translate-y-[99%] pointer-events-none">
              <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
                <path d="M0,0 L0,50 C 120,60 240,40 360,70 C 480,100 600,30 720,60 C 840,90 960,40 1080,80 C 1200,120 1320,50 1440,70 L1440,0 Z" fill="#ffe4eb" />
              </svg>
            </div>
          </>
        )}
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16 scroll-reveal scroll-reveal-up">
            <h2 className={`text-4xl md:text-5xl font-extrabold mb-6 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-gray-900'}`}>
              Meet the Founders
            </h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">
              Two best friends who were tired of spending hundreds of dollars on products that promised the world and delivered nothing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="text-center scroll-reveal scroll-reveal-up delay-200">
              <div className="aspect-square rounded-full overflow-hidden mb-6 mx-auto w-48 md:w-64 shadow-lg">
                <img src="https://www.dotandkey.com/cdn/shop/files/Desktop_Banner_2.jpg" alt="Jane Doe" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-1">Sarah Jenkins</h4>
              <p className={`text-sm font-bold uppercase tracking-widest ${isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}`}>Co-Founder & CEO</p>
            </div>
            <div className="text-center scroll-reveal scroll-reveal-up delay-400">
              <div className="aspect-square rounded-full overflow-hidden mb-6 mx-auto w-48 md:w-64 shadow-lg">
                <img src="https://www.dotandkey.com/cdn/shop/files/Artboard_2_11.jpg" alt="John Smith" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-1">Emily Chen</h4>
              <p className={`text-sm font-bold uppercase tracking-widest ${isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}`}>Co-Founder & CPO</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
