import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, PackageSearch, RefreshCcw, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const HELP_CATEGORIES = [
  { title: "Track Order", icon: <PackageSearch size={24} />, link: "/track-order", desc: "Check the status of your recent orders." },
  { title: "Returns & Exchanges", icon: <RefreshCcw size={24} />, link: "/returns-refunds", desc: "Start a return or read our policy." },
  { title: "FAQs", icon: <HelpCircle size={24} />, link: "/faqs", desc: "Find answers to common questions." }
];

export default function HelpCenterPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDFD] flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="pt-32 pb-24 px-6 text-center bg-gradient-to-b from-[#FFF5F8] to-[#FFFDFD]">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-6xl font-heading font-black text-[#1B1B1B] mb-6"
          >
            How can we help you?
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-2xl mx-auto relative mt-10"
          >
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-400">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Search for answers (e.g. 'Shipping times')" 
              className="w-full bg-white border-2 border-transparent rounded-full pl-14 pr-6 py-5 text-lg shadow-[0_15px_40px_rgba(0,0,0,0.06)] focus:outline-none focus:border-[#FF2D7A] transition-colors"
            />
          </motion.div>
        </section>

        {/* 2. CATEGORIES */}
        <section className="pb-24 px-6 lg:px-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HELP_CATEGORIES.map((cat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group bg-white rounded-[2rem] p-8 lg:p-10 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-[#FF2D7A]/30 hover:shadow-[0_20px_40px_rgba(255,45,122,0.08)] transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[#FFF5F8] rounded-full flex items-center justify-center text-[#FF2D7A] mb-6 group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-heading font-black text-[#1B1B1B] mb-3">{cat.title}</h3>
                <p className="text-gray-500 font-medium mb-8 leading-relaxed">{cat.desc}</p>
                <Link to={cat.link} className="inline-flex items-center gap-2 text-[#FF2D7A] font-bold uppercase tracking-widest text-sm hover:gap-4 transition-all">
                  View Details <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. CONTACT US */}
        <section className="py-24 px-6 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-heading font-black text-[#1B1B1B] mb-6">Need more help?</h2>
            <p className="text-gray-500 text-lg font-medium mb-10 max-w-xl mx-auto">
              Our customer care team is available Monday to Saturday, 10:00 AM to 7:00 PM IST to assist you with any inquiries.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="px-10 py-4 bg-[#FF2D7A] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#E01E63] hover:shadow-[0_10px_30px_rgba(255,45,122,0.3)] hover:-translate-y-1 transition-all duration-300">
                Contact Us
              </Link>
              <a href="mailto:support@coskinn.com" className="px-10 py-4 bg-white border border-gray-200 text-[#1B1B1B] rounded-full font-bold uppercase tracking-widest text-sm hover:border-[#FF2D7A] hover:text-[#FF2D7A] transition-all duration-300">
                Email Support
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
