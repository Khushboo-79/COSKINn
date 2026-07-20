import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { scaleh, scalev, AppTheme } from '../constants/AppTheme';
import { Text } from 'react-native';

const SearchBarRow = () => {
  const navigation = useNavigation();
  const activeDomain = useSelector(state => state.app?.activeDomain || 'skincare');
  const isCosmetics = activeDomain === 'cosmetics';
  const searchBorderColor = isCosmetics ? '#FFC2D1' : '#E5E5E5'; // Light pink for makeup
  const searchBgColor = '#FFFFFF';
  
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems?.length || 0;

  return (
    <View style={styles.searchRow}>
      <TouchableOpacity style={[styles.searchContainer, { borderColor: searchBorderColor, backgroundColor: searchBgColor }]} onPress={() => navigation.navigate('Search')} activeOpacity={0.9}>
        <View pointerEvents="none" style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="search" size={scaleh(18)} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Type to search..."
            placeholderTextColor="#999"
            editable={false}
          />
          <Icon name="mic" size={scaleh(18)} color="#666" style={styles.micIcon} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerIconBtn} onPress={() => navigation.navigate('Wishlist')}>
        <Image source={require('../images/icons/Wishlist.webp')} style={{ width: scaleh(24), height: scaleh(24), tintColor: '#1a1a1a' }} resizeMode="contain" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerIconBtn} onPress={() => navigation.navigate('Cart')}>
        <View>
          <Image source={require('../images/icons/Cart.webp')} style={{ width: scaleh(24), height: scaleh(24), tintColor: '#1a1a1a' }} resizeMode="contain" />
          {cartCount > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    marginBottom: scalev(20),
    gap: scaleh(15),
    width: '100%',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: scaleh(25),
    borderWidth: 1,
    height: scalev(45),
    paddingHorizontal: scaleh(15),
    // Optional shadow can be customized here if needed
  },
  searchIcon: {
    marginRight: scaleh(10),
  },
  searchInput: {
    flex: 1,
    fontSize: scaleh(14),
    color: '#1a1a1a',
    paddingVertical: 0,
  },
  micIcon: {
    marginLeft: scaleh(10),
  },
  headerIconBtn: {
    padding: scaleh(5),
  },
  badgeContainer: {
    position: 'absolute',
    top: -scalev(5),
    right: -scaleh(5),
    backgroundColor: '#FF0069',
    borderRadius: scaleh(10),
    minWidth: scaleh(16),
    height: scalev(16),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleh(4),
  },
  badgeText: {
    color: '#FFF',
    fontSize: scaleh(10),
    fontWeight: '700',
  },
});

export default SearchBarRow;
