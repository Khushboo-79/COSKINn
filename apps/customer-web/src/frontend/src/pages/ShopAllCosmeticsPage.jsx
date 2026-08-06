import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, Search, ChevronDown, 
  Check, X, Filter 
} from 'lucide-react';
import Footer from '../components/common/Footer';
import { cosmeticsProducts } from '../constants/cosmeticsProducts';
import editorial1 from '../assets/images/cosmetics_editorial_lifestyle.webp';

const CATEGORY_TABS = ['All', 'Lips', 'Eyes', 'Face', 'Tools', 'Fragrance'];

const FILTER_CATEGORIES = [
  {
    title: 'Category',
    options: ['Lips', 'Eyes', 'Face', 'Tools', 'Fragrance']
  },
  {
    title: 'Product Type',
    options: ['Lipstick', 'Mascara', 'Eyeshadow', 'Blush', 'Brush', 'Holder', 'Perfume']
  },
  {
    title: 'Benefit & Effect',
    options: ['Velvet Matte', 'Waterproof', 'Long Lasting', 'Cruelty Free', 'Best Seller']
  }
];

const SORT_OPTIONS = [
  'Featured',
  'Price: Low to High',
  'Price: High to Low',
  'Best Selling',
  'Top Rated'
];

export default function ShopAllCosmeticsPage() {
  const data = {
    title: 'All Cosmetics',
    subtitle: 'The Complete Fairytale Collection',
    description: 'Explore our entire range of luxury cosmetics. Each piece is crafted to bring out your inner magic with intense pigments, weightless textures, and exquisite packaging.',
    heroImg: editorial1,
    products: cosmeticsProducts
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortBy, setSortBy] = useState('Featured');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const toggleFilter = (filter) => {
    const isCategoryOption = ['Lips', 'Eyes', 'Face', 'Tools', 'Fragrance'].includes(filter);
    if (isCategoryOption && activeCategory !== 'All') {
      setActiveCategory('All');
    }
    setActiveFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleCategoryTab = (cat) => {
    setActiveCategory(cat);
    setActiveFilters(prev => prev.filter(f => !['Lips', 'Eyes', 'Face', 'Tools', 'Fragrance'].includes(f)));
  };

  const clearAll = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setActiveFilters([]);
    setSortBy('Featured');
  };

  const filteredProducts = useMemo(() => {
    let result = [...data.products];

    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
        (p.longDescription && p.longDescription.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.shade && p.shade.toLowerCase().includes(q)) ||
        (p.badge && p.badge.toLowerCase().includes(q))
      );
    }

    if (activeFilters.length > 0) {
      result = result.filter(p => {
        const productText = JSON.stringify(p).toLowerCase();
        return activeFilters.some(filter => {
          const f = filter.toLowerCase();
          if (f === 'velvet matte') return productText.includes('velvet') || productText.includes('matte');
          if (f === 'waterproof') return productText.includes('waterproof') || productText.includes('water-resistant');
          if (f === 'long lasting') return productText.includes('long lasting') || productText.includes('wear') || productText.includes('hours');
          if (f === 'cruelty free') return p.crueltyFree === true || productText.includes('cruelty');
          if (f === 'best seller') return p.badge === 'BEST SELLER' || p.discountBadge === 'BEST SELLER';
          if (f === 'brush' || f === 'holder') return p.name.toLowerCase().includes(f);
          if (f === 'perfume') return p.category === 'Fragrance' || p.name.toLowerCase().includes('perfume');
          return productText.includes(f);
        });
      });
    }

    switch (sortBy) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Best Selling':
        result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      case 'Top Rated':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'Featured':
      default:
        result.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
        break;
    }

    return result;
  }, [data.products, activeCategory, searchQuery, activeFilters, sortBy]);

  return (
    <div className="bg-[#FFFDFD] min-h-screen font-sans">
      {/* HERO SECTION */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-[#FFF0F4]">
        <div className="absolute inset-0 z-0">
          <img src={data.heroImg} alt={data.title} className="w-full h-full object-cover object-center opacity-40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDFD] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Sparkles className="w-10 h-10 text-[#FF8FB1] mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-heading font-black text-[#75263F] uppercase tracking-widest mb-6">
              Shop <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">All</span>
            </h1>
            <h2 className="text-2xl font-serif italic text-[#75263F]/80 mb-6">{data.subtitle}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {data.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FILTER & SEARCH SYSTEM */}
      <section className="relative z-30 -mt-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="bg-white/95 backdrop-blur-md border border-[#FFE0E9] rounded-[32px] p-6 shadow-[0_20px_50px_rgba(255,143,177,0.15)]">
          {/* Row 1: Search + Filters + Sort */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full lg:w-1/3">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#FF8FB1]" size={18} />
              <input
                type="text"
                placeholder="Search fairytale cosmetics, shades, ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 bg-[#FFF0F4]/60 border border-[#FFE0E9] rounded-full text-sm font-medium text-[#75263F] placeholder:text-gray-400 focus:outline-none focus:border-[#FF0069] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FF0069] transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Dropdown Filter Groups */}
            <div className="hidden lg:flex flex-1 items-center justify-center gap-6">
              {FILTER_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="group relative">
                  <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#75263F] hover:text-[#FF0069] transition-colors py-2 px-3 rounded-full hover:bg-[#FFF0F4]">
                    <Filter size={14} className="text-[#FF8FB1]" />
                    {cat.title}
                    <ChevronDown size={14} />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white border border-[#FFE0E9] rounded-3xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-3">
                    <div className="max-h-[280px] overflow-y-auto px-2">
                      {cat.options.map(opt => {
                        const isActive = activeFilters.includes(opt);
                        return (
                          <button
                            key={opt}
                            onClick={() => toggleFilter(opt)}
                            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                              isActive
                                ? 'bg-[#FFF0F4] text-[#FF0069] font-bold'
                                : 'hover:bg-[#FFFDFD] text-gray-700'
                            }`}
                          >
                            <span>{opt}</span>
                            {isActive && <Check size={16} className="text-[#FF0069]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sort By Dropdown */}
            <div className="relative w-full lg:w-56">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="w-full flex items-center justify-between px-5 py-3.5 bg-white border border-[#FFE0E9] rounded-full text-sm font-bold text-[#75263F] hover:border-[#FF0069] transition-colors shadow-sm"
              >
                <span>Sort: {sortBy.split(':')[0]}</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-full bg-white border border-[#FFE0E9] rounded-2xl shadow-xl z-50 py-2 overflow-hidden"
                  >
                    {SORT_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSortBy(opt);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-5 py-2.5 text-sm font-medium transition-colors flex items-center justify-between ${
                          sortBy === opt ? 'bg-[#FFF0F4] text-[#FF0069] font-bold' : 'hover:bg-[#FFFDFD] text-gray-700'
                        }`}
                      >
                        <span>{opt}</span>
                        {sortBy === opt && <Check size={16} className="text-[#FF0069]" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Row 2: Category Tabs (Pills) */}
          <div className="mt-6 pt-6 border-t border-[#FFE0E9] flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2">
              {CATEGORY_TABS.map(tab => {
                const isActive = activeCategory === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => handleCategoryTab(tab)}
                    className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                      isActive
                        ? 'bg-gradient-to-r from-[#FF0069] to-[#FF8FB1] text-white shadow-[0_10px_20px_rgba(255,0,105,0.25)] scale-105'
                        : 'bg-white border border-[#FFE0E9] text-[#75263F] hover:bg-[#FFF0F4] hover:border-[#FF8FB1]'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Mobile Filter Options Chips */}
            <div className="lg:hidden flex items-center gap-2 overflow-x-auto no-scrollbar">
              {FILTER_CATEGORIES.flatMap(c => c.options).map(opt => {
                const isActive = activeFilters.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => toggleFilter(opt)}
                    className={`px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1 ${
                      isActive
                        ? 'border-[#FF0069] bg-[#FF0069] text-white'
                        : 'border-[#FFE0E9] bg-white text-gray-600 hover:border-[#FF0069]'
                    }`}
                  >
                    {opt}
                    {isActive && <X size={12} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 3: Active Filters & Clear All */}
          {(activeFilters.length > 0 || searchQuery || activeCategory !== 'All' || sortBy !== 'Featured') && (
            <div className="mt-4 pt-4 border-t border-[#FFE0E9]/60 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mr-1">Active:</span>
                {activeCategory !== 'All' && (
                  <span className="px-3 py-1.5 rounded-full bg-[#FFF0F4] text-[#FF0069] border border-[#FF0069]/20 text-xs font-bold flex items-center gap-1.5">
                    Category: {activeCategory}
                    <button onClick={() => setActiveCategory('All')}><X size={12} /></button>
                  </span>
                )}
                {searchQuery && (
                  <span className="px-3 py-1.5 rounded-full bg-[#FFF0F4] text-[#FF0069] border border-[#FF0069]/20 text-xs font-bold flex items-center gap-1.5">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')}><X size={12} /></button>
                  </span>
                )}
                {activeFilters.map(filter => (
                  <span
                    key={filter}
                    className="px-3 py-1.5 rounded-full bg-[#FFF0F4] text-[#FF0069] border border-[#FF0069]/20 text-xs font-bold flex items-center gap-1.5"
                  >
                    {filter}
                    <button onClick={() => toggleFilter(filter)}><X size={12} /></button>
                  </span>
                ))}
              </div>

              <button
                onClick={clearAll}
                className="text-xs font-black uppercase tracking-widest text-[#FF0069] hover:underline"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="py-24 bg-[#FFFDFD] relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          <div className="flex items-center justify-between mb-16">
            <div>
              <h3 className="text-3xl font-heading font-black text-[#75263F] uppercase tracking-widest">The Collection</h3>
              <p className="text-sm font-medium text-gray-500 mt-1">
                Showing <span className="font-bold text-[#FF0069]">{filteredProducts.length}</span> fairytale creations
              </p>
            </div>
            <div className="h-[1px] bg-[#FFE0E9] flex-1 ml-10 hidden md:block" />
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product, idx) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
                >
                  <Link to={`/product/${product.slug}`} className="group flex flex-col bg-white rounded-[40px] p-8 border border-[#FFE0E9] hover:border-[#FF8FB1] transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(255,143,177,0.15)] h-full">
                    <div className="aspect-square bg-gradient-to-tr from-[#FFFDFD] to-[#FFF0F4] rounded-3xl mb-8 p-6 overflow-hidden relative">
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-xl" />
                      {product.badge && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#FFE0E9] text-[10px] font-black tracking-widest uppercase text-[#FF0069]">
                          {product.badge}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#FF8FB1] mb-2 block">{product.category}</span>
                      <h4 className="font-heading font-black text-xl uppercase text-[#75263F] line-clamp-2 mb-4 group-hover:text-[#FF0069] transition-colors">{product.name}</h4>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-1 font-medium">{product.shortDescription}</p>
                      
                      <div className="flex items-end justify-between mt-auto">
                        <div className="flex flex-col">
                          <span className="font-black text-2xl text-[#FF0069]">₹{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm font-bold text-gray-400 line-through">₹{product.originalPrice}</span>
                          )}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#FFF0F4] text-[#FF0069] flex items-center justify-center group-hover:bg-[#FF0069] group-hover:text-white transition-colors">
                          <ArrowRight size={18} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24 bg-white rounded-[40px] border border-[#FFE0E9] shadow-sm max-w-2xl mx-auto px-6"
            >
              <div className="w-20 h-20 bg-[#FFF0F4] rounded-full flex items-center justify-center mx-auto mb-6 text-[#FF0069] border border-[#FFE0E9]">
                <Search size={32} />
              </div>
              <h4 className="text-2xl font-heading font-black text-[#75263F] uppercase mb-4">No Fairytale Products Found</h4>
              <p className="text-gray-500 font-medium mb-8 max-w-md mx-auto leading-relaxed">
                We couldn't find any creations matching your search or filter criteria. Try adjusting your search query or clearing active filters.
              </p>
              <button
                onClick={clearAll}
                className="px-8 py-4 bg-gradient-to-r from-[#FF0069] to-[#FF8FB1] text-white rounded-full font-black uppercase tracking-widest text-xs hover:shadow-[0_15px_30px_rgba(255,0,105,0.3)] hover:-translate-y-1 transition-all duration-300"
              >
                Clear All Filters & Search
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
