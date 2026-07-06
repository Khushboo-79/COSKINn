import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

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
    // Focus first element on open
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
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
          />
          
          {/* Drawer - Sliding from Right */}
          <motion.div 
            ref={menuRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-[85vw] max-w-[400px] h-full bg-white/95 backdrop-blur-2xl z-[120] shadow-2xl overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <div className="p-6 pt-24 flex flex-col h-full">
              {/* Header removed because the animated X is positioned globally in the Navbar on the top right */}
              
              <div className="flex flex-col gap-2 flex-1">
                <Link to={`/${theme}`} onClick={onClose} className="py-4 text-lg font-bold font-heading text-black border-b border-black/10">Home</Link>
                
                <MobileAccordion title="Shop">
                  <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">New Arrivals</Link>
                  <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">Best Sellers</Link>
                  <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">Skincare</Link>
                  <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">Cosmetics</Link>
                  <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">Bundles</Link>
                  <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">Limited Edition</Link>
                  <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">Gift Sets</Link>
                  <Link to="#" onClick={onClose} className="text-theme-primary font-bold py-1">Shop All →</Link>
                </MobileAccordion>

                <MobileAccordion title="Categories">
                  {theme === 'skincare' ? (
                    <>
                      <div className="text-xs font-bold text-theme-primary uppercase tracking-widest mt-2 mb-1">Face Care</div>
                      <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">Cleanser</Link>
                      <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">Cleansing Balm</Link>
                      <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">Sunscreen</Link>
                      <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">Face Mist</Link>
                      <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">Overnight Mask</Link>
                      <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">Under Eye Patches</Link>
                      
                      <div className="text-xs font-bold text-theme-primary uppercase tracking-widest mt-4 mb-1">Body Care</div>
                      <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">Body Sunscreen</Link>
                      <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">Hand Cream</Link>

                      <div className="text-xs font-bold text-theme-primary uppercase tracking-widest mt-4 mb-1">Lip Care</div>
                      <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">SPF Lip Balm</Link>

                      <div className="text-xs font-bold text-theme-primary uppercase tracking-widest mt-4 mb-1">Fragrance</div>
                      <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">Pocket Perfume</Link>
                    </>
                  ) : (
                    <>
                      <div className="text-xs font-bold text-theme-primary uppercase tracking-widest mt-2 mb-1">Face Makeup</div>
                      <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">Blush</Link>
                      <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">Lip & Cheek Blur</Link>
                      
                      <div className="text-xs font-bold text-theme-primary uppercase tracking-widest mt-4 mb-1">Eye Makeup</div>
                      <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">Mascara</Link>
                      <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">Eyeshadow Palette</Link>

                      <div className="text-xs font-bold text-theme-primary uppercase tracking-widest mt-4 mb-1">Lip Makeup</div>
                      <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">Magnetic Lipstick</Link>
                      <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">Lip Liner</Link>

                      <div className="text-xs font-bold text-theme-primary uppercase tracking-widest mt-4 mb-1">Accessories</div>
                      <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">Makeup Brushes</Link>
                      <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">Brush Holder</Link>

                      <div className="text-xs font-bold text-theme-primary uppercase tracking-widest mt-4 mb-1">Coming Soon</div>
                      <Link to="#" onClick={onClose} className="text-black/80 font-medium py-1">Holographic Edition</Link>
                    </>
                  )}
                </MobileAccordion>

                <Link to="/about" onClick={onClose} className="py-4 text-lg font-bold font-heading text-black border-b border-black/10">About Us</Link>
                <Link to="/journal" onClick={onClose} className="py-4 text-lg font-bold font-heading text-black border-b border-black/10">Journal</Link>
                <Link to="/contact" onClick={onClose} className="py-4 text-lg font-bold font-heading text-black border-b border-black/10">Contact</Link>
              </div>

              <div className="mt-8 pb-8">
                <div className="flex bg-black/5 p-1 rounded-full text-sm font-bold">
                  <button onClick={() => window.location.href='/skincare'} className={`flex-1 py-3 rounded-full transition-all ${theme === 'skincare' ? 'bg-black text-white shadow-md' : 'text-black/70'}`}>Skincare</button>
                  <button onClick={() => window.location.href='/cosmetics'} className={`flex-1 py-3 rounded-full transition-all ${theme === 'cosmetics' ? 'bg-black text-white shadow-md' : 'text-black/70'}`}>Cosmetics</button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
