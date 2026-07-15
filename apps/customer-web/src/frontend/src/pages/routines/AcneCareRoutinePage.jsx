import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Droplets, Target, Wind, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/common/ProductCard';
import Footer from '../../components/common/Footer';
import { skincareProducts } from '../../constants/skincareProducts';
import heroImg from '../../assets/images/acne_hero.webp';

export default function AcneCareRoutinePage() {
  const [openFaq, setOpenFaq] = useState(0);

  const products = [
    skincareProducts.find(p => p.name === "COSKINn Foaming Cleanser" || p.name === "COSKINn Strawberry Glow Cleanser") || skincareProducts[0],
    skincareProducts.find(p => p.name === "COSKINn Niacinamide Serum") || skincareProducts[0],
    skincareProducts.find(p => p.name === "COSKINn Face Mist") || skincareProducts[0]
  ];

  const faqs = [
    {
      question: "Will this routine dry out my skin?",
      answer: "No. Unlike harsh chemical treatments, our fruit-powered routine clears acne while simultaneously maintaining your skin's moisture barrier."
    },
    {
      question: "How long until I see results?",
      answer: "You should notice reduced redness and inflammation within 48 hours. For significant clearing of acne, consistent use for 4-6 weeks is required as your skin goes through its natural renewal cycle."
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
            alt="Acne Care Skincare Routine" 
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
                Target & Clear
              </span>

              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-heading font-black text-[#1B1B1B] leading-[1.05] mb-8 tracking-tight">
                Clear Skin <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D7A] to-[#FF8EAA] italic font-light">Journey.</span>
              </h1>
              
              <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-md mb-12">
                Take control of breakouts and soothe inflammation with our targeted, non-comedogenic fruit-powered regimen.
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

      {/* 2. ACNE RECOVERY FLOW */}
      <section className="py-16 lg:py-20 relative bg-white border-t border-[#FF2D7A]/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-[#1B1B1B] tracking-tight">Acne Recovery Flow</h2>
            <p className="text-gray-500 font-medium text-xl mt-4 max-w-2xl mx-auto">Acne requires a delicate balance of deep pore purification and gentle barrier support.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="bg-[#FFFDFD] rounded-[3rem] p-12 border border-[#FF2D7A]/10 hover:shadow-xl hover:border-[#FF2D7A]/30 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF2D7A]/5 rounded-full blur-2xl group-hover:bg-[#FF2D7A]/10 transition-colors"></div>
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#FF2D7A] shadow-sm mb-8 z-10 border border-[#FF2D7A]/10">
                <Droplets size={36} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-[#1B1B1B] mb-4 z-10">1. Deep Cleanse</h3>
              <p className="text-gray-600 font-medium leading-relaxed z-10 text-lg">Wash with our clarifying cleanser to dissolve excess sebum and remove breakout-causing bacteria without stripping your skin.</p>
            </div>

            <div className="bg-[#FFFDFD] rounded-[3rem] p-12 border border-[#FF2D7A]/10 hover:shadow-xl hover:border-[#FF2D7A]/30 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center group relative overflow-hidden lg:-translate-y-12">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF8EAA]/5 rounded-full blur-2xl group-hover:bg-[#FF8EAA]/10 transition-colors"></div>
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#FF2D7A] shadow-sm mb-8 z-10 border border-[#FF2D7A]/10">
                <Target size={36} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-[#1B1B1B] mb-4 z-10">2. Target & Treat</h3>
              <p className="text-gray-600 font-medium leading-relaxed z-10 text-lg">Apply the Niacinamide Serum to actively reduce inflammation, fade post-acne marks, and regulate oil production.</p>
            </div>

            <div className="bg-[#FFFDFD] rounded-[3rem] p-12 border border-[#FF2D7A]/10 hover:shadow-xl hover:border-[#FF2D7A]/30 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF2D7A]/5 rounded-full blur-2xl group-hover:bg-[#FF2D7A]/10 transition-colors"></div>
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#FF2D7A] shadow-sm mb-8 z-10 border border-[#FF2D7A]/10">
                <Wind size={36} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-[#1B1B1B] mb-4 z-10">3. Soothe & Hydrate</h3>
              <p className="text-gray-600 font-medium leading-relaxed z-10 text-lg">Finish with a generous spritz of our Green Tea Face Mist to calm redness and provide weightless, non-pore-clogging hydration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SKIN RECOVERY PROGRESS */}
      <section className="py-16 lg:py-20 bg-[#FFF5F8] relative">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="mb-16 text-center">
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-[#1B1B1B] tracking-tight">Skin Recovery Progress</h2>
            <p className="text-gray-500 font-medium text-xl mt-4">What to expect when you commit to the clear skin journey.</p>
          </div>

          <div className="bg-white rounded-[3rem] p-12 lg:p-20 border border-[#FF2D7A]/10 shadow-sm relative overflow-hidden hover:shadow-xl transition-shadow duration-500">
            {/* Connecting Line */}
            <div className="absolute top-[120px] left-[10%] right-[10%] h-1.5 bg-[#FFF5F8] hidden md:block"></div>
            <div className="absolute top-[120px] left-[10%] h-1.5 bg-[#FF2D7A] shadow-[0_0_10px_#FF2D7A] hidden md:block animate-[growWidth_3s_ease-out_forwards]"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center relative z-10">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-[#FF2D7A] text-white flex items-center justify-center font-bold text-2xl shadow-[0_0_20px_rgba(255,45,122,0.4)] mb-10 ring-8 ring-white">
                  48<span className="text-sm ml-1 font-normal uppercase">hr</span>
                </div>
                <h4 className="text-2xl font-bold text-[#1B1B1B] mb-4">Reduced Inflammation</h4>
                <p className="text-gray-500 font-medium text-lg">Active breakouts begin to calm down, and overall redness is noticeably reduced.</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-[#FF8EAA] text-white flex items-center justify-center font-bold text-2xl shadow-[0_0_20px_rgba(255,142,170,0.4)] mb-10 ring-8 ring-white">
                  14<span className="text-sm ml-1 font-normal uppercase">d</span>
                </div>
                <h4 className="text-2xl font-bold text-[#1B1B1B] mb-4">Balanced Oil Production</h4>
                <p className="text-gray-500 font-medium text-lg">Your skin stops overproducing sebum, resulting in fewer new breakouts and less midday shine.</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-[#FFB870] text-white flex items-center justify-center font-bold text-2xl shadow-[0_0_20px_rgba(255,184,112,0.4)] mb-10 ring-8 ring-white">
                  30<span className="text-sm ml-1 font-normal uppercase">d</span>
                </div>
                <h4 className="text-2xl font-bold text-[#1B1B1B] mb-4">Clearer, Smoother Skin</h4>
                <p className="text-gray-500 font-medium text-lg">Post-acne marks fade, texture smooths out, and your natural moisture barrier is fully restored.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RECOMMENDED PRODUCTS */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#1B1B1B] tracking-tight">Recommended Products</h2>
            </div>
            <Link to="/shop-all-skincare" className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm text-[#FF2D7A] hover:text-[#E01B63] transition-colors">
              Shop All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <div key={idx} className="bg-[#FFFDFD] rounded-[2.5rem] p-4 shadow-sm border border-[#FF2D7A]/10 hover:shadow-xl hover:border-[#FF2D7A]/30 hover:-translate-y-2 transition-all duration-500">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EXPERT TIPS */}
      <section className="py-16 lg:py-20 bg-[#FFF5F8] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF2D7A]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FF8EAA]/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="mb-16 text-center lg:text-left">
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-[#1B1B1B] tracking-tight">Expert Tips</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-xl p-12 rounded-[3rem] border border-white shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,45,122,0.05)] transition-all duration-500">
              <h4 className="text-2xl font-bold text-[#1B1B1B] mb-4">Hands Off</h4>
              <p className="text-gray-600 font-medium leading-relaxed text-lg">Avoid picking or popping pimples! This spreads bacteria, causes inflammation, and significantly increases the risk of deep scarring.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-xl p-12 rounded-[3rem] border border-white shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,45,122,0.05)] transition-all duration-500 md:translate-y-8">
              <h4 className="text-2xl font-bold text-[#1B1B1B] mb-4">Gentle Application</h4>
              <p className="text-gray-600 font-medium leading-relaxed text-lg">If you have an active breakout, gently press your products into the skin rather than rubbing to avoid further irritation.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-xl p-12 rounded-[3rem] border border-white shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,45,122,0.05)] transition-all duration-500 md:translate-y-16">
              <h4 className="text-2xl font-bold text-[#1B1B1B] mb-4">Clean Sleep</h4>
              <p className="text-gray-600 font-medium leading-relaxed text-lg">Change your pillowcase at least twice a week. Dead skin, oils, and bacteria build up quickly and can trigger new breakouts overnight.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-[#1B1B1B] tracking-tight">Acne Care FAQs</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#FFFDFD] rounded-[2rem] shadow-sm border border-[#FF2D7A]/10 hover:border-[#FF2D7A]/30 transition-all duration-300">
                <button
                  className="w-full px-8 py-8 flex justify-between items-center text-left"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                >
                  <span className="font-heading font-bold text-xl lg:text-2xl text-[#1B1B1B] pr-8">{faq.question}</span>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${openFaq === index ? 'bg-[#FF2D7A] text-white rotate-180' : 'bg-white border border-[#FF2D7A]/20 text-[#FF2D7A]'}`}>
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
      
      {/* Inline animation style for the progress bar */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes growWidth {
          0% { width: 0; }
          100% { width: 80%; }
        }
      `}} />
    </div>
  );
}
