import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/ui/Button';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  const [step, setStep] = useState(0);

  const skinSteps = [
    { title: 'Juicy, Glowing Skin', desc: 'Powered by nature’s finest fruit extracts.', image: 'https://www.dotandkey.com/cdn/shop/files/Artboard1_583ef82d-c136-490d-aab1-4780f12ee608.jpg' },
    { title: 'Targeted Concerns', desc: 'Find your perfect routine based on your unique skin concerns.', image: 'https://www.dotandkey.com/cdn/shop/files/1a_3ef32ac6-5192-495c-b4bb-dafb0e806260.jpg' },
    { title: 'SPF + Glow', desc: 'Protect and shine with our hybrid formulas.', image: 'https://www.dotandkey.com/cdn/shop/files/VitaminCSunscreenListing1_24ade7b6-5667-43a8-8cbf-a750fae616a4.jpg' },
  ];

  const glamSteps = [
    { title: 'Maison Fairenne', desc: 'Step into the atelier of timeless elegance.', image: 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/ec25942077e080c392d7cb4696caea57.jpg?v=1761982588' },
    { title: 'Curated Palettes', desc: 'Rich pigments and vintage romance.', image: 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/24c4ac61030646c83895aa1d3448017a_256e2b1a-3119-4a30-af27-4926c38103a2.jpg?v=1756201951' },
    { title: 'Flawless Finish', desc: 'Discover your signature look for every occasion.', image: 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/20260420-103644.jpg?v=1776653923' },
  ];

  const steps = isGlam ? glamSteps : skinSteps;

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-700 ${
      isGlam ? 'bg-background text-text' : 'bg-surface text-text'
    }`}>
      <div className={`flex-1 w-full relative transition-colors duration-700 ${
        isGlam ? 'bg-primary/5' : 'bg-secondary/20'
      }`}>
        <Link 
          to="/" 
          className={`absolute left-6 lg:left-10 top-6 md:top-8 flex items-center text-sm font-bold z-20 transition-colors ${isGlam ? 'text-[#7a1b26] hover:text-[#2a2a2a]' : 'text-[#ff9aa8] hover:text-[#ff7b8c]'}`}
        >
          <span className="mr-1.5 text-lg leading-none tracking-tighter">←</span>
          Back to Home
        </Link>
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className={`w-full max-w-sm aspect-square rounded-full transition-all duration-700 overflow-hidden ${
            isGlam ? 'bg-primary/20 shadow-inner' : 'bg-white shadow-xl'
          }`}>
            <img 
              src={steps[step].image} 
              alt={steps[step].title} 
              className="w-full h-full object-cover transition-opacity duration-500" 
            />
          </div>
        </div>
      </div>
      
      {/* Content Area */}
      <div className={`p-8 pb-12 flex flex-col items-center text-center transition-colors duration-700 ${
        isGlam ? 'bg-primary text-secondary' : 'bg-white text-text'
      }`}>
        {/* Pagination Dots */}
        <div className="flex space-x-2 mb-8">
          {steps.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === step 
                  ? `w-8 ${isGlam ? 'bg-secondary' : 'bg-primary'}` 
                  : `w-2 ${isGlam ? 'bg-secondary/30' : 'bg-primary/20'}`
              }`}
            />
          ))}
        </div>
        
        <h2 className={`text-3xl mb-4 transition-all ${
          isGlam ? 'font-serif italic' : 'font-display font-bold'
        }`}>
          {steps[step].title}
        </h2>
        
        <p className={`mb-10 max-w-xs transition-all ${
          isGlam ? 'font-serif opacity-80' : 'text-text-muted'
        }`}>
          {steps[step].desc}
        </p>
        
        <div className="w-full max-w-xs space-y-4">
          <Button variant="solid" className="w-full" onClick={handleNext}>
            {step === steps.length - 1 ? 'Get Started' : 'Next'}
          </Button>
          <Button variant="ghost" className="w-full" onClick={() => navigate('/login')}>
            Skip
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
