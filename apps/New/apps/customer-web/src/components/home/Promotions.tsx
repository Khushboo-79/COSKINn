import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Promotions: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  const promotions = [
    {
      title: "Free 3-piece juicy set",
      sub: "On orders over $60",
      cta: "Shop the treat",
      bg: isGlam ? '#2a2a2a' : '#ffe4e1',
      text: isGlam ? '#faf9f6' : '#2a2a2a',
      muted: isGlam ? '#a0a0a0' : '#6b7280'
    },
    {
      title: "Loyalty × 2 points",
      sub: "This weekend only",
      cta: "Join the Glow Club",
      bg: isGlam ? '#7a1b26' : '#e0f5ea',
      text: isGlam ? '#faf9f6' : '#2a2a2a',
      muted: isGlam ? '#e5b376' : '#6b7280'
    },
    {
      title: "Free 2-day shipping",
      sub: "Over $40 · everywhere",
      cta: "Learn more",
      bg: isGlam ? '#e5b376' : '#fff3b8',
      text: '#2a2a2a',
      muted: '#6b7280'
    }
  ];

  return (
    <section className={`py-10 ${isGlam ? 'bg-[#faf9f6]' : 'bg-white'}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-3 gap-4">
          {promotions.map((promo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 flex items-center justify-between gap-4 rounded-[24px]"
              style={{ backgroundColor: promo.bg, color: promo.text }}
            >
              <div>
                <h4 className={`font-bold text-base mb-1 ${isGlam ? 'font-serif' : 'font-display'}`}>
                  {promo.title}
                </h4>
                <p className="text-xs" style={{ color: promo.muted }}>
                  {promo.sub}
                </p>
              </div>
              <Link 
                to="/collections"
                className="text-xs font-bold underline whitespace-nowrap hover:opacity-70 transition-opacity"
                style={{ color: promo.text }}
              >
                {promo.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;
