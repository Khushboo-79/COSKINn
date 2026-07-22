import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import Footer from '../../components/common/Footer';
import ProductCard from '../../components/common/ProductCard';
import { cosmeticsProducts } from '../../constants/cosmeticsProducts';

// Images (Using existing ones or fallbacks)
import editorial1 from '../../assets/images/cosmetics_editorial_lifestyle.webp';
import editorial2 from '../../assets/images/cat_eyes_1784312591092.webp';
import editorial3 from '../../assets/images/cat_lips_1784312601813.webp';

const categoryData = {
  'face': {
    title: 'Face Essentials',
    subtitle: 'Flawless Base & Velvet Finish',
    description: 'Discover our luxury face collection. Formulated with skin-loving ingredients to give you a smooth, airbrushed canvas that lasts all day.',
    heroImg: editorial1,
    products: cosmeticsProducts.filter(p => p.category === 'Face' || p.category === 'Cheeks' || p.name.includes('Blush'))
  },
  'eyes': {
    title: 'Eye Collection',
    subtitle: 'Captivating Glances',
    description: 'Elevate your eye makeup with our intensely pigmented, fallout-free formulas. From subtle shimmers to dramatic lifted lashes.',
    heroImg: editorial2,
    products: cosmeticsProducts.filter(p => p.category === 'Eyes')
  },
  'lips': {
    title: 'Lip Collection',
    subtitle: 'Magnetic Velvet Perfection',
    description: 'Experience true luxury for your lips. Our signature magnetic lipsticks and precision liners provide comfortable, long-lasting color.',
    heroImg: editorial3,
    products: cosmeticsProducts.filter(p => p.category === 'Lips')
  },
  'accessories': {
    title: 'Beauty Accessories',
    subtitle: 'Professional Artistry Tools',
    description: 'Achieve flawless application with our premium, cruelty-free professional brushes and elegant vanity accessories.',
    heroImg: editorial1,
    products: cosmeticsProducts.filter(p => p.category === 'Tools' || p.name.includes('Brush'))
  },
  'fragrance': {
    title: 'Signature Fragrances',
    subtitle: 'Enchanting Scents',
    description: 'Carry the magic with you. Our pocket perfumes are inspired by fairytale gardens and designed for the modern muse.',
    heroImg: editorial2,
    products: cosmeticsProducts.filter(p => p.category === 'Fragrance' || p.name.includes('Perfume'))
  }
};

export default function CosmeticsCategoryPage() {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const categoryKey = pathParts[pathParts.length - 1]; // e.g., 'face'
  
  const data = categoryData[categoryKey] || {
    title: 'Cosmetics Collection',
    subtitle: 'Luxury Beauty',
    description: 'Discover our premium range of fairytale-inspired cosmetics.',
    heroImg: editorial1,
    products: cosmeticsProducts
  };

  return (
    <div className="bg-[#FFFDFD] min-h-screen font-sans">
      {/* 1. HERO SECTION */}
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
              {data.title.split(' ')[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF8FB1]">
                {data.title.split(' ').slice(1).join(' ')}
              </span>
            </h1>
            <h2 className="text-2xl font-serif italic text-[#75263F]/80 mb-6">{data.subtitle}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {data.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. PRODUCTS GRID */}
      <section className="py-24 bg-[#FFFDFD] relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          <div className="flex items-center justify-between mb-16">
            <h3 className="text-3xl font-heading font-black text-[#75263F] uppercase tracking-widest">The Collection</h3>
            <div className="h-[1px] bg-[#FFE0E9] flex-1 ml-10 hidden md:block" />
          </div>

          {data.products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.products.map((product, idx) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
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
          ) : (
            <div className="py-20 text-center">
              <p className="text-xl text-gray-500 font-serif italic">No products found in this collection.</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. PROMO BANNER */}
      <section className="py-32 bg-[#FF8FB1] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 text-white">
          <h2 className="text-4xl md:text-6xl font-serif italic mb-8 drop-shadow-md">
            "Artistry meets luxury in every stroke."
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            Every product is meticulously crafted to deliver unparalleled performance while maintaining the highest standards of clean, cruelty-free beauty.
          </p>
          <Link to="/shop" className="inline-flex items-center gap-2 px-10 py-4 bg-white text-[#FF8FB1] rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#FF0069] hover:text-white transition-all shadow-[0_10px_30px_rgba(255,255,255,0.2)]">
            Explore All Cosmetics <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
