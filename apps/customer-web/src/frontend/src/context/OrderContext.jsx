import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import apiClient from '../utils/apiClient';
import { useAuth } from './AuthContext';

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
      setOrders(res.data);
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
    // With backend integration, placeOrder just needs to refresh the orders list
    // because checkout form directly posts to /orders
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
