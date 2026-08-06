import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShieldCheck, Mail, Info, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

/* =========================================
   1. HERO SECTION
   ========================================= */
export const PolicyHero = ({ title, subtitle, lastUpdated }) => (
  <section className="relative w-full pt-32 pb-24 px-6 lg:px-12 text-center bg-gradient-to-b from-[#FFF5F8] to-[#FFFDFD] overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-[#FF0069] opacity-[0.02] rounded-full blur-3xl"></div>
      <div className="absolute top-40 -left-20 w-80 h-80 bg-[#FFD498] opacity-[0.04] rounded-full blur-3xl"></div>
    </div>
    <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-16 h-16 rounded-full bg-white shadow-[0_10px_30px_rgba(255,0,105,0.1)] flex items-center justify-center mb-6 text-[#FF0069]"
      >
        <FileText size={28} strokeWidth={1.5} />
      </motion.div>
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="text-4xl lg:text-5xl xl:text-6xl font-heading font-black text-[#1B1B1B] mb-4 tracking-tight"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-lg text-[#2B5968]/70 mb-8 max-w-2xl font-medium"
      >
        {subtitle}
      </motion.p>
      {lastUpdated && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <span className="text-[#FF2D7A] font-bold tracking-widest uppercase text-xs bg-white/80 px-5 py-2.5 rounded-full border border-pink-100 shadow-sm backdrop-blur-md">
            Last Updated: {lastUpdated}
          </span>
        </motion.div>
      )}
    </div>
  </section>
);

/* =========================================
   2. QUICK OVERVIEW CARD
   ========================================= */
export const PolicyOverview = ({ children }) => (
  <motion.section
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="max-w-[1400px] mx-auto px-6 -mt-12 relative z-20 mb-16"
  >
    <div className="bg-white/90 backdrop-blur-xl p-8 lg:p-12 rounded-[2rem] shadow-[0_20px_60px_rgba(202,186,177,0.15)] border border-white flex flex-col items-center text-center">
      <h2 className="text-xl lg:text-2xl font-heading font-bold text-[#1B1B1B] mb-4">Overview</h2>
      <div className="w-10 h-1 bg-gradient-to-r from-[#FF0069] to-[#FFD498] rounded-full mb-6"></div>
      <div className="text-[#2B5968]/80 font-medium text-[16px] lg:text-[18px] leading-relaxed max-w-3xl">
        {children}
      </div>
    </div>
  </motion.section>
);

/* =========================================
   3. POLICY HIGHLIGHTS
   ========================================= */
export const PolicyHighlights = ({ highlights }) => (
  <section className="max-w-[1400px] mx-auto px-6 mb-24">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {highlights.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="bg-[#FFFDFD] p-8 rounded-[1.5rem] border border-pink-50 shadow-sm hover:shadow-[0_15px_40px_rgba(202,186,177,0.12)] transition-shadow duration-500 group flex flex-col items-center text-center"
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FFF5F8] to-white shadow-inner flex items-center justify-center text-[#FF0069] mb-5 group-hover:scale-110 group-hover:shadow-[0_10px_20px_rgba(255,0,105,0.1)] transition-all duration-300">
            {item.icon || <ShieldCheck size={24} strokeWidth={1.5} />}
          </div>
          <h3 className="text-lg font-heading font-bold text-[#1B1B1B] mb-3">{item.title}</h3>
          <p className="text-sm text-[#2B5968]/70 font-medium leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

/* =========================================
   4. DETAILED INFORMATION CARD
   ========================================= */
export const PolicyDetail = ({ title, children, isLast }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={`max-w-[1400px] mx-auto px-6 ${isLast ? 'mb-16' : 'mb-12'}`}
  >
    <div className="bg-white p-8 lg:p-12 rounded-[2rem] shadow-[0_10px_40px_rgba(202,186,177,0.06)] border border-gray-50 hover:shadow-[0_15px_50px_rgba(202,186,177,0.1)] transition-shadow duration-500">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-1.5 h-8 bg-gradient-to-b from-[#FF0069] to-[#FFD498] rounded-full"></div>
        <h2 className="text-2xl lg:text-3xl font-heading font-black text-[#1B1B1B]">{title}</h2>
      </div>
      <div className="text-[#2B5968]/80 font-medium text-[15px] lg:text-[16px] leading-relaxed space-y-5 policy-content">
        {children}
      </div>
    </div>
  </motion.section>
);

/* =========================================
   5. IMPORTANT NOTES
   ========================================= */
export const PolicyNote = ({ title = "Important Note", children }) => (
  <motion.section
    initial={{ opacity: 0, scale: 0.98 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="max-w-[1400px] mx-auto px-6 mb-24"
  >
    <div className="bg-gradient-to-r from-[#FFF8FA] to-[#FFFDFD] p-8 lg:p-10 rounded-[1.5rem] border border-[#FFDCEB] flex flex-col md:flex-row gap-6 items-start shadow-[0_10px_30px_rgba(255,220,235,0.3)]">
      <div className="w-12 h-12 shrink-0 rounded-full bg-white flex items-center justify-center text-[#FF0069] shadow-sm">
        <Info size={24} strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="text-lg font-heading font-bold text-[#1B1B1B] mb-2">{title}</h3>
        <div className="text-[#2B5968]/70 font-medium text-sm leading-relaxed space-y-3">
          {children}
        </div>
      </div>
    </div>
  </motion.section>
);

/* =========================================
   6. FAQs
   ========================================= */
const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-100 last:border-none">
    <button
      onClick={onClick}
      className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
    >
      <span className={`font-heading font-bold text-[16px] pr-4 transition-colors ${isOpen ? 'text-[#FF0069]' : 'text-[#1B1B1B] group-hover:text-[#FF0069]'}`}>
        {question}
      </span>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-[#FFF5F8]' : 'bg-transparent group-hover:bg-gray-50'}`}>
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#FF0069]' : 'text-gray-400 group-hover:text-[#FF0069]'}`}
        />
      </div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pb-6 text-[#2B5968]/70 font-medium text-sm leading-relaxed">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const PolicyFAQ = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-[1400px] mx-auto px-6 mb-24"
    >
      <div className="text-center mb-10">
        <h2 className="text-2xl lg:text-3xl font-heading font-black text-[#1B1B1B] mb-3">Frequently Asked Questions</h2>
        <div className="w-12 h-1 bg-gradient-to-r from-[#FF0069] to-[#FFD498] mx-auto rounded-full"></div>
      </div>
      <div className="bg-white p-6 lg:p-10 rounded-[2rem] shadow-[0_10px_40px_rgba(202,186,177,0.06)] border border-gray-50">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.q}
            answer={faq.a}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
          />
        ))}
      </div>
    </motion.section>
  );
};

/* =========================================
   7. NEED HELP CTA
   ========================================= */
export const PolicyCTA = () => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="max-w-[1400px] mx-auto px-6 mb-24 text-center"
  >
    <div className="bg-gradient-to-b from-[#FFF5F8] to-[#FFFDFD] p-10 lg:p-16 rounded-[2rem] border border-[#FFDCEB] shadow-[0_15px_50px_rgba(255,220,235,0.4)] flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#FF0069] shadow-[0_10px_30px_rgba(255,0,105,0.15)] mb-6">
        <Mail size={28} strokeWidth={1.5} />
      </div>
      <h2 className="text-2xl lg:text-3xl font-heading font-black text-[#1B1B1B] mb-4">Still have questions?</h2>
      <p className="text-[#2B5968]/80 font-medium mb-8 max-w-lg mx-auto">
        Our customer support team is always here to help you out with any concerns you may have regarding our policies.
      </p>
      <Link
        to="/contact"
        className="inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-[#FF0069] to-[#FF2D7A] text-white font-bold text-sm tracking-widest uppercase rounded-full hover:shadow-[0_10px_25px_rgba(255,0,105,0.3)] hover:-translate-y-1 transition-all duration-300"
      >
        Contact Support
      </Link>
    </div>
  </motion.section>
);
