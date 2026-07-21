import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, Switch } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, updateCartItem, removeFromCart } from '../../../redux/slices/cartSlice';
import { fetchRewardPoints } from '../../../redux/slices/profileSlice';
import Header from '../../../components/Header';
import CartEmpty from './CartEmpty';
import CheckoutModal from './CheckoutModal';
import { AppTheme, scaleh, scalev } from '../../../constants/AppTheme';

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const activeDomain = useSelector(state => state.app?.activeDomain || 'skincare');
  const isCosmetics = activeDomain === 'cosmetics';

  const cartItems = useSelector(state => state.cart.items) || [];
  const { cart } = useSelector(state => state.cart);
  const rewardPointsBalance = useSelector(state => state.profile?.rewardPoints || 0);
  
  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchRewardPoints());
  }, [dispatch]);

  const cartTotal = cart?.subtotal || cartItems.reduce((acc, item) => acc + (item.product?.discountPrice || item.product?.mrp || 0) * item.quantity, 0);
  const cartMRP = cart?.totalMrp || cartItems.reduce((acc, item) => acc + (item.product?.mrp || 0) * item.quantity, 0);
  const discount = cart?.discount || (cartMRP - cartTotal);
  const shipping = cartTotal > 0 ? (cart?.shippingFee || 5) : 0;
  const finalTotal = cart?.total || (cartTotal + shipping);
  const selectedCount = cartItems.length;

  const [rewardPoints, setRewardPoints] = useState(false);
  const [isPriceDetailsOpen, setIsPriceDetailsOpen] = useState(false);
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);

  const primaryColor = isCosmetics ? '#FF0069' : AppTheme.colors.primary;

  const renderProgressGifts = () => (
    <LinearGradient
      colors={isCosmetics ? ['rgba(255, 235, 240, 0.9)', 'rgba(255, 235, 240, 0.9)'] : [AppTheme.colors.wishlistGradientStart, AppTheme.colors.wishlistGradientEnd]}
      style={styles.progressContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <Text style={styles.progressTitle}>15% OFF Availed!</Text>
      <Text style={styles.progressSubtitle}>Shop for <Text style={styles.boldText}>Rs 304</Text> to get a free gift</Text>

      <View style={styles.progressBarWrapper}>
        <View style={[styles.progressLine, isCosmetics && { backgroundColor: '#FFD4E0' }]} />
        <View style={[styles.progressLineFill, { width: '33%' }, isCosmetics && { backgroundColor: primaryColor }]} />

        <View style={styles.stepsRow}>
          <View style={styles.stepItem}>
            <View style={[styles.iconCircle, styles.iconCircleActive, isCosmetics && { borderColor: AppTheme.colors.cosmeticsPrimary }]}>
              <Icon name="gift" size={scaleh(16)} color={primaryColor} />
              <View style={[styles.checkBadge, isCosmetics && { backgroundColor: '#4CAF50', borderWidth: 1, borderColor: '#FFF' }]}>
                <Icon name="check" size={scaleh(8)} color={AppTheme.colors.white} />
              </View>
            </View>
            <Text style={styles.stepText}>FLAT 15% OFF</Text>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.iconCircle}>
              <Icon name="gift" size={scaleh(16)} color={primaryColor} />
            </View>
            <Text style={styles.stepText}>Free Gifts</Text>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.iconCircle}>
              <Icon name="gift" size={scaleh(16)} color={primaryColor} />
            </View>
            <Text style={styles.stepText}>Flat 20% OFF +{'\n'}2 gifts</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );

  const renderFilled = () => (
    <View style={styles.filledContainer}>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Sub Header Location */}
        <View style={styles.locationHeader}>
          <Icon name="map-pin" size={scaleh(16)} color="#000" />
          <View style={styles.locationTextWrapper}>
            <Text style={styles.deliverToText}>Deliver to 451420</Text>
            <Text style={styles.locationDescText} numberOfLines={1}>Ayushi Sinha - Ibus stop, Indore...</Text>
          </View>
          <Icon name="chevron-down" size={scaleh(16)} color="#000" />
          <TouchableOpacity style={styles.changeBtn}>
            <Text style={styles.changeBtnText}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        {/* Title Row */}
        <View style={styles.cartTitleRow}>
          <Text style={styles.cartTitleText}>YOUR CART <Text style={styles.cartTitleCount}>({selectedCount})</Text></Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="x" size={scaleh(24)} color="#1a1a1a" />
          </TouchableOpacity>
        </View>

        {renderProgressGifts()}

        <View style={styles.bagItemsHeaderRow}>
          <Text style={styles.bagItemsText}>Bag Items <Text style={styles.bagItemsSub}>({selectedCount}/{selectedCount} selected)</Text></Text>
          <TouchableOpacity>
            <Icon name="trash-2" size={scaleh(20)} color={primaryColor} />
          </TouchableOpacity>
        </View>

        {/* Product Card */}
        {cartItems.map((item) => (
          <View key={item.id} style={styles.productCard}>
            <View style={styles.productImageWrapper}>
              {!isCosmetics && <Image source={require('../../../images/bgImages/orange.webp')} style={[StyleSheet.absoluteFill, styles.bgImgOverride]} resizeMode="cover" />}
              <Image source={item.product?.images?.[0]?.url ? { uri: item.product.images[0].url } : (isCosmetics ? require('../../../images/makeup/ProductImgs/Blush.webp') : require('../../../images/bgImages/productImg.webp'))} style={isCosmetics ? [styles.prodImg, { width: '90%', height: '90%' }] : styles.prodImg} resizeMode="contain" />
            </View>

            <View style={styles.productDetails}>
              <Text style={styles.productTitle} numberOfLines={2}>{item.product?.name}</Text>
              <Text style={styles.productSize}>Size: {item.product?.netQuantity || 'Standard'}</Text>
              <Text style={styles.productDelivery}>Delivery by Tomorrow</Text>

              <View style={styles.priceRow}>
                <Text style={styles.productPrice}>₹{item.product?.discountPrice || item.product?.mrp}</Text>
                {item.product?.discountPrice && <Text style={styles.productOriginalPrice}>₹{item.product?.mrp}</Text>}
              </View>
            </View>

            <View style={styles.actionColumn}>
              <TouchableOpacity style={styles.deleteBtn} onPress={() => dispatch(removeFromCart(item.id))}>
                <Icon name="trash-2" size={scaleh(16)} color="#1a1a1a" />
              </TouchableOpacity>
              <View style={styles.qtyRow}>
                <TouchableOpacity 
                  style={styles.qtyActionBtn} 
                  onPress={() => {
                    if (item.quantity > 1) {
                      dispatch(updateCartItem({ itemId: item.id, quantity: item.quantity - 1 }));
                    } else {
                      dispatch(removeFromCart(item.id));
                    }
                  }}
                >
                  <Icon name="minus" size={scaleh(14)} color="#1a1a1a" />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <TouchableOpacity style={styles.qtyActionBtn} onPress={() => dispatch(updateCartItem({ itemId: item.id, quantity: item.quantity + 1 }))}>
                  <Icon name="plus" size={scaleh(14)} color={primaryColor} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Accordions */}
        <TouchableOpacity style={[styles.accordionCard, isCosmetics && { borderColor: AppTheme.colors.cosmeticsPrimary }]} onPress={() => navigation.navigate('Coupons')}>
          <Text style={styles.accordionTitle}>Coupons & Offers</Text>
          <View style={styles.accordionRight}>
            <Text style={[styles.viewAllText, { color: primaryColor }]}>View All</Text>
            <Icon name="chevron-right" size={scaleh(16)} color={primaryColor} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.accordionCardBox} onPress={() => navigation.navigate('GiftBox')}>
          <View style={styles.boxLeft}>
            <Icon name="gift" size={scaleh(20)} color="#666" style={{ marginRight: scaleh(10) }} />
            <Text style={styles.boxTitle}>Add gift box for <Text style={styles.boxPrice}>₹40</Text></Text>
          </View>
          <Icon name="chevron-right" size={scaleh(20)} color="#1a1a1a" />
        </TouchableOpacity>

        <View style={styles.accordionCardBox}>
          <View style={styles.boxLeft}>
            <Icon name="gift" size={scaleh(20)} color="#666" style={{ marginRight: scaleh(10) }} />
            <Text style={styles.boxTitle}>Use reward points</Text>
          </View>
          <View style={styles.boxRight}>
            <Text style={styles.pointsText}>{rewardPointsBalance}</Text>
            <Switch
              trackColor={{ false: "#d3d3d3", true: primaryColor }}
              thumbColor={AppTheme.colors.white}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setRewardPoints(!rewardPoints)}
              value={rewardPoints}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
          </View>
        </View>

        {/* Price Details Accordion */}
        <View style={styles.priceDetailsContainer}>
          <TouchableOpacity
            style={styles.priceDetailsHeader}
            onPress={() => setIsPriceDetailsOpen(!isPriceDetailsOpen)}
            activeOpacity={0.8}
          >
            <View style={styles.boxLeft}>
              <View style={styles.percentIconCircle}>
                <Icon name="percent" size={scaleh(12)} color="#1a1a1a" />
              </View>
              <View>
                <Text style={styles.boxTitle}>Price details</Text>
                {!isPriceDetailsOpen && <Text style={styles.priceDetailsSub}>Inclusive of all charges</Text>}
              </View>
            </View>
            <View style={styles.priceDetailsRight}>
              <Text style={styles.priceDetailsTotal}>₹{finalTotal}</Text>
              <Icon name={isPriceDetailsOpen ? "chevron-up" : "chevron-down"} size={scaleh(20)} color="#1a1a1a" style={{ marginLeft: scaleh(10) }} />
            </View>
          </TouchableOpacity>

          {isPriceDetailsOpen && (
            <View style={styles.priceDetailsExpanded}>
              <View style={styles.priceRowItem}>
                <Text style={styles.priceRowLabel}>Bag Total ({selectedCount} item)</Text>
                <Text style={styles.priceRowValue}>₹{cartMRP}</Text>
              </View>
              <View style={styles.priceRowItem}>
                <Text style={styles.priceRowLabel}>Bag Discount</Text>
                <Text style={[styles.priceRowValue, { color: AppTheme.colors.success }]}>-₹{discount}</Text>
              </View>
              <View style={styles.priceRowItem}>
                <Text style={styles.priceRowLabel}>Shipping & Platform Fee</Text>
                <Text style={styles.priceRowValue}>
                  <Text style={styles.strikethroughPrice}>₹75</Text> ₹{shipping}
                </Text>
              </View>

              <View style={[styles.priceRowItem, { marginTop: scalev(15) }]}>
                <Text style={styles.priceRowLabel}>You pay</Text>
                <Text style={[styles.priceRowValue, { fontWeight: '700' }]}>₹{finalTotal}</Text>
              </View>
            </View>
          )}

          <LinearGradient
            colors={isCosmetics ? ['#FFE2E6', '#FFC2D1'] : [AppTheme.colors.wishlistGradientStart, AppTheme.colors.wishlistGradientEnd]}
            style={styles.rewardBanner}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.rewardBannerText, isCosmetics && { color: '#000000' }]}>You will earn 1000 reward points with COS - LUXE</Text>
          </LinearGradient>
        </View>

        {/* Removed Last minute additions (no dummy data allowed) */}

      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={styles.stickyBottomBar}>
        <LinearGradient
          colors={isCosmetics ? ['#FFC2D1', '#FFC2D1'] : [AppTheme.colors.cartBottomGradientStart, AppTheme.colors.cartBottomGradientEnd]}
          style={styles.savingStrip}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={[styles.savingText, isCosmetics && { color: '#000000' }]}>
            You are saving <Text style={[styles.savingAmount, isCosmetics && { color: '#28a745' }]}>₹{discount}</Text>
          </Text>
        </LinearGradient>
        <View style={styles.checkoutRow}>
          <View style={styles.totalSection}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.totalPrice}>₹{finalTotal}</Text>
              <Icon name="info" size={scaleh(12)} color="#666" style={{ marginLeft: scaleh(5) }} />
            </View>
            <Text style={styles.totalItems}>{selectedCount} Item selected</Text>
          </View>
          <TouchableOpacity onPress={() => setIsCheckoutVisible(true)}>
            {isCosmetics ? (
              <View style={[styles.proceedButton, { backgroundColor: '#FFC2D1' }]}>
                <Text style={[styles.proceedButtonText, { color: '#000000' }]}>Proceed to Pay</Text>
                <Icon name="arrow-right" size={scaleh(20)} color="#000000" />
              </View>
            ) : (
              <LinearGradient
                colors={[AppTheme.colors.primary, AppTheme.colors.secondary]}
                style={styles.proceedButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.proceedButtonText}>Proceed to Pay</Text>
                <Icon name="arrow-right" size={scaleh(20)} color={AppTheme.colors.white} />
              </LinearGradient>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <CheckoutModal visible={isCheckoutVisible} onClose={() => setIsCheckoutVisible(false)} finalTotal={finalTotal} />

    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isCosmetics ? '#FFFFFF' : AppTheme.colors.white }]}>
      {isCosmetics && (
        <Image
          source={require('../../../images/makeup/CosmeticBackImg.webp')}
          style={[StyleSheet.absoluteFill, { width: '100%', height: '100%', opacity: 0.3 }]}
          resizeMode="cover"
        />
      )}
      <SafeAreaView style={styles.safeArea}>
        <Header showHeart={true} transparent={isCosmetics} />
        {cartItems.length === 0 ? (
          <CartEmpty />
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
  scrollContent: {
    paddingBottom: scalev(120), // Leave space for sticky bottom bar
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    paddingBottom: scalev(10),
  },
  locationTextWrapper: {
    flex: 1,
    marginLeft: scaleh(10),
  },
  deliverToText: {
    fontSize: scaleh(12),
    color: '#1a1a1a',
  },
  locationDescText: {
    fontSize: scaleh(12),
    color: '#666',
    fontWeight: '500',
  },
  changeBtn: {
    marginLeft: scaleh(10),
  },
  changeBtnText: {
    color: AppTheme.colors.primary,
    fontSize: scaleh(12),
    fontWeight: '700',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  cartTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleh(20),
    paddingVertical: scalev(15),
  },
  cartTitleText: {
    fontSize: scaleh(18),
    fontWeight: '700',
    color: '#000',
  },
  cartTitleCount: {
    color: AppTheme.colors.primary,
  },
  progressContainer: {
    paddingVertical: scalev(20),
    alignItems: 'center',
  },
  progressTitle: {
    fontSize: scaleh(10),
    color: '#1a1a1a',
  },
  progressSubtitle: {
    fontSize: scaleh(11),
    color: '#1a1a1a',
    marginTop: scalev(2),
  },
  boldText: {
    fontWeight: '700',
  },
  progressBarWrapper: {
    width: '100%',
    paddingHorizontal: scaleh(30),
    marginTop: scalev(20),
    position: 'relative',
  },
  progressLine: {
    position: 'absolute',
    top: scalev(18),
    left: scaleh(45),
    right: scaleh(45),
    height: 2,
    backgroundColor: '#F0D5D5',
    zIndex: 1,
  },
  progressLineFill: {
    position: 'absolute',
    top: scalev(18),
    left: scaleh(45),
    height: 2,
    backgroundColor: AppTheme.colors.primary,
    zIndex: 2,
  },
  stepsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 3,
  },
  stepItem: {
    alignItems: 'center',
    width: scaleh(70),
  },
  iconCircle: {
    width: scaleh(36),
    height: scaleh(36),
    borderRadius: scaleh(18),
    backgroundColor: AppTheme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: AppTheme.colors.primary,
    marginBottom: scalev(5),
  },
  iconCircleActive: {
    borderColor: '#4CAF50', // green check border? It shows a green check badge
  },
  checkBadge: {
    position: 'absolute',
    top: -scalev(2),
    right: -scaleh(2),
    backgroundColor: '#4CAF50',
    width: scaleh(14),
    height: scaleh(14),
    borderRadius: scaleh(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    fontSize: scaleh(9),
    color: '#1a1a1a',
    textAlign: 'center',
  },
  bagItemsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    marginTop: scalev(20),
    marginBottom: scalev(10),
  },
  bagItemsText: {
    fontSize: scaleh(14),
    fontWeight: '600',
    color: '#000',
  },
  bagItemsSub: {
    color: '#666',
    fontWeight: '400',
  },
  productCard: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    marginHorizontal: scaleh(20),
    backgroundColor: AppTheme.colors.white,
    borderRadius: scaleh(15),
    padding: scaleh(15),
    marginBottom: scalev(20),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  productImageWrapper: {
    width: scaleh(90),
    height: scalev(90),
    borderRadius: scaleh(10),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImgOverride: {
    width: '130%',
    height: '130%',
    left: '-15%',
    top: '-15%',
    opacity: 0.9,
  },
  prodImg: {
    width: '80%',
    height: '80%',
  },
  productDetails: {
    flex: 1,
    marginLeft: scaleh(15),
  },
  productTitle: {
    fontSize: scaleh(12),
    fontWeight: '500',
    color: '#000',
    marginBottom: scalev(4),
  },
  productSize: {
    fontSize: scaleh(10),
    color: '#666',
    marginBottom: scalev(4),
  },
  productDelivery: {
    fontSize: scaleh(10),
    fontWeight: '600',
    color: '#000',
    marginBottom: scalev(6),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: scaleh(14),
    fontWeight: '700',
    color: '#000',
  },
  productOriginalPrice: {
    fontSize: scaleh(12),
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: scaleh(8),
  },
  actionColumn: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  deleteBtn: {
    padding: scaleh(5),
    marginBottom: scalev(15),
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: scaleh(8),
  },
  qtyActionBtn: {
    paddingHorizontal: scaleh(8),
    paddingVertical: scalev(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: scaleh(14),
    fontWeight: '600',
    color: '#000',
  },
  accordionCard: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scaleh(20),
    paddingHorizontal: scaleh(15),
    paddingVertical: scalev(15),
    backgroundColor: AppTheme.colors.white,
    borderRadius: scaleh(10),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: scalev(20),
  },
  accordionTitle: {
    fontSize: scaleh(14),
    fontWeight: '500',
    color: '#000',
  },
  accordionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: scaleh(12),
    color: AppTheme.colors.primary,
    fontWeight: '600',
    marginRight: scaleh(5),
  },
  accordionCardBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scaleh(20),
    paddingHorizontal: scaleh(15),
    paddingVertical: scalev(15),
    backgroundColor: AppTheme.colors.white,
    borderRadius: scaleh(10),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: scalev(15),
  },
  boxLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxTitle: {
    fontSize: scaleh(14),
    fontWeight: '500',
    color: '#000',
  },
  boxPrice: {
    fontWeight: '700',
  },
  boxRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: scaleh(14),
    fontWeight: '500',
    color: '#1a1a1a',
    marginRight: scaleh(10),
  },
  stickyBottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: AppTheme.colors.white,
    borderTopLeftRadius: scaleh(20),
    borderTopRightRadius: scaleh(20),
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  savingStrip: {
    paddingVertical: scalev(8),
    alignItems: 'center',
    borderTopLeftRadius: scaleh(20),
    borderTopRightRadius: scaleh(20),
  },
  savingText: {
    fontSize: scaleh(12),
    color: '#000',
  },
  savingAmount: {
    color: '#4CAF50',
    fontWeight: '700',
  },
  checkoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    paddingVertical: scalev(15),
    paddingBottom: scalev(25), // extra padding for bottom edge
  },
  totalSection: {
    flex: 1,
  },
  totalPrice: {
    fontSize: scaleh(20),
    fontWeight: '700',
    color: '#000',
  },
  totalItems: {
    fontSize: scaleh(12),
    color: '#666',
    marginTop: scalev(2),
  },
  proceedButton: {
    backgroundColor: AppTheme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleh(25),
    paddingVertical: scalev(12),
    borderRadius: scaleh(10),
  },
  proceedButtonText: {
    color: AppTheme.colors.white,
    fontSize: scaleh(14),
    fontWeight: '700',
    marginRight: scaleh(10),
  },
  priceDetailsContainer: {
    marginHorizontal: scaleh(20),
    marginBottom: scalev(20),
    backgroundColor: AppTheme.colors.white,
    borderRadius: scaleh(10),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  priceDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleh(15),
    paddingVertical: scalev(15),
    backgroundColor: AppTheme.colors.white,
  },
  percentIconCircle: {
    width: scaleh(24),
    height: scaleh(24),
    borderRadius: scaleh(12),
    borderWidth: 1,
    borderColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleh(10),
  },
  priceDetailsSub: {
    fontSize: scaleh(10),
    color: '#666',
    marginTop: scalev(2),
  },
  priceDetailsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceDetailsTotal: {
    fontSize: scaleh(14),
    fontWeight: '600',
    color: '#000',
  },
  priceDetailsExpanded: {
    paddingHorizontal: scaleh(15),
    paddingBottom: scalev(15),
  },
  priceRowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scalev(8),
  },
  priceRowLabel: {
    fontSize: scaleh(12),
    color: '#333',
  },
  priceRowValue: {
    fontSize: scaleh(12),
    color: '#333',
  },
  strikethroughPrice: {
    textDecorationLine: 'line-through',
    color: '#999',
    marginRight: scaleh(5),
  },
  rewardBanner: {
    paddingVertical: scalev(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardBannerText: {
    fontSize: scaleh(10),
    fontWeight: '600',
    color: AppTheme.colors.primary,
  },
  lastMinuteSection: {
    marginBottom: scalev(30),
  },
  lastMinuteTitle: {
    fontSize: scaleh(16),
    fontWeight: '700',
    color: '#000',
    marginHorizontal: scaleh(20),
    marginBottom: scalev(15),
  },
  lastMinuteScroll: {
    paddingRight: scaleh(20),
  },
  lastMinuteCard: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    backgroundColor: AppTheme.colors.white,
    borderRadius: scaleh(15),
    padding: scaleh(12),
    marginRight: scaleh(15),
    width: scaleh(140),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  lmImageWrapper: {
    width: '100%',
    height: scalev(100),
    borderRadius: scaleh(10),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scalev(10),
  },
  lmProdImg: {
    width: '80%',
    height: '80%',
  },
  lmBrand: {
    fontSize: scaleh(12),
    fontWeight: '700',
    color: '#000',
    marginBottom: scalev(2),
  },
  lmTitle: {
    fontSize: scaleh(9),
    color: '#666',
    lineHeight: scalev(12),
    height: scalev(24),
    marginBottom: scalev(4),
  },
  lmSizes: {
    fontSize: scaleh(10),
    color: '#999',
    marginBottom: scalev(4),
  },
  lmOriginalPrice: {
    fontSize: scaleh(10),
    color: '#666',
    textDecorationLine: 'line-through',
    marginBottom: scalev(10),
  },
  lmActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lmHeartBtn: {
    width: scaleh(26),
    height: scaleh(26),
    borderRadius: scaleh(13),
    borderWidth: 1,
    borderColor: AppTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lmSelectBtn: {
    backgroundColor: AppTheme.colors.primary,
    paddingHorizontal: scaleh(12),
    paddingVertical: scalev(6),
    borderRadius: scaleh(6),
  },
  lmSelectText: {
    color: AppTheme.colors.white,
    fontSize: scaleh(10),
    fontWeight: '700',
  },
});

export default CartScreen;
