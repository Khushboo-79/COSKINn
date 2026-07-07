import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../../../components/Header';
import WishlistEmpty from './WishlistEmpty';
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
  },
];
const WishlistScreen = () => {
  const [wishlistItems, setWishlistItems] = useState([1]); // Toggle this for empty vs filled

  const renderFilled = () => (
    <View style={styles.filledContainer}>
      <Text style={styles.pageTitle}>YOUR WISHLIST</Text>
      
      <FlatList
        data={filledData}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imageSection}>
              <LinearGradient
                colors={[AppTheme.colors.wishlistGradientStart, AppTheme.colors.wishlistGradientEnd]}
                style={StyleSheet.absoluteFill}
              />
              <Image source={item.bgImage} style={[StyleSheet.absoluteFill, { width: '130%', height: '130%', left: '-15%', top: '-15%', opacity: 0.9 }]} resizeMode="cover" />
              <Image source={item.image} style={styles.productImage} resizeMode="contain" />
            </View>
            
            <View style={styles.detailsSection}>
              <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
              
              <View style={styles.skinTypeRow}>
                <Icon name="check-circle" size={scaleh(12)} color={AppTheme.colors.primary} />
                <Text style={styles.skinTypeText}>All Skin Types</Text>
              </View>
              
              <View style={styles.ratingRow}>
                <View style={styles.ratingBox}>
                  <Icon name="star" size={scaleh(10)} color={AppTheme.colors.white} />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
                <Text style={styles.reviewsText}>{item.reviews}</Text>
              </View>
              
              <View style={styles.sizePill}>
                <Text style={styles.sizeText}>{item.size}</Text>
              </View>
              
              <View style={styles.offerPill}>
                <Icon name="tag" size={scaleh(10)} color={AppTheme.colors.primary} />
                <Text style={styles.offerText}>{item.offer}</Text>
              </View>
              
              <View style={styles.cashbackPill}>
                <View style={styles.percentCircle}>
                  <Text style={styles.percentText}>%</Text>
                </View>
                <Text style={styles.cashbackText}>{item.cashback}</Text>
              </View>
              
              <Text style={styles.price}>{item.price}</Text>
            </View>
            
            <View style={styles.bottomAction}>
              <TouchableOpacity style={styles.heartButton}>
                <Icon name="heart" size={scaleh(18)} color={AppTheme.colors.primary} />
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity style={styles.cartButton}>
                <Text style={styles.cartButtonText}>ADD TO CART</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header />
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
});

export default WishlistScreen;
