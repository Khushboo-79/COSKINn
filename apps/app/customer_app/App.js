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
