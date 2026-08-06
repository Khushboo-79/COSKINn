import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Clock, User, Calendar, Share2, Link2, CheckCircle2, ChevronRight, ChevronUp, ChevronDown, Mail, MessageCircle, X } from 'lucide-react';

// MOCK DATA: Articles (Using slugs as keys)
export const articlesData = {
  "ultimate-guide-to-achieving-glass-skin-naturally": {
    id: "ultimate-guide-to-achieving-glass-skin-naturally",
    title: "The Ultimate Guide to Achieving Glass Skin Naturally",
    category: "Routines",
    readTime: "5 min read",
    author: "Dr. Sarah Jenkins",
    date: "June 12, 2026",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=1600&q=80",
    toc: ["Understanding Glass Skin", "Step 1: The Double Cleanse", "Step 2: Gentle Exfoliation", "Step 3: Hydration Layering", "Conclusion"],
    content: [
      { heading: "Understanding Glass Skin", text: "Glass skin is a term for exceptionally smooth, even-toned and lustrous skin that's so flawless it has the appearance of glass. It's simply a clear and elegant way of describing a certain type of enviable complexion." },
      { heading: "Step 1: The Double Cleanse", text: "Start with an oil-based cleanser to remove makeup, SPF, and excess sebum. Follow immediately with a gentle, water-based foaming cleanser to ensure the skin is perfectly clean without feeling stripped." },
      { heading: "Step 2: Gentle Exfoliation", text: "Exfoliation removes dead skin cells that dull your complexion. Use a gentle chemical exfoliant (like a mild AHA or PHA) 2-3 times a week." },
      { heading: "Step 3: Hydration Layering", text: "This is the core of the glass skin routine. Instead of one thick cream, layer multiple thin, hydrating products. Think essence, serum, and a lightweight gel moisturizer." },
      { heading: "Conclusion", text: "Achieving glass skin is a marathon, not a sprint. Consistency is your best friend. Stick to your routine, stay hydrated, and protect your skin with SPF daily." }
    ],
    takeaways: ["Double cleansing is non-negotiable.", "Focus on hydration rather than heavy oils.", "Consistency over intensity."],
    faqs: [
      { q: "How long does it take to see results?", a: "With consistent daily practice, you can begin to see a more radiant and hydrated complexion in about 2-3 weeks." },
      { q: "Can oily skin achieve glass skin?", a: "Absolutely. Oily skin often lacks hydration. Balancing the oil-water levels through lightweight hydration is key to glass skin." }
    ],
    products: ["COSKINn Plump & Glow Serum", "COSKINn Water Surge Moisturizer"]
  },
  "why-strawberry-extract-is-new-vitamin-c": {
    id: "why-strawberry-extract-is-new-vitamin-c",
    title: "Why Strawberry Extract is the New Vitamin C",
    category: "Ingredients",
    readTime: "3 min read",
    author: "Elena Rodriguez",
    date: "June 08, 2026",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1600&q=80",
    toc: ["The Power of Berries", "Natural Salicylic Acid", "How to Use It"],
    content: [
      { heading: "The Power of Berries", text: "Strawberries are packed with antioxidants, particularly Vitamin C, which is known for its skin-brightening properties. Unlike synthetic Vitamin C which can sometimes be unstable or irritating, strawberry extract offers a gentler alternative." },
      { heading: "Natural Salicylic Acid", text: "Did you know strawberries contain natural salicylic acid? This makes them excellent for gently unclogging pores and preventing breakouts without the harshness of traditional acne treatments." },
      { heading: "How to Use It", text: "Incorporate a strawberry-infused serum into your morning routine. It pairs beautifully with hyaluronic acid and provides a smooth, bright base for your SPF and makeup." }
    ],
    takeaways: ["Gentler alternative to synthetic Vitamin C.", "Contains natural pore-clearing properties.", "Great for morning routines."],
    faqs: [
      { q: "Is strawberry extract safe for sensitive skin?", a: "Yes, it is generally much gentler than L-ascorbic acid and rarely causes irritation." },
      { q: "Can I use it with Retinol?", a: "Yes, because it is gentle, it can be safely used in a routine alongside Retinol, though we recommend using strawberry extract in the morning and Retinol at night." }
    ],
    products: ["COSKINn Strawberry Glow Cleanser", "COSKINn Berry Radiance Toner"]
  },
  "5-common-mistakes-damaging-skin-barrier": {
    id: "5-common-mistakes-damaging-skin-barrier",
    title: "5 Common Mistakes Damaging Your Skin Barrier",
    category: "Expert Advice",
    readTime: "4 min read",
    author: "Dr. Emily Chen",
    date: "May 29, 2026",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1600&q=80",
    toc: ["Over-Exfoliating", "Skipping Moisturizer", "Ignoring SPF"],
    content: [
      { heading: "Over-Exfoliating", text: "The most common culprit of a damaged barrier is over-exfoliation. Using physical scrubs and chemical acids daily strips the skin of its natural protective lipids." },
      { heading: "Skipping Moisturizer", text: "Even if you have oily skin, skipping moisturizer forces your skin to compensate by producing more oil, which can lead to a compromised barrier and breakouts." },
      { heading: "Ignoring SPF", text: "UV rays break down the skin barrier over time. Not wearing SPF daily leaves your skin vulnerable to environmental damage and premature aging." }
    ],
    takeaways: ["Exfoliate max 2-3 times a week.", "Moisturize regardless of skin type.", "SPF is mandatory."],
    faqs: [
      { q: "How do I know if my barrier is damaged?", a: "Signs include redness, stinging when applying gentle products, excessive dryness or sudden extreme oiliness, and increased breakouts." },
      { q: "How long does it take to repair?", a: "Depending on the damage, it can take anywhere from 2 weeks to a month of consistent, gentle care." }
    ],
    products: ["COSKINn Barrier Repair Cream", "COSKINn Calming Gel"]
  },
  "how-to-build-a-morning-routine-for-oily-skin": {
    id: "how-to-build-a-morning-routine-for-oily-skin",
    title: "How to Build a Morning Routine for Oily Skin",
    category: "Routines",
    readTime: "6 min read",
    author: "Michael Chang",
    date: "May 15, 2026",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1600&q=80",
    toc: ["Gentle Cleansing", "Niacinamide is Your Friend", "Lightweight Hydration"],
    content: [
      { heading: "Gentle Cleansing", text: "Start with a gel cleanser. You want to remove overnight sebum without stripping the skin tight." },
      { heading: "Niacinamide is Your Friend", text: "A 5% Niacinamide serum can help regulate sebum production throughout the day while keeping pores clear." },
      { heading: "Lightweight Hydration", text: "Opt for an oil-free, gel-based moisturizer. Hydration is still necessary, just in a different texture." }
    ],
    takeaways: ["Avoid stripping cleansers.", "Use Niacinamide.", "Switch to gel moisturizers."],
    faqs: [
      { q: "Should I skip moisturizer if I'm oily?", a: "Never. Skipping moisturizer dehydrates the skin, causing it to produce even more oil." },
      { q: "What kind of SPF is best for oily skin?", a: "Look for mattifying or gel-based sunscreens that won't leave a heavy, greasy finish." }
    ],
    products: ["COSKINn Balancing Toner", "COSKINn Pore-Refining Serum"]
  },
  "the-truth-about-daily-exfoliation": {
    id: "the-truth-about-daily-exfoliation",
    title: "The Truth About Daily Exfoliation",
    category: "Expert Advice",
    readTime: "4 min read",
    author: "Sarah Jenkins",
    date: "May 02, 2026",
    image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=1600&q=80",
    toc: ["Myth vs Fact", "Signs of Over-exfoliation", "The Right Balance"],
    content: [
      { heading: "Myth vs Fact", text: "The myth is that you need to scrub every day to get smooth skin. The fact is, healthy skin exfoliates itself naturally. We just need to give it a gentle nudge." },
      { heading: "Signs of Over-exfoliation", text: "Redness, tightness, an unnatural shiny appearance (not a healthy glow), and increased breakouts are all signs you are doing too much." },
      { heading: "The Right Balance", text: "Stick to chemical exfoliants (AHAs/BHAs) 1-3 times a week, depending on your skin's tolerance." }
    ],
    takeaways: ["Daily exfoliation is generally unnecessary.", "Listen to your skin's distress signals.", "Chemical > Physical scrubs."],
    faqs: [
      { q: "Are physical scrubs bad?", a: "Not necessarily, but scrubs with jagged particles (like walnut shells) can cause micro-tears. Opt for ultra-fine powders or jojoba beads if you prefer physical exfoliation." },
      { q: "Should I exfoliate in the morning or at night?", a: "Nighttime is better, as exfoliating makes your skin more sensitive to the sun. Always follow up with SPF the next morning." }
    ],
    products: ["COSKINn Gentle AHA Exfoliator"]
  },
  "pomegranate-vs-green-tea-which-antioxidant-is-better": {
    id: "pomegranate-vs-green-tea-which-antioxidant-is-better",
    title: "Pomegranate vs. Green Tea: Which Antioxidant is Better?",
    category: "Ingredients",
    readTime: "5 min read",
    author: "Elena Rodriguez",
    date: "April 18, 2026",
    image: "https://images.unsplash.com/photo-1556228720-1c2f0f46c6ab?w=1600&q=80",
    toc: ["The Case for Green Tea", "The Power of Pomegranate", "The Verdict"],
    content: [
      { heading: "The Case for Green Tea", text: "Green tea is rich in EGCG, a potent antioxidant that is incredible for soothing inflammation and reducing sebum production." },
      { heading: "The Power of Pomegranate", text: "Pomegranate is high in Vitamin C and ellagic acid, making it fantastic for cellular regeneration, firming, and brightening." },
      { heading: "The Verdict", text: "Neither is 'better'—they just serve different needs. Green tea is ideal for acne-prone/sensitive skin, while pomegranate is perfect for aging/dull skin." }
    ],
    takeaways: ["Green Tea = Soothing & Clarifying.", "Pomegranate = Firming & Brightening.", "Combine them for maximum protection."],
    faqs: [
      { q: "Can I use both at the same time?", a: "Yes! Antioxidants often work synergistically. You can use a Green Tea mist and a Pomegranate serum together." },
      { q: "Which one is better for acne?", a: "Green Tea is superior for acne because it regulates sebum and significantly reduces inflammation." }
    ],
    products: ["COSKINn Green Tea Face Mist", "COSKINn Firming Serum"]
  },
  "summer-skincare-essentials-you-cant-ignore": {
    id: "summer-skincare-essentials-you-cant-ignore",
    title: "Summer Skincare Essentials You Can't Ignore",
    category: "Lifestyle",
    readTime: "3 min read",
    author: "Jessica Alba",
    date: "April 05, 2026",
    image: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=1600&q=80",
    toc: ["Lighter Textures", "Antioxidant Protection", "Scalp Care"],
    content: [
      { heading: "Lighter Textures", text: "Swap your heavy winter creams for water-creams or gel lotions. Your skin produces more oil in the summer heat." },
      { heading: "Antioxidant Protection", text: "UV rays generate free radicals. A Vitamin C serum under your SPF provides a second line of defense against sun damage." },
      { heading: "Scalp Care", text: "Your scalp is skin too! Don't forget to protect your part with SPF or wear a hat to prevent burns." }
    ],
    takeaways: ["Switch to gel moisturizers.", "Layer Vitamin C under SPF.", "Protect your scalp."],
    faqs: [
      { q: "How often should I reapply SPF in the summer?", a: "Every 2 hours, especially if you are swimming or sweating." },
      { q: "Can I skip moisturizer in the summer?", a: "No, but you should switch to a lightweight, oil-free hydrator." }
    ],
    products: ["COSKINn Vitamin C Sunscreen SPF 50"]
  }
};

import apiClient from '../../utils/apiClient';

export default function ArticleModal({ isOpen, onClose, articleSlug, onArticleChange }) {
  const [article, setArticle] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  const { scrollYProgress } = useScroll({ container: modalRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isOpen && articleSlug) {
      document.body.style.overflow = 'hidden';
      setLoading(true);
      
      apiClient.get(`/content/articles/${articleSlug}`)
        .then(response => {
          const data = response.data;
          let parsed = {};
          try {
            parsed = JSON.parse(data.contentJson || '{}');
          } catch(e) {}
          
          setArticle({
            id: data.slug,
            title: data.title,
            category: parsed.category || 'Blog',
            readTime: parsed.readTime || '5 min read',
            author: parsed.author || 'COSKINn Team',
            date: parsed.date || new Date(data.createdAt).toLocaleDateString(),
            image: data.heroImageUrl || "https://images.unsplash.com/photo-1617897903246-719242758050?w=1600&q=80",
            toc: parsed.toc || [],
            content: parsed.content || [],
            takeaways: parsed.takeaways || [],
            faqs: parsed.faqs || [],
            products: parsed.products || []
          });
        })
        .catch(err => {
          console.error("Failed to load article", err);
          // Fallback if not found on backend (just in case)
          if (articlesData[articleSlug]) {
            setArticle(articlesData[articleSlug]);
          }
        })
        .finally(() => {
          setLoading(false);
          if (modalRef.current) {
            modalRef.current.scrollTo(0, 0);
          }
        });

    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, articleSlug]);

  const handleScroll = (e) => {
    setShowScrollTop(e.target.scrollTop > 400);
  };

  const scrollToTop = () => {
    if (modalRef.current) {
      modalRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isOpen) return null;
  if (loading || !article) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
        <div className="w-12 h-12 border-4 border-white border-t-[#FF2D7A] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-center items-start lg:items-center p-4 lg:p-8">
          
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[1200px] h-[95vh] lg:h-[90vh] bg-[#FFFDFD] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
          >
            
            {/* Scroll Progress Bar */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF2D7A] to-[#FF8EAA] origin-left z-[110]"
              style={{ scaleX }}
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-[110] w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-md flex items-center justify-center text-gray-800 hover:bg-[#FF2D7A] hover:text-white transition-colors border border-white/20"
            >
              <X size={24} strokeWidth={2.5} />
            </button>

            {/* Scrollable Area */}
            <div 
              ref={modalRef} 
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto pb-20 relative hide-scrollbar"
            >
              {/* 1. HERO SECTION */}
              <section className="relative w-full pt-20 pb-12 lg:pt-24 lg:pb-16 px-6 lg:px-12 text-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFF5F8] border border-[#FF2D7A]/20 text-[#FF2D7A] text-xs font-bold uppercase tracking-widest mb-6">
                  {article.category}
                </span>

                <h1 className="text-4xl lg:text-5xl font-heading font-black text-[#1B1B1B] leading-tight mb-8 max-w-4xl mx-auto">
                  {article.title}
                </h1>

                <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm font-bold uppercase tracking-widest mb-10">
                  <span className="flex items-center gap-2"><User size={16} /> {article.author}</span>
                  <span className="flex items-center gap-2"><Calendar size={16} /> {article.date}</span>
                  <span className="flex items-center gap-2"><Clock size={16} /> {article.readTime}</span>
                </div>

                <div className="w-full h-[300px] lg:h-[500px] rounded-[2rem] overflow-hidden shadow-xl max-w-5xl mx-auto">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                </div>
              </section>

              {/* 2. ARTICLE CONTENT */}
              <section className="py-12 bg-white px-6 lg:px-12">
                <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">
                  
                  {/* Left Sidebar: Share */}
                  <div className="w-full lg:w-[80px] shrink-0">
                    <div className="sticky top-12">
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6 lg:text-center">Share</h3>
                      <div className="flex lg:flex-col gap-4 items-center">
                        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#FF2D7A] hover:text-white transition-colors">
                          <MessageCircle size={18} />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#FF2D7A] hover:text-white transition-colors">
                          <Mail size={18} />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#FF2D7A] hover:text-white transition-colors">
                          <Link2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="w-full flex-1">
                    <div className="prose prose-lg max-w-none text-gray-600">
                      
                      {article.content.map((section, idx) => (
                        <div key={idx} className="mb-10">
                          <h2 className="text-2xl lg:text-3xl font-heading font-black text-[#1B1B1B] mb-5">{section.heading}</h2>
                          <p className="text-lg leading-relaxed">{section.text}</p>
                        </div>
                      ))}

                      {/* Takeaways Box */}
                      <div className="bg-[#FFF5F8] rounded-3xl p-8 mt-12 border border-[#FF2D7A]/10">
                        <h3 className="text-xl font-heading font-black text-[#1B1B1B] mb-5 flex items-center gap-3">
                          <CheckCircle2 className="text-[#FF2D7A]" size={24} /> Key Takeaways
                        </h3>
                        <ul className="space-y-3">
                          {article.takeaways.map((takeaway, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D7A] mt-2.5 shrink-0"></span>
                              <span className="font-medium text-[#1B1B1B] text-base">{takeaway}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* FAQs */}
                      {article.faqs && article.faqs.length > 0 && (
                        <div className="mt-12 border-t border-gray-100 pt-12">
                          <h3 className="text-2xl font-heading font-black text-[#1B1B1B] mb-8">Frequently Asked Questions</h3>
                          <div className="space-y-4">
                            {article.faqs.map((faq, idx) => (
                              <div key={idx} className={`bg-[#FFFDFD] rounded-2xl border transition-all duration-300 ${activeFaq === idx ? 'border-[#FF2D7A]/30 shadow-sm' : 'border-gray-100'}`}>
                                <button 
                                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                  className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                                >
                                  <span className={`font-bold transition-colors ${activeFaq === idx ? 'text-[#FF2D7A]' : 'text-[#1B1B1B]'}`}>{faq.q}</span>
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'bg-[#FFF5F8] text-[#FF2D7A] rotate-180' : 'bg-gray-50 text-gray-400'}`}>
                                    <ChevronDown size={18} />
                                  </div>
                                </button>
                                {activeFaq === idx && (
                                  <div className="px-6 pb-5 text-gray-600 font-medium leading-relaxed text-sm">
                                    {faq.a}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Related Products */}
                      {article.products && article.products.length > 0 && (
                        <div className="mt-12 border-t border-gray-100 pt-12 pb-6">
                          <h3 className="text-2xl font-heading font-black text-[#1B1B1B] mb-6">Products Mentioned</h3>
                          <div className="flex flex-wrap gap-3">
                            {article.products.map((product, idx) => (
                              <div key={idx} className="px-4 py-2 bg-white border border-gray-200 rounded-full font-bold text-xs text-[#1B1B1B] hover:border-[#FF2D7A] hover:text-[#FF2D7A] cursor-pointer transition-colors shadow-sm">
                                {product}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Scroll to Top Button (Internal to modal) */}
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={scrollToTop}
                className="absolute bottom-8 right-8 w-12 h-12 bg-[#1B1B1B] text-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex items-center justify-center hover:bg-[#FF2D7A] transition-colors z-[120]"
              >
                <ChevronUp size={24} />
              </motion.button>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
