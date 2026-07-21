import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Sparkles, Droplets } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Footer from '../../components/common/Footer';
import SEO from '../../components/common/SEO';

// Images
import heroModel from '../../assets/images/luxury_mascara_hero.png';
import mascaraProductImg from '../../assets/images/lift_curl_mascara.webp';
import featureImg1 from '../../assets/images/cat_eyes_1784312591092.webp';
import featureImg2 from '../../assets/images/cosmetics_after_model.webp';
import brushTechImg from '../../assets/images/cosmetics_mascara.webp';

const mascaraProducts = [
  {
    id: 303,
    name: "COSKINn Lift & Curl Mascara",
    shade: "Ultra Black",
    price: 799,
    originalPrice: 999,
    rating: 4.9,
    reviews: 124,
    image: mascaraProductImg,
    badge: "Bestseller",
    discountBadge: "20% OFF",
    isVegan: true,
    tag: "Fruit-Powered"
  },
  {
    id: 334,
    name: "COSKINn Berry Volume Mascara",
    shade: "Plum Black",
    price: 849,
    originalPrice: 1099,
    rating: 4.8,
    reviews: 89,
    image: mascaraProductImg,
    badge: "New Arrival",
    discountBadge: "23% OFF",
    isVegan: true,
    tag: "Fruit-Powered"
  },
  {
    id: 335,
    name: "COSKINn Mango Length Mascara",
    shade: "Deep Brown",
    price: 749,
    originalPrice: 899,
    rating: 4.7,
    reviews: 156,
    image: mascaraProductImg,
    discountBadge: "16% OFF",
    isVegan: true,
    tag: "Fruit-Powered"
  },
  {
    id: 336,
    name: "COSKINn Coconut Waterproof",
    shade: "Intense Black",
    price: 899,
    originalPrice: 1199,
    rating: 4.9,
    reviews: 210,
    image: mascaraProductImg,
    badge: "Trending",
    discountBadge: "25% OFF",
    isVegan: true,
    tag: "Fruit-Powered"
  },
  {
    id: 337,
    name: "COSKINn Cherry Lift Mini",
    shade: "Midnight Black",
    price: 499,
    originalPrice: 599,
    rating: 4.6,
    reviews: 64,
    image: mascaraProductImg,
    discountBadge: "16% OFF",
    isVegan: true,
    tag: "Fruit-Powered"
  },
  {
    id: 338,
    name: "COSKINn Peach Clear Mascara",
    shade: "Clear Gloss",
    price: 699,
    originalPrice: 899,
    rating: 4.5,
    reviews: 42,
    image: mascaraProductImg,
    discountBadge: "22% OFF",
    isVegan: true,
    tag: "Fruit-Powered"
  }
];

const features = [
  {
    title: "Lift & Curl Technology",
    desc: "Defies gravity for a 24-hour lifted lash effect without clamping.",
    image: featureImg1
  },
  {
    title: "Smudge Proof Formula",
    desc: "Tears, sweat, and humidity resistant for flawless wear.",
    image: featureImg2
  }
];

export default function MascaraCollectionPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 300]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleBuy = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="min-h-screen w-full bg-[#FFFDFD] font-sans text-[#75263F] overflow-x-hidden selection:bg-[#FFC2D1] selection:text-white">
      <SEO
        title="Lift & Curl Mascara Collection | COSKINn"
        description="Discover the COSKINn Lift & Curl Mascara. Gravity-defying volume and dramatic curl for a flawless, high-impact finish."
        url="https://www.coskinn.com/collections/lift-curl-mascara"
      />

      {/* =========================================
          SECTION 1: LUXURY HERO
          ========================================= */}
      <section className="relative w-full min-h-[100vh] lg:min-h-screen flex items-center overflow-hidden pt-[160px] pb-20">

        {/* Full-Width/Height Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src={heroModel} 
            alt="Lift & Curl Hero Background" 
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient overlay to ensure text readability on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent" />
        </div>

        {/* Very Subtle Floating Particles (Optional luxury touch over the image) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[30%] left-[20%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] blur-[0.5px]"
          />
          <motion.div
            animate={{ y: [0, 40, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[40%] right-[30%] w-2.5 h-2.5 rounded-full bg-[#FF8FB1] shadow-[0_0_12px_rgba(255,143,177,0.5)] blur-[1px]"
          />
          <motion.div
            animate={{ y: [0, -20, 0], opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="absolute top-[50%] right-[15%] w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] blur-[0.5px]"
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full flex flex-col-reverse lg:flex-row items-center h-full gap-12 lg:gap-0 pb-16 relative z-10">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-20"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/50 backdrop-blur-md border border-[#75263F]/20 text-xs font-bold tracking-[0.2em] uppercase text-[#75263F] shadow-sm mb-6">
              Gravity Defying Volume
            </span>

            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-black text-[#75263F] leading-[0.95] tracking-tight uppercase mb-6">
              Lift & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Curl.</span>
            </h1>

            <p className="text-[#75263F]/70 text-base md:text-lg max-w-md font-medium leading-relaxed mb-10">
              Sculpt, separate, and elevate your lashes with a weightless formula designed for dramatic, all-day impact.
            </p>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('collection').scrollIntoView({ behavior: 'smooth' })}
              className="group relative h-14 px-10 rounded-full bg-gradient-to-r from-[#FF0069] to-[#FF8FB1] text-white font-bold uppercase tracking-widest text-sm shadow-[0_10px_30px_rgba(255,0,105,0.3)] hover:shadow-[0_15px_40px_rgba(255,0,105,0.4)] transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full" />
              <span className="relative z-10 flex items-center gap-2">
                Discover The Mascara <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </motion.button>
          </motion.div>

          {/* Right Image Spacer (Maintains Flex Layout) */}
          <div className="hidden lg:block w-full lg:w-1/2"></div>
        </div>

      </section>

      {/* =========================================
          SECTION 2: WHY YOU'LL LOVE IT
          ========================================= */}
      <section className="pt-12 pb-24 bg-gradient-to-b from-[#FFFDFD] via-[#FFF5F7] to-[#FFE5EC] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          
          {/* Centered Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-light text-[#75263F] uppercase tracking-widest">
              Why You'll <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Love It</span>
            </h2>
          </motion.div>

          {/* Full Width Horizontal Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mx-auto">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="group relative flex flex-col sm:flex-row h-auto sm:h-[300px] rounded-[32px] overflow-hidden shadow-[0_10px_40px_rgba(255,194,209,0.2)] hover:shadow-[0_20px_50px_rgba(255,143,177,0.35)] transition-all duration-700 hover:-translate-y-2 bg-gradient-to-br from-[#FFFDFD] via-[#FFF5F7] to-[#FFE5EC] border border-[#FFC2D1]/40"
              >
                {/* Image Area (Left side on desktop) */}
                <div className="w-full sm:w-[45%] h-[250px] sm:h-full relative overflow-hidden shrink-0">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-[#FF8FB1]/10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500" />
                  {/* Subtle fade to text area */}
                  <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#FFF5F7] to-transparent hidden sm:block z-10" />
                  <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#FFF5F7] to-transparent sm:hidden z-10" />
                </div>

                {/* Content Area (Right side on desktop) */}
                <div className="w-full sm:w-[55%] flex flex-col justify-center p-8 sm:px-10 relative z-20 bg-white/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    {idx === 0 ? <Sparkles className="w-6 h-6 text-[#FF8FB1]" strokeWidth={1.5} /> : <Droplets className="w-6 h-6 text-[#FF8FB1]" strokeWidth={1.5} />}
                    <h3 className="text-xl font-heading font-bold text-[#75263F] uppercase tracking-widest group-hover:text-[#FF0069] transition-colors duration-500">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-[#75263F]/75 text-base font-medium leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================
          SECTION 3: BRUSH TECHNOLOGY
          ========================================= */}
      <section className="py-24 bg-[#FFFDFD] relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute left-[-10%] top-1/3 w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FFC2D1]/20 via-[#FFF5F7]/10 to-transparent rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24 relative z-10">
          
          {/* Left Image Area with Editorial Frame */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative mt-8 lg:mt-0"
          >
            {/* Decorative Offset Frame (Breathing & Rotating) */}
            <motion.div 
              animate={{ rotate: [4, 6, 4], scale: [1, 1.02, 1] }}
              transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
              className="absolute -inset-4 lg:-inset-6 bg-gradient-to-tr from-[#FFF5F7] to-[#FFE5EC] rounded-[40px] -z-10 transform-gpu shadow-lg" 
            />
            
            {/* Floating Image Container */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
              className="rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(255,143,177,0.2)] border-4 border-white relative z-10 bg-white group"
            >
              <img 
                src={brushTechImg} 
                alt="Mascara Brush Close-up" 
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out" 
              />
              {/* Sweeping Glass Sheen Effect */}
              <motion.div 
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 4 }}
                className="absolute inset-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[30deg] pointer-events-none"
              />
            </motion.div>
          </motion.div>

          {/* Right Content Area */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-1/2 lg:pt-10"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-[#FF8FB1]"></span>
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#FF8FB1]">Precision Engineering</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-heading font-light text-[#75263F] uppercase tracking-widest mb-12 leading-[1.1]">
              The Architecture of <br />
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Volume</span>
            </h2>

            {/* Redesigned Features List (Editorial Rows with Watermark Numbers) */}
            <div className="space-y-0">
              {[
                { title: "Curved Silhouette", desc: "Hugs the natural lash line to catch every single hair from root to tip." },
                { title: "Dual-Bristle Matrix", desc: "Short bristles build dramatic volume, while long bristles separate and lengthen." },
                { title: "Micro-Precision Tip", desc: "Effortlessly coats the inner and lower lashes without smudging." }
              ].map((tech, i) => (
                <div 
                  key={i} 
                  className="group relative border-b border-[#FFC2D1]/30 py-8 first:border-t hover:bg-[#FFF5F7]/80 transition-colors duration-500 cursor-default px-6 -mx-6 rounded-2xl overflow-hidden"
                >
                  {/* Huge Watermark Number */}
                  <span className="absolute top-1/2 -translate-y-1/2 right-4 text-7xl md:text-8xl font-heading font-black text-[#FFC2D1]/20 group-hover:text-[#FF8FB1]/30 group-hover:-translate-x-2 transition-all duration-700 pointer-events-none select-none z-0">
                    0{i + 1}
                  </span>
                  
                  {/* Text Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-heading font-bold text-[#75263F] uppercase tracking-widest mb-2 group-hover:text-[#FF0069] transition-colors duration-500">
                      {tech.title}
                    </h3>
                    <p className="text-[#75263F]/70 text-base font-medium leading-relaxed max-w-sm">
                      {tech.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================
          SECTION 4: SHOP THE COLLECTION
          ========================================= */}
      <section id="collection" className="pt-8 pb-24 bg-[#FFFDFD] relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-[30vw] h-[30vw] bg-gradient-to-bl from-[#FF8FB1]/15 to-[#FFFDFD] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-black text-[#75263F] uppercase tracking-tight">
              Shop The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Collection</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 w-full">
            {mascaraProducts.map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => handleProductClick(product.id)}
                className="w-full group cursor-pointer bg-white/60 backdrop-blur-lg rounded-[24px] p-4 shadow-[0_8px_30px_rgba(255,194,209,0.15)] hover:shadow-[0_20px_40px_rgba(255,143,177,0.25)] transition-all duration-500 border border-[#FFC2D1]/40 hover:-translate-y-2 flex flex-col"
              >
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-5 bg-[#FFFDFD]">
                  {product.discountBadge && (
                    <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-[#FF0069] to-[#FF8FB1] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-[0_5px_15px_rgba(255,0,105,0.3)]">
                      {product.discountBadge}
                    </div>
                  )}
                  <button
                    onClick={(e) => handleWishlist(e, product)}
                    className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm transition-colors duration-300 ${isInWishlist(product.id) ? 'text-[#FF0069]' : 'text-[#75263F]/30 hover:text-[#FF0069]'}`}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </button>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-[#75263F]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay pointer-events-none" />
                </div>

                <div className="flex flex-col flex-1 text-center px-2">
                  <h3 className="font-heading font-bold text-base md:text-lg text-[#75263F] mb-1 group-hover:text-[#FF0069] transition-colors duration-500 tracking-wide line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs font-medium text-[#75263F]/60 mb-4">{product.shade}</p>

                  <div className="flex items-center justify-center gap-3 mb-5 mt-auto">
                    <span className="text-xl font-black text-[#FF0069]">₹{product.price}</span>
                    <span className="text-xs font-bold text-[#75263F]/40 line-through">₹{product.originalPrice}</span>
                  </div>

                  <button
                    onClick={(e) => handleBuy(e, product)}
                    className="w-full h-12 rounded-full bg-[#FFFDFD] border border-[#FFC2D1]/60 text-[#FF0069] font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-[#FF0069] group-hover:to-[#FF8FB1] group-hover:text-white group-hover:border-transparent transition-all duration-500 shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add To Cart
                  </button>
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
