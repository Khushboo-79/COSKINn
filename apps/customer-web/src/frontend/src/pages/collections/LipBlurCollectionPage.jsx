import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, CheckCircle, Sparkles, Droplets, Wind, Sun } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Footer from '../../components/common/Footer';
import SEO from '../../components/common/SEO';

// Import images (Using existing assets)
import lipstickImg from '../../assets/images/cosmetics_lipstick.webp';
import heroImg from '../../assets/images/cosmetics_main_hero.webp';
import modelImg from '../../assets/images/cat_blur_model.webp'; // Assuming this exists based on previous file list
import floatingLipstick from '../../assets/images/cosmetics_floating_lipstick.webp';

import imgSoftBlur from '../../assets/images/lip_balm_glossy_lips.webp';
import imgVelvetBlur from '../../assets/images/velvet_blush.webp';
import imgNaturalBlur from '../../assets/images/cat_lips_1784312601813.webp';
import imgMatteBlur from '../../assets/images/cosmetics_silk_waves.webp';

const lipBlurProducts = [
  {
    id: 307,
    name: "COSKINn Lip Blur - Signature",
    shade: "Signature Pink",
    price: 699,
    originalPrice: 899,
    image: lipstickImg,
    badge: "Bestseller",
    discountBadge: "22% OFF"
  },
  {
    id: 307, // Keeping same ID since it routes to the same product details
    name: "COSKINn Lip Blur - Velvet Rose",
    shade: "Velvet Rose",
    price: 699,
    originalPrice: 899,
    image: lipstickImg,
    discountBadge: "22% OFF"
  },
  {
    id: 307,
    name: "COSKINn Lip Blur - Peach Cloud",
    shade: "Peach Cloud",
    price: 699,
    originalPrice: 899,
    image: lipstickImg,
    discountBadge: "22% OFF"
  },
  {
    id: 307,
    name: "COSKINn Lip Blur - Berry Matte",
    shade: "Berry Matte",
    price: 699,
    originalPrice: 899,
    image: lipstickImg,
    discountBadge: "22% OFF"
  }
];

const finishTypes = [
  {
    title: "Soft Blur",
    desc: "A weightless wash of color that diffuses light.",
    image: imgSoftBlur
  },
  {
    title: "Velvet Blur",
    desc: "Plush, pillowy texture for a romantic stained effect.",
    image: imgVelvetBlur
  },
  {
    title: "Natural Blur",
    desc: "Your lips but infinitely better. Effortless everyday wear.",
    image: imgNaturalBlur
  },
  {
    title: "Matte Blur",
    desc: "Non-drying comfort matte that never settles into lines.",
    image: imgMatteBlur
  }
];

const features = [
  {
    title: "Feather-Light Formula",
    desc: "Feels like absolute nothing on the lips, yet delivers striking pigment."
  },
  {
    title: "Cloud Blur Effect",
    desc: "Instantly smooths lip texture and blurs fine lines for a seamless look."
  },
  {
    title: "Comfortable All-Day Wear",
    desc: "Hydrating hyaluronic spheres ensure your lips never feel dry."
  },
  {
    title: "Blendable Texture",
    desc: "Build it up for bold color or diffuse it out for a soft stain."
  }
];

export default function LipBlurCollectionPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBuy = (e, product) => {
    e.preventDefault();
    addToCart(product, 1);
    navigate('/checkout');
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="min-h-screen w-full bg-[#FFFDFD] font-sans text-[#75263F] overflow-x-hidden selection:bg-[#FFC2D1] selection:text-white">
      <SEO
        title="COSKINn Lip Blur Collection"
        description="Discover the luxury Lip Blur collection. Feather-light formulas for a flawless, cloud-like finish."
        url="https://www.coskinn.com/collections/lip-blur"
      />

      {/* =========================================
          SECTION 1: LUXURY HERO
          ========================================= */}
      <section className="relative w-full min-h-screen flex flex-col lg:flex-row items-center pt-[110px] bg-[#FFFDFD] overflow-hidden">
        
        {/* Background Gradients (Starts from very top, covers entire hero) */}
        <div className="absolute top-0 left-0 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-gradient-to-br from-[#FFC2D1]/40 to-[#FF8FB1]/20 rounded-full blur-[100px] -translate-x-1/4 -translate-y-1/4 pointer-events-none z-0" />

        {/* Main Content Container */}
        <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 relative z-20 flex flex-col lg:flex-row h-full">
          
          {/* Left: Typography & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left pb-20 lg:pb-32 pt-16 lg:pt-32"
          >
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-[#FF8FB1] mb-6 block bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-[#FFC2D1]/30 shadow-sm">
              The New Era of Color
            </span>
            <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading font-black tracking-tighter text-[#75263F] mb-6 leading-[1.05]">
              Meet The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#75263F] to-[#FF8FB1]">Lip Blur.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#75263F]/70 font-medium max-w-lg mb-10 leading-relaxed mx-auto lg:mx-0">
              A feather-light, cloud-like formula that instantly diffuses and perfects. High-impact color with absolute zero weight.
            </p>
            <button 
              onClick={() => document.getElementById('collection').scrollIntoView({ behavior: 'smooth' })}
              className="group bg-[#FF8FB1] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#ff759f] shadow-[0_10px_30px_rgba(255,143,177,0.3)] hover:shadow-[0_15px_40px_rgba(255,143,177,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
            >
              Shop The Collection
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>
          
        </div>

        {/* Right: Full Bleed Editorial Imagery (Positioned absolutely so it covers the right side but stays below navbar) */}
        <div className="absolute bottom-0 right-0 w-full lg:w-[55%] h-[60%] lg:h-[85%] z-10 pointer-events-none">
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1.5, ease: "easeOut" }}
             className="w-full h-full relative"
          >
            {/* Top Edge Fade Mask */}
            <div 
              className="w-full h-full"
              style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)' }}
            >
              {/* Bottom Edge Fade Mask */}
              <div 
                className="w-full h-full"
                style={{ maskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)', WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)' }}
              >
                {/* Left Edge Fade Mask */}
                <div 
                  className="w-full h-full"
                  style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 100%)' }}
                >
                  <img 
                    src={modelImg} 
                    alt="Model wearing Lip Blur" 
                    className="w-full h-full object-cover object-top lg:object-[center_10%] mix-blend-multiply"
                    onError={(e) => { e.target.src = heroImg }} 
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: THE LIP BLUR COLLECTION
          ========================================= */}
      <section id="collection" className="py-24 bg-[#FFFDFD] relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-black text-[#75263F] tracking-wide uppercase">
              The Collection
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {lipBlurProducts.map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group cursor-pointer bg-white/40 backdrop-blur-xl border border-white/80 rounded-[30px] p-4 shadow-[0_10px_40px_rgba(255,194,209,0.2)] hover:shadow-[0_20px_50px_rgba(255,143,177,0.3)] transition-all duration-500 hover:-translate-y-2 flex flex-col"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="relative aspect-square w-full rounded-[24px] overflow-hidden bg-white mb-6 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FFC2D1]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[70%] h-[70%] object-contain relative z-10 transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Action Icons */}
                  <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                      className={`w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center transition-all ${isInWishlist(product.id) ? 'text-[#FF8FB1]' : 'text-[#FF8FB1] hover:text-[#FF0069]'}`}
                    >
                      <Heart size={18} className={isInWishlist(product.id) ? 'fill-current' : ''} />
                    </button>
                  </div>

                  {product.discountBadge && (
                    <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-[#FF8FB1] rounded-full shadow-sm">
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">{product.discountBadge}</span>
                    </div>
                  )}
                </div>

                <div className="px-2 pb-2 flex-1 flex flex-col">
                  <h3 className="text-lg font-heading font-bold text-[#75263F] leading-tight mb-1 group-hover:text-[#FF8FB1] transition-colors">{product.name}</h3>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#FF8FB1] mb-4">{product.shade}</span>

                  <div className="flex items-end justify-between mt-auto">
                    <div className="flex flex-col">
                      {product.originalPrice && (
                        <span className="text-sm font-medium text-[#FFC2D1] line-through mb-0.5">₹{product.originalPrice}</span>
                      )}
                      <span className="text-xl font-black text-[#FF8FB1]">₹{product.price}</span>
                    </div>

                    <button
                      onClick={(e) => handleBuy(e, product)}
                      className="w-12 h-12 rounded-full bg-[#FF8FB1] text-white flex items-center justify-center hover:bg-[#ff759f] transition-all shadow-[0_5px_15px_rgba(255,143,177,0.4)] hover:shadow-[0_8px_20px_rgba(255,143,177,0.6)] hover:-translate-y-1"
                    >
                      <ShoppingBag size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3: FIND YOUR PERFECT FINISH
          ========================================= */}
      <section className="py-16 bg-[#FFFDFD] relative overflow-hidden mt-[2px]">
        {/* Luxury Background Effects */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gradient-to-bl from-[#FFC2D1]/20 to-[#FFFDFD] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-gradient-to-tr from-[#FF8FB1]/15 to-[#FFFDFD] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#FF8FB1] mb-3 block">The Art of Texture</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-[#75263F] tracking-tight uppercase leading-tight">
              Find Your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#75263F] to-[#FF8FB1]">Perfect Finish.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {finishTypes.map((finish, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-[360px] rounded-[28px] overflow-hidden shadow-[0_8px_30px_rgba(255,194,209,0.15)] hover:shadow-[0_20px_40px_rgba(255,143,177,0.3)] transition-all duration-700 hover:-translate-y-2 border border-[#FFC2D1]/40 bg-white"
              >
                {/* Image Container */}
                <div className="absolute inset-0 h-[60%] w-full overflow-hidden">
                  <img 
                    src={finish.image} 
                    alt={finish.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#75263F]/5 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white/95 to-transparent z-10" />
                </div>
                
                {/* Content Container (Glassmorphism) */}
                <div className="absolute bottom-0 inset-x-0 h-[45%] bg-white/70 backdrop-blur-xl flex flex-col justify-between p-6 rounded-b-[28px] border-t border-white/60 z-20">
                  <div>
                    <h3 className="text-xl font-heading font-black text-[#75263F] mb-1 uppercase tracking-wide group-hover:text-[#FF8FB1] transition-colors duration-500">
                      {finish.title}
                    </h3>
                    <p className="text-[#75263F]/70 text-[13px] font-medium leading-relaxed group-hover:text-[#75263F]/90 transition-colors duration-300">
                      {finish.desc}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#FF8FB1] group-hover:text-[#FF0069] transition-colors duration-300">
                    Explore Finish
                    <span className="group-hover:translate-x-2 transition-transform duration-500">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 4: WHY LIP BLUR IS DIFFERENT
          ========================================= */}
      <section className="py-24 bg-[#FFFDFD] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF8FB1]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-black text-[#75263F] tracking-wide uppercase">
              Why It's Different
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-start gap-6 bg-white/60 backdrop-blur-md p-8 rounded-[30px] border border-white shadow-[0_10px_40px_rgba(255,194,209,0.3)] hover:bg-white transition-colors"
              >
                <div className="mt-1">
                  <CheckCircle className="text-[#FF8FB1] w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-heading font-bold text-[#75263F] mb-3">{feature.title}</h4>
                  <p className="text-[#75263F]/70 font-medium leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
