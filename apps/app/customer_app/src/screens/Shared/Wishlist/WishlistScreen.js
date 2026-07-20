import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header';
import WishlistEmpty from './WishlistEmpty';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist } from '../../../redux/slices/wishlistSlice';
import { addToCart, updateCartItem, removeFromCart } from '../../../redux/slices/cartSlice';
import { AppTheme, scaleh, scalev } from '../../../constants/AppTheme';

const filledData = [
  {
    id: 1,
    title: 'Vitamin C + E Sunscreen\nSPF 50 PA++++ with\nNew-Age UV Filters',
    price: '₹899',
    rating: '4.81',
    reviews: '(5698)',
    size: '80g',
    offer: 'Upto 20% OFF + Free Gifts',
    cashback: 'Get 5% Cashback',
    image: require('../../../images/bgImages/productImg.webp'),
    bgImage: require('../../../images/bgImages/orange.webp'),
    cosmeticImage: require('../../../images/makeup/ProductImgs/Blush.webp'),
  },
  {
    id: 2,
    title: 'Vitamin C + E Sunscreen\nSPF 50 PA++++ with\nNew-Age UV Filters',
    price: '₹899',
    rating: '4.81',
    reviews: '(5698)',
    size: '80g',
    offer: 'Upto 20% OFF + Free Gifts',
    cashback: 'Get 5% Cashback',
    image: require('../../../images/bgImages/productImg.webp'),
    bgImage: require('../../../images/bgImages/orange.webp'),
    cosmeticImage: require('../../../images/makeup/ProductImgs/Blush.webp'),
  },
];
const WishlistScreen = () => {
  const wishlistItems = useSelector(state => state.wishlist.items);
  const activeDomain = useSelector(state => state.app?.activeDomain || 'skincare');
  const cartItems = useSelector(state => state.cart.items) || [];
  const dispatch = useDispatch();
  const isCosmetics = activeDomain === 'cosmetics';

  const renderFilled = () => (
    <View style={styles.filledContainer}>
      <Text style={[styles.pageTitle, { color: isCosmetics ? '#1A1A1A' : AppTheme.colors.textDark }]}>YOUR WISHLIST</Text>
      
      <FlatList
        data={wishlistItems.filter(item => item.product)}
        keyExtractor={item => item.id ? item.id.toString() : item.productId.toString()}
        numColumns={2}
        columnWrapperStyle={isCosmetics ? styles.rowCosmetics : styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const product = item.product;
          const cartItem = cartItems?.find(c => c.productId === product.id);
          if (isCosmetics) {
            return (
              <View style={styles.tallCard}>
                <TouchableOpacity 
                  style={styles.heartIconContainer}
                  onPress={() => dispatch(toggleWishlist(product.id))}
                >
                  <Ionicons name="heart" size={scaleh(16)} color="#FF0069" />
                </TouchableOpacity>
                <Image source={product.images?.[0]?.url ? { uri: product.images[0].url } : require('../../../images/makeup/ProductImgs/Blush.webp')} style={styles.cardProductImage} resizeMode="contain" />
                <View style={styles.cardDetailsCosmetics}>
                  <Text style={styles.productNameFull} numberOfLines={2}>{product.name}</Text>
                  
                  <View style={styles.skinTypeRowCosmetics}>
                    <Ionicons name="checkmark-circle-outline" size={scaleh(12)} color="#FF0069" />
                    <Text style={styles.skinTypeTextCosmetics}> All Skin Types</Text>
                  </View>

                  <View style={styles.ratingRowCosmetics}>
                    <View style={styles.ratingBadge}>
                      <Ionicons name="star" size={scaleh(10)} color="#FFF" />
                      <Text style={styles.ratingTextCosmetics}> 4.8</Text>
                    </View>
                    <Text style={styles.reviewCount}>(1k+)</Text>
                  </View>

                  <View style={styles.sizePillCosmetics}>
                    <Text style={styles.sizeTextCosmetics}>{product.netQuantity || 'Standard'}</Text>
                  </View>

                  <View style={styles.promoTextRow}>
                    <Ionicons name="close-circle-outline" size={scaleh(10)} color="#FF8BA7" />
                    <Text style={styles.promoText}> Upto 20% OFF + Free Gifts</Text>
                  </View>

                  <View style={styles.cashbackBadge}>
                    <Text style={styles.cashbackTextCosmetics}>%  Get 5% Cashback</Text>
                  </View>

                  <Text style={styles.priceCurrentLarge}>₹{product.discountPrice || product.mrp}</Text>
                </View>

                <View style={styles.cardFooter}>
                  <TouchableOpacity style={styles.footerHeartBtn} onPress={() => dispatch(toggleWishlist(product.id))}>
                    <Ionicons name="heart" size={scaleh(16)} color="#FF0069" />
                  </TouchableOpacity>
                  <View style={styles.footerDivider} />
                  <View style={styles.origAddToCartWrapper}>
                    {cartItem ? (
                      <View style={styles.quantityControl}>
                        <TouchableOpacity 
                          style={styles.qtyBtn}
                          onPress={() => {
                            if (cartItem.quantity > 1) {
                              dispatch(updateCartItem({ itemId: cartItem.id, quantity: cartItem.quantity - 1 }));
                            } else {
                              dispatch(removeFromCart(cartItem.id));
                            }
                          }}
                        >
                          <Icon name="minus" size={scaleh(16)} color="#1a1a1a" />
                        </TouchableOpacity>
                        <Text style={styles.qtyText}>{cartItem.quantity}</Text>
                        <TouchableOpacity 
                          style={styles.qtyBtn}
                          onPress={() => dispatch(updateCartItem({ itemId: cartItem.id, quantity: cartItem.quantity + 1 }))}
                        >
                          <Icon name="plus" size={scaleh(16)} color="#FF0069" />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity 
                        style={styles.footerCartBtn}
                        onPress={() => dispatch(addToCart({ productId: product.id }))}
                      >
                        <Text style={styles.footerCartText}>ADD TO CART</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            );
          }

          // Original Skincare Layout
          return (
            <View style={styles.card}>
              <View style={styles.imageSection}>
                <LinearGradient
                  colors={[AppTheme.colors.wishlistGradientStart, AppTheme.colors.wishlistGradientEnd]}
                  style={StyleSheet.absoluteFill}
                />
                <Image source={product.images?.[0]?.url ? { uri: product.images[0].url } : require('../../../images/bgImages/productImg.webp')} style={styles.productImage} resizeMode="contain" />
              </View>
              
              <View style={styles.detailsSection}>
                <Text style={styles.title} numberOfLines={2}>{product.name}</Text>
                
                <View style={styles.skinTypeRow}>
                  <Icon name="check-circle" size={scaleh(12)} color={AppTheme.colors.primary} />
                  <Text style={styles.skinTypeText}>All Skin Types</Text>
                </View>
                
                <View style={styles.ratingRow}>
                  <View style={styles.ratingBox}>
                    <Icon name="star" size={scaleh(10)} color={AppTheme.colors.white} />
                    <Text style={styles.ratingText}>4.8</Text>
                  </View>
                  <Text style={styles.reviewsText}>(1k+)</Text>
                </View>
                
                <View style={styles.sizePill}>
                  <Text style={styles.sizeText}>{product.netQuantity || 'Standard'}</Text>
                </View>
                
                <View style={styles.offerPill}>
                  <Icon name="tag" size={scaleh(10)} color={AppTheme.colors.primary} />
                  <Text style={styles.offerText}>Upto 20% OFF + Free Gifts</Text>
                </View>
                
                <View style={styles.cashbackPill}>
                  <View style={styles.percentCircle}>
                    <Text style={styles.percentText}>%</Text>
                  </View>
                  <Text style={styles.cashbackText}>Get 5% Cashback</Text>
                </View>
                
                <Text style={styles.price}>₹{product.discountPrice || product.mrp}</Text>
              </View>
              
              <View style={styles.bottomAction}>
                <TouchableOpacity style={styles.heartButton} onPress={() => dispatch(toggleWishlist(product.id))}>
                  <Ionicons name="heart" size={scaleh(20)} color={AppTheme.colors.primary} />
                </TouchableOpacity>
                <View style={styles.separator} />
                <View style={styles.skincareAddToCartWrapper}>
                  {cartItem ? (
                    <View style={styles.quantityControl}>
                      <TouchableOpacity 
                        style={styles.qtyBtn}
                        onPress={() => {
                          if (cartItem.quantity > 1) {
                            dispatch(updateCartItem({ itemId: cartItem.id, quantity: cartItem.quantity - 1 }));
                          } else {
                            dispatch(removeFromCart(cartItem.id));
                          }
                        }}
                      >
                        <Icon name="minus" size={scaleh(16)} color="#1a1a1a" />
                      </TouchableOpacity>
                      <Text style={styles.qtyText}>{cartItem.quantity}</Text>
                      <TouchableOpacity 
                        style={styles.qtyBtn}
                        onPress={() => dispatch(updateCartItem({ itemId: cartItem.id, quantity: cartItem.quantity + 1 }))}
                      >
                        <Icon name="plus" size={scaleh(16)} color={AppTheme.colors.primary} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity 
                      style={styles.cartButton}
                      onPress={() => dispatch(addToCart({ productId: product.id }))}
                    >
                      <Text style={styles.cartButtonText}>ADD TO CART</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isCosmetics ? '#ffffffff' : AppTheme.colors.white }]}>
      {isCosmetics && (
        <Image
          source={require('../../../images/makeup/CosmeticBackImg.webp')}
          style={[StyleSheet.absoluteFill, { width: '100%', height: '100%', opacity: 0.3 }]}
          resizeMode="cover"
        />
      )}
      <SafeAreaView style={styles.safeArea}>
        <Header transparent={isCosmetics} />
        {wishlistItems.length === 0 ? (
          <WishlistEmpty />
        ) : (
          renderFilled()
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.white,
  },
  safeArea: {
    flex: 1,
  },
  filledContainer: {
    flex: 1,
  },
  pageTitle: {
    fontSize: scaleh(16),
    fontWeight: '600',
    color: AppTheme.colors.textDark,
    paddingHorizontal: scaleh(20),
    marginBottom: scalev(15),
  },
  listContent: {
    paddingHorizontal: scaleh(15),
    paddingBottom: scalev(40),
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: scalev(15),
  },
  card: {
    width: '48%',
    backgroundColor: AppTheme.colors.white,
    borderRadius: scaleh(15),
    borderWidth: 1,
    borderColor: '#F0F0F0',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  imageSection: {
    height: scalev(160),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  productImage: {
    width: '80%',
    height: '90%',
    marginTop: scalev(10),
  },
  detailsSection: {
    padding: scaleh(12),
  },
  title: {
    fontSize: scaleh(11),
    color: AppTheme.colors.textDark,
    fontWeight: '500',
    marginBottom: scalev(8),
    lineHeight: scalev(16),
  },
  skinTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scalev(6),
  },
  skinTypeText: {
    fontSize: scaleh(10),
    color: AppTheme.colors.textDark,
    marginLeft: scaleh(4),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scalev(6),
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppTheme.colors.success,
    paddingHorizontal: scaleh(6),
    paddingVertical: scalev(2),
    borderRadius: scaleh(4),
  },
  ratingText: {
    fontSize: scaleh(10),
    color: AppTheme.colors.white,
    fontWeight: '700',
    marginLeft: scaleh(4),
  },
  reviewsText: {
    fontSize: scaleh(10),
    color: AppTheme.colors.textLight,
    marginLeft: scaleh(6),
  },
  sizePill: {
    backgroundColor: AppTheme.colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: scaleh(8),
    paddingVertical: scalev(3),
    borderRadius: scaleh(10),
    marginBottom: scalev(6),
  },
  sizeText: {
    color: AppTheme.colors.white,
    fontSize: scaleh(10),
    fontWeight: '600',
  },
  offerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppTheme.colors.discountBg,
    alignSelf: 'flex-start',
    paddingHorizontal: scaleh(6),
    paddingVertical: scalev(3),
    borderRadius: scaleh(4),
    marginBottom: scalev(6),
  },
  offerText: {
    color: AppTheme.colors.primary,
    fontSize: scaleh(8),
    fontWeight: '600',
    marginLeft: scaleh(4),
  },
  cashbackPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppTheme.colors.cashbackBg,
    alignSelf: 'flex-start',
    paddingHorizontal: scaleh(6),
    paddingVertical: scalev(3),
    borderRadius: scaleh(12),
    borderWidth: 1,
    borderColor: '#F5A623',
    marginBottom: scalev(10),
  },
  percentCircle: {
    backgroundColor: AppTheme.colors.white,
    width: scaleh(14),
    height: scaleh(14),
    borderRadius: scaleh(7),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleh(4),
  },
  percentText: {
    color: AppTheme.colors.cashbackText,
    fontSize: scaleh(8),
    fontWeight: '800',
  },
  cashbackText: {
    color: AppTheme.colors.cashbackText,
    fontSize: scaleh(9),
    fontWeight: '600',
  },
  price: {
    fontSize: scaleh(16),
    fontWeight: '700',
    color: AppTheme.colors.textDark,
  },
  bottomAction: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: AppTheme.colors.primary,
    height: scalev(40),
  },
  heartButton: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: AppTheme.colors.primary,
  },
  cartButton: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  cartButtonText: {
    color: AppTheme.colors.primary,
    fontSize: scaleh(12),
    fontWeight: '700',
  },
  skincareAddToCartWrapper: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  qtyBtn: {
    paddingHorizontal: scaleh(10),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: scaleh(14),
    fontWeight: '700',
    color: '#1a1a1a',
  },
  cartButtonText: {
    color: AppTheme.colors.primary,
    fontSize: scaleh(12),
    fontWeight: '700',
  },

  // Cosmetics specific styles
  rowCosmetics: {
    justifyContent: 'space-between',
    marginBottom: scalev(20),
  },
  tallCard: {
    width: '48%',
    borderRadius: scaleh(20),
    padding: scaleh(15),
    position: 'relative',
    minHeight: scalev(320),
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    marginBottom: scalev(20),
  },
  heartIconContainer: {
    position: 'absolute',
    top: scalev(80),
    right: scaleh(10),
    zIndex: 10,
  },
  cardProductImage: {
    width: '100%',
    height: scalev(80),
    alignSelf: 'center',
    marginBottom: scalev(10),
  },
  cardDetailsCosmetics: {
    flex: 1,
  },
  productNameFull: {
    fontSize: scaleh(11),
    fontWeight: '500',
    color: '#333',
    lineHeight: scalev(16),
    marginBottom: scalev(5),
  },
  skinTypeRowCosmetics: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scalev(5),
  },
  skinTypeTextCosmetics: {
    fontSize: scaleh(8),
    color: '#666',
    marginLeft: scaleh(3),
  },
  ratingRowCosmetics: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scalev(5),
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#39D41F',
    paddingHorizontal: scaleh(5),
    paddingVertical: scalev(2),
    borderRadius: scaleh(4),
  },
  ratingTextCosmetics: {
    color: '#FFF',
    fontSize: scaleh(9),
    fontWeight: '700',
    marginLeft: scaleh(2),
  },
  sizePillCosmetics: {
    backgroundColor: '#FFC2D1',
    alignSelf: 'flex-start',
    paddingHorizontal: scaleh(10),
    paddingVertical: scalev(3),
    borderRadius: scaleh(5),
    marginBottom: scalev(5),
  },
  sizeTextCosmetics: {
    fontSize: scaleh(9),
    fontWeight: '700',
    color: '#000',
  },
  promoTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scalev(5),
  },
  promoText: {
    fontSize: scaleh(8),
    color: '#FF8BA7',
    marginLeft: scaleh(2),
  },
  cashbackBadge: {
    backgroundColor: '#FDECE2',
    alignSelf: 'flex-start',
    paddingHorizontal: scaleh(10),
    paddingVertical: scalev(4),
    borderRadius: scaleh(12),
    marginBottom: scalev(8),
  },
  cashbackTextCosmetics: {
    fontSize: scaleh(9),
    fontWeight: '700',
    color: '#F48E44',
  },
  priceCurrentLarge: {
    fontSize: scaleh(16),
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: scalev(5),
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#FFE0E8',
    paddingTop: scalev(8),
    marginTop: scalev(5),
  },
  footerHeartBtn: {
    backgroundColor: '#FFE0E8',
    width: scaleh(28),
    height: scaleh(28),
    borderRadius: scaleh(14),
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#FFE0E8',
    marginHorizontal: scaleh(10),
  },
  footerCartBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  origAddToCartWrapper: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  footerCartText: {
    fontSize: scaleh(12),
    fontWeight: '700',
    color: '#1a1a1a',
  },
});

export default WishlistScreen;
