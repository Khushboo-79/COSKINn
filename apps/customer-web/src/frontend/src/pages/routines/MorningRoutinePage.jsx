import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ArrowRight, Clock, CheckCircle2, Shield, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/common/ProductCard';
import Footer from '../../components/common/Footer';
import { skincareProducts } from '../../constants/skincareProducts';
import heroImg from '../../assets/images/lifestyle_selfcare.webp';

export default function MorningRoutinePage() {
  const [openFaq, setOpenFaq] = useState(0);

  // Essential products for Morning Routine
  const products = {
    cleanser: skincareProducts.find(p => p.name === "COSKINn Gentle Cleanser") || skincareProducts[0],
    mist: skincareProducts.find(p => p.name === "COSKINn Face Mist") || skincareProducts[0],
    serum: skincareProducts.find(p => p.name === "COSKINn Vitamin C Serum" || p.name === "COSKINn Niacinamide Serum") || skincareProducts[0],
    moisturizer: skincareProducts.find(p => p.name === "COSKINn Daily Moisturiser") || skincareProducts[0],
    sunscreen: skincareProducts.find(p => p.name === "COSKINn Sunscreen SPF 50") || skincareProducts[0]
  };

  const flowSteps = [
    {
      num: "01",
      name: "Cleanser",
      time: "30 sec",
      benefit: "Removes overnight oil",
      product: products.cleanser,
    },
    {
      num: "02",
      name: "Vitamin C",
      time: "1 min",
      benefit: "Antioxidant defense",
      product: products.serum,
    },
    {
      num: "03",
      name: "Moisturizer",
      time: "1 min",
      benefit: "Locks in hydration",
      product: products.moisturizer,
    },
    {
      num: "04",
      name: "Sunscreen",
      time: "2 min",
      benefit: "Blocks UV rays",
      product: products.sunscreen,
    }
  ];

  const faqs = [
    {
      question: "Do I really need to wash my face in the morning?",
      answer: "Yes! Even if you cleansed at night, your skin naturally produces oil and sheds dead cells while you sleep. A gentle morning cleanse creates a fresh canvas for your daytime products."
    },
    {
      question: "Is this routine suitable for oily skin?",
      answer: "Absolutely. The products in this routine are lightweight and non-comedogenic, meaning they will hydrate and protect without clogging pores or feeling heavy."
    },
    {
      question: "Can I apply makeup over this sunscreen?",
      answer: "Yes, our SPF 50 is specially formulated to dry down to a natural, invisible finish that acts as a perfect gripping primer for makeup."
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
            alt="Morning Skincare Routine" 
            className="w-full h-full object-cover object-center" 
          />
          {/* Soft gradient overlay to blend into the white left side seamlessly */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDFD] via-[#FFFDFD]/80 to-transparent w-full md:w-3/4"></div>
          {/* Mobile bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDFD] via-[#FFFDFD]/80 to-transparent lg:hidden h-full"></div>
        </div>

        {/* Left Side Content Container */}
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 h-full flex flex-col justify-center pt-48 pb-16">
          <div className="w-full lg:w-[45%] lg:pr-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-400 mb-8">
                <Link to="/" className="hover:text-[#FF2D7A] transition-colors">Home</Link>
                <span>/</span>
                <Link to="/routine" className="hover:text-[#FF2D7A] transition-colors">Routine</Link>
              </div>
              
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#FF2D7A]/20 text-[#FF2D7A] text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
                AM Ritual
              </span>

              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-heading font-black text-[#1B1B1B] leading-[1.05] mb-8 tracking-tight">
                Wake Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D7A] to-[#FF8EAA]">Skin.</span>
              </h1>
              
              <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-md mb-12">
                Start your day with a refreshing, protective 5-step routine designed to awaken your skin and defend against environmental stressors.
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <button className="px-10 py-4 bg-[#FF2D7A] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#E01B63] hover:shadow-[0_0_20px_rgba(255,45,122,0.4)] hover:scale-105 transition-all duration-300">
                  Shop Routine
                </button>
                <button className="px-10 py-4 bg-white/60 backdrop-blur-lg text-[#1B1B1B] border border-gray-200 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:border-gray-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:scale-105 transition-all duration-300">
                  Watch Video
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. PREMIUM TIMELINE ROUTINE (REDESIGNED) */}
      <section className="py-16 lg:py-24 bg-[#FAFAFA] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF2D7A]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FF8EAA]/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="mb-12">
            <span className="text-[#FF2D7A] font-bold uppercase tracking-widest text-sm mb-2 block">The AM Flow</span>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#1B1B1B] tracking-tight">Morning Routine Flow</h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Left side: Horizontal Flow */}
            <div className="w-full lg:w-[65%] relative flex flex-col justify-center">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-[160px] left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-[#FF2D7A]/20 to-transparent z-0 overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "200%" }}
                  transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                  className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#FF2D7A] to-transparent blur-[2px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
                {flowSteps.map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-gradient-to-b from-white to-[#FFF5F8] rounded-[24px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-white hover:shadow-[0_15px_40px_rgba(255,45,122,0.1)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[#FF2D7A] font-black text-2xl opacity-40">{step.num}</span>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">COSKINn</span>
                    </div>
                    <div className="w-full aspect-square bg-white rounded-2xl p-3 mb-5 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FF2D7A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <img src={step.product.image || step.product.img} alt={step.product.name} className="object-contain w-full h-full drop-shadow-md mix-blend-multiply relative z-10" />
                    </div>
                    <h3 className="font-bold text-[#1B1B1B] text-lg mb-2 leading-tight">{step.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF2D7A] mb-3">
                      <Clock size={12} /> {step.time}
                    </div>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed mt-auto">{step.benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right side: Morning Glow Preview */}
            <div className="w-full lg:w-[35%] flex">
              <div className="w-full bg-white/70 backdrop-blur-2xl rounded-[32px] p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white flex flex-col justify-between hover:shadow-[0_25px_60px_rgba(255,45,122,0.08)] transition-shadow duration-500">
                <div>
                  <div className="flex justify-between items-start mb-10">
                    <h3 className="text-2xl lg:text-3xl font-heading font-bold text-[#1B1B1B]">Morning Glow</h3>
                    <div className="flex text-[#FF2D7A] drop-shadow-sm">
                      {'★★★★★'.split('').map((s, i) => <span key={i} className="text-lg">{s}</span>)}
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                          <Activity size={14} className="text-[#FF2D7A]" /> Hydration
                        </span>
                        <span className="text-[#FF2D7A] font-black text-lg leading-none">+92%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: '92%' }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-gradient-to-r from-[#FF2D7A] to-[#FF8EAA] shadow-[0_0_10px_#FF2D7A]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-[#FF2D7A]" /> Glow Level
                        </span>
                        <span className="text-[#FF2D7A] font-black text-lg leading-none">+85%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} className="h-full bg-gradient-to-r from-[#FF2D7A] to-[#FF8EAA] shadow-[0_0_10px_#FF2D7A]" />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-[#FFF5F8] p-5 rounded-2xl border border-[#FF2D7A]/10 mt-6 group">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-[#FF2D7A] group-hover:scale-110 group-hover:bg-[#FF2D7A] group-hover:text-white transition-all duration-300">
                        <Shield size={22} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1B1B1B] mb-0.5">UV Protection</p>
                        <p className="text-xs text-[#FF2D7A] font-bold uppercase tracking-wider">SPF 50 PA++++ Active</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-end">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Routine Time</p>
                    <p className="text-2xl font-black text-[#1B1B1B] leading-none">5 Minutes</p>
                  </div>
                  <button className="w-12 h-12 bg-[#FF2D7A] rounded-full flex items-center justify-center text-white shadow-[0_5px_15px_rgba(255,45,122,0.4)] hover:bg-[#E01B63] hover:scale-110 hover:shadow-[0_10px_25px_rgba(255,45,122,0.5)] transition-all duration-300 cursor-pointer border-none outline-none">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MORNING ESSENTIALS (Floating Glassmorphism) */}
      <section className="py-16 lg:py-20 relative bg-[#FDFBFB] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[#FF2D7A] font-bold uppercase tracking-widest text-sm mb-2 block">The Lineup</span>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#1B1B1B] tracking-tight">Morning Essentials</h2>
            </div>
            <Link to="/shop-all-skincare" className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm text-[#FF2D7A] hover:opacity-80 transition-opacity">
              Shop All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[products.cleanser, products.mist, products.serum, products.sunscreen].map((product, idx) => (
              <div key={idx} className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-3 shadow-[0_20px_40px_rgba(0,0,0,0.03)] border border-white/50 hover:bg-white transition-colors duration-500">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQ (Luxury Accordion - Expanded Width) */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-[#1B1B1B] tracking-tight">Morning Questions</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#FAFAFA] rounded-[2rem] border border-gray-100 hover:border-[#FF2D7A]/20 transition-all duration-300">
                <button
                  className="w-full px-8 py-8 flex justify-between items-center text-left"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                >
                  <span className="font-heading font-bold text-xl lg:text-2xl text-[#1B1B1B] pr-8">{faq.question}</span>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${openFaq === index ? 'bg-[#FF2D7A] text-white rotate-180' : 'bg-white text-gray-500 shadow-sm border border-gray-100'}`}>
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
