import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Reviews: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  const reviews = [
    { text: "My skin is bouncing back to life.", author: "Priya", product: "Peach Serum" },
    { text: "Sorbet cleanser = actual joy.", author: "Amelia", product: "Strawberry Cleanser" },
    { text: "The glow is unreal.", author: "Sarah", product: "Watermelon Mask" },
    { text: "My skin is bouncing back to life.", author: "Priya", product: "Peach Serum" },
    { text: "Sorbet cleanser = actual joy.", author: "Amelia", product: "Strawberry Cleanser" },
    { text: "The glow is unreal.", author: "Sarah", product: "Watermelon Mask" }
  ];

  const glamReviews = [
    { text: "The pigment is out of this world.", author: "Elena", product: "Scarlet Kiss" },
    { text: "Flawless finish that lasts all day.", author: "Sofia", product: "Velvet Foundation" },
    { text: "I feel like a movie star.", author: "Chloe", product: "Golden Hour" },
    { text: "The pigment is out of this world.", author: "Elena", product: "Scarlet Kiss" },
    { text: "Flawless finish that lasts all day.", author: "Sofia", product: "Velvet Foundation" },
    { text: "I feel like a movie star.", author: "Chloe", product: "Golden Hour" }
  ];

  const displayReviews = isGlam ? glamReviews : reviews;

  return (
    <section className={`py-10 overflow-hidden ${isGlam ? 'bg-[#faf9f6]' : 'bg-white'}`}>
      <div className="relative flex overflow-x-hidden">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 20, repeat: Infinity }}
          className="flex whitespace-nowrap gap-6 py-4 px-4"
        >
          {displayReviews.map((review, idx) => (
            <div 
              key={idx} 
              className={`inline-block min-w-[300px] p-6 transition-all duration-300 transform hover:-translate-y-1 ${
                isGlam 
                  ? 'bg-[#faf9f6] border-2 border-gray-200 rounded-none' 
                  : 'bg-white shadow-[0_0_20px_rgba(255,154,168,0.25)] hover:shadow-[0_0_25px_rgba(255,154,168,0.4)] rounded-[24px]'
              }`}
            >
              <div className="flex text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" className={isGlam ? 'text-[#7a1b26]' : 'text-yellow-400'} />
                ))}
              </div>
              <p className={`text-lg font-bold mb-4 text-[#2a2a2a] whitespace-normal ${isGlam ? 'font-serif' : 'font-display'}`}>
                "{review.text}"
              </p>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-500">
                <span>— {review.author}</span>
                <span className={isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}>{review.product}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
