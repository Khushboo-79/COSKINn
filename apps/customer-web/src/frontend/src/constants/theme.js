export const skincareColors = {
  primary: "#97b5c2",      // Powder Blue
  secondary: "#f7dce0",    // Blush Pink
  accent: "#dfc2c0",       // Dusty Rose
  dark: "#2b5968",         // Deep Teal
  neutral: "#cabab1",      // Warm Beige
};

export const cosmeticColors = {
  primary: "#FF0069",      // Hot Pink
  secondary: "#FFD498",    // Soft Peach
  accent: "#FFFFFF",       // Pure White
  gradientStart: "#FF0069",
  gradientEnd: "#FFD498",

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