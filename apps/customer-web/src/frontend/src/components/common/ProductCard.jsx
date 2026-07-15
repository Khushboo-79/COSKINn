import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const badgeText = product.discountBadge || product.badge || product.discount;
  const productImg = product.image || product.img;
  const oldPrice = product.originalPrice || product.oldPrice;

  // Split COSKINn from the product name for premium formatting
  const formatProductName = (name) => {
    if (!name) return { brand: '', main: '' };
    if (name.toUpperCase().startsWith('COSKINN ')) {
      return { brand: 'COSKINn', main: name.substring(8).trim() };
    }
    return { brand: '', main: name };
  };

  const { brand, main } = formatProductName(product.name);

  return (
    <motion.div 
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F7F7F7] p-6 flex items-center justify-center">
        {badgeText && (
          <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-[#FF2D7A] to-[#FF5E95] text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider uppercase shadow-md">
            {badgeText}
          </div>
        )}

        <button 
          onClick={handleWishlistToggle}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#FF2D7A] text-[#FF2D7A]' : 'text-gray-400 hover:text-[#FF2D7A]'}`} />
        </button>

        <Link to={`/product/${product.id}`} className="absolute inset-0 z-10 flex items-center justify-center">
          <motion.img 
            src={productImg} 
            alt={product.name} 
            loading="lazy"
            decoding="async"
            className="w-3/4 h-3/4 object-contain drop-shadow-xl mix-blend-multiply"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
          />
        </Link>
      </div>

      <div className="p-6 flex flex-col flex-grow bg-white">
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating || 5) ? 'text-[#FF2D7A] fill-[#FF2D7A]' : 'text-gray-200'}`} />
            ))}
          </div>
          <span className="text-xs text-gray-500 font-medium">({product.reviews || 0})</span>
        </div>

        <Link to={`/product/${product.id}`} className="block">
          {brand && (
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
              {brand}
            </div>
          )}
          <h3 className="font-heading font-bold text-[#1B1B1B] text-lg mb-1 group-hover:text-[#FF2D7A] transition-colors line-clamp-1">{main}</h3>
        </Link>
        
        <div className="flex items-center gap-2 mt-auto mb-5">
          <span className="font-bold text-lg text-[#1B1B1B]">₹{(product.price || 0).toFixed(2)}</span>
          {oldPrice && (
            <span className="text-sm font-medium text-gray-400 line-through">₹{oldPrice.toFixed(2)}</span>
          )}
        </div>

        <button 
          onClick={handleAddToCart}
          className="w-full py-3.5 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-2 border-2 border-transparent bg-gradient-to-r from-[#FF2D7A] to-[#FF5E95] text-white hover:shadow-[0_10px_20px_rgba(255,45,122,0.2)] hover:-translate-y-0.5 active:scale-95"
        >
          <ShoppingBag className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
