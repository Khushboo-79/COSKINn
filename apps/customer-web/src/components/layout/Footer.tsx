import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className={`flex flex-col transition-colors duration-500 ${isGlam ? 'bg-[#e8dcc7] text-[#141824]' : 'bg-[#fff5f7] text-[#2a2022]'}`}>
      <div className={`w-full max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col justify-between h-full ${isGlam ? 'py-8 lg:py-10' : 'py-10 lg:py-12'}`}>
        
        {/* Newsletter Banner */}
        <div className={`flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10 lg:gap-16 mb-10 ${
          isGlam 
            ? 'p-6 md:p-8 lg:p-10 bg-[#fcfbf9] border border-[#d2b27b] rounded-sm shadow-sm' 
            : 'rounded-[2.5rem] p-6 sm:p-8 md:p-10 bg-white shadow-sm mt-4'
        }`}>
          <div className="w-full lg:w-auto flex-1 text-center lg:text-left">
            <h3 className={`mb-2 md:mb-3 ${isGlam ? 'text-2xl md:text-3xl lg:text-4xl font-serif text-[#141824] leading-tight' : 'text-2xl md:text-[28px] font-display font-medium text-[#2a2a2a]'}`}>
              {isGlam ? 'Correspondence from the Atelier' : 'Get on the juicy list'}
            </h3>
            <p className={`text-sm md:text-base ${isGlam ? 'font-sans text-[#7a7a7a]' : 'text-[#7d7d7d]'}`}>
              {isGlam 
                ? 'Private previews, hand-poured launches and a poem, monthly.' 
                : 'Fresh drops, sneaky discounts and skin tips — squeezed into your inbox weekly.'}
            </p>
          </div>
          <div className={`flex flex-col w-full lg:w-auto lg:max-w-md xl:max-w-lg shrink-0`}>
            <div className={`flex w-full ${isGlam ? 'flex-col sm:flex-row' : 'flex-col sm:flex-row gap-3'}`}>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isGlam ? 'your@email.com' : 'your@email.com'}
                className={`w-full px-5 py-3 outline-none font-medium ${
                  isGlam 
                    ? 'flex-1 bg-[#e8dcc7] text-[#141824] placeholder-[#a6a096] rounded-none' 
                    : 'flex-1 bg-[#fff5f7] border border-[#ffe4eb] text-[#2a2022] placeholder-[#a1999b] focus:border-[#ff9aa8] rounded-full'
                }`}
              />
              <button onClick={handleSubscribe} className={`py-3 font-bold transition-all duration-300 whitespace-nowrap ${
                isGlam 
                  ? 'w-full sm:w-auto px-8 bg-[#7a1b26] text-white hover:bg-[#5a111b] rounded-none text-[11px] uppercase tracking-widest' 
                  : 'w-full sm:w-auto px-6 rounded-full bg-[#ff9aa8] text-white hover:bg-[#ff8f9f] shadow-sm shadow-[#ff9aa8]/20'
              }`}>
                {isGlam ? 'Subscribe' : 'Sign me up'}
              </button>
            </div>
            {subscribed && (
              <p className={`mt-3 text-sm font-bold ${isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}`}>
                Thanks for subscribing!
              </p>
            )}
          </div>
        </div>
        
        {/* Main Footer Grid */}
        <div className={`flex flex-col lg:flex-row gap-12 lg:gap-20 pb-12`}>
          <div className="w-full lg:w-1/3 xl:w-1/4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <img 
              src="/fairenne-full.png" 
              alt="Fairenne Logo" 
              className={`w-[160px] md:w-[200px] h-auto mb-6 object-contain mix-blend-multiply transition-all duration-300 mx-auto lg:mx-0 ${isGlam ? 'contrast-125 saturate-150' : 'opacity-90'}`}
            />
            <p className={`mb-6 text-[14px] max-w-[280px] leading-relaxed mx-auto lg:mx-0 ${isGlam ? 'font-sans text-[#5c5c5c]' : 'text-[#7d7d7d]'}`}>
              {isGlam 
                ? 'A house of ornate, hand-crafted cosmetics. Made slowly, worn poetically.' 
                : 'Juicy, hydrating, mood-lifting skincare — squeezed from real fruit science.'}
            </p>
            <div className="flex gap-3 justify-center lg:justify-start">
              <a href="https://instagram.com/fairenne" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 flex items-center justify-center transition-transform hover:scale-110 ${isGlam ? 'bg-white rounded-sm text-[#141824]' : 'bg-white rounded-full text-[#2a2a2a] shadow-sm hover:text-[#ff9aa8]'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://youtube.com/@fairenne" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 flex items-center justify-center transition-transform hover:scale-110 ${isGlam ? 'bg-white rounded-sm text-[#141824]' : 'bg-white rounded-full text-[#2a2a2a] shadow-sm hover:text-[#ff9aa8]'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.5 7.1 2.3 5.4 3.1 4.6C4 3.6 5 3.6 5.5 3.5C8.3 3.3 12 3.3 12 3.3C12 3.3 15.7 3.3 18.5 3.5C19 3.6 20 3.6 20.9 4.6C21.7 5.4 21.5 7.1 21.5 7.1C21.7 8.3 21.8 9.6 21.8 10.9V13.1C21.8 14.4 21.7 15.7 21.5 16.9C21.5 16.9 21.7 18.6 20.9 19.4C20 20.4 18.8 20.4 18.2 20.5C15.2 20.8 12 20.7 12 20.7C12 20.7 8.3 20.7 5.5 20.5C5 20.4 4 20.4 3.1 19.4C2.3 18.6 2.5 16.9 2.5 16.9C2.3 15.7 2.2 14.4 2.2 13.1V10.9C2.2 9.6 2.3 8.3 2.5 7.1Z"/><path d="M9.7 15.7L15.5 12L9.7 8.3V15.7Z"/></svg>
              </a>
              <a href="https://twitter.com/fairenne" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 flex items-center justify-center transition-transform hover:scale-110 ${isGlam ? 'bg-white rounded-sm text-[#141824]' : 'bg-white rounded-full text-[#2a2a2a] shadow-sm hover:text-[#ff9aa8]'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="https://tiktok.com/@fairenne" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 flex items-center justify-center transition-transform hover:scale-110 ${isGlam ? 'bg-white rounded-sm text-[#141824]' : 'bg-white rounded-full text-[#2a2a2a] shadow-sm hover:text-[#ff9aa8]'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a8 8 0 0 1-5-3v5.5a8 8 0 0 1-16 0A7.9 7.9 0 0 1 5 6v3a5 5 0 0 0-2 4 5 5 0 0 0 5 5c2 0 3.7-1.3 4.3-3z"/></svg>
              </a>
            </div>
          </div>
          
          <div className="w-full lg:w-2/3 xl:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12 text-center md:text-left">
            <div>
              <h4 className={`text-[11px] font-bold mb-6 tracking-[0.2em] uppercase ${isGlam ? 'text-[#8b8581] font-sans' : 'text-[#a1999b] font-serif'}`}>Shop</h4>
              <ul className={`space-y-4 text-[13.5px] font-medium ${isGlam ? 'text-[#5c5c5c] font-sans' : 'text-[#504a4b]'}`}>
                <li><Link to="/collections" className={`transition-colors ${isGlam ? 'hover:text-[#141824]' : 'hover:text-[#ff9aa8]'}`}>All Products</Link></li>
                <li><Link to="/collections/new" className={`transition-colors ${isGlam ? 'hover:text-[#141824]' : 'hover:text-[#ff9aa8]'}`}>New In</Link></li>
                <li><Link to="/collections/bestsellers" className={`transition-colors ${isGlam ? 'hover:text-[#141824]' : 'hover:text-[#ff9aa8]'}`}>Bestsellers</Link></li>
                <li><Link to="/collections/sets" className={`transition-colors ${isGlam ? 'hover:text-[#141824]' : 'hover:text-[#ff9aa8]'}`}>Sets</Link></li>
                <li><Link to="/gift-cards" className={`transition-colors ${isGlam ? 'hover:text-[#141824]' : 'hover:text-[#ff9aa8]'}`}>Gift Cards</Link></li>
              </ul>
            </div>

            <div>
              <h4 className={`text-[11px] font-bold mb-6 tracking-[0.2em] uppercase ${isGlam ? 'text-[#8b8581] font-sans' : 'text-[#a1999b] font-serif'}`}>Journal</h4>
              <ul className={`space-y-4 text-[13.5px] font-medium ${isGlam ? 'text-[#5c5c5c] font-sans' : 'text-[#504a4b]'}`}>
                <li><Link to="/journal" className={`transition-colors ${isGlam ? 'hover:text-[#141824]' : 'hover:text-[#ff9aa8]'}`}>Skin School</Link></li>
                <li><Link to="/journal" className={`transition-colors ${isGlam ? 'hover:text-[#141824]' : 'hover:text-[#ff9aa8]'}`}>Ingredient Guide</Link></li>
                <li><Link to="/about" className={`transition-colors ${isGlam ? 'hover:text-[#141824]' : 'hover:text-[#ff9aa8]'}`}>Behind the Brand</Link></li>
                <li><Link to="/journal" className={`transition-colors ${isGlam ? 'hover:text-[#141824]' : 'hover:text-[#ff9aa8]'}`}>Rituals</Link></li>
              </ul>
            </div>
            
            <div className="col-span-1 md:col-span-1">
              <h4 className={`text-[11px] font-bold mb-6 tracking-[0.2em] uppercase ${isGlam ? 'text-[#8b8581] font-sans' : 'text-[#a1999b] font-serif'}`}>Support</h4>
              <ul className={`space-y-4 text-[13.5px] font-medium ${isGlam ? 'text-[#5c5c5c] font-sans' : 'text-[#504a4b]'}`}>
                <li><Link to="/contact" className={`transition-colors ${isGlam ? 'hover:text-[#141824]' : 'hover:text-[#ff9aa8]'}`}>Contact</Link></li>
                <li><Link to="/shipping" className={`transition-colors ${isGlam ? 'hover:text-[#141824]' : 'hover:text-[#ff9aa8]'}`}>Shipping</Link></li>
                <li><Link to="/returns" className={`transition-colors ${isGlam ? 'hover:text-[#141824]' : 'hover:text-[#ff9aa8]'}`}>Returns</Link></li>
                <li><Link to="/faq" className={`transition-colors ${isGlam ? 'hover:text-[#141824]' : 'hover:text-[#ff9aa8]'}`}>FAQ</Link></li>
                <li><Link to="/track-order" className={`transition-colors ${isGlam ? 'hover:text-[#141824]' : 'hover:text-[#ff9aa8]'}`}>Track Order</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className={`flex flex-col md:flex-row justify-between items-center pt-6 pb-2 border-t text-[11px] font-medium gap-4 md:gap-0 ${isGlam ? 'border-[#d2b27b]/20 text-[#8b8581]' : 'border-[#2a2022]/10 text-[#888]'}`}>
          <p className="mb-0">
            © 2026 Fairenne · Made with peaches & pearls
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className={`transition-colors ${isGlam ? 'hover:text-[#141824]' : 'hover:text-[#ff9aa8]'}`}>Privacy</Link>
            <Link to="/terms" className={`transition-colors ${isGlam ? 'hover:text-[#141824]' : 'hover:text-[#ff9aa8]'}`}>Terms</Link>
            <Link to="/cookies" className={`transition-colors ${isGlam ? 'hover:text-[#141824]' : 'hover:text-[#ff9aa8]'}`}>Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
