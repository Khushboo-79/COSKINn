import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Shield, Droplets, Sun, CheckCircle2, XCircle, ChevronDown } from 'lucide-react';
import Footer from '../../components/common/Footer';
import heroImg from '../../assets/images/journal_education_hero.png';

export default function SkinEducationPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  const topics = [
    { title: "Skin Types", icon: BookOpen, desc: "Identify your skin type (Dry, Oily, Combination, Normal) to build the right routine." },
    { title: "Skin Barrier", icon: Shield, desc: "Learn how the stratum corneum protects you and how to prevent transepidermal water loss." },
    { title: "Hydration Science", icon: Droplets, desc: "Understand the difference between hydration (water) and moisturization (oil)." },
    { title: "SPF Education", icon: Sun, desc: "Why UVA/UVB protection is non-negotiable every single day, indoors and outdoors." }
  ];

  const myths = [
    { myth: "Oily skin doesn't need moisturizer.", fact: "Oily skin can be dehydrated. Skipping moisturizer causes the skin to overcompensate by producing even more oil." },
    { myth: "Pores can open and close.", fact: "Pores don't have muscles. You can't change their size, but keeping them clean makes them appear smaller." },
    { myth: "You only need SPF when it's sunny.", fact: "UVA rays penetrate clouds and glass, accelerating skin aging even on rainy days." },
    { myth: "Natural ingredients are always better.", fact: "Not always. Essential oils can be highly irritating, while lab-created synthetics (like Ceramides) are perfectly safe and effective." }
  ];

  const faqs = [
    { q: "How long does it take for skincare to work?", a: "Most active ingredients take 4 to 6 weeks (one full skin cycle) to show visible results. Consistency is key." },
    { q: "In what order should I apply my products?", a: "A general rule is to apply from thinnest to thickest consistency: Cleanser -> Toner -> Serum -> Eye Cream -> Moisturizer -> Face Oil -> SPF (AM only)." },
    { q: "What causes acne breakouts?", a: "Breakouts occur when pores become clogged with excess sebum and dead skin cells, leading to bacterial growth and inflammation." },
    { q: "How often should I exfoliate?", a: "For most skin types, 1-3 times a week is sufficient. Over-exfoliating can damage your skin barrier and cause redness." }
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
              alt="COSKINn Skin Education Lab Desk" 
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
                SKIN EDUCATION
              </span>

              <h1 className="text-5xl lg:text-7xl font-heading font-black text-[#1B1B1B] leading-[1.1] mb-6 tracking-tight">
                Understand <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D7A] to-[#FF8EAA] italic font-light">Your Skin Better.</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 font-medium leading-relaxed max-w-md mb-10">
                Knowledge is the ultimate skincare step. Discover the science behind healthy skin, debunk common myths, and learn how to build a routine that actually works.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => document.getElementById('education-topics').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-gradient-to-r from-[#FF2D7A] to-[#FF8EAA] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:shadow-[0_10px_30px_rgba(255,45,122,0.3)] transition-all duration-300 w-max"
                >
                  Start Learning
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CORE TOPICS (Interactive Cards) */}
      <section id="education-topics" className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-2 h-8 bg-gradient-to-b from-[#FF2D7A] to-[#FF8EAA] rounded-full"></div>
            <h2 className="text-3xl lg:text-4xl font-heading font-black text-[#1B1B1B]">Core Skin Science</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topics.map((topic, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#FFFDFD] rounded-[2rem] p-8 border border-gray-100 hover:border-[#FF2D7A]/30 shadow-sm hover:shadow-[0_20px_40px_rgba(255,45,122,0.08)] transition-all duration-500 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-[#FFF5F8] text-[#FF2D7A] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#FF2D7A] group-hover:text-white transition-all duration-300">
                  <topic.icon size={24} />
                </div>
                <h3 className="text-2xl font-heading font-black text-[#1B1B1B] mb-3 group-hover:text-[#FF2D7A] transition-colors">{topic.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed text-sm">{topic.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. LAYERING GUIDE */}
      <section className="py-16 lg:py-24 bg-[#FFF5F8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <span className="text-[#FF2D7A] font-bold uppercase tracking-widest text-xs mb-3 block">Step-By-Step</span>
              <h2 className="text-4xl lg:text-5xl font-heading font-black text-[#1B1B1B] mb-6">The Perfect Layering Guide</h2>
              <p className="text-lg text-gray-600 font-medium leading-relaxed mb-8">
                Applying products in the correct order ensures they absorb properly. The golden rule? Apply from thinnest (water-like) to thickest (creamy/oily) consistency.
              </p>
              <div className="space-y-4">
                {['Cleanser', 'Toner / Essence', 'Serums / Treatments', 'Eye Cream', 'Moisturizer', 'SPF (Morning) / Oil (Night)'].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-transparent shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-[#FFF5F8] text-[#FF2D7A] flex items-center justify-center font-bold text-sm shrink-0">
                      {idx + 1}
                    </div>
                    <span className="text-[#1B1B1B] font-bold">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[400px] lg:h-[600px]">
                <img src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&q=80" alt="Skincare Layering" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-10">
                  <p className="text-white font-medium text-lg leading-relaxed">
                    "Skincare is like building a house. Cleanser is the foundation, serums are the structural support, and moisturizer is the roof that seals it all in."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MYTHS VS FACTS */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-black text-[#1B1B1B] mb-4">Myths vs. Facts</h2>
            <p className="text-gray-600 font-medium max-w-lg mx-auto">Let's clear up some of the most common skincare misconceptions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {myths.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-[#FFFDFD] rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="mt-1 shrink-0 text-red-400">
                    <XCircle size={24} />
                  </div>
                  <div>
                    <span className="text-red-400 text-xs font-bold uppercase tracking-widest block mb-1">Myth</span>
                    <h3 className="text-xl font-heading font-black text-[#1B1B1B]">{item.myth}</h3>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl">
                  <div className="mt-1 shrink-0 text-green-500">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <span className="text-green-600 text-xs font-bold uppercase tracking-widest block mb-1">Fact</span>
                    <p className="text-gray-700 font-medium leading-relaxed text-sm">{item.fact}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="py-16 lg:py-24 bg-[#FFFDFD] border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-black text-[#1B1B1B]">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className={`bg-white rounded-2xl border transition-all duration-300 ${activeFaq === idx ? 'border-[#FF2D7A]/30 shadow-md' : 'border-gray-100'}`}
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className={`font-bold transition-colors ${activeFaq === idx ? 'text-[#FF2D7A]' : 'text-[#1B1B1B]'}`}>
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'bg-[#FFF5F8] text-[#FF2D7A] rotate-180' : 'bg-gray-50 text-gray-400'}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 text-gray-600 font-medium leading-relaxed text-sm">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="py-12 lg:py-16 bg-white text-center border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl lg:text-5xl font-heading font-black text-[#1B1B1B] mb-6">Discover Your Perfect Routine</h2>
          <p className="text-xl text-gray-500 font-medium mb-10">Now that you know the science, let us guide you to the products that will transform your skin.</p>
          <div className="flex justify-center">
            <Link to="/skin-quiz" className="px-10 py-4 bg-gradient-to-r from-[#FF2D7A] to-[#FF8EAA] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:shadow-[0_10px_30px_rgba(255,45,122,0.3)] hover:-translate-y-1 transition-all duration-300">
              Start The Quiz
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
