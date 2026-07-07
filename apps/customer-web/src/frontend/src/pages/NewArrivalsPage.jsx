import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Footer from '../components/common/Footer';
import { Heart, ShoppingBag, Eye, Star, ArrowRight, CheckCircle, ShieldCheck, Leaf, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { skincareProducts } from '../constants/skincareProducts';

import heroImg from '../assets/images/luxury_hero_banner.webp';
import launchImg from '../assets/images/featured_launch_banner.webp';
import cleanserImg from '../assets/images/strawberry_glow_cleanser.webp';
import sunscreenImg from '../assets/images/vitamin_c_sunscreen.webp';
import blushImg from '../assets/images/velvet_blush.webp';
import mascaraImg from '../assets/images/lift_curl_mascara.webp';
import lipstickImg from '../assets/images/new_product_lipstick.webp';
import holoImg from '../assets/images/holographic_collection.webp';

export default function NewArrivalsPage() {
  const { theme } = useTheme();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [activeFilter, setActiveFilter] = useState('All');
  const scrollRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const cosmeticsFilters = ['All', 'Skincare', 'Cosmetics', 'Newest', 'Price', 'Popular', 'Availability'];
  const skincareFilters = ['All', 'Newest', 'Popular', 'Availability'];
  
  const filters = theme === 'skincare' ? skincareFilters : cosmeticsFilters;

  const legacyProducts = [
    { id: 1, name: "COSKINn Strawberry Glow Cleanser", price: 499, rating: 4.9, category: "Skincare", image: cleanserImg, badge: "NEW" },
    { id: 2, name: "COSKINn Velvet Blush", price: 699, rating: 4.8, category: "Cosmetics", image: blushImg, badge: "TRENDING" },
    { id: 3, name: "COSKINn Vitamin C Sunscreen SPF 50", price: 899, rating: 4.7, category: "Skincare", image: sunscreenImg, badge: "EDITOR'S PICK" },
    { id: 4, name: "COSKINn Magnetic Lipstick", price: 999, rating: 5.0, category: "Cosmetics", image: lipstickImg, badge: "LIMITED EDITION" },
    { id: 5, name: "COSKINn Green Tea Face Mist", price: 499, rating: 4.6, category: "Skincare", image: cleanserImg, badge: "BEST SELLER" },
    { id: 6, name: "COSKINn Blueberry Overnight Mask", price: 1299, rating: 4.9, category: "Skincare", image: cleanserImg, badge: "JUST DROPPED" },
    { id: 7, name: "COSKINn Lift & Curl Mascara", price: 899, rating: 4.8, category: "Cosmetics", image: mascaraImg, badge: "MOST LOVED" },
    { id: 8, name: "COSKINn Mango Lip Balm SPF 30", price: 499, rating: 4.7, category: "Skincare", image: sunscreenImg, badge: "NEW" }
  ];

  const activeProducts = theme === 'skincare' ? skincareProducts : legacyProducts;
  const justDropped = activeProducts.slice(0, 5);

  const reasons = [
    { icon: <Leaf className="w-8 h-8" />, title: "Fruit Powered Ingredients" },
    { icon: <ShieldCheck className="w-8 h-8" />, title: "Dermatologically Tested" },
    { icon: <Heart className="w-8 h-8" />, title: "Cruelty Free" },
    { icon: <Sparkles className="w-8 h-8" />, title: "Long Lasting Formula" },
    { icon: <CheckCircle className="w-8 h-8" />, title: "Suitable For Daily Use" }
  ];

  let filteredProducts = [...activeProducts];
  if (theme === 'skincare') {
    if (activeFilter === 'Newest') {
      // Sort by newest arrival (assuming higher id is newer, or using the array order)
      filteredProducts = [...activeProducts].reverse(); 
    } else if (activeFilter === 'Popular') {
      // Sort by rating descending, then reviews descending
      filteredProducts.sort((a, b) => b.rating - a.rating || (b.reviews || 0) - (a.reviews || 0));
    } else if (activeFilter === 'Availability') {
      filteredProducts = filteredProducts.filter(p => p.stock > 0);
    }
    // "All" keeps the default order (which we treat as the curated array order)
  } else {
    // Legacy cosmetics filter logic
    filteredProducts = activeFilter === 'All' ? activeProducts : 
      (activeFilter === 'Skincare' || activeFilter === 'Cosmetics') ? activeProducts.filter(p => p.category === activeFilter) : 
      activeProducts;
  }

  return (
    <div className="w-full min-h-screen bg-theme-bg overflow-x-hidden font-sans text-theme-text selection:bg-theme-secondary selection:text-theme-dark" ref={scrollRef}>
      
      {/* 1. Hero Section */}
      <div className="relative w-full h-[85vh] overflow-hidden flex items-center justify-center">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <img loading="lazy" src={heroImg} alt="Luxury Beauty" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
        </motion.div>
        
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-heading text-white drop-shadow-xl mb-6 tracking-wide leading-tight"
          >
            Freshly Launched at <span className="font-bold text-theme-primary">COSKINn</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white drop-shadow-md mb-10 max-w-2xl font-body font-medium"
          >
            Discover our newest skincare and beauty innovations crafted with nature-inspired ingredients and modern cosmetic science.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <button className="px-10 py-4 bg-theme-primary text-white font-bold tracking-widest uppercase text-sm rounded-full shadow-[0_10px_30px_rgba(255,0,105,0.4)] hover:shadow-[0_15px_40px_rgba(255,0,105,0.6)] hover:-translate-y-1 transition-all duration-300 border border-theme-primary">
              Shop Collection
            </button>
            <button className="px-10 py-4 bg-white/20 backdrop-blur-md border border-white/60 text-white font-bold tracking-widest uppercase text-sm rounded-full hover:bg-white/30 hover:border-white transition-all duration-300">
              Explore New
            </button>
          </motion.div>
        </div>
      </div>

      {/* 2. Premium Filter Bar */}
      <div className="sticky top-[72px] z-40 w-full bg-theme-bg/80 backdrop-blur-xl border-b border-black/5 py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto overflow-x-auto hide-scrollbar flex items-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 whitespace-nowrap ${
                activeFilter === filter ? 'text-white' : 'text-black/60 hover:text-black hover:bg-black/5'
              }`}
            >
              {activeFilter === filter && (
                <motion.div layoutId="activeFilter" className="absolute inset-0 bg-theme-primary rounded-full -z-10" />
              )}
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* 3. New Arrival Product Grid */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={product.id}
                className="group relative flex flex-col bg-white rounded-3xl p-5 shadow-[0_5px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500"
              >
                {/* Badge */}
                <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                  <span className="px-3 py-1 bg-theme-primary text-white text-[10px] font-bold tracking-widest uppercase rounded-full shadow-lg">
                    {product.badge || "NEW"}
                  </span>
                  {product.discountBadge && (
                    <span className="px-2 py-0.5 bg-black text-white text-[10px] font-bold tracking-widest uppercase rounded-full shadow-lg text-center w-max">
                      {product.discountBadge}
                    </span>
                  )}
                </div>
                {/* Wishlist */}
                <button 
                  onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                  className={`absolute top-6 right-6 z-10 w-9 h-9 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${isInWishlist(product.id) ? 'bg-white text-red-500 opacity-100' : 'bg-white/80 text-black/40 hover:text-theme-primary hover:bg-white opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'}`}
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </button>
                
                {/* Image */}
                <Link to={theme === 'skincare' ? `/product/${product.id}` : "#"} className="block relative w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-theme-secondary/20">
                  <img loading="lazy" src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                  
                  {/* Quick View */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-theme-primary hover:text-white transition-colors duration-300 flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 shadow-xl">
                      <Eye className="w-4 h-4" /> Quick View
                    </div>
                  </div>
                </Link>

                {/* Content */}
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-1 mb-2 text-yellow-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-xs text-black/60 font-medium ml-1">{product.rating} {product.reviews ? `(${product.reviews} Reviews)` : ''}</span>
                  </div>
                  <Link to={theme === 'skincare' ? `/product/${product.id}` : "#"}>
                    <h3 className="font-heading font-bold text-lg leading-tight mb-2 text-black group-hover:text-theme-primary transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-black/50 line-clamp-2 mb-6 font-body">{product.shortDescription || "Luxurious formula enriched with premium ingredients for a flawless finish."}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                      {product.originalPrice && (
                        <span className="text-xs text-black/40 line-through font-bold">₹{product.originalPrice}</span>
                      )}
                      <span className="font-bold text-xl text-theme-primary">₹{product.price}</span>
                    </div>
                    <button 
                      onClick={(e) => { e.preventDefault(); addToCart(product); }}
                      className="w-10 h-10 bg-theme-secondary/30 rounded-full flex items-center justify-center text-theme-primary hover:bg-theme-primary hover:text-white transition-colors duration-300"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* 4. Just Dropped Collection (Horizontal Scroll) */}
      <div className="w-full bg-gradient-to-b from-theme-secondary/10 to-transparent py-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-heading font-bold mb-2">Just Dropped</h2>
            <p className="text-black/60 font-medium">The freshest additions to our luxury lineup.</p>
          </div>
          <div className="flex gap-4 hidden md:flex">
            <button className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-theme-primary hover:text-white hover:border-transparent transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-theme-primary hover:text-white hover:border-transparent transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="w-full overflow-x-auto hide-scrollbar pb-12 pt-4 px-6">
          <div className="flex gap-6 md:gap-10 min-w-max ml-[5vw] lg:ml-[max(5vw,calc((100vw-80rem)/2))] pr-24">
            {justDropped.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group w-[300px] md:w-[400px] bg-white rounded-[2rem] p-4 flex flex-col shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 flex-shrink-0"
              >
                <Link to={theme === 'skincare' ? `/product/${item.id}` : "#"} className="block w-full h-[250px] md:h-[350px] rounded-3xl overflow-hidden mb-6 relative bg-theme-secondary/20">
                  <img loading="lazy" src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <div className="px-4 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <Link to={theme === 'skincare' ? `/product/${item.id}` : "#"}>
                      <h3 className="font-heading font-bold text-lg md:text-xl leading-tight max-w-[80%] hover:text-theme-primary transition-colors">{item.name}</h3>
                    </Link>
                    <div className="flex flex-col items-end">
                      {item.originalPrice && <span className="text-xs text-black/40 line-through font-bold">₹{item.originalPrice}</span>}
                      <span className="font-bold text-lg text-theme-primary">₹{item.price}</span>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => { e.preventDefault(); addToCart(item); }}
                    className="mt-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-black/60 hover:text-theme-primary group-hover:text-theme-primary transition-colors"
                  >
                    Add to Cart <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Featured Launch Banner */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="relative w-full rounded-[3rem] overflow-hidden group h-[500px] md:h-[600px] shadow-2xl">
          <img loading="lazy" src={launchImg} alt="Nature Meets Luxury" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out" />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <span className="text-white uppercase tracking-[0.3em] font-bold text-sm mb-4 drop-shadow-md">Introducing Our Latest Collection</span>
            <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-8 drop-shadow-xl">Nature Meets Luxury</h2>
            <button className="px-10 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-theme-primary hover:text-white transition-colors duration-300 shadow-xl border-none">
              Explore Collection
            </button>
          </div>
        </div>
      </div>

      {/* 6. Selling Fast Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-heading font-bold mb-10 text-center">Selling Fast</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeProducts.slice(4, 7).map((item, idx) => (
            <Link to={theme === 'skincare' ? `/product/${item.id}` : "#"} key={item.id} className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl border border-black/5 flex gap-6 items-center transition-shadow duration-300 group">
              <div className="w-24 h-24 rounded-2xl bg-theme-secondary/20 flex-shrink-0 overflow-hidden relative">
                <img loading="lazy" src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Only {Math.floor(Math.random() * 20) + 5} Left</span>
                </div>
                <h4 className="font-heading font-bold text-lg mb-1 group-hover:text-theme-primary transition-colors">{item.name}</h4>
                <div className="text-theme-primary font-bold text-sm mb-2 flex items-center gap-2">
                  {item.originalPrice && <span className="text-xs text-black/40 line-through">₹{item.originalPrice}</span>}
                  ₹{item.price}
                </div>
                <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    whileInView={{ width: `${65 + (idx * 10)}%` }} 
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-theme-primary"
                  ></motion.div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 7. Coming Soon Showcase & 9. Exclusive Offer (Grid Layout) */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Coming Soon Showcase */}
          <div className="relative rounded-[3rem] overflow-hidden group h-[400px] shadow-2xl">
            <img loading="lazy" src={holoImg} alt="Holographic Collection" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20"></div>
            <div className="absolute inset-0 p-12 flex flex-col justify-center">
              <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase rounded-full w-max mb-6 border border-white/30 shadow-lg">
                Coming Soon
              </span>
              <h3 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 drop-shadow-lg">COSKINn Holographic<br/>Collection</h3>
              <button className="mt-8 px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full w-max hover:bg-theme-primary hover:text-white transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                Notify Me
              </button>
            </div>
          </div>

          {/* Exclusive Offer */}
          <div className="relative rounded-[3rem] overflow-hidden h-[400px] bg-gradient-to-br from-theme-primary to-theme-secondary p-1 shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20"></div>
            <div className="w-full h-full bg-white/10 backdrop-blur-3xl rounded-[2.8rem] flex flex-col items-center justify-center text-center p-12 border border-white/30 relative z-10 overflow-hidden">
              {/* Floating orbs */}
              <motion.div animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-10 -left-10 w-40 h-40 bg-white/30 rounded-full blur-3xl"></motion.div>
              <motion.div animate={{ y: [0, 20, 0], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/30 rounded-full blur-3xl"></motion.div>

              <span className="text-white font-bold uppercase tracking-widest text-sm mb-4 drop-shadow-md">Launch Offer</span>
              <h3 className="text-7xl font-heading font-black text-white mb-2 drop-shadow-xl">15% OFF</h3>
              <p className="text-white text-lg mb-8 font-medium drop-shadow-md">On all New Arrivals</p>
              
              <div className="flex flex-col items-center gap-2">
                <span className="text-white/90 text-xs uppercase tracking-widest font-bold drop-shadow-sm">Use Code</span>
                <div className="px-8 py-4 bg-white/20 border-2 border-dashed border-white rounded-2xl backdrop-blur-sm">
                  <span className="text-2xl font-bold text-white tracking-widest drop-shadow-md">NEW15</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 8. Customer Favorites (Carousel) */}
      <div className="max-w-7xl mx-auto px-6 py-24 border-t border-black/5">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold mb-4">Customer Favorites</h2>
          <p className="text-black/60 font-medium">Highly rated new launches you'll adore.</p>
        </div>
        
        <div className="flex gap-8 overflow-x-auto hide-scrollbar pb-12 snap-x snap-mandatory px-4">
          {activeProducts.slice(1, 6).map((item, idx) => (
            <Link to={theme === 'skincare' ? `/product/${item.id}` : "#"} key={item.id} className="snap-center shrink-0 w-[280px] md:w-[320px] bg-white rounded-3xl p-6 shadow-sm border border-black/5 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center group">
              <div className="w-40 h-40 rounded-full bg-theme-secondary/20 overflow-hidden mb-6 p-4">
                <img loading="lazy" src={item.image} alt="Favorite" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex gap-1 mb-3 text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="w-4 h-4 fill-current" />)}
              </div>
              <h4 className="font-heading font-bold text-lg mb-1 group-hover:text-theme-primary transition-colors">{item.name}</h4>
              <p className="text-sm text-black/50 mb-4">{item.reviews ? `${item.reviews} Reviews` : '500+ Reviews'}</p>
              <div className="font-bold text-theme-primary text-xl mb-4 flex items-center justify-center gap-2">
                {item.originalPrice && <span className="text-xs text-black/40 line-through">₹{item.originalPrice}</span>}
                ₹{item.price}
              </div>
              <button 
                onClick={(e) => { e.preventDefault(); addToCart(item); }}
                className="w-full py-3 bg-black text-white font-bold uppercase tracking-widest text-xs rounded-full group-hover:bg-theme-primary transition-colors"
              >
                Add To Cart
              </button>
            </Link>
          ))}
        </div>
      </div>

      {/* 10. Why You'll Love It */}
      <div className="w-full bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4">Why You'll Love It</h2>
            <p className="text-black/60 font-medium max-w-2xl mx-auto">Our newest launches are formulated with precision, care, and the highest quality ingredients to deliver visible results without compromising on luxury.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {reasons.map((reason, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-theme-secondary/20 flex items-center justify-center text-theme-primary mb-6 group-hover:bg-theme-primary group-hover:text-white transition-colors duration-500 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transform">
                  {reason.icon}
                </div>
                <h4 className="font-bold text-sm text-black group-hover:text-theme-primary transition-colors">{reason.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 11. Newsletter */}
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] p-12 md:p-20 text-center border border-theme-primary/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-theme-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-theme-secondary/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-heading font-bold mb-4">Never Miss a Launch</h2>
            <p className="text-black/60 mb-10 max-w-md mx-auto font-medium">Subscribe to our newsletter for exclusive early access to our newest luxury collections and special offers.</p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-6 py-4 rounded-full bg-white border border-black/10 focus:outline-none focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/20 shadow-sm text-sm transition-all"
                required
              />
              <button 
                type="submit"
                className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-theme-primary transition-colors shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
