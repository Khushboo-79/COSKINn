export const skincareColors = {
  primary: "#FF7AB8",      // Strawberry pink
  secondary: "#98FF98",    // Mint green
  accent: "#FFE5B4",       // Peach
  dark: "#333333",         // Dark gray for text
  neutral: "#F7F7F7",      // Off white
  surface: "rgba(255, 255, 255, 0.7)", // Glassmorphism base
  background: "#FFF0F5",   // Lavender blush
  announcementBg: "#FFB6C1", // Light pink
  logoStart: "#FF0069",
  logoEnd: "#FF7AB8",
};

export const cosmeticColors = {
  primary: "#B76E79",      // Rose Gold / Dusty Rose
  secondary: "#D4AF37",    // Antique Gold
  accent: "#C8A2C8",       // Lilac
  dark: "#1A1A1A",         // Almost black
  neutral: "#FAFAFA",      // Off white
  surface: "rgba(255, 255, 255, 0.95)", // Opaque ornate surface
  background: "#FDFBF7",   // Warm pearl white
  announcementBg: "#D4AF37", // Antique gold
  logoStart: "#B76E79",
  logoEnd: "#D4AF37",
};

export const fonts = {
  skincare: {
    heading: "'Fredoka', sans-serif",
    body: "'Fredoka', sans-serif",
  },

  cosmetics: {
    heading: "'Playfair Display', serif",
    body: "'Inter', sans-serif",
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