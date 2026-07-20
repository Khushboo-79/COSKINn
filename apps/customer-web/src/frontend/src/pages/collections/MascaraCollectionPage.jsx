import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Footer from '../../components/common/Footer';
import SEO from '../../components/common/SEO';

// Images
import heroModel from '../../assets/images/cat_mascara_model.webp';
import floatingMascara from '../../assets/images/cosmetics_floating_mascara.webp';
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
    image: mascaraProductImg,
    discountBadge: "MOST LOVED"
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
      <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden pt-[110px]">
        {/* Luxury Background Gradient (Extends to top) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFC2D1]/40 via-[#FFFDFD] to-[#FF8FB1]/20 -z-10" />
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-gradient-to-bl from-[#FF0069]/5 to-transparent rounded-full blur-[120px] -z-10" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full flex flex-col-reverse lg:flex-row items-center h-full gap-12 lg:gap-0 pb-16">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-20"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/60 backdrop-blur-md border border-[#FF8FB1]/30 text-xs font-bold tracking-[0.2em] uppercase text-[#FF0069] shadow-sm mb-6">
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

          {/* Right Image (Editorial Style - No Container) */}
          <div className="w-full lg:w-1/2 relative h-[50vh] lg:h-[75vh] flex justify-center items-center">
            <motion.div 
              style={{ y: yParallax }}
              className="absolute inset-0 w-full h-full flex justify-center items-end lg:items-center"
            >
              <img 
                src={heroModel} 
                alt="Lift & Curl Model" 
                className="w-full h-[120%] lg:h-[130%] object-cover mix-blend-multiply opacity-95 pointer-events-none"
              />
              {/* Bottom fade to seamlessly blend image */}
              <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#FFFDFD] to-transparent pointer-events-none mix-blend-overlay" />
            </motion.div>

            {/* Floating Product Element */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: -10 }}
              animate={{ opacity: 1, y: 0, rotate: -15 }}
              transition={{ duration: 1.2, delay: 0.5, type: 'spring', bounce: 0.4 }}
              className="absolute right-0 lg:right-[-5%] top-[20%] lg:top-[30%] w-28 md:w-40 lg:w-48 drop-shadow-2xl z-30"
              style={{
                animation: 'float-slow 6s ease-in-out infinite'
              }}
            >
              <img 
                src={floatingMascara} 
                alt="Mascara Tube" 
                className="w-full h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(255,0,105,0.2)]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: WHY YOU'LL LOVE IT
          ========================================= */}
      <section className="py-24 bg-[#FFFDFD] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-black text-[#75263F] uppercase tracking-tight">
              Why You'll <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Love It</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="group relative h-[420px] rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(255,194,209,0.15)] hover:shadow-[0_20px_50px_rgba(255,143,177,0.3)] transition-all duration-700 hover:-translate-y-2 bg-white border border-[#FFC2D1]/40"
              >
                <div className="absolute inset-0 w-full h-[60%] overflow-hidden rounded-t-[32px]">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-[#75263F]/5 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white/95 to-transparent z-10" />
                </div>
                
                <div className="absolute bottom-0 inset-x-0 h-[45%] bg-white/70 backdrop-blur-xl p-8 flex flex-col justify-center border-t border-white/60 z-20">
                  <h3 className="text-2xl font-heading font-black text-[#75263F] mb-3 uppercase tracking-wide group-hover:text-[#FF0069] transition-colors duration-500">
                    {feature.title}
                  </h3>
                  <p className="text-[#75263F]/70 font-medium leading-relaxed">
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
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-gradient-to-tr from-[#FFC2D1]/30 to-[#FFFDFD] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 rounded-[40px] overflow-hidden shadow-[0_15px_50px_rgba(255,194,209,0.2)] relative bg-white border border-[#FFC2D1]/30"
          >
            <img src={brushTechImg} alt="Mascara Brush Close-up" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#FF8FB1] mb-4 block">Precision Engineering</span>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-[#75263F] uppercase tracking-tight mb-10 leading-tight">
              The Architecture of <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">Volume</span>
            </h2>
            
            <div className="space-y-8">
              {[
                { title: "Curved Silhouette", desc: "Hugs the natural lash line to catch every single hair from root to tip." },
                { title: "Dual-Bristle Matrix", desc: "Short bristles build dramatic volume, while long bristles separate and lengthen." },
                { title: "Micro-Precision Tip", desc: "Effortlessly coats the inner and lower lashes without smudging." }
              ].map((tech, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="w-1.5 h-auto rounded-full bg-gradient-to-b from-[#FFC2D1] to-[#FFFDFD] group-hover:from-[#FF0069] group-hover:to-[#FF8FB1] transition-all duration-500" />
                  <div>
                    <h4 className="text-xl font-heading font-black text-[#75263F] mb-2 uppercase tracking-wide group-hover:text-[#FF0069] transition-colors duration-500">{tech.title}</h4>
                    <p className="text-[#75263F]/70 font-medium leading-relaxed">{tech.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================
          SECTION 4: THE COLLECTION (PDP LINK)
          ========================================= */}
      <section id="collection" className="py-24 bg-[#FFFDFD] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[30vw] h-[30vw] bg-gradient-to-bl from-[#FF8FB1]/15 to-[#FFFDFD] rounded-full blur-[100px] pointer-events-none" />
        
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

          <div className="flex justify-center max-w-sm mx-auto">
            {mascaraProducts.map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onClick={() => handleProductClick(product.id)}
                className="w-full group cursor-pointer bg-white/60 backdrop-blur-lg rounded-[32px] p-5 shadow-[0_8px_30px_rgba(255,194,209,0.15)] hover:shadow-[0_20px_50px_rgba(255,143,177,0.3)] transition-all duration-700 border border-[#FFC2D1]/40 hover:-translate-y-2 flex flex-col"
              >
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-[#FFFDFD]">
                  {product.discountBadge && (
                    <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-[#FF0069] to-[#FF8FB1] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-[0_5px_15px_rgba(255,0,105,0.3)]">
                      {product.discountBadge}
                    </div>
                  )}
                  <button 
                    onClick={(e) => handleWishlist(e, product)}
                    className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm transition-colors duration-300 ${isInWishlist(product.id) ? 'text-[#FF0069]' : 'text-[#75263F]/30 hover:text-[#FF0069]'}`}
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </button>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-[#75263F]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                </div>

                <div className="flex flex-col flex-1 text-center px-2">
                  <h3 className="font-heading font-black text-xl text-[#75263F] mb-1 group-hover:text-[#FF0069] transition-colors duration-500 uppercase tracking-wide">
                    {product.name}
                  </h3>
                  <p className="text-[13px] font-medium text-[#75263F]/60 mb-5">{product.shade}</p>
                  
                  <div className="flex items-center justify-center gap-3 mb-6 mt-auto">
                    <span className="text-2xl font-black text-[#FF0069]">₹{product.price}</span>
                    <span className="text-sm font-bold text-[#75263F]/40 line-through">₹{product.originalPrice}</span>
                  </div>

                  <button
                    onClick={(e) => handleBuy(e, product)}
                    className="w-full h-14 rounded-full bg-[#FFFDFD] border border-[#FFC2D1]/60 text-[#FF0069] font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-[#FF0069] group-hover:to-[#FF8FB1] group-hover:text-white group-hover:border-transparent transition-all duration-500 shadow-sm"
                  >
                    <ShoppingBag className="w-5 h-5" /> Add To Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(-15deg); }
          50% { transform: translateY(-20px) rotate(-12deg); }
        }
      `}} />
    </div>
  );
}
