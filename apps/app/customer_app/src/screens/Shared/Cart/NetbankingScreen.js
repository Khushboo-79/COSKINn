import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import Header from '../../../components/Header';
import { AppTheme, scaleh, scalev } from '../../../constants/AppTheme';
import EditContactModal from './EditContactModal';
import PriceSummaryModal from './PriceSummaryModal';
import RazorpayModal from './RazorpayModal';

const NetbankingScreen = ({ navigation }) => {
  const activeDomain = useSelector(state => state.app?.activeDomain || 'skincare');
  const isCosmetics = activeDomain === 'cosmetics';

  const [isEditContactModalVisible, setIsEditContactModalVisible] = useState(false);
  const [isPriceSummaryModalVisible, setIsPriceSummaryModalVisible] = useState(false);
  const [isRazorpayModalVisible, setIsRazorpayModalVisible] = useState(false);

  const suggestedBanks = [
    { id: '1', name: 'State Bank of India' },
    { id: '2', name: 'ICICI Bank' },
    { id: '3', name: 'Kotak Mahindra Bank' },
    { id: '4', name: 'Axis Bank' },
  ];

  const allBanks = [
    { id: '1', name: 'Central Bank' },
    { id: '2', name: 'Canara Bank' },
    { id: '3', name: 'DCB Bank' },
    { id: '4', name: 'IDBI Bank' },
    { id: '5', name: 'Indusind Bank' },
    { id: '6', name: 'Karnataka Bank' },
    { id: '7', name: 'Bank of Maharashtra' },
    { id: '8', name: 'Punjab & Sind Bank' },
    { id: '9', name: 'RBL Bank' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isCosmetics ? '#FFFFFF' : AppTheme.colors.white }]}>
      {isCosmetics && (
        <>
          <Image
            source={require('../../../images/makeup/CosmeticBackImg.webp')}
            style={[StyleSheet.absoluteFill, { width: '100%', height: '100%', opacity: 0.3 }]}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['#FF006915', '#FF006905']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        </>
      )}
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
            <Text style={styles.sectionTitle}>Netbanking</Text>

            {/* Search Input */}
            <View style={styles.searchContainer}>
              <Icon name="search" size={scaleh(18)} color="#666" style={styles.searchIcon} />
              <TextInput 
                style={styles.searchInput}
                placeholder="Search for Banks"
                placeholderTextColor="#999"
              />
            </View>

            <Text style={styles.subTitle}>Suggested Banks</Text>
            
            {/* Suggested Banks List */}
            <View style={styles.listContainer}>
              {suggestedBanks.map((bank, index) => (
                <TouchableOpacity 
                  key={bank.id} 
                  style={[styles.listItem, index === suggestedBanks.length - 1 && { borderBottomWidth: 0 }]}
                  activeOpacity={0.7}
                >
                  <Text style={styles.listItemText}>{bank.name}</Text>
                  <Icon name="chevron-right" size={scaleh(20)} color="#333" />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.subTitle, { marginTop: scalev(10) }]}>All Banks</Text>
            
            {/* All Banks List */}
            <View style={styles.listContainer}>
              {allBanks.map((bank, index) => (
                <TouchableOpacity 
                  key={bank.id} 
                  style={[styles.listItem, index === allBanks.length - 1 && { borderBottomWidth: 0 }]}
                  activeOpacity={0.7}
                >
                  <Text style={styles.listItemText}>{bank.name}</Text>
                  <Icon name="chevron-right" size={scaleh(20)} color="#333" />
                </TouchableOpacity>
              ))}
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
          <TouchableOpacity style={[styles.continueBtn, isCosmetics && { backgroundColor: '#FFC2D1' }]} activeOpacity={0.8} onPress={() => setIsRazorpayModalVisible(true)}>
            <Text style={[styles.continueBtnText, isCosmetics && { color: '#000000' }]}>Continue</Text>
          </TouchableOpacity>
        </View>

        {/* Modals */}
        <EditContactModal 
          visible={isEditContactModalVisible} 
          onClose={() => setIsEditContactModalVisible(false)} 
        />
        <PriceSummaryModal 
          visible={isPriceSummaryModalVisible} 
          onClose={() => setIsPriceSummaryModalVisible(false)} 
        />
        <RazorpayModal
          visible={isRazorpayModalVisible}
          onClose={() => setIsRazorpayModalVisible(false)}
        />

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
  scrollContent: {
    paddingBottom: scalev(100),
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
    marginBottom: scalev(15),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF3366', // Pinkish border matching design
    borderRadius: scaleh(8),
    height: scalev(45),
    paddingHorizontal: scaleh(15),
    marginBottom: scalev(25),
  },
  searchIcon: {
    marginRight: scaleh(10),
  },
  searchInput: {
    flex: 1,
    fontSize: scaleh(14),
    color: '#000',
    padding: 0,
  },
  subTitle: {
    fontSize: scaleh(12),
    color: '#333',
    marginBottom: scalev(10),
  },
  listContainer: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: scaleh(10),
    marginBottom: scalev(20),
    overflow: 'hidden',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleh(15),
    paddingVertical: scalev(18),
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  listItemText: {
    fontSize: scaleh(14),
    color: '#000',
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

export default NetbankingScreen;
