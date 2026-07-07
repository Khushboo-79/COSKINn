import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, FlatList, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { AppTheme, scaleh, scalev } from '../../constants/AppTheme';
import BottomNavBar from '../../constants/BottomNavBar';
import CustomToggle from '../../components/CustomToggle';

const { width } = Dimensions.get('window');
const bannerWidth = width - scaleh(40); // Screen width minus padding

const DashboardScreen = () => {
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [activeMainBannerIndex, setActiveMainBannerIndex] = useState(0);
  const mainBannerData = [1, 2, 3, 4, 5, 6];

  const [activeComboBannerIndex, setActiveComboBannerIndex] = useState(0);
  const comboBannerData = [1, 2, 3];

  const categories = [
    { id: 1, title: 'Fresh' },
    { id: 2, title: 'Strawberry' },
    { id: 3, title: 'Vitamin C' },
    { id: 4, title: 'Combos' }
  ];

  const skinTypes = [
    { id: 1, title: 'Normal Skin' },
    { id: 2, title: 'Oily Skin' },
    { id: 3, title: 'Dry Skin' },
    { id: 4, title: 'Combination Skin' },
    { id: 5, title: 'Acne-prone Skin' }
  ];
  const [activeSkinIndex, setActiveSkinIndex] = useState(0); // Normal Skin active

  const handleMainScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    if (index !== activeMainBannerIndex) setActiveMainBannerIndex(index);
  };

  const handleComboScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    if (index !== activeComboBannerIndex) setActiveComboBannerIndex(index);
  };

  const skinViewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const onSkinViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const centerItem = viewableItems[0];
      if (centerItem && centerItem.index !== null) {
        setActiveSkinIndex(centerItem.index);
      }
    }
  }).current;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.safeArea}>

        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.locationContainer}>
            <Icon name="map-pin" size={scaleh(16)} color="#1a1a1a" />
            <Text style={styles.locationText} numberOfLines={1}>Deliver to <Text style={{ fontWeight: '600' }}>Ayushi Sinha - Ibus stop...</Text></Text>
            <Icon name="chevron-down" size={scaleh(16)} color="#1a1a1a" />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CustomToggle
              value={isThemeDark}
              onValueChange={setIsThemeDark}
              activeTrackImage={require('../../images/bgImages/skincareToggle.webp')}
              inactiveTrackImage={require('../../images/bgImages/makeupToggle.webp')}
              activeThumbImage={require('../../images/bgImages/skincareToggle.webp')}
              inactiveThumbImage={require('../../images/bgImages/makeupToggle.webp')}
              trackWidth={scaleh(60)}
              trackHeight={scalev(30)}
              thumbSize={scalev(32)}
            />

          </View>
        </View>

        {/* Search Bar Row */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={scaleh(18)} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Type to search..."
              placeholderTextColor="#999"
            />
            <Icon name="mic" size={scaleh(18)} color="#666" style={styles.micIcon} />
          </View>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Icon name="heart" size={scaleh(22)} color="#1a1a1a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Icon name="shopping-cart" size={scaleh(22)} color="#1a1a1a" />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 1. Main Empty Banner Carousel */}
          <View style={{ height: scalev(220), marginBottom: scalev(20) }}>
            <FlatList
              data={mainBannerData}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleMainScroll}
              scrollEventThrottle={16}
              keyExtractor={(item) => item.toString()}
              renderItem={() => (
                <View style={{ width: width, paddingHorizontal: scaleh(20) }}>
                  <LinearGradient
                    colors={[AppTheme.colors.backgroundStart, AppTheme.colors.backgroundEnd]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.mainBanner}
                  />
                </View>
              )}
            />
          </View>

          {/* Dots Indicator for Main Banner */}
          <View style={styles.dotsContainer}>
            {mainBannerData.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, activeMainBannerIndex === index && styles.activeDot]}
              />
            ))}
          </View>

          {/* 2. Product Banner Section */}
          <View style={{ paddingHorizontal: scaleh(20), width: '100%', marginBottom: scalev(40) }}>
            <LinearGradient
              colors={[AppTheme.colors.backgroundStart, AppTheme.colors.backgroundEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.productBanner}
            >
              <View style={styles.productImageContainer}>
                <Image source={require('../../images/Logo/logo.webp')} style={styles.productImagePlaceholder} resizeMode="contain" />
              </View>

              <Text style={styles.productTitle}>Vitamin C + E Moisturizer for</Text>
              <Text style={styles.productTitleHighlight}>Glowing Skin</Text>
              <Text style={styles.productSubtitle}>Normal, Oily 7 Combination Skin</Text>

              <View style={styles.sizePill}>
                <Text style={styles.sizePillText}>60ml</Text>
              </View>

              <View style={styles.priceActionContainer}>
                <View style={styles.priceSection}>
                  <Text style={styles.priceText}>₹899</Text>
                </View>
                <View style={styles.addToCartSection}>
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* 3. Main Combo Banner Carousel */}
          <View style={{ height: scalev(160), marginBottom: scalev(20) }}>
            <FlatList
              data={comboBannerData}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleComboScroll}
              scrollEventThrottle={16}
              keyExtractor={(item) => item.toString()}
              renderItem={() => (
                <View style={{ width: width, paddingHorizontal: scaleh(20) }}>
                  <View style={styles.comboBanner}>
                    <View style={styles.comboBannerLeft}>
                      {/* Placeholder for bottle images */}
                      <Image source={require('../../images/Logo/logo.webp')} style={styles.comboImage} resizeMode="contain" />
                    </View>
                    <View style={styles.comboBannerRight}>
                      <Text style={styles.comboTitle}>Flat 50% OFF</Text>
                      <Text style={styles.comboSubtitle}>on combos</Text>
                      <TouchableOpacity style={styles.comboCodeBtn}>
                        <Text style={styles.comboCodeText}>Use Code: COMBO50 {'>'}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>

          {/* Dots Indicator for Combo Banner */}
          <View style={styles.dotsContainer}>
            {comboBannerData.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, activeComboBannerIndex === index && styles.activeDot]}
              />
            ))}
          </View>

          {/* Categories Section */}
          <View style={{ width: '100%', paddingLeft: scaleh(20) }}>
            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.categoryItem} activeOpacity={0.8}>
                  <View style={styles.categoryCircle}>
                    <Image source={require('../../images/Logo/logo.webp')} style={styles.categoryImage} resizeMode="cover" />
                  </View>
                  <Text style={styles.categoryText}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Skin Type Section */}
          <View style={styles.skinTypeSection}>
            <View style={styles.skinTypeHeader}>
              <Text style={styles.skinTypeTextDark}>Skin </Text>
              <Text style={styles.skinTypeTextPink}>Type</Text>
            </View>

            <FlatList
              data={skinTypes}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.skinTypeCarousel}
              keyExtractor={(item) => item.id.toString()}
              onViewableItemsChanged={onSkinViewableItemsChanged}
              viewabilityConfig={skinViewabilityConfig}
              snapToInterval={scaleh(220)} // exact width of card + margins
              decelerationRate="fast"
              renderItem={({ item }) => {
                return (
                  <View style={styles.skinTypeCard}>
                    <Image source={require('../../images/Logo/logo.webp')} style={styles.skinTypeImage} resizeMode="cover" />
                    <View style={styles.skinTypeBottomBar}>
                      <Text style={styles.skinTypeBottomText}>{item.title}</Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomNavBar activeTab="home" />
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
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: scaleh(10),
  },
  locationText: {
    fontSize: scaleh(12),
    color: '#1a1a1a',
    marginHorizontal: scaleh(6),
    flexShrink: 1,
  },
  profileContainer: {
    width: scaleh(70),
    height: scalev(30),
    borderRadius: scaleh(15),
    borderWidth: 1.5,
    borderColor: AppTheme.colors.primary,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    marginBottom: scalev(20),
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: scalev(40),
    borderRadius: scaleh(20),
    borderWidth: 1,
    borderColor: AppTheme.colors.primary,
    paddingHorizontal: scaleh(12),
    marginRight: scaleh(15),
  },
  searchIcon: {
    marginRight: scaleh(8),
  },
  searchInput: {
    flex: 1,
    height: '100%',
    padding: 0, // Android reset
    fontSize: scaleh(13),
    color: '#1a1a1a',
  },
  micIcon: {
    marginLeft: scaleh(8),
  },
  headerIconBtn: {
    marginLeft: scaleh(10),
  },

  scrollContent: {
    alignItems: 'center',
    paddingBottom: 0, // removed paddingHorizontal to allow full width sections
  },

  mainBanner: {
    width: '100%',
    height: '100%',
    borderRadius: scaleh(20),
  },

  comboBanner: {
    backgroundColor: '#FDEAE0',
    borderRadius: scaleh(20),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleh(10),
    height: '100%',
    width: '100%',
  },
  comboBannerLeft: {
    flex: 1.1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  comboImage: {
    width: '100%',
    height: '80%',
  },
  comboBannerRight: {
    flex: 1.3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scalev(10),
  },
  comboTitle: {
    fontSize: scaleh(18),
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  comboSubtitle: {
    fontSize: scaleh(16),
    color: '#1a1a1a',
    marginBottom: scalev(12),
    textAlign: 'center',
  },
  comboCodeBtn: {
    backgroundColor: '#FFFFFF',
    paddingVertical: scalev(8),
    paddingHorizontal: scaleh(12),
    borderRadius: scaleh(8),
  },
  comboCodeText: {
    fontSize: scaleh(12),
    fontWeight: '700',
    color: '#1a1a1a',
  },

  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scalev(25),
  },
  dot: {
    width: scaleh(8),
    height: scaleh(8),
    borderRadius: scaleh(4),
    backgroundColor: '#D9D9D9',
    marginHorizontal: scaleh(5),
  },
  activeDot: {
    backgroundColor: AppTheme.colors.primary,
  },

  productBanner: {
    width: '100%',
    borderRadius: scaleh(25),
    paddingVertical: scalev(30),
    paddingHorizontal: scaleh(20),
    alignItems: 'center',
  },
  productImageContainer: {
    width: scaleh(180),
    height: scalev(120),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scalev(15),
  },
  productImagePlaceholder: {
    width: '100%',
    height: '100%',
  },
  productTitle: {
    fontSize: scaleh(14),
    color: '#1a1a1a',
    fontWeight: '500',
    textAlign: 'center',
  },
  productTitleHighlight: {
    fontSize: scaleh(14),
    color: '#1a1a1a',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: scalev(5),
  },
  productSubtitle: {
    fontSize: scaleh(11),
    color: '#444',
    textAlign: 'center',
    marginBottom: scalev(15),
  },
  sizePill: {
    paddingVertical: scalev(4),
    paddingHorizontal: scaleh(15),
    borderRadius: scaleh(15),
    borderWidth: 1,
    borderColor: AppTheme.colors.primary,
    backgroundColor: '#FFFFFF',
    marginBottom: scalev(20),
  },
  sizePillText: {
    fontSize: scaleh(11),
    color: '#1a1a1a',
    fontWeight: '500',
  },
  priceActionContainer: {
    flexDirection: 'row',
    width: scaleh(180),
    height: scalev(45),
    borderRadius: scaleh(10),
    borderWidth: 1,
    borderColor: AppTheme.colors.primary,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  priceSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: AppTheme.colors.primary,
  },
  priceText: {
    fontSize: scaleh(16),
    fontWeight: '600',
    color: '#1a1a1a',
  },
  addToCartSection: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    fontSize: scaleh(12),
    fontWeight: '600',
    color: AppTheme.colors.primary,
  },

  categoriesContainer: {
    paddingRight: scaleh(20),
    paddingBottom: scalev(35),
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: scaleh(20),
  },
  categoryCircle: {
    width: scaleh(75),
    height: scaleh(75),
    borderRadius: scaleh(37.5),
    borderWidth: 1.5,
    borderColor: AppTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: scalev(10),
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryText: {
    fontSize: scaleh(12),
    color: '#1a1a1a',
    fontWeight: '500',
  },

  skinTypeSection: {
    backgroundColor: '#FFEBF1', // light pink background
    width: '100%',
    borderTopLeftRadius: scaleh(20),
    borderTopRightRadius: scaleh(20),
    paddingTop: scalev(25),
    paddingBottom: scalev(100), // Extra padding for bottom nav
    alignItems: 'center',
  },
  skinTypeHeader: {
    flexDirection: 'row',
    marginBottom: scalev(20),
  },
  skinTypeTextDark: {
    fontSize: scaleh(18),
    fontWeight: '700',
    color: '#1a1a1a',
  },
  skinTypeTextPink: {
    fontSize: scaleh(18),
    fontWeight: '700',
    color: AppTheme.colors.primary,
  },
  skinTypeCarousel: {
    paddingHorizontal: scaleh(20),
    alignItems: 'center',
  },
  skinTypeCard: {
    width: scaleh(200),
    height: scalev(130),
    borderRadius: scaleh(15),
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    marginHorizontal: scaleh(10),
    borderWidth: 2,
    borderColor: '#FF5C81',
  },
  skinTypeImage: {
    flex: 1,
    width: '100%',
  },
  skinTypeBottomBar: {
    height: '25%', // use percentage so it scales perfectly between active and inactive sizes
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF5C81',
  },
  skinTypeBottomText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: scaleh(14),
  }
});

export default DashboardScreen;
