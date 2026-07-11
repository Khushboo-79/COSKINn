import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { AppTheme, scaleh, scalev } from '../../../../constants/AppTheme';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('Miss');
  
  const [name, setName] = useState('Khushboo Sharma');
  const [email, setEmail] = useState('abcd@gmail.com');
  const [mobile, setMobile] = useState('+91234567899');
  const [dob, setDob] = useState('');

  const renderRadioButton = (label) => {
    const isSelected = title === label;
    return (
      <TouchableOpacity 
        style={styles.radioContainer} 
        onPress={() => setTitle(label)}
        activeOpacity={0.8}
      >
        <View style={styles.radioOuter}>
          {isSelected && <View style={styles.radioInner} />}
        </View>
        <Text style={styles.radioLabel}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      {/* Header with Gradient */}
      <LinearGradient
        colors={['#FF0069', '#FFD498']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerSection}
      >
        {/* Navbar area */}
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-left" size={scaleh(28)} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Account</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Avatar overlapping bottom */}
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarInner}>
              <Icon name="user" size={scaleh(40)} color={AppTheme.colors.primary} />
            </View>
            <View style={styles.addOverlay}>
              <Text style={styles.addText}>ADD</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Form Content */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.formContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Title Selection */}
          <View style={styles.titleSelectionRow}>
            {renderRadioButton('Miss')}
            {renderRadioButton('Mr')}
          </View>

          {/* Form Fields */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
            />
            <View style={styles.inputBorder} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.textInput, { flex: 1 }]}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
            <View style={styles.inputBorder} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Mobile number</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.textInput, { flex: 1 }]}
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
              />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
            <View style={styles.inputBorder} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>DOB</Text>
            <TextInput
              style={styles.textInput}
              value={dob}
              onChangeText={setDob}
              placeholder=""
            />
            <View style={styles.inputBorder} />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Done Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.doneButton} activeOpacity={0.8}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerSection: {
    height: scalev(220), // Adjust based on visual proportion
    position: 'relative',
    marginBottom: scalev(40), // Space for the overlapping avatar
  },
  gradientBg: {
    ...StyleSheet.absoluteFillObject,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scalev(45), // Matches DashboardScreen marginTop(35) + paddingTop(10)
    paddingHorizontal: scaleh(20),
    justifyContent: 'space-between',
  },
  backButton: {
    padding: scaleh(5),
    marginLeft: scaleh(-5),
  },
  headerTitle: {
    fontSize: scaleh(20),
    fontWeight: '700',
    color: '#1A1A1A',
  },
  placeholder: {
    width: scaleh(38), // Match back button width to center title
  },
  avatarWrapper: {
    position: 'absolute',
    bottom: -scalev(40),
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  avatarContainer: {
    width: scaleh(90),
    height: scaleh(90),
    borderRadius: scaleh(45),
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: AppTheme.colors.primary,
    overflow: 'hidden', // clips the overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: scalev(10), // nudge icon up so it's not hidden by overlay
  },
  addOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '40%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    color: '#FFFFFF',
    fontSize: scaleh(12),
    fontWeight: '600',
  },
  formContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scaleh(25),
    paddingTop: scalev(10),
    paddingBottom: scalev(30),
  },
  titleSelectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scalev(30),
    gap: scaleh(40),
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: scaleh(18),
    height: scaleh(18),
    borderRadius: scaleh(9),
    borderWidth: 2,
    borderColor: AppTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleh(8),
  },
  radioInner: {
    width: scaleh(10),
    height: scaleh(10),
    borderRadius: scaleh(5),
    backgroundColor: AppTheme.colors.primary,
  },
  radioLabel: {
    fontSize: scaleh(15),
    color: AppTheme.colors.primary,
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: scalev(25),
  },
  inputLabel: {
    fontSize: scaleh(12),
    color: '#888888',
    marginBottom: scalev(5),
    fontWeight: '500',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    fontSize: scaleh(15),
    color: '#1A1A1A',
    paddingVertical: scalev(5),
    paddingHorizontal: 0,
    fontWeight: '500',
  },
  verifiedText: {
    color: '#4CAF50',
    fontSize: scaleh(14),
    fontWeight: '600',
  },
  inputBorder: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginTop: scalev(2),
  },
  bottomButtonContainer: {
    paddingHorizontal: scaleh(20),
    paddingBottom: scalev(30),
    paddingTop: scalev(10),
    backgroundColor: '#FFFFFF',
  },
  doneButton: {
    backgroundColor: AppTheme.colors.primary,
    borderRadius: scaleh(12),
    height: scalev(50),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: AppTheme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: scaleh(16),
    fontWeight: '700',
  },
});

export default ProfileScreen;
