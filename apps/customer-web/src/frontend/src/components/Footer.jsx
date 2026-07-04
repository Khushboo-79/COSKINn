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
  <a href="#" className="w-10 h-10 rounded-full bg-theme-neutral/5 border border-theme-neutral/20 flex items-center justify-center text-theme-neutral hover:text-theme-dark hover:bg-theme-primary hover:border-theme-primary shadow-none hover:shadow-[0_0_25px_rgba(151,181,194,0.4)] transition-all duration-500 group">
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
    <footer className="relative w-full bg-theme-dark overflow-hidden font-body text-theme-secondary pt-32 lg:pt-48 pb-10 selection:bg-theme-secondary selection:text-theme-dark">

      {/* 
        =========================================
        LUXURY LAYERED BACKGROUND
        =========================================
      */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(151,181,194,0.1)_0%,rgba(43,89,104,0)_70%)]" />

        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-theme-primary blur-[150px] rounded-full mix-blend-screen"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] right-[-5%] w-[40vw] h-[40vw] bg-theme-accent blur-[140px] rounded-full mix-blend-screen"
        />
        <div className="absolute top-[30%] left-[50%] w-[30vw] h-[30vw] bg-theme-secondary/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">

        {/* 
           =========================================
           TOP: NEWSLETTER EXPERIENCE & VISUAL
           =========================================
         */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center mb-32 lg:mb-48">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-6 flex flex-col"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-theme-secondary/40" />
              <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-theme-secondary/70">
                Join The Society
              </span>
            </div>
            <h3 className="font-heading text-[3rem] lg:text-[4.5rem] font-light leading-[1.05] mb-6 text-theme-secondary tracking-tight">
              Elevate your <br /> <span className="italic text-theme-accent">daily ritual.</span>
            </h3>
            <p className="text-[16px] lg:text-[17px] text-theme-neutral font-medium max-w-[450px] mb-10 leading-[1.9]">
              Receive exclusive access to new botanical formulations, private wellness events, and profound skincare insights directly to your inbox.
            </p>

            {/* Premium Subscription Input */}
            <div className="relative w-full max-w-[450px] group">
              <div className="absolute inset-0 bg-theme-secondary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="relative w-full bg-theme-neutral/10 backdrop-blur-xl border border-theme-neutral/30 rounded-full py-4 lg:py-5 pl-8 pr-[140px] text-[14px] lg:text-[15px] text-theme-secondary placeholder-theme-neutral/50 focus:outline-none focus:border-theme-primary focus:bg-theme-neutral/20 transition-all duration-500 shadow-inner"
              />
              <button className="absolute right-2.5 top-2.5 bottom-2.5 bg-theme-secondary text-theme-dark px-6 lg:px-8 rounded-full text-[11px] lg:text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-theme-primary hover:text-theme-dark transition-colors duration-500 shadow-md">
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
            <div className="w-full max-w-[400px] aspect-[4/5] mx-auto rounded-[40px] lg:rounded-[56px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.2)] bg-theme-neutral/5 backdrop-blur-md border border-theme-neutral/20 relative group">

              {/* Branding Overlay Guarantee */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none opacity-60 mix-blend-overlay">
                <span className="font-heading text-white text-[5rem] lg:text-[6rem] tracking-[0.3em] font-light rotate-[-90deg]">COSKINn</span>
              </div>

              <img
                src="/mockup_product_1.png"
                alt="COSKINn Newsletter"
                className="w-full h-full object-cover scale-[1.03] group-hover:scale-[1.08] transition-transform duration-[2.5s] ease-out opacity-90"
              />

              <div className="absolute inset-0 bg-theme-dark/30 mix-blend-multiply z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-theme-dark/80 via-transparent to-transparent z-10 pointer-events-none" />

              {/* Glass Reflection Sweep */}
              <div className="absolute top-0 bottom-0 -left-[100%] w-[50%] bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-[30deg] z-20 group-hover:left-[200%] transition-all duration-[2.5s] ease-in-out pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* 
           =========================================
           MIDDLE: BRAND AREA & NAVIGATION
           =========================================
         */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 pb-20 border-b border-theme-neutral/20">

          {/* Brand Statement */}
          <div className="lg:col-span-6 flex flex-col pr-10">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-heading text-[4.5rem] lg:text-[7rem] tracking-[0.2em] font-light leading-none mb-6 text-theme-secondary drop-shadow-sm"
            >
              COSKINn
            </motion.span>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[20px] lg:text-[24px] font-heading font-light text-theme-neutral leading-[1.6]"
            >
              Nature Inspired.<br />
              Science Perfected.<br />
              <span className="italic text-theme-accent">Luxury Skincare.</span>
            </motion.p>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 flex flex-col gap-6 lg:pt-4">
            <motion.h4
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[12px] font-bold tracking-[0.3em] text-theme-primary uppercase mb-2 lg:mb-4"
            >
              Discover
            </motion.h4>
            {['Home', 'Skincare', 'Cosmetics', 'Our Story', 'Build Your Routine', 'Contact'].map((link, idx) => (
              <motion.a
                href="#"
                key={link}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + (idx * 0.05) }}
                className="text-[15px] font-medium text-theme-neutral hover:text-theme-secondary transition-colors duration-300 w-fit relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-theme-accent transition-all duration-500 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* Support Links */}
          <div className="lg:col-span-3 flex flex-col gap-6 lg:pt-4">
            <motion.h4
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[12px] font-bold tracking-[0.3em] text-theme-primary uppercase mb-2 lg:mb-4"
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
                className="text-[15px] font-medium text-theme-neutral hover:text-theme-secondary transition-colors duration-300 w-fit relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-theme-accent transition-all duration-500 group-hover:w-full" />
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
          className="pt-10 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-4 text-[13px] text-theme-neutral/60 font-medium tracking-wide">
            <span>© 2026 COSKINn</span>
            <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-theme-neutral/30" />
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
