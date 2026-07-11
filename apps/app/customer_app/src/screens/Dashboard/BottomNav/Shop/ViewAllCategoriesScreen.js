import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, StatusBar, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { AppTheme, scaleh, scalev } from '../../../../constants/AppTheme';
import Header from '../../../../components/Header';

const tabs = [
  'All', 'Sunscreens', 'Serums', 'Toners & Pads', 'Moisturizers', 'Cleansers', 
  'Lip Care', 'Eye Care', 'Mists & Sprays', 'Masks & Sheets', 'Skin Tools', 
  'Exfoliants & Scrubs', 'Hands & Feet', 'Specialized Skincare', 'Kits & Combos', 'Gifts'
];

const dummyProducts = Array(8).fill({
  id: '1',
  title: 'Vitamin C + E Sunscreen',
  subtitle1: 'SPF 50 PA++++ with',
  subtitle2: 'New-Age UV Filters',
  skinType: 'All Skin Types',
  rating: '4.81',
  reviews: '(5698)',
  weight: '50g',
  offer1: 'Upto 20% OFF + Free Gifts',
  offer2: 'Get 5% Cashback',
  price: '₹899',
  image: require('../../../../images/bgImages/productImg.webp') // using available image
}).map((item, index) => ({ ...item, id: index.toString() }));



const ViewAllCategoriesScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('All');

  const renderProductCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard} 
      activeOpacity={0.8}
      onPress={() => navigation.navigate('ProductDetailsScreen')}
    >
      {/* Top Image Section */}
      <LinearGradient 
        colors={['#FFD1DC', '#FFF5F5', '#FFFFFF']} 
        style={styles.imageContainer}
      >
        <Image source={item.image} style={styles.productImage} resizeMode="contain" />
      </LinearGradient>

      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productSubtitle}>{item.subtitle1}</Text>
        <Text style={styles.productSubtitle}>{item.subtitle2}</Text>
        
        <View style={styles.row}>
          <Icon name="check-circle" size={scaleh(12)} color="#FF0069" style={{ marginRight: scaleh(4) }} />
          <Text style={styles.skinTypeText}>{item.skinType}</Text>
        </View>

        <View style={[styles.row, { marginVertical: scalev(4) }]}>
          <View style={styles.ratingBadge}>
            <Icon name="star" size={scaleh(10)} color="#FFF" style={{ marginRight: scaleh(2) }} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.reviewsText}>{item.reviews}</Text>
        </View>

        <View style={styles.weightBadge}>
          <Text style={styles.weightText}>{item.weight}</Text>
        </View>

        <View style={styles.offerBadgePink}>
          <Icon name="gift" size={scaleh(10)} color="#FF0069" style={{ marginRight: scaleh(4) }} />
          <Text style={styles.offerTextPink}>{item.offer1}</Text>
        </View>

        <View style={styles.offerBadgeOrange}>
          <Text style={styles.percentIcon}>%</Text>
          <Text style={styles.offerTextOrange}>{item.offer2}</Text>
        </View>

        <Text style={styles.priceText}>{item.price}</Text>

        <TouchableOpacity style={styles.addToCartBtn} activeOpacity={0.8} onPress={() => navigation.navigate('Cart')}>
          <Icon name="heart" size={scaleh(16)} color="#FF0069" style={styles.cartHeartIcon} />
          <Text style={styles.addToCartText}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      
      <LinearGradient 
        colors={['#FF0069', '#FF9999']} 
        style={styles.headerGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
      >
        <SafeAreaView style={styles.headerSafeArea}>
          <Header 
            transparent={true}
            showLogo={false}
            onBackPress={() => navigation.goBack()}
            rightComponent={
              <View style={styles.headerRightIcons}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Cart')}>
                  <Icon name="shopping-cart" size={scaleh(22)} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
                  <Icon name="heart" size={scaleh(22)} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
                  <Icon name="search" size={scaleh(22)} color="#000" />
                </TouchableOpacity>
              </View>
            }
          />
        </SafeAreaView>
      </LinearGradient>
      
      <SafeAreaView style={styles.safeArea}>

        {/* Horizontal Scrollable Tabs */}
        <View style={styles.tabsWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScrollContent}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity 
                  key={tab} 
                  style={[styles.tabItem, isActive && styles.tabItemActive]}
                  onPress={() => setActiveTab(tab)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Vertical Scrollable Products Grid */}
        <FlatList
          style={{ backgroundColor: '#FFFFFF' }}
          data={dummyProducts}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={renderProductCard}
          contentContainerStyle={styles.gridContent}
          columnWrapperStyle={styles.rowWrapper}
          showsVerticalScrollIndicator={false}
        />

      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerGradient: {
    width: '100%',
    paddingTop: scalev(20), // Accounts for translucent status bar
  },
  headerSafeArea: {
    width: '100%',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleh(15),
  },
  iconBtn: {
    padding: scaleh(5),
  },
  tabsWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  tabsScrollContent: {
    paddingHorizontal: scaleh(10),
  },
  tabItem: {
    paddingHorizontal: scaleh(12),
    paddingVertical: scalev(12),
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: '#FF0069',
  },
  tabText: {
    fontSize: scaleh(14),
    fontWeight: '500',
    color: '#000000',
  },
  tabTextActive: {
    color: '#FF0069',
    fontWeight: '700',
  },
  gridContent: {
    paddingHorizontal: scaleh(10),
    paddingTop: scalev(15),
    paddingBottom: scalev(40),
  },
  rowWrapper: {
    justifyContent: 'space-between',
  },
  productCard: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: scaleh(15),
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: scalev(15),
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  imageContainer: {
    height: scalev(140),
    justifyContent: 'center',
    alignItems: 'center',
    padding: scaleh(10),
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    padding: scaleh(10),
  },
  productTitle: {
    fontSize: scaleh(12),
    fontWeight: '700',
    color: '#000000',
  },
  productSubtitle: {
    fontSize: scaleh(10),
    color: '#333333',
    marginTop: scalev(2),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scalev(4),
  },
  skinTypeText: {
    fontSize: scaleh(10),
    color: '#000',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: scaleh(4),
    paddingVertical: scalev(2),
    borderRadius: scaleh(4),
  },
  ratingText: {
    fontSize: scaleh(10),
    color: '#FFFFFF',
    fontWeight: '700',
  },
  reviewsText: {
    fontSize: scaleh(10),
    color: '#666666',
    marginLeft: scaleh(4),
  },
  weightBadge: {
    backgroundColor: '#FF0069',
    alignSelf: 'flex-start',
    paddingHorizontal: scaleh(8),
    paddingVertical: scalev(2),
    borderRadius: scaleh(4),
    marginVertical: scalev(6),
  },
  weightText: {
    color: '#FFFFFF',
    fontSize: scaleh(10),
    fontWeight: '700',
  },
  offerBadgePink: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD1DC',
    backgroundColor: '#FFF0F5',
    paddingHorizontal: scaleh(4),
    paddingVertical: scalev(2),
    borderRadius: scaleh(4),
    marginBottom: scalev(4),
    alignSelf: 'flex-start',
  },
  offerTextPink: {
    fontSize: scaleh(8),
    color: '#FF0069',
    fontWeight: '600',
  },
  offerBadgeOrange: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE4B5',
    backgroundColor: '#FFF8DC',
    paddingHorizontal: scaleh(4),
    paddingVertical: scalev(2),
    borderRadius: scaleh(4),
    marginBottom: scalev(8),
    alignSelf: 'flex-start',
  },
  percentIcon: {
    fontSize: scaleh(8),
    color: '#FFA500',
    fontWeight: '900',
    marginRight: scaleh(4),
  },
  offerTextOrange: {
    fontSize: scaleh(8),
    color: '#FFA500',
    fontWeight: '600',
  },
  priceText: {
    fontSize: scaleh(18),
    fontWeight: '800',
    color: '#000000',
    marginBottom: scalev(10),
  },
  addToCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FF0069',
    borderRadius: scaleh(20),
    paddingVertical: scalev(8),
  },
  cartHeartIcon: {
    marginRight: scaleh(6),
  },
  addToCartText: {
    color: '#FF0069',
    fontSize: scaleh(12),
    fontWeight: '700',
  },
});

export default ViewAllCategoriesScreen;
