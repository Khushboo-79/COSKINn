import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Mail, Phone, MapPin, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  const faqs = [
    {
      q: "Where do you ship?",
      a: "We currently ship to the US, Canada, UK, and Australia. We are working on expanding to more countries soon!"
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
    <div className={`min-h-screen pt-12 pb-24 transition-colors duration-500 ${isGlam ? 'bg-[#faf9f6]' : 'bg-[#fcfaf9]'}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <p className={`text-sm font-bold uppercase tracking-widest mb-4 ${isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}`}>
            We're here to help
          </p>
          <h1 className={`text-4xl md:text-6xl font-extrabold mb-6 text-[#2a2a2a] ${isGlam ? 'font-serif' : 'font-display'}`}>
            Contact Us
          </h1>
          <p className="text-gray-500 font-medium text-lg">
            Have a question about a product, your order, or just want to say hi? Drop us a line below.
          </p>
        </div>

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
                <p className="text-gray-500 font-medium text-sm">hello@coskinn.com</p>
                <p className="text-gray-500 font-medium text-sm">support@coskinn.com</p>
              </div>
              <div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${isGlam ? 'bg-[#7a1b26]/10 text-[#7a1b26]' : 'bg-[#ff9aa8]/10 text-[#ff9aa8]'}`}>
                  <Phone size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-500 font-medium text-sm">1-800-COSKIN-N</p>
                <p className="text-gray-500 font-medium text-sm">Mon-Fri 9am-5pm EST</p>
              </div>
              <div className="sm:col-span-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${isGlam ? 'bg-[#7a1b26]/10 text-[#7a1b26]' : 'bg-[#ff9aa8]/10 text-[#ff9aa8]'}`}>
                  <MapPin size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Headquarters</h3>
                <p className="text-gray-500 font-medium text-sm">
                  123 Beauty Blvd, Suite 400<br/>
                  New York, NY 10001
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
    </div>
  );
};

export default Contact;
