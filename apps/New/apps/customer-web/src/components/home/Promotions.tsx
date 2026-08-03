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
      {!isGlam && (
        <div className="absolute top-0 left-0 w-full z-0 pointer-events-none drop-shadow-sm">
          <svg className="relative block w-full h-[180px] md:h-[280px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250" preserveAspectRatio="none">
            {/* Pale yellow longest drip */}
            <path d="M0,0 L0,50 C 45,50 45,180 90,180 C 135,180 135,50 180,50 C 215,50 215,220 250,220 C 285,220 285,50 320,50 C 360,50 360,130 400,130 C 440,130 440,50 480,50 C 510,50 510,240 540,240 C 570,240 570,50 600,50 C 645,50 645,160 690,160 C 735,160 735,50 780,50 C 815,50 815,200 850,200 C 885,200 885,50 920,50 C 960,50 960,150 1000,150 C 1040,150 1040,50 1080,50 C 1125,50 1125,210 1170,210 C 1215,210 1215,50 1260,50 C 1305,50 1305,170 1350,170 C 1395,170 1395,50 1440,50 L1440,0 Z" fill="#ffefb3" opacity="0.6" />
            
            {/* Mint medium drip */}
            <path d="M0,0 L0,70 C 45,70 45,168 90,168 C 135,168 135,70 180,70 C 215,70 215,208 250,208 C 285,208 285,70 320,70 C 360,70 360,118 400,118 C 440,118 440,70 480,70 C 510,70 510,228 540,228 C 570,228 570,70 600,70 C 645,70 645,148 690,148 C 735,148 735,70 780,70 C 815,70 815,188 850,188 C 885,188 885,70 920,70 C 960,70 960,138 1000,138 C 1040,138 1040,70 1080,70 C 1125,70 1125,198 1170,198 C 1215,198 1215,70 1260,70 C 1305,70 1305,158 1350,158 C 1395,158 1395,70 1440,70 L1440,0 Z" fill="#a3e6d8" opacity="0.4" />
            
            {/* Hero Base Color shortest drip */}
            <path d="M0,0 L0,90 C 45,90 45,156 90,156 C 135,156 135,90 180,90 C 215,90 215,196 250,196 C 285,196 285,90 320,90 C 360,90 360,106 400,106 C 440,106 440,90 480,90 C 510,90 510,216 540,216 C 570,216 570,90 600,90 C 645,90 645,136 690,136 C 735,136 735,90 780,90 C 815,90 815,176 850,176 C 885,176 885,90 920,90 C 960,90 960,126 1000,126 C 1040,126 1040,90 1080,90 C 1125,90 1125,186 1170,186 C 1215,186 1215,90 1260,90 C 1305,90 1305,146 1350,146 C 1395,146 1395,90 1440,90 L1440,0 Z" fill="#fcfaf9" />
          </svg>
        </div>
      )}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 mt-4 md:mt-8">
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
