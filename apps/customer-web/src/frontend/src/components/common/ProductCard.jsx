import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { theme } = useTheme();
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

  const isGlam = theme === 'cosmetics';

  return (
    <motion.div 
      className={`group relative rounded-[20px] overflow-hidden transition-all duration-500 flex flex-col h-full bg-surface shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-2xl border ${isGlam ? 'border-black/5' : 'border-gray-100'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <div className={`relative aspect-[4/5] overflow-hidden p-6 flex items-center justify-center ${isGlam ? 'bg-background' : 'bg-[#FAFAFA]'}`}>
        {badgeText && (
          <div className="absolute top-4 left-4 z-20 bg-accent text-black text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase shadow-sm">
            {badgeText}
          </div>
        )}

        <button 
          onClick={handleWishlistToggle}
          className="absolute top-4 right-4 z-20 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform duration-300"
        >
          <Heart className={`w-[15px] h-[15px] ${inWishlist ? 'fill-primary text-primary' : 'text-black/60 hover:text-primary'}`} strokeWidth={2} />
        </button>

        <Link to={`/product/${product.slug || product.id}`} className="absolute inset-0 z-10 flex items-center justify-center">
          <motion.img 
            src={productImg} 
            alt={product.name} 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.06 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </Link>
      </div>

      <div className="p-5 flex flex-col flex-grow bg-surface">
        <Link to={`/product/${product.slug || product.id}`} className="block">
          <h3 className="font-display font-bold text-text text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
        </Link>
        
        <div className="flex items-center gap-2 mt-auto mb-4">
          <span className="font-bold text-lg text-text">₹{(product.price || 0).toFixed(2)}</span>
          {oldPrice && (
            <span className="text-sm font-medium text-text-muted line-through">₹{oldPrice.toFixed(2)}</span>
          )}
        </div>

        <button 
          onClick={handleAddToCart}
          className={`w-full py-3 rounded-full font-bold uppercase tracking-widest text-[11px] transition-all duration-300 flex items-center justify-center gap-2 
            ${isGlam 
              ? 'bg-primary text-white hover:bg-black' 
              : 'bg-primary text-white hover:opacity-80'}`}
        >
          <ShoppingBag className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
