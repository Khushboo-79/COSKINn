import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Wind, Sparkles, Shield } from 'lucide-react';

export default function CategoryRoutine() {
  const routineSteps = [
    { step: "Step 1", title: "Cleanse", desc: "Remove impurities and prep the skin canvas.", icon: Droplets },
    { step: "Step 2", title: "Treatment", desc: "Apply targeted serums or mists for deep absorption.", icon: Wind },
    { step: "Step 3", title: "Moisturize", desc: "Lock in hydration and active fruit ingredients.", icon: Sparkles },
    { step: "Step 4", title: "Protect", desc: "Shield your skin barrier with daily SPF.", icon: Shield }
  ];

  return (
    <section className="py-16 bg-[#FAFAFA] border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4 text-[#1B1B1B]">Recommended Routine</h2>
          <p className="text-lg font-bold text-[#FF2D7A]">Your daily ritual for flawless skin.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Side: Timeline */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute left-8 top-10 bottom-10 w-[2px] bg-gradient-to-b from-[#FF2D7A]/20 via-[#FF2D7A]/10 to-transparent" />
            
            <div className="space-y-8">
              {routineSteps.map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative pl-24 group cursor-pointer"
                >
                  {/* Timeline Dot & Icon */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white border border-[#FFF0F4] shadow-sm flex items-center justify-center group-hover:border-[#FF2D7A] group-hover:shadow-md transition-all duration-300 z-10">
                    <item.icon className="text-[#FF2D7A] group-hover:scale-110 transition-transform duration-300" size={24} />
                  </div>
                  
                  {/* Content */}
                  <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-sm group-hover:shadow-lg transition-all duration-300">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF2D7A] mb-2 block">
                      {item.step}
                    </span>
                    <h3 className="text-2xl font-heading font-bold text-[#1B1B1B] mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Editorial Image */}
          <div className="w-full lg:w-1/2 relative mt-12 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FFF0F4] to-transparent rounded-[40px] rotate-3 scale-105 opacity-60 z-0" />
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-gray-100">
              <img 
                src="https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="COSKINn Routine Lifestyle" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white font-heading text-2xl font-medium italic drop-shadow-md">
                  "The perfect canvas begins with consistent care."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
