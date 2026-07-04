import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User as UserIcon, Mail, Phone, Lock, ArrowRight, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    agreed: false
  });

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    setError('');
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.mobile || !formData.password || !formData.confirmPassword) {
      return 'Please fill in all fields.';
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      return 'Please enter a valid email address.';
    }
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match.';
    }
    if (!formData.agreed) {
      return 'You must agree to the Terms & Conditions.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    try {
      await register(formData);
      setSuccessMsg('Account created successfully. Please log in to continue.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-theme-surface via-theme-surface to-theme-background flex items-center justify-center pt-32 pb-20 px-6">

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[10%] w-72 h-72 bg-white/30 rounded-full blur-[80px]"
        />
        <motion.div
          animate={{ y: [0, 40, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-theme-primary/20 rounded-full blur-[120px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[540px] bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl shadow-[0_20px_60px_rgba(43,89,104,0.08)] p-8 md:p-12 relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-[32px] md:text-[36px] font-heading font-semibold text-theme-dark tracking-tight leading-tight mb-3">
            Create an Account
          </h1>
          <p className="text-[15px] text-theme-dark/80 font-body font-medium">
            Join COSKINn to unlock exclusive premium skincare benefits.
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-50/80 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 flex items-center gap-3 text-[14px] font-medium"
          >
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        {successMsg && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-green-50/80 border border-green-100 text-green-600 px-4 py-3 rounded-xl mb-6 flex items-center gap-3 text-[14px] font-medium"
          >
            <CheckCircle2 size={18} className="shrink-0" />
            <span>{successMsg}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-theme-dark uppercase tracking-wider pl-1">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-primary" size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="w-full bg-white/70 border border-gray-300 hover:border-gray-400 focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/20 focus:bg-white rounded-2xl py-3.5 pl-11 pr-4 text-[14.5px] font-medium text-theme-dark placeholder:text-theme-primary/60 outline-none transition-all duration-300 shadow-inner shadow-white/50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-theme-dark uppercase tracking-wider pl-1">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-primary" size={10} />
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="w-full bg-white/70 border border-gray-300 hover:border-gray-400 focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/20 focus:bg-white rounded-2xl py-3.5 pl-11 pr-4 text-[14.5px] font-medium text-theme-dark placeholder:text-theme-primary/60 outline-none transition-all duration-300 shadow-inner shadow-white/50"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-theme-dark uppercase tracking-wider pl-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-primary" size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-white/70 border border-gray-300 hover:border-gray-400 focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/20 focus:bg-white rounded-2xl py-3.5 pl-11 pr-4 text-[14.5px] font-medium text-theme-dark placeholder:text-theme-primary/60 outline-none transition-all duration-300 shadow-inner shadow-white/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-theme-dark uppercase tracking-wider pl-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-primary" size={18} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  className="w-full bg-white/70 border border-gray-300 hover:border-gray-400 focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/20 focus:bg-white rounded-2xl py-3.5 pl-11 pr-4 text-[14.5px] font-medium text-theme-dark placeholder:text-theme-primary/60 outline-none transition-all duration-300 shadow-inner shadow-white/50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-theme-dark uppercase tracking-wider pl-1">Confirm Password</label>
              <div className="relative">
                <CheckCircle2 className={`absolute left-4 top-1/2 -translate-y-1/2 ${formData.confirmPassword && formData.password === formData.confirmPassword ? 'text-green-500' : 'text-theme-primary'}`} size={18} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full bg-white/70 border border-gray-300 hover:border-gray-400 focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/20 focus:bg-white rounded-2xl py-3.5 pl-11 pr-4 text-[14.5px] font-medium text-theme-dark placeholder:text-theme-primary/60 outline-none transition-all duration-300 shadow-inner shadow-white/50"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                <input
                  type="checkbox"
                  name="agreed"
                  checked={formData.agreed}
                  onChange={handleChange}
                  className="peer appearance-none w-5 h-5 border-2 border-theme-accent/40 rounded-md checked:bg-theme-accent checked:border-theme-accent transition-colors cursor-pointer"
                />
                <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[13px] leading-relaxed font-medium text-theme-dark/80 group-hover:text-theme-dark transition-colors">
                I agree to the <a href="#" className="font-bold text-theme-accent hover:underline">Terms & Conditions</a> and <a href="#" className="font-bold text-theme-accent hover:underline">Privacy Policy</a>.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex items-center justify-center gap-2 bg-theme-dark text-white hover:bg-theme-primary hover:text-theme-dark py-4 rounded-2xl text-[15px] font-bold tracking-wide transition-all duration-300 shadow-[0_10px_30px_rgba(43,89,104,0.2)] hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(43,89,104,0.3)] disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed overflow-hidden mt-2"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Create Account
                <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform ml-1" />
              </>
            )}

            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] pointer-events-none" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-theme-primary/20 text-center">
          <p className="text-[14px] text-theme-dark/80 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-theme-dark font-bold hover:text-theme-accent transition-colors inline-block relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-theme-accent after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">
              Sign in here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
