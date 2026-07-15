import React from 'react';
import { motion } from 'framer-motion';

export default function CategoryIngredients({ ingredients }) {
  return (
    <section className="py-16 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4 text-black">Ingredient Spotlight</h2>
          <p className="text-lg font-bold text-[#FF2D7A]">Fruit-powered science for real results.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
          {ingredients.map((ing, idx) => (
            <div 
              key={idx}
              className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center hover:-translate-y-2"
              style={{ borderColor: 'rgba(0,0,0,0.05)' }}
            >
              <div className="w-20 h-20 rounded-full bg-[#FFF0F4] text-[#FF2D7A] flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                {ing.emoji}
              </div>
              <h3 className="text-xl font-heading font-bold mb-2 transition-colors text-[#FF2D7A]">{ing.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{ing.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
