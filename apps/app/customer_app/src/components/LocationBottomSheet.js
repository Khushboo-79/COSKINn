import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Dimensions, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedAddress, fetchLiveLocation } from '../redux/slices/addressSlice';
import { scaleh, scalev } from '../constants/AppTheme';

const { height } = Dimensions.get('window');

const LocationBottomSheet = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const addresses = useSelector(state => state.address?.items) || [];
  const selectedAddress = useSelector(state => state.address?.selectedAddress);

  const handleSelectAddress = (addr) => {
    dispatch(setSelectedAddress(addr));
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={styles.bottomSheetContainer}
            >
              {/* Header */}
              <View style={styles.headerRow}>
                <Text style={styles.headerTitle}>Select Delivery Location</Text>
                <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                  <FeatherIcon name="x" size={scaleh(18)} color="#000000ff" />
                </TouchableOpacity>
              </View>

              <View style={styles.divider} />

              {/* Search Bar */}
              <View style={styles.searchContainerWrapper}>
                <View style={styles.searchContainer}>
                  <Icon name="search" size={scaleh(18)} color="#666" style={styles.searchIcon} />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search for area, street name..."
                    placeholderTextColor="#999"
                  />
                </View>
              </View>

              <View style={styles.divider} />

              {/* Use Current Location */}
              <TouchableOpacity style={styles.currentLocationRow} onPress={() => {
                dispatch(fetchLiveLocation());
                onClose();
              }}>
                <View style={styles.currentLocationLeft}>
                  <Icon name="gps-fixed" size={scaleh(18)} color="#FF6B9E" />
                  <Text style={styles.currentLocationText}>Use my current location</Text>
                </View>
                <Icon name="chevron-right" size={scaleh(18)} color="#1a1a1a" />
              </TouchableOpacity>

              <View style={styles.divider} />

              {/* Saved Addresses */}
              <ScrollView style={{ maxHeight: height * 0.4 }} showsVerticalScrollIndicator={false}>
                {addresses.map((addr) => {
                  const isSelected = selectedAddress?.id === addr.id;
                  return (
                    <View key={addr.id}>
                      <TouchableOpacity style={styles.addressRow} onPress={() => handleSelectAddress(addr)}>
                        <View style={styles.addressInfo}>
                          <Text style={styles.addressTitle}>{addr.fullName || 'User'}, {addr.pincode}</Text>
                          <Text style={styles.addressSub} numberOfLines={1}>{addr.addressLine1}, {addr.city}</Text>
                        </View>
                        <View style={[styles.radioOuter, isSelected && { borderColor: '#FF6B9E' }]}>
                          {isSelected && <View style={styles.radioInner} />}
                        </View>
                      </TouchableOpacity>
                      <View style={styles.divider} />
                    </View>
                  );
                })}
              </ScrollView>

            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  bottomSheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: scaleh(20),
    borderTopRightRadius: scaleh(20),
    paddingBottom: scalev(40),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    paddingVertical: scalev(15),
  },
  headerTitle: {
    fontSize: scaleh(16),
    fontWeight: '700',
    color: '#000',
  },
  closeBtn: {
    width: scaleh(30),
    height: scaleh(30),
    borderRadius: scaleh(15),
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    width: '100%',
  },
  searchContainerWrapper: {
    paddingHorizontal: scaleh(20),
    paddingVertical: scalev(15),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFC2D1',
    borderRadius: scaleh(20),
    paddingHorizontal: scaleh(15),
    height: scalev(45),
  },
  searchIcon: {
    marginRight: scaleh(10),
  },
  searchInput: {
    flex: 1,
    fontSize: scaleh(13),
    color: '#1a1a1a',
  },
  currentLocationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    paddingVertical: scalev(15),
  },
  currentLocationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentLocationText: {
    marginLeft: scaleh(10),
    fontSize: scaleh(14),
    fontWeight: '600',
    color: '#FF6B9E',
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    paddingVertical: scalev(15),
  },
  addressInfo: {
    flex: 1,
    paddingRight: scaleh(20),
  },
  addressTitle: {
    fontSize: scaleh(14),
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: scalev(4),
  },
  addressSub: {
    fontSize: scaleh(12),
    color: '#666',
  },
  radioOuter: {
    width: scaleh(20),
    height: scaleh(20),
    borderRadius: scaleh(10),
    borderWidth: 1.5,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: scaleh(12),
    height: scaleh(12),
    borderRadius: scaleh(6),
    backgroundColor: '#FF6B9E',
  },
});

export default LocationBottomSheet;
