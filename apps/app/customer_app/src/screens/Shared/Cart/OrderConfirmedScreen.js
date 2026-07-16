import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import Header from '../../../components/Header';
import { AppTheme, scaleh, scalev } from '../../../constants/AppTheme';

const OrderConfirmedScreen = ({ navigation }) => {
  const activeDomain = useSelector(state => state.app?.activeDomain || 'skincare');
  const isCosmetics = activeDomain === 'cosmetics';
  const primaryColor = isCosmetics ? AppTheme.colors.cosmeticsPrimary : AppTheme.colors.primary;

  return (
    <View style={[styles.container, { backgroundColor: isCosmetics ? '#FFFFFF' : AppTheme.colors.white }]}>
      {isCosmetics && (
        <Image
          source={require('../../../images/makeup/CosmeticBackImg.webp')}
          style={[StyleSheet.absoluteFill, { width: '100%', height: '100%', opacity: 0.2 }]}
          resizeMode="cover"
        />
      )}
      <SafeAreaView style={styles.safeArea}>

        {/* Standard Header (Top) */}
        <Header transparent={isCosmetics} onBackPress={() => navigation.goBack()} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

          {/* Success Banner Section */}
          <View style={styles.successSection}>
            <View style={styles.successIconCircle}>
              <Icon name="shopping-bag" size={scaleh(24)} color="#FFF" />
              <View style={styles.checkmarkBadge}>
                <Icon name="check" size={scaleh(10)} color="#FFF" />
              </View>
            </View>
            <Text style={styles.successTitle}>Your order is confirmed</Text>
            <Text style={styles.orderIdText}>ORDER ID #CSKN-12345678900 - 123456</Text>
          </View>

          {/* Delivering To Card */}
          <View style={[styles.deliveringCard, isCosmetics && { elevation: 0, shadowOpacity: 0, borderColor: primaryColor, backgroundColor: 'rgba(255, 255, 255, 0.7)' }]}>
            <Text style={styles.cardSubtitle}>Delivering To</Text>
            <Text style={styles.userName}>Ayushi Sinha - 1234567890</Text>
            <Text style={styles.addressText}>
              Cp, Noida, Delhi,160/2, AB Road, Ahilya Puri{'\n'}Rao, Mahu, Delhi - India
            </Text>
            <TouchableOpacity style={styles.editAddressBtn}>
              <Text style={[styles.editAddressText, isCosmetics && { color: primaryColor }]}>Edit Address</Text>
              <Icon name="chevron-right" size={scaleh(16)} color={primaryColor} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.orderDetailRow}>
              <View style={styles.orderDetailLeft}>
                <View style={styles.productThumbContainer}>
                  {/* Mimic product thumb */}
                  {isCosmetics ? (
                    <Image source={require('../../../images/makeup/ProductImgs/Blush.webp')} style={{ width: scaleh(34), height: scaleh(34) }} resizeMode="contain" />
                  ) : (
                    <View style={styles.productThumbCircle} />
                  )}
                </View>
                <Text style={styles.orderDetailText}>1 item - Order Price: ₹520</Text>
              </View>
              <Icon name="chevron-right" size={scaleh(20)} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Luxe Benefits */}
          <View style={styles.luxeContainer}>
            <Text style={styles.sectionTitle}>COSKINn - LUXE BENEFITS</Text>
            <View style={[styles.luxeCard, isCosmetics && { elevation: 0, shadowOpacity: 0, borderColor: primaryColor, backgroundColor: 'rgba(255, 255, 255, 0.7)' }]}>
              <View style={[styles.luxeLeft, isCosmetics && { position: 'relative', width: scaleh(32), height: scalev(32), justifyContent: 'center', alignItems: 'center' }]}>
                {isCosmetics ? (
                  <>
                    <Image source={require('../../../images/Logo/logo.webp')} style={{ width: '100%', height: '100%' }} resizeMode="contain" />

                  </>
                ) : (
                  <>
                    <Text style={styles.luxeLogo}>G</Text>
                    <Icon name="heart" size={scaleh(15)} color={AppTheme.colors.primary} style={styles.luxeHeart} />
                  </>
                )}
              </View>
              <View style={styles.luxeContent}>
                <Text style={styles.luxeText}>202 Reward points will be credited on order delivery</Text>
                <Text style={[styles.luxeLink, isCosmetics && { color: primaryColor }]}>Learn more about LUXE Benefits</Text>
              </View>
              <Icon name="info" size={scaleh(14)} color="#666" style={styles.infoIcon} />
            </View>
          </View>

          {/* Ads & Promos Placeholder */}
          <View style={styles.adsContainer}>
            <Text style={styles.adsText}>ADs & Promo's</Text>
          </View>

          {/* --- SCROLLING DOWN TO SECOND SCREEN SECTION --- */}
          <View style={styles.dividerThick} />

          {/* Sticky-like Header for Section 2 */}
          <View style={styles.section2Header}>
            <View style={styles.section2HeaderLeft}>

              <View style={{ marginLeft: scaleh(10) }}>
                <Text style={styles.section2Title}>Order Confirmed</Text>
                <Text style={styles.section2Subtitle}>ORDER ID #CSKN-12345678900 - 123456</Text>
              </View>
            </View>
            <Icon name="x" size={scaleh(20)} color="#000" />
          </View>

          <View style={styles.bottomSectionContent}>

            <Text style={styles.sectionLabel}>You will receive updates on</Text>
            <View style={[styles.updatesCard, isCosmetics && { elevation: 0, shadowOpacity: 0, borderColor: '#333', backgroundColor: 'rgba(255, 255, 255, 0.7)' }]}>
              <View style={styles.updatesRow}>
                <Icon name="mail" size={scaleh(18)} color="#333" style={{ marginRight: scaleh(15) }} />
                <Text style={styles.updatesText}>Ayshisinha@gmail.com</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.updatesRow}>
                <Icon name="phone-call" size={scaleh(18)} color="#333" style={{ marginRight: scaleh(15) }} />
                <Text style={styles.updatesText}>1234567890</Text>
              </View>
            </View>

            <Text style={styles.sectionLabel}>Products in this purchase</Text>
            <View style={[styles.productCard, isCosmetics && { elevation: 0, shadowOpacity: 0, borderColor: '#333', backgroundColor: 'rgba(255, 255, 255, 0.7)' }]}>
              <View style={styles.productTopRow}>
                <View style={styles.productImagePlaceholder} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>Vitamin C + E Sunscreen{'\n'}SPF 50 PA++++ with Ne..</Text>
                  <Text style={styles.productSize}>Size: 80g</Text>
                  <View style={styles.deliveryRow}>
                    <Icon name="truck" size={scaleh(12)} color="#666" />
                    <Text style={styles.deliveryText}>Arriving by Thu,9 Jul</Text>
                  </View>
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.productBottomRow}>
                <Text style={styles.qtyText}>Quantity: 1</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.oldPrice}>₹899</Text>
                  <Text style={styles.newPrice}>₹699</Text>
                </View>
              </View>
            </View>

            {/* Payment Details */}
            <View style={[styles.paymentDetailsContainer, isCosmetics && { backgroundColor: 'transparent' }]}>
              <Text style={styles.paymentDetailsTitle}>Payment Details</Text>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Bag Total (1 item)</Text>
                <Text style={styles.paymentValue}>₹1099</Text>
              </View>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Shipping & Platform Fee</Text>
                <Text style={styles.paymentValue}>₹5</Text>
              </View>
              <View style={[styles.paymentRow, { marginTop: scalev(15) }]}>
                <Text style={styles.youPayLabel}>You pay</Text>
                <Text style={styles.youPayValue}>₹994</Text>
              </View>
            </View>

            {/* Payment Methods */}
            <View style={styles.paymentMethodContainer}>
              <Text style={styles.paymentDetailsTitle}>Payment Methods</Text>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Cash On Delivery</Text>
                <Text style={styles.paymentValue}>₹1099</Text>
              </View>
            </View>

          </View>

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
  topHeader: {
    paddingHorizontal: scaleh(20),
    paddingTop: scalev(15),
    paddingBottom: scalev(10),
  },
  scrollContent: {
    paddingBottom: scalev(40),
  },
  successSection: {
    alignItems: 'center',
    marginTop: scalev(10),
    marginBottom: scalev(25),
  },
  successIconCircle: {
    width: scaleh(60),
    height: scaleh(60),
    borderRadius: scaleh(30),
    backgroundColor: '#3DD882',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scalev(15),
  },
  checkmarkBadge: {
    position: 'absolute',
    bottom: scalev(10),
    right: scaleh(10),
    backgroundColor: '#3DD882',
    width: scaleh(16),
    height: scaleh(16),
    borderRadius: scaleh(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  successTitle: {
    fontSize: scaleh(22),
    fontWeight: '400',
    color: '#000',
    marginBottom: scalev(5),
  },
  orderIdText: {
    fontSize: scaleh(14),
    color: '#999',
  },
  deliveringCard: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: AppTheme.colors.primary,
    borderRadius: scaleh(10),
    marginHorizontal: scaleh(20),
    padding: scaleh(15),
    marginBottom: scalev(20),
  },
  cardSubtitle: {
    fontSize: scaleh(14),
    color: '#666',
    marginBottom: scalev(5),
  },
  userName: {
    fontSize: scaleh(16),
    fontWeight: '600',
    color: '#000',
    marginBottom: scalev(5),
  },
  addressText: {
    fontSize: scaleh(14),
    color: '#666',
    lineHeight: scalev(18),
    marginBottom: scalev(15),
  },
  editAddressBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scalev(15),
  },
  editAddressText: {
    color: AppTheme.colors.primary,
    fontSize: scaleh(14),
    fontWeight: '600',
    marginRight: scaleh(5),
  },
  divider: {
    height: 1,
    backgroundColor: '#EBEBEB',
    marginVertical: scalev(15),
  },
  orderDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDetailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productThumbContainer: {
    width: scaleh(40),
    height: scaleh(40),
    borderRadius: scaleh(20),
    backgroundColor: '#FFE6EF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleh(10),
  },
  productThumbCircle: {
    width: scaleh(24),
    height: scaleh(24),
    borderRadius: scaleh(12),
    backgroundColor: '#FF9966',
  },
  orderDetailText: {
    fontSize: scaleh(16),
    fontWeight: '600',
    color: '#000',
  },
  luxeContainer: {
    paddingHorizontal: scaleh(20),
    marginBottom: scalev(40),
  },
  sectionTitle: {
    fontSize: scaleh(14),
    color: '#666',
    marginBottom: scalev(10),
  },
  luxeCard: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: AppTheme.colors.primary,
    borderRadius: scaleh(10),
    padding: scaleh(15),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  luxeLeft: {
    marginRight: scaleh(15),
  },
  luxeLogo: {
    fontSize: scaleh(32),
    color: AppTheme.colors.primary,
    fontWeight: '300',
  },
  luxeHeart: {
    position: 'absolute',
    bottom: 5,
    right: -5,
  },
  luxeContent: {
    flex: 1,
    paddingRight: scaleh(10),
  },
  luxeText: {
    fontSize: scaleh(14),
    color: '#333',
    lineHeight: scalev(16),
    marginBottom: scalev(5),
  },
  luxeLink: {
    fontSize: scaleh(14),
    color: AppTheme.colors.primary,
  },
  infoIcon: {
    position: 'absolute',
    top: scaleh(15),
    right: scaleh(15),
  },
  adsContainer: {
    height: scalev(150),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scaleh(20),
    marginBottom: scalev(30),
  },
  adsText: {
    fontSize: scaleh(32),
    fontWeight: '300',
    color: '#000',
  },
  dividerThick: {
    height: scalev(8),
    backgroundColor: '#F5F5F5',
  },
  section2Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    paddingVertical: scalev(20),
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  section2HeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  section2Title: {
    fontSize: scaleh(18),
    fontWeight: '400',
    color: '#000',
  },
  section2Subtitle: {
    fontSize: scaleh(12),
    color: '#999',
  },
  bottomSectionContent: {
    paddingHorizontal: scaleh(20),
    paddingTop: scalev(20),
  },
  sectionLabel: {
    fontSize: scaleh(16),
    fontWeight: '600',
    color: '#000',
    marginBottom: scalev(10),
  },
  updatesCard: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: scaleh(10),
    padding: scaleh(15),
    marginBottom: scalev(25),
  },
  updatesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  updatesText: {
    fontSize: scaleh(16),
    color: '#000',
  },
  productCard: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: scaleh(10),
    padding: scaleh(15),
    marginBottom: scalev(25),
  },
  productTopRow: {
    flexDirection: 'row',
  },
  productImagePlaceholder: {
    width: scaleh(60),
    height: scalev(80),
    backgroundColor: '#FFE6EF',
    borderRadius: scaleh(8),
    marginRight: scaleh(15),
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: scaleh(14),
    color: '#333',
    lineHeight: scalev(16),
    marginBottom: scalev(5),
  },
  productSize: {
    fontSize: scaleh(12),
    color: '#999',
    marginBottom: scalev(10),
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryText: {
    fontSize: scaleh(12),
    color: '#666',
    marginLeft: scaleh(5),
  },
  productBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: scaleh(14),
    color: '#333',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  oldPrice: {
    fontSize: scaleh(14),
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: scaleh(10),
  },
  newPrice: {
    fontSize: scaleh(16),
    fontWeight: '700',
    color: '#000',
  },
  paymentDetailsContainer: {
    backgroundColor: '#FFF2F6',
    padding: scaleh(20),
    marginHorizontal: -scaleh(20), // Bleed out to edges
    marginBottom: scalev(25),
  },
  paymentDetailsTitle: {
    fontSize: scaleh(16),
    fontWeight: '600',
    color: '#000',
    marginBottom: scalev(15),
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scalev(5),
  },
  paymentLabel: {
    fontSize: scaleh(14),
    color: '#333',
  },
  paymentValue: {
    fontSize: scaleh(14),
    color: '#333',
  },
  youPayLabel: {
    fontSize: scaleh(16),
    color: '#000',
  },
  youPayValue: {
    fontSize: scaleh(16),
    color: '#000',
  },
  paymentMethodContainer: {
    paddingHorizontal: scaleh(20),
    marginHorizontal: -scaleh(20), // Undo bleed
  },
});

export default OrderConfirmedScreen;
