import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'skin' | 'glam';

interface ThemeContextProps {
  mode: ThemeMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('skin');

  useEffect(() => {
    if (mode === 'glam') {
      document.documentElement.classList.add('theme-glam');
    } else {
      document.documentElement.classList.remove('theme-glam');
    }
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'skin' ? 'glam' : 'skin'));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
