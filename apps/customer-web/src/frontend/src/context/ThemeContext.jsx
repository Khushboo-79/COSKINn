import React, { createContext, useContext, useState, useLayoutEffect, useMemo } from 'react';
import { themes } from '../constants/theme';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname.split('/')[1];
    if (path === 'skincare' || path === 'cosmetics') {
      return path;
    }
    return localStorage.getItem('theme') || 'skincare';
  }
  return 'skincare';
};

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState(getInitialTheme);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const currentTheme = themes[themeName];

    if (!currentTheme) return;

    // Dynamically inject CSS variables based on the active theme
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    Object.entries(currentTheme.fonts).forEach(([key, value]) => {
      root.style.setProperty(`--font-${key}`, value);
    });

    root.className = `theme-${themeName}`;
    localStorage.setItem('theme', themeName);
  }, [themeName]);

  const toggleTheme = (name) => {
    if (themes[name]) {
      setThemeName(name);
    }
  };

  const memoizedContextValue = useMemo(() => ({
    theme: themeName,
    toggleTheme
  }), [themeName]);

  return (
    <ThemeContext.Provider value={memoizedContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
