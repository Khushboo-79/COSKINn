import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart, Trophy, Medal, Award, CheckCircle, Quote } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import heroImg from '../assets/images/award_hero.webp';

// --- Hero & Assets ---
const HERO_IMAGE = heroImg;

// --- Award Features Data ---
const awardFeatures = [
  { icon: <Trophy className="w-8 h-8 text-[#FF0069]" />, title: "Editor's Choice", subtitle: "Vogue Beauty Awards 2024" },
  { icon: <Award className="w-8 h-8 text-[#FF0069]" />, title: "Best Sunscreen Formula", subtitle: "Allure Best of Beauty" },
  { icon: <Medal className="w-8 h-8 text-[#FF0069]" />, title: "Clean Beauty Excellence", subtitle: "Global Skincare Awards" },
  { icon: <Star className="w-8 h-8 text-[#FF0069]" />, title: "Customer Choice Award", subtitle: "Over 1M+ Votes" }
];

// --- Product Data ---
const AWARD_PRODUCTS = [
  {
    id: 114,
    name: 'COSKINn Niacinamide Serum',
    type: 'Face Care • Serums',
    price: 899,
    originalPrice: 1199,
    discount: '25% OFF',
    rating: 4.9,
    reviews: 2450,
    image: '/src/assets/images/niacinamide_serum.webp',
    badge: '🏆 Editor\'s Pick',
    highlight: 'Clinically proven to reduce blemishes by 82% in just 4 weeks.'
  },
  {
    id: 101,
    name: 'COSKINn Sunscreen SPF 50',
    type: 'Face Care • Sunscreen',
    price: 699,
    originalPrice: 899,
    discount: '22% OFF',
    rating: 4.8,
    reviews: 3120,
    image: '/src/assets/images/sunscreen_spf50.webp',
    badge: '🏆 Best Sunscreen',
    highlight: 'Zero white cast, ultra-lightweight formula loved by dermatologists.'
  },
  {
    id: 112,
    name: 'COSKINn Daily Moisturiser',
    type: 'Face Care • Moisturisers',
    price: 649,
    originalPrice: 849,
    discount: '23% OFF',
    rating: 4.8,
    reviews: 2100,
    image: '/src/assets/images/daily_moisturiser.webp',
    badge: '👩⚕️ Dermatologist Choice',
    highlight: 'Provides 72-hour deep hydration without clogging pores.'
  },
  {
    id: 104,
    name: 'COSKINn Gentle Cleanser',
    type: 'Face Care • Cleansers',
    price: 499,
    originalPrice: 699,
    discount: '28% OFF',
    rating: 4.9,
    reviews: 4200,
    image: '/src/assets/images/gentle_cleanser.webp',
    badge: '❤️ Customer Favorite',
    highlight: 'Voted #1 daily cleanser for sensitive and acne-prone skin.'
  },
  {
    id: 110,
    name: 'COSKINn Overnight Mask',
    type: 'Face Care • Masks',
    price: 999,
    originalPrice: 1299,
    discount: '23% OFF',
    rating: 4.9,
    reviews: 1800,
    image: '/src/assets/images/overnight_mask.webp',
    badge: '✨ Beauty Innovator',
    highlight: 'Wake up with a visibly glowing, plump complexion.'
  },
  {
    id: 105,
    name: 'COSKINn Cleansing Balm',
    type: 'Face Care • Cleansers',
    price: 849,
    originalPrice: 1099,
    discount: '22% OFF',
    rating: 4.7,
    reviews: 950,
    image: '/src/assets/images/cleansing_balm.webp',
    badge: '🌿 Clean Beauty',
    highlight: 'Melt away waterproof makeup instantly with clean ingredients.'
  },
  {
    id: 109,
    name: 'COSKINn Hydrating Face Mist',
    type: 'Face Care • Toners',
    price: 449,
    originalPrice: 599,
    discount: '25% OFF',
    rating: 4.6,
    reviews: 1120,
    image: '/src/assets/images/face_mist.webp',
    badge: '🏆 Refreshing Formula',
    highlight: 'Instant hydration boost, perfect for setting makeup.'
  },
  {
    id: 111,
    name: 'COSKINn Under Eye Patches',
    type: 'Face Care • Masks',
    price: 1299,
    originalPrice: 1599,
    discount: '18% OFF',
    rating: 4.7,
    reviews: 890,
    image: '/src/assets/images/under_eye_patches.webp',
    badge: '🏆 Best Eye Treatment',
    highlight: 'Visibly reduces dark circles and puffiness in 15 minutes.'
  }
];

// --- Testimonials Data ---
const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop&fm=webp",
    text: "The Niacinamide Serum completely transformed my skin texture. It's the only product that actually delivered visible results in weeks!"
  },
  {
    id: 2,
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop&fm=webp",
    text: "I've tried luxury sunscreens that cost triple, but COSKINn's SPF 50 is unmatched. Zero white cast and it feels like nothing on the skin."
  },
  {
    id: 3,
    name: "Emily Davis",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop&fm=webp",
    text: "The Overnight Mask is magic in a jar. I wake up looking like I had 12 hours of sleep and a facial. Absolutely deserves every award."
  }
];

// --- Timeline Data ---
const TIMELINE = [
  { year: "2023", title: "Editor's Choice Award", desc: "Awarded by leading beauty publications for our revolutionary SPF formula." },
  { year: "2024", title: "Customer Excellence Award", desc: "Recognized for maintaining a 99% positive feedback rate across 100k+ users." },
  { year: "2025", title: "Best Luxury Skincare Innovation", desc: "Honored at the Global Skincare Summit for our advanced Niacinamide delivery system." }
];

export default function AwardWinnersPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Related Products (Random subset of award winners for bottom carousel)
  const relatedProducts = useMemo(() => {
    return [...AWARD_PRODUCTS].sort(() => 0.5 - Math.random()).slice(0, 4);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#fafafa] overflow-x-hidden font-sans text-theme-text">
      
      {/* Premium Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-rose-50 pt-[90px]">
        {/* WebP Background Image */}
        <div className="absolute inset-0 opacity-40 mix-blend-multiply">
          <img 
            src={HERO_IMAGE} 
            alt="Luxury Skincare Award Winners" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
        
        <div className="relative max-w-5xl mx-auto px-6 text-center z-10 mt-16 md:mt-0">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-black/10 bg-white/60 backdrop-blur-md text-black text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
              <Trophy className="w-4 h-4 text-[#FF0069]" />
              Hall of Fame
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black mb-6 leading-tight tracking-tight text-black">
              Award-Winning <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0069] to-[#FF90B6]">Skincare Collection</span>
            </h1>
            <p className="text-lg md:text-xl text-black/70 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Discover COSKINn's most celebrated skincare essentials, recognized globally for exceptional quality, innovation, and visible results.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => window.scrollTo({ top: document.getElementById('award-products').offsetTop - 100, behavior: 'smooth' })} className="w-full sm:w-auto px-10 py-4 bg-[#FF0069] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#D40057] transition-all shadow-lg shadow-[#FF0069]/30">
                Shop Award Winners
              </button>
              <button className="w-full sm:w-auto px-10 py-4 bg-white text-black border-2 border-black/10 backdrop-blur-md rounded-full font-bold uppercase tracking-widest text-sm hover:border-[#FF0069] transition-all shadow-sm">
                Explore Collection
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Achievements */}
      <section className="w-full bg-white py-16 border-b border-black/5 relative z-20 -mt-10 mx-auto max-w-[1400px] rounded-t-[3rem] px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {awardFeatures.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="flex flex-col items-center text-center p-6 rounded-3xl bg-[#fafafa] border border-black/5 hover:border-[#FF0069]/30 hover:shadow-xl hover:shadow-[#FF0069]/5 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-heading font-bold text-lg mb-1">{feature.title}</h3>
              <p className="text-black/50 text-sm font-medium">{feature.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Award Winning Products */}
      <section id="award-products" className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">The Winners Circle</h2>
          <p className="text-black/60 font-medium max-w-2xl mx-auto">Shop the formulas that have taken the beauty industry by storm.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {AWARD_PRODUCTS.map((product, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              key={product.id} 
              className="group flex flex-col relative"
            >
              {/* Product Image Container */}
              <div className="relative aspect-[4/5] bg-theme-secondary/20 rounded-[2rem] overflow-hidden mb-5">
                <Link to={`/product/${product.id}`} className="block w-full h-full">
                  <img 
                    loading="lazy"
                    decoding="async"
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>

                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.badge && (
                    <span className="bg-black/90 backdrop-blur-md text-[#FF0069] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                      {product.badge}
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-[#FF0069] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                      {product.discount}
                    </span>
                  )}
                </div>

                {/* Quick Actions (Hover) */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button 
                    onClick={() => addToCart(product)}
                    className="flex-1 btn-secondary-skincare h-12 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[11px]"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </button>
                  <button 
                    onClick={() => toggleWishlist(product)}
                    className={`w-12 h-12 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center transition-colors shadow-lg shrink-0 ${isInWishlist(product.id) ? 'text-[#FF0069]' : 'text-black hover:text-[#FF0069]'}`}
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-1 px-2">
                <div className="flex items-center gap-1 text-yellow-400 mb-2 text-xs">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-black/40 font-bold ml-1">({product.reviews})</span>
                </div>
                
                <Link to={`/product/${product.id}`} className="block">
                  <h3 className="font-heading font-bold text-[18px] text-black group-hover:text-[#FF0069] transition-colors leading-tight mb-1">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm font-medium text-black/50 mb-3">{product.type}</p>
                
                {/* Why It Won Highlight */}
                <div className="mb-4 text-xs font-bold text-black/70 bg-[#fafafa] border border-black/5 p-3 rounded-xl flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>{product.highlight}</span>
                </div>

                <div className="mt-auto flex items-center gap-3">
                  <span className="font-bold text-lg text-[#FF0069]">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm font-bold text-black/30 line-through">₹{product.originalPrice}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recognition Timeline & Testimonials Split */}
      <section className="w-full bg-white py-24 border-y border-black/5 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Recognition Timeline */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-10">Our Legacy of Excellence</h2>
            <div className="relative border-l-2 border-black/10 ml-4 lg:ml-8 flex-1 space-y-12 pb-8">
              {TIMELINE.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2, duration: 0.6 }}
                  className="relative pl-8 lg:pl-12"
                >
                  <div className="absolute -left-[9px] top-1 w-4 h-4 bg-[#FF0069] rounded-full shadow-[0_0_0_4px_white]" />
                  <div className="text-sm font-bold text-[#FF0069] mb-1">{item.year}</div>
                  <h4 className="text-xl font-heading font-bold mb-2">{item.title}</h4>
                  <p className="text-black/60 font-medium leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Customer Testimonials */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-10">What Real People Say</h2>
            <div className="flex flex-col gap-6">
              {TESTIMONIALS.map((testimonial, idx) => (
                <motion.div 
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2, duration: 0.6 }}
                  className="bg-[#fafafa] p-6 lg:p-8 rounded-[2rem] border border-black/5 relative"
                >
                  <Quote className="absolute top-6 right-6 w-10 h-10 text-black/5" />
                  <div className="flex items-center gap-1 text-yellow-400 mb-4">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <p className="text-black/80 font-medium italic leading-relaxed mb-6">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover shadow-sm"
                      loading="lazy"
                    />
                    <div>
                      <div className="font-bold text-sm">{testimonial.name}</div>
                      <div className="text-[10px] font-bold text-green-600 uppercase tracking-widest flex items-center gap-1 mt-0.5">
                        <CheckCircle className="w-3 h-3" /> Verified Buyer
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Related Products Carousel */}
      <section className="w-full bg-[#fafafa] py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Explore More Favorites</h2>
            <p className="text-black/60 font-medium">Build your routine with these complementary award-winners.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="group bg-white rounded-3xl p-5 shadow-sm border border-black/5 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                <div className="aspect-square bg-theme-secondary/20 rounded-2xl overflow-hidden mb-4 relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur text-[10px] font-bold uppercase px-2 py-1 rounded">Quick View</div>
                </div>
                <div className="flex flex-col flex-1 text-center">
                  <h4 className="font-heading font-bold text-lg mb-2 group-hover:text-[#FF0069] transition-colors leading-tight">{product.name}</h4>
                  <div className="font-bold text-[#FF0069] text-xl mt-auto mb-4">₹{product.price}</div>
                  <button 
                    onClick={(e) => { e.preventDefault(); addToCart(product); }}
                    className="w-full py-3 btn-primary-skincare font-bold uppercase tracking-widest text-xs"
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
