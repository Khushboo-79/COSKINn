import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Image, ActivityIndicator, InteractionManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { AppTheme, scaleh, scalev } from '../../constants/AppTheme';
import { productService } from '../../services/productService';
import { toggleWishlist } from '../../redux/slices/wishlistSlice';
import { addToCart, updateCartItem, removeFromCart } from '../../redux/slices/cartSlice';

const popularChoices = [
  { id: 1, title: 'Suncreen' },
  { id: 2, title: 'Moisturizer' },
  { id: 3, title: 'Cleanser' },
  { id: 4, title: 'Combos' },
];

const recommendedProducts = [
  {
    id: 1,
    brand: 'Milk Makeup',
    title: 'Vitamin C + E Sunscreen\nSPF 50 PA++++ with\nNew-Age UV Filters',
    price: '₹899',
    image: require('../../images/makeup/ProductImgs/Blush.webp'),
    bgImage: require('../../images/bgImages/orange.webp'),
  },
  {
    id: 2,
    brand: 'Milk Makeup',
    title: 'Vitamin C + E Sunscreen\nSPF 50 PA++++ with\nNew-Age UV Filters',
    price: '₹899',
    image: require('../../images/makeup/ProductImgs/Blush.webp'),
    bgImage: require('../../images/bgImages/orange.webp'),
  },
];

const SearchScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const activeDomain = useSelector(state => state.app?.activeDomain || 'skincare');
  const isCosmetics = activeDomain === 'cosmetics';
  const searchBorderColor = isCosmetics ? '#FFC2D1' : AppTheme.colors.primary;

  const cartItems = useSelector(state => state.cart.items) || [];
  const wishlistItems = useSelector(state => state.wishlist.items) || [];

  const searchInputRef = useRef(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Delay focusing the keyboard until the screen transition animation finishes
    // This prevents the extreme lag spike that occurs when animating the screen and keyboard simultaneously
    const interactionTask = InteractionManager.runAfterInteractions(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    });
    return () => interactionTask.cancel();
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          console.log(`[SearchScreen] Hitting Search API for: "${searchQuery}" in segment: ${activeDomain}`);
          const results = await productService.searchProducts(searchQuery, activeDomain);
          console.log(`[SearchScreen] Search API Success! Found ${results?.length || 0} results.`);
          setSearchResults(results);
        } catch (err) {
          console.error("[SearchScreen] Search error:", err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, activeDomain]);

  const renderProductCard = (item, isDummy = false) => {
    const isWishlisted = !isDummy && wishlistItems?.some(w => w.productId === item.id);
    const cartItem = !isDummy && cartItems?.find(c => c.productId === item.id);

    if (isCosmetics) {
      return (
        <View key={item.id} style={styles.cosmeticProductCard}>
          <TouchableOpacity 
            style={styles.heartIconContainer}
            onPress={() => !isDummy && dispatch(toggleWishlist(item.id))}
          >
            <Ionicons name={isWishlisted ? "heart" : "heart-outline"} size={scaleh(16)} color={isWishlisted ? "#FF0069" : "#666"} />
          </TouchableOpacity>
          <Image source={isDummy ? item.image : (item?.images?.[0]?.url ? { uri: item.images[0].url } : require('../../images/makeup/ProductImgs/Blush.webp'))} style={styles.cosmeticProductImage} resizeMode="contain" />
          <View style={styles.cosmeticProductInfo}>
            <Text style={styles.cosmeticProductBrand}>{item.brand || 'COSKINn'}</Text>
            <Text style={styles.cosmeticProductTitle} numberOfLines={3}>{item.title || item.name}</Text>
            <View style={styles.cosmeticProductBottom}>
              <Text style={styles.cosmeticProductPrice}>{isDummy ? item.price : `₹${item.discountPrice || item.price}`}</Text>
              
              {cartItem ? (
                 <View style={styles.searchQtyRow}>
                   <TouchableOpacity style={styles.searchQtyBtn} onPress={() => {
                     if (cartItem.quantity > 1) {
                       dispatch(updateCartItem({ itemId: cartItem.id, quantity: cartItem.quantity - 1 }));
                     } else {
                       dispatch(removeFromCart(cartItem.id));
                     }
                   }}>
                     <Icon name="minus" size={12} color="#1a1a1a" />
                   </TouchableOpacity>
                   <Text style={styles.searchQtyText}>{cartItem.quantity}</Text>
                   <TouchableOpacity style={styles.searchQtyBtn} onPress={() => dispatch(updateCartItem({ itemId: cartItem.id, quantity: cartItem.quantity + 1 }))}>
                     <Icon name="plus" size={12} color="#FF0069" />
                   </TouchableOpacity>
                 </View>
              ) : (
                <TouchableOpacity style={styles.cosmeticAddButton} onPress={() => !isDummy && dispatch(addToCart({ productId: item.id }))}>
                  <Icon name="shopping-bag" size={14} color="#FFF" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      );
    }
    
    // Skincare render
    return (
      <View key={item.id} style={styles.productCard}>
        <View style={styles.productImageSection}>
          <TouchableOpacity 
            style={styles.heartIconContainer}
            onPress={() => !isDummy && dispatch(toggleWishlist(item.id))}
          >
            <Ionicons name={isWishlisted ? "heart" : "heart-outline"} size={scaleh(16)} color={isWishlisted ? "#FF0069" : "#666"} />
          </TouchableOpacity>
          <LinearGradient colors={['#FFD1E3', '#FFF2E6']} style={StyleSheet.absoluteFill} />
          {!isDummy && <Image source={require('../../images/bgImages/orange.webp')} style={[StyleSheet.absoluteFill, { width: '130%', height: '130%', left: '-15%', top: '-15%', opacity: 0.9 }]} resizeMode="cover" />}
          {isDummy && <Image source={item.bgImage} style={[StyleSheet.absoluteFill, { width: '130%', height: '130%', left: '-15%', top: '-15%', opacity: 0.9 }]} resizeMode="cover" />}
          
          <Image source={isDummy ? item.image : (item?.images?.[0]?.url ? { uri: item.images[0].url } : require('../../images/bgImages/productImg.webp'))} style={styles.productImage} resizeMode="contain" />
        </View>
        <View style={styles.productInfoSection}>
          <Text style={styles.productTitle} numberOfLines={3}>{item.title || item.name}</Text>
          <View style={styles.productBottomRow}>
            <Text style={styles.productPrice}>{isDummy ? item.price : `₹${item.discountPrice || item.price}`}</Text>
            
            {cartItem ? (
               <View style={styles.searchQtyRow}>
                 <TouchableOpacity style={styles.searchQtyBtn} onPress={() => {
                   if (cartItem.quantity > 1) {
                     dispatch(updateCartItem({ itemId: cartItem.id, quantity: cartItem.quantity - 1 }));
                   } else {
                     dispatch(removeFromCart(cartItem.id));
                   }
                 }}>
                   <Icon name="minus" size={12} color="#1a1a1a" />
                 </TouchableOpacity>
                 <Text style={styles.searchQtyText}>{cartItem.quantity}</Text>
                 <TouchableOpacity style={styles.searchQtyBtn} onPress={() => dispatch(updateCartItem({ itemId: cartItem.id, quantity: cartItem.quantity + 1 }))}>
                   <Icon name="plus" size={12} color="#FF0069" />
                 </TouchableOpacity>
               </View>
            ) : (
              <TouchableOpacity style={styles.addButton} onPress={() => !isDummy && dispatch(addToCart({ productId: item.id }))}>
                <Icon name="shopping-bag" size={16} color="#FFF" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: isCosmetics ? '#ffffffff' : AppTheme.colors.white }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-left" size={28} color="#000" />
          </TouchableOpacity>
          <View style={[styles.searchBar, { borderColor: searchBorderColor }]}>
            <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              ref={searchInputRef}
              style={styles.searchInput}
              placeholder="Type to search.."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 ? (
              <TouchableOpacity onPress={() => setSearchQuery('')} style={{ padding: 4 }}>
                 <Icon name="x" size={20} color="#666" style={styles.micIcon} />
              </TouchableOpacity>
            ) : (
              <Icon name="mic" size={20} color="#666" style={styles.micIcon} />
            )}
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {searchQuery.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>SEARCH RESULTS</Text>
              {isSearching ? (
                <View style={{ marginTop: scalev(40) }}>
                  <ActivityIndicator size="large" color={searchBorderColor} />
                </View>
              ) : searchResults.length === 0 ? (
                <Text style={{ textAlign: 'center', marginTop: scalev(40), color: '#666' }}>No products found for "{searchQuery}"</Text>
              ) : (
                <View style={styles.recommendedContainer}>
                  {searchResults.map((product) => renderProductCard(product, false))}
                </View>
              )}
            </View>
          ) : (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>POPULAR CHOICES</Text>
                <View style={styles.choicesContainer}>
                  {popularChoices.map((choice) => (
                    <TouchableOpacity key={choice.id} style={[styles.choicePill, { borderColor: searchBorderColor }]} onPress={() => setSearchQuery(choice.title)}>
                      <Text style={styles.choiceText}>{choice.title}</Text>
                      <Icon name="arrow-right" size={16} color="#000" style={styles.choiceIcon} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>RECOMMENDED FOR YOU</Text>
                <View style={styles.recommendedContainer}>
                  {recommendedProducts.map((product) => renderProductCard(product, true))}
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    paddingTop: scalev(20),
    paddingBottom: scalev(20),
    marginBottom: scalev(15),
    marginTop: scalev(35),
  },
  backButton: {
    marginRight: scaleh(15),
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: scalev(44),
    borderRadius: scaleh(22),
    borderWidth: 1.5,
    borderColor: AppTheme.colors.primary,
    backgroundColor: AppTheme.colors.white,
    paddingHorizontal: scaleh(15),
  },
  searchIcon: {
    marginRight: scaleh(10),
  },
  searchInput: {
    flex: 1,
    height: '100%',
    padding: 0,
    fontSize: scaleh(14),
    color: AppTheme.colors.textDark,
  },
  micIcon: {
    marginLeft: scaleh(10),
  },
  scrollContent: {
    paddingBottom: scalev(40),
  },
  section: {
    marginBottom: scalev(30),
    paddingHorizontal: scaleh(20),
  },
  sectionTitle: {
    fontSize: scaleh(12),
    fontWeight: '600',
    color: '#333',
    marginBottom: scalev(15),
    letterSpacing: 0.5,
  },
  choicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  choicePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppTheme.colors.white,
    borderWidth: 1,
    borderColor: AppTheme.colors.primary,
    borderRadius: scaleh(8),
    paddingVertical: scalev(8),
    paddingHorizontal: scaleh(15),
    marginRight: scaleh(10),
    marginBottom: scalev(10),
  },
  choiceText: {
    fontSize: scaleh(13),
    color: AppTheme.colors.textDark,
    marginRight: scaleh(8),
    fontWeight: '500',
  },
  choiceIcon: {
    marginTop: 1,
  },
  recommendedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: scalev(15),
  },
  productCard: {
    ...AppTheme.styles.shadowCard,
    width: '48%',
    overflow: 'hidden',
  },
  productImageSection: {
    height: scalev(140),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  productImage: {
    width: '80%',
    height: '90%',
    marginTop: scalev(10),
  },
  productInfoSection: {
    padding: scaleh(12),
  },
  productTitle: {
    fontSize: scaleh(11),
    color: AppTheme.colors.textDark,
    fontWeight: '500',
    marginBottom: scalev(15),
    lineHeight: scalev(16),
  },
  productBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: scaleh(14),
    fontWeight: '700',
    color: AppTheme.colors.textDark,
  },
  addButton: {
    width: scaleh(28),
    height: scaleh(28),
    borderRadius: scaleh(10),
    backgroundColor: AppTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cosmeticProductCard: {
    ...AppTheme.styles.shadowCard,
    width: '48%',
    position: 'relative',
    padding: scaleh(15), // increased padding slightly for larger size
  },
  heartIconContainer: {
    position: 'absolute',
    top: scalev(12),
    right: scaleh(12),
    zIndex: 10,
  },
  cosmeticProductImage: {
    width: '100%',
    height: scalev(130),
    marginBottom: scalev(15),
  },
  cosmeticProductInfo: {
    flex: 1,
  },
  cosmeticProductBrand: {
    fontSize: scaleh(15), // Increased from 11
    fontWeight: '700',
    color: '#333',
    marginBottom: scalev(2),
  },
  cosmeticProductTitle: {
    fontSize: scaleh(12), // Increased from 9
    color: '#333',
    fontWeight: '400',
    lineHeight: scalev(16), // Increased from 12
    marginBottom: scalev(12),
  },
  cosmeticProductBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cosmeticProductPrice: {
    fontSize: scaleh(15), // Increased from 12
    fontWeight: '700',
    color: '#1a1a1a',
  },
  cosmeticAddButton: {
    width: scaleh(28),
    height: scaleh(28),
    borderRadius: scaleh(14),
    backgroundColor: '#FFC2D1', // Light pink background
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchQtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: scaleh(14),
  },
  searchQtyBtn: {
    paddingHorizontal: scaleh(6),
    paddingVertical: scalev(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchQtyText: {
    fontSize: scaleh(12),
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: scaleh(2),
  },
});

export default SearchScreen;
