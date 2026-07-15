import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Droplet, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/common/ProductCard';
import Footer from '../../components/common/Footer';
import { skincareProducts } from '../../constants/skincareProducts';
import heroImg from '../../assets/images/hydration_hero.webp';

export default function HydrationRoutinePage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [meterLevel, setMeterLevel] = useState(20);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMeterLevel(95);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const products = [
    skincareProducts.find(p => p.name === "COSKINn Face Mist") || skincareProducts[0],
    skincareProducts.find(p => p.name === "COSKINn Daily Moisturiser") || skincareProducts[0],
    skincareProducts.find(p => p.name === "COSKINn Overnight Mask") || skincareProducts[0]
  ];

  const faqs = [
    {
      question: "Is there a difference between dry and dehydrated skin?",
      answer: "Yes! Dry skin lacks oil (sebum), while dehydrated skin lacks water. This routine addresses both by providing water-based hydration (mist) and oil-based nourishment (moisturiser)."
    },
    {
      question: "Will this routine make my face look greasy?",
      answer: "No, our hydration products are formulated to absorb deeply into the skin, leaving a healthy, natural dewiness rather than a heavy, greasy film."
    }
  ];

  return (
    <div className="bg-[#FFFDFD] min-h-screen font-sans selection:bg-[#FF2D7A]/20">
      
      {/* 1. LUXURY 100VH TRUE SPLIT HERO SECTION */}
      <section className="relative w-full h-[100vh] min-h-[700px] flex items-center bg-gradient-to-br from-[#FFF0F5] via-[#FFFDFD] to-[#FFF5F8] overflow-hidden">
        
        {/* Right Side Edge-to-Edge Image */}
        <div className="absolute top-0 right-0 w-full lg:w-[55%] h-full z-0">
          <motion.img 
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={heroImg} 
            alt="Hydration Skincare Routine" 
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
                Quench & Repair
              </span>

              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-heading font-black text-[#1B1B1B] leading-[1.05] mb-8 tracking-tight">
                Hydration <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D7A] to-[#FF8EAA] italic font-light">Journey.</span>
              </h1>
              
              <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-md mb-12">
                Flood thirsty skin and restore your moisture barrier with our intensely hydrating fruit-powered regimen.
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

      {/* 2. MOISTURE BOOST SCIENCE */}
      <section className="py-16 lg:py-20 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl lg:text-6xl font-heading font-bold text-[#1B1B1B] mb-8 leading-tight tracking-tight">
                More Than Just <br/><span className="text-[#FF2D7A]">Surface Water.</span>
              </h2>
              <p className="text-gray-600 text-xl leading-relaxed mb-6 font-medium">
                Dry, flaky skin needs more than just a surface-level cream. Our unique hydration matrix layers moisture deep into the epidermis and traps it there.
              </p>
              <p className="text-gray-600 text-xl leading-relaxed mb-10 font-medium">
                By combining multi-molecular Hyaluronic Acid with barrier-repairing Ceramides, this routine ensures 24-hour continuous dewiness.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-gray-800 font-bold text-lg"><div className="w-2.5 h-2.5 rounded-full bg-[#FF2D7A]"></div> Hyaluronic Acid (Draws Moisture)</li>
                <li className="flex items-center gap-4 text-gray-800 font-bold text-lg"><div className="w-2.5 h-2.5 rounded-full bg-[#FF2D7A]"></div> Ceramides (Locks it In)</li>
                <li className="flex items-center gap-4 text-gray-800 font-bold text-lg"><div className="w-2.5 h-2.5 rounded-full bg-[#FF2D7A]"></div> Mango Butter (Deeply Conditions)</li>
              </ul>
            </div>
            
            {/* 3. WATER BALANCE METER */}
            <div className="w-full lg:w-1/2">
              <div className="bg-[#FFFDFD] rounded-[3rem] p-12 border border-[#FF2D7A]/10 shadow-sm hover:shadow-xl transition-shadow duration-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-[#FF2D7A]/10"></div>
                <h3 className="text-2xl font-heading font-bold text-[#1B1B1B] mb-12">Skin Moisture Balance</h3>
                
                <div className="relative h-72 w-full flex items-end bg-white rounded-3xl p-6 border border-gray-100 shadow-inner">
                  <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-20 pointer-events-none">
                    <div className="w-full h-px bg-gray-400"></div>
                    <div className="w-full h-px bg-gray-400"></div>
                    <div className="w-full h-px bg-gray-400"></div>
                    <div className="w-full h-px bg-gray-400"></div>
                  </div>
                  
                  <div className="w-full flex justify-between items-end h-full gap-4 relative z-10">
                    <div className="w-1/3 flex flex-col items-center gap-4">
                      <div className="w-full bg-[#1B1B1B]/10 rounded-t-xl h-[30%] transition-all duration-1000"></div>
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400 text-center">Before<br/>Routine</span>
                    </div>
                    <div className="w-1/3 flex flex-col items-center gap-4">
                      <div 
                        className="w-full bg-gradient-to-t from-[#FF2D7A] to-[#FF8EAA] rounded-t-xl transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(255,45,122,0.4)]"
                        style={{ height: `${meterLevel}%` }}
                      ></div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#FF2D7A] text-center">After<br/>Routine</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-4xl font-black text-[#1B1B1B] mb-2">{meterLevel}% <span className="text-xl font-medium text-gray-500">Increase</span></p>
                  <p className="text-gray-500 font-medium">in epidermal hydration retention</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HYDRATION ESSENTIALS */}
      <section className="py-16 lg:py-20 bg-[#FFF5F8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <Droplet className="w-10 h-10 text-[#FF2D7A] mx-auto mb-6" />
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-[#1B1B1B] tracking-tight">The Moisture Lineup</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-white hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,45,122,0.1)] transition-all duration-500 relative"
              >
                <div className="bg-[#FF2D7A] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full absolute -top-4 -right-4 z-20 shadow-md">
                  Step {idx + 1}
                </div>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HYDRATION TIPS */}
      <section className="py-16 lg:py-20 bg-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="bg-[#FFFDFD] rounded-[3rem] p-12 lg:p-24 border border-[#FF2D7A]/10 relative overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF2D7A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#1B1B1B] mb-16 tracking-tight">Pro Hydration Tips</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="bg-white/60 backdrop-blur-md p-10 rounded-3xl shadow-sm border border-white hover:-translate-y-2 transition-transform duration-500">
                <div className="text-5xl font-black text-[#FF2D7A]/10 mb-6">01</div>
                <h4 className="text-2xl font-bold text-[#1B1B1B] mb-4">Damp Skin Rule</h4>
                <p className="text-gray-600 font-medium text-lg leading-relaxed">Always apply hyaluronic acid products to slightly damp skin. It acts as a sponge, pulling that surface water deep into the skin.</p>
              </div>
              <div className="bg-white/60 backdrop-blur-md p-10 rounded-3xl shadow-sm border border-white hover:-translate-y-2 transition-transform duration-500">
                <div className="text-5xl font-black text-[#FF2D7A]/10 mb-6">02</div>
                <h4 className="text-2xl font-bold text-[#1B1B1B] mb-4">Midday Refresh</h4>
                <p className="text-gray-600 font-medium text-lg leading-relaxed">If you work in an air-conditioned office, keep the Face Mist at your desk and spritz every 4 hours to prevent transepidermal water loss.</p>
              </div>
              <div className="bg-white/60 backdrop-blur-md p-10 rounded-3xl shadow-sm border border-white hover:-translate-y-2 transition-transform duration-500">
                <div className="text-5xl font-black text-[#FF2D7A]/10 mb-6">03</div>
                <h4 className="text-2xl font-bold text-[#1B1B1B] mb-4">Internal Hydration</h4>
                <p className="text-gray-600 font-medium text-lg leading-relaxed">Topical hydration works exponentially better when your body is hydrated from within. Drink at least 2 liters of water daily.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="py-16 lg:py-24 bg-[#FFF5F8]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-[#1B1B1B] tracking-tight">Hydration FAQs</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 hover:border-[#FF2D7A]/30 transition-all duration-300">
                <button
                  className="w-full px-8 py-8 flex justify-between items-center text-left"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                >
                  <span className="font-heading font-bold text-xl lg:text-2xl text-[#1B1B1B] pr-8">{faq.question}</span>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${openFaq === index ? 'bg-[#FF2D7A] text-white rotate-180' : 'bg-gray-50 text-[#FF2D7A] border border-gray-100'}`}>
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
