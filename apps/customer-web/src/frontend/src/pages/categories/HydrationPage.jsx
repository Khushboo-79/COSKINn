import React from 'react';
import { skincareProducts } from '../../constants/skincareProducts';
import ProductCard from '../../components/common/ProductCard';
import Footer from '../../components/common/Footer';

// Reusable Sections
import CategoryHero from '../../components/categories/CategoryHero';
import CategoryEducational from '../../components/categories/CategoryEducational';
import CategoryIngredients from '../../components/categories/CategoryIngredients';
import CategoryRoutine from '../../components/categories/CategoryRoutine';
import CategoryReviews from '../../components/categories/CategoryReviews';
import CategoryFAQ from '../../components/categories/CategoryFAQ';
import CategoryCollections from '../../components/categories/CategoryCollections';

import heroImg from '../../assets/images/hydration_hero.webp';

export default function HydrationPage() {
  // Target specific products for Hydration
  const targetProducts = ['Face Mist', 'Overnight Mask', 'Moisturizer', 'Cleanser'];
  const gridProducts = skincareProducts.filter(p => 
    targetProducts.some(name => p.name.includes(name))
  ).slice(0, 4);

  const educationalContent = [
    "Hydration is the foundation of healthy, glowing skin. When your skin lacks water, it overcompensates by producing excess oil, leading to breakouts, dullness, and a compromised barrier.",
    "Our Hydration line uses advanced fruit-water technology to deliver weightless, deep moisture that absorbs instantly. Formulated with Mango and Peach extracts, these products lock in hydration for 48 hours without feeling heavy or greasy."
  ];

  const ingredients = [
    { emoji: "🍑", name: "Peach Extract", desc: "Rich in vitamins A and C to deeply hydrate and soften rough skin.", colorClass: "bg-orange-50 text-orange-400" },
    { emoji: "🥭", name: "Mango Butter", desc: "Seals in moisture and repairs the skin barrier naturally.", colorClass: "bg-yellow-50 text-yellow-500" },
    { emoji: "💧", name: "Hyaluronic Acid", desc: "Holds 1000x its weight in water for instant plumping.", colorClass: "bg-blue-50 text-blue-400" },
    { emoji: "🥥", name: "Coconut Water", desc: "Electrolyte-rich hydration to revitalize tired skin.", colorClass: "bg-gray-100 text-gray-500" }
  ];

  const reviews = [
    { rating: 5, text: "My skin drinks this up! The overnight mask is a game changer for my dry patches.", name: "Sarah J.", initial: "S" },
    { rating: 5, text: "Finally a moisturizer that doesn't feel heavy but keeps me hydrated all day. Smells like heaven.", name: "Emily R.", initial: "E" },
    { rating: 5, text: "The face mist is my holy grail. I keep one at my desk and one in my purse.", name: "Jessica T.", initial: "J" }
  ];

  const faqs = [
    { q: "What's the difference between hydration and moisture?", a: "Hydration refers to water content in the skin, while moisture refers to the lipid (oil) content that traps the water. Our routine provides both!" },
    { q: "Is this suitable for oily skin?", a: "Yes! Oily skin is often dehydrated. Providing lightweight hydration helps balance sebum production." },
    { q: "Can I use the Overnight Mask every night?", a: "Absolutely. It's formulated to be gentle enough for nightly use to repair your barrier while you sleep." },
    { q: "Does the Face Mist ruin makeup?", a: "No, our ultra-fine mist actually helps set makeup and gives you a dewy, glass-skin finish." }
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] font-sans text-black selection:bg-[#FF2D7A] selection:text-white overflow-x-hidden">
      <CategoryHero 
        categoryName="Hydration"
        titleBlack="Deep Moisture"
        titleColor="Locked In."
        description="Quench thirsty skin with fruit-powered hydration for a plump, dewy, and glass-like glow that lasts 48 hours."
        heroImage={heroImg}
        gradientFrom="from-[#FFF4E6]"
        gradientVia="via-[#FFEDD5]"
        gradientTo="to-[#FFF8F8]"
        accentColor="text-[#FB923C]" // Orange/Peach accent
      />

      {/* Featured Solutions (Products) */}
      <section id="products" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4 text-black">Hydration Heroes</h2>
            <p className="text-lg font-bold text-[#FB923C]">Everything you need for a dewy finish.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {gridProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <CategoryEducational 
        title="Why Hydration Matters"
        subtitle="The secret to bouncy, youthful skin."
        content={educationalContent}
        accentColor="text-[#FB923C]"
      />

      <CategoryIngredients 
        ingredients={ingredients}
        accentColor="text-[#FB923C]"
      />

      <CategoryRoutine 
        accentColor="text-[#FB923C]"
      />

      <CategoryReviews 
        reviews={reviews}
      />

      <CategoryFAQ 
        faqs={faqs}
        accentColor="text-[#FB923C]"
      />

      <CategoryCollections 
        accentColor="text-[#FB923C]"
      />

      <Footer />
    </div>
  );
}
