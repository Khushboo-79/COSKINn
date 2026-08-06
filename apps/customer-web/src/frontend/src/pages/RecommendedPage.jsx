import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronDown, X, Star, Check } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

import { skincareProducts } from '../constants/skincareProducts';
import { cosmeticsProducts } from '../constants/cosmeticsProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useOrders } from '../context/OrderContext';
import ProductCard from '../components/common/ProductCard';

const SORT_OPTIONS = [
  'Recommended', 'Newest', 'Best Selling', 'Price Low to High', 'Price High to Low'
];

const FILTER_CATEGORIES = [
  {
    title: 'Category',
    options: ['Skincare', 'Cosmetics']
  },
  {
    title: 'Skin Type',
    options: ['All Skin Types', 'Dry Skin', 'Oily Skin', 'Sensitive Skin', 'Combination Skin']
  }
];

export default function RecommendedPage() {
  const navigate = useNavigate();
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const { orders } = useOrders();
  const { addToCart } = useCart();

  const [activeFilters, setActiveFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Recommended');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [quickViewItem, setQuickViewItem] = useState(null);

  const toggleFilter = (filter) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
    setVisibleCount(12);
  };

  // 1. Generate Personalized Recommendations Algorithm
  const allProducts = useMemo(() => [...skincareProducts, ...cosmeticsProducts], []);

  const recommendedProducts = useMemo(() => {
    let result = [...allProducts];

    // Priority 1: Match wishlist categories
    const wishlistCategories = [...new Set(wishlist.map(i => i.category || i.type))].filter(Boolean);
    // Priority 2: Match cart categories
    const cartCategories = [...new Set(cart.map(i => i.category || i.type))].filter(Boolean);
    // Priority 3: Match order categories
    const orderItems = orders.flatMap(o => o.items);
    const orderCategories = [...new Set(orderItems.map(i => i.category || i.type))].filter(Boolean);

    const userCategories = [...new Set([...wishlistCategories, ...cartCategories, ...orderCategories])];

    // If user has history, boost items matching their historical categories
    if (userCategories.length > 0) {
      result.sort((a, b) => {
        const aMatch = userCategories.includes(a.category || a.type) ? 1 : 0;
        const bMatch = userCategories.includes(b.category || b.type) ? 1 : 0;
        return bMatch - aMatch;
      });
    } else {
      // Fallback for new users: Trending/Best Sellers first
      result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }

    return result;
  }, [allProducts, wishlist, cart, orders]);

  // 2. Apply Filters & Search
  const filteredProducts = useMemo(() => {
    let result = [...recommendedProducts];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.shortDescription && p.shortDescription.toLowerCase().includes(q))
      );
    }

    if (activeFilters.length > 0) {
      result = result.filter(p => {
        const productData = JSON.stringify(p).toLowerCase();
        return activeFilters.some(filter => {
          const f = filter.toLowerCase();
          if (f === 'skincare') return skincareProducts.some(sp => sp.id === p.id);
          if (f === 'cosmetics') return cosmeticsProducts.some(cp => cp.id === p.id);
          return productData.includes(f);
        });
      });
    }

    // 3. Apply Sorting
    switch (sortBy) {
      case 'Price Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Best Selling':
        result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      case 'Newest':
        result.sort((a, b) => (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0));
        break;
      case 'Recommended':
      default:
        // Already sorted by recommendation engine
        break;
    }

    return result;
  }, [recommendedProducts, searchQuery, activeFilters, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  const handleMoveToCart = (item) => {
    addToCart(item, 1);
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] font-sans text-black pt-20 pb-16">
      <Helmet>
        <title>Recommended For You | COSKINn</title>
      </Helmet>

      {/* Hero Section */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-100 py-12 mb-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-[#1B1B1B] mb-4"
          >
            Recommended For You
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 max-w-2xl mx-auto"
          >
            A personalized curation of premium skincare and cosmetics, tailored specifically to your beauty preferences and history.
          </motion.p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full lg:w-1/4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search recommendations..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full text-sm font-medium focus:outline-none focus:border-[#FF0069] transition-all shadow-sm"
          />
        </div>

        <div className="hidden lg:flex flex-1 items-center gap-6 justify-center z-40">
          {FILTER_CATEGORIES.map((cat, idx) => (
            <div key={idx} className="group relative">
              <button className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest text-gray-600 hover:text-[#FF0069] transition-colors py-2">
                {cat.title} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 py-2">
                {cat.options.map(opt => {
                  const isActive = activeFilters.includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => toggleFilter(opt)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors ${
                        isActive ? 'bg-pink-50 text-[#FF0069]' : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {opt} {isActive && <Check size={14} />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Filters Scroll */}
        <div className="lg:hidden w-full flex overflow-x-auto no-scrollbar gap-2 pb-1">
          {FILTER_CATEGORIES.flatMap(c => c.options).map(opt => {
            const isActive = activeFilters.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => toggleFilter(opt)}
                className={`whitespace-nowrap px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${
                  isActive ? 'border-[#FF0069] bg-[#FF0069] text-white' : 'border-gray-200 bg-white text-gray-600 hover:border-[#FF0069] hover:text-[#FF0069]'
                }`}
              >
                {opt} {isActive && <X size={12} />}
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-48 z-40">
          <button 
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="w-full flex items-center justify-between px-5 py-3 bg-white border border-gray-200 rounded-full text-sm font-bold text-gray-700 hover:border-[#FF0069] transition-colors shadow-sm"
          >
            <span>Sort: {sortBy.split(' ')[0]}</span>
            <ChevronDown size={16} className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {isSortOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                className="absolute top-full right-0 mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden"
              >
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    onClick={() => { setSortBy(opt); setIsSortOpen(false); }}
                    className={`w-full text-left px-5 py-3 text-sm font-medium hover:bg-pink-50 hover:text-[#FF0069] transition-colors ${
                      sortBy === opt ? 'bg-gray-50 text-[#FF0069]' : 'text-gray-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mb-8 flex gap-2 flex-wrap items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mr-2">Active Filters:</span>
          <AnimatePresence>
            {activeFilters.map(filter => (
              <motion.button
                key={filter}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => toggleFilter(filter)}
                className="px-3 py-1.5 rounded-full bg-pink-50 text-[#FF0069] border border-pink-100 text-xs font-bold flex items-center gap-1.5 hover:bg-[#FF0069] hover:text-white transition-colors shadow-sm"
              >
                {filter} <X size={12} />
              </motion.button>
            ))}
          </AnimatePresence>
          <button 
            onClick={() => setActiveFilters([])}
            className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#FF0069] underline ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6">
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
              <AnimatePresence>
                {visibleProducts.map((product) => (
                  <motion.div 
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} onQuickView={setQuickViewItem} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {hasMore && (
              <div className="mt-16 flex justify-center">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLoadMore}
                  className="px-10 py-4 bg-white border border-gray-200 text-[#1B1B1B] rounded-full font-bold uppercase tracking-widest text-sm hover:border-[#FF0069] hover:text-[#FF0069] transition-colors shadow-sm"
                >
                  Load More Products
                </motion.button>
              </div>
            )}
          </>
        ) : (
          <div className="py-20 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100"
            >
              <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star size={32} className="text-[#FF0069]" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-[#1B1B1B]">We are still learning</h3>
              <p className="text-gray-500 mb-8">
                We couldn't find any products matching your current filters. Try adjusting them or explore our full collection.
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => { setActiveFilters([]); setSearchQuery(''); }}
                  className="w-full py-4 bg-gray-100 text-[#1B1B1B] rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors"
                >
                  Clear Filters
                </button>
                <Link 
                  to="/shop"
                  className="w-full py-4 bg-[#FF0069] text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#FF0069]/90 transition-colors shadow-lg shadow-[#FF0069]/20"
                >
                  Explore Collection
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Quick View Modal Overlay */}
      <AnimatePresence>
        {quickViewItem && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/45 backdrop-blur-sm"
              onClick={() => setQuickViewItem(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 overflow-hidden flex flex-col md:flex-row gap-6 font-sans z-10 max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setQuickViewItem(null)} 
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
              >
                <X size={16} />
              </button>
              
              <div className="w-full md:w-1/2 aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden shrink-0 relative flex items-center justify-center p-4">
                <img src={quickViewItem.image || quickViewItem.img} alt={quickViewItem.name} className="w-full h-full object-contain mix-blend-multiply drop-shadow-xl" />
                {quickViewItem.badge && (
                  <div className="absolute top-4 left-4 bg-[#FF0069] text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-widest uppercase">
                    {quickViewItem.badge}
                  </div>
                )}
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-xs font-bold text-[#FF0069] uppercase tracking-widest mb-2 block">
                  {quickViewItem.name.toUpperCase().startsWith('COSKINN') ? 'COSKINn' : 'COSKINn'}
                </span>
                <h3 className="text-2xl font-heading font-bold text-[#1B1B1B] mb-2 leading-tight">
                  {quickViewItem.name.toUpperCase().startsWith('COSKINN') ? quickViewItem.name.substring(8) : quickViewItem.name}
                </h3>
                
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(quickViewItem.rating || 5) ? 'text-[#FF0069] fill-[#FF0069]' : 'text-gray-200'} />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({quickViewItem.reviews || 0} reviews)</span>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-black text-[#1B1B1B]">₹{quickViewItem.price}</span>
                  {(quickViewItem.oldPrice || quickViewItem.originalPrice) && (
                    <span className="text-gray-400 line-through font-medium">₹{quickViewItem.oldPrice || quickViewItem.originalPrice}</span>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                  {quickViewItem.description || quickViewItem.shortDescription || "Luxurious formulation designed to perfect your beauty routine. Dermatologist tested and cruelty-free."}
                </p>

                <div className="flex flex-col gap-3 mt-auto">
                  <button 
                    onClick={() => { handleMoveToCart(quickViewItem); setQuickViewItem(null); }}
                    className="w-full py-4 bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] hover:opacity-95 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-[#FF0069]/20"
                  >
                    Add to Cart
                  </button>
                  <Link 
                    to={`/product/${quickViewItem.id}`}
                    className="w-full py-4 bg-gray-50 text-[#1B1B1B] hover:bg-gray-100 font-bold rounded-xl text-sm transition-all text-center"
                  >
                    View Full Details
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
