import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-20 ${theme === 'cosmetics' ? 'bg-theme-dark text-white' : 'bg-theme-bg text-theme-dark'}`}>
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-heading font-black mb-8"
        >
          Contact Us
        </motion.h1>
        
        <div className="grid md:grid-cols-2 gap-12 mt-12">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 border border-theme-primary/20 rounded-3xl backdrop-blur-md"
          >
            <h2 className="text-2xl font-heading font-bold mb-6">Send us a message</h2>
            <form className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 opacity-80">Name</label>
                <input type="text" className="w-full bg-transparent border-b border-theme-primary/30 pb-2 focus:outline-none focus:border-theme-primary transition-colors" placeholder="Your full name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 opacity-80">Email</label>
                <input type="email" className="w-full bg-transparent border-b border-theme-primary/30 pb-2 focus:outline-none focus:border-theme-primary transition-colors" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 opacity-80">Message</label>
                <textarea className="w-full bg-transparent border-b border-theme-primary/30 pb-2 focus:outline-none focus:border-theme-primary transition-colors resize-none h-24" placeholder="How can we help you?"></textarea>
              </div>
              <button type="button" className="mt-4 py-4 px-8 bg-theme-primary text-white rounded-full font-bold hover:opacity-90 transition-opacity self-start">
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Info & Map */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-10"
          >
            <div>
              <h2 className="text-2xl font-heading font-bold mb-4">Get in Touch</h2>
              <div className="flex flex-col gap-3 opacity-80">
                <p><strong>Email:</strong> support@coskinn.com</p>
                <p><strong>Phone:</strong> +1 (800) 123-4567</p>
                <p><strong>Business Hours:</strong> Mon-Fri, 9AM - 6PM EST</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold mb-4">Follow Us</h2>
              <div className="flex gap-4 opacity-80">
                <a href="#" className="hover:text-theme-primary transition-colors">Instagram</a>
                <a href="#" className="hover:text-theme-primary transition-colors">Facebook</a>
                <a href="#" className="hover:text-theme-primary transition-colors">Pinterest</a>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold mb-4">Store Location</h2>
              <p className="opacity-80 mb-4">123 Beauty Avenue, New York, NY 10001</p>
              <div className="w-full h-48 bg-theme-primary/10 rounded-2xl border border-theme-primary/20 flex items-center justify-center">
                <span className="opacity-50">Google Maps Placeholder</span>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-heading font-bold mb-4">FAQs</h2>
              <p className="opacity-80">Have questions? Check out our <a href="#" className="text-theme-primary underline hover:opacity-80">Frequently Asked Questions</a>.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
