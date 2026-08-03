import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight, Check, Sparkles, Droplets } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileSetup: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  
  const [skinType, setSkinType] = useState('');
  const [concerns, setConcerns] = useState<string[]>([]);
  
  const [glamStyle, setGlamStyle] = useState('');

  const handleNext = () => {
    if (step < totalSteps) setStep(s => s + 1);
    else navigate('/');
  };

  const handleBack = () => {
    if (step > 1) setStep(s => s - 1);
  };

  const toggleConcern = (concern: string) => {
    setConcerns(prev => 
      prev.includes(concern) ? prev.filter(c => c !== concern) : [...prev, concern]
    );
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-2 mb-12">
      {[1, 2, 3].map(i => (
        <React.Fragment key={i}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
            step >= i 
              ? (isGlam ? 'bg-[#7a1b26] text-white' : 'bg-[#ff9aa8] text-white') 
              : 'bg-gray-100 text-gray-400'
          }`}>
            {step > i ? <Check size={14} /> : i}
          </div>
          {i < 3 && (
            <div className={`w-12 h-px transition-all duration-300 ${
              step > i 
                ? (isGlam ? 'bg-[#7a1b26]' : 'bg-[#ff9aa8]') 
                : 'bg-gray-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-700 ${isGlam ? 'bg-[#faf9f6]' : 'bg-gradient-to-br from-[#ffe4e8] via-white to-[#e6f7f4]'}`}>
      
      {/* Header Minimal */}
      <header className="w-full py-6 px-8 flex justify-between items-center">
        <Link to="/" className="text-2xl tracking-widest font-extrabold text-[#2a2a2a] flex items-center font-display">
          COSKIN<span className={isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}>n</span>
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl p-8 sm:p-12 rounded-[2rem] shadow-2xl border border-white/50">
          
          {renderStepIndicator()}

          <AnimatePresence mode="wait">
            
            {/* STEP 1: BASICS */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className={`text-3xl font-extrabold mb-2 text-[#2a2a2a] ${isGlam ? 'font-serif' : 'font-display'}`}>Nice to meet you.</h2>
                  <p className="text-gray-500 text-sm">Let's get the basics down.</p>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 font-display">Full Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className={`w-full px-4 py-4 bg-gray-50/50 border-2 rounded-2xl outline-none transition-all duration-300 font-sans font-semibold text-lg text-gray-800 ${
                        isGlam ? 'focus:border-[#7a1b26]' : 'focus:border-[#ff9aa8]'
                      }`}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 font-display">Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className={`w-full px-4 py-4 bg-gray-50/50 border-2 rounded-2xl outline-none transition-all duration-300 font-sans font-semibold text-lg text-gray-800 ${
                        isGlam ? 'focus:border-[#7a1b26]' : 'focus:border-[#ff9aa8]'
                      }`}
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 font-display">Date of Birth (For Birthday Gifts!)</label>
                    <input 
                      type="date" 
                      value={dob}
                      onChange={e => setDob(e.target.value)}
                      className={`w-full px-4 py-4 bg-gray-50/50 border-2 rounded-2xl outline-none transition-all duration-300 font-sans font-semibold text-lg text-gray-800 ${
                        isGlam ? 'focus:border-[#7a1b26]' : 'focus:border-[#ff9aa8]'
                      }`}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    onClick={handleNext}
                    disabled={!name || !email}
                    className={`group flex items-center justify-center px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isGlam 
                        ? 'bg-[#2a2a2a] text-[#e5b376] hover:bg-black' 
                        : 'bg-[#ff9aa8] text-white hover:bg-[#ff8091]'
                    }`}
                  >
                    <span>Next</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: SKIN PROFILE */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className={`text-3xl font-extrabold mb-2 text-[#2a2a2a] ${isGlam ? 'font-serif' : 'font-display'}`}>Your Skin Profile</h2>
                  <p className="text-gray-500 text-sm">Help us recommend the perfect serums and masks.</p>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-4 font-display">Skin Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['Oily', 'Dry', 'Combination', 'Normal'].map(type => (
                      <button
                        key={type}
                        onClick={() => setSkinType(type)}
                        className={`p-4 border-2 rounded-2xl text-left transition-all duration-300 ${
                          skinType === type
                            ? (isGlam ? 'border-[#7a1b26] bg-[#7a1b26]/5' : 'border-[#ff9aa8] bg-[#ff9aa8]/10')
                            : 'border-gray-100 hover:border-gray-300'
                        }`}
                      >
                        <span className={`block font-bold text-lg mb-1 ${skinType === type ? 'text-[#2a2a2a]' : 'text-gray-600'}`}>{type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-4 font-display">Top Concerns (Select multiple)</label>
                  <div className="flex flex-wrap gap-3">
                    {['Acne', 'Aging', 'Pigmentation', 'Texture', 'Redness', 'Dullness'].map(c => (
                      <button
                        key={c}
                        onClick={() => toggleConcern(c)}
                        className={`px-5 py-2.5 border-2 rounded-full text-sm font-bold transition-all duration-300 ${
                          concerns.includes(c)
                            ? (isGlam ? 'border-[#7a1b26] bg-[#7a1b26] text-white' : 'border-[#ff9aa8] bg-[#ff9aa8] text-white')
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button onClick={handleBack} className="px-6 py-4 text-gray-500 hover:text-gray-900 font-bold transition-colors">Back</button>
                  <button 
                    onClick={handleNext}
                    disabled={!skinType}
                    className={`group flex items-center justify-center px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isGlam 
                        ? 'bg-[#2a2a2a] text-[#e5b376] hover:bg-black' 
                        : 'bg-[#ff9aa8] text-white hover:bg-[#ff8091]'
                    }`}
                  >
                    <span>Next</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: GLAM PROFILE */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className={`text-3xl font-extrabold mb-2 text-[#2a2a2a] ${isGlam ? 'font-serif' : 'font-display'}`}>Your Glam Style</h2>
                  <p className="text-gray-500 text-sm">Curating your Atelier de Beauté experience.</p>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-4 font-display">Makeup Vibe</label>
                  <div className="space-y-4">
                    {[
                      { id: 'everyday', title: 'Everyday Glow', desc: 'Minimal effort, maximum radiance.' },
                      { id: 'soft', title: 'Soft Glam', desc: 'Sculpted but subtle. Romantic.' },
                      { id: 'full', title: 'Full Glam', desc: 'High drama, full coverage, bold.' }
                    ].map(style => (
                      <button
                        key={style.id}
                        onClick={() => setGlamStyle(style.id)}
                        className={`w-full p-5 border-2 rounded-2xl text-left transition-all duration-300 flex items-center justify-between ${
                          glamStyle === style.id
                            ? (isGlam ? 'border-[#7a1b26] bg-[#7a1b26]/5' : 'border-[#ff9aa8] bg-[#ff9aa8]/10')
                            : 'border-gray-100 hover:border-gray-300'
                        }`}
                      >
                        <div>
                          <span className={`block font-bold text-xl mb-1 ${glamStyle === style.id ? 'text-[#2a2a2a]' : 'text-gray-600'}`}>{style.title}</span>
                          <span className="text-gray-500 text-sm">{style.desc}</span>
                        </div>
                        {glamStyle === style.id && (
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isGlam ? 'bg-[#7a1b26]' : 'bg-[#ff9aa8]'}`}>
                            <Check size={16} className="text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button onClick={handleBack} className="px-6 py-4 text-gray-500 hover:text-gray-900 font-bold transition-colors">Back</button>
                  <button 
                    onClick={handleNext}
                    disabled={!glamStyle}
                    className={`group flex items-center justify-center px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isGlam 
                        ? 'bg-[#7a1b26] text-white hover:bg-[#5a121b]' 
                        : 'bg-[#ff9aa8] text-white hover:bg-[#ff8091]'
                    }`}
                  >
                    <span>Complete Profile</span>
                    {isGlam ? <Sparkles className="ml-2 w-4 h-4" /> : <Droplets className="ml-2 w-4 h-4" />}
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default ProfileSetup;
