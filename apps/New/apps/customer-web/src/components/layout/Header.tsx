import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Menu, Search, ShoppingBag, User, Heart, Droplets, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { mode, toggleMode } = useTheme();
  const isGlam = mode === 'glam';

  return (
    <header className={`sticky top-0 z-50 w-full backdrop-blur-md transition-colors duration-500 ease-in-out ${
      isGlam ? 'bg-[#faf9f6]/90 border-b border-[#e5b376]/20' : 'bg-white/90 border-b border-gray-100'
    }`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Left Navigation */}
          <div className="hidden md:flex space-x-8 items-center flex-1">
            <Link to="/" className={`text-sm transition-colors ${isGlam ? 'text-gray-800 hover:text-[#7a1b26]' : 'text-gray-800 hover:text-[#ff9aa8]'}`}>Home</Link>
            {['Cleansers', 'Serums', 'Moisturisers', 'Masks', 'Sun Care'].map((item) => (
              <Link 
                key={item} 
                to={`/collections/${item.toLowerCase()}`}
                className={`text-sm font-bold tracking-wide transition-colors ${
                  isGlam 
                    ? 'text-[#2a2a2a] hover:text-[#7a1b26]' 
                    : 'text-gray-800 hover:text-[#ff9aa8]'
                }`}
              >
                {item}
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Icon */}
          <div className="flex md:hidden flex-1">
            <button className={`p-2 -ml-2 text-gray-800 ${isGlam ? 'hover:text-[#7a1b26]' : 'hover:text-[#ff9aa8]'}`}>
              <Menu size={24} />
            </button>
          </div>

          {/* Center Logo */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center flex-1">
            <Link to="/" className="text-3xl tracking-widest font-extrabold text-[#2a2a2a] flex items-center font-display">
              COSKIN<span className={isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}>n</span>
            </Link>
            <span className={`text-[9px] uppercase tracking-[0.3em] mt-1 font-bold ${isGlam ? 'text-[#cfa473] font-serif' : 'text-[#e5b376]'}`}>
              {isGlam ? 'Atelier de Beauté' : 'Skin · Refresh · Repeat'}
            </span>
          </div>

          {/* Right Actions & Toggle */}
          <div className="flex flex-1 justify-end items-center space-x-4 md:space-x-6">
            
            <div className="hidden md:flex items-center space-x-4 text-gray-800">
              <button className={`transition-colors ${isGlam ? 'hover:text-[#7a1b26]' : 'hover:text-[#ff9aa8]'}`}><Search size={20} /></button>
              <Link to="/login" className={`transition-colors ${isGlam ? 'hover:text-[#7a1b26]' : 'hover:text-[#ff9aa8]'}`}>
                <User size={20} />
              </Link>
              <button className={`transition-colors ${isGlam ? 'hover:text-[#7a1b26]' : 'hover:text-[#ff9aa8]'}`}><Heart size={20} /></button>
              <button className={`transition-colors relative ${isGlam ? 'hover:text-[#7a1b26]' : 'hover:text-[#ff9aa8]'}`}>
                <ShoppingBag size={20} />
              </button>
            </div>

            {/* The Segment Toggle */}
            <div className="flex items-center border border-gray-200 rounded-full p-1 bg-white shadow-sm cursor-pointer relative w-36 h-10" onClick={toggleMode}>
              {/* Sliding Thumb */}
              <div 
                className={`absolute top-1 bottom-1 w-12 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out z-10 shadow-md ${
                  isGlam ? 'left-[calc(100%-3.25rem)] bg-[#7a1b26]' : 'left-1 bg-gradient-to-r from-[#ff9aa8] to-[#99e6d8]'
                }`}
              >
                {isGlam ? <Sparkles size={14} className="text-white" /> : <Droplets size={14} className="text-white opacity-90" />}
              </div>

              <div className="flex w-full justify-between items-center px-4 relative z-0">
                <span className={`text-[10px] font-bold tracking-wider transition-colors duration-300 ${!isGlam ? 'text-transparent' : 'text-gray-400'}`}>
                  SKIN
                </span>
                <span className={`text-[10px] font-bold tracking-wider transition-colors duration-300 ${isGlam ? 'text-transparent' : 'text-gray-400'}`}>
                  GLAM
                </span>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
