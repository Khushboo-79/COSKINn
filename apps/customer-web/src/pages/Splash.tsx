import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sparkles } from 'lucide-react';

const Splash: React.FC = () => {
  const navigate = useNavigate();
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  useEffect(() => {
    // Simulate loading time, then redirect to onboarding
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-1000 ${
      isGlam ? 'bg-primary text-secondary' : 'bg-secondary/30 text-primary'
    }`}>
      <div className="flex flex-col items-center animate-pulse">
        <Sparkles className={`w-12 h-12 mb-6 ${isGlam ? 'text-secondary' : 'text-primary'}`} />
        <h1 className={`text-5xl md:text-6xl tracking-widest ${isGlam ? 'font-serif' : 'font-display font-bold'}`}>
          {isGlam ? 'Maison COSKINn' : 'COSKINn'}
        </h1>
        <p className={`mt-4 text-sm tracking-[0.2em] uppercase ${isGlam ? 'font-serif opacity-80' : 'font-sans font-medium'}`}>
          {isGlam ? 'The Atelier' : 'Fruit-Powered Beauty'}
        </p>
      </div>
    </div>
  );
};

export default Splash;
