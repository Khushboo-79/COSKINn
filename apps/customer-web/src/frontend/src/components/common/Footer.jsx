import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/* =========================================
   1. SVG ICONS & SHAPES
   ========================================= */

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const PinterestIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 22l3-11"></path>
    <path d="M11 11a3 3 0 1 0 3-3"></path>
    <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.17 1 12 1 12s0 3.83.46 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.83 23 12 23 12s0-3.83-.46-5.58z"></path>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
  </svg>
);

const TruckIcon = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </svg>
);

const RefreshIcon = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
    <path d="M3 3v5h5"></path>
  </svg>
);

const ShieldCheckIcon = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="M9 12l2 2 4-4"></path>
  </svg>
);

const LeafIcon = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
  </svg>
);

const SocialIcon = ({ children }) => (
  <a href="#" className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-white/40 backdrop-blur-md border border-white/60 flex items-center justify-center text-[#2B5968] hover:text-white hover:bg-pink-400 hover:border-[#F7DCE0] shadow-[0_4px_15px_rgba(202,186,177,0.2)] hover:shadow-[0_8px_25px_rgba(247,220,224,0.6)] transition-all duration-500 group">
    <div className="transform transition-transform duration-500 group-hover:-translate-y-1">
      {children}
    </div>
  </a>
);

const FooterLink = ({ to, children }) => (
  <Link to={to} className="flex items-center text-[14px] lg:text-[15px] font-medium text-[#2B5968]/80 hover:text-[#FF2D7A] w-fit relative group overflow-hidden transition-colors duration-300">
    <span className="transform transition-transform duration-300 ease-out group-hover:translate-x-2">
      {children}
    </span>
  </Link>
);

const FeatureCard = ({ icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -6, scale: 1.02 }}
    className="flex flex-col items-center sm:items-start sm:flex-row gap-4 bg-white/70 backdrop-blur-xl border border-white p-5 lg:p-6 rounded-[24px] shadow-[0_10px_40px_rgba(202,186,177,0.2)] group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(247,220,224,0.4)]"
  >
    <div className="text-[#97B5C2] bg-white w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center shrink-0 shadow-[0_4px_15px_rgba(151,181,194,0.15)] group-hover:text-[#F7DCE0] transition-colors duration-500">
      {icon}
    </div>
    <div className="text-center sm:text-left flex flex-col justify-center">
      <h5 className="text-[#2B5968] font-heading font-semibold text-[15px] lg:text-[17px] mb-0.5">{title}</h5>
      <p className="text-[#2B5968]/70 text-[13px] lg:text-[14px] font-medium">{desc}</p>
    </div>
  </motion.div>
);

/* =========================================
   2. MAIN COMPONENT
   ========================================= */

export default function Footer() {
  return (
    <footer className="relative w-full font-body pt-16 lg:pt-24 mt-10">

      {/* Animated Gradient Background with large rounded corners */}
      <motion.div
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[120px] sm:top-[80px] lg:top-[60px] inset-x-0 bottom-0 rounded-t-[40px] lg:rounded-t-[60px] shadow-[0_-15px_50px_rgba(247,220,224,0.3)] z-0 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #FFF3F7 0%, #FFE8F1 25%, #FFDCEB 55%, #FFEAF3 80%, #FFF8FB 100%)',
          backgroundSize: '200% 200%'
        }}
      >
        {/* Soft radial pink glow in the center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] max-w-[800px] bg-[#FFDCEB]/50 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Very light blush highlights in the corners */}
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-[#FFE8F1]/60 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-[#FFF3F7]/80 blur-[120px] rounded-full pointer-events-none"></div>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10 pb-8">

        {/* =========================================
            TOP FEATURE BAR
            ========================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-12 lg:mb-16 -mt-8 lg:-mt-12">
          <FeatureCard icon={<LeafIcon className="w-5 h-5 lg:w-6 lg:h-6" />} title="Fruit-Powered Formula" desc="Natural Ingredients" delay={0.1} />
          <FeatureCard icon={<ShieldCheckIcon className="w-5 h-5 lg:w-6 lg:h-6" />} title="Dermatologist Tested" desc="Safe for Skin" delay={0.2} />
          <FeatureCard icon={<RefreshIcon className="w-5 h-5 lg:w-6 lg:h-6" />} title="Cruelty Free" desc="No Animal Testing" delay={0.3} />
          <FeatureCard icon={<ShieldCheckIcon className="w-5 h-5 lg:w-6 lg:h-6" />} title="Secure Checkout" desc="100% Safe Payment" delay={0.4} />
          <FeatureCard icon={<TruckIcon className="w-5 h-5 lg:w-6 lg:h-6" />} title="Fast Delivery" desc="Quick Shipping" delay={0.5} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pt-4 lg:pt-8"
        >
          {/* =========================================
              SECTION 1: BRAND & CONTACT
              ========================================= */}
          <div className="sm:col-span-2 lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left mb-6 lg:mb-0">
            <span className="font-heading text-[32px] tracking-[0.2em] text-[#2B5968] mb-4">
              COSKINn
            </span>
            <p className="text-[14px] lg:text-[15px] text-[#2B5968]/80 font-medium leading-[1.7] max-w-[280px] mb-6">
              Nature meets modern skincare.<br />
              Crafted for healthy glowing skin.
            </p>

            <div className="text-[13px] text-[#2B5968]/70 font-medium mb-6 space-y-2 text-center lg:text-left">
              <p>support@coskinn.com</p>
              <p>+91 9876543210</p>
              <p>Mon–Sat | 10:00 AM – 7:00 PM</p>
              <p>Indore, Madhya Pradesh</p>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-3">
              <SocialIcon><InstagramIcon /></SocialIcon>
              <SocialIcon><FacebookIcon /></SocialIcon>
              <SocialIcon><PinterestIcon /></SocialIcon>
              <SocialIcon><YouTubeIcon /></SocialIcon>
            </div>
          </div>

          {/* =========================================
              SECTION 2: CUSTOMER SUPPORT
              ========================================= */}
          <div className="lg:col-span-2 flex flex-col gap-4 lg:pl-4">
            <h4 className="text-[17px] lg:text-[18px] font-heading font-semibold text-[#2B5968] mb-2">Customer Support</h4>
            <div className="flex flex-col gap-3">
              <FooterLink to="/contact">Contact Us</FooterLink>
              <FooterLink to="/help-center">Help Center</FooterLink>
              <FooterLink to="/faqs">FAQs</FooterLink>
              <FooterLink to="/track-order">Track Order</FooterLink>
              <FooterLink to="/shipping-policy">Shipping & Delivery</FooterLink>
              <FooterLink to="/returns-refunds">Returns & Refunds</FooterLink>
            </div>
          </div>

          {/* =========================================
              SECTION 3: ABOUT COSKINn
              ========================================= */}
          <div className="lg:col-span-2 flex flex-col gap-4 lg:pl-4">
            <h4 className="text-[17px] lg:text-[18px] font-heading font-semibold text-[#2B5968] mb-2">About COSKINn</h4>
            <div className="flex flex-col gap-3">
              <FooterLink to="/about">Our Story</FooterLink>
              <FooterLink to="/our-promise">Our Promise</FooterLink>
              <FooterLink to="/sustainability">Sustainability</FooterLink>
              <FooterLink to="/ingredient-philosophy">Ingredient Philosophy</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
            </div>
          </div>

          {/* =========================================
              SECTION 4: POLICIES
              ========================================= */}
          <div className="lg:col-span-2 flex flex-col gap-4 lg:pl-4">
            <h4 className="text-[17px] lg:text-[18px] font-heading font-semibold text-[#2B5968] mb-2">Policies</h4>
            <div className="flex flex-col gap-3">
              <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink to="/terms-conditions">Terms & Conditions</FooterLink>
              <FooterLink to="/cookie-policy">Cookie Policy</FooterLink>
              <FooterLink to="/accessibility">Accessibility</FooterLink>
              <FooterLink to="/payment-policy">Payment Policy</FooterLink>
            </div>
          </div>

          {/* =========================================
              SECTION 5: NEWSLETTER
              ========================================= */}
          <div className="sm:col-span-2 lg:col-span-3 flex flex-col lg:pl-4 mt-6 lg:mt-0 items-center lg:items-start text-center lg:text-left">
            <h4 className="text-[18px] lg:text-[20px] font-heading font-bold text-[#FF2D7A] mb-3">Join the COSKINn Glow Club ✨</h4>
            <p className="text-[14px] text-[#2B5968]/70 font-medium leading-relaxed mb-5 max-w-[300px]">
              Get skincare tips, exclusive launches, seasonal routines and member-only offers.
            </p>
            <form className="flex flex-col gap-3 w-full max-w-[300px]">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white border border-[#CABAB1]/50 rounded-full px-5 py-3 text-[14px] text-[#2B5968] placeholder:text-[#2B5968]/40 focus:outline-none focus:border-[#FF2D7A] focus:ring-1 focus:ring-[#FF2D7A] transition-all"
              />
              <button
                type="submit"
                className="w-full bg-[#FF2D7A] text-white rounded-full px-5 py-3 text-[13px] font-bold uppercase tracking-widest hover:bg-[#E01E63] hover:shadow-lg transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>

        </motion.div>

        {/* =========================================
            BOTTOM BAR
            ========================================= */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-14 lg:mt-16 pt-6 border-t border-[#CABAB1]/40 flex flex-col xl:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[14px] lg:text-[15px] text-[#2B5968]/70 font-medium">
            <span>© 2026 COSKINn. All Rights Reserved.</span>
            <div className="flex flex-wrap justify-center items-center gap-4 text-[13px]">
              <Link to="/privacy-policy" className="hover:text-[#FF2D7A] transition-colors">Privacy Policy</Link>
              <Link to="/terms-conditions" className="hover:text-[#FF2D7A] transition-colors">Terms & Conditions</Link>
              <Link to="/cookie-policy" className="hover:text-[#FF2D7A] transition-colors">Cookie Policy</Link>
              <Link to="/accessibility" className="hover:text-[#FF2D7A] transition-colors">Accessibility</Link>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-8">
            <div className="flex items-center gap-2 text-[13px] font-bold text-[#2B5968]/80 uppercase tracking-wider">
              Made with ❤️ in India
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] lg:text-[12px] font-bold text-[#2B5968]/60 uppercase tracking-widest mr-2">We Accept:</span>
              <span className="font-bold text-[#2B5968] text-[13px]">Visa</span>
              <span className="font-bold text-[#2B5968] text-[13px]">Mastercard</span>
              <span className="font-bold text-[#2B5968] text-[13px]">UPI</span>
              <span className="font-bold text-[#2B5968] text-[13px]">Razorpay</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
