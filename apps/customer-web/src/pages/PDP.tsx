import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';
import { ArrowLeft, Star, Heart, Check, ChevronDown, ChevronUp, Play, ShoppingBag, ShieldCheck, Truck, RotateCcw, Droplet, Sparkles, MessageCircle, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductById, getProductsByTheme } from '../data/dummyData';
import type { Product as DummyProduct } from '../data/dummyData';
import { getAllProducts } from '../data/products';
import type { Product } from '../data/products';

const PDP: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { mode } = useTheme();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const isGlam = mode === 'glam';

  const [product, setProduct] = useState<DummyProduct | null>(null);
  const [activeMedia, setActiveMedia] = useState<{ type: 'image' | 'video', url: string } | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('ingredients');
  const [added, setAdded] = useState(false);
  
  // Ingredient popover state
  const [hoveredIngredient, setHoveredIngredient] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      // Find in our new products.ts
      const allProducts = getAllProducts(isGlam);
      const foundProduct = allProducts.find(p => p.id.toString() === id);
      const p = foundProduct || allProducts[0];
      
      // Map to DummyProduct structure for the rich UI
      if (p) {
        const mappedProduct: DummyProduct = {
          id: p.id,
          name: p.name,
          subtitle: isGlam ? 'Luxurious Collection' : 'Fresh Glow',
          category: p.category,
          price: p.price,
          rating: p.rating,
          reviews: p.reviews,
          theme: isGlam ? 'glam' : 'skin',
          badges: p.badge ? [p.badge] : [],
          images: [p.image, p.image2 || p.image],
          shortDescription: p.description || (isGlam ? 'A decadent, velvet-finish product infused with rare botanicals. Formulated to restore elasticity and impart a candlelit glow.' : 'A juicy, fruit-forward product packed with Vitamin C and peach extract. Instantly brightens, visibly plumps, and leaves you looking perfectly dewy.'),
          ingredients: [
            { name: isGlam ? 'Gold Leaf' : 'Peach Extract', description: 'Nourishes and revitalizes.', icon: '✨' },
            { name: 'Hyaluronic Acid', description: 'Deeply hydrates and plumps.', icon: '💧' }
          ],
          usage: p.howToUse ? [p.howToUse] : ['Apply 2-3 drops to clean, dry skin.', 'Massage gently until absorbed.'],
          skinTypes: ['All', 'Dry', 'Combination'],
          concerns: ['Dullness', 'Uneven Texture'],
          benefits: ['Instantly plumps and hydrates', 'Leaves a non-sticky, dewy finish'],
          textureImage: p.image2 || p.image,
          fullIngredientsList: p.ingredients || 'Water/Aqua/Eau, Glycerin, Niacinamide, Hyaluronic Acid, Squalane, Panthenol, Fragrance (Parfum).',
          faqs: [],
          customerReviews: []
        };
        setProduct(mappedProduct);
        setActiveMedia({ type: 'image', url: mappedProduct.images[0] });
      }
    }
  }, [id, isGlam]);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found.</div>;
  }

  const crossSellProducts = getAllProducts(isGlam).filter(p => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  return (
    <div className={`min-h-screen pb-24 md:pb-0 ${isGlam ? 'bg-[#faf9f6]' : 'bg-white'}`}>
      
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6">
        <Link to="/collections" className={`inline-flex items-center text-sm font-bold transition-colors ${isGlam ? 'text-gray-500 hover:text-[#7a1b26]' : 'text-gray-400 hover:text-[#ff9aa8]'}`}>
          <ArrowLeft size={16} className="mr-2" /> Back to Shop
        </Link>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-20">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
          
          {/* Left: Interactive Media Gallery */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            
            {/* Main Media Display */}
            <div className={`relative w-full aspect-[4/5] rounded-[24px] overflow-hidden bg-gray-100 group ${isGlam ? 'shadow-md border border-[#e5b376]/20' : ''}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMedia?.url}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  {activeMedia?.type === 'video' ? (
                    <video 
                      src={activeMedia.url} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src={activeMedia?.url} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMedia({ type: 'image', url: img })}
                  className={`relative w-20 h-24 flex-shrink-0 rounded-[12px] overflow-hidden border-2 transition-colors ${
                    activeMedia?.url === img 
                      ? (isGlam ? 'border-[#7a1b26]' : 'border-[#ff9aa8]') 
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
              
              {product.galleryVideo && (
                <button
                  onClick={() => setActiveMedia({ type: 'video', url: product.galleryVideo! })}
                  className={`relative w-20 h-24 flex-shrink-0 rounded-[12px] overflow-hidden border-2 transition-colors flex items-center justify-center bg-gray-200 ${
                    activeMedia?.url === product.galleryVideo 
                      ? (isGlam ? 'border-[#7a1b26]' : 'border-[#ff9aa8]') 
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Play size={24} className="text-gray-600 z-10" />
                  <video src={product.galleryVideo} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                </button>
              )}
            </div>

          </div>

          {/* Right: Product Info */}
          <div className="w-full md:w-1/2 flex flex-col md:py-4 lg:pl-4">
            <div className="sticky top-24">
              
              {/* Badges */}
              {product.badges && product.badges.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {product.badges.map(badge => (
                    <span key={badge} className={`px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded-sm ${isGlam ? 'bg-[#2a2a2a] text-[#e5b376]' : 'bg-[#ff9aa8] text-white'}`}>
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              {/* Title & Reviews */}
              <h1 className={`text-4xl lg:text-5xl xl:text-6xl mb-2 leading-[1.1] ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display font-black text-[#2a2022] tracking-tight'}`}>
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={isGlam ? '#e5b376' : '#ff9aa8'} color={isGlam ? '#e5b376' : '#ff9aa8'} />
                ))}
                <span className="text-sm text-gray-500 font-medium ml-2">({product.reviews} reviews)</span>
              </div>

              {/* Subtitle & Price */}
              <p className={`text-xl font-medium mb-4 ${isGlam ? 'text-gray-500 font-serif italic' : 'text-[#ff9aa8]'}`}>
                {product.subtitle}
              </p>

              <p className={`text-3xl font-bold mb-8 ${isGlam ? 'text-[#7a1b26]' : 'text-gray-900'}`}>
                {formatPrice(product.price)}
              </p>

              {/* Description Snippet */}
              <p className={`text-base lg:text-lg leading-relaxed mb-10 ${isGlam ? 'font-serif text-gray-600' : 'text-gray-600'}`}>
                {product.shortDescription}
              </p>

              {/* Add to Cart Desktop (Hidden on mobile) */}
              <div className="hidden md:flex items-center gap-4 mb-12">
                <div className="flex items-center border border-gray-200 rounded-full bg-white px-4 py-4">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2 text-gray-500 hover:text-black">-</button>
                  <span className="px-4 font-bold min-w-[3ch] text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-2 text-gray-500 hover:text-black">+</button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 px-8 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center ${
                    added 
                      ? 'bg-green-500 text-white'
                      : isGlam 
                        ? 'bg-[#2a2a2a] text-[#e5b376] hover:bg-black' 
                        : 'bg-[#ff9aa8] text-white hover:bg-[#ff8f9f] shadow-lg shadow-[#ff9aa8]/30'
                  }`}
                >
                  {added ? (
                    <><Check className="mr-2" /> Added to Bag</>
                  ) : (
                    'Add to Bag'
                  )}
                </button>
                
                <motion.button
                  whileTap={{ scale: 0.7 }}
                  onClick={() => isInWishlist(product.id.toString()) ? removeFromWishlist(product.id.toString()) : addToWishlist({...product, id: product.id.toString(), price: formatPrice(product.price), image: product.images[0], category: product.category})}
                  className={`p-4 rounded-full border border-gray-200 flex items-center justify-center transition-colors ${isGlam ? 'hover:border-[#7a1b26] hover:text-[#7a1b26]' : 'hover:border-[#ff9aa8] hover:text-[#ff9aa8]'}`}
                >
                  <motion.div
                    animate={{ scale: isInWishlist(product.id.toString()) ? [1, 1.4, 1] : 1 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Heart size={24} strokeWidth={1.5} fill={isInWishlist(product.id.toString()) ? "currentColor" : "none"} className={isInWishlist(product.id.toString()) ? "text-red-500" : ""} />
                  </motion.div>
                </motion.button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 mb-12">
                <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <div className={`p-2 rounded-full ${isGlam ? 'bg-[#f4efe8] text-[#7a1b26]' : 'bg-[#fff0f2] text-[#ff9aa8]'}`}>
                    <Truck size={18} />
                  </div>
                  Free Shipping
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <div className={`p-2 rounded-full ${isGlam ? 'bg-[#f4efe8] text-[#7a1b26]' : 'bg-[#fff0f2] text-[#ff9aa8]'}`}>
                    <RotateCcw size={18} />
                  </div>
                  30-Day Returns
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <div className={`p-2 rounded-full ${isGlam ? 'bg-[#f4efe8] text-[#7a1b26]' : 'bg-[#fff0f2] text-[#ff9aa8]'}`}>
                    <ShieldCheck size={18} />
                  </div>
                  Derm Tested
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <div className={`p-2 rounded-full ${isGlam ? 'bg-[#f4efe8] text-[#7a1b26]' : 'bg-[#fff0f2] text-[#ff9aa8]'}`}>
                    <Leaf size={18} />
                  </div>
                  Cruelty Free
                </div>
              </div>

              {/* Accordions */}
              <div className="border-t border-gray-200 divide-y divide-gray-200">
                
                {/* Ingredients Accordion (Thematic) */}
                <div className="py-5">
                  <button onClick={() => toggleAccordion('ingredients')} className="w-full flex justify-between items-center text-left focus:outline-none group">
                    <span className={`font-bold text-lg ${isGlam ? 'font-serif text-[#7a1b26]' : 'text-[#ff9aa8]'} group-hover:underline`}>
                      {isGlam ? 'The Secret Elixir' : 'What\'s in the Juice?'}
                    </span>
                    {activeAccordion === 'ingredients' ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                  </button>
                  <AnimatePresence>
                    {activeAccordion === 'ingredients' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {product.ingredients.map((ing, idx) => (
                            <div 
                              key={idx} 
                              className={`relative p-4 rounded-xl border ${isGlam ? 'border-[#e5b376]/30 bg-[#faf9f6]' : 'border-[#ffe4e8] bg-[#fff0f2]'} cursor-help`}
                              onMouseEnter={() => setHoveredIngredient(ing.name)}
                              onMouseLeave={() => setHoveredIngredient(null)}
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{ing.icon}</span>
                                <span className={`font-bold ${isGlam ? 'font-serif' : ''}`}>{ing.name}</span>
                              </div>
                              
                              {/* Popover */}
                              <AnimatePresence>
                                {hoveredIngredient === ing.name && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className={`absolute bottom-full left-0 mb-2 w-full p-3 rounded-lg shadow-xl z-20 ${isGlam ? 'bg-[#2a2a2a] text-[#e5b376]' : 'bg-white border border-[#ff9aa8] text-gray-800'}`}
                                  >
                                    <p className="text-sm font-medium">{ing.description}</p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* How to Use Accordion (Thematic) */}
                <div className="py-5">
                  <button onClick={() => toggleAccordion('howToUse')} className="w-full flex justify-between items-center text-left focus:outline-none group">
                    <span className={`font-bold text-lg ${isGlam ? 'font-serif text-[#7a1b26]' : 'text-[#ff9aa8]'} group-hover:underline`}>
                      {isGlam ? 'The Royal Ritual' : 'How to bounce'}
                    </span>
                    {activeAccordion === 'howToUse' ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                  </button>
                  <AnimatePresence>
                    {activeAccordion === 'howToUse' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <ul className="pt-6 space-y-4">
                          {product.usage.map((step, idx) => (
                            <li key={idx} className="flex gap-4">
                              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${isGlam ? 'bg-[#7a1b26] text-white' : 'bg-[#ff9aa8] text-white'}`}>
                                {idx + 1}
                              </div>
                              <p className={`text-gray-600 ${isGlam ? 'font-serif' : ''}`}>{step}</p>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Details Accordion */}
                <div className="py-5">
                  <button onClick={() => toggleAccordion('details')} className="w-full flex justify-between items-center text-left focus:outline-none group">
                    <span className={`font-bold text-lg text-gray-900 group-hover:underline`}>
                      Product Details
                    </span>
                    {activeAccordion === 'details' ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                  </button>
                  <AnimatePresence>
                    {activeAccordion === 'details' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="pt-4 grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="block font-bold text-gray-400 uppercase tracking-wider text-[10px] mb-1">Good For</span>
                            <p className="font-medium text-gray-800">{product.skinTypes.join(', ')}</p>
                          </div>
                          <div>
                            <span className="block font-bold text-gray-400 uppercase tracking-wider text-[10px] mb-1">Solves</span>
                            <p className="font-medium text-gray-800">{product.concerns.length > 0 ? product.concerns.join(', ') : 'Everyday use'}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* === DEEP DIVE SECTIONS === */}
        <div className="mt-24 space-y-24">
          
          {/* Why You'll Love It / Benefits */}
          {(product.benefits || product.textureImage) && (
            <div className={`rounded-[32px] overflow-hidden flex flex-col md:flex-row items-center ${isGlam ? 'bg-[#1a1a1a] text-[#e5b376]' : 'bg-[#fff0f2] text-[#2a2022]'}`}>
              {product.textureImage && (
                <div className="w-full md:w-1/2 h-[400px] md:h-[500px]">
                  <img src={product.textureImage} alt="Texture" className="w-full h-full object-cover" />
                </div>
              )}
              <div className={`w-full md:w-1/2 p-10 lg:p-16 flex flex-col justify-center ${isGlam ? 'items-center text-center' : ''}`}>
                <h3 className={`text-3xl lg:text-4xl font-bold mb-8 ${isGlam ? 'font-serif text-center' : 'font-display tracking-tight'}`}>
                  {isGlam ? 'The Magic Inside' : 'Why You\'ll Love It'}
                </h3>
                {product.benefits && (
                  <ul className={`space-y-6 ${isGlam ? 'inline-block text-left mx-auto' : ''}`}>
                    {product.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-lg">
                        <Sparkles className={`flex-shrink-0 mt-1 ${isGlam ? 'text-[#e5b376]' : 'text-[#ff9aa8]'}`} />
                        <span className={isGlam ? 'font-serif' : 'font-medium'}>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Consumer Study Results */}
          {product.consumerStudyResults && product.consumerStudyResults.length > 0 && (
            <div className="text-center px-4">
              <h3 className={`text-3xl font-bold mb-12 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-[#2a2022]'}`}>
                Real Results
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {product.consumerStudyResults.map((result, idx) => (
                  <div key={idx} className={`p-8 rounded-[24px] ${isGlam ? 'bg-[#faf9f6] border border-[#e5b376]/20' : 'bg-gray-50'}`}>
                    <div className={`text-5xl font-black mb-4 ${isGlam ? 'font-serif text-[#7a1b26]' : 'font-display text-[#ff9aa8]'}`}>
                      {result.metric}
                    </div>
                    <p className={`text-lg ${isGlam ? 'font-serif text-gray-700' : 'font-medium text-gray-800'}`}>
                      {result.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expanded Ingredients & FAQ side-by-side or stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Full Ingredients */}
            {product.fullIngredientsList && (
              <div>
                <h3 className={`text-2xl font-bold mb-6 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-[#2a2022]'}`}>
                  Full Ingredient List
                </h3>
                <div className={`p-6 rounded-2xl text-sm leading-relaxed ${isGlam ? 'bg-[#faf9f6] font-serif text-gray-600 border border-[#e5b376]/20' : 'bg-gray-50 text-gray-600 font-medium'}`}>
                  {product.fullIngredientsList}
                </div>
              </div>
            )}

            {/* FAQs */}
            {product.faqs && product.faqs.length > 0 && (
              <div>
                <h3 className={`text-2xl font-bold mb-6 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-[#2a2022]'}`}>
                  Frequently Asked Questions
                </h3>
                <div className="divide-y divide-gray-200 border-t border-gray-200">
                  {product.faqs.map((faq, idx) => (
                    <div key={idx} className="py-4">
                      <p className={`font-bold mb-2 ${isGlam ? 'font-serif text-[#7a1b26]' : 'text-[#2a2022]'}`}>{faq.q}</p>
                      <p className={`text-gray-600 ${isGlam ? 'font-serif' : 'text-sm'}`}>{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Customer Reviews */}
          {product.customerReviews && product.customerReviews.length > 0 && (
            <div className="pt-12 border-t border-gray-200">
              <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/3">
                  <h3 className={`text-3xl font-bold mb-4 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-[#2a2022]'}`}>
                    Customer Reviews
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={24} fill={isGlam ? '#e5b376' : '#ff9aa8'} color={isGlam ? '#e5b376' : '#ff9aa8'} />
                      ))}
                    </div>
                    <span className="text-2xl font-bold">{product.rating}</span>
                  </div>
                  <p className="text-gray-500 mb-6">Based on {product.reviews} reviews</p>
                  
                  {/* Dummy review distribution bars */}
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map(stars => (
                      <div key={stars} className="flex items-center gap-3 text-sm">
                        <span className="w-12 text-gray-600">{stars} stars</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${isGlam ? 'bg-[#7a1b26]' : 'bg-[#ff9aa8]'}`} 
                            style={{ width: stars === 5 ? '80%' : stars === 4 ? '15%' : '5%' }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:w-2/3 space-y-6">
                  {product.customerReviews.map((review, idx) => (
                    <div key={idx} className={`p-6 rounded-2xl ${isGlam ? 'bg-[#faf9f6] border border-[#e5b376]/20' : 'bg-white shadow-sm border border-gray-100'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {review.avatar ? (
                            <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full object-cover" />
                          ) : (
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${isGlam ? 'bg-[#7a1b26]' : 'bg-[#ff9aa8]'}`}>
                              {review.author[0]}
                            </div>
                          )}
                          <div>
                            <p className="font-bold">{review.author}</p>
                            <p className="text-xs text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={14} fill={isGlam ? '#e5b376' : '#ff9aa8'} color={isGlam ? '#e5b376' : '#ff9aa8'} />
                          ))}
                        </div>
                      </div>
                      <p className={`text-gray-700 ${isGlam ? 'font-serif italic' : 'font-medium'}`}>"{review.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Cross-Selling Carousel */}
        {crossSellProducts.length > 0 && (
          <div className="mt-32 border-t border-gray-200 pt-16">
            <h3 className={`text-3xl text-center mb-12 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-[#2a2a2a]'}`}>
              {isGlam ? 'Pairs Perfectly With...' : 'Make it a Combo!'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {crossSellProducts.map((p, idx) => (
                <Link to={`/product/${p.id}`} key={p.id} className="group cursor-pointer">
                  <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-gray-100 mb-4">
                    <img 
                      src={p.image} 
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg leading-tight mb-1 text-[#2a2a2a] group-hover:underline ${isGlam ? 'font-serif' : 'font-sans'}`}>
                      {p.name}
                    </h4>
                    <p className="font-bold text-gray-900">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Mobile Sticky Add to Cart */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-40 flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.7 }}
          onClick={() => isInWishlist(product.id.toString()) ? removeFromWishlist(product.id.toString()) : addToWishlist({...product, id: product.id.toString(), price: formatPrice(product.price), image: product.images[0], category: product.category})}
          className="p-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors flex-shrink-0"
        >
          <motion.div
            animate={{ scale: isInWishlist(product.id.toString()) ? [1, 1.4, 1] : 1 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 400, damping: 10 }}
          >
            <Heart fill={isInWishlist(product.id.toString()) ? "currentColor" : "none"} className={isInWishlist(product.id.toString()) ? "text-red-500" : "text-gray-500"} />
          </motion.div>
        </motion.button>
        <button 
          onClick={handleAddToCart}
          className={`flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all ${
            added 
              ? 'bg-green-500 text-white'
              : isGlam 
                ? 'bg-[#2a2a2a] text-[#e5b376]' 
                : 'bg-[#ff9aa8] text-white shadow-lg shadow-[#ff9aa8]/30'
          }`}
        >
          {added ? (
            <><Check className="mr-2" /> Added to Bag</>
          ) : (
            `Add to Bag — ${formatPrice(product.price * quantity)}`
          )}
        </button>
      </div>

    </div>
  );
};

export default PDP;
