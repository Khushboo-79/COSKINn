import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { AppTheme, scaleh, scalev } from '../../../constants/AppTheme';

const PriceSummaryModal = ({ visible, onClose }) => {
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
            <View style={styles.bottomSheetContainer}>
              
              {/* Header Row */}
              <View style={styles.headerRow}>
                <Text style={styles.title}>Price Summary</Text>
                <TouchableOpacity onPress={onClose}>
                  <Icon name="x" size={scaleh(20)} color="#333" />
                </TouchableOpacity>
              </View>

              {/* Subtotal Row */}
              <View style={styles.summaryRow}>
                <Text style={styles.rowLabel}>Subtotal</Text>
                <Text style={styles.rowValue}>₹480.86</Text>
              </View>

              {/* Grand Total Row */}
              <View style={[styles.summaryRow, styles.grandTotalRow]}>
                <Text style={styles.grandTotalLabel}>Grand Total</Text>
                <Text style={styles.grandTotalValue}>₹480.86</Text>
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
    borderWidth: 2,
    borderColor: '#FF007A', // Pink border matching reference
    borderBottomWidth: 0,
    paddingBottom: scalev(40),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    paddingVertical: scalev(20),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: scaleh(16),
    fontWeight: '700',
    color: '#000',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    paddingVertical: scalev(20),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  rowLabel: {
    fontSize: scaleh(14),
    color: '#333',
  },
  rowValue: {
    fontSize: scaleh(14),
    color: '#333',
  },
  grandTotalRow: {
    borderBottomWidth: 0, // No border for the last item
    paddingTop: scalev(25),
  },
  grandTotalLabel: {
    fontSize: scaleh(14),
    fontWeight: '700',
    color: '#000',
  },
  grandTotalValue: {
    fontSize: scaleh(14),
    fontWeight: '700',
    color: '#000',
  },
});

export default PriceSummaryModal;
