import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { PackageSearch, ArrowRight } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

export default function TrackOrderPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDFD] flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center pt-32 pb-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_15px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-8 lg:p-16 text-center relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF2D7A] to-[#FF8EAA]"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FFF5F8] rounded-full blur-3xl opacity-50 pointer-events-none"></div>

          <div className="w-20 h-20 mx-auto bg-[#FFF5F8] rounded-full flex items-center justify-center text-[#FF2D7A] mb-8 shadow-inner">
            <PackageSearch size={36} strokeWidth={1.5} />
          </div>

          <h1 className="text-3xl lg:text-4xl font-heading font-black text-[#1B1B1B] mb-4">
            Track Your Order
          </h1>
          <p className="text-gray-500 font-medium mb-10 max-w-md mx-auto">
            Enter your Order ID and email address below to receive real-time updates on your shipment status.
          </p>

          <form className="space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-bold text-[#1B1B1B] uppercase tracking-widest mb-2 ml-4">
                Order ID
              </label>
              <input 
                type="text" 
                placeholder="e.g. CSKN-12345" 
                className="w-full bg-gray-50 border border-gray-200 rounded-full px-6 py-4 text-[#1B1B1B] focus:outline-none focus:border-[#FF2D7A] focus:ring-1 focus:ring-[#FF2D7A] transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-[#1B1B1B] uppercase tracking-widest mb-2 ml-4">
                Email Address
              </label>
              <input 
                type="email" 
                placeholder="you@example.com" 
                className="w-full bg-gray-50 border border-gray-200 rounded-full px-6 py-4 text-[#1B1B1B] focus:outline-none focus:border-[#FF2D7A] focus:ring-1 focus:ring-[#FF2D7A] transition-all"
              />
            </div>

            <button 
              type="submit" 
              className="w-full mt-4 flex items-center justify-center gap-2 bg-[#FF2D7A] text-white rounded-full py-4 font-bold uppercase tracking-widest hover:bg-[#E01E63] hover:shadow-[0_10px_30px_rgba(255,45,122,0.3)] hover:-translate-y-1 transition-all duration-300"
            >
              Track Package <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-100 text-sm text-gray-400 font-medium">
            <p>Order IDs can be found in your confirmation email.</p>
            <p>Having trouble? <a href="mailto:support@coskinn.com" className="text-[#FF2D7A] font-bold">Contact Support</a></p>
          </div>

        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
