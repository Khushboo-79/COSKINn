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

import heroImg from '../../assets/images/sun_hero.webp';

export default function SunProtectionPage() {
  const targetProducts = ['Sunscreen', 'Lip Balm SPF'];
  const gridProducts = skincareProducts.filter(p => 
    targetProducts.some(name => p.name.includes(name))
  ).slice(0, 4);

  const educationalContent = [
    "Up to 90% of visible skin aging is caused by sun exposure. Daily UV rays break down collagen, cause hyperpigmentation, and damage the skin barrier.",
    "Our Sun Protection line isn't just SPF—it's skincare. Formulated with antioxidant-rich fruits and broad-spectrum filters, it protects against UVA/UVB rays without leaving a white cast or greasy finish."
  ];

  const ingredients = [
    { emoji: "☀️", name: "SPF 50 PA++++", desc: "Maximum broad-spectrum protection against both aging UVA and burning UVB rays.", colorClass: "bg-yellow-50 text-yellow-500" },
    { emoji: "🍊", name: "Vitamin C", desc: "Boosts sunscreen effectiveness by neutralizing free radicals from UV light.", colorClass: "bg-orange-50 text-orange-400" },
    { emoji: "🌱", name: "Aloe Vera", desc: "Soothes and cools the skin during sun exposure.", colorClass: "bg-green-50 text-green-500" },
    { emoji: "💧", name: "Hyaluronic Acid", desc: "Prevents the sun from drying out your skin by locking in deep moisture.", colorClass: "bg-blue-50 text-blue-400" }
  ];

  const reviews = [
    { rating: 5, text: "Finally a sunscreen that doesn't make me look like a ghost! It melts right in and leaves a gorgeous glow.", name: "Brittany P.", initial: "B" },
    { rating: 5, text: "I wear this under my makeup every day. It acts like the perfect hydrating primer.", name: "Ashley V.", initial: "A" },
    { rating: 5, text: "The SPF lip balm is a purse essential. Smells amazing and protects my lips from getting chapped.", name: "Megan L.", initial: "M" }
  ];

  const faqs = [
    { q: "Does this leave a white cast?", a: "No! Our sunscreens are specially formulated to blend invisibly into all skin tones." },
    { q: "Is this chemical or mineral sunscreen?", a: "We offer both hybrid and pure mineral options depending on your preference, both optimized for a cosmetically elegant finish." },
    { q: "Do I need sunscreen if I stay indoors?", a: "Yes. UVA rays (the ones that cause aging) can penetrate through window glass." },
    { q: "Does this clog pores?", a: "Not at all. Our sunscreens are non-comedogenic and formulated to be lightweight and breathable." }
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] font-sans text-black selection:bg-[#FF2D7A] selection:text-white overflow-x-hidden">
      <CategoryHero 
        categoryName="Sun Protection"
        titleBlack="Invisible"
        titleColor="Defense."
        description="Defend your glow with broad-spectrum SPF 50 that feels like luxury skincare. No white cast, no greasiness—just pure protection."
        heroImage={heroImg}
        gradientFrom="from-[#FEF9C3]"
        gradientVia="via-[#FEF08A]"
        gradientTo="to-[#FFF8F8]"
        accentColor="text-[#EAB308]" 
      />

      <section id="products" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4 text-black">Sun Essentials</h2>
            <p className="text-lg font-bold text-[#EAB308]">The most important step in your routine.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {gridProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <CategoryEducational 
        title="Why SPF is Non-Negotiable"
        subtitle="The best anti-aging product exists."
        content={educationalContent}
        accentColor="text-[#EAB308]"
      />

      <CategoryIngredients ingredients={ingredients} accentColor="text-[#EAB308]" />
      <CategoryRoutine accentColor="text-[#EAB308]" />
      <CategoryReviews reviews={reviews} />
      <CategoryFAQ faqs={faqs} accentColor="text-[#EAB308]" />
      <CategoryCollections accentColor="text-[#EAB308]" />
      <Footer />
    </div>
  );
}
