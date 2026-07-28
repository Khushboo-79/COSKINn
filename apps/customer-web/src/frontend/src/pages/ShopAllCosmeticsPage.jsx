import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Search, ChevronDown, Check, X, Filter } from 'lucide-react';
import Footer from '../components/common/Footer';
import ProductCard from '../components/common/ProductCard';
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
    subtitle: 'The Complete Glam Collection',
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
    <div className="bg-background min-h-screen font-sans text-text transition-colors duration-500">
      {/* HERO SECTION */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-primary/10">
        <div className="absolute inset-0 z-0">
          <img src={data.heroImg} alt={data.title} className="w-full h-full object-cover object-center opacity-30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-widest mb-4">
              Shop <span className="text-primary">All</span>
            </h1>
            <h2 className="text-xl font-serif italic text-text-muted mb-4">{data.subtitle}</h2>
            <p className="text-base text-text-muted max-w-2xl mx-auto leading-relaxed">
              {data.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FILTER & SEARCH SYSTEM */}
      <section className="relative z-30 -mt-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="bg-surface backdrop-blur-md border border-text/5 rounded-[32px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
          {/* Row 1: Search + Filters + Sort */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full lg:w-1/3">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" size={18} />
              <input
                type="text"
                placeholder="Search products, shades, ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 bg-background/50 border border-text/10 rounded-full text-sm font-medium text-text placeholder:text-text-muted focus:outline-none focus:border-primary focus:bg-background transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Dropdown Filter Groups */}
            <div className="hidden lg:flex flex-1 items-center justify-center gap-6">
              {FILTER_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="group relative">
                  <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text hover:text-primary transition-colors py-2 px-3 rounded-full hover:bg-background">
                    <Filter size={14} className="text-primary" />
                    {cat.title}
                    <ChevronDown size={14} />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-surface border border-text/10 rounded-3xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-3">
                    <div className="max-h-[280px] overflow-y-auto px-2">
                      {cat.options.map(opt => {
                        const isActive = activeFilters.includes(opt);
                        return (
                          <button
                            key={opt}
                            onClick={() => toggleFilter(opt)}
                            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                              isActive
                                ? 'bg-primary/10 text-primary font-bold'
                                : 'hover:bg-background text-text'
                            }`}
                          >
                            <span>{opt}</span>
                            {isActive && <Check size={16} className="text-primary" />}
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
                className="w-full flex items-center justify-between px-5 py-3.5 bg-surface border border-text/10 rounded-full text-sm font-bold text-text hover:border-primary transition-colors shadow-sm"
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
                    className="absolute right-0 top-full mt-2 w-full bg-surface border border-text/10 rounded-2xl shadow-xl z-50 py-2 overflow-hidden"
                  >
                    {SORT_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSortBy(opt);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-5 py-2.5 text-sm font-medium transition-colors flex items-center justify-between ${
                          sortBy === opt ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-background text-text'
                        }`}
                      >
                        <span>{opt}</span>
                        {sortBy === opt && <Check size={16} className="text-primary" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Row 2: Category Tabs (Pills) */}
          <div className="mt-6 pt-6 border-t border-text/5 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2">
              {CATEGORY_TABS.map(tab => {
                const isActive = activeCategory === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => handleCategoryTab(tab)}
                    className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                      isActive
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-surface border border-text/10 text-text hover:bg-background hover:border-primary/50'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 3: Active Filters & Clear All */}
          {(activeFilters.length > 0 || searchQuery || activeCategory !== 'All' || sortBy !== 'Featured') && (
            <div className="mt-4 pt-4 border-t border-text/5 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-widest text-text-muted mr-1">Active:</span>
                {activeCategory !== 'All' && (
                  <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold flex items-center gap-1.5">
                    Category: {activeCategory}
                    <button onClick={() => setActiveCategory('All')}><X size={12} /></button>
                  </span>
                )}
                {searchQuery && (
                  <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold flex items-center gap-1.5">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')}><X size={12} /></button>
                  </span>
                )}
                {activeFilters.map(filter => (
                  <span
                    key={filter}
                    className="px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold flex items-center gap-1.5"
                  >
                    {filter}
                    <button onClick={() => toggleFilter(filter)}><X size={12} /></button>
                  </span>
                ))}
              </div>

              <button
                onClick={clearAll}
                className="text-xs font-bold uppercase tracking-widest text-primary hover:underline"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="py-24 bg-background relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-3xl font-display font-bold uppercase tracking-widest">The Collection</h3>
              <p className="text-sm font-medium text-text-muted mt-1">
                Showing <span className="font-bold text-primary">{filteredProducts.length}</span> products
              </p>
            </div>
            <div className="h-[1px] bg-text/5 flex-1 ml-10 hidden md:block" />
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
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24 bg-surface rounded-[40px] border border-text/10 shadow-sm max-w-2xl mx-auto px-6"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary border border-text/5">
                <Search size={32} />
              </div>
              <h4 className="text-2xl font-display font-bold mb-4">No Magic Found</h4>
              <p className="text-text-muted mb-8 max-w-md mx-auto">
                We couldn't find any products matching your current filters and search query.
              </p>
              <button
                onClick={clearAll}
                className="bg-primary text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-md"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
