import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { AppTheme, scaleh, scalev } from '../../../../constants/AppTheme';
import BottomNavBar from '../../../../constants/BottomNavBar';

const shopItems = [
  { id: 1, title: 'Categories', comingSoon: false },
  { id: 2, title: 'Brands', comingSoon: true },
  { id: 3, title: 'Luxe', comingSoon: true },
  { id: 4, title: 'Bestsellers', comingSoon: true },
  { id: 5, title: 'Cos - Kits', comingSoon: true },
  { id: 6, title: 'The Gift Store', comingSoon: true },
];

const ShopScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.safeArea}>
        
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Shop by</Text>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconBtn} activeOpacity={0.8}>
                <Icon name="heart" size={scaleh(22)} color="#1a1a1a" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn} activeOpacity={0.8} onPress={() => navigation.navigate('Cart')}>
                <Icon name="shopping-cart" size={scaleh(22)} color="#1a1a1a" />
              </TouchableOpacity>
            </View>
          </View>

          {/* List Section */}
          <View style={styles.listContainer}>
            {shopItems.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                activeOpacity={0.9} 
                style={styles.cardWrapper}
                onPress={() => {
                  if (item.title === 'Categories') {
                    navigation.navigate('Categories');
                  }
                }}
              >
                <LinearGradient 
                  colors={['#FFD1DC', '#FFE4E1', '#FFF1E6']} 
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.cardGradient}
                >
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  
                  {item.comingSoon && (
                    <View style={styles.comingSoonContainer}>
                      <Text style={styles.comingText}>Coming</Text>
                      <Text style={styles.soonText}>Soon</Text>
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        
      </SafeAreaView>

      <BottomNavBar 
        activeTab="shop" 
        onTabPress={(tabId) => {
          if (tabId === 'home') {
            navigation.navigate('Dashboard');
          }
        }} 
      />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    paddingTop: scalev(10),
    marginBottom: scalev(15),
    marginTop: scalev(35),
  },
  headerTitle: {
    fontSize: scaleh(22),
    fontWeight: '700',
    color: '#000000',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    marginLeft: scaleh(15),
  },
  scrollContent: {
    paddingHorizontal: scaleh(20),
    paddingBottom: scalev(100), // Space for bottom nav
  },
  cardWrapper: {
    marginBottom: scalev(15),
    borderRadius: scaleh(15),
    overflow: 'hidden',
  },
  cardGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: scalev(75),
    paddingHorizontal: scaleh(20),
    borderRadius: scaleh(15),
  },
  cardTitle: {
    fontSize: scaleh(18),
    fontWeight: '400',
    color: '#000000',
  },
  comingSoonContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  comingText: {
    fontSize: scaleh(16),
    fontWeight: '900',
    color: '#FF3366', // Strong pink
    marginBottom: scalev(-5), // overlap texts slightly for tight look
  },
  soonText: {
    fontSize: scaleh(16),
    fontWeight: '900',
    color: '#FFA07A', // Peach/orange
  },
});

export default ShopScreen;
