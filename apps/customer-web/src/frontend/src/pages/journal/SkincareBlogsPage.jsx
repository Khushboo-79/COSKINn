import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Clock, User, ChevronRight } from 'lucide-react';
import Footer from '../../components/common/Footer';
import ArticleModal from '../../components/journal/ArticleModal';
import heroImg from '../../assets/images/journal_blogs_hero.webp';
import apiClient from '../../utils/apiClient';

export default function SkincareBlogsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  
  const categories = ['All', 'Routines', 'Ingredients', 'Lifestyle', 'Expert Advice', 'News'];
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await apiClient.get('/content/articles?type=BLOG');
        const data = response.data || [];
        const formatted = data.map(article => {
          let parsedContent = {};
          try {
            parsedContent = JSON.parse(article.contentJson || '{}');
          } catch(e) {}
          return {
            slug: article.slug,
            title: article.title,
            category: parsedContent.category || 'Blog',
            readTime: parsedContent.readTime || '5 min read',
            author: parsedContent.author || 'COSKINn Team',
            excerpt: article.seoDesc || 'Discover the secrets to luminous skin.',
            image: article.heroImageUrl || "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&q=80"
          };
        });
        setBlogs(formatted);
        if (formatted.length > 0) {
          setFeaturedArticle(formatted[0]); // Just pick the first one as featured
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#FFFDFD] min-h-screen font-sans selection:bg-[#FF2D7A]/20">
      
      {/* 1. PREMIUM HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-[#FFFDFD]">
        <div className="absolute inset-0 z-0 flex justify-end">
          <div className="w-full lg:w-[55%] h-full relative">
            <motion.img 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src={heroImg} 
              alt="COSKINn Skincare Blogs" 
              className="w-full h-full object-cover object-center" 
            />
            {/* Soft Gradient Overlay for seamless blending */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDFD] via-[#FFFDFD]/60 to-transparent w-full"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDFD] via-[#FFFDFD]/80 to-transparent lg:hidden h-full"></div>
          </div>
        </div>

        {/* Left Side Content - Padding architecture explicitly prevents navbar overlap */}
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 pt-[140px] lg:pt-[180px] pb-20 lg:pb-28">
          <div className="w-full lg:w-[50%] lg:pr-12 relative">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-400 mb-6">
                <Link to="/" className="hover:text-[#FF2D7A] transition-colors">Home</Link>
                <span>/</span>
                <span className="text-[#FF2D7A]">Journal</span>
              </div>
              
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-[#FF2D7A]/20 text-[#FF2D7A] text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
                SKINCARE BLOGS
              </span>

              <h1 className="text-5xl lg:text-7xl font-heading font-black text-[#1B1B1B] leading-[1.1] mb-6 tracking-tight">
                Stories That Help <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D7A] to-[#FF8EAA] italic font-light">Your Skin Glow.</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 font-medium leading-relaxed max-w-md mb-10">
                Dive into expert advice, ingredient deep-dives, and routine guides to help you achieve your healthiest, most radiant skin.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => document.getElementById('latest-blogs').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-gradient-to-r from-[#FF2D7A] to-[#FF8EAA] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:shadow-[0_10px_30px_rgba(255,45,122,0.3)] transition-all duration-300 w-max"
                >
                  Start Reading
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTER BAR */}
      <section className="py-8 bg-white border-y border-gray-100 z-40 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map((cat, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-[#FF2D7A] text-white shadow-md' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..." 
              className="w-full bg-gray-50 border border-gray-200 rounded-full pl-12 pr-5 py-3 text-sm font-medium focus:outline-none focus:border-[#FF2D7A] focus:ring-1 focus:ring-[#FF2D7A] transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
      </section>

      {/* 3. LATEST BLOGS GRID */}
      <section id="latest-blogs" className="py-16 bg-[#FFF5F8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-gradient-to-b from-[#FF2D7A] to-[#FF8EAA] rounded-full"></div>
              <h2 className="text-3xl lg:text-4xl font-heading font-black text-[#1B1B1B]">Latest Articles</h2>
            </div>
            <Link to="#" className="hidden md:flex items-center gap-2 text-[#FF2D7A] font-bold uppercase tracking-widest text-sm hover:underline">
              View All <ChevronRight size={16} />
            </Link>
          </div>

          {filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-heading font-bold text-[#1B1B1B] mb-2">No articles found.</h3>
              <p className="text-gray-500 font-medium">Try adjusting your search or category filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer bg-white rounded-3xl p-3 border border-gray-100 hover:shadow-[0_20px_40px_rgba(255,45,122,0.08)] hover:border-[#FF2D7A]/30 transition-all duration-300"
              >
                <div className="w-full h-64 rounded-2xl overflow-hidden relative mb-5">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[#FF2D7A] text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    {blog.category}
                  </div>
                </div>
                <div className="px-3 pb-4">
                  <span className="flex items-center gap-1.5 text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">
                    <Clock size={14} /> {blog.readTime}
                  </span>
                  <h3 className="text-xl font-heading font-black text-[#1B1B1B] leading-snug mb-4 group-hover:text-[#FF2D7A] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <button onClick={() => setSelectedArticleSlug(blog.slug)} className="inline-flex items-center gap-1 text-[#1B1B1B] font-bold text-sm hover:text-[#FF2D7A] transition-colors">
                    Read More <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          )}
          
          <div className="mt-12 text-center md:hidden">
            <Link to="#" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-200 text-[#1B1B1B] rounded-full font-bold uppercase tracking-widest text-xs hover:border-[#FF2D7A] hover:text-[#FF2D7A] transition-colors">
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FEATURED ARTICLE */}
      {featuredArticle && (
        <section className="py-16 lg:py-24 bg-[#FFFDFD]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-2 h-8 bg-gradient-to-b from-[#FF2D7A] to-[#FF8EAA] rounded-full"></div>
              <h2 className="text-3xl lg:text-4xl font-heading font-black text-[#1B1B1B]">Featured Read</h2>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer bg-white rounded-[2rem] p-4 lg:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col lg:flex-row gap-8 lg:gap-12 hover:shadow-[0_20px_50px_rgba(255,45,122,0.08)] hover:border-[#FF2D7A]/20 transition-all duration-500"
            >
              <div className="w-full lg:w-1/2 h-[300px] lg:h-[450px] rounded-3xl overflow-hidden relative">
                <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[#FF2D7A] text-xs font-bold uppercase tracking-widest shadow-sm">
                  {featuredArticle.category}
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 flex flex-col justify-center py-4 lg:py-10 lg:pr-10">
                <div className="flex items-center gap-4 text-gray-400 text-sm font-bold uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1.5"><Clock size={16} /> {featuredArticle.readTime}</span>
                  <span className="flex items-center gap-1.5"><User size={16} /> {featuredArticle.author}</span>
                </div>
                <h3 className="text-3xl lg:text-5xl font-heading font-black text-[#1B1B1B] leading-tight mb-6 group-hover:text-[#FF2D7A] transition-colors">
                  {featuredArticle.title}
                </h3>
                <p className="text-gray-500 text-lg font-medium leading-relaxed mb-8 line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
                <button onClick={() => setSelectedArticleSlug(featuredArticle.slug)} className="inline-flex items-center gap-2 text-[#FF2D7A] font-bold uppercase tracking-widest text-sm hover:gap-4 transition-all w-max">
                  Read Full Article <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* 5. NEWSLETTER SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="bg-gradient-to-br from-[#FF2D7A] to-[#FF8EAA] rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-[#FF2D7A]/20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/5 rounded-full blur-[60px] pointer-events-none"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-heading font-black mb-6">Never Miss A Glow Up</h2>
              <p className="text-lg font-medium opacity-90 mb-10 leading-relaxed">
                Join our community to get the latest skincare tips, new product launches, and exclusive subscriber-only offers delivered straight to your inbox.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 bg-white/20 border border-white/30 rounded-full px-8 py-4 text-white placeholder:text-white/70 focus:outline-none focus:bg-white/30 transition-colors"
                />
                <button type="submit" className="px-10 py-4 bg-white text-[#FF2D7A] rounded-full font-bold uppercase tracking-widest text-sm hover:shadow-[0_10px_30px_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-all duration-300">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE MODAL */}
      <ArticleModal 
        isOpen={!!selectedArticleSlug} 
        onClose={() => setSelectedArticleSlug(null)} 
        articleSlug={selectedArticleSlug} 
        onArticleChange={setSelectedArticleSlug}
      />

      <Footer />
    </div>
  );
}
