import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, ChevronRight, Mail } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const categories = ['All', 'Skincare Guides', 'Ingredient Spotlight', 'Wellness', 'Tutorials'];

const featuredArticle = {
  id: 'featured',
  title: 'The Ultimate Guide to Glass Skin: Routine & Ingredients',
  category: 'Skincare Guides',
  readTime: '6 min read',
  date: 'October 24, 2023',
  excerpt: 'Achieving that coveted luminous, poreless complexion is easier than you think. Discover the essential steps, from double cleansing to locking in hydration.',
  imageGlam: 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/20260722-162356.jpg?v=1784708678',
  imageSkin: 'https://www.dotandkey.com/cdn/shop/files/1a_3ef32ac6-5192-495c-b4bb-dafb0e806260.jpg',
};

const articles = [
  {
    id: 1,
    title: 'Why Vitamin C is a Must-Have in Your Morning Routine',
    category: 'Ingredient Spotlight',
    readTime: '4 min read',
    imageGlam: 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/ec25942077e080c392d7cb4696caea57.jpg?v=1761982588',
    imageSkin: 'https://www.dotandkey.com/cdn/shop/files/VitaminCSunscreenListing1_24ade7b6-5667-43a8-8cbf-a750fae616a4.jpg'
  },
  {
    id: 2,
    title: '5 Steps to a Perfect Nighttime Recovery Routine',
    category: 'Tutorials',
    readTime: '5 min read',
    imageGlam: 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/01_2db59608-095a-442a-afec-9c7aafeb7fab.jpg?v=1758249299',
    imageSkin: 'https://www.dotandkey.com/cdn/shop/files/Artboard1_583ef82d-c136-490d-aab1-4780f12ee608.jpg'
  },
  {
    id: 3,
    title: 'Mindful Beauty: Connecting Wellness and Skincare',
    category: 'Wellness',
    readTime: '7 min read',
    imageGlam: 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/24c4ac61030646c83895aa1d3448017a_256e2b1a-3119-4a30-af27-4926c38103a2.jpg?v=1756201951',
    imageSkin: 'https://www.dotandkey.com/cdn/shop/files/1-1_b4ae866f-e0a8-43d1-971f-1d143d76f01c.jpg'
  },
  {
    id: 4,
    title: 'The Truth About Hyaluronic Acid: Are You Using It Right?',
    category: 'Ingredient Spotlight',
    readTime: '3 min read',
    imageGlam: 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/20260420-103644.jpg?v=1776653923',
    imageSkin: 'https://www.dotandkey.com/cdn/shop/files/VitaminCSunscreenListing1_24ade7b6-5667-43a8-8cbf-a750fae616a4.jpg'
  },
  {
    id: 5,
    title: 'Dermatologist Secrets for Transitioning to Fall Skincare',
    category: 'Skincare Guides',
    readTime: '6 min read',
    imageGlam: 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/61605ff4361e206d245c64bb08d66c4b_41cd63f3-7c74-4c4d-853d-ef8949a10017.jpg?v=1784689317',
    imageSkin: 'https://www.dotandkey.com/cdn/shop/files/1a_3ef32ac6-5192-495c-b4bb-dafb0e806260.jpg'
  },
  {
    id: 6,
    title: 'Gua Sha 101: Benefits and Step-by-Step Tutorial',
    category: 'Tutorials',
    readTime: '5 min read',
    imageGlam: 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/20260722-142134.jpg?v=1784704087',
    imageSkin: 'https://www.dotandkey.com/cdn/shop/files/VitaminCSunscreenListing1_24ade7b6-5667-43a8-8cbf-a750fae616a4.jpg'
  }
];

const Journal: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  const [activeCategory, setActiveCategory] = useState('All');
  const pageRef = useScrollReveal<HTMLDivElement>();

  const filteredArticles = activeCategory === 'All' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  return (
    <div ref={pageRef} className={`min-h-screen transition-colors duration-500 pb-20 ${
      isGlam ? 'bg-[#fdf9f1]' : 'bg-[#fafafa]'
    }`}>
      
      {/* Featured Article Hero */}
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-end justify-center px-4 sm:px-6 lg:px-12 py-12">
        <div className="absolute inset-0 z-0">
          <img 
            src={isGlam ? featuredArticle.imageGlam : featuredArticle.imageSkin} 
            alt={featuredArticle.title}
            className="w-full h-full object-cover transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8 scroll-reveal scroll-reveal-up">
          <div className="max-w-2xl text-white">
            <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-4 ${
              isGlam ? 'bg-[#7a1b26] text-white' : 'bg-[#ff9aa8] text-white'
            }`}>
              {featuredArticle.category}
            </span>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight ${isGlam ? 'font-serif' : 'font-display'}`}>
              {featuredArticle.title}
            </h1>
            <p className="text-gray-200 text-base md:text-lg mb-6 line-clamp-2 md:line-clamp-none max-w-xl">
              {featuredArticle.excerpt}
            </p>
            <div className="flex items-center text-sm text-gray-300 font-sans space-x-4">
              <span>{featuredArticle.date}</span>
              <span className="flex items-center"><Clock size={14} className="mr-1"/> {featuredArticle.readTime}</span>
            </div>
          </div>
          
          <button className={`shrink-0 flex items-center justify-center space-x-2 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 shadow-lg ${
            isGlam 
              ? 'bg-[#faf9f6] text-[#7a1b26] hover:bg-[#7a1b26] hover:text-white' 
              : 'bg-white text-[#ff9aa8] hover:bg-[#ff9aa8] hover:text-white'
          }`}>
            <span>Read Article</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 mt-12 mb-8 scroll-reveal scroll-reveal-up">
        <div className="flex overflow-x-auto hide-scrollbar space-x-3 pb-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                activeCategory === cat
                  ? (isGlam ? 'bg-[#7a1b26] text-white shadow-md' : 'bg-[#ff9aa8] text-white shadow-md')
                  : (isGlam ? 'bg-transparent text-gray-600 border border-gray-300 hover:border-[#7a1b26]' : 'bg-transparent text-gray-500 border border-gray-200 hover:border-[#ff9aa8]')
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 mb-20">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredArticles.map((article) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              key={article.id} 
              className={`group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                isGlam ? 'bg-white shadow-sm hover:shadow-xl' : 'bg-white shadow-sm hover:shadow-lg'
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={isGlam ? article.imageGlam : article.imageSkin} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full backdrop-blur-md ${
                    isGlam ? 'bg-white/80 text-[#7a1b26]' : 'bg-white/80 text-[#ff9aa8]'
                  }`}>
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-xs text-gray-500 mb-3 font-sans">
                  <Clock size={14} className="mr-1"/> 
                  <span>{article.readTime}</span>
                </div>
                <h3 className={`text-xl mb-4 line-clamp-2 transition-colors ${
                  isGlam ? 'font-serif group-hover:text-[#7a1b26]' : 'font-display group-hover:text-[#ff9aa8]'
                }`}>
                  {article.title}
                </h3>
                <div className={`flex items-center text-sm font-bold uppercase tracking-wider ${
                  isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'
                }`}>
                  <span>Read More</span>
                  <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {filteredArticles.length === 0 && (
          <div className="py-20 text-center text-gray-500">
            No articles found for this category.
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className={`w-full relative py-20 mt-20 ${isGlam ? 'bg-[#7a1b26]' : 'bg-[#ffe4eb]'}`}>
        {!isGlam && (
          <>
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0 -translate-y-[99%] pointer-events-none">
              <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
                <path d="M0,100 L0,50 C 120,40 240,60 360,30 C 480,0 600,70 720,40 C 840,10 960,60 1080,20 C 1200,-20 1320,50 1440,30 L1440,100 Z" fill="#ffe4eb" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 translate-y-[99%] pointer-events-none">
              <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
                <path d="M0,0 L0,50 C 120,60 240,40 360,70 C 480,100 600,30 720,60 C 840,90 960,40 1080,80 C 1200,120 1320,50 1440,70 L1440,0 Z" fill="#ffe4eb" />
              </svg>
            </div>
          </>
        )}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className={`p-10 md:p-16 text-center flex flex-col items-center justify-center relative overflow-hidden ${
            isGlam ? 'text-white' : 'text-gray-900'
          }`}>
            {/* Decorative Elements */}
            <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 -mr-20 -mt-20 ${
              isGlam ? 'bg-[#e5b376]' : 'bg-[#ff9aa8]'
            }`}></div>
            
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 relative z-10 ${
              isGlam ? 'bg-white/10 text-[#e5b376]' : 'bg-white text-[#ff9aa8] shadow-sm'
            }`}>
              <Mail size={32} strokeWidth={1.5} />
            </div>
            
            <h2 className={`text-3xl md:text-4xl mb-4 relative z-10 ${isGlam ? 'font-serif text-white' : 'font-display text-gray-900'}`}>
              Stay in the Glow
            </h2>
            <p className={`max-w-xl mx-auto mb-8 relative z-10 ${isGlam ? 'text-gray-200' : 'text-gray-600'}`}>
              Subscribe to our newsletter for exclusive beauty tips, early access to new launches, and expert skincare advice delivered straight to your inbox.
            </p>
            
            <div className="w-full max-w-md relative z-10 flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className={`flex-1 px-6 py-4 rounded-full outline-none transition-all ${
                  isGlam 
                    ? 'bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:border-[#e5b376]' 
                    : 'bg-white text-gray-800 placeholder-gray-400 border border-transparent focus:border-[#ff9aa8] focus:ring-2 focus:ring-[#ff9aa8]/20'
                }`}
              />
              <button className={`px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all shadow-sm ${
                isGlam 
                  ? 'bg-[#e5b376] text-white hover:bg-[#d4a065]' 
                  : 'bg-[#ff9aa8] text-white hover:bg-[#ff8f9f] hover:shadow-md'
              }`}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Journal;
