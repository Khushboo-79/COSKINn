import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { AppTheme, scaleh, scalev } from '../../../constants/AppTheme';

const WishlistEmpty = () => {
  const navigation = useNavigation();
  const activeDomain = useSelector(state => state.app?.activeDomain || 'skincare');
  const isCosmetics = activeDomain === 'cosmetics';

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
              <Ionicons name="heart" size={scaleh(16)} color="#FF0069" />
            </View>
            <View style={styles.emptyLogoHeartBottom}>
              <Ionicons name="heart" size={scaleh(20)} color="#FF0069" />
            </View>
          </View>

          <View style={styles.textContainerCosmetics}>
            <Text style={styles.titleTextLineCosmetics}>
              Your <Text style={styles.titleHighlightCosmetics}>WISHLIST</Text>
            </Text>
            <Text style={[styles.titleTextLineCosmetics, { marginBottom: scalev(40) }]}>
              is <Text style={styles.titleHighlightCosmetics}>EMPTY !</Text>
            </Text>
          </View>

          <Text style={styles.subtitleTextCosmetics}>Add your favourites to Wishlist</Text>

          <TouchableOpacity
            style={styles.addButtonCosmetics}
            onPress={() => navigation.navigate('Dashboard')}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonTextCosmetics}>ADD TO WISHLIST</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  // Original Skincare Layout
  return (
    <LinearGradient
      colors={[AppTheme.colors.wishlistGradientStart, AppTheme.colors.wishlistGradientEnd]}
      style={styles.containerSkincare}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.contentSkincare}>
        <Image
          source={require('../../../images/Logo/logo.webp')}
          style={styles.logoIconSkincare}
          resizeMode="contain"
        />

        <View style={styles.textContainerSkincare}>
          <Text style={styles.titleTextSkincare}>
            Your <Text style={styles.titleHighlightSkincare}>WISHLIST</Text>
          </Text>
          <Text style={styles.titleTextSkincare}>
            is <Text style={styles.titleHighlightSkincare}>EMPTY !</Text>
          </Text>
        </View>

        <Text style={styles.subtitleTextSkincare}>Add your favourites to Wishlist</Text>

        <TouchableOpacity
          style={styles.addButtonSkincare}
          onPress={() => navigation.navigate('Dashboard')}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonTextSkincare}>ADD TO WISHLIST</Text>
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
    fontWeight: '800',
    fontStyle: 'italic',
  },
  subtitleTextCosmetics: {
    fontSize: scaleh(13),
    color: '#333333',
    fontStyle: 'italic',
    fontWeight: '600',
    marginBottom: scalev(30),
  },
  addButtonCosmetics: {
    backgroundColor: AppTheme.colors.white,
    paddingVertical: scalev(12),
    paddingHorizontal: scaleh(30),
    borderRadius: scaleh(25),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  addButtonTextCosmetics: {
    color: '#333',
    fontSize: scaleh(12),
    fontWeight: '700',
  },

  // Skincare Styles
  containerSkincare: {
    flex: 1,
    marginTop: scalev(-10),
  },
  contentSkincare: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
  },
  logoIconSkincare: {
    width: scaleh(80),
    height: scalev(80),
    marginBottom: scalev(30),
  },
  textContainerSkincare: {
    alignItems: 'center',
    marginBottom: scalev(40),
  },
  titleTextSkincare: {
    fontSize: scaleh(24),
    color: AppTheme.colors.primary,
    fontStyle: 'italic',
  },
  titleHighlightSkincare: {
    fontWeight: '900',
  },
  subtitleTextSkincare: {
    fontSize: scaleh(12),
    color: AppTheme.colors.textDark,
    fontStyle: 'italic',
    marginBottom: scalev(20),
  },
  addButtonSkincare: {
    backgroundColor: AppTheme.colors.white,
    borderWidth: 1.5,
    borderColor: AppTheme.colors.primary,
    borderRadius: scaleh(25),
    paddingVertical: scalev(10),
    paddingHorizontal: scaleh(25),
  },
  addButtonTextSkincare: {
    color: AppTheme.colors.primary,
    fontSize: scaleh(12),
    fontWeight: '700',
  },
});

export default WishlistEmpty;
