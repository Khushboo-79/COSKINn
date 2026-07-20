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
  const allShades = cosmeticsProducts.filter(p => p.name.includes('Magnetic Lipstick') || (p.category === product.category && p.id !== product.id));
  const relatedProducts = allShades.slice(0, 4);

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
    <div className="w-full min-h-screen bg-[#FFFDFD] font-sans text-[#75263F] pb-20 selection:bg-[#FFC2D1] selection:text-white">
      
      {/* Distraction-Free Simple Header */}
      <div className="w-full h-16 border-b border-[#FFC2D1]/30 flex items-center px-6 sticky top-0 bg-[#FFFDFD]/95 backdrop-blur-sm z-50">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-[#75263F]/60 hover:text-[#FF8FB1] transition-colors"
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
                  className={`w-20 h-20 md:w-24 md:h-24 overflow-hidden transition-all duration-300 shrink-0 rounded-lg ${mainImage === img ? 'border-2 border-[#FF8FB1] opacity-100 shadow-md' : 'border border-[#FFC2D1]/50 opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover bg-white" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div 
              className="relative w-full aspect-[4/5] bg-white overflow-hidden border border-[#FFC2D1]/30 rounded-xl shadow-[0_10px_40px_rgba(255,194,209,0.15)] group cursor-crosshair"
              onMouseMove={(e) => {
                const bounds = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - bounds.left) / bounds.width) * 100;
                const y = ((e.clientY - bounds.top) / bounds.height) * 100;
                e.currentTarget.style.setProperty('--x', `${x}%`);
                e.currentTarget.style.setProperty('--y', `${y}%`);
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={mainImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-contain p-8 group-hover:scale-[1.8] transition-transform duration-500 ease-out origin-[var(--x)_var(--y)]"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Product Commerce Info */}
          <div className="w-full lg:w-1/2 flex flex-col pt-4">
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#FF8FB1] uppercase tracking-widest">{product.category}</span>
                <button className="text-[#75263F]/40 hover:text-[#FF8FB1] transition-colors p-2">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <h1 className="text-3xl md:text-4xl font-heading font-black tracking-tight text-[#75263F] mb-3 uppercase leading-none">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-[#FF8FB1] text-[#FF8FB1]' : 'fill-transparent text-[#FFC2D1]'}`} />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#75263F]">{product.rating} <span className="text-[#75263F]/50 ml-1 font-medium">({product.reviews} reviews)</span></span>
              </div>

              {/* Price Section */}
              <div className="flex items-end gap-4 mb-8">
                <span className="text-3xl font-black text-[#FF8FB1]">₹{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg font-medium text-[#75263F]/50 line-through mb-1">₹{product.originalPrice}</span>
                    <span className="text-xs font-bold bg-[#FFC2D1]/30 text-[#FF8FB1] px-2 py-1 rounded mb-2 uppercase tracking-widest">
                      Sale
                    </span>
                  </>
                )}
              </div>

              {/* Shade Selector */}
              <div className="mb-8 border-t border-[#FFC2D1]/30 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold uppercase tracking-widest text-[#75263F]">Select Shade</span>
                  <span className="text-sm text-[#75263F]/60">{product.name.split(' - ')[1] || 'Signature'}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {allShades.map(shade => (
                    <Link 
                      key={shade.id} 
                      to={`/product/${shade.id}`}
                      className={`w-12 h-12 rounded-full border-2 p-1 transition-all ${shade.id === product.id ? 'border-[#FF8FB1]' : 'border-transparent hover:border-[#FFC2D1]'}`}
                      title={shade.name}
                    >
                      <div 
                        className="w-full h-full rounded-full shadow-inner border border-[#FFC2D1]/30"
                        style={{ backgroundColor: shade.shadeColor || '#FFC2D1' }}
                      />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <div className="flex items-center justify-between border border-[#FFC2D1] rounded px-4 w-32 shrink-0 h-14 bg-white shadow-sm">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-[#75263F] hover:text-[#FF8FB1] transition-colors"><Minus className="w-4 h-4" /></button>
                  <span className="font-bold text-lg text-[#75263F]">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-[#75263F] hover:text-[#FF8FB1] transition-colors"><Plus className="w-4 h-4" /></button>
                </div>

                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 h-14 bg-white text-[#FF8FB1] border-2 border-[#FF8FB1] rounded hover:bg-[#FFC2D1]/10 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs transition-colors shadow-sm"
                >
                  Add to Cart
                </button>
                
                <button
                  onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                  className={`w-14 h-14 border-2 rounded flex items-center justify-center transition-colors shrink-0 shadow-sm ${isInWishlist(product.id) ? 'border-[#FF8FB1] bg-[#FF8FB1] text-white' : 'border-[#FFC2D1] bg-white hover:border-[#FF8FB1] text-[#FF8FB1]'}`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="mb-12">
                <button
                  onClick={handleBuyNow}
                  className="w-full h-14 rounded bg-[#FF8FB1] hover:bg-[#ff759f] text-white flex items-center justify-center font-bold uppercase tracking-widest text-xs transition-all shadow-[0_10px_20px_rgba(255,143,177,0.3)] hover:shadow-[0_15px_30px_rgba(255,143,177,0.4)]"
                >
                  Buy It Now
                </button>
              </div>
            </motion.div>

            {/* Accordion Details */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.4 }} className="border-t border-[#FFC2D1]/50 mt-12 pt-8">
              
              <div className="mb-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#75263F] mb-4">About Product</h3>
                <p className="text-sm text-[#75263F]/80 leading-relaxed font-medium">
                  {product.longDescription || "Experience the ultimate luxury in lip color. The Lip Blur delivers a feather-light, cloud-like formula that instantly diffuses and perfects, offering high-impact color with absolutely zero weight. Formulated to provide comfortable, long-lasting wear without compromising on pigment or finish."}
                </p>
              </div>

              {[
                { id: 'formula', title: 'Formula & Finish', content: "A weightless wash of color that diffuses light. Plush, pillowy texture for a romantic stained effect with a non-drying comfort matte finish." },
                { id: 'benefits', title: 'Benefits & Features', content: "Instantly smooths lip texture and blurs fine lines. Hydrating hyaluronic spheres ensure your lips never feel dry. Comfortable all-day wear with a buildable, blendable texture." },
                { id: 'ingredients', title: 'Key Ingredients', content: "Hyaluronic Acid (hydration), Vitamin E (antioxidant protection), Cloud-Berry Extract (softening), Vegan Squalane (moisture lock)." },
                { id: 'suitability', title: 'Skin Suitability', content: "Dermatologically tested. Suitable for all skin types, including highly sensitive lips." },
              ].map((section) => (
                <div key={section.id} className="border-b border-[#FFC2D1]/50">
                  <button 
                    onClick={() => setActiveAccordion(activeAccordion === section.id ? null : section.id)}
                    className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
                  >
                    <span className="font-bold uppercase tracking-widest text-xs text-[#75263F] group-hover:text-[#FF8FB1] transition-colors">{section.title}</span>
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
                        <div className="pb-6 pt-2 text-sm text-[#75263F]/80 font-medium leading-relaxed">
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

      {/* Related Products Slider */}
      <section className="py-20 bg-[#FFFDFD] relative z-10 border-t border-[#FFC2D1]/20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-heading font-black text-[#75263F] uppercase tracking-wide mb-10 text-center">Suggested Products</h2>
          
          <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-8 justify-center md:justify-start">
            {relatedProducts.map(rp => (
              <Link key={rp.id} to={`/product/${rp.id}`} className="min-w-[240px] max-w-[260px] group flex-shrink-0 bg-white/60 backdrop-blur-md border border-[#FFC2D1]/30 rounded-xl p-4 hover:border-[#FF8FB1] hover:shadow-[0_15px_30px_rgba(255,194,209,0.3)] transition-all">
                <div className="relative aspect-square bg-white overflow-hidden mb-4 rounded-lg flex items-center justify-center">
                  <img src={rp.image} alt={rp.name} className="w-3/4 h-3/4 object-contain transition-transform duration-700 group-hover:scale-110" />
                  {rp.shadeColor && (
                    <div 
                      className="absolute bottom-3 right-3 w-5 h-5 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: rp.shadeColor }}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-[#75263F] line-clamp-1">{rp.name.split(' - ')[1] || rp.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-[#FF8FB1]">₹{rp.price}</span>
                    <span className="text-xs font-bold text-[#75263F]/50"><Star className="w-3 h-3 inline fill-[#FF8FB1] text-[#FF8FB1] mr-1"/>{rp.rating}</span>
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
