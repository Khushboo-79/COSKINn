import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Alert, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppTheme, scaleh, scalev } from '../../constants/AppTheme';
import api from '../../services/api';
import { setCredentials } from '../../redux/slices/authSlice';

const OtpScreen = ({ navigation, route }) => {
  const phone = route.params?.phone || '';
  const dispatch = useDispatch();
  
  // Twilio verify codes are typically 6 digits
  const OTP_LENGTH = 6;
  const [otpValues, setOtpValues] = useState(Array(OTP_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  const focusNext = (index, value) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (index < inputRefs.current.length - 1 && value) {
      inputRefs.current[index + 1].focus();
    }
  };

  const focusPrevious = (key, index) => {
    if (key === 'Backspace' && index > 0 && !otpValues[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = otpValues.join('');
    if (otpCode.length < OTP_LENGTH) {
      Alert.alert('Incomplete OTP', 'Please enter the complete verification code.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/verify-otp', { phone, otp: otpCode });
      const { access_token, refresh_token, user } = response.data;
      
      // Save tokens securely
      await AsyncStorage.setItem('access_token', access_token);
      if (refresh_token) {
        await AsyncStorage.setItem('refresh_token', refresh_token);
      }

      // Dispatch to Redux (this will automatically switch the navigation stack)
      dispatch(setCredentials({ user, access_token, refresh_token }));
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.response?.data?.message || 'Invalid or expired OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[AppTheme.colors.backgroundStart, AppTheme.colors.backgroundEnd]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <View style={styles.logoRow}>
              <Image
                source={require('../../images/Logo/logo.webp')}
                style={styles.bigCLogo}
                resizeMode="contain"
              />
              <Text style={styles.logoText}>OSKINn</Text>
              {/* Small heart above the 'I' */}
              <Image
                source={require('../../images/Logo/coskinLogo.webp')}
                style={styles.smallHeartLogoTop}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.tagline}>Your skin needs pure</Text>
          </View>

          <View style={styles.cardContainer}>
            {/* Floating elements behind card */}
            <Image
              source={require('../../images/Logo/logo.webp')}
              style={styles.floatingTopLeft}
              resizeMode="contain"
            />
            <Image
              source={require('../../images/Logo/coskinLogo.webp')}
              style={styles.floatingBottomRight}
              resizeMode="contain"
            />

            {/* Card Section */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Enter OTP</Text>
              <Text style={styles.subTitle}>Code sent to <Text style={styles.highlightText}>{phone || '+91 XXXXX XXXXX'}</Text></Text>

              <View style={styles.otpContainer}>
                {Array(OTP_LENGTH).fill(0).map((_, index) => (
                  <View key={index} style={styles.otpInputWrapper}>
                    <TextInput
                      style={styles.otpInput}
                      keyboardType="number-pad"
                      maxLength={1}
                      ref={ref => inputRefs.current[index] = ref}
                      value={otpValues[index]}
                      onChangeText={value => focusNext(index, value)}
                      onKeyPress={e => focusPrevious(e.nativeEvent.key, index)}
                      editable={!loading}
                    />
                    <View style={styles.otpUnderline} />
                  </View>
                ))}
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.verifyWrapper}
                onPress={handleVerifyOtp}
                disabled={loading}
              >
                <LinearGradient
                  colors={[AppTheme.colors.primary, AppTheme.colors.secondary]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.verifyGradient}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <Text style={styles.verifyText}>Verify</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              <Text style={styles.footerText}>
                Resend OTP in <Text style={styles.timerText}>00:50</Text>
              </Text>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: scalev(80),
    paddingBottom: scalev(40),
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: scalev(80),
    marginTop: scalev(30),
    zIndex: 10,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: scaleh(2),
  },
  bigCLogo: {
    width: scaleh(60),
    height: scalev(60),
    marginRight: -scaleh(5),
  },
  logoText: {
    fontFamily: AppTheme.fonts.logo,
    fontSize: scaleh(42),
    color: '#000000',
    includeFontPadding: false,
    letterSpacing: 0,
  },
  smallHeartLogoTop: {
    position: 'absolute',
    right: scaleh(23),
    top: -scalev(6),
    width: scaleh(16),
    height: scalev(16),
  },
  tagline: {
    fontSize: scaleh(16),
    color: '#333333',
    marginTop: scalev(8),
    fontWeight: '400',
  },

  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  // Floating decorative elements
  floatingTopLeft: {
    position: 'absolute',
    left: scaleh(15),
    top: -scalev(30),
    width: scaleh(60),
    height: scalev(60),
    opacity: 0.9,
    zIndex: 20,
  },
  floatingBottomRight: {
    position: 'absolute',
    right: scaleh(25),
    bottom: -scalev(35),
    width: scaleh(65),
    height: scalev(65),
    zIndex: 20,
  },

  // Card
  card: {
    width: scaleh(330),
    backgroundColor: AppTheme.colors.cardBackground,
    borderRadius: scaleh(25),
    paddingVertical: scalev(50),
    paddingHorizontal: scaleh(20),
    borderWidth: 1.5,
    borderColor: AppTheme.colors.cardBorder,
    alignItems: 'center',
    zIndex: 10,
  },
  cardTitle: {
    fontSize: scaleh(22),
    fontWeight: '400',
    color: '#1a1a1a',
    marginBottom: scalev(10),
  },
  subTitle: {
    fontSize: scaleh(14),
    color: '#333',
    marginBottom: scalev(30),
  },
  highlightText: {
    color: AppTheme.colors.primary,
  },

  // OTP Input
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: scalev(30),
  },
  otpInputWrapper: {
    width: scaleh(42),
    height: scalev(55),
    backgroundColor: AppTheme.colors.white,
    borderRadius: scaleh(10),
    borderWidth: 1.5,
    borderColor: AppTheme.colors.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: {
    flex: 1,
    width: '100%',
    textAlign: 'center',
    fontSize: scaleh(16),
    color: '#1a1a1a',
    padding: 0, // Remove default padding on Android
  },
  otpUnderline: {
    width: '50%',
    height: 1.5,
    backgroundColor: AppTheme.colors.cardBorder,
    position: 'absolute',
    bottom: scalev(8),
  },

  // Button
  verifyWrapper: {
    width: '100%',
    height: scalev(55),
    borderRadius: scaleh(28),
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 0, 105, 0.4)', // Added border as per user request
    marginBottom: scalev(20),
  },
  verifyGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyText: {
    color: AppTheme.colors.white,
    fontSize: scaleh(17),
    fontWeight: '400',
  },

  // Footer text
  footerText: {
    fontSize: scaleh(12),
    color: '#555555',
  },
  timerText: {
    color: AppTheme.colors.primary,
  }
});

export default OtpScreen;
