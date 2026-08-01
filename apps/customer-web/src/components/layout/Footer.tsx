import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  return (
    <footer className={`min-h-screen lg:h-screen lg:max-h-[1080px] flex flex-col justify-center transition-colors duration-500 ${isGlam ? 'bg-[#1a1a1a] text-[#e5b376]' : 'bg-[#fff5f7] text-[#2a2022]'}`}>
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-10 py-10 lg:py-12 flex flex-col justify-between h-full">
        
        {/* Newsletter Banner */}
        <div className={`rounded-[2.5rem] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6 mt-4 ${isGlam ? 'bg-[#2a2a2a]' : 'bg-white shadow-sm'}`}>
          <div className="w-full md:max-w-lg text-center md:text-left">
            <h3 className={`text-2xl md:text-[28px] mb-2 ${isGlam ? 'font-serif' : 'font-display font-medium text-[#2a2a2a]'}`}>
              {isGlam ? 'Correspondence from the Atelier' : 'Get on the juicy list'}
            </h3>
            <p className={`text-sm md:text-[14px] ${isGlam ? 'opacity-80 font-serif' : 'text-[#7d7d7d]'}`}>
              {isGlam 
                ? 'A house of ornate, hand-crafted cosmetics. Made slowly, worn poetically.' 
                : 'Fresh drops, sneaky discounts and skin tips — squeezed into your inbox weekly.'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row w-full md:max-w-md gap-3 shrink-0">
            <input 
              type="email" 
              placeholder={isGlam ? 'Enter your monogram (email)' : 'your@email.com'}
              className={`flex-1 w-full px-5 py-3 outline-none rounded-full font-medium ${
                isGlam 
                  ? 'bg-white/5 text-[#e5b376] placeholder-[#e5b376]/50 border border-[#e5b376]/30' 
                  : 'bg-[#fff5f7] border border-[#ffe4eb] text-[#2a2022] placeholder-[#a1999b] focus:border-[#ff9aa8]'
              }`}
            />
            <button className={`w-full sm:w-auto px-6 py-3 font-bold rounded-full transition-all duration-300 whitespace-nowrap ${
              isGlam 
                ? 'bg-[#e5b376] text-[#2a2a2a] hover:bg-white' 
                : 'bg-[#ff9aa8] text-white hover:bg-[#ff8f9f] shadow-sm shadow-[#ff9aa8]/20'
            }`}>
              {isGlam ? 'Subscribe' : 'Sign me up'}
            </button>
          </div>
        </div>
        
        {/* Main Footer Grid */}
        <div className="flex flex-col lg:flex-row gap-12 my-auto py-10 lg:py-0">
          <div className="w-full lg:w-1/3">
            <h2 className="text-[24px] font-display font-medium tracking-tight mb-4 flex items-center text-[#2a2a2a]">
              COSKIN<span className={isGlam ? 'text-[#e5b376]' : 'text-[#ff9aa8]'}>n</span>
            </h2>
            <p className={`mb-6 text-[14px] max-w-[280px] leading-relaxed ${isGlam ? 'opacity-80 font-serif' : 'text-[#7d7d7d]'}`}>
              {isGlam 
                ? 'Made slowly, worn poetically. A house of ornate, hand-crafted cosmetics.' 
                : 'Juicy, hydrating, mood-lifting skincare — squeezed from real fruit science.'}
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/coskinn" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${isGlam ? 'bg-[#2a2a2a] text-[#e5b376]' : 'bg-white text-[#2a2a2a] shadow-sm hover:text-[#ff9aa8]'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://youtube.com/@coskinn" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${isGlam ? 'bg-[#2a2a2a] text-[#e5b376]' : 'bg-white text-[#2a2a2a] shadow-sm hover:text-[#ff9aa8]'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.5 7.1 2.3 5.4 3.1 4.6C4 3.6 5 3.6 5.5 3.5C8.3 3.3 12 3.3 12 3.3C12 3.3 15.7 3.3 18.5 3.5C19 3.6 20 3.6 20.9 4.6C21.7 5.4 21.5 7.1 21.5 7.1C21.7 8.3 21.8 9.6 21.8 10.9V13.1C21.8 14.4 21.7 15.7 21.5 16.9C21.5 16.9 21.7 18.6 20.9 19.4C20 20.4 18.8 20.4 18.2 20.5C15.2 20.8 12 20.7 12 20.7C12 20.7 8.3 20.7 5.5 20.5C5 20.4 4 20.4 3.1 19.4C2.3 18.6 2.5 16.9 2.5 16.9C2.3 15.7 2.2 14.4 2.2 13.1V10.9C2.2 9.6 2.3 8.3 2.5 7.1Z"/><path d="M9.7 15.7L15.5 12L9.7 8.3V15.7Z"/></svg>
              </a>
              <a href="https://twitter.com/coskinn" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${isGlam ? 'bg-[#2a2a2a] text-[#e5b376]' : 'bg-white text-[#2a2a2a] shadow-sm hover:text-[#ff9aa8]'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="https://facebook.com/coskinn" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${isGlam ? 'bg-[#2a2a2a] text-[#e5b376]' : 'bg-white text-[#2a2a2a] shadow-sm hover:text-[#ff9aa8]'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>
          
          <div className="w-full lg:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12">
            <div>
              <h4 className={`text-[11px] font-bold mb-5 tracking-[0.2em] text-[#a1999b] uppercase ${isGlam ? 'font-serif' : ''}`}>Shop</h4>
              <ul className={`space-y-3 text-[14px] font-medium ${isGlam ? 'opacity-80' : 'text-[#504a4b]'}`}>
                <li><Link to="/collections" className="hover:text-[#ff9aa8] transition-colors">All Products</Link></li>
                <li><Link to="/collections/new" className="hover:text-[#ff9aa8] transition-colors">New In</Link></li>
                <li><Link to="/collections/bestsellers" className="hover:text-[#ff9aa8] transition-colors">Bestsellers</Link></li>
                <li><Link to="/collections/sets" className="hover:text-[#ff9aa8] transition-colors">Sets</Link></li>
                <li><Link to="/gift-cards" className="hover:text-[#ff9aa8] transition-colors">Gift Cards</Link></li>
              </ul>
            </div>

            <div>
              <h4 className={`text-[11px] font-bold mb-5 tracking-[0.2em] text-[#a1999b] uppercase ${isGlam ? 'font-serif' : ''}`}>Journal</h4>
              <ul className={`space-y-3 text-[14px] font-medium ${isGlam ? 'opacity-80' : 'text-[#504a4b]'}`}>
                <li><Link to="/journal" className="hover:text-[#ff9aa8] transition-colors">Skin School</Link></li>
                <li><Link to="/journal" className="hover:text-[#ff9aa8] transition-colors">Ingredient Guide</Link></li>
                <li><Link to="/about" className="hover:text-[#ff9aa8] transition-colors">Behind the Brand</Link></li>
                <li><Link to="/journal" className="hover:text-[#ff9aa8] transition-colors">Rituals</Link></li>
              </ul>
            </div>
            
            <div className="col-span-2 sm:col-span-1">
              <h4 className={`text-[11px] font-bold mb-5 tracking-[0.2em] text-[#a1999b] uppercase ${isGlam ? 'font-serif' : ''}`}>Support</h4>
              <ul className={`space-y-3 text-[14px] font-medium ${isGlam ? 'opacity-80' : 'text-[#504a4b]'}`}>
                <li><Link to="/contact" className="hover:text-[#ff9aa8] transition-colors">Contact</Link></li>
                <li><Link to="/shipping" className="hover:text-[#ff9aa8] transition-colors">Shipping</Link></li>
                <li><Link to="/returns" className="hover:text-[#ff9aa8] transition-colors">Returns</Link></li>
                <li><Link to="/faq" className="hover:text-[#ff9aa8] transition-colors">FAQ</Link></li>
                <li><Link to="/track-order" className="hover:text-[#ff9aa8] transition-colors">Track Order</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className={`flex flex-col md:flex-row justify-between items-center pt-5 pb-2 border-t text-[12px] font-medium gap-4 md:gap-0 ${isGlam ? 'border-secondary/20 text-[#e5b376]/60' : 'border-[#2a2022]/10 text-[#888]'}`}>
          <p className="mb-0">
            © 2026 COSKINn · Made with peaches & pearls
          </p>
          <div className="flex space-x-6 text-[#888]">
            <Link to="/privacy" className="hover:text-[#ff9aa8] transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-[#ff9aa8] transition-colors">Terms</Link>
            <Link to="/cookies" className="hover:text-[#ff9aa8] transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
