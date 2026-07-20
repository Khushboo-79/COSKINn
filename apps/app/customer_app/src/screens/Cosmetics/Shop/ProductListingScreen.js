import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, Image, FlatList, ScrollView, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { scaleh, scalev } from '../../../constants/AppTheme';
import { SUBCATEGORIES_DATA } from './SubcategoryData';

const MOCK_PRODUCTS = Array.from({ length: 8 }).map((_, i) => ({
  id: `prod_${i}`,
  brand: 'Milk Makeup',
  title: 'Cooling Water Jelly Tint',
  weight: '5g',
  shades: '1pints 14 more Shades',
  price: '399',
  originalPrice: '899',
}));

const ProductListingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const initialCategory = route.params?.category || 'FACE';
  const initialSubcategory = route.params?.subcategory || 'Blush';

  const [activeSubcategory, setActiveSubcategory] = useState(initialSubcategory);
  const siblingTabs = SUBCATEGORIES_DATA[initialCategory] || [];

  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const scrollViewRef = useRef(null);

  const formatTitle = (str) => {
    if (!str) return '';
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  };

  const renderProduct = ({ item }) => {
    return (
      <View style={styles.productCard}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../images/makeup/ProductImgs/Blush.webp')}
            style={styles.productImage}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.wishlistBtn}>
            <Icon name="heart" size={scaleh(16)} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.brandText}>{item.brand}</Text>
          <Text style={styles.titleText} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.weightText}>{item.weight}</Text>
          <Text style={styles.shadesText}>{item.shades}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.priceText}>₹{item.price}</Text>
            <Text style={styles.originalPriceText}>₹{item.originalPrice}</Text>
          </View>

          <TouchableOpacity style={styles.addToCartBtn} activeOpacity={0.8}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../images/makeup/CosmeticBackImg.webp')}
        style={[StyleSheet.absoluteFill, { width: '100%', height: '100%', opacity: 0.15 }]}
        resizeMode="cover"
      />
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      {/* Solid Pink Header Background */}
      <View style={styles.headerBackground} />

      <SafeAreaView style={styles.safeArea}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Icon name="chevron-left" size={scaleh(28)} color="#1a1a1a" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{formatTitle(activeSubcategory)}</Text>

          <View style={styles.headerRightIcons}>
            <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Wishlist')}>
              <Icon name="heart" size={scaleh(22)} color="#1a1a1a" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconBtn, { marginLeft: scaleh(10) }]} onPress={() => navigation.navigate('Cart')}>
              <Icon name="shopping-cart" size={scaleh(22)} color="#1a1a1a" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Horizontal Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsScrollContent}
          >
            {siblingTabs.map((tab, index) => {
              // Skip the first "Complete X Collection" if you want, but the screenshot shows "Blush", "Highlighter", "Foundation" etc.
              // Let's render all.
              const isActive = activeSubcategory === tab.name;
              return (
                <TouchableOpacity
                  key={tab.id}
                  style={styles.tabItem}
                  onPress={() => setActiveSubcategory(tab.name)}
                >
                  <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                    {tab.name}
                  </Text>
                  {isActive && <View style={styles.activeTabLine} />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Info & Filters Row */}
        <View style={styles.filterRow}>
          <Text style={styles.itemsFoundText}>161 items found</Text>
          <View style={styles.filterActions}>
            <TouchableOpacity style={styles.filterBtn} onPress={() => setSortModalVisible(true)}>
              <Text style={styles.filterBtnText}>SORT</Text>
              <Icon name="chevron-down" size={scaleh(16)} color="#FFB2C9" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterBtn, { marginLeft: scaleh(15) }]} onPress={() => setFilterModalVisible(true)}>
              <Text style={styles.filterBtnText}>FILTER</Text>
              <Icon name="chevron-down" size={scaleh(16)} color="#FFB2C9" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Product Grid */}
        <FlatList
          data={MOCK_PRODUCTS}
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gridContent}
          columnWrapperStyle={styles.gridColumnWrapper}
          renderItem={renderProduct}
        />

        {/* Unified Filter/Sort Modal */}
        <Modal
          visible={sortModalVisible || filterModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => {
            setSortModalVisible(false);
            setFilterModalVisible(false);
          }}
        >
          <View style={styles.unifiedModalOverlay}>
            <View style={styles.unifiedModalContainer}>

              {/* Floating Close Button */}
              <TouchableOpacity
                style={styles.closeModalBtn}
                onPress={() => {
                  setSortModalVisible(false);
                  setFilterModalVisible(false);
                }}
              >
                <Icon name="x" size={scaleh(24)} color="#666" />
              </TouchableOpacity>

              {/* Tabs Row */}
              <View style={styles.modalTabsRow}>
                <TouchableOpacity
                  style={[styles.modalTabBtn, filterModalVisible && styles.modalTabActive]}
                  onPress={() => {
                    setFilterModalVisible(true);
                    setSortModalVisible(false);
                  }}
                >
                  <Text style={[styles.modalTabText, filterModalVisible && styles.modalTabTextActive]}>Filters</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalTabBtn, sortModalVisible && styles.modalTabActive]}
                  onPress={() => {
                    setSortModalVisible(true);
                    setFilterModalVisible(false);
                  }}
                >
                  <Text style={[styles.modalTabText, sortModalVisible && styles.modalTabTextActive]}>Sort By</Text>
                </TouchableOpacity>
              </View>

              {/* Modal Content */}
              <ScrollView style={styles.modalContentScroll} showsVerticalScrollIndicator={false}>
                {filterModalVisible ? (
                  // Filters Content
                  <View style={styles.modalOptionsContainer}>
                    {['Product Type', 'Skin Type', 'Ingredients'].map((option, i) => {
                      const isLast = i === 2;
                      return (
                        <TouchableOpacity key={i} style={[styles.unifiedOptionRow, isLast && styles.unifiedOptionRowLast]}>
                          <Text style={styles.unifiedOptionText}>{option}</Text>
                          <Icon name="chevron-right" size={scaleh(18)} color="#1a1a1a" />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ) : (
                  // Sort Content
                  <View style={styles.modalOptionsContainer}>
                    {['Best Selling', 'Prices, Low to High', 'Prices, High to Low'].map((option, i) => {
                      const isLast = i === 2;
                      return (
                        <TouchableOpacity key={i} style={[styles.unifiedOptionRow, isLast && styles.unifiedOptionRowLast]}>
                          <Text style={styles.unifiedOptionText}>{option}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              </ScrollView>

              {/* Footer */}
              <View style={styles.modalFooter}>
                <TouchableOpacity style={styles.resetBtn}>
                  <Text style={styles.resetBtnText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.doneBtn} onPress={() => {
                  setSortModalVisible(false);
                  setFilterModalVisible(false);
                }}>
                  <Text style={styles.doneBtnText}>Done (1)</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>

      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: scalev(100), // Covers status bar and header row
    backgroundColor: '#FFDCE6',
    zIndex: 0,
  },
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || scalev(30),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleh(15),
    paddingTop: scalev(10),
    height: scalev(80),
    zIndex: 1,
  },
  iconBtn: {
    padding: scaleh(5),
  },
  headerTitle: {
    fontSize: scaleh(20),
    fontWeight: '700',
    color: '#1a1a1a',
  },
  headerRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabsContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    height: scalev(45),
  },
  tabsScrollContent: {
    paddingHorizontal: scaleh(10),
  },
  tabItem: {
    paddingHorizontal: scaleh(15),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  tabText: {
    fontSize: scaleh(12),
    fontWeight: '500',
    color: '#333',
  },
  activeTabText: {
    fontWeight: '700',
    color: '#1a1a1a',
  },
  activeTabLine: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: scalev(3),
    backgroundColor: '#FFB2C9',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    paddingVertical: scalev(15),
  },
  itemsFoundText: {
    fontSize: scaleh(12),
    fontWeight: '600',
    color: '#1a1a1a',
  },
  filterActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterBtnText: {
    fontSize: scaleh(12),
    fontWeight: '700',
    color: '#1a1a1a',
    marginRight: scaleh(4),
  },
  gridContent: {
    paddingHorizontal: scaleh(15),
    paddingBottom: scalev(40),
  },
  gridColumnWrapper: {
    justifyContent: 'space-between',
    marginBottom: scalev(15),
  },
  productCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: scaleh(15),
    padding: scaleh(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: scalev(120),
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: '80%',
    height: '80%',
  },
  wishlistBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: scaleh(5),
  },
  productInfo: {
    marginTop: scalev(5),
  },
  brandText: {
    fontSize: scaleh(12),
    fontWeight: '800',
    color: '#1a1a1a',
  },
  titleText: {
    fontSize: scaleh(10),
    fontWeight: '500',
    color: '#333',
    marginTop: scalev(2),
  },
  weightText: {
    fontSize: scaleh(9),
    color: '#666',
    marginTop: scalev(2),
  },
  shadesText: {
    fontSize: scaleh(9),
    color: '#999',
    marginTop: scalev(2),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scalev(4),
  },
  priceText: {
    fontSize: scaleh(12),
    fontWeight: '700',
    color: '#1a1a1a',
  },
  originalPriceText: {
    fontSize: scaleh(10),
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: scaleh(5),
  },
  addToCartBtn: {
    backgroundColor: '#FFDCE6',
    borderRadius: scaleh(20),
    paddingVertical: scalev(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scalev(10),
  },
  addToCartText: {
    fontSize: scaleh(11),
    fontWeight: '700',
    color: '#1a1a1a',
  },
  unifiedModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.75)', // semi-transparent white overlay
    justifyContent: 'flex-start',
  },
  unifiedModalContainer: {
    flex: 1,
    marginTop: scalev(140), // Position modal body below header area
    backgroundColor: 'transparent',
  },
  closeModalBtn: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    width: scaleh(45),
    height: scaleh(45),
    borderRadius: scaleh(25),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scalev(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modalTabsRow: {
    flexDirection: 'row',
    marginHorizontal: scaleh(20),
    backgroundColor: '#FFFFFF',
    borderRadius: scaleh(25),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: scalev(15),
  },
  modalTabBtn: {
    flex: 1,
    paddingVertical: scalev(12),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  modalTabActive: {
    backgroundColor: '#FFC2D1',
  },
  modalTabText: {
    fontSize: scaleh(15),
    fontWeight: '700',
    color: '#1a1a1a',
  },
  modalTabTextActive: {
    color: '#FFFFFF',
  },
  modalContentScroll: {
    flex: 1,
  },
  modalOptionsContainer: {
    marginHorizontal: scaleh(20),
    backgroundColor: '#FFFFFF',
    borderRadius: scaleh(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  unifiedOptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scaleh(18),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  unifiedOptionRowLast: {
    borderBottomWidth: 0,
  },
  unifiedOptionText: {
    fontSize: scaleh(14),
    fontWeight: '500',
    color: '#1a1a1a',
  },
  modalFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scaleh(20),
    paddingBottom: scalev(30),
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  resetBtn: {
    paddingVertical: scalev(12),
    paddingHorizontal: scaleh(30),
    borderRadius: scaleh(10),
    borderWidth: 1,
    borderColor: '#FFC2D1',
    backgroundColor: '#FFFFFF',
  },
  resetBtnText: {
    fontSize: scaleh(14),
    fontWeight: '600',
    color: '#1a1a1a',
  },
  doneBtn: {
    paddingVertical: scalev(12),
    paddingHorizontal: scaleh(40),
    borderRadius: scaleh(10),
    backgroundColor: '#FFC2D1',
  },
  doneBtnText: {
    fontSize: scaleh(14),
    fontWeight: '700',
    color: '#1a1a1a',
  },
});

export default ProductListingScreen;
