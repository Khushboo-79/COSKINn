import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Edit2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const CoskinnLogo = ({ fill = "black" }) => (
  <svg className="h-[36px] w-[135px] lg:h-[42px] lg:w-[158px] object-contain drop-shadow-sm" viewBox="0 0 450 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="coskinn-logo-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FF0069" />
        <stop offset="35%" stopColor="#FF6B6B" />
        <stop offset="70%" stopColor="#FFA07A" />
        <stop offset="100%" stopColor="#FFD498" />
      </linearGradient>
    </defs>
    <path d="M 72 20 A 8 8 0 1 1 62 30 C 52 20, 35 30, 30 55 C 25 80, 40 95, 60 95 C 70 95, 85 82, 85 82 C 85 82, 95 92, 75 105 C 45 118, 10 105, 8 60 C 5 15, 45 2, 72 20 Z" fill="url(#coskinn-logo-grad)" />
    <path d="M 75 92 C 75 92, 65 82, 65 74 A 6 6 0 0 1 75 70 A 6 6 0 0 1 85 74 C 85 82, 75 92, 75 92 Z" stroke="url(#coskinn-logo-grad)" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <text x="105" y="95" fontFamily="var(--font-heading)" fill={fill}>
      <tspan fontSize="85" fontWeight="600" letterSpacing="2">OSKIN</tspan>
      <tspan fontSize="65" fontWeight="600">n</tspan>
    </text>
    <path d="M 280 40 C 280 40, 266 28, 266 18 A 7 7 0 0 1 280 15 A 7 7 0 0 1 294 18 C 294 28, 280 40, 280 40 Z" fill="url(#coskinn-logo-grad)" />
  </svg>
);

export default function AuthModal({ isOpen, onClose }) {
  const { sendMobileOtp, verifyMobileOtp } = useAuth();
  const { theme } = useTheme();
  
  const [step, setStep] = useState('MOBILE'); // MOBILE, OTP
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']); // Changed to 4 digits for OTP
  
  const [countdown, setCountdown] = useState(30);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const otpRefs = useRef([]);

  useEffect(() => {
    if (isOpen) {
      setStep('MOBILE');
      setMobile('');
      setOtp(['', '', '', '']);
      setCountdown(30);
      setLoading(false);
      setErrorMsg('');
    }
  }, [isOpen]);

  useEffect(() => {
    let timer;
    if (step === 'OTP' && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown, step]);

  if (!isOpen) return null;

  const handleMobileSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (mobile.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    
    try {
      await sendMobileOtp(mobile);
      setLoading(false);
      setStep('OTP');
      setCountdown(30);
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    }
  };

  const handleOtpChange = (index, value) => {
    setErrorMsg('');
    const arr = [...otp];
    if (value.length > 1) {
      const pastedData = value.slice(0, 4).split('');
      for (let i = 0; i < pastedData.length; i++) {
        if (i + index < 4) arr[i + index] = pastedData[i];
      }
      setOtp(arr);
      const nextIndex = Math.min(index + pastedData.length, 3);
      otpRefs.current[nextIndex]?.focus();
      return;
    }
    arr[index] = value;
    setOtp(arr);
    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (otp.join('').length === 4) {
      setLoading(true);
      try {
        await verifyMobileOtp(mobile, otp.join(''));
        setLoading(false);
        onClose();
      } catch (err) {
        setLoading(false);
        setErrorMsg(err.response?.data?.message || 'Invalid or expired OTP.');
      }
    }
  };

  const handleResendOtp = async () => {
    setCountdown(30);
    setErrorMsg('');
    try {
      await sendMobileOtp(mobile);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to resend OTP.');
    }
  };

  const primaryClass = theme === 'skincare' ? "btn-primary-skincare !shadow-md" : "bg-theme-primary text-white";
  const primaryHoverClass = theme === 'skincare' ? "" : "hover:bg-theme-primary/90";
  const disabledClass = "bg-gray-100 text-gray-400 cursor-not-allowed";
  const textPrimaryClass = "text-theme-primary";

  const renderError = () => {
    if (!errorMsg) return null;
    return (
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mt-3 text-red-500 text-sm font-medium bg-red-50 p-3 rounded-xl border border-red-100">
        <AlertCircle size={16} className="flex-shrink-0" />
        <span className="leading-tight">{errorMsg}</span>
      </motion.div>
    );
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[850px] bg-white rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.2)] overflow-y-auto max-h-[90vh] md:max-h-none md:overflow-hidden flex flex-col md:flex-row md:min-h-[500px]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-black/60 hover:text-black transition-colors"
        >
          <X size={18} />
        </button>

        {/* Left Side: Banner */}
        <div className="hidden md:flex w-[45%] relative bg-gray-50 flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-theme-secondary/20 to-theme-primary/10 z-10" />
          <img loading="lazy" src="/mockup_product_1.webp" alt="Coskinn Banner" className="absolute inset-0 w-full h-full object-cover opacity-90 scale-105" />
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          
          <div className="relative z-20 flex flex-col items-center text-center p-10 mt-auto w-full">
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg mb-6 w-full flex justify-center">
              <CoskinnLogo fill="black" />
            </div>
            <h2 className="text-white font-heading text-3xl mb-2 font-light">Welcome to COSKINn</h2>
            <p className="text-white/80 font-body text-sm tracking-wide uppercase">Luxury Beauty Starts Here</p>
          </div>
        </div>

        {/* Right Side: Forms */}
        <div className="flex-1 p-6 sm:p-8 md:p-12 flex flex-col justify-center relative font-body">
          <AnimatePresence mode="wait">
            
            {step === 'MOBILE' && (
              <motion.div
                key="mobile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col"
              >
                <div className="md:hidden flex justify-center mb-6">
                  <CoskinnLogo fill="black" />
                </div>
                <h3 className="text-2xl font-heading font-medium text-black mb-2">Login or Signup</h3>
                <p className="text-gray-500 text-sm mb-8">Enter your mobile number to get started.</p>
                
                <form onSubmit={handleMobileSubmit} className="flex flex-col gap-6">
                  <div className="relative group">
                    <label className="absolute -top-2.5 left-4 bg-white px-1 text-xs font-semibold text-gray-500 z-10 transition-colors group-focus-within:text-theme-primary">
                      Mobile Number
                    </label>
                    <div className="flex items-center w-full border border-gray-300 rounded-xl overflow-hidden focus-within:border-theme-primary focus-within:ring-1 focus-within:ring-theme-primary transition-all">
                      <div className="flex items-center gap-1 bg-gray-50 px-4 py-4 border-r border-gray-300 text-gray-700 font-medium">
                        <span className="text-lg">🇮🇳</span>
                        <span>+91</span>
                      </div>
                      <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => {
                          setMobile(e.target.value.replace(/\D/g, '').slice(0, 10));
                          setErrorMsg('');
                        }}
                        placeholder="Enter 10 digit number"
                        className="flex-1 py-4 px-4 outline-none text-gray-900 font-medium bg-transparent"
                        autoFocus
                      />
                    </div>
                  </div>

                  {renderError()}

                  <button
                    type="submit"
                    disabled={mobile.length !== 10 || loading}
                    className={`w-full py-4 rounded-xl font-bold tracking-wide transition-all flex items-center justify-center gap-2 mt-4 ${mobile.length === 10 ? `${primaryClass} ${primaryHoverClass} shadow-md` : disabledClass}`}
                  >
                    {loading ? 'Processing...' : 'Get OTP'} <ArrowRight size={18} />
                  </button>
                  
                  <p className="text-xs text-center text-gray-400 mt-2 leading-relaxed">
                    By continuing, you agree to our <a href="#" className="underline hover:text-black transition-colors">Terms of Service</a> and <a href="#" className="underline hover:text-black transition-colors">Privacy Policy</a>.
                  </p>
                </form>
              </motion.div>
            )}

            {step === 'OTP' && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col"
              >
                <h3 className="text-2xl font-heading font-medium text-black mb-2">Verify Mobile</h3>
                <div className="flex flex-col gap-1 mb-8">
                  <div className="flex items-center gap-2">
                    <p className="text-gray-500 text-sm">OTP sent to +91 {mobile}</p>
                    <button onClick={() => setStep('MOBILE')} className="text-gray-400 hover:text-black p-1 transition-colors">
                      <Edit2 size={14} />
                    </button>
                  </div>
                </div>
                
                <form onSubmit={handleOtpSubmit} className="flex flex-col gap-8">
                  <div className="flex justify-center gap-2 sm:gap-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={4}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className={`w-11 h-11 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-bold border rounded-xl outline-none transition-all ${digit ? 'border-theme-primary ring-1 ring-theme-primary/50 text-black' : 'border-gray-300 focus:border-theme-primary focus:ring-1 focus:ring-theme-primary text-gray-900'}`}
                      />
                    ))}
                  </div>

                  {renderError()}

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      {countdown > 0 ? (
                        <>Resend OTP in <span className="font-bold text-gray-900">{countdown}s</span></>
                      ) : (
                        <button type="button" onClick={handleResendOtp} className={`font-bold ${textPrimaryClass} hover:underline`}>
                          Resend OTP
                        </button>
                      )}
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={otp.join('').length !== 4 || loading}
                    className={`w-full py-4 rounded-xl font-bold tracking-wide transition-all flex items-center justify-center gap-2 ${otp.join('').length === 4 ? `${primaryClass} ${primaryHoverClass} shadow-md` : disabledClass}`}
                  >
                    {loading ? 'Verifying...' : 'Verify & Proceed'} <ArrowRight size={18} />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
