import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function RoutinePage() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-20 ${theme === 'cosmetics' ? 'bg-theme-dark text-white' : 'bg-theme-bg text-theme-dark'}`}>
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-heading font-black mb-8"
        >
          Discover Your Routine
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl opacity-80 max-w-3xl mb-16"
        >
          Whether you're looking for a simple 3-step daily habit or a complete 10-step luxury experience, find the perfect combination of COSKINn products tailored just for you.
        </motion.p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {['Morning Routine', 'Night Routine', 'Dry Skin Routine', 'Oily Skin Routine', 'Combination Skin Routine', 'Sensitive Skin Routine', 'Glow Routine', 'Complete Routine'].map((routine, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (i * 0.05) }}
              className="p-8 border border-theme-primary/20 rounded-3xl backdrop-blur-sm hover:border-theme-primary/50 transition-colors cursor-pointer group"
            >
              <h3 className="text-2xl font-bold font-heading mb-3 group-hover:text-theme-primary transition-colors">{routine}</h3>
              <p className="opacity-70 text-sm">Curated steps for optimal results.</p>
              <div className="mt-6 flex items-center gap-2 text-sm font-bold text-theme-primary">
                Explore <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
