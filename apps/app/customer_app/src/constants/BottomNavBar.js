import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Polygon } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { AppTheme, scaleh, scalev } from './AppTheme';

const tabs = [
  { id: 'home', label: 'Home', iconSource: require('../images/icons/Home.webp') },
  { id: 'shop', label: 'Shop', iconSource: require('../images/icons/Shop.webp') },
  { id: 'new', label: 'New', iconSource: require('../images/icons/New.webp') },
  { id: 'rewards', label: 'Rewards', iconSource: require('../images/icons/Rewards.webp') },
  { id: 'account', label: 'Account', iconSource: require('../images/icons/Account.webp') },
];

const BottomNavBar = ({ activeTab = 'home', onTabPress }) => {
  const activeDomain = useSelector(state => state.app?.activeDomain || 'skincare');
  const isCosmetics = activeDomain === 'cosmetics';
  const navBorderColor = isCosmetics ? '#FFC2D1' : AppTheme.colors.primary;
  
  // For Cosmetics, the active tab icon and text remain dark (#1a1a1a), only the spotlight appears.
  const activeIconColor = isCosmetics ? '#1a1a1a' : AppTheme.colors.primary; 

  return (
    <View style={[styles.container, { borderColor: navBorderColor }]}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const label = tab.customLabel || tab.label;

        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => onTabPress && onTabPress(tab.id)}
            activeOpacity={0.8}
          >
            {isActive && (
              <View style={styles.spotlightContainer}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <Defs>
                    <SvgLinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <Stop offset="0" stopColor={isCosmetics ? '#FFE4EB' : 'rgba(255, 0, 106, 0.10)'} />
                      <Stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
                    </SvgLinearGradient>
                  </Defs>
                  <Polygon points="35,0 65,0 100,100 0,100" fill="url(#grad)" />
                </Svg>
              </View>
            )}

            <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
              <Image 
                source={tab.iconSource} 
                style={{ width: scaleh(24), height: scaleh(24), tintColor: isActive ? activeIconColor : '#1a1a1a' }} 
                resizeMode="contain" 
              />
            </View>
            <Text style={[styles.label, isActive && { color: activeIconColor }]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: scalev(80),
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: scaleh(30),
    borderTopRightRadius: scaleh(30),
    borderWidth: 1.5,
    borderBottomWidth: 0, // No bottom border
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: scaleh(10),
    position: 'absolute',
    bottom: 0,
    width: '100%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spotlightContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  iconContainer: {
    marginTop: scalev(10),
    marginBottom: scalev(5),
    zIndex: 1,
  },
  activeIconContainer: {
    // Add any specific active icon styling if needed
  },
  label: {
    fontSize: scaleh(12),
    color: '#1a1a1a',
    fontWeight: '500',
    zIndex: 1,
  },
  activeLabel: {
    color: AppTheme.colors.primary,
  },
  topNotch: {
    position: 'absolute',
    top: -1.5,
    alignSelf: 'center',
    width: '30%',
    height: scalev(4),
    borderBottomLeftRadius: scaleh(2),
    borderBottomRightRadius: scaleh(2),
    zIndex: 2,
  },
});

export default BottomNavBar;
