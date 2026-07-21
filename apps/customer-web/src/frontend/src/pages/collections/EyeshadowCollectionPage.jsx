import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Sparkles, Moon, Star as StarIcon, Flower } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Footer from '../../components/common/Footer';
import SEO from '../../components/common/SEO';
import { cosmeticsProducts } from '../../constants/cosmeticsProducts';

// Images
import heroCutout from '../../assets/images/eyeshadow_hero_transparent.png';
import featureImg1 from '../../assets/images/cosmetics_after_model.webp';
import featureImg2 from '../../assets/images/cosmetics_floating_palette.webp';
import lookBridal from '../../assets/images/routine_finish_1784312670197.webp';
import lookNude from '../../assets/images/before_makeup_1784312716727.webp';
import lookOffice from '../../assets/images/routine_prime_1784312648965.webp';

// SVG Star for Moonlight Garden
const Star = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
  </svg>
);

const eyeshadowProducts = cosmeticsProducts.filter(p => [341, 342, 343, 344, 345, 346, 347, 348].includes(p.id)).map(p => ({
  ...p,
  shade: p.shade || "12 Fantasy Shades",
  badge: p.id === 341 ? "Bestseller" : p.id === 342 ? "New Arrival" : null,
  isVegan: true,
}));

export default function EyeshadowCollectionPage() {
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

  const handleProductClick = (id) => navigate(`/product/${id}`);
  const handleBuy = (e, product) => { e.preventDefault(); e.stopPropagation(); addToCart(product, 1); };
  const handleWishlist = (e, product) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); };

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-[#FFFDFD] font-sans text-[#75263F] overflow-x-hidden selection:bg-[#FF8FB1] selection:text-white">
      <SEO title="Moonlight Garden Eyeshadow | COSKINn" description="Ethereal glowing palettes inspired by an enchanted moonlight garden." />

      {/* Global Magical Stars */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#FFC2D1]/60"
            style={{ top: Math.random() * 100 + '%', left: Math.random() * 100 + '%' }}
            animate={{ y: [0, -60, 0], opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5], rotate: [0, 180, 360] }}
            transition={{ duration: Math.random() * 6 + 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 5 }}
          >
            <Star className={`w-${Math.floor(Math.random() * 4) + 2} h-${Math.floor(Math.random() * 4) + 2}`} />
          </motion.div>
        ))}
      </div>

      {/* 1. Large Editorial Hero */}
      <section className="relative w-full h-[110vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF0F4] via-[#FFFDFD] to-[#FFFDFD]" />
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-white blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[0%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#FFE0E9]/50 blur-[150px] pointer-events-none" />

        <motion.div style={{ y: yHero, opacity: opacityHero }} className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col-reverse lg:flex-row items-center justify-between">
          
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left pt-10 lg:pt-0">
            <div className="flex items-center gap-3 mb-8 text-[#FF8FB1] border border-[#FFC2D1] py-2 px-6 rounded-full bg-white/50 backdrop-blur-md shadow-sm">
              <Sparkles size={14} />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Chapter II : The Enchanted Bloom</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-heading font-black text-[#75263F] leading-[0.9] tracking-tighter uppercase mb-8">
              Ethereal <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1] italic font-serif tracking-normal">Glow.</span>
            </h1>
            
            <p className="text-[#75263F]/70 text-lg md:text-xl max-w-lg font-medium leading-relaxed mb-12">
              Step into an enchanted garden. Buttery mattes and starlit shimmers designed to create a mesmerizing, romantic gaze.
            </p>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center items-center relative h-[50vh] lg:h-[80vh]">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute w-[80%] h-[80%] bg-gradient-to-tr from-white to-[#FFE0E9] rounded-full blur-[60px] shadow-[0_0_80px_rgba(255,255,255,0.8)] animate-pulse" />
              <img src={heroCutout} alt="Moonlight Garden Palette" className="relative z-10 w-[90%] h-[90%] object-contain object-center drop-shadow-[0_40px_80px_rgba(255,143,177,0.4)] transform hover:scale-105 transition-transform duration-1000" />
            </div>
          </div>

        </motion.div>
      </section>

      {/* 2. Editorial Story Section */}
      <section className="relative py-32 overflow-hidden bg-white/40 backdrop-blur-3xl border-t border-[#FFE0E9]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-20">
            <div className="w-full lg:w-1/2 flex flex-col gap-10 lg:pr-10">
              <h2 className="text-4xl md:text-6xl font-serif italic text-[#75263F] leading-tight">
                "Dusting the eyelids with <span className="text-[#FF8FB1]">starlight</span> and crushed <span className="text-[#FF0069]">petals</span>."
              </h2>
              <div className="w-20 h-[1px] bg-gradient-to-r from-[#FF0069] to-transparent" />
              <p className="text-xl text-[#75263F]/60 leading-relaxed font-light">
                Every shade in the Moonlight Garden collection is formulated with ultra-fine pearl pigments and botanical oils, ensuring a creamy, blendable application that feels like a second skin.
              </p>
            </div>
            
            <motion.div style={{ y: yParallaxSlow }} className="w-full lg:w-1/2">
              <div className="relative aspect-square rounded-full overflow-hidden border-[12px] border-white shadow-[0_30px_60px_rgba(255,143,177,0.2)] p-2 bg-[#FFF0F4]">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img src={featureImg1} alt="Editorial Eye Look" className="w-full h-full object-cover scale-110 hover:scale-100 transition-all duration-[2s]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Featured Products Showcase (Asymmetrical Layout) */}
      <section className="py-32 relative bg-gradient-to-b from-white to-[#FFF0F4]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center mb-24">
            <span className="text-[#FF8FB1] text-xs font-bold tracking-[0.4em] uppercase mb-4">The Bloom Collection</span>
            <h2 className="text-5xl lg:text-7xl font-heading font-black uppercase tracking-widest text-center text-[#75263F]">
              Moonlight <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Palettes</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {eyeshadowProducts.slice(0, 6).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: (idx % 3) * 0.2 }}
                className={`group relative flex flex-col ${idx % 3 === 1 ? 'lg:mt-32' : ''} ${idx % 3 === 2 ? 'lg:-mt-16' : ''}`}
              >
                {/* White Luxury Card */}
                <div className="relative aspect-square rounded-[50px] overflow-hidden bg-white border border-[#FFC2D1]/50 hover:border-[#FF8FB1] transition-all duration-700 shadow-sm hover:shadow-[0_40px_80px_rgba(255,143,177,0.25)] hover:-translate-y-4">
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-6 left-6 z-30 bg-white/90 backdrop-blur-md border border-[#FF8FB1]/30 text-[#FF8FB1] text-[10px] font-bold uppercase tracking-widest py-2 px-4 rounded-full shadow-sm">
                      {product.badge}
                    </div>
                  )}

                  <Link to={`/product/${product.id}`} className="absolute inset-0 z-20 flex items-center justify-center p-12 cursor-pointer bg-gradient-to-tr from-[#FFFDFD] to-[#FFF0F4]">
                    <motion.img whileHover={{ scale: 1.1, rotate: -2 }} transition={{ duration: 0.7 }} src={product.image} alt={product.name} className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(255,143,177,0.3)]" />
                    
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="text-[#75263F] border border-[#FF8FB1] font-bold uppercase tracking-[0.2em] text-xs py-4 px-8 rounded-full bg-white shadow-xl hover:bg-[#FF8FB1] hover:text-white transition-colors">
                        View Shades
                      </span>
                    </div>
                  </Link>

                  {/* Wishlist */}
                  <button onClick={(e) => handleWishlist(e, product)} className="absolute top-6 right-6 z-30 p-3 rounded-full bg-white border border-[#FFC2D1] text-[#75263F] hover:text-[#FF0069] hover:border-[#FF0069] transition-colors shadow-sm">
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-[#FF0069] text-[#FF0069]' : ''}`} />
                  </button>
                </div>

                {/* Details */}
                <div className="pt-8 flex flex-col gap-3 px-4 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF8FB1]">{product.shade}</span>
                  <h3 onClick={() => handleProductClick(product.id)} className="text-2xl font-heading font-black text-[#75263F] uppercase leading-tight cursor-pointer hover:text-[#FF8FB1] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center mt-2 gap-4">
                    <span className="text-2xl font-black text-[#FF0069]">₹{product.price}</span>
                    <button onClick={(e) => handleBuy(e, product)} className="w-10 h-10 rounded-full bg-white border border-[#FFC2D1] flex items-center justify-center hover:bg-[#FF0069] hover:border-[#FF0069] hover:text-white text-[#75263F] transition-colors shadow-sm">
                      <ShoppingBag className="w-4 h-4" />
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
        <motion.h2 style={{ x: yParallaxFast }} className="text-[10rem] lg:text-[16rem] font-serif italic text-[#FFE0E9]/40 whitespace-nowrap select-none">
          Enchanted Garden
        </motion.h2>
        
        <motion.div animate={{ y: [0, -50, 0], rotate: [0, 90, 180] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute left-[15%] top-[10%] text-[#FFC2D1] w-24 h-24 opacity-50">
          <Flower className="w-full h-full" />
        </motion.div>
        
        <motion.div animate={{ y: [0, 60, 0], rotate: [0, -90, -180] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="absolute right-[10%] bottom-[15%] text-[#FF8FB1] w-32 h-32 opacity-30">
          <Flower className="w-full h-full" />
        </motion.div>
      </section>

      {/* 5 & 6. Collection Story & Ingredients Highlight */}
      <section className="py-32 bg-gradient-to-b from-[#FFF0F4] to-[#FFFDFD] relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-20">
          
          <div className="w-full lg:w-1/2 relative min-h-[600px]">
            {/* Layered images for editorial feel */}
            <div className="absolute top-0 left-0 w-3/4 h-[500px] rounded-[40px] overflow-hidden border-8 border-white shadow-[0_20px_50px_rgba(255,143,177,0.2)] z-10">
              <img src={featureImg2} alt="Floating Palette" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-2/3 h-[400px] rounded-full overflow-hidden border-8 border-white shadow-[0_20px_50px_rgba(255,143,177,0.3)] z-20 p-2 bg-[#FFF0F4]">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img src={lookBridal} alt="Bridal Look" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-12 justify-center pt-20 lg:pt-0 lg:pl-10">
            <h2 className="text-4xl md:text-6xl font-heading font-black uppercase text-[#75263F] leading-tight">
              Silky <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Petals.</span>
            </h2>
            <p className="text-lg text-[#75263F]/70 leading-relaxed font-light first-letter:text-7xl first-letter:font-serif first-letter:text-[#FF8FB1] first-letter:mr-3 first-letter:float-left">
              The buttery texture of our eyeshadows is achieved through a slow-baking process, infusing the pigments with hydrating squalane and rosehip oil. The result is a powder that melts into the skin with zero fallout, allowing you to paint your canvas with the softest touch.
            </p>
            
            <div className="flex flex-col gap-6 mt-4">
              <div className="flex items-center gap-6 pb-6 border-b border-[#FFE0E9]">
                <div className="w-12 h-12 rounded-full bg-white border border-[#FFC2D1] flex items-center justify-center shrink-0">
                  <StarIcon className="w-5 h-5 text-[#FF8FB1]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold uppercase tracking-widest text-[#75263F] mb-1">Crushed Pearl</h4>
                  <p className="text-sm text-[#75263F]/60">For a multidimensional, ethereal glow.</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-white border border-[#FFC2D1] flex items-center justify-center shrink-0">
                  <Flower className="w-5 h-5 text-[#FF8FB1]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold uppercase tracking-widest text-[#75263F] mb-1">Rosehip Oil</h4>
                  <p className="text-sm text-[#75263F]/60">Hydrates lids for a smooth, crease-free finish.</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 7. Luxury Gallery (Collage) */}
      <section className="py-24 bg-white border-t border-[#FFE0E9]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <h2 className="text-center text-3xl font-heading font-black uppercase tracking-widest text-[#75263F] mb-16">The Lookbook</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[800px]">
            <div className="md:col-span-5 h-full rounded-[40px] overflow-hidden relative group border border-[#FFE0E9]">
              <img src={lookNude} alt="Nude Look" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-white/10" />
            </div>
            <div className="md:col-span-7 h-full flex flex-col gap-6">
              <div className="h-[60%] rounded-[40px] overflow-hidden relative group border border-[#FFE0E9]">
                <img src={featureImg1} alt="Editorial 2" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
              </div>
              <div className="h-[40%] rounded-[40px] overflow-hidden relative group border border-[#FFE0E9]">
                <img src={lookOffice} alt="Office Look" className="w-full h-full object-cover object-top transition-transform duration-[2s] group-hover:scale-105" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Customer Love (Reviews) */}
      <section className="py-32 bg-[#FFF0F4] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent" />
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 text-center">
          <Moon className="w-12 h-12 text-[#FF8FB1] mx-auto mb-10" />
          <h2 className="text-4xl lg:text-5xl font-serif italic text-[#75263F] mb-12 max-w-4xl mx-auto">"The shimmers apply like liquid metal and the mattes blend themselves. A true masterpiece of cosmetic formulation."</h2>
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#FF0069] bg-white px-6 py-2 rounded-full border border-[#FFC2D1]">Vogue Beauty</span>
        </div>
      </section>

      {/* 9 & 10. Magic CTA & Animated Ending Banner */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-white border-t border-[#FFE0E9]">
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <div className="w-[80vw] h-[80vw] border-[1px] border-[#FFC2D1] rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute w-[60vw] h-[60vw] border-[1px] border-[#FFC2D1] rounded-full animate-[spin_40s_linear_infinite_reverse]" />
        </div>
        
        <div className="relative z-10 text-center flex flex-col items-center">
          <Sparkles className="w-12 h-12 text-[#FF0069] mb-8" />
          <h2 className="text-5xl lg:text-7xl font-heading font-black uppercase tracking-widest text-[#75263F] mb-10 bg-white/50 backdrop-blur-sm p-4 rounded-3xl">
            Bloom <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Forever.</span>
          </h2>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group flex items-center gap-4 bg-[#FF0069] text-white font-bold uppercase tracking-widest text-xs py-5 px-10 rounded-full hover:bg-[#75263F] transition-all duration-300 shadow-[0_10px_30px_rgba(255,0,105,0.3)]">
            Explore All Shades
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
