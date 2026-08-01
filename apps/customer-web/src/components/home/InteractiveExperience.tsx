import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const InteractiveExperience: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  return (
    <section className={`pt-24 md:pt-32 relative overflow-visible ${isGlam ? 'bg-[#faf9f6]' : 'bg-[#f0fbf5]'}`}>
      {!isGlam && (
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,0 L0,50 C 120,60 240,40 360,70 C 480,100 600,30 720,60 C 840,90 960,40 1080,80 C 1200,120 1320,50 1440,70 L1440,0 Z" fill="#ffffff" />
          </svg>
        </div>
      )}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`relative rounded-[32px] overflow-hidden ${
            isGlam 
              ? 'bg-[#2a2a2a] text-white' 
              : 'bg-gradient-to-r from-[#ffe4e1] to-[#e0f5ea]'
          }`}
        >
          {/* Background Decorative Elements */}
          {!isGlam && (
            <>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff9aa8]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </>
          )}

          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            
            {/* Image Side */}
            <div className={`h-[300px] md:h-[450px] overflow-hidden ${isGlam ? 'order-last md:order-first' : ''}`}>
              <img 
                src={
                  isGlam 
                    ? "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80"
                    : "https://images.pexels.com/photos/8101534/pexels-photo-8101534.jpeg?auto=compress&cs=tinysrgb&w=1200"
                }
                alt="Experience" 
                className="w-full h-full object-cover rounded-t-[32px] md:rounded-tr-none md:rounded-l-[32px]"
              />
            </div>

            {/* Content Side */}
            <div className="p-8 md:p-12 lg:p-16">
              <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 ${
                isGlam ? 'text-[#e5b376]' : 'text-[#ff9aa8]'
              }`}>
                {isGlam ? <Sparkles size={16} /> : <span className="font-display">Interactive</span>}
                <span className={!isGlam ? 'text-gray-500' : ''}>×</span>
                <span className={`flex items-center ${!isGlam ? 'text-gray-500' : ''}`}><Clock size={14} className="mr-1" /> 60 seconds</span>
              </div>
              
              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight ${
                isGlam ? 'font-serif text-white' : 'font-display text-[#2a2a2a]'
              }`}>
                {isGlam ? 'Find your signature style.' : 'Take the Skin Quiz'}
              </h2>
              
              <p className={`text-base md:text-lg mb-8 max-w-md ${
                isGlam ? 'text-gray-400 font-serif' : 'text-gray-600 font-sans'
              }`}>
                {isGlam 
                  ? 'Answer 6 quick questions and we\'ll curate a bespoke glam routine matched to your unique features.'
                  : 'Answer 6 quick questions and we\'ll build a routine matched to you.'}
              </p>
              
              <Link to="/quiz" className={`group flex items-center justify-center px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 w-full sm:w-auto ${
                isGlam 
                  ? 'bg-[#e5b376] text-[#2a2a2a] hover:bg-white' 
                  : 'bg-white text-[#2a2a2a] hover:bg-gray-50 shadow-xl shadow-[#ff9aa8]/20'
              }`}>
                <span>{isGlam ? 'Start the Consultation' : 'Take the Quiz'}</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveExperience;
