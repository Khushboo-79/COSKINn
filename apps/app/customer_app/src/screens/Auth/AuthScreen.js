import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Alert, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppTheme, scaleh, scalev } from '../../constants/AppTheme';
import api from '../../services/api';

const AuthScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      Alert.alert('Invalid Number', 'Please enter a valid mobile number.');
      return;
    }

    setLoading(true);
    try {
      const formattedPhone = `+91${phone}`;
      await api.post('/auth/send-otp', { phone: formattedPhone });
      navigation.navigate('Otp', { phone: formattedPhone });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to send OTP. Please try again.');
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
              <Text style={styles.cardTitle}>Sign in with mobile number</Text>

              <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.countryCodeButton}>
                  <Text style={styles.countryCodeText}>+91</Text>
                  <Text style={styles.dropdownIcon}>▼</Text>
                </TouchableOpacity>

                <View style={styles.divider} />

                <TextInput
                  style={styles.textInput}
                  placeholder="Enter mobile number"
                  placeholderTextColor={AppTheme.colors.textLight}
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                  maxLength={10}
                  editable={!loading}
                />
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.sendOtpWrapper}
                onPress={handleSendOtp}
                disabled={loading}
              >
                <LinearGradient
                  colors={[AppTheme.colors.primary, AppTheme.colors.secondary]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.sendOtpGradient}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <Text style={styles.sendOtpText}>Send OTP</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              <Text style={styles.footerText}>We'll send a verification code to your phone</Text>
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
    paddingBottom: scalev(40), // Add some bottom padding for scroll
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
    paddingLeft: scaleh(2), // shift a bit to balance the C
  },
  bigCLogo: {
    width: scaleh(60),
    height: scalev(60),
    marginRight: -scaleh(5), // slight overlap
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
    right: scaleh(23), // Adjust this value to perfectly align above the 'I'
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
    paddingVertical: scalev(60),
    paddingHorizontal: scaleh(20),
    borderWidth: 1.5,
    borderColor: AppTheme.colors.cardBorder,
    alignItems: 'center',
    zIndex: 10,
  },
  cardTitle: {
    fontSize: scaleh(18),
    fontWeight: '400',
    color: '#1a1a1a',
    marginBottom: scalev(30),
  },

  // Input
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    height: scalev(55),
    backgroundColor: AppTheme.colors.white,
    borderRadius: scaleh(12),
    borderWidth: 1,
    borderColor: AppTheme.colors.cardBorder,
    alignItems: 'center',
    marginBottom: scalev(25),
  },
  countryCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleh(15),
    height: '100%',
    justifyContent: 'center',
  },
  countryCodeText: {
    fontSize: scaleh(15),
    color: '#1a1a1a',
    marginRight: scaleh(6),
  },
  dropdownIcon: {
    fontSize: scaleh(10),
    color: '#1a1a1a',
  },
  divider: {
    width: 1,
    height: '60%',
    backgroundColor: AppTheme.colors.cardBorder,
  },
  textInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: scaleh(15),
    fontSize: scaleh(14),
    color: '#1a1a1a',
  },

  // Button
  sendOtpWrapper: {
    width: '100%',
    height: scalev(55),
    borderRadius: scaleh(28),
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 0, 105, 0.4)', // Adding border as per reference
    marginBottom: scalev(20),
  },
  sendOtpGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendOtpText: {
    color: AppTheme.colors.white,
    fontSize: scaleh(17),
    fontWeight: '400',
  },

  // Footer text
  footerText: {
    fontSize: scaleh(12),
    color: '#555555',
  }
});

export default AuthScreen;
