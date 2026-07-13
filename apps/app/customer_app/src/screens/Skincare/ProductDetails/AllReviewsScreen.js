import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { scalev, scaleh } from '../../../constants/AppTheme';

const AllReviewsScreen = () => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={scaleh(24)} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="shopping-cart" size={scaleh(22)} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="heart" size={scaleh(22)} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="search" size={scaleh(22)} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.headerDivider} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {[1, 2, 3, 4, 5].map((_, idx) => (
          <View key={idx} style={styles.reviewWrapper}>
            <View style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewStars}>
                  <MaterialIcons name="star" size={scaleh(12)} color="#32CD32" />
                  <MaterialIcons name="star" size={scaleh(12)} color="#32CD32" />
                  <MaterialIcons name="star" size={scaleh(12)} color="#32CD32" />
                  <MaterialIcons name="star" size={scaleh(12)} color="#32CD32" />
                  <MaterialIcons name="star-outline" size={scaleh(12)} color="#32CD32" />
                </View>
                <Text style={styles.reviewDate}>06/16/2025</Text>
              </View>
              <View style={styles.reviewUserRow}>
                <View style={styles.reviewVerifiedPill}><Text style={styles.reviewVerifiedText}>Verified</Text></View>
                <Text style={styles.reviewUserName}>Hemal Kapoor</Text>
              </View>
              <Text style={styles.reviewHeadline}>No Heavy Layer Feeling</Text>
              <Text style={styles.reviewBody}>Unlike many sunscreens I've tried, this one feels very lightly on the face.</Text>
            </View>
            <View style={styles.reviewDivider} />
          </View>
        ))}
      </ScrollView>

      {/* Bottom Fixed Footer */}
      <View style={styles.bottomFooter}>
        <Text style={styles.footerPrice}>₹699</Text>

        <View style={styles.quantitySelector}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.qtyValue}>{quantity}</Text>

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleh(15),
    paddingVertical: scalev(12),
    backgroundColor: '#FFF',
  },
  headerIcon: {
    padding: scaleh(5),
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleh(15),
  },
  headerDivider: {
    height: 1,
    backgroundColor: '#EFEFEF',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    paddingTop: scalev(15),
    paddingBottom: scalev(100),
  },
  reviewWrapper: {
    paddingHorizontal: scaleh(15),
  },
  reviewItem: {
    paddingVertical: scalev(10),
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scalev(8),
  },
  reviewStars: {
    flexDirection: 'row',
  },
  reviewDate: {
    fontSize: scaleh(13),
    color: '#999',
  },
  reviewUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewVerifiedPill: {
    backgroundColor: '#FF0069',
    paddingHorizontal: scaleh(6),
    paddingVertical: scalev(2),
    borderRadius: scaleh(4),
    marginRight: scaleh(8),
  },
  reviewVerifiedText: {
    color: '#FFF',
    fontSize: scaleh(11),
    fontWeight: '700',
  },
  reviewUserName: {
    fontSize: scaleh(14),
    color: '#1A1A1A',
    fontWeight: '600',
  },
  reviewHeadline: {
    fontSize: scaleh(14),
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: scalev(8),
    marginBottom: scalev(4),
  },
  reviewBody: {
    fontSize: scaleh(13),
    color: '#666',
    lineHeight: scalev(16),
  },
  reviewDivider: {
    height: 1,
    backgroundColor: '#EFEFEF',
    marginTop: scalev(10),
  },
  bottomFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleh(15),
    paddingVertical: scalev(15),
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  footerPrice: {
    fontSize: scaleh(18),
    fontWeight: '700',
    color: '#1A1A1A',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF0069',
    borderRadius: scaleh(8),
    width: scaleh(120),
    height: scalev(40),
  },
  qtyBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  qtyBtnText: {
    color: '#FFF',
    fontSize: scaleh(20),
    fontWeight: '500',
  },
  qtyValue: {
    flex: 1,
    textAlign: 'center',
    color: '#FFF',
    fontSize: scaleh(18),
    fontWeight: '700',
  },
});

export default AllReviewsScreen;
