import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, Image, FlatList, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { scaleh, scalev } from '../../../constants/AppTheme';
import { SUBCATEGORIES_DATA } from './SubcategoryData';

const CategoryDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const categoryName = route.params?.category || 'FACE'; // Default to FACE if none provided
  const subcategories = SUBCATEGORIES_DATA[categoryName] || [];

  const formatTitle = (str) => {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  };

  const renderSubcategory = ({ item, index }) => {
    const isFirst = index === 0;
    
    return (
      <TouchableOpacity 
        style={[styles.subcategoryRow, isFirst ? styles.firstSubcategoryRow : styles.otherSubcategoryRow]} 
        activeOpacity={0.8}
        onPress={() => {
          // Navigating to the Product Listing screen with the subcategory data
          navigation.navigate('ProductListing', { subcategory: item.name, category: categoryName });
        }}
      >
        <Text style={styles.subcategoryText}>{item.name}</Text>
        <Icon name="chevron-right" size={scaleh(18)} color="#1a1a1a" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Background Image sits behind everything but we want the top header to be solid pink */}
      <Image
        source={require('../../../images/makeup/CosmeticBackImg.webp')}
        style={[StyleSheet.absoluteFill, { width: '100%', height: '100%', opacity: 0.15 }]}
        resizeMode="cover"
      />
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      
      {/* Solid Pink Header Background */}
      <View style={styles.headerBackground} />

      <SafeAreaView style={styles.safeArea}>
        {/* Custom Header with Cancel */}
        <View style={styles.headerRow}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={scaleh(16)} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="what are you looking for !"
              placeholderTextColor="#999"
              editable={false} // Currently mock
            />
            <Icon name="mic" size={scaleh(16)} color="#666" style={styles.micIcon} />
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelBtn}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {/* Category Title */}
        <Text style={styles.categoryTitle}>{formatTitle(categoryName)}</Text>

        {/* Subcategories List */}
        <FlatList
          data={subcategories}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: scalev(40) }}
          ItemSeparatorComponent={() => <View style={{ height: scalev(12) }} />}
          renderItem={renderSubcategory}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background for the main screen
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: scalev(115), // Covers status bar and search bar area
    backgroundColor: '#FFDCE6', // Pink header
    zIndex: 0,
  },
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || scalev(30),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    marginTop: scalev(10),
    marginBottom: scalev(20),
    zIndex: 1,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: scaleh(25),
    height: scalev(45),
    paddingHorizontal: scaleh(15),
  },
  searchIcon: {
    marginRight: scaleh(8),
  },
  searchInput: {
    flex: 1,
    fontSize: scaleh(12),
    color: '#1a1a1a',
    paddingVertical: 0,
  },
  micIcon: {
    marginLeft: scaleh(8),
  },
  cancelBtn: {
    marginLeft: scaleh(15),
  },
  cancelText: {
    fontSize: scaleh(14),
    fontWeight: '700',
    color: '#1a1a1a',
  },
  categoryTitle: {
    fontSize: scaleh(18),
    fontWeight: '800',
    color: '#1a1a1a',
    paddingHorizontal: scaleh(20),
    marginBottom: scalev(20),
  },
  subcategoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 235, 240, 0.95)', // Softer pinkish background for buttons
  },
  firstSubcategoryRow: {
    height: scalev(74),
    width: '100%', // Full width as requested (effectively 402)
    paddingHorizontal: scaleh(20),
    borderRadius: 0,
  },
  otherSubcategoryRow: {
    height: scalev(74),
    width: scaleh(373), // Specific width requested
    alignSelf: 'center', // Center the smaller buttons
    paddingHorizontal: scaleh(20),
    borderRadius: scaleh(15), // Rounded corners for remaining buttons
  },
  subcategoryText: {
    fontSize: scaleh(13),
    fontWeight: '500',
    color: '#1a1a1a',
  },
});

export default CategoryDetailScreen;
