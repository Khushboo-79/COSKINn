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

import heroImg from '../../assets/images/dry_hero.webp';

export default function DrySkinPage() {
  const targetProducts = ['Moisturizer', 'Cleansing Balm', 'Overnight Mask', 'Hand Cream'];
  const gridProducts = skincareProducts.filter(p => 
    targetProducts.some(name => p.name.includes(name))
  ).slice(0, 4);

  const educationalContent = [
    "Dry skin naturally produces less oil than normal skin, leaving it vulnerable to moisture loss, flakiness, and premature aging.",
    "Our Dry Skin collection is rich in restorative plant butters and fruit oils. Specifically formulated with Mango Butter, these products melt into the skin to provide deep, long-lasting nourishment without feeling heavy."
  ];

  const ingredients = [
    { emoji: "🥭", name: "Mango Butter", desc: "An intensely rich emollient that softens rough patches and seals in moisture.", colorClass: "bg-orange-50 text-orange-500" },
    { emoji: "🥥", name: "Coconut Oil", desc: "Provides deep nourishment and leaves a healthy, glowing finish.", colorClass: "bg-yellow-50 text-yellow-500" },
    { emoji: "🥜", name: "Shea Butter", desc: "Packed with vitamins to condition and smooth dry, flaky skin.", colorClass: "bg-amber-50 text-amber-600" },
    { emoji: "💧", name: "Glycerin", desc: "A powerful humectant that pulls water into the skin for lasting hydration.", colorClass: "bg-blue-50 text-blue-400" }
  ];

  const reviews = [
    { rating: 5, text: "My skin drinks this up. It used to feel so tight in the winter, but now it stays soft all day long.", name: "Rachel M.", initial: "R" },
    { rating: 5, text: "The cleansing balm is incredible. It takes off makeup while actually moisturizing my skin.", name: "Diana H.", initial: "D" },
    { rating: 5, text: "Finally, a moisturizer rich enough for my dry skin that doesn't cause breakouts.", name: "Kim K.", initial: "K" }
  ];

  const faqs = [
    { q: "What is the difference between dry and dehydrated skin?", a: "Dry skin lacks oil (sebum), while dehydrated skin lacks water. Our dry skin routine provides both deep lipid nourishment and water hydration." },
    { q: "Will the Cleansing Balm leave a greasy residue?", a: "No, our balm transforms into a milky emulsion when mixed with water and rinses away completely clean, leaving skin soft but not greasy." },
    { q: "How often should I use the Overnight Mask?", a: "For very dry skin, it can be used 3-4 times a week or even nightly during harsh winter months." },
    { q: "Is this routine too heavy for daytime wear?", a: "Our formulas are designed to absorb beautifully, creating a perfect glowing canvas for makeup without slipping or pilling." }
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] font-sans text-black selection:bg-[#FF2D7A] selection:text-white overflow-x-hidden">
      <CategoryHero 
        categoryName="Dry Skin"
        titleBlack="Deeply"
        titleColor="Nourished."
        description="Banish flakiness and tightness with ultra-rich, mango-infused skincare that melts in for a lasting, comfortable glow."
        heroImage={heroImg}
        gradientFrom="from-[#FEF3C7]"
        gradientVia="via-[#FFEDD5]"
        gradientTo="to-[#FFF8F8]"
        accentColor="text-[#F59E0B]" 
      />

      <section id="products" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4 text-black">Nourishing Essentials</h2>
            <p className="text-lg font-bold text-[#F59E0B]">Rich moisture for thirsty skin.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {gridProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <CategoryEducational 
        title="Why Nourishment Matters"
        subtitle="Replenish your skin's natural oils."
        content={educationalContent}
        accentColor="text-[#F59E0B]"
      />

      <CategoryIngredients ingredients={ingredients} accentColor="text-[#F59E0B]" />
      <CategoryRoutine accentColor="text-[#F59E0B]" />
      <CategoryReviews reviews={reviews} />
      <CategoryFAQ faqs={faqs} accentColor="text-[#F59E0B]" />
      <CategoryCollections accentColor="text-[#F59E0B]" />
      <Footer />
    </div>
  );
}
