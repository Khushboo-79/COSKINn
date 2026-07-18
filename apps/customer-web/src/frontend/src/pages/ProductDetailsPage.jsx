import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Footer from '../components/common/Footer';
import { Heart, ShoppingBag, Star, ShieldCheck, ChevronRight, Truck, RefreshCcw, Share2, Plus, Minus, CheckCircle, ChevronDown, ChevronUp, ThumbsUp } from 'lucide-react';
import { skincareProducts } from '../constants/skincareProducts';
import { cosmeticsProducts } from '../constants/cosmeticsProducts';
import CosmeticsProductDetailsPage from './CosmeticsProductDetailsPage';

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

  // Before & After toggle state
  const [showAfterImage, setShowAfterImage] = useState(true);

  const [productType, setProductType] = useState(null);

  useEffect(() => {
    const parsedId = parseInt(id);
    let foundProduct = skincareProducts.find(p => p.id === parsedId);
    
    if (foundProduct) {
      setProductType('skincare');
    } else {
      foundProduct = cosmeticsProducts.find(p => p.id === parsedId);
      if (foundProduct) {
        setProductType('cosmetics');
      }
    }

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

  // (Removed drag slider logic)

  if (!product) return null;

  if (productType === 'cosmetics') {
    return <CosmeticsProductDetailsPage product={product} />;
  }

  const relatedProducts = skincareProducts.filter(p =>
    p.id !== product.id &&
    (product.subcategory ? p.subcategory === product.subcategory : p.category === product.category)
  ).slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="w-full min-h-screen bg-theme-bg overflow-x-hidden font-sans text-theme-text mt-[60px] pb-20">

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
                className="flex-1 md:w-40 h-12 btn-secondary-skincare font-bold uppercase tracking-widest text-xs"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 md:w-40 h-12 btn-primary-skincare font-bold uppercase tracking-widest text-xs"
              >
                Buy Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                  <span className="px-3 py-1 bg-white border border-[#FFD1E5] text-[#FF0069] text-[10px] font-bold tracking-widest uppercase rounded-full shadow-[0_4px_10px_rgba(255,0,105,0.15)] text-center w-max">
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
                className="flex-1 h-14 btn-secondary-skincare flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-sm"
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
                className="w-full h-14 btn-primary-skincare flex items-center justify-center font-bold uppercase tracking-widest text-sm"
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
      {/* Editorial sections moved to Collection Page */}
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
                    className="w-full py-3 btn-primary-skincare font-bold uppercase tracking-widest text-xs"
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
