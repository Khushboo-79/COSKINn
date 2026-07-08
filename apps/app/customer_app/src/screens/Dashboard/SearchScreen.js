import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
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
    title: 'Vitamin C + E Sunscreen\nSPF 50 PA++++ with\nNew-Age UV Filters',
    price: '₹899',
    image: require('../../images/bgImages/productImg.webp'),
    bgImage: require('../../images/bgImages/orange.webp'),
  },
  {
    id: 2,
    title: 'Vitamin C + E Sunscreen\nSPF 50 PA++++ with\nNew-Age UV Filters',
    price: '₹899',
    image: require('../../images/bgImages/productImg.webp'),
    bgImage: require('../../images/bgImages/orange.webp'),
  },
];

const SearchScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Type to search.."
            placeholderTextColor="#999"
            autoFocus
          />
          <Icon name="mic" size={20} color="#666" style={styles.micIcon} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>POPULAR CHOICES</Text>
          <View style={styles.choicesContainer}>
            {popularChoices.map((choice) => (
              <TouchableOpacity key={choice.id} style={styles.choicePill}>
                <Text style={styles.choiceText}>{choice.title}</Text>
                <Icon name="arrow-right" size={16} color="#000" style={styles.choiceIcon} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RECOMMENDED FOR YOU</Text>
          <View style={styles.recommendedContainer}>
            {recommendedProducts.map((product) => (
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
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    width: '48%',
    backgroundColor: AppTheme.colors.white,
    borderRadius: scaleh(15),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F5F5F5',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
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
});

export default SearchScreen;
