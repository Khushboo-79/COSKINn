import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Defs, RadialGradient, Stop, Circle } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAddresses, setSelectedAddress } from '../../../redux/slices/addressSlice';
import { createOrder } from '../../../redux/slices/orderSlice';
import { AppTheme, scaleh, scalev } from '../../../constants/AppTheme';

const CheckoutModal = ({ visible, onClose, finalTotal }) => {
  const activeDomain = useSelector(state => state.app?.activeDomain || 'skincare');
  const isCosmetics = activeDomain === 'cosmetics';
  const primaryColor = isCosmetics ? AppTheme.colors.cosmeticsPrimary : AppTheme.colors.primary;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  const { items: addresses, selectedAddress, loading: addressLoading } = useSelector(state => state.address);
  const [viewState, setViewState] = useState('summary');
  const [orderLoading, setOrderLoading] = useState(false);

  // Reset to summary view when modal opens
  useEffect(() => {
    if (visible) {
      setViewState('summary');
      if (addresses.length === 0) {
        dispatch(fetchAddresses());
      }
    }
  }, [visible, dispatch, addresses.length]);

  const handleClose = () => {
    onClose();
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }
    setOrderLoading(true);
    // Create COD order by default for Phase 4
    const orderData = {
      addressId: selectedAddress._id || selectedAddress.id,
      paymentMethod: 'COD'
    };
    dispatch(createOrder(orderData)).then((res) => {
      setOrderLoading(false);
      if (!res.error) {
        handleClose();
        setTimeout(() => navigation.navigate('OrderConfirmed'), 300);
      } else {
        alert(res.payload || 'Failed to place order');
      }
    });
  };

  const renderSummaryView = () => (
    <View style={styles.contentContainer}>

      {/* Close Button */}
      <View style={styles.closeRow}>
        <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
          <Icon name="x" size={scaleh(20)} color="#1a1a1a" />
        </TouchableOpacity>
      </View>

      <Text style={styles.titleText}>Complete payment: ₹{finalTotal}</Text>

      {/* Delivering to Card */}
      <View style={styles.summaryCard}>
        <View style={styles.cardIconWrapper}>
          <Icon name="map-pin" size={scaleh(16)} color="#1a1a1a" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardSubtitle}>Delivering to</Text>
          <Text style={styles.cardTitle}>
            {selectedAddress?.fullName || 'Select Address'}
            {selectedAddress?.pincode ? `, ${selectedAddress.pincode}` : ''}
          </Text>
          <Text style={styles.cardDesc} numberOfLines={1}>
            {selectedAddress ? `${selectedAddress.addressLine1}, ${selectedAddress.city}` : 'No address selected'}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setViewState('address')} style={[styles.changeBtnWrapper, { flexDirection: 'row', alignItems: 'center' }]}>
          <Text style={[styles.changeBtnText, { color: primaryColor }]}>Change</Text>
          <Icon name="chevron-right" size={scaleh(16)} color={primaryColor} />
        </TouchableOpacity>
      </View>

      {/* Paying via Card */}
      <View style={[styles.summaryCard, styles.payingViaCard]}>
        <View style={styles.cardIconWrapper}>
          <Icon name="credit-card" size={scaleh(16)} color="#1a1a1a" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardSubtitle}>Paying via</Text>
          <Text style={styles.cardTitle}>Cash on Delivery</Text>
        </View>
        <TouchableOpacity style={[styles.changeBtnWrapper, { flexDirection: 'row', alignItems: 'center' }]} onPress={() => {
          handleClose();
          setTimeout(() => navigation.navigate('PaymentMethods'), 300);
        }}>
          <Text style={[styles.changeBtnText, { color: primaryColor }]}>Change</Text>
          <Icon name="chevron-right" size={scaleh(16)} color={primaryColor} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.payButton, isCosmetics && { backgroundColor: '#FFC2D1' }]} 
        onPress={handlePlaceOrder}
        disabled={orderLoading}
      >
        {orderLoading ? (
           <ActivityIndicator size="small" color={isCosmetics ? '#000' : '#FFF'} />
        ) : (
           <Text style={[styles.payButtonText, isCosmetics && { color: '#000000' }]}>Place Order</Text>
        )}
      </TouchableOpacity>

    </View>
  );

  const renderAddressView = () => (
    <View style={styles.contentContainer}>

      {/* Close Button */}
      <View style={styles.closeRow}>
        <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
          <Icon name="x" size={scaleh(20)} color="#1a1a1a" />
        </TouchableOpacity>
      </View>

      <Text style={[styles.titleText, { marginBottom: scalev(15) }]}>Select from saved addresses</Text>

      {addressLoading ? (
        <ActivityIndicator size="large" color={primaryColor} />
      ) : addresses.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No saved addresses found.</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: scalev(250) }}>
          {addresses.map((item) => {
            const isSelected = selectedAddress && (selectedAddress._id === item._id || selectedAddress.id === item.id);
            return (
              <TouchableOpacity
                key={item._id || item.id}
                style={[styles.addressCard, isSelected && (isCosmetics ? { borderColor: primaryColor, backgroundColor: '#FFF2F6' } : styles.addressCardSelected)]}
                onPress={() => dispatch(setSelectedAddress(item))}
                activeOpacity={0.9}
              >
                <View style={styles.addressLeft}>
                  <Text style={styles.addressName}>{item.fullName}, {item.pincode}</Text>
                  <Text style={styles.addressDetails} numberOfLines={1}>{item.addressLine1}, {item.city}</Text>
                </View>
                <View style={styles.addressRight}>
                  {isSelected && isCosmetics ? (
                    <View style={[styles.radioCircle, { borderColor: '#333', overflow: 'hidden' }]}>
                      <Svg height="100%" width="100%" viewBox="0 0 24 24">
                        <Defs>
                          <RadialGradient
                            id="gradAddress"
                            cx="50%"
                            cy="50%"
                            rx="50%"
                            ry="50%"
                            fx="30%"
                            fy="30%"
                          >
                            <Stop offset="0%" stopColor="#FFC2D1" />
                            <Stop offset="100%" stopColor="#D81B60" />
                          </RadialGradient>
                        </Defs>
                        <Circle cx="12" cy="12" r="12" fill="url(#gradAddress)" />
                      </Svg>
                    </View>
                  ) : (
                    <View style={[styles.radioCircle, isSelected ? [styles.radioSelected, { backgroundColor: primaryColor }] : styles.radioUnselected]} />
                  )}
                  <TouchableOpacity style={{ marginTop: scalev(5) }}>
                    <Text style={[styles.editText, { color: primaryColor }]}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      {/* OR Divider */}
      <View style={styles.orDividerContainer}>
        <View style={styles.orLine} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.orLine} />
      </View>

      {/* Pincode Input */}
      <View style={styles.pincodeInputContainer}>
        <TextInput
          style={[styles.pincodeInput, { borderColor: primaryColor }]}
          placeholder="Enter pincode"
          placeholderTextColor="#999"
        />
      </View>

    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <LinearGradient
          colors={isCosmetics ? ['rgba(255, 194, 209, 0.8)', 'rgba(0, 0, 0, 0.8)'] : ['rgba(255, 0, 105, 0.8)', 'rgba(0, 0, 0, 0.8)']}
          style={styles.modalOverlay}
        >
          <TouchableWithoutFeedback>
            <View style={styles.bottomSheetContainer}>
              {viewState === 'summary' ? renderSummaryView() : renderAddressView()}
            </View>
          </TouchableWithoutFeedback>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomSheetContainer: {
    backgroundColor: AppTheme.colors.white,
    borderTopLeftRadius: scaleh(20),
    borderTopRightRadius: scaleh(20),
    paddingBottom: scalev(30),
    paddingTop: scalev(15),
    paddingHorizontal: scaleh(20),
  },
  contentContainer: {
    width: '100%',
  },
  closeRow: {
    alignItems: 'flex-start',
    marginBottom: scalev(15),
  },
  closeBtn: {
    width: scaleh(36),
    height: scaleh(36),
    borderRadius: scaleh(18),
    backgroundColor: '#EBEBEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: scaleh(16),
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: scalev(20),
  },
  summaryCard: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppTheme.colors.white,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: scaleh(12),
    padding: scaleh(15),
    marginBottom: scalev(15),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  payingViaCard: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: '#FFF2F6', // light pink background
    borderColor: '#FFF2F6',
    elevation: 0,
    shadowOpacity: 0,
  },
  cardIconWrapper: {
    marginRight: scaleh(12),
    alignSelf: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardSubtitle: {
    fontSize: scaleh(10),
    color: '#999',
    marginBottom: scalev(2),
  },
  cardTitle: {
    fontSize: scaleh(14),
    fontWeight: '700',
    color: '#000',
    marginBottom: scalev(2),
  },
  cardDesc: {
    fontSize: scaleh(12),
    color: '#666',
  },
  changeBtnWrapper: {
    paddingLeft: scaleh(10),
  },
  changeBtnText: {
    fontSize: scaleh(12),
    fontWeight: '700',
    // color is now applied dynamically inline
  },
  payButton: {
    backgroundColor: AppTheme.colors.primary,
    borderRadius: scaleh(10),
    paddingVertical: scalev(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scalev(10),
  },
  payButtonText: {
    color: AppTheme.colors.white,
    fontSize: scaleh(16),
    fontWeight: '700',
  },

  // Address view styles
  addressCard: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: AppTheme.colors.white,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: scaleh(10),
    padding: scaleh(15),
    marginBottom: scalev(10),
  },
  addressCardSelected: {
    backgroundColor: '#FFF2F6',
    borderColor: '#FFD1E3',
  },
  addressLeft: {
    flex: 1,
    paddingRight: scaleh(15),
  },
  addressName: {
    fontSize: scaleh(14),
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: scalev(4),
  },
  addressDetails: {
    fontSize: scaleh(12),
    color: '#666',
  },
  addressRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircle: {
    width: scaleh(20),
    height: scaleh(20),
    borderRadius: scaleh(10),
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  radioUnselected: {
    backgroundColor: '#D9D9D9',
  },
  radioSelected: {
    backgroundColor: AppTheme.colors.primary,
  },
  editText: {
    fontSize: scaleh(12),
    fontWeight: '600',
    // color overridden inline
  },
  orDividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scalev(20),
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#EBEBEB',
  },
  orText: {
    marginHorizontal: scaleh(15),
    fontSize: scaleh(12),
    color: '#666',
    fontWeight: '600',
  },
  pincodeInputContainer: {
    marginBottom: scalev(10),
  },
  pincodeInput: {
    borderWidth: 1,
    borderRadius: scaleh(8),
    height: scalev(50),
    paddingHorizontal: scaleh(15),
    fontSize: scaleh(14),
    color: '#000',
    // borderColor overridden inline
  }
});

export default CheckoutModal;
