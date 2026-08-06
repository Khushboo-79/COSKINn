import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag, Heart, Star, ChevronRight, ChevronLeft, Eye, ShieldCheck, Sparkles, Cloud, Sun, Star as StarIcon, CheckCircle2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Footer from '../components/common/Footer';
import { skincareProducts } from '../constants/skincareProducts';

// Images
import perfumeHeroImg from '../assets/images/perfume_hero.webp';
import perfumeBottleImg from '../assets/images/perfume_bottle.webp';
import perfumeTravelImg from '../assets/images/perfume_travel.webp';
import perfumeOfficeImg from '../assets/images/perfume_office.webp';
import perfumeDateImg from '../assets/images/perfume_date.webp';
import perfumeGymImg from '../assets/images/perfume_gym.webp';
import perfumeVacationImg from '../assets/images/perfume_vacation.webp';

// Constants
const LUXURY_BENEFITS = [
  { title: 'Travel Friendly', icon: Cloud, desc: 'Perfectly sized for your smallest clutch or pocket.' },
  { title: '12 Hour Long Lasting', icon: Sun, desc: 'Highly concentrated oils ensure all-day elegance.' },
  { title: 'Skin Safe', icon: ShieldCheck, desc: 'Dermatologist tested and free from harsh chemicals.' },
  { title: 'Everyday Luxury', icon: Sparkles, desc: 'An affordable indulgence for your daily routine.' },
];

const SIGNATURE_FRUITS = [
  { id: 'orange', name: 'Orange', emoji: '🍊', benefit: 'Fresh Citrus Energy', desc: 'Adds an instant refreshing opening.', tooltip: 'Fresh Citrus Opening', color: '#FF9800' },
  { id: 'strawberry', name: 'Strawberry', emoji: '🍓', benefit: 'Sweet Fruity Freshness', desc: 'Leaves a playful luxurious aroma.', tooltip: 'Playful Sweet Aroma', color: '#FF0069' },
  { id: 'pomegranate', name: 'Pomegranate', emoji: (
    <svg viewBox="0 0 24 24" fill="#C2185B" className="w-[1em] h-[1em]" style={{ display: 'inline-block' }}>
      <path d="M12,2C11,2 10,2.5 10,3.5C10,4.5 10.5,5 11,5V6.5C7.5,7 5,10 5,13.5C5,17.5 8,21 12,21C16,21 19,17.5 19,13.5C19,10 16.5,7 13,6.5V5C13.5,5 14,4.5 14,3.5C14,2.5 13,2 12,2M12,9A4.5,4.5 0 0,1 16.5,13.5A4.5,4.5 0 0,1 12,18A4.5,4.5 0 0,1 7.5,13.5A4.5,4.5 0 0,1 12,9M12,10.5A3,3 0 0,0 9,13.5A3,3 0 0,0 12,16.5A3,3 0 0,0 15,13.5A3,3 0 0,0 12,10.5M12,12A1.5,1.5 0 0,1 13.5,13.5A1.5,1.5 0 0,1 12,15A1.5,1.5 0 0,1 10.5,13.5A1.5,1.5 0 0,1 12,12Z" />
    </svg>
  ), benefit: 'Elegant Richness', desc: 'Creates a sophisticated fruity heart.', tooltip: 'Sophisticated Core', color: '#C2185B' },
  { id: 'blueberry', name: 'Blueberry', emoji: '🫐', benefit: 'Antioxidant Freshness', desc: 'Adds smooth long-lasting freshness.', tooltip: 'Soft Fruity Depth', color: '#3F51B5' },
  { id: 'mango', name: 'Mango', emoji: '🥭', benefit: 'Soft Tropical Warmth', desc: 'Provides creamy fruity comfort.', tooltip: 'Warm Tropical Aura', color: '#FFC107' },
  { id: 'greentea', name: 'Green Tea', emoji: '🌿', benefit: 'Clean Fresh Finish', desc: 'Leaves a refreshing calming effect.', tooltip: 'Fresh Lasting Finish', color: '#4CAF50' },
];

const LIFESTYLE_CARDS = [
  { title: 'Office', desc: 'Subtle elegance for the boardroom.', image: perfumeOfficeImg },
  { title: 'Travel', desc: 'Your perfect companion on the go.', image: perfumeTravelImg },
  { title: 'Date Night', desc: 'Romantic and utterly unforgettable.', image: perfumeDateImg },
  { title: 'Gym', desc: 'A quick refresh post-workout.', image: perfumeGymImg },
  { title: 'Vacation', desc: 'Capture memories with a signature scent.', image: perfumeVacationImg },
  { title: 'Wedding', desc: 'The perfect aura for your special day.', image: perfumeDateImg, tint: 'sepia(0.5) hue-rotate(-20deg)' }, 
];



const CUSTOMER_REVIEWS = [
  { name: "Jessica T.", role: "Verified Buyer", text: "This is the most luxurious pocket perfume I've ever owned. The Strawberry scent stays all day. Truly high-end!", rating: 5 },
  { name: "Amanda L.", role: "Verified Buyer", text: "So convenient for traveling! It fits perfectly in my smallest clutch and the fruit extracts get so many compliments.", rating: 5 },
  { name: "Sophie M.", role: "Verified Buyer", text: "Obsessed with the Mango fragrance. It's sophisticated and not overpowering. Will buy the whole set.", rating: 5 },
];

export default function PocketPerfumePage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  
  const [hoveredFruit, setHoveredFruit] = useState(null);

  const carouselRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  const collectionProducts = useMemo(() => {
    return skincareProducts.filter(p => p.subcategory === 'Pocket Perfume');
  }, []);

  const handleBuyNow = (product) => { addToCart(product, 1); navigate('/checkout'); };

  const onMouseDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.pageX - carouselRef.current.offsetLeft;
    dragScrollLeft.current = carouselRef.current.scrollLeft;
    carouselRef.current.style.cursor = 'grabbing';
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - dragStartX.current) * 2;
    carouselRef.current.scrollLeft = dragScrollLeft.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    carouselRef.current.style.cursor = 'grab';
  };

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="w-full min-h-screen bg-theme-bg overflow-x-hidden font-sans text-theme-text">
      
      {/* SECTION 1: LUXURY HERO */}
      <section className="relative w-full min-h-[700px] lg:min-h-[90vh] bg-gradient-to-br from-[#FFF5F8] via-white to-[#FFEDE8] pt-[140px] lg:pt-[150px] overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-[#FF0069]/10 to-transparent rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#FFD498]/20 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 h-full flex flex-col lg:flex-row items-center relative z-10 gap-12 lg:gap-16 pb-12">
          
          <div className="w-full lg:w-1/2 flex flex-col items-start pt-8 lg:pt-0">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-black/50 tracking-wide mb-8">
              <Link to="/" className="hover:text-[#FF0069] transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/skincare" className="hover:text-[#FF0069] transition-colors">Shop</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-black font-bold">Body & Lips</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#FF0069] font-bold">COSKINn Pocket Perfume</span>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF0069]/20 bg-white/60 backdrop-blur-md mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF0069] animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest text-[#FF0069] uppercase">NEW LUXURY FRAGRANCE</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-black leading-[1.05] mb-6">
              COSKINn<br />
              <span className="text-[#FF0069]">Pocket Perfume</span>
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl md:text-2xl font-heading font-bold text-gray-700 mb-6 leading-tight border-l-4 border-[#FF0069] pl-4">
              Luxury In Every Spray.<br/>
              <span className="text-[#FF0069]">Small Enough To Carry. Powerful Enough To Remember.</span>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-base text-gray-600 leading-relaxed mb-8 max-w-lg font-medium">
              A long-lasting luxury fragrance crafted with premium fruit extracts and fresh notes. Designed for everyday elegance and effortless freshness wherever life takes you.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex items-center gap-3 mb-10 bg-white/60 backdrop-blur-md py-2.5 px-5 rounded-2xl border border-white w-max shadow-sm">
              <div className="flex text-[#FF0069]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="font-bold text-black">4.9</span>
              <span className="text-gray-500 text-sm font-medium">(4,800+ Reviews)</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => document.getElementById('shop-more').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-gradient-to-r from-[#FF0069] to-[#FF5EA8] text-white rounded-full font-bold text-sm uppercase tracking-widest hover:shadow-[0_10px_30px_rgba(255,0,105,0.3)] hover:-translate-y-1 transition-all">
                Shop Collection
              </button>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 relative flex items-center justify-center min-h-[500px]">
            <div className="absolute inset-0 bg-[#FFF0F5]/50 rounded-[4rem] transform rotate-3 scale-105 z-0 mix-blend-multiply" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: 'easeOut' }} className="relative z-10 w-full h-[500px] lg:h-[700px] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.1)] border-8 border-white/50">
              <img src={perfumeHeroImg} alt="Luxury Perfume Model" className="w-full h-full object-cover" />
            </motion.div>

            <motion.img
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: [-15, 15, -15], rotate: [-2, 2, -2] }}
              transition={{ opacity: { duration: 1 }, default: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
              src={perfumeBottleImg}
              alt="COSKINn Pocket Perfume Floating"
              className="absolute -right-4 lg:-right-12 bottom-10 lg:bottom-20 w-32 md:w-48 z-20 drop-shadow-[0_40px_50px_rgba(255,0,105,0.3)] mix-blend-multiply"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: LUXURY IN YOUR POCKET */}
      <section className="w-full bg-white py-12 lg:py-20 border-t border-black/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left: Premium Editorial Lifestyle Image */}
            <div className="w-full lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative h-[450px] lg:h-[600px] rounded-[2.5rem] overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.1)] border-8 border-[#FFF8F5]"
              >
                <img 
                  src={perfumeOfficeImg} 
                  alt="Luxury Perfume Lifestyle" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
              </motion.div>
            </div>

            {/* Right: Content & Cards */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-heading font-black text-black mb-4">
                Luxury In <span className="text-[#FF0069]">Your Pocket</span>
              </h2>
              <p className="text-gray-500 font-medium text-lg mb-10 max-w-lg">
                Experience the prestige of high-end fragrance, designed to go wherever life takes you without compromising on elegance or longevity.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {LUXURY_BENEFITS.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group bg-[#FFF8F5]/80 hover:bg-white rounded-[2rem] p-6 border border-transparent hover:border-[#FF0069]/30 hover:shadow-[0_20px_40px_rgba(255,0,105,0.08)] transition-all duration-300 backdrop-blur-sm"
                  >
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#FF0069] group-hover:text-white text-[#FF0069]/60 shadow-[0_5px_15px_rgba(0,0,0,0.05)] group-hover:shadow-[0_10px_20px_rgba(255,0,105,0.2)] transition-all duration-300">
                      <benefit.icon size={24} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading font-bold text-black text-xl mb-2 group-hover:text-[#FF0069] transition-colors">{benefit.title}</h3>
                    <p className="text-gray-500 text-sm font-medium">{benefit.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: COSKINn SIGNATURE FRUIT FRAGRANCE JOURNEY */}
      <section className="relative w-full bg-gradient-to-b from-[#FFF5F8] to-[#FFF0F5] py-12 lg:py-20 border-t border-black/5 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-white/40 rounded-full blur-[100px]" />
          <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-[#FF0069]/5 rounded-full blur-[120px]" />
          {/* Subtle mist particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div 
              key={i} 
              className="absolute w-2 h-2 rounded-full bg-white/60 blur-[1px]" 
              style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%` }} 
              animate={{ y: [-20, -60], opacity: [0, 0.8, 0] }}
              transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }} 
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left: Stacked Fruit Cards */}
            <div className="w-full lg:w-5/12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF0069]/20 bg-white/60 backdrop-blur-md mb-6 w-max shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#FF0069]" />
                <span className="text-[10px] font-bold tracking-widest text-[#FF0069] uppercase">FRUIT-INFUSED FRAGRANCE TECHNOLOGY</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-heading font-black text-black mb-4 leading-tight">
                A Journey Through Our <br/><span className="text-[#FF0069]">Signature Fruits</span>
              </h2>
              <p className="text-gray-600 font-medium text-lg mb-8">
                Every spray of COSKINn Pocket Perfume unfolds the freshness of six carefully selected fruit extracts that create a refreshing, luxurious and long-lasting fragrance experience.
              </p>

              <div className="flex flex-col gap-3">
                {SIGNATURE_FRUITS.map((fruit, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group relative w-full rounded-2xl overflow-hidden border border-white/50 hover:border-[#FF0069]/50 transition-all duration-300 bg-white/60 hover:bg-white backdrop-blur-md hover:shadow-[0_15px_30px_rgba(255,0,105,0.15)] flex items-center p-4 cursor-default"
                  >
                    <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-[#FFF5F8] to-white rounded-xl shadow-inner border border-black/5 flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                      {fruit.emoji}
                    </div>
                    <div>
                      <h4 className="font-heading font-black text-lg text-black group-hover:text-[#FF0069] transition-colors">{fruit.name} <span className="text-sm font-medium text-gray-400 ml-1">· {fruit.benefit}</span></h4>
                      <p className="text-gray-500 text-sm font-medium">{fruit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Floating Bottle & Fruit Tokens */}
            <div className="w-full lg:w-7/12 relative h-[600px] lg:h-[800px] flex items-center justify-center">
              {/* Central Bottle */}
              <motion.div 
                className="relative z-20 w-56 lg:w-72"
                animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="absolute inset-0 bg-[#FF0069]/20 blur-[80px] rounded-full scale-[1.5]" />
                {/* Perfume Mist Glow behind bottle */}
                <div className="absolute inset-0 bg-white/40 blur-[40px] rounded-full scale-[1.2] mix-blend-overlay" />
                <img src={perfumeBottleImg} alt="Pocket Perfume" className="relative w-full h-auto drop-shadow-[0_50px_60px_rgba(255,0,105,0.4)] mix-blend-multiply" />
              </motion.div>

              {/* Floating Fruit Tokens */}
              {[
                { ...SIGNATURE_FRUITS[0], x: '10%', y: '25%', delay: 0 },
                { ...SIGNATURE_FRUITS[1], x: '75%', y: '15%', delay: 1 },
                { ...SIGNATURE_FRUITS[2], x: '15%', y: '75%', delay: 2 },
                { ...SIGNATURE_FRUITS[3], x: '80%', y: '65%', delay: 1.5 },
                { ...SIGNATURE_FRUITS[4], x: '40%', y: '10%', delay: 0.5 },
                { ...SIGNATURE_FRUITS[5], x: '60%', y: '85%', delay: 2.5 },
              ].map((fruit, i) => (
                <motion.div
                  key={i}
                  className="absolute z-30 group"
                  style={{ left: fruit.x, top: fruit.y }}
                  animate={{ y: [-12, 12, -12] }}
                  transition={{ duration: 5, repeat: Infinity, delay: fruit.delay, ease: 'easeInOut' }}
                  onMouseEnter={() => setHoveredFruit(fruit.id)}
                  onMouseLeave={() => setHoveredFruit(null)}
                >
                  <div className="relative flex flex-col items-center">
                    <motion.div 
                      whileHover={{ scale: 1.2 }}
                      className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-xl border border-white shadow-[0_15px_35px_rgba(0,0,0,0.1)] flex items-center justify-center text-3xl cursor-pointer relative z-10"
                      style={{ boxShadow: `0 15px 35px ${fruit.color}33` }}
                    >
                      {fruit.emoji}
                    </motion.div>
                    
                    {/* Tooltip */}
                    <AnimatePresence>
                      {hoveredFruit === fruit.id && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          className="absolute top-full mt-3 px-4 py-2 bg-white rounded-xl shadow-xl border border-black/5 whitespace-nowrap z-50 flex flex-col items-center pointer-events-none"
                        >
                          <div className="absolute -top-1.5 w-3 h-3 bg-white border-t border-l border-black/5 transform rotate-45" />
                          <span className="font-bold text-black text-sm">{fruit.name}</span>
                          <span className="text-xs text-gray-500">{fruit.tooltip}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Bottom Banner */}
          <div className="mt-12 lg:mt-0 w-full bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <h3 className="font-heading font-black text-xl text-black flex items-center gap-2">
              <Sparkles className="text-[#FF0069] w-5 h-5" /> 
              Powered by COSKINn Signature 6 Fruit Complex
            </h3>
            <div className="flex gap-4 md:gap-6 items-center">
              {SIGNATURE_FRUITS.map((fruit, i) => (
                <div key={i} className="group relative cursor-pointer">
                  <div className="text-2xl lg:text-3xl grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 drop-shadow-sm group-hover:drop-shadow-xl">
                    {fruit.emoji}
                  </div>
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: `${fruit.color}33` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHERE YOU'LL LOVE IT */}
      <section className="w-full bg-white py-12 lg:py-20 border-t border-black/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-black text-black mb-4">Where You'll <span className="text-[#FF0069]">Love It</span></h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg">
              Designed to elevate every moment of your day, wherever life takes you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {LIFESTYLE_CARDS.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative h-[350px] rounded-[2.5rem] overflow-hidden cursor-pointer"
              >
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  style={{ filter: card.tint ? card.tint : 'none' }}
                />
                
                {/* Luxury Pink Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#FF0069]/80 via-black/20 to-transparent mix-blend-multiply opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }} 
                    whileInView={{ y: 0, opacity: 1 }} 
                    transition={{ delay: 0.2 + (idx * 0.1) }}
                  >
                    <h3 className="font-heading font-black text-3xl mb-2">{card.title}</h3>
                    <p className="font-medium text-white/90 text-sm">{card.desc}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: SHOP MORE FRAGRANCES */}
      <section id="shop-more" className="w-full bg-gradient-to-br from-[#FFF5F8] to-[#FFF8F0] py-12 lg:py-20 border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-black text-black mb-2">Shop More <span className="text-[#FF0069]">Fragrances</span></h2>
              <p className="text-gray-500 font-medium">Build your personal luxury perfume wardrobe.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => scrollCarousel('left')} className="w-12 h-12 rounded-full border border-black/10 bg-white flex items-center justify-center hover:border-[#FF0069] hover:text-[#FF0069] transition-all">
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => scrollCarousel('right')} className="w-12 h-12 rounded-full border border-black/10 bg-white flex items-center justify-center hover:border-[#FF0069] hover:text-[#FF0069] transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x snap-mandatory select-none"
            style={{ cursor: 'grab', scrollBehavior: 'smooth' }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            {collectionProducts.map((product) => (
              <div key={product.id} className="w-[280px] shrink-0 snap-start flex flex-col group bg-white rounded-3xl p-4 border border-black/5 hover:border-[#FF0069]/30 hover:shadow-[0_15px_30px_rgba(255,0,105,0.1)] transition-all">
                <div className="relative aspect-[4/5] bg-[#FFF5F8] rounded-2xl overflow-hidden mb-4 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                  {product.discountBadge && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-white text-[#FF0069] font-bold text-[10px] tracking-widest rounded-full shadow-sm z-10">
                      {product.discountBadge}
                    </div>
                  )}
                  <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 p-8 mix-blend-multiply" />

                  <div className="absolute inset-x-3 bottom-3 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex gap-2">
                    <button onClick={e => { e.stopPropagation(); navigate(`/product/${product.id}`); }} className="flex-1 bg-white/90 backdrop-blur font-bold text-[#FF0069] text-xs py-2.5 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-1 shadow-sm">
                      <Eye size={14} /> Quick View
                    </button>
                  </div>

                  <button
                    onClick={e => { e.stopPropagation(); toggleWishlist(product); }}
                    className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-[#FF0069] transition-all shadow-sm"
                  >
                    <Heart size={14} className={isInWishlist(product.id) ? 'fill-[#FF0069] text-[#FF0069]' : ''} />
                  </button>
                </div>

                <h3 className="font-heading font-bold text-black group-hover:text-[#FF0069] transition-colors mb-1 truncate text-base cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>{product.name}</h3>
                
                <div className="flex items-center gap-1 text-[#FF0069] mb-4 text-xs">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                  <span className="text-gray-400 font-bold ml-1">{product.rating}</span>
                </div>

                <div className="flex items-center justify-between mb-4 mt-auto pt-2">
                  <span className="text-xl font-black text-black">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button onClick={() => addToCart(product, 1)} className="flex-1 py-3 bg-gradient-to-r from-[#FF0069] to-[#FF5EA8] text-white rounded-xl font-bold text-xs hover:shadow-[0_5px_15px_rgba(255,0,105,0.4)] transition-all flex items-center justify-center gap-2">
                    <ShoppingBag size={14} /> Add
                  </button>
                  <button onClick={() => handleBuyNow(product)} className="flex-1 py-3 bg-[#FFF0F5] text-[#FF0069] border border-[#FF0069]/20 rounded-xl font-bold text-xs hover:bg-[#FF0069] hover:text-white transition-all">
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: CUSTOMER REVIEWS */}
      <section className="w-full bg-white py-12 lg:py-20 border-t border-black/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-black text-black mb-4">Loved By <span className="text-[#FF0069]">Thousands</span></h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex text-[#FF0069]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
              </div>
              <span className="font-bold text-black text-2xl">4.9</span>
            </div>
            <p className="text-gray-500 font-medium">Based on 4,800+ reviews</p>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x snap-mandatory px-4 lg:px-0">
            {CUSTOMER_REVIEWS.map((review, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="w-[320px] lg:w-[400px] shrink-0 snap-center bg-[#FFF8F5] rounded-3xl p-8 border border-black/5 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF0069] to-[#FF5EA8] text-white flex items-center justify-center font-bold text-xl shadow-inner">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-black text-lg">{review.name}</h4>
                    <span className="text-xs text-[#FF0069] uppercase tracking-widest font-bold">{review.role}</span>
                  </div>
                </div>
                <div className="flex text-[#FFD700] mb-4">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-600 mb-2 italic text-base leading-relaxed">"{review.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: COMPLETE YOUR LUXURY ROUTINE */}
      <section className="w-full bg-[#FFF8F5] py-12 lg:py-20 border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-black text-black mb-4">Complete Your <span className="text-[#FF0069]">Luxury Routine</span></h2>
            <p className="text-gray-500 font-medium">Pair your pocket perfume with our signature body care.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'COSKINn Hand Cream', path: '/shop/body-lips/hand-cream' },
              { name: 'COSKINn Lip Balm SPF', path: '/shop/body-lips/lip-balm-spf' },
              { name: 'COSKINn Face Mist', path: '/skincare/face-mist' },
              { name: 'COSKINn Body Mist', path: '/shop/body-lips/pocket-perfume' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                onClick={() => navigate(item.path)}
                className="group cursor-pointer bg-white rounded-[2rem] p-8 flex flex-col items-center text-center border border-black/5 hover:border-[#FF0069]/30 hover:shadow-[0_15px_30px_rgba(255,0,105,0.1)] transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-[#FFF8F5] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform border border-black/5">
                  <StarIcon className="text-[#FF0069] w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-black text-lg group-hover:text-[#FF0069] transition-colors">{item.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
