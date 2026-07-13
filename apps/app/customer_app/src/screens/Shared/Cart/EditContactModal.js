import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { AppTheme, scaleh, scalev } from '../../../constants/AppTheme';

const EditContactModal = ({ visible, onClose }) => {
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
              
              {/* Close Icon */}
              <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                <Icon name="x" size={scaleh(20)} color="#333" />
              </TouchableOpacity>

              <View style={styles.contentContainer}>
                <Text style={styles.title}>Edit contact details</Text>
                <Text style={styles.subtitle}>Enter mobile & email to continue</Text>

                {/* Mobile Input */}
                <View style={styles.inputContainer}>
                  <TouchableOpacity style={styles.countryCode}>
                    <Text style={styles.countryCodeText}>+91</Text>
                    <Icon name="chevron-down" size={scaleh(16)} color="#333" style={{ marginLeft: scaleh(5) }} />
                  </TouchableOpacity>
                  <TextInput 
                    style={styles.textInput}
                    value="1234567890"
                    keyboardType="phone-pad"
                  />
                </View>

                {/* Email Input */}
                <View style={[styles.inputContainer, { marginTop: scalev(15) }]}>
                  <TextInput 
                    style={styles.textInputFull}
                    value="asdfghg@123gmail.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                {/* Continue Button */}
                <TouchableOpacity style={styles.continueBtn} onPress={onClose}>
                  <Text style={styles.continueBtnText}>Continue</Text>
                </TouchableOpacity>

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
  },
  title: {
    fontSize: scaleh(16),
    fontWeight: '700',
    color: '#000',
    marginBottom: scalev(5),
  },
  subtitle: {
    fontSize: scaleh(12),
    color: '#000',
    marginBottom: scalev(20),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: scaleh(8),
    height: scalev(50),
    paddingHorizontal: scaleh(15),
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scaleh(15),
  },
  countryCodeText: {
    fontSize: scaleh(14),
    color: '#000',
  },
  textInput: {
    flex: 1,
    fontSize: scaleh(14),
    color: '#000',
    padding: 0,
  },
  textInputFull: {
    flex: 1,
    fontSize: scaleh(14),
    color: '#000',
    padding: 0,
  },
  continueBtn: {
    backgroundColor: AppTheme.colors.primary,
    borderRadius: scaleh(10),
    height: scalev(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scalev(30),
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: scaleh(16),
    fontWeight: '700',
  },
});

export default EditContactModal;
