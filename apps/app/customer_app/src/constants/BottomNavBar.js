import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Home, ShoppingBag, Sparkles, Ticket, User } from 'lucide-react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Polygon } from 'react-native-svg';
import { AppTheme, scaleh, scalev } from './AppTheme';

const tabs = [
  { id: 'home', label: 'Home', IconComponent: Home },
  { id: 'shop', label: 'Shop', IconComponent: ShoppingBag },
  { id: 'new', label: 'Sparkles', IconComponent: Sparkles },
  { id: 'rewards', label: 'Rewards', IconComponent: Ticket },
  { id: 'account', label: 'Account', IconComponent: User },
];

const BottomNavBar = ({ activeTab = 'home', onTabPress }) => {
  return (
    <View style={styles.container}>
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
                      <Stop offset="0" stopColor="rgba(255, 0, 106, 0.10)" />
                      <Stop offset="1" stopColor="#FFFFFF" />
                    </SvgLinearGradient>
                  </Defs>
                  <Polygon points="25,0 75,0 100,100 0,100" fill="url(#grad)" />
                </Svg>
              </View>
            )}

            <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
              <tab.IconComponent
                size={scaleh(24)}
                color={isActive ? AppTheme.colors.primary : '#1a1a1a'}
                strokeWidth={2}
              />
            </View>
            <Text style={[styles.label, isActive && styles.activeLabel]}>
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
    borderColor: AppTheme.colors.primary,
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
});

export default BottomNavBar;
