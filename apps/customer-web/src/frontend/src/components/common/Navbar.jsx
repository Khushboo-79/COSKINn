import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, User, Search, Settings, Heart, Package, LogOut, Menu, MapPin, MessageSquare, Bell, HelpCircle, ShieldAlert, X, ChevronRight, ArrowLeft } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { skincareProducts } from '../../constants/skincareProducts';

import { ShopMegaMenu, CategoriesMegaMenu, RoutineMenu, JournalMenu } from './MegaMenus';
import MobileMenu from './MobileMenu';
import AuthModal from './AuthModal';

const CoskinnLogo = ({ isScrolled }) => (
  <svg className={`w-auto object-contain drop-shadow-sm transition-all duration-300 ${isScrolled ? 'h-[32px] lg:h-[38px]' : 'h-[42px] lg:h-[48px]'}`} viewBox="0 0 450 120" fill="none" xmlns="http://www.w3.org/2000/svg">
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

const prefetchPage = (pagePath) => {
  const cleanPath = pagePath.replace('/', '');
  if (cleanPath === 'skincare') {
    import('../../pages/SkincarePage').catch(() => {});
  } else if (cleanPath === 'cosmetics') {
    import('../../pages/CosmeticsPage').catch(() => {});
  } else if (cleanPath === 'about') {
    import('../../pages/AboutPage').catch(() => {});
  } else if (cleanPath === 'contact') {
    import('../../pages/ContactPage').catch(() => {});
  } else if (cleanPath.startsWith('account')) {
    import('../../pages/AccountPage').catch(() => {});
  } else if (cleanPath === 'checkout') {
    import('../../pages/CheckoutPage').catch(() => {});
  } else if (cleanPath === 'skincare/cleansing-balms') {
    import('../../pages/CleansingBalmPage').catch(() => {});
  } else if (cleanPath === 'skincare/sunscreens') {
    import('../../pages/SunscreenPage').catch(() => {});
  } else if (cleanPath === 'skincare/face-mist') {
    import('../../pages/FaceMistPage').catch(() => {});
  }
};

// Desktop Navigation Item Wrapper
const NavItem = ({ title, to, children, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);
  let timeoutRef = useRef(null);
  const location = useLocation();

  // Close dropdown immediately when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
    if (to) {
      prefetchPage(to);
    }
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
          {title}
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

const MobileProfileItem = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl hover:bg-black/5 active:bg-black/5 transition-colors text-black font-semibold text-left"
  >
    <div className="flex items-center gap-4">
      <Icon size={20} className="text-black/60" />
      <span className="text-[15px]">{label}</span>
    </div>
    <ChevronRight size={16} className="text-black/30" />
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
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dropdownRef = useRef(null);
  let timeoutRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

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
      prefetchPage('account');
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
      setIsMobileProfileOpen(true);
    } else {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleWishlistClick = () => {
    if (!user) {
      openAuthModal();
    } else {
      navigate('/account/wishlist');
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
        setIsMobileProfileOpen(false);
        setIsSearchOpen(false);
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

  // Prevent scroll when mobile menus are open
  useEffect(() => {
    if (isMobileMenuOpen || isMobileProfileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobileMenuOpen, isMobileProfileOpen]);

  // Check if we are on a Product Details Page
  const isProductPage = location.pathname.startsWith('/product/');
  const productId = isProductPage ? location.pathname.split('/')[2] : null;
  const product = productId ? skincareProducts.find(p => p.id === parseInt(productId)) : null;

  if (isProductPage && product) {
    return (
      <>
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 w-full z-[100] bg-white/95 backdrop-blur-xl border-b border-black/5 shadow-sm h-[60px] flex flex-col justify-center"
        >
          <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
            
            {/* Left: Back Button & Breadcrumbs */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)} 
                className="flex items-center gap-1 font-bold text-sm text-black hover:text-[#FF0069] transition-colors"
              >
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>

              {/* Desktop Breadcrumbs */}
              <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-black/50 border-l border-black/10 pl-4">
                <Link to="/" className="hover:text-[#FF0069] transition-colors">Home</Link>
                <ChevronRight size={12} />
                <Link to={`/${theme}`} className="hover:text-[#FF0069] transition-colors">Shop</Link>
                <ChevronRight size={12} />
                <span className="hover:text-[#FF0069] transition-colors cursor-pointer" onClick={() => navigate(-1)}>{product.category || 'Face Care'}</span>
                <ChevronRight size={12} />
                <span className="text-black font-bold truncate max-w-[200px] xl:max-w-[300px]">{product.name}</span>
              </div>
            </div>

            {/* Right: Icons (Search, Wishlist, Cart) */}
            <div className="flex items-center justify-end gap-5 lg:gap-6 text-black/80">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hover:text-[#FF0069] transition flex items-center justify-center"
              >
                <Search size={22} strokeWidth={1.5} />
              </button>
              <button
                onClick={handleWishlistClick}
                className="hover:text-[#FF0069] transition flex items-center justify-center"
              >
                <Heart size={22} strokeWidth={1.5} />
              </button>
              <button 
                onClick={openCart} 
                className="relative hover:text-[#FF0069] transition flex items-center"
              >
                <ShoppingBag size={22} strokeWidth={1.5} />
                <span className="absolute -top-1 -right-2 bg-theme-secondary text-white text-[10px] w-[16px] h-[16px] rounded-full flex items-center justify-center font-bold">{cartCount}</span>
              </button>
            </div>
          </div>
        </motion.nav>

        {/* Search sliding bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="fixed top-[60px] left-0 w-full bg-white border-b border-black/5 px-6 lg:px-12 py-3 flex items-center gap-3 z-[90]"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" size={18} />
                <input
                  type="text"
                  placeholder="Search for skincare, cosmetics, ingredients..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setIsSearchOpen(false);
                      navigate(`/${theme}?search=${encodeURIComponent(e.target.value)}`);
                    }
                  }}
                  className="w-full pl-12 pr-4 py-3 bg-black/5 border-none rounded-full outline-none font-medium text-sm text-black focus:ring-1 focus:ring-theme-primary transition-all"
                  autoFocus
                />
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-sm font-bold text-gray-500 hover:text-black transition-colors"
              >
                Cancel
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
      </>
    );
  }

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} // Premium ease curve
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-xl border-b border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]' : 'bg-transparent'
        }`}
    >
      {/* Top Theme Switcher Bar */}
      <div className={`w-full overflow-hidden transition-all duration-300 ${isScrolled ? 'h-0 opacity-0' : 'h-[60px] opacity-100 pt-4'}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-1 flex items-center justify-between font-body text-[13px] text-white">
          <div className="flex items-center gap-2"></div>

          {/* Pill Theme Switcher */}
          <div className="flex bg-white/40 p-1 rounded-full text-xs font-semibold backdrop-blur-sm">
            <button
              onClick={() => handleThemeSwitch('skincare')}
              className={`px-5 py-1 rounded-full transition-all duration-300 ${theme === 'skincare' ? 'bg-theme-primary text-white shadow-sm' : 'text-black hover:bg-white/50'}`}
            >
              Skincare
            </button>
            <button
              onClick={() => handleThemeSwitch('cosmetics')}
              className={`px-5 py-1 rounded-full transition-all duration-300 ${theme === 'cosmetics' ? 'bg-theme-primary text-white shadow-sm' : 'text-black hover:bg-white/50'}`}
            >
              Cosmetics
            </button>
          </div>
        </div>
      </div>

      <div className={`w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between relative transition-all duration-300 ${isScrolled ? 'py-3' : 'pb-4 mt-2'}`}>

        {/* Logo */}
        <Link to={`/${theme}`} className="flex flex-col items-start cursor-pointer group flex-shrink-0 relative z-[130]">
          <CoskinnLogo isScrolled={isScrolled} />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center justify-center gap-10 text-[20px] font-body text-black/90 flex-1 ml-10">
          <NavItem title="Home" to={`/${theme}`} isActive={location.pathname === `/${theme}`} />

          <NavItem title="Shop">
            <ShopMegaMenu theme={theme} />
          </NavItem>

          <NavItem title="Categories">
            <CategoriesMegaMenu theme={theme} />
          </NavItem>

          <NavItem title="Routine">
            <RoutineMenu theme={theme} />
          </NavItem>

          <NavItem title="About Us" to="/about" isActive={location.pathname === '/about'} />

          <NavItem title="Journal">
            <JournalMenu theme={theme} />
          </NavItem>

          <NavItem title="Contact" to="/contact" isActive={location.pathname === '/contact'} />
        </div>

        {/* Spacer for Mobile layout balancing */}
        <div className="flex-1 lg:hidden"></div>

        {/* Icons */}
        <div className="flex items-center justify-end gap-3 sm:gap-5 lg:gap-6 text-black/80 relative flex-shrink-0 z-[130]">
          {/* Search Icon */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hover:text-theme-primary transition flex items-center justify-center p-1"
          >
            <Search size={22} strokeWidth={1.5} />
          </button>

          {/* Wishlist Icon (Mobile only) */}
          <button
            onClick={handleWishlistClick}
            className="hover:text-theme-primary transition flex items-center justify-center p-1 lg:hidden"
          >
            <Heart size={22} strokeWidth={1.5} />
          </button>

          {/* User Profile */}
          <div
            className="relative flex items-center justify-center"
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
                    <img loading="lazy" src={user.avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full object-cover shadow-sm border border-white" />
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
                    <Link to="/account/profile" className="flex items-center gap-3 px-5 py-2.5 text-[14px] font-medium text-black/80 hover:bg-theme-primary/10 hover:text-black transition-colors">
                      <User size={16} /> My Profile
                    </Link>
                    <Link to="/account/orders" className="flex items-center gap-3 px-5 py-2.5 text-[14px] font-medium text-black/80 hover:bg-theme-primary/10 hover:text-black transition-colors">
                      <Package size={16} /> My Orders
                    </Link>
                    <Link to="/account/wishlist" className="flex items-center gap-3 px-5 py-2.5 text-[14px] font-medium text-black/80 hover:bg-theme-primary/10 hover:text-black transition-colors">
                      <Heart size={16} /> Wishlist
                    </Link>
                    <Link to="/account/settings" className="flex items-center gap-3 px-5 py-2.5 text-[14px] font-medium text-black/80 hover:bg-theme-primary/10 hover:text-black transition-colors">
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

          {/* Cart Icon */}
          <button 
            onClick={openCart} 
            onMouseEnter={() => prefetchPage('checkout')}
            className="relative hover:text-theme-primary transition flex items-center"
          >
            <ShoppingBag size={22} strokeWidth={1.5} />
            <span className="absolute -top-1 -right-2 bg-theme-secondary text-white text-[10px] w-[16px] h-[16px] rounded-full flex items-center justify-center font-bold">{cartCount}</span>
          </button>

          {/* Hamburger Menu */}
          <AnimatedHamburger isOpen={isMobileMenuOpen} toggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        </div>
      </div>

      {/* Search sliding bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="w-full bg-white border-t border-black/5 px-6 lg:px-12 py-3 flex items-center gap-3"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" size={18} />
              <input
                type="text"
                placeholder="Search for skincare, cosmetics, ingredients..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsSearchOpen(false);
                    navigate(`/${theme}?search=${encodeURIComponent(e.target.value)}`);
                  }
                }}
                className="w-full pl-12 pr-4 py-3 bg-black/5 border-none rounded-full outline-none font-medium text-sm text-black focus:ring-1 focus:ring-theme-primary transition-all"
                autoFocus
              />
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-sm font-bold text-gray-500 hover:text-black transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Navigation */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} theme={theme} />

      {/* Mobile Profile Menu Bottom Sheet */}
      <AnimatePresence>
        {isMobileProfileOpen && user && (
          <div className="fixed inset-0 z-[200] lg:hidden flex items-end justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileProfileOpen(false)}
              className="absolute inset-0 bg-black/45 backdrop-blur-[4px]"
            />
            
            {/* Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-h-[85vh] bg-white rounded-t-[32px] shadow-[0_-10px_30px_rgba(0,0,0,0.15)] flex flex-col z-10 overflow-hidden"
            >
              {/* Drag Indicator / Header */}
              <div className="flex flex-col items-center pt-4 pb-6 border-b border-black/5 shrink-0 px-6">
                <div className="w-12 h-1.5 bg-black/10 rounded-full mb-5" />
                <div className="flex items-center gap-4 w-full">
                  {user.avatarUrl ? (
                    <img loading="lazy" src={user.avatarUrl} alt="Avatar" className="w-14 h-14 rounded-full object-cover shadow-sm border border-white" />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-theme-primary text-white flex items-center justify-center text-xl font-bold shadow-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-black text-lg truncate leading-tight">{user.name}</h3>
                    <p className="text-sm text-gray-500 truncate">{user.email || 'No email added'}</p>
                  </div>
                  <button
                    onClick={() => setIsMobileProfileOpen(false)}
                    className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-black/60 hover:text-black transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Menu Options */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="flex flex-col gap-1 pb-8">
                  <MobileProfileItem
                    icon={User}
                    label="My Profile"
                    onClick={() => {
                      setIsMobileProfileOpen(false);
                      navigate('/account/profile');
                    }}
                  />
                  <MobileProfileItem
                    icon={Package}
                    label="My Orders"
                    onClick={() => {
                      setIsMobileProfileOpen(false);
                      navigate('/account/orders');
                    }}
                  />
                  <MobileProfileItem
                    icon={Heart}
                    label="My Wishlist"
                    onClick={() => {
                      setIsMobileProfileOpen(false);
                      navigate('/account/wishlist');
                    }}
                  />
                  <MobileProfileItem
                    icon={MapPin}
                    label="My Addresses"
                    onClick={() => {
                      setIsMobileProfileOpen(false);
                      navigate('/account/addresses');
                    }}
                  />
                  <MobileProfileItem
                    icon={MessageSquare}
                    label="My Reviews"
                    onClick={() => {
                      setIsMobileProfileOpen(false);
                      navigate('/account/reviews');
                    }}
                  />
                  <MobileProfileItem
                    icon={Bell}
                    label="Notifications"
                    onClick={() => {
                      setIsMobileProfileOpen(false);
                      navigate('/account/notifications');
                    }}
                  />
                  <MobileProfileItem
                    icon={Settings}
                    label="Settings"
                    onClick={() => {
                      setIsMobileProfileOpen(false);
                      navigate('/account/settings');
                    }}
                  />
                  <MobileProfileItem
                    icon={HelpCircle}
                    label="Help & Support"
                    onClick={() => {
                      setIsMobileProfileOpen(false);
                      navigate('/contact');
                    }}
                  />
                  <MobileProfileItem
                    icon={ShieldAlert}
                    label="Privacy Policy"
                    onClick={() => {
                      setIsMobileProfileOpen(false);
                      navigate('/contact');
                    }}
                  />
                  
                  <div className="pt-4 mt-2 border-t border-black/5">
                    <button
                      onClick={() => {
                        setIsMobileProfileOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-red-500 hover:bg-red-50 transition-colors font-bold text-left"
                    >
                      <LogOut size={20} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Authentication Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />

    </motion.nav>
  );
}
