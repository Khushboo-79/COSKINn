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

import heroImg from '../../assets/images/repair_hero.webp';

export default function RepairPage() {
  const targetProducts = ['Overnight Mask', 'Serum', 'Barrier Cream', 'Toner'];
  const gridProducts = skincareProducts.filter(p => 
    targetProducts.some(name => p.name.includes(name))
  ).slice(0, 4);

  const educationalContent = [
    "Your skin goes through a lot every day—pollution, UV exposure, and harsh weather. This daily stress breaks down collagen and damages your skin's protective barrier.",
    "Our Repair collection utilizes the intense antioxidant power of Blueberries and Pomegranate to neutralize free radicals, stimulate cellular turnover, and rebuild your skin from the inside out while you sleep."
  ];

  const ingredients = [
    { emoji: "🫐", name: "Blueberry Extract", desc: "A superfood packed with antioxidants to fight environmental skin damage.", colorClass: "bg-indigo-50 text-indigo-500" },
    { emoji: "🍎", name: "Pomegranate", desc: "Promotes skin regeneration and improves firmness.", colorClass: "bg-red-50 text-red-500" },
    { emoji: "🧬", name: "Peptides", desc: "Building blocks of collagen that plump and firm the skin.", colorClass: "bg-purple-50 text-purple-400" },
    { emoji: "🛡️", name: "Ceramides", desc: "Lipids that restore the skin barrier and prevent moisture loss.", colorClass: "bg-blue-50 text-blue-500" }
  ];

  const reviews = [
    { rating: 5, text: "I wake up looking like I got 10 hours of sleep even when I only got 5. Magic in a bottle.", name: "Sophia L.", initial: "S" },
    { rating: 5, text: "My skin feels thicker and more resilient. The redness I used to have is completely gone.", name: "Michelle P.", initial: "M" },
    { rating: 5, text: "The repair mask is incredible. It sinks right in and doesn't get all over my pillow.", name: "Olivia W.", initial: "O" }
  ];

  const faqs = [
    { q: "Should I only use repair products at night?", a: "While night time is when your skin naturally repairs itself (making it the best time to apply these products), our serums and creams can be used during the day to protect against damage." },
    { q: "Is this anti-aging?", a: "Yes! By repairing cellular damage and protecting collagen, this routine acts as excellent preventative care for fine lines and loss of firmness." },
    { q: "Can I use this if I have active breakouts?", a: "Yes, repairing the skin barrier is actually crucial for healing breakouts and reducing inflammation." },
    { q: "How fast will my skin barrier heal?", a: "With consistent use of our ceramide-rich repair products, a compromised barrier can start feeling better in just 3-5 days." }
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] font-sans text-black selection:bg-[#FF2D7A] selection:text-white overflow-x-hidden">
      <CategoryHero 
        categoryName="Repair"
        titleBlack="Reset &"
        titleColor="Recover."
        description="Rebuild your skin's strength and elasticity with antioxidant-rich blueberry treatments that work overtime while you sleep."
        heroImage={heroImg}
        gradientFrom="from-[#F5F3FF]"
        gradientVia="via-[#EDE9FE]"
        gradientTo="to-[#FFF8F8]"
        accentColor="text-[#8B5CF6]" 
      />

      <section id="products" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4 text-black">Repair Solutions</h2>
            <p className="text-lg font-bold text-[#8B5CF6]">Intensive care for stressed skin.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {gridProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <CategoryEducational 
        title="Why Repair Matters"
        subtitle="Your skin's nightly reset button."
        content={educationalContent}
        accentColor="text-[#8B5CF6]"
      />

      <CategoryIngredients ingredients={ingredients} accentColor="text-[#8B5CF6]" />
      <CategoryRoutine accentColor="text-[#8B5CF6]" />
      <CategoryReviews reviews={reviews} />
      <CategoryFAQ faqs={faqs} accentColor="text-[#8B5CF6]" />
      <CategoryCollections accentColor="text-[#8B5CF6]" />
      <Footer />
    </div>
  );
}
