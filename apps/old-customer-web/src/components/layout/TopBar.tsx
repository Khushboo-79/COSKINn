import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const TopBar: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  const OfferContent = () => (
    <div className="flex items-center space-x-6 md:space-x-12 px-3 md:px-6">
      {isGlam ? (
        <>
          <span className="hidden md:inline-block">FREE SHIPPING OVER $40</span>
          <span className="w-1 h-1 rounded-full bg-white/70 hidden md:inline-block"></span>
          <span>COMPLIMENTARY ENGRAVING ON LIPSTICKS</span>
          <span className="w-1 h-1 rounded-full bg-white/70"></span>
          <span>EARN 2X LOYALTY THIS WEEKEND</span>
          <span className="w-1 h-1 rounded-full bg-white/70 hidden md:inline-block"></span>
          <span className="hidden md:inline-block">FREE SHIPPING OVER $40</span>
          <span className="w-1 h-1 rounded-full bg-white/70"></span>
        </>
      ) : (
        <>
          <span className="hidden md:inline-block">FREE 3-PIECE JUICY SET OVER $60</span>
          <span className="w-1 h-1 rounded-full bg-white/70 hidden md:inline-block"></span>
          <span>EARN 2X LOYALTY THIS WEEKEND</span>
          <span className="w-1 h-1 rounded-full bg-white/70"></span>
          <span>FREE SHIPPING OVER $40</span>
          <span className="w-1 h-1 rounded-full bg-white/70 hidden md:inline-block"></span>
          <span className="hidden md:inline-block">FREE 3-PIECE JUICY SET OVER $60</span>
          <span className="w-1 h-1 rounded-full bg-white/70"></span>
        </>
      )}
    </div>
  );

  return (
    <div className={`w-full py-2.5 text-[9px] md:text-[11px] font-bold tracking-[0.15em] uppercase flex items-center transition-colors duration-500 overflow-hidden whitespace-nowrap ${
      isGlam ? 'bg-[#7a1b26] text-white' : 'bg-gradient-to-r from-[#FF92A5] via-[#FF859D] to-[#FF92A5] text-white'
    }`}>
      <div className="flex animate-marquee w-max hover:[animation-play-state:paused]">
        <OfferContent />
        <OfferContent />
        <OfferContent />
        <OfferContent />
      </div>
    </div>
  );
};

export default TopBar;
