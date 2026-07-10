import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('coskinn_orders');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed.filter(order => order.id !== 'ORD-999999') : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('coskinn_orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      status: 'Order Confirmed', // Initial status
      timeline: [
        { status: 'Order Placed', date: 'Today', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), desc: 'Your order has been received.', done: true },
        { status: 'Order Confirmed', date: 'Today', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), desc: 'Your order has been confirmed.', done: true },
        { status: 'Packed', date: '-', time: '-', desc: 'Pending', done: false },
        { status: 'Shipped', date: '-', time: '-', desc: 'Pending', done: false },
        { status: 'Out For Delivery', date: '-', time: '-', desc: 'Pending', done: false },
        { status: 'Delivered', date: '-', time: '-', desc: 'Pending', done: false },
      ]
    };
    setOrders(prev => [newOrder, ...prev]);
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
    placeOrder, 
    updateOrderStatus, 
    getOrderById
  }), [orders]);

  return (
    <OrderContext.Provider value={memoizedContextValue}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}
