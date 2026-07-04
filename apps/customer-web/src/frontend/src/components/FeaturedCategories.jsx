import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Flower2, Leaf, Sparkles, Rabbit, Ban, Recycle, Droplets } from 'lucide-react';

const categories = [
  {
    id: 1,
    title: "COSKINn Face Care",
    description: "Healthy glowing skin starts here.",
    productImg: "/bg-pomegranate.webp",
    lifestyleImg: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800&fm=webp",
  },
  {
    id: 2,
    title: "COSKINn Skin Care",
    description: "Nourish, protect & maintain your natural glow.",
    productImg: "/bg-blueberry.webp",
    lifestyleImg: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=800&fm=webp",
  },
  {
    id: 3,
    title: "COSKINn Hair Care",
    description: "Stronger, shinier & healthier hair every day.",
    productImg: "/bg-strawberry.webp",
    lifestyleImg: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=800&fm=webp",
  },
  {
    id: 4,
    title: "COSKINn Body Care",
    description: "Soft, smooth & deeply nourished skin all over.",
    productImg: "/bg-mango.webp",
    lifestyleImg: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=800&fm=webp",
  },
  {
    id: 5,
    title: "COSKINn Lip Care",
    description: "Soft, smooth & perfectly cared lips.",
    productImg: "/bg1.webp",
    lifestyleImg: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=800&fm=webp",
  },
  {
    id: 6,
    title: "COSKINn Makeup Care",
    description: "Flawless beauty with the right care & prep.",
    productImg: "/bg2.webp",
    lifestyleImg: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=800&fm=webp",
  }
];

export default function FeaturedCategories() {
  return (
    <section className="py-20 w-full bg-[#fdfbfb]">
      <div className="w-full mx-auto px-6 lg:px-12">

        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-14">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-14 bg-[#e2a8af]/60"></div>
            <span className="text-[11px] font-bold font-body tracking-[0.25em] text-[#db7e89] uppercase flex items-center gap-2">
              Featured <Flower2 size={14} className="text-[#db7e89]" strokeWidth={1.5} /> Categories
            </span>
            <div className="h-[1px] w-14 bg-[#e2a8af]/60"></div>
          </div>

          <h2 className="text-[2.75rem] font-heading font-medium text-[#2b5968] leading-tight mb-4">
            Shop By Category
          </h2>
          <p className="text-[16px] text-[#6b8591] font-body max-w-lg mx-auto">
            Everything your skin needs, beautifully organized into premium care collections.
          </p>
        </div>

        {/* Categories Grid (2 x 3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-20">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* First Banner: Real Ingredients */}
        <div className="relative w-full rounded-[30px] overflow-hidden bg-gradient-to-r from-[#faebeb] to-[#f4d8db] shadow-sm mb-8 flex flex-col lg:flex-row items-center h-auto lg:h-[440px]">
          {/* Banner 1 Background Image (Model & Product on Right) */}
          <div className="absolute inset-0 z-0 flex justify-end pointer-events-none">
            <div className="w-full lg:w-[65%] h-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#faebeb] via-transparent to-transparent z-10 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#faebeb] via-[#faebeb]/80 to-transparent z-10 block lg:hidden" />
              <img
                src="/coskinn-bg-updated.png"
                alt="Beautiful skincare model"
                className="absolute inset-0 w-full h-full object-cover object-center lg:object-right mix-blend-multiply opacity-90"
                loading="lazy"
              />
            </div>
          </div>

          {/* Banner 1 Content */}
          <div className="relative z-20 w-full lg:w-[50%] p-10 lg:p-16 flex flex-col justify-center h-full">
            <span className="text-[11px] font-bold font-body tracking-[0.2em] text-[#db7e89] uppercase mb-4 block">
              Science-Backed Skincare
            </span>
            <h3 className="text-[2.75rem] font-heading font-semibold text-[#2b5968] leading-[1.1]">
              Real Ingredients.
            </h3>
            <h3 className="text-[2.75rem] font-heading font-medium text-[#db7e89] leading-[1.1] mb-5">
              Real Results.
            </h3>
            <p className="text-[15px] text-[#4b6a78] font-body leading-relaxed mb-7 max-w-[400px]">
              At <strong className="font-semibold text-[#db7e89]">COSKINn</strong>, we blend the best of nature and science to create skincare that truly works. Safe, effective & made for you.
            </p>

            <ul className="space-y-3.5 mb-8">
              <li className="flex items-center gap-3 text-[#4b6a78] font-body text-[14px] font-medium">
                <Leaf size={18} className="text-[#4b6a78]" /> Natural & Safe
              </li>
              <li className="flex items-center gap-3 text-[#4b6a78] font-body text-[14px] font-medium">
                <Droplets size={18} className="text-[#4b6a78]" /> Dermatologically Tested
              </li>
              <li className="flex items-center gap-3 text-[#4b6a78] font-body text-[14px] font-medium">
                <Sparkles size={18} className="text-[#4b6a78]" /> Visible Results
              </li>
            </ul>

            <button className="self-start bg-[#db7e89] hover:bg-[#c96f79] text-white px-7 py-3 rounded-full font-body font-semibold text-[14px] transition-all shadow-[0_4px_15px_rgba(219,126,137,0.3)] hover:shadow-[0_6px_20px_rgba(219,126,137,0.4)]">
              Discover Our Range &rarr;
            </button>
          </div>
        </div>

        {/* Second Banner: Clean Beauty */}
        <div className="relative w-full rounded-[30px] overflow-hidden bg-[#fbf9f6] shadow-sm flex flex-col-reverse lg:flex-row items-center h-auto lg:h-[440px]">
          {/* Banner 2 Background Image (Model on Left) */}
          <div className="absolute inset-0 z-0 flex justify-start pointer-events-none">
            <div className="w-full lg:w-[50%] h-full relative">
              <div className="absolute inset-0 bg-gradient-to-l from-[#fbf9f6] via-transparent to-transparent z-10 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#fbf9f6] via-[#fbf9f6]/80 to-transparent z-10 block lg:hidden" />
              <img
                src="/lumiere-bg-updated.png"
                alt="Fresh skincare model"
                className="w-full h-full object-cover object-left mix-blend-multiply opacity-95"
                loading="lazy"
              />
            </div>
          </div>

          <div className="hidden lg:block w-[50%] h-full"></div>

          {/* Banner 2 Content (Right Side) */}
          <div className="relative z-20 w-full lg:w-[50%] p-10 lg:p-16 flex flex-col justify-center h-full">
            <span className="text-[11px] font-bold font-body tracking-[0.2em] text-[#db7e89] uppercase mb-4 block">
              Good For You, Good For Nature
            </span>
            <h3 className="text-[2.75rem] font-heading font-semibold text-[#2b5968] leading-[1.1]">
              Clean Beauty.
            </h3>
            <h3 className="text-[2.75rem] font-heading font-medium text-[#db7e89] leading-[1.1] mb-5">
              Conscious Care.
            </h3>
            <p className="text-[15px] text-[#4b6a78] font-body leading-relaxed mb-9 max-w-[400px]">
              We use clean, natural ingredients and eco-friendly practices to care for your skin and our planet.
            </p>

            <div className="flex items-start gap-10 mb-9">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full border border-[#4b6a78]/20 flex items-center justify-center text-[#4b6a78] bg-white/50 backdrop-blur-sm">
                  <Rabbit size={20} strokeWidth={1.5} />
                </div>
                <span className="text-[12px] font-body text-[#4b6a78] font-medium text-center">Cruelty Free</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full border border-[#4b6a78]/20 flex items-center justify-center text-[#4b6a78] bg-white/50 backdrop-blur-sm">
                  <Ban size={20} strokeWidth={1.5} />
                </div>
                <span className="text-[12px] font-body text-[#4b6a78] font-medium text-center">Paraben Free</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full border border-[#4b6a78]/20 flex items-center justify-center text-[#4b6a78] bg-white/50 backdrop-blur-sm">
                  <Recycle size={20} strokeWidth={1.5} />
                </div>
                <span className="text-[12px] font-body text-[#4b6a78] font-medium text-center">Sustainable</span>
              </div>
            </div>

            <button className="self-start bg-[#db7e89] hover:bg-[#c96f79] text-white px-7 py-3 rounded-full font-body font-semibold text-[14px] transition-all shadow-[0_4px_15px_rgba(219,126,137,0.3)] hover:shadow-[0_6px_20px_rgba(219,126,137,0.4)]">
              Learn More &rarr;
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

function CategoryCard({ category }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group rounded-[24px] overflow-hidden bg-white shadow-[0_4px_20px_rgba(43,89,104,0.06)] flex flex-col border border-[#f5f5f5] hover:shadow-[0_12px_30px_rgba(43,89,104,0.12)] hover:-translate-y-1 transition-all duration-400 ease-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      {/* Image Container with Premium Hover Zoom & Fade */}
      <div className="w-full h-[260px] bg-[#fdfafb] relative overflow-hidden">

        {/* Base Product Image */}
        <motion.img
          src={category.productImg}
          alt={`${category.title} Product`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          animate={{
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Hover Lifestyle Image */}
        <AnimatePresence>
          {isHovered && (
            <motion.img
              src={category.lifestyleImg}
              alt={`${category.title} Lifestyle`}
              className="absolute inset-0 w-full h-full object-cover z-10"
              loading="lazy"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1.08 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Content Area */}
      <div className="p-7 flex flex-col flex-1 bg-white relative z-20">
        <div className="flex items-center gap-3 mb-2.5">
          <div className="w-8 h-8 rounded-full bg-[#fdf2f3] flex items-center justify-center text-[#db7e89]">
            <Flower2 size={16} fill="currentColor" strokeWidth={1.5} />
          </div>
          <h3 className="text-[20px] font-heading font-medium text-[#2b5968]">
            {category.title}
          </h3>
        </div>

        <div className="flex flex-col justify-between flex-1 mt-1">
          <p className="text-[#6b8591] font-body text-[14px] leading-relaxed mb-6 max-w-[90%]">
            {category.description}
          </p>

          <div className="flex justify-end mt-auto">
            <button className="bg-[#fdf2f3] text-[#db7e89] px-5 py-2 rounded-full font-body font-medium text-[13px] transition-all duration-300 hover:bg-[#db7e89] hover:text-white flex items-center gap-1.5 group/btn">
              Explore
              <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
