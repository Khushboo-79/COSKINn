import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppTheme } from '../../constants/AppTheme';

const SignIn = () => {
  const insets = useSafeAreaInsets();
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <LinearGradient
        colors={[AppTheme.colors.primaryGradientStart, AppTheme.colors.primaryGradientEnd]}
        style={styles.backgroundImage}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={[styles.contentContainer, { paddingTop: insets.top + 40 }]}>
            
            {/* Top Logo Section */}
            <View style={styles.headerContainer}>
              <View style={styles.logoRow}>
                <Image
                  source={require('../../assets/images/logo.webp')}
                  style={styles.mainCLogo}
                  resizeMode="contain"
                />
                <Text style={styles.logoTextOSK}>OSK</Text>
                
                <View style={styles.iContainer}>
                  <Image
                    source={require('../../assets/images/coskinLogo.webp')}
                    style={styles.heartDot}
                    resizeMode="contain"
                  />
                  {/* We make the actual I text transparent or very light so the heart acts as the dot */}
                  <Text style={styles.logoTextI}>I</Text>
                </View>
                
                <Text style={styles.logoTextN}>N<Text style={styles.logoTextSmallN}>n</Text></Text>
              </View>
              <Text style={styles.tagline}>Your skin needs pure</Text>
            </View>

            {/* Glassmorphism Form Container */}
            <View style={styles.formWrapper}>
              
              {/* Background gradient/glass for the card */}
              <View style={styles.cardBackground} />
              
              {/* Top Left Clipped C Logo */}
              <Image
                source={require('../../assets/images/logo.webp')}
                style={styles.clipTopLeft}
                resizeMode="contain"
              />
              
              {/* Bottom Right Clipped Heart Logo */}
              <Image
                source={require('../../assets/images/coskinLogo.webp')}
                style={styles.clipBottomRight}
                resizeMode="contain"
              />

              <View style={styles.formInnerContainer}>
                <Text style={styles.formTitle}>Sign in with mobile number</Text>

                {/* Input Row */}
                <View style={styles.inputContainer}>
                  <TouchableOpacity style={styles.countryCodeContainer}>
                    <Text style={styles.countryCode}>+91</Text>
                    <Text style={styles.dropdownIcon}>v</Text>
                  </TouchableOpacity>
                  
                  <View style={styles.separator} />
                  
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter mobile number"
                    placeholderTextColor="#A0A0A0"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                  />
                </View>

                {/* Gradient Button */}
                <TouchableOpacity activeOpacity={0.8} style={styles.buttonWrapper}>
                  <LinearGradient
                    colors={[AppTheme.colors.buttonGradientStart, AppTheme.colors.buttonGradientEnd]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>Send OTP</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <Text style={styles.helperText}>
                  We'll send a verification code to your phone
                </Text>
              </View>
            </View>
            
            {/* Spacer to push content up */}
            <View style={{ flex: 1 }} />
            
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  keyboardView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  mainCLogo: {
    width: 55,
    height: 55,
    marginRight: -4, 
    marginBottom: -4,
  },
  logoTextOSK: {
    fontSize: 44,
    fontFamily: AppTheme.fonts.logo,
    color: AppTheme.colors.textDark,
    marginBottom: 0,
    letterSpacing: 1,
  },
  iContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    marginHorizontal: 1,
  },
  heartDot: {
    position: 'absolute',
    top: -4,
    width: 22,
    height: 18,
    zIndex: 10,
  },
  logoTextI: {
    fontSize: 44,
    fontFamily: AppTheme.fonts.logo,
    color: 'transparent',
    textShadowColor: AppTheme.colors.textDark,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 1,
    marginBottom: 0,
  },
  logoTextN: {
    fontSize: 44,
    fontFamily: AppTheme.fonts.logo,
    color: AppTheme.colors.textDark,
    marginBottom: 0,
    letterSpacing: 1,
  },
  logoTextSmallN: {
    fontSize: 32,
  },
  tagline: {
    fontSize: 20,
    fontFamily: AppTheme.fonts.regular,
    color: AppTheme.colors.textDark,
    marginTop: -2,
  },
  formWrapper: {
    width: AppTheme.metrics.screenWidth - 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    position: 'relative',
    overflow: 'visible',
  },
  cardBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.25)', 
    borderRadius: 24,
  },
  clipTopLeft: {
    position: 'absolute',
    top: -24,
    left: -20,
    width: 50,
    height: 50,
    transform: [{ rotate: '-15deg' }],
    opacity: 0.9,
    zIndex: 2,
  },
  clipBottomRight: {
    position: 'absolute',
    bottom: -35,
    right: -25,
    width: 75,
    height: 65,
    transform: [{ rotate: '15deg' }],
    zIndex: 2,
  },
  formInnerContainer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
    zIndex: 1, 
  },
  formTitle: {
    fontSize: 24,
    fontFamily: AppTheme.fonts.medium,
    color: AppTheme.colors.textDark,
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: 56,
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 4,
  },
  countryCode: {
    fontSize: 16,
    fontFamily: AppTheme.fonts.medium,
    color: AppTheme.colors.textDark,
    marginRight: 6,
  },
  dropdownIcon: {
    fontSize: 14,
    fontFamily: AppTheme.fonts.medium,
    color: AppTheme.colors.textDark,
    marginTop: 2,
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: AppTheme.fonts.regular,
    color: AppTheme.colors.textDark,
    paddingVertical: 0, 
  },
  buttonWrapper: {
    width: '100%',
    borderRadius: 28,
    shadowColor: AppTheme.colors.buttonGradientStart,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  buttonGradient: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: AppTheme.fonts.medium,
  },
  helperText: {
    fontSize: 14,
    fontFamily: AppTheme.fonts.regular,
    color: '#4B5563', 
  },
});

export default SignIn;
