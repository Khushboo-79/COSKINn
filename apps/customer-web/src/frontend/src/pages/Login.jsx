import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Mail, Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

export default function Login() {
  const { theme } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }
    
    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate('/');
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
          animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[15%] w-64 h-64 bg-white/20 rounded-full blur-[80px]"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[15%] w-80 h-80 bg-theme-secondary/40 rounded-full blur-[100px]"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[480px] bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl shadow-[0_20px_60px_rgba(43,89,104,0.08)] p-10 md:p-12 relative z-10"
      >
        <div className="text-center mb-10">
          <h1 className="text-[32px] md:text-[38px] font-heading font-semibold text-theme-dark tracking-tight leading-tight mb-3">
            Welcome Back
          </h1>
          <p className="text-[16px] text-theme-dark/80 font-body font-medium">
            Sign in to access your premium skincare experience.
          </p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-50/80 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 flex items-center gap-3 text-[14px] font-medium"
          >
            <AlertCircle size={18} />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-theme-dark uppercase tracking-wider pl-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-primary" size={20} />
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-white/70 border border-gray-300 hover:border-gray-400 focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/20 focus:bg-white rounded-2xl py-4 pl-12 pr-4 text-[15px] font-medium text-theme-dark placeholder:text-theme-primary/60 outline-none transition-all duration-300 shadow-inner shadow-white/50"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-theme-dark uppercase tracking-wider pl-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-primary" size={20} />
              <input 
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-white/70 border border-gray-300 hover:border-gray-400 focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/20 focus:bg-white rounded-2xl py-4 pl-12 pr-4 text-[15px] font-medium text-theme-dark placeholder:text-theme-primary/60 outline-none transition-all duration-300 shadow-inner shadow-white/50"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-theme-accent/40 rounded-md checked:bg-theme-accent checked:border-theme-accent transition-colors cursor-pointer" />
                <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[14px] font-medium text-theme-dark/80 group-hover:text-theme-dark transition-colors">Remember Me</span>
            </label>
            <a href="#" className="text-[14px] font-bold text-theme-accent hover:text-theme-dark transition-colors">Forgot Password?</a>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="group relative w-full flex items-center justify-center gap-2 bg-theme-dark text-white hover:bg-theme-primary hover:text-theme-dark py-4 rounded-2xl text-[15px] font-bold tracking-wide transition-all duration-300 shadow-[0_10px_30px_rgba(43,89,104,0.2)] hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(43,89,104,0.3)] disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed overflow-hidden mt-4"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Sign In
                <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform ml-1" />
              </>
            )}
            
            {/* Button Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] pointer-events-none" />
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-theme-primary/20 text-center">
          <p className="text-[15px] text-theme-dark/80 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="text-theme-dark font-bold hover:text-theme-accent transition-colors inline-block relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-theme-accent after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">
              Register now
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
