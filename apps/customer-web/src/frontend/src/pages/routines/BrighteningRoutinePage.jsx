import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Sun, Sparkles, Citrus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/common/ProductCard';
import Footer from '../../components/common/Footer';
import { skincareProducts } from '../../constants/skincareProducts';
import heroImg from '../../assets/images/brightening_hero.webp';
import vitCImg from '../../assets/images/sunscreen_spf50_lifestyle.webp';

export default function BrighteningRoutinePage() {
  const [openFaq, setOpenFaq] = useState(0);

  const products = [
    skincareProducts.find(p => p.name === "COSKINn Vitamin C Serum") || skincareProducts[0],
    skincareProducts.find(p => p.name === "COSKINn Strawberry Glow Cleanser") || skincareProducts[0],
    skincareProducts.find(p => p.name === "COSKINn Vitamin C Sunscreen SPF 50") || skincareProducts[0]
  ];

  const faqs = [
    {
      question: "Can I use Vitamin C every day?",
      answer: "Yes, our Vitamin C formula is stabilized and encapsulated, making it gentle enough for daily morning use without causing irritation."
    },
    {
      question: "Does this routine help with acne scars?",
      answer: "Absolutely. Vitamin C inhibits melanin production, which significantly accelerates the fading of hyperpigmentation and post-inflammatory erythema (dark spots left by acne)."
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
            alt="Brightening Skincare Routine" 
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
                Illuminate & Fade
              </span>

              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-heading font-black text-[#1B1B1B] leading-[1.05] mb-8 tracking-tight">
                Maximum <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D7A] to-[#FF8EAA] italic font-light">Radiance.</span>
              </h1>
              
              <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-md mb-12">
                Erase dullness and fade dark spots with our potent, citrus-powered brightening regimen designed for a lit-from-within glow.
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

      {/* 2. THE VITAMIN C DIFFERENCE */}
      <section className="py-16 lg:py-20 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="bg-[#FFFDFD] rounded-[3rem] p-12 border border-[#FF2D7A]/10 shadow-sm relative overflow-hidden group hover:shadow-xl transition-shadow duration-500">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#FF2D7A]/5 to-transparent rounded-full blur-3xl group-hover:from-[#FF2D7A]/10 transition-colors duration-700 pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row gap-16 items-center relative z-10">
              <div className="w-full md:w-1/2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm border border-[#FF2D7A]/10 mb-8">
                  <Citrus className="w-8 h-8 text-[#FF2D7A]" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#1B1B1B] mb-6 tracking-tight">The Citrus Engine</h2>
                <p className="text-gray-600 text-xl font-medium leading-relaxed mb-8">
                  Not all Vitamin C is created equal. Our proprietary blend combines L-Ascorbic Acid with Kakadu Plum—the world's richest source of natural Vitamin C—for maximum stability and cellular uptake.
                </p>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <Sparkles className="w-6 h-6 text-[#FF2D7A] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold text-[#1B1B1B]">Fades Hyperpigmentation</h4>
                      <p className="text-gray-500">Actively blocks the tyrosinase enzyme to prevent new dark spots.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Sun className="w-6 h-6 text-[#FF2D7A] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold text-[#1B1B1B]">Fights Free Radicals</h4>
                      <p className="text-gray-500">Neutralizes environmental damage before it ages your skin.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 h-[500px] rounded-3xl overflow-hidden shadow-lg border border-[#FF2D7A]/10">
                <img src={vitCImg} alt="Vitamin C Serum Application" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#1B1B1B] tracking-tight">The Brightening Lineup</h2>
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

      {/* 4. THE GOLDEN RULES */}
      <section className="py-16 lg:py-20 bg-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-[#1B1B1B] tracking-tight">The Golden Rules</h2>
            <p className="text-gray-500 font-medium text-xl mt-4">How to maximize your brightening results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#FFFDFD] p-12 rounded-[3rem] border border-[#FF2D7A]/10 hover:border-[#FF2D7A]/30 hover:shadow-xl transition-all duration-500 flex flex-col justify-center">
              <span className="text-[#FF2D7A] font-bold text-sm uppercase tracking-widest mb-4 block">Rule 01</span>
              <h3 className="text-3xl font-heading font-bold text-[#1B1B1B] mb-6">Sunscreen is Non-Negotiable</h3>
              <p className="text-gray-600 font-medium leading-relaxed text-lg mb-8">
                There is absolutely no point in using brightening serums if you don't protect your skin from the sun. UV exposure instantly triggers melanin production, undoing all your hard work.
              </p>
              <div className="bg-white p-6 rounded-2xl flex items-center gap-6 border border-gray-100">
                <Sun className="w-10 h-10 text-[#FF2D7A]" />
                <p className="font-bold text-[#1B1B1B]">Apply 2 finger-lengths of SPF 50 every morning, regardless of the weather.</p>
              </div>
            </div>

            <div className="bg-[#FFFDFD] p-12 rounded-[3rem] border border-[#FF2D7A]/10 hover:border-[#FF2D7A]/30 hover:shadow-xl transition-all duration-500 flex flex-col justify-center">
              <span className="text-[#FF2D7A] font-bold text-sm uppercase tracking-widest mb-4 block">Rule 02</span>
              <h3 className="text-3xl font-heading font-bold text-[#1B1B1B] mb-6">Patience & Consistency</h3>
              <p className="text-gray-600 font-medium leading-relaxed text-lg mb-8">
                True brightening happens at the cellular level. It takes a minimum of 28 days for your skin cells to turn over completely and reveal the brighter layers beneath.
              </p>
              <div className="bg-white p-6 rounded-2xl flex items-center gap-6 border border-gray-100">
                <Sparkles className="w-10 h-10 text-[#FF2D7A]" />
                <p className="font-bold text-[#1B1B1B]">Use the Vitamin C serum daily for 6 weeks to see a dramatic reduction in dark spots.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="py-16 lg:py-24 bg-[#FFF5F8]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-[#1B1B1B] tracking-tight">Brightening FAQs</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-[2rem] shadow-sm border border-[#FF2D7A]/10 hover:border-[#FF2D7A]/30 transition-all duration-300">
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
