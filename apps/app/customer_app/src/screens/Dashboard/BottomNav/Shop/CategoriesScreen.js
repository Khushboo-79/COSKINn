import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image, StatusBar, FlatList, Dimensions } from 'react-native';
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

const { width } = Dimensions.get('window');

const skinTypesData = [
  { id: 1, title: 'Normal Skin', image: require('../../../../images/skinTypeImages/normalSkin.webp') },
  { id: 2, title: 'Sensitive Skin', image: require('../../../../images/skinTypeImages/sensitiveSkin.webp') },
  { id: 3, title: 'Oily Skin', image: require('../../../../images/skinTypeImages/oilySkin.webp') },
  { id: 4, title: 'Dry Skin', image: require('../../../../images/skinTypeImages/drySkin.webp') },
  { id: 5, title: 'Combination Skin', image: require('../../../../images/skinTypeImages/combinationSkin.webp') },
  { id: 6, title: 'Acne-prone', image: require('../../../../images/skinTypeImages/acneSkin.webp') },
];

const skinConcernsData = [
  { id: 1, title: 'Uneven\nSkin Tone', color: '#DCD0FF', textColor: '#FFFFFF' },
  { id: 2, title: 'Dark\nSpots', color: '#FFE4B5', textColor: '#CD853F' },
  { id: 3, title: 'Sensitive\nSkin', color: '#E0FFFF', textColor: '#008B8B' },
  { id: 4, title: 'Clogged\nPores', color: '#E6F2FF', textColor: '#4682B4' },
  { id: 5, title: 'Loss of\nElasticity', color: '#FFF0F5', textColor: '#DB7093' },
  { id: 6, title: 'Tired &\nDull Skin', color: '#E6E6FA', textColor: '#483D8B' },
];

const ingredientsData = [
  { id: 1, title: 'Strawberry', image: require('../../../../images/bgImages/Strawberry.webp') },
  { id: 2, title: 'Vitamin C', image: require('../../../../images/bgImages/VitaminC.webp') },
  { id: 3, title: 'Blueberry', image: require('../../../../images/bgImages/Bluberry.webp') },
  { id: 4, title: 'Blueberry', image: require('../../../../images/bgImages/Bluberry.webp') },
  { id: 5, title: 'Green Tea', image: require('../../../../images/bgImages/GreenTea.webp') },
  { id: 6, title: 'Pomegranate', image: require('../../../../images/bgImages/Pomegranate.webp') },
];

const guideTabs = ['Sunscreen', 'Moisturizer', 'Skincare', 'Serum', 'Toner', 'Lip Care'];

const CategoriesScreen = () => {
  const navigation = useNavigation();
  const [activeGuideTab, setActiveGuideTab] = useState('Sunscreen');
  const [activeGuideIndex, setActiveGuideIndex] = useState(0);
  const [activeShopByTab, setActiveShopByTab] = useState('Routines');
  
  const handleGuideScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActiveGuideIndex(Math.round(index));
  };

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

          {/* Skin Types Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.catHeader}>
              <Text style={styles.catTitleBlack}>Skin </Text>
              <Text style={styles.catTitlePink}>Types</Text>
            </View>

            <View style={styles.gridContainer}>
              {skinTypesData.map((cat, index) => (
                <TouchableOpacity key={cat.id} style={styles.skinTypeCard} activeOpacity={0.8}>
                  <View style={styles.skinTypeImageWrapper}>
                    <Image source={cat.image} style={styles.skinTypeImage} resizeMode="cover" />
                  </View>
                  <View style={[styles.skinTypeTextWrapper, index === 0 ? styles.skinTypeTextWrapperActive : {}]}>
                    <Text style={[styles.skinTypeText, index === 0 ? styles.skinTypeTextActive : {}]}>{cat.title}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.viewAllBtn} activeOpacity={0.8} onPress={() => navigation.navigate('ViewAllSkinTypes')}>
              <Text style={styles.viewAllText}>View All</Text>
              <Icon name="chevron-right" size={scaleh(16)} color="#FF0069" />
            </TouchableOpacity>
          </View>

          {/* Skin Concern Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.catHeader}>
              <Text style={styles.catTitleBlack}>Skin </Text>
              <Text style={styles.catTitlePink}>Concern</Text>
            </View>

            <View style={styles.gridContainer}>
              {skinConcernsData.map((cat) => (
                <TouchableOpacity key={cat.id} style={styles.concernCircleItem} activeOpacity={0.8}>
                  <View style={[styles.concernCircle, { backgroundColor: cat.color }]}>
                    <Text style={[styles.concernText, { color: cat.textColor }]}>{cat.title}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.viewAllBtn} activeOpacity={0.8} onPress={() => navigation.navigate('ViewAllSkinConcerns')}>
              <Text style={styles.viewAllText}>View All</Text>
              <Icon name="chevron-right" size={scaleh(16)} color="#FF0069" />
            </TouchableOpacity>
          </View>

          {/* Ingredients Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.catHeader}>
              <Text style={styles.catTitlePink}>Ingredients</Text>
            </View>

            <View style={styles.gridContainer}>
              {ingredientsData.map((cat, idx) => (
                <TouchableOpacity key={idx} style={styles.gridItem} activeOpacity={0.8}>
                  <View style={styles.imageCircle}>
                    <Image source={cat.image} style={styles.catImage} resizeMode="cover" />
                  </View>
                  <Text style={styles.catText}>{cat.title}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.viewAllBtn} activeOpacity={0.8} onPress={() => navigation.navigate('ViewAllIngredients')}>
              <Text style={styles.viewAllText}>View All</Text>
              <Icon name="chevron-right" size={scaleh(16)} color="#FF0069" />
            </TouchableOpacity>
          </View>

          {/* Skincare Guides Section */}
          <View style={[styles.sectionContainer, { paddingHorizontal: 0 }]}>
            <View style={styles.guidesHeader}>
              <Text style={styles.catTitleBlack}>Skincare </Text>
              <Text style={styles.catTitlePink}>Guides</Text>
              <Icon name="chevron-right" size={scaleh(16)} color="#000" style={{ marginLeft: scaleh(5), marginTop: scalev(2) }} />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.guideTabsScroll}>
              {guideTabs.map((tab) => {
                const isActive = activeGuideTab === tab;
                return (
                  <TouchableOpacity
                    key={tab}
                    style={[styles.guideTab, isActive && styles.guideTabActive]}
                    onPress={() => setActiveGuideTab(tab)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.guideTabText, isActive && styles.guideTabTextActive]}>{tab}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <View style={{ height: scalev(220), marginBottom: scalev(15) }}>
              <FlatList
                data={[1, 2, 3]}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                onScroll={handleGuideScroll}
                scrollEventThrottle={16}
                renderItem={() => (
                  <View style={{ width: width }}>
                    <LinearGradient
                      colors={['#FFB6C1', '#FFE4E1']}
                      style={styles.guideCard}
                    />
                  </View>
                )}
              />
            </View>

            <View style={styles.guideDotsContainer}>
              {[0, 1, 2].map((idx) => (
                <View key={idx} style={[styles.guideDot, activeGuideIndex === idx && styles.guideDotActive]} />
              ))}
            </View>
          </View>

          {/* Shop By Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.catHeader}>
              <Text style={styles.catTitleBlack}>Shop </Text>
              <Text style={styles.catTitlePink}>By</Text>
            </View>

            <View style={styles.shopByTabsContainer}>
              <TouchableOpacity 
                style={[styles.shopByTab, activeShopByTab === 'Routines' && styles.shopByTabActive]} 
                activeOpacity={0.8}
                onPress={() => setActiveShopByTab('Routines')}
              >
                <Text style={activeShopByTab === 'Routines' ? styles.shopByTabTextActive : styles.shopByTabText}>Routines</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.shopByTab, activeShopByTab === 'New Arrivals' && styles.shopByTabActive]} 
                activeOpacity={0.8}
                onPress={() => setActiveShopByTab('New Arrivals')}
              >
                <Text style={activeShopByTab === 'New Arrivals' ? styles.shopByTabTextActive : styles.shopByTabText}>New Arrivals</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.gridContainer}>
              {[1, 2].map((item) => (
                <TouchableOpacity key={item} style={styles.shopByProductCard} activeOpacity={0.8}>
                  {/* Top Image Section */}
                  <LinearGradient 
                    colors={['#FFD1DC', '#FFF5F5', '#FFFFFF']} 
                    style={styles.shopByImageContainer}
                  >
                    {activeShopByTab === 'New Arrivals' && (
                      <View style={styles.justArrivedBadge}>
                        <Text style={styles.justArrivedText}>Just Arrived</Text>
                      </View>
                    )}
                    <Image source={require('../../../../images/bgImages/productImg.webp')} style={styles.shopByImage} resizeMode="contain" />
                  </LinearGradient>

                  {/* Card Details Section */}
                  <View style={styles.shopByCardDetails}>
                    <Text style={styles.shopByProductTitle} numberOfLines={3}>
                      Vitamin C + E Sunscreen SPF 50 PA++++ with New-Age UV filters
                    </Text>

                    <View style={styles.shopBySkinTypeRow}>
                      <Icon name="check-circle" size={scaleh(12)} color="#FF0069" />
                      <Text style={styles.shopBySkinTypeText}>All Skin Types</Text>
                    </View>

                    <View style={styles.shopByRatingRow}>
                      <View style={styles.shopByRatingBadge}>
                        <Icon name="star" size={scaleh(10)} color="#FFFFFF" />
                        <Text style={styles.shopByRatingText}>4.81</Text>
                      </View>
                      <Text style={styles.shopByReviewsText}>(5698)</Text>
                    </View>

                    <View style={styles.shopBySizeBadge}>
                      <Text style={styles.shopBySizeText}>80g</Text>
                    </View>

                    <View style={styles.shopByOffersContainer}>
                      <View style={styles.shopByPinkOffer}>
                        <Icon name="tag" size={scaleh(10)} color="#FF0069" />
                        <Text style={styles.shopByPinkOfferText}>Upto 20% OFF + Free Gifts</Text>
                      </View>
                      <View style={styles.shopByOrangeOffer}>
                        <Icon name="percent" size={scaleh(10)} color="#F4A460" />
                        <Text style={styles.shopByOrangeOfferText}>Get 5% Cashback</Text>
                      </View>
                    </View>

                    <Text style={styles.shopByPrice}>₹899</Text>
                  </View>

                  {/* Add to Cart Footer */}
                  <View style={styles.shopByAddToCartRow}>
                    <TouchableOpacity style={styles.shopByHeartBtn}>
                      <Icon name="heart" size={scaleh(16)} color="#FF0069" style={{ fill: '#FF0069' }} />
                    </TouchableOpacity>
                    <View style={styles.shopByVerticalDivider} />
                    <TouchableOpacity style={styles.shopByAddToCartBtn}>
                      <Text style={styles.shopByAddToCartText}>ADD TO CART</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.viewAllBtn} activeOpacity={0.8} onPress={() => navigation.navigate(activeShopByTab === 'Routines' ? 'ViewAllRoutines' : 'ViewAllNewArrivals')}>
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
          } else if (tabId === 'new') {
            navigation.navigate('NewScreen');
          } else if (tabId === 'rewards') {
            navigation.navigate('RewardsScreen');
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
  sectionContainer: {
    paddingHorizontal: scaleh(20),
    marginTop: scalev(40),
  },
  skinTypeCard: {
    width: '30%',
    borderRadius: scaleh(15),
    overflow: 'hidden',
    backgroundColor: '#FFD1DC', // light pink background
    marginBottom: scalev(15),
  },
  skinTypeImageWrapper: {
    width: '100%',
    height: scalev(70),
  },
  skinTypeImage: {
    width: '100%',
    height: '100%',
  },
  skinTypeTextWrapper: {
    paddingVertical: scalev(8),
    alignItems: 'center',
    backgroundColor: '#FFB6C1', // Slightly darker pink for the text area
  },
  skinTypeTextWrapperActive: {
    backgroundColor: '#FF0069', // Hot pink for active
  },
  skinTypeText: {
    fontSize: scaleh(10),
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  skinTypeTextActive: {
    color: '#FFFFFF',
  },
  concernCircleItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: scalev(20),
  },
  concernCircle: {
    width: scaleh(90),
    height: scaleh(90),
    borderRadius: scaleh(45),
    justifyContent: 'center',
    alignItems: 'center',
    padding: scaleh(10),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  concernText: {
    fontSize: scaleh(12),
    fontWeight: '700',
    textAlign: 'center',
  },
  guidesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scalev(25),
  },
  guideTabsScroll: {
    paddingHorizontal: scaleh(20),
    marginBottom: scalev(20),
    alignItems: 'center',
  },
  guideTab: {
    paddingHorizontal: scaleh(18),
    paddingVertical: scalev(8),
    borderRadius: scaleh(8),
    borderWidth: 1,
    borderColor: '#FF0069',
    marginRight: scaleh(10),
    backgroundColor: '#FFFFFF',
  },
  guideTabActive: {
    backgroundColor: '#FF0069',
  },
  guideTabText: {
    fontSize: scaleh(13),
    fontWeight: '600',
    color: '#333333',
  },
  guideTabTextActive: {
    color: '#FFFFFF',
  },
  guideCard: {
    height: '100%',
    marginHorizontal: scaleh(20),
    borderRadius: scaleh(15),
  },
  guideDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideDot: {
    width: scaleh(8),
    height: scaleh(8),
    borderRadius: scaleh(4),
    backgroundColor: '#D3D3D3',
    marginHorizontal: scaleh(4),
  },
  guideDotActive: {
    backgroundColor: '#FF0069',
  },
  shopByTabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: scalev(30),
    gap: scaleh(15),
  },
  shopByTab: {
    paddingHorizontal: scaleh(25),
    paddingVertical: scalev(12),
    borderRadius: scaleh(10),
    borderWidth: 1,
    borderColor: '#333333',
    backgroundColor: '#FFFFFF',
  },
  shopByTabActive: {
    borderColor: '#FF0069',
    borderWidth: 0, // Removes black border for active
    elevation: 3,
    shadowColor: '#FF0069',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  shopByTabText: {
    fontSize: scaleh(13),
    fontWeight: '600',
    color: '#333333',
  },
  shopByTabTextActive: {
    fontSize: scaleh(13),
    fontWeight: '600',
    color: '#FF0069',
  },
  shopByProductCard: {
    width: '48%',
    borderRadius: scaleh(20),
    borderWidth: 1,
    borderColor: '#EAEAEA',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    marginBottom: scalev(20),
  },
  shopByImageContainer: {
    height: scalev(180),
    padding: scaleh(10),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  justArrivedBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#FF7F00',
    paddingHorizontal: scaleh(10),
    paddingVertical: scalev(4),
    borderBottomRightRadius: scaleh(10),
    zIndex: 10,
  },
  justArrivedText: {
    color: '#FFFFFF',
    fontSize: scaleh(10),
    fontWeight: '700',
  },
  shopByImage: {
    width: '100%',
    height: '100%',
  },
  shopByCardDetails: {
    padding: scaleh(10),
  },
  shopByProductTitle: {
    fontSize: scaleh(11),
    fontWeight: '500',
    color: '#333333',
    marginBottom: scalev(8),
    lineHeight: scalev(16),
  },
  shopBySkinTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scalev(8),
  },
  shopBySkinTypeText: {
    fontSize: scaleh(10),
    color: '#666666',
    marginLeft: scaleh(4),
  },
  shopByRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scalev(8),
  },
  shopByRatingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#32CD32', // lime green
    paddingHorizontal: scaleh(6),
    paddingVertical: scalev(2),
    borderRadius: scaleh(4),
  },
  shopByRatingText: {
    color: '#FFFFFF',
    fontSize: scaleh(10),
    fontWeight: '700',
    marginLeft: scaleh(2),
  },
  shopByReviewsText: {
    fontSize: scaleh(10),
    color: '#999999',
    marginLeft: scaleh(4),
  },
  shopBySizeBadge: {
    backgroundColor: '#FF0069',
    alignSelf: 'flex-start',
    paddingHorizontal: scaleh(8),
    paddingVertical: scalev(2),
    borderRadius: scaleh(4),
    marginBottom: scalev(8),
  },
  shopBySizeText: {
    color: '#FFFFFF',
    fontSize: scaleh(10),
    fontWeight: '600',
  },
  shopByOffersContainer: {
    marginBottom: scalev(10),
  },
  shopByPinkOffer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE4E1',
    alignSelf: 'flex-start',
    paddingHorizontal: scaleh(6),
    paddingVertical: scalev(2),
    borderRadius: scaleh(4),
    marginBottom: scalev(4),
  },
  shopByPinkOfferText: {
    color: '#FF0069',
    fontSize: scaleh(8),
    fontWeight: '600',
    marginLeft: scaleh(4),
  },
  shopByOrangeOffer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F5',
    borderWidth: 1,
    borderColor: '#F4A460',
    alignSelf: 'flex-start',
    paddingHorizontal: scaleh(6),
    paddingVertical: scalev(2),
    borderRadius: scaleh(10),
  },
  shopByOrangeOfferText: {
    color: '#F4A460',
    fontSize: scaleh(9),
    fontWeight: '600',
    marginLeft: scaleh(4),
  },
  shopByPrice: {
    fontSize: scaleh(16),
    fontWeight: '700',
    color: '#333333',
  },
  shopByAddToCartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#FF0069',
    height: scalev(40),
  },
  shopByHeartBtn: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  shopByVerticalDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#FF0069',
  },
  shopByAddToCartBtn: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  shopByAddToCartText: {
    color: '#FF0069',
    fontSize: scaleh(12),
    fontWeight: '700',
  }
});

export default CategoriesScreen;
