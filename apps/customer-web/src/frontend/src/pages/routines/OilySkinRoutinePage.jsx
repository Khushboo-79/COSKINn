import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Wind, Feather, ArrowRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/common/ProductCard';
import Footer from '../../components/common/Footer';
import { skincareProducts } from '../../constants/skincareProducts';
import heroImg from '../../assets/images/oily_hero.webp';

export default function OilySkinRoutinePage() {
  const [openFaq, setOpenFaq] = useState(0);

  const products = [
    skincareProducts.find(p => p.name === "COSKINn Strawberry Glow Cleanser") || skincareProducts[0],
    skincareProducts.find(p => p.name === "COSKINn Niacinamide Serum") || skincareProducts[0],
    skincareProducts.find(p => p.name === "COSKINn Face Mist") || skincareProducts[0]
  ];

  const faqs = [
    {
      question: "Do I still need moisturizer if my skin is oily?",
      answer: "Yes! In fact, skipping moisturizer can make your skin even oilier. When your skin is dehydrated, it overcompensates by producing excess sebum. A lightweight, water-based hydrator balances this process."
    },
    {
      question: "How does Niacinamide help oily skin?",
      answer: "Niacinamide (Vitamin B3) is clinically proven to regulate sebum production over time. It also reduces the appearance of enlarged pores, which are very common with oily skin types."
    }
  ];

  return (
    <div className="bg-[#FFFDFD] min-h-screen font-sans selection:bg-[#FF2D7A]/20">
      
      {/* 1. LUXURY 100VH TRUE SPLIT HERO SECTION */}
      <section className="relative w-full h-[100vh] min-h-[700px] flex items-center bg-[#FFFDFD] overflow-hidden">
        
        {/* Right Side Edge-to-Edge Image */}
        <div className="absolute top-0 right-0 w-full lg:w-[55%] h-full z-0">
          <motion.img 
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={heroImg} 
            alt="Oily Skincare Routine" 
            className="w-full h-full object-cover object-center" 
          />
          {/* Soft gradient overlay to blend into the left side seamlessly */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDFD] via-[#FFFDFD]/80 to-transparent w-full md:w-3/4"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDFD] via-[#FFFDFD]/80 to-transparent lg:hidden h-full"></div>
        </div>

        {/* Left Side Content Container */}
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 h-full flex flex-col justify-center pt-48 pb-16">
          <div className="w-full lg:w-[45%] lg:pr-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-400 mb-8">
                <Link to="/" className="hover:text-[#FF2D7A] transition-colors">Home</Link>
                <span>/</span>
                <Link to="/routine" className="hover:text-[#FF2D7A] transition-colors">Routine</Link>
              </div>
              
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-[#FF2D7A]/20 text-[#FF2D7A] text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
                Balance & Clarify
              </span>

              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-heading font-black text-[#1B1B1B] leading-[1.05] mb-8 tracking-tight">
                Pure <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D7A] to-[#FF8EAA] italic font-light">Balance.</span>
              </h1>
              
              <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-md mb-12">
                Control excess shine without stripping your skin. A lightweight, refreshing routine designed to regulate sebum and refine pores.
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <button className="px-10 py-4 bg-[#FF2D7A] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#E01B63] hover:shadow-[0_0_20px_rgba(255,45,122,0.4)] hover:scale-105 transition-all duration-300">
                  Shop Routine
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. THE BALANCE SYSTEM */}
      <section className="py-16 lg:py-20 bg-white relative overflow-hidden border-t border-[#FF2D7A]/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#1B1B1B] tracking-tight mb-8">Weightless Hydration.</h2>
              <p className="text-gray-600 text-xl leading-relaxed mb-6 font-medium">
                The biggest mistake made with oily skin is using harsh, stripping products. When you strip the skin of all its natural oils, it panic-produces even more oil to compensate.
              </p>
              <p className="text-gray-600 text-xl leading-relaxed mb-10 font-medium">
                Our approach focuses on hydration through water, not oil. We use weightless essences and Niacinamide to gently train the skin to produce less sebum over time.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#FFF5F8] p-6 rounded-3xl border border-[#FF2D7A]/10 shadow-sm hover:border-[#FF2D7A]/30 transition-colors">
                  <Wind className="w-8 h-8 text-[#FF2D7A] mb-4" />
                  <h4 className="font-bold text-[#1B1B1B] mb-2">Pore Refining</h4>
                  <p className="text-gray-500 text-sm font-medium">Niacinamide tightens the appearance of enlarged pores.</p>
                </div>
                <div className="bg-[#FFF5F8] p-6 rounded-3xl border border-[#FF2D7A]/10 shadow-sm hover:border-[#FF2D7A]/30 transition-colors">
                  <Feather className="w-8 h-8 text-[#FF2D7A] mb-4" />
                  <h4 className="font-bold text-[#1B1B1B] mb-2">Zero Greasiness</h4>
                  <p className="text-gray-500 text-sm font-medium">Water-based formulas sink in instantly with no residue.</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="bg-[#FFFDFD] rounded-[3rem] p-12 border border-[#FF2D7A]/10 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF2D7A]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF2D7A]/10 transition-colors"></div>
                <Activity className="w-12 h-12 text-[#FF2D7A] mb-8 relative z-10" />
                <h3 className="text-3xl font-heading font-bold text-[#1B1B1B] mb-6 relative z-10">Oily Skin Rules:</h3>
                <ul className="space-y-4 relative z-10">
                  <li className="flex items-center gap-4 text-gray-600 font-medium text-lg">
                    <span className="w-6 h-6 rounded-full bg-[#FF2D7A]/10 text-[#FF2D7A] flex items-center justify-center text-sm font-bold shrink-0">✓</span>
                    Look for "non-comedogenic" (won't clog pores)
                  </li>
                  <li className="flex items-center gap-4 text-gray-600 font-medium text-lg">
                    <span className="w-6 h-6 rounded-full bg-[#FF2D7A]/10 text-[#FF2D7A] flex items-center justify-center text-sm font-bold shrink-0">✓</span>
                    Double cleanse in the evening to break down sebum
                  </li>
                  <li className="flex items-center gap-4 text-gray-600 font-medium text-lg">
                    <span className="w-6 h-6 rounded-full bg-[#FF2D7A]/10 text-[#FF2D7A] flex items-center justify-center text-sm font-bold shrink-0">✓</span>
                    Use gel or water-based hydrators instead of heavy creams
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RECOMMENDED PRODUCTS */}
      <section className="py-16 lg:py-20 bg-[#FFF5F8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#1B1B1B] tracking-tight">The Balancing Lineup</h2>
            </div>
            <Link to="/shop-all-skincare" className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm text-[#FF2D7A] hover:text-[#E01B63] transition-colors">
              Explore All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <div key={idx} className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-[#FF2D7A]/10 hover:shadow-xl hover:border-[#FF2D7A]/30 hover:-translate-y-2 transition-all duration-500 relative">
                <div className="bg-[#FF2D7A]/10 text-[#FF2D7A] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full absolute -top-4 -right-4 z-20 shadow-sm border border-[#FF2D7A]/20">
                  Step {idx + 1}
                </div>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-[#1B1B1B] tracking-tight">Oily Skin FAQs</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#FFFDFD] rounded-[2rem] shadow-sm border border-[#FF2D7A]/10 hover:border-[#FF2D7A]/30 transition-all duration-300">
                <button
                  className="w-full px-8 py-8 flex justify-between items-center text-left"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                >
                  <span className="font-heading font-bold text-xl lg:text-2xl text-[#1B1B1B] pr-8">{faq.question}</span>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${openFaq === index ? 'bg-[#FF2D7A] text-white rotate-180' : 'bg-[#FFF5F8] border border-[#FF2D7A]/20 text-[#FF2D7A]'}`}>
                    <ChevronDown size={24} />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 pt-2 text-gray-600 font-medium leading-relaxed text-lg lg:text-xl">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
