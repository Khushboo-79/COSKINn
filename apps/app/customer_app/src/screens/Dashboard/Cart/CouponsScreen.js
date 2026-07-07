import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { AppTheme, scaleh, scalev } from '../../../constants/AppTheme';

const couponsData = [
  { id: 1, title: 'Extra 15% off', desc: 'On all Charlotte Tilbury Orders', code: 'CT2345A53', action: 'Shop for 1 more item >' },
  { id: 2, title: 'Extra 15% off', desc: 'On all Charlotte Tilbury Orders', code: 'CT2345A53', action: 'Shop for 1 more item >' },
  { id: 3, title: 'Extra 15% off', desc: 'On all Charlotte Tilbury Orders', code: 'CT2345A53', action: 'Shop for 1 more item >' },
  { id: 4, title: 'Extra 15% off', desc: 'On all Charlotte Tilbury Orders', code: 'CT2345A53', action: 'Shop for 1 more item >' },
];

const CouponsScreen = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Coupons', 'Payment Offers'];

  const renderCouponCard = ({ item }) => (
    <View style={styles.couponCard}>
      
      {/* Top Section */}
      <View style={styles.couponTop}>
        <View style={styles.couponIconWrapper}>
          <Icon name="tag" size={scaleh(24)} color="#1a1a1a" />
        </View>
        
        <View style={styles.couponTextWrapper}>
          <Text style={styles.couponTitle}>{item.title}</Text>
          <Text style={styles.couponDesc}>{item.desc}</Text>
        </View>
        
        <View style={styles.lockIconWrapper}>
          <Icon name="lock" size={scaleh(14)} color={AppTheme.colors.white} />
        </View>
      </View>
      
      {/* Bottom Section */}
      <View style={styles.couponBottom}>
        <Text style={styles.couponCode}>{item.code}</Text>
        <TouchableOpacity>
          <Text style={styles.shopMoreText}>{item.action}</Text>
        </TouchableOpacity>
      </View>

      {/* Side Cutouts (To give it a ticket shape) */}
      <View style={[styles.cutout, styles.cutoutLeft]} />
      <View style={[styles.cutout, styles.cutoutRight]} />
    </View>
  );

  return (
    <View style={styles.container}>
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
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Coupon Code"
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.applyBtn}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>

          {/* Filters */}
          <View style={styles.filtersRow}>
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <TouchableOpacity
                  key={filter}
                  style={[styles.filterPill, isActive ? styles.filterPillActive : styles.filterPillInactive]}
                  onPress={() => setActiveFilter(filter)}
                >
                  <Text style={[styles.filterText, isActive ? styles.filterTextActive : styles.filterTextInactive]}>
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
          <FlatList
            data={couponsData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCouponCard}
            scrollEnabled={false} // since it is inside a scrollview
          />

        </ScrollView>

        {/* Sticky Bottom Bar */}
        <View style={styles.bottomBar}>
          <View style={styles.savedSection}>
            <Text style={styles.savedAmount}>₹0</Text>
            <Text style={styles.savedText}>Saved so far</Text>
          </View>
          
          <TouchableOpacity style={styles.goBagButton} onPress={() => navigation.goBack()}>
            <Text style={styles.goBagText}>Go To Bag</Text>
            <Icon name="arrow-right" size={scaleh(20)} color={AppTheme.colors.white} style={{marginLeft: scaleh(10)}} />
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
    borderRadius: scaleh(8),
    marginRight: scaleh(10),
    borderWidth: 1,
  },
  filterPillActive: {
    borderColor: AppTheme.colors.primary,
    backgroundColor: AppTheme.colors.white,
  },
  filterPillInactive: {
    borderColor: '#CCC',
    backgroundColor: '#EBEBEB',
  },
  filterText: {
    fontSize: scaleh(12),
    fontWeight: '500',
  },
  filterTextActive: {
    color: AppTheme.colors.primary,
  },
  filterTextInactive: {
    color: '#1a1a1a',
  },
  brandCouponsHeader: {
    marginHorizontal: scaleh(20),
    marginBottom: scalev(15),
  },
  brandTitle: {
    fontSize: scaleh(14),
    fontWeight: '700',
    color: '#000',
    marginBottom: scalev(4),
  },
  brandSubtitle: {
    fontSize: scaleh(12),
    color: '#666',
  },
  couponCard: {
    backgroundColor: AppTheme.colors.white,
    marginHorizontal: scaleh(20),
    marginBottom: scalev(15),
    borderRadius: scaleh(10),
    borderWidth: 1,
    borderColor: '#EFEFEF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
    paddingVertical: scalev(15),
  },
  couponTop: {
    flexDirection: 'row',
    paddingHorizontal: scaleh(20),
    alignItems: 'center',
    paddingBottom: scalev(10),
  },
  couponIconWrapper: {
    marginRight: scaleh(15),
  },
  couponTextWrapper: {
    flex: 1,
  },
  couponTitle: {
    fontSize: scaleh(14),
    fontWeight: '600',
    color: '#999', // Matches grey text in image
  },
  couponDesc: {
    fontSize: scaleh(11),
    color: '#999',
    marginTop: scalev(2),
  },
  lockIconWrapper: {
    width: scaleh(20),
    height: scaleh(20),
    borderRadius: scaleh(10),
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  couponBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    paddingTop: scalev(10),
  },
  couponCode: {
    fontSize: scaleh(9),
    color: '#666',
    fontWeight: '600',
  },
  shopMoreText: {
    fontSize: scaleh(12),
    color: AppTheme.colors.primary,
    fontWeight: '600',
  },
  cutout: {
    position: 'absolute',
    width: scaleh(24),
    height: scaleh(24),
    borderRadius: scaleh(12),
    backgroundColor: AppTheme.colors.white,
    top: '50%',
    marginTop: -scaleh(12),
  },
  cutoutLeft: {
    left: -scaleh(12),
    borderRightWidth: 1,
    borderColor: '#EFEFEF',
  },
  cutoutRight: {
    right: -scaleh(12),
    borderLeftWidth: 1,
    borderColor: '#EFEFEF',
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
