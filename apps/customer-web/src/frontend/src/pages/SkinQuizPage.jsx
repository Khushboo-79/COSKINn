import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, RotateCcw, Check, ShoppingBag, Info, Leaf } from 'lucide-react';

class QuizErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Quiz Results Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-16 bg-white rounded-3xl shadow-sm border border-red-100 text-center max-w-2xl mx-auto mt-12">
          <h3 className="text-2xl font-heading font-bold text-[#1B1B1B] mb-4">Oops! Something went wrong.</h3>
          <p className="text-gray-600 mb-8 font-medium">We couldn't generate your routine. Please retake the Skin Quiz.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-[#FF2D7A] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:shadow-lg transition-all"
          >
            Restart Quiz
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

import { skincareProducts } from '../constants/skincareProducts';
import ProductCard from '../components/common/ProductCard';
import Footer from '../components/common/Footer';

import quizHeroImg from '../assets/images/lifestyle_selfcare.webp';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is your skin type?",
    options: ["Dry", "Oily", "Combination", "Normal", "Sensitive"]
  },
  {
    id: 2,
    question: "What is your biggest skin concern?",
    options: ["Acne & Blemishes", "Dryness", "Dull Skin", "Uneven Tone", "Dark Spots", "Fine Lines", "Large Pores", "Redness"]
  },
  {
    id: 3,
    question: "How does your skin feel after cleansing?",
    options: ["Tight", "Comfortable", "Oily after 1–2 hours", "Dry around cheeks", "Unsure"]
  },
  {
    id: 4,
    question: "What is your skincare goal?",
    options: ["Hydration", "Brightening", "Acne Control", "Barrier Repair", "Anti-Aging", "Healthy Glow"]
  },
  {
    id: 5,
    question: "How many skincare steps do you prefer?",
    options: ["2-Step Routine", "3-Step Routine", "5-Step Routine", "Complete Routine"]
  },
  {
    id: 6,
    question: "How often do you wear sunscreen?",
    options: ["Every Day", "Sometimes", "Rarely", "Never"]
  }
];

export default function SkinQuizPage() {
  const navigate = useNavigate();
  
  // State: 0 = Intro, 1-6 = Questions, 7 = Results
  const [step, setStep] = useState(() => {
    try {
      const saved = sessionStorage.getItem('skinQuizStep');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });
  
  const [answers, setAnswers] = useState(() => {
    try {
      const saved = sessionStorage.getItem('skinQuizAnswers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [showError, setShowError] = useState(false);

  // Persist state to prevent data loss on refresh
  useEffect(() => {
    sessionStorage.setItem('skinQuizStep', step.toString());
  }, [step]);

  useEffect(() => {
    sessionStorage.setItem('skinQuizAnswers', JSON.stringify(answers));
  }, [answers]);

  // If on results page but no answers exist (e.g. hard refresh cleared something), redirect to step 1
  useEffect(() => {
    if (step === 7 && Object.keys(answers).length === 0) {
      setStep(1);
    }
  }, [step, answers]);

  // Scroll to top on step change for a clean experience
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleSelect = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
    setShowError(false);
  };

  const handleNext = () => {
    if (step >= 1 && step <= 6) {
      if (!answers[step]) {
        setShowError(true);
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleSkip = () => {
    setShowError(false);
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setShowError(false);
    setStep(prev => Math.max(0, prev - 1));
  };

  const resetQuiz = () => {
    setAnswers({});
    setStep(0);
    sessionStorage.removeItem('skinQuizAnswers');
    sessionStorage.removeItem('skinQuizStep');
  };

  // --- RESULT ENGINE ---
  const results = useMemo(() => {
    if (step !== 7) return null;

    // A robust mapping based on the COSKINn skincare products constant
    const concern = answers[2] || "Hydration";
    const skinType = answers[1] || "Normal";

    // 1. Determine Fruit Complex based on concern/type
    let fruitComplex = ["Strawberry", "Blueberry"];
    let suitableFor = [skinType, (concern.split(' ')[0] || "Hydration") + " Prone Skin"];

    if (concern.includes("Acne") || concern.includes("Pores")) fruitComplex = ["Strawberry", "Green Tea"];
    if (concern.includes("Dryness") || skinType === "Dry") fruitComplex = ["Mango", "Pomegranate"];
    if (concern.includes("Dull") || concern.includes("Uneven") || concern.includes("Dark")) fruitComplex = ["Orange", "Blueberry"];
    if (concern.includes("Redness") || skinType === "Sensitive") fruitComplex = ["Green Tea", "Mango"];
    if (concern.includes("Fine Lines")) fruitComplex = ["Blueberry", "Pomegranate"];

    // 2. Map Morning Routine
    const getProduct = (searchString, fallbackType) => {
      // Very broad, robust search across name, category, and shortDescription
      const match = skincareProducts.find(p => p?.name?.toLowerCase().includes(searchString.toLowerCase()));
      if (match) return match;
      
      const fallback = skincareProducts.find(p => 
        p?.name?.toLowerCase().includes(fallbackType.toLowerCase()) || 
        p?.category?.toLowerCase().includes(fallbackType.toLowerCase()) ||
        p?.shortDescription?.toLowerCase().includes(fallbackType.toLowerCase())
      );
      
      return fallback || skincareProducts[0]; // Absolute fallback to prevent undefined crashes
    };

    let amCleanser = getProduct("Gentle Cleanser", "cleanser");
    if (skinType === "Oily" || concern.includes("Acne")) amCleanser = getProduct("Foaming Cleanser", "cleanser");
    
    let amMist = getProduct("Green Tea", "mist");
    
    let amSunscreen = getProduct("Sunscreen SPF 50", "sunscreen");
    if (skinType === "Sensitive") amSunscreen = getProduct("Mineral", "sunscreen");

    let morningRoutine = [amCleanser, amMist, amSunscreen];

    // 3. Map Night Routine
    let pmBalm = getProduct("Cleansing Balm", "balm");
    
    let pmMask = getProduct("Overnight Mask", "mask");
    if (concern.includes("Dryness")) pmMask = getProduct("Daily Moisturiser", "moisturiser"); 
    
    let pmEye = getProduct("Under Eye", "eye");

    let nightRoutine = [pmBalm, pmMask, pmEye];

    return { morningRoutine, nightRoutine, fruitComplex, suitableFor };
  }, [step, answers]);


  // --- ANIMATIONS ---
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  // --- RENDER HELPERS ---
  const renderIntro = () => (
    <motion.div 
      variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="flex flex-col lg:flex-row items-center bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-gradient-to-br from-[#FFF8F6] to-white">
        <span className="inline-flex items-center gap-2 text-[#FF2D7A] bg-[#FF2D7A]/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest w-max mb-8">
          <Info size={14} /> 2 Minute Quiz
        </span>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#1B1B1B] mb-6 leading-tight">
          Find Your Perfect <br/><span className="text-[#FF2D7A]">COSKINn</span> Routine
        </h1>
        <p className="text-gray-600 text-lg mb-10 font-medium leading-relaxed max-w-md">
          Answer a few quick questions about your skin type, concerns, and goals. We'll curate a personalized fruit-powered routine just for you.
        </p>
        <button 
          onClick={() => setStep(1)}
          className="w-max px-10 py-4 bg-[#FF2D7A] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:shadow-[0_10px_20px_rgba(255,45,122,0.3)] hover:-translate-y-1 transition-all flex items-center gap-2"
        >
          Start the Quiz <ArrowRight size={18} />
        </button>
      </div>
      <div className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative">
        <img src={quizHeroImg} alt="Skin Quiz" className="w-full h-full object-cover" />
      </div>
    </motion.div>
  );

  const renderQuestion = () => {
    const qData = QUIZ_QUESTIONS[step - 1];
    const progress = (step / QUIZ_QUESTIONS.length) * 100;

    return (
      <motion.div 
        key={step} variants={pageVariants} initial="initial" animate="animate" exit="exit"
        className="max-w-3xl mx-auto w-full bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 md:p-16"
      >
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
            <span>Question {step} of {QUIZ_QUESTIONS.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }}
              className="h-full bg-[#FF2D7A]"
            />
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#1B1B1B] mb-10 text-center">
          {qData.question}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {qData.options.map((opt, idx) => {
            const isSelected = answers[step] === opt;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(step, opt)}
                className={`p-6 rounded-2xl border-2 text-left font-bold transition-all duration-300 flex justify-between items-center ${
                  isSelected 
                    ? 'border-[#FF2D7A] bg-[#FFF0F4] text-[#FF2D7A]' 
                    : 'border-gray-100 hover:border-gray-300 text-gray-700 bg-white'
                }`}
              >
                {opt}
                {isSelected && <Check size={20} className="text-[#FF2D7A]" />}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {showError && (
            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-center font-bold mb-6 text-sm">
              Please select an answer to continue.
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between border-t border-gray-100 pt-8">
          <button onClick={handlePrev} className="flex items-center gap-2 text-gray-500 font-bold uppercase tracking-widest text-xs hover:text-[#FF2D7A] transition-colors">
            <ArrowLeft size={16} /> Back
          </button>
          
          <div className="flex gap-4">
            <button onClick={handleSkip} className="px-6 py-3 rounded-full text-gray-500 font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-colors">
              Skip
            </button>
            <button 
              onClick={handleNext}
              className={`px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-2 ${
                answers[step] 
                  ? 'bg-[#1B1B1B] text-white hover:bg-[#FF2D7A]' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {step === QUIZ_QUESTIONS.length ? 'See Results' : 'Next'} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderResults = () => {
    if (!results) return null;
    return (
      <QuizErrorBoundary>
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
          {/* Results Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#FFF0F4] text-[#FF2D7A] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            Your Personalized Routine
          </span>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6 text-[#1B1B1B]">We Found Your Match</h2>
          <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Based on your answers, here is the perfect fruit-powered routine designed to target your unique skin needs.
          </p>
        </div>

        {/* Profile Summary */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 mb-16 flex flex-col md:flex-row gap-8 justify-around items-center text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="w-full md:w-1/2 p-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Recommended Fruit Complex</h4>
            <div className="flex flex-wrap justify-center gap-3">
              {results.fruitComplex.map((fruit, idx) => (
                <span key={idx} className="px-5 py-2 bg-[#FF2D7A]/10 text-[#FF2D7A] rounded-full font-bold flex items-center gap-2">
                  <Leaf size={16} /> {fruit}
                </span>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Suitable For</h4>
            <div className="flex flex-wrap justify-center gap-3">
              {results.suitableFor.map((trait, idx) => (
                <span key={idx} className="px-5 py-2 bg-gray-100 text-gray-700 rounded-full font-bold">
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Morning Routine */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-heading font-bold text-[#1B1B1B] flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">☀️</span>
              Morning Routine
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results.morningRoutine.map((product, idx) => (
              <ProductCard key={`${product?.id}-${idx}`} product={product} />
            ))}
          </div>
        </div>

        {/* Night Routine */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-heading font-bold text-[#1B1B1B] flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-500 flex items-center justify-center">🌙</span>
              Night Routine
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results.nightRoutine.map((product, idx) => (
              <ProductCard key={`${product?.id}-${idx}`} product={product} />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pb-24 border-b border-gray-100">
          <button 
            className="px-10 py-4 bg-[#FF2D7A] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:shadow-[0_10px_20px_rgba(255,45,122,0.3)] hover:-translate-y-1 transition-all flex items-center gap-2"
          >
            <ShoppingBag size={18} /> Shop Recommended Routine
          </button>
          <button 
            onClick={resetQuiz}
            className="px-10 py-4 bg-white text-[#FF2D7A] border-[1.5px] border-[#FF2D7A] rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#FF2D7A] hover:text-white transition-all flex items-center gap-2"
          >
            <RotateCcw size={18} /> Retake Quiz
          </button>
        </div>
      </motion.div>
      </QuizErrorBoundary>
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] font-sans text-black selection:bg-[#FF2D7A] selection:text-white pt-[120px] pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {step === 0 && renderIntro()}
          {step > 0 && step <= QUIZ_QUESTIONS.length && renderQuestion()}
          {step === QUIZ_QUESTIONS.length + 1 && renderResults()}
        </AnimatePresence>
      </div>
      {step === QUIZ_QUESTIONS.length + 1 && <div className="mt-20"><Footer /></div>}
    </div>
  );
}
