import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isGlam ? 'bg-[#faf9f6]' : 'bg-[#fcfaf9]'}`}>
      
      {/* Hero Section */}
      <section className={`relative pt-20 pb-32 md:py-40 overflow-hidden ${isGlam ? 'bg-[#faf9f6]' : 'bg-gradient-to-b from-[#ffe4e8]/40 to-white'}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`text-sm font-bold uppercase tracking-widest mb-6 ${isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}`}
            >
              Our Story
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`text-5xl md:text-7xl font-extrabold leading-[1.1] mb-8 text-[#2a2a2a] ${isGlam ? 'font-serif' : 'font-display'}`}
            >
              Uncomplicated skincare for complicated lives.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-2xl"
            >
              COSKINn was born out of a simple need: products that actually work without needing a 12-step routine.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Image / Values Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative aspect-[4/5] rounded-[32px] overflow-hidden"
            >
              <img 
                src={isGlam ? 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80' : 'https://images.pexels.com/photos/8101534/pexels-photo-8101534.jpeg?auto=compress&cs=tinysrgb&w=800'} 
                alt="COSKINn Lifestyle" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="space-y-12">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <h3 className={`text-3xl font-bold mb-4 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-gray-900'}`}>Clean Ingredients</h3>
                <p className="text-gray-600 font-medium text-lg leading-relaxed">
                  We formulate using only the highest quality, scientifically-backed ingredients. No parabens, no sulfates, just pure goodness that your skin will drink up.
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                <h3 className={`text-3xl font-bold mb-4 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-gray-900'}`}>Cruelty Free</h3>
                <p className="text-gray-600 font-medium text-lg leading-relaxed">
                  We love animals as much as we love glowing skin. Our entire product line is 100% vegan and leaping-bunny certified cruelty-free.
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                <h3 className={`text-3xl font-bold mb-4 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-gray-900'}`}>For Everyone</h3>
                <p className="text-gray-600 font-medium text-lg leading-relaxed">
                  Skincare shouldn't be exclusive. Whether you're a minimalist or a maximalist, our products are designed to fit seamlessly into any routine.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`py-20 md:py-32 ${isGlam ? 'bg-[#f4efe8]/50' : 'bg-gray-50'}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-extrabold mb-6 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-gray-900'}`}>
              Meet the Founders
            </h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">
              Two best friends who were tired of spending hundreds of dollars on products that promised the world and delivered nothing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="aspect-square rounded-full overflow-hidden mb-6 mx-auto w-48 md:w-64">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80" alt="Jane Doe" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-1">Sarah Jenkins</h4>
              <p className={`text-sm font-bold uppercase tracking-widest ${isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}`}>Co-Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="aspect-square rounded-full overflow-hidden mb-6 mx-auto w-48 md:w-64">
                <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80" alt="John Smith" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-1">Emily Chen</h4>
              <p className={`text-sm font-bold uppercase tracking-widest ${isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}`}>Co-Founder & CPO</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
