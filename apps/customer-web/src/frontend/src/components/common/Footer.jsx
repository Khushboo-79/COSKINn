import React from 'react';
import { motion } from 'framer-motion';

/* =========================================
   1. SVG ICONS
   ========================================= */

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const PinterestIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 22l3-11"></path>
    <path d="M11 11a3 3 0 1 0 3-3"></path>
    <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path>
  </svg>
);

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
);

const SocialIcon = ({ children }) => (
  <a href="#" className="w-10 h-10 rounded-full bg-white/30 border border-[#4a3b42]/10 flex items-center justify-center text-[#4a3b42] hover:text-white hover:bg-[#8B1C31] hover:border-[#8B1C31] shadow-sm hover:shadow-[0_8px_20px_rgba(139,28,49,0.25)] transition-all duration-500 group">
    <div className="transform group-hover:scale-110 transition-transform duration-500">
      {children}
    </div>
  </a>
);

/* =========================================
   2. MAIN COMPONENT
   ========================================= */

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#FFD498] overflow-hidden font-body text-[#4a3b42] pt-20 lg:pt-28 pb-8 selection:bg-white selection:text-[#8B1C31]">

      {/* 
        =========================================
        LUXURY LAYERED BACKGROUND
        =========================================
      */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD498] via-[#FFD498] to-[#FF0069]/30" />
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,0,105,0.2)_0%,rgba(255,212,152,0)_70%)]" />

        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-white blur-[150px] rounded-full mix-blend-overlay"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#FF0069] blur-[160px] rounded-full mix-blend-multiply"
        />
        <div className="absolute top-[20%] left-[40%] w-[40vw] h-[40vw] bg-white blur-[130px] rounded-full mix-blend-overlay opacity-60" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">

        {/* 
           =========================================
           TOP: NEWSLETTER EXPERIENCE & VISUAL
           =========================================
         */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center mb-16 lg:mb-24">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-6 flex flex-col"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-[#8B1C31]/40" />
              <span className="text-[11.5px] font-bold tracking-[0.4em] uppercase text-[#8B1C31]">
                Join The Society
              </span>
            </div>
            <h3 className="font-heading text-[3.25rem] lg:text-[4.75rem] font-light leading-[1.05] mb-5 text-[#4A2536] tracking-tight">
              Elevate your <br /> <span className="italic font-medium text-[#8B1C31]">daily ritual.</span>
            </h3>
            <p className="text-[17px] lg:text-[18px] text-[#4a3b42] font-medium max-w-[450px] mb-8 leading-[1.9]">
              Receive exclusive access to new botanical formulations, private wellness events, and profound skincare insights directly to your inbox.
            </p>

            {/* Premium Subscription Input */}
            <div className="relative w-full max-w-[450px] group">
              <div className="absolute inset-0 bg-white/40 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="relative w-full bg-white/40 backdrop-blur-xl border border-white/60 rounded-full py-4 lg:py-5 pl-8 pr-[140px] text-[15px] lg:text-[16px] text-[#4A2536] placeholder-[#4a3b42]/60 focus:outline-none focus:border-white focus:bg-white/60 transition-all duration-500 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]"
              />
              <button className="absolute right-2.5 top-2.5 bottom-2.5 bg-white text-[#8B1C31] px-6 lg:px-8 rounded-full text-[12px] lg:text-[13px] font-bold tracking-[0.15em] uppercase hover:bg-[#8B1C31] hover:text-white transition-colors duration-500 shadow-sm">
                Subscribe
              </button>
            </div>
          </motion.div>

          {/* Floating Product Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="lg:col-span-5 lg:col-start-8 relative"
          >
            <div className="w-full max-w-[400px] aspect-[4/5] mx-auto rounded-[40px] lg:rounded-[56px] overflow-hidden shadow-[0_30px_60px_rgba(74,37,54,0.15)] bg-white/20 backdrop-blur-md border border-white/40 relative group">

              {/* Branding Overlay Guarantee */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none opacity-40 mix-blend-overlay">
                <span className="font-heading text-[#8B1C31] text-[5rem] lg:text-[6rem] tracking-[0.3em] font-light rotate-[-90deg]">COSKINn</span>
              </div>

              <img
                src="/mockup_product_1.png"
                alt="COSKINn Newsletter"
                className="w-full h-full object-cover scale-[1.03] group-hover:scale-[1.08] transition-transform duration-[2.5s] ease-out opacity-[0.85]"
              />

              <div className="absolute inset-0 bg-[#FFD1EE]/10 mix-blend-multiply z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FFD1EE]/80 via-transparent to-transparent z-10 pointer-events-none" />

              {/* Glass Reflection Sweep */}
              <div className="absolute top-0 bottom-0 -left-[100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-[30deg] z-20 group-hover:left-[200%] transition-all duration-[2.5s] ease-in-out pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* 
           =========================================
           MIDDLE: BRAND AREA & NAVIGATION
           =========================================
         */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[#4a3b42]/10">

          {/* Brand Statement */}
          <div className="lg:col-span-6 flex flex-col pr-10">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-heading text-[4.75rem] lg:text-[7.25rem] tracking-[0.2em] font-light leading-none mb-4 text-[#4A2536]"
            >
              COSKINn
            </motion.span>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[22px] lg:text-[26px] font-heading font-light text-[#4a3b42] leading-[1.6]"
            >
              Nature Inspired.<br />
              Science Perfected.<br />
              <span className="italic font-medium text-[#8B1C31]">Luxury Skincare.</span>
            </motion.p>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 flex flex-col gap-5 lg:pt-4">
            <motion.h4
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[12.5px] font-bold tracking-[0.3em] text-[#8B1C31] uppercase mb-1 lg:mb-3"
            >
              Discover
            </motion.h4>
            {['Our Story', 'Build Your Routine', 'Contact'].map((link, idx) => (
              <motion.a
                href="#"
                key={link}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + (idx * 0.05) }}
                className="text-[16px] font-medium text-[#4a3b42] hover:text-[#8B1C31] transition-colors duration-300 w-fit relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#8B1C31] transition-all duration-500 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* Support Links */}
          <div className="lg:col-span-3 flex flex-col gap-5 lg:pt-4">
            <motion.h4
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[12.5px] font-bold tracking-[0.3em] text-[#8B1C31] uppercase mb-1 lg:mb-3"
            >
              Support
            </motion.h4>
            {['Shipping', 'Returns', 'Privacy Policy', 'Terms & Conditions', 'FAQ'].map((link, idx) => (
              <motion.a
                href="#"
                key={link}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + (idx * 0.05) }}
                className="text-[16px] font-medium text-[#4a3b42] hover:text-[#8B1C31] transition-colors duration-300 w-fit relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#8B1C31] transition-all duration-500 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

        </div>

        {/* 
           =========================================
           BOTTOM: COPYRIGHT & SOCIALS
           =========================================
         */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-col md:flex-row items-center gap-4 text-[14px] text-[#4a3b42] font-medium tracking-wide">
            <span>© 2026 COSKINn</span>
            <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-[#8B1C31]/30" />
            <span>Designed with elegance.</span>
          </div>

          <div className="flex items-center gap-5">
            <SocialIcon><InstagramIcon /></SocialIcon>
            <SocialIcon><PinterestIcon /></SocialIcon>
            <SocialIcon><FacebookIcon /></SocialIcon>
            <SocialIcon><TikTokIcon /></SocialIcon>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
