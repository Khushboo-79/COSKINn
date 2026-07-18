import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Image, FlatList, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Rabbit, TreePine } from 'lucide-react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import { AppTheme, scaleh, scalev } from '../../constants/AppTheme';
import BottomNavBar from '../../constants/BottomNavBar';
import TopHeader from '../../components/TopHeader';
import SearchBarRow from '../../components/SearchBarRow';

const COSMETIC_CATEGORIES = [
  { id: '1', name: 'FRESH', image: require('../../images/bgImages/Fresh.webp') },
  { id: '2', name: 'FACE', image: require('../../images/makeup/BgImgs/Face.webp') },
  { id: '3', name: 'EYES', image: require('../../images/makeup/BgImgs/Eyes.webp') },
  { id: '4', name: 'LIPS', image: require('../../images/makeup/BgImgs/Lips.webp') },
  { id: '5', name: 'NAILS', image: require('../../images/makeup/BgImgs/Nails.webp') },
  { id: '6', name: 'BRUSHES & TOOLS', image: require('../../images/makeup/BgImgs/Brushes.webp') },
  { id: '7', name: 'PALETTES', image: require('../../images/makeup/BgImgs/Palettes.webp') },
  { id: '8', name: 'FRAGRANCE', image: require('../../images/makeup/BgImgs/Fragrance.webp') },
  { id: '9', name: 'KITS & COMBOS', image: require('../../images/makeup/BgImgs/Kits&Combos.webp') },
  { id: '10', name: 'GIFTS &\nACCESSORIES', image: require('../../images/makeup/BgImgs/Gifts.webp') },
];

const { width } = Dimensions.get('window');

const CosmeticsDashboardScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const activeDomain = useSelector(state => state.app.activeDomain);
  const { items: products, loading } = useSelector(state => state.product);
  const isThemeDark = activeDomain === 'skincare';

  useEffect(() => {
    dispatch(fetchProducts({ category: 'cosmetics' })); // Fetch cosmetics products
  }, [dispatch]);

  const [activeComboBannerIndex, setActiveComboBannerIndex] = React.useState(0);
  const comboBannerData = [
    {
      id: 1,
      type: 'discount',
      bgColor: '#FDECE2',
      innerColor: '#F1C9A9',
      imageProduct: require('../../images/makeup/ProductImgs/Blush.webp'),
      title: 'Flat 50% OFF',
      subtitle: 'on combos',
      btnText: 'Use Code: COMBO50',
    },
    {
      id: 2,
      type: 'freebie',
      bgGradient: ['#FF0069', '#FFD498'],
      imageProduct: require('../../images/makeup/ProductImgs/Blush.webp'),
      title: 'Get FREEBIES',
      subtitle: 'on order Rs. 1299+',
    },
    {
      id: 3,
      type: 'discount',
      bgColor: '#FDECE2',
      innerColor: '#F1C9A9',
      imageProduct: require('../../images/makeup/ProductImgs/Blush.webp'),
      title: 'Flat 50% OFF',
      subtitle: 'on combos',
      btnText: 'Use Code: COMBO50',
    }
  ];

  const handleComboScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    if (roundIndex !== activeComboBannerIndex) {
      setActiveComboBannerIndex(roundIndex);
    }
  };

  const renderCosmeticsProductCard = () => (
    <View style={styles.milkProductCard}>
      <View style={styles.milkImageContainer}>
        <Image source={require('../../images/makeup/ProductImgs/Blush.webp')} style={styles.milkProductImage} resizeMode="contain" />
        <TouchableOpacity style={styles.milkHeartIcon}>
          <Icon name="heart" size={scaleh(16)} color="#1a1a1a" />
        </TouchableOpacity>
      </View>
      <View style={styles.milkDetails}>
        <Text style={styles.milkTitle}>Milk Makeup</Text>
        <Text style={styles.milkSub}>Cooling Water Jelly Tint 5g{'\n'}Spritz (4 more Shades)</Text>
        <View style={styles.milkPriceRow}>
          <Text style={styles.milkPrice}>₹899</Text>
          <Text style={styles.milkOldPrice}>₹1099</Text>
        </View>
        <TouchableOpacity style={styles.milkAddBtn}>
          <Text style={styles.milkAddBtnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderNewlyLaunchedCard = ({ item }) => (
    <View style={[styles.origProductCard, { marginRight: scaleh(15) }]}>
      <View style={styles.origHeartIconContainer}>
        <Ionicons name="heart-outline" size={scaleh(16)} color="#666" />
      </View>
      <Image source={item?.images?.[0]?.url ? { uri: item.images[0].url } : require('../../images/makeup/ProductImgs/Blush.webp')} style={styles.origCardProductImage} resizeMode="contain" />
      <View style={styles.origCardDetails}>
        <Text style={styles.origProductNameFull} numberOfLines={3}>{item?.name || 'Vitamin C + E Sunscreen\nSPF 50 PA++++ with\nNew-Age UV Filters'}</Text>

        <View style={styles.origSkinTypeRow}>
          <Ionicons name="checkmark-circle-outline" size={scaleh(12)} color="#FF0069" />
          <Text style={styles.origSkinTypeText}> All Skin Types</Text>
        </View>

        <View style={styles.origRatingRow}>
          <View style={styles.origRatingBadge}>
            <Ionicons name="star" size={scaleh(10)} color="#FFF" />
            <Text style={styles.origRatingText}> 4.81</Text>
          </View>
          <Text style={styles.origReviewCount}>(5698)</Text>
        </View>

        <View style={styles.origSizePill}>
          <Text style={styles.origSizeText}>80g</Text>
        </View>

        <View style={styles.origPromoTextRow}>
          <View style={styles.promoIconOverlay}>
            <MaterialCommunityIcons name="decagram-outline" size={scaleh(12)} color="#FF0069" />
            <Text style={styles.promoIconText}>%</Text>
          </View>
          <Text style={styles.origPromoText}>Upto 20% OFF + Free Gifts</Text>
        </View>

        <View style={styles.origCashbackBadgeContainer}>
          <View style={styles.cashbackIconOverlay}>
            <MaterialCommunityIcons name="decagram" size={scaleh(34)} color="#F1C9A9" />
            <Text style={styles.cashbackIconText}>%</Text>
          </View>
          <View style={styles.origCashbackBadge}>
            <Text style={styles.origCashbackText}>Get 5% Cashback</Text>
          </View>
        </View>

        <Text style={styles.origPriceCurrentLarge}>₹{item?.price || '899'}</Text>
      </View>

      <View style={styles.origCardFooter}>
        <TouchableOpacity style={styles.origFooterHeartBtn}>
          <Ionicons name="heart" size={scaleh(22)} color="#FF0069" />
        </TouchableOpacity>
        <View style={styles.origFooterDivider} />
        <TouchableOpacity style={styles.origFooterCartBtn}>
          <Text style={styles.origFooterCartText}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#ffffffff' }]}>
      <Image
        source={require('../../images/makeup/CosmeticBackImg.webp')}
        style={[StyleSheet.absoluteFill, { width: '100%', height: '100%', opacity: 0.2 }]}
        resizeMode="cover"
      />
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <SafeAreaView style={styles.safeArea}>

        {/* Shared Top Header and Search */}
        <TopHeader />
        <SearchBarRow />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Categories Row (Horizontal Scroll) */}
          <View style={styles.categoriesWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesScrollContainer}
            >
              {COSMETIC_CATEGORIES.map((item) => (
                <TouchableOpacity key={item.id} style={styles.categoryCircle}>
                  <Image source={item.image} style={styles.circleImage} />
                  <Text style={styles.categoryLabel}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Big Pink Block */}
          <View style={{ width: '100%', height: scalev(300), backgroundColor: '#FFDCE6', marginTop: scalev(5), marginBottom: scalev(45), opacity: 0.6 }} />

          {/* Top Tall Cards Row */}
          <View style={styles.tallCardsRow}>
            <View style={[styles.tallCard, { backgroundColor: '#FFDCE6', opacity: 0.6 }]} />
            {renderCosmeticsProductCard()}
          </View>

          {/* Promo Banners */}
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
                      <View style={[styles.cosmeticsBanner, { backgroundColor: 'rgba(255, 194, 209, 0.5)' }]}>
                        <Image source={item.imageProduct} style={[styles.cosmeticsBannerImage, { transform: [{ scale: 0.7 }] }]} resizeMode="contain" />
                        <View style={styles.cosmeticsBannerRight}>
                          <View style={styles.freebiePill}>
                            <Text style={styles.freebiePillText}>Get FREEBIES</Text>
                            <View style={styles.freebieIconCircle}>
                              <Icon name="chevron-right" size={scaleh(12)} color="#FFF" />
                            </View>
                          </View>
                          <Text style={styles.freebieSubText}>on order Rs. 1299+</Text>
                        </View>
                      </View>
                    </View>
                  );
                } else {
                  return (
                    <View style={{ width: width, paddingHorizontal: scaleh(20) }}>
                      <View style={[styles.cosmeticsBanner, { backgroundColor: 'transparent' }]}>
                        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(250, 239, 226, 0.8)', borderRadius: scaleh(20), top: scalev(15), bottom: scalev(15) }]} />

                        <View style={{ width: '45%', height: '140%', marginLeft: scaleh(-10), position: 'relative' }}>
                          <Image source={item.imageProduct} style={{ position: 'absolute', width: '60%', height: '60%', left: scaleh(5), top: scalev(40) }} resizeMode="contain" />
                          <Image source={item.imageProduct} style={{ position: 'absolute', width: '50%', height: '50%', left: scaleh(55), top: scalev(60) }} resizeMode="contain" />
                        </View>

                        <View style={[styles.cosmeticsBannerRight, { justifyContent: 'center' }]}>
                          <View style={[styles.discountBubble, { position: 'absolute', top: scalev(-15), width: '105%', right: scaleh(10) }]}>
                            <Text style={styles.discountTitle}>Flat 50% OFF</Text>
                            <Text style={styles.discountSub}>on combos</Text>
                          </View>
                          <TouchableOpacity style={[styles.discountBtn, { marginTop: scalev(70) }]}>
                            <Text style={styles.discountBtnText}>Use Code: COMBO50 {'>'}</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                }
              }}
            />
          </View>
          <View style={styles.paginationDots}>
            {comboBannerData.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, activeComboBannerIndex === index && styles.dotActive]}
              />
            ))}
          </View>

          {/* Newly Launched Section */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Newly Launched</Text>
            <TouchableOpacity style={styles.viewMoreBtn}>
              <Text style={styles.viewMoreText}>View more</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Cards Row */}
          <View style={{ marginBottom: scalev(20) }}>
            <FlatList
              data={products}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
              contentContainerStyle={{ paddingHorizontal: scaleh(20) }}
              renderItem={renderNewlyLaunchedCard}
              ListEmptyComponent={() => (
                <View style={{ width: width - scaleh(40), alignItems: 'center', justifyContent: 'center', height: scalev(200) }}>
                  <Text>{loading ? 'Loading Products...' : 'No products found.'}</Text>
                </View>
              )}
            />
          </View>

          {/* Trust Badges Section */}
          <View style={styles.trustBadgesRow}>
            <View style={styles.trustBadgeItem}>
              <View style={styles.trustBadgeCircle}>
                <Ionicons name="flask-outline" size={scaleh(24)} color="#FF0069" />
              </View>
              <Text style={styles.trustBadgeTitle}>Clinically</Text>
              <Text style={styles.trustBadgeSub}>Proven Results</Text>
            </View>
            <View style={styles.trustBadgeItem}>
              <View style={styles.trustBadgeCircle}>
                <Rabbit color="#FF0069" size={scaleh(24)} />
              </View>
              <Text style={styles.trustBadgeTitle}>Cruelty</Text>
              <Text style={styles.trustBadgeSub}>Free</Text>
            </View>
            <View style={styles.trustBadgeItem}>
              <View style={styles.trustBadgeCircle}>
                <Ionicons name="leaf-outline" size={scaleh(24)} color="#FF0069" />
              </View>
              <Text style={styles.trustBadgeTitle}>Vegan</Text>
              <Text style={styles.trustBadgeSub}>Friendly</Text>
            </View>
            <View style={styles.trustBadgeItem}>
              <View style={styles.trustBadgeCircle}>
                <TreePine color="#FF0069" size={scaleh(24)} />
              </View>
              <Text style={styles.trustBadgeTitle}>Plant</Text>
              <Text style={styles.trustBadgeSub}>Bio Actives</Text>
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
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || scalev(30),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleh(20),
    paddingTop: scalev(10),
    paddingBottom: scalev(15),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: scaleh(10),
  },
  locationText: {
    fontSize: scaleh(14),
    color: '#1a1a1a',
    marginHorizontal: scaleh(5),
    flex: 1,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    marginBottom: scalev(20),
    gap: scaleh(15),
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: scaleh(25),
    borderWidth: 1,
    borderColor: '#FF6B9E',
    height: scalev(45),
    paddingHorizontal: scaleh(15),
    shadowColor: '#FF6B9E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  productCard: {
    ...AppTheme.styles.shadowCard,
    width: scaleh(170),
    borderRadius: scaleh(20),
    padding: scaleh(15),
    position: 'relative',
    minHeight: scalev(320),
  },

  searchIcon: {
    marginRight: scaleh(10),
  },
  searchInput: {
    flex: 1,
    fontSize: scaleh(14),
    color: '#1a1a1a',
    paddingVertical: 0,
  },
  micIcon: {
    marginLeft: scaleh(10),
  },
  headerIconBtn: {
    padding: scaleh(5),
  },
  scrollContent: {
    paddingBottom: scalev(100),
  },
  categoriesWrapper: {
    marginBottom: scalev(30),
  },
  categoriesScrollContainer: {
    paddingHorizontal: scaleh(15),
    gap: scaleh(15),
  },
  categoryCircle: {
    alignItems: 'center',
    width: scaleh(80),
  },
  circleImage: {
    width: scaleh(80),
    height: scaleh(80),
    borderRadius: scaleh(45),
    borderWidth: 4,
    borderColor: AppTheme.colors.cosmeticsCard,
    marginBottom: scalev(10),
    overflow: 'hidden',
  },
  categoryLabel: {
    fontSize: scaleh(10),
    fontWeight: '600',
    color: '#1A1A1A',
    letterSpacing: 0.5,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  tallCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaleh(20),
    marginBottom: scalev(20),
  },
  tallCard: {
    width: scaleh(165),
    borderRadius: scaleh(20),
    padding: scaleh(10),
    position: 'relative',
    height: scalev(310),
  },
  heartIconContainer: {
    position: 'absolute',
    top: scalev(80),
    right: scaleh(10),
    zIndex: 1,
  },
  cardProductImage: {
    width: '100%',
    height: scalev(80),
    marginBottom: scalev(10),
  },
  milkProductCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: scaleh(20),
    marginTop: scalev(20),
    padding: scaleh(15),
    width: scaleh(165),
    height: scaleh(270),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  milkImageContainer: {
    alignItems: 'center',
    marginBottom: scalev(10),
    position: 'relative',
  },
  milkProductImage: {
    width: scaleh(100),
    height: scaleh(100),
  },
  milkHeartIcon: {
    position: 'absolute',
    top: 0,
    right: -scaleh(5),
  },
  milkTitle: {
    fontSize: scaleh(12),
    fontWeight: '700',
    color: '#000000',
    marginBottom: scalev(2),
  },
  milkSub: {
    fontSize: scaleh(10),
    color: '#666',
    marginBottom: scalev(8),
    lineHeight: scalev(14),
  },
  milkPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scalev(12),
  },
  milkPrice: {
    fontSize: scaleh(12),
    fontWeight: '700',
    color: '#000',
    marginRight: scaleh(5),
  },
  milkOldPrice: {
    fontSize: scaleh(10),
    color: '#999',
    textDecorationLine: 'line-through',
  },
  milkAddBtn: {
    backgroundColor: '#FFC2D1',
    borderRadius: scaleh(15),
    marginBottom: scalev(20),
    paddingVertical: scalev(10),
    alignItems: 'center',
  },
  milkAddBtnText: {
    fontSize: scaleh(12),
    fontWeight: '700',
    color: '#000',
  },
  trustBadgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaleh(20),
    marginBottom: scalev(30),
    marginTop: scalev(10),
  },
  trustBadgeItem: {
    alignItems: 'center',
    width: '22%',
  },
  trustBadgeCircle: {
    width: scaleh(50),
    height: scaleh(50),
    borderRadius: scaleh(25),
    borderWidth: 1.5,
    borderColor: '#FF0069',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scalev(5),
  },
  trustBadgeTitle: {
    fontSize: scaleh(12),
    fontWeight: '700',
    color: '#FF0069',
    textAlign: 'center',
  },
  trustBadgeSub: {
    fontSize: scaleh(10),
    fontWeight: '800',
    color: '#000',
    textAlign: 'center',
  },
  cosmeticsBanner: {
    borderRadius: scaleh(20),
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    overflow: 'visible',
  },
  cosmeticsBannerImage: {
    width: '45%',
    height: '130%',
    marginLeft: scaleh(-10),
  },
  cosmeticsBannerRight: {
    flex: 1,
    paddingRight: scaleh(15),
    paddingVertical: scalev(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountBubble: {
    backgroundColor: '#F3D2B8',
    borderRadius: scaleh(20),
    paddingVertical: scalev(10),
    paddingHorizontal: scaleh(20),
    marginBottom: scalev(15),
    width: '100%',
    alignItems: 'center',
  },
  discountTitle: {
    fontSize: scaleh(20),
    fontWeight: '800',
    color: '#000',
  },
  discountSub: {
    fontSize: scaleh(16),
    color: '#000',
    fontWeight: '400',
  },
  discountBtn: {
    backgroundColor: '#FFFFFF',
    paddingVertical: scalev(6),
    paddingHorizontal: scaleh(15),
    borderRadius: scaleh(8),
    borderWidth: 1,
    borderColor: '#E6C6AC',
  },
  discountBtnText: {
    fontSize: scaleh(12),
    fontWeight: '700',
    color: '#000',
  },
  freebiePill: {
    backgroundColor: '#FFFFFF',
    paddingVertical: scalev(8),
    paddingHorizontal: scaleh(15),
    borderRadius: scaleh(10),
    borderWidth: 1.5,
    borderColor: '#FF007F',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scalev(8),
  },
  freebiePillText: {
    color: '#FF007F',
    fontSize: scaleh(20),
    fontWeight: '800',
    marginRight: scaleh(10),
  },
  freebieIconCircle: {
    backgroundColor: '#000000',
    borderRadius: scaleh(12),
    width: scaleh(24),
    height: scaleh(24),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: scaleh(15),
    bottom: scalev(-12), // Drop it halfway outside the pill
  },
  freebieSubText: {
    color: '#000',
    fontWeight: '800',
    fontSize: scaleh(14),
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: scalev(10),
    marginBottom: scalev(5),
    gap: scaleh(15),
  },
  dot: {
    width: scaleh(10),
    height: scaleh(10),
    borderRadius: scaleh(5),
    backgroundColor: '#959595ff',
  },
  dotActive: {
    backgroundColor: '#FFC2D1',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    marginBottom: scalev(15),
  },
  sectionTitle: {
    fontSize: scaleh(16),
    fontWeight: '800',
    color: '#1a1a1a',
  },
  viewMoreBtn: {
    borderWidth: 2,
    backgroundColor: '#ffffffff',
    borderColor: '#FFC2D1',
    paddingVertical: scalev(10),
    paddingHorizontal: scaleh(15),
    borderRadius: scaleh(15),
  },
  viewMoreText: {
    color: '#FF0069',
    fontSize: scaleh(12),
    fontWeight: '600',
  },
  origProductCard: {
    ...AppTheme.styles.shadowCard,
    backgroundColor: '#FFFFFF',
    width: scaleh(170),
    borderRadius: scaleh(20),
    padding: scaleh(10),
    position: 'relative',
    height: scalev(370),
  },
  origHeartIconContainer: {
    position: 'absolute',
    top: scalev(15),
    right: scaleh(15),
    zIndex: 1,
  },
  origCardProductImage: {
    width: '100%',
    height: scalev(100),
    marginBottom: scalev(10),
  },
  origCardDetails: {
    flex: 1,
    paddingHorizontal: scaleh(5),
  },
  origProductNameFull: {
    fontSize: scaleh(11),
    fontWeight: '500',
    color: '#333',
    lineHeight: scalev(15),
    marginBottom: scalev(5),
  },
  origSkinTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scalev(5),
  },
  origSkinTypeText: {
    fontSize: scaleh(8),
    color: '#333',
    marginLeft: scaleh(3),
  },
  origRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scalev(5),
  },
  origRatingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5AD916',
    paddingHorizontal: scaleh(5),
    paddingVertical: scalev(2),
    borderRadius: scaleh(4),
  },
  origRatingText: {
    color: '#FFF',
    fontSize: scaleh(9),
    fontWeight: '700',
    marginLeft: scaleh(2),
  },
  origReviewCount: {
    fontSize: scaleh(9),
    color: '#999',
    marginLeft: scaleh(5),
  },
  origSizePill: {
    backgroundColor: '#FFC2D1',
    alignSelf: 'flex-start',
    paddingHorizontal: scaleh(10),
    paddingVertical: scalev(3),
    borderRadius: scaleh(5),
    marginBottom: scalev(5),
  },
  origSizeText: {
    fontSize: scaleh(9),
    fontWeight: '700',
    color: '#000',
  },
  origPromoTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scalev(5),
    backgroundColor: '#FFF0F5',
    paddingHorizontal: scaleh(5),
    paddingVertical: scalev(4),
    borderRadius: scaleh(4),
    alignSelf: 'flex-start',
  },
  origPromoText: {
    fontSize: scaleh(10),
    color: '#000',
    marginLeft: scaleh(4),
    fontWeight: '700',
  },
  promoIconOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoIconText: {
    position: 'absolute',
    color: '#FF0069',
    fontSize: scaleh(6),
    fontWeight: 'bold',
  },
  origCashbackBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scalev(8),
    alignSelf: 'flex-start',
  },
  cashbackIconOverlay: {
    position: 'absolute',
    left: scaleh(-5),
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cashbackIconText: {
    position: 'absolute',
    color: '#FFF',
    fontSize: scaleh(12),
    fontWeight: 'bold',
  },
  origCashbackBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F0',
    paddingRight: scaleh(10),
    paddingLeft: scaleh(26),
    paddingVertical: scalev(4),
    borderRadius: scaleh(12),
    borderWidth: 1,
    borderColor: '#F1C9A9',
    marginLeft: scaleh(6),
  },
  origCashbackText: {
    fontSize: scaleh(10),
    fontWeight: '700',
    color: '#F48E44',
  },
  origPriceCurrentLarge: {
    fontSize: scaleh(18),
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: scalev(5),
  },
  origCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1.5,
    borderColor: '#FFE0E8',
    paddingTop: scalev(8),
    marginTop: scalev(5),
    paddingHorizontal: scaleh(5),
  },
  origFooterHeartBtn: {
    width: scaleh(28),
    height: scaleh(28),
    justifyContent: 'center',
    alignItems: 'center',
  },
  origFooterDivider: {
    width: 1.5,
    height: '100%',
    backgroundColor: '#FFE0E8',
    marginHorizontal: scaleh(10),
  },
  origFooterCartBtn: {
    flex: 1,
    alignItems: 'center',
  },
  origFooterCartText: {
    fontSize: scaleh(12),
    fontWeight: '700',
    color: '#1a1a1a',
  },
});

export default CosmeticsDashboardScreen;
