import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../../components/Header';
import RazorpayModal from './RazorpayModal';
import PayLaterOtpModal from './PayLaterOtpModal';
import ExitConfirmationModal from './ExitConfirmationModal';
import { AppTheme, scaleh, scalev } from '../../../constants/AppTheme';

const PaymentMethodsScreen = ({ navigation }) => {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [isPayLaterOtpVisible, setIsPayLaterOtpVisible] = useState(false);
  const [isExitModalVisible, setIsExitModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>

        {/* Header */}
        <Header
          onBackPress={() => navigation.navigate('Cart')}
          rightComponent={
            <View style={styles.headerPriceContainer}>
              <Text style={styles.headerPrice}>₹699</Text>
              <Text style={styles.headerOriginalPrice}>₹899</Text>
            </View>
          }
        />
        <View style={styles.separator} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

          {/* Delivery Location Banner */}
          <View style={styles.locationHeader}>
            <Icon name="map-pin" size={scaleh(16)} color="#1a1a1a" />
            <View style={styles.locationTextWrapper}>
              <Text style={styles.deliverToText}>Deliver to 451420</Text>
              <Text style={styles.locationDescText} numberOfLines={1}>Ayushi Sinha - Ibus stop, Indore...</Text>
            </View>
            <Icon name="chevron-down" size={scaleh(16)} color="#1a1a1a" style={{ marginRight: scaleh(10) }} />
            <TouchableOpacity>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>

          {/* Discount Banner */}
          <LinearGradient
            colors={[AppTheme.colors.wishlistGradientStart, AppTheme.colors.wishlistGradientEnd]}
            style={styles.discountBanner}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.discountBannerText}>Hooray!! You have unlocked Extra 5% OFF</Text>
          </LinearGradient>

          {/* Order Summary & Shipping Accordions */}
          <View style={styles.accordionsSection}>
            <View style={styles.accordionContainer}>
              <TouchableOpacity
                style={styles.accordionHeader}
                activeOpacity={0.8}
                onPress={() => setIsSummaryOpen(!isSummaryOpen)}
              >
                <View style={styles.summaryLeft}>
                  <Icon name="shopping-cart" size={scaleh(20)} color="#1a1a1a" style={styles.summaryIcon} />
                  <Text style={styles.summaryTitle}>Order Summary</Text>
                </View>
                <View style={styles.summaryRight}>
                  <Text style={styles.summaryValue}>1 item</Text>
                  <Icon name={isSummaryOpen ? "chevron-up" : "chevron-down"} size={scaleh(20)} color="#1a1a1a" style={{ marginLeft: scaleh(5) }} />
                </View>
              </TouchableOpacity>

              {isSummaryOpen && (
                <View style={styles.summaryExpandedContent}>
                  <View style={styles.productRow}>
                    <View style={styles.productImageWrapper}>
                      <Image source={require('../../../images/bgImages/orange.webp')} style={[StyleSheet.absoluteFill, styles.bgImgOverride]} resizeMode="cover" />
                      <Image source={require('../../../images/bgImages/productImg.webp')} style={styles.productImg} resizeMode="contain" />
                    </View>
                    <View style={styles.productDetails}>
                      <Text style={styles.productTitle} numberOfLines={2}>Vitamin C + E Sunscreen SPF 50 PA++++ with Ne..</Text>
                      <Text style={styles.productSize}>Size: 80g</Text>
                      <Text style={styles.productDelivery}>Delivery by Thu, 9 Jul</Text>
                      <View style={styles.productPriceRow}>
                        <Text style={styles.productPrice}>₹699</Text>
                        <Text style={styles.productOriginalPrice}>₹899</Text>
                      </View>
                    </View>
                    <View style={styles.productActions}>
                      <TouchableOpacity style={styles.deleteBtn}>
                        <Icon name="trash-2" size={scaleh(16)} color="#1a1a1a" />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>1</Text>
                      <TouchableOpacity style={styles.addBtn}>
                        <Icon name="plus" size={scaleh(16)} color={AppTheme.colors.primary} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.priceBreakdown}>
                    <View style={styles.priceRowItem}>
                      <Text style={styles.priceRowLabel}>Bag Total (1 item)</Text>
                      <Text style={styles.priceRowValue}>₹1099</Text>
                    </View>
                    <View style={styles.priceRowItem}>
                      <Text style={styles.priceRowLabel}>Coupan Discount</Text>
                      <Text style={[styles.priceRowValue, { color: AppTheme.colors.success }]}>- ₹110</Text>
                    </View>
                    <View style={styles.priceRowItem}>
                      <Text style={styles.priceRowLabel}>Shipping & Platform Fee</Text>
                      <Text style={styles.priceRowValue}>FREE</Text>
                    </View>

                    <View style={[styles.priceRowItem, { marginTop: scalev(15) }]}>
                      <Text style={styles.priceRowLabel}>You pay</Text>
                      <Text style={[styles.priceRowValue, { fontWeight: '700' }]}>₹994</Text>
                    </View>
                  </View>
                </View>
              )}
            </View>

            <View style={styles.accordionContainer}>
              <TouchableOpacity
                style={styles.accordionHeader}
                activeOpacity={0.8}
                onPress={() => setIsShippingOpen(!isShippingOpen)}
              >
                <View style={styles.summaryLeft}>
                  <Icon name="truck" size={scaleh(20)} color="#1a1a1a" style={styles.summaryIcon} />
                  <Text style={styles.summaryTitle}>Shipping</Text>
                </View>
                <View style={styles.summaryRight}>
                  <Text style={[styles.summaryValue, { color: AppTheme.colors.success }]}>FREE</Text>
                  <Icon name={isShippingOpen ? "chevron-up" : "chevron-down"} size={scaleh(20)} color="#1a1a1a" style={{ marginLeft: scaleh(5) }} />
                </View>
              </TouchableOpacity>

              {isShippingOpen && (
                <View style={styles.shippingExpandedContent}>
                  <View style={styles.shippingOptionCard}>
                    <View style={styles.shippingRadioCircleSelected} />
                    <View style={styles.shippingDetails}>
                      <Text style={styles.shippingRateText}>Standard Shipping Rate</Text>
                      <View style={styles.codAvailableRow}>
                        <Icon name="box" size={scaleh(12)} color={AppTheme.colors.success} style={{ marginRight: scaleh(5) }} />
                        <Text style={styles.codAvailableText}>COD available</Text>
                      </View>
                    </View>
                    <Text style={styles.shippingFreeText}>FREE</Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Payment Methods Section */}
          <Text style={styles.sectionTitle}>Payment Methods</Text>

          {/* 1. UPI Card */}
          <TouchableOpacity style={styles.paymentCard} activeOpacity={0.8} onPress={() => setIsRazorpayOpen(true)}>
            <View style={styles.paymentCardTop}>
              <View style={styles.paymentCardLeft}>
                <View style={styles.upiIconPlaceholder}>
                  {/* Simple triangle shapes to mimic UPI logo */}
                  <View style={[styles.triangle, styles.triangleGreen]} />
                  <View style={[styles.triangle, styles.triangleOrange]} />
                </View>
                <View>
                  <Text style={styles.paymentTitle}>UPI</Text>
                  <View style={styles.discountPill}>
                    <Icon name="percent" size={scaleh(10)} color={AppTheme.colors.white} />
                    <Text style={styles.discountPillText}>Get ₹25.26 OFF</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.paymentPrice}>₹699</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.upiAppsContainer}>
              {['PhonePe', 'GPay', 'Paytm', 'Cred', 'Others'].map((app, index) => (
                <TouchableOpacity key={index} style={styles.upiAppBtn}>
                  <Text style={styles.upiAppText}>{app}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </TouchableOpacity>

          {/* 2. Cash on Delivery */}
          <TouchableOpacity style={styles.paymentCard} activeOpacity={0.8}>
            <View style={styles.paymentCardTop}>
              <View style={styles.paymentCardLeft}>
                <View>
                  <Text style={styles.paymentSubtitle}>Paying via cash</Text>
                  <Text style={styles.paymentTitle}>Cash on Delivery</Text>
                </View>
              </View>
              <View style={styles.paymentRightRow}>
                <Text style={styles.paymentPrice}>₹699</Text>
                <Icon name="chevron-right" size={scaleh(20)} color="#1a1a1a" style={{ marginLeft: scaleh(5) }} />
              </View>
            </View>
          </TouchableOpacity>

          {/* 3. Debit/Credit cards */}
          <TouchableOpacity style={styles.paymentCard} activeOpacity={0.8} onPress={() => navigation.navigate('CardPayment')}>
            <View style={styles.paymentCardTop}>
              <View style={styles.paymentCardLeft}>
                <View>
                  <Text style={styles.paymentSubtitle}>Visa, Mastercard, RuPay & more</Text>
                  <Text style={styles.paymentTitle}>Debit/Credit cards</Text>
                  <View style={styles.discountPill}>
                    <Icon name="percent" size={scaleh(10)} color={AppTheme.colors.white} />
                    <Text style={styles.discountPillText}>Get ₹25.28 OFF</Text>
                  </View>
                </View>
              </View>
              <View style={styles.paymentRightRow}>
                <Text style={styles.paymentPrice}>₹699</Text>
                <Icon name="chevron-right" size={scaleh(20)} color="#1a1a1a" style={{ marginLeft: scaleh(5) }} />
              </View>
            </View>
          </TouchableOpacity>

          {/* 4. Wallets */}
          <TouchableOpacity style={styles.paymentCard} activeOpacity={0.8} onPress={() => navigation.navigate('WalletPayment')}>
            <View style={styles.paymentCardTop}>
              <View style={styles.paymentCardLeft}>
                <View>
                  <Text style={styles.paymentSubtitle}>Amazon Pay, PhonePe, Mobikwik & more</Text>
                  <Text style={styles.paymentTitle}>Wallets</Text>
                  <View style={styles.discountPill}>
                    <Icon name="percent" size={scaleh(10)} color={AppTheme.colors.white} />
                    <Text style={styles.discountPillText}>Get ₹25.26 OFF</Text>
                  </View>
                </View>
              </View>
              <View style={styles.paymentRightRow}>
                <Text style={styles.paymentPrice}>₹699</Text>
                <Icon name="chevron-right" size={scaleh(20)} color="#1a1a1a" style={{ marginLeft: scaleh(5) }} />
              </View>
            </View>
          </TouchableOpacity>

          {/* 5. Netbanking */}
          <TouchableOpacity style={styles.paymentCard} activeOpacity={0.8} onPress={() => navigation.navigate('Netbanking')}>
            <View style={styles.paymentCardTop}>
              <View style={styles.paymentCardLeft}>
                <View>
                  <Text style={styles.paymentSubtitle}>Select from a list of banks</Text>
                  <Text style={styles.paymentTitle}>Netbanking</Text>
                  <View style={styles.discountPill}>
                    <Icon name="percent" size={scaleh(10)} color={AppTheme.colors.white} />
                    <Text style={styles.discountPillText}>Get ₹25.26 OFF</Text>
                  </View>
                </View>
              </View>
              <View style={styles.paymentRightRow}>
                <Text style={styles.paymentPrice}>₹699</Text>
                <Icon name="chevron-right" size={scaleh(20)} color="#1a1a1a" style={{ marginLeft: scaleh(5) }} />
              </View>
            </View>
          </TouchableOpacity>

          {/* 6. Pay Later */}
          <TouchableOpacity style={styles.paymentCard} activeOpacity={0.8} onPress={() => setIsPayLaterOtpVisible(true)}>
            <View style={styles.paymentCardTop}>
              <View style={styles.paymentCardLeft}>
                <View>
                  <Text style={styles.paymentSubtitle}>LazyPay, EMIs</Text>
                  <Text style={styles.paymentTitle}>Pay Later</Text>
                  <View style={styles.discountPill}>
                    <Icon name="percent" size={scaleh(10)} color={AppTheme.colors.white} />
                    <Text style={styles.discountPillText}>Get ₹25.26 OFF</Text>
                  </View>
                </View>
              </View>
              <View style={styles.paymentRightRow}>
                <Text style={styles.paymentPrice}>₹699</Text>
                <Icon name="chevron-right" size={scaleh(20)} color="#1a1a1a" style={{ marginLeft: scaleh(5) }} />
              </View>
            </View>
          </TouchableOpacity>

        </ScrollView>

        <RazorpayModal visible={isRazorpayOpen} onClose={() => setIsRazorpayOpen(false)} />
        <PayLaterOtpModal
          visible={isPayLaterOtpVisible}
          onClose={() => setIsPayLaterOtpVisible(false)}
          onContinue={() => {
            setIsPayLaterOtpVisible(false);
            setTimeout(() => setIsExitModalVisible(true), 300);
          }}
        />

        <ExitConfirmationModal
          visible={isExitModalVisible}
          onClose={() => setIsExitModalVisible(false)}
          onContinuePayment={() => setIsExitModalVisible(false)}
          onExit={() => {
            setIsExitModalVisible(false);
            // Optionally navigate back or out: navigation.goBack();
          }}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9', // slightly off-white backgorund
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleh(15),
    paddingTop: scalev(15),
    paddingBottom: scalev(15),
    marginTop: scalev(35),
    backgroundColor: AppTheme.colors.white,
  },
  backButton: {
    padding: scaleh(5),
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: scalev(40),
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
    width: scaleh(15),
    height: scalev(15),
  },
  headerPriceContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  headerPrice: {
    fontSize: scaleh(16),
    fontWeight: '700',
    color: '#000',
  },
  headerOriginalPrice: {
    fontSize: scaleh(12),
    color: '#999',
    textDecorationLine: 'line-through',
  },
  separator: {
    height: 1,
    backgroundColor: '#EBEBEB',
    width: '100%',
  },
  scrollContent: {
    paddingBottom: scalev(40),
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    paddingVertical: scalev(15),
    backgroundColor: AppTheme.colors.white,
  },
  locationTextWrapper: {
    flex: 1,
    marginLeft: scaleh(10),
  },
  deliverToText: {
    fontSize: scaleh(12),
    color: '#1a1a1a',
  },
  locationDescText: {
    fontSize: scaleh(12),
    color: '#666',
  },
  changeText: {
    fontSize: scaleh(12),
    fontWeight: '700',
    color: AppTheme.colors.primary,
  },
  discountBanner: {
    paddingVertical: scalev(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scalev(20),
  },
  discountBannerText: {
    fontSize: scaleh(12),
    fontWeight: '700',
    color: '#000',
  },
  accordionsSection: {
    paddingHorizontal: scaleh(20),
    marginBottom: scalev(20),
  },
  accordionContainer: {
    backgroundColor: AppTheme.colors.white,
    borderRadius: scaleh(20),
    marginBottom: scalev(15),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleh(15),
    paddingVertical: scalev(20),
  },
  summaryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryIcon: {
    marginRight: scaleh(15),
  },
  summaryTitle: {
    fontSize: scaleh(14),
    color: '#000',
  },
  summaryRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: scaleh(14),
    color: '#666',
  },
  sectionTitle: {
    fontSize: scaleh(16),
    fontWeight: '700',
    color: '#000',
    marginHorizontal: scaleh(20),
    marginBottom: scalev(15),
  },
  paymentCard: {
    backgroundColor: AppTheme.colors.white,
    marginHorizontal: scaleh(20),
    borderRadius: scaleh(20),
    paddingVertical: scalev(20),
    paddingHorizontal: scaleh(20),
    marginBottom: scalev(15),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  paymentCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  paymentCardLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  paymentRightRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentSubtitle: {
    fontSize: scaleh(10),
    color: '#999',
    marginBottom: scalev(4),
  },
  paymentTitle: {
    fontSize: scaleh(16),
    fontWeight: '700',
    color: '#000',
    marginBottom: scalev(6),
  },
  paymentPrice: {
    fontSize: scaleh(16),
    fontWeight: '500',
    color: '#000',
  },
  discountPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppTheme.colors.success,
    paddingHorizontal: scaleh(8),
    paddingVertical: scalev(4),
    borderRadius: scaleh(6),
    alignSelf: 'flex-start',
  },
  discountPillText: {
    color: AppTheme.colors.white,
    fontSize: scaleh(10),
    fontWeight: '600',
    marginLeft: scaleh(4),
  },
  upiIconPlaceholder: {
    width: scaleh(24),
    height: scaleh(24),
    marginRight: scaleh(15),
    marginTop: scalev(5),
    position: 'relative',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: scaleh(6),
    borderRightWidth: scaleh(6),
    borderBottomWidth: scaleh(12),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    position: 'absolute',
  },
  triangleGreen: {
    borderBottomColor: AppTheme.colors.success,
    top: 0,
    left: scaleh(6),
    transform: [{ rotate: '90deg' }],
  },
  triangleOrange: {
    borderBottomColor: '#FF8C00', // orange
    bottom: 0,
    left: 0,
    transform: [{ rotate: '-90deg' }],
  },
  upiAppsContainer: {
    marginTop: scalev(20),
    paddingRight: scaleh(10),
  },
  upiAppBtn: {
    width: scaleh(60),
    height: scaleh(60),
    borderRadius: scaleh(15),
    borderWidth: 1,
    borderColor: '#EBEBEB',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: scalev(10),
    marginRight: scaleh(10),
    backgroundColor: AppTheme.colors.white,
  },
  upiAppText: {
    fontSize: scaleh(10),
    color: '#666',
  },
  summaryExpandedContent: {
    paddingHorizontal: scaleh(15),
    paddingBottom: scalev(20),
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: scalev(15),
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    marginBottom: scalev(15),
  },
  productImageWrapper: {
    width: scaleh(70),
    height: scaleh(70),
    borderRadius: scaleh(10),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleh(10),
  },
  bgImgOverride: {
    opacity: 0.2,
  },
  productImg: {
    width: '80%',
    height: '80%',
  },
  productDetails: {
    flex: 1,
    paddingRight: scaleh(10),
  },
  productTitle: {
    fontSize: scaleh(12),
    color: '#1a1a1a',
    marginBottom: scalev(4),
  },
  productSize: {
    fontSize: scaleh(10),
    color: '#666',
    marginBottom: scalev(2),
  },
  productDelivery: {
    fontSize: scaleh(10),
    color: '#1a1a1a',
    marginBottom: scalev(6),
  },
  productPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: scaleh(14),
    fontWeight: '700',
    color: '#000',
    marginRight: scaleh(5),
  },
  productOriginalPrice: {
    fontSize: scaleh(12),
    color: '#999',
    textDecorationLine: 'line-through',
  },
  productActions: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: scaleh(70),
  },
  deleteBtn: {
    width: scaleh(24),
    height: scaleh(24),
    borderRadius: scaleh(6),
    borderWidth: 1,
    borderColor: '#EBEBEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: scaleh(14),
    fontWeight: '600',
    color: '#000',
  },
  addBtn: {
    width: scaleh(24),
    height: scaleh(24),
    borderRadius: scaleh(12),
    borderWidth: 1,
    borderColor: AppTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceBreakdown: {
    paddingHorizontal: scaleh(5),
  },
  priceRowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scalev(8),
  },
  priceRowLabel: {
    fontSize: scaleh(12),
    color: '#1a1a1a',
  },
  priceRowValue: {
    fontSize: scaleh(12),
    color: '#1a1a1a',
  },
  shippingExpandedContent: {
    paddingHorizontal: scaleh(15),
    paddingBottom: scalev(15),
  },
  shippingOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppTheme.colors.primary,
    borderRadius: scaleh(10),
    paddingHorizontal: scaleh(15),
    paddingVertical: scalev(15),
  },
  shippingRadioCircleSelected: {
    width: scaleh(20),
    height: scaleh(20),
    borderRadius: scaleh(10),
    backgroundColor: AppTheme.colors.primary,
    marginRight: scaleh(15),
  },
  shippingDetails: {
    flex: 1,
  },
  shippingRateText: {
    fontSize: scaleh(14),
    color: '#1a1a1a',
    marginBottom: scalev(2),
  },
  codAvailableRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codAvailableText: {
    fontSize: scaleh(10),
    color: AppTheme.colors.success,
  },
  shippingFreeText: {
    fontSize: scaleh(14),
    color: AppTheme.colors.success,
    fontWeight: '600',
  }
});

export default PaymentMethodsScreen;
