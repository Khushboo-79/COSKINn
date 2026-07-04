import React from 'react';
import Hero from '../components/Hero';
import FeaturedCategories from '../components/FeaturedCategories';
import WhyChooseUs from '../components/WhyChooseUs';
import About from '../components/About';
import Results from '../components/Results';
import Routine from '../components/Routine';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-theme-surface font-sans text-theme-dark selection:bg-theme-secondary selection:text-theme-dark overflow-x-hidden">
      <Hero />
      <FeaturedCategories />
      <WhyChooseUs />
      <About />
      <Results />
      <Routine />
      <Footer />
    </div>
  );
}
