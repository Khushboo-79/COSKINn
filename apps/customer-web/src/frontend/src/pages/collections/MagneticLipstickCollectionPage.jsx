import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Star as StarIcon, Crown, Diamond as DiamondIcon, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Footer from '../../components/common/Footer';
import SEO from '../../components/common/SEO';
import { cosmeticsProducts } from '../../constants/cosmeticsProducts';

// Images
import lipstickHeroImg from '../../assets/images/magnetic_lipstick_hero_campaign.webp';
import featureImg1 from '../../assets/images/cosmetics_after_model.webp';
import featureImg2 from '../../assets/images/cat_magnetic_lipstick.webp';
import lookRoyal from '../../assets/images/cosmetics_before_model.webp';
import lookClassic from '../../assets/images/routine_finish_1784312670197.webp';
import lookBold from '../../assets/images/cat_eyes_1784312591092.webp';

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

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Great+Vibes&display=swap');
        .font-playfair {
          font-family: 'Playfair Display', serif !important;
        }
        .font-cursive {
          font-family: 'Great Vibes', cursive !important;
        }
      `}</style>

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
            
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-heading font-black text-[#5E1930] leading-[0.9] tracking-tighter uppercase mb-8 font-playfair">
              Magnetic <br />
              <span className="font-cursive text-7xl md:text-8xl text-[#D74D76] font-normal italic inline-block mt-3 normal-case tracking-normal pl-2">
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

            {/* 2. Editorial Story Section */}
      <section className="relative py-32 overflow-hidden bg-white border-t border-[#FFE0E9]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-20">
            <motion.div style={{ y: yParallaxSlow }} className="w-full lg:w-1/2">
              <div className="relative aspect-[3/4] bg-[#FFF0F4] p-4 shadow-[0_40px_80px_rgba(255,143,177,0.2)] transform rotate-2 hover:rotate-0 transition-transform duration-1000 border border-[#FFC2D1]">
                <img src={featureImg1} alt="Editorial Lipstick Look" className="w-full h-full object-cover scale-105 hover:scale-100 transition-all duration-[2s]" />
              </div>
            </motion.div>
            
            <div className="w-full lg:w-1/2 flex flex-col gap-10">
              <h2 className="text-4xl md:text-6xl font-serif italic text-[#75263F] leading-tight">
                "A single <span className="text-[#FF8FB1]">stroke</span> of power. The ultimate expression of <span className="text-[#FF0069]">luxury</span>."
              </h2>
              <div className="w-20 h-1 bg-[#FF0069]" />
              <p className="text-xl text-[#75263F]/70 leading-relaxed font-light">
                Our Magnetic Lipstick collection redefines the matte experience. It delivers devastatingly rich color without sacrificing comfort, all housed in a beautifully weighted case that closes with a satisfying, magnetic click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Products Showcase (Asymmetrical Layout) */}
      <section className="py-32 relative bg-[#FFFDFD]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center mb-32">
            <Diamond className="w-8 h-8 text-[#FFC2D1] mb-6" />
            <h2 className="text-5xl lg:text-7xl font-heading font-black uppercase tracking-widest text-center text-[#75263F] mb-6">
              The Crown <span className="text-[#FF8FB1]">Jewels</span>
            </h2>
            <div className="flex items-center gap-4 w-64">
              <div className="h-[1px] bg-[#FFC2D1] flex-1" />
              <Diamond className="w-3 h-3 text-[#FF0069]" />
              <div className="h-[1px] bg-[#FFC2D1] flex-1" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {lipstickProducts.slice(0, 6).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: (idx % 3) * 0.2 }}
                className={`group relative flex flex-col ${idx % 3 === 1 ? 'lg:mt-32' : ''} ${idx % 3 === 2 ? 'lg:-mt-16' : ''}`}
              >
                {/* Royal Structured Card */}
                <div className="relative aspect-[4/5] bg-white border border-[#FFE0E9] hover:border-[#FF8FB1] transition-all duration-700 shadow-sm hover:shadow-[0_40px_80px_rgba(255,143,177,0.2)]">
                  
                  {/* Decorative Corner Accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#FFC2D1] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#FFC2D1] opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-30 bg-white/90 backdrop-blur-md border border-[#FF8FB1]/30 text-[#FF8FB1] text-[10px] font-bold uppercase tracking-widest py-2 px-4 shadow-sm">
                      {product.badge}
                    </div>
                  )}

                  <Link to={`/product/${product.slug}`} className="absolute inset-0 z-20 flex items-center justify-center p-8 cursor-pointer bg-[#FFFDFD]">
                    <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.7 }} src={product.image} alt={product.name} className="w-full h-full object-cover drop-shadow-[0_10px_20px_rgba(255,143,177,0.2)]" />
                    
                    <div className="absolute inset-0 bg-[#FFE0E9]/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="text-white border border-white font-bold uppercase tracking-[0.2em] text-xs py-4 px-8 bg-[#75263F] shadow-xl hover:bg-[#FF0069] transition-colors">
                        View Reign
                      </span>
                    </div>
                  </Link>

                  {/* Wishlist */}
                  <button onClick={(e) => handleWishlist(e, product)} className="absolute top-4 right-4 z-30 p-3 bg-white border border-[#FFC2D1] text-[#75263F] hover:text-[#FF0069] transition-colors shadow-sm">
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-[#FF0069] text-[#FF0069]' : ''}`} />
                  </button>
                </div>

                {/* Details */}
                <div className="pt-6 flex flex-col gap-3 px-4 text-center border-t-4 border-[#FFF0F4] mt-2">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 border border-black/10 rounded-sm" style={{ backgroundColor: product.shadeColor || '#FF0069' }} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF8FB1]">{product.shade}</span>
                  </div>
                  <h3 onClick={() => handleProductClick(product.slug)} className="text-2xl font-heading font-black text-[#75263F] uppercase leading-tight cursor-pointer hover:text-[#FF8FB1] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center mt-2 gap-4">
                    <span className="text-2xl font-black text-[#FF0069]">₹{product.price}</span>
                    <button onClick={(e) => handleBuy(e, product)} className="w-12 h-12 bg-[#75263F] flex items-center justify-center hover:bg-[#FF0069] text-white transition-colors shadow-md">
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
      <section className="relative h-[40vh] w-full overflow-hidden bg-[#FFF0F4] border-y border-[#FFE0E9] flex items-center justify-center">
        <motion.h2 style={{ x: yParallaxFast }} className="text-[10rem] lg:text-[18rem] font-serif italic text-white whitespace-nowrap select-none">
          Royal Decree
        </motion.h2>
        
        <motion.div animate={{ y: [0, -60, 0], rotate: [0, 45, 90] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute left-[20%] top-[10%] text-[#FFC2D1] w-24 h-24 opacity-60">
          <Diamond className="w-full h-full" />
        </motion.div>
        
        <motion.div animate={{ y: [0, 80, 0], rotate: [0, -45, -90] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="absolute right-[15%] bottom-[15%] text-[#FF8FB1] w-32 h-32 opacity-40">
          <Diamond className="w-full h-full" />
        </motion.div>
      </section>

      {/* 5 & 6. Collection Story & Ingredients Highlight */}
      <section className="py-32 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-20">
          
          <div className="w-full lg:w-1/2 relative min-h-[700px]">
            {/* Layered framing for regal feel */}
            <div className="absolute inset-4 border-2 border-[#FFE0E9] z-20 pointer-events-none" />
            <div className="absolute inset-0 bg-[#FFF0F4] p-4 shadow-[0_20px_50px_rgba(255,143,177,0.15)] z-10">
              <img src={featureImg2} alt="Macro Lipstick" className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[2s]" />
            </div>
            
            <div className="absolute -bottom-10 -right-10 w-[300px] bg-white border border-[#FFC2D1] p-8 shadow-[0_30px_60px_rgba(255,143,177,0.2)] z-30">
              <Crown className="w-8 h-8 text-[#FF8FB1] mb-4" />
              <p className="text-sm font-bold text-[#75263F] uppercase tracking-widest mb-2">Magnetic Closure</p>
              <p className="text-xs text-[#75263F]/70 leading-relaxed font-medium">A deeply satisfying 'click' ensures your lipstick remains safe in your purse.</p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-12 justify-center pt-20 lg:pt-0 lg:pl-10">
            <h2 className="text-4xl md:text-6xl font-heading font-black uppercase text-[#75263F] leading-tight">
              Velvet <br /><span className="text-[#FF8FB1]">Command.</span>
            </h2>
            <p className="text-lg text-[#75263F]/70 leading-relaxed font-light first-letter:text-7xl first-letter:font-serif first-letter:text-[#FF8FB1] first-letter:mr-3 first-letter:float-left">
              The formulation of our Magnetic Lipstick is a closely guarded secret. We blend ultra-fine pigments with luxurious botanical oils to create a true velvet-matte finish that never dries out the lips, ensuring you rule the room with confidence.
            </p>
            
            <div className="flex flex-col gap-6 mt-6">
              <div className="flex items-start gap-6 pb-6 border-b border-[#FFE0E9]">
                <DiamondIcon className="w-8 h-8 text-[#FF8FB1] shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold uppercase tracking-widest text-[#75263F] mb-1">One-Stroke Pigment</h4>
                  <p className="text-sm text-[#75263F]/60 leading-relaxed">Incredible color payoff that doesn't require constant layering or touch-ups.</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <CheckCircle className="w-8 h-8 text-[#FF8FB1] shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold uppercase tracking-widest text-[#75263F] mb-1">Transfer-Resistant</h4>
                  <p className="text-sm text-[#75263F]/60 leading-relaxed">Formulated to stay exactly where you put it, from morning tea to evening galas.</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 7. Luxury Gallery (Collage) */}
      <section className="py-24 bg-[#FFF0F4] border-y border-[#FFE0E9]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-3xl font-heading font-black uppercase tracking-widest text-[#75263F]">The Royal Court</h2>
            <div className="h-[1px] bg-[#FFC2D1] flex-1 ml-10 hidden md:block" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[700px]">
            <div className="h-full bg-white p-3 shadow-[0_20px_40px_rgba(255,143,177,0.1)] relative group">
              <img src={lookClassic} alt="Classic Look" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
            </div>
            <div className="h-full bg-white p-3 shadow-[0_20px_40px_rgba(255,143,177,0.1)] relative group">
              <img src={lookBold} alt="Bold Look" className="w-full h-full object-cover object-top transition-transform duration-[2s] group-hover:scale-105" />
            </div>
            <div className="h-full bg-white p-3 shadow-[0_20px_40px_rgba(255,143,177,0.1)] relative group">
              <img src={lookRoyal} alt="Royal Look" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. Customer Love (Reviews) */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 text-center flex flex-col items-center">
          <Crown className="w-16 h-16 text-[#FFC2D1] mb-10" />
          <h2 className="text-4xl lg:text-6xl font-serif italic text-[#75263F] mb-12 max-w-4xl leading-tight">"It feels like wearing nothing at all, yet the color is devastatingly rich. The magnetic click is purely addictive."</h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5 fill-[#75263F] text-[#75263F]" />)}
          </div>
          <span className="text-sm font-bold tracking-[0.3em] uppercase text-[#FF8FB1]">Allure Beauty Expert</span>
        </div>
      </section>

      {/* 9 & 10. Magic CTA & Animated Ending Banner */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-[#FFF0F4]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] border-[2px] border-[#FFC2D1] rounded-full animate-[spin_80s_linear_infinite]" />
        </div>
        
        <div className="relative z-10 text-center flex flex-col items-center border-[4px] border-[#FFE0E9] bg-white/50 backdrop-blur-md p-16 lg:p-24 shadow-[0_40px_80px_rgba(255,143,177,0.2)]">
          <DiamondIcon className="w-10 h-10 text-[#FF0069] mb-8" />
          <h2 className="text-5xl lg:text-7xl font-heading font-black uppercase tracking-widest text-[#75263F] mb-10">
            Claim Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Crown.</span>
          </h2>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group relative bg-[#75263F] text-white font-bold uppercase tracking-widest text-sm py-5 px-12 hover:bg-[#FF0069] transition-all duration-300 shadow-xl overflow-hidden">
             <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
             <span className="relative z-10">Explore Collection</span>
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
