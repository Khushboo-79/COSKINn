import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, User, Search, Settings, Heart, Package, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CoskinnLogo = () => (
  <svg className="h-[42px] lg:h-[48px] w-auto object-contain" viewBox="0 0 300 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="coskinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--color-logoStart)" />
        <stop offset="100%" stopColor="var(--color-logoEnd)" />
      </linearGradient>
    </defs>

    <g transform="translate(-5, 0) scale(0.6)">
      {/* 1:1 Pixel-Perfect Geometric Vector Trace of the C */}
      <path 
        d="M 60 0 
           A 50 50 0 0 0 10 50 
           A 50 50 0 0 0 60 100 
           C 80 100, 90 90, 95 80
           C 90 75, 85 75, 80 80
           A 40 40 0 0 1 60 90
           A 40 40 0 0 1 20 50
           A 40 40 0 0 1 60 10
           C 75 10, 80 20, 80 30
           A 8 8 0 0 0 96 30
           C 96 10, 75 0, 60 0 Z" 
        fill="url(#coskinGrad)" 
      />
      
      {/* 1:1 Precision Nested Calligraphy Heart */}
      <g transform="rotate(-15 100 75)">
        <path 
          fillRule="evenodd" clipRule="evenodd"
          d="M 100 95 
             C 85 85, 80 70, 90 60 
             C 95 55, 100 60, 100 65 
             C 100 60, 105 55, 110 60 
             C 120 70, 115 85, 100 95 
             M 100 88 
             C 110 80, 112 70, 107 65 
             C 104 62, 100 65, 100 68 
             C 100 65, 96 62, 93 65 
             C 88 70, 90 80, 100 88 Z" 
          fill="url(#coskinGrad)" 
        />
      </g>
    </g>

    {/* OSKINn */}
    <text x="70" y="58" fontFamily="var(--font-heading)" fontSize="50" fontWeight="700" letterSpacing="1.5" fill="var(--color-dark)">
      OSKIN<tspan fontSize="42" dy="-1">n</tspan>
    </text>

    {/* Solid Heart over the I */}
    <g transform="translate(184, 6) scale(0.6)">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="url(#coskinGrad)" />
    </g>
  </svg>
);

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  let timeoutRef = useRef(null);

  // Handle Desktop Hover
  const handleMouseEnter = () => {
    if (window.innerWidth >= 1024) {
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

  // Handle Mobile Tap
  const handleToggleClick = () => {
    if (window.innerWidth < 1024) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  // Click outside & ESC key to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleEsc = (event) => {
      if (event.key === 'Escape') setIsDropdownOpen(false);
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
    navigate('/login');
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      {/* Top Announcement Bar */}
      <div className="w-full bg-theme-announcementBg">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-2 flex items-center justify-between font-body text-[13px] text-white">
          <div className="flex items-center gap-2">
            <span className="text-theme-secondary text-sm">⭐</span>
            <span>Free Shipping on Orders Over ₹999 | 20% Off on Your First Order</span>
          </div>

          {/* Pill Theme Switcher */}
          <div className="flex bg-white/40 p-1 rounded-full text-xs font-semibold backdrop-blur-sm">
            <button
              onClick={() => toggleTheme('skincare')}
              className={`px-5 py-1.5 rounded-full transition-all duration-300 ${theme === 'skincare' ? 'bg-theme-dark text-white shadow-sm' : 'text-theme-dark hover:bg-white/50'}`}
            >
              Skincare
            </button>
            <button
              onClick={() => toggleTheme('cosmetics')}
              className={`px-5 py-1.5 rounded-full transition-all duration-300 ${theme === 'cosmetics' ? 'bg-theme-dark text-white shadow-sm' : 'text-theme-dark hover:bg-white/50'}`}
            >
              Cosmetics
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-8 lg:px-12 pt-6 pb-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex flex-col items-start cursor-pointer group">
          <CoskinnLogo />
          <span className="text-[11px] tracking-[0.35em] text-theme-dark font-semibold mt-[2px] ml-1 font-body">
            {theme === 'skincare' ? 'Skincare' : 'Cosmetics'}
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center justify-center gap-10 text-[15px] font-body font-medium text-theme-dark/90 flex-1 ml-10">
          <Link to="/" className="text-theme-dark relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-theme-dark font-semibold">Home</Link>
          <a href="#" className="flex items-center gap-1 hover:text-theme-dark transition-colors">Shop <span className="text-xs">▼</span></a>
          <a href="#" className="flex items-center gap-1 hover:text-theme-dark transition-colors">Categories <span className="text-xs">▼</span></a>
          <a href="#" className="hover:text-theme-dark transition-colors">About Us</a>
          <a href="#" className="hover:text-theme-dark transition-colors">Blog</a>
          <a href="#" className="hover:text-theme-dark transition-colors">Contact</a>
        </div>

        {/* Icons */}
        <div className="flex items-center justify-end gap-5 lg:gap-6 text-theme-dark/80 relative">
          <button className="hover:text-theme-dark transition"><Search size={22} strokeWidth={1.5} /></button>

          {/* User Profile Dropdown */}
          <div
            className="relative flex items-center justify-center"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={handleToggleClick}
              className={`hover:text-theme-dark transition p-1 rounded-full ${isDropdownOpen ? 'bg-white/20' : ''}`}
            >
              <User size={24} strokeWidth={1.5} className={user ? 'text-theme-dark fill-theme-dark/10' : ''} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-[120%] right-0 w-64 bg-white/80 backdrop-blur-xl border border-white/60 rounded-[18px] shadow-[0_20px_50px_rgba(43,89,104,0.15)] overflow-hidden z-[100] py-2"
                >
                  {user ? (
                    <>
                      <div className="px-5 py-3 border-b border-theme-primary/20 mb-1">
                        <p className="text-[14px] font-bold text-theme-dark truncate">{user.name}</p>
                        <p className="text-[12px] font-medium text-theme-dark/80 truncate">{user.email}</p>
                      </div>
                      <div className="flex flex-col">
                        <a href="#" className="flex items-center gap-3 px-5 py-2.5 text-[14px] font-medium text-theme-dark/80 hover:bg-theme-primary/10 hover:text-theme-dark transition-colors">
                          <User size={16} /> My Profile
                        </a>
                        <a href="#" className="flex items-center gap-3 px-5 py-2.5 text-[14px] font-medium text-theme-dark/80 hover:bg-theme-primary/10 hover:text-theme-dark transition-colors">
                          <Package size={16} /> My Orders
                        </a>
                        <a href="#" className="flex items-center gap-3 px-5 py-2.5 text-[14px] font-medium text-theme-dark/80 hover:bg-theme-primary/10 hover:text-theme-dark transition-colors">
                          <Heart size={16} /> Wishlist
                        </a>
                        <a href="#" className="flex items-center gap-3 px-5 py-2.5 text-[14px] font-medium text-theme-dark/80 hover:bg-theme-primary/10 hover:text-theme-dark transition-colors">
                          <Settings size={16} /> Settings
                        </a>
                        <button onClick={handleLogout} className="flex items-center gap-3 px-5 py-2.5 text-[14px] font-bold text-theme-accent hover:bg-red-50/50 transition-colors w-full text-left mt-1 border-t border-theme-primary/10">
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 flex flex-col gap-3">
                      <Link
                        to="/login"
                        onClick={() => setIsDropdownOpen(false)}
                        className="w-full text-center bg-theme-dark text-white hover:bg-theme-primary hover:text-theme-dark py-2.5 rounded-xl text-[14px] font-bold transition-all shadow-md hover:shadow-lg"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsDropdownOpen(false)}
                        className="w-full text-center bg-white/50 text-theme-dark border border-theme-primary/30 hover:bg-theme-primary/10 py-2.5 rounded-xl text-[14px] font-bold transition-all"
                      >
                        Create Account
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button className="relative hover:text-theme-dark transition flex items-center">
            <ShoppingBag size={22} strokeWidth={1.5} />
            <span className="absolute -top-1 -right-2 bg-theme-secondary text-white text-[10px] w-[16px] h-[16px] rounded-full flex items-center justify-center font-bold">0</span>
          </button>
        </div>

      </div>
    </nav>
  );
}
