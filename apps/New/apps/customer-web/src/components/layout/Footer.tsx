import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Footer: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  return (
    <footer className={`pt-20 pb-10 border-t transition-colors duration-500 ${isGlam ? 'bg-primary text-secondary border-primary/20' : 'bg-background text-text border-text/10'}`}>
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
                className={`flex-1 px-4 py-3 outline-none ${
                  isGlam ? 'bg-secondary/10 text-secondary placeholder-secondary/50 border border-secondary/30' : 'bg-white border-2 border-r-0 border-text/10 text-text'
                }`}
              />
              <button className={`px-6 py-3 font-semibold transition-colors ${
                isGlam ? 'bg-secondary text-primary hover:bg-white' : 'bg-primary text-white hover:bg-accent'
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
