import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, Mail } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const FAQ_DATA = [
  {
    category: "Orders & Shipping",
    items: [
      { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days." },
      { q: "Do you ship internationally?", a: "Currently, we only ship within India. We hope to expand globally soon!" },
      { q: "Can I change my order after placing it?", a: "We process orders very quickly. If you need to make a change, please email us within 1 hour of placing the order." }
    ]
  },
  {
    category: "Products & Ingredients",
    items: [
      { q: "Are your products cruelty-free?", a: "Yes! COSKINn is 100% cruelty-free and we never test on animals." },
      { q: "Are your products safe for sensitive skin?", a: "Our products are dermatologist-tested and formulated to be gentle, but we always recommend a patch test first if you have hypersensitive skin." },
      { q: "Where can I find the full ingredient list?", a: "Full ingredient lists are available on every individual product page under the 'Ingredients' tab." }
    ]
  },
  {
    category: "Returns & Exchanges",
    items: [
      { q: "What is your return policy?", a: "We offer a 7-day return policy for unused products in their original packaging." },
      { q: "How long do refunds take?", a: "Refunds typically process within 5-7 business days after we receive your returned item." }
    ]
  }
];

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState("Orders & Shipping");
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentFaqs = FAQ_DATA.find(c => c.category === activeCategory)?.items || [];

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
                {FAQ_DATA.map((cat, idx) => (
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
                ))}
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
