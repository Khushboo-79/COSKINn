import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, ChevronRight, Mail } from 'lucide-react';

const categories = ['All', 'Skincare Guides', 'Ingredient Spotlight', 'Wellness', 'Tutorials'];

const featuredArticle = {
  id: 'featured',
  title: 'The Ultimate Guide to Glass Skin: Routine & Ingredients',
  category: 'Skincare Guides',
  readTime: '6 min read',
  date: 'October 24, 2023',
  excerpt: 'Achieving that coveted luminous, poreless complexion is easier than you think. Discover the essential steps, from double cleansing to locking in hydration.',
  imageGlam: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80',
  imageSkin: 'https://images.pexels.com/photos/9306017/pexels-photo-9306017.jpeg?auto=compress&cs=tinysrgb&w=800',
};

const articles = [
  {
    id: 1,
    title: 'Why Vitamin C is a Must-Have in Your Morning Routine',
    category: 'Ingredient Spotlight',
    readTime: '4 min read',
    imageGlam: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80',
    imageSkin: 'https://images.pexels.com/photos/8101534/pexels-photo-8101534.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 2,
    title: '5 Steps to a Perfect Nighttime Recovery Routine',
    category: 'Tutorials',
    readTime: '5 min read',
    imageGlam: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80',
    imageSkin: 'https://images.pexels.com/photos/27393236/pexels-photo-27393236.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 3,
    title: 'Mindful Beauty: Connecting Wellness and Skincare',
    category: 'Wellness',
    readTime: '7 min read',
    imageGlam: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80',
    imageSkin: 'https://images.unsplash.com/photo-1550828520-4cb496926fc9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'The Truth About Hyaluronic Acid: Are You Using It Right?',
    category: 'Ingredient Spotlight',
    readTime: '3 min read',
    imageGlam: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80',
    imageSkin: 'https://images.pexels.com/photos/8101534/pexels-photo-8101534.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 5,
    title: 'Dermatologist Secrets for Transitioning to Fall Skincare',
    category: 'Skincare Guides',
    readTime: '6 min read',
    imageGlam: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80',
    imageSkin: 'https://images.pexels.com/photos/9306017/pexels-photo-9306017.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 6,
    title: 'Gua Sha 101: Benefits and Step-by-Step Tutorial',
    category: 'Tutorials',
    readTime: '5 min read',
    imageGlam: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80',
    imageSkin: 'https://images.pexels.com/photos/8101534/pexels-photo-8101534.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

const Journal: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredArticles = activeCategory === 'All' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  return (
    <div className={`min-h-screen transition-colors duration-500 pb-20 ${
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
        
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8">
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
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 mt-12 mb-8">
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
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className={`rounded-3xl p-10 md:p-16 text-center flex flex-col items-center justify-center relative overflow-hidden ${
          isGlam ? 'bg-[#7a1b26] text-white' : 'bg-[#fff0f2] text-gray-900'
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
      </section>

    </div>
  );
};

export default Journal;
