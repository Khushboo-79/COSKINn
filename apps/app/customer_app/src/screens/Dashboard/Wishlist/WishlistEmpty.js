import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { AppTheme, scaleh, scalev } from '../../../constants/AppTheme';

const WishlistEmpty = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={[AppTheme.colors.wishlistGradientStart, AppTheme.colors.wishlistGradientEnd]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.content}>
        <Image
          source={require('../../../images/Logo/logo.webp')}
          style={styles.logoIcon}
          resizeMode="contain"
        />

        <View style={styles.textContainer}>
          <Text style={styles.titleText}>
            Your <Text style={styles.titleHighlight}>WISHLIST</Text>
          </Text>
          <Text style={styles.titleText}>
            is <Text style={styles.titleHighlight}>EMPTY !</Text>
          </Text>
        </View>

        <Text style={styles.subtitleText}>Add your favourites to Wishlist</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Dashboard')}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>ADD TO WISHLIST</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: scalev(-10),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
  },
  logoIcon: {
    width: scaleh(80),
    height: scalev(80),
    marginBottom: scalev(30),
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: scalev(40),
  },
  titleText: {
    fontSize: scaleh(24),
    color: AppTheme.colors.primary,
    fontStyle: 'italic',
  },
  titleHighlight: {
    fontWeight: '900',
  },
  subtitleText: {
    fontSize: scaleh(12),
    color: AppTheme.colors.textDark,
    fontStyle: 'italic',
    marginBottom: scalev(20),
  },
  addButton: {
    backgroundColor: AppTheme.colors.white,
    borderWidth: 1.5,
    borderColor: AppTheme.colors.primary,
    borderRadius: scaleh(25),
    paddingVertical: scalev(10),
    paddingHorizontal: scaleh(25),
  },
  addButtonText: {
    color: AppTheme.colors.primary,
    fontSize: scaleh(12),
    fontWeight: '700',
  },
});

export default WishlistEmpty;
