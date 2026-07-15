import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PolicyLayout({ title, lastUpdated, children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDFD]">
      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-32 pb-20 px-6 lg:px-12 text-center bg-gradient-to-b from-[#FFF5F8] to-[#FFFDFD]">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl lg:text-5xl font-heading font-black text-[#1B1B1B] mb-6"
        >
          {title}
        </motion.h1>
        {lastUpdated && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[#FF2D7A] font-bold tracking-widest uppercase text-xs"
          >
            Last Updated: {lastUpdated}
          </motion.p>
        )}
      </section>

      {/* 2. CONTENT SECTION */}
      <section className="pb-24 px-6 lg:px-12 max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-8 lg:p-16 rounded-[2.5rem] shadow-[0_15px_50px_rgba(0,0,0,0.04)] border border-gray-100"
        >
          <div className="space-y-8 text-gray-600 text-[17px] leading-relaxed policy-content">
            {children}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
