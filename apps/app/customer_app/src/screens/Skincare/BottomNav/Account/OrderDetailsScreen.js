import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderTracking, cancelOrderAction, returnOrderAction } from '../../../../redux/slices/orderSlice';
import { AppTheme, scaleh, scalev } from '../../../../constants/AppTheme';

const OrderDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { orderId } = route.params || {};
  const { currentOrder, loading } = useSelector(state => state.order);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderTracking(orderId));
    }
  }, [dispatch, orderId]);

  const handleCancel = () => {
    dispatch(cancelOrderAction({ orderId, reason: 'Changed my mind' })).then(() => {
      dispatch(fetchOrderTracking(orderId)); // Refresh status
    });
  };

  const handleReturn = () => {
    dispatch(returnOrderAction({ 
      orderId, 
      returnData: { reason: 'Defective product', refundType: 'WALLET', items: [{ sku: currentOrder.items[0]?.sku, quantity: 1 }] }
    })).then(() => {
      dispatch(fetchOrderTracking(orderId));
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-left" size={scaleh(24)} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        <View style={{ width: scaleh(24) }} />
      </View>
      <View style={styles.headerDivider} />

      {loading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={AppTheme.colors.primary} />
        </View>
      ) : currentOrder ? (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.orderIdTitle}>Order #{currentOrder.id.slice(0,8).toUpperCase()}</Text>
            <Text style={styles.statusText}>Status: {currentOrder.status}</Text>
            <Text style={styles.dateText}>Placed: {new Date(currentOrder.createdAt).toLocaleDateString()}</Text>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Items ({currentOrder.items?.length || 0})</Text>
            {currentOrder.items?.map(item => (
              <View key={item.id} style={styles.itemRow}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQty}>x{item.quantity}</Text>
                <Text style={styles.itemPrice}>₹{item.price}</Text>
              </View>
            ))}
            <View style={styles.divider} />
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>₹{currentOrder.finalAmount}</Text>
            </View>
          </View>

          {currentOrder.status !== 'CANCELLED' && currentOrder.status !== 'DELIVERED' && (
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
              <Text style={styles.cancelBtnText}>Cancel Order</Text>
            </TouchableOpacity>
          )}

          {currentOrder.status === 'DELIVERED' && (
            <TouchableOpacity style={[styles.cancelBtn, { borderColor: '#BBDEFB', backgroundColor: '#E3F2FD' }]} onPress={handleReturn}>
              <Text style={[styles.cancelBtnText, { color: '#1976D2' }]}>Request Return</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      ) : (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>Could not load order details.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    paddingTop: scalev(10),
    paddingBottom: scalev(15),
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: scaleh(18), fontWeight: '600', color: '#1A1A1A' },
  headerDivider: { height: 1, backgroundColor: '#E0E0E0' },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { padding: scaleh(20) },
  card: {
    backgroundColor: '#F9F9F9',
    padding: scaleh(15),
    borderRadius: scaleh(12),
    marginBottom: scalev(20),
    borderWidth: 1,
    borderColor: '#EEEEEE'
  },
  orderIdTitle: { fontSize: scaleh(16), fontWeight: '700', marginBottom: scalev(5) },
  statusText: { fontSize: scaleh(14), fontWeight: '600', color: '#E65100', marginBottom: scalev(5) },
  dateText: { fontSize: scaleh(13), color: '#666' },
  sectionTitle: { fontSize: scaleh(15), fontWeight: '600', marginBottom: scalev(10) },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: scalev(8) },
  itemName: { flex: 1, fontSize: scaleh(14), color: '#333' },
  itemQty: { width: 30, fontSize: scaleh(14), color: '#666', textAlign: 'center' },
  itemPrice: { width: 60, fontSize: scaleh(14), fontWeight: '600', textAlign: 'right' },
  divider: { height: 1, backgroundColor: '#DDDDDD', marginVertical: scalev(10) },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  totalLabel: { fontSize: scaleh(16), fontWeight: '700' },
  totalValue: { fontSize: scaleh(16), fontWeight: '700', color: AppTheme.colors.primary },
  cancelBtn: {
    backgroundColor: '#FFF0F0',
    padding: scalev(15),
    borderRadius: scaleh(8),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFCDD2'
  },
  cancelBtnText: { color: '#D32F2F', fontWeight: '600', fontSize: scaleh(16) },
  errorText: { fontSize: scaleh(16), color: '#999' }
});

export default OrderDetailsScreen;
