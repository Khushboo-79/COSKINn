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
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[#FF8FB1] font-bold tracking-[0.3em] uppercase text-xs border border-[#FFC2D1] py-1.5 px-4 rounded-full bg-white shadow-sm">
                  {product.category || 'Luxury Collection'}
                </span>
                <div className="flex items-center gap-1 text-[#FF8FB1]">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-bold text-[#75263F]">{product.rating || "4.9"} <span className="font-normal opacity-50">({product.reviews || 128})</span></span>
                </div>
              </div>

              <h1 className="text-5xl lg:text-7xl font-heading font-black tracking-tighter text-[#75263F] mb-6 uppercase leading-[0.9]">
                {product.name}
              </h1>

              <p className="text-xl text-[#75263F]/70 leading-relaxed font-light mb-12">
                {product.longDescription || product.shortDescription || "A masterclass in cosmetic formulation. Weightless, intensely pigmented, and designed to wear flawlessly from dawn until dusk."}
              </p>

              <div className="flex items-end gap-6 mb-12">
                <span className="text-5xl font-black text-[#FF0069]">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-2xl font-bold text-[#75263F]/30 line-through mb-1">₹{product.originalPrice}</span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-6 mb-10">
                <div className="flex items-center justify-between border-2 border-[#FFE0E9] rounded-full px-6 w-40 h-16 bg-white shadow-sm">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-[#75263F]/60 hover:text-[#FF0069] transition-colors"><Minus className="w-5 h-5" /></button>
                  <span className="font-black text-xl text-[#75263F]">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-[#75263F]/60 hover:text-[#FF0069] transition-colors"><Plus className="w-5 h-5" /></button>
                </div>

                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 h-16 bg-[#FF8FB1] text-white rounded-full hover:bg-[#FF0069] flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-sm transition-all shadow-[0_20px_40px_rgba(255,143,177,0.3)] relative overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <ShoppingBag className="w-5 h-5 relative z-10" /> <span className="relative z-10">Add to Collection</span>
                </button>
                
                <button
                  onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                  className={`w-16 h-16 border-2 rounded-full flex items-center justify-center transition-all shrink-0 shadow-sm ${isInWishlist(product.id) ? 'border-[#FF0069] bg-[#FF0069] text-white shadow-[0_10px_20px_rgba(255,0,105,0.3)]' : 'border-[#FFE0E9] bg-white hover:border-[#FF0069] hover:text-[#FF0069] text-[#75263F]/50'}`}
                >
                  <Heart className={`w-6 h-6 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
              
              <div className="flex items-center gap-8 border-t border-[#FFE0E9] pt-8">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-[#FF8FB1]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#75263F]">Authentic</span>
                </div>
                <div className="flex items-center gap-3">
                  <Droplets className="w-6 h-6 text-[#FF8FB1]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#75263F]">Cruelty Free</span>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================
          4. DEEP DIVE STORY SECTION
          ========================================= */}
      <section className="py-32 bg-white relative overflow-hidden border-t border-[#FFE0E9]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div style={{ y: yParallax }} className="w-full lg:w-1/2">
              <div className="relative aspect-[4/5] rounded-[60px] overflow-hidden shadow-[0_40px_80px_rgba(255,143,177,0.15)] border border-[#FFE0E9]">
                <img src={editorial1} alt="Editorial Inspiration" className="absolute inset-0 w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-[3s]" />
              </div>
            </motion.div>
            
            <div className="w-full lg:w-1/2 flex flex-col gap-10">
              <h2 className="text-sm font-bold tracking-[0.4em] uppercase text-[#FF8FB1]">The Inspiration</h2>
              <h3 className="text-4xl md:text-6xl font-serif italic text-[#75263F] leading-tight">
                "Born from the <span className="text-[#FF0069]">desire</span> to capture <span className="text-[#FF8FB1]">light</span> itself."
              </h3>
              <div className="w-20 h-[1px] bg-gradient-to-r from-[#FF0069] to-transparent" />
              <p className="text-xl text-[#75263F]/70 leading-relaxed font-light">
                Every product in the COSKINn collection is designed with a singular purpose: to elevate your natural beauty without masking it. We spent years perfecting this formula in our Parisian ateliers to ensure it feels as luxurious as it looks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          5. BENEFITS & INGREDIENTS (EDITORIAL)
          ========================================= */}
      <section className="py-32 bg-[#FFF0F4] relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          <div className="text-center mb-24">
            <Sparkles className="w-12 h-12 text-[#FF8FB1] mx-auto mb-6" />
            <h2 className="text-5xl lg:text-7xl font-heading font-black uppercase tracking-widest text-[#75263F]">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Anatomy</span>
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-16">
            <div className="w-full lg:w-1/2 bg-white rounded-[50px] p-12 lg:p-16 shadow-[0_20px_50px_rgba(255,143,177,0.1)] border border-[#FFE0E9]">
              <h3 className="text-2xl font-serif italic text-[#75263F] mb-10 pb-6 border-b border-[#FFE0E9]">Why You'll Love It</h3>
              <div className="flex flex-col gap-8">
                {product.benefits?.map((benefit, idx) => (
                  <div key={idx} className="flex gap-6 items-start">
                    <CheckCircle className="w-6 h-6 text-[#FF0069] shrink-0 mt-1" />
                    <p className="text-lg text-[#75263F]/80 font-light leading-relaxed">{benefit}</p>
                  </div>
                )) || (
                  <>
                    <div className="flex gap-6 items-start">
                      <CheckCircle className="w-6 h-6 text-[#FF0069] shrink-0 mt-1" />
                      <p className="text-lg text-[#75263F]/80 font-light leading-relaxed">Luxurious, weightless texture that feels like a second skin.</p>
                    </div>
                    <div className="flex gap-6 items-start">
                      <CheckCircle className="w-6 h-6 text-[#FF0069] shrink-0 mt-1" />
                      <p className="text-lg text-[#75263F]/80 font-light leading-relaxed">Formulated to resist fading, creasing, or smudging for 12+ hours.</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="w-full lg:w-1/2 bg-[#FF8FB1] rounded-[50px] p-12 lg:p-16 shadow-[0_20px_50px_rgba(255,143,177,0.3)] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[50px]" />
              <h3 className="text-2xl font-serif italic text-white mb-10 pb-6 border-b border-white/30">The Elixir Inside</h3>
              <div className="flex flex-col gap-10">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0 bg-white/5">
                    <span className="font-serif italic text-xl">1</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold uppercase tracking-widest text-[#FF8FB1] mb-2">Key Actives</h4>
                    <p className="text-lg text-white/70 font-light leading-relaxed">
                      {product.keyIngredients?.join(", ") || "Infused with botanical extracts, hyaluronic acid, and crushed pearl."}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0 bg-white/5">
                    <span className="font-serif italic text-xl">2</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold uppercase tracking-widest text-[#FF8FB1] mb-2">Formulated Without</h4>
                    <p className="text-lg text-white/70 font-light leading-relaxed">
                      Parabens, Phthalates, Sulfates, or any animal-derived ingredients.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* =========================================
          6. HOW TO USE (THE RITUAL)
          ========================================= */}
      <section className="py-32 bg-white relative border-t border-[#FFE0E9]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row-reverse items-center gap-20">
          <div className="w-full lg:w-1/2 relative h-[700px] rounded-[60px] overflow-hidden">
             <img src={editorial3} alt="The Ritual" className="absolute inset-0 w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[3s]" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#FF8FB1]/60 to-transparent" />
             <div className="absolute bottom-12 left-12 text-white drop-shadow-md">
                <span className="text-xs font-bold tracking-[0.4em] uppercase mb-2 block">Step 01</span>
                <p className="text-2xl font-serif italic">The Perfect Canvas</p>
             </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-sm font-bold tracking-[0.4em] uppercase text-[#FF8FB1] mb-6">The Ritual</h2>
            <h3 className="text-5xl md:text-7xl font-heading font-black uppercase text-[#75263F] leading-tight mb-12">
              Application <br /> <span className="text-[#FF8FB1]">Mastery.</span>
            </h3>
            
            <div className="text-2xl text-[#75263F]/70 font-serif italic leading-relaxed whitespace-pre-line border-l-4 border-[#FF0069] pl-8">
              {Array.isArray(product.howToUse) ? (
                <div className="flex flex-col gap-4">
                  {product.howToUse.map((step, idx) => (
                    <div key={idx}>
                      <strong className="text-[#FF0069] font-sans text-xl not-italic uppercase tracking-wider">{step.title}:</strong> {step.desc}
                    </div>
                  ))}
                </div>
              ) : (
                <p>{product.howToUse || "Apply gently to desired areas. Blend outwards with a soft brush or fingertips for a diffused, romantic finish. Layer to build intensity."}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          8. LUXURY REVIEWS
          ========================================= */}
      <section className="py-32 bg-[#1A0A11] text-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center relative z-10">
          <Quote className="w-16 h-16 text-[#FF0069] mx-auto mb-10 opacity-50" />
          <h2 className="text-4xl lg:text-6xl font-serif italic leading-tight max-w-5xl mx-auto mb-12">
            "A revelation in texture and pigment. It elevates the daily routine into an absolute luxury experience."
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-6 h-6 fill-[#FF8FB1] text-[#FF8FB1]" />)}
          </div>
          <p className="text-sm font-bold tracking-[0.4em] uppercase text-white/50">Vogue Beauty Editor</p>
        </div>
      </section>

      {/* =========================================
          7. MAGAZINE STYLE RELATED PRODUCTS
          ========================================= */}
      {relatedProducts.length > 0 && (
        <section className="py-32 bg-[#FFFDFD] relative">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between mb-16">
              <h2 className="text-4xl font-heading font-black uppercase tracking-widest text-[#75263F]">Complete The <span className="text-[#FF8FB1]">Look</span></h2>
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
                
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 sm:flex-none h-14 px-10 bg-[#FF8FB1] text-white rounded-full hover:bg-[#FF0069] font-bold uppercase tracking-widest text-xs transition-colors shadow-[0_10px_20px_rgba(255,143,177,0.3)]"
                >
                  Add To Collection
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
