import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Sparkles, Star as StarIcon, Brush, CheckCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Footer from '../../components/common/Footer';
import SEO from '../../components/common/SEO';
import { cosmeticsProducts } from '../../constants/cosmeticsProducts';

// Images
import heroImg from '../../assets/images/makeup_brushes.png';
import featureImg1 from '../../assets/images/cat_makeup_brushes.webp';
import featureImg2 from '../../assets/images/cosmetics_after_model.webp';
import lookPro from '../../assets/images/before_makeup_1784312716727.webp';
import lookArtisan from '../../assets/images/cat_eyes_1784312591092.webp';
import lookDetail from '../../assets/images/routine_finish_1784312670197.webp';

// Sparkle SVG
const GoldSparkle = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
  </svg>
);

const brushProducts = cosmeticsProducts.filter(p => [305, 355, 356, 357, 358, 359].includes(p.id)).map((p, idx) => ({
  ...p,
  shade: p.id === 305 ? "6-Piece Set" : p.name.replace("COSKINn ", ""),
  badge: idx === 0 ? "Bestseller" : null,
  isVegan: true,
}));

export default function MakeupBrushSetCollectionPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const yParallaxFast = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleProductClick = (slug) => navigate(`/product/${slug}`);
  const handleBuy = (e, product) => { e.preventDefault(); e.stopPropagation(); addToCart(product, 1); };
  const handleWishlist = (e, product) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); };

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-[#FFFDFD] font-sans text-[#75263F] overflow-x-hidden selection:bg-[#FF8FB1] selection:text-white">
      <SEO title="Luxury Vanity Brushes | COSKINn" description="Professional grade artisanal makeup brushes." />

      {/* Global Magical Sparkles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#FF8FB1]/40 mix-blend-multiply"
            style={{ top: Math.random() * 100 + '%', left: Math.random() * 100 + '%' }}
            animate={{ 
              scale: [0, 1.5, 0], 
              opacity: [0, 0.8, 0], 
              rotate: [0, 90, 180]
            }}
            transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 5 }}
          >
            <GoldSparkle className={`w-${Math.floor(Math.random() * 6) + 2} h-${Math.floor(Math.random() * 6) + 2}`} />
          </motion.div>
        ))}
      </div>

      {/* 1. Large Editorial Hero */}
      <section className="relative w-full h-[120vh] flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-b from-[#FFF0F4] via-[#FFFDFD] to-[#FFFDFD]">
        {/* Studio Lighting Effects */}
        <div className="absolute top-0 right-[20%] w-[40vw] h-[60vh] bg-gradient-to-b from-[#FF8FB1]/20 to-transparent blur-[100px] pointer-events-none transform -skew-x-12" />
        <div className="absolute bottom-0 left-[10%] w-[30vw] h-[50vh] bg-gradient-to-t from-[#FFE0E9]/30 to-transparent blur-[80px] pointer-events-none transform skew-x-12" />

        <motion.div style={{ y: yHero, opacity: opacityHero }} className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between">
          
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left pt-10 lg:pt-0">
            <div className="flex items-center gap-3 mb-8 text-[#FF8FB1] border border-[#FF8FB1]/30 py-2 px-6 rounded-full bg-white/50 backdrop-blur-md shadow-sm">
              <Brush size={14} />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#75263F]">Chapter VI : The Atelier</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-heading font-black text-[#75263F] leading-[0.9] tracking-tighter uppercase mb-8">
              Master <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1] italic font-serif tracking-normal drop-shadow-sm">Strokes.</span>
            </h1>
            
            <p className="text-[#75263F]/70 text-lg md:text-xl max-w-lg font-medium leading-relaxed mb-12">
              Elevate your ritual. Handcrafted artisanal brushes designed to blend seamlessly, turning your daily makeup application into a masterpiece.
            </p>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center items-center relative h-[60vh] lg:h-[80vh]">
            <div className="relative w-full h-full flex items-center justify-center">
              
              {/* Pink Frame Background */}
              <div className="absolute w-[70%] h-[90%] border-[4px] border-[#FFE0E9] bg-gradient-to-tr from-[#FFF0F4] to-white shadow-[0_40px_100px_rgba(255,143,177,0.2)] transform rotate-3 rounded-[40px]" />
              <div className="absolute w-[70%] h-[90%] border border-[#FFC2D1] bg-transparent transform -rotate-2 rounded-[40px]" />
              
              <img src={heroImg} alt="Luxury Brush Set" className="relative z-10 w-[85%] h-auto object-contain object-center drop-shadow-[0_40px_60px_rgba(255,143,177,0.3)]" />
              
              {/* Floating Sparkles around hero */}
              <motion.div animate={{ y: [0, -20, 0], rotate: [0, 90, 180] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[15%] right-[15%] text-[#FF8FB1] z-20 w-12 h-12 opacity-80">
                <GoldSparkle className="w-full h-full drop-shadow-[0_0_15px_rgba(255,143,177,0.5)]" />
              </motion.div>
            </div>
          </div>

        </motion.div>
      </section>

      {/* 2. Editorial Story Section */}
      <section className="relative py-32 overflow-hidden bg-white border-t border-[#FFE0E9]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div style={{ y: yParallaxSlow }} className="w-full lg:w-5/12 relative">
              <div className="relative aspect-[3/4] overflow-hidden border border-[#FFE0E9] rounded-[40px]">
                <img src={featureImg1} alt="Makeup Tools" className="absolute inset-0 w-full h-full object-cover scale-110 hover:scale-100 transition-all duration-[2s] opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
              </div>
            </motion.div>
            
            <div className="w-full lg:w-7/12 flex flex-col gap-10 lg:pl-10">
              <h2 className="text-4xl md:text-6xl font-serif italic text-[#75263F] leading-tight">
                "The <span className="text-[#FF8FB1]">tools</span> of the trade define the <span className="text-[#FF0069]">art</span>."
              </h2>
              <div className="w-20 h-[2px] bg-gradient-to-r from-[#FF0069] to-transparent" />
              <p className="text-xl text-[#75263F]/70 leading-relaxed font-light">
                Every brush in the Atelier collection is hand-tied by master artisans. We believe that applying makeup should feel incredibly luxurious, and that begins with the touch of the brush against your skin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Products Showcase */}
      <section className="py-32 relative bg-gradient-to-b from-[#FFFDFD] to-[#FFF0F4]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center mb-32 relative z-10">
            <span className="text-[#FF8FB1] text-xs font-bold tracking-[0.4em] uppercase mb-4">The Instruments</span>
            <h2 className="text-5xl lg:text-7xl font-heading font-black uppercase tracking-widest text-center text-[#75263F]">
              Studio <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Tools</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 relative z-10">
            {brushProducts.slice(0, 6).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: (idx % 3) * 0.2 }}
                className={`group relative flex flex-col ${idx % 3 === 1 ? 'lg:mt-32' : ''} ${idx % 3 === 2 ? 'lg:-mt-16' : ''}`}
              >
                {/* Soft Pink Luxury Card */}
                <div className="relative aspect-square overflow-hidden bg-white border border-[#FFE0E9] hover:border-[#FF8FB1]/50 transition-all duration-700 shadow-[0_20px_50px_rgba(255,143,177,0.1)] hover:shadow-[0_40px_80px_rgba(255,143,177,0.2)] rounded-[40px]">
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-6 left-6 z-30 bg-white/90 backdrop-blur-xl border border-[#FF8FB1]/30 text-[#FF8FB1] text-[10px] font-bold uppercase tracking-widest py-2 px-4 shadow-sm rounded-full">
                      {product.badge}
                    </div>
                  )}

                  <Link to={`/product/${product.slug}`} className="absolute inset-0 z-20 flex items-center justify-center p-8 cursor-pointer bg-gradient-to-b from-transparent to-[#FFF0F4]/30">
                    <motion.img whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.7 }} src={product.image} alt={product.name} className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(255,143,177,0.3)]" />
                    
                    <div className="absolute inset-0 bg-[#FFF0F4]/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="text-[#75263F] border border-[#FF8FB1] font-bold uppercase tracking-[0.2em] text-xs py-4 px-8 bg-white hover:bg-[#FF8FB1] hover:text-white transition-colors rounded-full shadow-lg">
                        Inspect Detail
                      </span>
                    </div>
                  </Link>

                  {/* Wishlist */}
                  <button onClick={(e) => handleWishlist(e, product)} className="absolute top-6 right-6 z-30 p-3 bg-white/90 backdrop-blur-xl border border-[#FFE0E9] text-[#75263F] hover:text-[#FF0069] hover:border-[#FF0069] transition-colors shadow-sm rounded-full">
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-[#FF0069] text-[#FF0069]' : ''}`} />
                  </button>
                </div>

                {/* Details */}
                <div className="pt-6 flex flex-col gap-3 px-4 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF8FB1]">{product.shade}</span>
                  <h3 onClick={() => handleProductClick(product.slug)} className="text-xl font-heading font-black text-[#75263F] uppercase leading-tight cursor-pointer hover:text-[#FF8FB1] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center mt-2 gap-4">
                    <span className="text-2xl font-light text-[#FF0069]">₹{product.price}</span>
                    <button onClick={(e) => handleBuy(e, product)} className="w-12 h-12 bg-white border border-[#FFE0E9] flex items-center justify-center hover:bg-[#FF8FB1] hover:text-white hover:border-[#FF8FB1] text-[#75263F] transition-colors rounded-full shadow-sm">
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Floating Decorative Elements (Parallax Magic) */}
      <section className="relative h-[40vh] w-full overflow-hidden bg-white border-y border-[#FFE0E9] flex items-center justify-center">
        <motion.h2 style={{ x: yParallaxFast }} className="text-[10rem] lg:text-[16rem] font-serif italic text-[#FFF0F4] whitespace-nowrap select-none">
          Soft Touch
        </motion.h2>
        
        <motion.div animate={{ y: [0, -40, 0], rotate: [0, 90, 180] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute left-[20%] top-[20%] text-[#FF8FB1] w-20 h-20 opacity-30 mix-blend-multiply">
          <GoldSparkle className="w-full h-full" />
        </motion.div>
        
        <motion.div animate={{ y: [0, 60, 0], rotate: [0, -90, -180] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute right-[20%] bottom-[20%] text-[#FF0069] w-24 h-24 opacity-10 mix-blend-multiply">
          <GoldSparkle className="w-full h-full" />
        </motion.div>
      </section>

      {/* 5 & 6. Collection Story & Ingredients Highlight */}
      <section className="py-32 bg-[#FFFDFD] relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row-reverse gap-20">
          
          <div className="w-full lg:w-1/2 relative min-h-[600px] flex items-center justify-center">
            {/* Soft Studio Layout */}
            <div className="absolute w-[90%] h-[100%] border border-[#FFE0E9] shadow-[0_20px_50px_rgba(255,143,177,0.15)] z-10 translate-x-4 translate-y-4 rounded-[40px]" />
            <img src={featureImg2} alt="Studio Routine" className="relative z-20 w-[90%] h-auto object-cover opacity-90 transition-all duration-1000 rounded-[40px]" />
            
            {/* Detail Overlay */}
            <div className="absolute -bottom-8 -left-8 bg-white border border-[#FFE0E9] p-6 shadow-2xl z-30 max-w-[250px] rounded-2xl">
              <p className="text-[10px] font-bold text-[#FF8FB1] uppercase tracking-widest mb-2">Vegan Synthetic</p>
              <p className="text-xs text-[#75263F]/70 leading-relaxed">Mimics the cuticle of natural hair to pick up and distribute powder perfectly without the cruelty.</p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-12 justify-center pt-20 lg:pt-0 pr-10">
            <h2 className="text-4xl md:text-6xl font-heading font-black uppercase text-[#75263F] leading-tight">
              Artisan <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Crafted.</span>
            </h2>
            <p className="text-lg text-[#75263F]/70 leading-relaxed font-light first-letter:text-7xl first-letter:font-serif first-letter:text-[#FF8FB1] first-letter:mr-3 first-letter:float-left">
              Our brushes are assembled by hand using traditional techniques. The ferrules are double-crimped brass, coated in rose-gold toned plating to ensure longevity and a weighted, balanced feel in the hand that professionals demand.
            </p>
            
            <div className="flex flex-col gap-6 mt-6">
              <div className="flex items-start gap-6 pb-6 border-b border-[#FFE0E9]">
                <div className="w-12 h-12 bg-[#FFF0F4] border border-[#FFE0E9] flex items-center justify-center shrink-0 rounded-full">
                  <Brush className="w-5 h-5 text-[#FF8FB1]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold uppercase tracking-widest text-[#75263F] mb-1">Micro-Fine Bristles</h4>
                  <p className="text-sm text-[#75263F]/60 leading-relaxed">Ultra-plush synthetic fibers that will not shed and are gentle on the most sensitive skin.</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-[#FFF0F4] border border-[#FFE0E9] flex items-center justify-center shrink-0 rounded-full">
                  <CheckCircle className="w-5 h-5 text-[#FF8FB1]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold uppercase tracking-widest text-[#75263F] mb-1">Perfectly Balanced</h4>
                  <p className="text-sm text-[#75263F]/60 leading-relaxed">Weighted handles provide extreme control for precise blending and buffing.</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 7. Luxury Gallery (Collage) */}
      <section className="py-24 bg-[#FFF0F4] border-t border-[#FFE0E9]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-3xl font-heading font-black uppercase tracking-widest text-[#75263F]">In The Studio</h2>
            <div className="h-[1px] bg-[#FFC2D1] flex-1 ml-10" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[600px]">
            <div className="md:col-span-4 h-full relative group overflow-hidden rounded-[40px]">
              <img src={lookPro} alt="Pro Look" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
            </div>
            <div className="md:col-span-4 h-full relative group overflow-hidden rounded-[40px]">
              <img src={lookArtisan} alt="Artisan Work" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
            </div>
            <div className="md:col-span-4 h-full relative group overflow-hidden rounded-[40px]">
              <img src={lookDetail} alt="Detail Work" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. Customer Love (Reviews) */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFF0F4] via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 text-center flex flex-col items-center">
          <GoldSparkle className="w-12 h-12 text-[#FF8FB1] mb-10" />
          <h2 className="text-4xl lg:text-5xl font-serif italic text-[#75263F] mb-12 max-w-4xl leading-tight">"These brushes do the work for you. The blending is effortless, and they look absolutely stunning on my vanity."</h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5 fill-[#FF8FB1] text-[#FF8FB1]" />)}
          </div>
          <span className="text-sm font-bold tracking-[0.3em] uppercase text-[#FF0069]">Pro Makeup Artist</span>
        </div>
      </section>

      {/* 9 & 10. Magic CTA & Animated Ending Banner */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#FFF0F4]">
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF8FB1] to-transparent absolute top-1/3" />
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF8FB1] to-transparent absolute bottom-1/3" />
        </div>
        
        <div className="relative z-10 text-center flex flex-col items-center">
          <Brush className="w-12 h-12 text-[#FF0069] mb-8" />
          <h2 className="text-5xl lg:text-7xl font-heading font-black uppercase tracking-widest text-[#75263F] mb-10">
            Paint Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Canvas.</span>
          </h2>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group relative bg-white text-[#75263F] font-bold uppercase tracking-widest text-xs py-5 px-12 hover:bg-[#FF0069] hover:text-white transition-all duration-300 shadow-[0_20px_40px_rgba(255,143,177,0.3)] rounded-full border border-[#FFE0E9]">
             Shop The Atelier
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
