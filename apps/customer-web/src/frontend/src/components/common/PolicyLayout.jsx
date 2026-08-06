import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './Footer';

export default function PolicyLayout({ title, lastUpdated, sections, children }) {
  const [activeSection, setActiveSection] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Scroll to top button visibility
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Highlight active section in TOC
      if (sections && sections.length > 0) {
        let currentSection = sections[0].id;
        for (const section of sections) {
          const element = document.getElementById(section.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            // If the top of the element is near the top of the viewport
            if (rect.top <= 150) {
              currentSection = section.id;
            }
          }
        }
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFFDFD] relative">
      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-32 pb-20 px-6 lg:px-12 text-center bg-gradient-to-b from-[#FFF5F8] to-[#FFFDFD] overflow-hidden">
        {/* Subtle decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FF0069] opacity-[0.03] rounded-full blur-3xl"></div>
          <div className="absolute top-32 -left-24 w-72 h-72 bg-[#FFD498] opacity-[0.05] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl lg:text-6xl font-heading font-black text-[#1B1B1B] mb-6 tracking-tight"
          >
            {title}
          </motion.h1>
          {lastUpdated && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="inline-block"
            >
              <p className="text-[#FF2D7A] font-bold tracking-widest uppercase text-sm bg-white/60 px-6 py-2 rounded-full border border-pink-100 shadow-sm backdrop-blur-sm">
                Last Updated: {lastUpdated}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* 2. CONTENT SECTION */}
      <section className="pb-24 px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
        {sections && sections.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Sidebar Table of Contents */}
            <div className="hidden lg:block lg:col-span-3 sticky top-32">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100"
              >
                <h3 className="font-heading font-bold text-lg text-[#1B1B1B] mb-6">Contents</h3>
                <nav className="flex flex-col space-y-3">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`text-left text-sm font-medium transition-all duration-300 flex items-center group ${
                        activeSection === section.id 
                          ? 'text-[#FF0069] translate-x-2' 
                          : 'text-gray-500 hover:text-[#1B1B1B] hover:translate-x-1'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full mr-3 transition-colors ${
                        activeSection === section.id ? 'bg-[#FF0069]' : 'bg-transparent group-hover:bg-gray-300'
                      }`} />
                      {section.title}
                    </button>
                  ))}
                </nav>
              </motion.div>
            </div>

            {/* Main Content Cards */}
            <div className="lg:col-span-9 space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/90 backdrop-blur-xl p-8 lg:p-12 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100/80 hover:shadow-[0_15px_50px_rgba(0,0,0,0.06)] transition-shadow duration-500 scroll-mt-32"
                >
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-1 bg-gradient-to-r from-[#FF0069] to-[#FFD498] rounded-full mr-4"></div>
                    <h2 className="text-2xl lg:text-3xl font-heading font-black text-[#1B1B1B] leading-tight">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-6 text-gray-600 text-[17px] leading-relaxed policy-content font-body">
                    {section.content}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          /* Fallback for pages without sections */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/90 backdrop-blur-xl max-w-4xl mx-auto p-8 lg:p-16 rounded-[2.5rem] shadow-[0_15px_50px_rgba(0,0,0,0.04)] border border-gray-100"
          >
            <div className="space-y-8 text-gray-600 text-[17px] leading-relaxed policy-content">
              {children}
            </div>
          </motion.div>
        )}
      </section>

      {/* 3. SCROLL TO TOP BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-r from-[#FF0069] to-[#FFD498] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            aria-label="Scroll to top"
          >
            <svg 
              className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
