import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const SignIn = () => {
  const insets = useSafeAreaInsets();
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ImageBackground
        source={require('../../images/bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={[styles.contentContainer, { paddingTop: insets.top }]}>
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <View style={styles.logoIconContainer}>
              <Text style={styles.peachEmoji}>🍑</Text>
            </View>
            <Text style={styles.logoText}>COSKINn</Text>
            <Text style={styles.tagline}>Fresh care for glowing skin</Text>
          </View>

          {/* Glassmorphism Form Container */}
          <View style={styles.formWrapper}>
            <BlurView
              style={styles.blurView}
              blurType="light"
              blurAmount={20}
              reducedTransparencyFallbackColor="white"
            />
            
            <View style={styles.formInnerContainer}>
              {/* Peach Icon over the form */}
              <View style={styles.floatingIconContainer}>
                <Text style={styles.floatingPeachEmoji}>🍑</Text>
              </View>

              <Text style={styles.formTitle}>Sign in with mobile number</Text>

              {/* Input Row */}
              <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.countryCodeContainer}>
                  <Text style={styles.flag}>🇮🇳</Text>
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
                  colors={['#FCA5A5', '#E9D5FF', '#93C5FD']}
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
        </View>
      </ImageBackground>
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
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 40, // Space at the bottom
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logoIconContainer: {
    marginBottom: 5,
  },
  peachEmoji: {
    fontSize: 40,
  },
  logoText: {
    fontSize: 42,
    fontWeight: '700',
    color: '#0F2636',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 14,
    color: '#E06B74',
    marginTop: 4,
    fontWeight: '500',
  },
  formWrapper: {
    marginHorizontal: 24,
    marginBottom: Platform.OS === 'ios' ? 80 : 120, // adjust based on background product image layout
    borderRadius: 30,
    overflow: 'visible',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // fallback and light tint
  },
  formInnerContainer: {
    paddingHorizontal: 20,
    paddingTop: 45, // Make room for the floating icon
    paddingBottom: 30,
    alignItems: 'center',
  },
  floatingIconContainer: {
    position: 'absolute',
    top: -25,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  floatingPeachEmoji: {
    fontSize: 24,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0F2636',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    height: 56,
    width: '100%',
    paddingHorizontal: 15,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 20,
    marginRight: 8,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F2636',
    marginRight: 6,
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#0F2636',
    fontWeight: 'bold',
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
    color: '#0F2636',
  },
  buttonWrapper: {
    width: '100%',
    shadowColor: '#FCA5A5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonGradient: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  helperText: {
    marginTop: 20,
    fontSize: 12,
    color: '#6B7280',
  },
});

export default SignIn;
