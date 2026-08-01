import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
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

const ShopByCategory: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  return (
    <section id="shop-by-category" className={`py-20 ${isGlam ? 'bg-[#faf9f6]' : 'bg-[#fcfaf9]'}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.25em] text-[#a1999b] uppercase mb-4 block">
              {isGlam ? 'EXPLORE BY TYPE' : 'SHOP BY CATEGORY'}
            </span>
            <h2 
              className={`text-4xl md:text-[3.5rem] leading-none ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display font-black tracking-tight text-[#2a2022]'}`}
              style={!isGlam ? { WebkitTextStroke: '1.5px #2a2022' } : {}}
            >
              {isGlam ? 'Select your finery' : 'Pick your flavour'}
            </h2>
          </div>
          <Link to="/collections" state={{ from: 'shop-by-category' }} className="group flex items-center text-[13px] font-bold text-[#6b6b6b] hover:text-[#2a2022] transition-colors mt-6 md:mt-0 self-start md:self-auto">
            View all 
            <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-10 pb-8 md:pb-0">
          {categories.map((category, idx) => (
            <Link to={`/collections/${category.name.toLowerCase()}`} state={{ from: 'shop-by-category' }} key={idx} className="w-[45%] sm:w-[30%] md:w-[22%] lg:w-[16%] flex flex-col items-center group cursor-pointer max-w-[200px]">
              <div className="w-full aspect-square rounded-full overflow-hidden mb-6 shadow-sm group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 transform-gpu" 
                />
              </div>
              <h3 className={`text-[15px] md:text-[17px] font-bold ${isGlam ? 'font-serif' : 'font-sans text-[#2a2022]'}`}>
                {category.name}
              </h3>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ShopByCategory;
