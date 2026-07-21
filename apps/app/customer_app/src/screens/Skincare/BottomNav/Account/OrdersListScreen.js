import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Platform, Image, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { AppTheme, scaleh, scalev } from '../../../../constants/AppTheme';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyOrders } from '../../../../redux/slices/orderSlice';

const OrdersListScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const activeDomain = useSelector(state => state.app?.activeDomain || 'skincare');
  const isCosmetics = activeDomain === 'cosmetics';
  const { orders, loading } = useSelector(state => state.order);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  return (
    <View style={[styles.container, isCosmetics && { backgroundColor: '#FFFFFF' }]}>
      {isCosmetics && (
        <Image
          source={require('../../../../images/makeup/CosmeticBackImg.webp')}
          style={[StyleSheet.absoluteFill, { width: '100%', height: '100%', opacity: 0.3 }]}
          resizeMode="cover"
        />
      )}
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-left" size={scaleh(24)} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Orders List</Text>
          <View style={{ width: scaleh(24) }} />
        </View>
        <View style={styles.headerDivider} />

        {/* Content Area */}
        <LinearGradient
          colors={isCosmetics ? ['transparent', 'transparent'] : ['#FF006926', '#FFD49826']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.contentContainer}
        >
          {loading ? (
            <View style={styles.centerContent}>
              <ActivityIndicator size="large" color={AppTheme.colors.primary} />
            </View>
          ) : orders && orders.length > 0 ? (
            <FlatList
              data={orders}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={5}
              removeClippedSubviews={true}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[styles.orderCard, isCosmetics && styles.orderCardCosmetics]}
                  onPress={() => {
                    navigation.navigate('OrderDetails', { orderId: item.id });
                  }}
                >
                  <View style={styles.orderHeader}>
                    <Text style={styles.orderId}>Order #{item.id.slice(0, 8).toUpperCase()}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: item.status === 'DELIVERED' ? '#E8F5E9' : '#FFF3E0' }]}>
                      <Text style={[styles.statusText, { color: item.status === 'DELIVERED' ? '#2E7D32' : '#E65100' }]}>{item.status}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.orderDetails}>
                    <Text style={styles.orderDate}>Placed on: {new Date(item.createdAt).toLocaleDateString()}</Text>
                    <Text style={styles.orderItems}>{item.items?.length || 0} Items</Text>
                  </View>
                  
                  <View style={styles.orderFooter}>
                    <Text style={styles.orderTotal}>Total: ₹{item.finalAmount}</Text>
                    <Icon name="chevron-right" size={20} color="#1A1A1A" />
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <>
              <View style={styles.centerContent}>
                <View style={[styles.iconCircle, isCosmetics && { backgroundColor: '#FF0069', shadowColor: '#FF0069' }]}>
                  <Icon name="frown" size={scaleh(40)} color="#FFFFFF" />
                </View>
                <Text style={styles.titleText}>No order found</Text>
                <Text style={styles.subtitleText}>You have not placed any orders</Text>
              </View>
              <View style={[styles.bottomButtonContainer, isCosmetics && { backgroundColor: 'transparent' }]}>
                <TouchableOpacity 
                  style={[styles.shoppingButton, isCosmetics && { backgroundColor: '#FFD1E3', shadowColor: '#FF0069' }]} 
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('Shop')}
                >
                  <Text style={[styles.shoppingButtonText, isCosmetics && { color: '#1A1A1A' }]}>Start Shopping</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </LinearGradient>

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
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  gradientBg: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.15, // Creates the very soft pastel pink-to-peach look from the design
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleh(30),
  },
  iconCircle: {
    width: scaleh(80),
    height: scaleh(80),
    borderRadius: scaleh(40),
    backgroundColor: AppTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scalev(25),
    elevation: 4,
    shadowColor: AppTheme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  titleText: {
    fontSize: scaleh(20),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: scalev(10),
  },
  subtitleText: {
    fontSize: scaleh(14),
    color: '#4A4A4A',
    fontWeight: '400',
  },
  bottomButtonContainer: {
    paddingHorizontal: scaleh(20),
    paddingBottom: Platform.OS === 'ios' ? scalev(10) : scalev(30),
    paddingTop: scalev(10),
  },
  shoppingButton: {
    backgroundColor: AppTheme.colors.primary,
    borderRadius: scaleh(12),
    height: scalev(50),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: AppTheme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  shoppingButtonText: {
    color: '#FFFFFF',
    fontSize: scaleh(16),
    fontWeight: '700',
  },
  listContainer: {
    padding: scaleh(20),
    paddingBottom: scalev(40)
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: scaleh(16),
    padding: scaleh(15),
    marginBottom: scalev(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0'
  },
  orderCardCosmetics: {
    borderColor: '#FFD1E3',
    shadowColor: '#FF0069'
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scalev(10)
  },
  orderId: {
    fontSize: scaleh(16),
    fontWeight: '600',
    color: '#1A1A1A'
  },
  statusBadge: {
    paddingHorizontal: scaleh(10),
    paddingVertical: scalev(4),
    borderRadius: scaleh(12)
  },
  statusText: {
    fontSize: scaleh(12),
    fontWeight: '700'
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scalev(15)
  },
  orderDate: {
    fontSize: scaleh(13),
    color: '#666'
  },
  orderItems: {
    fontSize: scaleh(13),
    color: '#666',
    fontWeight: '500'
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: scalev(12)
  },
  orderTotal: {
    fontSize: scaleh(16),
    fontWeight: '700',
    color: '#1A1A1A'
  }
});

export default OrdersListScreen;
