// Color palette for the website
// Use these colors consistently across the project

export const colors = {
  // Primary Colors
  primary: {
    light: '#97b5c2', // Soft Blue
    main: '#97b5c2',
    dark: '#2b5968', // Deep Teal
  },

  // Secondary Colors
  secondary: {
    light: '#f7dce0', // Blush Pink
    main: '#dfc2c0', // Dusty Rose
    dark: '#dfc2c0',
  },

  // Accent/Neutral Colors
  accent: {
    warm: '#cabab1', // Warm Beige
    teal: '#2b5968', // Deep Teal
  },

  // Neutral/Grayscale (optional additions)
  neutral: {
    light: '#f7dce0',
    medium: '#cabab1',
    dark: '#2b5968',
  },
};

// Utility function to get colors easily
export const getColor = (colorPath) => {
  return colorPath.split('.').reduce((obj, key) => obj?.[key], colors);
};

// Export individual colors for direct import if needed
export const softBlue = '#97b5c2';
export const blushPink = '#f7dce0';
export const dustyRose = '#dfc2c0';
export const deepTeal = '#2b5968';
export const warmBeige = '#cabab1';
