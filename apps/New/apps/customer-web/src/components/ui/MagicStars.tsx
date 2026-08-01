import React from 'react';
import { Sparkle } from 'lucide-react';

export const MagicStars = ({ isGlam }: { isGlam: boolean }) => {
  // Use distinct magic colors based on the theme (Gold for Glam, Pink for Skin)
  const color = isGlam ? 'text-[#cfa473]' : 'text-[#ff9aa8]';
  
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      {/* Top Left Star */}
      <Sparkle 
        className={`absolute -top-3 -left-3 w-3 h-3 ${color} opacity-0 scale-50 -rotate-45 group-hover:opacity-90 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 ease-out`} 
        fill="currentColor"
        strokeWidth={1}
      />
      {/* Bottom Right Star */}
      <Sparkle 
        className={`absolute -bottom-2 -right-3 w-4 h-4 ${color} opacity-0 scale-50 rotate-45 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-90 transition-all duration-700 ease-out delay-75`} 
        fill="currentColor"
        strokeWidth={1}
      />
      {/* Middle Right Star */}
      <Sparkle 
        className={`absolute top-1 -right-4 w-2 h-2 ${color} opacity-0 scale-50 rotate-12 group-hover:opacity-70 group-hover:scale-110 group-hover:-rotate-45 transition-all duration-300 ease-out delay-150`} 
        fill="currentColor"
        strokeWidth={1}
      />
    </div>
  );
};
