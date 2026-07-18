import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../../components/common/Footer';
import { Sparkles, Droplets, CheckCircle, Star, Plus } from 'lucide-react';
import lipstickHeroImg from '../../assets/images/cosmetics_editorial_lifestyle.png';
import lipstickSide from '../../assets/images/cat_magnetic_lipstick.webp';
import lipstickModel from '../../assets/images/cosmetics_before_model.webp';
import lipstickAfter from '../../assets/images/cosmetics_after_model.webp';
import { cosmeticsProducts } from '../../constants/cosmeticsProducts';

export default function MagneticLipstickCollectionPage() {
  const [showAfter, setShowAfter] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    { title: "One-Stroke Pigment", desc: "Intense color payoff that lasts all day.", icon: <Sparkles className="w-6 h-6" /> },
    { title: "Velvet-Matte Finish", desc: "A luxurious, non-drying texture.", icon: <Droplets className="w-6 h-6" /> },
    { title: "12-Hour Wear", desc: "Transfer-resistant formulation.", icon: <CheckCircle className="w-6 h-6" /> }
  ];

  // Only get the 6 magnetic lipstick variants for the featured section
  const lipstickVariants = cosmeticsProducts.filter(p => p.name.includes('Magnetic Lipstick'));

  return (
    <div className="w-full min-h-screen bg-[#FFFDFD] font-sans text-black">
      
      {/* 1. Premium Hero Section - Light Blush Pink & Soft Peach */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#FFF0F3] via-[#FFF5F7] to-[#FFE5EC]">
        
        {/* Soft Peach Accent Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-[#FFE5D9]/40 to-transparent blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-bl from-[#FFC2D1]/30 to-transparent blur-3xl" />
        
        <div className="absolute inset-0 flex items-end justify-end z-0 opacity-90 lg:opacity-100 overflow-hidden">
          <motion.img 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={lipstickHeroImg} 
            alt="Magnetic Lipstick Collection" 
            className="w-full lg:w-1/2 h-full object-cover object-right mix-blend-multiply"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 25%)'
            }}
          />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20 flex flex-col justify-center h-full">
          <div className="max-w-2xl text-center lg:text-left">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="block text-[#FF8FB1] font-bold uppercase tracking-[0.3em] mb-6 text-sm"
            >
              The New Standard
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-black uppercase tracking-tight text-black mb-8 leading-[0.9]"
            >
              Magnetic <br/> Velvet
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-lg md:text-xl text-gray-700 font-light mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Discover the ultimate in lip luxury. A weightless, intensely pigmented formula housed in our signature magnetic case.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <button 
                onClick={() => document.getElementById('choose-your-shade').scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#FF8FB1] text-white px-10 py-5 font-bold uppercase tracking-widest text-xs rounded-2xl hover:bg-[#ff759f] transition-colors shadow-md hover:shadow-lg"
              >
                Explore Collection
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Choose Your Shade (Moved right after Hero) */}
      <section id="choose-your-shade" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-black text-black uppercase mb-4 tracking-tight">Choose Your Shade</h2>
            <p className="text-gray-500 font-light text-lg">Find your perfect velvet-matte match.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {lipstickVariants.map((product) => (
              <div key={product.id} className="group relative bg-white border border-[#FFC2D1]/30 hover:border-[#FF8FB1] transition-colors p-6 rounded flex flex-col h-full">
                {product.discountBadge && (
                  <div className="absolute top-6 left-6 z-10 bg-[#FF8FB1] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {product.discountBadge}
                  </div>
                )}
                
                <div className="relative aspect-square mb-8 overflow-hidden rounded bg-[#FFF5F7] flex items-center justify-center">
                  <img src={product.image} alt={product.name} className="w-3/4 h-3/4 object-contain transition-transform duration-700 group-hover:scale-105 mix-blend-multiply" />
                  
                  {/* Shade Color Dot Overlay */}
                  {product.shadeColor && (
                    <div 
                      className="absolute bottom-4 right-4 w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: product.shadeColor }}
                    />
                  )}
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-4 h-4 fill-[#FF8FB1] text-[#FF8FB1]" />
                      <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                    </div>
                    <h3 className="text-lg font-bold text-black mb-3 uppercase tracking-wide leading-tight">{product.name}</h3>
                    
                    <div className="flex items-center gap-3 mb-8">
                      <span className="text-2xl font-black text-[#FF8FB1]">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm font-medium text-gray-400 line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <Link 
                    to={`/product/${product.id}`}
                    className="w-full bg-[#FF8FB1] text-white h-14 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs rounded-2xl hover:bg-[#ff759f] transition-colors shadow-sm"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Story removed based on instructions */}

      {/* 4 & 5. Combined Editorial Sections: The Formulation & Routine */}
      <section className="py-16 bg-[#FFF0F3] border-t border-[#FFC2D1]/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left: The Formulation */}
            <div>
              <div className="mb-10">
                <span className="text-[#FF8FB1] text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">The Science</span>
                <h2 className="text-3xl md:text-4xl font-heading font-black text-black uppercase tracking-tight">Why You'll <span className="text-[#FF8FB1] italic font-light">Love It</span></h2>
              </div>
              
              <div className="flex flex-col gap-6">
                {features.map((feature, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    key={idx}
                    className="group flex gap-5 items-start"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#FFE5EC] flex items-center justify-center shrink-0 border border-[#FFC2D1]/50 group-hover:bg-[#FF8FB1] group-hover:border-[#FF8FB1] transition-colors duration-300">
                      <span className="text-[#FF8FB1] font-bold text-xs group-hover:text-white transition-colors">0{idx + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-black uppercase tracking-widest mb-1 group-hover:text-[#FF8FB1] transition-colors">{feature.title}</h3>
                      <p className="text-gray-500 font-light text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: The Routine */}
            <div>
              <div className="mb-10">
                <span className="text-[#FF8FB1] text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">Perfect Pairings</span>
                <h2 className="text-3xl md:text-4xl font-heading font-black text-black uppercase tracking-tight">Your <span className="text-[#FF8FB1] italic font-light">Routine</span></h2>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { step: "Prep", name: "COSKINn Lip Scrub", img: lipstickModel },
                  { step: "Line", name: "COSKINn Precision Lip Liner", img: lipstickSide },
                  { step: "Color", name: "COSKINn Magnetic Lipstick", img: lipstickHeroImg }
                ].map((item, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    key={idx}
                    className="group flex items-center justify-between p-4 bg-white rounded-2xl border border-[#FFC2D1]/30 hover:border-[#FF8FB1] hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-100 bg-gray-50 shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#FF8FB1] mb-0.5 block">Step {idx + 1}: {item.step}</span>
                        <h4 className="text-sm font-bold text-black uppercase tracking-wide">{item.name}</h4>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#FF8FB1] group-hover:text-white transition-colors">
                      <Plus className="w-4 h-4" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
