import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Moon, Droplet, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/common/ProductCard';
import Footer from '../../components/common/Footer';
import { skincareProducts } from '../../constants/skincareProducts';
import heroImg from '../../assets/images/lifestyle_selfcare.webp';

export default function NightRoutinePage() {
  const [openFaq, setOpenFaq] = useState(0);

  const products = [
    skincareProducts.find(p => p.name === "COSKINn Cleansing Balm") || skincareProducts[0],
    skincareProducts.find(p => p.name === "COSKINn Overnight Mask") || skincareProducts[0],
    skincareProducts.find(p => p.name === "COSKINn Under Eye Patches") || skincareProducts[0]
  ];

  const faqs = [
    {
      question: "Do I need to wash off the Overnight Mask?",
      answer: "No, it is designed to act as an intensive nighttime moisturizer. Simply leave it on and wake up glowing! You can rinse your face normally the next morning."
    },
    {
      question: "Can the Cleansing Balm remove waterproof mascara?",
      answer: "Yes! Our balm is formulated with rich fruit oils that gently but effectively break down waterproof eye makeup."
    },
    {
      question: "Is this routine too heavy for acne-prone skin?",
      answer: "While rich in nutrients, the products are non-comedogenic. However, if you are highly prone to breakouts, we recommend our specific Acne Care Routine."
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
            alt="Night Skincare Routine" 
            className="w-full h-full object-cover object-center" 
          />
          {/* Soft gradient overlay to blend into the light left side seamlessly */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDFD] via-[#FFFDFD]/80 to-transparent w-full md:w-3/4"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDFD] via-[#FFFDFD]/80 to-transparent lg:hidden h-full"></div>
        </div>

        {/* Left Side Content Container */}
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 h-full flex flex-col justify-center pt-[160px] pb-12">
          <div className="w-full lg:w-[45%] lg:pr-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-400 mb-5">
                <Link to="/" className="hover:text-[#FF2D7A] transition-colors">Home</Link>
                <span>/</span>
                <Link to="/routine" className="hover:text-[#FF2D7A] transition-colors">Routine</Link>
              </div>
              
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-[#FF2D7A]/20 text-[#FF2D7A] text-xs font-bold uppercase tracking-widest mb-5 shadow-sm">
                <Moon size={14} className="text-[#FF2D7A]" /> PM Ritual
              </span>

              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-heading font-black text-[#1B1B1B] leading-[1.05] mb-6 tracking-tight">
                Repair While You <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D7A] to-[#FF8EAA] italic font-light">Sleep.</span>
              </h1>
              
              <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-md mb-8">
                Melt away the day and deeply nourish your skin with our luxurious 3-step nocturnal repair routine.
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

      {/* 2. PM ROUTINE FLOW */}
      <section className="py-16 lg:py-20 bg-[#FFF5F8] relative border-t border-[#FF2D7A]/10 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="mb-16">
            <span className="text-[#FF2D7A] font-bold uppercase tracking-widest text-sm mb-4 block">Step-By-Step</span>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#1B1B1B] tracking-tight">The Nocturnal Flow</h2>
          </div>

          <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-8 pb-10 lg:pb-0 snap-x snap-mandatory hide-scrollbar">
            {/* Step 1 */}
            <div className="min-w-[300px] lg:min-w-0 bg-white rounded-[2.5rem] p-10 border border-[#FF2D7A]/10 hover:border-[#FF2D7A]/30 hover:shadow-xl transition-all duration-500 snap-start group relative">
              <div className="absolute top-0 right-0 p-8 text-[120px] font-black text-[#FF2D7A]/5 leading-none group-hover:text-[#FF2D7A]/10 transition-colors duration-500 -mt-12 -mr-6">1</div>
              <Droplet className="w-10 h-10 text-[#FF2D7A] mb-8 relative z-10" />
              <h3 className="text-2xl font-heading font-bold text-[#1B1B1B] mb-4 relative z-10">Melt Away Makeup</h3>
              <p className="text-gray-600 font-medium leading-relaxed relative z-10 text-lg">Massage the Cleansing Balm into dry skin to effortlessly dissolve stubborn makeup, SPF, and excess oil without stripping your barrier.</p>
            </div>

            {/* Step 2 */}
            <div className="min-w-[300px] lg:min-w-0 bg-white rounded-[2.5rem] p-10 border border-[#FF2D7A]/10 hover:border-[#FF2D7A]/30 hover:shadow-xl transition-all duration-500 snap-start group relative lg:mt-12">
              <div className="absolute top-0 right-0 p-8 text-[120px] font-black text-[#FF2D7A]/5 leading-none group-hover:text-[#FF2D7A]/10 transition-colors duration-500 -mt-12 -mr-6">2</div>
              <Moon className="w-10 h-10 text-[#FF2D7A] mb-8 relative z-10" />
              <h3 className="text-2xl font-heading font-bold text-[#1B1B1B] mb-4 relative z-10">Deeply Nourish</h3>
              <p className="text-gray-600 font-medium leading-relaxed relative z-10 text-lg">Apply a generous layer of the Overnight Mask. This rich treatment works in harmony with your skin's nocturnal repair cycle.</p>
            </div>

            {/* Step 3 */}
            <div className="min-w-[300px] lg:min-w-0 bg-white rounded-[2.5rem] p-10 border border-[#FF2D7A]/10 hover:border-[#FF2D7A]/30 hover:shadow-xl transition-all duration-500 snap-start group relative lg:mt-24">
              <div className="absolute top-0 right-0 p-8 text-[120px] font-black text-[#FF2D7A]/5 leading-none group-hover:text-[#FF2D7A]/10 transition-colors duration-500 -mt-12 -mr-6">3</div>
              <Zap className="w-10 h-10 text-[#FF2D7A] mb-8 relative z-10" />
              <h3 className="text-2xl font-heading font-bold text-[#1B1B1B] mb-4 relative z-10">Target Under Eyes</h3>
              <p className="text-gray-600 font-medium leading-relaxed relative z-10 text-lg">Place the Under Eye Patches on for 15 minutes before sleeping to instantly depuff and hydrate the delicate eye area.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OVERNIGHT RECOVERY */}
      <section className="py-16 lg:py-20 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="bg-[#FFFDFD] rounded-[3rem] p-8 md:p-16 border border-[#FF2D7A]/10 flex flex-col xl:flex-row items-center gap-12 relative overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-[#FF2D7A]/5 to-transparent blur-3xl pointer-events-none"></div>

            <div className="w-full xl:w-5/12 relative z-10">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#1B1B1B] mb-6 tracking-tight">Overnight Recovery</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 font-medium">
                Your skin enters its most intense state of repair between 11 PM and 4 AM. Our nocturnal routine floods your cells with antioxidants and rich mango butter precisely when they are most receptive.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#FF2D7A] mt-2 shrink-0 shadow-[0_0_10px_#FF2D7A]"></div>
                  <p className="text-[#1B1B1B] font-bold">Accelerates natural cellular turnover.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#FF2D7A] mt-2 shrink-0 shadow-[0_0_10px_#FF2D7A]"></div>
                  <p className="text-[#1B1B1B] font-bold">Restores moisture lost to environmental stress.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#FF2D7A] mt-2 shrink-0 shadow-[0_0_10px_#FF2D7A]"></div>
                  <p className="text-[#1B1B1B] font-bold">Smooths fine lines caused by dehydration.</p>
                </li>
              </ul>
            </div>

            <div className="w-full xl:w-7/12 flex flex-col md:flex-row gap-6">
              {/* Left Card: 10:00 PM Before */}
              <div className="flex-1 bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 relative overflow-hidden border border-[#FF2D7A]/10 shadow-[0_10px_30px_rgba(255,45,122,0.05)] hover:-translate-y-1 transition-transform duration-300">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-sm font-bold uppercase tracking-widest text-[#FF2D7A]/60">10:00 PM</div>
                  <Moon className="w-5 h-5 text-[#FF2D7A]/60" />
                </div>
                <h3 className="text-lg font-bold text-[#1B1B1B] mb-6 flex items-center gap-2">🌙 Skin Before Routine</h3>
                
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                      <span>Barrier Strength</span>
                      <span>30%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: '30%' }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-[#FF2D7A]/40 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                      <span>Hydration Level</span>
                      <span>45%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: '45%' }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className="h-full bg-[#FF2D7A]/40 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                      <span>Skin Stress</span>
                      <span>85%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} className="h-full bg-[#FF2D7A]/60 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                      <span>Moisture Lock</span>
                      <span>20%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: '20%' }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-[#FF2D7A]/40 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Card: 07:00 AM After */}
              <div className="flex-1 bg-gradient-to-br from-[#FFF5F8] to-[#FFFDFD] rounded-3xl p-6 md:p-8 relative overflow-hidden border border-[#FF2D7A]/20 shadow-[0_15px_40px_rgba(255,45,122,0.1)] hover:-translate-y-1 transition-transform duration-300">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-sm font-bold uppercase tracking-widest text-[#FF2D7A]">07:00 AM</div>
                  <Zap className="w-5 h-5 text-[#FF2D7A]" />
                </div>
                <h3 className="text-lg font-bold text-[#FF2D7A] mb-6 flex items-center gap-2">✨ Skin After Recovery</h3>
                
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#FF2D7A] mb-2 uppercase tracking-wide">
                      <span>Barrier Restored</span>
                      <span>100%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#FF2D7A]/10 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} className="h-full bg-[#FF2D7A] rounded-full shadow-[0_0_10px_#FF2D7A]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#FF2D7A] mb-2 uppercase tracking-wide">
                      <span>Hydration Increased</span>
                      <span>95%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#FF2D7A]/10 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: '95%' }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-[#FF2D7A] rounded-full shadow-[0_0_10px_#FF2D7A]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#FF2D7A] mb-2 uppercase tracking-wide">
                      <span>Calm Skin</span>
                      <span>90%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#FF2D7A]/10 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: '90%' }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.6 }} className="h-full bg-[#FF2D7A] rounded-full shadow-[0_0_10px_#FF2D7A]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#FF2D7A] mb-2 uppercase tracking-wide">
                      <span>Glow Level</span>
                      <span>100%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#FF2D7A]/10 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.7 }} className="h-full bg-[#FF2D7A] rounded-full shadow-[0_0_10px_#FF2D7A]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DEEP NOURISHMENT */}
      <section className="py-16 lg:py-20 relative bg-[#FFFDFD] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#1B1B1B] tracking-tight">Deep Nourishment</h2>
            </div>
            <Link to="/shop-all-skincare" className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm text-[#FF2D7A] hover:text-[#E01B63] transition-colors">
              Explore All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <div key={idx} className="bg-white rounded-[2rem] p-3 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-[#FF2D7A]/10 hover:border-[#FF2D7A] transition-colors duration-500">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="py-16 lg:py-20 bg-[#FFF5F8]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-[#1B1B1B] tracking-tight">Nighttime FAQs</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-[2rem] border border-[#FF2D7A]/10 hover:border-[#FF2D7A]/30 shadow-sm transition-all duration-300">
                <button
                  className="w-full px-8 py-8 flex justify-between items-center text-left"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                >
                  <span className="font-heading font-bold text-xl lg:text-2xl text-[#1B1B1B] pr-8">{faq.question}</span>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${openFaq === index ? 'bg-[#FF2D7A] text-white rotate-180' : 'bg-[#FFF5F8] text-[#FF2D7A] border border-[#FF2D7A]/20'}`}>
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
