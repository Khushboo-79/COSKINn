import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Heart, Star, Star as StarIcon, Share2, Plus, Minus, ArrowLeft, ShieldCheck, Sparkles, Droplets, CheckCircle, Quote, ShoppingBag } from 'lucide-react';
import { cosmeticsProducts } from '../constants/cosmeticsProducts';
import SEO from '../components/common/SEO';
import Footer from '../components/common/Footer';

// Dummy lifestyle imagery for editorial sections
import editorial1 from '../assets/images/cosmetics_after_model.webp';
import editorial2 from '../assets/images/cosmetics_editorial_lifestyle.webp';
import editorial3 from '../assets/images/routine_finish_1784312670197.webp';

export default function CosmeticsProductDetailsPage({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const [mainImage, setMainImage] = useState(product?.images?.[0] || product?.image);
  const [quantity, setQuantity] = useState(1);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setMainImage(product?.images?.[0] || product?.image);
    setQuantity(1);
  }, [product]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setIsStickyVisible(true);
      } else {
        setIsStickyVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBack = () => navigate(-1);

  if (!product) return null;

  const relatedProducts = cosmeticsProducts.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
  const images = product.images || [product.image, product.image, product.image, product.image];

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-[#FFFDFD] font-sans text-[#75263F] selection:bg-[#FF8FB1] selection:text-white relative overflow-x-hidden">
      <SEO title={`${product.name} | COSKINn`} description={product.shortDescription || product.name} />
      
      {/* Global Magical Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] bg-[#FFF0F4] rounded-full blur-[150px] opacity-70" />
        <div className="absolute bottom-[20%] left-[-10%] w-[50vw] h-[50vw] bg-[#FFE0E9]/40 rounded-full blur-[150px]" />
      </div>

      {/* Floating Back Button */}
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={handleBack}
        className="fixed top-24 left-6 lg:left-12 z-50 w-12 h-12 bg-white/60 backdrop-blur-xl rounded-full flex items-center justify-center border border-[#FFC2D1] shadow-lg text-[#75263F] hover:text-[#FF0069] hover:border-[#FF0069] transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
      </motion.button>

      {/* =========================================
          1. IMMERSIVE HERO GALLERY
          ========================================= */}
      <section className="relative w-full min-h-screen pt-20 pb-10 flex items-center bg-gradient-to-b from-[#FFF0F4]/30 to-[#FFFDFD]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
          
          {/* Asymmetrical Gallery */}
          <div className="w-full lg:w-[60%] flex gap-4 h-[70vh] lg:h-[85vh]">
            {/* Thumbnails */}
            <div className="flex flex-col gap-4 w-24 shrink-0 justify-center">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`relative aspect-square rounded-2xl overflow-hidden bg-white border-[2px] transition-all duration-300 shadow-sm ${mainImage === img ? 'border-[#FF0069] scale-110 shadow-[0_10px_20px_rgba(255,0,105,0.2)] z-10' : 'border-[#FFE0E9] hover:border-[#FF8FB1] opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative rounded-[40px] overflow-hidden bg-white border border-[#FFE0E9] shadow-[0_40px_80px_rgba(255,143,177,0.15)] group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={mainImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-contain p-10 transform group-hover:scale-110 transition-transform duration-[2s]"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent,_rgba(255,255,255,0.4))] pointer-events-none" />
            </div>
          </div>

          {/* =========================================
              2. LUXURY PRODUCT INFORMATION
              ========================================= */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center py-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[#FF8FB1] font-bold tracking-[0.3em] uppercase text-[10px] border border-[#FFC2D1] py-1 px-3 rounded-full bg-white shadow-sm">
                  {product.category || 'Luxury Collection'}
                </span>
                <div className="flex items-center gap-1 text-[#FF8FB1]">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-xs font-bold text-[#75263F]">{product.rating || "4.9"} <span className="font-normal opacity-50">({product.reviews || 128})</span></span>
                </div>
              </div>

              <h1 className="text-4xl lg:text-5xl font-heading font-black tracking-tighter text-[#75263F] mb-4 uppercase leading-[0.9]">
                {product.name}
              </h1>

              <p className="text-lg text-[#75263F]/70 leading-relaxed font-light mb-8">
                {product.longDescription || product.shortDescription || "A masterclass in cosmetic formulation. Weightless, intensely pigmented, and designed to wear flawlessly from dawn until dusk."}
              </p>

              <div className="flex items-end gap-4 mb-8">
                <span className="text-4xl font-black text-[#FF0069]">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl font-bold text-[#75263F]/30 line-through mb-1">₹{product.originalPrice}</span>
                )}
              </div>

              <div className="flex flex-col gap-4 mb-8">
                {/* Top Row: Quantity, Buy Now & Wishlist */}
                <div className="flex items-center gap-3 w-full">
                  <div className="flex items-center justify-between border-2 border-[#FFE0E9] rounded-full px-4 w-28 h-12 bg-white shadow-sm shrink-0">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 text-[#75263F]/60 hover:text-[#FF0069] transition-colors"><Minus className="w-4 h-4" /></button>
                    <span className="font-black text-lg text-[#75263F]">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="p-1 text-[#75263F]/60 hover:text-[#FF0069] transition-colors"><Plus className="w-4 h-4" /></button>
                  </div>
                  
                  <button
                    onClick={() => {
                      addToCart(product, quantity);
                      navigate('/checkout');
                    }}
                    className="flex-1 h-12 bg-[#FF0069] text-white rounded-full hover:bg-[#D74D76] flex items-center justify-center font-bold uppercase tracking-widest text-xs transition-all shadow-sm relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    <span className="relative z-10">Buy Now</span>
                  </button>

                  <button
                    onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                    className={`w-12 h-12 border-2 rounded-full flex items-center justify-center transition-all shrink-0 shadow-sm ${isInWishlist(product.id) ? 'border-[#FF0069] bg-[#FF0069] text-white shadow-[0_5px_15px_rgba(255,0,105,0.3)]' : 'border-[#FFE0E9] bg-white hover:border-[#FF0069] hover:text-[#FF0069] text-[#75263F]/50'}`}
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Bottom Row: Full Width Add to Cart */}
                <div className="flex flex-col gap-3 w-full mt-1">
                  <button
                    onClick={handleAddToCart}
                    className="w-full h-12 bg-[#FF8FB1] text-white rounded-full hover:bg-[#FF0069] flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs transition-all shadow-sm relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    <ShoppingBag className="w-4 h-4 relative z-10" /> <span className="relative z-10">Add to Cart</span>
                  </button>
                </div>
                {addedToCart && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0 }}
                    className="text-sm font-bold text-[#FF0069] mt-2 flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" /> Added to your collection successfully!
                  </motion.p>
                )}
              </div>
              
              <div className="flex items-center gap-6 border-t border-[#FFE0E9] pt-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#FF8FB1]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#75263F]">Authentic</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-[#FF8FB1]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#75263F]">Cruelty Free</span>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>



      {/* =========================================
          5. RELATED PRODUCTS
          ========================================= */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-[#FFFDFD] relative border-t border-[#FFE0E9]">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl font-heading font-black uppercase tracking-widest text-[#75263F]">Recommended <span className="text-[#FF8FB1]">For You</span></h2>
              <div className="h-[1px] bg-[#FFE0E9] flex-1 ml-10 hidden md:block" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <Link to={`/product/${p.slug}`} key={p.id} className="group flex flex-col bg-white rounded-[40px] p-8 border border-[#FFE0E9] hover:border-[#FF8FB1] transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(255,143,177,0.15)]">
                  <div className="aspect-square bg-gradient-to-tr from-[#FFFDFD] to-[#FFF0F4] rounded-3xl mb-8 p-6 overflow-hidden relative">
                    <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-xl" />
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#FF8FB1] mb-2 block">{p.category}</span>
                  <h4 className="font-heading font-black text-xl uppercase text-[#75263F] line-clamp-2 mb-4 group-hover:text-[#FF0069] transition-colors">{p.name}</h4>
                  <span className="font-black text-2xl text-[#FF0069] mt-auto">₹{p.price}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}





      {/* =========================================
          3. STICKY ADD TO CART
          ========================================= */}
      <AnimatePresence>
        {isStickyVisible && (
          <motion.div
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 150, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-0 left-0 w-full z-50 p-6 pointer-events-none"
          >
            <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-2xl border-t border-x border-[#FFC2D1] shadow-[0_-20px_50px_rgba(255,143,177,0.2)] rounded-t-[40px] p-4 lg:p-6 flex items-center justify-between pointer-events-auto">
              
              <div className="flex items-center gap-6 hidden sm:flex">
                <div className="w-16 h-16 bg-[#FFF0F4] rounded-2xl p-2 border border-[#FFE0E9]">
                  <img src={mainImage} alt={product.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-black uppercase text-lg text-[#75263F]">{product.name}</span>
                  <div className="flex items-center gap-2">
                     <span className="font-bold text-[#FF0069] text-lg">₹{product.price}</span>
                     {product.originalPrice && <span className="text-sm line-through text-[#75263F]/40">₹{product.originalPrice}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 w-full sm:w-auto">
                <div className="flex items-center justify-between border-2 border-[#FFE0E9] rounded-full px-4 w-32 h-14 bg-white shadow-inner hidden md:flex">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-[#75263F]/60 hover:text-[#FF0069]"><Minus className="w-4 h-4" /></button>
                  <span className="font-black text-lg text-[#75263F]">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="text-[#75263F]/60 hover:text-[#FF0069]"><Plus className="w-4 h-4" /></button>
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 sm:flex-none h-14 px-6 lg:px-8 bg-[#FF8FB1] text-white rounded-full hover:bg-[#FF0069] font-bold uppercase tracking-widest text-xs transition-colors shadow-[0_10px_20px_rgba(255,143,177,0.3)]"
                  >
                    Add To Cart
                  </button>
                  <button
                    onClick={() => {
                      addToCart(product, quantity);
                      navigate('/checkout');
                    }}
                    className="flex-1 sm:flex-none h-14 px-6 lg:px-8 bg-[#75263F] text-white rounded-full hover:bg-[#FF0069] font-bold uppercase tracking-widest text-xs transition-colors shadow-md"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
