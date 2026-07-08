import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, ChevronRight, CheckCircle2, HelpCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function NeedHelpModal({ isOpen, onClose, order }) {
  const { showToast } = useToast();
  
  // Step 1: Select Topic, Step 2: Form, Step 3: Success
  const [step, setStep] = useState(1);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !order) return null;

  const topics = [
    "Where is my order?",
    "Update delivery address",
    "Missing items in package",
    "Damaged product received",
    "Other issue"
  ];

  const handleNext = (topic) => {
    setSelectedTopic(topic);
    setStep(2);
  };

  const handleSubmit = () => {
    if (!message.trim()) return;
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
      if (showToast) showToast('Support ticket raised successfully.', 'success');
    }, 1500);
  };

  const handleClose = () => {
    setStep(1);
    setSelectedTopic('');
    setMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <HelpCircle className="text-[#FF0069]" size={24} />
              <h2 className="text-xl font-heading font-medium text-black">Need Help?</h2>
            </div>
            <button onClick={handleClose} className="p-2 bg-gray-50 text-gray-500 rounded-full hover:bg-gray-100 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1 font-body">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <p className="text-gray-600 mb-6">What do you need help with regarding order <strong>{order.id}</strong>?</p>
                <div className="flex flex-col gap-3">
                  {topics.map((topic, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleNext(topic)}
                      className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-[#FF0069] hover:bg-pink-50 transition-colors group text-left"
                    >
                      <span className="font-medium text-gray-800">{topic}</span>
                      <ChevronRight size={18} className="text-gray-400 group-hover:text-[#FF0069]" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="bg-gray-50 p-4 rounded-xl mb-6">
                  <p className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-1">Selected Topic</p>
                  <p className="font-bold text-black">{selectedTopic}</p>
                </div>
                
                <label className="block text-sm font-medium text-gray-700 mb-2">Please describe your issue *</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us more about the problem you are facing..."
                  className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF0069] focus:ring-1 focus:ring-[#FF0069] resize-none h-32"
                />
              </div>
            )}

            {step === 3 && (
              <div className="animate-in fade-in zoom-in-95 duration-500 text-center py-8">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-green-500 w-10 h-10" />
                </div>
                <h3 className="text-2xl font-heading font-medium text-black mb-2">Ticket Raised</h3>
                <p className="text-gray-600 mb-6">Our support team will get back to you within 24 hours.</p>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-left">
                  <p className="text-sm text-gray-500 mb-1">Ticket ID: <span className="font-bold text-black">#TIC-{Math.floor(Math.random() * 900000)}</span></p>
                  <p className="text-sm text-gray-500">Related Order: <span className="font-bold text-black">{order.id}</span></p>
                </div>
              </div>
            )}
          </div>

          {step === 2 && (
            <div className="p-6 border-t border-gray-100 flex gap-4 bg-gray-50/50">
              <button 
                onClick={() => setStep(1)}
                className="flex-1 px-6 py-3.5 rounded-xl font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Back
              </button>
              <button 
                onClick={handleSubmit}
                disabled={!message.trim() || isSubmitting}
                className={`flex-[2] px-6 py-3.5 rounded-xl font-bold transition-all flex justify-center items-center ${
                  !message.trim() || isSubmitting ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#FF0069] text-white hover:bg-pink-700'
                }`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Submit Request'
                )}
              </button>
            </div>
          )}
          
          {step === 3 && (
            <div className="p-6 border-t border-gray-100 flex justify-center bg-gray-50/50">
              <button 
                onClick={handleClose}
                className="w-full px-6 py-3.5 rounded-xl font-bold text-white bg-[#FF0069] hover:bg-pink-700 transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
