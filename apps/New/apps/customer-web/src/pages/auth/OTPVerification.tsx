import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const OTPVerification: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1); // Only allow 1 char
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join('').length === 4) {
      navigate('/profile-setup');
    }
  };

  const isComplete = otp.every(v => v.length === 1);

  return (
    <div className={`min-h-screen flex transition-colors duration-700 ${isGlam ? 'bg-[#faf9f6]' : 'bg-gradient-to-br from-[#ffe4e8] via-white to-[#e6f7f4]'}`}>
      
      {/* Left Side: Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12 lg:p-24 relative z-10">
        
        {/* Logo & Back button */}
        <div className="absolute top-8 left-8 sm:top-12 sm:left-12 flex items-center justify-between w-[calc(100%-4rem)]">
          <Link to="/" className="text-2xl tracking-widest font-extrabold text-[#2a2a2a] flex items-center font-display">
            COSKIN<span className={isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}>n</span>
          </Link>
          <button onClick={() => navigate('/login')} className="flex items-center text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-[2rem] shadow-2xl border border-white/50"
        >
          <div className="mb-10 text-center">
            <h1 className={`text-3xl font-extrabold mb-3 text-[#2a2a2a] ${isGlam ? 'font-serif' : 'font-display'}`}>
              Verify it's you
            </h1>
            <p className={`text-sm ${isGlam ? 'text-gray-500 font-serif' : 'text-gray-500 font-sans'}`}>
              We've sent a 4-digit code to <span className="font-bold text-gray-900">+1 (***) ***-**89</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex justify-between gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={e => handleChange(index, e.target.value)}
                  onKeyDown={e => handleKeyDown(index, e)}
                  className={`w-16 h-20 text-center text-3xl font-bold rounded-2xl bg-gray-50/50 border-2 outline-none transition-all duration-300 font-display ${
                    isGlam 
                      ? 'border-gray-200 focus:border-[#7a1b26] focus:bg-white focus:ring-4 focus:ring-[#7a1b26]/10 text-[#7a1b26]' 
                      : 'border-gray-100 focus:border-[#ff9aa8] focus:bg-white focus:ring-4 focus:ring-[#ff9aa8]/20 text-[#ff9aa8]'
                  }`}
                  placeholder="0"
                />
              ))}
            </div>

            <button 
              type="submit"
              disabled={!isComplete}
              className={`w-full group flex items-center justify-center px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                isGlam 
                  ? 'bg-[#2a2a2a] text-[#e5b376] hover:bg-black' 
                  : 'bg-[#ff9aa8] text-white hover:bg-[#ff8091] shadow-xl shadow-[#ff9aa8]/30'
              }`}
            >
              <span>Verify & Continue</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center text-sm font-sans font-semibold">
            {timer > 0 ? (
              <span className="text-gray-400">Resend code in {timer}s</span>
            ) : (
              <button onClick={() => setTimer(30)} className={`hover:underline ${isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}`}>
                Resend code now
              </button>
            )}
          </div>
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
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80" 
                alt="Glam Beauty Details" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-12 left-12 right-12 z-20">
                <div className="p-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl">
                  <h3 className="text-3xl font-serif text-white italic mb-2">"Unlock the velvet rope."</h3>
                  <p className="text-[#e5b376] font-serif uppercase tracking-widest text-xs">Maison COSKINn</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#99e6d8]/40 to-transparent z-10"></div>
              <img 
                src="https://images.pexels.com/photos/27393236/pexels-photo-27393236.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Skin Fresh Textures" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-12 left-12 right-12 z-20">
                <div className="p-8 backdrop-blur-xl bg-white/40 border border-white/60 rounded-3xl shadow-2xl">
                  <h3 className="text-3xl font-extrabold text-[#2a2a2a] mb-2 tracking-tight">Almost there, gorgeous.</h3>
                  <p className="text-[#ff9aa8] font-bold font-sans uppercase tracking-widest text-xs">Verify your number</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

    </div>
  );
};

export default OTPVerification;
