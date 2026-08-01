import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  return (
    <div className={`min-h-[70vh] flex flex-col items-center justify-center px-6 transition-colors duration-500 ${isGlam ? 'bg-[#1a1a1a] text-[#e5b376]' : 'bg-white text-[#2a2022]'}`}>
      <div className="max-w-lg text-center flex flex-col items-center">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 ${isGlam ? 'bg-[#e5b376]/10' : 'bg-[#fff5f7]'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={isGlam ? 'text-[#e5b376]' : 'text-[#ff9aa8]'}>
            <circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>
          </svg>
        </div>
        <h1 className={`text-4xl md:text-5xl mb-4 ${isGlam ? 'font-serif' : 'font-display font-medium text-[#2a2a2a]'}`}>
          Coming Soon
        </h1>
        <p className={`text-[15px] md:text-lg mb-10 leading-relaxed ${isGlam ? 'opacity-80 font-serif' : 'text-[#7d7d7d]'}`}>
          {isGlam 
            ? 'We are carefully crafting this experience with peaches and pearls. It will be ready for you shortly.'
            : "We're still brewing this juicy page! Check back soon for something sweet."}
        </p>
        <Link 
          to="/" 
          className={`inline-flex items-center justify-center px-8 py-4 rounded-full font-bold transition-transform hover:scale-105 ${
            isGlam 
              ? 'bg-[#e5b376] text-[#1a1a1a] hover:bg-white' 
              : 'bg-[#ff9aa8] text-white hover:bg-[#ff8f9f] shadow-lg shadow-[#ff9aa8]/30'
          }`}
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
