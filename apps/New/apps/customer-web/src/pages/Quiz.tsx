import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  question: string;
  glamQuestion?: string;
  options: { label: string; value: string; emoji: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: 'What is your skin type?',
    glamQuestion: 'How would you describe your complexion?',
    options: [
      { label: 'Oily', value: 'oily', emoji: '✨' },
      { label: 'Dry', value: 'dry', emoji: '🌵' },
      { label: 'Combination', value: 'combination', emoji: '☯️' },
      { label: 'Sensitive', value: 'sensitive', emoji: '🌸' },
    ],
  },
  {
    id: 2,
    question: 'What is your primary skin concern?',
    glamQuestion: 'What is your primary beauty concern?',
    options: [
      { label: 'Acne & Breakouts', value: 'acne', emoji: '😤' },
      { label: 'Aging & Fine Lines', value: 'aging', emoji: '⏳' },
      { label: 'Dullness & Uneven Tone', value: 'dull', emoji: '🌑' },
      { label: 'Dryness & Dehydration', value: 'dryness', emoji: '💧' },
    ],
  },
  {
    id: 3,
    question: 'How does your skin feel after cleansing?',
    glamQuestion: 'How does your skin feel in the morning?',
    options: [
      { label: 'Tight & Dry', value: 'tight', emoji: '😬' },
      { label: 'Balanced & Comfortable', value: 'balanced', emoji: '😌' },
      { label: 'Oily in the T-zone', value: 'tzone', emoji: '💦' },
      { label: 'Irritated & Red', value: 'irritated', emoji: '🔴' },
    ],
  },
  {
    id: 4,
    question: 'What does your current routine look like?',
    glamQuestion: 'How committed is your current beauty routine?',
    options: [
      { label: 'Minimal (Cleanser + Moisturiser)', value: 'minimal', emoji: '🪶' },
      { label: 'Basic (+ Serums)', value: 'basic', emoji: '🧴' },
      { label: 'Full Routine (6+ steps)', value: 'full', emoji: '💼' },
      { label: 'No routine at all', value: 'none', emoji: '🙈' },
    ],
  },
  {
    id: 5,
    question: 'What is your biggest lifestyle factor?',
    glamQuestion: 'What best describes your lifestyle?',
    options: [
      { label: 'Busy & On-the-go', value: 'busy', emoji: '🚀' },
      { label: 'Outdoors & Active', value: 'active', emoji: '🌿' },
      { label: 'Office & Screen-heavy', value: 'office', emoji: '💻' },
      { label: 'Travel frequently', value: 'travel', emoji: '✈️' },
    ],
  },
  {
    id: 6,
    question: 'What is your skincare goal?',
    glamQuestion: 'What is your ultimate beauty goal?',
    options: [
      { label: 'Glass Skin Glow', value: 'glow', emoji: '🪩' },
      { label: 'Clear & Blemish-free', value: 'clear', emoji: '✅' },
      { label: 'Anti-Aging & Firmness', value: 'antiaging', emoji: '💫' },
      { label: 'Soothe & Calm', value: 'calm', emoji: '🌙' },
    ],
  },
];

const Quiz: React.FC = () => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [direction, setDirection] = useState(1);

  const q = questions[currentStep];
  const progress = ((currentStep) / questions.length) * 100;
  const selectedAnswer = answers[q.id];

  const handleSelect = (value: string) => {
    setAnswers(prev => ({ ...prev, [q.id]: value }));
  };

  const handleNext = () => {
    if (!selectedAnswer) return;
    if (currentStep < questions.length - 1) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    } else {
      // Navigate to results with answers
      navigate('/quiz/result', { state: { answers } });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -60, opacity: 0 }),
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isGlam ? 'bg-[#faf9f6]' : 'bg-[#fcfaf9]'}`}>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-gray-100">
        <motion.div
          className={`h-full rounded-full ${isGlam ? 'bg-[#7a1b26]' : 'bg-[#ff9aa8]'}`}
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-2xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 ${isGlam ? 'bg-[#7a1b26]/10 text-[#7a1b26]' : 'bg-[#ff9aa8]/10 text-[#ff9aa8]'}`}>
              <Sparkles size={14} />
              Step {currentStep + 1} of {questions.length}
            </div>
          </motion.div>

          {/* Question Card */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={q.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                <h2 className={`text-3xl md:text-4xl font-extrabold text-center mb-10 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-gray-900'}`}>
                  {isGlam && q.glamQuestion ? q.glamQuestion : q.question}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {q.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-200 ${
                        selectedAnswer === opt.value
                          ? isGlam
                            ? 'border-[#7a1b26] bg-[#7a1b26]/5 shadow-lg'
                            : 'border-[#ff9aa8] bg-[#ff9aa8]/5 shadow-lg shadow-[#ff9aa8]/20'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <span className="text-3xl block mb-3">{opt.emoji}</span>
                      <span className={`font-bold text-base block ${selectedAnswer === opt.value ? (isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]') : 'text-gray-900'}`}>
                        {opt.label}
                      </span>
                      {selectedAnswer === opt.value && (
                        <motion.div
                          layoutId="selected-indicator"
                          className={`absolute top-4 right-4 w-5 h-5 rounded-full flex items-center justify-center ${isGlam ? 'bg-[#7a1b26]' : 'bg-[#ff9aa8]'}`}
                          initial={false}
                          transition={{ duration: 0.2 }}
                        >
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-gray-500 disabled:opacity-30 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={18} /> Back
            </button>

            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                isGlam
                  ? 'bg-[#2a2a2a] text-[#e5b376] hover:bg-black'
                  : 'bg-[#ff9aa8] text-white hover:bg-[#ff8091] shadow-lg shadow-[#ff9aa8]/30'
              }`}
            >
              {currentStep < questions.length - 1 ? 'Next' : 'See My Routine'}
              <ArrowRight size={18} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Quiz;
