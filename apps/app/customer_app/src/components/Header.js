import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { AppTheme, scaleh, scalev } from '../constants/AppTheme';

const Header = ({ showHeart = false, rightComponent, onBackPress, transparent = false, showLogo = true, backgroundColor = '#FFFFFF' }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.headerContainer, { backgroundColor: transparent ? 'transparent' : backgroundColor }]}>
      <TouchableOpacity onPress={() => onBackPress ? onBackPress() : navigation.navigate('Dashboard')} style={styles.iconButton}>
        <Icon name="chevron-left" size={scaleh(28)} color="#000" />
      </TouchableOpacity>

      {showLogo ? (
        <View style={styles.logoContainer}>
          <View style={styles.logoRow}>
            <Image
              source={require('../images/Logo/logo.webp')}
              style={styles.bigCLogo}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>OSKINn</Text>
            <Image
              source={require('../images/Logo/coskinLogo.webp')}
              style={styles.smallHeartLogoTop}
              resizeMode="contain"
            />
          </View>
        </View>
      ) : (
        <View style={{ flex: 1 }} />
      )}

      {rightComponent ? (
        rightComponent
      ) : (
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Image 
              source={showHeart ? require('../images/icons/Wishlist.webp') : require('../images/icons/Cart.webp')} 
              style={{ width: scaleh(24), height: scaleh(24), tintColor: '#1a1a1a' }} 
              resizeMode="contain" 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Search')}>
            <Icon name="search" size={scaleh(22)} color="#1a1a1a" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleh(20),
    paddingTop: scalev(10),
    paddingBottom: scalev(15),
    marginBottom: scalev(15),
    marginTop: scalev(35),
    // backgroundColor removed here to use dynamic style
  },
  iconButton: {
    padding: scaleh(5),
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigCLogo: {
    width: scaleh(55),
    height: scalev(55),
    marginRight: scaleh(-10),
  },
  logoText: {
    fontFamily: AppTheme.fonts.logo,
    fontSize: scaleh(32),
    marginTop: scalev(4),
    color: '#000000',
    includeFontPadding: false,
    letterSpacing: 0,
  },
  smallHeartLogoTop: {
    position: 'absolute',
    right: scaleh(40),
    top: -scalev(4),
    width: scaleh(14),
    height: scalev(14),
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleh(15),
  },
});

export default Header;
