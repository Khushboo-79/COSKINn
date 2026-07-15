import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sun, Moon, Calendar, CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';
import Footer from '../../components/common/Footer';
import heroImg from '../../assets/images/journal_tips_hero.png';

export default function SkincareTipsPage() {
  const [activeTab, setActiveTab] = useState('Morning');

  const tipsData = {
    Morning: [
      { title: "Cleanse Gently", desc: "Use a mild, non-stripping cleanser or just splash water if your skin is dry. You don't need a heavy cleanse in the AM." },
      { title: "Vitamin C is Key", desc: "Apply a Vitamin C serum to protect against environmental damage and brighten your complexion throughout the day." },
      { title: "Never Skip SPF", desc: "The most important step. Apply a broad-spectrum SPF 30 or higher, even if you are staying indoors." }
    ],
    Night: [
      { title: "Double Cleanse", desc: "Always start with a cleansing balm to remove SPF and makeup, followed by a water-based cleanser." },
      { title: "Focus on Repair", desc: "Use active ingredients like Retinol or AHAs at night when your skin naturally repairs itself." },
      { title: "Seal in Moisture", desc: "Finish with a richer cream or overnight mask to prevent transepidermal water loss while you sleep." }
    ],
    Seasonal: [
      { title: "Summer Hydration", desc: "Switch to lighter gel-based moisturizers and increase your SPF reapplication to every 2 hours." },
      { title: "Winter Barrier Care", desc: "Incorporate richer ceramides and hyaluronic acid to combat dry, indoor heating and harsh winds." },
      { title: "Spring Reset", desc: "Gently exfoliate more frequently to remove winter dead skin and reveal a fresh glow." }
    ]
  };

  const dosAndDonts = [
    { type: 'do', text: "Do patch test every new product before applying it to your entire face." },
    { type: 'dont', text: "Don't mix strong actives like Retinol and Vitamin C in the same routine." },
    { type: 'do', text: "Do apply hyaluronic acid on damp skin for maximum hydration." },
    { type: 'dont', text: "Don't forget to apply skincare to your neck and chest." },
    { type: 'do', text: "Do be patient. Skincare takes at least 4-6 weeks to show real results." },
    { type: 'dont', text: "Don't use physical scrubs with harsh shells that cause micro-tears." }
  ];

  return (
    <div className="bg-[#FFFDFD] min-h-screen font-sans selection:bg-[#FF2D7A]/20">
      
      {/* 1. PREMIUM HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-[#FFFDFD]">
        <div className="absolute inset-0 z-0 flex justify-end">
          <div className="w-full lg:w-[55%] h-full relative">
            <motion.img 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src={heroImg} 
              alt="COSKINn Skincare Tips Vanity" 
              className="w-full h-full object-cover object-center" 
            />
            {/* Soft Gradient Overlay for seamless blending */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDFD] via-[#FFFDFD]/60 to-transparent w-full"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDFD] via-[#FFFDFD]/80 to-transparent lg:hidden h-full"></div>
          </div>
        </div>

        {/* Left Side Content - Padding architecture explicitly prevents navbar overlap */}
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 pt-[140px] lg:pt-[180px] pb-20 lg:pb-28">
          <div className="w-full lg:w-[50%] lg:pr-12 relative">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-400 mb-6">
                <Link to="/" className="hover:text-[#FF2D7A] transition-colors">Home</Link>
                <span>/</span>
                <span className="text-[#FF2D7A]">Journal</span>
              </div>
              
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-[#FF2D7A]/20 text-[#FF2D7A] text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
                DAILY TIPS
              </span>

              <h1 className="text-5xl lg:text-7xl font-heading font-black text-[#1B1B1B] leading-[1.1] mb-6 tracking-tight">
                Simple Tips. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D7A] to-[#FF8EAA] italic font-light">Beautiful Skin.</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 font-medium leading-relaxed max-w-md mb-10">
                Small habits make a massive difference. Explore quick, actionable skincare tips to elevate your daily routine and achieve a lasting glow.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => document.getElementById('daily-tips').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-gradient-to-r from-[#FF2D7A] to-[#FF8EAA] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:shadow-[0_10px_30px_rgba(255,45,122,0.3)] transition-all duration-300 w-max"
                >
                  Explore Tips
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. WEEKLY EXPERT TIP */}
      <section className="py-16 lg:py-24 bg-white relative z-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#FFF5F8] to-[#FFFDFD] rounded-[2.5rem] p-8 lg:p-14 border border-[#FF2D7A]/10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col md:flex-row gap-8 items-center"
          >
            <div className="w-16 h-16 shrink-0 rounded-full bg-[#FF2D7A] text-white flex items-center justify-center shadow-lg shadow-[#FF2D7A]/30 mb-4 md:mb-0">
              <Sparkles size={28} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="text-[#FF2D7A] font-bold uppercase tracking-widest text-xs mb-3 block">Expert Tip of the Week</span>
              <h3 className="text-2xl lg:text-3xl font-heading font-black text-[#1B1B1B] leading-tight">
                "Apply your Hyaluronic Acid serum on damp skin. It acts like a sponge—if the skin is dry, it can pull moisture from the deeper layers of your skin, defeating its purpose."
              </h3>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. DAILY TIPS INTERACTIVE TABS */}
      <section id="daily-tips" className="py-16 lg:py-24 bg-[#FFFDFD]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-black text-[#1B1B1B] mb-4">Routine Specifics</h2>
            <p className="text-gray-600 font-medium max-w-lg mx-auto">Different times of the day require different skincare approaches. Here's what you need to focus on.</p>
          </div>
          
          <div className="flex justify-center gap-4 mb-12">
            {[
              { id: 'Morning', icon: Sun },
              { id: 'Night', icon: Moon },
              { id: 'Seasonal', icon: Calendar }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-[#FF2D7A] text-white shadow-[0_10px_20px_rgba(255,45,122,0.2)]' 
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                <tab.icon size={16} /> <span className="hidden sm:inline">{tab.id}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {tipsData[activeTab].map((tip, idx) => (
                <motion.div
                  key={`${activeTab}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:border-[#FF2D7A]/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF5F8] text-[#FF2D7A] flex items-center justify-center font-black text-xl font-heading mb-6">
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-heading font-black text-[#1B1B1B] mb-3">{tip.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">{tip.desc}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. DO'S AND DON'TS */}
      <section className="py-16 lg:py-24 bg-[#FFF5F8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-2 h-8 bg-gradient-to-b from-[#FF2D7A] to-[#FF8EAA] rounded-full"></div>
            <h2 className="text-3xl lg:text-4xl font-heading font-black text-[#1B1B1B]">Golden Rules: Do's & Don'ts</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dosAndDonts.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: item.type === 'do' ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 flex items-start gap-4 shadow-sm border border-transparent hover:border-gray-100 transition-all"
              >
                <div className={`mt-1 shrink-0 ${item.type === 'do' ? 'text-green-500' : 'text-red-400'}`}>
                  {item.type === 'do' ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                </div>
                <p className="text-[#1B1B1B] font-medium leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-24 bg-white text-center border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl lg:text-5xl font-heading font-black text-[#1B1B1B] mb-6">Ready to Build Your Routine?</h2>
          <p className="text-xl text-gray-500 font-medium mb-10">Take what you've learned and build a customized COSKINn routine that fits your exact skin needs.</p>
          <div className="flex justify-center">
            <Link to="/skin-quiz" className="px-10 py-4 bg-gradient-to-r from-[#FF2D7A] to-[#FF8EAA] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:shadow-[0_10px_30px_rgba(255,45,122,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
              Take The Skin Quiz <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
