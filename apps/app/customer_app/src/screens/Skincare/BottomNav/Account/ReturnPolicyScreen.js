import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { scaleh, scalev } from '../../../../constants/AppTheme';

const ReturnPolicyScreen = () => {
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
          <Text style={styles.headerTitle}>Return Policy</Text>
          <View style={{ width: scaleh(24) }} />
        </View>
        <View style={styles.headerDivider} />

        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.mainHeading}>Shipping & Returns</Text>
          
          <Text style={styles.paragraph}>
            COSKINn delivers products to selected locations across India through trusted 
            courier and delivery partners. Delivery availability may depend on your pin 
            code, product type, courier serviceability, payment method, and order value.
          </Text>

          <Text style={styles.paragraph}>
            After placing an order, you will receive order confirmation through SMS, email, 
            WhatsApp, or app notification. Once your order is shipped, tracking details 
            may be shared with you. Delivery usually takes [3–7 business days], but 
            the timeline may vary due to courier delays, weather conditions, public 
            holidays, remote locations, incorrect address, high order volume, or 
            circumstances beyond our control.
          </Text>

          <Text style={styles.paragraph}>
            Customers must provide a complete and accurate delivery address, mobile 
            number, and pin code. COSKINn will not be responsible for failed delivery due to 
            incorrect address, unavailable customer, locked premises, 
            unreachable phone number, or refusal to accept the order. If the order returns 
            to us due to customer-related issues, re-shipping charges may apply. Due to 
            hygiene and safety reasons, skincare, makeup, cosmetics, and personal care 
            products are strictly non-returnable and non-refundable unless you receive a 
            damaged, defective, or incorrect item.
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

export default ReturnPolicyScreen;
