import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, StatusBar, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { AppTheme, scaleh, scalev } from '../../../../constants/AppTheme';
import BottomNavBar from '../../../../constants/BottomNavBar';
import Header from '../../../../components/Header';
import FilterSortModal from './FilterSortModal';

// Dummy Data
const skinTypesData = [
  { id: '1', title: 'Normal Skin', image: require('../../../../images/skinTypeImages/normalSkin.webp') },
  { id: '2', title: 'Sensitive Skin', image: require('../../../../images/skinTypeImages/sensitiveSkin.webp') },
  { id: '3', title: 'Oily Skin', image: require('../../../../images/skinTypeImages/oilySkin.webp') },
  { id: '4', title: 'Dry Skin', image: require('../../../../images/skinTypeImages/drySkin.webp') },
  { id: '5', title: 'Combination Skin', image: require('../../../../images/skinTypeImages/combinationSkin.webp') },
  { id: '6', title: 'Acne - Prone', image: require('../../../../images/skinTypeImages/acneSkin.webp') },
];

const dummyProducts = Array.from({ length: 10 }, (_, i) => ({
  id: i.toString(),
})).map((item, index) => ({ ...item, id: index.toString() }));

const ViewAllSkinTypesScreen = () => {
  const navigation = useNavigation();
  const [activeSkinType, setActiveSkinType] = useState('1'); // Select Normal Skin initially
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [modalTab, setModalTab] = useState('Filters'); // Can be 'Filters' or 'Sort By'

  const openModal = (tab) => {
    setModalTab(tab);
    setFilterModalVisible(true);
  };

  const renderProductCard = ({ item }) => (
    <TouchableOpacity style={styles.shopByProductCard} activeOpacity={0.8}>
      {/* Top Image Section */}
      <LinearGradient 
        colors={['#FFD1DC', '#FFF5F5', '#FFFFFF']} 
        style={styles.shopByImageContainer}
      >
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

        {/* Horizontal Scrollable Skin Types */}
        <View style={styles.skinTypesWrapper}>
          <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.skinTypesScrollContent}
            data={skinTypesData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              const isActive = activeSkinType === item.id;
              return (
                <TouchableOpacity 
                  style={[styles.skinTypeItem, isActive && styles.skinTypeItemActive]}
                  onPress={() => setActiveSkinType(item.id)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.skinTypeImageWrapper, isActive && styles.skinTypeImageWrapperActive]}>
                    <Image source={item.image} style={styles.skinTypeImage} resizeMode="cover" />
                  </View>
                  <Text style={[styles.skinTypeText, isActive && styles.skinTypeTextActive]}>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
          />
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

        {/* Floating Filter / Sort Button */}
        <View style={styles.floatingActionContainer}>
          <TouchableOpacity style={styles.floatingActionBtn} activeOpacity={0.8} onPress={() => openModal('Filters')}>
            <Icon name="sliders" size={scaleh(16)} color="#FF0069" style={styles.floatingIcon} />
            <Text style={styles.floatingActionText}>Filter</Text>
          </TouchableOpacity>
          <View style={styles.floatingActionDivider} />
          <TouchableOpacity style={styles.floatingActionBtn} activeOpacity={0.8} onPress={() => openModal('Sort By')}>
            <Text style={styles.floatingActionText}>Sort</Text>
            <Icon name="chevron-down" size={scaleh(16)} color="#FF0069" style={styles.floatingIconRight} />
          </TouchableOpacity>
        </View>

        {/* Filter / Sort Bottom Sheet Modal */}
        <FilterSortModal 
          visible={isFilterModalVisible} 
          onClose={() => setFilterModalVisible(false)}
          initialTab={modalTab}
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
  
  // Horizontal Skin Types List
  skinTypesWrapper: {
    paddingVertical: scalev(15),
    backgroundColor: '#FFFFFF',
  },
  skinTypesScrollContent: {
    paddingHorizontal: scaleh(20),
    gap: scaleh(15),
  },
  skinTypeItem: {
    alignItems: 'center',
    width: scaleh(80),
  },
  skinTypeImageWrapper: {
    width: scaleh(70),
    height: scalev(50),
    borderRadius: scaleh(12),
    borderWidth: 1.5,
    borderColor: '#FFB6C1', // light pink border
    overflow: 'hidden',
    marginBottom: scalev(8),
  },
  skinTypeImageWrapperActive: {
    borderColor: '#FF0069', // hot pink border for active
    borderWidth: 2,
  },
  skinTypeImage: {
    width: '100%',
    height: '100%',
  },
  skinTypeText: {
    fontSize: scaleh(11),
    fontWeight: '600',
    color: '#FF0069',
    textAlign: 'center',
  },
  skinTypeTextActive: {
    color: '#FF0069',
    fontWeight: '700',
  },
  
  // Grid styles
  gridContent: {
    paddingHorizontal: scaleh(20),
    paddingBottom: scalev(80), // Space for floating button
    paddingTop: scalev(5),
  },
  rowWrapper: {
    justifyContent: 'space-between',
  },

  // Detailed Product Card styles (from Shop By)
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
    height: scalev(160),
    padding: scaleh(10),
    justifyContent: 'center',
    alignItems: 'center',
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
  },

  // Floating Action Button
  floatingActionContainer: {
    position: 'absolute',
    bottom: scalev(20),
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: scaleh(25),
    paddingVertical: scalev(10),
    paddingHorizontal: scaleh(20),
    elevation: 5,
    shadowColor: '#FF0069',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#FFB6C1',
    alignItems: 'center',
  },
  floatingActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleh(15),
  },
  floatingActionDivider: {
    width: 1,
    height: scalev(20),
    backgroundColor: '#FFB6C1',
    marginHorizontal: scaleh(5),
  },
  floatingIcon: {
    marginRight: scaleh(8),
  },
  floatingIconRight: {
    marginLeft: scaleh(8),
  },
  floatingActionText: {
    color: '#FF0069',
    fontSize: scaleh(14),
    fontWeight: '600',
  },
});

export default ViewAllSkinTypesScreen;
