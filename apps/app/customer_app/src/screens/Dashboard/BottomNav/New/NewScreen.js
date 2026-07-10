import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { AppTheme, scaleh, scalev } from '../../../../constants/AppTheme';
import BottomNavBar from '../../../../constants/BottomNavBar';

// SVG for the customized COSKINn logo
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';

const Logo = () => (
  <View style={styles.logoContainer}>
    <Text style={styles.logoTextMain}>
      <Text style={styles.logoTextC}>C</Text>OSKINn
    </Text>
    <View style={styles.logoHeart}>
      <Svg height="14" width="14" viewBox="0 0 24 24">
        <Defs>
          <SvgLinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#FF0069" stopOpacity="1" />
            <Stop offset="1" stopColor="#FF9966" stopOpacity="1" />
          </SvgLinearGradient>
        </Defs>
        <Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="url(#grad)" />
      </Svg>
    </View>
  </View>
);

const NewScreen = () => {
  const navigation = useNavigation();

  const handleTabPress = (tabId) => {
    if (tabId === 'home') navigation.navigate('Dashboard');
    if (tabId === 'shop') navigation.navigate('Shop');
    if (tabId === 'new') navigation.navigate('NewScreen');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerIconBtn} onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={scaleh(24)} color="#1a1a1a" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Logo />
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerIconBtn} onPress={() => navigation.navigate('Cart')}>
              <Icon name="shopping-cart" size={scaleh(22)} color="#1a1a1a" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconBtn} onPress={() => navigation.navigate('Search')}>
              <Icon name="search" size={scaleh(22)} color="#1a1a1a" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <LinearGradient 
          colors={['#FFD1DC', '#FFF5F5', '#FFEFE5']} 
          style={styles.contentContainer}
        >
          <MaskedView
            style={styles.maskedView}
            maskElement={
              <View style={styles.maskWrapper}>
                <Text style={styles.comingSoonText}>Coming Soon</Text>
              </View>
            }
          >
            <LinearGradient
              colors={['#FF0069', '#FF9966']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientFill}
            />
          </MaskedView>
        </LinearGradient>

        <BottomNavBar 
          activeTab="new" 
          onTabPress={handleTabPress} 
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleh(20),
    paddingVertical: scalev(10),
    backgroundColor: '#FFFFFF',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: scaleh(20),
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconBtn: {
    padding: scaleh(5),
    marginLeft: scaleh(10),
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoTextMain: {
    fontSize: scaleh(24),
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 1,
  },
  logoTextC: {
    color: '#FF0069',
    fontSize: scaleh(28),
  },
  logoHeart: {
    position: 'absolute',
    top: scalev(2),
    right: scaleh(12),
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskedView: {
    height: scalev(100),
    width: '100%',
  },
  maskWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoonText: {
    fontSize: scaleh(36),
    fontWeight: '800',
    textAlign: 'center',
  },
  gradientFill: {
    flex: 1,
  },
});

export default NewScreen;
