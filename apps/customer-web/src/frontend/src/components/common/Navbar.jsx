import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, User, Search, Settings, Heart, Package, LogOut, Menu } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

import { ShopMegaMenu, CategoriesMegaMenu, RoutineMenu, JournalMenu } from './MegaMenus';
import MobileMenu from './MobileMenu';
import AuthModal from './AuthModal';

const CoskinnLogo = () => (
  <svg className="h-[42px] lg:h-[48px] w-auto object-contain drop-shadow-sm" viewBox="0 0 450 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="coskinn-logo-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FF0069" />  {/* Hot Pink */}
        <stop offset="35%" stopColor="#FF6B6B" /> {/* Coral */}
        <stop offset="70%" stopColor="#FFA07A" /> {/* Soft Orange */}
        <stop offset="100%" stopColor="#FFD498" /> {/* Warm Peach */}
      </linearGradient>
    </defs>

    {/* The elegant script 'C' matching the reference */}
    <path
      d="
        M 72 20
        A 8 8 0 1 1 62 30
        C 52 20, 35 30, 30 55
        C 25 80, 40 95, 60 95
        C 70 95, 85 82, 85 82
        C 85 82, 95 92, 75 105
        C 45 118, 10 105, 8 60
        C 5 15, 45 2, 72 20
        Z
      "
      fill="url(#coskinn-logo-grad)"
    />

    {/* The small outlined heart nestled inside the C */}
    <path
      d="
        M 75 92
        C 75 92, 65 82, 65 74
        A 6 6 0 0 1 75 70
        A 6 6 0 0 1 85 74
        C 85 82, 75 92, 75 92
        Z
      "
      stroke="url(#coskinn-logo-grad)"
      strokeWidth="3.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* The text OSKINn */}
    <text
      x="105"
      y="95"
      fontFamily="var(--font-heading)"
      fill="black"
    >
      <tspan fontSize="85" fontWeight="600" letterSpacing="2">OSKIN</tspan>
      <tspan fontSize="65" fontWeight="600">n</tspan>
    </text>

    {/* The solid heart replacing the 'I' dot */}
    <path
      d="
        M 280 40
        C 280 40, 266 28, 266 18
        A 7 7 0 0 1 280 15
        A 7 7 0 0 1 294 18
        C 294 28, 280 40, 280 40
        Z
      "
      fill="url(#coskinn-logo-grad)"
    />
  </svg>
);

// Desktop Navigation Item Wrapper
const NavItem = ({ title, to, children, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);
  let timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div
      className="relative flex items-center justify-center h-full py-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {to ? (
        <Link
          to={to}
          className={`flex items-center gap-1 hover:text-theme-primary transition-colors focus:outline-none ${isActive ? "text-black font-semibold" : ""}`}
        >
          {title}
        </Link>
      ) : (
        <button className="flex items-center gap-1 hover:text-theme-primary transition-colors cursor-pointer font-medium focus:outline-none">
          {title} {children && <span className="text-[10px] ml-1 mt-0.5 opacity-60">▼</span>}
        </button>
      )}

      <AnimatePresence>
        {isOpen && children && (
          <div className="absolute top-full mt-0">
            {children}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AnimatedHamburger = ({ isOpen, toggle }) => (
  <button
    onClick={toggle}
    aria-label="Toggle mobile menu"
    className="lg:hidden flex flex-col justify-center items-center w-8 h-8 relative z-[130] ml-2"
  >
    <motion.span
      animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
      className="absolute w-6 h-[2px] bg-black block rounded-full"
    />
    <motion.span
      animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
      className="absolute w-6 h-[2px] bg-black block rounded-full"
    />
    <motion.span
      animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
      className="absolute w-6 h-[2px] bg-black block rounded-full"
    />
  </button>
);

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthModalOpen, setIsAuthModalOpen, openAuthModal, closeAuthModal } = useAuth();
  const { cartCount, openCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname.split('/')[1];
    if ((currentPath === 'skincare' || currentPath === 'cosmetics') && theme !== currentPath) {
      toggleTheme(currentPath);
    }
  }, [location.pathname, theme, toggleTheme]);

  const handleThemeSwitch = (newTheme) => {
    if (theme !== newTheme) {
      toggleTheme(newTheme);
      navigate(`/${newTheme}`);
    }
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  let timeoutRef = useRef(null);

  // Scroll Animation Logic
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    // Determine if we've scrolled past the very top
    if (latest <= 50) {
      setIsScrolled(false);
      setHidden(false);
    } else {
      setIsScrolled(true);
      // Only hide if we are scrolling down, we've scrolled past a threshold, and dropdowns are closed
      if (latest > previous && latest > 150 && !isDropdownOpen && !isMobileMenuOpen) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    }
  });

  // Handle Desktop Hover for User Profile
  const handleMouseEnter = () => {
    if (window.innerWidth >= 1024 && user) {
      clearTimeout(timeoutRef.current);
      setIsDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      timeoutRef.current = setTimeout(() => {
        setIsDropdownOpen(false);
      }, 150);
    }
  };

  const handleToggleClick = () => {
    if (!user) {
      openAuthModal();
    } else if (window.innerWidth < 1024) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
        closeAuthModal();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobileMenuOpen]);

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} // Premium ease curve
      className={`fixed top-0 left-0 w-full z-[100] transition-colors duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-xl border-b border-black/5 shadow-sm' : 'bg-transparent'
        }`}
    >
      {/* Top Theme Switcher Bar */}
      <div className="w-full pt-1">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-2 flex items-center justify-between font-body text-[13px] text-white">
          <div className="flex items-center gap-2"></div>

          {/* Pill Theme Switcher */}
          <div className="flex bg-white/40 p-1 rounded-full text-xs font-semibold backdrop-blur-sm">
            <button
              onClick={() => handleThemeSwitch('skincare')}
              className={`px-5 py-1.5 rounded-full transition-all duration-300 ${theme === 'skincare' ? 'bg-black text-white shadow-sm' : 'text-black hover:bg-white/50'}`}
            >
              Skincare
            </button>
            <button
              onClick={() => handleThemeSwitch('cosmetics')}
              className={`px-5 py-1.5 rounded-full transition-all duration-300 ${theme === 'cosmetics' ? 'bg-black text-white shadow-sm' : 'text-black hover:bg-white/50'}`}
            >
              Cosmetics
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 pb-4 flex items-center justify-between mt-2 relative">

        {/* Logo */}
        <Link to={`/${theme}`} className="flex flex-col items-start cursor-pointer group flex-shrink-0 relative z-[130]">
          <CoskinnLogo />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center justify-center gap-10 text-[20px] font-body text-black/90 flex-1 ml-10">
          <NavItem title="Home" to={`/${theme}`} isActive={location.pathname === `/${theme}`} />

          <NavItem title="Shop">
            <ShopMegaMenu />
          </NavItem>

          <NavItem title="Categories">
            <CategoriesMegaMenu theme={theme} />
          </NavItem>

          <NavItem title="Routine">
            <RoutineMenu />
          </NavItem>

          <NavItem title="About Us" to="/about" isActive={location.pathname === '/about'} />

          <NavItem title="Journal">
            <JournalMenu />
          </NavItem>

          <NavItem title="Contact" to="/contact" isActive={location.pathname === '/contact'} />
        </div>

        {/* Spacer for Mobile layout balancing */}
        <div className="flex-1 lg:hidden"></div>

        {/* Icons */}
        <div className="flex items-center justify-end gap-5 lg:gap-6 text-black/80 relative flex-shrink-0 z-[130]">
          <button className="hover:text-theme-primary transition hidden sm:block"><Search size={22} strokeWidth={1.5} /></button>

          {/* User Profile Dropdown */}
          <div
            className="relative hidden sm:flex items-center justify-center"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={handleToggleClick}
              className={`hover:text-theme-primary transition p-1 rounded-full flex items-center gap-2 ${isDropdownOpen ? 'bg-black/5' : ''}`}
            >
              {user ? (
                <>
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full object-cover shadow-sm border border-white" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-theme-primary text-white flex items-center justify-center font-bold text-[14px] shadow-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-[14px] font-bold text-black hidden sm:block">{user.name.split(' ')[0]}</span>
                </>
              ) : (
                <User size={24} strokeWidth={1.5} />
              )}
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-[120%] right-0 lg:-right-4 w-64 bg-white/80 backdrop-blur-xl border border-white/60 rounded-[18px] shadow-[0_20px_50px_rgba(43,89,104,0.15)] overflow-hidden z-[100] py-2"
                >
                  <div className="flex flex-col">
                    <Link to="/account" className="flex items-center gap-3 px-5 py-2.5 text-[14px] font-medium text-black/80 hover:bg-theme-primary/10 hover:text-black transition-colors">
                      <User size={16} /> My Account
                    </Link>
                    <Link to="/account?tab=orders" className="flex items-center gap-3 px-5 py-2.5 text-[14px] font-medium text-black/80 hover:bg-theme-primary/10 hover:text-black transition-colors">
                      <Package size={16} /> My Orders
                    </Link>
                    <Link to="/account?tab=wishlist" className="flex items-center gap-3 px-5 py-2.5 text-[14px] font-medium text-black/80 hover:bg-theme-primary/10 hover:text-black transition-colors">
                      <Heart size={16} /> Wishlist
                    </Link>
                    <Link to="/account?tab=settings" className="flex items-center gap-3 px-5 py-2.5 text-[14px] font-medium text-black/80 hover:bg-theme-primary/10 hover:text-black transition-colors">
                      <Settings size={16} /> Settings
                    </Link>
                    <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-5 py-2.5 mx-4 mb-3 mt-3 text-[14px] font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl shadow-sm hover:shadow-md transition-all">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={openCart} className="relative hover:text-theme-primary transition flex items-center">
            <ShoppingBag size={22} strokeWidth={1.5} />
            <span className="absolute -top-1 -right-2 bg-theme-secondary text-white text-[10px] w-[16px] h-[16px] rounded-full flex items-center justify-center font-bold">{cartCount}</span>
          </button>

          <AnimatedHamburger isOpen={isMobileMenuOpen} toggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} theme={theme} />

      {/* Authentication Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />

    </motion.nav>
  );
}
