import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, TextInput, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { AppTheme, scaleh, scalev } from '../../../constants/AppTheme';

const addresses = [
  { id: 1, name: 'Ayushi', pin: '345678', details: 'Ibus stop, Mumbai, Bandra, Chauraha.....' },
  { id: 2, name: 'Ayushi', pin: '345678', details: 'Ibus stop, Mumbai, Bandra, Chauraha.....' },
  { id: 3, name: 'Ayushi', pin: '345678', details: 'Ibus stop, Mumbai, Bandra, Chauraha.....' },
];

const CheckoutModal = ({ visible, onClose }) => {
  const navigation = useNavigation();
  // 'summary' or 'address'
  const [viewState, setViewState] = useState('summary');
  const [selectedAddressId, setSelectedAddressId] = useState(2); // Match image showing middle one selected

  // Reset to summary view when modal opens
  useEffect(() => {
    if (visible) {
      setViewState('summary');
    }
  }, [visible]);

  const handleClose = () => {
    onClose();
  };

  const renderSummaryView = () => (
    <View style={styles.contentContainer}>

      {/* Close Button */}
      <View style={styles.closeRow}>
        <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
          <Icon name="x" size={scaleh(20)} color="#1a1a1a" />
        </TouchableOpacity>
      </View>

      <Text style={styles.titleText}>Complete payment: ₹1,104</Text>

      {/* Delivering to Card */}
      <View style={styles.summaryCard}>
        <View style={styles.cardIconWrapper}>
          <Icon name="map-pin" size={scaleh(16)} color="#1a1a1a" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardSubtitle}>Delivering to</Text>
          <Text style={styles.cardTitle}>Ayushi, 345678</Text>
          <Text style={styles.cardDesc} numberOfLines={1}>Ibus stop, Mumbai, Bandra, Chauraha.....</Text>
        </View>
        <TouchableOpacity onPress={() => setViewState('address')} style={styles.changeBtnWrapper}>
          <Text style={styles.changeBtnText}>Change {'>'}</Text>
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
        <TouchableOpacity style={styles.changeBtnWrapper} onPress={() => {
          handleClose();
          setTimeout(() => navigation.navigate('PaymentMethods'), 300);
        }}>
          <Text style={styles.changeBtnText}>Change {'>'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.payButton} onPress={() => {
        handleClose();
        setTimeout(() => navigation.navigate('OrderConfirmed'), 300);
      }}>
        <Text style={styles.payButtonText}>Pay ₹1,104</Text>
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

      <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: scalev(250) }}>
        {addresses.map((item) => {
          const isSelected = item.id === selectedAddressId;
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.addressCard, isSelected && styles.addressCardSelected]}
              onPress={() => setSelectedAddressId(item.id)}
              activeOpacity={0.9}
            >
              <View style={styles.addressLeft}>
                <Text style={styles.addressName}>{item.name}, {item.pin}</Text>
                <Text style={styles.addressDetails} numberOfLines={1}>{item.details}</Text>
              </View>
              <View style={styles.addressRight}>
                <View style={[styles.radioCircle, isSelected ? styles.radioSelected : styles.radioUnselected]} />
                <TouchableOpacity style={{ marginTop: scalev(5) }}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* OR Divider */}
      <View style={styles.orDividerContainer}>
        <View style={styles.orLine} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.orLine} />
      </View>

      {/* Pincode Input */}
      <View style={styles.pincodeInputContainer}>
        <TextInput
          style={styles.pincodeInput}
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
          colors={['rgba(255, 153, 196, 0.8)', 'rgba(0, 0, 0, 0.8)']}
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
    color: AppTheme.colors.primary,
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
    color: AppTheme.colors.primary,
    fontWeight: '600',
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
    borderColor: AppTheme.colors.primary,
    borderRadius: scaleh(8),
    height: scalev(50),
    paddingHorizontal: scaleh(15),
    fontSize: scaleh(14),
    color: '#000',
  }
});

export default CheckoutModal;
