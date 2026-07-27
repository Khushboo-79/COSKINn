import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Star as StarIcon, Crown, Diamond as DiamondIcon, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Footer from '../../components/common/Footer';
import SEO from '../../components/common/SEO';
import { cosmeticsProducts } from '../../constants/cosmeticsProducts';
import { fonts } from '../../constants/theme';

// Images
import lipstickHeroImg from '../../assets/images/magnetic_lipstick_hero_campaign.webp';
import featureImg1 from '../../assets/images/fairy_collection_display.webp';
import featureImg2 from '../../assets/images/premium_fairy_hero_products.webp';
import lookRoyal from '../../assets/images/fairy_set_rosy_daydream.webp';
import lookClassic from '../../assets/images/fairy_set_unicorn_grace.webp';
import lookBold from '../../assets/images/fairy_set_unicorn_treasure.webp';

// Luxury Diamond/Mirror SVG
const Diamond = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    <path d="M50 0 L100 50 L50 100 L0 50 Z" />
  </svg>
);

const lipstickProducts = cosmeticsProducts.filter(p => [301, 311, 312, 313, 314, 315].includes(p.id)).map((p) => ({
  ...p,
  shade: p.shade || p.name.replace("COSKINn Magnetic Lipstick - ", ""),
  badge: p.id === 311 ? "Bestseller" : p.id === 301 ? "New Arrival" : null,
  isVegan: true,
}));

export default function MagneticLipstickCollectionPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const yParallaxFast = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], [0, -150]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleProductClick = (slug) => navigate(`/product/${slug}`);
  const handleBuy = (e, product) => { e.preventDefault(); e.stopPropagation(); addToCart(product, 1); };
  const handleWishlist = (e, product) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); };

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-[#FFFDFD] font-sans text-[#75263F] overflow-x-hidden selection:bg-[#FFC2D1] selection:text-white border-x-[16px] border-[#FFF0F4]">
      <SEO title="Royal Palace Lipstick | COSKINn" description="Intense, luxurious color. The crown jewel for your vanity." />

      {/* Global Magical Diamonds */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#FFC2D1]"
            style={{ top: Math.random() * 100 + '%', left: Math.random() * 100 + '%' }}
            animate={{ y: [0, -100, 0], opacity: [0, 0.8, 0], rotate: [0, 180, 360] }}
            transition={{ duration: Math.random() * 8 + 6, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
          >
            <Diamond className={`w-${Math.floor(Math.random() * 4) + 2} h-${Math.floor(Math.random() * 4) + 2}`} />
          </motion.div>
        ))}
      </div>



      {/* 1. Large Editorial Hero */}
      <section className="relative w-full h-[120vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[#FFFDFD]" />
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#FFE0E9]/60 to-transparent" />
        <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#FF8FB1]/10 blur-[150px] pointer-events-none" />

        <motion.div style={{ y: yHero, opacity: opacityHero }} className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between">
          
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left pt-10 lg:pt-0">
            <div className="flex items-center gap-3 mb-8 text-[#FF8FB1] border border-[#FFC2D1] py-2 px-6 bg-white/70 backdrop-blur-md shadow-sm rounded-full">
              <Crown size={14} className="animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Chapter IV : The Reign</span>
            </div>
            
            <h1 
              className="text-6xl md:text-8xl lg:text-[7rem] font-black text-[#5E1930] leading-[0.9] tracking-tighter mb-8"
              style={{ fontFamily: fonts.cosmetics.heading }}
            >
              Magnetic <br />
              <span className="text-7xl md:text-8xl text-[#D74D76] font-normal italic inline-block mt-3 tracking-normal pl-2">
                Elegance
              </span>
            </h1>
            
            <p className="text-[#75263F]/80 text-lg md:text-xl max-w-lg font-medium leading-relaxed mb-12">
              Crown your lips with rich, one-stroke pigment. A velvety formula encased in a luxurious golden magnetic vessel. Fit for royalty.
            </p>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center items-center relative h-[60vh] lg:h-[80vh]">
            <div className="relative w-full h-full flex items-center justify-center p-4">
              {/* Luxury Mirror Frame */}
              <div className="absolute inset-0 border-[3px] border-[#FFE2EA] rounded-t-full shadow-[0_30px_60px_rgba(255,143,177,0.25)] bg-gradient-to-b from-white/30 to-[#FFF2F5]/40 backdrop-blur-md" />
              <div className="absolute inset-4 border border-[#FFF0F4] rounded-t-full" />
              
              <img src={lipstickHeroImg} alt="Royal Palace Lipstick" className="relative z-10 w-full h-[95%] object-cover object-center rounded-t-full rounded-b-[40px] shadow-2xl scale-[1.01] hover:scale-105 transition-transform duration-[4s]" />
            </div>
          </div>

        </motion.div>
      </section>

            {/* 2. Fairy Story Section (Compact & Magical) */}
      <section className="relative py-16 overflow-hidden bg-gradient-to-b from-[#FFFDFD] to-[#FFF0F4]">
        {/* Magical Background Elements */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#FF8FB1]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-[#FFC2D1]/20 rounded-full blur-[80px] pointer-events-none" />
        
        {/* Sparkles */}
        <Diamond className="absolute top-10 left-10 w-4 h-4 text-[#FFC2D1] animate-pulse" />
        <Sparkles className="absolute bottom-10 right-20 w-5 h-5 text-[#FF8FB1] animate-bounce" />

        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24 bg-white/60 backdrop-blur-xl border border-white p-8 lg:p-12 rounded-3xl shadow-[0_20px_50px_rgba(255,143,177,0.15)] hover:shadow-[0_30px_60px_rgba(255,143,177,0.25)] transition-shadow duration-500">
            
            {/* Fairy Image */}
            <div className="w-full md:w-1/2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF8FB1]/20 to-transparent z-10 pointer-events-none mix-blend-overlay" />
                <img src={featureImg1} alt="Fairy Lipstick Magic" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
              </div>
            </div>
            
            {/* Text Content */}
            <div className="w-full md:w-1/2 flex flex-col gap-6 text-center md:text-left pt-4 md:pt-0 pr-0 lg:pr-12">
              <h2 className="text-4xl md:text-5xl italic text-[#75263F] leading-tight" style={{ fontFamily: fonts.cosmetics.heading }}>
                "A single <span className="text-[#FF8FB1]">stroke</span> of magic. The ultimate expression of <span className="text-[#FF0069]">fairytale beauty</span>."
              </h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-[#FF0069] to-transparent mx-auto md:mx-0" />
              <p className="text-lg text-[#75263F]/80 leading-relaxed font-medium">
                Our Magnetic Lipstick collection is crafted with enchanted elegance. It delivers devastatingly rich color wrapped in a weightless spell, housed in a luxurious golden vessel that seals with a satisfying, magnetic click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Products Showcase (Compact Single Line Layout) */}
      <section className="pt-[2px] pb-16 relative bg-[#FFFDFD]">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-center mb-16">
            <Diamond className="w-8 h-8 text-[#FFC2D1] mb-6 mt-16" />
            <h2 className="text-4xl lg:text-5xl font-black tracking-widest text-center text-[#75263F] mb-6" style={{ fontFamily: fonts.cosmetics.heading }}>
              The Crown <span className="text-[#FF8FB1]">Jewels</span>
            </h2>
            <div className="flex items-center gap-4 w-64">
              <div className="h-[1px] bg-[#FFC2D1] flex-1" />
              <Diamond className="w-3 h-3 text-[#FF0069]" />
              <div className="h-[1px] bg-[#FFC2D1] flex-1" />
            </div>
          </div>

          {/* Cards in a single line (6 columns) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {lipstickProducts.slice(0, 6).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col cursor-pointer overflow-hidden rounded-xl border border-[#FFE0E9] hover:border-[#FF8FB1] shadow-sm hover:shadow-[0_15px_30px_rgba(255,143,177,0.2)] transition-all duration-500"
                onClick={() => handleProductClick(product.slug)}
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] bg-white w-full h-full">
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-2 left-2 z-30 bg-white/90 backdrop-blur-md border border-[#FF8FB1]/30 text-[#FF8FB1] text-[8px] font-bold uppercase tracking-widest py-1 px-2 rounded-sm shadow-sm">
                      {product.badge}
                    </div>
                  )}

                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Wishlist Icon */}
                  <button onClick={(e) => handleWishlist(e, product)} className="absolute top-2 right-2 z-30 p-2 bg-white/80 backdrop-blur-sm rounded-full text-[#75263F] hover:text-[#FF0069] transition-colors shadow-sm">
                    <Heart className={`w-3.5 h-3.5 ${isInWishlist(product.id) ? 'fill-[#FF0069] text-[#FF0069]' : ''}`} />
                  </button>

                  {/* Details Overlay (INSIDE the image at the bottom) */}
                  <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-[#75263F]/90 via-[#75263F]/70 to-transparent z-20 flex flex-col gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 border border-white/30 rounded-sm" style={{ backgroundColor: product.shadeColor || '#FF0069' }} />
                      <span className="text-[8px] font-bold uppercase tracking-widest text-white/80">{product.shade}</span>
                    </div>
                    
                    <h3 className="text-xs font-bold text-white uppercase leading-tight truncate w-full" style={{ fontFamily: fonts.cosmetics.heading }}>
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center justify-between w-full mt-1">
                      <span className="text-sm font-black text-white">₹{product.price}</span>
                      <button onClick={(e) => handleBuy(e, product)} className="w-7 h-7 bg-[#FF0069] flex items-center justify-center hover:bg-white hover:text-[#FF0069] text-white rounded-full transition-colors shadow-md">
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* 5. Magic Formulation Story (Compact & Fairy-like) */}
      <section className="py-16 bg-gradient-to-b from-[#FFFDFD] to-[#FFF0F4] relative overflow-hidden">
        {/* Floating background lights */}
        <div className="absolute top-1/2 left-1/4 w-[50vw] h-[50vw] bg-[#FF8FB1]/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">
          
          <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[480px] rounded-3xl overflow-hidden border-4 border-white shadow-[0_20px_50px_rgba(255,143,177,0.15)] group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#FF8FB1]/30 to-transparent z-10 pointer-events-none mix-blend-overlay" />
            <img src={featureImg2} alt="Macro Lipstick" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            
            {/* Glassmorphism Badge instead of the bulky white box */}
            <div className="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-6 lg:w-[280px] bg-white/60 backdrop-blur-lg border border-white p-5 rounded-2xl shadow-xl z-20 hover:-translate-y-1 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-[#FF0069] mb-2" />
              <p className="text-sm font-bold text-[#75263F] uppercase tracking-widest mb-1" style={{ fontFamily: fonts.cosmetics.heading }}>Magnetic Spell</p>
              <p className="text-xs text-[#75263F]/80 leading-relaxed font-medium">A magical 'click' seals the golden vessel, keeping your color safe.</p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center pt-8 lg:pt-0">
            <div className="flex items-center gap-3 mb-6">
              <Diamond className="w-4 h-4 text-[#FFC2D1] animate-pulse" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#FF8FB1] uppercase">Secret Formula</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl italic text-[#75263F] leading-tight mb-6" style={{ fontFamily: fonts.cosmetics.heading }}>
              Velvet <br /><span className="text-[#FF8FB1]">Command.</span>
            </h2>
            
            <p className="text-base text-[#75263F]/80 leading-relaxed font-medium mb-10">
              The formulation of our Magnetic Lipstick is a closely guarded enchantment. We blend ultra-fine pigments with luxurious botanical nectars to create a true velvet-matte finish that never dries out the lips, ensuring you rule the room with a magical aura.
            </p>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4 p-5 bg-white/40 backdrop-blur-sm rounded-2xl border border-white hover:border-[#FFC2D1] hover:shadow-[0_10px_30px_rgba(255,143,177,0.15)] transition-all duration-300">
                <Sparkles className="w-6 h-6 text-[#FF8FB1] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#75263F] mb-1.5" style={{ fontFamily: fonts.cosmetics.heading }}>One-Stroke Pigment</h4>
                  <p className="text-xs text-[#75263F]/70 leading-relaxed font-medium">Incredible color payoff that doesn't require constant layering or touch-ups.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-white/40 backdrop-blur-sm rounded-2xl border border-white hover:border-[#FFC2D1] hover:shadow-[0_10px_30px_rgba(255,143,177,0.15)] transition-all duration-300">
                <Diamond className="w-6 h-6 text-[#FF8FB1] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#75263F] mb-1.5" style={{ fontFamily: fonts.cosmetics.heading }}>Transfer-Resistant Spell</h4>
                  <p className="text-xs text-[#75263F]/70 leading-relaxed font-medium">Formulated to stay exactly where you put it, from morning dew to evening galas.</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 7. Luxury Gallery (Fairy Collage) */}
      <section className="pt-[2px] pb-20 bg-gradient-to-b from-[#FFF0F4] to-[#FFFDFD] relative overflow-hidden border-b border-[#FFE0E9]">
        
        {/* Floating Sparkles in Background */}
        <div className="absolute top-10 right-20 w-32 h-32 bg-[#FFC2D1]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#FF8FB1]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex items-center justify-center gap-6 mb-12 mt-10">
            <div className="h-[1px] bg-gradient-to-r from-transparent to-[#FF0069] flex-1 hidden md:block" />
            <Sparkles className="w-5 h-5 text-[#FF0069]" />
            <h2 className="text-4xl lg:text-5xl italic text-[#75263F] text-center" style={{ fontFamily: fonts.cosmetics.heading }}>The Royal Court</h2>
            <Diamond className="w-4 h-4 text-[#FF8FB1]" />
            <div className="h-[1px] bg-gradient-to-l from-transparent to-[#FF0069] flex-1 hidden md:block" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[350px] lg:h-[450px]">
            <div className="h-full bg-white/60 backdrop-blur-sm p-4 rounded-3xl border border-white shadow-[0_15px_40px_rgba(255,143,177,0.15)] relative group overflow-hidden hover:-translate-y-2 transition-transform duration-500">
              <div className="absolute inset-4 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#FF8FB1]/10 to-transparent z-10 pointer-events-none" />
                <img src={lookClassic} alt="Fairy Unicorn Grace" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
              </div>
            </div>
            <div className="h-full bg-white/60 backdrop-blur-sm p-4 rounded-3xl border border-white shadow-[0_15px_40px_rgba(255,143,177,0.15)] relative group overflow-hidden hover:-translate-y-2 transition-transform duration-500 md:-translate-y-8">
              <div className="absolute inset-4 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#FFC2D1]/10 to-transparent z-10 pointer-events-none" />
                <img src={lookBold} alt="Fairy Unicorn Treasure" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
              </div>
            </div>
            <div className="h-full bg-white/60 backdrop-blur-sm p-4 rounded-3xl border border-white shadow-[0_15px_40px_rgba(255,143,177,0.15)] relative group overflow-hidden hover:-translate-y-2 transition-transform duration-500">
              <div className="absolute inset-4 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#FF8FB1]/10 to-transparent z-10 pointer-events-none" />
                <img src={lookRoyal} alt="Fairy Rosy Daydream" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
              </div>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
}
