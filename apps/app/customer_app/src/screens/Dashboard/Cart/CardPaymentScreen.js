import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../../components/Header';
import { AppTheme, scaleh, scalev } from '../../../constants/AppTheme';
import EditContactModal from './EditContactModal';
import PriceSummaryModal from './PriceSummaryModal';

const CardPaymentScreen = ({ navigation }) => {
  const [isEditContactModalVisible, setIsEditContactModalVisible] = useState(false);
  const [isPriceSummaryModalVisible, setIsPriceSummaryModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} bounces={false}>
          
          <LinearGradient 
            colors={['#FF007A', '#FF9966']} 
            style={styles.gradientTopSection}
          >
            <Header transparent={true} onBackPress={() => navigation.goBack()} />

            <View style={styles.summaryCardWrapper}>
              {/* Price Summary Card */}
              <View style={styles.priceSummaryCard}>
                <Text style={styles.priceSummaryTitle}>Price Summary</Text>
                <Text style={styles.priceSummaryAmount}>₹480.46</Text>
              </View>

              {/* User Card */}
              <TouchableOpacity style={styles.userCard} activeOpacity={0.8} onPress={() => setIsEditContactModalVisible(true)}>
                <View style={styles.userLeft}>
                  <Icon name="user" size={scaleh(16)} color="#FF007A" style={{marginRight: scaleh(10)}} />
                  <Text style={styles.userText}>Using as +91 1234567890</Text>
                </View>
                <Icon name="chevron-right" size={scaleh(16)} color="#FF007A" />
              </TouchableOpacity>
            </View>
          </LinearGradient>

          <View style={styles.whiteBottomSection}>
            <Text style={styles.sectionTitle}>Card</Text>

            <Text style={styles.subTitle}>Available Offers</Text>
            <View style={styles.offersRow}>
              <View style={styles.offerPill} />
              <View style={styles.offerPill} />
            </View>

            <Text style={styles.subTitle}>Add a new card</Text>
            
            {/* Card Input Form */}
            <View style={styles.formContainer}>
              <View style={styles.inputRowSingle}>
                <TextInput 
                  style={styles.textInput}
                  placeholder="Card Number"
                  placeholderTextColor="#999"
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.inputRowDouble}>
                <View style={styles.inputHalfLeft}>
                  <TextInput 
                    style={styles.textInput}
                    placeholder="MM/YY"
                    placeholderTextColor="#999"
                  />
                </View>
                <View style={styles.inputHalfRight}>
                  <TextInput 
                    style={styles.textInput}
                    placeholder="CVV"
                    placeholderTextColor="#999"
                    keyboardType="number-pad"
                    secureTextEntry
                  />
                </View>
              </View>
            </View>

            {/* Checkbox */}
            <View style={styles.checkboxRow}>
              <TouchableOpacity style={styles.checkbox}>
                {/* Empty checkbox */}
              </TouchableOpacity>
              <Text style={styles.checkboxText}>Save this card as per RBI guidelines</Text>
            </View>

            {/* Secured By */}
            <View style={styles.securedWrapper}>
              <View style={styles.securedByContainer}>
                <Text style={styles.securedText}>Secured By</Text>
                {/* Razorpay Icon Mimic */}
                <View style={styles.razorpayIconPlaceholder}>
                  <View style={styles.whiteTriangle} />
                  <View style={styles.blueBar} />
                </View>
                <Text style={styles.razorpayText}>Razorpay</Text>
              </View>
              <Text style={styles.termsText}>Account & Terms</Text>
            </View>

          </View>
        </ScrollView>

        {/* Sticky Bottom Bar */}
        <View style={styles.stickyBottomBar}>
          <TouchableOpacity 
            style={styles.bottomBarLeft} 
            activeOpacity={0.8} 
            onPress={() => setIsPriceSummaryModalVisible(true)}
          >
            <Text style={styles.bottomTotal}>₹699</Text>
            <Text style={styles.bottomDetails}>View Details ^</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continueBtn}>
            <Text style={styles.continueBtnText}>Continue</Text>
          </TouchableOpacity>
        </View>

        {/* Edit Contact Modal */}
        <EditContactModal 
          visible={isEditContactModalVisible} 
          onClose={() => setIsEditContactModalVisible(false)} 
        />

        {/* Price Summary Modal */}
        <PriceSummaryModal 
          visible={isPriceSummaryModalVisible} 
          onClose={() => setIsPriceSummaryModalVisible(false)} 
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // To match the bottom section
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: scalev(100), // padding for sticky bottom bar
  },
  gradientTopSection: {
    paddingBottom: scalev(30),
  },
  summaryCardWrapper: {
    paddingHorizontal: scaleh(20),
    marginTop: scalev(10),
  },
  priceSummaryCard: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: scaleh(10),
    paddingHorizontal: scaleh(15),
    paddingVertical: scalev(20),
    marginBottom: scalev(15),
  },
  priceSummaryTitle: {
    fontSize: scaleh(12),
    color: '#333',
    marginBottom: scalev(10),
  },
  priceSummaryAmount: {
    fontSize: scaleh(16),
    fontWeight: '700',
    color: '#000',
  },
  userCard: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: scaleh(10),
    paddingHorizontal: scaleh(15),
    paddingVertical: scalev(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userText: {
    fontSize: scaleh(12),
    color: '#333',
  },
  whiteBottomSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scaleh(20),
    paddingTop: scalev(20),
  },
  sectionTitle: {
    fontSize: scaleh(16),
    fontWeight: '700',
    color: '#000',
    marginBottom: scalev(20),
  },
  subTitle: {
    fontSize: scaleh(12),
    color: '#333',
    marginBottom: scalev(10),
  },
  offersRow: {
    flexDirection: 'row',
    marginBottom: scalev(25),
  },
  offerPill: {
    width: scaleh(100),
    height: scaleh(30),
    borderRadius: scaleh(15),
    backgroundColor: '#FFE6EF',
    marginRight: scaleh(15),
  },
  formContainer: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: scaleh(10),
    marginBottom: scalev(20),
    overflow: 'hidden',
  },
  inputRowSingle: {
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    height: scalev(50),
    justifyContent: 'center',
    paddingHorizontal: scaleh(15),
  },
  inputRowDouble: {
    flexDirection: 'row',
    height: scalev(50),
  },
  inputHalfLeft: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#999',
    justifyContent: 'center',
    paddingHorizontal: scaleh(15),
  },
  inputHalfRight: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: scaleh(15),
  },
  textInput: {
    fontSize: scaleh(12),
    color: '#333',
    padding: 0,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scalev(40),
  },
  checkbox: {
    width: scaleh(18),
    height: scaleh(18),
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: scaleh(4),
    marginRight: scaleh(10),
  },
  checkboxText: {
    fontSize: scaleh(12),
    color: '#333',
  },
  securedWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  securedByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  termsText: {
    fontSize: scaleh(12),
    color: '#666',
  },
  stickyBottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: AppTheme.colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    paddingVertical: scalev(15),
  },
  bottomBarLeft: {
    flexDirection: 'column',
  },
  bottomTotal: {
    fontSize: scaleh(16),
    fontWeight: '700',
    color: '#000',
  },
  bottomDetails: {
    fontSize: scaleh(10),
    color: '#666',
    marginTop: scalev(2),
  },
  continueBtn: {
    backgroundColor: AppTheme.colors.primary,
    paddingHorizontal: scaleh(40),
    paddingVertical: scalev(12),
    borderRadius: scaleh(10),
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: scaleh(14),
    fontWeight: '600',
  },
});

export default CardPaymentScreen;
