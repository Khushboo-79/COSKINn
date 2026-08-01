import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, Image, FlatList, TextInput, Platform } from 'react-native';
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
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Solid Pink Header */}
        <View style={{ backgroundColor: '#FFC2D1', paddingTop: scalev(15), paddingBottom: scalev(10) }}>
          <View style={styles.headerRow}>
            <View style={styles.searchContainer}>
              <Icon name="search" size={scaleh(16)} color="#666" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="What are you looking for?"
                placeholderTextColor="#999"
                editable={false} // Currently mock
              />
              <Icon name="mic" size={scaleh(16)} color="#666" style={styles.micIcon} />
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content Area with Background Image */}
        <View style={{ flex: 1, position: 'relative', backgroundColor: '#FFFFFF' }}>
          <Image
            source={require('../../../images/makeup/CosmeticBackImg.webp')}
            style={[StyleSheet.absoluteFill, { width: '100%', height: '100%', opacity: 0.2 }]}
            resizeMode="cover"
          />

          <View style={{ flex: 1 }}>
            {/* Category Title */}
            <Text style={styles.categoryTitle}>{formatTitle(categoryName)}</Text>

            {/* Subcategories List */}
            <FlatList
              data={subcategories}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: scalev(40) }}
              ItemSeparatorComponent={() => <View style={{ height: scalev(8) }} />}
              renderItem={renderSubcategory}
            />
          </View>
        </View>
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
    backgroundColor: '#FFC2D1',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
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
    fontSize: scaleh(20),
    fontWeight: '800',
    color: '#000000',
    paddingHorizontal: scaleh(20),
    marginTop: scalev(20),
    marginBottom: scalev(20),
  },
  subcategoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 194, 209, 0.4)', // Pink translucent background for cards
    height: scalev(65),
    paddingHorizontal: scaleh(20),
  },
  firstSubcategoryRow: {
    width: '100%', 
    borderRadius: 0,
  },
  otherSubcategoryRow: {
    width: '90%', 
    alignSelf: 'center',
    borderRadius: scaleh(15), 
  },
  subcategoryText: {
    fontSize: scaleh(13),
    fontWeight: '500',
    color: '#1a1a1a',
  },
});

export default CategoryDetailScreen;
