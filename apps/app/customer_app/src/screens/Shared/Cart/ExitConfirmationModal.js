import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { AppTheme, scaleh, scalev } from '../../../constants/AppTheme';

const ExitConfirmationModal = ({ visible, onClose, onContinuePayment, onExit }) => {
  const activeDomain = useSelector(state => state.app?.activeDomain || 'skincare');
  const isCosmetics = activeDomain === 'cosmetics';
  const primaryColor = isCosmetics ? AppTheme.colors.cosmeticsPrimary : AppTheme.colors.primary;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.bottomSheetContainer, isCosmetics && { borderColor: primaryColor }]}>
              
              {/* Close Icon */}
              <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                <Icon name="x" size={scaleh(20)} color="#333" />
              </TouchableOpacity>

              <View style={styles.contentContainer}>
                <Text style={styles.title}>Are you sure you want to exit?</Text>
                <Text style={styles.subtitle}>
                  You will be taken back to COSKINn website
                </Text>

                {/* Continue to Payment Button (Outlined) */}
                <TouchableOpacity style={[styles.outlineBtn, isCosmetics && { borderColor: primaryColor }]} onPress={onContinuePayment}>
                  <Text style={styles.outlineBtnText}>Continue to payment</Text>
                </TouchableOpacity>

                {/* Yes, exit Button (Filled) */}
                <TouchableOpacity style={[styles.filledBtn, isCosmetics && { backgroundColor: primaryColor }]} onPress={onExit}>
                  <Text style={[styles.filledBtnText, isCosmetics && { color: '#000' }]}>Yes, exit</Text>
                </TouchableOpacity>

                {/* Secured By */}
                <View style={styles.securedWrapper}>
                  <Text style={styles.securedText}>Secured By</Text>
                  {/* Razorpay Icon Mimic */}
                  <View style={styles.razorpayIconPlaceholder}>
                    <View style={styles.whiteTriangle} />
                    <View style={styles.blueBar} />
                  </View>
                  <Text style={styles.razorpayText}>Razorpay</Text>
                </View>

              </View>

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  bottomSheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: scaleh(20),
    borderTopRightRadius: scaleh(20),
    borderTopWidth: 3,
    borderColor: '#FF007A',
    paddingBottom: scalev(30),
    paddingTop: scalev(20),
  },
  closeBtn: {
    alignSelf: 'flex-end',
    paddingHorizontal: scaleh(20),
    marginBottom: scalev(10),
  },
  contentContainer: {
    paddingHorizontal: scaleh(20),
    alignItems: 'center',
  },
  title: {
    fontSize: scaleh(16),
    fontWeight: '700',
    color: '#000',
    marginBottom: scalev(10),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: scaleh(12),
    color: '#666',
    textAlign: 'center',
    marginBottom: scalev(30),
  },
  outlineBtn: {
    width: '100%',
    height: scalev(50),
    borderWidth: 1,
    borderColor: '#FF3366', // Pinkish border matching reference
    borderRadius: scaleh(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scalev(15),
  },
  outlineBtnText: {
    color: '#000',
    fontSize: scaleh(16),
    fontWeight: '500',
  },
  filledBtn: {
    backgroundColor: AppTheme.colors.primary,
    borderRadius: scaleh(8),
    width: '100%',
    height: scalev(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scalev(25),
  },
  filledBtnText: {
    color: '#FFFFFF',
    fontSize: scaleh(16),
    fontWeight: '700',
  },
  securedWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  securedText: {
    fontSize: scaleh(12),
    color: '#666',
    marginRight: scaleh(5),
  },
  razorpayText: {
    fontSize: scaleh(14),
    fontWeight: '800',
    color: '#002E6E',
    fontStyle: 'italic',
  },
  razorpayIconPlaceholder: {
    width: scaleh(16),
    height: scaleh(16),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: scaleh(2),
  },
  blueBar: {
    width: scaleh(4),
    height: scaleh(12),
    backgroundColor: '#3399FF',
    transform: [{ skewX: '-20deg' }],
    zIndex: 2,
  },
  whiteTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: scaleh(5),
    borderBottomWidth: scaleh(6),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    left: scaleh(2),
    transform: [{ skewX: '-20deg' }],
    zIndex: 1,
  },
});

export default ExitConfirmationModal;
