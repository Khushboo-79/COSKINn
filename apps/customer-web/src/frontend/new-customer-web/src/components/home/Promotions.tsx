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
    <section className={`relative overflow-hidden ${isGlam ? 'py-8 bg-[#f4ebe1]' : 'py-16 bg-transparent'}`}>
      <div className={`relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 ${isGlam ? 'mt-4 md:mt-8' : 'mt-4 md:mt-8 lg:mt-[-20px] pt-8'}`}>
        <div className="grid md:grid-cols-3 gap-6">
          {isGlam ? (
            glamPromotions.map((promo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative py-6 px-6 border border-[#c9af7a] flex flex-col items-center justify-center text-center bg-[#fdfbf7]"
              >
                {/* Top-Left Corner Bracket (Inset) */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#c9af7a]" />
                {/* Bottom-Right Corner Bracket (Inset) */}
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#c9af7a]" />
                
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#c9af7a] mb-2 uppercase mt-1">
                  {promo.offer}
                </span>
                <h4 className="font-serif text-[20px] xl:text-[22px] text-[#2c3338] mb-1 whitespace-nowrap">
                  {promo.title}
                </h4>
                <p className="text-[12px] text-[#6b7280] mb-4 font-medium">
                  {promo.sub}
                </p>
                <div className="mt-auto mb-1">
                  <Link 
                    to="/collections"
                    className="text-[11px] font-bold tracking-[0.15em] text-[#831826] uppercase border-b-[1.5px] border-[#831826] pb-[2px] hover:opacity-70 transition-opacity"
                  >
                    {promo.cta}
                  </Link>
                </div>
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
