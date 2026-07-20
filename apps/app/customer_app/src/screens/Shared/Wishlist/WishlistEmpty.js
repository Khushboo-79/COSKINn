import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { AppTheme, scaleh, scalev } from '../../../constants/AppTheme';

const WishlistEmpty = () => {
  const navigation = useNavigation();
  const activeDomain = useSelector(state => state.app?.activeDomain || 'skincare');
  const isCosmetics = activeDomain === 'cosmetics';

  const renderContent = (isCosmeticsStyle) => (
    <View style={styles.content}>
      <Image
        source={require('../../../images/Logo/coskinLogo.webp')}
        style={styles.logoIcon}
        resizeMode="contain"
      />

      <View style={styles.textContainer}>
        <Text style={styles.titleText}>
          Your <Text style={styles.titleHighlight}>WISHLIST</Text>
        </Text>
        <Text style={[styles.titleText, { marginBottom: scalev(40) }]}>
          is <Text style={styles.titleHighlight}>EMPTY !</Text>
        </Text>
      </View>

      <Text style={styles.subtitleText}>Add your favourites to Wishlist</Text>

      <TouchableOpacity
        style={[styles.addButton, isCosmeticsStyle ? styles.addButtonCosmetics : styles.addButtonSkincare]}
        onPress={() => navigation.navigate('Dashboard')}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>ADD TO WISHLIST</Text>
      </TouchableOpacity>
    </View>
  );

  if (isCosmetics) {
    return (
      <View style={styles.containerCosmetics}>
        <Image
          source={require('../../../images/makeup/CosmeticBackImg.webp')}
          style={[StyleSheet.absoluteFill, { width: '100%', height: '100%', opacity: 0.15 }]}
          resizeMode="cover"
        />
        {renderContent(true)}
      </View>
    );
  }

  // Original Skincare Layout
  return (
    <LinearGradient
      colors={['#FFD1DC', '#FFF1E6']} // Soft pink gradient
      style={styles.containerSkincare}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      {renderContent(false)}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  // Containers
  containerCosmetics: {
    flex: 1,
    backgroundColor: '#FFF0F5', // very light pink/white base for damask
  },
  containerSkincare: {
    flex: 1,
    marginTop: scalev(-10),
  },

  // Shared Content
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleh(30),
  },
  logoIcon: {
    width: scaleh(65),
    height: scalev(65),
    marginBottom: scalev(30),
  },
  textContainer: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: scaleh(24),
    color: '#FF0069',
    fontStyle: 'italic',
    fontWeight: '400',
  },
  titleHighlight: {
    fontWeight: '900',
  },
  subtitleText: {
    fontSize: scaleh(12),
    color: '#333333',
    fontStyle: 'italic',
    fontWeight: '600',
    marginBottom: scalev(30),
  },

  // Button Styles
  addButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: scalev(12),
    paddingHorizontal: scaleh(30),
    borderRadius: scaleh(25),
  },
  addButtonCosmetics: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  addButtonSkincare: {
    borderWidth: 1.5,
    borderColor: '#FF0069',
  },
  addButtonText: {
    color: '#FF0069',
    fontSize: scaleh(12),
    fontWeight: '700',
  },
});

export default WishlistEmpty;
