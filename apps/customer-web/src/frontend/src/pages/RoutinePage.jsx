import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ArrowRight, Sun, Moon, Droplet, Wind, Sparkles, Heart, Zap, Shield, SplitSquareVertical } from 'lucide-react';
import Footer from '../components/common/Footer';
import ProductCard from '../components/common/ProductCard';
import { skincareProducts } from '../constants/skincareProducts';

// Import all required hero images for the cards
import heroImg from '../assets/images/lifestyle_selfcare.webp';
import dryImg from '../assets/images/dry_hero.webp';
import oilyImg from '../assets/images/oily_hero.webp';
import sensitiveImg from '../assets/images/sensitive_hero.webp';
import hydrationImg from '../assets/images/hydration_hero.webp';
import brighteningImg from '../assets/images/brightening_hero.webp';
import acneImg from '../assets/images/acne_hero.webp';
import nightImg from '../assets/images/cleansing_balm_lifestyle.webp';
import comboImg from '../assets/images/sunscreen_spf50_lifestyle.webp';

export default function RoutinePage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  const routines = [
    { title: "Morning Routine", path: "/routine/morning", image: heroImg, icon: <Sun className="w-6 h-6 text-[#FF2D7A]" />, desc: "Awaken and protect your skin for the day." },
    { title: "Night Routine", path: "/routine/night", image: nightImg, icon: <Moon className="w-6 h-6 text-[#FF2D7A]" />, desc: "Deep repair and cellular renewal while you sleep." },
    { title: "Dry Skin Routine", path: "/routine/dry-skin", image: dryImg, icon: <Droplet className="w-6 h-6 text-[#FF2D7A]" />, desc: "Nourish and lock in essential moisture." },
    { title: "Oily Skin Routine", path: "/routine/oily-skin", image: oilyImg, icon: <Wind className="w-6 h-6 text-[#FF2D7A]" />, desc: "Balance sebum and refine pores." },
    { title: "Combination Routine", path: "/routine/combination", image: comboImg, icon: <SplitSquareVertical className="w-6 h-6 text-[#FF2D7A]" />, desc: "Adaptable hydration for varying zones." },
    { title: "Sensitive Skin Routine", path: "/routine/sensitive-skin", image: sensitiveImg, icon: <Heart className="w-6 h-6 text-[#FF2D7A]" />, desc: "Soothe redness and repair the barrier." },
    { title: "Hydration Routine", path: "/routine/hydration", image: hydrationImg, icon: <Droplet className="w-6 h-6 text-[#FF2D7A]" />, desc: "Flood your skin with deep, lasting water." },
    { title: "Brightening Routine", path: "/routine/brightening", image: brighteningImg, icon: <Sparkles className="w-6 h-6 text-[#FF2D7A]" />, desc: "Fade dark spots and reveal maximum radiance." },
    { title: "Acne Care Routine", path: "/routine/acne-care", image: acneImg, icon: <Zap className="w-6 h-6 text-[#FF2D7A]" />, desc: "Clear blemishes without stripping." },
  ];

  const benefits = [
    { title: "Healthy Barrier", icon: <Shield className="w-8 h-8 text-[#FF2D7A]" />, desc: "Ceramide-rich formulas protect against stressors." },
    { title: "Deep Hydration", icon: <Droplet className="w-8 h-8 text-[#FF2D7A]" />, desc: "Multi-weight hyaluronic acid for plump skin." },
    { title: "Radiant Glow", icon: <Sparkles className="w-8 h-8 text-[#FF2D7A]" />, desc: "Vitamin C to naturally illuminate your complexion." },
    { title: "Sensitive Safe", icon: <Heart className="w-8 h-8 text-[#FF2D7A]" />, desc: "Free from harsh alcohols and synthetic fragrances." }
  ];

  const faqs = [
    { question: "How long until I see results?", answer: "While you'll notice immediate hydration and a temporary glow, true cellular turnover takes 28-30 days. Stick to your routine for a full month to see dramatic improvements in texture, tone, and clarity." },
    { question: "Do I need to do a full routine every single day?", answer: "Consistency is key, but listen to your skin. At a minimum, always cleanse, moisturize, and apply SPF in the morning. Serums and masks can be adjusted based on your daily needs." },
    { question: "Can I mix products from different routines?", answer: "Absolutely! The COSKINn ecosystem is designed to be fully mixable. For example, you can use the Acne Care cleanser alongside the Hydration serum if you have dehydrated, breakout-prone skin." }
  ];

  const recommendedProducts = [
    skincareProducts.find(p => p.name === "COSKINn Strawberry Glow Cleanser") || skincareProducts[0],
    skincareProducts.find(p => p.name === "COSKINn Daily Moisturiser") || skincareProducts[0],
    skincareProducts.find(p => p.name === "COSKINn Vitamin C Serum") || skincareProducts[0],
    skincareProducts.find(p => p.name === "COSKINn Sunscreen SPF 50") || skincareProducts[0]
  ];

  return (
    <div className="bg-[#FFFDFD] min-h-screen font-sans selection:bg-[#FF2D7A]/20">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[100vh] min-h-[700px] flex items-center bg-[#FFFDFD] overflow-hidden">
        {/* Background Image & Gradients */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={heroImg} 
            alt="Discover Your Routine" 
            className="w-full h-full object-cover object-center" 
          />
          {/* Soft pink to transparent gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFF5F8] via-[#FFF5F8]/90 to-transparent w-full md:w-2/3"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFF5F8] via-[#FFF5F8]/80 to-transparent lg:hidden"></div>
        </div>

        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 flex flex-col justify-center pt-48 pb-16 h-full">
          <div className="w-full lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-[#FF2D7A]/20 text-[#FF2D7A] text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
                Skincare Hub
              </span>

              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-heading font-black text-[#1B1B1B] leading-[1.05] mb-8 tracking-tight">
                Discover Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D7A] to-[#FF8EAA] italic font-light">Routine.</span>
              </h1>
              
              <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-md mb-12">
                Find the ideal skincare ritual based on your unique skin type and lifestyle. Your journey to perfect skin starts here.
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <button 
                  onClick={() => document.getElementById('routine-finder').scrollIntoView({ behavior: 'smooth' })}
                  className="px-10 py-4 bg-[#FF2D7A] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#E01B63] hover:shadow-[0_0_20px_rgba(255,45,122,0.4)] hover:scale-105 transition-all duration-300"
                >
                  Start My Routine
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. ROUTINE FINDER (Interactive) */}
      <section id="routine-finder" className="py-16 lg:py-24 bg-white border-t border-[#FF2D7A]/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-[#FF2D7A] font-bold uppercase tracking-widest text-sm block mb-4">Quick Match</span>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#1B1B1B]">What does your skin need today?</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {routines.map((r, i) => (
              <button 
                key={i}
                onClick={() => navigate(r.path)}
                className="px-8 py-4 rounded-full border border-[#FF2D7A]/20 bg-[#FFF5F8] text-[#1B1B1B] font-bold hover:bg-[#FF2D7A] hover:text-white hover:border-[#FF2D7A] hover:shadow-[0_10px_20px_rgba(255,45,122,0.2)] transition-all duration-300"
              >
                {r.title.replace(' Routine', '')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE ROUTINE CARDS (Main Hub) */}
      <section className="py-16 lg:py-24 bg-[#FFF5F8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-[#1B1B1B] tracking-tight">Curated Rituals.</h2>
            <p className="text-gray-600 text-xl font-medium mt-4">Select a routine below to explore step-by-step guides and recommended products.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {routines.map((routine, idx) => (
              <Link 
                to={routine.path}
                key={idx} 
                className="group relative h-[400px] rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 block border border-[#FF2D7A]/10"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img src={routine.image} alt={routine.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                {/* Dark/Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B]/90 via-[#1B1B1B]/40 to-transparent z-10"></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 z-20 flex flex-col justify-end">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:bg-[#FF2D7A] group-hover:border-[#FF2D7A] transition-colors duration-300">
                      {routine.icon}
                    </div>
                    <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest border border-white/30">
                      Explore
                    </span>
                  </div>
                  <h3 className="text-3xl font-heading font-bold text-white mb-2">{routine.title}</h3>
                  <p className="text-white/80 font-medium mb-6">{routine.desc}</p>
                  
                  {/* Hover indicator line */}
                  <div className="w-12 h-1 bg-white/30 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-[#FF2D7A] -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED COLLECTIONS */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#1B1B1B] tracking-tight">Luxury Collections</h2>
              <p className="text-gray-600 text-lg font-medium mt-4">Bundled essentials for the ultimate skincare experience.</p>
            </div>
            <Link to="/shop-all-skincare" className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm text-[#FF2D7A] hover:text-[#E01B63] transition-colors">
              Shop All Sets <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Link to="/routine/morning" className="bg-[#FFF5F8] p-12 rounded-[3rem] border border-[#FF2D7A]/10 hover:border-[#FF2D7A]/30 hover:shadow-xl transition-all duration-500 group relative overflow-hidden flex flex-col justify-center min-h-[300px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF2D7A]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF2D7A]/10 transition-colors"></div>
              <h3 className="text-4xl font-heading font-bold text-[#1B1B1B] mb-4 relative z-10">Morning Glow Kit</h3>
              <p className="text-gray-600 font-medium text-lg mb-8 relative z-10 max-w-sm">Everything you need to wake up, hydrate, and protect your skin for the day ahead.</p>
              <div className="flex items-center gap-2 text-[#FF2D7A] font-bold uppercase tracking-widest text-sm relative z-10">
                Discover <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
            <Link to="/routine/night" className="bg-[#FFFDFD] p-12 rounded-[3rem] border border-[#FF2D7A]/10 hover:border-[#FF2D7A]/30 hover:shadow-xl transition-all duration-500 group relative overflow-hidden flex flex-col justify-center min-h-[300px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#FF2D7A]/5 to-transparent rounded-full blur-3xl pointer-events-none group-hover:from-[#FF2D7A]/10 transition-colors"></div>
              <h3 className="text-4xl font-heading font-bold text-[#1B1B1B] mb-4 relative z-10">Night Repair Ritual</h3>
              <p className="text-gray-600 font-medium text-lg mb-8 relative z-10 max-w-sm">A deeply nourishing set designed to repair the skin barrier while you sleep.</p>
              <div className="flex items-center gap-2 text-[#FF2D7A] font-bold uppercase tracking-widest text-sm relative z-10">
                Discover <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. ROUTINE TIMELINE (AM vs PM) */}
      <section className="py-16 lg:py-24 bg-[#FAFAFA] border-t border-b border-[#FF2D7A]/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#1B1B1B] tracking-tight mb-16">The Essential Timeline</h2>
          
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 justify-center">
            {/* AM Flow */}
            <div className="flex-1 bg-white p-10 rounded-[3rem] shadow-sm border border-[#FF2D7A]/10">
              <h3 className="text-2xl font-bold text-[#1B1B1B] mb-8 flex items-center justify-center gap-3">
                <Sun className="w-6 h-6 text-[#FF2D7A]" /> AM Focus: Protect
              </h3>
              <div className="flex flex-col items-center gap-4 relative">
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#FF2D7A]/20 to-transparent"></div>
                {['Cleanser', 'Vitamin Serum', 'Moisturizer', 'Sunscreen SPF 50'].map((step, i) => (
                  <div key={i} className="bg-[#FFF5F8] px-8 py-4 rounded-full font-bold text-[#1B1B1B] border border-[#FF2D7A]/20 relative z-10 w-full max-w-[250px] shadow-sm">
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* PM Flow */}
            <div className="flex-1 bg-white p-10 rounded-[3rem] shadow-sm border border-[#FF2D7A]/10">
              <h3 className="text-2xl font-bold text-[#1B1B1B] mb-8 flex items-center justify-center gap-3">
                <Moon className="w-6 h-6 text-[#FF2D7A]" /> PM Focus: Repair
              </h3>
              <div className="flex flex-col items-center gap-4 relative">
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#FF2D7A]/20 to-transparent"></div>
                {['Double Cleanse', 'Treatment Serum', 'Overnight Mask', 'Lip Balm'].map((step, i) => (
                  <div key={i} className="bg-white px-8 py-4 rounded-full font-bold text-[#1B1B1B] border border-[#FF2D7A]/20 relative z-10 w-full max-w-[250px] shadow-sm">
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ROUTINE BENEFITS */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-[#FFFDFD] p-8 rounded-3xl border border-[#FF2D7A]/10 hover:border-[#FF2D7A]/30 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#FFF5F8] flex items-center justify-center mb-6">
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-bold text-[#1B1B1B] mb-3">{benefit.title}</h4>
                <p className="text-gray-500 font-medium">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. RECOMMENDED PRODUCTS */}
      <section className="py-16 lg:py-20 bg-[#FFF5F8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#1B1B1B] tracking-tight">Routine Staples</h2>
            </div>
            <Link to="/shop-all-skincare" className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm text-[#FF2D7A] hover:text-[#E01B63] transition-colors">
              Explore All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory hide-scrollbar">
            {recommendedProducts.map((product, idx) => (
              <div key={idx} className="w-[300px] shrink-0 snap-start">
                <div className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-[#FF2D7A]/10 hover:shadow-xl hover:border-[#FF2D7A]/30 hover:-translate-y-2 transition-all duration-500 relative h-full">
                  <ProductCard product={product} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-16 lg:py-24 bg-white border-t border-[#FF2D7A]/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-[#1B1B1B] tracking-tight">Routine FAQs</h2>
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
