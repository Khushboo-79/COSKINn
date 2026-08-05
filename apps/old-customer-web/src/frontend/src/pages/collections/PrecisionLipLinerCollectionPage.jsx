import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, Star, ShoppingBag, Plus, Search } from 'lucide-react';
import Footer from '../../components/common/Footer';
import modelImage from '../../assets/images/premium_fairy_hero_products.webp';
import linerImg from '../../assets/images/fairy_lipstick_clean.webp';
import editorialBg from '../../assets/images/enchanted_butterflies_hero_clean.webp';

export default function PrecisionLipLinerCollectionPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shades = [
    { name: "Nude Rose", color: "#d9a59a", originalPrice: 899, price: 699, discount: 22, id: 306, category: "Nudes" },
    { name: "Soft Peach", color: "#e8a08c", originalPrice: 899, price: 699, discount: 22, id: 306, category: "Nudes" },
    { name: "Classic Brown", color: "#7a4b3a", originalPrice: 899, price: 699, discount: 22, id: 306, category: "Browns" },
    { name: "Berry Pink", color: "#a43e5c", originalPrice: 899, price: 699, discount: 22, id: 306, category: "Pinks" },
    { name: "Cherry Red", color: "#a51920", originalPrice: 899, price: 699, discount: 22, id: 306, category: "Reds" },
    { name: "Wine Plum", color: "#612134", originalPrice: 899, price: 699, discount: 22, id: 306, category: "Plums" }
  ];

  const filterOptions = ["All", "Nudes", "Browns", "Pinks", "Reds", "Plums"];

  const filteredShades = shades.filter(shade => {
    const matchesSearch = shade.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || shade.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full min-h-screen bg-[#FFFDFD] font-sans text-black overflow-hidden relative">

      {/* 1. Immersive Hero - Fixed Spacing & Colors */}
      <section className="relative w-full h-[90vh] min-h-[700px] flex items-center justify-center bg-gradient-to-br from-[#FFF0F3] via-[#FFF5F7] to-[#FFE5EC] pt-24 lg:pt-32">

        {/* Soft Ambient Glows */}
        <div className="absolute top-0 right-0 w-[60%] h-[80%] rounded-full bg-white/40 blur-3xl mix-blend-overlay pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#FF8FB1]/10 blur-3xl pointer-events-none" />

        {/* Top Gradient to protect Navbar readability */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/90 to-transparent z-10 pointer-events-none" />

        {/* Model Image - Full Width */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0">
          <motion.img
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={modelImage}
            alt="Precision Lip Liner Campaign"
            className="w-full h-full object-cover object-center opacity-80 mix-blend-multiply"
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
              className="text-5xl md:text-7xl lg:text-[100px] font-heading font-black uppercase tracking-tighter text-white leading-[0.9] mb-4 drop-shadow-md"
            >
              Precision<br />
              <span className="font-light italic tracking-tight text-[#FF8FB1] ml-2 lg:ml-12 drop-shadow-lg">Redefined.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-white font-light mt-6 mb-10 max-w-md leading-relaxed bg-black/20 backdrop-blur-sm p-4 rounded-2xl border border-white/30 drop-shadow-sm"
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
      <section id="collection-grid" className="pt-[2px] pb-24 px-6 relative z-10 overflow-hidden">
        {/* Magical Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF0F3]/30 via-[#FFFDFD] to-[#FFE5EC]/20 pointer-events-none -z-10" />
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[40%] bg-[#FF8FB1]/10 blur-[150px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[50%] bg-[#FFE0E9]/40 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-[1400px] mx-auto relative z-10">

          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto"
            >
              <div className="relative w-full sm:w-64 shrink-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search shades..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 bg-white focus:outline-none focus:border-[#FF8FB1] focus:ring-1 focus:ring-[#FF8FB1] text-sm text-black transition-all shadow-sm"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 sm:pb-0" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                {filterOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => setActiveFilter(option)}
                    className={`whitespace-nowrap px-4 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${activeFilter === option ? 'bg-[#FF8FB1] text-white shadow-[0_4px_15px_rgba(255,143,177,0.4)]' : 'bg-white text-gray-500 border border-gray-200 hover:border-[#FF8FB1] hover:text-[#FF8FB1] shadow-sm'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter + searchQuery}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 min-h-[400px]"
            >
              {filteredShades.length > 0 ? (
                filteredShades.map((shade, idx) => (
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

                      <h3 className="font-heading font-black text-xl text-black mb-1">Fairenne Precision Lip Liner</h3>
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
                          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF0069] to-[#FF4F9A] text-white font-bold uppercase tracking-widest text-[11px] shadow-md hover:shadow-[0_8px_20px_rgba(255,0,105,0.3)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <ShoppingBag size={14} /> Add to Cart
                        </button>
                      </div>
                    </div>

                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full py-20 text-center flex flex-col items-center justify-center bg-white/50 rounded-3xl border border-gray-100 backdrop-blur-sm"
                >
                  <Search className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 font-medium text-lg mb-2">No shades found matching "{searchQuery}"</p>
                  <p className="text-gray-400 text-sm mb-6">Try searching for a different shade or filter.</p>
                  <button
                    onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
                    className="text-white bg-[#FF8FB1] px-6 py-3 rounded-full hover:bg-[#FF0069] font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 3. Large Editorial/Magazine Feature */}
      <section className="relative w-full px-4 lg:px-6 pb-24 bg-[#FFFDFD]">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative max-w-[1400px] mx-auto h-[400px] md:h-[450px] lg:h-[500px] flex items-center justify-center overflow-hidden rounded-[30px] shadow-[0_20px_50px_rgba(255,143,177,0.15)] border border-[#FFC2D1]/30 group"
        >
          {/* Parallax Background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.img
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              src={editorialBg}
              alt="Editorial Campaign"
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
            />
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-all duration-700 group-hover:backdrop-blur-[1px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 transition-colors duration-700 group-hover:bg-black/40" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="bg-black/20 backdrop-blur-md p-6 md:p-10 lg:p-12 rounded-[30px] border border-white/20 shadow-2xl mx-auto inline-block hover:bg-black/30 hover:border-white/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <motion.span 
                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
                className="text-[#FF8FB1] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-4 lg:mb-5 block drop-shadow-md"
              >
                The Enchanted Finish
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-white uppercase tracking-tight leading-[1.1] mb-5 lg:mb-6 drop-shadow-lg"
              >
                "Like a spell cast <br className="hidden md:block" /> upon your lips."
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.9 }}
                className="text-xs md:text-sm lg:text-base text-white/90 font-light max-w-xl mx-auto leading-relaxed drop-shadow-md italic"
              >
                Discover the art of flawless definition. A single stroke reveals a velvety, twelve-hour magic that seamlessly blends reality with fantasy.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
