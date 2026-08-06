import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Search, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/collections?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const popularSearches = isGlam 
    ? ['Red Lipstick', 'Matte Foundation', 'Liquid Eyeliner', 'Bridal Kit']
    : ['Vitamin C Serum', 'SPF 50', 'Gel Cleanser', 'Hydrating Mask'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Modal Overlay */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-0 left-0 right-0 z-[101] w-full max-w-4xl mx-auto mt-4 sm:mt-24 rounded-b-3xl sm:rounded-3xl shadow-2xl overflow-hidden ${
              isGlam ? 'bg-[#faf9f6]' : 'bg-white'
            }`}
          >
            <div className="p-6 sm:p-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className={`text-2xl font-bold ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-gray-900'}`}>
                  Search
                </h2>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={24} className="text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSearch} className="relative mb-10">
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 ${isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}`} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  className={`w-full py-5 pl-14 pr-4 text-xl sm:text-2xl font-bold bg-gray-50 border-none rounded-2xl outline-none transition-all ${
                    isGlam ? 'focus:ring-2 focus:ring-[#7a1b26]/20' : 'focus:ring-2 focus:ring-[#ff9aa8]/20'
                  }`}
                  autoFocus
                />
                <button 
                  type="submit"
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-xl transition-colors ${
                    isGlam 
                      ? 'bg-[#2a2a2a] text-[#e5b376] hover:bg-black' 
                      : 'bg-[#ff9aa8] text-white hover:bg-[#ff8091]'
                  }`}
                >
                  <ArrowRight size={20} />
                </button>
              </form>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 font-display">
                  Popular Searches
                </h3>
                <div className="flex flex-wrap gap-3">
                  {popularSearches.map((term, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setQuery(term);
                        navigate(`/collections?search=${encodeURIComponent(term)}`);
                        onClose();
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                        isGlam 
                          ? 'border-gray-200 text-gray-600 hover:border-[#7a1b26] hover:text-[#7a1b26]' 
                          : 'border-gray-100 text-gray-600 hover:border-[#ff9aa8] hover:text-[#ff9aa8] bg-gray-50 hover:bg-white'
                      }`}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
