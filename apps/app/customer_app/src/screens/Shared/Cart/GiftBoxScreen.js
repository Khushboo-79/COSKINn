import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { AppTheme, scaleh, scalev } from '../../../constants/AppTheme';

const GiftBoxScreen = ({ navigation }) => {
  const activeDomain = useSelector(state => state.app?.activeDomain || 'skincare');
  const isCosmetics = activeDomain === 'cosmetics';
  const primaryColor = isCosmetics ? '#FF0069' : AppTheme.colors.primary;
  const btnGradient = isCosmetics ? ['#FF0069', '#FFD498'] : [AppTheme.colors.cartBottomGradientStart, AppTheme.colors.cartBottomGradientEnd];

  // Option 1 = 'blank', Option 2 = 'personal'
  const [selectedOption, setSelectedOption] = useState('personal');
  const [message, setMessage] = useState('');

  const maxChars = 160;

  return (
    <View style={[styles.container, { backgroundColor: isCosmetics ? '#FFFFFF' : AppTheme.colors.white }]}>
      {isCosmetics && (
        <>
          <Image
            source={require('../../../images/makeup/CosmeticBackImg.webp')}
            style={[StyleSheet.absoluteFill, { width: '100%', height: '100%', opacity: 0.3 }]}
            resizeMode="cover"
          />

        </>
      )}
      <SafeAreaView style={styles.safeArea}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-left" size={scaleh(28)} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Gift Box</Text>
        </View>

        <View style={styles.separator} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

          {/* Logo Section */}
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../../images/Logo/logo.webp')}
                style={styles.bigCLogo}
                resizeMode="contain"
              />
              <Image
                source={require('../../../images/Logo/coskinLogo.webp')}
                style={styles.smallHeartLogoTop}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={styles.separator} />

          {/* Option 1: Blank Card */}
          <TouchableOpacity
            style={styles.optionRow}
            activeOpacity={0.8}
            onPress={() => setSelectedOption('blank')}
          >
            <View style={[styles.radioCircle, selectedOption === 'blank' ? [styles.radioSelectedBlank, { borderColor: primaryColor }] : styles.radioUnselected]} />
            <Text style={styles.optionText}>Send me a blank card</Text>
          </TouchableOpacity>

          {/* OR Divider */}
          <View style={styles.orDividerContainer}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.orLine} />
          </View>

          {/* Option 2: Personal Message */}
          <TouchableOpacity
            style={styles.optionRow}
            activeOpacity={0.8}
            onPress={() => setSelectedOption('personal')}
          >
            <View style={[styles.radioCircle, selectedOption === 'personal' ? [styles.radioSelectedPersonal, { backgroundColor: primaryColor }] : styles.radioUnselected]} />
            <Text style={styles.optionText}>Send a personal message</Text>
          </TouchableOpacity>

          {/* Message Input Box (Conditionally rendered) */}
          {selectedOption === 'personal' && (
            <View style={[styles.messageInputWrapper, isCosmetics && { borderColor: primaryColor }]}>
              <TextInput
                style={styles.messageInput}
                placeholder="Gift Message"
                placeholderTextColor="#999"
                multiline={true}
                numberOfLines={6}
                maxLength={160}
                value={message}
                onChangeText={setMessage}
                textAlignVertical="top"
              />
              <Text style={styles.charCountText}>
                {maxChars - message.length} characters remaining; max 6 lines
              </Text>
            </View>
          )}

          {/* Terms & Conditions */}
          <View style={styles.termsSection}>
            <Text style={styles.termsTitle}>Terms & Conditions:</Text>
            <View style={styles.bulletRow}>
              <View style={[styles.bulletPoint, { backgroundColor: primaryColor }]} />
              <Text style={styles.termText}>Cash on delivery is disabled for gift orders</Text>
            </View>
            <View style={styles.bulletRow}>
              <View style={[styles.bulletPoint, { backgroundColor: primaryColor }]} />
              <Text style={styles.termText}>Invoice for the package will be included in the package sent to the recipient</Text>
            </View>
          </View>

        </ScrollView>

        {/* Bottom Bar Gradient Button */}
        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.goBack()}>
          {isCosmetics ? (
            <View style={[styles.proceedButton, { backgroundColor: '#FFC2D1' }]}>
              <Text style={[styles.proceedButtonText, { color: '#000000' }]}>Proceed {'>'}</Text>
            </View>
          ) : (
            <LinearGradient
              colors={btnGradient}
              style={styles.proceedButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.proceedButtonText}>Proceed {'>'}</Text>
            </LinearGradient>
          )}
        </TouchableOpacity>

      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.white,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleh(15),
    paddingTop: scalev(15),
    paddingBottom: scalev(15),
    marginTop: scalev(35), // Match dashboard top margin
  },
  backButton: {
    padding: scaleh(5),
  },
  headerTitle: {
    fontSize: scaleh(20),
    fontWeight: '500',
    color: '#000',
    marginLeft: scaleh(10),
  },
  separator: {
    height: 1,
    backgroundColor: '#DDD',
    width: '100%',
  },
  scrollContent: {
    paddingBottom: scalev(40),
  },
  logoSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scalev(40),
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: scalev(80),
    width: scaleh(80),
  },
  bigCLogo: {
    width: '100%',
    height: '100%',
  },
  smallHeartLogoTop: {
    position: 'absolute',
    right: -scaleh(10),
    top: 0,
    width: scaleh(20),
    height: scalev(20),
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleh(30),
    paddingVertical: scalev(15),
  },
  radioCircle: {
    width: scaleh(24),
    height: scaleh(24),
    borderRadius: scaleh(12),
    borderWidth: 1,
    borderColor: '#333',
    marginRight: scaleh(15),
  },
  radioUnselected: {
    backgroundColor: '#E5E5E5',
  },
  radioSelectedBlank: {
    backgroundColor: '#999', // darker gray when selected
  },
  radioSelectedPersonal: {
    backgroundColor: AppTheme.colors.primary,
  },
  optionText: {
    fontSize: scaleh(14),
    color: '#1a1a1a',
  },
  orDividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleh(30),
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDD',
  },
  orText: {
    marginHorizontal: scaleh(15),
    fontSize: scaleh(14),
    fontWeight: '600',
    color: '#333',
  },
  messageInputWrapper: {
    marginHorizontal: scaleh(30),
    marginTop: scalev(10),
  },
  messageInput: {
    borderWidth: 1,
    borderColor: AppTheme.colors.primary,
    borderRadius: scaleh(8),
    height: scalev(120),
    paddingHorizontal: scaleh(15),
    paddingTop: scalev(15),
    fontSize: scaleh(14),
    color: '#000',
  },
  charCountText: {
    textAlign: 'right',
    fontSize: scaleh(10),
    color: '#666',
    marginTop: scalev(5),
  },
  termsSection: {
    marginHorizontal: scaleh(30),
    marginTop: scalev(30),
    marginBottom: scalev(20),
  },
  termsTitle: {
    fontSize: scaleh(14),
    fontWeight: '700',
    color: '#000',
    marginBottom: scalev(10),
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: scalev(8),
  },
  bulletPoint: {
    width: scaleh(6),
    height: scaleh(6),
    borderRadius: scaleh(3),
    backgroundColor: '#000',
    marginTop: scalev(6),
    marginRight: scaleh(10),
  },
  termText: {
    flex: 1,
    fontSize: scaleh(12),
    color: '#1a1a1a',
    lineHeight: scalev(18),
  },
  proceedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scalev(18),
    borderTopLeftRadius: scaleh(15),
    borderTopRightRadius: scaleh(15),
  },
  proceedButtonText: {
    color: AppTheme.colors.white,
    fontSize: scaleh(18),
    fontWeight: '600',
    marginRight: scaleh(10),
  },
});

export default GiftBoxScreen;
