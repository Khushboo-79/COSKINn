import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, FlatList, Image, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAvailableCoupons, applyCoupon } from '../../../redux/slices/cartSlice';
import { AppTheme, scaleh, scalev } from '../../../constants/AppTheme';

const CouponsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const activeDomain = useSelector(state => state.app?.activeDomain || 'skincare');
  const { availableCoupons, loading, error, cart } = useSelector(state => state.cart);
  const isCosmetics = activeDomain === 'cosmetics';
  const themePrimaryColor = isCosmetics ? AppTheme.colors.cosmeticsPrimary : AppTheme.colors.primary;

  const [activeFilter, setActiveFilter] = useState('All');
  const [couponCode, setCouponCode] = useState('');

  useEffect(() => {
    dispatch(fetchAvailableCoupons());
  }, [dispatch]);

  const filters = ['All', 'Coupons', 'Payment Offers'];

  const handleApplyCoupon = (code) => {
    if (code) {
      dispatch(applyCoupon(code)).then((res) => {
        if (!res.error) {
          navigation.goBack();
        }
      });
    }
  };

  const renderCouponCard = ({ item }) => (
    <View style={styles.couponCard}>
      {/* Top Section */}
      <View style={styles.couponTop}>
        <View style={styles.couponIconWrapper}>
          <MaterialCommunityIcons name="ticket-outline" size={scaleh(28)} color="#333" />
        </View>

        <View style={styles.couponTextWrapper}>
          <Text style={styles.couponTitle}>{item.name || item.title || item.code}</Text>
          <Text style={styles.couponDesc}>{item.description || item.desc}</Text>
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.couponBottom}>
        <Text style={styles.couponCode}>{item.code}</Text>
        <TouchableOpacity onPress={() => handleApplyCoupon(item.code)}>
          <Text style={[styles.shopMoreText, { color: themePrimaryColor }]}>Apply</Text>
        </TouchableOpacity>
      </View>

      {/* Side Cutouts */}
      {!isCosmetics && (
        <>
          <View style={[styles.cutout, styles.cutoutLeft]} />
          <View style={[styles.cutout, styles.cutoutRight]} />
        </>
      )}
    </View>
  );

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
          <Text style={styles.headerTitle}>Coupons & Offers</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

          {/* Input Box */}
          <View style={[styles.inputContainer, { borderColor: themePrimaryColor }]}>
            <TextInput
              style={styles.input}
              placeholder="Enter Coupon Code"
              placeholderTextColor="#999"
              value={couponCode}
              onChangeText={setCouponCode}
              autoCapitalize="characters"
            />
            <TouchableOpacity style={styles.applyBtn} onPress={() => handleApplyCoupon(couponCode)}>
              {loading ? (
                <ActivityIndicator size="small" color={themePrimaryColor} />
              ) : (
                <Text style={styles.applyText}>Apply</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Filters */}
          <View style={styles.filtersRow}>
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <TouchableOpacity
                  key={filter}
                  style={[styles.filterPill, isActive ? { borderColor: themePrimaryColor, backgroundColor: AppTheme.colors.white } : styles.filterPillInactive]}
                  onPress={() => setActiveFilter(filter)}
                >
                  <Text style={[styles.filterText, isActive ? { color: isCosmetics ? '#000' : AppTheme.colors.primary } : styles.filterTextInactive]}>
                    {filter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.brandCouponsHeader}>
            <Text style={styles.brandTitle}>Brand coupons</Text>
            <Text style={styles.brandSubtitle}>Apply multiple coupons to save more</Text>
          </View>

          {/* List */}
          {loading && availableCoupons.length === 0 ? (
            <ActivityIndicator size="large" color={themePrimaryColor} style={{ marginTop: scalev(20) }} />
          ) : availableCoupons.length === 0 ? (
             <View style={{ alignItems: 'center', marginTop: scalev(20) }}>
               <Text style={{ color: '#666' }}>No coupons available right now.</Text>
             </View>
          ) : (
            <FlatList
              data={availableCoupons}
              keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
              renderItem={renderCouponCard}
              scrollEnabled={false} // since it is inside a scrollview
            />
          )}

        </ScrollView>

        {/* Sticky Bottom Bar */}
        <View style={styles.bottomBar}>
          <View style={styles.savedSection}>
            <Text style={styles.savedAmount}>₹{cart?.discount || 0}</Text>
            <Text style={styles.savedText}>Saved so far</Text>
          </View>

          <TouchableOpacity style={[styles.goBagButton, { backgroundColor: themePrimaryColor }]} onPress={() => navigation.goBack()}>
            <Text style={[styles.goBagText, isCosmetics && { color: '#000000' }]}>Go To Bag</Text>
            <Icon name="arrow-right" size={scaleh(20)} color={isCosmetics ? '#000000' : AppTheme.colors.white} style={{ marginLeft: scaleh(10) }} />
          </TouchableOpacity>
        </View>

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
    marginTop: scalev(35),
  },
  backButton: {
    padding: scaleh(5),
  },
  headerTitle: {
    fontSize: scaleh(20),
    fontWeight: '600',
    color: '#000',
    marginLeft: scaleh(10),
  },
  scrollContent: {
    paddingBottom: scalev(100),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scaleh(20),
    marginTop: scalev(10),
    borderWidth: 1,
    borderColor: AppTheme.colors.primary,
    borderRadius: scaleh(8),
    paddingHorizontal: scaleh(15),
    height: scalev(50),
    backgroundColor: AppTheme.colors.white,
  },
  input: {
    flex: 1,
    fontSize: scaleh(14),
    color: '#000',
  },
  applyBtn: {
    paddingLeft: scaleh(15),
  },
  applyText: {
    fontSize: scaleh(14),
    fontWeight: '700',
    color: '#1a1a1a',
  },
  filtersRow: {
    flexDirection: 'row',
    marginHorizontal: scaleh(20),
    marginTop: scalev(20),
    marginBottom: scalev(25),
  },
  filterPill: {
    paddingHorizontal: scaleh(15),
    paddingVertical: scalev(6),
    borderRadius: scaleh(12),
    marginRight: scaleh(10),
    borderWidth: 1,
  },
  filterPillActive: {
    borderColor: AppTheme.colors.primary,
    backgroundColor: AppTheme.colors.white,
  },
  filterPillInactive: {
    borderColor: '#EFEFEF',
    backgroundColor: '#F5F5F5',
  },
  filterText: {
    fontSize: scaleh(12),
    fontWeight: '500',
  },
  filterTextActive: {
    color: AppTheme.colors.primary,
  },
  filterTextInactive: {
    color: '#333',
  },
  brandCouponsHeader: {
    marginHorizontal: scaleh(20),
    marginBottom: scalev(15),
  },
  brandTitle: {
    fontSize: scaleh(16),
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: scalev(4),
  },
  brandSubtitle: {
    fontSize: scaleh(12),
    color: '#666',
    fontWeight: '500',
  },
  couponCard: {
    backgroundColor: AppTheme.colors.white,
    marginHorizontal: scaleh(20),
    marginBottom: scalev(15),
    borderRadius: scaleh(12),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    position: 'relative',
    paddingVertical: scalev(20),
  },
  couponTop: {
    flexDirection: 'row',
    paddingHorizontal: scaleh(20),
    alignItems: 'center',
    paddingBottom: scalev(15),
  },
  couponIconWrapper: {
    marginRight: scaleh(15),
  },
  couponTextWrapper: {
    flex: 1,
  },
  couponTitle: {
    fontSize: scaleh(15),
    fontWeight: '700',
    color: '#999', // Matches the lighter grey title in the image
  },
  couponDesc: {
    fontSize: scaleh(12),
    color: '#999',
    fontWeight: '400',
    marginTop: scalev(4),
  },
  lockIconWrapper: {
    width: scaleh(24),
    height: scaleh(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  couponBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    paddingTop: scalev(15),
  },
  couponCode: {
    fontSize: scaleh(11),
    color: '#333',
    fontWeight: '700',
  },
  shopMoreText: {
    fontSize: scaleh(13),
    color: AppTheme.colors.cosmeticsPrimary, // Keep it soft pink matching the reference
    fontWeight: '400',
  },
  cutout: {
    position: 'absolute',
    width: scaleh(24),
    height: scaleh(24),
    borderRadius: scaleh(12),
    backgroundColor: AppTheme.colors.white, // Pure white to blend seamlessly with the screen background
    top: '50%',
    marginTop: -scaleh(12),
    zIndex: 10,
  },
  cutoutLeft: {
    left: -scaleh(12),
    borderRightWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)', // Extremely subtle inner shadow line
  },
  cutoutRight: {
    right: -scaleh(12),
    borderLeftWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: AppTheme.colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    paddingVertical: scalev(15),
    borderTopLeftRadius: scaleh(20),
    borderTopRightRadius: scaleh(20),
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  savedSection: {
    justifyContent: 'center',
  },
  savedAmount: {
    fontSize: scaleh(18),
    color: AppTheme.colors.success,
    fontWeight: '600',
  },
  savedText: {
    fontSize: scaleh(10),
    color: '#1a1a1a',
    marginTop: scalev(2),
  },
  goBagButton: {
    backgroundColor: AppTheme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleh(30),
    paddingVertical: scalev(12),
    borderRadius: scaleh(8),
  },
  goBagText: {
    color: AppTheme.colors.white,
    fontSize: scaleh(14),
    fontWeight: '700',
  },
});

export default CouponsScreen;
