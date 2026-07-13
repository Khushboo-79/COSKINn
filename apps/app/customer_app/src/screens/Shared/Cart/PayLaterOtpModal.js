import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { AppTheme, scaleh, scalev } from '../../../constants/AppTheme';

const PayLaterOtpModal = ({ visible, onClose, onContinue }) => {
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
                <Text style={styles.title}>Enter OTP to check eligibility</Text>
                <Text style={styles.subtitle}>
                  To check your eligibility, enter the OTP sent to{'\n'}+91 1234567890
                </Text>

                {/* OTP Input Boxes */}
                <View style={styles.otpContainer}>
                  {[1, 2, 3, 4].map((item, index) => (
                    <TextInput 
                      key={index}
                      style={styles.otpInput}
                      keyboardType="number-pad"
                      maxLength={1}
                    />
                  ))}
                </View>

                {/* Resend OTP */}
                <Text style={styles.resendText}>
                  Resend OTP in <Text style={styles.timerText}>28s</Text>
                </Text>

                {/* Continue Button */}
                <TouchableOpacity style={styles.continueBtn} onPress={onContinue}>
                  <Text style={styles.continueBtnText}>Continue</Text>
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
    lineHeight: scalev(18),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: scalev(20),
  },
  otpInput: {
    width: scaleh(50),
    height: scalev(50),
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: scaleh(8),
    marginHorizontal: scaleh(10),
    textAlign: 'center',
    fontSize: scaleh(18),
    color: '#000',
  },
  resendText: {
    fontSize: scaleh(12),
    color: '#666',
    marginBottom: scalev(30),
  },
  timerText: {
    color: '#FF007A',
  },
  continueBtn: {
    backgroundColor: AppTheme.colors.primary,
    borderRadius: scaleh(10),
    width: '100%',
    height: scalev(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scalev(25),
  },
  continueBtnText: {
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

export default PayLaterOtpModal;
