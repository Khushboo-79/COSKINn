import React from 'react';

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-gradient-to-b from-[#fff5f5] to-[#fde8e8] py-20 overflow-hidden font-body text-theme-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8 mb-24">

          {/* Left Text */}
          <div className="w-full lg:w-5/12 pr-0 lg:pr-8 flex flex-col justify-center">
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-theme-dark leading-[1.1] mb-6">
              Indulge yourself in <br /> premium skincare
            </h2>
            <p className="text-theme-dark/80 text-sm md:text-base leading-relaxed mb-8 max-w-md">
              Discover a new standard of beauty with our meticulously crafted skincare formulations.
              We blend nature's finest ingredients with scientific innovation to give your skin the
              radiant, healthy glow it deserves.
            </p>
            <div>
              <button className="bg-[#434343] hover:bg-theme-dark text-white text-xs font-semibold py-4 px-10 rounded-sm tracking-widest transition-colors duration-300">
                GO TO SHOP
              </button>
            </div>
          </div>

          {/* Right Image & Text Grid */}
          <div className="w-full lg:w-7/12 relative">
            {/* Offset background rect */}
            <div className="absolute top-0 right-0 w-[80%] h-full bg-[#f9dada] -z-10 translate-x-12 -translate-y-12 rounded-lg"></div>

            {/* Image placeholder - Currently removed as requested pending quota reset for new image generation */}
            <div className="w-full aspect-[4/3] bg-gradient-to-tr from-[#fff5f5] to-[#fde8e8] flex items-center justify-center rounded-lg shadow-sm mb-8 border border-[#f9dada]">
              {/* <p className="text-[#d48181] font-body text-sm text-center px-4">
                New beautiful model image with COSKINN branding<br />will be placed here.
              </p> */}
              <img src="https://i.pinimg.com/736x/71/8f/4a/718f4a8b0bf303f7ea92b02235a23545.jpg" alt="" srcset="" />
            </div>

            {/* Three small text columns below image */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 lg:px-0">
              <p className="text-[11px] uppercase tracking-wider text-theme-dark/70 leading-relaxed border-t border-theme-dark/10 pt-4">
                We craft products that you and your skin can enjoy without worrying.
              </p>
              <p className="text-[11px] uppercase tracking-wider text-theme-dark/70 leading-relaxed border-t border-theme-dark/10 pt-4">
                Dermatologist tested, cruelty-free, and perfectly safe for all skin types.
              </p>
              <p className="text-[11px] uppercase tracking-wider text-theme-dark/70 leading-relaxed border-t border-theme-dark/10 pt-4">
                Embrace a holistic approach to beauty with our premium ingredients.
              </p>
            </div>
          </div>

        </div>


        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start mt-32">

          {/* Left Column (Cleansers) */}
          <div className="flex flex-col">
            <h3 className="font-heading text-4xl text-theme-dark mb-6">Cleansers</h3>
            <div className="relative group overflow-hidden bg-[#eccbcb] rounded-lg">
              <img
                src="/cleanser_bottle_coskin.png"
                alt="Cleansers"
                className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 animate-float"
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5 text-center">
                <button className="w-full bg-[#fff0f0] hover:bg-[#fff0f0] text-[#c96a6a] text-xs font-semibold py-4 px-6 shadow-md transition-colors duration-300">
                  GO TO SHOP
                </button>
              </div>
            </div>
          </div>

          {/* Middle Column (Serums) */}
          <div className="flex flex-col md:mt-16">
            <h3 className="font-heading text-4xl text-theme-dark mb-6">Serums</h3>
            <div className="relative group overflow-hidden bg-[#e4bcbc] rounded-lg">
              <img
                src="/serum_bottle_coskin.png"
                alt="Serums"
                className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 animate-float"
                style={{ animationDelay: '2s' }}
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5 text-center">
                <button className="w-full bg-[#fff0f0] hover:bg-[#fff0f0] text-[#c96a6a] text-xs font-semibold py-4 px-6 shadow-md transition-colors duration-300">
                  GO TO SHOP
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (Phone Mockup) */}
          <div className="flex justify-center md:justify-end md:-mt-32">
            <div className="w-[340px] max-w-full bg-[#111111] rounded-[2.5rem] p-3 shadow-2xl relative">
              {/* Phone Notch/Top Bar */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#111111] rounded-b-xl z-10"></div>

              {/* Phone Screen */}
              <div className="bg-[#fef2f2] w-full h-[650px] rounded-[2rem] overflow-hidden flex flex-col items-center pt-20 relative">
                <h3 className="font-heading text-4xl lg:text-[2.6rem] leading-[1.1] text-theme-dark text-center px-6 mb-6">
                  Your skin <br /><span className="italic font-light">and</span> mind deserve premium selfcare
                </h3>
                <p className="text-theme-dark/70 text-xs text-center px-8 leading-relaxed mb-8">
                  Transform your daily routine into a luxurious ritual. Experience the calming embrace of our rich textures and soothing aromas, crafted specifically to rejuvenate both your complexion and your spirit.
                </p>

                {/* Bottom Images in Phone */}
                <div className="absolute bottom-0 left-0 w-full flex h-48 justify-center gap-2 px-2">
                  <img src="/mockup_product_1.png" className="w-1/3 h-full object-cover rounded-t-xl transition-transform duration-500 hover:-translate-y-2 hover:shadow-lg animate-float" style={{ animationDelay: '0s' }} alt="Product 1" />
                  <img src="/mockup_product_2.png" className="w-1/3 h-full object-cover rounded-t-xl -mt-8 shadow-lg transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl animate-float" style={{ animationDelay: '1s' }} alt="Product 2" />
                  <img src="/mockup_product_3.png" className="w-1/3 h-full object-cover rounded-t-xl transition-transform duration-500 hover:-translate-y-2 hover:shadow-lg animate-float" style={{ animationDelay: '2s' }} alt="Product 3" />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
