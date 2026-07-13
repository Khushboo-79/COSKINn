import { Dimensions, Platform, StatusBar } from 'react-native';

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
    cosmeticsCard: 'rgba(255, 194, 209, 0.5)', // FFC2D1 at 50% opacity
    inputBackground: '#FFFFFF',
    success: '#4CAF50',
    discountBg: '#FFE4E1',
    discountText: '#FF0069',
    cashbackBg: '#FFF0D4',
    cashbackText: '#F5A623',
    wishlistGradientStart: '#FFD1E3',
    wishlistGradientEnd: '#FFF2E6',
    cartBottomGradientStart: '#FF0069',
    cartBottomGradientEnd: '#FFCA7A',
    profileGradientStart: '#FF0069',
    profileGradientEnd: '#FFD498',
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
  },
  styles: {
    safeArea: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    shadowCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: scaleh(15),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 5,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.03)',
    }
  }
};
