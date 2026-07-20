import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, Mail } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import apiClient from '../../utils/apiClient';

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState("");
  const [activeFaq, setActiveFaq] = useState(null);
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchFaqs = async () => {
      try {
        const response = await apiClient.get('/content/faqs');
        const faqs = response.data || [];
        
        // Group by category
        const grouped = faqs.reduce((acc, faq) => {
          const cat = faq.category || "General";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push({ q: faq.question, a: faq.answer });
          return acc;
        }, {});

        const groupedArray = Object.keys(grouped).map(key => ({
          category: key,
          items: grouped[key]
        }));
        
        setFaqData(groupedArray);
        if (groupedArray.length > 0) {
          setActiveCategory(groupedArray[0].category);
        }
      } catch (error) {
        console.error("Failed to load FAQs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const currentFaqs = faqData.find(c => c.category === activeCategory)?.items || [];

  return (
    <div className="min-h-screen bg-[#FFFDFD] flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="pt-32 pb-16 px-6 text-center bg-gradient-to-b from-[#FFF5F8] to-[#FFFDFD]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-[#FF2D7A] shadow-md mb-6"
          >
            <MessageCircle size={28} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-heading font-black text-[#1B1B1B] mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-500 font-medium max-w-xl mx-auto"
          >
            Find quick answers to common questions about our products, shipping, and return policies.
          </motion.p>
        </section>

        {/* Content */}
        <section className="pb-24 px-6 lg:px-12 max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            {/* Sidebar Categories */}
            <div className="w-full lg:w-64 shrink-0">
              <div className="flex overflow-x-auto lg:flex-col gap-2 pb-4 lg:pb-0 hide-scrollbar lg:sticky lg:top-32">
                {loading ? (
                  <div className="text-gray-400 text-sm font-bold uppercase animate-pulse">Loading Categories...</div>
                ) : (
                  faqData.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveCategory(cat.category);
                        setActiveFaq(null);
                      }}
                      className={`whitespace-nowrap px-6 py-4 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all duration-300 text-left ${
                        activeCategory === cat.category 
                          ? 'bg-[#FF2D7A] text-white shadow-md' 
                          : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-[#1B1B1B]'
                      }`}
                    >
                      {cat.category}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="flex-1">
              <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-8 border-b border-gray-100 pb-4">
                {activeCategory}
              </h2>
              
              <div className="space-y-4">
                {currentFaqs.map((faq, idx) => (
                  <div 
                    key={idx} 
                    className={`bg-white rounded-2xl border transition-all duration-300 ${activeFaq === idx ? 'border-[#FF2D7A]/30 shadow-md' : 'border-gray-100'}`}
                  >
                    <button 
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                    >
                      <span className={`font-bold text-lg transition-colors ${activeFaq === idx ? 'text-[#FF2D7A]' : 'text-[#1B1B1B]'}`}>
                        {faq.q}
                      </span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'bg-[#FFF5F8] text-[#FF2D7A] rotate-180' : 'bg-gray-50 text-gray-400'}`}>
                        <ChevronDown size={18} />
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {activeFaq === idx && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 text-gray-600 font-medium leading-relaxed">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Still Need Help Card */}
              <div className="mt-16 bg-[#FFF5F8] rounded-[2rem] p-8 lg:p-10 border border-[#FF2D7A]/10 text-center">
                <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-[#FF2D7A] shadow-sm mb-6">
                  <Mail size={24} />
                </div>
                <h3 className="text-2xl font-heading font-black text-[#1B1B1B] mb-3">Still have questions?</h3>
                <p className="text-gray-500 font-medium mb-8">We're here to help you get the glow you deserve.</p>
                <a 
                  href="mailto:support@coskinn.com"
                  className="inline-block px-10 py-4 bg-white border-2 border-[#FF2D7A] text-[#FF2D7A] rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#FF2D7A] hover:text-white transition-all duration-300"
                >
                  Contact Support
                </a>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
