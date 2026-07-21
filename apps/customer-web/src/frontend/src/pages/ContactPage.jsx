import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MapPin, Phone, Mail, MessageCircle, 
  ChevronDown, HelpCircle, Package, HeartHandshake,
  ArrowRight, Send, Map, Navigation
} from 'lucide-react';
import Footer from '../components/common/Footer';
import heroImg from '../assets/images/contact_hero_desk.png';
import { useAuth } from '../context/AuthContext';
import apiClient from '../utils/apiClient';

export default function ContactPage() {
  const { user } = useAuth();
  const [openFaq, setOpenFaq] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Product Question',
    message: ''
  });

  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within the US. Express shipping (1-2 business days) is available at checkout. International shipping times vary by destination."
    },
    {
      question: "Are products cruelty free?",
      answer: "Yes! COSKINn is 100% cruelty-free. We never test on animals, and all our products are PETA certified."
    },
    {
      question: "Can I return products?",
      answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied with your purchase, you can return gently used products within 30 days of receipt."
    },
    {
      question: "How do I choose the correct routine?",
      answer: "Take our Skincare Quiz to get personalized recommendations, or reach out to our team of experts for a free routine consultation using the contact form above."
    },
    {
      question: "How can I contact support?",
      answer: "You can email us at support@coskinn.com, use our Live Chat, or fill out the contact form on this page. Our team typically replies within a few hours!"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    
    try {
      const userId = user?.id || "guest"; // Fallback if not logged in
      const combinedSubject = `${formState.subject} - From: ${formState.name} (${formState.email}) - Message: ${formState.message}`;
      
      await apiClient.post('/support/tickets', {
        userId,
        subject: combinedSubject,
        priority: 'NORMAL'
      });
      
      setSuccessMsg('Message Sent Successfully! We will get back to you soon.');
      setFormState({ name: '', email: '', phone: '', subject: 'Product Question', message: '' });
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FFFDFD] min-h-screen font-sans selection:bg-[#FF2D7A]/20">
      
      {/* 1. PREMIUM HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#FFF0F5] via-[#FFFDFD] to-[#FFF5F8]">
        {/* Right Side Image */}
        <div className="absolute inset-0 z-0 flex justify-end">
          <div className="w-full lg:w-[55%] h-full relative">
            <motion.img 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src={heroImg} 
              alt="COSKINn Luxury Skincare Contact Desk" 
              className="w-full h-full object-cover object-center" 
            />
            {/* Gradient Overlay for seamless blending (softened to remove harsh center line) */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDFD] via-[#FFFDFD]/60 to-transparent w-full"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDFD] via-[#FFFDFD]/80 to-transparent lg:hidden h-full"></div>

            {/* Floating Cards (Moved inside the image container so they float naturally over it) */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="hidden lg:flex absolute left-8 top-[30%] bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-[#FF2D7A]/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] items-center gap-3 z-20"
            >
              <div className="w-10 h-10 rounded-full bg-[#FFF5F8] flex items-center justify-center text-[#FF2D7A]">
                <MessageCircle size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-[#1B1B1B]">&lt; 5 min</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Average Reply</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="hidden lg:flex absolute right-12 bottom-[20%] bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-[#FF2D7A]/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] items-center gap-3 z-20"
            >
              <div className="w-10 h-10 rounded-full bg-[#FFF5F8] flex items-center justify-center text-[#FF2D7A]">
                <HeartHandshake size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-[#1B1B1B]">50K+</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Happy Customers</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Left Side Content */}
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 pt-[140px] lg:pt-[180px] pb-20 lg:pb-28">
          <div className="w-full lg:w-[50%] lg:pr-12 relative">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-400 mb-6">
                <Link to="/" className="hover:text-[#FF2D7A] transition-colors">Home</Link>
                <span>/</span>
                <span className="text-[#FF2D7A]">Contact</span>
              </div>
              
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-[#FF2D7A]/20 text-[#FF2D7A] text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
                CONTACT COSKINn
              </span>

              <h1 className="text-5xl lg:text-7xl font-heading font-black text-[#1B1B1B] leading-[1.1] mb-6 tracking-tight">
                Let's Talk <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D7A] to-[#FF8EAA] italic font-light">About Your Skin.</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 font-medium leading-relaxed max-w-md mb-10">
                Whether you need skincare advice, help with your order, or want to collaborate with COSKINn, our team is always here for you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-[#FF2D7A] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#E01B63] hover:shadow-[0_10px_30px_rgba(255,45,122,0.4)] transition-all duration-300 w-max"
                >
                  Contact Support
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CONTACT INFORMATION CARDS */}
      <section className="py-16 bg-white relative z-20 -mt-8">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: MapPin, title: "Visit Us", info: "COSKINn Studio, Indore, India", desc: "Come experience our products." },
              { icon: Phone, title: "Call Us", info: "+91 98765 43210", desc: "Mon-Sat, 9am - 6pm IST" },
              { icon: Mail, title: "Email", info: "hello@coskinn.com", desc: "We aim to reply within 24h." }
            ].map((card, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#FFFDFD] rounded-3xl p-8 border border-gray-100 hover:border-[#FF2D7A]/30 shadow-sm hover:shadow-[0_15px_40px_rgba(255,45,122,0.08)] transition-all duration-300 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-[#FFF5F8] flex items-center justify-center text-[#FF2D7A] mb-6 group-hover:scale-110 group-hover:bg-[#FF2D7A] group-hover:text-white transition-all duration-300">
                  <card.icon size={24} />
                </div>
                <h3 className="text-xl font-heading font-bold text-[#1B1B1B] mb-2">{card.title}</h3>
                <p className="text-sm font-bold text-[#FF2D7A] mb-1">{card.info}</p>
                <p className="text-sm font-medium text-gray-500">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CONTACT FORM & 4. WHY CONTACT US */}
      <section id="contact-form" className="py-16 lg:py-24 bg-[#FFFDFD]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Left: Form */}
            <div className="w-full lg:w-[55%]">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2.5rem] p-8 lg:p-12 border border-[#FF2D7A]/10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF2D7A]/5 rounded-full blur-[60px] pointer-events-none"></div>
                <h2 className="text-3xl lg:text-4xl font-heading font-black text-[#1B1B1B] mb-2 relative z-10">Send a Message</h2>
                <p className="text-gray-500 font-medium mb-10 relative z-10">Fill out the form below and we'll get back to you shortly.</p>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Full Name *</label>
                      <input 
                        type="text" required name="name" value={formState.name} onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-[#FF2D7A] focus:ring-1 focus:ring-[#FF2D7A] transition-all"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address *</label>
                      <input 
                        type="email" required name="email" value={formState.email} onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-[#FF2D7A] focus:ring-1 focus:ring-[#FF2D7A] transition-all"
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Phone Number</label>
                      <input 
                        type="tel" name="phone" value={formState.phone} onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-[#FF2D7A] focus:ring-1 focus:ring-[#FF2D7A] transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Subject *</label>
                      <div className="relative">
                        <select 
                          required name="subject" value={formState.subject} onChange={handleInputChange}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-[#FF2D7A] focus:ring-1 focus:ring-[#FF2D7A] transition-all appearance-none cursor-pointer"
                        >
                          <option>Product Question</option>
                          <option>Order Support</option>
                          <option>Returns</option>
                          <option>Collaboration</option>
                          <option>Wholesale</option>
                          <option>Other</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Message *</label>
                    <textarea 
                      required name="message" value={formState.message} onChange={handleInputChange}
                      rows="5"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-[#FF2D7A] focus:ring-1 focus:ring-[#FF2D7A] transition-all resize-none"
                      placeholder="How can we help you today?"
                    ></textarea>
                  </div>

                  {successMsg && <p className="text-green-600 font-bold text-sm">{successMsg}</p>}
                  {errorMsg && <p className="text-red-500 font-bold text-sm">{errorMsg}</p>}

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-[#FF2D7A] text-white rounded-xl py-4 font-bold uppercase tracking-widest text-sm hover:bg-[#E01B63] hover:shadow-[0_10px_30px_rgba(255,45,122,0.3)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : <><Send size={18} /> Send Message</>}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Right: Why Contact COSKINn */}
            <div className="w-full lg:w-[45%] flex flex-col justify-center">
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-4xl lg:text-5xl font-heading font-black text-[#1B1B1B] mb-4">We're Here For You.</h2>
                <p className="text-gray-600 font-medium mb-12 max-w-md">
                  At COSKINn, we believe in exceptional service. Whether you need routine advice or order help, we provide premium support.
                </p>

                <div className="space-y-8">
                  {[
                    { icon: HelpCircle, title: "Product Guidance", desc: "Not sure which serum is right for your skin type? Ask our experts." },
                    { icon: Package, title: "Order Support", desc: "Need to track, modify, or return an order? We make it hassle-free." },
                    { icon: HeartHandshake, title: "Routine Consultation", desc: "Get a personalized skincare routine tailored exactly to your needs." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-5 group">
                      <div className="w-14 h-14 shrink-0 rounded-full bg-[#FFF5F8] flex items-center justify-center text-[#FF2D7A] group-hover:scale-110 group-hover:bg-[#FF2D7A] group-hover:text-white transition-all duration-300">
                        <item.icon size={24} />
                      </div>
                      <div>
                        <h4 className="text-xl font-heading font-bold text-[#1B1B1B] mb-2">{item.title}</h4>
                        <p className="text-sm font-medium text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 lg:py-24 bg-[#FFF5F8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-black text-[#1B1B1B] mb-4">Common Questions</h2>
            <p className="text-gray-600 font-medium">Quick answers to things you might be wondering about.</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors focus:outline-none"
                >
                  <span className={`text-lg font-bold font-heading ${openFaq === idx ? 'text-[#FF2D7A]' : 'text-[#1B1B1B]'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${openFaq === idx ? 'bg-[#FF2D7A] text-white rotate-180' : 'bg-gray-100 text-gray-400'}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 text-gray-600 font-medium leading-relaxed border-t border-gray-50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. STORE LOCATION */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="bg-gray-50 rounded-[3rem] p-8 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative">
            {/* Background Map Graphic (Subtle) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <div className="w-full md:w-1/2 relative z-10">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-[#FF2D7A] mb-6">
                <MapPin size={28} />
              </div>
              <h2 className="text-4xl lg:text-5xl font-heading font-black text-[#1B1B1B] mb-4">Visit The Studio</h2>
              <p className="text-gray-600 font-medium mb-8 max-w-md leading-relaxed">
                Experience our luxury skincare in person. Test products, get expert advice, and find your perfect routine.
              </p>
              <div className="space-y-3 mb-8">
                <p className="text-[#1B1B1B] font-bold text-lg">COSKINn Studio</p>
                <p className="text-gray-500 font-medium flex items-center gap-2"><Map size={16} /> MG Road, Indore, Madhya Pradesh</p>
                <p className="text-gray-500 font-medium">Opening Hours: Mon-Sat, 10am - 8pm</p>
              </div>
              <button className="px-8 py-4 bg-gradient-to-r from-[#FF2D7A] to-[#FF8EAA] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:shadow-[0_10px_30px_rgba(255,45,122,0.3)] transition-all flex items-center gap-2 w-max">
                <Navigation size={16} /> Get Directions
              </button>
            </div>

            <div className="w-full md:w-1/2 relative z-10">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden shadow-lg border-4 border-white">
                <div className="absolute inset-0 bg-cover bg-center opacity-40 hover:opacity-100 transition-opacity duration-700 cursor-pointer" style={{ backgroundImage: `url(${heroImg})` }}></div>
                <div className="absolute inset-0 bg-[#FF2D7A]/10 mix-blend-multiply"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 bg-[#FF2D7A] rounded-full flex items-center justify-center text-white shadow-[0_0_0_8px_rgba(255,45,122,0.3)] animate-pulse">
                    <MapPin size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NEWSLETTER & 7. SOCIAL MEDIA */}
      <section className="py-16 bg-[#FFFDFD]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Newsletter */}
            <div className="bg-gradient-to-br from-[#FF2D7A] to-[#FF8EAA] rounded-[2.5rem] p-10 lg:p-14 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[60px] pointer-events-none"></div>
              <h2 className="text-3xl lg:text-4xl font-heading font-black mb-4 relative z-10">Stay Connected</h2>
              <p className="font-medium opacity-90 mb-8 relative z-10 max-w-sm">Receive skincare tips, new launches and exclusive offers directly to your inbox.</p>
              
              <form className="relative z-10 flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 bg-white/20 border border-white/30 rounded-full px-6 py-4 text-white placeholder:text-white/70 focus:outline-none focus:bg-white/30 transition-colors"
                />
                <button type="submit" className="px-8 py-4 bg-white text-[#FF2D7A] rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-colors shadow-lg">
                  Subscribe
                </button>
              </form>
            </div>

            {/* Social Media */}
            <div className="bg-gray-50 rounded-[2.5rem] p-10 lg:p-14 flex flex-col justify-center items-center text-center">
              <h2 className="text-3xl lg:text-4xl font-heading font-black text-[#1B1B1B] mb-4">Follow Our Journey</h2>
              <p className="text-gray-500 font-medium mb-10 max-w-sm">Join our community for daily skincare routines, glowing results, and behind-the-scenes.</p>
              
              <div className="flex flex-wrap justify-center gap-4">
                {['Instagram', 'Pinterest', 'Facebook', 'YouTube'].map((social, idx) => (
                  <a 
                    key={idx} 
                    href="#" 
                    className="w-16 h-16 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#1B1B1B] hover:bg-[#FF2D7A] hover:text-white hover:shadow-[0_10px_20px_rgba(255,45,122,0.3)] hover:-translate-y-1 transition-all duration-300"
                  >
                    <span className="text-xs font-bold tracking-wider uppercase">{social.slice(0,2)}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="py-24 bg-white text-center border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl lg:text-5xl font-heading font-black text-[#1B1B1B] mb-6">Still Have Questions?</h2>
          <p className="text-xl text-gray-500 font-medium mb-10">Our skincare experts are ready to help you achieve your best skin yet.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-[#FF2D7A] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#E01B63] hover:shadow-[0_10px_30px_rgba(255,45,122,0.3)] transition-all duration-300"
            >
              Contact Support
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
