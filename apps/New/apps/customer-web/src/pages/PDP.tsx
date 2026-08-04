import React, { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';
import { ArrowLeft, Star, Heart, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllProducts } from '../data/products';

const PDP: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const fromState = location.state?.from;
  let backText = 'Back to Shop';
  let backLink = '/collections';

  if (fromState === 'bestsellers') {
    backText = 'Back to bestsellers';
    backLink = '/#bestsellers';
  } else if (fromState === 'shop-by-category') {
    backText = 'Back to category';
    backLink = '/#shop-by-category';
  }

  const { mode } = useTheme();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const isGlam = mode === 'glam';

  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('description');
  const [added, setAdded] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => { window.scrollTo(0, 0); }, 100);
    return () => clearTimeout(timer);
  }, [id]);

  const allProducts = getAllProducts(isGlam);
  const foundProduct = allProducts.find(p => p.id.toString() === id);
  const fallbackProduct = allProducts[0];
  const productData = foundProduct || fallbackProduct;

  const product = {
    ...productData,
    id: productData.id.toString(),
    description: productData.description || (isGlam 
      ? 'Fairenne presents a decadent, velvet-finish product infused with rare botanicals. Formulated to restore elasticity and impart a candlelit glow.' 
      : 'Fairenne brings you a juicy, fruit-forward product packed with Vitamin C and peach extract. Instantly brightens, visibly plumps, and leaves you looking perfectly dewy.'),
    ingredients: productData.ingredients || (isGlam 
      ? 'Aqua, Rosa Damascena Flower Water, Gold leaf, Niacinamide, Squalane, Peptides, Parfum.' 
      : 'Water, Peach Extract, Ascorbic Acid (Vitamin C), Hyaluronic Acid, Glycerin, Orange Peel Oil.'),
    howToUse: productData.howToUse || 'Apply 2-3 drops to clean, dry skin. Massage gently until absorbed. Follow with moisturizer.',
    image2: productData.image2 || productData.image
  };

  const handleAddToCart = () => {
    addToCart({
      id: id || '1',
      name: product.name,
      price: product.price,
      image: product.image,
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
        <Link to={backLink} className={`inline-flex items-center text-sm font-bold transition-colors ${isGlam ? 'text-gray-500 hover:text-[#7a1b26]' : 'text-gray-400 hover:text-[#ff9aa8]'}`}>
          <ArrowLeft size={16} className="mr-2" /> {backText}
        </Link>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-20">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-20">
          
          {/* Left: Image Gallery */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className={`w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[24px] lg:rounded-[32px] overflow-hidden bg-gray-100 ${isGlam ? 'shadow-md border border-[#e5b376]/20' : ''}`}>
              <motion.img 
                key={product.image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full aspect-square rounded-[16px] lg:rounded-[24px] overflow-hidden bg-gray-100">
                <img src={product.image2} alt="Detail" className="w-full h-full object-cover" />
              </div>
              <div className="w-full aspect-square rounded-[16px] lg:rounded-[24px] overflow-hidden bg-gray-100">
                <img src={product.image} alt="Texture" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="w-full md:w-1/2 flex flex-col md:py-10 lg:pl-10">
            <div className="sticky top-32">
              
              {/* Reviews */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={isGlam ? '#e5b376' : '#ff9aa8'} color={isGlam ? '#e5b376' : '#ff9aa8'} />
                ))}
                <span className="text-sm text-gray-500 font-medium ml-2">({product.reviews} reviews)</span>
              </div>

              {/* Title & Price */}
              <h1 className={`text-4xl lg:text-5xl xl:text-6xl mb-4 leading-[1.1] ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display font-black text-[#2a2022] tracking-tight'}`}>
                {product.name}
              </h1>
              <p className={`text-3xl font-bold font-sans mb-8 ${isGlam ? 'text-[#7a1b26]' : 'text-gray-900'}`}>
                {formatPrice(product.price)}
              </p>

              {/* Description Snippet */}
              <p className={`text-base lg:text-lg leading-relaxed mb-8 ${isGlam ? 'font-serif text-gray-600' : 'text-gray-600'}`}>
                {product.description}
              </p>

              {/* Add to Cart Desktop (Hidden on mobile) */}
              <div className="hidden md:flex items-center gap-4 mb-12">
                <div className="flex items-center border border-gray-200 rounded-full bg-white px-4 py-3">
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
                
                <button 
                  onClick={() => isInWishlist(id || '1') ? removeFromWishlist(id || '1') : addToWishlist({...product, id: id || '1', price: formatPrice(product.price), category: 'Product'})}
                  className={`p-4 rounded-full border border-gray-200 flex items-center justify-center transition-colors ${isGlam ? 'hover:border-[#7a1b26] hover:text-[#7a1b26]' : 'hover:border-[#ff9aa8] hover:text-[#ff9aa8]'}`}
                >
                  <Heart size={24} strokeWidth={1.5} fill={isInWishlist(id || '1') ? "currentColor" : "none"} className={isInWishlist(id || '1') ? "text-red-500" : ""} />
                </button>
              </div>

              {/* Accordions */}
              <div className="border-t border-gray-200 divide-y divide-gray-200">
                
                {/* Description Accordion */}
                <div className="py-5">
                  <button onClick={() => toggleAccordion('description')} className="w-full flex justify-between items-center text-left focus:outline-none">
                    <span className="font-bold text-lg text-gray-900">Description</span>
                    {activeAccordion === 'description' ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                  </button>
                  <AnimatePresence>
                    {activeAccordion === 'description' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <p className="pt-4 text-gray-600 leading-relaxed">{product.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Ingredients Accordion */}
                <div className="py-5">
                  <button onClick={() => toggleAccordion('ingredients')} className="w-full flex justify-between items-center text-left focus:outline-none">
                    <span className="font-bold text-lg text-gray-900">Ingredients</span>
                    {activeAccordion === 'ingredients' ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                  </button>
                  <AnimatePresence>
                    {activeAccordion === 'ingredients' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <p className="pt-4 text-gray-600 leading-relaxed">{product.ingredients}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* How to Use Accordion */}
                <div className="py-5">
                  <button onClick={() => toggleAccordion('howToUse')} className="w-full flex justify-between items-center text-left focus:outline-none">
                    <span className="font-bold text-lg text-gray-900">How to Use</span>
                    {activeAccordion === 'howToUse' ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                  </button>
                  <AnimatePresence>
                    {activeAccordion === 'howToUse' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <p className="pt-4 text-gray-600 leading-relaxed">{product.howToUse}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Add to Cart */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-40 flex items-center gap-3">
        <button 
          onClick={() => isInWishlist(product.id.toString()) ? removeFromWishlist(product.id.toString()) : addToWishlist({...product, id: product.id.toString(), category: 'Product'})}
          className="p-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors flex-shrink-0"
        >
          <Heart fill={isInWishlist(product.id.toString()) ? "currentColor" : "none"} className={isInWishlist(product.id.toString()) ? "text-red-500" : "text-gray-500"} />
        </button>
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
            `Add to Bag — ${product.price}`
          )}
        </button>
      </div>

    </div>
  );
};

export default PDP;
