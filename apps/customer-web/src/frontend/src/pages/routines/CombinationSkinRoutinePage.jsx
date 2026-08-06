import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, SplitSquareVertical, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/common/ProductCard';
import Footer from '../../components/common/Footer';
import { skincareProducts } from '../../constants/skincareProducts';
import heroImg from '../../assets/images/lifestyle_selfcare.webp';

export default function CombinationSkinRoutinePage() {
  const [openFaq, setOpenFaq] = useState(0);

  const products = [
    skincareProducts.find(p => p.name === "COSKINn Gentle Cleanser") || skincareProducts[0],
    skincareProducts.find(p => p.name === "COSKINn Vitamin C Serum") || skincareProducts[0],
    skincareProducts.find(p => p.name === "COSKINn Daily Moisturiser") || skincareProducts[0],
    skincareProducts.find(p => p.name === "COSKINn Sunscreen SPF 50") || skincareProducts[0]
  ];

  const faqs = [
    {
      question: "Do I need to buy two different moisturizers?",
      answer: "No. The key to combination skin is finding a perfectly balanced, adaptable formula. Our Daily Moisturiser is designed to hydrate dry cheeks deeply while absorbing instantly into the T-zone without leaving a greasy residue."
    },
    {
      question: "How do I manage my oily T-zone?",
      answer: "Gentle cleansing is crucial. Stripping your T-zone with harsh acids will only cause it to produce more oil. Use our Gentle Cleanser to remove excess sebum, and rely on our Vitamin C Serum to balance overall skin tone."
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
            alt="Combination Skincare Routine" 
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
                Adapt & Harmonize
              </span>

              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-heading font-black text-[#1B1B1B] leading-[1.05] mb-8 tracking-tight">
                Perfect <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D7A] to-[#FF8EAA] italic font-light">Harmony.</span>
              </h1>
              
              <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-md mb-12">
                Oily T-zone meets dry cheeks? No problem. Discover the adaptable routine that intuitively balances both extremes.
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

      {/* 2. THE ADAPTIVE SYSTEM */}
      <section className="py-16 lg:py-20 bg-[#FFF5F8] relative overflow-hidden border-t border-[#FF2D7A]/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#1B1B1B] tracking-tight mb-8">Smart Skincare.</h2>
              <p className="text-gray-600 text-xl leading-relaxed mb-6 font-medium">
                Combination skin can feel like a daily battle between two different faces. You need products that are smart enough to adapt to varying zones.
              </p>
              <p className="text-gray-600 text-xl leading-relaxed mb-10 font-medium">
                This routine leverages bio-compatible ingredients that provide deep hydration where you are dry, while remaining lightweight enough to not overwhelm where you are oily.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-[#FF2D7A]/10 shadow-sm hover:border-[#FF2D7A]/30 transition-colors">
                  <SplitSquareVertical className="w-8 h-8 text-[#FF2D7A] mb-4" />
                  <h4 className="font-bold text-[#1B1B1B] mb-2">Zone Targeting</h4>
                  <p className="text-gray-500 text-sm font-medium">Adaptable hydration that balances the T-zone and cheeks.</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-[#FF2D7A]/10 shadow-sm hover:border-[#FF2D7A]/30 transition-colors">
                  <Layers className="w-8 h-8 text-[#FF2D7A] mb-4" />
                  <h4 className="font-bold text-[#1B1B1B] mb-2">Layering Friendly</h4>
                  <p className="text-gray-500 text-sm font-medium">Buildable formulas let you add more moisture exactly where needed.</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-[3rem] p-12 border border-[#FF2D7A]/10 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF2D7A]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF2D7A]/10 transition-colors"></div>
                <Sparkles className="w-12 h-12 text-[#FF2D7A] mb-8 relative z-10" />
                <h3 className="text-3xl font-heading font-bold text-[#1B1B1B] mb-6 relative z-10">Pro Tips for Combo Skin:</h3>
                <ul className="space-y-4 relative z-10">
                  <li className="flex items-center gap-4 text-gray-600 font-medium text-lg">
                    <span className="w-6 h-6 rounded-full bg-[#FF2D7A]/10 text-[#FF2D7A] flex items-center justify-center text-sm font-bold shrink-0">✓</span>
                    Apply serum evenly across the entire face
                  </li>
                  <li className="flex items-center gap-4 text-gray-600 font-medium text-lg">
                    <span className="w-6 h-6 rounded-full bg-[#FF2D7A]/10 text-[#FF2D7A] flex items-center justify-center text-sm font-bold shrink-0">✓</span>
                    Apply moisturizer starting on dry cheeks first
                  </li>
                  <li className="flex items-center gap-4 text-gray-600 font-medium text-lg">
                    <span className="w-6 h-6 rounded-full bg-[#FF2D7A]/10 text-[#FF2D7A] flex items-center justify-center text-sm font-bold shrink-0">✓</span>
                    Sweep only whatever is left on your hands over the T-zone
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RECOMMENDED PRODUCTS */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#1B1B1B] tracking-tight">The Harmony Lineup</h2>
            </div>
            <Link to="/shop-all-skincare" className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm text-[#FF2D7A] hover:text-[#E01B63] transition-colors">
              Explore All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, idx) => (
              <div key={idx} className="bg-[#FFFDFD] rounded-[2.5rem] p-4 shadow-sm border border-[#FF2D7A]/10 hover:shadow-xl hover:border-[#FF2D7A]/30 hover:-translate-y-2 transition-all duration-500 relative">
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
      <section className="py-16 lg:py-24 bg-[#FFF5F8]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-[#1B1B1B] tracking-tight">Combo Skin FAQs</h2>
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
