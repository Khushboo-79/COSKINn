import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const skinCategories = [
  {
    name: "Cleansers",
    image: "https://images.pexels.com/photos/9306017/pexels-photo-9306017.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Serums",
    image: "https://images.unsplash.com/photo-1550828520-4cb496926fc9?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Moisturisers",
    image: "https://images.pexels.com/photos/8101534/pexels-photo-8101534.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Masks",
    image: "https://images.pexels.com/photos/9306017/pexels-photo-9306017.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Sun Care",
    image: "https://images.unsplash.com/photo-1550828520-4cb496926fc9?auto=format&fit=crop&w=800&q=80"
  }
];

const glamCategories = [
  {
    name: "Lips",
    image: "https://cdn.shopify.com/s/files/1/0593/5418/5889/files/01_2db59608-095a-442a-afec-9c7aafeb7fab.jpg?v=1758249299"
  },
  {
    name: "Eyes",
    image: "https://cdn.shopify.com/s/files/1/0593/5418/5889/files/ec25942077e080c392d7cb4696caea57.jpg?v=1761982588"
  },
  {
    name: "Face",
    image: "https://cdn.shopify.com/s/files/1/0593/5418/5889/files/24c4ac61030646c83895aa1d3448017a_256e2b1a-3119-4a30-af27-4926c38103a2.jpg?v=1756201951"
  },
  {
    name: "Sets",
    image: "https://cdn.shopify.com/s/files/1/0593/5418/5889/files/20260722-162356.jpg?v=1784708678"
  },
  {
    name: "Brushes",
    image: "https://cdn.shopify.com/s/files/1/0593/5418/5889/files/01_-13588.jpg?v=1772596546"
  }
];

const ShopByCategory: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  const categories = isGlam ? glamCategories : skinCategories;

  return (
    <section id="shop-by-category" className={`pt-12 pb-16 relative overflow-hidden ${isGlam ? 'bg-[#faf9f6]' : 'bg-[#fcfaf9]'}`}>
      {!isGlam && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div 
            className="absolute top-[10%] left-[-5%] w-[40%] h-[400px] bg-[#ffb3c6] blur-[80px] rounded-full transform-gpu" 
            style={{ animation: 'float 15s ease-in-out infinite' }}
          ></div>
          <div 
            className="absolute top-[30%] left-[30%] w-[50%] h-[300px] bg-[#a3e6d8] blur-[80px] rounded-full transform-gpu" 
            style={{ animation: 'float 18s ease-in-out infinite reverse' }}
          ></div>
          <div 
            className="absolute top-[20%] right-[-5%] w-[40%] h-[400px] bg-[#ffefb3] blur-[80px] rounded-full transform-gpu" 
            style={{ animation: 'float 12s ease-in-out infinite' }}
          ></div>
          
          {/* Soft Wavy Top Divider */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none rotate-180">
            <svg className="relative block w-full h-[40px] md:h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
              <path d="M0,100 L0,50 C 120,80 240,80 360,50 C 480,20 600,20 720,50 C 840,80 960,80 1080,50 C 1200,20 1320,20 1440,50 L1440,100 Z" fill="#fcfaf9" />
            </svg>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        {isGlam ? (
          <div className="flex flex-col items-center justify-center text-center mb-10">
            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.3em] text-[#a1999b] uppercase mb-3 block">
              THE CABINET
            </span>
            <h2 className="text-5xl md:text-[4rem] lg:text-[4.5rem] leading-[1.1] font-serif font-medium text-[#2c3338] italic">
              Shop the Collection
            </h2>
            <Link to="/collections" state={{ from: 'shop-by-category' }} className="mt-6 group flex items-center text-[11px] font-bold tracking-[0.15em] text-[#831826] uppercase border-b-[1.5px] border-[#831826] pb-[2px] hover:opacity-70 transition-opacity">
              VIEW ALL
              <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 px-2">
            <div>
              <span className="text-[10px] md:text-[11px] font-bold tracking-[0.25em] text-[#a1999b] uppercase mb-4 block">
                SHOP BY CATEGORY
              </span>
              <h2 
                className="text-4xl md:text-[3.5rem] leading-none font-display font-black tracking-tight text-[#2a2022]"
                style={{ WebkitTextStroke: '1.5px #2a2022' }}
              >
                Pick your flavour
              </h2>
            </div>
            <Link to="/collections" state={{ from: 'shop-by-category' }} className="group flex items-center text-[13px] font-bold text-[#6b6b6b] hover:text-[#2a2022] transition-colors mt-6 md:mt-0 self-start md:self-auto">
              View all 
              <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}

        {/* Categories Grid */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 pb-8 md:pb-0">
          {categories.map((category, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, type: 'spring', stiffness: 100, damping: 15 }}
              key={idx} 
              className="w-[45%] sm:w-[30%] md:w-[22%] lg:w-[17%] flex flex-col items-center group cursor-pointer max-w-[210px]"
            >
              <Link to={`/collections/${category.name.toLowerCase()}`} state={{ from: 'shop-by-category' }} className="w-full flex flex-col items-center">
                {isGlam ? (
                  <motion.div 
                    whileHover={{ y: -6 }}
                    className="w-full aspect-[2/3] rounded-t-full rounded-b-none overflow-hidden mb-3 border border-[#c9af7a] transition-all duration-300 relative bg-white"
                  >
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </motion.div>
                ) : (
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="w-full aspect-[4/5] rounded-[20px] sm:rounded-[28px] overflow-hidden mb-4 sm:mb-6 shadow-[0_8px_0px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_0px_rgba(0,0,0,0.15)] transition-all duration-300 bg-white"
                  >
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </motion.div>
                )}
                
                <h3 className={`text-[16px] md:text-[18px] ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-sans text-[#2a2022] font-bold'}`}>
                  {category.name}
                </h3>
                
                {isGlam && (
                  <span className="text-[9px] md:text-[10px] tracking-[0.2em] text-[#a1999b] uppercase mt-1.5 transition-colors group-hover:text-[#c9af7a]">
                    DISCOVER
                  </span>
                )}
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ShopByCategory;
