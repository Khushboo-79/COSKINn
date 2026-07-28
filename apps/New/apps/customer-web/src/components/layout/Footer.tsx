import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Footer: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  return (
    <footer className={`pt-20 pb-10 border-t transition-colors duration-500 ${isGlam ? 'bg-gradient-to-br from-[#2a2a2a] to-[#4a1218] text-[#e5b376] border-white/10' : 'bg-gradient-to-br from-[#fff0f3] to-[#e0f5ea] text-[#2a2022] border-[#2a2022]/10'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className={`text-2xl mb-4 ${isGlam ? 'font-serif' : 'font-display font-bold'}`}>
              {isGlam ? 'Correspondence from the Atelier' : 'Get on the juicy list'}
            </h3>
            <p className={`mb-6 max-w-sm ${isGlam ? 'opacity-80 font-serif' : 'text-text-muted'}`}>
              {isGlam 
                ? 'A house of ornate, hand-crafted cosmetics. Made slowly, worn poetically.' 
                : 'Juicy, hydrating, mood-lifting skincare — squeezed from real fruit science.'}
            </p>
            <div className="flex w-full max-w-md">
              <input 
                type="email" 
                placeholder={isGlam ? 'Enter your monogram (email)' : 'Email address'}
                className={`flex-1 px-4 py-3 outline-none rounded-l-xl ${
                  isGlam 
                    ? 'bg-white/5 text-[#e5b376] placeholder-[#e5b376]/50 border border-[#e5b376]/30 border-r-0' 
                    : 'bg-white/60 backdrop-blur-sm border-2 border-[#ff9aa8]/20 border-r-0 text-[#2a2022] placeholder-gray-400'
                }`}
              />
              <button className={`px-6 py-3 font-bold rounded-r-xl transition-all duration-300 ${
                isGlam 
                  ? 'bg-[#e5b376] text-[#2a2a2a] hover:bg-white' 
                  : 'bg-[#ff9aa8] text-white hover:bg-[#ff8f9f] shadow-md shadow-[#ff9aa8]/20'
              }`}>
                {isGlam ? 'Subscribe' : 'Sign me up'}
              </button>
            </div>
          </div>
          
          <div>
            <h4 className={`font-semibold mb-6 ${isGlam ? 'tracking-widest uppercase font-serif' : ''}`}>Shop</h4>
            <ul className={`space-y-3 text-sm ${isGlam ? 'opacity-80' : 'text-text-muted'}`}>
              <li><a href="#" className="hover:underline">All Products</a></li>
              <li><a href="#" className="hover:underline">{isGlam ? 'Lips' : 'Skincare'}</a></li>
              <li><a href="#" className="hover:underline">{isGlam ? 'Eyes' : 'Body'}</a></li>
              <li><a href="#" className="hover:underline">Bestsellers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className={`font-semibold mb-6 ${isGlam ? 'tracking-widest uppercase font-serif' : ''}`}>Help</h4>
            <ul className={`space-y-3 text-sm ${isGlam ? 'opacity-80' : 'text-text-muted'}`}>
              <li><a href="#" className="hover:underline">Track Order</a></li>
              <li><a href="#" className="hover:underline">Returns & Refunds</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className={`flex flex-col md:flex-row justify-between items-center pt-8 border-t ${isGlam ? 'border-secondary/20' : 'border-text/10'}`}>
          <p className="text-xs opacity-60 mb-4 md:mb-0">
            © 2026 COSKINn. All rights reserved.
          </p>
          <div className="flex space-x-6 font-semibold">
            <a href="#" className="hover:opacity-70 transition-opacity">IG</a>
            <a href="#" className="hover:opacity-70 transition-opacity">TW</a>
            <a href="#" className="hover:opacity-70 transition-opacity">FB</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
