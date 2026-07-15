import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const JOBS = [
  {
    title: "Senior Skincare Formulator",
    department: "R&D",
    location: "Indore, India",
    type: "Full-Time"
  },
  {
    title: "E-Commerce Manager",
    department: "Marketing",
    location: "Remote / Indore",
    type: "Full-Time"
  },
  {
    title: "Social Media Executive",
    department: "Marketing",
    location: "Remote",
    type: "Part-Time"
  }
];

export default function CareersPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDFD] flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO */}
        <section className="pt-32 pb-24 px-6 lg:px-12 text-center bg-gradient-to-b from-[#FFF5F8] to-[#FFFDFD]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-[#FF2D7A] shadow-md mb-6"
          >
            <Briefcase size={28} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-heading font-black text-[#1B1B1B] mb-6"
          >
            Join the Glow Team.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-500 text-lg font-medium max-w-2xl mx-auto"
          >
            We're always looking for passionate, creative, and ambitious people to help us redefine luxury skincare in India.
          </motion.p>
        </section>

        {/* OPEN POSITIONS */}
        <section className="pb-24 px-6 lg:px-12 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-heading font-black text-[#1B1B1B]">Open Roles</h2>
            <span className="text-[#FF2D7A] font-bold text-sm bg-[#FFF5F8] px-4 py-1.5 rounded-full">3 Positions</span>
          </div>

          <div className="space-y-4">
            {JOBS.map((job, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col md:flex-row md:items-center justify-between bg-white rounded-3xl p-6 lg:p-8 border border-gray-100 shadow-[0_5px_20px_rgba(0,0,0,0.02)] hover:border-[#FF2D7A]/30 hover:shadow-[0_15px_30px_rgba(255,45,122,0.06)] transition-all duration-300"
              >
                <div className="mb-6 md:mb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{job.department}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{job.type}</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-heading font-black text-[#1B1B1B] group-hover:text-[#FF2D7A] transition-colors">{job.title}</h3>
                  <p className="text-gray-500 font-medium text-sm mt-2">{job.location}</p>
                </div>

                <a 
                  href="mailto:careers@coskinn.com"
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-gray-50 text-[#1B1B1B] rounded-full font-bold uppercase tracking-widest text-xs group-hover:bg-[#FF2D7A] group-hover:text-white transition-colors duration-300 w-max"
                >
                  Apply Now <ArrowRight size={14} />
                </a>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center text-gray-500 font-medium bg-gray-50 p-6 rounded-2xl">
            Don't see a role that fits? Send your resume to <a href="mailto:careers@coskinn.com" className="text-[#FF2D7A] font-bold">careers@coskinn.com</a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
