import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info } from 'lucide-react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const memoizedContextValue = useMemo(() => ({
    showToast
  }), [showToast]);

  return (
    <ToastContext.Provider value={memoizedContextValue}>
      {children}
      
      {/* Global Toast Container */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`pointer-events-auto flex items-center gap-3 px-6 py-4 bg-white/90 backdrop-blur-xl border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-full`}
            >
              {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-theme-primary" />}
              {toast.type === 'error' && <XCircle className="w-5 h-5 text-red-500" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-blue-500" />}
              <span className="text-sm font-semibold text-black tracking-wide">{toast.message}</span>
              <button 
                onClick={() => removeToast(toast.id)} 
                className="ml-2 text-black/40 hover:text-black transition-colors"
              >
                ×
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
