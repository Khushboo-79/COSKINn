import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, FlaskConical, Rabbit, Droplets, Sparkles, Heart, Zap, Star, ShieldCheck } from 'lucide-react';

/* =========================================
   1. DATA & CONTENT
   ========================================= */

const ingredients = [
  { name: "Green Tea", top: "15%", right: "8%", delay: 0 },
  { name: "Strawberry", top: "45%", right: "5%", delay: 0.4 },
  { name: "Mango", bottom: "25%", right: "12%", delay: 0.8 },
];

const highlights = [
  { title: "Fruit Powered Formulas", desc: "Infused with antioxidant-rich botanical extracts.", icon: Leaf },
  { title: "Dermatologically Tested", desc: "Safe, gentle, and effective for all skin types.", icon: FlaskConical },
  { title: "Cruelty Free Formulations", desc: "Ethically crafted with zero animal testing.", icon: Rabbit },
  { title: "Clean Ingredients", desc: "Free from parabens, sulfates, and synthetics.", icon: Droplets },
  { title: "Visible Results", desc: "Reveals a naturally radiant glow daily.", icon: Sparkles },
  { title: "Suitable For All Skin Types", desc: "Balanced hydration tailored for you.", icon: Heart },
  { title: "Nature + Science", desc: "The perfect balance of purity and efficacy.", icon: Zap },
  { title: "Premium Formulations", desc: "Luxury and quality in every single drop.", icon: Star },
  { title: "Gentle Everyday Care", desc: "Your calming daily skincare ritual.", icon: ShieldCheck },
];

/* =========================================
   2. REUSABLE COMPONENTS
   ========================================= */

const GlassCard = ({ title, desc, icon: Icon, delay, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ x: -10, scale: 1.02 }}
    className={`relative group bg-white/50 backdrop-blur-2xl border border-white/70 p-6 sm:p-7 rounded-[32px] shadow-[0_20px_40px_rgba(43,89,104,0.08)] hover:shadow-[0_30px_60px_rgba(43,89,104,0.12)] transition-all duration-700 overflow-hidden cursor-default ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-theme-secondary/20 to-theme-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
    <div className="relative z-10 flex items-start gap-5">
      <div className="w-12 h-12 rounded-full bg-white border border-white flex items-center justify-center shrink-0 text-black shadow-sm group-hover:scale-110 group-hover:rotate-[10deg] transition-all duration-700">
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <div className="flex flex-col justify-center pt-1">
        <h4 className="text-[16px] font-heading font-semibold text-black tracking-wide mb-1 leading-tight">{title}</h4>
        <p className="text-[13.5px] text-black/70 font-medium leading-[1.6]">{desc}</p>
      </div>
    </div>
  </motion.div>
);

const TypoCard = ({ title, desc, number, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className="relative flex flex-col gap-2 pl-6 border-l-2 border-theme-accent/40 group hover:border-black transition-colors duration-500 py-1"
  >
    <span className="absolute -left-[1px] -translate-x-1/2 top-0 text-[10px] font-bold text-theme-accent group-hover:text-black transition-colors bg-white py-1">{number}</span>
    <h4 className="text-[19px] lg:text-[20px] font-heading font-medium text-black">{title}</h4>
    <p className="text-[14.5px] lg:text-[15.5px] text-black/60 font-medium leading-[1.7] max-w-[320px]">{desc}</p>
  </motion.div>
);

const IngredientPill = ({ name, top, left, right, bottom, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay, ease: "easeOut" }}
    animate={{ y: [0, -10, 0] }}
    style={{ top, left, right, bottom }}
    className="absolute z-30 flex items-center gap-2.5 bg-white/40 backdrop-blur-xl border border-white/60 py-2.5 px-5 rounded-full shadow-[0_15px_30px_rgba(43,89,104,0.08)] pointer-events-none"
  >
    <div className="w-1.5 h-1.5 rounded-full bg-theme-primary animate-pulse" />
    <span className="text-[11px] font-bold text-black uppercase tracking-[0.2em] leading-none">{name}</span>
  </motion.div>
);

/* =========================================
   3. MAIN COMPONENT
   ========================================= */

export default function WhyChooseUs() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-white py-24 lg:py-40 overflow-hidden font-body text-black selection:bg-theme-secondary selection:text-black"
    >
      {/* LUXURY BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(247,220,224,0.5)_0%,rgba(202,186,177,0)_50%,rgba(255,255,255,0)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(151,181,194,0.15)_0%,rgba(255,255,255,0)_60%)]" />
        
        <motion.div 
          style={{ y: yBg }}
          className="absolute top-[20%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-theme-secondary/20 blur-[140px] mix-blend-multiply"
        />
        <motion.div 
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-theme-accent/10 blur-[130px]"
        />
      </div>

      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:pl-16 lg:pr-10 relative z-10">
        
        {/* EDITORIAL SPLIT COMPOSITION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
          
          {/* LEFT COLUMN: Header & Text Blocks */}
          <div className="lg:col-span-4 flex flex-col gap-10 lg:gap-14 pt-0 lg:pr-10 relative z-30 mb-16 lg:mb-0">
            
            {/* Header */}
            <div className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-3 mb-5"
              >
                <div className="h-[1px] w-8 bg-black/30"></div>
                <span className="text-[10px] font-bold tracking-[0.3em] text-black/60 uppercase">
                  Why COSKINn
                </span>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-heading text-[3.5rem] lg:text-[4.5rem] leading-[1.05] text-black tracking-tight"
              >
                Nature <br />
                <span className="italic font-light text-theme-accent">Perfected.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[16px] lg:text-[17px] text-black/70 font-medium leading-[1.9] mt-6 max-w-[380px]"
              >
                Experience skincare crafted with uncompromising standards. A harmonious blend of potent botanical extracts and advanced science, designed to reveal your naturally radiant glow.
              </motion.p>
            </div>

            {/* Typography Highlights */}
            <div className="flex flex-col gap-8 lg:gap-10 mt-2">
              <TypoCard {...highlights[0]} number="01" delay={0.2} />
              <TypoCard {...highlights[1]} number="02" delay={0.3} />
              <TypoCard {...highlights[2]} number="03" delay={0.4} />
            </div>

          </div>

          {/* RIGHT COLUMN: Massive Premium Visual Composition */}
          <div className="lg:col-span-8 relative flex items-center z-20">
            
            {/* Massive Editorial Image Container */}
            <div className="relative w-full aspect-[4/5] lg:aspect-[4/4.5] rounded-[48px] lg:rounded-[64px] overflow-hidden shadow-[0_40px_100px_rgba(43,89,104,0.12)] bg-white border border-white/60 group">
              
              <motion.img 
                src="/why-choose-us-model.png" 
                alt="Beautiful woman using COSKINn skincare"
                className="w-full h-full object-cover object-center lg:object-[center_20%] scale-[1.02] transition-transform duration-[2.5s] ease-out group-hover:scale-[1.06]"
              />

              {/* COSKINn Brand Name Overlay on the Campaign Image */}
              <div className="absolute inset-0 flex items-center justify-center z-20 mix-blend-overlay opacity-50 pointer-events-none">
                 <span className="font-heading text-white text-[6rem] lg:text-[9rem] font-light tracking-[0.3em] uppercase rotate-[-90deg] translate-x-10 drop-shadow-xl">COSKINn</span>
              </div>

              {/* Luxury Overlays for Depth and Contrast */}
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent pointer-events-none z-10 opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-tr from-theme-secondary/20 to-transparent pointer-events-none z-10 mix-blend-multiply" />
              
              {/* Soft Glass Reflection Sweep */}
              <div className="absolute top-0 bottom-0 -left-[100%] w-[50%] bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-[30deg] z-20 group-hover:left-[200%] transition-all duration-[3s] ease-in-out pointer-events-none" />

              {/* Botanical Pills - Inside the image */}
              {ingredients.map((ing, idx) => (
                <IngredientPill key={idx} {...ing} />
              ))}

            </div>

            {/* Floating Composited Product (Guaranteeing realistic product presence) */}
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
               className="absolute bottom-[-5%] lg:bottom-12 left-[5%] lg:left-[-12%] w-[120px] lg:w-[180px] aspect-[3/4] z-50 rounded-[24px] lg:rounded-[32px] overflow-hidden shadow-[0_30px_60px_rgba(43,89,104,0.2)] border border-white/60 bg-white"
            >
               <div className="absolute inset-0 bg-black/10 mix-blend-overlay z-10 pointer-events-none" />
               <div className="absolute inset-0 flex items-center justify-center z-20 mix-blend-overlay opacity-80 pointer-events-none bg-black/5">
                  <span className="font-heading text-white text-3xl lg:text-[2.5rem] font-light tracking-[0.3em] uppercase rotate-[-90deg]">COSKINn</span>
               </div>
               <img src="/mockup_product_1.png" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-tr from-theme-secondary/30 to-transparent mix-blend-multiply z-10 pointer-events-none" />
            </motion.div>

            {/* Overlapping Glass Cards - Creating Depth on the Left Edge */}
            <div className="hidden lg:flex flex-col gap-6 xl:gap-8 absolute top-1/2 -translate-y-1/2 -left-[180px] xl:-left-[200px] z-40">
               <GlassCard {...highlights[4]} delay={0.2} className="w-[320px] xl:w-[350px] ml-6 xl:ml-12" />
               <GlassCard {...highlights[6]} delay={0.4} className="w-[320px] xl:w-[350px] -ml-6 xl:-ml-10" />
               <GlassCard {...highlights[8]} delay={0.6} className="w-[320px] xl:w-[350px] ml-10 xl:ml-16" />
            </div>

            {/* Mobile Overlapping Glass Cards */}
            <div className="flex lg:hidden flex-col gap-4 absolute -bottom-[15%] left-4 right-4 z-40">
               <GlassCard {...highlights[4]} delay={0.2} />
               <GlassCard {...highlights[6]} delay={0.4} />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
