import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Mail, Phone, MapPin, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Contact: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  const pageRef = useScrollReveal<HTMLDivElement>();

  const faqs = [
    {
      q: "Where do you ship?",
      a: "We currently ship across India. We are working on expanding to more countries soon!"
    },
    {
      q: "What is your return policy?",
      a: "We accept returns within 30 days of purchase for a full refund. The products must be at least half full."
    },
    {
      q: "Are your products vegan?",
      a: "Yes! Every single product in our line is 100% vegan and cruelty-free."
    }
  ];

  return (
    <div ref={pageRef} className={`min-h-screen pt-12 pb-24 transition-colors duration-500 ${isGlam ? 'bg-[#faf9f6]' : 'bg-[#fcfaf9]'}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16 md:mb-24">
          <div className="text-center md:text-left md:w-1/2 max-w-2xl mx-auto scroll-reveal scroll-reveal-up">
            <p className={`text-sm font-bold uppercase tracking-widest mb-4 ${isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}`}>
              We're here to help
            </p>
            <h1 className={`text-4xl md:text-6xl font-extrabold mb-6 text-[#2a2a2a] ${isGlam ? 'font-serif' : 'font-display'}`}>
              Contact Us
            </h1>
            <p className="text-gray-500 font-medium text-lg max-w-lg md:mx-0 mx-auto">
              Have a question about a product, your order, or just want to say hi? Drop us a line below.
            </p>
          </div>
          <div className="w-full md:w-1/2 scroll-reveal scroll-reveal-right">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[16/9] md:aspect-[4/3] rounded-[32px] overflow-hidden shadow-xl"
            >
              <img 
                src={isGlam ? 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/24c4ac61030646c83895aa1d3448017a_256e2b1a-3119-4a30-af27-4926c38103a2.jpg?v=1756201951' : 'https://www.dotandkey.com/cdn/shop/files/Banner_Mob_c80fe41c-c277-4cdb-a135-343928f3e8aa.jpg'}
                alt="Contact Us"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <section className={`w-full relative py-20 mt-12 ${isGlam ? 'bg-[#f4efe8]' : 'bg-[#ffe4eb]'}`}>
        {!isGlam && (
          <>
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0 -translate-y-[99%] pointer-events-none">
              <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
                <path d="M0,100 L0,50 C 120,40 240,60 360,30 C 480,0 600,70 720,40 C 840,10 960,60 1080,20 C 1200,-20 1320,50 1440,30 L1440,100 Z" fill="#ffe4eb" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 translate-y-[99%] pointer-events-none">
              <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
                <path d="M0,0 L0,50 C 120,60 240,40 360,70 C 480,100 600,30 720,60 C 840,90 960,40 1080,80 C 1200,120 1320,50 1440,70 L1440,0 Z" fill="#ffe4eb" />
              </svg>
            </div>
          </>
        )}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Left: Form */}
          <div className="w-full lg:w-1/2">
            <div className={`p-8 md:p-12 rounded-[32px] border ${isGlam ? 'bg-white border-[#e5b376]/20 shadow-xl shadow-[#e5b376]/5' : 'bg-white border-[#ffe4e8] shadow-xl shadow-[#ff9aa8]/5'}`}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                    <input type="text" className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                    <input type="text" className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                  <input type="email" className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                  <input type="text" className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                  <textarea rows={5} className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium resize-none"></textarea>
                </div>
                <button 
                  type="submit"
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                    isGlam ? 'bg-[#2a2a2a] text-[#e5b376] hover:bg-black' : 'bg-[#ff9aa8] text-white hover:bg-[#ff8091] shadow-lg shadow-[#ff9aa8]/30'
                  }`}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Right: Info & FAQ */}
          <div className="w-full lg:w-1/2 space-y-16">
            
            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${isGlam ? 'bg-[#7a1b26]/10 text-[#7a1b26]' : 'bg-[#ff9aa8]/10 text-[#ff9aa8]'}`}>
                  <Mail size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-500 font-medium text-sm">hello@fairenne.com</p>
                <p className="text-gray-500 font-medium text-sm">support@fairenne.com</p>
              </div>
              <div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${isGlam ? 'bg-[#7a1b26]/10 text-[#7a1b26]' : 'bg-[#ff9aa8]/10 text-[#ff9aa8]'}`}>
                  <Phone size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-500 font-medium text-sm">+91 1800-COSKIN-N</p>
                <p className="text-gray-500 font-medium text-sm">Mon-Fri 9am-5pm IST</p>
              </div>
              <div className="sm:col-span-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${isGlam ? 'bg-[#7a1b26]/10 text-[#7a1b26]' : 'bg-[#ff9aa8]/10 text-[#ff9aa8]'}`}>
                  <MapPin size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Headquarters</h3>
                <p className="text-gray-500 font-medium text-sm">
                  123 Beauty Blvd, Suite 400<br/>
                  Mumbai, Maharashtra 400001
                </p>
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h2 className={`text-2xl font-bold mb-6 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-gray-900'}`}>
                Frequently Asked
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <details key={idx} className="group border border-gray-200 rounded-2xl bg-white overflow-hidden">
                    <summary className="flex justify-between items-center font-bold text-gray-900 cursor-pointer list-none p-5">
                      <span>{faq.q}</span>
                      <span className="transition group-open:rotate-180">
                        <ChevronDown size={20} className="text-gray-400" />
                      </span>
                    </summary>
                    <div className="text-gray-500 font-medium text-sm p-5 pt-0">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            </div>

          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
