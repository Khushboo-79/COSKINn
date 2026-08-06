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

import heroImg from '../../assets/images/oily_hero.webp';

export default function OilySkinPage() {
  const targetProducts = ['Cleanser', 'Toner', 'Face Mist', 'Sunscreen'];
  const gridProducts = skincareProducts.filter(p => 
    targetProducts.some(name => p.name.includes(name))
  ).slice(0, 4);

  const educationalContent = [
    "Oily skin is caused by overactive sebaceous glands, often triggered by genetics, hormones, or ironically—using harsh, stripping products that cause your skin to panic and produce even more oil.",
    "Our Oily Skin collection focuses on balance, not stripping. Using natural astringents like Green Tea and Strawberry enzymes, we gently control sebum, minimize the appearance of pores, and deliver a fresh, soft-matte finish."
  ];

  const ingredients = [
    { emoji: "🍓", name: "Strawberry Extract", desc: "Contains natural AHAs to gently exfoliate inside the pore and dissolve excess oil.", colorClass: "bg-pink-50 text-pink-500" },
    { emoji: "🍵", name: "Green Tea", desc: "Reduces sebum production while calming inflammation.", colorClass: "bg-green-50 text-green-500" },
    { emoji: "✨", name: "Niacinamide", desc: "Visibly tightens enlarged pores and regulates oil flow.", colorClass: "bg-purple-50 text-purple-400" },
    { emoji: "🌿", name: "Willow Bark", desc: "A natural source of BHA that keeps pores clear and prevents blackheads.", colorClass: "bg-emerald-50 text-emerald-600" }
  ];

  const reviews = [
    { rating: 5, text: "I finally don't need to blot my face by noon! My makeup stays put all day.", name: "Chelsea W.", initial: "C" },
    { rating: 5, text: "The strawberry cleanser is amazing. My skin feels deeply clean but never that squeaky, tight feeling.", name: "Monica G.", initial: "M" },
    { rating: 5, text: "My pores look so much smaller after using the toner for just two weeks.", name: "Kelly T.", initial: "K" }
  ];

  const faqs = [
    { q: "Do I still need to use a moisturizer if I have oily skin?", a: "Yes! Dehydrated skin actually produces more oil to compensate. Our lightweight mists and gel moisturizers hydrate without adding grease." },
    { q: "Will this routine dry out my skin?", a: "No, our philosophy is balance. We use gentle fruit extracts to manage oil rather than harsh alcohols that strip your skin barrier." },
    { q: "Does the sunscreen feel heavy or greasy?", a: "Not at all. Our sunscreen features a specialized matte-finish formula perfect for oily and combination skin types." },
    { q: "How often should I use the toner?", a: "Our Green Tea toner is gentle enough for daily use, both morning and night, to keep oil at bay." }
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] font-sans text-black selection:bg-[#FF2D7A] selection:text-white overflow-x-hidden">
      <CategoryHero 
        categoryName="Oily Skin"
        titleBlack="Perfectly"
        titleColor="Balanced."
        description="Control excess shine and minimize pores with gentle, fruit-powered formulas that leave your skin fresh, matte, and clear."
        heroImage={heroImg}
        gradientFrom="from-[#FDF2F8]"
        gradientVia="via-[#FCE7F3]"
        gradientTo="to-[#FFF8F8]"
        accentColor="text-[#EC4899]" 
      />

      <section id="products" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4 text-black">Oil Control Essentials</h2>
            <p className="text-lg font-bold text-[#EC4899]">Everything you need for a fresh finish.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {gridProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <CategoryEducational 
        title="Why Balance Matters"
        subtitle="Manage shine without the stripping."
        content={educationalContent}
        accentColor="text-[#EC4899]"
      />

      <CategoryIngredients ingredients={ingredients} accentColor="text-[#EC4899]" />
      <CategoryRoutine accentColor="text-[#EC4899]" />
      <CategoryReviews reviews={reviews} />
      <CategoryFAQ faqs={faqs} accentColor="text-[#EC4899]" />
      <CategoryCollections accentColor="text-[#EC4899]" />
      <Footer />
    </div>
  );
}
