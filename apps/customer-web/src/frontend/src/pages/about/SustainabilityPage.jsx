import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Recycle, Droplets } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

export default function SustainabilityPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDFD] flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative w-full pt-32 pb-24 px-6 lg:px-12 bg-gradient-to-b from-[#E8F5E9]/30 to-[#FFFDFD] text-center overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-16 h-16 mx-auto bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-6"
          >
            <Leaf size={28} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-heading font-black text-[#1B1B1B] mb-6"
          >
            Kind to Skin. Kind to Earth.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-500 text-lg font-medium max-w-2xl mx-auto"
          >
            We are committed to reducing our environmental footprint at every stage of our supply chain, from sourcing to packaging.
          </motion.p>
        </section>

        {/* INITIATIVES SECTION */}
        <section className="pb-24 px-6 lg:px-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] text-center"
            >
              <div className="w-16 h-16 mx-auto bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-6">
                <Recycle size={32} />
              </div>
              <h3 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">Post-Consumer Recycled Packaging</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Over 80% of our bottles and jars are made from PCR (Post-Consumer Recycled) materials, significantly reducing virgin plastic waste.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] text-center"
            >
              <div className="w-16 h-16 mx-auto bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-6">
                <Droplets size={32} />
              </div>
              <h3 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">Water-Conscious Formulas</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                We prioritize high-concentration extracts and botanical juices over plain water bases to minimize fresh water usage during manufacturing.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] text-center"
            >
              <div className="w-16 h-16 mx-auto bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-6">
                <Leaf size={32} />
              </div>
              <h3 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">Ethical Harvesting</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Our fruit extracts and botanicals are sourced from farms that practice sustainable agriculture, ensuring soil health and fair wages.
              </p>
            </motion.div>
          </div>
        </section>

        {/* IMAGE BREAK */}
        <section className="py-20 px-6 lg:px-12 bg-[#FFFDFD]">
          <div className="max-w-6xl mx-auto h-[400px] lg:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80" 
              alt="Sustainable Nature" 
              className="w-full h-full object-cover"
            />
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
