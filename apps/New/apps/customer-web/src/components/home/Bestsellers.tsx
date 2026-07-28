import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCurrency } from '../../context/CurrencyContext';
import { ArrowRight, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Bestsellers: React.FC = () => {
  const { mode } = useTheme();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const isGlam = mode === 'glam';

  const products = [
    {
      id: 1,
      name: isGlam ? 'Midnight Elixir Serum' : 'Peachy Glow Vitamin C Serum',
      category: 'Serums',
      price: 3499,
      rating: 4.8,
      reviews: 1284,
      image: isGlam 
        ? 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80'
        : 'https://images.pexels.com/photos/8101534/pexels-photo-8101534.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      name: isGlam ? 'Velvet Finish Foundation' : 'Watermelon Burst Hydrator',
      category: isGlam ? 'Makeup' : 'Moisturizers',
      price: 2999,
      rating: 4.9,
      reviews: 856,
      image: isGlam 
        ? 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80'
        : 'https://images.pexels.com/photos/27393236/pexels-photo-27393236.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 3,
      name: isGlam ? 'Scarlet Kiss Lipstick' : 'Berry Bounce Sleep Mask',
      category: isGlam ? 'Lips' : 'Masks',
      price: 1999,
      rating: 4.7,
      reviews: 2103,
      image: isGlam 
        ? 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80'
        : 'https://images.pexels.com/photos/9306017/pexels-photo-9306017.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 4,
      name: isGlam ? 'Golden Hour Highlighter' : 'Avocado Melt Eye Cream',
      category: isGlam ? 'Makeup' : 'Eye Care',
      price: 2499,
      rating: 4.6,
      reviews: 542,
      image: isGlam 
        ? 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1615397323133-c90a2a16d557?auto=format&fit=crop&q=80'
    }
  ];

  return (
    <section className={`py-16 ${isGlam ? 'bg-[#faf9f6]' : 'bg-white'}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <p className={`text-sm font-bold uppercase tracking-widest mb-2 ${isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}`}>
              The juicy hits
            </p>
            <h2 className={`text-4xl md:text-5xl font-extrabold text-[#2a2a2a] ${isGlam ? 'font-serif' : 'font-display'}`}>
              Bestsellers
            </h2>
          </div>
          <Link to="/collections" className={`mt-4 md:mt-0 flex items-center font-bold text-sm transition-colors ${
            isGlam ? 'text-[#2a2a2a] hover:text-[#7a1b26]' : 'text-gray-500 hover:text-[#ff9aa8]'
          }`}>
            Shop all <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>

        {/* Grid / Carousel */}
        <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-4 gap-4 md:gap-6 pb-8 md:pb-0 hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
          {products.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group cursor-pointer flex-shrink-0 w-[75%] sm:w-[45%] md:w-auto snap-start"
            >
              <Link to={`/product/${product.id}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-gray-100 mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  
                  {/* Wishlist Button */}
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (isInWishlist(product.id.toString())) {
                        removeFromWishlist(product.id.toString());
                      } else {
                        addToWishlist({
                          id: product.id.toString(),
                          name: product.name,
                          price: formatPrice(product.price),
                          image: product.image,
                          category: product.category
                        });
                      }
                    }}
                    className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Heart size={16} fill={isInWishlist(product.id.toString()) ? "currentColor" : "none"} className={isInWishlist(product.id.toString()) ? "text-red-500" : ""} />
                  </button>

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
                      className={`w-full py-3 rounded-xl font-bold text-sm shadow-xl ${
                        isGlam ? 'bg-[#7a1b26] text-white hover:bg-[#5a121b]' : 'bg-white text-gray-900 hover:bg-[#ff9aa8] hover:text-white'
                      }`}
                    >
                      Quick Add
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{product.category}</span>
                    <div className="flex items-center text-xs font-bold text-gray-700">
                      <Star size={12} className={isGlam ? 'text-[#7a1b26] mr-1' : 'text-yellow-400 mr-1'} fill="currentColor" />
                      {product.rating} <span className="text-gray-400 font-normal ml-1">({product.reviews})</span>
                    </div>
                  </div>
                  <h3 className={`font-bold text-lg leading-tight mb-1 text-[#2a2a2a] group-hover:underline ${isGlam ? 'font-serif' : 'font-sans'}`}>
                    {product.name}
                  </h3>
                  <p className="font-bold text-gray-900">{formatPrice(product.price)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Bestsellers;
