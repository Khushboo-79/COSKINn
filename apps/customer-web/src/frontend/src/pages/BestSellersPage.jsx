import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart, Filter, ChevronDown, CheckCircle, ShieldCheck, Leaf, Truck, Users } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import heroImg from '../assets/images/best_sellers_hero.webp';

// --- Trust Features ---
const trustFeatures = [
  { icon: <ShieldCheck className="w-8 h-8" />, title: "Dermatologist Tested", desc: "Clinically proven safe & effective" },
  { icon: <Users className="w-8 h-8" />, title: "Loved by Thousands", desc: "Over 50,000+ happy customers" },
  { icon: <Leaf className="w-8 h-8" />, title: "Clean Ingredients", desc: "100% Vegan & Cruelty Free" },
  { icon: <Truck className="w-8 h-8" />, title: "Fast Delivery", desc: "Free shipping across India" }
];

// --- Product Data ---
const ALL_PRODUCTS = [
  {
    id: 114,
    name: 'COSKINn Niacinamide Serum',
    type: 'Face Care • Serums',
    price: 899,
    originalPrice: 1199,
    discount: '25% OFF',
    rating: 4.9,
    reviews: 2450,
    category: 'Serums',
    image: '/src/assets/images/niacinamide_serum.webp',
    badge: 'BEST SELLER',
    isNew: false,
    popularity: 100
  },
  {
    id: 101,
    name: 'COSKINn Sunscreen SPF 50',
    type: 'Face Care • Sunscreen',
    price: 699,
    originalPrice: 899,
    discount: '22% OFF',
    rating: 4.8,
    reviews: 3120,
    category: 'Sunscreen',
    image: '/src/assets/images/sunscreen_spf50.webp',
    badge: 'TOP RATED',
    isNew: false,
    popularity: 98
  },
  {
    id: 102,
    name: 'COSKINn Body Sunscreen',
    type: 'Body Care • Sunscreen',
    price: 1099,
    originalPrice: 1499,
    discount: '26% OFF',
    rating: 4.7,
    reviews: 1840,
    category: 'Sunscreen',
    image: '/src/assets/images/body_sunscreen.webp',
    badge: null,
    isNew: false,
    popularity: 90
  },
  {
    id: 103,
    name: 'COSKINn Tinted Sunscreen',
    type: 'Face Care • Sunscreen',
    price: 799,
    originalPrice: 999,
    discount: '20% OFF',
    rating: 4.8,
    reviews: 1560,
    category: 'Sunscreen',
    image: '/src/assets/images/tinted_sunscreen.webp',
    badge: 'CUSTOMER FAVORITE',
    isNew: true,
    popularity: 88
  },
  {
    id: 104,
    name: 'COSKINn Gentle Cleanser',
    type: 'Face Care • Cleansers',
    price: 499,
    originalPrice: 699,
    discount: '28% OFF',
    rating: 4.9,
    reviews: 4200,
    category: 'Cleansers',
    image: '/src/assets/images/gentle_cleanser.webp',
    badge: 'BEST SELLER',
    isNew: false,
    popularity: 99
  },
  {
    id: 105,
    name: 'COSKINn Cleansing Balm',
    type: 'Face Care • Cleansers',
    price: 849,
    originalPrice: 1099,
    discount: '22% OFF',
    rating: 4.7,
    reviews: 950,
    category: 'Cleansers',
    image: '/src/assets/images/cleansing_balm.webp',
    badge: null,
    isNew: false,
    popularity: 85
  },
  {
    id: 112,
    name: 'COSKINn Daily Moisturiser',
    type: 'Face Care • Moisturisers',
    price: 649,
    originalPrice: 849,
    discount: '23% OFF',
    rating: 4.8,
    reviews: 2100,
    category: 'Moisturisers',
    image: '/src/assets/images/daily_moisturiser.webp',
    badge: 'DERMATOLOGIST RECOMMENDED',
    isNew: false,
    popularity: 95
  },
  {
    id: 110,
    name: 'COSKINn Overnight Mask',
    type: 'Face Care • Masks',
    price: 999,
    originalPrice: 1299,
    discount: '23% OFF',
    rating: 4.9,
    reviews: 1800,
    category: 'Masks',
    image: '/src/assets/images/overnight_mask.webp',
    badge: 'TOP RATED',
    isNew: false,
    popularity: 92
  },
  {
    id: 109,
    name: 'COSKINn Hydrating Face Mist',
    type: 'Face Care • Toners',
    price: 449,
    originalPrice: 599,
    discount: '25% OFF',
    rating: 4.6,
    reviews: 1120,
    category: 'Face Care',
    image: '/src/assets/images/face_mist.webp',
    badge: null,
    isNew: false,
    popularity: 80
  },
  {
    id: 106,
    name: 'COSKINn Lip Balm SPF',
    type: 'Lip Care',
    price: 299,
    originalPrice: 399,
    discount: '25% OFF',
    rating: 4.8,
    reviews: 3500,
    category: 'Lip Care',
    image: '/src/assets/images/lip_balm.webp',
    badge: 'BEST SELLER',
    isNew: false,
    popularity: 97
  },
  {
    id: 111,
    name: 'COSKINn Under Eye Patches',
    type: 'Face Care • Masks',
    price: 1299,
    originalPrice: 1599,
    discount: '18% OFF',
    rating: 4.7,
    reviews: 890,
    category: 'Masks',
    image: '/src/assets/images/under_eye_patches.webp',
    badge: 'NEW',
    isNew: true,
    popularity: 82
  },
  {
    id: 107,
    name: 'COSKINn Hand Cream',
    type: 'Body Care',
    price: 349,
    originalPrice: 499,
    discount: '30% OFF',
    rating: 4.8,
    reviews: 1450,
    category: 'Face Care', // Mapping to Face Care just for the "All" vs Others filtering simplicity if we don't have Body Care filter
    image: '/src/assets/images/hand_cream.webp',
    badge: null,
    isNew: false,
    popularity: 86
  }
];

const CATEGORIES = ["All", "Face Care", "Serums", "Sunscreen", "Moisturisers", "Cleansers", "Masks", "Lip Care"];
const SORT_OPTIONS = [
  { label: "Most Popular", value: "popular" },
  { label: "Highest Rated", value: "rating" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" }
];

export default function BestSellersPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = ALL_PRODUCTS;

    // Filter
    if (activeCategory !== "All") {
      result = result.filter(p => p.category === activeCategory || p.type.includes(activeCategory));
    }

    // Sort
    result = [...result].sort((a, b) => {
      switch(sortBy) {
        case "popular": return b.popularity - a.popularity;
        case "rating": return b.rating - a.rating;
        case "newest": return (b.isNew === a.isNew) ? 0 : b.isNew ? 1 : -1;
        case "price_asc": return a.price - b.price;
        case "price_desc": return b.price - a.price;
        default: return 0;
      }
    });

    return result;
  }, [activeCategory, sortBy]);

  // Related Products (Just selecting a random subset for carousel)
  const relatedProducts = useMemo(() => {
    return [...ALL_PRODUCTS].sort(() => 0.5 - Math.random()).slice(0, 4);
  }, []);

  return (
    <div className="w-full min-h-screen bg-theme-bg overflow-x-hidden font-sans text-theme-text">
      
      {/* Premium Hero Banner */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-rose-50 pt-[90px]">
        {/* WebP Background Image */}
        <div className="absolute inset-0 opacity-40 mix-blend-multiply">
          <img 
            src={heroImg} 
            alt="COSKINn Best Sellers" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
        
        <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-theme-primary text-white text-xs font-bold uppercase tracking-widest mb-6">
              <Star className="w-3 h-3 fill-current" />
              Customer Favorites
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-black mb-6 leading-[1.1] tracking-tight">
              COSKINn Best Sellers
            </h1>
            <p className="text-lg md:text-xl text-black/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Discover our most-loved skincare products trusted by thousands of customers for healthy, glowing skin.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => window.scrollTo({ top: document.getElementById('best-sellers-grid').offsetTop - 100, behavior: 'smooth' })} className="w-full sm:w-auto px-10 py-4 bg-theme-primary text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-pink-700 transition-colors shadow-lg">
                Shop Now
              </button>
              <button className="w-full sm:w-auto px-10 py-4 bg-white text-black border border-black/10 rounded-full font-bold uppercase tracking-widest text-sm hover:border-black/30 transition-colors">
                Explore Collection
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section id="best-sellers-grid" className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        
        {/* Filters & Sorting */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 sticky top-[72px] bg-theme-bg/90 backdrop-blur-md py-4 z-40 border-b border-black/5">
          
          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2 lg:pb-0">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${activeCategory === cat ? 'bg-theme-primary text-white shadow-md' : 'bg-white border border-black/10 text-black/70 hover:border-theme-primary hover:text-theme-primary'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sorting */}
          <div className="relative shrink-0 flex items-center gap-3">
            <span className="text-sm font-bold text-black/50 uppercase tracking-widest hidden sm:block">Sort By:</span>
            <div className="relative">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center justify-between w-[200px] px-5 py-2.5 bg-white border border-black/10 rounded-full text-sm font-bold hover:border-theme-primary transition-colors focus:outline-none"
              >
                {SORT_OPTIONS.find(o => o.value === sortBy)?.label}
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isSortOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-[200px] bg-white border border-black/10 rounded-2xl shadow-xl overflow-hidden z-50"
                  >
                    {SORT_OPTIONS.map(option => (
                      <button
                        key={option.value}
                        onClick={() => { setSortBy(option.value); setIsSortOpen(false); }}
                        className={`w-full text-left px-5 py-3 text-sm font-bold transition-colors ${sortBy === option.value ? 'bg-theme-primary/10 text-theme-primary' : 'hover:bg-black/5 text-black/70'}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={product.id} 
                className="group flex flex-col relative"
              >
                {/* Product Image Container */}
                <div className="relative aspect-[4/5] bg-theme-secondary/20 rounded-[2rem] overflow-hidden mb-5">
                  {/* Image */}
                  <Link to={`/product/${product.id}`} className="block w-full h-full">
                    <img 
                      loading="lazy"
                      decoding="async"
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>

                  {/* Overlays */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.badge && (
                      <span className="bg-theme-primary backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                        {product.badge}
                      </span>
                    )}
                    {product.discount && (
                      <span className="bg-theme-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                        {product.discount}
                      </span>
                    )}
                  </div>

                  {/* Quick Actions (Hover) */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button 
                      onClick={() => addToCart(product)}
                      className="flex-1 btn-secondary-skincare h-12 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[11px]"
                    >
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </button>
                    <button 
                      onClick={() => toggleWishlist(product)}
                      className={`w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center transition-colors shadow-lg shrink-0 ${isInWishlist(product.id) ? 'text-red-500' : 'text-black hover:text-theme-primary'}`}
                    >
                      <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-1 px-2">
                  <div className="flex items-center gap-1 text-yellow-400 mb-2 text-xs">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-black/40 font-bold ml-1">({product.reviews})</span>
                  </div>
                  
                  <Link to={`/product/${product.id}`} className="block">
                    <h3 className="font-heading font-bold text-[18px] text-black group-hover:text-theme-primary transition-colors leading-tight mb-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm font-medium text-black/50 mb-3">{product.type}</p>
                  
                  <div className="mt-auto flex items-center gap-3">
                    <span className="font-bold text-lg text-theme-primary">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm font-bold text-black/30 line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="w-full py-20 text-center">
            <h3 className="text-2xl font-bold mb-2">No products found</h3>
            <p className="text-black/50">Try selecting a different category.</p>
            <button onClick={() => setActiveCategory("All")} className="mt-6 px-6 py-3 btn-primary-skincare font-bold text-sm">
              Clear Filters
            </button>
          </div>
        )}

      </section>

      {/* Trust Section: Why Customers Love COSKINn */}
      <section className="w-full bg-white py-24 mt-12 border-t border-black/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Why Customers Love COSKINn</h2>
          <p className="text-black/60 font-medium mb-16 max-w-2xl mx-auto">Experience the perfect blend of science and nature. Our products are formulated to deliver visible results without compromising on safety.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {trustFeatures.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <div className="w-20 h-20 rounded-full bg-[#fafafa] border border-black/5 flex items-center justify-center text-theme-primary mb-6 group-hover:scale-110 group-hover:bg-theme-primary group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-black/60 font-medium max-w-[200px] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products Carousel */}
      <section className="w-full bg-[#fafafa] py-24 border-t border-black/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">You Might Also Like</h2>
            <p className="text-black/60 font-medium">Complete your routine with these skincare essentials.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="group bg-white rounded-3xl p-5 shadow-sm border border-black/5 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                <div className="aspect-square bg-theme-secondary/20 rounded-2xl overflow-hidden mb-4 relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur text-[10px] font-bold uppercase px-2 py-1 rounded">Quick View</div>
                </div>
                <div className="flex flex-col flex-1 text-center">
                  <h4 className="font-heading font-bold text-lg mb-2 group-hover:text-theme-primary transition-colors leading-tight">{product.name}</h4>
                  <div className="font-bold text-theme-primary text-xl mt-auto mb-4">₹{product.price}</div>
                  <button 
                    onClick={(e) => { e.preventDefault(); addToCart(product); }}
                    className="w-full py-3 bg-theme-primary text-white font-bold uppercase tracking-widest text-xs rounded-full group-hover:bg-pink-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
