import React from 'react';
import Hero from '../components/home/Hero';
import Promotions from '../components/home/Promotions';
import ShopByCategory from '../components/home/ShopByCategory';
import Bestsellers from '../components/home/Bestsellers';
import InteractiveExperience from '../components/home/InteractiveExperience';
import Philosophy from '../components/home/Philosophy';
import { ScrollSection } from '../components/ui/ScrollSection';
import { useHomeData } from '../hooks/useHomeData';

const Home: React.FC = () => {
  const { bestSellers, categories } = useHomeData();

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollSection index={0}>
        <Hero />
      </ScrollSection>
      <ScrollSection index={1}>
        <Promotions />
      </ScrollSection>
      <ScrollSection index={2}>
        <ShopByCategory categories={categories} />
      </ScrollSection>
      <ScrollSection index={3}>
        <Bestsellers products={bestSellers} />
      </ScrollSection>
      <ScrollSection index={4}>
        <InteractiveExperience />
      </ScrollSection>
      <ScrollSection index={5}>
        <Philosophy />
      </ScrollSection>
    </div>
  );
};

export default Home;
