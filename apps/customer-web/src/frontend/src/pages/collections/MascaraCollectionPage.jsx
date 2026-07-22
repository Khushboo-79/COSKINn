import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Sparkles, Moon, ArrowRight, Star as StarIcon, Feather } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Footer from '../../components/common/Footer';
import SEO from '../../components/common/SEO';
import { cosmeticsProducts } from '../../constants/cosmeticsProducts';

// Images
import heroModel from '../../assets/images/luxury_mascara_hero.png';
import featureImg1 from '../../assets/images/cat_eyes_1784312591092.webp';
import featureImg2 from '../../assets/images/cosmetics_after_model.webp';
import lookParty from '../../assets/images/routine_glow_1784312658823.webp';
import lookSmokey from '../../assets/images/after_makeup_1784312726460.webp';
import lookEvening from '../../assets/images/cosmetics_editorial_lifestyle_1784222459546.webp';

// Butterfly SVG Component
const Butterfly = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    <path d="M50 45 C40 30 15 20 5 45 C-5 65 20 85 45 60 C48 58 50 55 50 55 C50 55 52 58 55 60 C80 85 105 65 95 45 C85 20 60 30 50 45 Z" />
  </svg>
);

const mascaraProducts = cosmeticsProducts.filter(p => [303, 334, 335, 336, 337, 338].includes(p.id)).map(p => ({
  ...p,
  shade: p.shade || "Midnight Black",
  badge: p.id === 303 ? "Bestseller" : p.id === 334 ? "New Arrival" : null,
  isVegan: true,
}));

export default function MascaraCollectionPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 200]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const yParallaxFast = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleProductClick = (slug) => navigate(`/product/${slug}`);
  const handleBuy = (e, product) => { e.preventDefault(); e.stopPropagation(); addToCart(product, 1); };
  const handleWishlist = (e, product) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); };

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-[#FFFDFD] font-sans text-[#75263F] overflow-x-hidden selection:bg-[#FF8FB1] selection:text-white">
      <SEO title="The Butterfly Fairy Collection | COSKINn" description="Midnight volume and weightless curl. Enter the romantic fantasy." />

      {/* Global Magical Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#FF8FB1] blur-[2px]"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{ y: [0, -150, 0], opacity: [0, 0.4, 0] }}
            transition={{ duration: Math.random() * 8 + 5, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
          />
        ))}
      </div>

      {/* 1. Large Editorial Hero */}
      <section className="relative w-full h-[120vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF0F4] via-[#FFFDFD] to-[#FFFDFD]" />
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#FF8FB1]/10 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-[-20%] w-[50vw] h-[50vw] rounded-full bg-[#FF0069]/5 blur-[150px] pointer-events-none" />

        <motion.div style={{ y: yHero, opacity: opacityHero }} className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between">
          
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left pt-10 lg:pt-0">
            <div className="flex items-center gap-3 mb-8 text-[#FF8FB1] border border-[#FFE0E9] py-2 px-6 rounded-full bg-white backdrop-blur-md shadow-sm">
              <Moon size={14} />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#75263F]">Chapter I : The Awakening</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-heading font-black text-[#75263F] leading-[0.85] tracking-tighter uppercase mb-8 drop-shadow-sm">
              Midnight <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1] italic font-serif tracking-normal">Flutter.</span>
            </h1>
            
            <p className="text-[#75263F]/70 text-lg md:text-xl max-w-lg font-medium leading-relaxed mb-12">
              Weightless volume, infinite length, and a deep velvet finish that enchants under the moonlight. The butterfly fairy has arrived.
            </p>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative h-[60vh] lg:h-[80vh]">
            <motion.div 
              style={{ x: mousePosition.x * 3, rotateY: mousePosition.x * 2 }}
              className="relative w-full h-full max-w-xl flex items-center justify-center perspective-1000"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FFC2D1]/40 to-transparent rounded-full blur-[80px]" />
              <img src={heroModel} alt="Butterfly Fairy Mascara" className="relative z-10 w-[120%] h-[120%] object-contain object-center drop-shadow-[0_30px_60px_rgba(255,143,177,0.3)]" />
              
              {/* Hero Butterflies */}
              <motion.div animate={{ y: [0, -30, 0], rotate: [0, 10, -5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] right-[10%] text-[#FF8FB1] opacity-80 z-20 w-12 h-12">
                <Butterfly className="w-full h-full drop-shadow-[0_0_15px_rgba(255,143,177,0.5)]" />
              </motion.div>
              <motion.div animate={{ y: [0, 40, 0], rotate: [0, -15, 10, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[20%] left-[0%] text-[#FF0069] opacity-60 z-20 w-16 h-16">
                <Butterfly className="w-full h-full drop-shadow-[0_0_20px_rgba(255,0,105,0.4)]" />
              </motion.div>
            </motion.div>
          </div>

        </motion.div>
      </section>

      {/* 2. Editorial Story Section */}
      <section className="relative py-32 overflow-hidden bg-white border-t border-[#FFE0E9]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div style={{ y: yParallaxSlow }} className="w-full lg:w-5/12">
              <div className="relative aspect-[3/4] rounded-t-full rounded-b-[40px] overflow-hidden border border-[#FFE0E9] shadow-[0_30px_60px_rgba(255,143,177,0.15)]">
                <img src={featureImg1} alt="Editorial Eye Look" className="absolute inset-0 w-full h-full object-cover transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
              </div>
            </motion.div>
            
            <div className="w-full lg:w-7/12 flex flex-col gap-10">
              <h2 className="text-4xl md:text-6xl font-serif italic text-[#75263F] leading-tight">
                "Eyes that <span className="text-[#FF8FB1]">capture</span> the stars, lashes that <span className="text-[#FF0069]">defy</span> gravity."
              </h2>
              <div className="w-20 h-[1px] bg-gradient-to-r from-[#FF0069] to-transparent" />
              <p className="text-xl text-[#75263F]/70 leading-relaxed font-light">
                Inspired by the delicate yet powerful wings of a butterfly, our signature mascara formula wraps every single lash in weightless, ultra-black velvet. It lifts, curls, and holds without a single clump.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Products Showcase (Asymmetrical Layout) */}
      <section className="py-32 relative bg-gradient-to-b from-[#FFFDFD] to-[#FFF0F4]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center mb-24">
            <span className="text-[#FF8FB1] text-xs font-bold tracking-[0.4em] uppercase mb-4">The Magic Wands</span>
            <h2 className="text-5xl lg:text-7xl font-heading font-black uppercase tracking-widest text-center text-[#75263F]">
              Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Collection</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-24">
            {mascaraProducts.slice(0, 3).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className={`group relative flex flex-col ${idx === 1 ? 'lg:mt-32' : ''} ${idx === 2 ? 'lg:-mt-16' : ''}`}
              >
                {/* Glassmorphism Card */}
                <div className="relative aspect-[3/4] rounded-[40px] overflow-hidden bg-white/60 backdrop-blur-xl border border-[#FFE0E9] hover:border-[#FF8FB1]/50 transition-all duration-700 shadow-[0_20px_50px_rgba(255,143,177,0.1)] hover:shadow-[0_40px_80px_rgba(255,143,177,0.2)]">
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-6 left-6 z-30 bg-white/90 backdrop-blur-md border border-[#FF8FB1]/30 text-[#FF8FB1] text-[10px] font-bold uppercase tracking-widest py-2 px-4 rounded-full shadow-sm">
                      {product.badge}
                    </div>
                  )}

                  <Link to={`/product/${product.slug}`} className="absolute inset-0 z-20 flex items-center justify-center p-10 cursor-pointer">
                    <motion.img whileHover={{ scale: 1.1, rotate: 2 }} transition={{ duration: 0.7 }} src={product.image} alt={product.name} className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(255,143,177,0.2)]" />
                    
                    <div className="absolute inset-0 bg-[#FFF0F4]/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="text-[#75263F] border border-[#FF8FB1] font-bold uppercase tracking-[0.2em] text-xs py-4 px-8 rounded-full bg-white hover:bg-[#FF8FB1] hover:text-white transition-colors shadow-lg">
                        View Details
                      </span>
                    </div>
                  </Link>

                  {/* Wishlist */}
                  <button onClick={(e) => handleWishlist(e, product)} className="absolute top-6 right-6 z-30 p-3 rounded-full bg-white/90 backdrop-blur-md border border-[#FFE0E9] text-[#75263F] hover:text-[#FF0069] transition-colors shadow-sm">
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
                    <button onClick={(e) => handleBuy(e, product)} className="w-12 h-12 rounded-full bg-white border border-[#FFE0E9] flex items-center justify-center hover:bg-[#FF8FB1] hover:text-white hover:border-[#FF8FB1] text-[#75263F] transition-colors shadow-sm">
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
        <motion.h2 style={{ x: yParallaxFast }} className="text-[12rem] lg:text-[20rem] font-serif italic text-[#FFF0F4] whitespace-nowrap select-none">
          Flutter Away
        </motion.h2>
        
        <motion.div animate={{ y: [0, -60, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[20%] top-[10%] text-[#FF8FB1] w-32 h-32 opacity-50 mix-blend-multiply">
          <Butterfly className="w-full h-full" />
        </motion.div>
        
        <motion.div animate={{ y: [0, 80, 0], rotate: [0, -10, 10, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute right-[15%] bottom-[15%] text-[#FF0069] w-40 h-40 opacity-20 mix-blend-multiply">
          <Butterfly className="w-full h-full" />
        </motion.div>
      </section>

      {/* 5 & 6. Collection Story & Ingredients Highlight */}
      <section className="py-32 bg-[#FFFDFD] relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row-reverse gap-20">
          
          <div className="w-full lg:w-1/2 relative min-h-[600px] flex items-center justify-center">
            <div className="absolute w-[80%] h-[110%] border border-[#FFE0E9] shadow-[0_20px_50px_rgba(255,143,177,0.1)] z-10 translate-x-8 translate-y-8 rounded-[40px] bg-[#FFF0F4]/30" />
            <img src={featureImg2} alt="Mascara Application" className="relative z-20 w-[90%] h-auto object-cover rounded-[40px] shadow-2xl" />
            
            <div className="absolute -bottom-8 -left-8 bg-white border border-[#FFE0E9] p-6 shadow-2xl z-30 max-w-[250px] rounded-2xl">
              <p className="text-[10px] font-bold text-[#FF8FB1] uppercase tracking-widest mb-2">Micro-Curved Brush</p>
              <p className="text-xs text-[#75263F]/70 leading-relaxed">Engineered to hug the lash line, catching even the finest inner-corner hairs for a fanned-out, panoramic effect.</p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-12 justify-center pt-20 lg:pt-0 pr-10">
            <h2 className="text-4xl md:text-6xl font-heading font-black uppercase text-[#75263F] leading-tight">
              The <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Anatomy.</span>
            </h2>
            <p className="text-lg text-[#75263F]/70 leading-relaxed font-light first-letter:text-7xl first-letter:font-serif first-letter:text-[#FF8FB1] first-letter:mr-3 first-letter:float-left">
              Crafted with a proprietary blend of flexible waxes and deep onyx pigments. Our formula doesn't just coat your lashes; it stretches and molds them into a perfect curl that remains soft to the touch and completely flake-free for 24 hours.
            </p>
            
            <div className="flex flex-col gap-6 mt-6">
              <div className="flex items-start gap-6 pb-6 border-b border-[#FFE0E9]">
                <div className="w-14 h-14 rounded-full bg-[#FFF0F4] border border-[#FFE0E9] flex items-center justify-center shrink-0">
                  <Feather className="w-6 h-6 text-[#FF8FB1]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold uppercase tracking-widest text-[#75263F] mb-1">Weightless Volume</h4>
                  <p className="text-sm text-[#75263F]/60 leading-relaxed">Air-whipped formula builds extreme thickness without weighing down the natural curl.</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-[#FFF0F4] border border-[#FFE0E9] flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-[#FF8FB1]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold uppercase tracking-widest text-[#75263F] mb-1">Peptide Infused</h4>
                  <p className="text-sm text-[#75263F]/60 leading-relaxed">Enriched with lash-loving peptides to condition and strengthen with every wear.</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 7. Luxury Gallery (Collage) */}
      <section className="py-24 bg-[#FFF0F4] border-t border-[#FFE0E9]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <h2 className="text-center text-3xl font-heading font-black uppercase tracking-widest text-[#75263F] mb-16">The Fairy's Gaze</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[800px]">
            <div className="md:col-span-3 h-full rounded-[40px] overflow-hidden relative group">
              <img src={lookParty} alt="Party Look" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
            </div>
            <div className="md:col-span-5 h-full rounded-[40px] overflow-hidden relative group">
              <img src={lookSmokey} alt="Smokey Eye Look" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
            </div>
            <div className="md:col-span-4 h-full rounded-[40px] overflow-hidden relative group">
              <img src={lookEvening} alt="Evening Look" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. Customer Love (Reviews) */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 text-center flex flex-col items-center">
          <Butterfly className="w-16 h-16 text-[#FFC2D1] mb-10" />
          <h2 className="text-4xl lg:text-6xl font-serif italic text-[#75263F] mb-12 max-w-4xl leading-tight">"It's like wearing falsies, but better. The wand catches every lash, and it truly doesn't smudge. Pure magic."</h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5 fill-[#FF8FB1] text-[#FF8FB1]" />)}
          </div>
          <span className="text-sm font-bold tracking-[0.3em] uppercase text-[#FF0069]">Allure Beauty Editor</span>
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
            Open Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Wings.</span>
          </h2>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group relative bg-white text-[#75263F] font-bold uppercase tracking-widest text-sm py-5 px-12 rounded-full hover:bg-[#FF0069] hover:text-white transition-all duration-300 shadow-[0_20px_40px_rgba(255,143,177,0.3)] border border-[#FFE0E9]">
             Discover The Collection
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
