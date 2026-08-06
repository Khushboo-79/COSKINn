import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function JournalPage() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-20 ${theme === 'cosmetics' ? 'bg-theme-dark text-white' : 'bg-theme-bg text-theme-dark'}`}>
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-heading font-black mb-8"
        >
          The Journal
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl opacity-80 max-w-3xl mb-16"
        >
          Stories, guides, and insights from the world of luxury beauty. Explore our latest articles on skincare science, makeup trends, and behind-the-scenes at COSKINn.
        </motion.p>
        
        <div className="flex gap-4 overflow-x-auto pb-4 mb-12 scrollbar-hide">
          {['All', 'Skincare Tips', 'Beauty Guides', 'Ingredient Stories', 'Makeup Tutorials', 'Seasonal Care', 'Trends', 'Product Launches'].map((cat, i) => (
            <button key={i} className={`whitespace-nowrap px-6 py-2 rounded-full border ${i === 0 ? 'bg-theme-primary text-white border-theme-primary' : 'border-theme-primary/30 hover:border-theme-primary'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((article, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.05) }}
              className="group cursor-pointer"
            >
              <div className="w-full aspect-[4/3] bg-theme-primary/10 rounded-2xl mb-6 overflow-hidden">
                <div className="w-full h-full bg-black/5 group-hover:scale-105 transition-transform duration-700"></div>
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-theme-primary mb-3">Ingredient Stories</div>
              <h3 className="text-2xl font-bold font-heading mb-3 group-hover:text-theme-primary transition-colors">The Science Behind Fruit Powered Antioxidants</h3>
              <p className="opacity-70 text-sm line-clamp-2">Discover how we harness the power of nature to protect and rejuvenate your skin barrier.</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
