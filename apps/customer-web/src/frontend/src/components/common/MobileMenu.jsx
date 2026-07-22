import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, X, Search, Heart, ShoppingBag, User } from 'lucide-react';
import { skincareNavigation } from '../../constants/skincareNavigation';
import { cosmeticsNavigation } from '../../constants/cosmeticsNavigation';
import { useCart } from '../../context/CartContext';

const MobileAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-black/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-lg font-bold font-heading text-black focus:outline-none"
      >
        {title}
        <ChevronDown size={20} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-4 flex flex-col gap-3 px-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function MobileMenu({ isOpen, onClose, theme }) {
  const menuRef = React.useRef(null);
  const navigate = useNavigate();
  const { setIsCartOpen } = useCart();
  
  const data = theme === 'skincare' ? skincareNavigation : cosmeticsNavigation;

  useEffect(() => {
    if (!isOpen) return;

    const focusableElements = menuRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    setTimeout(() => firstElement.focus(), 100);

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[110]"
          />
          
          {/* Drawer - Sliding from Right with Tween easing, NO BOUNCE */}
          <motion.div 
            ref={menuRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 w-[85vw] max-w-[400px] h-full bg-[#FFFDFD] z-[120] rounded-l-3xl shadow-[-10px_0_40px_rgba(0,0,0,0.08)] flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/5 shrink-0">
              <span className="font-heading tracking-[0.2em] text-[#FF0069] font-bold text-xl uppercase">COSKINn</span>
              <button onClick={onClose} className="p-2 -mr-2 text-black/60 hover:text-[#FF0069] transition-colors focus:outline-none">
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Navigation Content */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              <div className="flex flex-col gap-1">
                <Link to={`/${theme}`} onClick={onClose} className="py-4 text-lg font-bold font-heading text-black border-b border-black/10">Home</Link>
                
                <MobileAccordion title="Shop">
                  {data.shop.map((section, idx) => (
                    <React.Fragment key={`shop-${idx}`}>
                      <div className={`text-xs font-bold text-[#FF0069] uppercase tracking-widest ${idx > 0 ? 'mt-4' : 'mt-2'} mb-1`}>{section.title}</div>
                      {section.links.map((link, lIdx) => (
                        <Link key={`shop-link-${lIdx}`} to={link.href} onClick={onClose} className="text-black/80 font-medium py-1">{link.name}</Link>
                      ))}
                    </React.Fragment>
                  ))}
                  <div className="text-xs font-bold text-[#FF0069] uppercase tracking-widest mt-4 mb-1">{data.bundles.title}</div>
                  {data.bundles.links.map((link, lIdx) => (
                    <Link key={`bundle-${lIdx}`} to={link.href} onClick={onClose} className="text-black/80 font-medium py-1">{link.name}</Link>
                  ))}
                  <Link to={data.bundles.shopAllHref} onClick={onClose} className="text-[#FF0069] font-bold py-1 mt-2">{data.bundles.shopAllText}</Link>
                </MobileAccordion>

                <MobileAccordion title="Categories">
                  {data.categories.map((section, idx) => (
                    <React.Fragment key={`cat-${idx}`}>
                      <div className={`text-xs font-bold text-[#FF0069] uppercase tracking-widest ${idx > 0 ? 'mt-4' : 'mt-2'} mb-1`}>{section.title}</div>
                      {section.links.map((link, lIdx) => (
                        <Link key={`cat-link-${lIdx}`} to={link.href} onClick={onClose} className="text-black/80 font-medium py-1">{link.name}</Link>
                      ))}
                    </React.Fragment>
                  ))}
                  <div className="text-xs font-bold text-[#FF0069] uppercase tracking-widest mt-4 mb-1">{data.categoryHighlight.title}</div>
                  {data.categoryHighlight.links.map((link, lIdx) => (
                    <Link key={`cathl-${lIdx}`} to={link.href} onClick={onClose} className="text-black/80 font-medium py-1">{link.name}</Link>
                  ))}
                  {data.categoryHighlight.highlightTag && (
                    <>
                      <div className="text-xs font-bold text-[#FF0069] uppercase tracking-widest mt-4 mb-1">{data.categoryHighlight.highlightTag}</div>
                      <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">{data.categoryHighlight.highlightText}</Link>
                    </>
                  )}
                </MobileAccordion>

                {theme === 'skincare' && data.routines && (
                  <MobileAccordion title="Routine">
                    <div className="text-xs font-bold text-[#FF0069] uppercase tracking-widest mt-2 mb-1">Skincare Routines</div>
                    {data.routines.map((link, lIdx) => (
                      <Link key={`routine-${lIdx}`} to={link.href} onClick={onClose} className="text-black/80 font-medium py-1">{link.name}</Link>
                    ))}
                  </MobileAccordion>
                )}

                <Link to="/about" onClick={onClose} className="py-4 text-lg font-bold font-heading text-black border-b border-black/10">About Us</Link>
                <Link to="/journal" onClick={onClose} className="py-4 text-lg font-bold font-heading text-black border-b border-black/10">Journal</Link>
                <Link to="/contact" onClick={onClose} className="py-4 text-lg font-bold font-heading text-black border-b border-black/10">Contact</Link>
              </div>

              <div className="mt-8 mb-6">
                <div className="flex bg-[#FFF5F8] p-1 rounded-full text-sm font-bold border border-[#FF0069]/10">
                  <button onClick={() => window.location.href='/skincare'} className={`flex-1 py-3 rounded-full transition-all ${theme === 'skincare' ? 'bg-[#FF0069] text-white shadow-md' : 'text-black/70 hover:bg-[#FF0069]/5'}`}>Skincare</button>
                  <button onClick={() => window.location.href='/cosmetics'} className={`flex-1 py-3 rounded-full transition-all ${theme === 'cosmetics' ? 'bg-[#FF0069] text-white shadow-md' : 'text-black/70 hover:bg-[#FF0069]/5'}`}>Cosmetics</button>
                </div>
              </div>
            </div>

            {/* Bottom Section Icons */}
            <div className="px-6 py-6 border-t border-black/5 bg-[#FAFAFA] shrink-0">
              <div className="grid grid-cols-4 gap-2">
                 <button onClick={() => { onClose(); }} className="flex flex-col items-center gap-1.5 text-black/60 hover:text-[#FF0069] transition-colors p-2" aria-label="Search">
                    <Search size={22} strokeWidth={1.5} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Search</span>
                 </button>
                 <button onClick={() => { onClose(); navigate('/account/wishlist'); }} className="flex flex-col items-center gap-1.5 text-black/60 hover:text-[#FF0069] transition-colors p-2" aria-label="Wishlist">
                    <Heart size={22} strokeWidth={1.5} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Wishlist</span>
                 </button>
                 <button onClick={() => { onClose(); setIsCartOpen(true); }} className="flex flex-col items-center gap-1.5 text-black/60 hover:text-[#FF0069] transition-colors p-2" aria-label="Cart">
                    <ShoppingBag size={22} strokeWidth={1.5} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Cart</span>
                 </button>
                 <button onClick={() => { onClose(); navigate('/account'); }} className="flex flex-col items-center gap-1.5 text-black/60 hover:text-[#FF0069] transition-colors p-2" aria-label="Account">
                    <User size={22} strokeWidth={1.5} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Account</span>
                 </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
