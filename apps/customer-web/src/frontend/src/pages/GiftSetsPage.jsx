import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Star, ShoppingBag, Heart, ShieldCheck, Leaf, Sparkles, HeartHandshake, Quote, CheckCircle, Cake, Gem, Users, Smile, ArrowRight, Sun, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { skincareProducts } from '../constants/skincareProducts';
import Footer from '../components/common/Footer';
import lifestyleBirthday from '../assets/images/lifestyle_birthday.webp';
import lifestyleAnniversary from '../assets/images/lifestyle_anniversary.webp';
import lifestyleMother from '../assets/images/lifestyle_mother.webp';
import lifestyleValentine from '../assets/images/lifestyle_valentine.webp';
import lifestyleRakhi from '../assets/images/lifestyle_rakhi.webp';
import lifestyleSelfcare from '../assets/images/lifestyle_selfcare.webp';

import hoverGift1 from '../assets/images/product_birthday.webp';
import hoverGift2 from '../assets/images/product_anniversary.webp';
import hoverGift3 from '../assets/images/product_mother.webp';
import hoverGift4 from '../assets/images/product_valentine.webp';
import hoverGift5 from '../assets/images/product_rakhi.webp';
import hoverGift6 from '../assets/images/product_selfcare.webp';

import heroImg from '../assets/images/gift_hero.webp';

// --- Assets & Data ---
const giftSets = skincareProducts.filter(p => p.category === "Gift Sets");

const occasions = [
  { id: 'birthday', title: "Birthday", desc: "Make their special day unforgettable.", icon: <Cake className="w-8 h-8" />, recommendations: [201, 204, 205], reason: "Perfect for glowing skin and a thoughtful birthday surprise.", lifestyleImg: lifestyleBirthday, hoverImg: hoverGift1 },
  { id: 'anniversary', title: "Anniversary", desc: "Celebrate milestones with luxury.", icon: <Heart className="w-8 h-8" />, recommendations: [205, 207, 208], reason: "A luxurious skincare experience to celebrate a special occasion.", lifestyleImg: lifestyleAnniversary, hoverImg: hoverGift2 },
  { id: 'mother', title: "Mother's Day", desc: "Pamper the ones who care the most.", icon: <Users className="w-8 h-8" />, recommendations: [202, 208, 205], reason: "Specially curated for deep hydration, nourishment, and mature skin care.", lifestyleImg: lifestyleMother, hoverImg: hoverGift3 },
  { id: 'valentine', title: "Valentine's Day", desc: "The ultimate gesture of love.", icon: <HeartHandshake className="w-8 h-8" />, recommendations: [201, 205, 208], reason: "Romantic self-care gifts for radiant and healthy skin.", lifestyleImg: lifestyleValentine, hoverImg: hoverGift4 },
  { id: 'raksha_bandhan', title: "Raksha Bandhan", desc: "A bond wrapped in care.", icon: <Sun className="w-8 h-8" />, recommendations: [204, 201, 202], reason: "Show your sibling you care with the gift of healthy, glowing skin.", lifestyleImg: lifestyleRakhi, hoverImg: hoverGift5 },
  { id: 'selfcare', title: "Self-Care", desc: "Because you deserve it too.", icon: <Smile className="w-8 h-8" />, recommendations: [207, 202, 205], reason: "Everything you need for the perfect self-care routine.", lifestyleImg: lifestyleSelfcare, hoverImg: hoverGift6 }
];

const features = [
  { icon: <Gift className="w-8 h-8" />, title: "Premium Luxury Packaging", desc: "Every set comes in a stunning, heavyweight keepsake box." },
  { icon: <HeartHandshake className="w-8 h-8" />, title: "Ready to Gift", desc: "Beautifully wrapped with our signature ribbon. No wrapping paper needed." },
  { icon: <Leaf className="w-8 h-8" />, title: "Clean Ingredients", desc: "100% vegan, cruelty-free, and crafted with skin-loving ingredients." },
  { icon: <ShieldCheck className="w-8 h-8" />, title: "Dermatologist Tested", desc: "Safe, effective, and suitable for all skin types." }
];

const reviews = [
  { name: "Priya S.", rating: 5, review: "I gifted the Luxury Box to my sister for her wedding. The packaging is absolutely stunning and the products inside are pure luxury. She was thrilled!" },
  { name: "Ananya M.", rating: 5, review: "Bought the Travel Kit for my honeymoon. The sizes are perfect and the exclusive pouch it comes in feels very high-end." },
  { name: "Riya K.", rating: 5, review: "The Glow Essentials set is the best gift I've ever received. The box itself is a piece of art." }
];

export default function GiftSetsPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [activeOccasion, setActiveOccasion] = React.useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getRecommendedProducts = () => {
    if (!activeOccasion) return [];
    const occ = occasions.find(o => o.id === activeOccasion);
    return giftSets.filter(product => occ.recommendations.includes(product.id));
  };
  
  const recommendedProducts = getRecommendedProducts();
  const activeOccData = occasions.find(o => o.id === activeOccasion);

  // Helper for generating particles based on type
  const renderParticles = (type) => {
    const particles = [];
    if (type === 'sparkles' || type === 'glow') {
      for (let i = 0; i < 6; i++) {
        particles.push(
          <div key={i} className={`absolute w-1.5 h-1.5 bg-yellow-300 rounded-full shadow-[0_0_8px_2px_rgba(253,224,71,0.8)] opacity-0 group-hover:opacity-100 group-hover:animate-ping`}
               style={{ top: `${20 + Math.random() * 50}%`, left: `${20 + Math.random() * 60}%`, animationDelay: `${Math.random() * 500}ms`, animationDuration: '1.5s' }} />
        );
      }
    } else if (type === 'petals' || type === 'hearts') {
      for (let i = 0; i < 4; i++) {
        particles.push(
          <div key={i} className={`absolute w-3 h-3 bg-pink-400 rounded-tr-full rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out`}
               style={{ 
                 top: `${40 + Math.random() * 20}%`, 
                 left: `${30 + Math.random() * 40}%`,
                 transform: `translate(${Math.random() * 40 - 20}px, ${-Math.random() * 40}px) rotate(${Math.random() * 180}deg)`
               }} />
        );
      }
    } else if (type === 'shimmer') {
      return <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_ease-out]" />;
    } else if (type === 'aura') {
      return <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />;
    }
    return particles;
  };

  return (
    <div className="w-full min-h-screen bg-[#fafafa] overflow-x-hidden font-sans text-theme-text pt-[72px]">
      
      {/* Premium Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-rose-50">
        <div className="absolute inset-0 opacity-50 mix-blend-multiply">
          <img 
            src={heroImg} 
            alt="Luxury Skincare Gift Sets" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
        
        <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-black/10 bg-white/60 backdrop-blur-md text-black text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
              <Gift className="w-4 h-4 text-[#FF0069]" />
              The Art of Gifting
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black mb-6 leading-tight tracking-tight text-black">
              Luxury COSKINn <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF90B6]">Gift Sets</span>
            </h1>
            <p className="text-lg md:text-xl text-black/70 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Beautifully curated skincare collections designed to make every occasion special. Perfect for gifting your loved ones or treating yourself.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => window.scrollTo({ top: document.getElementById('gift-products').offsetTop - 100, behavior: 'smooth' })} className="w-full sm:w-auto px-10 py-4 bg-[#FF0069] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#D40057] transition-all shadow-lg shadow-[#FF0069]/30">
                Shop Gift Sets
              </button>
              <button className="w-full sm:w-auto px-10 py-4 bg-white text-black border-2 border-black/10 backdrop-blur-md rounded-full font-bold uppercase tracking-widest text-sm hover:border-[#FF0069] transition-all shadow-sm">
                Explore Collection
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="relative w-full py-24 border-b border-black/5 z-20 overflow-hidden bg-gradient-to-br from-[#FFF4F9] via-[#FFE7F3] to-[#FFF8F3]">
        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4">Perfect For Every Occasion</h2>
            <p className="text-black/60 font-medium text-lg">Select an occasion to see curated COSKINn gift recommendations.</p>
          </div>
          
          <AnimatePresence mode="wait">
            {!activeOccasion ? (
              <motion.div
                key="occasions-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="grid grid-cols-2 md:grid-cols-3 gap-6"
              >
                {occasions.map((occ) => (
                  <div 
                    key={occ.id} 
                    onClick={() => setActiveOccasion(occ.id)}
                    className="relative rounded-[24px] overflow-hidden cursor-pointer group transition-all duration-700 min-h-[300px] shadow-sm hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-1"
                  >
                    {/* Full-size Lifestyle Image */}
                    <img 
                      src={occ.lifestyleImg} 
                      alt={occ.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0" 
                    />

                    {/* Full-size Product Image (Fades in on hover) */}
                    <img 
                      src={occ.hoverImg} 
                      alt={`${occ.title} Product`} 
                      className="absolute inset-0 w-full h-full object-cover scale-110 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-100 group-hover:opacity-100" 
                    />
                    
                    {/* Dark Overlay for Text Readability & Hover Darkening */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-700 z-10" />

                    {/* Content Layer (Always Visible) */}
                    <div className="relative z-30 p-8 h-full flex flex-col items-center justify-center text-center text-white pointer-events-none">
                      <h3 className="font-bold font-heading text-2xl md:text-3xl mb-2 drop-shadow-md">{occ.title}</h3>
                      <p className="text-sm text-white/90 font-medium drop-shadow-sm max-w-[90%]">{occ.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="recommendations-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="mb-10 flex justify-center md:justify-start">
                  <button 
                    onClick={() => setActiveOccasion(null)}
                    className="flex items-center gap-2 text-black/60 hover:text-[#FF0069] font-bold text-sm uppercase tracking-widest transition-all group px-5 py-2.5 rounded-full hover:bg-black/5"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Occasions
                  </button>
                </div>
                
                <div className="text-center mb-12 max-w-3xl mx-auto">
                  <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4">Recommended for {activeOccData?.title}</h3>
                  <p className="text-[#FF0069] font-bold text-lg mb-2">Why we chose these:</p>
                  <p className="text-black/70 font-medium text-lg leading-relaxed italic">"{activeOccData?.reason}"</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recommendedProducts.map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id} className="group bg-white rounded-3xl p-5 shadow-sm border border-black/5 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 flex flex-col">
                      <div className="w-full aspect-square rounded-2xl bg-theme-secondary/20 overflow-hidden relative shrink-0 mb-6">
                        <img loading="lazy" src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {product.badge && (
                            <span className="px-3 py-1.5 bg-[#FF0069] text-white text-[10px] font-bold tracking-widest uppercase rounded-full shadow-lg backdrop-blur-md">
                              {product.badge}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col flex-1">
                        <h4 className="text-xl font-heading font-bold mb-2 group-hover:text-[#FF0069] transition-colors line-clamp-1">{product.name}</h4>
                        <div className="flex items-center gap-2 mb-4 text-[11px] font-bold text-black/50 bg-black/5 w-max px-2.5 py-1 rounded-full">
                          <Gift className="w-3 h-3 text-[#FF0069]" /> Includes {product.netQuantity}
                        </div>
                        <div className="mt-auto flex items-end justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold text-black/40 line-through">₹{product.originalPrice}</span>
                              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">{product.discountBadge}</span>
                            </div>
                            <div className="text-2xl font-bold text-black">₹{product.price}</div>
                          </div>
                          <button 
                            onClick={(e) => { e.preventDefault(); addToCart(product); }}
                            className="w-10 h-10 bg-theme-primary text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors shadow-lg"
                          >
                            <ShoppingBag className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* Gift Sets Grid */}
      <section id="gift-products" className="w-full bg-[#fafafa] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-4xl font-heading font-bold mb-4">The Gift Collection</h2>
              <p className="text-black/60 font-medium">Premium COSKINn bundles for an unparalleled unboxing experience.</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold tracking-widest text-black/50 uppercase">
              <CheckCircle className="w-4 h-4 text-green-500" /> Complimentary Gift Wrapping
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {giftSets.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="group bg-white rounded-[2rem] p-6 shadow-sm border border-black/5 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 flex flex-col md:flex-row gap-8">
                
                {/* Image */}
                <div className="w-full md:w-2/5 aspect-square rounded-2xl bg-theme-secondary/20 overflow-hidden relative shrink-0">
                  <img loading="lazy" decoding="async" src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.badge && (
                      <span className="px-3 py-1.5 bg-[#FF0069] text-white text-[10px] font-bold tracking-widest uppercase rounded-full shadow-lg backdrop-blur-md">
                        {product.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col flex-1 py-2">
                  <h3 className="text-2xl font-heading font-bold mb-3 group-hover:text-[#FF0069] transition-colors">{product.name}</h3>
                  <p className="text-sm text-black/60 font-medium mb-4 leading-relaxed line-clamp-2">{product.shortDescription}</p>
                  
                  <div className="flex items-center gap-2 mb-6 text-xs font-bold text-black/50 bg-black/5 w-max px-3 py-1.5 rounded-full">
                    <Gift className="w-3.5 h-3.5 text-[#FF0069]" /> Includes {product.netQuantity}
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <span className="text-xs font-bold">{product.rating} ({product.reviews})</span>
                  </div>

                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-black/40 line-through">₹{product.originalPrice}</span>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">{product.discountBadge}</span>
                      </div>
                      <div className="text-3xl font-bold text-black">₹{product.price}</div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${isInWishlist(product.id) ? 'border-red-500 bg-red-50' : 'border-black/10 hover:border-[#FF0069]'}`}
                      >
                        <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-black'}`} />
                      </button>
                      <button 
                        onClick={(e) => { e.preventDefault(); addToCart(product); }}
                        className="w-12 h-12 bg-theme-primary text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors shadow-lg"
                      >
                        <ShoppingBag className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose COSKINn Gift Sets */}
      <section className="w-full bg-white py-24 border-y border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4">Why Choose COSKINn Gift Sets</h2>
            <p className="text-black/60 font-medium">Crafted with care, designed to impress.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-6">
                <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center text-[#FF0069] mb-6">
                  {feature.icon}
                </div>
                <h4 className="font-heading font-bold text-lg mb-3">{feature.title}</h4>
                <p className="text-black/60 text-sm font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="w-full bg-theme-secondary/10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4">Loved by Givers & Receivers</h2>
            <p className="text-black/60 font-medium">Real testimonials from verified buyers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-black/5 flex flex-col relative">
                <Quote className="absolute top-6 right-6 w-10 h-10 text-black/5" />
                <div className="flex text-yellow-400 mb-6">
                  {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-black/70 font-medium leading-relaxed italic mb-8 flex-1">"{rev.review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF0069] to-[#FF90B6] flex items-center justify-center text-white font-bold text-sm">
                    {rev.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{rev.name}</h4>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 uppercase tracking-widest mt-0.5">
                      <CheckCircle className="w-3 h-3" /> Verified Buyer
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
