import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import Svg, { Defs, RadialGradient, Stop, Circle } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { AppTheme, scaleh, scalev } from '../../../constants/AppTheme';

const RazorpayModal = ({ visible, onClose }) => {
  const activeDomain = useSelector(state => state.app?.activeDomain || 'skincare');
  const isCosmetics = activeDomain === 'cosmetics';
  const primaryColor = isCosmetics ? AppTheme.colors.cosmeticsPrimary : AppTheme.colors.primary;

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    let timer;
    if (visible) {
      setIsProcessing(false);
      timer = setTimeout(() => {
        setIsProcessing(true);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <LinearGradient
          colors={isCosmetics ? ['rgba(255, 194, 209, 0.8)', 'rgba(0, 0, 0, 0.8)'] : ['rgba(255, 0, 105, 0.8)', 'rgba(0, 0, 0, 0.8)']}
          style={styles.modalOverlay}
        >
          <TouchableWithoutFeedback>
            <LinearGradient
              colors={isProcessing || isCosmetics ? ['#FFFFFF', '#FFFFFF'] : ['#FFE6EF', '#FFE6EF']}
              style={[styles.bottomSheetContainer, isCosmetics && { borderColor: primaryColor }]}
            >
              {isProcessing ? (
                <View style={styles.processingContainer}>
                  <Text style={styles.processingTitle}>Processing your payment...</Text>
                  <Text style={styles.processingSub}>
                    Please wait as we are confirming the transaction on our end
                  </Text>

                  <View style={styles.warningRow}>
                    <Icon name="alert-triangle" size={scaleh(14)} color="#FF3366" />
                    <Text style={styles.warningText}>Please don't refresh or click back</Text>
                  </View>

                  <View style={styles.loaderWrapper}>
                    <View style={[styles.pinkGlowOuter, isCosmetics && { backgroundColor: 'rgba(255, 194, 209, 0.3)' }]}>
                      {isCosmetics ? (
                        <View style={{ width: scaleh(35), height: scaleh(35), borderRadius: scaleh(17.5), overflow: 'hidden' }}>
                          <Svg height="100%" width="100%" viewBox="0 0 24 24">
                            <Defs>
                              <RadialGradient id="gradProcess" cx="50%" cy="50%" rx="50%" ry="50%" fx="30%" fy="30%">
                                <Stop offset="0%" stopColor="#FFC2D1" />
                                <Stop offset="100%" stopColor="#D81B60" />
                              </RadialGradient>
                            </Defs>
                            <Circle cx="12" cy="12" r="12" fill="url(#gradProcess)" />
                          </Svg>
                        </View>
                      ) : (
                        <View style={styles.pinkGlowInner} />
                      )}
                    </View>
                  </View>

                  <TouchableOpacity onPress={onClose}>
                    <Text style={styles.cancelText}>
                      Could not complete payment? <Text style={{ fontWeight: '700' }}>Cancel</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.contentContainer}>
                  {/* Mimicking the Razorpay slanted '1' logo */}
                  <View style={styles.logoWrapper}>
                    <View style={styles.razorpayIconPlaceholder}>
                      <View style={styles.whiteTriangle} />
                      <View style={styles.blueBar} />
                    </View>
                  </View>

                  <View style={styles.securedByContainer}>
                    <Text style={styles.securedText}>Secured By</Text>
                    <Text style={styles.razorpayText}>Razorpay</Text>
                  </View>
                </View>
              )}

            </LinearGradient>
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
    backgroundColor: '#FFE6EF', // Light pink background
    borderTopLeftRadius: scaleh(20),
    borderTopRightRadius: scaleh(20),
    borderWidth: 2,
    borderColor: AppTheme.colors.primary,
    height: scalev(350), // match the height in the image
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  razorpayIconPlaceholder: {
    width: scaleh(80),
    height: scaleh(80),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  blueBar: {
    width: scaleh(25),
    height: scaleh(70),
    backgroundColor: '#3399FF', // Light blue
    transform: [{ skewX: '-20deg' }],
    zIndex: 2,
  },
  whiteTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: scaleh(30),
    borderBottomWidth: scaleh(35),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFFFFF',
    position: 'absolute',
    bottom: scalev(5),
    left: scaleh(5),
    transform: [{ skewX: '-20deg' }],
    zIndex: 1,
  },
  securedByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scalev(30),
  },
  securedText: {
    fontSize: scaleh(12),
    color: '#666',
    marginRight: scaleh(5),
  },
  razorpayText: {
    fontSize: scaleh(14),
    fontWeight: '800',
    color: '#002E6E', // Dark blue Razorpay text
    fontStyle: 'italic',
  },
  processingContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: scaleh(20),
    paddingTop: scalev(40),
    paddingBottom: scalev(20),
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: scaleh(20),
    borderTopRightRadius: scaleh(20),
  },
  processingTitle: {
    fontSize: scaleh(20),
    fontWeight: '600',
    color: '#000',
    marginBottom: scalev(10),
  },
  processingSub: {
    fontSize: scaleh(12),
    color: '#666',
    textAlign: 'center',
    marginBottom: scalev(40),
    paddingHorizontal: scaleh(20),
    lineHeight: scalev(18),
  },
  warningRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningText: {
    fontSize: scaleh(12),
    color: '#FF3366',
    marginLeft: scaleh(8),
  },
  loaderWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scalev(-20), // pull up slightly
  },
  pinkGlowOuter: {
    width: scaleh(70),
    height: scaleh(70),
    borderRadius: scaleh(35),
    backgroundColor: 'rgba(255, 0, 105, 0.2)', // Light pink glow
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinkGlowInner: {
    width: scaleh(35),
    height: scaleh(35),
    borderRadius: scaleh(17.5),
    backgroundColor: '#FF0069', // solid pink
  },
  cancelText: {
    fontSize: scaleh(12),
    color: '#333',
    marginBottom: scalev(10),
  }
});

export default RazorpayModal;
