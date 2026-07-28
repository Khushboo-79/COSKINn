import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Menu, Search, ShoppingBag, User, Heart, Droplets, Sparkles, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SearchModal from './SearchModal';

const Header: React.FC = () => {
  const { mode, toggleMode } = useTheme();
  const { setIsCartOpen, cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const isGlam = mode === 'glam';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { name: 'Shop', path: '/collections' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Journal', path: '/journal' }
  ];

  return (
    <>
    <header className={`sticky top-0 z-50 w-full backdrop-blur-md transition-colors duration-500 ease-in-out ${
      isGlam ? 'bg-[#faf9f6]/90 border-b border-[#e5b376]/20' : 'bg-white/90 border-b border-gray-100'
    }`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-[72px]">
          
          {/* Left Navigation */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8 items-center justify-start flex-1 text-[15px] font-sans font-medium whitespace-nowrap">
            <Link to="/" className={`transition-all duration-300 ${
              isGlam 
                ? 'text-gray-800 icon-hover-glam' 
                : 'text-gray-800 icon-hover-skin'
            }`}>
              Home
            </Link>
            {navLinks.map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className={`whitespace-nowrap transition-all duration-300 ${
                  isGlam 
                    ? 'text-[#2a2a2a] icon-hover-glam' 
                    : 'text-gray-800 icon-hover-skin'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Icon */}
          <div className="flex lg:hidden flex-1 justify-start">
            <button 
              className={`-ml-2 text-gray-800 ${isGlam ? 'icon-hover-glam' : 'icon-hover-skin'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Center Logo */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center flex-1">
            <Link to="/" className="flex flex-col items-center">
              <div className="text-3xl tracking-widest font-extrabold text-[#2a2a2a] flex items-center font-display">
                COSKIN<span className={isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}>n</span>
              </div>
              <span className={`text-[9px] uppercase tracking-[0.3em] mt-1 font-bold ${isGlam ? 'text-[#cfa473] font-serif' : 'text-[#e5b376]'}`}>
                Skin, Refresh, Repeat
              </span>
            </Link>
          </div>

          {/* Right Actions & Toggle */}
          <div className="flex flex-1 justify-end items-center space-x-3 sm:space-x-5 lg:space-x-6">
            
            <div className="flex items-center space-x-4 sm:space-x-5 text-gray-800">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className={`${isGlam ? 'icon-hover-glam' : 'icon-hover-skin'}`}
              >
                <Search size={22} strokeWidth={1.5} />
              </button>
              <Link to="/account" className={`hidden sm:block ${isGlam ? 'icon-hover-glam' : 'icon-hover-skin'}`}>
                <User size={22} strokeWidth={1.5} />
              </Link>
              <Link to="/wishlist" className={`hidden sm:block relative ${isGlam ? 'icon-hover-glam' : 'icon-hover-skin'}`}>
                <Heart size={22} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className={`absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded-full text-white ${
                    isGlam ? 'bg-[#7a1b26]' : 'bg-[#ff9aa8]'
                  }`}>
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <button 
                className={`relative ${isGlam ? 'icon-hover-glam' : 'icon-hover-skin'}`}
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag size={22} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className={`absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded-full text-white ${
                    isGlam ? 'bg-[#7a1b26]' : 'bg-[#ff9aa8]'
                  }`}>
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* The Segment Toggle */}
            <div 
              className={`hidden sm:flex relative items-center h-[38px] rounded-full cursor-pointer px-[16px] ml-2 transition-colors duration-500 border ${
                !isGlam ? 'bg-[#f8f6f6] border-[#f0d6df]' : 'bg-[#f4efe8] border-[#e2d5c3]'
              }`}
              onClick={toggleMode}
            >
              <span className={`text-[10px] font-bold tracking-[0.15em] transition-colors duration-500 ${!isGlam ? 'text-[#f38ba5]' : 'text-[#8a8a8a]'}`}>
                SKIN
              </span>

              <div className={`relative w-[52px] h-[26px] rounded-full mx-3 transition-colors duration-500 flex items-center ${
                !isGlam ? 'bg-gradient-to-r from-[#f38ba5] to-[#a8caba] justify-start px-[2px]' : 'bg-gradient-to-r from-[#882431] to-[#b58c3a] justify-end px-[2px]'
              }`}>
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="w-[22px] h-[22px] rounded-full bg-white shadow-sm flex items-center justify-center"
                >
                  {!isGlam ? (
                    <Droplets size={12} className="text-[#f38ba5]" strokeWidth={2.5} />
                  ) : (
                    <Sparkles size={12} className="text-[#882431]" strokeWidth={2.5} />
                  )}
                </motion.div>
              </div>

              <span className={`text-[10px] font-bold tracking-[0.15em] transition-colors duration-500 ${isGlam ? 'text-[#882431]' : 'text-[#8a8a8a]'}`}>
                GLAM
              </span>
            </div>
            
          </div>
          
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden border-t ${isGlam ? 'bg-[#faf9f6] border-[#e5b376]/20' : 'bg-white border-gray-100'} overflow-hidden`}
          >
            <div className="flex flex-col px-6 py-6 space-y-4">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className={`py-2 font-medium transition-all duration-300 ${
                  isGlam ? 'text-gray-800 icon-hover-glam' : 'text-gray-800 icon-hover-skin'
                }`}
              >
                Home
              </Link>
              {navLinks.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-2 font-medium transition-all duration-300 ${
                    isGlam 
                      ? 'text-[#2a2a2a] icon-hover-glam' 
                      : 'text-gray-800 icon-hover-skin'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Theme Toggle */}
              <div className="pt-4 mt-2 border-t border-gray-100 flex items-center justify-between px-4">
                <span className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">Theme</span>
                <div 
                  className={`flex relative items-center h-[38px] rounded-full cursor-pointer px-[16px] transition-colors duration-500 border ${
                    !isGlam ? 'bg-[#f8f6f6] border-[#f0d6df]' : 'bg-[#f4efe8] border-[#e2d5c3]'
                  }`}
                  onClick={() => { toggleMode(); setIsMenuOpen(false); }}
                >
                  <span className={`text-[10px] font-bold tracking-[0.15em] transition-colors duration-500 ${!isGlam ? 'text-[#f38ba5]' : 'text-[#8a8a8a]'}`}>
                    SKIN
                  </span>
                  <div className={`relative w-[52px] h-[26px] rounded-full mx-3 transition-colors duration-500 flex items-center ${
                    !isGlam ? 'bg-gradient-to-r from-[#f38ba5] to-[#a8caba] justify-start px-[2px]' : 'bg-gradient-to-r from-[#882431] to-[#b58c3a] justify-end px-[2px]'
                  }`}>
                    <motion.div
                      layout
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="w-[22px] h-[22px] rounded-full bg-white shadow-sm flex items-center justify-center"
                    >
                      {!isGlam ? (
                        <Droplets size={12} className="text-[#f38ba5]" strokeWidth={2.5} />
                      ) : (
                        <Sparkles size={12} className="text-[#882431]" strokeWidth={2.5} />
                      )}
                    </motion.div>
                  </div>
                  <span className={`text-[10px] font-bold tracking-[0.15em] transition-colors duration-500 ${isGlam ? 'text-[#882431]' : 'text-[#8a8a8a]'}`}>
                    GLAM
                  </span>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
