import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { cosmeticsProducts } from '../constants/cosmeticsProducts';
import Footer from '../components/common/Footer';
import SEO from '../components/common/SEO';
import { ArrowLeft, ShoppingBag, Plus, Minus, Trash2, Sparkles, Star, Award, Heart } from 'lucide-react';

// Fairytale Cutout Images
import fairyPaletteClean from '../assets/images/fairy_palette_clean.webp';
import fairyBlushClean from '../assets/images/fairy_blush_clean.webp';
import fairyLipstickClean from '../assets/images/fairy_lipstick_clean.webp';
import liftCurlMascara from '../assets/images/lift_curl_mascara.webp';

// Luxury SVG Diamond Ornament
const DiamondOrnament = () => (
  <svg viewBox="0 0 100 100" fill="currentColor" className="w-2.5 h-2.5 text-[#E39BB0] rotate-45 inline-block mx-2">
    <path d="M50 0 L100 50 L50 100 L0 50 Z" />
  </svg>
);

export default function CartPage() {
  const { cart, cartSubtotal, updateQuantity, removeFromCart, addToCart } = useCart();
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 4 Featured Fairytale Products exactly as requested
  const featuredEnchantments = [
    {
      id: 315,
      name: "COSKINn Velvet Blush",
      price: 699,
      originalPrice: 899,
      image: fairyBlushClean,
      slug: "velvet-blush",
      description: "Formulated with custom soft-focus minerals, this creamy flush melts into skin for an ethereal royal glow.",
      rating: 4.9,
      reviews: 142
    },
    {
      id: 301,
      name: "COSKINn Magnetic Lipstick",
      price: 899,
      originalPrice: 1199,
      image: fairyLipstickClean,
      slug: "magnetic-lipstick",
      description: "Rich in fairytale seed oils, this velvet matte finish lipstick clicks shut with a satisfying gold-plated magnetic seal.",
      rating: 4.8,
      reviews: 218
    },
    {
      id: 311,
      name: "COSKINn Eyeshadow Palette",
      price: 1299,
      originalPrice: 1699,
      image: fairyPaletteClean,
      slug: "eyeshadow-palette",
      description: "Nine heavenly pans of glittering stardust metallics and creamy rose petals to illuminate your gaze.",
      rating: 5.0,
      reviews: 305
    },
    {
      id: 312,
      name: "COSKINn Lift & Curl Mascara",
      price: 799,
      originalPrice: 999,
      image: liftCurlMascara,
      slug: "lift-curl-mascara",
      description: "A magical wand designed to separate, lengthen, and lock every lash in place for a starry-eyed gaze.",
      rating: 4.7,
      reviews: 95
    }
  ];

  // Related products below (take first 4 from cosmeticsProducts list excluding featured ones)
  const relatedProducts = cosmeticsProducts
    .filter(p => ![301, 311, 312, 315].includes(p.id))
    .slice(0, 4)
    .map(p => ({
      ...p,
      image: p.image || p.images?.[0] || ''
    }));

  const handleAddFeatured = (product) => {
    // Add to cart context
    addToCart(product, 1);
    
    // Set local success feedback message
    setSuccessMsg(`✓ ${product.name} added to cart successfully!`);
    
    // Auto clear notification after 3.5s
    setTimeout(() => {
      setSuccessMsg(null);
    }, 3500);
  };

  return (
    <div className="min-h-screen w-full bg-[#FFFDFD] text-[#75263F] font-body overflow-x-hidden selection:bg-[#FFC2D1] selection:text-white pt-24 pb-0">
      <SEO title="Your Enchanted Cart | COSKINn" description="Review your fairytale cosmetics collection." />

      {/* Floating Sparkles & Dust in Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#FF8FB1] rounded-full shadow-[0_0_8px_1.5px_#FF8FB1]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.1, 0.7, 0.1]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Top Header & Back Navigation Option */}
        <div className="flex items-center justify-between border-b border-[#FFE5EC] pb-6 mb-10">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2.5 text-xs font-bold tracking-widest text-[#75263F] uppercase hover:text-[#FF0069] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Shop
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-heading font-black text-[#5E1930] flex items-center justify-center gap-3">
              <Sparkles className="w-5 h-5 text-[#FF8FB1]" />
              Enchanted Cart
              <Sparkles className="w-5 h-5 text-[#FF8FB1]" />
            </h1>
            <p className="text-xs font-semibold tracking-wider text-[#C96E8A] mt-1">Review Your Magical Selections</p>
          </div>

          {/* Spacer to center title */}
          <div className="w-20 hidden sm:block"></div>
        </div>

        {/* Success Toast Notification Alert */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#5E1930] text-white px-8 py-4 rounded-full shadow-[0_15px_40px_rgba(94,25,48,0.3)] z-50 flex items-center gap-3 border border-[#E39BB0]/30"
            >
              <Sparkles className="w-4 h-4 text-[#FF8FB1] animate-pulse" />
              <span className="text-xs font-bold tracking-wider uppercase">{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2 Grid: Cart Items List & Checkout Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-2">
            {cart.length === 0 ? (
              <div className="bg-[#FFF8FA]/60 border border-[#FFE0E9] rounded-3xl p-12 text-center shadow-sm">
                <ShoppingBag className="w-16 h-16 text-[#FF8FB1]/40 mx-auto mb-6" />
                <h3 className="text-xl font-heading font-bold text-[#5E1930] mb-3">Your Vanity is Empty</h3>
                <p className="text-sm opacity-70 mb-8 max-w-sm mx-auto">You haven't added any fairytale enchantments to your cart yet. Explore our selections and build your magical collection.</p>
                <Link to="/cosmetics" className="inline-block bg-gradient-to-r from-[#D74D76] to-[#E56B91] text-white px-10 py-4 rounded-full text-xs font-bold tracking-widest uppercase shadow-md hover:shadow-lg hover:scale-[1.02] transition-all">
                  Shop Cosmetics
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {cart.map((item) => (
                  <motion.div 
                    layout
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center justify-between bg-white border border-[#FFE0E9] p-5 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                  >
                    {/* Item details */}
                    <div className="flex items-center gap-6 w-full sm:w-[60%]">
                      <div className="w-20 h-20 bg-[#FFF5F7] rounded-2xl p-2 border border-[#FFF0F4] flex items-center justify-center shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h4 className="font-heading font-black text-[#5E1930] text-lg leading-tight mb-1">{item.name}</h4>
                        <p className="text-xs text-[#C96E8A] font-semibold">COSKINn Brand Premium</p>
                        <div className="text-sm font-bold text-[#FF0069] mt-1">₹{item.price}</div>
                      </div>
                    </div>

                    {/* Quantity controls & Delete */}
                    <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-[40%] mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-[#FFE5EC]">
                      <div className="flex items-center bg-[#FFF5F7] border border-[#FFE0E9] rounded-full p-1.5 gap-3">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-full bg-white text-[#75263F] flex items-center justify-center hover:bg-[#FFEAEF] hover:text-[#FF0069] transition-colors border border-[#FFE0E9]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-full bg-white text-[#75263F] flex items-center justify-center hover:bg-[#FFEAEF] hover:text-[#FF0069] transition-colors border border-[#FFE0E9]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-6">
                        <span className="text-sm font-bold text-[#5E1930]">₹{item.price * item.quantity}</span>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#C96E8A] hover:text-red-500 transition-colors p-2 hover:bg-[#FFF5F7] rounded-full"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Checkout Summary Plaque */}
          <div>
            <div className="bg-gradient-to-b from-[#FFFDFD] to-[#FFF5F7] border border-[#FFE0E9] p-8 rounded-3xl shadow-sm relative overflow-hidden">
              {/* Plaque Background Decor */}
              <div className="absolute top-1 left-1 w-1 h-1 bg-[#EFA8A8]"></div>
              <div className="absolute top-1 right-1 w-1 h-1 bg-[#EFA8A8]"></div>
              <div className="absolute bottom-1 left-1 w-1 h-1 bg-[#EFA8A8]"></div>
              <div className="absolute bottom-1 right-1 w-1 h-1 bg-[#EFA8A8]"></div>

              <h3 className="text-xl font-heading font-black text-[#5E1930] mb-6 flex items-center gap-2 border-b border-[#FFE0E9] pb-4">
                <Sparkles className="w-4 h-4 text-[#FF8FB1]" />
                Summary
              </h3>

              <div className="flex flex-col gap-4 text-sm font-medium mb-6">
                <div className="flex justify-between items-center">
                  <span className="opacity-70">Subtotal</span>
                  <span>₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-70">Royal Shipping</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                <div className="border-t border-[#FFE5EC] pt-4 flex justify-between items-center text-base font-bold text-[#5E1930]">
                  <span>Total Selections</span>
                  <span>₹{cartSubtotal}</span>
                </div>
              </div>

              {cart.length > 0 ? (
                <Link 
                  to="/checkout" 
                  className="w-full py-4 bg-gradient-to-r from-[#D74D76] to-[#E56B91] text-white text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-3 border border-[#F4B4C8]/50 hover:shadow-lg transition-all rounded-full"
                >
                  Proceed to Checkout
                </Link>
              ) : (
                <button 
                  disabled
                  className="w-full py-4 bg-[#75263F]/20 text-[#75263F]/40 text-xs font-bold tracking-widest uppercase rounded-full cursor-not-allowed border border-[#FFE0E9]"
                >
                  Cart is Empty
                </button>
              )}
            </div>
          </div>
        </div>

        {/* =========================================
            3. FEATURED FAIRYTALE SHOWCASE (4 PRODUCTS WITH DESCRIPTION)
            ========================================= */}
        <div className="border-t border-[#FFE5EC] pt-16 mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center gap-2 mb-2 bg-[#FFF5F7] px-4 py-1.5 rounded-full border border-[#FFF0F4]">
              <Sparkles className="w-3.5 h-3.5 text-[#FF8FB1]" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#C96E8A] uppercase">Highly Recommended</span>
            </div>
            <h2 className="text-3xl font-heading font-black text-[#5E1930]">Enchanted Recommendations</h2>
            <p className="text-sm text-[#C96E8A] font-semibold mt-1">Four Essential Fairytale Treasures to complete your vanity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredEnchantments.map((product) => (
              <div 
                key={product.id}
                className="bg-white border border-[#FFE0E9] p-6 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-6 relative overflow-hidden"
              >
                {/* Product Cutout Image */}
                <div className="w-full sm:w-[40%] bg-gradient-to-b from-[#FFF5F7] to-[#FFFDFD] rounded-2xl border border-[#FFF0F4] p-4 flex items-center justify-center relative group min-h-[180px]">
                  <img src={product.image} alt={product.name} className="max-h-[160px] object-contain group-hover:scale-105 transition-transform duration-300" />
                  
                  {/* Small Heart Icon */}
                  <button className="absolute top-3 right-3 p-1.5 bg-white border border-[#FFF0F4] text-[#C96E8A] hover:text-[#FF0069] rounded-full shadow-sm hover:scale-105 transition-all">
                    <Heart className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* About description details */}
                <div className="w-full sm:w-[60%] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-[#C96E8A] font-semibold mb-1">
                      <Star className="w-3 h-3 fill-[#FF8FB1] text-[#FF8FB1]" />
                      <span>{product.rating} ({product.reviews} Reviews)</span>
                    </div>
                    
                    <h3 className="font-heading font-black text-[#5E1930] text-xl leading-snug mb-2">{product.name}</h3>
                    
                    {/* About description */}
                    <p className="text-xs text-[#75263F]/75 leading-relaxed font-medium mb-4">
                      {product.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-lg font-bold text-[#FF0069]">₹{product.price}</span>
                      <span className="text-xs line-through opacity-55">₹{product.originalPrice}</span>
                    </div>

                    <button 
                      onClick={() => handleAddFeatured(product)}
                      className="w-full py-3 bg-[#5E1930] text-white hover:bg-[#FF0069] rounded-full text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================
            4. RELATED PRODUCTS GRID
            ========================================= */}
        <div className="border-t border-[#FFE5EC] pt-16 mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl font-heading font-black text-[#5E1930] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#FF8FB1]" />
                Related Enchantments
              </h2>
              <p className="text-xs text-[#C96E8A] font-semibold mt-1">Discover other signature selections from the COSKINn catalog</p>
            </div>
            
            <Link to="/cosmetics" className="text-xs font-bold tracking-widest text-[#FF0069] uppercase hover:underline flex items-center gap-1.5 mt-4 sm:mt-0">
              View All Products
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white border border-[#FFE0E9] rounded-3xl p-4 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all flex flex-col justify-between relative group"
              >
                <div>
                  <div className="aspect-square bg-[#FFF8FA] rounded-2xl p-3 border border-[#FFF0F4] flex items-center justify-center mb-4 relative overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  
                  <span className="text-[9px] font-bold tracking-wider text-[#C96E8A] uppercase">COSKINn Brand</span>
                  <h4 className="font-heading font-black text-[#5E1930] text-sm line-clamp-2 mt-1 min-h-[40px]">{product.name}</h4>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-bold text-[#FF0069] mb-3">₹{product.price || product.discountPrice}</div>
                  <button 
                    onClick={() => handleAddFeatured(product)}
                    className="w-full py-2 border border-[#FFE0E9] hover:bg-[#FFF5F7] text-[#75263F] rounded-full text-[10px] font-bold tracking-wider uppercase transition-colors"
                  >
                    Quick Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Standard Site Footer */}
      <Footer />
    </div>
  );
}
