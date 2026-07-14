import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, TextInput, 
  ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { AppTheme, scaleh, scalev } from '../../../../constants/AppTheme';

const AddressScreen = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(true);

  // Form states
  const [pincode, setPincode] = useState('');
  const [house, setHouse] = useState('');
  const [road, setRoad] = useState('');
  const [contactName, setContactName] = useState('Khushboo Sharma');
  const [phone, setPhone] = useState('');

  const renderModal = () => (
    <Modal
      visible={showModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.bottomSheet}>
          
          <TouchableOpacity 
            style={styles.closeIconWrapper} 
            onPress={() => setShowModal(false)}
            activeOpacity={0.8}
          >
            <Icon name="x" size={scaleh(20)} color="#1A1A1A" />
          </TouchableOpacity>

          {/* Decorative Map Graphic Area */}
          <View style={styles.modalGraphicContainer}>
            <View style={styles.decorativeMapPin}>
              <Icon name="map-pin" size={scaleh(40)} color={AppTheme.colors.primary} />
            </View>
          </View>

          <Text style={styles.modalTitle}>What's your address?</Text>
          <Text style={styles.modalSubtitle}>
            Allow us to detect your current location, or add manually if you're ordering elsewhere.
          </Text>

          <View style={styles.modalButtonRow}>
            <TouchableOpacity 
              style={styles.addManuallyBtn} 
              onPress={() => setShowModal(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.addManuallyText}>Add manually</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.detectLocationBtn}
              activeOpacity={0.8}
              onPress={() => {
                // handle detect location logic
                setShowModal(false);
              }}
            >
              <Text style={styles.detectLocationText}>Detect location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const CustomInput = ({ placeholder, value, onChangeText }) => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888888"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-left" size={scaleh(24)} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Address</Text>
          <View style={{ width: scaleh(24) }} />
        </View>
        <View style={styles.headerDivider} />

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.formContainer}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            
            {/* Current Location Box */}
            <TouchableOpacity activeOpacity={0.8} style={styles.currentLocationBox}>
              <View style={styles.targetIconWrapper}>
                <Icon name="crosshair" size={scaleh(24)} color={AppTheme.colors.primary} />
              </View>
              <View style={styles.currentLocationTexts}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.currentLocationTitle}>Use current Location </Text>
                  <Icon name="chevron-right" size={scaleh(16)} color={AppTheme.colors.primary} />
                </View>
                <Text style={styles.currentLocationSubtitle}>For accurate delivery</Text>
              </View>
            </TouchableOpacity>

            {/* Address Inputs */}
            <CustomInput placeholder="Pincode" value={pincode} onChangeText={setPincode} />
            <CustomInput placeholder="House / Flat / Building No." value={house} onChangeText={setHouse} />
            <CustomInput placeholder="Road Name / Area / Colony" value={road} onChangeText={setRoad} />
            
            <Text style={styles.primaryInfoText}>This will be saved as your primary address.</Text>

            <View style={styles.dividerLine} />

            {/* Contact Details */}
            <Text style={styles.sectionLabel}>Contact Name</Text>
            <CustomInput placeholder="Contact Name" value={contactName} onChangeText={setContactName} />
            
            <CustomInput placeholder="Phone Number" value={phone} onChangeText={setPhone} />

            {/* Security Text */}
            <View style={styles.securityTextRow}>
              <Text style={styles.securityText}>
                Your data is stored securely and shared only for the purpose of delivery.
              </Text>
              <Icon name="shield" size={scaleh(20)} color={AppTheme.colors.primary} style={styles.shieldIcon} />
            </View>

          </ScrollView>
        </KeyboardAvoidingView>

        {/* Save Address Button */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity style={styles.saveButton} activeOpacity={0.8}>
            <Text style={styles.saveButtonText}>Save Address</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>

      {/* Render the popup modal */}
      {renderModal()}
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    paddingTop: scalev(10),
    paddingBottom: scalev(15),
    marginTop: scalev(35),
    justifyContent: 'space-between',
  },
  backButton: {
    padding: scaleh(5),
  },
  headerTitle: {
    fontSize: scaleh(18),
    fontWeight: '600',
    color: '#1A1A1A',
  },
  headerDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  formContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scaleh(20),
    paddingTop: scalev(20),
    paddingBottom: scalev(40),
  },
  currentLocationBox: {
    backgroundColor: '#F8F9FA', // Faint grey/blue background for the map replacement
    borderRadius: scaleh(12),
    padding: scaleh(15),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scalev(25),
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  targetIconWrapper: {
    width: scaleh(40),
    height: scaleh(40),
    borderRadius: scaleh(20),
    backgroundColor: '#FFD1E3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleh(15),
  },
  currentLocationTexts: {
    flex: 1,
  },
  currentLocationTitle: {
    color: AppTheme.colors.primary,
    fontSize: scaleh(15),
    fontWeight: '600',
    marginBottom: scalev(2),
  },
  currentLocationSubtitle: {
    color: '#888888',
    fontSize: scaleh(12),
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: scaleh(10),
    paddingHorizontal: scaleh(15),
    height: scalev(50),
    justifyContent: 'center',
    marginBottom: scalev(15),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  input: {
    fontSize: scaleh(14),
    color: '#1A1A1A',
    fontWeight: '500',
  },
  primaryInfoText: {
    fontSize: scaleh(12),
    color: '#666666',
    marginTop: scalev(5),
    marginBottom: scalev(25),
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: scalev(25),
  },
  sectionLabel: {
    fontSize: scaleh(13),
    color: '#888888',
    marginBottom: scalev(10),
    marginLeft: scaleh(5),
  },
  securityTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scalev(15),
    justifyContent: 'space-between',
    paddingHorizontal: scaleh(5),
  },
  securityText: {
    fontSize: scaleh(12),
    color: '#666666',
    flex: 1,
    lineHeight: scalev(18),
  },
  shieldIcon: {
    marginLeft: scaleh(15),
  },
  bottomButtonContainer: {
    paddingHorizontal: scaleh(20),
    paddingBottom: Platform.OS === 'ios' ? 0 : scalev(20),
    paddingTop: scalev(10),
  },
  saveButton: {
    backgroundColor: AppTheme.colors.primary,
    borderRadius: scaleh(12),
    height: scalev(50),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: AppTheme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: scaleh(16),
    fontWeight: '700',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 0, 105, 0.4)', // Pink semi-transparent background
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: scaleh(25),
    borderTopRightRadius: scaleh(25),
    paddingTop: scalev(15),
    paddingHorizontal: scaleh(20),
    paddingBottom: scalev(40),
    alignItems: 'center',
  },
  closeIconWrapper: {
    alignSelf: 'flex-start',
    width: scaleh(36),
    height: scaleh(36),
    borderRadius: scaleh(18),
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scalev(10),
  },
  modalGraphicContainer: {
    height: scalev(100),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF2F5', // Light pink placeholder for graphic
    borderRadius: scaleh(15),
    marginBottom: scalev(25),
  },
  decorativeMapPin: {
    width: scaleh(60),
    height: scaleh(60),
    borderRadius: scaleh(30),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  modalTitle: {
    fontSize: scaleh(20),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: scalev(15),
  },
  modalSubtitle: {
    fontSize: scaleh(13),
    color: '#666666',
    textAlign: 'center',
    lineHeight: scalev(20),
    marginBottom: scalev(30),
    paddingHorizontal: scaleh(10),
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: scaleh(15),
  },
  addManuallyBtn: {
    flex: 1,
    height: scalev(50),
    borderRadius: scaleh(12),
    borderWidth: 1.5,
    borderColor: AppTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  addManuallyText: {
    color: AppTheme.colors.primary,
    fontSize: scaleh(15),
    fontWeight: '600',
  },
  detectLocationBtn: {
    flex: 1,
    height: scalev(50),
    borderRadius: scaleh(12),
    backgroundColor: AppTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detectLocationText: {
    color: '#FFFFFF',
    fontSize: scaleh(15),
    fontWeight: '600',
  },
});

export default AddressScreen;
