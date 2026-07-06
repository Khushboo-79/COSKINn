import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// For Android, we don't need the suffix if it's correctly linked, but it's safer to use the exact filename without extension
export const AppTheme = {
  metrics: {
    screenWidth: width,
    screenHeight: height,
  },
  colors: {
    primaryGradientStart: '#F0BAD0',
    primaryGradientEnd: '#F6D4A5',
    textDark: '#1A1A1A', 
    textLight: '#FFFFFF',
    textMuted: '#6B7280',
    borderLight: 'rgba(255, 255, 255, 0.4)',
    glassBackground: 'rgba(255, 255, 255, 0.2)', 
    buttonGradientStart: '#F6538F', // Extracted from image pink
    buttonGradientEnd: '#F6D4A5',   // Extracted from image orange
  },
  fonts: {
    logo: 'ExpletusSans-SemiBold',
    logoRegular: 'ExpletusSans-Regular',
    regular: 'Afacad-Regular',
    medium: 'Afacad-Medium',
    semiBold: 'Afacad-SemiBold',
  },
};
