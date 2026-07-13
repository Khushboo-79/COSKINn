import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, LayoutAnimation, UIManager, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { scaleh, scalev } from '../../../../constants/AppTheme';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const FAQScreen = () => {
  const navigation = useNavigation();

  const [expandedId, setExpandedId] = useState('order-5');

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  const faqs = [
    {
      section: 'Order Support',
      items: [
        { id: 'order-1', question: 'How can I track my order?', answer: 'You can track your order in the Orders List section.' },
        { id: 'order-2', question: 'Can I change my shipping address after placing the order?', answer: 'Please contact support immediately to change your shipping address before the order is dispatched.' },
        { id: 'order-3', question: 'How long will it take for my order to arrive?', answer: 'Delivery usually takes 3-7 business days depending on your location.' },
        { id: 'order-4', question: 'Can I cancel or modify my order after placing it?', answer: 'Orders can only be cancelled or modified before they are shipped. Please contact support.' },
        { id: 'order-5', question: 'Haven’t received my order confirmation email, what should I do?', answer: 'Check your spam or promotions folder. If not found, share your registered email and phone via DM, email (support@coskinn.com), or Whatsapp (+91537387137), and we’ll help you.' },
      ]
    },
    {
      section: 'Payment Support',
      items: [
        { id: 'pay-1', question: 'What payment methods does COSKINn accept ?', answer: 'We accept Credit/Debit Cards, UPI, Net Banking, and Wallets.' },
        { id: 'pay-2', question: 'Is Cash on Delivery (COD) available?', answer: 'Yes, Cash on Delivery is available for selected pin codes.' },
        { id: 'pay-3', question: 'My payment failed. What should I do?', answer: 'If your payment fails, please try again using a different payment method or check your internet connection.' },
        { id: 'pay-4', question: 'Amount deducted but my order didn’t go through?', answer: 'Don’t worry! The deducted amount is usually refunded automatically within 3-5 business days by your bank.' },
        { id: 'pay-5', question: 'Is it safe to use my credit card on your website?', answer: 'Yes, all transactions are secured and encrypted. We do not store your credit card details.' },
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-left" size={scaleh(24)} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>FAQ</Text>
          <View style={{ width: scaleh(24) }} />
        </View>
        <View style={styles.headerDivider} />

        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.mainHeading}>Frequently Asked Questions</Text>
          
          {faqs.map((sectionData, index) => (
            <View key={index} style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>{sectionData.section}</Text>
              
              {sectionData.items.map((item) => {
                const isExpanded = expandedId === item.id;
                
                return (
                  <TouchableOpacity 
                    key={item.id} 
                    activeOpacity={0.9} 
                    onPress={() => toggleExpand(item.id)}
                    style={styles.faqCardWrapper}
                  >
                    <LinearGradient
                      colors={['#FF006926', '#FFD49826']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.faqGradientBg}
                    >
                      <View style={styles.faqQuestionRow}>
                        <Text style={styles.faqQuestionText}>{item.question}</Text>
                        <Icon name={isExpanded ? "minus" : "plus"} size={scaleh(18)} color="#333333" style={styles.faqIcon} />
                      </View>
                      
                      {isExpanded && (
                        <View style={styles.faqAnswerContainer}>
                          <Text style={styles.faqAnswerText}>{item.answer}</Text>
                        </View>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
          
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
    paddingHorizontal: scaleh(20),
    paddingTop: scalev(25),
    paddingBottom: scalev(50),
  },
  mainHeading: {
    fontSize: scaleh(18),
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: scalev(25),
  },
  sectionContainer: {
    marginBottom: scalev(10),
  },
  sectionTitle: {
    fontSize: scaleh(14),
    fontWeight: '500',
    color: '#333333',
    marginBottom: scalev(15),
    marginLeft: scaleh(5),
  },
  faqCardWrapper: {
    marginBottom: scalev(12),
    borderRadius: scaleh(10),
    overflow: 'hidden',
  },
  faqGradientBg: {
    paddingHorizontal: scaleh(15),
    paddingVertical: scalev(15),
    borderRadius: scaleh(10),
  },
  faqQuestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  faqQuestionText: {
    flex: 1,
    fontSize: scaleh(13),
    color: '#333333',
    fontWeight: '500',
    lineHeight: scalev(18),
    paddingRight: scaleh(10),
  },
  faqIcon: {
    marginTop: scalev(2),
  },
  faqAnswerContainer: {
    marginTop: scalev(15),
  },
  faqAnswerText: {
    fontSize: scaleh(11),
    color: '#4A4A4A',
    lineHeight: scalev(16),
  },
});

export default FAQScreen;
