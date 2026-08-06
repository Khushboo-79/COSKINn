import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight, ArrowLeft, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const PasswordVerification: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginWithToken } = useAuth();

  const email = location.state?.email || '';
  const authMode = location.state?.authMode || 'signin';

  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setError('');
    setIsLoading(true);
    try {
      const res = await api.post('/auth/login', {
        email,
        password
      });

      if (res.data?.token) {
        loginWithToken(res.data.token, res.data.user);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
              Welcome back
            </h1>
            <p className={`text-sm ${isGlam ? 'text-gray-500 font-serif' : 'text-gray-500 font-sans'}`}>
              Enter your password for {email}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 font-display">
                Password
              </label>
              <div className="relative flex items-center group">
                <div className={`absolute left-4 z-10 flex items-center ${isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}`}>
                  <KeyRound size={18} />
                  <div className="h-5 w-px bg-gray-200 mx-3"></div>
                </div>
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-14 pr-4 py-4 bg-gray-50/50 border-2 rounded-2xl outline-none transition-all duration-300 font-sans font-semibold text-lg text-gray-800 ${
                    isGlam 
                      ? 'border-gray-200 focus:border-[#7a1b26] focus:bg-white focus:ring-4 focus:ring-[#7a1b26]/10' 
                      : 'border-gray-100 focus:border-[#ff9aa8] focus:bg-white focus:ring-4 focus:ring-[#ff9aa8]/20'
                  }`}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm font-bold text-center mt-2">{error}</p>
            )}

            <button 
              type="submit"
              disabled={!password || isLoading}
              className={`w-full group flex items-center justify-center px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                isGlam 
                  ? 'bg-[#2a2a2a] text-[#e5b376] hover:bg-black' 
                  : 'bg-[#ff9aa8] text-white hover:bg-[#ff8091] shadow-xl shadow-[#ff9aa8]/30'
              }`}
            >
              <span>{authMode === 'signup' ? 'Create Account' : 'Sign In'}</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

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
                src="https://www.dotandkey.com/cdn/shop/files/1-175.jpg" 
                alt="Glam Beauty Details" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-12 left-12 right-12 z-20">
                <div className="p-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl">
                  <h3 className="text-3xl font-serif text-white italic mb-2">"Unlock the velvet rope."</h3>
                  <p className="text-[#e5b376] font-serif uppercase tracking-widest text-xs">Maison Fairenne</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#99e6d8]/40 to-transparent z-10"></div>
              <img 
                src="https://www.dotandkey.com/cdn/shop/files/Artboard1_583ef82d-c136-490d-aab1-4780f12ee608.jpg" 
                alt="Skin Fresh Textures" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-12 left-12 right-12 z-20">
                <div className="p-8 backdrop-blur-xl bg-white/40 border border-white/60 rounded-3xl shadow-2xl">
                  <h3 className="text-3xl font-extrabold text-[#2a2a2a] mb-2 tracking-tight">Almost there, gorgeous.</h3>
                  <p className="text-[#ff9aa8] font-bold font-sans uppercase tracking-widest text-xs">Enter your secret code</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

    </div>
  );
};

export default PasswordVerification;
