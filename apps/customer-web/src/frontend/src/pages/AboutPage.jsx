import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  Sparkles, 
  Leaf, 
  Droplets, 
  Heart, 
  ShieldCheck, 
  Search, 
  FlaskConical, 
  PackageCheck, 
  Truck,
  CheckCircle2,
  Star
} from 'lucide-react';
import Footer from '../components/common/Footer';
import heroImg from '../assets/images/lifestyle_selfcare.webp';

export default function AboutPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="bg-[#FFFDFD] min-h-screen font-sans selection:bg-[#FF2D7A]/20">
      
      {/* 1. PREMIUM HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-[#FFF5F8]">
        {/* Full Canvas Background Image */}
        <motion.div 
          initial={{ opacity: 0, filter: 'blur(15px)', scale: 1.02 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0 flex justify-end"
        >
          <div className="w-full lg:w-[70%] h-full relative">
            {/* Soft radial blur for seamless blending on the left */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFF5F8] via-[#FFF5F8]/40 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFF5F8] via-transparent to-transparent z-10 lg:hidden pointer-events-none"></div>
            <img 
              src={heroImg} 
              alt="COSKINn Lifestyle" 
              className="w-full h-full object-cover object-center" 
              style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 30%)', maskImage: 'linear-gradient(to right, transparent, black 30%)' }}
            />
          </div>
        </motion.div>

        {/* Left Side Content Container */}
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 pt-[160px] pb-20">
          <div className="w-full lg:w-[55%] lg:pr-12">
            <motion.div 
              initial={{ opacity: 0, filter: 'blur(10px)', y: 15 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-400 mb-6">
                <Link to="/" className="hover:text-[#FF2D7A] transition-colors">Home</Link>
                <span>/</span>
                <span className="text-[#FF2D7A]">About Us</span>
              </div>
              
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#FF2D7A]/20 text-[#FF2D7A] text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
                About COSKINn
              </span>

              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-heading font-black text-[#1B1B1B] leading-[1.05] mb-8 tracking-tight">
                Nature Meets <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D7A] to-[#FF8EAA]">Science.</span>
              </h1>
              
              <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-md mb-12">
                We are a Gen-Z friendly, fruit-powered skincare brand built for value-conscious glow-seekers. Discover simple, effective, and beautifully crafted formulas.
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <Link to="/shop-all-skincare" className="flex items-center justify-center gap-2 px-10 py-4 bg-[#FF2D7A] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#E01B63] hover:shadow-[0_0_20px_rgba(255,45,122,0.4)] hover:scale-105 transition-all duration-300">
                  Explore Products
                </Link>
                <a href="#our-story" className="flex items-center justify-center gap-2 px-10 py-4 bg-white/60 backdrop-blur-lg text-[#1B1B1B] border border-[#FF2D7A]/20 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:border-[#FF2D7A]/40 hover:shadow-[0_10px_30px_rgba(255,45,122,0.05)] hover:scale-105 transition-all duration-300">
                  Our Story
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. OUR STORY */}
      <section id="our-story" className="py-24 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Text side */}
            <div className="w-full lg:w-5/12 lg:sticky top-32">
              <span className="text-[#FF2D7A] font-bold uppercase tracking-widest text-sm mb-4 block">The Beginning</span>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#1B1B1B] mb-8 tracking-tight">Our Story</h2>
              <div className="space-y-6 text-gray-600 font-medium text-lg leading-relaxed">
                <p>COSKINn was born from a desire to merge high-performance skincare with effortless beauty. Indian beauty ecommerce needed a fresh perspective—one that combined trust, transparency, and the joyful power of fruit ingredients.</p>
                <p>We created a curated, concern-driven soft-luxury brand designed specifically for the modern Gen-Z and millennial lifestyle. A habit-forming shopping experience paired with formulas that simply work.</p>
              </div>
              <div className="mt-12 p-8 bg-[#FFF5F8] rounded-[32px] border border-[#FF2D7A]/10 shadow-sm">
                <h3 className="text-xl font-heading font-bold text-[#1B1B1B] mb-3">Our Mission</h3>
                <p className="text-gray-600 mb-8 font-medium">To empower every individual to feel confident in their own skin through clean, science-backed fruit formulas.</p>
                <h3 className="text-xl font-heading font-bold text-[#1B1B1B] mb-3">Our Vision</h3>
                <p className="text-gray-600 font-medium">To become the go-to destination for fruit-based, concern-driven skincare and SPF-safe makeup across India.</p>
              </div>
            </div>

            {/* Timeline Side */}
            <div className="w-full lg:w-7/12 flex flex-col gap-8">
              {[
                { year: "The Spark", title: "Identifying the Gap", desc: "Noticing that Indian skincare was often clinical or overpriced, we sought a middle ground: joyful, fruit-powered efficacy." },
                { year: "Formulation", title: "Perfecting the Science", desc: "Partnering with top dermatologists and cosmetologists to create 12 distinct, highly effective skincare formulas." },
                { year: "The COSKINn Era", title: "Launch & Beyond", desc: "Bringing our premium aesthetic and loyalty-driven ecosystem to glow-seekers everywhere." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className="bg-white rounded-[32px] p-8 lg:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-[#FF2D7A]/5 hover:shadow-[0_20px_50px_rgba(255,45,122,0.08)] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FF2D7A]/10 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFF5F8] text-[#FF2D7A] font-bold text-sm tracking-wider uppercase mb-6 shadow-sm border border-[#FF2D7A]/10">{item.year}</span>
                  <h3 className="text-2xl font-heading font-bold text-[#1B1B1B] mb-4 relative z-10">{item.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed relative z-10">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. BRAND PHILOSOPHY */}
      <section className="py-24 bg-[#FAFAFA] relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-[#FF2D7A] font-bold uppercase tracking-widest text-sm mb-4 block">Core Values</span>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#1B1B1B] tracking-tight">Brand Philosophy</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Sparkles size={32} />, title: "Fruit-Powered Skincare", desc: "Harnessing the potent antioxidants and vitamins naturally found in superfruits." },
              { icon: <FlaskConical size={32} />, title: "Science-Backed Formulas", desc: "Clinically formulated for optimal absorption and visible, long-lasting results." },
              { icon: <Leaf size={32} />, title: "Clean Beauty", desc: "100% free from harsh sulfates, parabens, and toxins. Gentle on your skin." },
              { icon: <Heart size={32} />, title: "Everyday Self-Care", desc: "Turning mundane routines into luxurious, habit-forming daily rituals." }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/80 backdrop-blur-xl p-8 lg:p-10 rounded-[32px] text-center shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-white hover:border-[#FF2D7A]/20 hover:shadow-[0_20px_50px_rgba(255,45,122,0.08)] hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="w-20 h-20 mx-auto bg-[#FFF5F8] rounded-full flex items-center justify-center text-[#FF2D7A] mb-6 group-hover:scale-110 group-hover:bg-[#FF2D7A] group-hover:text-white transition-all duration-500 shadow-inner">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1B1B1B] mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FRUIT INGREDIENTS */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFF5F8] rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-[#FF2D7A] font-bold uppercase tracking-widest text-sm mb-4 block">The Secret</span>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#1B1B1B] tracking-tight mb-6">Our Superfruit Lineup</h2>
            <p className="text-gray-600 text-lg font-medium">We extract the purest essence from nature's most powerful fruits.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { name: "Orange", benefit: "Vitamin C burst for extreme brightening and dark spot reduction.", color: "bg-[#FFF0E6]", text: "text-[#E67300]" },
              { name: "Strawberry", benefit: "Natural BHA for clearing acne and unclogging pores gently.", color: "bg-[#FFF0F4]", text: "text-[#FF2D7A]" },
              { name: "Mango", benefit: "Deep hydration and rich butter for restoring skin barrier.", color: "bg-[#FFF9E6]", text: "text-[#D9A000]" },
              { name: "Blueberry", benefit: "Antioxidant powerhouse that repairs environmental damage.", color: "bg-[#F0F5FF]", text: "text-[#2D6AFF]" },
              { name: "Green Tea", benefit: "Soothing anti-inflammatory properties for calming redness.", color: "bg-[#F0FFF5]", text: "text-[#00A340]" },
              { name: "Pomegranate", benefit: "Collagen-boosting fruit for firm, plump, and youthful skin.", color: "bg-[#FFF0F5]", text: "text-[#D60053]" },
            ].map((fruit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`${fruit.color} rounded-[32px] p-8 lg:p-10 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:scale-[1.02] transition-all duration-500`}
              >
                <div className={`text-2xl lg:text-3xl font-heading font-black ${fruit.text} mb-4`}>{fruit.name}</div>
                <p className="text-gray-700 font-medium text-sm lg:text-base leading-relaxed">{fruit.benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE COSKINN (Bento Grid) */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-[#FF2D7A] font-bold uppercase tracking-widest text-sm mb-4 block">The Difference</span>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#1B1B1B] tracking-tight">Why Choose COSKINn</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            {/* Box 1 (Large) */}
            <div className="md:col-span-2 bg-white rounded-[32px] p-10 flex flex-col justify-end relative overflow-hidden group shadow-sm border border-[#FF2D7A]/10 hover:border-[#FF2D7A]/30 transition-colors">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#FF2D7A]/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/4"></div>
              <div className="absolute top-10 right-10 w-16 h-16 bg-[#FFF5F8] rounded-full flex items-center justify-center text-[#FF2D7A]">
                <Leaf size={32} />
              </div>
              <h3 className="text-3xl font-heading font-bold text-[#1B1B1B] mb-3 relative z-10">Fruit-Powered Ingredients</h3>
              <p className="text-gray-500 text-lg max-w-md relative z-10 font-medium">We never use cheap fillers. Every drop is packed with real, nutrient-dense fruit extracts.</p>
            </div>
            
            {/* Box 2 */}
            <div className="bg-[#FFF5F8] rounded-[32px] p-8 flex flex-col justify-end group overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-[#FF2D7A]/5">
               <ShieldCheck size={40} className="text-[#FF2D7A] mb-auto" />
               <h3 className="text-2xl font-bold text-[#1B1B1B] mb-2">Dermatologically Tested</h3>
               <p className="text-gray-600 text-sm font-medium">Safe, tested, and proven to work.</p>
            </div>

            {/* Box 3 */}
            <div className="bg-white rounded-[32px] p-8 flex flex-col justify-end group overflow-hidden shadow-sm border border-gray-100 hover:border-[#FF2D7A]/20 transition-colors">
               <Heart size={40} className="text-[#FF2D7A] mb-auto" />
               <h3 className="text-2xl font-bold text-[#1B1B1B] mb-2">Cruelty Free</h3>
               <p className="text-gray-600 text-sm font-medium">Never tested on animals. We love our furry friends.</p>
            </div>

            {/* Box 4 */}
            <div className="bg-white rounded-[32px] p-8 flex flex-col justify-end group overflow-hidden shadow-sm border border-gray-100 hover:border-[#FF2D7A]/20 transition-colors">
               <Droplets size={40} className="text-[#FF2D7A] mb-auto" />
               <h3 className="text-2xl font-bold text-[#1B1B1B] mb-2">Gentle on Skin</h3>
               <p className="text-gray-600 text-sm font-medium">Sulphate & Paraben Free formulations.</p>
            </div>

            {/* Box 5 */}
            <div className="bg-gradient-to-br from-[#FF2D7A] to-[#FF8EAA] rounded-[32px] p-8 flex flex-col justify-end text-white overflow-hidden shadow-[0_20px_40px_rgba(255,45,122,0.3)] hover:-translate-y-1 transition-transform duration-300">
               <Sparkles size={40} className="text-white mb-auto" />
               <h3 className="text-2xl font-bold text-white mb-2">Everyday Luxury</h3>
               <p className="text-white/90 text-sm font-medium">Premium aesthetic without the luxury markup.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR PROCESS (Horizontal Timeline) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="text-[#FF2D7A] font-bold uppercase tracking-widest text-sm mb-4 block">From Lab to Vanity</span>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#1B1B1B] tracking-tight">Our Process</h2>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative">
             <div className="hidden lg:block absolute top-12 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-transparent via-[#FF2D7A]/30 to-transparent z-0"></div>

             {[
               { step: "01", title: "Research", icon: <Search /> },
               { step: "02", title: "Selection", icon: <Leaf /> },
               { step: "03", title: "Development", icon: <FlaskConical /> },
               { step: "04", title: "Testing", icon: <ShieldCheck /> },
               { step: "05", title: "Packaging", icon: <PackageCheck /> },
               { step: "06", title: "Delivery", icon: <Truck /> }
             ].map((item, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: idx * 0.1 }}
                 className="relative z-10 flex flex-col items-center group w-full lg:w-1/6"
               >
                 <div className="w-24 h-24 bg-white border-2 border-[#FF2D7A]/20 rounded-full flex flex-col items-center justify-center text-[#FF2D7A] mb-5 shadow-sm group-hover:bg-[#FF2D7A] group-hover:text-white group-hover:border-[#FF2D7A] transition-all duration-500 group-hover:scale-110">
                   {item.icon}
                 </div>
                 <h4 className="text-lg font-bold text-[#1B1B1B] mb-1">{item.title}</h4>
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Step {item.step}</span>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* 7. OUR PROMISE */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
           <div className="bg-[#FFF5F8] rounded-[40px] p-10 lg:p-20 relative overflow-hidden border border-[#FF2D7A]/10">
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#FF2D7A]/5 via-transparent to-transparent pointer-events-none"></div>
              
              <div className="text-center mb-16 relative z-10">
                <span className="text-[#FF2D7A] font-bold uppercase tracking-widest text-sm mb-4 block">The COSKINn Guarantee</span>
                <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#1B1B1B] tracking-tight">Our Promise</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
                {[
                  { title: "Uncompromising Quality", desc: "Every product is meticulously crafted to meet luxury standards." },
                  { title: "Absolute Safety", desc: "We use only dermatologically approved, skin-safe ingredients." },
                  { title: "Total Transparency", desc: "No hidden chemicals. We list everything clearly on our labels." },
                  { title: "100% Satisfaction", desc: "We are committed to delivering results you can actually see and feel." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-500">
                    <CheckCircle2 size={32} className="text-[#FF2D7A] mb-6" />
                    <h3 className="text-xl font-bold text-[#1B1B1B] mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* 8. CUSTOMER LOVE */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 max-w-3xl mx-auto">
             <span className="text-[#FF2D7A] font-bold uppercase tracking-widest text-sm mb-4 block">Testimonials</span>
             <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#1B1B1B] tracking-tight">Customer Love</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Priya S.", product: "Vitamin C Serum", text: "The glow is unbelievable! It feels so premium and actually faded my dark spots within weeks." },
              { name: "Aisha M.", product: "Gentle Cleanser", text: "Finally a brand that understands sensitive skin. The subtle strawberry scent is so refreshing in the morning." },
              { name: "Riya K.", product: "Daily Moisturizer", text: "It's luxury in a jar. My skin feels plump all day long, and the packaging looks gorgeous on my vanity." }
            ].map((review, idx) => (
              <div key={idx} className="bg-[#FAFAFA] rounded-[32px] p-10 border border-gray-100 relative group hover:bg-[#FFF5F8] transition-colors duration-500 hover:shadow-[0_20px_40px_rgba(255,45,122,0.05)]">
                 <div className="flex text-[#FF2D7A] mb-6 gap-1">
                   {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                 </div>
                 <p className="text-lg text-gray-700 italic mb-10 leading-relaxed font-medium">"{review.text}"</p>
                 <div className="flex items-end justify-between mt-auto">
                    <div>
                      <h4 className="font-bold text-[#1B1B1B] text-lg">{review.name}</h4>
                      <span className="text-xs text-[#FF2D7A] font-bold uppercase tracking-widest">Verified Buyer</span>
                    </div>
                    <span className="text-[10px] font-bold px-3 py-1.5 bg-white text-gray-500 rounded-full border border-gray-200 shadow-sm uppercase tracking-wider">{review.product}</span>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="w-[95%] lg:w-[90%] max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#FF2D7A] font-bold uppercase tracking-widest text-sm mb-4 block">Got Questions?</span>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-[#1B1B1B] tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Are your products suitable for sensitive skin?", a: "Yes! All COSKINn products are dermatologically tested and formulated without harsh sulfates, parabens, or toxins, making them perfect for sensitive skin types." },
              { q: "Do you test on animals?", a: "Never. We are proudly 100% cruelty-free and committed to ethical beauty." },
              { q: "Where are your products manufactured?", a: "All our products are proudly made in India, combining modern cosmetic science with carefully sourced fruit extracts." },
              { q: "Is your packaging recyclable?", a: "Yes, sustainability is a core value. The majority of our packaging is recyclable, and we are constantly working towards 100% eco-friendly solutions." }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_25px_rgba(255,45,122,0.05)] transition-shadow">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left p-6 lg:p-8 flex items-center justify-between focus:outline-none"
                >
                  <span className="text-lg font-bold text-[#1B1B1B] pr-4">{faq.q}</span>
                  <ChevronDown className={`shrink-0 text-[#FF2D7A] transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 lg:px-8 pb-8 text-gray-600 font-medium leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CTA SECTION */}
      <section className="py-32 relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F8] to-[#FFFDFD]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF2D7A]/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 text-center">
           <h2 className="text-5xl lg:text-7xl font-heading font-black text-[#1B1B1B] mb-8 tracking-tight">Ready to Glow?</h2>
           <p className="text-xl text-gray-600 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">Join the COSKINn revolution and transform your daily skincare routine into a luxurious, fruit-powered ritual.</p>
           
           <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
             <Link to="/shop-all-skincare" className="px-12 py-5 bg-[#FF2D7A] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#E01B63] hover:shadow-[0_15px_30px_rgba(255,45,122,0.3)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
                Shop Skincare
             </Link>
             <Link to="/skin-quiz" className="px-12 py-5 bg-white text-[#1B1B1B] border border-gray-200 rounded-full font-bold uppercase tracking-widest text-sm hover:border-[#FF2D7A]/50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
                Take Skin Quiz
             </Link>
           </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <Footer />
    </div>
  );
}
