import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const dummyDeliveredOrder = {
    id: 'ORD-999999',
    date: '1 Jul 2026',
    status: 'Delivered',
    paymentMethod: 'Cash On Delivery',
    subtotal: 1299,
    discount: 0,
    shipping: 0,
    gst: 233,
    totalAmount: 1299,
    items: [
      { id: 1, name: 'Radiance Glow Serum', variant: 'Standard', qty: 1, price: 1299, image: '/mockup_product_1.webp' }
    ],
    timeline: [
      { status: 'Order Placed', date: '1 Jul', time: '10:00 AM', desc: 'Order received.', done: true },
      { status: 'Order Confirmed', date: '1 Jul', time: '10:30 AM', desc: 'Order confirmed.', done: true },
      { status: 'Packed', date: '2 Jul', time: '09:00 AM', desc: 'Packed.', done: true },
      { status: 'Shipped', date: '2 Jul', time: '02:00 PM', desc: 'Shipped.', done: true },
      { status: 'Out For Delivery', date: '4 Jul', time: '08:00 AM', desc: 'Out for delivery.', done: true },
      { status: 'Delivered', date: '4 Jul', time: '01:00 PM', desc: 'Delivered successfully.', done: true }
    ]
  };

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('coskinn_orders');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hasDelivered = parsed.some(o => o.status === 'Delivered');
        return hasDelivered ? parsed : [dummyDeliveredOrder, ...parsed];
      } catch (e) {
        return [dummyDeliveredOrder];
      }
    }
    return [dummyDeliveredOrder];
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

  return (
    <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}
