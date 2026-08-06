import React, { useState, useEffect } from 'react';
import Hero from '../components/home/Hero';
import Promotions from '../components/home/Promotions';
import ShopByCategory from '../components/home/ShopByCategory';
import Bestsellers from '../components/home/Bestsellers';
import InteractiveExperience from '../components/home/InteractiveExperience';
import Philosophy from '../components/home/Philosophy';
import { ScrollSection } from '../components/ui/ScrollSection';

const Home: React.FC = () => {
  const [heroBanners, setHeroBanners] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/home`)
      .then(res => res.json())
      .then(data => {
        if (data && data.heroBanners) {
          setHeroBanners(data.heroBanners);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero is always full-bleed — no 3-D on first section */}
      <Hero banners={heroBanners} />

      <ScrollSection index={1}>
        <Promotions />
      </ScrollSection>

      <ScrollSection index={2}>
        <ShopByCategory />
      </ScrollSection>

      <ScrollSection index={3}>
        <Bestsellers />
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
