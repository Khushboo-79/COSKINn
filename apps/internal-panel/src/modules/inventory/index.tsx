import { Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { 
  Home, ArrowDownToLine, ArrowUpFromLine, Building2, Users, 
  FileText, ArrowRightLeft, RotateCcw, BarChart2, Settings, 
  Search, Bell, LogOut, User
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { api } from '../../lib/axios';

// Import screens
import InventoryDashboard from './InventoryDashboard';
import StockInScreen from './StockInScreen';
import StockOutScreen from './StockOutScreen';
import WarehousesScreen from './WarehousesScreen';
import SuppliersScreen from './SuppliersScreen';
import PurchaseOrdersScreen from './PurchaseOrdersScreen';
import TransfersScreen from './TransfersScreen';
import ReturnsScreen from './ReturnsScreen';
import ReportsScreen from './ReportsScreen';
import SettingsScreen from './SettingsScreen';
import ProductsListScreen from './ProductsListScreen';
import AlertsScreen from './AlertsScreen';
import ActivityScreen from './ActivityScreen';

const queryClient = new QueryClient();

export const InventoryModuleRoutes = () => {
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
    } catch (err) {
      toast.error('Failed to send OTP');
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
      setIsConfiguring2FA(false);
      toast.success('2FA configured successfully!');
    } catch (err) {
      toast.error('Invalid OTP');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('internal_panel_token');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/inventory', icon: Home },
    { name: 'Stock In', path: '/inventory/stock-in', icon: ArrowDownToLine },
    { name: 'Stock Out', path: '/inventory/stock-out', icon: ArrowUpFromLine },
    { name: 'Warehouses', path: '/inventory/warehouses', icon: Building2 },
    { name: 'Suppliers', path: '/inventory/suppliers', icon: Users },
    { name: 'Purchase Orders', path: '/inventory/purchase-orders', icon: FileText },
    { name: 'Transfers', path: '/inventory/transfers', icon: ArrowRightLeft },
    { name: 'Returns', path: '/inventory/returns', icon: RotateCcw },
    { name: 'Reports', path: '/inventory/reports', icon: BarChart2 },
    { name: 'Settings', path: '/inventory/settings', icon: Settings },
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
              Inventory Panel<br/>Overview
            </div>
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              The Inventory Panel manages product stock, stock movement, suppliers, warehouse tracking, low-stock alerts, returns, and reports in one centralized system.
            </p>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/inventory'}
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
            {/* Logo for mobile / minimal view */}
            <div className="flex items-center gap-2 md:hidden">
              <span className="text-2xl font-bold text-rose-600">COSKINn</span>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-auto">
              <div className="relative w-full">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search products, SKUs, orders..."
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
                      <p className="text-sm font-semibold text-slate-800">Low Stock Alert</p>
                      <p className="text-xs text-slate-500 mt-1">SKU-992 is below minimum threshold in Warehouse A.</p>
                      <p className="text-[10px] text-slate-400 mt-2">10 minutes ago</p>
                    </div>
                    <div className="p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer">
                      <p className="text-sm font-semibold text-slate-800">New Return Processed</p>
                      <p className="text-xs text-slate-500 mt-1">Return #RET-1092 has been marked for restock.</p>
                      <p className="text-[10px] text-slate-400 mt-2">1 hour ago</p>
                    </div>
                  </div>
                  <div className="p-3 text-center border-t border-slate-100 bg-slate-50">
                    <button 
                      onClick={() => navigate('/inventory/alerts')}
                      className="text-xs font-semibold text-slate-600 hover:text-rose-600"
                    >
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
                  <p className="text-sm font-semibold text-slate-700 group-hover:text-rose-600 transition-colors">Inventory Manager</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-rose-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-rose-200 ring-2 ring-white">
                  IM
                </div>
              </div>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute top-14 right-0 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50">
                  <div className="p-4 border-b border-slate-100 bg-slate-50">
                    <p className="font-bold text-slate-800">Inventory Manager</p>
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
            {/* Gradient background effect */}
            <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-rose-50/50 to-transparent pointer-events-none -z-10" />
            
            <Routes>
              <Route path="/" element={<InventoryDashboard />} />
              <Route path="/stock-in" element={<StockInScreen />} />
              <Route path="/stock-out" element={<StockOutScreen />} />
              <Route path="/warehouses" element={<WarehousesScreen />} />
              <Route path="/suppliers" element={<SuppliersScreen />} />
              <Route path="/purchase-orders" element={<PurchaseOrdersScreen />} />
              <Route path="/transfers" element={<TransfersScreen />} />
              <Route path="/returns" element={<ReturnsScreen />} />
              <Route path="/reports" element={<ReportsScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
              
              {/* New Dedicated Screens */}
              <Route path="/products" element={<ProductsListScreen />} />
              <Route path="/alerts" element={<AlertsScreen />} />
              <Route path="/activity" element={<ActivityScreen />} />
              
              <Route path="*" element={<Navigate to="/inventory" replace />} />
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
              
              {/* Profile Details */}
              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" /> Account Details
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Full Name</label>
                    <input type="text" defaultValue="Inventory Manager" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email Address</label>
                    <input type="email" defaultValue="manager@coskinn.com" disabled className="w-full px-4 py-2.5 bg-slate-100 text-slate-500 border border-slate-200 rounded-xl text-sm" />
                  </div>
                </div>
              </div>

              {/* Twilio Authentication */}
              <div className="border-t border-slate-100 pt-6">
                <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-slate-400" /> Two-Factor Authentication (Twilio)
                </h4>
                <p className="text-xs text-slate-500 mb-4">Secure your account using SMS verification powered by Twilio.</p>
                
                {isVerified ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold text-emerald-800">SMS Verification Enabled</p>
                      <p className="text-xs text-emerald-600 mt-1">Configured for {phone2FA}</p>
                    </div>
                  </div>
                ) : isConfiguring2FA ? (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                    {!otpSent ? (
                      <>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Phone Number (with Country Code)</label>
                          <input 
                            type="tel" 
                            placeholder="+919876543210" 
                            value={phone2FA}
                            onChange={e => setPhone2FA(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm"
                          />
                        </div>
                        <button 
                          onClick={handleSendOtp}
                          className="w-full bg-rose-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-rose-700"
                        >
                          Send OTP
                        </button>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Enter OTP</label>
                          <input 
                            type="text" 
                            placeholder="123456" 
                            value={otp2FA}
                            onChange={e => setOtp2FA(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm"
                          />
                        </div>
                        <button 
                          onClick={handleVerifyOtp}
                          className="w-full bg-rose-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-rose-700"
                        >
                          Verify OTP
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => { setIsConfiguring2FA(false); setOtpSent(false); }}
                      className="w-full text-slate-500 hover:text-slate-700 text-xs font-medium"
                    >
                      Cancel Setup
                    </button>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">SMS Verification</p>
                      <p className="text-xs text-slate-500 mt-1">Not configured</p>
                    </div>
                    <button 
                      onClick={() => setIsConfiguring2FA(true)}
                      className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition-colors">
                      Configure
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-4 flex gap-3 border-t border-slate-100 mt-6">
                <button 
                  onClick={() => setShowProfileModal(false)}
                  className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    toast.success('Settings saved successfully!');
                    setShowProfileModal(false);
                  }}
                  className="flex-1 bg-rose-600 text-white py-3 rounded-xl font-semibold hover:bg-rose-700 transition-colors shadow-sm shadow-rose-200"
                >
                  Save Profile
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </QueryClientProvider>
  );
};
