import { Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { 
  Home, ShoppingCart, Package, Truck, RotateCcw, Ban,
  CreditCard, FileText, BarChart2, Settings, 
  Search, Bell, LogOut, User
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { api } from '../../lib/axios';

// Import screens
import OrderDashboard from './OrderDashboard';
import OrderList from './OrderList';
import OrderDetail from './OrderDetail';
import FulfillmentScreen from './FulfillmentScreen';
import ShippingScreen from './ShippingScreen';
import ReturnQueue from './ReturnQueue';
import CancellationsScreen from './CancellationsScreen';
import PaymentsScreen from './PaymentsScreen';
import InvoicesScreen from './InvoicesScreen';
import OrderReportsScreen from './OrderReportsScreen';
import OrderSettingsScreen from './OrderSettingsScreen';

const queryClient = new QueryClient();

export function OrderModuleRoutes() {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Twilio 2FA State
  const [isConfiguring2FA, setIsConfiguring2FA] = useState(false);
  const [phone2FA, setPhone2FA] = useState('');
  const [otp2FA, setOtp2FA] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleSendOtp = async () => {
    if (!phone2FA) {
      toast.error('Please enter a phone number');
      return;
    }
    try {
      await api.post('/auth/send-otp', { phone: phone2FA, isAdminLogin: true });
      setOtpSent(true);
      toast.success('OTP Sent Successfully');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp2FA) {
      toast.error('Please enter the OTP');
      return;
    }
    try {
      await api.post('/auth/verify-otp', { phone: phone2FA, otp: otp2FA });
      setIsVerified(true);
      toast.success('Phone verified successfully!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Invalid OTP');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('internal_panel_token');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/orders', icon: Home },
    { name: 'Orders List', path: '/orders/list', icon: ShoppingCart },
    { name: 'Fulfillment', path: '/orders/fulfillment', icon: Package },
    { name: 'Shipping', path: '/orders/shipping', icon: Truck },
    { name: 'Returns & Exchanges', path: '/orders/returns', icon: RotateCcw },
    { name: 'Cancellations', path: '/orders/cancellations', icon: Ban },
    { name: 'Payments / COD', path: '/orders/payments', icon: CreditCard },
    { name: 'Invoices', path: '/orders/invoices', icon: FileText },
    { name: 'Reports', path: '/orders/reports', icon: BarChart2 },
    { name: 'Settings', path: '/orders/settings', icon: Settings },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm relative z-20">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600">
                COSKINn
              </span>
            </div>
            <div className="mt-6 text-2xl font-bold text-rose-900 leading-tight">
              Order Panel<br/>Overview
            </div>
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              The Order Panel helps manage all customer orders including order tracking, fulfillment, shipping, cancellations, returns, and order reports in one centralized system.
            </p>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/orders'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-rose-100/50 text-rose-700 shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 flex flex-col min-w-0 bg-slate-50 relative z-10">
          
          {/* TOP HEADER */}
          <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
            <div className="flex items-center gap-2 md:hidden">
              <span className="text-2xl font-bold text-rose-600">COSKINn</span>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-auto">
              <div className="relative w-full">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search orders, customers, order ID, status, products..."
                  className="w-full pl-11 pr-4 py-3 bg-slate-100/50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6 ml-auto relative">
              <button 
                onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
                className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
              </button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute top-14 right-40 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50">
                  <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-slate-800">Notifications</h3>
                    <button className="text-xs font-semibold text-rose-600">Mark all read</button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer">
                      <p className="text-sm font-semibold text-slate-800">New Order Placed</p>
                      <p className="text-xs text-slate-500 mt-1">#ORD-25053-006 by customer Ananya Sharma - ₹1,349</p>
                      <p className="text-[10px] text-slate-400 mt-2">5 minutes ago</p>
                    </div>
                    <div className="p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer">
                      <p className="text-sm font-semibold text-slate-800">Return Request</p>
                      <p className="text-xs text-slate-500 mt-1">Customer requested return for #ORD-25050-003.</p>
                      <p className="text-[10px] text-slate-400 mt-2">1 hour ago</p>
                    </div>
                  </div>
                  <div className="p-3 text-center border-t border-slate-100 bg-slate-50">
                    <button className="text-xs font-semibold text-slate-600 hover:text-rose-600">
                      View All
                    </button>
                  </div>
                </div>
              )}

              <div 
                className="flex items-center gap-3 pl-6 border-l border-slate-200 cursor-pointer group"
                onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
              >
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-slate-700 group-hover:text-rose-600 transition-colors">Order Manager</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-rose-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-rose-200 ring-2 ring-white">
                  OM
                </div>
              </div>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute top-14 right-0 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50">
                  <div className="p-4 border-b border-slate-100 bg-slate-50">
                    <p className="font-bold text-slate-800">Order Manager</p>
                    <p className="text-xs text-slate-500">manager@coskinn.com</p>
                  </div>
                  <div className="p-2">
                    <button 
                      onClick={() => { setShowProfileModal(true); setShowProfileMenu(false); }}
                      className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-rose-600 transition-colors"
                    >
                      <User className="w-4 h-4" /> My Profile
                    </button>
                    <button 
                      onClick={() => { setShowProfileModal(true); setShowProfileMenu(false); }}
                      className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-rose-600 transition-colors"
                    >
                      <Settings className="w-4 h-4" /> Security (Twilio 2FA)
                    </button>
                    <div className="h-px bg-slate-100 my-2 mx-2"></div>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* SCROLLABLE ROUTE CONTENT */}
          <div 
            className="flex-1 overflow-y-auto p-8 relative"
            onClick={() => { setShowProfileMenu(false); setShowNotifications(false); }}
          >
            <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-rose-50/50 to-transparent pointer-events-none -z-10" />
            
            <Routes>
              <Route path="/" element={<OrderDashboard />} />
              <Route path="/list" element={<OrderList />} />
              <Route path="/fulfillment" element={<FulfillmentScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/returns" element={<ReturnQueue />} />
              <Route path="/cancellations" element={<CancellationsScreen />} />
              <Route path="/payments" element={<PaymentsScreen />} />
              <Route path="/invoices" element={<InvoicesScreen />} />
              <Route path="/reports" element={<OrderReportsScreen />} />
              <Route path="/settings" element={<OrderSettingsScreen />} />
              <Route path="/:id" element={<OrderDetail />} />
              <Route path="*" element={<Navigate to="/orders" replace />} />
            </Routes>
          </div>
        </main>
      </div>

      {/* Profile & Security Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">Profile & Security Settings</h3>
              <button 
                onClick={() => setShowProfileModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xl"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Profile Info */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-3">Profile Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500">Name</label>
                    <p className="text-sm font-medium text-slate-800 mt-0.5">Order Manager</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500">Email</label>
                    <p className="text-sm font-medium text-slate-800 mt-0.5">manager@coskinn.com</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500">Role</label>
                    <p className="text-sm font-medium text-slate-800 mt-0.5">Order Manager</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500">Department</label>
                    <p className="text-sm font-medium text-slate-800 mt-0.5">Order Management</p>
                  </div>
                </div>
              </div>

              {/* 2FA Section */}
              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-sm font-bold text-slate-700 mb-3">SMS Verification (Twilio 2FA)</h4>
                {isVerified ? (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
                    <p className="text-emerald-700 font-semibold text-sm">✓ Phone Verified</p>
                    <p className="text-xs text-emerald-600 mt-1">{phone2FA}</p>
                  </div>
                ) : !isConfiguring2FA ? (
                  <button 
                    onClick={() => setIsConfiguring2FA(true)}
                    className="w-full bg-slate-800 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-700 transition-colors"
                  >
                    Setup SMS Verification
                  </button>
                ) : !otpSent ? (
                  <div className="space-y-3">
                    <input 
                      type="tel"
                      value={phone2FA}
                      onChange={(e) => setPhone2FA(e.target.value)}
                      placeholder="+91XXXXXXXXXX"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                    />
                    <button 
                      onClick={handleSendOtp}
                      className="w-full bg-rose-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-rose-700 transition-colors"
                    >
                      Send OTP
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">OTP sent to {phone2FA}</p>
                    <input 
                      type="text"
                      value={otp2FA}
                      onChange={(e) => setOtp2FA(e.target.value)}
                      placeholder="Enter OTP"
                      maxLength={6}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none text-center tracking-widest"
                    />
                    <button 
                      onClick={handleVerifyOtp}
                      className="w-full bg-rose-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-rose-700 transition-colors"
                    >
                      Verify OTP
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </QueryClientProvider>
  );
}
