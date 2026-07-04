import React, { createContext, useContext, useState, useLayoutEffect } from 'react';
import { themes } from '../constants/theme';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('skincare');

  useLayoutEffect(() => {
    const root = document.documentElement;
    const currentTheme = themes[themeName];

    // Dynamically inject CSS variables based on the active theme
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    Object.entries(currentTheme.fonts).forEach(([key, value]) => {
      root.style.setProperty(`--font-${key}`, value);
    });

    root.className = `theme-${themeName}`;
  }, [themeName]);

  const toggleTheme = (name) => {
    if (themes[name]) {
      setThemeName(name);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme: themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
