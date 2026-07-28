import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Sparkles } from 'lucide-react';

export default function ThemeToggle({ theme, onToggle }) {
  const isSkincare = theme === 'skincare';

  return (
    <div 
      className={`relative flex items-center w-[140px] h-[34px] rounded-full cursor-pointer border px-[14px] mr-2 transition-colors duration-300
        ${isSkincare 
          ? 'bg-white border-primary/20 shadow-sm' 
          : 'bg-white border-black/10 shadow-sm'
        }`}
      onClick={() => onToggle(isSkincare ? 'cosmetics' : 'skincare')}
    >
      {/* Background active indicator (sliding circle) */}
      <motion.div
        className="absolute top-[3px] bottom-[3px] w-[26px] rounded-full shadow-sm flex items-center justify-center z-10"
        animate={{
          left: isSkincare ? '50%' : '80%',
          x: '-50%',
          backgroundColor: isSkincare ? '#FBCFE8' : '#E5E7EB', // matching the gradient style in the reference
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {isSkincare ? (
           <Droplets size={13} className="text-[#F472B6]" strokeWidth={2.5} />
        ) : (
           <Sparkles size={13} className="text-black/60" strokeWidth={2.5} />
        )}
      </motion.div>

      {/* Skincare Text */}
      <div className={`relative z-0 flex-1 flex justify-start text-[10px] font-bold tracking-widest transition-colors ${isSkincare ? 'text-[#F472B6]' : 'text-black/40'}`}>
        SKIN
      </div>

      {/* Cosmetics Text */}
      <div className={`relative z-0 flex-1 flex justify-end pr-2 text-[10px] font-bold tracking-widest transition-colors ${!isSkincare ? 'text-black/80' : 'text-black/40'}`}>
        GLAM
      </div>
    </div>
  );
}
