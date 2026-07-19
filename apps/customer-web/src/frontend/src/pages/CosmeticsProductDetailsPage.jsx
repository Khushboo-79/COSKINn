import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Heart, Star, Share2, Plus, Minus, CheckCircle, ArrowLeft } from 'lucide-react';
import { cosmeticsProducts } from '../constants/cosmeticsProducts';

export default function CosmeticsProductDetailsPage({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState('description');

  // Find other shades
  const allShades = cosmeticsProducts.filter(p => p.name.includes('Magnetic Lipstick'));
  const relatedProducts = allShades.filter(p => p.id !== product.id).slice(0, 4);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMainImage(product.images[0]);
    setQuantity(1);
  }, [product.id, product.images]);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full min-h-screen bg-white font-sans text-black pb-20">
      
      {/* Distraction-Free Simple Header */}
      <div className="w-full h-16 border-b border-[#FFC2D1]/30 flex items-center px-6 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-500 hover:text-[#FF8FB1] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-bold uppercase tracking-widest">Back</span>
        </button>
      </div>

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
                  className={`w-20 h-20 md:w-24 md:h-24 overflow-hidden transition-all duration-300 shrink-0 rounded-lg ${mainImage === img ? 'border-2 border-[#FF8FB1] opacity-100' : 'border border-[#FFC2D1]/50 opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover bg-gray-50" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative w-full aspect-[4/5] bg-gray-50 overflow-hidden border border-[#FFC2D1]/30 rounded-xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={mainImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-contain p-8"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Product Commerce Info */}
          <div className="w-full lg:w-1/2 flex flex-col pt-4">
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#FF8FB1] uppercase tracking-widest">{product.category}</span>
                <button className="text-gray-400 hover:text-[#FF8FB1] transition-colors p-2">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <h1 className="text-3xl md:text-4xl font-heading font-black tracking-tight text-black mb-3 uppercase leading-none">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-[#FF8FB1] text-[#FF8FB1]' : 'fill-transparent text-gray-200'}`} />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-700">{product.rating} <span className="text-gray-400 ml-1 font-medium">({product.reviews} reviews)</span></span>
              </div>

              {/* Price Section */}
              <div className="flex items-end gap-4 mb-8">
                <span className="text-3xl font-black text-[#FF8FB1]">₹{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg font-medium text-gray-400 line-through mb-1">₹{product.originalPrice}</span>
                    <span className="text-xs font-bold bg-[#FFC2D1]/30 text-[#FF8FB1] px-2 py-1 rounded mb-2 uppercase tracking-widest">
                      Sale
                    </span>
                  </>
                )}
              </div>

              {/* Shade Selector */}
              <div className="mb-8 border-t border-[#FFC2D1]/30 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold uppercase tracking-widest text-black">Select Shade</span>
                  <span className="text-sm text-gray-500">{product.name.split(' - ')[1] || 'Signature'}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {allShades.map(shade => (
                    <Link 
                      key={shade.id} 
                      to={`/product/${shade.id}`}
                      className={`w-12 h-12 rounded-full border-2 p-1 transition-all ${shade.id === product.id ? 'border-[#FF8FB1]' : 'border-transparent hover:border-gray-200'}`}
                      title={shade.name}
                    >
                      <div 
                        className="w-full h-full rounded-full shadow-inner border border-gray-100"
                        style={{ backgroundColor: shade.shadeColor || '#000' }}
                      />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <div className="flex items-center justify-between border border-[#FFC2D1] rounded px-4 w-32 shrink-0 h-14 bg-white">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-black hover:text-[#FF8FB1] transition-colors"><Minus className="w-4 h-4" /></button>
                  <span className="font-bold text-lg text-black">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-black hover:text-[#FF8FB1] transition-colors"><Plus className="w-4 h-4" /></button>
                </div>

                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 h-14 bg-white text-[#FF8FB1] border-2 border-[#FF8FB1] rounded hover:bg-[#FFC2D1]/10 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs transition-colors"
                >
                  Add to Cart
                </button>
                
                <button
                  onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                  className={`w-14 h-14 border-2 rounded flex items-center justify-center transition-colors shrink-0 ${isInWishlist(product.id) ? 'border-[#FF8FB1] bg-[#FF8FB1] text-white' : 'border-[#FFC2D1] bg-white hover:border-[#FF8FB1] text-[#FF8FB1]'}`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="mb-12">
                <button
                  onClick={handleBuyNow}
                  className="w-full h-14 rounded bg-[#FF8FB1] hover:bg-[#ff759f] text-white flex items-center justify-center font-bold uppercase tracking-widest text-xs transition-all shadow-md hover:shadow-lg"
                >
                  Buy It Now
                </button>
              </div>
            </motion.div>

            {/* Accordion Details */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.4 }} className="border-t border-[#FFC2D1]/50">
              {[
                { id: 'description', title: 'Description', content: product.longDescription },
                { id: 'benefits', title: 'Benefits', content: product.benefits ? <ul className="list-disc pl-5 space-y-2">{product.benefits.map((b, i) => <li key={i}>{b}</li>)}</ul> : null },
                { id: 'ingredients', title: 'Ingredients', content: product.keyIngredients ? <ul className="list-disc pl-5 space-y-2">{product.keyIngredients.map((b, i) => <li key={i}>{b}</li>)}</ul> : null },
                { id: 'howtouse', title: 'How To Use', content: product.howToUse ? (
                  <div className="space-y-4">
                    {product.howToUse.map((step, idx) => (
                      <div key={idx} className="flex gap-4">
                        <span className="font-bold text-[#FF8FB1]">{idx + 1}.</span>
                        <div>
                          <span className="font-bold text-black uppercase text-xs tracking-widest block mb-1">{step.title}</span>
                          <span className="text-gray-600">{step.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null },
              ].map((section) => section.content && (
                <div key={section.id} className="border-b border-[#FFC2D1]/50">
                  <button 
                    onClick={() => setActiveAccordion(activeAccordion === section.id ? null : section.id)}
                    className="w-full py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-bold uppercase tracking-widest text-xs text-black">{section.title}</span>
                    <span className="text-[#FF8FB1]">
                      {activeAccordion === section.id ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {activeAccordion === section.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5 text-sm text-gray-600 font-medium leading-relaxed">
                          {section.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>

      {/* Editorial sections removed for cleaner shopping flow */}

      {/* Related Products Slider (Only Magnetic Lipsticks) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-heading font-black uppercase tracking-wide mb-10 text-center">More Shades To Love</h2>
          
          <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-8 justify-center md:justify-start">
            {relatedProducts.map(rp => (
              <Link key={rp.id} to={`/product/${rp.id}`} className="min-w-[240px] max-w-[260px] group flex-shrink-0 bg-white border border-[#FFC2D1]/30 rounded-xl p-4 hover:border-[#FF8FB1] hover:shadow-lg transition-all">
                <div className="relative aspect-square bg-gray-50 overflow-hidden mb-4 rounded-lg flex items-center justify-center">
                  <img src={rp.image} alt={rp.name} className="w-3/4 h-3/4 object-contain transition-transform duration-700 group-hover:scale-110" />
                  {rp.shadeColor && (
                    <div 
                      className="absolute bottom-3 right-3 w-5 h-5 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: rp.shadeColor }}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-bold uppercase tracking-wide line-clamp-1">{rp.name.split(' - ')[1] || rp.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-[#FF8FB1]">₹{rp.price}</span>
                    <span className="text-xs font-bold text-gray-400"><Star className="w-3 h-3 inline fill-[#FF8FB1] text-[#FF8FB1] mr-1"/>{rp.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
