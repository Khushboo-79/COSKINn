import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MenuPanel = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.98 }}
    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-[800px] bg-white/90 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.07)] overflow-hidden z-[100] p-8 cursor-default"
  >
    {children}
  </motion.div>
);

const MenuLink = ({ to, children }) => (
  <Link to={to} className="block text-black/80 hover:text-theme-primary font-medium text-[14px] transition-colors py-1.5">
    {children}
  </Link>
);

const MenuSectionTitle = ({ children }) => (
  <h4 className="text-[12px] font-bold uppercase tracking-widest text-black mb-4 border-b border-black/10 pb-2">{children}</h4>
);

export const ShopMegaMenu = () => (
  <MenuPanel>
    <div className="grid grid-cols-4 gap-8">
      <div>
        <MenuSectionTitle>Trending</MenuSectionTitle>
        <div className="flex flex-col gap-1">
          <MenuLink to="/new-arrivals">New Arrivals</MenuLink>
          <MenuLink to="#">Best Sellers</MenuLink>
          <MenuLink to="#">Limited Edition</MenuLink>
          <MenuLink to="#">Gift Sets</MenuLink>
        </div>
      </div>
      <div>
        <MenuSectionTitle>Skincare</MenuSectionTitle>
        <div className="flex flex-col gap-1">
          <MenuLink to="#">COSKINn Sunscreen</MenuLink>
          <MenuLink to="#">COSKINn Cleanser</MenuLink>
          <MenuLink to="#">COSKINn Cleansing Balm</MenuLink>
          <MenuLink to="#">COSKINn SPF Lip Balm</MenuLink>
          <MenuLink to="#">COSKINn Hand Cream</MenuLink>
          <MenuLink to="#">COSKINn Face Mist</MenuLink>
          <MenuLink to="#">COSKINn Overnight Mask</MenuLink>
          <MenuLink to="#">COSKINn Under Eye Patches</MenuLink>
        </div>
      </div>
      <div>
        <MenuSectionTitle>Cosmetics</MenuSectionTitle>
        <div className="flex flex-col gap-1">
          <MenuLink to="#">COSKINn Magnetic Lipstick</MenuLink>
          <MenuLink to="#">COSKINn Lip Liner</MenuLink>
          <MenuLink to="#">COSKINn Lip & Cheek Blur</MenuLink>
          <MenuLink to="#">COSKINn Blush</MenuLink>
          <MenuLink to="#">COSKINn Eyeshadow Palette</MenuLink>
          <MenuLink to="#">COSKINn Mascara</MenuLink>
          <MenuLink to="#">COSKINn Brushes</MenuLink>
        </div>
      </div>
      <div className="bg-theme-bg/50 p-6 -m-4 rounded-2xl border border-white/50 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-lg mb-2 text-black">Bundles</h4>
          <p className="text-sm opacity-70 mb-4">Complete routines at a premium value.</p>
          <div className="flex flex-col gap-1">
            <MenuLink to="#">COSKINn Glow Kit</MenuLink>
            <MenuLink to="#">COSKINn Daily Essentials</MenuLink>
            <MenuLink to="#">COSKINn Weekend Routine</MenuLink>
          </div>
        </div>
        <Link to="#" className="text-theme-primary font-bold text-sm hover:underline mt-4">Shop All COSKINn →</Link>
      </div>
    </div>
  </MenuPanel>
);

export const CategoriesMegaMenu = ({ theme }) => {
  if (theme === 'skincare') {
    return (
      <MenuPanel>
        <div className="grid grid-cols-4 gap-8">
          <div>
            <MenuSectionTitle>Face Care</MenuSectionTitle>
            <div className="flex flex-col gap-1">
              <MenuLink to="#">COSKINn Cleanser</MenuLink>
              <MenuLink to="#">COSKINn Cleansing Balm</MenuLink>
              <MenuLink to="#">COSKINn Sunscreen</MenuLink>
              <MenuLink to="#">COSKINn Face Mist</MenuLink>
              <MenuLink to="#">COSKINn Overnight Mask</MenuLink>
              <MenuLink to="#">COSKINn Eye Patches</MenuLink>
            </div>
          </div>
          <div>
            <MenuSectionTitle>Body Care</MenuSectionTitle>
            <div className="flex flex-col gap-1">
              <MenuLink to="#">COSKINn Body Sunscreen</MenuLink>
              <MenuLink to="#">COSKINn Hand Cream</MenuLink>
            </div>
          </div>
          <div>
            <MenuSectionTitle>Lip Care</MenuSectionTitle>
            <div className="flex flex-col gap-1">
              <MenuLink to="#">COSKINn SPF Lip Balm</MenuLink>
            </div>
          </div>
          <div className="bg-theme-bg/50 p-6 -m-4 rounded-2xl border border-white/50">
            <MenuSectionTitle>Fragrance</MenuSectionTitle>
            <div className="flex flex-col gap-1">
              <MenuLink to="#">COSKINn Pocket Perfume</MenuLink>
            </div>
          </div>
        </div>
      </MenuPanel>
    );
  }

  // Cosmetics Theme
  return (
    <MenuPanel>
      <div className="grid grid-cols-4 gap-8">
        <div>
          <MenuSectionTitle>Face Makeup</MenuSectionTitle>
          <div className="flex flex-col gap-1">
            <MenuLink to="#">COSKINn Blush</MenuLink>
            <MenuLink to="#">COSKINn Lip & Cheek Blur</MenuLink>
          </div>
        </div>
        <div>
          <MenuSectionTitle>Eye Makeup</MenuSectionTitle>
          <div className="flex flex-col gap-1">
            <MenuLink to="#">COSKINn Mascara</MenuLink>
            <MenuLink to="#">COSKINn Eyeshadow Palette</MenuLink>
          </div>
        </div>
        <div>
          <MenuSectionTitle>Lip Makeup</MenuSectionTitle>
          <div className="flex flex-col gap-1">
            <MenuLink to="#">COSKINn Magnetic Lipstick</MenuLink>
            <MenuLink to="#">COSKINn Lip Liner</MenuLink>
          </div>
        </div>
        <div className="bg-theme-bg/50 p-6 -m-4 rounded-2xl border border-white/50 flex flex-col justify-between">
          <div>
            <MenuSectionTitle>Accessories</MenuSectionTitle>
            <div className="flex flex-col gap-1">
              <MenuLink to="#">COSKINn Makeup Brushes</MenuLink>
              <MenuLink to="#">COSKINn Brush Holder</MenuLink>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-black/10">
            <span className="text-xs font-bold text-theme-primary uppercase tracking-widest">Coming Soon</span>
            <p className="text-sm font-medium mt-1">Holographic Edition</p>
          </div>
        </div>
      </div>
    </MenuPanel>
  );
};

export const RoutineMenu = () => (
  <motion.div
    initial={{ opacity: 0, y: 15, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.98 }}
    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-[260px] bg-white/90 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.07)] overflow-hidden z-[100] py-4 cursor-default"
  >
    <div className="flex flex-col">
      <Link to="/routine" className="px-6 py-2.5 text-sm font-medium text-black/80 hover:text-black hover:bg-theme-primary/10 transition-colors">Morning Routine</Link>
      <Link to="/routine" className="px-6 py-2.5 text-sm font-medium text-black/80 hover:text-black hover:bg-theme-primary/10 transition-colors">Night Routine</Link>
      <Link to="/routine" className="px-6 py-2.5 text-sm font-medium text-black/80 hover:text-black hover:bg-theme-primary/10 transition-colors">Dry Skin Routine</Link>
      <Link to="/routine" className="px-6 py-2.5 text-sm font-medium text-black/80 hover:text-black hover:bg-theme-primary/10 transition-colors">Oily Skin Routine</Link>
      <Link to="/routine" className="px-6 py-2.5 text-sm font-medium text-black/80 hover:text-black hover:bg-theme-primary/10 transition-colors">Combination Skin</Link>
      <Link to="/routine" className="px-6 py-2.5 text-sm font-medium text-black/80 hover:text-black hover:bg-theme-primary/10 transition-colors">Sensitive Skin</Link>
      <Link to="/routine" className="px-6 py-2.5 text-sm font-medium text-black/80 hover:text-black hover:bg-theme-primary/10 transition-colors">Glow Routine</Link>
      <div className="border-t border-black/10 my-2"></div>
      <Link to="/routine" className="px-6 py-2.5 text-sm font-bold text-theme-primary hover:bg-theme-primary/10 transition-colors">Complete Routine →</Link>
    </div>
  </motion.div>
);

export const JournalMenu = () => (
  <motion.div
    initial={{ opacity: 0, y: 15, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.98 }}
    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-[240px] bg-white/90 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.07)] overflow-hidden z-[100] py-4 cursor-default"
  >
    <div className="flex flex-col">
      <Link to="/journal" className="px-6 py-2 text-sm font-medium text-black/80 hover:text-black hover:bg-theme-primary/10 transition-colors">Skincare Tips</Link>
      <Link to="/journal" className="px-6 py-2 text-sm font-medium text-black/80 hover:text-black hover:bg-theme-primary/10 transition-colors">Beauty Guides</Link>
      <Link to="/journal" className="px-6 py-2 text-sm font-medium text-black/80 hover:text-black hover:bg-theme-primary/10 transition-colors">Ingredient Stories</Link>
      <Link to="/journal" className="px-6 py-2 text-sm font-medium text-black/80 hover:text-black hover:bg-theme-primary/10 transition-colors">Morning Routine</Link>
      <Link to="/journal" className="px-6 py-2 text-sm font-medium text-black/80 hover:text-black hover:bg-theme-primary/10 transition-colors">Night Routine</Link>
      <Link to="/journal" className="px-6 py-2 text-sm font-medium text-black/80 hover:text-black hover:bg-theme-primary/10 transition-colors">Makeup Tutorials</Link>
      <Link to="/journal" className="px-6 py-2 text-sm font-medium text-black/80 hover:text-black hover:bg-theme-primary/10 transition-colors">Seasonal Care</Link>
      <Link to="/journal" className="px-6 py-2 text-sm font-medium text-black/80 hover:text-black hover:bg-theme-primary/10 transition-colors">Beauty Trends</Link>
      <Link to="/journal" className="px-6 py-2 text-sm font-medium text-black/80 hover:text-black hover:bg-theme-primary/10 transition-colors">Product Launches</Link>
    </div>
  </motion.div>
);
