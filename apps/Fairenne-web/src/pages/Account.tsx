import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCurrency } from '../context/CurrencyContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, User, Settings, LogOut, ChevronRight, MapPin, Truck, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type Tab = 'profile' | 'orders' | 'settings';

const Account: React.FC = () => {
  const { mode } = useTheme();
  const { currency, formatPrice } = useCurrency();
  const isGlam = mode === 'glam';
  const { user, token, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  const [phone, setPhone] = useState(user?.phone || '');
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  React.useEffect(() => {
    if (user?.phone) {
      setPhone(user.phone);
    }
  }, [user]);

  React.useEffect(() => {
    if (activeTab === 'orders' && token) {
      const fetchOrders = async () => {
        setIsLoadingOrders(true);
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/orders`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            setOrders(data);
          }
        } catch (error) {
          console.error('Failed to fetch orders', error);
        } finally {
          setIsLoadingOrders(false);
        }
      };
      fetchOrders();
    }
  }, [activeTab, token]);
  
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    // Navigate to home first, then logout on the next tick 
    // to prevent ProtectedRoute from overriding the navigation to /login
    navigate('/', { replace: true });
    setTimeout(() => {
      logout();
    }, 10);
  };



  return (
    <div className={`min-h-screen pt-10 pb-24 transition-colors duration-500 ${isGlam ? 'bg-[#faf9f6]' : 'bg-[#fcfaf9]'}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Page Header */}
        <div className="mb-10 md:mb-16">
          <h1 className={`text-4xl md:text-5xl font-extrabold mb-2 text-[#2a2a2a] ${isGlam ? 'font-serif' : 'font-display'}`}>
            My Account
          </h1>
          <p className="text-gray-500 font-medium">Welcome back, {user?.firstName || 'Beautiful'}.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* Mobile Tabs (Horizontal Scroll) */}
          <div className="lg:hidden flex overflow-x-auto hide-scrollbar gap-2 pb-2 -mx-4 px-4 border-b border-gray-200">
            {['orders', 'profile', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as Tab)}
                className={`whitespace-nowrap px-6 py-3 rounded-full font-bold text-sm transition-all ${
                  activeTab === tab 
                    ? (isGlam ? 'bg-[#2a2a2a] text-[#e5b376]' : 'bg-[#ff9aa8] text-white')
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <nav className="space-y-2 sticky top-32">
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center p-4 rounded-2xl font-bold transition-all ${
                  activeTab === 'orders' 
                    ? (isGlam ? 'bg-[#2a2a2a] text-[#e5b376]' : 'bg-[#ff9aa8]/10 text-[#ff9aa8]')
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Package size={20} className="mr-3" /> Orders
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center p-4 rounded-2xl font-bold transition-all ${
                  activeTab === 'profile' 
                    ? (isGlam ? 'bg-[#2a2a2a] text-[#e5b376]' : 'bg-[#ff9aa8]/10 text-[#ff9aa8]')
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <User size={20} className="mr-3" /> Profile
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center p-4 rounded-2xl font-bold transition-all ${
                  activeTab === 'settings' 
                    ? (isGlam ? 'bg-[#2a2a2a] text-[#e5b376]' : 'bg-[#ff9aa8]/10 text-[#ff9aa8]')
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Settings size={20} className="mr-3" /> Settings
              </button>
              <div className="pt-6 mt-6 border-t border-gray-200">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center p-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all"
                >
                  <LogOut size={20} className="mr-3" /> Log Out
                </button>
              </div>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <h2 className={`text-2xl font-bold mb-6 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-gray-900'}`}>
                    Order History
                  </h2>
                  
                  {isLoadingOrders ? (
                    <div className="flex justify-center items-center py-20">
                      <div className="w-8 h-8 border-4 border-gray-200 border-t-[#ff9aa8] rounded-full animate-spin"></div>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-20 bg-white border border-gray-200 rounded-[32px] shadow-sm">
                      <Package size={48} className="mx-auto text-gray-300 mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h3>
                      <p className="text-gray-500 font-medium mb-6">Looks like you haven't placed an order yet.</p>
                      <button onClick={() => navigate('/shop')} className={`px-8 py-3 rounded-full font-bold transition-all ${
                        isGlam ? 'bg-[#2a2a2a] text-[#e5b376] hover:bg-black' : 'bg-[#ff9aa8] text-white hover:bg-[#ff8091]'
                      }`}>
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    orders.map(order => (
                      <div key={order.id} className="bg-white border border-gray-200 rounded-[32px] overflow-hidden shadow-sm">
                        <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-bold text-gray-900">Order #{order.id.slice(0, 8).toUpperCase()}</span>
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                order.status === 'DELIVERED' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-blue-100 text-blue-700'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="text-sm font-medium text-gray-500">
                              Placed on {new Date(order.createdAt).toLocaleDateString()} • {formatPrice(order.finalAmount)}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-3 mt-2 md:mt-0">
                            <button className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                              isGlam ? 'bg-[#2a2a2a] text-[#e5b376] hover:bg-black' : 'bg-[#ff9aa8] text-white hover:bg-[#ff8091]'
                            }`}>
                              <Truck size={16} className="inline mr-2" /> Track Order
                            </button>
                            {order.status === 'DELIVERED' && (
                              <button className="px-5 py-2.5 rounded-xl font-bold text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all border border-gray-200">
                                <RefreshCw size={16} className="inline mr-2" /> Request Return
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="p-6 md:p-8 bg-gray-50/50">
                          <div className="flex flex-col gap-6">
                            {order.items.map((item: any, idx: number) => {
                              const product = item.variant?.product;
                              const imageUrl = product?.images?.[0]?.url || 'https://via.placeholder.com/150';
                              return (
                                <div key={idx} className="flex items-center gap-4">
                                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                                    <img src={imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-gray-900 text-sm md:text-base">{item.name}</h4>
                                    <p className="text-sm text-gray-500 font-medium">Qty: {item.quantity}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              )}

              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className={`text-2xl font-bold mb-6 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-gray-900'}`}>
                    Profile Details
                  </h2>
                  <div className="bg-white border border-gray-200 rounded-[32px] p-8 shadow-sm">
                    <form className="space-y-6 max-w-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                          <input type="text" defaultValue={user?.firstName || ''} className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                          <input type="text" defaultValue={user?.lastName || ''} className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                        <input type="email" defaultValue={user?.email || ''} className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm font-medium" />
                      </div>
                      <button type="button" className={`py-4 px-8 rounded-xl font-bold transition-all ${
                        isGlam ? 'bg-[#2a2a2a] text-[#e5b376] hover:bg-black' : 'bg-[#ff9aa8] text-white hover:bg-[#ff8091]'
                      }`}>
                        Save Changes
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className={`text-2xl font-bold mb-6 ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-gray-900'}`}>
                    Preferences & Settings
                  </h2>
                  <div className="bg-white border border-gray-200 rounded-[32px] p-8 shadow-sm">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between py-4 border-b border-gray-100">
                        <div>
                          <h4 className="font-bold text-gray-900">Email Notifications</h4>
                          <p className="text-sm text-gray-500 font-medium">Receive order updates and promotions.</p>
                        </div>
                        <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                          <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-4 border-b border-gray-100">
                        <div>
                          <h4 className="font-bold text-gray-900">SMS Notifications</h4>
                          <p className="text-sm text-gray-500 font-medium">Get text alerts for delivery updates.</p>
                        </div>
                        <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                          <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Account;
