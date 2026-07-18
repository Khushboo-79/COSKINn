import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, FlatList, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { AppTheme, scaleh, scalev } from '../../constants/AppTheme';
import BottomNavBar from '../../constants/BottomNavBar';
import TopHeader from '../../components/TopHeader';
import SearchBarRow from '../../components/SearchBarRow';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDomain } from '../../redux/slices/appSlice';
import { fetchProducts } from '../../redux/slices/productSlice';

const { width } = Dimensions.get('window');
const bannerWidth = width - scaleh(40); // Screen width minus padding

const DashboardScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const activeDomain = useSelector(state => state.app.activeDomain);
  const { items: products, loading } = useSelector(state => state.product);
  const isThemeDark = activeDomain === 'skincare';

  useEffect(() => {
    dispatch(fetchProducts({ category: 'skincare' })); // Fetch skincare products
  }, [dispatch]);
  const [activeMainBannerIndex, setActiveMainBannerIndex] = useState(0);
  const mainBannerData = [1, 2, 3, 4, 5, 6];

  const [activeComboBannerIndex, setActiveComboBannerIndex] = useState(0);
  const comboBannerData = [
    {
      id: 1,
      type: 'discount',
      bgColor: '#FDECE2',
      innerColor: '#F1C9A9',
      imageBase: require('../../images/bgImages/orange.webp'),
      imageProduct: require('../../images/bgImages/productImg.webp'),
      title: 'Flat 50% OFF',
      subtitle: 'on combos',
      btnText: 'Use Code: COMBO50',
    },
    {
      id: 2,
      type: 'freebie',
      bgGradient: ['#FF0069', '#FFD498'],
      imageProduct: require('../../images/bgImages/products.webp'),
      title: 'Get FREEBIES',
      subtitle: 'on order Rs. 1299+',
    },
    {
      id: 3,
      type: 'discount',
      bgColor: '#FDECE2',
      innerColor: '#F1C9A9',
      imageBase: require('../../images/bgImages/orange.webp'),
      imageProduct: require('../../images/bgImages/productImg.webp'),
      title: 'Flat 50% OFF',
      subtitle: 'on combos',
      btnText: 'Use Code: COMBO50',
    }
  ];

  const categories = [
    { id: 1, title: 'Fresh', image: require('../../images/bgImages/Fresh.webp') },
    { id: 2, title: 'Strawberry', image: require('../../images/bgImages/Strawberry.webp') },
    { id: 3, title: 'Vitamin C', image: require('../../images/bgImages/VitaminC.webp') },
    { id: 4, title: 'Blueberry', image: require('../../images/bgImages/Bluberry.webp') },
    { id: 5, title: 'Green Tea', image: require('../../images/bgImages/GreenTea.webp') },
    { id: 6, title: 'Pomegranate', image: require('../../images/bgImages/Pomegranate.webp') }
  ];

  const skinTypes = [
    { id: 1, title: 'Normal Skin', color: '#FF8FAB', image: require('../../images/skinTypeImages/normalSkin.webp') },
    { id: 2, title: 'Oily Skin', color: '#EF839E', image: require('../../images/skinTypeImages/oilySkin.webp') },
    { id: 3, title: 'Dry Skin', color: '#FFB3C6', image: require('../../images/skinTypeImages/drySkin.webp') },
    { id: 4, title: 'Combination Skin', color: '#F3A4B9', image: require('../../images/skinTypeImages/combinationSkin.webp') },
    { id: 5, title: 'Acne-prone Skin', color: '#FF8FAB', image: require('../../images/skinTypeImages/acneSkin.webp') },
    { id: 6, title: 'Sensitive Skin', color: '#FB6F92', image: require('../../images/skinTypeImages/sensitiveSkin.webp') }
  ];
  const [activeSkinIndex, setActiveSkinIndex] = useState(0); // Normal Skin active

  // Guides section state
  const [activeGuideTab, setActiveGuideTab] = useState('Sunscreen');
  const guideTabs = ['Sunscreen', 'Moisturizer', 'Skincare', 'Serum'];
  const [activeGuideIndex, setActiveGuideIndex] = useState(0); // For the 3 dots

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

  const handleGuideScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    if (index !== activeGuideIndex) setActiveGuideIndex(index);
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

        {/* Shared Top Header and Search */}
        <TopHeader />
        <SearchBarRow />

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
          <View style={{ width: '100%', marginBottom: scalev(40) }}>
            <FlatList
              data={products}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
              contentContainerStyle={{ paddingHorizontal: scaleh(20) }}
              renderItem={({ item }) => (
                <View style={[styles.productBanner, { overflow: 'hidden', width: scaleh(300), marginRight: scaleh(20) }]}>
                  {/* Background gradient */}
                  <LinearGradient
                    colors={['#FFD1E3', '#FFF2E6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={StyleSheet.absoluteFill}
                  />

                  {/* Orange slices background image */}
                  <Image source={require('../../images/bgImages/orange.webp')} style={[StyleSheet.absoluteFill, { width: '30%', height: '30%', left: '40%', top: '5%', opacity: 0.9 }]} resizeMode="cover" />

                  <View style={[styles.productImageContainer, { height: scalev(160), marginTop: scalev(10) }]}>
                    <Image source={item.images && item.images[0] ? { uri: item.images[0] } : require('../../images/bgImages/productImg.webp')} style={styles.productImagePlaceholder} resizeMode="contain" />
                  </View>

                  <Text style={[styles.productTitle, { fontSize: scaleh(16), marginTop: scalev(10), fontWeight: '600' }]} numberOfLines={2}>
                    {item.name || 'Vitamin C + E Moisturizer'}
                  </Text>
                  <Text style={[styles.productSubtitle, { fontSize: scaleh(12), color: '#1a1a1a', fontWeight: '600', marginBottom: scalev(20), marginTop: scalev(5) }]} numberOfLines={1}>
                    {item.subtitle || 'Normal, Oily & Combination Skin'}
                  </Text>

                  <View style={[styles.sizePill, { borderColor: '#FF0069', paddingVertical: scalev(6), paddingHorizontal: scaleh(20) }]}>
                    <Text style={[styles.sizePillText, { fontSize: scaleh(14), fontWeight: '700' }]}>{item.size || '60ml'}</Text>
                  </View>

                  <View style={[styles.priceActionContainer, { borderColor: '#FF0069', height: scalev(50), width: '100%', borderRadius: scaleh(15) }]}>
                    <View style={[styles.priceSection, { borderRightColor: '#FF0069' }]}>
                      <Text style={[styles.priceText, { fontSize: scaleh(18) }]}>₹{item.price || '899'}</Text>
                    </View>
                    <TouchableOpacity style={styles.addToCartSection}>
                      <Text style={[styles.addToCartText, { color: '#FF0069', fontWeight: '800', fontSize: scaleh(14) }]}>Add to Cart</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              ListEmptyComponent={() => (
                <View style={{ width: width - scaleh(40), alignItems: 'center', justifyContent: 'center', height: scalev(200) }}>
                  <Text>{loading ? 'Loading Products...' : 'No products found.'}</Text>
                </View>
              )}
            />
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
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                if (item.type === 'freebie') {
                  return (
                    <View style={{ width: width, paddingHorizontal: scaleh(20) }}>
                      <View style={[styles.comboBanner, { backgroundColor: 'transparent' }]}>
                        {/* Outer banner background as a horizontal band */}
                        <LinearGradient colors={item.bgGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[StyleSheet.absoluteFill, { borderRadius: scaleh(20), top: scalev(25), bottom: scalev(10) }]} />
                        <View style={[styles.comboBannerLeft, { zIndex: 10 }]}>
                          <Image source={item.imageProduct} style={[styles.comboImage, { width: '150%', height: '150%', marginLeft: scaleh(-10), bottom: scalev(5) }]} resizeMode="contain" />
                        </View>
                        <View style={[styles.comboBannerRight, { alignItems: 'center', justifyContent: 'center', paddingLeft: scaleh(5), top: scalev(5) }]}>
                          <View style={styles.freebieBtn}>
                            <Text style={styles.freebieBtnText}>{item.title}</Text>
                          </View>
                          <Text style={[styles.comboSubtitle, { color: '#000000', fontWeight: '800', fontSize: scaleh(14), marginTop: scalev(5), marginBottom: scalev(8) }]}>{item.subtitle}</Text>
                          <View style={styles.freebieIconWrapper}>
                            <Icon name="chevron-right" size={scaleh(16)} color="#FFFFFF" />
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                } else {
                  return (
                    <View style={{ width: width, paddingHorizontal: scaleh(20) }}>
                      <View style={[styles.comboBanner, { backgroundColor: 'transparent' }]}>
                        {/* Outer banner background as a horizontal band */}
                        <View style={[StyleSheet.absoluteFill, { backgroundColor: item.bgColor, borderRadius: scaleh(20), overflow: 'hidden', top: scalev(25), bottom: scalev(10) }]} />

                        <View style={[styles.comboBannerLeft, { zIndex: 10 }]}>
                          <Image source={item.imageBase} style={[StyleSheet.absoluteFill, { width: '130%', height: '130%', left: scaleh(-60), top: scalev(-10) }]} resizeMode="contain" />
                          <Image source={item.imageProduct} style={[styles.comboImage, { width: '110%', height: '150%', marginLeft: scaleh(50), bottom: scalev(15) }]} resizeMode="contain" />
                        </View>

                        <View style={[styles.comboBannerRight, { alignItems: 'center', justifyContent: 'center' }]}>
                          {/* Inner text bubble popping out of the top of the band */}
                          <View style={{ backgroundColor: item.innerColor, borderRadius: scaleh(25), paddingVertical: scalev(12), paddingHorizontal: scaleh(15), top: scalev(-15), marginBottom: scalev(0), width: '100%', alignItems: 'center', zIndex: 10 }}>
                            <Text style={[styles.comboTitle, { fontSize: scaleh(24), marginBottom: scalev(0) }]}>{item.title}</Text>
                            <Text style={[styles.comboSubtitle, { fontSize: scaleh(20), marginBottom: scalev(0), fontWeight: '400' }]}>{item.subtitle}</Text>
                          </View>

                          {/* Button inside the band */}
                          <TouchableOpacity style={[styles.comboCodeBtn, { borderRadius: 10, paddingVertical: scalev(8), paddingHorizontal: scaleh(15), borderWidth: 1, borderColor: '#F1C9A9', top: scalev(-5) }]}>
                            <Text style={styles.comboCodeText}>{item.btnText}  <Icon name="chevron-right" size={scaleh(14)} color="#1a1a1a" /></Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                }
              }}
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
                    <Image source={item.image} style={styles.categoryImage} resizeMode="cover" />
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
              renderItem={({ item, index }) => {
                const isActive = activeSkinIndex === index;
                const displayColor = isActive ? '#FF0069' : item.color;
                return (
                  <TouchableOpacity activeOpacity={0.9} onPress={() => setActiveSkinIndex(index)} style={[styles.skinTypeCard, { borderColor: displayColor }]}>
                    <Image source={item.image} style={styles.skinTypeImage} resizeMode="cover" />
                    <View style={[styles.skinTypeBottomBar, { backgroundColor: displayColor }]}>
                      <Text style={styles.skinTypeBottomText}>{item.title}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          {/* Skincare Features & Guides Section */}
          <View style={styles.featuresSection}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuresScroll}>
              <View style={styles.featureItem}>
                <View style={styles.featureCircle}>
                  <Icon name="activity" size={scaleh(24)} color="#FF9966" />
                </View>
                <Text style={styles.featureTextTop}>Clinically</Text>
                <Text style={styles.featureTextBottom}>Proven Results</Text>
              </View>
              <View style={styles.featureItem}>
                <View style={styles.featureCircle}>
                  <Icon name="heart" size={scaleh(24)} color="#FF9966" />
                </View>
                <Text style={styles.featureTextTop}>Cruelty</Text>
                <Text style={styles.featureTextBottom}>Free</Text>
              </View>
              <View style={styles.featureItem}>
                <View style={styles.featureCircle}>
                  <Icon name="feather" size={scaleh(24)} color="#FF9966" />
                </View>
                <Text style={styles.featureTextTop}>Vegan</Text>
                <Text style={styles.featureTextBottom}>Friendly</Text>
              </View>
              <View style={styles.featureItem}>
                <View style={styles.featureCircle}>
                  <Icon name="sun" size={scaleh(24)} color="#FF9966" />
                </View>
                <Text style={styles.featureTextTop}>Plant</Text>
                <Text style={styles.featureTextBottom}>Bio Actives</Text>
              </View>
            </ScrollView>

            <View style={styles.guidesHeader}>
              <Text style={styles.guidesTitleBlack}>Skincare </Text>
              <Text style={styles.guidesTitlePink}>Guides</Text>
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

            {/* Swipable Pink Placeholder Cards */}
            <View style={{ height: scalev(250), marginBottom: scalev(20) }}>
              <FlatList
                data={[1, 2, 3, 4]} // 4 cards to match the 4 tabs
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

            {/* Pagination Dots */}
            <View style={styles.guideDotsContainer}>
              {[0, 1, 2, 3].map((idx) => (
                <View key={idx} style={[styles.guideDot, activeGuideIndex === idx && styles.guideDotActive]} />
              ))}
            </View>

          </View>

        </ScrollView>
      </SafeAreaView>

      <BottomNavBar
        activeTab="home"
        onTabPress={(tabId) => {
          if (tabId === 'shop') {
            navigation.navigate('Shop');
          }
          if (tabId === 'new') {
            navigation.navigate('NewScreen');
          }
          if (tabId === 'rewards') {
            navigation.navigate('RewardsScreen');
          }
          if (tabId === 'account') {
            navigation.navigate('AccountScreen');
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
    paddingTop: StatusBar.currentHeight || scalev(30),
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
    paddingLeft: 1,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  comboCodeText: {
    fontSize: scaleh(12),
    fontWeight: '700',
    color: '#1a1a1a',
  },
  freebieBtn: {
    backgroundColor: '#FFFFFF',
    paddingVertical: scalev(6),
    paddingHorizontal: scaleh(15),
    borderRadius: scaleh(10),
    borderWidth: 1.5,
    borderColor: '#FF0069',
  },
  freebieBtnText: {
    color: '#FF0069',
    fontSize: scaleh(22),
    fontWeight: '800',
  },
  freebieIconWrapper: {
    backgroundColor: '#000000',
    borderRadius: scaleh(14),
    width: scaleh(28),
    height: scaleh(28),
    justifyContent: 'center',
    alignItems: 'center',
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
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: scaleh(200),
    height: scalev(130),
    borderRadius: scaleh(15),
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    marginHorizontal: scaleh(10),
    borderWidth: 2,
  },
  skinTypeImage: {
    flex: 1,
    width: '100%',
  },
  skinTypeBottomBar: {
    position: 'absolute',
    bottom: -3,
    width: '100%',
    height: '25%', // use percentage so it scales perfectly between active and inactive sizes
    justifyContent: 'center',
    alignItems: 'center',
  },
  skinTypeBottomText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: scaleh(14),
  },
  featuresSection: {
    width: '100%',
    paddingTop: scalev(40),
    paddingBottom: scalev(60), // Space above nav bar
  },
  featuresScroll: {
    paddingHorizontal: scaleh(20),
    marginBottom: scalev(40),
  },
  featureItem: {
    alignItems: 'center',
    marginRight: scaleh(25),
  },
  featureCircle: {
    width: scaleh(60),
    height: scaleh(60),
    borderRadius: scaleh(30),
    borderWidth: 1,
    borderColor: '#FFD1E3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scalev(8),
  },
  featureTextTop: {
    fontSize: scaleh(10),
    color: AppTheme.colors.primary,
    fontWeight: '700',
    marginBottom: scalev(2),
  },
  featureTextBottom: {
    fontSize: scaleh(10),
    color: '#000',
    fontWeight: '800',
  },
  guidesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scalev(25),
  },
  guidesTitleBlack: {
    fontSize: scaleh(20),
    fontWeight: '400',
    color: '#000',
  },
  guidesTitlePink: {
    fontSize: scaleh(20),
    fontWeight: '800',
    color: '#FF88A7',
  },
  guideTabsScroll: {
    paddingHorizontal: scaleh(20),
    marginBottom: scalev(20),
  },
  guideTab: {
    paddingHorizontal: scaleh(20),
    paddingVertical: scalev(10),
    borderRadius: scaleh(12),
    borderWidth: 1,
    borderColor: '#FFD1E3',
    marginRight: scaleh(15),
    backgroundColor: '#FFF',
  },
  guideTabActive: {
    backgroundColor: AppTheme.colors.primary,
    borderColor: AppTheme.colors.primary,
  },
  guideTabText: {
    fontSize: scaleh(12),
    color: '#000',
    fontWeight: '600',
  },
  guideTabTextActive: {
    color: '#FFF',
  },
  guideCard: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: scalev(250),
    marginHorizontal: scaleh(20),
    borderRadius: scaleh(15),
  },
  guideDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scalev(50)
  },
  guideDot: {
    width: scaleh(8),
    height: scaleh(8),
    borderRadius: scaleh(4),
    backgroundColor: '#EBEBEB',
    marginHorizontal: scaleh(6),
  },
  guideDotActive: {
    backgroundColor: AppTheme.colors.primary,
  }
});

export default DashboardScreen;
