import React, { useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar,
  FlatList, Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { AppTheme, scaleh, scalev } from '../../../../constants/AppTheme';
import Header from '../../../../components/Header';
import { fetchWishlist, toggleWishlist } from '../../../../redux/slices/wishlistSlice';

const WishlistScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { items, loading } = useSelector(state => state.wishlist);
  const isEmpty = items.length === 0;

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const renderProductCard = ({ item }) => {
    const product = item.product || item; // Fallback in case API returns flat array
    const hasImage = product.images && product.images.length > 0;
    const imageUrl = hasImage ? { uri: product.images[0].url } : require('../../../../images/bgImages/productImg.webp');
    const title = product.name || 'Unknown Product';
    const price = product.discountPrice || product.mrp || 899;

    return (
      <TouchableOpacity
        style={styles.shopByProductCard}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('ProductDetailsScreen', { slug: product.slug || product.id })}
      >
        {/* Top Image Section */}
        <LinearGradient
          colors={['#FFD1DC', '#FFF5F5', '#FFFFFF']}
          style={styles.shopByImageContainer}
        >
          <Image source={imageUrl} style={styles.shopByImage} resizeMode="contain" />
        </LinearGradient>

        {/* Card Details Section */}
        <View style={styles.shopByCardDetails}>
          <Text style={styles.shopByProductTitle} numberOfLines={3}>
            {title}
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

          <Text style={styles.shopByPrice}>₹{price}</Text>
        </View>

        {/* Add to Cart Footer */}
        <View style={styles.shopByAddToCartRow}>
          <TouchableOpacity
            style={styles.shopByHeartBtn}
            onPress={() => dispatch(toggleWishlist(product.id))}
          >
            <Icon name="heart" size={scaleh(16)} color="#FF0069" style={{ fill: '#FF0069' }} />
          </TouchableOpacity>
          <View style={styles.shopByVerticalDivider} />
          <TouchableOpacity style={styles.shopByAddToCartBtn}>
            <Text style={styles.shopByAddToCartText}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <SafeAreaView style={styles.safeArea}>

          {/* Header */}
          <Header onBackPress={() => navigation.goBack()} />

          {!isEmpty && <Text style={styles.pageTitle}>YOUR WISHLIST</Text>}

          {isEmpty ? (
            // Empty State
            <LinearGradient
              colors={['#FF006926', '#FFD49826']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.emptyContainer}
            >
              <View style={styles.emptyCenterContent}>
                <View style={styles.emptyLogoContainer}>
                  {/* Decorative C Logo with hearts */}
                  <Text style={styles.emptyLogoText}>C</Text>
                  <View style={styles.emptyLogoHeartTop}>
                    <Icon name="heart" size={scaleh(14)} color="#FF0069" style={{ fill: '#FF0069' }} />
                  </View>
                  <View style={styles.emptyLogoHeartBottom}>
                    <Icon name="heart" size={scaleh(16)} color="#FF0069" />
                  </View>
                </View>

                <Text style={styles.emptyTitleLine1}>Your <Text style={styles.emptyTitleBold}>WISHLIST</Text></Text>
                <Text style={styles.emptyTitleLine2}>is <Text style={styles.emptyTitleBold}>EMPTY !</Text></Text>

                <Text style={styles.emptySubtitle}>Add your favourites to Wishlist</Text>

                <TouchableOpacity style={styles.addToWishlistBtn} activeOpacity={0.8} onPress={() => navigation.navigate('Shop')}>
                  <Text style={styles.addToWishlistText}>GO TO SHOP</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          ) : (
            // Filled State
            <View style={styles.listContainer}>
              <FlatList
                data={items}
                keyExtractor={(item) => (item.id || item.productId || Math.random()).toString()}
                renderItem={renderProductCard}
                numColumns={2}
                columnWrapperStyle={styles.rowWrapper}
                contentContainerStyle={styles.flatListContent}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}

        </SafeAreaView>
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
    pageTitle: {
      fontSize: scaleh(18),
      fontWeight: '600',
      color: '#1A1A1A',
      paddingHorizontal: scaleh(20),
      marginTop: scalev(10),
      marginBottom: scalev(5),
    },

    // Empty State Styles
    emptyContainer: {
      flex: 1,
    },
    emptyCenterContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: scaleh(30),
    },
    emptyLogoContainer: {
      width: scaleh(80),
      height: scaleh(80),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: scalev(30),
      position: 'relative',
    },
    emptyLogoText: {
      fontSize: scaleh(65),
      fontWeight: '700',
      color: '#FF708C',
    },
    emptyLogoHeartTop: {
      position: 'absolute',
      top: scalev(0),
      right: scaleh(0),
    },
    emptyLogoHeartBottom: {
      position: 'absolute',
      bottom: scalev(5),
      right: scaleh(-5),
    },
    emptyTitleLine1: {
      fontSize: scaleh(24),
      color: '#FF0069',
      fontStyle: 'italic',
      fontWeight: '400',
    },
    emptyTitleLine2: {
      fontSize: scaleh(24),
      color: '#FF0069',
      fontStyle: 'italic',
      fontWeight: '400',
      marginBottom: scalev(20),
    },
    emptyTitleBold: {
      fontWeight: '800',
      fontStyle: 'italic',
    },
    emptySubtitle: {
      fontSize: scaleh(14),
      color: '#333333',
      fontStyle: 'italic',
      fontWeight: '500',
      marginBottom: scalev(30),
    },
    addToWishlistBtn: {
      paddingHorizontal: scaleh(30),
      paddingVertical: scalev(12),
      borderRadius: scaleh(25),
      borderWidth: 1.5,
      borderColor: '#FF0069',
      backgroundColor: '#FFFFFF',
    },
    addToWishlistText: {
      color: '#FF0069',
      fontSize: scaleh(13),
      fontWeight: '700',
    },

    // Filled State Styles
    listContainer: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    flatListContent: {
      paddingHorizontal: scaleh(15),
      paddingTop: scalev(20),
      paddingBottom: scalev(40),
    },
    rowWrapper: {
      justifyContent: 'space-between',
    },

    // Product Card Styles (from ViewAllNewArrivalsScreen)
    shopByProductCard: {
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      width: '48%',
      borderRadius: scaleh(15),
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
      fontSize: scaleh(10),
      fontWeight: '500',
      color: '#333333',
      marginBottom: scalev(6),
      lineHeight: scalev(14),
    },
    shopBySkinTypeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: scalev(6),
    },
    shopBySkinTypeText: {
      fontSize: scaleh(9),
      color: '#666666',
      marginLeft: scaleh(4),
    },
    shopByRatingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: scalev(6),
    },
    shopByRatingBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#32CD32',
      paddingHorizontal: scaleh(4),
      paddingVertical: scalev(2),
      borderRadius: scaleh(4),
    },
    shopByRatingText: {
      color: '#FFFFFF',
      fontSize: scaleh(9),
      fontWeight: '700',
      marginLeft: scaleh(2),
    },
    shopByReviewsText: {
      fontSize: scaleh(9),
      color: '#999999',
      marginLeft: scaleh(4),
    },
    shopBySizeBadge: {
      backgroundColor: '#FF0069',
      alignSelf: 'flex-start',
      paddingHorizontal: scaleh(6),
      paddingVertical: scalev(2),
      borderRadius: scaleh(4),
      marginBottom: scalev(6),
    },
    shopBySizeText: {
      color: '#FFFFFF',
      fontSize: scaleh(9),
      fontWeight: '600',
    },
    shopByOffersContainer: {
      marginBottom: scalev(8),
    },
    shopByPinkOffer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFE4E1',
      alignSelf: 'flex-start',
      paddingHorizontal: scaleh(4),
      paddingVertical: scalev(2),
      borderRadius: scaleh(4),
      marginBottom: scalev(4),
    },
    shopByPinkOfferText: {
      color: '#FF0069',
      fontSize: scaleh(7),
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
      paddingHorizontal: scaleh(4),
      paddingVertical: scalev(2),
      borderRadius: scaleh(10),
    },
    shopByOrangeOfferText: {
      color: '#F4A460',
      fontSize: scaleh(8),
      fontWeight: '600',
      marginLeft: scaleh(4),
    },
    shopByPrice: {
      fontSize: scaleh(14),
      fontWeight: '700',
      color: '#333333',
    },
    shopByAddToCartRow: {
      flexDirection: 'row',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: '#FF0069',
      height: scalev(35),
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
      fontSize: scaleh(11),
      fontWeight: '700',
    },
  });

  export default WishlistScreen;
