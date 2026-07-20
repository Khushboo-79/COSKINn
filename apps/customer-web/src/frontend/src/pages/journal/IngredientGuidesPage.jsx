import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, CheckCircle2, XCircle, Beaker } from 'lucide-react';
import Footer from '../../components/common/Footer';
import heroImg from '../../assets/images/journal_ingredients_hero.webp';

export default function IngredientGuidesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const categories = ['All', 'Fruit Extracts', 'Acids & Actives', 'Hydrators', 'Antioxidants'];

  const ingredients = [
    {
      id: 1, name: "Niacinamide", category: "Acids & Actives",
      benefits: "Reduces pore size, balances oil production, and strengthens the skin barrier.",
      skinType: "All skin types, especially oily and acne-prone.",
      usage: "Can be used daily, morning and night.",
      pairWith: ["Hyaluronic Acid", "Retinol"], avoidMixing: ["High strength Vitamin C (can cause flushing)"],
      products: ["COSKINn Pore-Refining Serum", "COSKINn Balancing Toner"]
    },
    {
      id: 2, name: "Vitamin C", category: "Antioxidants",
      benefits: "Brightens dull skin, fades dark spots, and boosts collagen production.",
      skinType: "Normal, dry, and mature skin.",
      usage: "Best used in the morning to protect against environmental damage. Always follow with SPF.",
      pairWith: ["Vitamin E", "Ferulic Acid", "SPF"], avoidMixing: ["AHAs/BHAs", "Retinol (in the same routine)"],
      products: ["COSKINn Vitamin C Sunscreen SPF 50", "COSKINn Glow Serum"]
    },
    {
      id: 3, name: "Ceramides", category: "Hydrators",
      benefits: "Rebuilds and restores the skin barrier, locking in moisture and protecting against irritants.",
      skinType: "Dry, sensitive, and compromised skin.",
      usage: "Daily, morning and night.",
      pairWith: ["Everything. Ceramides play well with all ingredients."], avoidMixing: ["None"],
      products: ["COSKINn Barrier Repair Cream", "COSKINn Hydrating Cleanser"]
    },
    {
      id: 4, name: "Hyaluronic Acid", category: "Hydrators",
      benefits: "Attracts and binds water to the skin, providing intense, plumping hydration.",
      skinType: "All skin types. Everyone needs hydration.",
      usage: "Apply to damp skin before moisturizers.",
      pairWith: ["Vitamin C", "Niacinamide", "Retinol"], avoidMixing: ["None"],
      products: ["COSKINn Water Surge Moisturizer", "COSKINn Plump & Glow Serum"]
    },
    {
      id: 5, name: "Green Tea", category: "Botanical Extracts",
      benefits: "Soothes inflammation, reduces redness, and provides powerful antioxidant protection.",
      skinType: "Sensitive, acne-prone, and irritated skin.",
      usage: "Daily, anytime.",
      pairWith: ["Aloe Vera", "Centella Asiatica"], avoidMixing: ["None"],
      products: ["COSKINn Green Tea Face Mist", "COSKINn Calming Gel"]
    },
    {
      id: 6, name: "Strawberry Extract", category: "Fruit Extracts",
      benefits: "Naturally rich in Vitamin C and salicylic acid. Brightens and gently exfoliates.",
      skinType: "Normal, combination, and dull skin.",
      usage: "Daily, morning or night.",
      pairWith: ["Hyaluronic Acid", "Niacinamide"], avoidMixing: ["Strong chemical exfoliants (if skin is sensitive)"],
      products: ["COSKINn Strawberry Glow Cleanser", "COSKINn Berry Radiance Toner"]
    },
    {
      id: 7, name: "Blueberry Extract", category: "Fruit Extracts",
      benefits: "Packed with anthocyanins. Protects against premature aging and environmental stress.",
      skinType: "All skin types, especially aging or stressed skin.",
      usage: "Nightly for repair.",
      pairWith: ["Ceramides", "Peptides"], avoidMixing: ["None"],
      products: ["COSKINn Blueberry Overnight Mask", "COSKINn Antioxidant Night Cream"]
    },
    {
      id: 8, name: "Pomegranate", category: "Fruit Extracts",
      benefits: "Boosts cell regeneration, fights free radicals, and firms the skin.",
      skinType: "Mature and dry skin.",
      usage: "Daily, morning or night.",
      pairWith: ["Vitamin E", "Hyaluronic Acid"], avoidMixing: ["None"],
      products: ["COSKINn Pomegranate Under Eye Patches", "COSKINn Firming Serum"]
    },
    {
      id: 9, name: "Mango Butter", category: "Fruit Extracts",
      benefits: "Deeply nourishes and softens without clogging pores. Rich in vitamins A and C.",
      skinType: "Dry, flaky, and dehydrated skin.",
      usage: "Whenever deep moisturization is needed.",
      pairWith: ["Ceramides", "Squalane"], avoidMixing: ["None"],
      products: ["COSKINn Rich Body Butter"]
    },
    {
      id: 10, name: "Orange Extract", category: "Fruit Extracts",
      benefits: "Energizes the skin, improves texture, and provides a natural, uplifting glow.",
      skinType: "Dull, tired-looking skin.",
      usage: "Morning, to invigorate.",
      pairWith: ["Vitamin C", "Hyaluronic Acid"], avoidMixing: ["Strong AHAs/BHAs (to prevent irritation)"],
      products: ["COSKINn Orange Energy Face Wash"]
    }
  ];

  const filteredIngredients = ingredients.filter(ing => 
    (activeCategory === 'All' || ing.category.includes(activeCategory) || (activeCategory === 'Botanical Extracts' && ing.category === 'Botanical Extracts')) &&
    ing.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              alt="COSKINn Ingredient Botanical Setup" 
              className="w-full h-full object-cover object-center" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDFD] via-[#FFFDFD]/60 to-transparent w-full"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDFD] via-[#FFFDFD]/80 to-transparent lg:hidden h-full"></div>
          </div>
        </div>

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
                INGREDIENT GUIDES
              </span>

              <h1 className="text-5xl lg:text-7xl font-heading font-black text-[#1B1B1B] leading-[1.1] mb-6 tracking-tight">
                Know Every <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D7A] to-[#FF8EAA] italic font-light">Ingredient.</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 font-medium leading-relaxed max-w-md mb-10">
                Transparency is our promise. Explore the science and the nature behind the active ingredients we use in every COSKINn formula.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => document.getElementById('ingredient-library').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-gradient-to-r from-[#FF2D7A] to-[#FF8EAA] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:shadow-[0_10px_30px_rgba(255,45,122,0.3)] transition-all duration-300 w-max"
                >
                  Explore Library
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. INGREDIENT SEARCH & CATEGORIES */}
      <section id="ingredient-library" className="py-12 bg-white border-y border-gray-100 z-40 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 hide-scrollbar">
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
          <div className="relative w-full lg:w-96">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ingredient (e.g., Vitamin C)" 
              className="w-full bg-gray-50 border border-gray-200 rounded-full pl-12 pr-5 py-4 text-sm font-medium focus:outline-none focus:border-[#FF2D7A] focus:ring-1 focus:ring-[#FF2D7A] transition-all"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
      </section>

      {/* 3. INGREDIENT CARDS */}
      <section className="py-16 lg:py-24 bg-[#FFF5F8] min-h-[500px]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {filteredIngredients.length === 0 ? (
            <div className="text-center py-20">
              <Beaker className="mx-auto text-gray-300 mb-4" size={48} />
              <h3 className="text-2xl font-heading font-bold text-[#1B1B1B] mb-2">No ingredients found.</h3>
              <p className="text-gray-500 font-medium">Try adjusting your search or category filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredIngredients.map((ing) => (
                <motion.div 
                  layout
                  key={ing.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden"
                >
                  <button 
                    onClick={() => setExpandedId(expandedId === ing.id ? null : ing.id)}
                    className="w-full text-left p-8 flex items-center justify-between hover:bg-gray-50/50 transition-colors focus:outline-none group"
                  >
                    <div>
                      <span className="text-[#FF2D7A] text-[10px] font-bold uppercase tracking-widest block mb-2">{ing.category}</span>
                      <h3 className="text-2xl font-heading font-black text-[#1B1B1B] group-hover:text-[#FF2D7A] transition-colors">{ing.name}</h3>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${expandedId === ing.id ? 'bg-[#FF2D7A] text-white rotate-180' : 'bg-gray-50 text-gray-400'}`}>
                      <ChevronDown size={20} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedId === ing.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-8 pb-8 pt-2 border-t border-gray-50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                              <h4 className="text-sm font-bold text-[#1B1B1B] mb-2">Benefits</h4>
                              <p className="text-gray-600 font-medium text-sm leading-relaxed">{ing.benefits}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-[#1B1B1B] mb-2">Suitable Skin Type</h4>
                              <p className="text-gray-600 font-medium text-sm leading-relaxed">{ing.skinType}</p>
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-2xl p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-sm font-bold text-green-600 flex items-center gap-2 mb-3"><CheckCircle2 size={16}/> Pair With</h4>
                              <ul className="space-y-2">
                                {ing.pairWith.map((item, i) => (
                                  <li key={i} className="text-gray-600 text-sm font-medium flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>{item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-red-400 flex items-center gap-2 mb-3"><XCircle size={16}/> Avoid Mixing</h4>
                              <ul className="space-y-2">
                                {ing.avoidMixing.map((item, i) => (
                                  <li key={i} className="text-gray-600 text-sm font-medium flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-300"></span>{item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Found In</h4>
                            <div className="flex flex-wrap gap-2">
                              {ing.products.map((prod, i) => (
                                <span key={i} className="px-3 py-1.5 bg-[#FFF5F8] text-[#FF2D7A] text-xs font-bold rounded-lg border border-[#FF2D7A]/10">
                                  {prod}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
