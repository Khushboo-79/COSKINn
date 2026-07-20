import React, { Suspense } from 'react';
import Hero from '../components/skincare/Hero';
import SEO from '../components/common/SEO';

// Lazy load below-the-fold components to improve mobile CPU performance
const FeaturedCategories = React.lazy(() => import('../components/skincare/FeaturedCategories'));
const WhyChooseUs = React.lazy(() => import('../components/skincare/WhyChooseUs'));
const AboutBrand = React.lazy(() => import('../components/skincare/AboutBrand'));
const TransformationShowcase = React.lazy(() => import('../components/skincare/TransformationShowcase'));
const BuildYourRoutine = React.lazy(() => import('../components/skincare/BuildYourRoutine'));
const Footer = React.lazy(() => import('../components/common/Footer'));

export default function SkincarePage() {
  return (
    <div className="min-h-screen w-full bg-theme-surface font-sans text-theme-dark selection:bg-theme-secondary selection:text-theme-dark overflow-x-hidden">
      <SEO title="Skincare Collections" description="Explore our premium skincare range. Transform your daily routine with clean ingredients." url="https://www.coskinn.com/skincare" />
      <Hero />
      <Suspense fallback={<div className="h-40 w-full flex items-center justify-center">Loading...</div>}>
        <FeaturedCategories />
        <WhyChooseUs />
        <AboutBrand />
        <TransformationShowcase />
        <BuildYourRoutine />
        <Footer />
      </Suspense>
    </div>
  );
}
