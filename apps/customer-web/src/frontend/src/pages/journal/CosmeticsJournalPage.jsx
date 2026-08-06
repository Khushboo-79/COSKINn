import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, ArrowRight, BookOpen, Star, PlayCircle, Heart } from 'lucide-react';
import Footer from '../../components/common/Footer';
import editorial1 from '../../assets/images/cosmetics_editorial_lifestyle.webp';
import editorial2 from '../../assets/images/cat_eyes_1784312591092.webp';
import editorial3 from '../../assets/images/cat_lips_1784312601813.webp';
import blushImg from '../../assets/images/velvet_blush.webp';
import lipstickImg from '../../assets/images/cosmetics_lipstick.webp';
import fairyBaseImg from '../../assets/images/enchanted_beauty_hero.webp';
import fairySlide1 from '../../assets/images/fairy_slide_1.webp';
import fairySlide2 from '../../assets/images/fairy_slide_2.webp';
import fairySlide3 from '../../assets/images/fairy_slide_3.webp';
import fairyChess from '../../assets/images/fairy_chess_banner.webp';
import fairyEvents from '../../assets/images/fairy_events_campaign_bright.webp';
import fairytaleHero from '../../assets/images/fairytale_desktop_hero.webp';
import fairyPalette from '../../assets/images/fairy_palette_clean.webp';
import fairyBlush from '../../assets/images/fairy_blush_clean.webp';
import fairyLipstick from '../../assets/images/fairy_lipstick_clean.webp';
import fairyCollection from '../../assets/images/fairy_collection_display.webp';
import fairyRewards from '../../assets/images/fairy_rewards_campaign.webp';

const journalData = {
  'guides': {
    title: 'Makeup Guides',
    subtitle: 'Master the Art of Beauty',
    description: 'Step-by-step guides to achieving a flawless base, perfect winged liner, and magnetic lips. Learn the secrets of professional makeup artists.',
    featured: { id: 1, title: 'The Perfect Fairytale Base: A Step-by-Step Guide', category: 'Masterclass', image: fairyBaseImg, date: 'Oct 15, 2026', readTime: '5 min read', desc: 'Achieve a luminous, glass-like finish that lasts from dawn until dusk with our signature layering technique.' },
    quote: "Beauty is the illumination of your soul.",
    articles: [
      { id: 2, title: 'Mastering the Velvet Blush', category: 'Guides', image: fairyBlush, date: 'Oct 10, 2026', readTime: '4 min read' },
      { id: 3, title: 'The Ultimate Guide to Winged Eyeliner', category: 'Eyes', image: fairySlide1, date: 'Oct 02, 2026', readTime: '6 min read' },
      { id: 4, title: 'Color Theory for Beginners', category: 'Basics', image: fairyPalette, date: 'Sep 25, 2026', readTime: '7 min read' },
      { id: 5, title: 'Sculpting with Light and Shadow', category: 'Guides', image: fairySlide2, date: 'Sep 18, 2026', readTime: '5 min read' }
    ]
  },
  'tutorials': {
    title: 'Product Tutorials',
    subtitle: 'Watch and Learn',
    description: 'Discover how to get the most out of your COSKINn products with our comprehensive video and pictorial tutorials.',
    featured: { id: 1, title: 'Magnetic Lipstick Application Techniques', category: 'Video Tutorial', image: fairyLipstick, date: 'Oct 05, 2026', readTime: '3 min read', desc: 'Watch how our lead artist creates a flawless, transfer-proof lip look using the Magnetic Velvet Lipstick.' },
    quote: "Every brush stroke is a whisper of magic.",
    articles: [
      { id: 2, title: 'How to Build Lift & Curl Mascara', category: 'Tutorials', image: fairySlide3, date: 'Sep 28, 2026', readTime: '4 min read' },
      { id: 3, title: 'Blending the 12-Pan Palette', category: 'Eyes', image: fairyPalette, date: 'Sep 20, 2026', readTime: '5 min read' },
      { id: 4, title: 'Creating the Ombre Lip', category: 'Tutorials', image: fairyLipstick, date: 'Sep 12, 2026', readTime: '3 min read' },
      { id: 5, title: 'Everyday Natural Glam', category: 'Lookbook', image: fairyBaseImg, date: 'Sep 05, 2026', readTime: '6 min read' }
    ]
  },
  'tips': {
    title: 'Beauty Tips',
    subtitle: 'Insider Secrets',
    description: 'Quick tips and tricks to elevate your everyday makeup routine. Learn how to make your makeup last longer and look more natural.',
    featured: { id: 1, title: 'How to make your lipstick last 12 hours', category: 'Pro Tip', image: fairyLipstick, date: 'Sep 28, 2026', readTime: '2 min read', desc: 'The foolproof layering method to ensure your lip color survives meals, drinks, and midnight kisses.' },
    quote: "Small secrets create the most enchanting illusions.",
    articles: [
      { id: 2, title: 'Reviving Dried Gel Liner', category: 'Hacks', image: fairySlide2, date: 'Sep 22, 2026', readTime: '1 min read' },
      { id: 3, title: 'The Tape Trick for Sharp Wings', category: 'Tips', image: fairySlide1, date: 'Sep 15, 2026', readTime: '2 min read' },
      { id: 4, title: 'Baking Without the Cake', category: 'Tips', image: fairyBaseImg, date: 'Sep 08, 2026', readTime: '3 min read' },
      { id: 5, title: 'Multi-use Products You Need', category: 'Hacks', image: fairyCollection, date: 'Sep 01, 2026', readTime: '4 min read' }
    ]
  },
  'collections': {
    title: 'New Collections',
    subtitle: 'Behind the Magic',
    description: 'Get an exclusive behind-the-scenes look at our latest product launches, inspiration, and formulation process.',
    featured: { id: 1, title: 'The Making of the Velvet Blush', category: 'Behind the Scenes', image: fairyBlush, date: 'Sep 20, 2026', readTime: '6 min read', desc: 'Step into the COSKINn lab and see how we perfected the airy, cloud-like texture of our best-selling blush.' },
    quote: "True luxury is in the details of the creation.",
    articles: [
      { id: 2, title: 'Inspiration: The Midnight Garden', category: 'Concept', image: fairyChess, date: 'Sep 10, 2026', readTime: '5 min read' },
      { id: 3, title: 'Meet the Perfumer', category: 'Interview', image: fairyEvents, date: 'Sep 02, 2026', readTime: '8 min read' },
      { id: 4, title: 'Sourcing Ethical Mica', category: 'Sustainability', image: fairyRewards, date: 'Aug 25, 2026', readTime: '4 min read' },
      { id: 5, title: 'The Evolution of our Packaging', category: 'Design', image: fairyCollection, date: 'Aug 18, 2026', readTime: '5 min read' }
    ]
  },
  'trends': {
    title: 'Beauty Trends',
    subtitle: 'What\'s Next in Beauty',
    description: 'Stay ahead of the curve with our analysis of the latest makeup trends from the runways to everyday wear.',
    featured: { id: 1, title: 'The Return of the Soft Matte Lip', category: 'Trend Report', image: fairyLipstick, date: 'Sep 15, 2026', readTime: '4 min read', desc: 'Gloss is stepping aside as velvety, blurred matte lips take center stage on the runways this season.' },
    quote: "Elegance is the only beauty that never fades.",
    articles: [
      { id: 2, title: 'Monochromatic Magic', category: 'Trends', image: fairyBlush, date: 'Sep 05, 2026', readTime: '3 min read' },
      { id: 3, title: 'The "Siren Eye" Explained', category: 'Analysis', image: fairySlide3, date: 'Aug 28, 2026', readTime: '5 min read' },
      { id: 4, title: 'Skinimalism: The New Base', category: 'Trends', image: fairyBaseImg, date: 'Aug 20, 2026', readTime: '4 min read' },
      { id: 5, title: 'Bleached Brows: Yes or No?', category: 'Editorial', image: fairySlide1, date: 'Aug 12, 2026', readTime: '6 min read' }
    ]
  }
};

export default function CosmeticsJournalPage() {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const journalKey = pathParts[pathParts.length - 1]; 
  
  const data = journalData[journalKey] || journalData['guides'];

  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="bg-[#FFFDFD] min-h-screen font-sans selection:bg-[#FF0069] selection:text-white overflow-x-hidden">
      
      {/* SECTION 1: MAGICAL HERO */}
      <section className="relative w-full h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#FFF0F4]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img src={fairytaleHero} alt="Fairy Hero" className="absolute inset-0 w-full h-full object-cover blur-[2px] opacity-80 scale-[1.02]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDFD]/30 via-[#75263F]/40 to-[#FFF0F4] z-0"></div>
          <motion.div style={{ y: yHero, opacity: opacityHero }} className="w-full h-full absolute inset-0 z-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-[#FF8FB1] rounded-full mix-blend-overlay filter blur-[100px] opacity-60 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#FF0069] rounded-full mix-blend-overlay filter blur-[120px] opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
          </motion.div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-[#FFE0E9] mb-8">
              <Sparkles className="w-4 h-4 text-[#FF0069]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#75263F]">COSKINn Editorial</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-heading font-black text-[#75263F] uppercase tracking-widest mb-6 leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FF0069] to-[#FF8FB1] filter drop-shadow-sm">
                {data.title.split(' ')[0]}
              </span>
              <br />
              {data.title.split(' ').slice(1).join(' ')}
            </h1>
            <h2 className="text-2xl md:text-3xl font-serif italic text-[#75263F]/70 mb-8">{data.subtitle}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              {data.description}
            </p>
          </motion.div>
        </div>
        
        {/* Floating elements */}
        <motion.div 
          animate={{ y: [0, -15, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#FF8FB1]"
        >
          <ArrowRight className="w-6 h-6 rotate-90" />
        </motion.div>
      </section>

      {/* SECTION 2: THE FEATURED SPELL (Featured Article) */}
      <section className="py-24 bg-[#FFFDFD] relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="group relative rounded-[40px] overflow-hidden h-[500px] md:h-[600px] flex items-end shadow-2xl"
          >
            {/* Full Cover Image */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-t from-[#3A0C1C]/90 via-[#75263F]/40 to-transparent z-10 transition-opacity duration-700 group-hover:opacity-80"></div>
              <img 
                src={data.featured.image} 
                alt={data.featured.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
            
            {/* Featured Badge */}
            <div className="absolute top-8 left-8 z-20 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/50 text-xs font-black tracking-widest uppercase text-white flex items-center gap-2 shadow-lg">
              <Star className="w-4 h-4 text-[#FF8FB1]" /> Featured Story
            </div>
            
            {/* Content Overlay */}
            <div className="relative z-20 w-full p-8 md:p-16 max-w-4xl">
              <div className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-[#FF8FB1] mb-4 drop-shadow-md">
                <span>{data.featured.category}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8FB1]"></span>
                <span>{data.featured.date}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8FB1]"></span>
                <span>{data.featured.readTime}</span>
              </div>
              
              <h3 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4 drop-shadow-xl group-hover:text-[#FF8FB1] transition-colors duration-500">
                {data.featured.title}
              </h3>
              
              <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 font-medium drop-shadow-md max-w-2xl">
                {data.featured.desc}
              </p>
              
              <Link to="#" className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-md border border-white/50 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-[#FF0069] shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:scale-105 transition-all duration-300">
                Read The Story <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: ENCHANTED QUOTE (Parallax Divider) */}
      <section className="py-32 relative overflow-hidden bg-[#FF8FB1]">
        <div className="absolute inset-0 z-0">
          <img src={fairyChess} alt="Texture" className="w-full h-full object-cover opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFF0F4] via-transparent to-[#FFFDFD]"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Heart className="w-12 h-12 text-[#FF8FB1] mx-auto mb-8 opacity-80" />
            <h2 className="text-4xl md:text-6xl font-serif italic text-white leading-snug drop-shadow-lg">
              "{data.quote}"
            </h2>
            <div className="w-20 h-[1px] bg-[#FF8FB1] mx-auto mt-10"></div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: THE ARCHIVES (Recent Articles Grid) */}
      <section className="py-24 bg-[#FFFDFD] relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          <div className="flex items-center justify-between mb-16">
            <h3 className="text-4xl font-heading font-black text-[#75263F] uppercase tracking-widest">
              The Archives
            </h3>
            <div className="h-[1px] bg-[#FFE0E9] flex-1 ml-10 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.articles.map((article, idx) => (
              <motion.div 
                key={article.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group cursor-pointer flex flex-col"
              >
                <div className="aspect-[3/4] rounded-[30px] overflow-hidden relative mb-6 border border-[#FFE0E9] group-hover:border-[#FF8FB1] transition-colors duration-500 group-hover:shadow-[0_20px_40px_rgba(255,143,177,0.15)]">
                  <div className="absolute inset-0 bg-[#75263F]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#FF0069] translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                      <PlayCircle size={24} />
                    </div>
                  </div>
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase text-[#FF0069]">
                    {article.category}
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col px-2">
                  <div className="flex items-center justify-between text-[11px] font-bold tracking-widest uppercase text-[#FF8FB1] mb-3">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h4 className="font-heading font-black text-xl text-[#75263F] line-clamp-2 mb-4 group-hover:text-[#FF0069] transition-colors">
                    {article.title}
                  </h4>
                  <div className="mt-auto inline-flex items-center gap-2 font-bold uppercase tracking-widest text-xs text-[#75263F] group-hover:text-[#FF0069] transition-colors">
                    Read More <span className="block w-6 h-[2px] bg-[#FF0069] group-hover:w-10 transition-all duration-300"></span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: SUBSCRIBE RITUAL (Newsletter) */}
      <section className="py-24 relative overflow-hidden bg-[#FFF0F4]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF8FB1] rounded-full blur-[150px] opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF0069] rounded-full blur-[150px] opacity-20"></div>
        
        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/60 backdrop-blur-2xl rounded-[50px] p-12 md:p-16 border border-white shadow-[0_40px_80px_rgba(117,38,63,0.05)]"
          >
            <BookOpen className="w-12 h-12 text-[#FF0069] mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-heading font-black text-[#75263F] mb-4">Join The Coven</h2>
            <p className="text-gray-600 mb-10 font-medium text-lg">
              Subscribe to our editorial newsletter for exclusive tutorials, early access to collections, and magical beauty secrets delivered straight to your inbox.
            </p>
            
            <form className="relative max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your magical email..."
                className="w-full h-16 px-8 rounded-full bg-white border-2 border-[#FFE0E9] focus:outline-none focus:border-[#FF8FB1] text-[#75263F] placeholder:text-gray-400 shadow-inner font-medium transition-colors"
              />
              <button 
                type="submit"
                className="absolute right-2 top-2 h-12 w-12 rounded-full bg-[#FF0069] text-white flex items-center justify-center hover:bg-[#75263F] hover:shadow-[0_0_20px_rgba(255,0,105,0.4)] hover:scale-105 transition-all duration-300"
              >
                <ArrowRight size={20} />
              </button>
            </form>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-6">No spam. Only pure magic. Unsubscribe anytime.</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
