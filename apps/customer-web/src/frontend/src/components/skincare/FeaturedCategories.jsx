import React from 'react';
import { motion } from 'framer-motion';

/* =========================================
   1. DATA & CONTENT
   ========================================= */

const categories = [
  {
    id: "cat1",
    title: "Deep Cleansing Ritual",
    description: "Melts away impurities while perfectly protecting your natural skin barrier.",
    products: "Cleanser & Balm",
    ingredient: "Green Tea Extract",
    productImg: "/cleanser_bottle_coskin.png",
    bgImg: "/bg-greentea.webp",
    modelImg: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200&auto=format&fit=crop",
    gradient: "from-theme-neutral/50 to-theme-surface",
  },
  {
    id: "cat2",
    title: "Daily Sun Defense",
    description: "Invisible, weightless UV defense infused with deep, long-lasting hydration.",
    products: "Sunscreen & Lip SPF",
    ingredient: "Mango Butter",
    productImg: "/mockup_product_2.png",
    bgImg: "/bg-mango.webp",
    modelImg: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop",
    gradient: "from-theme-secondary/60 to-theme-surface",
  },
  {
    id: "cat3",
    title: "Instant Refresh Mist",
    description: "A burst of antioxidant hydration anywhere, anytime for a dewy finish.",
    products: "Face Mist & Perfume",
    ingredient: "Strawberry & Rose",
    productImg: "/mockup_product_1.png",
    bgImg: "/bg-strawberry.webp",
    modelImg: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1200&auto=format&fit=crop",
    gradient: "from-theme-accent/50 to-theme-surface",
  },
  {
    id: "cat4",
    title: "Overnight Mask",
    description: "Wake up to intensely hydrated, radiant, and fully repaired skin.",
    products: "Night Mask & Patches",
    ingredient: "Blueberry Complex",
    productImg: "/serum_bottle_coskin.png",
    bgImg: "/bg-blueberry.webp",
    modelImg: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
    gradient: "from-theme-primary/40 to-theme-surface",
  }
];

/* =========================================
   2. REUSABLE EDITORIAL CARD COMPONENT
   ========================================= */

const CategoryCard = ({ data, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className="relative w-full h-full rounded-[32px] overflow-hidden group shadow-[0_20px_40px_rgba(43,89,104,0.05)] hover:shadow-[0_40px_80px_rgba(43,89,104,0.15)] border border-white/60 cursor-pointer bg-white"
    >
       {/* 1. Base Gradient & Organic Botanical Background (Default State) */}
       <div className={`absolute inset-0 bg-gradient-to-br ${data.gradient} z-0 transition-opacity duration-[1.2s] group-hover:opacity-10`} />
       <div className="absolute inset-0 opacity-40 group-hover:opacity-0 transition-opacity duration-[1.2s] mix-blend-overlay z-0 pointer-events-none">
          <img src={data.bgImg} alt={data.ingredient} className="w-full h-full object-cover blur-[3px]" />
       </div>

       {/* 2. The Premium Model Lifestyle Reveal (Fades in on hover) */}
       <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-[1.2s] ease-in-out overflow-hidden pointer-events-none">
          <img 
            src={data.modelImg} 
            alt={`${data.title} Lifestyle`} 
            className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[4s] ease-out" 
          />
          {/* Subtle gradient overlay to guarantee glassmorphism text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-theme-surface/90 via-theme-surface/30 to-transparent opacity-90" />
       </div>

       {/* 3. The Product Composition (Moves, scales, and rotates aside on hover) */}
       <div className="absolute inset-0 z-20 flex items-center justify-center p-8 lg:p-12 overflow-hidden pointer-events-none">
          
          {/* COSKINn Brand Overlay strictly locked to product */}
          <div className="absolute inset-0 flex items-center justify-center mix-blend-overlay opacity-60 z-30 transition-all duration-[1.2s] ease-out group-hover:opacity-50 group-hover:-translate-x-[20%] lg:group-hover:-translate-x-[25%] group-hover:scale-75 group-hover:rotate-[-5deg]">
             <span className="font-heading text-theme-dark text-[4.5rem] lg:text-[7rem] tracking-[0.3em] font-light rotate-[-90deg]">COSKINn</span>
          </div>
          
          <img 
            src={data.productImg} 
            alt={data.title} 
            className="w-full h-full object-cover lg:object-contain mix-blend-multiply drop-shadow-[0_30px_60px_rgba(0,0,0,0.1)] scale-[1.02] transition-all duration-[1.2s] ease-out group-hover:scale-75 group-hover:-translate-x-[20%] lg:group-hover:-translate-x-[25%] group-hover:translate-y-[10%] group-hover:rotate-[-5deg] group-hover:drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)] z-20" 
          />
       </div>

       {/* 4. Glass Reflection & Moving Light Sweep (Triggers on hover) */}
       <div className="absolute top-0 bottom-0 -left-[100%] w-[50%] bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-[30deg] z-30 group-hover:left-[200%] transition-all duration-[2s] ease-in-out pointer-events-none" />

       {/* 5. Bottom Gradient Fade for Typography Legibility (Always present) */}
       <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-theme-surface/90 via-theme-surface/20 to-transparent z-30 pointer-events-none transition-opacity duration-700" />

       {/* 6. Glassmorphism Content Layer */}
       <div className="absolute bottom-5 left-5 right-5 lg:bottom-6 lg:left-6 lg:right-6 z-40">
          <div className="bg-white/40 backdrop-blur-2xl border border-white/60 p-5 lg:p-7 rounded-[24px] shadow-[0_15px_40px_rgba(43,89,104,0.06)] transform transition-all duration-[0.8s] ease-out group-hover:-translate-y-2 group-hover:bg-white/60">
             
             <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
                <div>
                   <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-theme-accent mb-2 block">
                      {data.products}
                   </span>
                   <h3 className="font-heading text-[22px] lg:text-[26px] font-medium text-theme-dark mb-1 leading-tight">
                      {data.title}
                   </h3>
                   <p className="text-[13px] text-theme-dark/70 font-medium max-w-[280px] leading-relaxed">
                      {data.description}
                   </p>
                </div>

                <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/80 shrink-0 shadow-sm self-start xl:self-end">
                   <div className="w-1.5 h-1.5 rounded-full bg-theme-primary animate-pulse" />
                   <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-theme-dark/80 whitespace-nowrap">
                      {data.ingredient}
                   </span>
                </div>
             </div>

          </div>
       </div>

    </motion.div>
  );
};

/* =========================================
   3. MAIN SECTION COMPONENT
   ========================================= */

export default function FeaturedCategories() {
  return (
    <section className="relative w-full bg-[#fcfaf9] pt-16 pb-24 lg:pt-20 lg:pb-32 overflow-hidden font-body text-theme-dark selection:bg-theme-secondary selection:text-theme-dark">
      
      {/* 
        =========================================
        LUXURY LAYERED BACKGROUND
        =========================================
      */}
      <div className="absolute inset-0 pointer-events-none z-0">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(247,220,224,0.3)_0%,rgba(255,255,255,0)_60%)]" />
         <motion.div 
           animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
           transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
           className="absolute bottom-[10%] right-[-5%] w-[45vw] h-[45vw] bg-theme-primary/10 blur-[140px] rounded-full mix-blend-multiply" 
         />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* 
          =========================================
          EDITORIAL SECTION HEADER
          =========================================
        */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20 mt-4 lg:mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[1px] w-12 bg-theme-dark/30" />
            <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-theme-dark/70">
              Curated Collections
            </span>
            <div className="h-[1px] w-12 bg-theme-dark/30" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-[3.2rem] sm:text-[4rem] lg:text-[4.5rem] leading-[1.05] tracking-tight text-theme-dark mb-5"
          >
            Featured <span className="italic font-light text-theme-primary">Rituals</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[15px] lg:text-[16px] text-theme-dark/70 font-medium leading-[1.9] max-w-[500px]"
          >
            Discover our signature botanical formulations. Hover over each collection to explore the luxury skincare experience.
          </motion.p>
        </div>

        {/* 
          =========================================
          ASYMMETRICAL EDITORIAL BENTO GRID
          =========================================
        */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 auto-rows-[400px] md:auto-rows-[350px]">
          
          {/* Large Hero Category - Spans 8 cols, 2 rows (Desktop: 700px+ height) */}
          <div className="md:col-span-8 md:row-span-2 h-[500px] md:h-auto">
            <CategoryCard data={categories[0]} delay={0.1} />
          </div>

          {/* Medium Vertical - Spans 4 cols, 2 rows */}
          <div className="md:col-span-4 md:row-span-2 h-[450px] md:h-auto">
            <CategoryCard data={categories[1]} delay={0.2} />
          </div>

          {/* Wide Horizontal - Spans 7 cols, 1 row */}
          <div className="md:col-span-7 md:row-span-1 h-[350px] md:h-auto">
            <CategoryCard data={categories[2]} delay={0.3} />
          </div>

          {/* Small Premium - Spans 5 cols, 1 row */}
          <div className="md:col-span-5 md:row-span-1 h-[350px] md:h-auto">
            <CategoryCard data={categories[3]} delay={0.4} />
          </div>

        </div>

      </div>
    </section>
  );
}
