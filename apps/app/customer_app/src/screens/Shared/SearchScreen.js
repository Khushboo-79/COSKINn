import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Image, ImageBackground, InteractionManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { AppTheme, scaleh, scalev } from '../../constants/AppTheme';

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
  const activeDomain = useSelector(state => state.app?.activeDomain || 'skincare');
  const isCosmetics = activeDomain === 'cosmetics';
  const searchBorderColor = isCosmetics ? '#FFC2D1' : AppTheme.colors.primary;

  const searchInputRef = useRef(null);

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
            />
            <Icon name="mic" size={20} color="#666" style={styles.micIcon} />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>POPULAR CHOICES</Text>
            <View style={styles.choicesContainer}>
              {popularChoices.map((choice) => (
                <TouchableOpacity key={choice.id} style={[styles.choicePill, { borderColor: searchBorderColor }]}>
                  <Text style={styles.choiceText}>{choice.title}</Text>
                  <Icon name="arrow-right" size={16} color="#000" style={styles.choiceIcon} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>RECOMMENDED FOR YOU</Text>
            <View style={styles.recommendedContainer}>
              {recommendedProducts.map((product) => {
                if (isCosmetics) {
                  return (
                    <View key={product.id} style={styles.cosmeticProductCard}>
                      <View style={styles.heartIconContainer}>
                        <Ionicons name="heart-outline" size={scaleh(14)} color="#666" />
                      </View>
                      <Image source={product.image} style={styles.cosmeticProductImage} resizeMode="contain" />
                      <View style={styles.cosmeticProductInfo}>
                        <Text style={styles.cosmeticProductBrand}>{product.brand}</Text>
                        <Text style={styles.cosmeticProductTitle} numberOfLines={3}>{product.title}</Text>
                        <View style={styles.cosmeticProductBottom}>
                          <Text style={styles.cosmeticProductPrice}>{product.price}</Text>
                          <TouchableOpacity style={styles.cosmeticAddButton}>
                            <Icon name="shopping-bag" size={14} color="#FFF" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                }
                return (
                  <View key={product.id} style={styles.productCard}>
                    <View style={styles.productImageSection}>
                      <LinearGradient
                        colors={['#FFD1E3', '#FFF2E6']}
                        style={StyleSheet.absoluteFill}
                      />
                      <Image source={product.bgImage} style={[StyleSheet.absoluteFill, { width: '130%', height: '130%', left: '-15%', top: '-15%', opacity: 0.9 }]} resizeMode="cover" />
                      <Image source={product.image} style={styles.productImage} resizeMode="contain" />
                    </View>
                    <View style={styles.productInfoSection}>
                      <Text style={styles.productTitle} numberOfLines={3}>{product.title}</Text>
                      <View style={styles.productBottomRow}>
                        <Text style={styles.productPrice}>{product.price}</Text>
                        <TouchableOpacity style={styles.addButton}>
                          <Icon name="shopping-bag" size={16} color="#FFF" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
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
});

export default SearchScreen;
