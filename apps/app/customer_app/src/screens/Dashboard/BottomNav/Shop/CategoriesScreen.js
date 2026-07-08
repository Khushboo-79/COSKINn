import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { AppTheme, scaleh, scalev } from '../../../../constants/AppTheme';
import BottomNavBar from '../../../../constants/BottomNavBar';
import Header from '../../../../components/Header';

const categoriesData = [
  { id: 1, title: 'Sunscreen', image: require('../../../../images/bgImages/Bluberry.webp') },
  { id: 2, title: 'Toner', image: require('../../../../images/bgImages/GreenTea.webp') },
  { id: 3, title: 'Serum', image: require('../../../../images/bgImages/Pomegranate.webp') },
  { id: 4, title: 'Moisturizer', image: require('../../../../images/bgImages/Bluberry.webp') },
  { id: 5, title: 'Cleanser', image: require('../../../../images/bgImages/GreenTea.webp') },
  { id: 6, title: 'Combos & Kits', image: require('../../../../images/bgImages/Pomegranate.webp') },
];

const CategoriesScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.safeArea}>
        
        {/* Custom Header with no logo and 3 icons */}
        <Header 
          showLogo={false}
          onBackPress={() => navigation.goBack()}
          rightComponent={
            <View style={styles.headerRightIcons}>
              <TouchableOpacity style={styles.iconBtn}>
                <Icon name="search" size={scaleh(22)} color="#1a1a1a" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn}>
                <Icon name="heart" size={scaleh(22)} color="#1a1a1a" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Cart')}>
                <Icon name="shopping-cart" size={scaleh(22)} color="#1a1a1a" />
              </TouchableOpacity>
            </View>
          }
        />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Product Hunt Banner Section */}
          <View style={styles.bannerWrapper}>
            <LinearGradient 
              colors={['#FFD1DC', '#FFF5F5', '#FFFFFF']} 
              style={styles.huntBanner}
            >
              {/* Title Area */}
              <View style={styles.huntTitleRow}>
                {/* Custom Search Heart SVG - using text/icon combo for simplicity or an icon */}
                <Icon name="search" size={scaleh(24)} color="#FF3366" style={{ marginRight: scaleh(8) }} />
                <Text style={styles.huntTitleBlack}>Product </Text>
                <Text style={styles.huntTitlePink}>Hunt</Text>
              </View>
              
              <Text style={styles.huntSubtitle}>Search product Based on skin concern</Text>

              {/* Search Bar */}
              <View style={styles.searchBar}>
                <Icon name="search" size={scaleh(20)} color="#888" style={styles.searchIcon} />
                <TextInput 
                  style={styles.searchInput}
                  placeholder="Type to search..."
                  placeholderTextColor="#888"
                />
                <Icon name="mic" size={scaleh(20)} color="#1a1a1a" />
              </View>
            </LinearGradient>

            {/* Find the Better Strip */}
            <LinearGradient 
              colors={['#FF0069', '#FF3366', '#FF9A8B']} 
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.findBetterStrip}
            >
              <Text style={styles.findBetterText}>Find the Better</Text>
            </LinearGradient>
          </View>

          {/* Skin Categories Section */}
          <View style={styles.categoriesSection}>
            <View style={styles.catHeader}>
              <Text style={styles.catTitleBlack}>Skin </Text>
              <Text style={styles.catTitlePink}>Categories</Text>
            </View>

            <View style={styles.gridContainer}>
              {categoriesData.map((cat) => (
                <TouchableOpacity key={cat.id} style={styles.gridItem} activeOpacity={0.8}>
                  <View style={styles.imageCircle}>
                    <Image source={cat.image} style={styles.catImage} resizeMode="cover" />
                  </View>
                  <Text style={styles.catText}>{cat.title}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.viewAllBtn} 
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ViewAllCategories')}
            >
              <Text style={styles.viewAllText}>View All</Text>
              <Icon name="chevron-right" size={scaleh(16)} color="#FF0069" />
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>

      <BottomNavBar 
        activeTab="shop" 
        onTabPress={(tabId) => {
          if (tabId === 'home') {
            navigation.navigate('Dashboard');
          } else if (tabId === 'shop') {
            navigation.navigate('Shop');
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
  headerRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleh(15),
  },
  iconBtn: {
    padding: scaleh(5),
  },
  scrollContent: {
    paddingBottom: scalev(120), // Extra space for nav bar
  },
  bannerWrapper: {
    marginHorizontal: scaleh(20),
    borderRadius: scaleh(20),
    marginBottom: scalev(40),
    elevation: 3, // For android shadow on the banner
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    backgroundColor: '#FFF',
  },
  huntBanner: {
    paddingTop: scalev(30),
    paddingBottom: scalev(25),
    paddingHorizontal: scaleh(20),
    borderTopLeftRadius: scaleh(20),
    borderTopRightRadius: scaleh(20),
    alignItems: 'center',
  },
  huntTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scalev(10),
  },
  huntTitleBlack: {
    fontSize: scaleh(24),
    fontWeight: '500',
    color: '#000000',
  },
  huntTitlePink: {
    fontSize: scaleh(24),
    fontWeight: '800',
    color: '#FF88A7', // Light pinkish peach
  },
  huntSubtitle: {
    fontSize: scaleh(14),
    color: '#333333',
    marginBottom: scalev(25),
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#FF88A7',
    borderRadius: scaleh(25),
    height: scalev(45),
    width: '100%',
    paddingHorizontal: scaleh(15),
  },
  searchIcon: {
    marginRight: scaleh(10),
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: scaleh(14),
    color: '#000',
  },
  findBetterStrip: {
    width: '100%',
    paddingVertical: scalev(15),
    borderBottomLeftRadius: scaleh(20),
    borderBottomRightRadius: scaleh(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  findBetterText: {
    color: '#FFFFFF',
    fontSize: scaleh(16),
    fontWeight: '700',
  },
  categoriesSection: {
    paddingHorizontal: scaleh(20),
  },
  catHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scalev(30),
  },
  catTitleBlack: {
    fontSize: scaleh(22),
    fontWeight: '400',
    color: '#000',
  },
  catTitlePink: {
    fontSize: scaleh(22),
    fontWeight: '800',
    color: '#FF88A7',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: scalev(25),
  },
  gridItem: {
    width: '30%', // 3 items per row
    alignItems: 'center',
  },
  imageCircle: {
    width: scaleh(85),
    height: scaleh(85),
    borderRadius: scaleh(42.5),
    borderWidth: 2,
    borderColor: '#FF0069',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scalev(10),
  },
  catImage: {
    width: '100%',
    height: '100%',
  },
  catText: {
    fontSize: scaleh(12),
    color: '#000',
    fontWeight: '500',
    textAlign: 'center',
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scalev(35),
    gap: scaleh(5),
  },
  viewAllText: {
    color: '#FF0069',
    fontSize: scaleh(14),
    fontWeight: '600',
  },
});

export default CategoriesScreen;
