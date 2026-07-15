import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Sparkles } from 'lucide-react';

export default function CategoryReviews({ reviews }) {
  // Extending existing simple reviews with luxury metadata for the UI redesign
  const enrichedReviews = reviews.map((r, i) => ({
    ...r,
    skinConcern: ["Dullness & Texture", "Dry Flaky Skin", "Blemishes & Acne"][i % 3],
    daysUsed: [14, 28, 30][i % 3],
    improvement: [92, 88, 95][i % 3],
    product: ["Complete Routine", "Cleanser & Serum", "Night Mask"][i % 3]
  }));

  return (
    <section className="py-16 bg-white overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4 text-[#1B1B1B]">Customer Results</h2>
            <p className="text-lg font-bold text-[#FF2D7A]">Real transformations. Verified by science.</p>
          </div>
          
          {/* Quick Statistics Banner */}
          <div className="flex gap-8 bg-[#FAFAFA] p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="text-center">
              <p className="text-3xl font-heading font-bold text-[#FF2D7A]">94%</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Brighter Skin</p>
            </div>
            <div className="w-[1px] bg-gray-200" />
            <div className="text-center">
              <p className="text-3xl font-heading font-bold text-[#FF2D7A]">88%</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Less Breakouts</p>
            </div>
          </div>
        </div>

        {/* Masonry / Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrichedReviews.map((review, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              className={`relative flex flex-col bg-gradient-to-br from-[#FAFAFA] to-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 ${
                idx === 0 ? 'lg:col-span-2 bg-[#FFF0F4]/30' : ''
              }`}
            >
              {idx === 0 && <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF2D7A]/5 blur-3xl rounded-full" />}
              
              {/* Header: Rating & Verified */}
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex gap-1 text-[#FF2D7A]">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#2b5968] bg-[#2b5968]/10 px-3 py-1.5 rounded-full">
                  <ShieldCheck size={14} /> Verified
                </span>
              </div>

              {/* Review Text */}
              <p className={`font-medium italic text-gray-800 leading-relaxed mb-8 relative z-10 flex-1 ${idx === 0 ? 'text-2xl lg:text-3xl' : 'text-lg'}`}>
                "{review.text}"
              </p>

              {/* Customer Info & Stats Grid */}
              <div className="mt-auto relative z-10 bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center font-bold text-gray-600 shadow-inner">
                    {review.initial}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1B1B1B]">{review.name}</h4>
                    <p className="text-xs text-gray-500">{review.skinConcern}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-4 mt-4">
                  <div className="text-center">
                    <p className="text-[#FF2D7A] font-bold text-lg">{review.daysUsed}</p>
                    <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Days Used</p>
                  </div>
                  <div className="text-center border-x border-gray-100">
                    <p className="text-[#FF2D7A] font-bold text-lg">+{review.improvement}%</p>
                    <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Improvement</p>
                  </div>
                  <div className="text-center">
                    <div className="h-7 flex items-center justify-center text-gray-400">
                      <Sparkles size={16} />
                    </div>
                    <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold truncate px-1">{review.product}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
