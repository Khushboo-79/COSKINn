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

import heroImg from '../../assets/images/barrier_hero.webp';

export default function BarrierCarePage() {
  const targetProducts = ['Barrier Cream', 'Cleansing Balm', 'Moisturizer', 'Hand Cream'];
  const gridProducts = skincareProducts.filter(p => 
    targetProducts.some(name => p.name.includes(name))
  ).slice(0, 4);

  const educationalContent = [
    "Your skin barrier is the outermost layer of your skin. It keeps the good things in (like moisture) and the bad things out (like bacteria and pollution).",
    "When you use harsh scrubs or strip your skin with strong chemicals, this barrier breaks. Our Barrier Care line uses gentle, lipid-rich formulas to seal cracks, reduce redness, and build a stronger, healthier foundation."
  ];

  const ingredients = [
    { emoji: "🛡️", name: "Ceramides", desc: "The mortar between your skin cells that keeps everything intact and hydrated.", colorClass: "bg-amber-50 text-amber-500" },
    { emoji: "🥥", name: "Coconut Oil", desc: "Rich in fatty acids to deeply nourish and repair dry, flaky skin.", colorClass: "bg-orange-50 text-orange-400" },
    { emoji: "🌿", name: "Centella", desc: "A powerful herb known as 'Tiger Grass' that instantly calms redness.", colorClass: "bg-green-50 text-green-500" },
    { emoji: "🧴", name: "Squalane", desc: "A weightless oil that mimics your skin's natural sebum for perfect balance.", colorClass: "bg-yellow-50 text-yellow-500" }
  ];

  const reviews = [
    { rating: 5, text: "I ruined my skin barrier with too many acids. This cream fixed it in less than a week.", name: "Taylor D.", initial: "T" },
    { rating: 5, text: "The most comforting, rich texture without being greasy. My skin feels so protected.", name: "Laura H.", initial: "L" },
    { rating: 5, text: "No more redness or stinging when I apply products. My skin is finally resilient.", name: "Emma S.", initial: "E" }
  ];

  const faqs = [
    { q: "How do I know if my skin barrier is damaged?", a: "Signs of a damaged barrier include redness, stinging when applying normal products, excessive dryness, flakiness, and sudden breakouts." },
    { q: "Should I stop using exfoliants while fixing my barrier?", a: "Yes. Pause all AHAs, BHAs, and retinoids until your skin feels calm and resilient again. Stick to this simple, nourishing routine." },
    { q: "Is the Barrier Cream heavy?", a: "It is rich but not pore-clogging. It melts into the skin beautifully, creating a protective shield without feeling suffocating." },
    { q: "Can I use barrier care products daily?", a: "Yes! Maintaining a healthy barrier is an everyday job, and these products are perfect for daily use." }
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] font-sans text-black selection:bg-[#FF2D7A] selection:text-white overflow-x-hidden">
      <CategoryHero 
        categoryName="Barrier Care"
        titleBlack="Stronger Skin"
        titleColor="Every Day."
        description="Fortify your skin's natural defense with ceramide-rich formulas that instantly soothe, repair, and protect against daily damage."
        heroImage={heroImg}
        gradientFrom="from-[#FFFBEB]"
        gradientVia="via-[#FEF3C7]"
        gradientTo="to-[#FFF8F8]"
        accentColor="text-[#D97706]" 
      />

      <section id="products" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4 text-black">Barrier Builders</h2>
            <p className="text-lg font-bold text-[#D97706]">Strengthen your skin's first line of defense.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {gridProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <CategoryEducational 
        title="Why the Barrier Matters"
        subtitle="Healthy skin starts from the outside in."
        content={educationalContent}
        accentColor="text-[#D97706]"
      />

      <CategoryIngredients ingredients={ingredients} accentColor="text-[#D97706]" />
      <CategoryRoutine accentColor="text-[#D97706]" />
      <CategoryReviews reviews={reviews} />
      <CategoryFAQ faqs={faqs} accentColor="text-[#D97706]" />
      <CategoryCollections accentColor="text-[#D97706]" />
      <Footer />
    </div>
  );
}
