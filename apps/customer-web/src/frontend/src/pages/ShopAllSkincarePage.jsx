import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, ChevronDown, Check, X, ShieldCheck, 
  ArrowRight, Star, ChevronLeft, ChevronRight,
  Sparkles, Leaf
} from 'lucide-react';

import { skincareProducts } from '../constants/skincareProducts';
import ProductCard from '../components/common/ProductCard';
import Footer from '../components/common/Footer';
import CategoryFAQ from '../components/categories/CategoryFAQ';

import shopAllHeroImg from '../assets/images/shop_all_hero.webp';
import reviewImg1 from '../assets/images/cleanser_hero_lifestyle.webp';
import reviewImg2 from '../assets/images/lifestyle_selfcare.webp';
import reviewImg3 from '../assets/images/weekend_hero_lifestyle.webp';
import reviewImg4 from '../assets/images/lip_balm_lifestyle.webp';
const SORT_OPTIONS = [
  'Featured', 'Newest', 'Best Selling', 'Price Low to High', 'Price High to Low'
];

const FILTER_CATEGORIES = [
  {
    title: 'Skin Concern',
    options: ['Acne & Blemishes', 'Dry Skin', 'Oily Skin', 'Sensitive Skin', 'Brightening', 'Barrier Care', 'Hydration']
  },
  {
    title: 'Product Type',
    options: ['Cleanser', 'Cleansing Balm', 'Sunscreen', 'Face Mist', 'Overnight Mask', 'Under Eye Patches', 'Lip Balm SPF', 'Hand Cream', 'Pocket Perfume']
  },
  {
    title: 'Fruit Ingredient',
    options: ['Orange', 'Strawberry', 'Blueberry', 'Mango', 'Green Tea', 'Pomegranate']
  }
];

const SHOP_BY_CONCERN = [
  { title: 'Acne & Blemishes', link: '/categories/acne-blemishes', bg: 'from-pink-50 to-white' },
  { title: 'Dry Skin', link: '/categories/dry-skin', bg: 'from-blue-50 to-white' },
  { title: 'Oily Skin', link: '/categories/oily-skin', bg: 'from-green-50 to-white' },
  { title: 'Sensitive Skin', link: '/categories/sensitive-skin', bg: 'from-purple-50 to-white' },
  { title: 'Brightening', link: '/categories/brightening', bg: 'from-yellow-50 to-white' },
  { title: 'Barrier Care', link: '/categories/barrier-care', bg: 'from-orange-50 to-white' },
  { title: 'Hydration', link: '/categories/hydration', bg: 'from-cyan-50 to-white' }
];

const SHOP_BY_FRUIT = [
  { name: 'Orange', desc: 'Vitamin C for ultimate brightening and glow.', color: 'bg-orange-100', text: 'text-orange-600' },
  { name: 'Strawberry', desc: 'Natural BHAs to unclog pores and smooth texture.', color: 'bg-red-100', text: 'text-red-600' },
  { name: 'Blueberry', desc: 'Antioxidant powerhouse for anti-aging protection.', color: 'bg-indigo-100', text: 'text-indigo-600' },
  { name: 'Mango', desc: 'Deep nourishment and hydration for a plump look.', color: 'bg-yellow-100', text: 'text-yellow-600' },
  { name: 'Green Tea', desc: 'Soothing relief for sensitive and irritated skin.', color: 'bg-green-100', text: 'text-green-600' },
  { name: 'Pomegranate', desc: 'Firms, repairs, and protects the skin barrier.', color: 'bg-rose-100', text: 'text-rose-600' }
];

const SHOP_FAQS = [
  { q: "Which product should I start with?", a: "We recommend starting with our Strawberry Glow Cleanser and Daily Ceramide Moisturizer as your foundation. Add targeted serums once your skin barrier is healthy." },
  { q: "Which products suit dry skin?", a: "Our Mango deeply nourishing line and Hydration heroes like the Overnight Mask are perfect for restoring moisture to dry, flaky skin." },
  { q: "Can I combine products?", a: "Yes! COSKINn products are designed to work synergistically. However, if combining active ingredients like Vitamin C and BHAs, use one in the morning and one at night." },
  { q: "Are these suitable for sensitive skin?", a: "Absolutely. All our formulas are dermatologically tested, fragrance-free where necessary, and rely on soothing fruit extracts like Green Tea." },
  { q: "How long before I see results?", a: "Hydration and glow are immediate. For texture, dark spots, and firmness, we recommend consistent use for 2-4 weeks to see significant visible changes." }
];

const REVIEWS = [
  { name: "Sarah J.", initial: "S", rating: 5, text: "The Strawberry cleanser changed my skin texture completely. It's so smooth now!", concern: "Texture & Pores", product: "Cleanser", img: reviewImg1 },
  { name: "Emily R.", initial: "E", rating: 5, text: "Finally a sunscreen that doesn't break me out or leave a white cast. Obsessed.", concern: "Acne & Sun Protection", product: "Sunscreen SPF 50", img: reviewImg2 },
  { name: "Jessica T.", initial: "J", rating: 5, text: "The blueberry overnight mask is magic. I wake up looking like I slept 12 hours.", concern: "Dullness", product: "Overnight Mask", img: reviewImg3 },
  { name: "Amanda K.", initial: "A", rating: 5, text: "My holy grail for sensitive skin. No redness, just pure hydration.", concern: "Sensitive Skin", product: "Daily Moisturizer", img: reviewImg4 }
];

export default function ShopAllSkincarePage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('category');

  const [activeFilters, setActiveFilters] = useState(initialCategory ? [initialCategory] : []);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Featured');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);

  const bestSellersRef = useRef(null);

  const toggleFilter = (filter) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = [...skincareProducts];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
        (p.keyIngredient && p.keyIngredient.toLowerCase().includes(q))
      );
    }

    if (activeFilters.length > 0) {
      result = result.filter(p => {
        const productData = JSON.stringify(p).toLowerCase();
        return activeFilters.some(filter => {
          const f = filter.toLowerCase().replace(' & ', ' ');
          if (f === 'hydration') return productData.includes('hydrat') || productData.includes('moistur');
          if (f === 'repair') return productData.includes('repair') || productData.includes('heal');
          if (f.includes('sun')) return productData.includes('sun') || productData.includes('spf');
          return productData.includes(f);
        });
      });
    }

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
      case 'Featured':
      default:
        result.sort((a, b) => (b.badge === 'TRENDING' ? 1 : 0) - (a.badge === 'TRENDING' ? 1 : 0));
        break;
    }

    return result;
  }, [searchQuery, activeFilters, sortBy]);

  const bestSellers = useMemo(() => {
    return [...skincareProducts].sort((a, b) => (b.reviews || 0) - (a.reviews || 0)).slice(0, 6);
  }, []);

  const scrollBestSellers = (direction) => {
    if (bestSellersRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      bestSellersRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const nextReview = () => setCurrentReview((prev) => (prev + 1) % REVIEWS.length);
  const prevReview = () => setCurrentReview((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] font-sans text-black selection:bg-[#FF2D7A] selection:text-white">
      
      {/* SECTION 1: LUXURY HERO */}
      <section className="relative w-full h-[80vh] md:h-[85vh] lg:h-[90vh] flex items-center pt-[100px] overflow-hidden bg-gradient-to-r from-[#FFF8F6] via-[#FFF0F4] to-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFF8F6] via-[#FFF8F6]/90 to-transparent z-10 w-full md:w-[60%] lg:w-[45%]" />
          <motion.img 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            src={shopAllHeroImg} 
            alt="Shop All COSKINn Skincare" 
            className="absolute inset-y-0 right-0 w-full md:w-[70%] lg:w-[60%] h-full object-cover object-[center_top] mix-blend-multiply opacity-90 md:opacity-100"
            style={{ 
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.8) 25%, black 100%)', 
              maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.8) 25%, black 100%)' 
            }}
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-8 flex items-center gap-2"
            >
              <Link to="/" className="hover:text-[#FF2D7A] transition-colors">Home</Link> / 
              <Link to="/shop" className="hover:text-[#FF2D7A] transition-colors">Shop</Link> / 
              <span className="text-[#FF2D7A]">All Products</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] text-[#1B1B1B] mb-6"
            >
              Discover Every <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D7A] to-[#FF8CB3]">COSKINn</span> Product
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-600 mb-10 font-medium leading-relaxed"
            >
              Explore our complete fruit-powered skincare collection designed for every skin type and concern. 
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button 
                onClick={() => document.getElementById('products-grid').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 bg-[#FF2D7A] text-white hover:shadow-[0_10px_20px_rgba(255,45,122,0.3)] hover:-translate-y-1"
              >
                Shop Best Sellers
              </button>
              <Link 
                to="/routine"
                className="px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 bg-white text-[#FF2D7A] border-[1.5px] border-[#FF2D7A] hover:bg-[#FF2D7A] hover:text-white text-center hover:shadow-[0_10px_20px_rgba(255,45,122,0.2)] hover:-translate-y-1"
              >
                Find Your Routine
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SMART FILTER BAR */}
      <div id="products-grid" className="relative z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Search */}
          <div className="relative w-full lg:w-1/4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products, ingredients..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-full text-sm font-medium focus:outline-none focus:border-[#FF2D7A] focus:ring-1 focus:ring-[#FF2D7A] transition-all"
            />
          </div>

          {/* Filters (Desktop) */}
          <div className="hidden lg:flex flex-1 items-center gap-6 justify-center">
            {FILTER_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="group relative">
                <button className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest text-gray-600 hover:text-[#FF2D7A] transition-colors py-2">
                  {cat.title} <ChevronDown size={14} />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-3">
                  <div className="max-h-[300px] overflow-y-auto px-2">
                    {cat.options.map(opt => {
                      const isActive = activeFilters.includes(opt);
                      return (
                        <button
                          key={opt}
                          onClick={() => toggleFilter(opt)}
                          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                            isActive ? 'bg-[#FFF0F4] text-[#FF2D7A]' : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          {opt}
                          {isActive && <Check size={16} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Filters Summary (Mobile/Tablet toggles) */}
          <div className="lg:hidden w-full flex overflow-x-auto no-scrollbar gap-2 pb-1">
             {FILTER_CATEGORIES.flatMap(c => c.options).map(opt => {
                const isActive = activeFilters.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => toggleFilter(opt)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1 ${
                      isActive ? 'border-[#FF2D7A] bg-[#FF2D7A] text-white' : 'border-gray-200 bg-white text-gray-600 hover:border-[#FF2D7A] hover:text-[#FF2D7A]'
                    }`}
                  >
                    {opt}
                    {isActive && <X size={12} />}
                  </button>
                );
             })}
          </div>

          {/* Sort By */}
          <div className="relative w-full lg:w-48">
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="w-full flex items-center justify-between px-5 py-3 bg-white border border-gray-200 rounded-full text-sm font-bold text-gray-700 hover:border-[#FF2D7A] transition-colors"
            >
              <span>Sort: {sortBy.split(' ')[0]}</span>
              <ChevronDown size={16} className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isSortOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden"
                >
                  {SORT_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setSortBy(opt); setIsSortOpen(false); }}
                      className={`w-full text-left px-5 py-3 text-sm font-medium hover:bg-[#FFF0F4] hover:text-[#FF2D7A] transition-colors ${
                        sortBy === opt ? 'bg-gray-50 text-[#FF2D7A]' : 'text-gray-700'
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

        {/* Active Filters Chips (Desktop) */}
        {activeFilters.length > 0 && (
          <div className="hidden lg:flex max-w-7xl mx-auto px-6 mt-4 gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 py-1.5 mr-2">Active:</span>
            <AnimatePresence>
              {activeFilters.map(filter => (
                <motion.button
                  key={filter}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => toggleFilter(filter)}
                  className="px-3 py-1.5 rounded-full bg-[#FFF0F4] text-[#FF2D7A] border border-[#FF2D7A]/20 text-xs font-bold flex items-center gap-1.5 hover:bg-[#FF2D7A] hover:text-white transition-colors"
                >
                  {filter} <X size={12} />
                </motion.button>
              ))}
            </AnimatePresence>
            <button 
              onClick={() => setActiveFilters([])}
              className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#FF2D7A] underline ml-2 py-1.5"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* SECTION 3: PRODUCT GRID */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="w-20 h-20 bg-[#FFF0F4] rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-[#FF2D7A]" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-[#1B1B1B]">No products found</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                We couldn't find any products matching your current filters. Try adjusting your search or clearing some filters.
              </p>
              <button 
                onClick={() => { setActiveFilters([]); setSearchQuery(''); }}
                className="px-8 py-3 bg-[#1B1B1B] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#FF2D7A] transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4: SHOP BY SKIN CONCERN */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4 text-[#1B1B1B]">Shop by Skin Concern</h2>
            <p className="text-gray-600 font-medium">Targeted solutions for your unique skin needs.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {SHOP_BY_CONCERN.map((concern, idx) => (
              <Link 
                key={idx}
                to={concern.link}
                className={`group flex flex-col items-center justify-center p-6 rounded-3xl bg-gradient-to-br ${concern.bg} border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <Sparkles size={20} className="text-[#FF2D7A]" />
                </div>
                <span className="text-sm font-bold text-center text-[#1B1B1B] group-hover:text-[#FF2D7A] transition-colors">
                  {concern.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: SHOP BY FRUIT COMPLEX */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4 text-[#1B1B1B]">Powered by Fruit Extracts</h2>
            <p className="text-[#FF2D7A] font-bold">Nature's most potent ingredients, bottled.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHOP_BY_FRUIT.map((fruit, idx) => (
              <div 
                key={idx}
                className="group relative overflow-hidden bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => {
                  toggleFilter(fruit.name);
                  document.getElementById('products-grid').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl ${fruit.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${fruit.color} ${fruit.text}`}>
                    <Leaf size={24} />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-[#1B1B1B]">{fruit.name}</h3>
                </div>
                <p className="text-gray-600 mb-6 font-medium leading-relaxed">{fruit.desc}</p>
                <span className={`text-sm font-bold uppercase tracking-widest flex items-center gap-2 ${fruit.text} group-hover:gap-3 transition-all`}>
                  Shop {fruit.name} <ArrowRight size={16} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: BEST SELLERS SLIDER */}
      <section className="py-20 bg-white border-y border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-2 text-[#1B1B1B]">COSKINn Cult Favorites</h2>
              <p className="text-gray-500">The products our community can't live without.</p>
            </div>
            <div className="hidden md:flex gap-3">
              <button onClick={() => scrollBestSellers('left')} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#FF2D7A] hover:border-[#FF2D7A] hover:text-white transition-colors shadow-sm">
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => scrollBestSellers('right')} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#FF2D7A] hover:border-[#FF2D7A] hover:text-white transition-colors shadow-sm">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div 
            ref={bestSellersRef}
            className="flex gap-4 lg:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-8 -mx-6 px-6 md:mx-0 md:px-0"
          >
            {bestSellers.map((product) => (
              <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: BUILD YOUR ROUTINE CTA */}
      <section className="py-24 relative overflow-hidden bg-[#FFF0F4]">
        <div className="absolute inset-0 z-0 opacity-50 bg-[radial-gradient(circle_at_center,rgba(255,45,122,0.1)_0,transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6 text-[#1B1B1B]">
            Not sure where to start?
          </h2>
          <p className="text-xl text-gray-700 mb-10 leading-relaxed font-medium">
            Take the guesswork out of skincare. Discover a personalized routine tailored to your exact skin type and concerns in under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/routine"
              className="px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 bg-[#FF2D7A] text-white hover:shadow-[0_10px_20px_rgba(255,45,122,0.3)] hover:-translate-y-1"
            >
              Build My Routine
            </Link>
            <Link to="/skin-quiz" className="px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 bg-white text-[#FF2D7A] border border-[#FF2D7A] hover:bg-gray-50 hover:shadow-[0_10px_20px_rgba(255,45,122,0.1)] inline-block">
              Take Skin Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 8: CUSTOMER REVIEWS (PREMIUM EDITORIAL) */}
      <section className="py-24 bg-white border-t border-gray-100 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center md:text-left mb-16 md:flex justify-between items-end">
            <div>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4 text-[#1B1B1B]">Words From Our Community</h2>
              <p className="text-gray-500 font-medium text-lg">Real results shared by real people.</p>
            </div>
            <div className="hidden md:flex gap-3">
              <button onClick={prevReview} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#FF2D7A] hover:border-[#FF2D7A] hover:text-white transition-colors">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextReview} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#FF2D7A] hover:border-[#FF2D7A] hover:text-white transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="relative w-full rounded-[40px] overflow-hidden bg-[#FAFAFA] border border-gray-100 shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]"
              >
                {/* Image Side */}
                <div className="h-[400px] lg:h-auto relative overflow-hidden">
                  <img 
                    src={REVIEWS[currentReview].img} 
                    alt="Customer Routine" 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                
                {/* Content Side */}
                <div className="p-10 md:p-16 flex flex-col justify-center bg-[#FAFAFA]">
                  <div className="flex gap-1 text-[#FF2D7A] mb-8">
                    {[...Array(REVIEWS[currentReview].rating)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>
                  
                  <p className="text-3xl md:text-4xl font-heading leading-tight text-[#1B1B1B] mb-12">
                    "{REVIEWS[currentReview].text}"
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#1B1B1B] font-bold text-lg shadow-sm border border-gray-100">
                        {REVIEWS[currentReview].initial}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-[#1B1B1B]">{REVIEWS[currentReview].name}</h4>
                        <span className="text-[#FF2D7A] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 mt-0.5">
                          <ShieldCheck size={12} /> Verified Buyer
                        </span>
                      </div>
                    </div>

                    <div className="h-px w-full bg-gray-200 my-6" />

                    <div className="flex gap-12">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Skin Concern</p>
                        <p className="font-bold text-[#1B1B1B]">{REVIEWS[currentReview].concern}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Product Used</p>
                        <p className="font-bold text-[#FF2D7A]">{REVIEWS[currentReview].product}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Mobile Navigation */}
            <div className="md:hidden absolute bottom-6 right-6 flex gap-2">
              <button onClick={prevReview} className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md text-gray-400 hover:text-[#FF2D7A]">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextReview} className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md text-gray-400 hover:text-[#FF2D7A]">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: FAQS */}
      <CategoryFAQ faqs={SHOP_FAQS} />

      <Footer />
    </div>
  );
}
