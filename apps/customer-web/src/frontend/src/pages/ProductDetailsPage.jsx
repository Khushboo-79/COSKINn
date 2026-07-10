import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Footer from '../components/common/Footer';
import { Heart, ShoppingBag, Star, ShieldCheck, ChevronRight, Truck, RefreshCcw, Share2, Plus, Minus, CheckCircle, ChevronDown, ChevronUp, ThumbsUp } from 'lucide-react';
import { skincareProducts } from '../constants/skincareProducts';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { theme } = useTheme();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  // Custom states for new sections
  const [showStickyBar, setShowStickyBar] = useState(false);
  const buyButtonRef = useRef(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [reviewFilter, setReviewFilter] = useState('Most Helpful');
  
  // Before & After slider state
  const [sliderPos, setSliderPos] = useState(50);
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const foundProduct = skincareProducts.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setMainImage(foundProduct.images[0]);
    } else {
      navigate(`/${theme}`);
    }
    window.scrollTo(0, 0);
  }, [id, theme, navigate]);

  // Sticky Bar Logic
  useEffect(() => {
    const handleScroll = () => {
      if (buyButtonRef.current) {
        const rect = buyButtonRef.current.getBoundingClientRect();
        // Show sticky bar when the original buy button scrolls out of view upwards
        setShowStickyBar(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Slider Mouse Logic
  const handleSliderMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  const handleSliderTouch = (e) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  if (!product) return null;

  const relatedProducts = skincareProducts.filter(p => p.id !== product.id).slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="w-full min-h-screen bg-theme-bg overflow-x-hidden font-sans text-theme-text mt-[72px] pb-20">
      
      {/* Sticky Purchase Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] z-50 py-3 px-4 md:px-8 flex justify-between items-center"
          >
            <div className="hidden md:flex items-center gap-4">
              <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <h4 className="font-bold text-black text-sm">{product.name}</h4>
                <div className="text-theme-primary font-bold">₹{product.price}</div>
              </div>
            </div>
            
            <div className="flex flex-1 md:flex-none justify-between items-center gap-4">
              <div className="flex items-center justify-between border-2 border-black/10 rounded-full px-4 w-28 shrink-0 h-12 bg-white">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 hover:text-theme-primary"><Minus className="w-4 h-4" /></button>
                <span className="font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-1 hover:text-theme-primary"><Plus className="w-4 h-4" /></button>
              </div>
              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 md:w-40 h-12 bg-theme-primary text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-black transition-colors shadow-lg"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 md:w-40 h-12 bg-black text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-theme-primary transition-colors shadow-lg"
              >
                Buy Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumbs */}
      <div className="w-full border-b border-black/5 bg-white/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-xs font-medium text-black/50 tracking-wide">
          <Link to="/" className="hover:text-theme-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/skincare" className="hover:text-theme-primary transition-colors">Skincare</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black font-bold truncate">{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left Column: Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-24 h-max z-10">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible hide-scrollbar shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 shrink-0 ${mainImage === img ? 'border-[#FF0069] shadow-md' : 'border-black/5 hover:border-black/20'}`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} decoding="async" className="w-full h-full object-cover bg-theme-secondary/10" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative w-full aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden bg-theme-secondary/10 border border-black/5 group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={mainImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={mainImage}
                  alt={product.name}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 origin-center"
                />
              </AnimatePresence>

              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                {product.badge && (
                  <span className="px-4 py-1.5 bg-[#FF0069] text-white text-[10px] font-bold tracking-widest uppercase rounded-full shadow-lg">
                    {product.badge}
                  </span>
                )}
                {product.discountBadge && (
                  <span className="px-3 py-1 bg-black text-white text-[10px] font-bold tracking-widest uppercase rounded-full shadow-lg text-center w-max">
                    {product.discountBadge}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#FF0069] uppercase tracking-widest">{product.subcategory || product.category}</span>
              <button className="text-black/40 hover:text-[#FF0069] transition-colors p-2">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <h1 className="text-3xl md:text-5xl font-heading font-bold leading-tight mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-transparent text-gray-300'}`} />
                ))}
              </div>
              <span className="text-sm font-bold">{product.rating} <span className="font-medium text-black/50 ml-1">({product.reviews} verified reviews)</span></span>
            </div>

            <p className="text-lg text-black/70 mb-8 font-medium leading-relaxed">{product.shortDescription}</p>

            {/* Price Section */}
            <div className="flex items-end gap-4 mb-8 pb-8 border-b border-black/10">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-black/40 uppercase tracking-widest mb-1">Selling Price</span>
                <span className="text-4xl font-bold text-[#FF0069]">₹{product.price}</span>
              </div>
              {product.originalPrice && (
                <div className="flex flex-col mb-1">
                  <span className="text-xs font-bold text-black/40 uppercase tracking-widest mb-1">MRP</span>
                  <span className="text-xl font-bold text-black/40 line-through">₹{product.originalPrice}</span>
                </div>
              )}
              <span className="text-xs font-bold text-green-600 mb-2">(Inclusive of all taxes)</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-center justify-between border-2 border-black/10 rounded-full px-4 w-32 shrink-0 h-14">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:text-[#FF0069]"><Minus className="w-4 h-4" /></button>
                <span className="font-bold text-lg">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:text-[#FF0069]"><Plus className="w-4 h-4" /></button>
              </div>

              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 h-14 bg-black text-white font-bold uppercase tracking-widest text-sm rounded-full flex items-center justify-center gap-2 hover:bg-[#FF0069] transition-colors shadow-lg"
              >
                <ShoppingBag className="w-5 h-5" /> Add to Cart
              </button>

              <button
                onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 shrink-0 ${isInWishlist(product.id) ? 'border-red-500 bg-red-50' : 'border-black/10 hover:border-[#FF0069]'}`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-black'}`} />
              </button>
            </div>

            <div ref={buyButtonRef} className="mb-10">
              <button
                onClick={handleBuyNow}
                className="w-full h-14 bg-[#FF0069] text-white font-bold uppercase tracking-widest text-sm rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors shadow-[0_10px_30px_rgba(255,0,105,0.3)]"
              >
                Buy It Now
              </button>
            </div>

            {/* Delivery Info Grid */}
            <div className="bg-gray-50 rounded-3xl p-6 mb-10 grid grid-cols-2 gap-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#FF0069] shadow-sm"><Truck className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-black/50 mb-0.5">Delivery</div>
                  <div className="text-sm font-bold">Free above ₹2999</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#FF0069] shadow-sm"><RefreshCcw className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-black/50 mb-0.5">Returns</div>
                  <div className="text-sm font-bold">Easy 7 Day Return</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#FF0069] shadow-sm"><ShieldCheck className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-black/50 mb-0.5">Authenticity</div>
                  <div className="text-sm font-bold">100% Genuine</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#FF0069] shadow-sm"><CheckCircle className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-black/50 mb-0.5">Availability</div>
                  <div className="text-sm font-bold text-green-600">In Stock</div>
                </div>
              </div>
            </div>

            {/* Basic Accordion Info for older products */}
            {!product.detailedIngredients && (
              <div className="flex flex-col border-t border-black/10 pt-8">
                <div className="flex border-b border-black/10 mb-6 overflow-x-auto hide-scrollbar">
                  {['description', 'benefits', 'ingredients'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 font-bold uppercase tracking-widest text-xs whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-[#FF0069] text-[#FF0069]' : 'border-transparent text-black/50 hover:text-black'}`}
                    >
                      {tab.replace(/([A-Z])/g, ' $1').trim()}
                    </button>
                  ))}
                </div>
                <div className="text-sm text-black/70 leading-relaxed min-h-[150px]">
                  {activeTab === 'description' && <p>{product.longDescription}</p>}
                  {activeTab === 'benefits' && (
                    <ul className="list-disc pl-5 space-y-2">
                      {product.benefits?.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )}
                  {activeTab === 'ingredients' && (
                    <ul className="list-disc pl-5 space-y-2">
                      {product.keyIngredients?.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- ADVANCED PDP SECTIONS (Only render if data exists) --- */}
      
      {/* 1. Benefits Section */}
      {product.benefits && product.detailedIngredients && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-black mb-4">Why You'll Love It</h2>
            <p className="text-gray-600">Formulated for results. Designed for luxury.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {product.benefits.map((benefit, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-[#FF0069]/5 rounded-3xl p-6 flex flex-col items-center justify-center text-center border border-[#FF0069]/10"
              >
                <div className="w-12 h-12 bg-[#FF0069]/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="text-[#FF0069]" size={24} />
                </div>
                <h4 className="font-bold text-black">{benefit}</h4>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 2. Ingredients Section */}
      {product.detailedIngredients && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-black mb-4">Hero Ingredients</h2>
              <p className="text-gray-600">The science behind the glow.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {product.detailedIngredients.map((ing, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group">
                  <h3 className="text-xl font-heading font-bold text-black mb-3 group-hover:text-[#FF0069] transition-colors">{ing.name}</h3>
                  <p className="text-gray-600 mb-4">{ing.benefit}</p>
                  <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-500">
                    For {ing.skinType}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. How To Use Timeline */}
      {product.howToUse && Array.isArray(product.howToUse) && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-black mb-4">How To Use</h2>
            <p className="text-gray-600">Follow these steps for the perfect cleanse.</p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              {product.howToUse.map((step, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx} 
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-white border-4 border-[#FF0069] rounded-full flex items-center justify-center text-xl font-black text-[#FF0069] relative z-10 mb-6 shadow-[0_0_20px_rgba(255,0,105,0.2)]">
                    {idx + 1}
                  </div>
                  <h4 className="text-lg font-bold text-black mb-2">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Before & After Slider */}
      {product.beforeAfter && (
        <section className="bg-black py-20 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold mb-4 text-white">Real Results</h2>
              <p className="text-gray-400">4 Weeks of consistent use.</p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div 
                ref={sliderRef}
                className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden select-none cursor-ew-resize bg-gray-900"
                onMouseMove={handleSliderMove}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onTouchMove={handleSliderTouch}
              >
                {/* After Image (Background) */}
                <div className="absolute inset-0">
                  <img src={product.beforeAfter.after} alt="After" className="w-full h-full object-cover filter brightness-110" draggable="false" />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm font-bold">After</div>
                </div>

                {/* Before Image (Foreground, Clipped) */}
                <div 
                  className="absolute inset-0 border-r-4 border-white"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <img src={product.beforeAfter.before} alt="Before" className="w-full h-full object-cover filter grayscale contrast-125" draggable="false" />
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-4 py-1 rounded-full text-sm font-bold">Before</div>
                </div>

                {/* Slider Handle */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-2xl z-10 pointer-events-none"
                  style={{ left: `calc(${sliderPos}% - 20px)` }}
                >
                  <div className="w-6 h-6 flex justify-between items-center text-gray-400">
                    <ChevronRight className="rotate-180" size={16}/>
                    <ChevronRight size={16}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Build Your Routine */}
      {product.routine && (
        <section className="max-w-7xl mx-auto px-6 py-20 border-b border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-black mb-4">Build Your Routine</h2>
            <p className="text-gray-600">Maximize your glow with these perfect pairings.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 overflow-x-auto hide-scrollbar snap-x">
            {product.routine.map((item, idx) => (
              <div key={idx} className="flex flex-col md:flex-row items-center snap-start shrink-0">
                <div className="bg-gray-50 rounded-3xl p-6 flex flex-col items-center text-center w-64 hover:shadow-xl transition-all border border-gray-100">
                  <div className="text-[#FF0069] font-bold text-sm uppercase tracking-widest mb-4">Step {idx + 1}</div>
                  <div className="font-bold text-black text-lg mb-2">{item.step}</div>
                  <div className="text-sm text-gray-500">{item.product}</div>
                </div>
                {idx < product.routine.length - 1 && (
                  <div className="text-gray-300 md:px-4 py-4 md:py-0">
                    <Plus className="w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Customer Reviews */}
      {product.customerReviews && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-gray-100 pb-6">
            <div>
              <h2 className="text-3xl font-heading font-bold text-black mb-4">Verified Reviews</h2>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <span className="font-bold text-black text-lg">{product.rating}</span>
                <span className="text-gray-500 text-sm">Based on {product.reviews} Reviews</span>
              </div>
            </div>
            
            <div className="mt-6 md:mt-0">
              <select 
                value={reviewFilter} 
                onChange={(e) => setReviewFilter(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-[#FF0069] focus:border-[#FF0069] block w-full p-3 outline-none font-bold"
              >
                <option>Most Helpful</option>
                <option>Newest</option>
                <option>5 Stars</option>
                <option>4 Stars</option>
                <option>3 Stars</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.customerReviews.map((review, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-black flex items-center gap-2">
                      {review.user} <CheckCircle size={14} className="text-green-500" />
                    </h4>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'fill-transparent text-gray-300'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-6">{review.text}</p>
                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#FF0069] transition-colors font-medium">
                  <ThumbsUp size={16} /> Helpful ({review.helpful})
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. FAQ */}
      {product.faqs && (
        <section className="max-w-3xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-black mb-4">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {product.faqs.map((faq, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                >
                  <span className="font-bold text-black">{faq.q}</span>
                  {activeFaq === idx ? <ChevronUp className="text-[#FF0069]" /> : <ChevronDown className="text-gray-400" />}
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-5 text-gray-600 leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. Why Choose COSKINn Features */}
      {product.detailedIngredients && (
        <section className="bg-pink-50/50 py-16 border-t border-b border-pink-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center">
              {[
                { label: "Cruelty Free" },
                { label: "Paraben Free" },
                { label: "Vegan" },
                { label: "Dermatologist Tested" },
                { label: "Eco Friendly" },
                { label: "Made For Indian Skin" }
              ].map((f, i) => (
                <motion.div key={i} whileHover={{ y: -5 }} className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-[#FF0069]">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="text-xs font-bold text-gray-700">{f.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products Carousel */}
      <div className="w-full bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4">You May Also Like</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(item => (
              <Link to={`/product/${item.id}`} key={item.id} className="group bg-gray-50 rounded-3xl p-5 shadow-sm border border-black/5 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                <div className="w-full aspect-[4/5] rounded-2xl bg-white overflow-hidden mb-6 relative">
                  <img loading="lazy" decoding="async" src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="flex flex-col flex-1 text-center">
                  <h4 className="font-heading font-bold text-lg mb-2 group-hover:text-[#FF0069] transition-colors">{item.name}</h4>
                  <div className="font-bold text-[#FF0069] text-xl mt-auto mb-4">₹{item.price}</div>
                  <button
                    onClick={(e) => { e.preventDefault(); addToCart(item); }}
                    className="w-full py-3 bg-black text-white font-bold uppercase tracking-widest text-xs rounded-full group-hover:bg-[#FF0069] transition-colors"
                  >
                    Add To Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
