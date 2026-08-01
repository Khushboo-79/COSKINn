import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, HeartOff, ShoppingBag } from 'lucide-react';

const Wishlist: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className={`min-h-screen pt-12 pb-24 transition-colors duration-500 ${isGlam ? 'bg-[#faf9f6]' : 'bg-[#fcfaf9]'}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="mb-12">
          <h1 className={`text-4xl md:text-5xl font-extrabold mb-4 text-[#2a2a2a] ${isGlam ? 'font-serif' : 'font-display'}`}>
            Your Wishlist
          </h1>
          <p className="text-gray-500 font-medium">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-3xl border border-gray-100 border-dashed">
            <HeartOff size={48} className="text-gray-300 mb-6" strokeWidth={1.5} />
            <h3 className="text-xl font-bold text-gray-800 mb-2">It's empty here</h3>
            <p className="text-gray-500 mb-8 text-center max-w-sm">
              Save your favorite items to your wishlist so you never lose track of them.
            </p>
            <Link 
              to="/collections" 
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                isGlam ? 'bg-[#7a1b26] text-white hover:bg-[#5a121b]' : 'bg-[#ff9aa8] text-white hover:bg-[#ff8091]'
              }`}
            >
              Start browsing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {wishlistItems.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative"
              >
                {/* Remove Button */}
                <button 
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white text-gray-500 hover:text-red-500 transition-colors"
                >
                  <Heart size={16} fill="currentColor" className="text-red-500" />
                </button>

                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-gray-100 mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    
                    {/* Quick Add Button */}
                    <div className="absolute bottom-4 left-4 right-4 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart({
                            id: product.id.toString(),
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            quantity: 1
                          });
                        }}
                        className={`w-full py-3 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center ${
                          isGlam ? 'bg-[#7a1b26] text-white hover:bg-[#5a121b]' : 'bg-white text-gray-900 hover:bg-[#ff9aa8] hover:text-white'
                        }`}
                      >
                        <ShoppingBag size={16} className="mr-2" /> Add to Bag
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1 block">
                      {product.category || 'Product'}
                    </span>
                    <h3 className={`font-bold text-lg leading-tight mb-1 text-[#2a2a2a] group-hover:underline ${isGlam ? 'font-serif' : 'font-sans'}`}>
                      {product.name}
                    </h3>
                    <p className="font-bold text-gray-900">{product.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
