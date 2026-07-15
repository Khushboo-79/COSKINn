import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
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

  const timelineSteps = [
    {
      title: "Wake Up",
      time: "07:00 AM",
      desc: "Start your day by drinking a full glass of water. Internal hydration is the foundation of glowing skin.",
      benefits: ["Flushes toxins", "Kickstarts metabolism"],
      why: "Topical products work exponentially better when your body is hydrated from within.",
      isProduct: false
    },
    {
      title: "Gentle Cleanse",
      time: "07:05 AM",
      product: products.cleanser,
      desc: "Wash away overnight impurities and excess sebum without stripping your skin's natural moisture barrier.",
      benefits: ["Balances pH", "Removes dead skin cells"],
      why: "Creates a clean, receptive canvas so the rest of your products can penetrate deeply.",
      isProduct: true
    },
    {
      title: "Hydrating Mist",
      time: "07:08 AM",
      product: products.mist,
      desc: "Spritz generously over the face while the skin is still slightly damp from cleansing.",
      benefits: ["Instant hydration", "Soothes redness"],
      why: "Damp skin acts like a sponge, pulling water-based ingredients deep into the epidermis.",
      isProduct: true
    },
    {
      title: "Vitamin Serum",
      time: "07:10 AM",
      product: products.serum,
      desc: "Apply 2-3 drops of Vitamin Serum and press gently into the skin. Let it absorb fully.",
      benefits: ["Brightens complexion", "Antioxidant defense"],
      why: "Neutralizes free radicals from pollution and UV rays before they can damage your skin.",
      isProduct: true
    },
    {
      title: "Seal with Moisture",
      time: "07:12 AM",
      product: products.moisturizer,
      desc: "Massage a dime-sized amount of moisturizer onto the face and neck to lock in all previous layers.",
      benefits: ["Locks in hydration", "Plumps skin"],
      why: "Creates a protective seal over the active ingredients, ensuring they don't evaporate.",
      isProduct: true
    },
    {
      title: "Essential SPF",
      time: "07:15 AM",
      product: products.sunscreen,
      desc: "Apply two finger-lengths of SPF 50 generously. Never skip this step, rain or shine.",
      benefits: ["Prevents aging", "Blocks UV rays"],
      why: "The ultimate shield. Protects your skin from the #1 cause of premature aging and hyperpigmentation.",
      isProduct: true
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

      {/* 2. PREMIUM TIMELINE ROUTINE */}
      <section className="py-16 lg:py-20 bg-[#FAFAFA] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF2D7A]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FF8EAA]/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="text-[#FF2D7A] font-bold uppercase tracking-widest text-sm mb-4 block">The AM Flow</span>
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-[#1B1B1B] mb-6 tracking-tight">Morning Routine Flow</h2>
            <p className="text-gray-600 font-medium text-xl leading-relaxed">A seamless transition from sleepy skin to an awake, protected, and glowing complexion.</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12 lg:space-y-16">
            {timelineSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`relative bg-white/70 backdrop-blur-2xl rounded-[2.5rem] p-8 lg:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.03)] border border-white hover:shadow-[0_30px_60px_rgba(255,45,122,0.08)] hover:-translate-y-1 transition-all duration-500 group ${idx % 2 !== 0 ? 'lg:ml-20' : 'lg:mr-20'}`}
              >
                {/* Step Number Badge */}
                <div className="absolute -top-6 -left-6 lg:-left-8 w-16 h-16 bg-gradient-to-br from-[#FF2D7A] to-[#FF5E95] rounded-full flex items-center justify-center text-white font-black text-2xl shadow-[0_10px_20px_rgba(255,45,122,0.3)] z-20">
                  {idx + 1}
                </div>

                <div className="flex flex-col md:flex-row gap-10 items-center">
                  {/* Image/Visual Side */}
                  <div className="w-full md:w-1/3 shrink-0 relative flex justify-center">
                    {step.isProduct && step.product ? (
                      <div className="w-full aspect-square bg-[#F7F7F7] rounded-3xl p-6 flex items-center justify-center group-hover:bg-[#FFF5F8] transition-colors duration-500">
                        <img 
                          src={step.product.image || step.product.img} 
                          alt={step.product.name} 
                          className="w-full h-full object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500 mix-blend-multiply" 
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-square bg-gradient-to-br from-[#FFF0F4] to-[#FFE6ED] rounded-3xl p-6 flex items-center justify-center border border-[#FF2D7A]/10">
                        <Clock className="w-20 h-20 text-[#FF2D7A]/40" />
                      </div>
                    )}
                  </div>

                  {/* Content Side */}
                  <div className="w-full md:w-2/3">
                    <div className="flex items-center gap-3 text-[#FF2D7A] font-bold uppercase tracking-widest text-xs mb-3">
                      <Clock size={14} />
                      {step.time}
                    </div>
                    <h3 className="text-3xl font-heading font-bold text-[#1B1B1B] mb-4">{step.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6 font-medium">
                      {step.desc}
                    </p>
                    
                    <div className="bg-[#FAF9F7] p-5 rounded-2xl mb-6 border border-gray-100">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Why it matters</h4>
                      <p className="text-[#1B1B1B] font-medium text-sm leading-relaxed">{step.why}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <ul className="space-y-2">
                        {step.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm font-bold text-gray-700">
                            <CheckCircle2 size={16} className="text-[#FF2D7A]" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                      
                      {step.isProduct && step.product && (
                        <Link 
                          to={`/product/${step.product.id}`}
                          className="shrink-0 px-6 py-3 bg-[#1B1B1B] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#FF2D7A] hover:shadow-[0_5px_15px_rgba(255,45,122,0.3)] transition-all duration-300 flex items-center gap-2"
                        >
                          View Product <ArrowRight size={14} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
