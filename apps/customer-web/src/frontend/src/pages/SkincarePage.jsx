import React from 'react';
import Hero from '../components/skincare/Hero';
import FeaturedCategories from '../components/skincare/FeaturedCategories';
import WhyChooseUs from '../components/skincare/WhyChooseUs';
import AboutBrand from '../components/skincare/AboutBrand';
import BeforeAfter from '../components/skincare/BeforeAfter';
import BuildYourRoutine from '../components/skincare/BuildYourRoutine';
import Footer from '../components/common/Footer';

export default function SkincarePage() {
  return (
    <div className="min-h-screen w-full bg-theme-surface font-sans text-theme-dark selection:bg-theme-secondary selection:text-theme-dark overflow-x-hidden">
      <Hero />
      <FeaturedCategories />
      <WhyChooseUs />
      <AboutBrand />
      <BeforeAfter />
      <BuildYourRoutine />
      <Footer />
    </div>
  );
}
