import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import Footer from '../components/common/Footer';
import { cosmeticsProducts } from '../constants/cosmeticsProducts';
import editorial1 from '../assets/images/cosmetics_editorial_lifestyle.webp';

export default function ShopAllCosmeticsPage() {
  const data = {
    title: 'All Cosmetics',
    subtitle: 'The Complete Fairytale Collection',
    description: 'Explore our entire range of luxury cosmetics. Each piece is crafted to bring out your inner magic with intense pigments, weightless textures, and exquisite packaging.',
    heroImg: editorial1,
    products: cosmeticsProducts
  };

  return (
    <div className="bg-[#FFFDFD] min-h-screen font-sans">
      {/* HERO SECTION */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-[#FFF0F4]">
        <div className="absolute inset-0 z-0">
          <img src={data.heroImg} alt={data.title} className="w-full h-full object-cover object-center opacity-40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDFD] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Sparkles className="w-10 h-10 text-[#FF8FB1] mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-heading font-black text-[#75263F] uppercase tracking-widest mb-6">
              Shop <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">All</span>
            </h1>
            <h2 className="text-2xl font-serif italic text-[#75263F]/80 mb-6">{data.subtitle}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {data.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="py-24 bg-[#FFFDFD] relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          <div className="flex items-center justify-between mb-16">
            <h3 className="text-3xl font-heading font-black text-[#75263F] uppercase tracking-widest">The Collection</h3>
            <div className="h-[1px] bg-[#FFE0E9] flex-1 ml-10 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.products.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
              >
                <Link to={`/product/${product.slug}`} className="group flex flex-col bg-white rounded-[40px] p-8 border border-[#FFE0E9] hover:border-[#FF8FB1] transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(255,143,177,0.15)] h-full">
                  <div className="aspect-square bg-gradient-to-tr from-[#FFFDFD] to-[#FFF0F4] rounded-3xl mb-8 p-6 overflow-hidden relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-xl" />
                    {product.badge && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#FFE0E9] text-[10px] font-black tracking-widest uppercase text-[#FF0069]">
                        {product.badge}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#FF8FB1] mb-2 block">{product.category}</span>
                    <h4 className="font-heading font-black text-xl uppercase text-[#75263F] line-clamp-2 mb-4 group-hover:text-[#FF0069] transition-colors">{product.name}</h4>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-1 font-medium">{product.shortDescription}</p>
                    
                    <div className="flex items-end justify-between mt-auto">
                      <div className="flex flex-col">
                        <span className="font-black text-2xl text-[#FF0069]">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm font-bold text-gray-400 line-through">₹{product.originalPrice}</span>
                        )}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#FFF0F4] text-[#FF0069] flex items-center justify-center group-hover:bg-[#FF0069] group-hover:text-white transition-colors">
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
