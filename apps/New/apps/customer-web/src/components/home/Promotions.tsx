import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Promotions: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  const skinPromotions = [
    {
      title: "Free 3-piece juicy set",
      sub: "On orders over $60",
      cta: "Shop the treat",
      bg: '#ffe4e1',
      text: '#2a2a2a',
      muted: '#6b7280'
    },
    {
      title: "Loyalty × 2 points",
      sub: "This weekend only",
      cta: "Join the Glow Club",
      bg: '#e0f5ea',
      text: '#2a2a2a',
      muted: '#6b7280'
    },
    {
      title: "Free 2-day shipping",
      sub: "Over $40 · everywhere",
      cta: "Learn more",
      bg: '#fff3b8',
      text: '#2a2a2a',
      muted: '#6b7280'
    }
  ];

  const glamPromotions = [
    {
      offer: "OFFER 1",
      title: "Complimentary engraving",
      sub: "On lipsticks & compacts",
      cta: "PERSONALISE YOURS",
    },
    {
      offer: "OFFER 2",
      title: "Velvet Atelier rewards",
      sub: "Earn double this fortnight",
      cta: "ENTER THE COURT",
    },
    {
      offer: "OFFER 3",
      title: "Signature gift wrap",
      sub: "On every order over $80",
      cta: "WRAP IT IN RIBBON",
    }
  ];

  return (
    <section className={`py-10 ${isGlam ? 'bg-[#faf9f6]' : 'bg-white'}`}>
      <div className={`${isGlam ? 'max-w-[1150px]' : 'max-w-[1400px]'} mx-auto px-6 lg:px-10`}>
        <div className="grid md:grid-cols-3 gap-4">
          {isGlam ? (
            glamPromotions.map((promo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative p-8 border border-[#d3be93] flex flex-col items-center justify-center text-center bg-[#faf9f6]"
              >
                {/* Top-Left Corner Bracket */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#d3be93]" />
                {/* Bottom-Right Corner Bracket */}
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#d3be93]" />
                
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#cdae77] mb-3 uppercase">
                  {promo.offer}
                </span>
                <h4 className="font-serif text-[22px] md:text-2xl text-[#2a2a2a] mb-1">
                  {promo.title}
                </h4>
                <p className="text-[12px] text-gray-500 mb-6 font-medium">
                  {promo.sub}
                </p>
                <Link 
                  to="/collections"
                  className="text-[11px] font-bold tracking-widest text-[#7a1b26] uppercase border-b border-[#7a1b26] pb-[2px] hover:opacity-70 transition-opacity"
                >
                  {promo.cta}
                </Link>
              </motion.div>
            ))
          ) : (
            skinPromotions.map((promo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-[24px]"
                style={{ backgroundColor: promo.bg, color: promo.text }}
              >
                <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3 relative z-10">
                  <div className="flex-1 min-w-[140px]">
                    <h4 className="font-bold text-lg mb-1 leading-tight font-display">
                      {promo.title}
                    </h4>
                    <p className="text-sm" style={{ color: promo.muted }}>
                      {promo.sub}
                    </p>
                  </div>
                  <Link 
                    to="/collections"
                    className="text-sm font-bold underline whitespace-nowrap hover:opacity-70 transition-opacity shrink-0"
                    style={{ color: promo.text }}
                  >
                    {promo.cta}
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Promotions;
