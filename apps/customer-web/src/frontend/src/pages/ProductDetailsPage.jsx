import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Footer from '../components/common/Footer';
import { Heart, ShoppingBag, Star, ShieldCheck, ChevronRight, Truck, RefreshCcw, Share2, Plus, Minus, CheckCircle } from 'lucide-react';
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

  useEffect(() => {
    // If not in skincare, or product not found, we could handle differently.
    // For now, assume skincare and find the product.
    const foundProduct = skincareProducts.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setMainImage(foundProduct.images[0]);
    } else {
      // In a real app, you might fetch from cosmetics if theme is cosmetics, 
      // but the prompt says this applies only to Skincare New Arrivals.
      navigate(`/${theme}`);
    }
    window.scrollTo(0, 0);
  }, [id, theme, navigate]);

  if (!product) return null;

  const relatedProducts = skincareProducts.filter(p => p.id !== product.id).slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="w-full min-h-screen bg-theme-bg overflow-x-hidden font-sans text-theme-text mt-[72px]">

      {/* Breadcrumbs */}
      <div className="w-full border-b border-black/5 bg-white/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-xs font-medium text-black/50 tracking-wide">
          <Link to="/" className="hover:text-theme-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/new-arrivals" className="hover:text-theme-primary transition-colors">Skincare</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black font-bold truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Left Column: Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-24 h-max">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible hide-scrollbar shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 shrink-0 ${mainImage === img ? 'border-theme-primary shadow-md' : 'border-black/5 hover:border-black/20'}`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover bg-theme-secondary/10" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative w-full aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden bg-theme-secondary/10 border border-black/5">
              <AnimatePresence mode="wait">
                <motion.img
                  key={mainImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                {product.badge && (
                  <span className="px-4 py-1.5 bg-theme-primary text-white text-[10px] font-bold tracking-widest uppercase rounded-full shadow-lg">
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
              <span className="text-xs font-bold text-theme-primary uppercase tracking-widest">{product.category}</span>
              <button className="text-black/40 hover:text-theme-primary transition-colors p-2">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <h1 className="text-3xl md:text-5xl font-heading font-bold leading-tight mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-sm font-bold">{product.rating} <span className="font-medium text-black/50 ml-1">({product.reviews} verified reviews)</span></span>
            </div>

            <p className="text-lg text-black/70 mb-8 font-medium leading-relaxed">{product.shortDescription}</p>

            {/* Price Section */}
            <div className="flex items-end gap-4 mb-8 pb-8 border-b border-black/10">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-black/40 uppercase tracking-widest mb-1">Selling Price</span>
                <span className="text-4xl font-bold text-theme-primary">₹{product.price}</span>
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
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center justify-between border-2 border-black/10 rounded-full px-4 w-32 shrink-0 h-14">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:text-theme-primary"><Minus className="w-4 h-4" /></button>
                <span className="font-bold text-lg">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:text-theme-primary"><Plus className="w-4 h-4" /></button>
              </div>

              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 h-14 bg-black text-white font-bold uppercase tracking-widest text-sm rounded-full flex items-center justify-center gap-2 hover:bg-black/80 transition-colors shadow-lg"
              >
                <ShoppingBag className="w-5 h-5" /> Add to Cart
              </button>

              <button
                onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 shrink-0 ${isInWishlist(product.id) ? 'border-red-500 bg-red-50' : 'border-black/10 hover:border-theme-primary'}`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-black'}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full h-14 bg-theme-primary text-white font-bold uppercase tracking-widest text-sm rounded-full flex items-center justify-center hover:bg-theme-primary/90 transition-colors shadow-xl shadow-theme-primary/30 mb-10"
            >
              Buy It Now
            </button>

            {/* Delivery Info */}
            <div className="bg-theme-secondary/10 rounded-3xl p-6 mb-10 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-theme-primary shadow-sm"><Truck className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-black/50 mb-0.5">Delivery</div>
                  <div className="text-sm font-bold">Free above ₹2999</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-theme-primary shadow-sm"><RefreshCcw className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-black/50 mb-0.5">Returns</div>
                  <div className="text-sm font-bold">Easy 7 Day Return</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-theme-primary shadow-sm"><ShieldCheck className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-black/50 mb-0.5">Authenticity</div>
                  <div className="text-sm font-bold">100% Genuine</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-theme-primary shadow-sm"><CheckCircle className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-black/50 mb-0.5">Availability</div>
                  <div className="text-sm font-bold text-green-600">In Stock ({product.stock})</div>
                </div>
              </div>
            </div>

            {/* Accordion Info */}
            <div className="flex flex-col border-t border-black/10 pt-8">
              <div className="flex border-b border-black/10 mb-6 overflow-x-auto hide-scrollbar">
                {['description', 'benefits', 'ingredients', 'howToUse'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 font-bold uppercase tracking-widest text-xs whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-theme-primary text-theme-primary' : 'border-transparent text-black/50 hover:text-black'}`}
                  >
                    {tab.replace(/([A-Z])/g, ' $1').trim()}
                  </button>
                ))}
              </div>

              <div className="text-sm text-black/70 leading-relaxed min-h-[200px]">
                {activeTab === 'description' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="mb-4">{product.longDescription}</p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div><strong className="block text-black mb-1">Suitable For:</strong> {product.suitableSkinType}</div>
                      <div><strong className="block text-black mb-1">Skin Concerns:</strong> {product.skinConcerns}</div>
                      <div><strong className="block text-black mb-1">Texture:</strong> {product.texture}</div>
                      <div><strong className="block text-black mb-1">Fragrance:</strong> {product.fragrance}</div>
                      <div><strong className="block text-black mb-1">Net Quantity:</strong> {product.netQuantity}</div>
                      <div><strong className="block text-black mb-1">Shelf Life:</strong> {product.shelfLife}</div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'benefits' && (
                  <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="list-disc pl-5 space-y-2">
                    {product.benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
                  </motion.ul>
                )}

                {activeTab === 'ingredients' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="mb-4 font-bold text-black">Key Ingredients:</p>
                    <ul className="list-disc pl-5 space-y-2 mb-6">
                      {product.keyIngredients.map((ing, i) => <li key={i}>{ing}</li>)}
                    </ul>
                    <p className="text-xs text-black/50 mt-4">*Please refer to the product packaging for the most up-to-date ingredient list.</p>
                  </motion.div>
                )}

                {activeTab === 'howToUse' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p>{product.howToUse}</p>
                  </motion.div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="w-full bg-theme-secondary/10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4">Frequently Bought Together</h2>
            <p className="text-black/60 font-medium max-w-2xl mx-auto">Complete your skincare routine with these COSKINn favorites.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(item => (
              <Link to={`/product/${item.id}`} key={item.id} className="group bg-white rounded-3xl p-5 shadow-sm border border-black/5 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                <div className="w-full aspect-square rounded-2xl bg-theme-secondary/20 overflow-hidden mb-6 relative">
                  <img loading="lazy" src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="flex flex-col flex-1 text-center">
                  <h4 className="font-heading font-bold text-lg mb-2 group-hover:text-theme-primary transition-colors">{item.name}</h4>
                  <div className="font-bold text-theme-primary text-xl mt-auto mb-4">₹{item.price}</div>
                  <button
                    onClick={(e) => { e.preventDefault(); addToCart(item); }}
                    className="w-full py-3 bg-black text-white font-bold uppercase tracking-widest text-xs rounded-full group-hover:bg-theme-primary transition-colors"
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
