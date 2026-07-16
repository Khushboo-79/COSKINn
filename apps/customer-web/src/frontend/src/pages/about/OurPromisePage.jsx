import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ShieldCheck } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const PROMISES = [
  {
    icon: <Heart size={32} />,
    title: "Cruelty Free",
    desc: "We love animals. That's why we guarantee that none of our products or ingredients are ever tested on animals."
  },
  {
    icon: <Sparkles size={32} />,
    title: "100% Vegan Formulas",
    desc: "Nature provides everything we need. Our formulas are completely free from animal-derived ingredients."
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Dermatologist Tested",
    desc: "Your safety is our priority. Every product undergoes rigorous clinical testing to ensure it is gentle and effective."
  }
];

export default function OurPromisePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDFD] flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative w-full pt-32 pb-24 px-6 lg:px-12 bg-gradient-to-br from-[#FFF5F8] to-[#FFFDFD] overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#FFDCEB]/50 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center lg:text-left"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#FF2D7A]/20 text-[#FF2D7A] text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
                Our Values
              </span>
              <h1 className="text-4xl lg:text-6xl font-heading font-black text-[#1B1B1B] leading-tight mb-6">
                Skincare Without Compromise.
              </h1>
              <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                At COSKINn, we believe you shouldn't have to choose between clean ingredients, luxurious textures, and real results. Our promise to you is simple: pure, potent, and proven skincare.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 w-full"
            >
              <div className="w-full h-[400px] lg:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1615397323136-1e0e84c9823f?w=800&q=80" 
                  alt="Luxurious Skincare Texture" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROMISES GRID */}
        <section className="py-24 px-6 lg:px-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-heading font-black text-[#1B1B1B] mb-4">The COSKINn Standard</h2>
              <p className="text-gray-500 font-medium">We hold ourselves to the highest standards, so you can glow with confidence.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PROMISES.map((promise, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-[#FFFDFD] rounded-[2rem] p-10 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(255,45,122,0.08)] hover:border-[#FF2D7A]/20 transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 mx-auto bg-[#FFF5F8] rounded-full flex items-center justify-center text-[#FF2D7A] mb-6">
                    {promise.icon}
                  </div>
                  <h3 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">{promise.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">{promise.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
