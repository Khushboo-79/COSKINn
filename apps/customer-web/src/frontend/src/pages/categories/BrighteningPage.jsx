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

import heroImg from '../../assets/images/brightening_hero.webp';

export default function BrighteningPage() {
  const targetProducts = ['Vitamin C', 'Serum', 'Face Mist', 'Cleanser'];
  const gridProducts = skincareProducts.filter(p => 
    targetProducts.some(name => p.name.includes(name))
  ).slice(0, 4);

  const educationalContent = [
    "Dullness and uneven skin tone happen when dead skin cells build up or when your skin is exposed to environmental stress like pollution and UV rays.",
    "Our Brightening collection harnesses the power of natural Vitamin C from Oranges and antioxidant-rich Pomegranate to gently exfoliate, fade dark spots, and reveal your natural, radiant glow."
  ];

  const ingredients = [
    { emoji: "🍊", name: "Orange Extract", desc: "Packed with Vitamin C to instantly brighten dull skin and fade dark spots.", colorClass: "bg-orange-50 text-orange-500" },
    { emoji: "🍋", name: "Lemon Water", desc: "A natural astringent that evens out skin tone.", colorClass: "bg-yellow-50 text-yellow-400" },
    { emoji: "✨", name: "Niacinamide", desc: "Visibly minimizes pores and improves uneven skin tone.", colorClass: "bg-pink-50 text-pink-400" },
    { emoji: "🌿", name: "Licorice Root", desc: "Soothes skin and naturally reduces hyperpigmentation.", colorClass: "bg-green-50 text-green-500" }
  ];

  const reviews = [
    { rating: 5, text: "My acne marks have faded so much since I started using this routine. The glow is real!", name: "Amanda K.", initial: "A" },
    { rating: 5, text: "The Vitamin C serum smells like fresh oranges. It wakes my skin up every morning.", name: "Chloe M.", initial: "C" },
    { rating: 5, text: "I finally feel confident going without makeup. My skin tone is so much more even now.", name: "Rachel B.", initial: "R" }
  ];

  const faqs = [
    { q: "Can Vitamin C irritate my skin?", a: "Our formula uses gentle, fruit-derived Vitamin C combined with soothing ingredients to prevent irritation while delivering maximum brightening." },
    { q: "How long until I see dark spots fade?", a: "Most customers notice an overall brighter complexion within 1 week, and significant fading of dark spots after 4-6 weeks of consistent use." },
    { q: "Can I use brightening products in the morning?", a: "Yes! Antioxidants like Vitamin C actually boost your sunscreen's effectiveness. Just make sure to always follow with SPF." },
    { q: "Is this safe for sensitive skin?", a: "Yes, we avoid harsh chemical bleaching agents and rely on natural fruit enzymes for a gentle brightening effect." }
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] font-sans text-black selection:bg-[#FF2D7A] selection:text-white overflow-x-hidden">
      <CategoryHero 
        categoryName="Brightening"
        titleBlack="Radiant Glow"
        titleColor="Unlocked."
        description="Fade dark spots and banish dullness with Vitamin C powered skincare for an instantly brighter, more even complexion."
        heroImage={heroImg}
        gradientFrom="from-[#FFF7ED]"
        gradientVia="via-[#FFEDD5]"
        gradientTo="to-[#FFF8F8]"
        accentColor="text-[#F97316]" 
      />

      <section id="products" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4 text-black">Brightening Essentials</h2>
            <p className="text-lg font-bold text-[#F97316]">Your daily dose of Vitamin C.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {gridProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <CategoryEducational 
        title="Why Brightening Matters"
        subtitle="Shed the dullness, reveal the glow."
        content={educationalContent}
        accentColor="text-[#F97316]"
      />

      <CategoryIngredients ingredients={ingredients} accentColor="text-[#F97316]" />
      <CategoryRoutine accentColor="text-[#F97316]" />
      <CategoryReviews reviews={reviews} />
      <CategoryFAQ faqs={faqs} accentColor="text-[#F97316]" />
      <CategoryCollections accentColor="text-[#F97316]" />
      <Footer />
    </div>
  );
}
