import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { setCredentials } from '../redux/slices/authSlice';
import AuthScreen from '../screens/Auth/AuthScreen';
import OtpScreen from '../screens/Auth/OtpScreen';
import DashboardScreen from '../screens/Skincare/DashboardScreen';
import SearchScreen from '../screens/Shared/SearchScreen';
import WishlistScreen from '../screens/Shared/Wishlist/WishlistScreen';
import TermsAndConditionsScreen from '../screens/Skincare/BottomNav/Account/TermsAndConditionsScreen';
import ReturnPolicyScreen from '../screens/Skincare/BottomNav/Account/ReturnPolicyScreen';
import FAQScreen from '../screens/Skincare/BottomNav/Account/FAQScreen';
import PrivacyScreen from '../screens/Skincare/BottomNav/Account/PrivacyScreen';
import ProductDetailsScreen from '../screens/Skincare/ProductDetails/ProductDetailsScreen';
import AllReviewsScreen from '../screens/Skincare/ProductDetails/AllReviewsScreen';
import CartScreen from '../screens/Shared/Cart/CartScreen';
import CouponsScreen from '../screens/Shared/Cart/CouponsScreen';
import GiftBoxScreen from '../screens/Shared/Cart/GiftBoxScreen';
import PaymentMethodsScreen from '../screens/Shared/Cart/PaymentMethodsScreen';
import CardPaymentScreen from '../screens/Shared/Cart/CardPaymentScreen';
import WalletPaymentScreen from '../screens/Shared/Cart/WalletPaymentScreen';
import NetbankingScreen from '../screens/Shared/Cart/NetbankingScreen';
import OrderConfirmedScreen from '../screens/Shared/Cart/OrderConfirmedScreen';
import ShopScreen from '../screens/Skincare/BottomNav/Shop/ShopScreen';
import CategoriesScreen from '../screens/Skincare/BottomNav/Shop/CategoriesScreen';
import ViewAllCategoriesScreen from '../screens/Skincare/BottomNav/Shop/ViewAllCategoriesScreen';
import ViewAllSkinTypesScreen from '../screens/Skincare/BottomNav/Shop/ViewAllSkinTypesScreen';
import ViewAllSkinConcernsScreen from '../screens/Skincare/BottomNav/Shop/ViewAllSkinConcernsScreen';
import ViewAllIngredientsScreen from '../screens/Skincare/BottomNav/Shop/ViewAllIngredientsScreen';
import ViewAllRoutinesScreen from '../screens/Skincare/BottomNav/Shop/ViewAllRoutinesScreen';
import ViewAllNewArrivalsScreen from '../screens/Skincare/BottomNav/Shop/ViewAllNewArrivalsScreen';
import NewScreen from '../screens/Shared/New/NewScreen';
import RewardsScreen from '../screens/Skincare/BottomNav/Rewards/RewardsScreen';
import FilterScreen from '../screens/Skincare/BottomNav/Shop/FilterScreen';
import AccountScreen from '../screens/Skincare/BottomNav/Account/AccountScreen';
import ProfileScreen from '../screens/Skincare/BottomNav/Account/ProfileScreen';
import AddressScreen from '../screens/Skincare/BottomNav/Account/AddressScreen';
import OrdersListScreen from '../screens/Skincare/BottomNav/Account/OrdersListScreen';

import CosmeticsDashboardScreen from '../screens/Cosmetics/CosmeticsDashboardScreen';
import CosmeticsShopScreen from '../screens/Cosmetics/Shop/ShopScreen';

import CategoryDetailScreen from '../screens/Cosmetics/Shop/CategoryDetailScreen';
import ProductListingScreen from '../screens/Cosmetics/Shop/ProductListingScreen';

const Stack = createNativeStackNavigator();

// Temporary stub for Cosmetics Navigator until you build all its screens
const CosmeticsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={CosmeticsDashboardScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Coupons" component={CouponsScreen} />
      <Stack.Screen name="GiftBox" component={GiftBoxScreen} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
      <Stack.Screen name="CardPayment" component={CardPaymentScreen} />
      <Stack.Screen name="WalletPayment" component={WalletPaymentScreen} />
      <Stack.Screen name="Netbanking" component={NetbankingScreen} />
      <Stack.Screen name="OrderConfirmed" component={OrderConfirmedScreen} />
      <Stack.Screen name="Shop" component={CosmeticsShopScreen} />
      <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
      <Stack.Screen name="ProductListing" component={ProductListingScreen} />
      <Stack.Screen name="NewScreen" component={NewScreen} />
      <Stack.Screen name="RewardsScreen" component={RewardsScreen} />
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="AddressScreen" component={AddressScreen} />
      <Stack.Screen name="OrdersListScreen" component={OrdersListScreen} />
      <Stack.Screen name="TermsAndConditionsScreen" component={TermsAndConditionsScreen} />
      <Stack.Screen name="ReturnPolicyScreen" component={ReturnPolicyScreen} />
      <Stack.Screen name="FAQScreen" component={FAQScreen} />
      <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} />
    </Stack.Navigator>
  );
};

const SkincareNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Coupons" component={CouponsScreen} />
      <Stack.Screen name="GiftBox" component={GiftBoxScreen} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
      <Stack.Screen name="CardPayment" component={CardPaymentScreen} />
      <Stack.Screen name="WalletPayment" component={WalletPaymentScreen} />
      <Stack.Screen name="Netbanking" component={NetbankingScreen} />
      <Stack.Screen name="OrderConfirmed" component={OrderConfirmedScreen} />
      <Stack.Screen name="Shop" component={ShopScreen} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="ViewAllCategories" component={ViewAllCategoriesScreen} />
      <Stack.Screen name="ViewAllSkinTypes" component={ViewAllSkinTypesScreen} />
      <Stack.Screen name="ViewAllSkinConcerns" component={ViewAllSkinConcernsScreen} />
      <Stack.Screen name="ViewAllIngredients" component={ViewAllIngredientsScreen} />
      <Stack.Screen name="ViewAllRoutines" component={ViewAllRoutinesScreen} />
      <Stack.Screen name="ViewAllNewArrivals" component={ViewAllNewArrivalsScreen} />
      <Stack.Screen name="NewScreen" component={NewScreen} />
      <Stack.Screen name="RewardsScreen" component={RewardsScreen} />
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="AddressScreen" component={AddressScreen} />
      <Stack.Screen name="OrdersListScreen" component={OrdersListScreen} />
      <Stack.Screen name="TermsAndConditionsScreen" component={TermsAndConditionsScreen} />
      <Stack.Screen name="ReturnPolicyScreen" component={ReturnPolicyScreen} />
      <Stack.Screen name="FAQScreen" component={FAQScreen} />
      <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} />
      <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
      <Stack.Screen name="AllReviewsScreen" component={AllReviewsScreen} />
      <Stack.Screen name="FilterScreen" component={FilterScreen} />
    </Stack.Navigator>
  );
};

const DomainTab = createBottomTabNavigator();

const CustomTabBar = ({ navigation }) => {
  const activeDomain = React.useRef(null);
  const currentDomain = useSelector(state => state.app.activeDomain);
  
  React.useEffect(() => {
    if (activeDomain.current !== currentDomain) {
      activeDomain.current = currentDomain;
      if (currentDomain === 'skincare') {
        navigation.navigate('SkincareDomain');
      } else {
        navigation.navigate('CosmeticsDomain');
      }
    }
  }, [currentDomain, navigation]);

  return null;
};

const MainDomainNavigator = () => {
  return (
    <DomainTab.Navigator tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false, unmountOnBlur: false }}>
      <DomainTab.Screen name="SkincareDomain" component={SkincareNavigator} />
      <DomainTab.Screen name="CosmeticsDomain" component={CosmeticsNavigator} />
    </DomainTab.Navigator>
  );
};

const AppNavigator = () => {
  const { isAuthenticated } = useSelector(state => state.auth || {});
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        if (token) {
          dispatch(setCredentials({ access_token: token }));
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    bootstrapAsync();
  }, [dispatch]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <ActivityIndicator size="large" color="#FF0069" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isAuthenticated ? (
            <>
              <Stack.Screen name="Auth" component={AuthScreen} />
              <Stack.Screen name="Otp" component={OtpScreen} />
            </>
          ) : (
            <Stack.Screen name="Main" component={MainDomainNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AppNavigator;
