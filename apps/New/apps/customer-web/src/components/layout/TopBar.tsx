import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const TopBar: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  return (
    <div className={`w-full py-2 px-4 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-center flex justify-center items-center space-x-8 sm:space-x-12 transition-colors duration-500 overflow-hidden whitespace-nowrap ${
      isGlam ? 'bg-[#7a1b26] text-white' : 'bg-[#ff9aa8] text-white'
    }`}>
      <span className="hidden lg:inline-block">FREE SHIPPING OVER $40</span>
      <span className="hidden lg:inline-block">•</span>
      <span>FREE 3-PIECE JUICY SET OVER $60</span>
      <span className="hidden md:inline-block">•</span>
      <span className="hidden md:inline-block">EARN 2x LOYALTY THIS WEEKEND</span>
    </div>
  );
};

export default TopBar;
