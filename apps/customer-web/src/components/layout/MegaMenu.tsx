import React from 'react';
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

  const skinCategories = [
    {
      title: 'Shop by Fruit',
      links: [
        { name: 'Watermelon Glow', path: '/collections/watermelon' },
        { name: 'Peach Plump', path: '/collections/peach' },
        { name: 'Avocado Calm', path: '/collections/avocado' },
        { name: 'Berry Bounce', path: '/collections/berry' },
      ],
    },
    {
      title: 'Shop by Concern',
      links: [
        { name: 'Dewy & Glowing', path: '/collections/glow' },
        { name: 'Blemish-Free', path: '/collections/blemish' },
        { name: 'Hydration Station', path: '/collections/hydration' },
        { name: 'Pore Minimizing', path: '/collections/pores' },
      ],
    },
  ];

  const glamCategories = [
    {
      title: 'Shop by Collection',
      links: [
        { name: 'The Midnight Gala', path: '/collections/midnight' },
        { name: 'Royal Court', path: '/collections/royal' },
        { name: 'Gilded Age', path: '/collections/gilded' },
        { name: 'Velvet Noir', path: '/collections/velvet' },
      ],
    },
    {
      title: 'Shop by Look',
      links: [
        { name: 'Fairytale Bride', path: '/collections/bridal' },
        { name: 'Dramatic Evening', path: '/collections/evening' },
        { name: 'Candlelit Romance', path: '/collections/romance' },
        { name: 'Everyday Royalty', path: '/collections/royalty' },
      ],
    },
  ];

  const categories = isGlam ? glamCategories : skinCategories;

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
                        {category.links.map((link, linkIdx) => (
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
                      <Link 
                        to="/collections" 
                        onClick={onClose}
                        className={`mt-6 inline-flex items-center text-sm font-bold group ${
                          isGlam ? 'text-[#2a2a2a] hover:text-[#7a1b26]' : 'text-gray-900 hover:text-[#ff9aa8]'
                        }`}
                      >
                        View all products 
                        <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Featured Image Section */}
                <div className="col-span-12 lg:col-span-5 h-[300px] relative rounded-2xl overflow-hidden group cursor-pointer">
                  {isGlam ? (
                    <div className="w-full h-full relative">
                      <img 
                        src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80" 
                        alt="Midnight Gala Collection" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                        <span className="text-[#e5b376] text-xs font-bold uppercase tracking-widest mb-2 font-serif">New Arrival</span>
                        <h4 className="text-white text-2xl font-serif italic mb-2">The Midnight Gala</h4>
                        <p className="text-gray-200 text-sm font-serif">Deep reds and shimmering golds for an unforgettable night.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full relative">
                      <img 
                        src="https://images.pexels.com/photos/8101534/pexels-photo-8101534.jpeg?auto=compress&cs=tinysrgb&w=800" 
                        alt="Juicy Glow Collection" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#ff9aa8]/90 via-[#ff9aa8]/20 to-transparent flex flex-col justify-end p-8">
                        <span className="text-white bg-[#ff9aa8] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit mb-3 shadow-md">Fresh Drop 🍑</span>
                        <h4 className="text-white text-3xl font-display font-bold mb-2">Peachy Plump</h4>
                        <p className="text-white/90 text-sm font-medium">Get that bouncy, juicy glow with our new Vitamin C range.</p>
                      </div>
                    </div>
                  )}
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
