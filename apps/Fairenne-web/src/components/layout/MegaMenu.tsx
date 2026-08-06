import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, onMouseEnter, onMouseLeave }) => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const platform = isGlam ? 'COSMETICS' : 'SKINCARE';
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/categories?platform=${platform}`);
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        
        // Transform the backend categories into the MegaMenu layout format
        const formatted = data.map((cat: any) => ({
          title: cat.name,
          links: cat.subcategories.map((sub: any) => ({
            name: sub.name,
            path: `/collections/${sub.slug}`
          }))
        }));
        
        setCategories(formatted);
      } catch (err) {
        console.error('Failed to fetch categories for MegaMenu', err);
      }
    };
    
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen, isGlam]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute left-0 right-0 top-full w-full z-40"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className={`w-full shadow-2xl border-t ${isGlam ? 'bg-[#faf9f6] border-[#e5b376]/20' : 'bg-white border-gray-100'}`}>
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-10">
              <div className="grid grid-cols-12 gap-8">
                
                {/* Links Section */}
                <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-8">
                  {categories.map((category, idx) => (
                    <div key={idx} className="flex flex-col">
                      <h3 className={`text-sm font-bold uppercase tracking-widest mb-6 ${isGlam ? 'text-[#cfa473] font-serif' : 'text-[#ff9aa8]'}`}>
                        {category.title}
                      </h3>
                      <ul className="space-y-4">
                        {category.links.map((link: any, linkIdx: number) => (
                          <li key={linkIdx}>
                            <Link 
                              to={link.path}
                              onClick={onClose}
                              className={`text-[15px] transition-colors ${
                                isGlam 
                                  ? 'text-gray-600 hover:text-[#7a1b26] font-serif italic' 
                                  : 'text-gray-700 hover:text-[#ff9aa8] font-medium'
                              }`}
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Featured Promo Section */}
                <div className="col-span-12 lg:col-span-5 h-full">
                  <div className={`relative h-full min-h-[300px] rounded-2xl overflow-hidden group ${isGlam ? 'border border-[#e5b376]/20' : ''}`}>
                    <img 
                      src={isGlam 
                        ? "https://cdn.shopify.com/s/files/1/0593/5418/5889/files/20260722-162356.jpg?v=1784708678" 
                        : "https://www.dotandkey.com/cdn/shop/files/1a_3ef32ac6-5192-495c-b4bb-dafb0e806260.jpg"} 
                      alt="Featured Collection" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <span className={`text-xs font-bold tracking-[0.2em] uppercase mb-2 ${isGlam ? 'text-[#e5b376]' : 'text-white'}`}>
                        Just Arrived
                      </span>
                      <h4 className={`text-2xl font-bold text-white mb-4 ${isGlam ? 'font-serif' : 'font-display'}`}>
                        {isGlam ? 'The Velvet Noir Collection' : 'Watermelon Glow Drops'}
                      </h4>
                      <Link 
                        to="/collections/new" 
                        onClick={onClose}
                        className={`inline-flex items-center text-sm font-bold w-fit ${
                          isGlam 
                            ? 'text-white hover:text-[#e5b376] uppercase tracking-widest' 
                            : 'text-white hover:text-[#ff9aa8]'
                        }`}
                      >
                        Shop Now <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;
