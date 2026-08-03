import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useAuth } from '../../context/AuthContext';
import { Menu, Search, ShoppingBag, User, Heart, Droplets, Sparkles, X, Globe, ChevronDown, ChevronDown as ChevronDownIcon } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SearchModal from './SearchModal';
import MegaMenu from './MegaMenu';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, toggleMode } = useTheme();
  const { setIsCartOpen, cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { currency, currencies, setCurrencyByCode } = useCurrency();
  const { isAuthenticated, openAuthModal } = useAuth();
  const isGlam = mode === 'glam';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  const handleToggle = () => {
    toggleMode();
    navigate('/');
    window.scrollTo(0, 0);
  };
  
  // Mega Menu State
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  let shopMenuTimeout: ReturnType<typeof setTimeout>;

  const handleShopEnter = () => {
    clearTimeout(shopMenuTimeout);
    setIsShopMenuOpen(true);
  };

  const handleShopLeave = () => {
    shopMenuTimeout = setTimeout(() => {
      setIsShopMenuOpen(false);
    }, 200);
  };

  const skinNavLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Journal', path: '/journal' }
  ];

  const glamNavLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Journal', path: '/journal' }
  ];

  const navLinks = isGlam ? glamNavLinks : skinNavLinks;

  return (
    <>
    <header className={`sticky top-0 z-50 w-full backdrop-blur-md transition-colors duration-500 ease-in-out ${
      isGlam ? 'bg-[#faf9f6]/90 border-b border-[#e5b376]/20' : 'bg-white/90 border-b border-gray-100'
    }`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-[72px] relative">
          
          {/* Left Navigation */}
          <div className="hidden lg:flex space-x-5 xl:space-x-7 items-center justify-start flex-1 text-[15px] font-sans font-medium whitespace-nowrap">
            <Link to="/" className={`transition-all duration-300 ${
              isGlam 
                ? `${location.pathname === '/' ? 'text-[#7a1b26]' : 'text-gray-800'} icon-hover-glam` 
                : `${location.pathname === '/' ? 'text-[#ff9aa8]' : 'text-gray-800'} icon-hover-skin`
            }`}>
              Home
            </Link>
            
            {/* Shop Mega Menu Trigger */}
            <div 
              className="relative h-[72px] flex items-center"
              onMouseEnter={handleShopEnter}
              onMouseLeave={handleShopLeave}
            >
              <Link 
                to="/collections" 
                className={`flex items-center whitespace-nowrap transition-all duration-300 h-full ${
                  isGlam 
                    ? `${location.pathname.includes('/collections') || location.pathname.includes('/product') ? 'text-[#7a1b26]' : 'text-[#2a2a2a]'} icon-hover-glam` 
                    : `${location.pathname.includes('/collections') || location.pathname.includes('/product') ? 'text-[#ff9aa8]' : 'text-gray-800'} icon-hover-skin`
                } ${isShopMenuOpen ? (isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]') : ''}`}
              >
                Shop
                {!isGlam && <ChevronDownIcon size={14} className={`ml-1 transition-transform duration-300 ${isShopMenuOpen ? 'rotate-180' : ''}`} />}
              </Link>
            </div>

            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.name} 
                  to={item.path}
                  className={`whitespace-nowrap transition-all duration-300 ${
                    isGlam 
                      ? `${isActive ? 'text-[#7a1b26]' : 'text-[#2a2a2a]'} icon-hover-glam` 
                      : `${isActive ? 'text-[#ff9aa8]' : 'text-gray-800'} icon-hover-skin`
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
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
          <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center pointer-events-none">
            <Link to="/" className="flex flex-col items-center pointer-events-auto">
              <div className={`flex items-center ${isGlam ? 'text-[36px] font-serif font-medium text-[#141824] tracking-tight leading-none' : 'text-3xl font-display font-extrabold text-[#2a2a2a] tracking-widest'}`}>
                COSKIN<span className={isGlam ? 'text-[#8b1527]' : 'text-[#ff9aa8]'}>n</span>
              </div>
              <span className={`uppercase ${isGlam ? 'mt-1.5 text-[9.5px] text-[#8e95a1] font-serif tracking-[0.4em]' : 'mt-1 text-[9px] text-[#e5b376] tracking-[0.3em] font-bold'}`}>
                {isGlam ? 'ATELIER DE BEAUTÉ' : 'Skin, Refresh, Repeat'}
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
              <button 
                className={`hidden sm:block ${isGlam ? 'icon-hover-glam' : 'icon-hover-skin'}`}
                onClick={(e) => {
                  if (!isAuthenticated) {
                    e.preventDefault();
                    openAuthModal();
                  } else {
                    navigate('/account');
                  }
                }}
              >
                <User size={22} strokeWidth={1.5} />
              </button>
              {!isGlam && (
                <button 
                  className={`hidden sm:block relative icon-hover-skin`}
                  onClick={(e) => {
                    if (!isAuthenticated) {
                      e.preventDefault();
                      openAuthModal();
                    } else {
                      navigate('/wishlist');
                    }
                  }}
                >
                  <Heart size={22} strokeWidth={1.5} />
                  {wishlistCount > 0 && (
                    <span className={`absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded-full text-white bg-[#ff9aa8]`}>
                      {wishlistCount}
                    </span>
                  )}
                </button>
              )}
              <button 
                className={`relative ${isGlam ? 'icon-hover-glam' : 'icon-hover-skin'}`}
                onClick={(e) => {
                  if (!isAuthenticated) {
                    e.preventDefault();
                    openAuthModal();
                  } else {
                    setIsCartOpen(true);
                  }
                }}
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

              {/* Currency Selector */}
              <div className="relative hidden sm:flex items-center ml-2 border-l border-gray-200 pl-4">
                <button 
                  onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-full transition-all duration-300 ${
                    isGlam 
                      ? 'hover:bg-[#f9ece0] icon-hover-glam' 
                      : 'hover:bg-[#fff0f2] icon-hover-skin'
                  }`}
                >
                  <Globe size={18} strokeWidth={1.5} />
                  <span className="text-xs font-bold font-sans uppercase">{currency.code}</span>
                  <ChevronDown size={14} strokeWidth={2} />
                </button>
                <AnimatePresence>
                  {isCurrencyOpen && (
                    <>
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40" onClick={() => setIsCurrencyOpen(false)} 
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full mt-4 right-0 w-48 rounded-2xl shadow-xl z-50 overflow-hidden border ${isGlam ? 'bg-[#faf9f6] border-[#e5b376]/20' : 'bg-white border-gray-100'}`}
                      >
                        <div className="py-2">
                          {currencies.map(c => (
                            <button
                              key={c.code}
                              onClick={() => {
                                setCurrencyByCode(c.code);
                                setIsCurrencyOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between transition-colors ${
                                currency.code === c.code 
                                  ? (isGlam ? 'bg-[#f4efe8] text-[#7a1b26] font-bold' : 'bg-[#fff0f2] text-[#ff9aa8] font-bold')
                                  : (isGlam ? 'text-gray-700 hover:bg-[#f4efe8]' : 'text-gray-700 hover:bg-gray-50')
                              }`}
                            >
                              <div className="flex items-center">
                                <span className="w-6 text-center font-bold mr-2">{c.symbol}</span>
                                <span>{c.code}</span>
                              </div>
                              <span className="text-xs text-gray-400">{c.name}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* The Segment Toggle */}
            <div 
              className={`hidden sm:flex relative items-center h-[38px] rounded-full cursor-pointer px-[16px] ml-2 transition-colors duration-500 border ${
                !isGlam ? 'bg-[#f8f6f6] border-[#f0d6df]' : 'bg-[#ffffff] border-[#e2d5c3]'
              }`}
              style={isGlam ? { boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.05)' } : {}}
              onClick={handleToggle}
            >
              <span className={`text-[10px] font-bold tracking-[0.15em] transition-colors duration-500 ${!isGlam ? 'text-[#f38ba5]' : 'text-[#a39a90]'}`}>
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
                  className={`relative flex items-center h-[42px] rounded-full cursor-pointer px-[18px] transition-colors duration-500 border w-fit ${
                    !isGlam ? 'bg-[#f8f6f6] border-[#f0d6df]' : 'bg-[#f4efe8] border-[#e2d5c3]'
                  }`}
                  onClick={() => { handleToggle(); setIsMenuOpen(false); }}
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

      <MegaMenu 
        isOpen={isShopMenuOpen} 
        onClose={() => setIsShopMenuOpen(false)} 
        onMouseEnter={handleShopEnter}
        onMouseLeave={handleShopLeave}
      />
    </header>
    <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
