import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppTheme, scalev, scaleh } from '../../constants/AppTheme';
import LogoText from '../../components/LogoText';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  const textTranslateY = useRef(new Animated.Value(20)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  const taglineTranslateY = useRef(new Animated.Value(20)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      Animated.delay(200), // Short pause at start
      // 1. Logo image pop in
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 15,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // 2. Logo text slide up & fade in
      Animated.parallel([
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      // 3. Tagline slide up & fade in
      Animated.parallel([
        Animated.timing(taglineTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [logoScale, logoOpacity, textTranslateY, textOpacity, taglineTranslateY, taglineOpacity]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[AppTheme.colors.backgroundStart, AppTheme.colors.backgroundEnd]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Background Decor */}
      <View style={styles.decorTopLeft} />
      <View style={styles.decorBottomRight} />

      <View style={styles.contentContainer}>
        <View style={styles.logoRow}>
          <Animated.View style={[styles.logoImageContainer, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
            <Image
              source={require('../../images/Logo/logo.webp')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </Animated.View>

          <Animated.View style={[styles.textWrapper, { opacity: textOpacity, transform: [{ translateY: textTranslateY }] }]}>
            <LogoText style={styles.logoText} />
          </Animated.View>
        </View>

        <Animated.View style={{ opacity: taglineOpacity, transform: [{ translateY: taglineTranslateY }] }}>
          <Text style={styles.tagline}>Redefining Elegance</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scalev(10),
  },
  decorTopLeft: {
    position: 'absolute',
    top: -width * 0.4,
    left: -width * 0.2,
    width: width,
    height: width,
    borderRadius: width / 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  decorBottomRight: {
    position: 'absolute',
    bottom: -width * 0.5,
    right: -width * 0.3,
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width * 0.6,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  logoImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#C4877A',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: 'transparent',
    marginRight: scaleh(-10), // pull text closer
  },
  logoImage: {
    width: scaleh(150),
    height: scalev(150),
    marginRight: scaleh(-55),
  },
  textWrapper: {
    marginTop: scalev(5),
  },
  logoText: {
    fontSize: scaleh(48),
  },
  tagline: {
    fontSize: scaleh(16),
    color: '#665751',
    letterSpacing: 3,
    fontWeight: '400',
    fontFamily: AppTheme.fonts.regular,
  },
});

export default SplashScreen;
