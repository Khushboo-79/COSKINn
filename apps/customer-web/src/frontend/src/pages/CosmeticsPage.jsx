import React from 'react';
import Hero from '../components/cosmetics/Hero';
import CosmeticsAbout from '../components/cosmetics/CosmeticsAbout';
import FeaturedCategories from '../components/cosmetics/FeaturedCategories';
import PromotionalBanners from '../components/cosmetics/PromotionalBanners';
import WhyChooseUs from '../components/cosmetics/WhyChooseUs';
import BeforeAndAfter from '../components/cosmetics/BeforeAndAfter';
import BuildYourRoutine from '../components/cosmetics/BuildYourRoutine';
import Footer from '../components/common/Footer';
import SEO from '../components/common/SEO';

export default function CosmeticsPage() {
  return (
    <div className="min-h-screen w-full bg-[#FFFDFD] font-sans text-[#1B1B1B] selection:bg-[#FFEBF1] selection:text-[#1B1B1B] overflow-x-hidden">
      <SEO title="Cosmetics & Makeup" description="Discover our high-performance cosmetic range. Ethical and flawless makeup for everyday." url="https://www.coskinn.com/cosmetics" />
      <Hero />
      <CosmeticsAbout />
      <FeaturedCategories />
      <PromotionalBanners />
      <WhyChooseUs />
      <BeforeAndAfter />
      <BuildYourRoutine />
      <Footer />
    </div>
  );
}
