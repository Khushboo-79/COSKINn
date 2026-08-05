import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { X, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GuestReminder: React.FC = () => {
  const { isAuthenticated, isAuthModalOpen, closeAuthModal } = useAuth();
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  const navigate = useNavigate();
  const [isTimerVisible, setIsTimerVisible] = useState(false);

  useEffect(() => {
    // Only show if not authenticated and hasn't dismissed it this session
    const hasDismissed = sessionStorage.getItem('coskin_guest_reminder_dismissed');
    if (!isAuthenticated && !hasDismissed) {
      const timer = setTimeout(() => {
        setIsTimerVisible(true);
      }, 8000); // Show after 8 seconds of browsing
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  const isVisible = isAuthModalOpen || isTimerVisible;

  const handleDismiss = () => {
    setIsTimerVisible(false);
    closeAuthModal();
    sessionStorage.setItem('coskin_guest_reminder_dismissed', 'true');
  };

  const handleAction = (authMode: 'signin' | 'signup') => {
    handleDismiss();
    navigate('/login', { state: { authMode } });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className={`relative w-full max-w-md p-8 md:p-10 rounded-3xl shadow-2xl z-10 ${
              isGlam ? 'bg-[#1a1a1a] text-white border border-white/10' : 'bg-white text-gray-900 border border-gray-100'
            }`}
          >
            <button 
              onClick={handleDismiss}
              className={`absolute top-5 right-5 p-2 rounded-full transition-colors ${
                isGlam ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <X size={20} />
            </button>

            <div className="text-center">
              <div className={`mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-6 ${
                isGlam ? 'bg-[#2a2a2a] text-[#e5b376]' : 'bg-[#fff0f2] text-[#ff9aa8]'
              }`}>
                <Sparkles size={32} />
              </div>
              
              <h3 className={`text-2xl font-bold mb-3 ${isGlam ? 'font-serif' : 'font-display tracking-tight'}`}>
                {isGlam ? 'Unlock The Atelier' : 'Join the Club!'}
              </h3>
              
              <p className={`mb-8 ${isGlam ? 'text-gray-400 font-serif' : 'text-gray-500 font-medium'}`}>
                Sign up today to track your orders, save your wishlist, and unlock exclusive rewards. It's completely free!
              </p>

              <div className="space-y-3 w-full">
                <button 
                  onClick={() => handleAction('signin')}
                  className={`w-full group flex items-center justify-center px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${
                    isGlam 
                      ? 'bg-[#e5b376] text-[#1a1a1a] hover:bg-[#d4a265]' 
                      : 'bg-[#ff9aa8] text-white hover:bg-[#ff8091] shadow-xl shadow-[#ff9aa8]/30'
                  }`}
                >
                  Log In
                </button>
                <button 
                  onClick={() => handleAction('signup')}
                  className={`w-full group flex items-center justify-center px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${
                    isGlam 
                      ? 'bg-transparent border border-gray-600 text-gray-300 hover:text-white hover:border-white' 
                      : 'bg-transparent border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-900'
                  }`}
                >
                  Create Skin Profile
                </button>
              </div>
              
              <button 
                onClick={handleDismiss}
                className={`mt-4 text-sm font-bold w-full py-2 ${
                  isGlam ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                No thanks, I'm just browsing
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GuestReminder;
