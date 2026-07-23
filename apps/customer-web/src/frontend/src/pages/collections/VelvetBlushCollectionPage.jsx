import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Sparkles, Star as StarIcon, Flower, HeartHandshake } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Footer from '../../components/common/Footer';
import SEO from '../../components/common/SEO';
import { cosmeticsProducts } from '../../constants/cosmeticsProducts';

// Images
import heroImg from '../../assets/images/velvet_blush.png'; 
import featureImg1 from '../../assets/images/cat_blush_model.webp';
import featureImg2 from '../../assets/images/cosmetics_why_choose_main_new.webp';
import lookPrincess from '../../assets/images/routine_finish_1784312670197.webp';
import lookDay from '../../assets/images/routine_prime_1784312648965.webp';
import lookSoft from '../../assets/images/cosmetics_after_model.webp';

// Cherry Blossom Petal SVG
const Petal = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    <path d="M50 10 C 20 10, 0 40, 20 70 C 40 100, 50 100, 50 90 C 50 100, 60 100, 80 70 C 100 40, 80 10, 50 10 Z" />
  </svg>
);

const velvetBlushProducts = cosmeticsProducts.filter(p => [302, 351, 352, 353].includes(p.id)).map((p, idx) => ({
  ...p,
  shade: p.shade || p.name.replace("COSKINn Velvet Blush - ", ""),
  badge: idx === 0 ? "Bestseller" : idx === 3 ? "Limited Edition" : null,
  isVegan: true,
}));

export default function VelvetBlushCollectionPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 250]);
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
    <div ref={containerRef} className="min-h-screen w-full bg-[#FFFDFD] font-sans text-[#75263F] overflow-x-hidden selection:bg-[#FF8FB1] selection:text-white">
      <SEO title="Cherry Blossom Princess Blush | COSKINn" description="Soft, romantic velvet blush inspired by falling cherry blossoms." />

      {/* Global Magical Petals */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#FFC2D1]/50"
            style={{ top: '-10%', left: Math.random() * 100 + '%' }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, Math.random() * 150 - 75, Math.random() * 150 - 75],
              rotate: [0, 180, 360],
              opacity: [0, 0.7, 0],
            }}
            transition={{ duration: Math.random() * 10 + 12, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
          >
            <Petal className={`w-${Math.floor(Math.random() * 5) + 3} h-${Math.floor(Math.random() * 5) + 3} drop-shadow-sm`} />
          </motion.div>
        ))}
      </div>

      {/* 1. Large Editorial Hero */}
      <section className="relative w-full h-[120vh] flex items-center justify-center overflow-hidden pt-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FFF0F4] via-[#FFFDFD] to-[#FFFDFD]">
        <div className="absolute top-[20%] right-[5%] w-[50vw] h-[50vw] rounded-full bg-[#FF8FB1]/10 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[5%] w-[60vw] h-[60vw] rounded-full bg-[#FFE0E9]/30 blur-[150px] pointer-events-none" />

        <motion.div style={{ y: yHero, opacity: opacityHero }} className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between">
          
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left pt-10 lg:pt-0">
            <div className="flex items-center gap-3 mb-8 text-[#FF8FB1] border border-[#FFC2D1] py-2 px-6 rounded-full bg-white/60 backdrop-blur-md shadow-sm">
              <Flower size={14} />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Chapter III : The Royal Bloom</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-heading font-black text-[#75263F] leading-[0.9] tracking-tighter uppercase mb-8">
              Velvet <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1] italic font-serif tracking-normal">Flush.</span>
            </h1>
            
            <p className="text-[#75263F]/70 text-lg md:text-xl max-w-lg font-medium leading-relaxed mb-12">
              A weightless, cloud-like blush that melts seamlessly into the skin. Experience the romantic flush of spring petals on a princess's cheeks.
            </p>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center items-center relative h-[60vh] lg:h-[80vh]">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute w-[80%] h-[80%] bg-gradient-to-tr from-[#FFE0E9] to-[#FFF0F4] rounded-full blur-[80px] shadow-[0_0_80px_rgba(255,240,244,0.8)] animate-pulse" />
              <img src={heroImg} alt="Cherry Blossom Velvet Blush" className="relative z-10 w-[90%] h-auto object-contain object-center drop-shadow-[0_40px_80px_rgba(255,143,177,0.5)] transform -rotate-12 hover:rotate-0 transition-transform duration-[2s]" />
              
              {/* Floating elements around hero */}
              <motion.div animate={{ y: [0, -20, 0], x: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[20%] right-[10%] text-[#FF8FB1] z-20 w-8 h-8 opacity-80">
                <Petal className="w-full h-full drop-shadow-md" />
              </motion.div>
              <motion.div animate={{ y: [0, 30, 0], x: [0, -15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-[30%] left-[10%] text-[#FF0069] z-20 w-12 h-12 opacity-60">
                <Petal className="w-full h-full drop-shadow-md" />
              </motion.div>
            </div>
          </div>

        </motion.div>
      </section>

      {/* 2. Editorial Story Section */}
      <section className="relative py-32 overflow-hidden bg-white/60 backdrop-blur-3xl border-t border-[#FFE0E9]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div style={{ y: yParallaxSlow }} className="w-full lg:w-1/2">
              <div className="relative aspect-[4/5] rounded-[80px] rounded-tl-none overflow-hidden border-[12px] border-[#FFF0F4] shadow-[0_40px_80px_rgba(255,143,177,0.2)]">
                <img src={featureImg1} alt="Editorial Blush Look" className="absolute inset-0 w-full h-full object-cover scale-110 hover:scale-100 transition-all duration-[2s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFE0E9]/40 via-transparent to-transparent" />
              </div>
            </motion.div>
            
            <div className="w-full lg:w-1/2 flex flex-col gap-10">
              <h2 className="text-4xl md:text-6xl font-serif italic text-[#75263F] leading-tight">
                "As soft as <span className="text-[#FF8FB1]">clouds</span>, as romantic as a <span className="text-[#FF0069]">first kiss</span>."
              </h2>
              <div className="w-20 h-[1px] bg-gradient-to-r from-[#FF0069] to-transparent" />
              <p className="text-xl text-[#75263F]/60 leading-relaxed font-light">
                Our revolutionary velvet-to-powder formula glides over pores without emphasizing texture. It diffuses light to create a soft-focus, romantic aura that stays perfectly intact from dawn until dusk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Products Showcase (Asymmetrical Layout) */}
      <section className="py-32 relative bg-gradient-to-b from-white to-[#FFF0F4]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center mb-32">
            <span className="text-[#FF8FB1] text-xs font-bold tracking-[0.4em] uppercase mb-4">The Royal Tints</span>
            <h2 className="text-5xl lg:text-7xl font-heading font-black uppercase tracking-widest text-center text-[#75263F]">
              Cherry <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Blossom</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-24">
            {velvetBlushProducts.slice(0, 4).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className={`group relative flex flex-col ${idx % 2 === 1 ? 'lg:mt-32' : ''}`}
              >
                {/* White Luxury Card */}
                <div className="relative aspect-[3/4] rounded-[60px] overflow-hidden bg-white/80 backdrop-blur-xl border border-[#FFC2D1]/40 hover:border-[#FF8FB1] transition-all duration-700 shadow-sm hover:shadow-[0_40px_80px_rgba(255,143,177,0.25)] hover:-translate-y-4">
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-6 left-6 z-30 bg-white/90 backdrop-blur-md border border-[#FF8FB1]/30 text-[#FF8FB1] text-[10px] font-bold uppercase tracking-widest py-2 px-4 rounded-full shadow-sm">
                      {product.badge}
                    </div>
                  )}

                  <Link to={`/product/${product.slug}`} className="absolute inset-0 z-20 flex items-center justify-center p-8 cursor-pointer bg-gradient-to-b from-transparent to-[#FFF0F4]/50">
                    <motion.img whileHover={{ scale: 1.15, y: -10 }} transition={{ duration: 0.7 }} src={product.image} alt={product.name} className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(255,143,177,0.4)]" />
                    
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="text-white border border-[#FF8FB1] font-bold uppercase tracking-[0.2em] text-xs py-4 px-8 rounded-full bg-[#FF8FB1] shadow-xl hover:bg-[#FF0069] hover:border-[#FF0069] transition-colors">
                        View Details
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
                  <h3 onClick={() => handleProductClick(product.slug)} className="text-2xl font-heading font-black text-[#75263F] uppercase leading-tight cursor-pointer hover:text-[#FF8FB1] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center mt-2 gap-4">
                    <span className="text-2xl font-black text-[#FF0069]">₹{product.price}</span>
                    <button onClick={(e) => handleBuy(e, product)} className="w-12 h-12 rounded-full bg-white border border-[#FFC2D1] flex items-center justify-center hover:bg-[#FF0069] hover:border-[#FF0069] hover:text-white text-[#75263F] transition-colors shadow-sm">
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
        <motion.h2 style={{ x: yParallaxFast }} className="text-[10rem] lg:text-[18rem] font-serif italic text-[#FFE0E9]/30 whitespace-nowrap select-none">
          Falling Petals
        </motion.h2>
        
        <motion.div animate={{ y: [0, -80, 0], x: [0, 40, 0], rotate: [0, 180, 360] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[25%] top-[15%] text-[#FF8FB1] w-20 h-20 opacity-60">
          <Petal className="w-full h-full" />
        </motion.div>
        
        <motion.div animate={{ y: [0, 60, 0], x: [0, -30, 0], rotate: [0, -180, -360] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute right-[20%] bottom-[20%] text-[#FF0069] w-28 h-28 opacity-40">
          <Petal className="w-full h-full" />
        </motion.div>
      </section>

      {/* 5 & 6. Collection Story & Ingredients Highlight */}
      <section className="py-32 bg-[#FFFDFD] relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row-reverse gap-20">
          
          <div className="w-full lg:w-1/2 relative min-h-[700px]">
            {/* Layered images for editorial feel */}
            <div className="absolute top-[10%] right-0 w-4/5 h-[600px] rounded-[60px] overflow-hidden border-8 border-[#FFF0F4] shadow-[0_30px_60px_rgba(255,143,177,0.2)] z-10">
              <img src={featureImg2} alt="Macro Product" className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[2s]" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDFD]/20 to-transparent" />
            </div>
            
            {/* Decorative Overlay */}
            <div className="absolute top-[40%] left-[-10%] w-[300px] bg-white/80 backdrop-blur-xl border border-[#FFC2D1] p-8 rounded-3xl shadow-[0_20px_40px_rgba(255,143,177,0.15)] z-20">
              <p className="text-sm font-bold text-[#75263F] uppercase tracking-widest mb-2 border-b border-[#FFE0E9] pb-2">Velvet Touch</p>
              <p className="text-xs text-[#75263F]/70 leading-relaxed font-medium">Bounces like a cream, sets like a powder. A textural masterpiece.</p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-12 justify-center">
            <h2 className="text-4xl md:text-6xl font-heading font-black uppercase text-[#75263F] leading-tight">
              A Royal <br /><span className="text-[#FF8FB1]">Infusion.</span>
            </h2>
            <p className="text-lg text-[#75263F]/70 leading-relaxed font-light first-letter:text-7xl first-letter:font-serif first-letter:text-[#FF8FB1] first-letter:mr-3 first-letter:float-left">
              True luxury lies within the ingredients. We've sourced the finest cherry blossom extracts from royal gardens, blending them with deeply hydrating squalane. This ensures that while the finish is a matte velvet, your skin remains intensely nourished beneath.
            </p>
            
            <div className="flex flex-col gap-6 mt-6">
              <div className="flex items-center gap-6 pb-6 border-b border-[#FFE0E9]">
                <div className="w-14 h-14 rounded-2xl rotate-45 bg-[#FFF0F4] border border-[#FFC2D1] flex items-center justify-center shrink-0">
                  <Flower className="w-6 h-6 text-[#FF8FB1] -rotate-45" />
                </div>
                <div>
                  <h4 className="text-xl font-bold uppercase tracking-widest text-[#75263F] mb-1">Cherry Blossom Extract</h4>
                  <p className="text-sm text-[#75263F]/60">Soothes the skin and provides powerful antioxidants.</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl rotate-45 bg-[#FFF0F4] border border-[#FFC2D1] flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-6 h-6 text-[#FF8FB1] -rotate-45" />
                </div>
                <div>
                  <h4 className="text-xl font-bold uppercase tracking-widest text-[#75263F] mb-1">Vegan Squalane</h4>
                  <p className="text-sm text-[#75263F]/60">Mimics skin's natural oils for a seamless, non-drying blend.</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 7. Luxury Gallery (Collage) */}
      <section className="py-24 bg-[#FFF0F4]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-[900px]">
            <div className="md:col-span-4 h-full flex flex-col gap-8">
              <div className="h-[45%] rounded-[50px] overflow-hidden relative group border-4 border-white shadow-[0_20px_40px_rgba(255,143,177,0.2)]">
                <img src={lookDay} alt="Day Look" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
              </div>
              <div className="h-[55%] rounded-[50px] overflow-hidden relative group border-4 border-white shadow-[0_20px_40px_rgba(255,143,177,0.2)] bg-white p-4">
                <img src={lookSoft} alt="Soft Look" className="w-full h-full object-cover rounded-[40px] transition-transform duration-[2s] group-hover:scale-105" />
              </div>
            </div>
            <div className="md:col-span-8 h-full rounded-[60px] overflow-hidden relative group border-8 border-white shadow-[0_30px_60px_rgba(255,143,177,0.3)]">
              <img src={lookPrincess} alt="Princess Look" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
              <div className="absolute bottom-16 left-16 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white">
                <span className="text-sm font-bold tracking-[0.3em] uppercase text-[#75263F]">The Signature Flush</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Customer Love (Reviews) */}
      <section className="py-32 bg-white relative overflow-hidden border-t border-[#FFE0E9]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 text-center">
          <Heart className="w-12 h-12 text-[#FF8FB1] mx-auto mb-10 fill-[#FF8FB1]" />
          <h2 className="text-4xl lg:text-6xl font-serif italic text-[#75263F] mb-12 max-w-5xl mx-auto leading-tight">"A blush that actually looks like joy. It melts into the skin leaving the most believable, ethereal radiance behind."</h2>
          <div className="flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-6 h-6 fill-[#FF0069] text-[#FF0069]" />)}
          </div>
          <span className="block mt-6 text-sm font-bold tracking-[0.3em] uppercase text-[#FF8FB1]">ELLE Magazine</span>
        </div>
      </section>

      {/* 9 & 10. Magic CTA & Animated Ending Banner */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FFFDFD] to-[#FFF0F4]">
        
        {/* Animated Petal Vortex */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[#FFC2D1]"
              style={{ rotate: (i * 30) + 'deg', transformOrigin: '200px 200px' }}
              animate={{ rotate: [(i * 30) + 'deg', (i * 30 + 360) + 'deg'] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <Petal className="w-8 h-8 opacity-40" />
            </motion.div>
          ))}
        </div>
        
        <div className="relative z-10 text-center flex flex-col items-center">
          <Flower className="w-14 h-14 text-[#FF0069] mb-8" />
          <h2 className="text-6xl lg:text-8xl font-heading font-black uppercase tracking-tight text-[#75263F] mb-10">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Flush.</span>
          </h2>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group relative h-16 px-12 rounded-full bg-[#75263F] text-white font-bold uppercase tracking-widest text-sm hover:bg-[#FF0069] transition-all duration-300 shadow-[0_20px_40px_rgba(117,38,63,0.3)] overflow-hidden">
             <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
             <span className="relative z-10">Discover All Shades</span>
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
