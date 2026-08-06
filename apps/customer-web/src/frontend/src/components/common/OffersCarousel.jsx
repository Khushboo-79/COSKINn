import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import apiClient from '../../utils/apiClient';

export default function OffersCarousel() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await apiClient.get('/marketing/public/banners');
        setOffers(response.data || []);
      } catch (err) {
        console.error('Failed to fetch offers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  useEffect(() => {
    if (offers.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [offers.length]);

  if (loading || offers.length === 0) return null;

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % offers.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length);

  return (
    <div className="w-full bg-[#1B1B1B] text-white py-3 relative overflow-hidden font-sans border-t border-b border-[#333]">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        
        <button onClick={prevSlide} className="p-1 text-white/50 hover:text-white transition-colors z-10 hidden sm:block">
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 flex justify-center relative h-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute w-full flex items-center justify-center gap-2"
            >
              <Tag className="w-4 h-4 text-[#FF0069]" />
              <span className="text-sm sm:text-base font-medium tracking-wide">
                {offers[currentIndex]?.title || 'Special Offer!'} 
                {offers[currentIndex]?.discountPercent && <span className="text-[#FF0069] ml-2 font-bold">{offers[currentIndex].discountPercent}% OFF</span>}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        <button onClick={nextSlide} className="p-1 text-white/50 hover:text-white transition-colors z-10 hidden sm:block">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

