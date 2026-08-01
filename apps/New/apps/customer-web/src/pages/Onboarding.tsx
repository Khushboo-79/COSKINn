import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/ui/Button';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  const [step, setStep] = useState(0);

  const skinSteps = [
    { title: 'Juicy, Glowing Skin', desc: 'Powered by nature’s finest fruit extracts.' },
    { title: 'Targeted Concerns', desc: 'Find your perfect routine based on your unique skin concerns.' },
    { title: 'SPF + Glow', desc: 'Protect and shine with our hybrid formulas.' },
  ];

  const glamSteps = [
    { title: 'Maison COSKINn', desc: 'Step into the atelier of timeless elegance.' },
    { title: 'Curated Palettes', desc: 'Rich pigments and vintage romance.' },
    { title: 'Flawless Finish', desc: 'Discover your signature look for every occasion.' },
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
      {/* Visual Header Area */}
      <div className={`flex-1 w-full relative transition-colors duration-700 ${
        isGlam ? 'bg-primary/5' : 'bg-secondary/20'
      }`}>
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className={`w-full max-w-sm aspect-square rounded-full transition-all duration-700 ${
            isGlam ? 'bg-primary/20 shadow-inner' : 'bg-white shadow-xl'
          }`}></div>
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
