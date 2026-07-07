import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { AppTheme, scaleh, scalev } from '../../../constants/AppTheme';

const CartEmpty = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={[AppTheme.colors.wishlistGradientStart, AppTheme.colors.wishlistGradientEnd]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.content}>
        
        {/* Large Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../images/Logo/logo.webp')}
            style={styles.bigCLogo}
            resizeMode="contain"
          />
          <Image
            source={require('../../../images/Logo/coskinLogo.webp')}
            style={styles.smallHeartLogoTop}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.titleText}>
            Your <Text style={styles.titleHighlight}>CART</Text>
          </Text>
          <Text style={styles.titleText}>
            is <Text style={styles.titleHighlight}>EMPTY !</Text>
          </Text>
        </View>

        <View style={styles.cartIconContainer}>
          <Icon name="shopping-cart" size={scaleh(60)} color={AppTheme.colors.primary} />
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Dashboard')}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>ADD TO CART</Text>
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
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scalev(30),
    position: 'relative',
    height: scalev(80),
    width: scaleh(80),
  },
  bigCLogo: {
    width: '100%',
    height: '100%',
  },
  smallHeartLogoTop: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: scaleh(20),
    height: scalev(20),
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
  cartIconContainer: {
    marginBottom: scalev(40),
  },
  addButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: AppTheme.colors.primary,
    borderRadius: scaleh(25),
    paddingVertical: scalev(12),
    paddingHorizontal: scaleh(40),
  },
  addButtonText: {
    color: AppTheme.colors.primary,
    fontSize: scaleh(12),
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

export default CartEmpty;
