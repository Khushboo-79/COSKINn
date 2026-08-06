import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight, UserCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  const navigate = useNavigate();
  const location = useLocation();
  
  const { login } = useAuth();
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>(location.state?.authMode || 'signin');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isEmail, setIsEmail] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setIdentifier(val);
    setIsEmail(val.includes('@'));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (identifier.length >= 5) {
      if (isEmail) {
        if (!password) {
          setError('Password is required for email login.');
          return;
        }
        setIsLoading(true);
        try {
          const endpoint = authMode === 'signup' ? '/api/auth/register' : '/api/auth/customer-login';
          const res = await fetch(`\${(import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace('/api', '')}\${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: identifier, password })
          });
          
          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Authentication failed');
          }
          
          const data = await res.json();
          login(data.access_token, data.user);
          navigate('/account');
        } catch (err: any) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(true);
        try {
          const res = await fetch(`\${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/auth/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: identifier })
          });
          
          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Failed to send OTP');
          }
          
          navigate('/verify-otp', { state: { isNewUser: authMode === 'signup', phone: identifier } });
        } catch (err: any) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
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
          {/* Mode Toggle */}
          <div className="flex bg-gray-100/50 p-1.5 rounded-full mb-8 relative">
            <div className={`absolute inset-y-1.5 w-[calc(50%-6px)] rounded-full transition-all duration-300 shadow-sm ${
              isGlam ? 'bg-white' : 'bg-white'
            } ${authMode === 'signup' ? 'translate-x-full left-[6px]' : 'left-1.5'}`} />
            
            <button
              onClick={() => setAuthMode('signin')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-full relative z-10 transition-colors ${
                authMode === 'signin' ? (isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]') : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-full relative z-10 transition-colors ${
                authMode === 'signup' ? (isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]') : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Create Account
            </button>
          </div>

          <div className="mb-8 text-center h-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={authMode}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className={`text-3xl font-extrabold mb-3 text-[#2a2a2a] ${isGlam ? 'font-serif' : 'font-display'}`}>
                  {authMode === 'signin' 
                    ? (isGlam ? 'Enter the Atelier.' : 'Welcome back, beautiful.') 
                    : (isGlam ? 'Join the Elite.' : 'Start your skin journey.')}
                </h1>
                <p className={`text-sm ${isGlam ? 'text-gray-500 font-serif' : 'text-gray-500 font-sans'}`}>
                  {authMode === 'signin' 
                    ? 'Enter your email or mobile number to sign in.' 
                    : 'Enter your email or mobile number to create your profile.'}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 font-display">
                Email or Mobile Number
              </label>
              <div className="relative flex items-center group">
                <div className={`absolute left-4 z-10 flex items-center ${isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}`}>
                  <UserCircle2 size={18} />
                  <div className="h-5 w-px bg-gray-200 mx-3"></div>
                </div>
                <input 
                  type="text"
                  required
                  value={identifier}
                  onChange={handleIdentifierChange}
                  className={`w-full pl-14 pr-4 py-4 bg-gray-50/50 border-2 rounded-2xl outline-none transition-all duration-300 font-sans font-semibold text-lg text-gray-800 ${
                    isGlam 
                      ? 'border-gray-200 focus:border-[#7a1b26] focus:bg-white focus:ring-4 focus:ring-[#7a1b26]/10' 
                      : 'border-gray-100 focus:border-[#ff9aa8] focus:bg-white focus:ring-4 focus:ring-[#ff9aa8]/20'
                  }`}
                  placeholder="name@email.com or +10000000000"
                />
              </div>
            </div>

            <AnimatePresence>
              {isEmail && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 font-display">
                    Password
                  </label>
                  <div className="relative flex items-center group">
                    <input 
                      type="password"
                      required={isEmail}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full px-4 py-4 bg-gray-50/50 border-2 rounded-2xl outline-none transition-all duration-300 font-sans font-semibold text-lg text-gray-800 ${
                        isGlam 
                          ? 'border-gray-200 focus:border-[#7a1b26] focus:bg-white focus:ring-4 focus:ring-[#7a1b26]/10' 
                          : 'border-gray-100 focus:border-[#ff9aa8] focus:bg-white focus:ring-4 focus:ring-[#ff9aa8]/20'
                      }`}
                      placeholder="••••••••"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

            <button 
              type="submit"
              disabled={identifier.length < 5 || isLoading}
              className={`w-full group flex items-center justify-center px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                isGlam 
                  ? 'bg-[#2a2a2a] text-[#e5b376] hover:bg-black' 
                  : 'bg-[#ff9aa8] text-white hover:bg-[#ff8091] shadow-xl shadow-[#ff9aa8]/30'
              }`}
            >
              <span>{isLoading ? 'Processing...' : 'Continue'}</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-8 text-center text-[10px] text-gray-400 font-sans">
            By continuing, you agree to Fairenne's <a href="#" className="underline hover:text-gray-800">Terms of Service</a> and <a href="#" className="underline hover:text-gray-800">Privacy Policy</a>.
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
                src="https://www.dotandkey.com/cdn/shop/files/1-175.jpg" 
                alt="Glam Beauty Details" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-12 left-12 right-12 z-20">
                <div className="p-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl">
                  <h3 className="text-3xl font-serif text-white italic mb-2">"True beauty is an art form."</h3>
                  <p className="text-[#e5b376] font-serif uppercase tracking-widest text-xs">Maison Fairenne</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#ff9aa8]/40 to-transparent z-10"></div>
              <img 
                src="https://www.dotandkey.com/cdn/shop/files/VitaminCSunscreenListing1_24ade7b6-5667-43a8-8cbf-a750fae616a4.jpg" 
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
