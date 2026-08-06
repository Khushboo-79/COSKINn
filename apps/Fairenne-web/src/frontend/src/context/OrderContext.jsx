import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import apiClient from '../utils/apiClient';
import { useAuth } from './AuthContext';
import { normalizeOrder } from '../utils/orderUtils';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    if (!user) {
      setOrders([]);
      return;
    }
    setLoading(true);
    try {
      const res = await apiClient.get('/orders');
      const list = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      setOrders(list.map(order => normalizeOrder(order)));
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const placeOrder = (orderData) => {
    console.log('🎉 [ORDER PLACED SUCCESSFULLY] Order Details:', {
      orderId: orderData?.id,
      shortOrderId: orderData?.orderId,
      status: orderData?.status,
      paymentMethod: orderData?.paymentMethod,
      totalAmount: orderData?.totalAmount || orderData?.finalAmount,
      fullOrder: orderData
    });
    fetchOrders();
  };

  const updateOrderStatus = (orderId, newStatus, newTimeline) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: newStatus,
          timeline: newTimeline || order.timeline
        };
      }
      return order;
    }));
  };

  const getOrderById = (orderId) => {
    return orders.find(o => o.id === orderId);
  };

  const memoizedContextValue = useMemo(() => ({
    orders, 
    loading,
    placeOrder, 
    updateOrderStatus, 
    getOrderById,
    refreshOrders: fetchOrders
  }), [orders, loading]);

  return (
    <OrderContext.Provider value={memoizedContextValue}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}
