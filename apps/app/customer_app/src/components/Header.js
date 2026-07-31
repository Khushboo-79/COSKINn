import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { AppTheme, scaleh, scalev } from '../constants/AppTheme';
import { useSelector } from 'react-redux';
import LogoText from './LogoText';

const Header = ({ showHeart = false, rightComponent, onBackPress, transparent = false, showLogo = true, backgroundColor = '#FFFFFF' }) => {
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems?.length || 0;

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
              style={styles.logoImage}
              resizeMode="contain"
            />
            <LogoText style={styles.logoText} />
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
            {showHeart ? (
              <Fontisto name="heart-alt" size={scaleh(20)} color="#1a1a1a" style={{ width: scaleh(24), height: scaleh(24), textAlign: 'center', textAlignVertical: 'center' }} />
            ) : (
              <Icon name="shopping-cart" size={scaleh(22)} color="#1a1a1a" style={{ width: scaleh(24), height: scaleh(24), textAlign: 'center', textAlignVertical: 'center' }} />
            )}
            {!showHeart && cartCount > 0 && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
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
    paddingTop: scalev(-5),
    paddingBottom: scalev(-5),
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
  logoImage: {
    width: scaleh(65),
    height: scalev(65),
    marginRight: scaleh(-25),
  },
  logoText: {
    fontFamily: AppTheme.fonts.logo,
    fontSize: scaleh(27),
    color: '#C4877A',
    includeFontPadding: false,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleh(15),
  },
  badgeContainer: {
    position: 'absolute',
    top: scalev(0),
    right: scaleh(0),
    backgroundColor: '#FF0069',
    borderRadius: scaleh(10),
    minWidth: scaleh(16),
    height: scalev(16),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleh(4),
  },
  badgeText: {
    color: '#FFF',
    fontSize: scaleh(10),
    fontWeight: '700',
  },
});

export default Header;
