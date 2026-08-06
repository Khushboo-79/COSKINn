export const skincareColors = {
  primary: "#FF0069",      // Hot Pink
  secondary: "#FFD498",    // Soft Peach
  accent: "#FFFFFF",       // Pure White
  gradientStart: "#FF0069",
  gradientEnd: "#FFD498",

};

export const cosmeticColors = {
  primary: "#FFC2D1",      // Soft Pink
  secondary: "#FFFFFF",    // White
  accent: "#FF8FB1",       // Dark Pink Accent
  gradientStart: "#FFC2D1",
  gradientEnd: "#FFFFFF",
};

export const fonts = {
  skincare: {
    heading: "'Exo 2', sans-serif",
    body: "'Afacad', sans-serif",
  },

  cosmetics: {
    heading: "'Expletus Sans', cursive",
    body: "'Afacad', sans-serif",
  },
};

export const themes = {
  skincare: {
    colors: skincareColors,
    fonts: fonts.skincare,
  },

  cosmetics: {
    colors: cosmeticColors,
    fonts: fonts.cosmetics,
  },
};