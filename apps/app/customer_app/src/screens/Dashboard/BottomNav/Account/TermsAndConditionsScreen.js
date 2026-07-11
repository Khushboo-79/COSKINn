import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { scaleh, scalev } from '../../../../constants/AppTheme';

const TermsAndConditionsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-left" size={scaleh(24)} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Terms & Conditions</Text>
          <View style={{ width: scaleh(24) }} />
        </View>
        <View style={styles.headerDivider} />

        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.mainHeading}>Terms & Conditions</Text>
          
          <Text style={styles.paragraph}>
            COSKINn offers skincare, makeup, beauty, and personal care products. 
            Product images, shades, textures, packaging, and results may slightly vary 
            from the actual product due to lighting, screen settings, batch differences, or 
            individual skin type. Our products are cosmetic products and are not intended 
            to diagnose, treat, cure, or prevent any medical condition.
          </Text>

          <Text style={styles.paragraph}>
            Before using any skincare or makeup product, please read the ingredients, 
            usage instructions, warnings, expiry date, and storage instructions carefully.
          </Text>

          <Text style={styles.paragraph}>
            We recommend doing a patch test before using any new product, 
            especially if you have sensitive skin, allergies, acne-prone skin, or any 
            existing skin condition. Stop using the product immediately if irritation, 
            redness, itching, burning, swelling, rash, or allergy occurs, and consult a 
            dermatologist if needed. COSKINn will not be responsible for reactions caused 
            by misuse, overuse, incorrect application, known allergies, or 
            individual skin sensitivity.
          </Text>

          <Text style={styles.paragraph}>
            You agree to provide true and complete information while creating an account, 
            and to update your information promptly. You are solely responsible for maintaining 
            the confidentiality of your account password and for all activities that occur under your account.
          </Text>

          <Text style={styles.paragraph}>
            COSKINn reserves the right to modify these terms and conditions at any time 
            without prior notice. Your continued use of the app signifies your acceptance 
            of the updated terms.
          </Text>
          
        </ScrollView>
      </SafeAreaView>
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
    backgroundColor: '#FFFFFF',
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scaleh(25),
    paddingTop: scalev(25),
    paddingBottom: scalev(50),
  },
  mainHeading: {
    fontSize: scaleh(18),
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: scalev(25),
  },
  paragraph: {
    fontSize: scaleh(14),
    color: '#333333',
    lineHeight: scalev(22),
    marginBottom: scalev(20),
    fontWeight: '400',
  },
});

export default TermsAndConditionsScreen;
