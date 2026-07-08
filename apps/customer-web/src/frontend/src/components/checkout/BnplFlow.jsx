import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, ArrowLeft, CheckCircle, Smartphone, User, FileText, Zap, XCircle, CreditCard, Fingerprint } from 'lucide-react';

export default function BnplFlow({ provider, amount, onCancel, onSuccess }) {
  const [step, setStep] = useState('mobile'); 
  
  // Form States
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  
  // KYC Choice
  const [kycChoice, setKycChoice] = useState(''); // 'pan' or 'aadhaar'
  
  // PAN States
  const [kycPan, setKycPan] = useState({ name: '', dob: '', pan: '' });
  
  // Aadhaar States
  const [aadhaar, setAadhaar] = useState('');
  const [aadhaarOtp, setAadhaarOtp] = useState(['', '', '', '', '', '']);
  
  // Timer State
  const [timer, setTimer] = useState(60);
  const [aadhaarTimer, setAadhaarTimer] = useState(60);
  
  // Error States
  const [error, setError] = useState('');

  // Eligibility Checking Animations
  const [checkProgress, setCheckProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    if (step === 'kyc-aadhaar-otp' && aadhaarTimer > 0) {
      interval = setInterval(() => setAadhaarTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer, aadhaarTimer]);

  useEffect(() => {
    if (step === 'checking') {
      const steps = 6;
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        setCheckProgress(current);
        if (current >= steps) {
          clearInterval(interval);
          setTimeout(() => {
            if ((kycChoice === 'pan' && kycPan.pan.toUpperCase() === 'REJECT') || (kycChoice === 'aadhaar' && aadhaar === 'REJECT')) {
              setStep('rejected');
            } else {
              setStep('result');
            }
          }, 500);
        }
      }, 800);
      return () => clearInterval(interval);
    }
  }, [step, kycChoice, kycPan.pan, aadhaar]);

  // Mobile Handlers
  const handleMobileSubmit = (e) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setStep('otp');
    setTimer(60);
  };

  const handleOtpChange = (index, value, type = 'mobile') => {
    if (value.length > 1) return;
    if (type === 'mobile') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    } else {
      const newOtp = [...aadhaarOtp];
      newOtp[index] = value;
      setAadhaarOtp(newOtp);
      if (value && index < 5) {
        const nextInput = document.getElementById(`aotp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue === '000000') {
      setError('Invalid OTP entered. Please try again.');
      return;
    }
    if (otpValue.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }
    setError('');
    setStep('kyc-choice');
  };

  // PAN Handlers
  const handlePanSubmit = (e) => {
    e.preventDefault();
    if (!kycPan.name || !kycPan.dob || kycPan.pan.length !== 10) {
      setError('Please fill all fields correctly (PAN must be 10 characters)');
      return;
    }
    setError('');
    setStep('kyc-pan-verifying');
    setTimeout(() => {
      setStep('checking');
    }, 2000);
  };

  // Aadhaar Handlers
  const handleAadhaarSubmit = (e) => {
    e.preventDefault();
    if (aadhaar.length !== 12 && aadhaar !== 'REJECT') {
      setError('Please enter a valid 12-digit Aadhaar number');
      return;
    }
    setError('');
    setStep('kyc-aadhaar-otp');
    setAadhaarTimer(60);
  };

  const handleAadhaarOtpSubmit = (e) => {
    e.preventDefault();
    const otpValue = aadhaarOtp.join('');
    if (otpValue === '000000') {
      setError('Invalid OTP entered. Please try again.');
      return;
    }
    if (otpValue.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }
    setError('');
    setStep('kyc-aadhaar-verifying');
    setTimeout(() => {
      setStep('checking');
    }, 2000);
  };

  const handleAuthorization = () => {
    setStep('authorizing');
    setTimeout(() => {
      onSuccess({
        provider,
        creditLimit: 50000,
        remainingLimit: 50000 - amount,
        nextDueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
      });
    }, 3000);
  };

  const checklistItems = [
    "Mobile Number Verified",
    "OTP Verified",
    "Identity Verified",
    "Credit Assessment",
    "Eligibility Check",
    "Final Approval"
  ];

  return (
    <div className="fixed inset-0 bg-white z-[9999] overflow-y-auto selection:bg-theme-secondary selection:text-theme-dark font-sans flex flex-col">
      {/* BNPL Header */}
      <div className="w-full bg-[#fafafa] border-b border-black/5 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={onCancel} className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-black/70" />
          </button>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-theme-primary" />
            <span className="font-bold text-lg">{provider} Secure Checkout</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-black/50 uppercase tracking-widest hidden md:flex">
          <Lock className="w-4 h-4 text-green-500" /> End-to-End Encrypted
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white min-h-[600px]">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            
            {/* Step: Mobile */}
            {step === 'mobile' && (
              <motion.div key="mobile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-theme-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="w-8 h-8 text-theme-primary" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold mb-2">Verify Mobile Number</h2>
                  <p className="text-black/60 text-sm">Enter your 10-digit mobile number registered with {provider}.</p>
                </div>
                <form onSubmit={handleMobileSubmit} className="flex flex-col gap-4">
                  <div>
                    <div className="flex bg-[#fafafa] border border-black/10 rounded-xl overflow-hidden focus-within:border-theme-primary focus-within:ring-1 focus-within:ring-theme-primary transition-all">
                      <div className="px-4 py-4 border-r border-black/10 text-black/60 font-bold bg-white">+91</div>
                      <input 
                        type="tel" 
                        maxLength="10" 
                        value={mobile} 
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-4 py-4 focus:outline-none bg-transparent font-medium tracking-wider" 
                        placeholder="Enter mobile number" 
                        autoFocus
                      />
                    </div>
                    {error && <p className="text-red-500 text-xs font-bold mt-2 ml-1">{error}</p>}
                  </div>
                  <button type="submit" disabled={mobile.length !== 10} className="w-full py-4 bg-theme-primary text-white font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-pink-700 transition-colors disabled:opacity-50 mt-2">
                    Continue
                  </button>
                </form>
              </motion.div>
            )}

            {/* Step: OTP */}
            {step === 'otp' && (
              <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-heading font-bold mb-2">Enter OTP</h2>
                  <p className="text-black/60 text-sm">We've sent a 6-digit code to <span className="font-bold text-black">+91 {mobile}</span></p>
                  <p className="text-xs text-black/40 mt-1">(Enter '000000' to test failure state)</p>
                </div>
                <form onSubmit={handleOtpSubmit} className="flex flex-col gap-6">
                  <div>
                    <div className="flex justify-between gap-2">
                      {otp.map((digit, index) => (
                        <input 
                          key={index}
                          id={`otp-${index}`}
                          type="text" 
                          maxLength="1" 
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''), 'mobile')}
                          onKeyDown={(e) => {
                            if (e.key === 'Backspace' && !digit && index > 0) {
                              document.getElementById(`otp-${index - 1}`).focus();
                            }
                          }}
                          className="w-12 h-14 text-center text-xl font-bold bg-[#fafafa] border border-black/10 rounded-xl focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary transition-all" 
                        />
                      ))}
                    </div>
                    {error && <p className="text-red-500 text-xs font-bold mt-2 text-center">{error}</p>}
                  </div>
                  <div className="text-center text-sm font-bold">
                    {timer > 0 ? (
                      <span className="text-black/50">Resend OTP in <span className="text-theme-primary">{timer}s</span></span>
                    ) : (
                      <button type="button" onClick={() => setTimer(60)} className="text-theme-primary hover:underline">Resend OTP</button>
                    )}
                  </div>
                  <button type="submit" disabled={otp.join('').length !== 6} className="w-full py-4 bg-theme-primary text-white font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-pink-700 transition-colors disabled:opacity-50">
                    Verify OTP
                  </button>
                </form>
              </motion.div>
            )}

            {/* Step: KYC Choice */}
            {step === 'kyc-choice' && (
              <motion.div key="kyc-choice" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold mb-2">Verify Your Identity</h2>
                  <p className="text-black/60 text-sm">Choose one verification method below to proceed with your eligibility check.</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6 flex gap-3 items-start">
                  <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-800 font-medium leading-relaxed">
                    <strong>Privacy Notice:</strong> COSKINn does <span className="underline">not</span> store your PAN or Aadhaar details. This information is securely transmitted directly to <strong>{provider}</strong> for verification.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => { setKycChoice('pan'); setStep('kyc-pan'); }}
                    className="w-full p-6 border-2 border-black/10 rounded-2xl hover:border-theme-primary hover:bg-theme-primary/5 transition-all text-left flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-[#fafafa] group-hover:bg-white rounded-full flex items-center justify-center shrink-0">
                      <CreditCard className="w-6 h-6 text-black/70 group-hover:text-theme-primary transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-black group-hover:text-theme-primary transition-colors">Verify using PAN Card</h4>
                      <p className="text-sm text-black/50 font-medium">Instant verification using your PAN details</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => { setKycChoice('aadhaar'); setStep('kyc-aadhaar-input'); }}
                    className="w-full p-6 border-2 border-black/10 rounded-2xl hover:border-theme-primary hover:bg-theme-primary/5 transition-all text-left flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-[#fafafa] group-hover:bg-white rounded-full flex items-center justify-center shrink-0">
                      <Fingerprint className="w-6 h-6 text-black/70 group-hover:text-theme-primary transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-black group-hover:text-theme-primary transition-colors">Verify using Aadhaar Card</h4>
                      <p className="text-sm text-black/50 font-medium">Secure verification via Aadhaar OTP</p>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step: KYC PAN */}
            {step === 'kyc-pan' && (
              <motion.div key="kyc-pan" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex items-center gap-4 mb-8">
                  <button onClick={() => setStep('kyc-choice')} className="p-2 bg-[#fafafa] rounded-full hover:bg-black/5 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-black/70" />
                  </button>
                  <h2 className="text-2xl font-heading font-bold">PAN Verification</h2>
                </div>
                
                <form onSubmit={handlePanSubmit} className="flex flex-col gap-4">
                  <input 
                    type="text" 
                    placeholder="Full Name (as per PAN)" 
                    value={kycPan.name}
                    onChange={(e) => setKycPan({...kycPan, name: e.target.value})}
                    className="w-full px-5 py-4 bg-[#fafafa] border border-black/10 rounded-xl focus:outline-none focus:border-theme-primary transition-all font-medium" 
                  />
                  <input 
                    type="date" 
                    placeholder="Date of Birth" 
                    value={kycPan.dob}
                    onChange={(e) => setKycPan({...kycPan, dob: e.target.value})}
                    className="w-full px-5 py-4 bg-[#fafafa] border border-black/10 rounded-xl focus:outline-none focus:border-theme-primary transition-all font-medium text-black/70" 
                  />
                  <div>
                    <input 
                      type="text" 
                      placeholder="PAN Number" 
                      maxLength="10"
                      value={kycPan.pan}
                      onChange={(e) => setKycPan({...kycPan, pan: e.target.value.toUpperCase()})}
                      className="w-full px-5 py-4 bg-[#fafafa] border border-black/10 rounded-xl focus:outline-none focus:border-theme-primary transition-all font-medium tracking-widest uppercase" 
                    />
                    <p className="text-[10px] text-black/40 mt-1 ml-2">Enter 'REJECT' to simulate eligibility failure.</p>
                  </div>
                  
                  {error && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{error}</p>}
                  
                  <button type="submit" className="w-full py-4 mt-4 bg-theme-primary text-white font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-pink-700 transition-colors">
                    Continue
                  </button>
                </form>
              </motion.div>
            )}

            {/* Step: Verifying PAN */}
            {step === 'kyc-pan-verifying' && (
              <motion.div key="kyc-pan-verifying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-10">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="absolute inset-0 rounded-full border-4 border-black/5 border-t-theme-primary" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-theme-primary" />
                  </div>
                </div>
                <h2 className="text-xl font-heading font-bold mb-2">Verifying PAN...</h2>
                <p className="text-black/50 text-sm">Securely connecting to NSDL</p>
              </motion.div>
            )}

            {/* Step: KYC Aadhaar Input */}
            {step === 'kyc-aadhaar-input' && (
              <motion.div key="kyc-aadhaar-input" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex items-center gap-4 mb-8">
                  <button onClick={() => setStep('kyc-choice')} className="p-2 bg-[#fafafa] rounded-full hover:bg-black/5 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-black/70" />
                  </button>
                  <h2 className="text-2xl font-heading font-bold">Aadhaar Verification</h2>
                </div>
                
                <form onSubmit={handleAadhaarSubmit} className="flex flex-col gap-4">
                  <div className="text-center mb-6">
                    <Fingerprint className="w-12 h-12 text-black/20 mx-auto mb-4" />
                    <p className="text-black/60 text-sm">Enter your 12-digit Aadhaar number to receive a verification OTP on your registered mobile number.</p>
                  </div>
                  <div>
                    <input 
                      type="text" 
                      placeholder="XXXX XXXX XXXX" 
                      maxLength="12"
                      value={aadhaar}
                      onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-5 py-4 bg-[#fafafa] border border-black/10 rounded-xl focus:outline-none focus:border-theme-primary transition-all font-bold tracking-[0.2em] text-center text-lg" 
                    />
                    <p className="text-[10px] text-black/40 mt-2 text-center">Enter 'REJECT' for failure simulation if needed.</p>
                  </div>
                  
                  {error && <p className="text-red-500 text-xs font-bold mt-1 text-center">{error}</p>}
                  
                  <button type="submit" disabled={aadhaar.length !== 12 && aadhaar !== 'REJECT'} className="w-full py-4 mt-2 bg-theme-primary text-white font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-pink-700 transition-colors disabled:opacity-50">
                    Send Aadhaar OTP
                  </button>
                </form>
              </motion.div>
            )}

            {/* Step: KYC Aadhaar OTP */}
            {step === 'kyc-aadhaar-otp' && (
              <motion.div key="kyc-aadhaar-otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex items-center gap-4 mb-6">
                  <button onClick={() => { setStep('kyc-aadhaar-input'); setAadhaarOtp(['','','','','','']); setError(''); }} className="p-2 bg-[#fafafa] rounded-full hover:bg-black/5 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-black/70" />
                  </button>
                  <h2 className="text-2xl font-heading font-bold">Aadhaar OTP</h2>
                </div>
                <div className="text-center mb-8">
                  <p className="text-black/60 text-sm">Enter the 6-digit OTP sent to your Aadhaar-linked mobile number.</p>
                  <p className="text-xs text-black/40 mt-1">(Enter '000000' to test invalid OTP)</p>
                </div>
                <form onSubmit={handleAadhaarOtpSubmit} className="flex flex-col gap-6">
                  <div>
                    <div className="flex justify-between gap-2">
                      {aadhaarOtp.map((digit, index) => (
                        <input 
                          key={index}
                          id={`aotp-${index}`}
                          type="text" 
                          maxLength="1" 
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''), 'aadhaar')}
                          onKeyDown={(e) => {
                            if (e.key === 'Backspace' && !digit && index > 0) {
                              document.getElementById(`aotp-${index - 1}`).focus();
                            }
                          }}
                          className="w-12 h-14 text-center text-xl font-bold bg-[#fafafa] border border-black/10 rounded-xl focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary transition-all" 
                        />
                      ))}
                    </div>
                    {error && <p className="text-red-500 text-xs font-bold mt-2 text-center">{error}</p>}
                  </div>
                  <div className="text-center text-sm font-bold">
                    {aadhaarTimer > 0 ? (
                      <span className="text-black/50">Resend OTP in <span className="text-theme-primary">{aadhaarTimer}s</span></span>
                    ) : (
                      <button type="button" onClick={() => setAadhaarTimer(60)} className="text-theme-primary hover:underline">Resend OTP</button>
                    )}
                  </div>
                  <button type="submit" disabled={aadhaarOtp.join('').length !== 6} className="w-full py-4 bg-theme-primary text-white font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-pink-700 transition-colors disabled:opacity-50">
                    Verify OTP
                  </button>
                </form>
              </motion.div>
            )}

            {/* Step: Verifying Aadhaar */}
            {step === 'kyc-aadhaar-verifying' && (
              <motion.div key="kyc-aadhaar-verifying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-10">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-xl font-heading font-bold mb-2">Aadhaar Verified Successfully</h2>
                <p className="text-black/50 text-sm">Proceeding to eligibility check...</p>
              </motion.div>
            )}

            {/* Step: Checking Eligibility Loader */}
            {step === 'checking' && (
              <motion.div key="checking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-sm mx-auto">
                <div className="text-center mb-8">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute inset-0 rounded-full border-4 border-black/5 border-t-theme-primary" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-theme-primary" />
                    </div>
                  </div>
                  <h2 className="text-xl font-heading font-bold mb-2">Checking Eligibility...</h2>
                  <p className="text-black/50 text-sm">Please do not close this window</p>
                </div>

                <div className="space-y-4">
                  {checklistItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${checkProgress > index ? 'bg-green-500 text-white' : 'bg-black/5 text-transparent'}`}>
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className={`text-sm font-bold transition-colors duration-300 ${checkProgress > index ? 'text-black' : 'text-black/30'}`}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step: Rejected Result */}
            {step === 'rejected' && (
              <motion.div key="rejected" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <XCircle className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="text-3xl font-heading font-bold mb-4">Not Eligible</h2>
                <p className="text-black/60 text-base mb-8 max-w-xs mx-auto">
                  You are currently not eligible for Buy Now Pay Later with {provider} based on the provided KYC details.
                </p>
                <div className="flex flex-col gap-3">
                  <button onClick={onCancel} className="w-full py-4 bg-theme-primary text-white font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-pink-700 transition-colors">
                    Choose Another Payment Method
                  </button>
                  <button onClick={onCancel} className="w-full py-4 bg-white border border-black/10 text-black font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-[#fafafa] transition-colors">
                    Back to Checkout
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step: Success Result */}
            {step === 'result' && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-heading font-bold mb-2">Congratulations!</h2>
                <p className="text-black/60 text-sm mb-8">Your Buy Now Pay Later request has been approved.</p>
                
                <div className="bg-[#fafafa] border border-black/10 rounded-2xl p-6 mb-8 text-left">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-black/50 font-bold text-xs uppercase tracking-wider">Provider</span>
                    <span className="font-black text-black">{provider}</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-black/70 font-medium">Available Limit</span>
                      <span className="font-bold text-lg">₹50,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-black/70 font-medium">Current Purchase</span>
                      <span className="font-bold text-lg text-theme-primary">- ₹{amount.toFixed(2)}</span>
                    </div>
                    <div className="h-px bg-black/10 w-full"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-black/70 font-medium">Remaining Limit</span>
                      <span className="font-bold text-xl text-green-600">₹{(50000 - amount).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button onClick={() => setStep('confirm')} className="w-full py-4 bg-theme-primary text-white font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-pink-700 transition-colors shadow-lg">
                  Continue to Purchase
                </button>
              </motion.div>
            )}

            {/* Step: Purchase Confirmation */}
            {step === 'confirm' && (
              <motion.div key="confirm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-left">
                <h2 className="text-2xl font-heading font-bold mb-6 text-center">Confirm Purchase</h2>
                
                <div className="bg-white border border-black/10 rounded-2xl p-6 mb-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-black/60 font-medium text-sm">Order Total</span>
                    <span className="font-black text-2xl">₹{amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-black/60 font-medium text-sm">BNPL Provider</span>
                    <span className="font-bold text-sm bg-black/5 px-3 py-1 rounded-full">{provider}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-black/60 font-medium text-sm">Interest / Charges</span>
                    <span className="font-bold text-sm text-green-500">0% (₹0)</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-black/5">
                    <span className="text-black/60 font-medium text-sm">Repayment Due Date</span>
                    <span className="font-bold text-sm text-theme-primary">
                      {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                <label className="flex items-start gap-3 mb-8 cursor-pointer group">
                  <input type="checkbox" required id="tnc" className="mt-1 w-4 h-4 accent-theme-primary cursor-pointer" />
                  <span className="text-xs text-black/60 leading-relaxed group-hover:text-black transition-colors">
                    I authorize {provider} to pay COSKINn ₹{amount.toFixed(2)} on my behalf. I agree to repay {provider} by the due date as per their Terms & Conditions.
                  </span>
                </label>

                <button onClick={() => {
                  if (document.getElementById('tnc').checked) {
                    handleAuthorization();
                  } else {
                    alert("Please accept the terms and conditions to proceed.");
                  }
                }} className="w-full py-4 bg-theme-primary text-white font-bold uppercase tracking-widest text-sm rounded-xl shadow-lg hover:bg-pink-700/90 transition-colors">
                  Authorize Purchase
                </button>
              </motion.div>
            )}

            {/* Step: Authorizing Loader */}
            {step === 'authorizing' && (
              <motion.div key="authorizing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-8">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="absolute inset-0 rounded-full border-4 border-black/5 border-t-theme-primary" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-theme-primary" />
                  </div>
                </div>
                <h2 className="text-2xl font-heading font-bold mb-3">Authorizing Payment...</h2>
                <p className="text-black/50 text-sm mb-6">Connecting securely to {provider}</p>
                <div className="w-full h-1 bg-black/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.8, ease: "easeInOut" }}
                    className="h-full bg-theme-primary"
                  />
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
