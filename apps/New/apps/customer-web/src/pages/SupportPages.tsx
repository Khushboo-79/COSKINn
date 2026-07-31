import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { ChevronDown, Package, HelpCircle, Truck, RefreshCw } from 'lucide-react';

const PageWrapper: React.FC<{ children: React.ReactNode; title: string; subtitle: string; icon: React.ReactNode }> = ({ children, title, subtitle, icon }) => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  
  return (
    <div className={`min-h-screen pt-12 pb-24 transition-colors duration-500 ${isGlam ? 'bg-[#faf9f6]' : 'bg-[#fcfaf9]'}`}>
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 md:mb-20">
          <div className={`mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-6 ${
            isGlam ? 'bg-[#2a2a2a] text-[#e5b376]' : 'bg-[#fff0f2] text-[#ff9aa8]'
          }`}>
            {icon}
          </div>
          <p className={`text-sm font-bold uppercase tracking-widest mb-4 ${isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}`}>
            {subtitle}
          </p>
          <h1 className={`text-4xl md:text-5xl font-extrabold mb-6 text-[#2a2a2a] ${isGlam ? 'font-serif' : 'font-display'}`}>
            {title}
          </h1>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-8 md:p-12 rounded-[32px] border ${
            isGlam ? 'bg-white border-[#e5b376]/20 shadow-xl shadow-[#e5b376]/5' : 'bg-white border-[#ffe4e8] shadow-xl shadow-[#ff9aa8]/5'
          }`}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export const Shipping: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  return (
    <PageWrapper title="Shipping Policy" subtitle="How we deliver to you" icon={<Truck size={32} />}>
      <div className={`space-y-8 text-[15px] leading-relaxed ${isGlam ? 'text-gray-600 font-serif' : 'text-gray-600'}`}>
        <div>
          <h3 className={`text-xl font-bold mb-3 ${isGlam ? 'text-[#2a2a2a]' : 'text-gray-900'}`}>Processing Time</h3>
          <p>All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.</p>
        </div>
        <div>
          <h3 className={`text-xl font-bold mb-3 ${isGlam ? 'text-[#2a2a2a]' : 'text-gray-900'}`}>Shipping Rates & Delivery Estimates</h3>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Standard Shipping:</strong> 3-5 business days - $5.00 (Free on orders over $40)</li>
            <li><strong>Express Shipping:</strong> 1-2 business days - $15.00</li>
          </ul>
        </div>
        <div>
          <h3 className={`text-xl font-bold mb-3 ${isGlam ? 'text-[#2a2a2a]' : 'text-gray-900'}`}>International Shipping</h3>
          <p>We currently ship to the US, Canada, UK, and Australia. Shipping charges for your order will be calculated and displayed at checkout.</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export const Returns: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  return (
    <PageWrapper title="Returns & Exchanges" subtitle="Our guarantee" icon={<RefreshCw size={32} />}>
      <div className={`space-y-8 text-[15px] leading-relaxed ${isGlam ? 'text-gray-600 font-serif' : 'text-gray-600'}`}>
        <div>
          <h3 className={`text-xl font-bold mb-3 ${isGlam ? 'text-[#2a2a2a]' : 'text-gray-900'}`}>30-Day Money-Back Guarantee</h3>
          <p>We want you to love your COSKINn products! If you are not completely satisfied, you may return the item(s) within 30 days of purchase for a full refund or exchange. Products must be at least half full to be eligible.</p>
        </div>
        <div>
          <h3 className={`text-xl font-bold mb-3 ${isGlam ? 'text-[#2a2a2a]' : 'text-gray-900'}`}>How to Return</h3>
          <p>Simply contact our support team with your order number, and we will provide you with a return shipping label. Once your return is received and inspected, we will initiate a refund to your original method of payment.</p>
        </div>
        <div>
          <h3 className={`text-xl font-bold mb-3 ${isGlam ? 'text-[#2a2a2a]' : 'text-gray-900'}`}>Damaged Items</h3>
          <p>If you received a damaged product, please notify us immediately for assistance.</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export const FAQ: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  
  const faqs = [
    { q: "Are your products vegan?", a: "Yes! Every single product in our line is 100% vegan and cruelty-free." },
    { q: "Where do you ship?", a: "We currently ship across India." },
    { q: "Can I use multiple promo codes?", a: "Currently, our system only allows one promo code per order." },
    { q: "Are the products safe for sensitive skin?", a: "Yes, our products are dermatologist-tested and formulated to be gentle on sensitive skin." },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <PageWrapper title="Frequently Asked Questions" subtitle="Got questions?" icon={<HelpCircle size={32} />}>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border-b border-gray-100 last:border-0 pb-4">
            <button 
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between text-left py-4"
            >
              <span className={`text-lg font-bold ${isGlam ? 'text-[#2a2a2a]' : 'text-gray-900'}`}>{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === idx && (
              <p className={`pb-4 pr-12 text-[15px] leading-relaxed ${isGlam ? 'text-gray-600 font-serif' : 'text-gray-600'}`}>
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </PageWrapper>
  );
};

export const TrackOrder: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  return (
    <PageWrapper title="Track Your Order" subtitle="Where is my package?" icon={<Package size={32} />}>
      <div className="max-w-md mx-auto">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Order Number</label>
            <input type="text" placeholder="e.g. CSK-1234" className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input type="email" placeholder="Used during checkout" className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
          </div>
          <button 
            type="submit" 
            className={`w-full py-4 rounded-xl font-bold transition-all mt-4 ${
              isGlam ? 'bg-[#2a2a2a] text-[#e5b376] hover:bg-black' : 'bg-[#ff9aa8] text-white hover:bg-[#ff8091]'
            }`}
          >
            Track Package
          </button>
        </form>
      </div>
    </PageWrapper>
  );
};
