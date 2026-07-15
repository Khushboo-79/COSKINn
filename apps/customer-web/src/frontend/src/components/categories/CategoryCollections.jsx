import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CategoryCollections() {
  const collections = [
    { title: "Daily Essentials", desc: "Your everyday non-negotiables.", bg: "from-pink-100 to-white", href: "/shop/collections/daily-essentials" },
    { title: "Weekend Collection", desc: "Reset and restore over the weekend.", bg: "from-[#FFF0F4] to-white", href: "/shop/collections/weekend-collection" },
    { title: "Glow Kit", desc: "The ultimate routine for radiant skin.", bg: "from-rose-50 to-white", href: "/shop/bundles/glow-kit" }
  ];

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4 text-black">Complete Your Routine</h2>
          <p className="text-lg font-bold text-[#FF2D7A]">Curated sets for targeted results.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((col, idx) => (
            <Link 
              key={idx}
              to={col.href}
              className={`group block p-10 rounded-3xl bg-gradient-to-br ${col.bg} border border-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2`}
            >
              <h3 className="text-2xl font-heading font-bold mb-3 text-black group-hover:text-[#FF2D7A] transition-colors">{col.title}</h3>
              <p className="text-gray-600 mb-6">{col.desc}</p>
              <span className="font-bold text-sm uppercase tracking-widest text-[#FF2D7A] flex items-center gap-2">
                Shop Set <span className="group-hover:translate-x-2 transition-transform">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
