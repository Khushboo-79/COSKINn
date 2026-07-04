import React from 'react';
import Hero from '../components/Hero';
import FeaturedCategories from '../components/FeaturedCategories';
import WhyChooseUs from '../components/WhyChooseUs';

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#fdfbfb] font-sans text-gray-800 selection:bg-[#f7dce0] selection:text-[#2b5968] overflow-x-hidden">
      <Hero />
      <FeaturedCategories />
      <WhyChooseUs />
    </div>
  );
}
