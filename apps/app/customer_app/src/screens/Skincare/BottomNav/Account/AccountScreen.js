import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppTheme, scaleh, scalev } from '../../../../constants/AppTheme';
import BottomNavBar from '../../../../constants/BottomNavBar';
import ProfileHeader from '../../../../components/ProfileHeader';
import { logout } from '../../../../redux/slices/authSlice';
import api from '../../../../services/api';
import { useSelector } from 'react-redux';
import { Image } from 'react-native';

const AccountScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const activeDomain = useSelector(state => state.app?.activeDomain || 'skincare');
  const isCosmetics = activeDomain === 'cosmetics';

  const handleTabPress = (tabId) => {
    if (tabId === 'home') navigation.navigate('Dashboard');
    if (tabId === 'shop') navigation.navigate('Shop');
    if (tabId === 'new') navigation.navigate('NewScreen');
    if (tabId === 'rewards') navigation.navigate('RewardsScreen');
    if (tabId === 'account') navigation.navigate('AccountScreen');
  };

  const TopMenuItem = ({ title, onPress }) => (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.topMenuItemContainer}>
      {isCosmetics ? (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: '#FFF0F5' }]} />
      ) : (
        <LinearGradient
          colors={['#FF0069', '#FFD498']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.topMenuItemGradientBg}
        />
      )}
      <View style={styles.topMenuItemContent}>
        <Text style={styles.topMenuItemText}>{title}</Text>
        <Icon name="chevron-right" size={scaleh(20)} color="#1A1A1A" />
      </View>
    </TouchableOpacity>
  );

  const MoreMenuItem = ({ title, iconName, onPress }) => (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.moreMenuItem}>
      <Icon name={iconName} size={scaleh(18)} color="#333333" style={styles.moreMenuIcon} />
      <Text style={styles.moreMenuItemText}>{title}</Text>
    </TouchableOpacity>
  );

  const handleLogout = async () => {
    try {
      // Call the backend logout API
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout API error:', error);
      // We still proceed with local logout even if API fails
    }
    
    // Clear local storage and reset auth state
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
    dispatch(logout());
  };

  return (
    <View style={[styles.container, isCosmetics && { backgroundColor: '#FFC2D1' }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      {/* Reusable Profile Header */}
      <ProfileHeader 
        name="Khushboo Sharma"
        phone="+912223456789"
      />

      {/* Main Content Area overlapping the header slightly */}
      <View style={[styles.contentWrapper, { backgroundColor: '#FFFFFF' }]}>
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Links Section */}
          <View style={styles.topLinksSection}>
            <TopMenuItem title="Profile" onPress={() => navigation.navigate('ProfileScreen')} />
            <TopMenuItem title="Address" onPress={() => navigation.navigate('AddressScreen')} />
            <TopMenuItem title="Orders List" onPress={() => navigation.navigate('OrdersListScreen')} />
            <TopMenuItem title="Wishlist" onPress={() => navigation.navigate('Wishlist')} />
          </View>

          {/* More Section */}
          <Text style={styles.moreTitle}>More</Text>
          <View style={styles.moreLinksSection}>
            <MoreMenuItem title="Terms & Conditions" iconName="shield" onPress={() => navigation.navigate('TermsAndConditionsScreen')} />
            <MoreMenuItem title="Contact Us" iconName="phone" onPress={() => {}} />
            <MoreMenuItem title="Return Policy" iconName="refresh-ccw" onPress={() => navigation.navigate('ReturnPolicyScreen')} />
            <MoreMenuItem title="FAQ" iconName="help-circle" onPress={() => navigation.navigate('FAQScreen')} />
            <MoreMenuItem title="Privacy" iconName="lock" onPress={() => navigation.navigate('PrivacyScreen')} />
          </View>

          {/* Sign Out Button */}
          <TouchableOpacity 
            style={[styles.signOutButton, isCosmetics && { backgroundColor: '#FFD1E3', shadowColor: '#FF0069' }]} 
            activeOpacity={0.8}
            onPress={handleLogout}
          >
            <Text style={[styles.signOutText, isCosmetics && { color: '#FF0069' }]}>Sign Out</Text>
            <Icon name="log-out" size={scaleh(18)} color={isCosmetics ? '#FF0069' : '#FFFFFF'} style={styles.signOutIcon} />
          </TouchableOpacity>

        </ScrollView>
      </View>

      <BottomNavBar 
        activeTab="account" 
        onTabPress={handleTabPress} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  contentWrapper: {
    flex: 1,
    // Background color is handled conditionally in the component
    borderTopLeftRadius: scaleh(30),
    borderTopRightRadius: scaleh(30),
    marginTop: scalev(-30), // Pulls the white content up over the gradient header
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: scalev(30),
    paddingHorizontal: scaleh(20),
    paddingBottom: scalev(120), // Extra space for BottomNavBar
  },
  topLinksSection: {
    marginBottom: scalev(30),
    gap: scalev(15),
  },
  topMenuItemContainer: {
    borderRadius: scaleh(12),
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  topMenuItemGradientBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.15,
  },
  topMenuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scalev(15),
    paddingHorizontal: scaleh(20),
  },
  topMenuItemText: {
    fontSize: scaleh(15),
    fontWeight: '500',
    color: '#1A1A1A',
  },
  moreTitle: {
    fontSize: scaleh(16),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: scalev(15),
  },
  moreLinksSection: {
    gap: scalev(15),
    marginBottom: scalev(40),
  },
  moreMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: scaleh(12),
    paddingVertical: scalev(15),
    paddingHorizontal: scaleh(20),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  moreMenuIcon: {
    marginRight: scaleh(15),
  },
  moreMenuItemText: {
    fontSize: scaleh(14),
    fontWeight: '500',
    color: '#333333',
  },
  signOutButton: {
    backgroundColor: AppTheme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scalev(15),
    borderRadius: scaleh(12),
    elevation: 3,
    shadowColor: AppTheme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  signOutText: {
    color: '#FFFFFF',
    fontSize: scaleh(16),
    fontWeight: '700',
  },
  signOutIcon: {
    marginLeft: scaleh(10),
  },
});

export default AccountScreen;
