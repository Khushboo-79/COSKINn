import React from 'react';
import Hero from '../components/home/Hero';
import Promotions from '../components/home/Promotions';
import Bestsellers from '../components/home/Bestsellers';
import InteractiveExperience from '../components/home/InteractiveExperience';
import Philosophy from '../components/home/Philosophy';
import Reviews from '../components/home/Reviews';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Promotions />
      <Bestsellers />
      <InteractiveExperience />
      <Philosophy />
      <Reviews />
    </div>
  );
};

export default Home;
