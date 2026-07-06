import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-20 ${theme === 'cosmetics' ? 'bg-theme-dark text-white' : 'bg-theme-bg text-theme-dark'}`}>
      <div className="max-w-5xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-heading font-black mb-8"
        >
          About COSKINn
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid gap-12"
        >
          <section>
            <h2 className="text-3xl font-heading font-bold mb-4 text-theme-primary">Our Story</h2>
            <p className="text-lg opacity-80 leading-relaxed max-w-3xl">COSKINn was born from a desire to merge high-performance skincare with effortless beauty. Our journey started with a simple belief: that luxury beauty should be accessible, effective, and beautifully crafted.</p>
          </section>

          <section>
            <h2 className="text-3xl font-heading font-bold mb-4 text-theme-primary">Our Mission & Brand Philosophy</h2>
            <p className="text-lg opacity-80 leading-relaxed max-w-3xl">To empower every individual to feel confident in their own skin through clean, science-backed formulas that deliver real results.</p>
          </section>

          <section className="grid md:grid-cols-2 gap-8 mt-10">
            <div className="p-8 border border-theme-primary/20 rounded-2xl backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Fruit Powered Ingredients</h3>
              <p className="opacity-70">Harnessing the potent antioxidants of nature.</p>
            </div>
            <div className="p-8 border border-theme-primary/20 rounded-2xl backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Cruelty Free</h3>
              <p className="opacity-70">Never tested on animals, always tested on real skin.</p>
            </div>
            <div className="p-8 border border-theme-primary/20 rounded-2xl backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Dermatologist Tested</h3>
              <p className="opacity-70">Clinically proven for safety and efficacy.</p>
            </div>
            <div className="p-8 border border-theme-primary/20 rounded-2xl backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Sustainability</h3>
              <p className="opacity-70">Committed to eco-friendly packaging and ethical sourcing.</p>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-3xl font-heading font-bold mb-4 text-theme-primary">Why Choose COSKINn</h2>
            <p className="text-lg opacity-80 leading-relaxed max-w-3xl">Because we don't compromise. Our promise is premium quality without the premium markup.</p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
