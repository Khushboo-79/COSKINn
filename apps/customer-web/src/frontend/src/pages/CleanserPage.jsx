import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Star, ChevronRight, Eye } from 'lucide-react';
import { skincareProducts } from '../constants/skincareProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Footer from '../components/common/Footer';

// Hero Image
import gentleCleanserImg from '../assets/images/gentle_cleanser.webp';

const SKIN_TYPES = ["All", "Dry Skin", "Oily Skin", "Combination Skin", "Sensitive Skin", "Normal Skin", "Acne Prone"];
const SKIN_CONCERNS = ["Acne", "Dryness", "Blackheads", "Whiteheads", "Pigmentation", "Dullness", "Oil Control", "Large Pores"];

export default function CleanserPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const [activeSkinType, setActiveSkinType] = useState("All");
  const [activeConcern, setActiveConcern] = useState(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter products where subcategory === "Cleanser" or category contains "Face Care" and name contains "Cleanser"
  const allCleansers = useMemo(() => {
    return skincareProducts.filter(p => p.name.includes("Cleanser") && p.id >= 301); 
  }, []);

  const filteredCleansers = useMemo(() => {
    let filtered = allCleansers;

    if (activeSkinType !== "All") {
      filtered = filtered.filter(p => p.skinTypes?.includes(activeSkinType));
    }

    if (activeConcern) {
      filtered = filtered.filter(p => p.concerns?.includes(activeConcern));
    }

    return filtered;
  }, [allCleansers, activeSkinType, activeConcern]);

  const handleBuyNow = (product) => {
    addToCart(product, 1);
    navigate('/checkout');
  };

  return (
    <div className="w-full min-h-screen bg-theme-bg overflow-x-hidden font-sans text-theme-text mt-[72px]">
      
      {/* Breadcrumbs */}
      <div className="w-full border-b border-black/5 bg-white/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-xs font-medium text-black/50 tracking-wide">
          <Link to="/" className="hover:text-theme-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black font-bold truncate">COSKINn Cleansers</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[500px] lg:h-[600px] bg-gradient-to-br from-[#FF0069] to-[#FFD498] overflow-hidden flex items-center">
        {/* Floating elements animation */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-10 w-32 h-32 bg-white/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-10 w-48 h-48 bg-[#FF0069]/30 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-center md:text-left mb-10 md:mb-0"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-tight mb-6 drop-shadow-lg">
              COSKINn <br />Gentle Daily <br />Cleanser
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-medium mb-10 tracking-wide">
              Cleanse • Hydrate • Protect Your Skin Barrier
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={() => {
                  document.getElementById('products-grid').scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white text-[#FF0069] font-bold rounded-full hover:bg-black hover:text-white transition-all shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(255,0,105,0.4)]"
              >
                Shop Now
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-[#FF0069] transition-all">
                Know Ingredients
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="md:w-1/2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/30 blur-2xl rounded-full scale-110"></div>
              <img 
                src={gentleCleanserImg} 
                alt="COSKINn Cleanser" 
                className="w-64 md:w-80 lg:w-96 drop-shadow-2xl relative z-10 object-contain"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Shop by Skin Type */}
        <div className="mb-12">
          <h2 className="text-2xl font-heading font-bold text-black mb-6">Shop by Skin Type</h2>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 snap-x">
            {SKIN_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setActiveSkinType(type)}
                className={`shrink-0 snap-start px-6 py-4 rounded-2xl border-2 font-bold transition-all ${
                  activeSkinType === type 
                    ? 'border-[#FF0069] bg-[#FF0069] text-white shadow-[0_5px_15px_rgba(255,0,105,0.3)]' 
                    : 'border-gray-200 bg-white text-gray-600 hover:border-[#FF0069] hover:text-[#FF0069]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Shop by Concern */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-heading font-bold text-black">Shop by Concern</h2>
            {activeConcern && (
              <button 
                onClick={() => setActiveConcern(null)}
                className="text-sm font-medium text-[#FF0069] hover:underline"
              >
                Clear Filter
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {SKIN_CONCERNS.map((concern) => (
              <button
                key={concern}
                onClick={() => setActiveConcern(concern === activeConcern ? null : concern)}
                className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all ${
                  activeConcern === concern
                    ? 'bg-[#FF0069] border-[#FF0069] text-white shadow-md'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-[#FF0069] hover:text-[#FF0069]'
                }`}
              >
                {concern}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section id="products-grid" className="max-w-7xl mx-auto px-6 py-8 mb-20 bg-gray-50/50 rounded-3xl">
        <h2 className="text-3xl font-heading font-black text-black mb-10">
          The Cleanser Collection
          <span className="block text-sm font-sans font-medium text-gray-500 mt-2 tracking-wide uppercase">
            {filteredCleansers.length} {filteredCleansers.length === 1 ? 'Product' : 'Products'} Found
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence>
            {filteredCleansers.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white rounded-3xl overflow-hidden border border-black/5 hover:border-[#FF0069]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all flex flex-col"
              >
                {/* Product Image Area */}
                <div className="relative aspect-[4/5] bg-theme-secondary/10 overflow-hidden cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                  {/* Badge */}
                  {product.discountBadge && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#FF0069] text-white text-[10px] font-bold tracking-widest rounded-full shadow-lg">
                      {product.discountBadge}
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-[#FF0069] hover:bg-white transition-all shadow-sm"
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-[#FF0069] text-[#FF0069]' : ''}`} />
                  </button>

                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Quick Actions Hover */}
                  <div className="absolute inset-x-4 bottom-4 translate-y-16 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                      }}
                      className="flex-1 bg-white/90 backdrop-blur-md text-black font-bold py-3 rounded-xl hover:bg-[#FF0069] hover:text-white transition-colors flex items-center justify-center gap-2 text-sm shadow-lg"
                    >
                      <ShoppingBag size={16} /> Add
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product.id}`);
                      }}
                      className="w-12 bg-black/90 backdrop-blur-md text-white font-bold py-3 rounded-xl hover:bg-[#FF0069] transition-colors flex items-center justify-center shadow-lg"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 flex-1 flex flex-col justify-between cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-black group-hover:text-[#FF0069] transition-colors mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-black font-bold text-sm ml-1">{product.rating}</span>
                      </div>
                      <span className="text-gray-400 text-xs">({product.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-gray-400 text-sm line-through mr-2">₹{product.originalPrice}</span>
                      <span className="text-xl font-bold text-black">₹{product.price}</span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBuyNow(product);
                      }}
                      className="px-5 py-2.5 bg-black text-white text-sm font-bold rounded-xl hover:bg-[#FF0069] hover:shadow-[0_5px_15px_rgba(255,0,105,0.3)] transition-all"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
}
