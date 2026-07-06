import React from 'react';
import Hero from '../components/cosmetics/Hero';
import FeaturedCategories from '../components/cosmetics/FeaturedCategories';
import WhyChooseUs from '../components/cosmetics/WhyChooseUs';
import AboutBrand from '../components/cosmetics/AboutBrand';
import BeforeAndAfter from '../components/cosmetics/BeforeAndAfter';
import BuildYourRoutine from '../components/cosmetics/BuildYourRoutine';
import Footer from '../components/common/Footer';

export default function CosmeticsPage() {
  return (
    <div className="min-h-screen w-full bg-theme-surface font-sans text-theme-dark selection:bg-theme-secondary selection:text-theme-dark overflow-x-hidden">
      <Hero />
      <FeaturedCategories />
      <WhyChooseUs />
      <AboutBrand />
      <BeforeAndAfter />
      <BuildYourRoutine />
      <Footer />
    </div>
  );
}
