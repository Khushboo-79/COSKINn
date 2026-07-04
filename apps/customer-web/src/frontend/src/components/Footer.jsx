import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="w-full bg-theme-surface py-10 border-t border-gray-100 flex flex-col items-center justify-center text-gray-500 transition-colors duration-500">
      <div className="text-2xl font-heading text-theme-dark font-bold mb-4">
        {theme === 'skincare' ? 'Glowē' : 'Luxe'}
      </div>
      <p className="text-sm font-body">© {new Date().getFullYear()} {theme === 'skincare' ? 'Glowē Skincare' : 'Luxe Cosmetics'}. All rights reserved.</p>
    </footer>
  );
}
