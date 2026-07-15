import React from 'react';

export default function CategoryEducational({ title, subtitle, content }) {
  return (
    <section id="educational" className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6 text-black">
              {title}
            </h2>
            <p className="text-lg font-bold mb-6 text-[#FF2D7A]">
              {subtitle}
            </p>
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
              {content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="relative p-12 rounded-[40px] bg-gradient-to-br from-gray-50 to-white shadow-2xl border border-gray-100">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-pink-100 to-transparent rounded-full blur-3xl opacity-60" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#FFF0F4] to-transparent rounded-full blur-2xl opacity-60" />
              
              <h3 className="text-2xl font-bold font-heading mb-8 relative z-10">The Science of Skin Barrier</h3>
              <ul className="space-y-6 relative z-10">
                {[
                  { title: "Epidermis Protection", desc: "Locks in essential moisture and blocks environmental aggressors." },
                  { title: "pH Balance", desc: "Maintains the optimal acidic environment to prevent bacteria growth." },
                  { title: "Cellular Turnover", desc: "Encourages healthy shedding of dead skin cells for a radiant glow." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#FF2D7A' }} />
                    <div>
                      <h4 className="font-bold text-black">{item.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
