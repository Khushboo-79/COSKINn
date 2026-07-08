/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthScreen from './src/screens/Auth/AuthScreen';
import OtpScreen from './src/screens/Auth/OtpScreen';
import DashboardScreen from './src/screens/Dashboard/DashboardScreen';
import SearchScreen from './src/screens/Dashboard/SearchScreen';
import WishlistScreen from './src/screens/Dashboard/Wishlist/WishlistScreen';
import CartScreen from './src/screens/Dashboard/Cart/CartScreen';
import CouponsScreen from './src/screens/Dashboard/Cart/CouponsScreen';
import GiftBoxScreen from './src/screens/Dashboard/Cart/GiftBoxScreen';
import PaymentMethodsScreen from './src/screens/Dashboard/Cart/PaymentMethodsScreen';
import CardPaymentScreen from './src/screens/Dashboard/Cart/CardPaymentScreen';
import WalletPaymentScreen from './src/screens/Dashboard/Cart/WalletPaymentScreen';
import NetbankingScreen from './src/screens/Dashboard/Cart/NetbankingScreen';
import OrderConfirmedScreen from './src/screens/Dashboard/Cart/OrderConfirmedScreen';
import ShopScreen from './src/screens/Dashboard/BottomNav/Shop/ShopScreen';
import CategoriesScreen from './src/screens/Dashboard/BottomNav/Shop/CategoriesScreen';
import ViewAllCategoriesScreen from './src/screens/Dashboard/BottomNav/Shop/ViewAllCategoriesScreen';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Otp" component={OtpScreen} />
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
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
