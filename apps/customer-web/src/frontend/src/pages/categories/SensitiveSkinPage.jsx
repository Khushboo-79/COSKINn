import React from 'react';
import { skincareProducts } from '../../constants/skincareProducts';
import ProductCard from '../../components/common/ProductCard';
import Footer from '../../components/common/Footer';

import CategoryHero from '../../components/categories/CategoryHero';
import CategoryEducational from '../../components/categories/CategoryEducational';
import CategoryIngredients from '../../components/categories/CategoryIngredients';
import CategoryRoutine from '../../components/categories/CategoryRoutine';
import CategoryReviews from '../../components/categories/CategoryReviews';
import CategoryFAQ from '../../components/categories/CategoryFAQ';
import CategoryCollections from '../../components/categories/CategoryCollections';

import heroImg from '../../assets/images/sensitive_hero.webp';

export default function SensitiveSkinPage() {
  const targetProducts = ['Cleanser', 'Face Mist', 'Barrier Cream'];
  const gridProducts = skincareProducts.filter(p => 
    targetProducts.some(name => p.name.includes(name))
  ).slice(0, 4);

  const educationalContent = [
    "Sensitive skin reacts quickly to harsh chemicals, fragrances, and environmental stressors, leading to redness, stinging, and irritation.",
    "Our Sensitive Skin collection is formulated to be as gentle as water. We use calming botanicals like Green Tea and Aloe Vera to instantly soothe inflammation while strengthening your skin's natural tolerance."
  ];

  const ingredients = [
    { emoji: "🍵", name: "Green Tea Extract", desc: "A powerful anti-inflammatory that instantly cools and calms redness.", colorClass: "bg-green-50 text-green-500" },
    { emoji: "🌱", name: "Centella Asiatica", desc: "Known as Tiger Grass, it heals micro-tears in the skin barrier.", colorClass: "bg-emerald-50 text-emerald-500" },
    { emoji: "🌼", name: "Chamomile", desc: "Soothes irritated skin and provides deep, gentle comfort.", colorClass: "bg-yellow-50 text-yellow-500" },
    { emoji: "💧", name: "Panthenol (B5)", desc: "Draws in moisture while promoting skin healing.", colorClass: "bg-blue-50 text-blue-400" }
  ];

  const reviews = [
    { rating: 5, text: "Everything breaks me out or makes me red, but not this. It's so incredibly gentle.", name: "Sarah M.", initial: "S" },
    { rating: 5, text: "The Green Tea mist is a lifesaver when I have a flare-up. It cools my skin instantly.", name: "Jessica L.", initial: "J" },
    { rating: 5, text: "My skin feels calm and balanced for the first time in years.", name: "Nicole P.", initial: "N" }
  ];

  const faqs = [
    { q: "Are these products fragrance-free?", a: "Yes, our sensitive line is 100% free from synthetic fragrances. Any mild scent comes naturally from the soothing fruit and plant extracts." },
    { q: "Can I use this if I have rosacea or eczema?", a: "While we don't claim to cure medical conditions, these products are formulated to be incredibly soothing and supportive for hyper-reactive skin types." },
    { q: "Will the cleanser strip my skin?", a: "No. Our gentle cleanser uses a low-pH formula that respects your acid mantle, leaving skin clean but never tight." },
    { q: "How quickly does it reduce redness?", a: "Ingredients like Green Tea and Centella provide immediate cooling relief upon application." }
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] font-sans text-black selection:bg-[#FF2D7A] selection:text-white overflow-x-hidden">
      <CategoryHero 
        categoryName="Sensitive Skin"
        titleBlack="Calm &"
        titleColor="Comforted."
        description="Soothe redness and banish irritation with ultra-gentle, green tea-powered formulas designed for the most delicate skin."
        heroImage={heroImg}
        gradientFrom="from-[#ECFDF5]"
        gradientVia="via-[#D1FAE5]"
        gradientTo="to-[#FFF8F8]"
        accentColor="text-[#10B981]" 
      />

      <section id="products" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4 text-black">Soothing Essentials</h2>
            <p className="text-lg font-bold text-[#10B981]">Gentle care for reactive skin.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {gridProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <CategoryEducational 
        title="Why Gentle Care Matters"
        subtitle="Less is more for reactive skin."
        content={educationalContent}
        accentColor="text-[#10B981]"
      />

      <CategoryIngredients ingredients={ingredients} accentColor="text-[#10B981]" />
      <CategoryRoutine accentColor="text-[#10B981]" />
      <CategoryReviews reviews={reviews} />
      <CategoryFAQ faqs={faqs} accentColor="text-[#10B981]" />
      <CategoryCollections accentColor="text-[#10B981]" />
      <Footer />
    </div>
  );
}
