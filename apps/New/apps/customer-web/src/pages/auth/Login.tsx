import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      navigate('/verify-otp');
    }
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-700 ${isGlam ? 'bg-[#faf9f6]' : 'bg-gradient-to-br from-[#ffe4e8] via-white to-[#e6f7f4]'}`}>
      
      {/* Left Side: Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12 lg:p-24 relative z-10">
        
        {/* Logo */}
        <div className="absolute top-8 left-8 sm:top-12 sm:left-12">
          <Link to="/" className="text-2xl tracking-widest font-extrabold text-[#2a2a2a] flex items-center font-display">
            COSKIN<span className={isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}>n</span>
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-[2rem] shadow-2xl border border-white/50"
        >
          <div className="mb-8 text-center">
            <h1 className={`text-3xl font-extrabold mb-3 text-[#2a2a2a] ${isGlam ? 'font-serif' : 'font-display'}`}>
              {isGlam ? 'Enter the Atelier.' : 'Welcome back, beautiful.'}
            </h1>
            <p className={`text-sm ${isGlam ? 'text-gray-500 font-serif' : 'text-gray-500 font-sans'}`}>
              Enter your mobile number to sign in or create an account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 font-display">
                Mobile Number
              </label>
              <div className="relative flex items-center group">
                <div className={`absolute left-4 z-10 flex items-center ${isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}`}>
                  <Phone size={18} />
                  <span className="ml-2 font-bold text-gray-700">+1</span>
                  <div className="h-5 w-px bg-gray-200 mx-3"></div>
                </div>
                <input 
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className={`w-full pl-24 pr-4 py-4 bg-gray-50/50 border-2 rounded-2xl outline-none transition-all duration-300 font-sans font-semibold text-lg text-gray-800 ${
                    isGlam 
                      ? 'border-gray-200 focus:border-[#7a1b26] focus:bg-white focus:ring-4 focus:ring-[#7a1b26]/10' 
                      : 'border-gray-100 focus:border-[#ff9aa8] focus:bg-white focus:ring-4 focus:ring-[#ff9aa8]/20'
                  }`}
                  placeholder="000 000 0000"
                  maxLength={10}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={phone.length < 10}
              className={`w-full group flex items-center justify-center px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                isGlam 
                  ? 'bg-[#2a2a2a] text-[#e5b376] hover:bg-black' 
                  : 'bg-[#ff9aa8] text-white hover:bg-[#ff8091] shadow-xl shadow-[#ff9aa8]/30'
              }`}
            >
              <span>Continue</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-8 text-center text-[10px] text-gray-400 font-sans">
            By continuing, you agree to COSKINn's <a href="#" className="underline hover:text-gray-800">Terms of Service</a> and <a href="#" className="underline hover:text-gray-800">Privacy Policy</a>.
          </p>
        </motion.div>
      </div>

      {/* Right Side: Image */}
      <div className="hidden md:block w-1/2 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {isGlam ? (
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-black/10 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80" 
                alt="Glam Beauty" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-12 left-12 right-12 z-20">
                <div className="p-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl">
                  <h3 className="text-3xl font-serif text-white italic mb-2">"True beauty is an art form."</h3>
                  <p className="text-[#e5b376] font-serif uppercase tracking-widest text-xs">Maison COSKINn</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#ff9aa8]/40 to-transparent z-10"></div>
              <img 
                src="https://images.pexels.com/photos/8101534/pexels-photo-8101534.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Skin Fresh" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-12 left-12 right-12 z-20">
                <div className="p-8 backdrop-blur-xl bg-white/40 border border-white/60 rounded-3xl shadow-2xl">
                  <h3 className="text-3xl font-extrabold text-[#2a2a2a] mb-2 tracking-tight">Juicy skin starts here.</h3>
                  <p className="text-[#ff9aa8] font-bold font-sans uppercase tracking-widest text-xs">Join the club</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

    </div>
  );
};

export default Login;
