import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Droplets, Target, Sparkles, Activity } from 'lucide-react';
import { skincareProducts } from '../constants/skincareProducts';
import ProductCard from '../components/common/ProductCard';
import Footer from '../components/common/Footer';
import acneHeroImg from '../assets/images/acne_hero.webp';
import acneLifestyleImg from '../assets/images/acne_lifestyle.webp';

const targetProductNames = [
  'COSKINn Cleanser',
  'COSKINn Cleansing Balm',
  'COSKINn Face Mist',
  'COSKINn Overnight Mask',
  'COSKINn Sunscreen',
  'COSKINn Under Eye Patches',
  'COSKINn Spot Care Gel',
  'COSKINn Barrier Repair Cream'
];

export default function AcneBlemishesPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { q: "Which products are best for acne-prone skin?", a: "Our Cleanser, Spot Care Gel, and Barrier Repair Cream form the perfect trio for treating active breakouts while maintaining a healthy skin barrier." },
    { q: "Can I use these products every day?", a: "Yes! Our fruit-powered formulas are gentle enough for daily use without causing irritation or dryness." },
    { q: "Will these products reduce acne marks?", a: "Yes, ingredients like Orange and Niacinamide in our routine help brighten and fade post-acne hyperpigmentation." },
    { q: "Are these suitable for sensitive skin?", a: "Absolutely. We avoid harsh chemicals and rely on soothing ingredients like Green Tea to calm sensitive skin." },
    { q: "How long does it take to see results?", a: "While the Spot Care Gel reduces redness overnight, you'll see a significant improvement in overall skin clarity within 2-4 weeks of consistent use." }
  ];

  const gridProducts = skincareProducts.filter(p => 
    targetProductNames.some(name => p.name.includes(name))
  ).slice(0, 8);

  const solutionCards = [
    { title: "Reduce Breakouts", icon: Target, desc: "Target acne at the source with deep pore cleansing." },
    { title: "Calm Redness", icon: Activity, desc: "Soothe inflamed skin and restore a healthy tone." },
    { title: "Fade Acne Marks", icon: Sparkles, desc: "Brighten dark spots and hyperpigmentation." },
    { title: "Oil Balance", icon: Droplets, desc: "Control excess sebum without drying the skin." }
  ];

  return (
    <div className="min-h-screen w-full bg-[#FFF8F8] font-sans text-black selection:bg-[#FF2D7A] selection:text-white overflow-x-hidden">
      
      {/* SECTION 1: PREMIUM HERO */}
      <section className="relative w-full min-h-[85vh] flex items-center pt-[120px] md:pt-[140px] lg:pt-[180px] pb-[60px] md:pb-[80px] overflow-hidden bg-gradient-to-r from-[#FFF0F2] via-[#FDF5F2] to-[#FFF8F8]">
        {/* Floating Bubbles Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/40 backdrop-blur-md border border-white/50 shadow-sm"
              style={{
                width: Math.random() * 80 + 30,
                height: Math.random() * 80 + 30,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, Math.random() * 30 - 15, 0],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: Math.random() * 4 + 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Hero Image */}
        <div className="absolute inset-y-0 -right-[5%] md:-right-[10%] w-full md:w-[75%] z-10 pointer-events-none">
          <motion.img 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            src={acneHeroImg} 
            alt="COSKINn Acne Care" 
            className="w-full h-full object-cover object-[center_top] scale-[1.02] mix-blend-multiply opacity-90 md:opacity-100"
            style={{ 
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.8) 40%, black 100%)', 
              maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.8) 40%, black 100%)' 
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-[500px]">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-8 flex items-center gap-2"
            >
              <Link to="/" className="hover:text-[#FF2D7A] transition-colors">Home</Link> / 
              <span className="text-gray-400">Categories</span> / 
              <span className="text-[#FF2D7A]">Acne & Blemishes</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] text-[#1A1A1A] mb-8"
            >
              Clear Skin <br />
              <span className="text-[#FF2D7A]">Starts Here</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-black/70 mb-12 font-medium leading-relaxed"
            >
              Target breakouts, reduce blemishes and calm irritated skin with fruit-powered skincare.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-5"
            >
              <button 
                onClick={() => document.getElementById('solutions').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 bg-[#FF2D7A] text-white hover:shadow-[0_10px_25px_rgba(255,77,148,0.3)] hover:-translate-y-1"
              >
                Explore Solutions
              </button>
              <button 
                onClick={() => document.getElementById('recommended-products').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 bg-white text-[#FF2D7A] border-[1.5px] border-[#FF2D7A] hover:bg-[#FF2D7A] hover:text-white text-center hover:shadow-[0_10px_25px_rgba(255,77,148,0.2)] hover:-translate-y-1"
              >
                Shop Collection
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: RECOMMENDED ACNE SOLUTIONS */}
      <section id="solutions" className="pt-[30px] pb-16 mb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4 text-black">Recommended Acne Solutions</h2>
            <p className="text-lg text-[#FF2D7A] font-medium">Expert-led care for a flawless, healthy complexion.</p>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Side: Lifestyle Image */}
            <div className="w-full lg:w-1/2 rounded-[32px] overflow-hidden shadow-2xl relative">
              <img 
                src={acneLifestyleImg} 
                alt="Healthy Glowing Skin" 
                className="w-full h-full object-cover max-h-[600px] hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#F7DCE0]/20 to-transparent pointer-events-none" />
            </div>

            {/* Right Side: Solution Cards */}
            <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {solutionCards.map((card, idx) => (
                <div 
                  key={idx}
                  className="group relative p-8 rounded-[24px] bg-white/60 backdrop-blur-md border border-white shadow-[0_8px_30px_rgba(223,194,192,0.2)] hover:shadow-[0_15px_40px_rgba(247,220,224,0.5)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F7DCE0]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#FF2D7A] mb-6 shadow-sm transition-colors duration-300">
                      <card.icon size={24} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-2 text-black">{card.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: RECOMMENDED PRODUCTS */}
      <section id="recommended-products" className="py-16 mb-16 bg-white border-y border-[#F7DCE0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4">Recommended Products</h2>
            <p className="text-lg text-gray-500">Premium formulations clinically proven to clear your skin.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {gridProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: PREMIUM FAQ */}
      <section className="py-16 mb-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4 text-black">Common Questions</h2>
            <p className="text-lg text-[#FF2D7A] font-medium">Everything you need to know about your new skincare journey.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`border rounded-2xl overflow-hidden transition-all duration-500 bg-white ${
                  activeFaq === idx 
                    ? 'border-[#FF2D7A] shadow-[0_10px_30px_rgba(255,45,122,0.15)]' 
                    : 'border-white hover:border-[#F7DCE0] shadow-sm hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left"
                >
                  <span className={`font-bold text-lg md:text-xl transition-colors ${activeFaq === idx ? 'text-[#FF2D7A]' : 'text-black'}`}>
                    {faq.q}
                  </span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${activeFaq === idx ? 'bg-[#FF2D7A] text-white' : 'bg-[#FFF0F4] text-[#FF2D7A]'}`}>
                    {activeFaq === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-[#FFF8F8]/50 border-t border-[#F7DCE0]/50"
                    >
                      <p className="px-8 pb-8 pt-4 text-gray-700 text-lg leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
      
    </div>
  );
}
