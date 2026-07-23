import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Sparkles, Star as StarIcon, Droplets } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Footer from '../../components/common/Footer';
import SEO from '../../components/common/SEO';
import { cosmeticsProducts } from '../../constants/cosmeticsProducts';

// Images
import heroImg from '../../assets/images/pocket_perfume.png';
import featureImg1 from '../../assets/images/cat_fragrance_1784312612111.webp';
import featureImg2 from '../../assets/images/cosmetics_why_choose_main_1784222124480.webp';
import lookSpring from '../../assets/images/routine_glow_1784312658823.webp';
import lookEvening from '../../assets/images/cosmetics_editorial_lifestyle_1784222459546.webp';
import lookFresh from '../../assets/images/routine_prime_1784312648965.webp';

// Crystal SVG
const Crystal = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    <path d="M50 0 L80 30 L50 100 L20 30 Z" />
    <path d="M50 0 L80 30 L50 50 L20 30 Z" opacity="0.4" />
    <path d="M50 0 L20 30 L50 50 Z" opacity="0.6" />
  </svg>
);

const perfumeProducts = cosmeticsProducts.filter(p => [309, 371, 372, 373, 374, 375].includes(p.id)).map((p, idx) => ({
  ...p,
  shade: p.shade || p.name.split(" - ")[1] || p.name,
  badge: idx === 0 ? "Bestseller" : null,
  isVegan: true,
}));

export default function PocketPerfumeCollectionPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 200]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const yParallaxFast = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], [0, -150]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleProductClick = (slug) => navigate(`/product/${slug}`);
  const handleBuy = (e, product) => { e.preventDefault(); e.stopPropagation(); addToCart(product, 1); };
  const handleWishlist = (e, product) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); };

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-[#FAFAFA] font-sans text-[#75263F] overflow-x-hidden selection:bg-[#FFC2D1] selection:text-white">
      <SEO title="Crystal Fairy Garden Perfume | COSKINn" description="Exquisite pocket perfumes trapped in crystal prisms." />

      {/* Global Magical Crystals */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#FFC2D1]/40 mix-blend-multiply"
            style={{ top: Math.random() * 100 + '%', left: Math.random() * 100 + '%' }}
            animate={{ 
              y: [0, -80, 0], 
              opacity: [0, 0.6, 0], 
              rotate: [0, 90, 180],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ duration: Math.random() * 8 + 6, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
          >
            <Crystal className={`w-${Math.floor(Math.random() * 6) + 4} h-${Math.floor(Math.random() * 6) + 4}`} />
          </motion.div>
        ))}
      </div>

      {/* 1. Large Editorial Hero */}
      <section className="relative w-full h-[120vh] flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-tr from-[#FFF0F4] via-white to-white">
        {/* Glassmorphism background layers */}
        <div className="absolute top-[-10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-[#FF8FB1]/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#FFE0E9]/30 blur-[120px] pointer-events-none" />
        
        {/* Frosted Glass Overlay on the entire hero background */}
        <div className="absolute inset-0 backdrop-blur-[20px] bg-white/10" />

        <motion.div style={{ y: yHero, opacity: opacityHero }} className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between">
          
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left pt-10 lg:pt-0">
            <div className="flex items-center gap-3 mb-8 text-[#FF8FB1] border border-[#FFC2D1]/50 py-2 px-6 rounded-full bg-white/40 backdrop-blur-xl shadow-[0_10px_30px_rgba(255,143,177,0.1)]">
              <Sparkles size={14} />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Chapter V : The Crystal Garden</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-heading font-black text-[#75263F] leading-[0.9] tracking-tighter uppercase mb-8 relative">
              <span className="relative z-10">Glass</span> <br />
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1] italic font-serif tracking-normal">Symphony.</span>
              
              {/* Glass text effect behind */}
              <span className="absolute top-2 left-2 text-[#FFE0E9] blur-[2px] z-0 select-none">Glass <br /> Symphony.</span>
            </h1>
            
            <p className="text-[#75263F]/70 text-lg md:text-xl max-w-lg font-medium leading-relaxed mb-12">
              Captured memories in a prism of light. Discover our pocket perfumes, designed to travel with you through every enchanting moment.
            </p>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center items-center relative h-[60vh] lg:h-[80vh]">
            <div className="relative w-full h-full flex items-center justify-center">
              
              {/* Massive Glass Aura */}
              <div className="absolute w-[90%] h-[90%] bg-white/40 backdrop-blur-2xl rounded-full border border-white shadow-[0_40px_100px_rgba(255,143,177,0.2)] animate-pulse" />
              
              <img src={heroImg} alt="Pocket Perfume" className="relative z-10 w-[80%] h-auto object-contain object-center drop-shadow-[0_40px_60px_rgba(255,143,177,0.4)]" />
              
              {/* Floating Crystals around hero */}
              <motion.div animate={{ y: [0, -30, 0], rotate: [0, 45, 90] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] right-[20%] text-[#FF8FB1] z-20 w-16 h-16 opacity-70">
                <Crystal className="w-full h-full drop-shadow-lg" />
              </motion.div>
              <motion.div animate={{ y: [0, 40, 0], rotate: [0, -45, -90] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[20%] left-[15%] text-[#FF0069] z-20 w-24 h-24 opacity-50">
                <Crystal className="w-full h-full drop-shadow-lg" />
              </motion.div>
            </div>
          </div>

        </motion.div>
      </section>

      {/* 2. Editorial Story Section */}
      <section className="relative py-32 overflow-hidden bg-white/80 backdrop-blur-3xl border-t border-[#FFE0E9]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div style={{ y: yParallaxSlow }} className="w-full lg:w-5/12 relative">
              <div className="relative aspect-[3/4] overflow-hidden">
                <div className="absolute inset-0 bg-white/30 backdrop-blur-md z-10 border border-white/50 rounded-[40px]" />
                <img src={featureImg1} alt="Perfume Ritual" className="absolute inset-0 w-full h-full object-cover scale-110 hover:scale-100 transition-all duration-[2s] rounded-[40px] z-0" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#FFF0F4]/80 backdrop-blur-xl rounded-full border border-white shadow-[0_20px_40px_rgba(255,143,177,0.2)] z-20 flex items-center justify-center">
                <Droplets className="w-12 h-12 text-[#FF8FB1]" />
              </div>
            </motion.div>
            
            <div className="w-full lg:w-7/12 flex flex-col gap-10 lg:pl-10">
              <h2 className="text-4xl md:text-6xl font-serif italic text-[#75263F] leading-tight">
                "A scent that <span className="text-[#FF8FB1]">lingers</span> like a secret whispered in a <span className="text-[#FF0069]">crystal</span> garden."
              </h2>
              <div className="w-20 h-[1px] bg-gradient-to-r from-[#FF0069] to-transparent" />
              <p className="text-xl text-[#75263F]/60 leading-relaxed font-light">
                Our pocket perfumes are concentrated elixirs designed to rest on the pulse points. Housed in sleek, faceted glass that refracts light, they are as beautiful to behold as they are to wear.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Products Showcase (High-Blur Glass Cards) */}
      <section className="py-32 relative bg-gradient-to-b from-white to-[#FFF0F4]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center mb-32 relative z-10">
            <span className="text-[#FF8FB1] text-xs font-bold tracking-[0.4em] uppercase mb-4 bg-white/50 px-4 py-1 rounded-full backdrop-blur-sm">The Elixirs</span>
            <h2 className="text-5xl lg:text-7xl font-heading font-black uppercase tracking-widest text-center text-[#75263F]">
              Crystal <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Scents</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 relative z-10">
            {perfumeProducts.slice(0, 6).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: (idx % 3) * 0.2 }}
                className={`group relative flex flex-col ${idx % 3 === 1 ? 'lg:mt-32' : ''} ${idx % 3 === 2 ? 'lg:-mt-16' : ''}`}
              >
                {/* High Blur Glassmorphism Card */}
                <div className="relative aspect-[3/4] rounded-[40px] overflow-hidden bg-white/40 backdrop-blur-2xl border border-white/60 hover:border-[#FF8FB1]/50 transition-all duration-700 shadow-[0_20px_50px_rgba(255,143,177,0.1)] hover:shadow-[0_40px_80px_rgba(255,143,177,0.3)] hover:-translate-y-2">
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-6 left-6 z-30 bg-white/80 backdrop-blur-xl border border-white text-[#FF8FB1] text-[10px] font-bold uppercase tracking-widest py-2 px-4 rounded-full shadow-sm">
                      {product.badge}
                    </div>
                  )}

                  <Link to={`/product/${product.slug}`} className="absolute inset-0 z-20 flex items-center justify-center p-12 cursor-pointer bg-gradient-to-tr from-transparent via-white/20 to-white/40">
                    <motion.img whileHover={{ scale: 1.15 }} transition={{ duration: 0.7 }} src={product.image} alt={product.name} className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(255,143,177,0.4)]" />
                    
                    <div className="absolute inset-0 bg-[#FFF0F4]/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="text-[#75263F] border border-white/60 font-bold uppercase tracking-[0.2em] text-xs py-4 px-8 rounded-full bg-white/80 shadow-xl hover:bg-[#FF8FB1] hover:text-white transition-colors">
                        Discover Scent
                      </span>
                    </div>
                  </Link>

                  {/* Wishlist */}
                  <button onClick={(e) => handleWishlist(e, product)} className="absolute top-6 right-6 z-30 p-3 rounded-full bg-white/80 backdrop-blur-xl border border-white text-[#75263F] hover:text-[#FF0069] transition-colors shadow-sm">
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-[#FF0069] text-[#FF0069]' : ''}`} />
                  </button>
                </div>

                {/* Details */}
                <div className="pt-8 flex flex-col gap-3 px-4 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF8FB1]">{product.shade}</span>
                  <h3 onClick={() => handleProductClick(product.slug)} className="text-2xl font-heading font-black text-[#75263F] uppercase leading-tight cursor-pointer hover:text-[#FF8FB1] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center mt-2 gap-4">
                    <span className="text-2xl font-black text-[#FF0069]">₹{product.price}</span>
                    <button onClick={(e) => handleBuy(e, product)} className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-white flex items-center justify-center hover:bg-[#FF0069] hover:text-white text-[#75263F] transition-colors shadow-sm">
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
      <section className="relative h-[40vh] w-full overflow-hidden bg-white/50 backdrop-blur-3xl border-y border-[#FFE0E9] flex items-center justify-center">
        <motion.h2 style={{ x: yParallaxFast }} className="text-[12rem] lg:text-[20rem] font-serif italic text-[#FFE0E9]/30 whitespace-nowrap select-none">
          Crystal Prism
        </motion.h2>
        
        <motion.div animate={{ y: [0, -60, 0], rotate: [0, 90, 180] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute left-[20%] top-[10%] text-[#FFC2D1] w-32 h-32 opacity-50 mix-blend-multiply">
          <Crystal className="w-full h-full" />
        </motion.div>
        
        <motion.div animate={{ y: [0, 80, 0], rotate: [0, -90, -180] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute right-[15%] bottom-[15%] text-[#FF8FB1] w-40 h-40 opacity-30 mix-blend-multiply">
          <Crystal className="w-full h-full" />
        </motion.div>
      </section>

      {/* 5 & 6. Collection Story & Ingredients Highlight */}
      <section className="py-32 bg-[#FFFDFD] relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row-reverse gap-20">
          
          <div className="w-full lg:w-1/2 relative min-h-[600px] flex items-center justify-center">
            {/* Glass Layers */}
            <div className="absolute w-[80%] h-[110%] bg-gradient-to-br from-white/60 to-[#FFF0F4]/40 backdrop-blur-3xl border border-white rounded-[60px] shadow-[0_30px_60px_rgba(255,143,177,0.15)] z-10 rotate-6" />
            <div className="absolute w-[80%] h-[110%] bg-gradient-to-bl from-white/80 to-[#FFE0E9]/30 backdrop-blur-2xl border border-white rounded-[60px] shadow-[0_20px_40px_rgba(255,143,177,0.1)] z-10 -rotate-3" />
            
            <img src={featureImg2} alt="Fragrance Notes" className="relative z-20 w-[90%] h-auto object-cover rounded-[50px] shadow-2xl" />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-12 justify-center pt-20 lg:pt-0 pr-10">
            <h2 className="text-4xl md:text-6xl font-heading font-black uppercase text-[#75263F] leading-tight">
              Liquid <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Memories.</span>
            </h2>
            <p className="text-lg text-[#75263F]/70 leading-relaxed font-light first-letter:text-7xl first-letter:font-serif first-letter:text-[#FF8FB1] first-letter:mr-3 first-letter:float-left">
              Crafted in Grasse, France, our perfumes are a masterclass in concentration. We use an extrait de parfum concentration to ensure that a single spritz from our pocket-sized crystal vessels lasts from the morning dew until the midnight stars.
            </p>
            
            <div className="flex flex-col gap-6 mt-6">
              <div className="flex items-start gap-6 pb-6 border-b border-[#FFE0E9]">
                <div className="w-14 h-14 rounded-full bg-white/50 backdrop-blur-md border border-white flex items-center justify-center shrink-0">
                  <StarIcon className="w-6 h-6 text-[#FF8FB1]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold uppercase tracking-widest text-[#75263F] mb-1">Top Notes</h4>
                  <p className="text-sm text-[#75263F]/60 leading-relaxed">Sparkling citrus and fresh morning florals that awaken the senses immediately upon spraying.</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-white/50 backdrop-blur-md border border-white flex items-center justify-center shrink-0">
                  <Heart className="w-6 h-6 text-[#FF8FB1]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold uppercase tracking-widest text-[#75263F] mb-1">Heart & Base Notes</h4>
                  <p className="text-sm text-[#75263F]/60 leading-relaxed">Deep romantic rose, warm vanilla, and white musk that melt into the skin's natural chemistry.</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 7. Luxury Gallery (Collage) */}
      <section className="py-24 bg-[#FFF0F4] border-t border-[#FFE0E9]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <h2 className="text-center text-3xl font-heading font-black uppercase tracking-widest text-[#75263F] mb-16">The Essence</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[800px]">
            <div className="md:col-span-3 h-full rounded-[40px] overflow-hidden relative group">
              <img src={lookSpring} alt="Spring Mood" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
            </div>
            <div className="md:col-span-5 h-full rounded-[40px] overflow-hidden relative group">
              <img src={lookEvening} alt="Evening Mood" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
            </div>
            <div className="md:col-span-4 h-full rounded-[40px] overflow-hidden relative group">
              <img src={lookFresh} alt="Fresh Mood" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. Customer Love (Reviews) */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 text-center flex flex-col items-center">
          <Crystal className="w-16 h-16 text-[#FFC2D1] mb-10" />
          <h2 className="text-4xl lg:text-6xl font-serif italic text-[#75263F] mb-12 max-w-4xl leading-tight">"A fragrance that doesn't just sit on the skin, it dances with it. The crystal bottle is the ultimate handbag accessory."</h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5 fill-[#FF8FB1] text-[#FF8FB1]" />)}
          </div>
          <span className="text-sm font-bold tracking-[0.3em] uppercase text-[#FF0069]">Marie Claire</span>
        </div>
      </section>

      {/* 9 & 10. Magic CTA & Animated Ending Banner */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#FFF0F4]">
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <div className="w-[60vw] h-[60vw] bg-white rounded-full blur-[100px]" />
        </div>
        
        <div className="relative z-10 text-center flex flex-col items-center p-16">
          <Sparkles className="w-12 h-12 text-[#FF0069] mb-8 animate-pulse" />
          <h2 className="text-6xl lg:text-8xl font-heading font-black uppercase tracking-tighter text-[#75263F] mb-10">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Aura.</span>
          </h2>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group relative bg-white text-[#75263F] border border-white font-bold uppercase tracking-widest text-sm py-5 px-12 rounded-full hover:bg-[#FF0069] hover:border-[#FF0069] hover:text-white transition-all duration-300 shadow-[0_20px_40px_rgba(255,143,177,0.3)]">
             Discover The Collection
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
