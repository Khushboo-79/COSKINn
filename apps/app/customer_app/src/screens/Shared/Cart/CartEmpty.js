import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { AppTheme, scaleh, scalev } from '../../../constants/AppTheme';

const CartEmpty = () => {
  const navigation = useNavigation();
  const activeDomain = useSelector(state => state.app?.activeDomain || 'skincare');
  const isCosmetics = activeDomain === 'cosmetics';
  const primaryColor = isCosmetics ? '#FF0069' : AppTheme.colors.primary;

  if (isCosmetics) {
    return (
      <LinearGradient
        colors={['#FF006926', '#FFD49826']}
        style={styles.containerCosmetics}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.contentCosmetics}>
          <View style={styles.emptyLogoBox}>
            <Text style={styles.emptyLogoText}>C</Text>
            <View style={styles.emptyLogoHeartTop}>
              <Icon name="heart" size={scaleh(16)} color="#FF0069" />
            </View>
            <View style={styles.emptyLogoHeartBottom}>
              <Icon name="heart" size={scaleh(20)} color="#FF0069" />
            </View>
          </View>

          <View style={styles.textContainerCosmetics}>
            <Text style={styles.titleTextLineCosmetics}>
              Your <Text style={styles.titleHighlightCosmetics}>CART</Text>
            </Text>
            <Text style={[styles.titleTextLineCosmetics, { marginBottom: scalev(40) }]}>
              is <Text style={styles.titleHighlightCosmetics}>EMPTY !</Text>
            </Text>
          </View>

          <View style={styles.cartIconBoxCosmetics}>
            <Icon name="shopping-cart" size={scaleh(40)} color="#FF0069" />
          </View>

          <TouchableOpacity
            style={styles.addButtonCosmetics}
            onPress={() => navigation.navigate('Dashboard')}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonTextCosmetics}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

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
  // Cosmetics Styles
  containerCosmetics: {
    flex: 1,
  },
  contentCosmetics: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleh(30),
  },
  emptyLogoBox: {
    width: scaleh(90),
    height: scaleh(90),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scalev(40),
    position: 'relative',
    borderWidth: 1,
    borderColor: '#FF006930',
    backgroundColor: '#FF006908',
  },
  emptyLogoText: {
    fontSize: scaleh(70),
    fontWeight: '700',
    color: '#FF708C',
    fontStyle: 'italic',
    lineHeight: scaleh(85),
  },
  emptyLogoHeartTop: {
    position: 'absolute',
    top: scalev(5),
    right: scaleh(5),
  },
  emptyLogoHeartBottom: {
    position: 'absolute',
    bottom: scalev(-5),
    right: scaleh(-5),
  },
  textContainerCosmetics: {
    alignItems: 'center',
  },
  titleTextLineCosmetics: {
    fontSize: scaleh(26),
    color: '#FF708C',
    fontStyle: 'italic',
    fontWeight: '400',
  },
  titleHighlightCosmetics: {
    fontWeight: '900',
  },
  cartIconBoxCosmetics: {
    width: scaleh(60),
    height: scaleh(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF006940',
    backgroundColor: '#FF006905',
    marginBottom: scalev(40),
  },
  addButtonCosmetics: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FF0069',
    paddingVertical: scalev(12),
    paddingHorizontal: scaleh(50),
    borderRadius: scaleh(25),
  },
  addButtonTextCosmetics: {
    color: '#FF0069',
    fontSize: scaleh(12),
    fontWeight: '700',
    letterSpacing: 1,
  },

  // Skincare Styles
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
