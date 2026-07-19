import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Star, ShoppingBag, Plus } from 'lucide-react';
import Footer from '../../components/common/Footer';
import modelImage from '../../assets/images/cat_lips_1784312601813.webp';
import linerImg from '../../assets/images/cosmetics_editorial_lifestyle.webp';

export default function PrecisionLipLinerCollectionPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shades = [
    { name: "Nude Rose", color: "#d9a59a", originalPrice: 899, price: 699, discount: 22, id: 306 },
    { name: "Soft Peach", color: "#e8a08c", originalPrice: 899, price: 699, discount: 22, id: 306 },
    { name: "Classic Brown", color: "#7a4b3a", originalPrice: 899, price: 699, discount: 22, id: 306 },
    { name: "Berry Pink", color: "#a43e5c", originalPrice: 899, price: 699, discount: 22, id: 306 },
    { name: "Cherry Red", color: "#a51920", originalPrice: 899, price: 699, discount: 22, id: 306 },
    { name: "Wine Plum", color: "#612134", originalPrice: 899, price: 699, discount: 22, id: 306 }
  ];

  return (
    <div className="w-full min-h-screen bg-[#FFFDFD] font-sans text-black overflow-hidden relative">
      
      {/* 1. Immersive Hero - Fixed Spacing & Colors */}
      <section className="relative w-full h-[90vh] min-h-[700px] flex items-center justify-center bg-gradient-to-br from-[#FFF0F3] via-[#FFF5F7] to-[#FFE5EC] pt-24 lg:pt-32">
        
        {/* Soft Ambient Glows */}
        <div className="absolute top-0 right-0 w-[60%] h-[80%] rounded-full bg-white/40 blur-3xl mix-blend-overlay pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#FF8FB1]/10 blur-3xl pointer-events-none" />

        {/* Top Gradient to protect Navbar readability */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/90 to-transparent z-10 pointer-events-none" />

        {/* Model Image - Brightened and properly masked */}
        <div className="absolute inset-0 flex items-end lg:items-center justify-end overflow-hidden z-0 mt-24 lg:mt-0">
          <motion.img 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={modelImage} 
            alt="Precision Lip Liner Campaign" 
            className="w-full lg:w-[55%] h-[80%] lg:h-[90%] object-cover object-center lg:object-right opacity-90 brightness-110 contrast-100 mix-blend-multiply mb-0 lg:mb-auto"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 100%)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 100%)'
            }}
          />
        </div>

        {/* Hero Content - Shifted down to clear navbar */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col justify-center h-full">
          <div className="max-w-2xl text-left pt-10 lg:pt-0">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md shadow-sm border border-white/80"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF8FB1] animate-pulse"></span>
              <span className="text-[#FF8FB1] font-bold uppercase tracking-[0.2em] text-[10px]">The Sculpted Edit</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-[100px] font-heading font-black uppercase tracking-tighter text-black leading-[0.9] mb-4"
            >
              Precision<br/>
              <span className="font-light italic tracking-tight text-[#FF8FB1] ml-2 lg:ml-12 drop-shadow-sm">Redefined.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-gray-700 font-light mt-6 mb-10 max-w-md leading-relaxed bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-white/50"
            >
              Master the art of the perfect pout. Waterproof, 12-hour wear that glides like velvet and sets flawlessly. 
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button 
                onClick={() => document.getElementById('collection-grid').scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-3 bg-[#FF8FB1] text-white px-8 py-4 font-bold uppercase tracking-widest text-[11px] rounded-full shadow-[0_8px_25px_rgba(255,143,177,0.4)] hover:bg-[#ff759f] hover:shadow-[0_12px_35px_rgba(255,143,177,0.6)] hover:-translate-y-1 transition-all duration-300"
              >
                Discover Collection <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Luxury Product Grid */}
      <section id="collection-grid" className="py-24 px-6 bg-[#FFFDFD] relative z-10">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-heading font-black text-black uppercase tracking-tight mb-2">
                The <span className="text-[#FF8FB1] italic font-light">Collection</span>
              </h2>
              <p className="text-gray-500 font-light text-[15px]">Six universal hues crafted for every skin tone.</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {shades.map((shade, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative bg-[#FFF0F3]/40 backdrop-blur-xl rounded-[32px] p-4 lg:p-6 border border-white shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(255,143,177,0.2)] hover:border-[#FF8FB1]/40 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
                onClick={() => navigate(`/product/${shade.id}`)}
              >
                
                {/* Image Container with Badges */}
                <div className="relative aspect-square w-full rounded-2xl bg-white/80 overflow-hidden mb-6 flex items-center justify-center p-8 group-hover:bg-white transition-colors duration-500">
                  
                  {/* Badges & Icons */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[#FF8FB1] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md">
                      {shade.discount}% OFF
                    </span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); /* Add wishlist logic */ }}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#FF8FB1] hover:border-[#FF8FB1] shadow-sm transition-all"
                  >
                    <Heart size={18} />
                  </button>

                  {/* Product Image */}
                  <img 
                    src={linerImg} 
                    alt="Precision Lip Liner" 
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 ease-[0.16,1,0.3,1]" 
                  />
                  
                  {/* Shade Swatch Bubble overlaying image corner */}
                  <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full border-2 border-white shadow-md flex items-center justify-center z-10" style={{ backgroundColor: shade.color }}>
                     <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Details Container */}
                <div className="flex flex-col flex-grow px-2">
                  <div className="flex items-center gap-1 text-[#FF8FB1] mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                    <span className="text-[10px] text-gray-400 font-medium ml-1">(4.8)</span>
                  </div>

                  <h3 className="font-heading font-black text-xl text-black mb-1">COSKINn Precision Lip Liner</h3>
                  <p className="text-sm text-gray-500 font-light mb-4">Shade: <span className="font-medium text-black">{shade.name}</span></p>

                  <div className="mt-auto flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-black">₹{shade.price}</span>
                      <span className="text-sm text-gray-400 line-through">₹{shade.originalPrice}</span>
                    </div>

                    {/* Add to Cart Button */}
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        // Route to PDP as per shopping flow rules, or execute Add to Cart logic
                        navigate(`/product/${shade.id}`);
                      }}
                      className="w-full py-3.5 rounded-xl bg-[#FF8FB1]/10 text-[#FF8FB1] font-bold uppercase tracking-widest text-[11px] hover:bg-[#FF8FB1] hover:text-white hover:shadow-[0_8px_20px_rgba(255,143,177,0.3)] transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={14} /> Add to Cart
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 3 & 4. Combined Editorial Sections: The Formulation & Routine */}
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
                {[
                  { title: "Ultra-Precise", desc: "Sharpenable tip for creating the sharpest lines and perfect cupids bow." },
                  { title: "Velvet Glide", desc: "Creamy formula that never tugs, pulls, or skips during application." },
                  { title: "12-Hour Lock", desc: "Waterproof and smudge-proof formula that locks your lip color in place." }
                ].map((feature, idx) => (
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
                  { step: "Prep", name: "COSKINn Lip Scrub", img: modelImage },
                  { step: "Line", name: "COSKINn Precision Lip Liner", img: linerImg },
                  { step: "Color", name: "COSKINn Magnetic Lipstick", img: modelImage }
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
