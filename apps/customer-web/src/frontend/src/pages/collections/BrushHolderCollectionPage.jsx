import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Footer from '../../components/common/Footer';
import SEO from '../../components/common/SEO';
import { cosmeticsProducts } from '../../constants/cosmeticsProducts';

// Images
import heroImg from '../../assets/images/brush_holder.png'; // transparent png
import featureImg1 from '../../assets/images/cosmetics_why_choose_floating.webp';
import featureImg2 from '../../assets/images/cosmetics_why_choose_main_new.webp';

const holderProducts = cosmeticsProducts.filter(p => [308, 361, 362, 363, 364].includes(p.id)).map(p => ({
  ...p,
  shade: p.id === 308 ? "Rose Gold Trim" : p.name.split(" - ")[1] || p.name,
  badge: p.id === 308 ? "New Arrival" : null,
  discountBadge: p.id === 308 ? "18% OFF" : p.originalPrice ? "SALE" : null,
  isVegan: true,
  tag: "Pro Tools"
}));

const features = [
  {
    title: "Elegant Fluted Glass",
    desc: "A stunning centerpiece for your vanity that beautifully organizes your luxury tools.",
    image: featureImg1
  },
  {
    title: "Rose Gold Details",
    desc: "Premium rose gold rim for a touch of modern sophistication.",
    image: featureImg2
  }
];

export default function BrushHolderCollectionPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 300]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleProductClick = (slug) => {
    navigate(`/product/${slug}`);
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
        title="Luxury Brush Holder | COSKINn"
        description="Organize your vanity in style with the COSKINn Luxury Fluted Glass Brush Holder."
        url="https://www.coskinn.com/collections/brush-holder"
      />

      {/* =========================================
          SECTION 1: LUXURY HERO
          ========================================= */}
      <section className="relative w-full min-h-[100vh] lg:min-h-screen flex items-center overflow-hidden pt-[120px] pb-10 bg-gradient-to-r from-[#FFF0F4] to-[#FFE0E9]">
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full flex flex-col lg:flex-row items-center h-full gap-4 relative z-10">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-20 pt-10"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/60 backdrop-blur-md border border-[#75263F]/20 text-xs font-bold tracking-[0.2em] uppercase text-[#75263F] shadow-sm mb-6">
              Vanity Elegance
            </span>

            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-black text-[#75263F] leading-[0.95] tracking-tight uppercase mb-6">
              Brush <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Holder.</span>
            </h1>

            <p className="text-[#75263F]/70 text-base md:text-lg max-w-md font-medium leading-relaxed mb-10">
              The ultimate luxury home for your pro tools. Designed with fluted glass and rose gold trim to elevate your everyday routine.
            </p>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('collection').scrollIntoView({ behavior: 'smooth' })}
              className="group relative h-14 px-10 rounded-full bg-gradient-to-r from-[#FF0069] to-[#FF8FB1] text-white font-bold uppercase tracking-widest text-sm shadow-[0_10px_30px_rgba(255,0,105,0.3)] hover:shadow-[0_15px_40px_rgba(255,0,105,0.4)] transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full" />
              <span className="relative z-10 flex items-center gap-2">
                Discover The Holder <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </motion.button>
          </motion.div>

          {/* Right Image (Transparent Hero) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-1/2 flex justify-end items-center relative h-[50vh] lg:h-[80vh] z-10"
          >
            <motion.img 
              style={{ y: yParallax }}
              src={heroImg} 
              alt="Brush Holder" 
              className="w-[120%] lg:w-[90%] h-[120%] lg:h-[110%] object-contain object-right drop-shadow-2xl origin-right scale-110"
            />
          </motion.div>
        </div>

      </section>

      {/* =========================================
          SECTION 2: WHY YOU'LL LOVE IT
          ========================================= */}
      <section className="pt-8 pb-16 bg-[#FFFDFD] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-light text-[#75263F] uppercase tracking-widest">
              Elevate Your <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Space</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mx-auto">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="group relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(255,194,209,0.2)]"
              >
                <img src={feature.image} alt={feature.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl md:text-3xl font-heading font-black text-white uppercase tracking-wider mb-2">{feature.title}</h3>
                  <p className="text-white/80 font-medium text-sm md:text-base max-w-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3: COLLECTION GRID
          ========================================= */}
      <section id="collection" className="pt-8 pb-20 bg-gradient-to-b from-[#FFFDFD] to-[#FFE0E9]/30 border-t border-[#FFC2D1]/20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-black text-[#75263F] uppercase tracking-widest mb-4">
              Shop The Holder
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {holderProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-[#FFC2D1]/30 hover:border-[#FF8FB1] hover:shadow-[0_20px_50px_rgba(255,194,209,0.3)] transition-all duration-500"
              >
                {product.badge && (
                  <div className="absolute top-4 left-4 z-20 bg-[#75263F] text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-full shadow-md">
                    {product.badge}
                  </div>
                )}
                
                {product.discountBadge && (
                  <div className="absolute top-4 right-4 z-20 bg-[#FF0069] text-white text-[10px] font-black uppercase tracking-widest py-1.5 px-3 rounded-full shadow-md">
                    {product.discountBadge}
                  </div>
                )}

                <button 
                  onClick={(e) => handleWishlist(e, product)}
                  className="absolute top-14 right-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-md text-[#75263F] hover:text-[#FF8FB1] hover:bg-white transition-all shadow-sm"
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-[#FF0069] text-[#FF0069]' : ''}`} />
                </button>

                <Link to={`/product/${product.slug}`} className="block relative aspect-square bg-[#FFFDFD] overflow-hidden cursor-pointer flex items-center justify-center p-6 group-hover:bg-[#FFC2D1]/10 transition-colors">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={product.image} 
                    alt={product.name}
                    className="w-[90%] h-[90%] object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-[#75263F] text-white text-xs font-bold uppercase tracking-widest py-3 px-6 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      Quick View
                    </span>
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF8FB1]">{product.shade}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#FF8FB1] text-[#FF8FB1]" />
                      <span className="text-xs font-bold text-[#75263F]">{product.rating}</span>
                    </div>
                  </div>
                  
                  <h3 
                    onClick={() => handleProductClick(product.slug)}
                    className="text-lg font-heading font-black text-[#75263F] uppercase leading-tight mb-2 cursor-pointer hover:text-[#FF8FB1] transition-colors"
                  >
                    {product.name}
                  </h3>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xl font-black text-[#FF8FB1]">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs font-bold text-[#75263F]/40 line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                    
                    <button 
                      onClick={(e) => handleBuy(e, product)}
                      className="w-10 h-10 rounded-full bg-[#FFE0E9] hover:bg-[#FF8FB1] text-[#75263F] hover:text-white flex items-center justify-center transition-colors shadow-sm"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
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
