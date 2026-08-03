import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const InteractiveExperience: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  return (
    <section className={`min-h-screen flex items-center justify-center relative overflow-hidden py-12 md:py-20 ${isGlam ? 'bg-[#faf9f6]' : 'bg-[#f0fbf5]'}`}>
      {!isGlam && (
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,0 L0,50 C 120,60 240,40 360,70 C 480,100 600,30 720,60 C 840,90 960,40 1080,80 C 1200,120 1320,50 1440,70 L1440,0 Z" fill="#ffffff" />
          </svg>
        </div>
      )}
      <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-10 relative z-20">
        {isGlam ? (
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Side - Left Column */}
            <div className="relative flex justify-center md:justify-end">
              <div className="w-full max-w-[480px]">
                {/* Outer Gold Frame */}
                <div className="border-[0.5px] border-[#d2b27b] p-3 md:p-4 relative bg-transparent">
                  {/* Corner Brackets */}
                  <div className="absolute top-[-4px] left-[-4px] w-5 h-5 border-t-[1px] border-l-[1px] border-[#d2b27b] z-30"></div>
                  <div className="absolute bottom-[-4px] right-[-4px] w-5 h-5 border-b-[1px] border-r-[1px] border-[#d2b27b] z-30"></div>
                  
                  <div className="aspect-square relative overflow-hidden bg-white">
                    <img 
                      src="https://images.unsplash.com/photo-1515562141207-7a8efbd347a4?auto=format&fit=crop&q=80" 
                      alt="The Enchanted Mirror" 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Side - Right Column */}
            <div className="flex flex-col items-start lg:pl-6 max-w-[500px]">
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-sans font-medium text-[#d2b27b] mb-4 md:mb-5 block">
                INTERACTIVE EXPERIENCE
              </span>
              
              <h2 className="text-4xl md:text-5xl lg:text-[3rem] whitespace-nowrap font-serif text-[#1a1a1a] leading-[1.1] mb-5 tracking-tight">
                The <span className="italic">Enchanted</span> Mirror
              </h2>
              
              <p className="text-[14px] md:text-[15px] leading-[1.6] text-[#5c5c5c] font-sans mb-8 max-w-[380px]">
                Try our lipsticks, palettes and blushes in real time through your camera. A private, whispering mirror of a room — no downloads required.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link to="/mirror" className="flex items-center justify-center px-8 py-[14px] md:py-[16px] text-[10px] md:text-[11px] font-bold tracking-[0.1em] font-serif uppercase transition-all duration-300 w-full sm:w-auto bg-[#7a1b26] text-white hover:bg-[#5a111a] border border-[#d2b27b] shadow-[0_4px_10px_rgba(0,0,0,0.1)] rounded-none">
                  Enter the mirror
                </Link>
                <Link to="/lookbook" className="flex items-center justify-center px-8 py-[14px] md:py-[16px] text-[10px] md:text-[11px] font-bold tracking-[0.1em] font-serif uppercase transition-all duration-300 w-full sm:w-auto bg-transparent border border-[#e5e5e5] text-[#5c5c5c] hover:bg-black/5 rounded-none">
                  Read the lookbook
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[32px] overflow-hidden bg-gradient-to-r from-[#ffe4e1] to-[#e0f5ea]"
          >
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff9aa8]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
  
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              
              {/* Image Side */}
              <div className="h-[300px] md:h-[450px] overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/8101534/pexels-photo-8101534.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Experience" 
                  className="w-full h-full object-cover rounded-t-[32px] md:rounded-tr-none md:rounded-l-[32px]"
                />
              </div>
  
              {/* Content Side */}
              <div className="p-8 md:p-12 lg:p-16">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 text-[#ff9aa8]">
                  <span className="font-display">Interactive</span>
                  <span className="text-gray-500">×</span>
                  <span className="flex items-center text-gray-500"><Clock size={14} className="mr-1" /> 60 seconds</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight font-display text-[#2a2a2a]">
                  Take the Skin Quiz
                </h2>
                
                <p className="text-base md:text-lg mb-8 max-w-md text-gray-600 font-sans">
                  Answer 6 quick questions and we'll build a routine matched to you.
                </p>
                
                <Link to="/quiz" className="group flex items-center justify-center px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 w-full sm:w-auto bg-white text-[#2a2a2a] hover:bg-gray-50 shadow-xl shadow-[#ff9aa8]/20">
                  <span>Take the Quiz</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
  
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default InteractiveExperience;
