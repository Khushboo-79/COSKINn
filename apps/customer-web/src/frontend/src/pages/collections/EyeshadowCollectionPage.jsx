import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Sparkles, Layers } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Footer from '../../components/common/Footer';
import SEO from '../../components/common/SEO';

// Images
import heroPalette from '../../assets/images/cat_eyeshadow_palette.webp';
import heroCutout from '../../assets/images/eyeshadow_hero_transparent.png';
import featureImg2 from '../../assets/images/cosmetics_floating_palette.webp';

import lookNude from '../../assets/images/before_makeup_1784312716727.webp';
import lookOffice from '../../assets/images/routine_prime_1784312648965.webp';
import lookParty from '../../assets/images/routine_glow_1784312658823.webp';
import lookBridal from '../../assets/images/routine_finish_1784312670197.webp';
import lookSmokey from '../../assets/images/after_makeup_1784312726460.webp';
import lookEvening from '../../assets/images/cosmetics_editorial_lifestyle_1784222459546.webp';


const eyeshadowProducts = [
  {
    id: 341,
    name: "COSKINn Nude Elegance",
    shade: "12 Warm Neutrals",
    price: 1899,
    originalPrice: 2499,
    rating: 4.9,
    reviews: 342,
    image: heroPalette,
    badge: "Bestseller",
    discountBadge: "BEST SELLER",
    isVegan: true,
    tag: "Pro Palette"
  },
  {
    id: 342,
    name: "COSKINn Sunset Glow",
    shade: "12 Warm Coppers",
    price: 1899,
    originalPrice: 2499,
    rating: 4.8,
    reviews: 218,
    image: heroPalette,
    badge: "New Arrival",
    discountBadge: "NEW",
    isVegan: true,
    tag: "Pro Palette"
  },
  {
    id: 343,
    name: "COSKINn Rose Romance",
    shade: "12 Soft Pinks",
    price: 1614,
    originalPrice: 1899,
    rating: 4.9,
    reviews: 412,
    image: heroPalette,
    discountBadge: "15% OFF",
    isVegan: true,
    tag: "Pro Palette"
  },
  {
    id: 344,
    name: "COSKINn Smokey Luxe",
    shade: "12 Cool Greys & Blacks",
    price: 1899,
    originalPrice: 2499,
    rating: 4.7,
    reviews: 156,
    image: heroPalette,
    isVegan: true,
    tag: "Pro Palette"
  },
  {
    id: 345,
    name: "COSKINn Golden Glam",
    shade: "12 Rich Golds",
    price: 1519,
    originalPrice: 1899,
    rating: 4.8,
    reviews: 289,
    image: heroPalette,
    discountBadge: "20% OFF",
    isVegan: true,
    tag: "Pro Palette"
  },
  {
    id: 346,
    name: "COSKINn Berry Muse",
    shade: "12 Deep Plums",
    price: 1899,
    originalPrice: 2499,
    rating: 4.6,
    reviews: 134,
    image: heroPalette,
    isVegan: true,
    tag: "Pro Palette"
  }
];

export default function EyeshadowCollectionPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleBuy = (e, product) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlist = (e, product) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="w-full min-h-screen bg-theme-bg overflow-x-hidden selection:bg-[#FFC2D1] selection:text-white">
      <SEO
        title="Eyeshadow Palette Collection | COSKINn"
        description="Discover luxury eyeshadow palettes from COSKINn. Ultra-pigmented mattes and stunning shimmers that blend effortlessly."
      />

      {/* =========================================
          SECTION 1: LUXURY HERO
          ========================================= */}
      <section className="relative w-full min-h-[100vh] flex items-center overflow-hidden bg-[#FFF5F7] pt-24 lg:pt-32 pb-16">
        <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-12 relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between h-full pt-16 lg:pt-0">

          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left z-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-[#FFC2D1]/50 text-[#FF8FB1] font-bold text-xs uppercase tracking-widest mb-6 w-fit mx-auto lg:mx-0 shadow-sm">
              <Sparkles size={14} className="text-[#FF8FB1]" />
              New Launch
            </div>

            <h1 className="text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] font-heading font-black text-[#75263F] leading-[0.9] uppercase tracking-tighter mb-6">
              Eyeshadow <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1] font-light italic">Artistry.</span>
            </h1>

            <p className="text-lg md:text-xl text-[#75263F]/70 font-medium max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">
              Experience the ultimate luxury. 12 ultra-pigmented, buttery shades in matte and shimmer finishes that blend effortlessly and last all day.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button
                onClick={() => document.getElementById('collection').scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto h-14 px-10 rounded-full bg-[#FF0069] text-white font-bold uppercase tracking-widest text-sm hover:bg-[#d60058] transition-colors shadow-[0_10px_30px_rgba(255,0,105,0.3)] hover:shadow-[0_15px_40px_rgba(255,0,105,0.4)] flex items-center justify-center"
              >
                Discover Palettes
              </button>
            </div>
          </motion.div>

          {/* Right: Transparent Cutout Image */}
          <motion.div
            style={{ y: heroY }}
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full lg:w-1/2 h-[50vh] lg:h-auto relative flex items-center justify-center lg:justify-end z-10 mb-12 lg:mb-0"
          >
            <img
              src={heroCutout}
              alt="COSKINn Eyeshadow Palette"
              className="w-full lg:w-[140%] h-auto max-h-[85vh] object-contain transform translate-x-0 lg:translate-x-8"
            />
          </motion.div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: DISCOVER YOUR PALETTE
          ========================================= */}
      <section className="py-24 bg-[#FFFDFD] relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-light text-[#75263F] uppercase tracking-widest">
              Discover Your <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Palette</span>
            </h2>
          </motion.div>

          {/* Horizontal Elegant Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Nude Elegance", shades: "12 Shades", finish: "Matte & Shimmer", desc: "Your everyday essential neutrals." },
              { title: "Sunset Glow", shades: "12 Shades", finish: "Warm Metallics", desc: "Fiery coppers and rich oranges." },
              { title: "Rose Romance", shades: "12 Shades", finish: "Soft Pinks", desc: "Romantic blush and mauve tones." },
              { title: "Smokey Luxe", shades: "12 Shades", finish: "Cool Greys", desc: "Sultry shades for evening drama." },
              { title: "Golden Glam", shades: "12 Shades", finish: "Rich Golds", desc: "Luminous metallics that dazzle." },
              { title: "Berry Muse", shades: "12 Shades", finish: "Deep Plums", desc: "Bold, intense berry hues." }
            ].map((variant, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => document.getElementById('collection').scrollIntoView({ behavior: 'smooth' })}
                className="group cursor-pointer bg-white border border-[#FFC2D1]/30 rounded-[32px] p-8 shadow-[0_10px_30px_rgba(255,194,209,0.1)] hover:shadow-[0_20px_40px_rgba(255,143,177,0.2)] transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                <div className="w-full aspect-square bg-[#FFF5F7] rounded-2xl mb-8 flex items-center justify-center overflow-hidden">
                  <img src={heroPalette} alt={variant.title} className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-700 ease-out drop-shadow-xl" />
                </div>

                <h3 className="text-2xl font-heading font-bold text-[#75263F] mb-2 group-hover:text-[#FF0069] transition-colors">{variant.title}</h3>
                <p className="text-[#75263F]/70 text-sm font-medium mb-6 leading-relaxed">{variant.desc}</p>

                <div className="flex items-center gap-4 mt-auto mb-6">
                  <div className="bg-[#FFF5F7] text-[#FF8FB1] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider">{variant.shades}</div>
                  <div className="bg-[#FFF5F7] text-[#FF8FB1] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider">{variant.finish}</div>
                </div>

                <button className="w-full h-12 rounded-full bg-[#FFFDFD] border border-[#FFC2D1]/60 text-[#FF0069] font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-[#FF0069] group-hover:to-[#FF8FB1] group-hover:text-white group-hover:border-transparent transition-all duration-500 shadow-sm">
                  <ShoppingBag className="w-4 h-4" /> Shop Now
                </button>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================
          SECTION 3: WHY YOU'LL LOVE IT
          ========================================= */}
      <section className="py-24 bg-[#FFF5F7] relative z-10 border-y border-[#FFC2D1]/30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left: Imagery */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FFC2D1]/40 to-transparent rounded-[40px] transform rotate-3 scale-105 pointer-events-none" />
              <img src={featureImg2} alt="Eyeshadow Swatches" className="relative z-10 w-full h-auto rounded-[40px] shadow-[0_30px_60px_rgba(255,194,209,0.3)] object-cover aspect-[4/3]" />
            </motion.div>

            {/* Right: Editorial Features */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[1px] bg-[#FF8FB1]"></span>
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#FF8FB1]">Premium Formula</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-heading font-light text-[#75263F] uppercase tracking-widest mb-12">
                Why You'll <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Love It</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Highly Pigmented", desc: "One-swipe intense color payoff." },
                  { title: "Blendable Formula", desc: "Seamlessly diffuses into the skin." },
                  { title: "Long Lasting", desc: "Stays vibrant all day and night." },
                  { title: "Smooth Texture", desc: "Buttery powders that glide effortlessly." },
                  { title: "Matte & Shimmer Mix", desc: "Versatile finishes for any occasion." },
                  { title: "Minimal Fallout", desc: "Clings perfectly to the eyelids." }
                ].map((tech, i) => (
                  <div
                    key={i}
                    className="group bg-white/60 backdrop-blur-sm border border-[#FFC2D1]/40 p-6 rounded-[24px] hover:bg-white hover:shadow-[0_15px_30px_rgba(255,194,209,0.2)] transition-all duration-500"
                  >
                    <h3 className="text-lg font-heading font-bold text-[#75263F] uppercase tracking-wide mb-2 group-hover:text-[#FF0069] transition-colors duration-500">
                      {tech.title}
                    </h3>
                    <p className="text-[#75263F]/70 text-sm font-medium leading-relaxed">
                      {tech.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* =========================================
          SECTION 4: CREATE EVERY LOOK
          ========================================= */}
      <section className="py-24 bg-[#FFFDFD] relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-light text-[#75263F] uppercase tracking-widest">
              Create Every <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Look</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { img: lookNude, title: "Everyday Nude Look", desc: "Soft and natural." },
              { img: lookOffice, title: "Office Look", desc: "Subtle professional definition." },
              { img: lookParty, title: "Party Glam", desc: "Dazzling shimmers and bold colors." },
              { img: lookBridal, title: "Bridal Look", desc: "Elegant, timeless romance." },
              { img: lookSmokey, title: "Smokey Eye", desc: "Sultry, deep drama." },
              { img: lookEvening, title: "Evening Look", desc: "Sophisticated and intense." }
            ].map((look, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-[32px] overflow-hidden aspect-square shadow-[0_20px_40px_rgba(255,194,209,0.15)]"
              >
                <img src={look.img} alt={look.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#75263F]/90 via-[#75263F]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-full p-8 text-left translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl font-heading font-bold text-white mb-2">{look.title}</h3>
                  <p className="text-white/80 font-medium text-sm">{look.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================
          SECTION 5: SHOP THE COLLECTION
          ========================================= */}
      <section id="collection" className="pt-8 pb-24 bg-[#FFF5F7] relative overflow-hidden border-t border-[#FFC2D1]/30">
        <div className="absolute right-0 bottom-0 w-[30vw] h-[30vw] bg-gradient-to-bl from-[#FF8FB1]/15 to-[#FFFDFD] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-black text-[#75263F] uppercase tracking-tight">
              Eyeshadow Palette <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Collection</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 w-full">
            {eyeshadowProducts.map((product, idx) => (
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

                  {/* Quick View Button on Hover */}
                  <div className="absolute inset-0 bg-[#75263F]/5 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center z-10">
                    <span className="bg-white/90 backdrop-blur-md text-[#FF0069] font-bold text-xs uppercase tracking-widest px-6 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      Quick View
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleWishlist(e, product)}
                    className={`absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm transition-colors duration-300 ${isInWishlist(product.id) ? 'text-[#FF0069]' : 'text-[#75263F]/30 hover:text-[#FF0069]'}`}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </button>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-1000 ease-out relative z-0"
                  />
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
                    className="w-full h-12 rounded-full bg-[#FFFDFD] border border-[#FFC2D1]/60 text-[#FF0069] font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-[#FF0069] group-hover:to-[#FF8FB1] group-hover:text-white group-hover:border-transparent transition-all duration-500 shadow-sm relative z-20"
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
