import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function CategoryFAQ({ faqs }) {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <section className="py-12 mb-8">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4 text-black">Common Questions</h2>
          <p className="text-lg font-bold text-[#FF2D7A]">Everything you need to know about your new skincare journey.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border rounded-2xl overflow-hidden transition-all duration-500 bg-white ${
                activeFaq === idx 
                  ? 'border-gray-800 shadow-lg' 
                  : 'border-white hover:border-gray-200 shadow-sm hover:shadow-md'
              }`}
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full px-8 py-6 flex items-center justify-between text-left"
              >
                <span className={`font-bold text-lg md:text-xl transition-colors ${activeFaq === idx ? 'text-[#FF2D7A]' : 'text-black'}`}>
                  {faq.q}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${activeFaq === idx ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
                  {activeFaq === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-[#FAFAFA] border-t border-gray-100"
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
  );
}
