import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CategoryHero({ 
  categoryName, 
  titleBlack, 
  titleColor, 
  description, 
  heroImage, 
  gradientFrom, 
  gradientVia, 
  gradientTo,
  accentColor = "text-[#FF2D7A]" 
}) {
  return (
    <section className={`relative w-full min-h-[85vh] flex items-center pt-[120px] md:pt-[140px] lg:pt-[180px] pb-[60px] md:pb-[80px] overflow-hidden bg-gradient-to-r ${gradientFrom} ${gradientVia} ${gradientTo}`}>
      {/* Floating Bubbles Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/40 backdrop-blur-md border border-white/50 shadow-sm"
            style={{
              width: Math.random() * 80 + 30,
              height: Math.random() * 80 + 30,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: Math.random() * 4 + 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Hero Image */}
      <div className="absolute inset-y-0 -right-[5%] md:-right-[10%] w-full md:w-[75%] z-10 pointer-events-none">
        <motion.img 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          src={heroImage} 
          alt={`COSKINn ${categoryName}`} 
          className="w-full h-full object-cover object-[center_top] scale-[1.02] mix-blend-multiply opacity-90 md:opacity-100"
          style={{ 
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.8) 40%, black 100%)', 
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.8) 40%, black 100%)' 
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-[500px]">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-8 flex items-center gap-2"
          >
            <Link to="/" className="hover:text-[#FF2D7A] transition-colors">Home</Link> / 
            <span className="text-gray-400">Categories</span> / 
            <span className="text-[#FF2D7A]">{categoryName}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] text-[#1B1B1B] mb-8"
          >
            {titleBlack} <br />
            <span className="text-[#FF2D7A]">{titleColor}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-black/80 mb-12 font-medium leading-relaxed drop-shadow-sm md:drop-shadow-none"
          >
            {description}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <button 
              onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 bg-[#FF2D7A] text-white hover:shadow-[0_10px_25px_rgba(255,45,122,0.3)] hover:-translate-y-1"
            >
              Shop Collection
            </button>
            <button 
              onClick={() => document.getElementById('educational').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 bg-white text-[#FF2D7A] border-[1.5px] border-[#FF2D7A] hover:bg-[#FF2D7A] hover:text-white text-center hover:shadow-[0_10px_25px_rgba(255,45,122,0.2)] hover:-translate-y-1"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
