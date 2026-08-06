import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const INGREDIENTS = [
  {
    name: "Strawberry Extract",
    benefit: "Brightening & Exfoliating",
    desc: "Rich in natural Vitamin C and salicylic acid, it gently buffs away dead skin cells to reveal a brighter, smoother complexion.",
    img: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=600&q=80"
  },
  {
    name: "Green Tea",
    benefit: "Soothing & Clarifying",
    desc: "Packed with antioxidants and EGCG, green tea significantly reduces inflammation and helps regulate sebum production.",
    img: "https://images.unsplash.com/photo-1627490087228-077a222f7cc6?w=600&q=80"
  },
  {
    name: "Pomegranate",
    benefit: "Firming & Antioxidant",
    desc: "A powerhouse of ellagic acid, pomegranate extract protects against free radicals and promotes cellular regeneration.",
    img: "https://images.unsplash.com/photo-1615486171448-4fb62e032121?w=600&q=80"
  }
];

export default function IngredientPhilosophyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDFD] flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO */}
        <section className="pt-32 pb-24 px-6 lg:px-12 text-center bg-[#FFFDFD]">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-6xl font-heading font-black text-[#1B1B1B] mb-6"
          >
            Powered by Fruit. Backed by Science.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-gray-500 text-lg font-medium max-w-2xl mx-auto"
          >
            We believe that the most potent skincare ingredients are grown, not synthesized. Discover the superfoods that fuel our formulas.
          </motion.p>
        </section>

        {/* INGREDIENTS GRID */}
        <section className="pb-24 px-6 lg:px-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {INGREDIENTS.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative rounded-[2.5rem] overflow-hidden shadow-xl aspect-[4/5]"
              >
                <img src={item.img} alt={item.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-widest mb-3">
                    {item.benefit}
                  </span>
                  <h3 className="text-3xl font-heading font-black mb-3">{item.name}</h3>
                  <p className="text-white/80 font-medium text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
