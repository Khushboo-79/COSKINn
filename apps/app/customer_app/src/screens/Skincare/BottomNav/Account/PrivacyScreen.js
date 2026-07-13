import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { scaleh, scalev } from '../../../../constants/AppTheme';

const PrivacyScreen = () => {
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
          <Text style={styles.headerTitle}>Privacy</Text>
          <View style={{ width: scaleh(24) }} />
        </View>
        <View style={styles.headerDivider} />

        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.mainHeading}>COSKINn Privacy Policy</Text>
          
          <Text style={styles.paragraph}>
            When you use COSKINn, we may collect information such as your name, mobile 
            number, email address, delivery address, billing details, order details, 
            payment status, account login details, product preferences, skin concern 
            preferences, reviews, feedback, and customer support messages.
          </Text>

          <Text style={styles.paragraph}>
            We may also collect basic technical information such as device details, IP 
            address, browser type, app usage, cookies, location permission if allowed 
            by you, and transaction activity to improve our services and prevent fraud.
          </Text>

          <Text style={styles.paragraph}>
            COSKINn may use your information to create and manage your account, 
            process orders, confirm payments, deliver products, send order updates, 
            provide customer support, handle returns and refunds, improve our 
            website/app, personalize product recommendations, share offers and 
            updates, prevent fraud, and comply with legal requirements.
          </Text>

          <Text style={styles.paragraph}>
            We may contact you through SMS, email, phone call, WhatsApp, push 
            notification, or other communication channels for order updates, support, 
            promotional offers, and service-related information.
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

export default PrivacyScreen;
