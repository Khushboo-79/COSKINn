export const colors = {
  primary: "#97b5c2",      // Powder Blue
  secondary: "#f7dce0",    // Blush Pink
  accent: "#dfc2c0",       // Dusty Rose
  dark: "#2b5968",         // Deep Teal
  neutral: "#cabab1",      // Warm Beige

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
    colors,
    fonts: fonts.skincare,
  },
  cosmetics: {
    colors,
    fonts: fonts.cosmetics,
  }
};
