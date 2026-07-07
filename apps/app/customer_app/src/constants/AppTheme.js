import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Guideline sizes based on standard iPhone design (e.g., iPhone 12/13/14)
const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;

export const scaleh = (size) => (width / guidelineBaseWidth) * size;
export const scalev = (size) => (height / guidelineBaseHeight) * size;
export const scale = (size, factor = 0.5) => size + (scaleh(size) - size) * factor;

export const AppTheme = {
  colors: {
    primary: '#FF0069',
    secondary: '#FFD498',
    backgroundStart: '#F0BAD0',
    backgroundEnd: '#F6D4A5',
    white: '#FFFFFF',
    black: '#000000',
    textDark: '#1A1A1A',
    textLight: '#666666',
    cardBackground: 'rgba(255, 215, 225, 0.5)', // slightly transparent pinkish card background
    cardBorder: 'rgba(255, 0, 105, 0.4)', // pink border
    inputBackground: '#FFFFFF',
  },
  fonts: {
    logo: 'Expletus Sans', // Used for OSKINn
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  metrics: {
    screenWidth: width,
    screenHeight: height,
  }
};
