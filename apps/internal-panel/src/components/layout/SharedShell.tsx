import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../core/rbac/AuthContext';
import {
  Menu, X, Search, Bell, Mail, LogOut, User,
  LayoutDashboard, ShoppingBag, Package, ShoppingCart,
  Truck, HeadphonesIcon, FileText, Megaphone,
  Briefcase, ShieldCheck, DollarSign, ShieldAlert, Boxes, Box,
  RefreshCw, MessageSquare
} from 'lucide-react';
import { GlobalSearch } from '../ui/GlobalSearch';

const PANEL_ROUTES = [
  { id: 'admin', path: '/admin', label: 'Admin', icon: ShieldAlert },
  { id: 'product', path: '/product', label: 'Product Catalog', icon: Package },
  { id: 'inventory', path: '/inventory', label: 'Inventory', icon: Boxes },
  { id: 'warehouse', path: '/warehouse', label: 'Warehouse', icon: Box },
  { id: 'orders', path: '/orders', label: 'Orders', icon: ShoppingCart },
  { id: 'returns', path: '/returns', label: 'Returns & QC', icon: RefreshCw },
  { id: 'support', path: '/support', label: 'Customer Support', icon: MessageSquare },
  { id: 'finance', path: '/finance', label: 'Tax & Finance', icon: DollarSign },
  { id: 'marketing', path: '/marketing', label: 'Marketing/CRM', icon: Megaphone },
  { id: 'content', path: '/content', label: 'Content CMS', icon: FileText },
  { id: 'hr', path: '/hr', label: 'HR', icon: Briefcase },
  { id: 'audit', path: '/audit', label: 'Auditor', icon: ShieldCheck },
];

export const SharedShell = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isMailOpen, setMailOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // Filter available routes based on panel_access
  const availableRoutes = PANEL_ROUTES.filter(route =>
    user?.panel_access.includes('admin') || user?.panel_access.includes(route.id)
  );

  return (
    <div className="h-screen overflow-hidden bg-[#fafafa] flex flex-col md:flex-row font-sans">

      {/* Mobile Overlay */}
      {!isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? '-translate-x-full md:translate-x-0 md:w-20' : 'translate-x-0 w-64'
          } fixed md:relative z-30 inset-y-0 left-0 bg-gradient-to-b from-[#fff0f2] to-[#FFDAB9]/20 border-r border-primary-200 text-slate-700 transition-all duration-300 ease-in-out flex flex-col shadow-sm`}
      >
        <div className="h-20 flex items-center justify-center px-4 bg-transparent border-b border-primary-200/50 relative w-full overflow-visible">
          {isSidebarOpen && <img src="/logo-icon.png" alt="Fairenne Icon" className="h-12 w-auto object-contain scale-[1.3] origin-center" />}
          {!isSidebarOpen && <img src="/logo-full.png" alt="Fairenne Logo" className="w-[180px] h-auto max-h-[70px] object-contain scale-[1.8] origin-center" />}
          <button onClick={toggleSidebar} className="text-slate-400 hover:text-primary-500 md:hidden absolute right-4 z-10 bg-white/50 rounded-full p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 space-y-1 sidebar-scroll">
          {availableRoutes.map((route) => {
            const Icon = route.icon;
            const isActive = location.pathname.startsWith(route.path);

            return (
              <Link
                key={route.id}
                to={route.path}
                className={`flex items-center px-4 py-3 mx-2 rounded-xl transition-all ${isActive
                    ? 'bg-gradient-to-r from-[#FF7F50] to-[#ff9aa8] text-white shadow-lg shadow-[#FF7F50]/30 font-semibold scale-[1.02]'
                    : 'hover:bg-white hover:text-[#FF7F50] hover:shadow-sm'
                  } ${isSidebarOpen ? 'justify-center' : ''}`}
                title={isSidebarOpen ? route.label : ''}
              >
                <Icon className={`h-5 w-5 flex-shrink-0 ${isSidebarOpen ? '' : 'mr-3'}`} />
                {!isSidebarOpen && <span className="font-medium truncate">{route.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 bg-white/50 border-t border-primary-100">
          <button
            onClick={logout}
            className={`flex items-center text-slate-500 hover:text-rose-500 transition-colors w-full ${isSidebarOpen ? 'justify-center' : ''}`}
          >
            <LogOut className="h-5 w-5" />
            {!isSidebarOpen && <span className="ml-3 font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Topbar */}
        <header className="h-16 bg-gradient-to-r from-[#fff0f2]/90 to-[#FFDAB9]/40 backdrop-blur-md border-b border-primary-200/50 flex items-center justify-between px-4 lg:px-8 z-10 shadow-sm relative">
          <div className="flex items-center flex-1">
            <button
              onClick={toggleSidebar}
              className="text-slate-500 hover:text-slate-700 focus:outline-none p-2 -ml-2 mr-2 rounded-md"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="hidden sm:flex max-w-md w-full ml-4">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <div
                  className="flex items-center justify-between w-full pl-10 pr-3 py-2 border border-slate-200 rounded-full bg-slate-50 text-sm text-slate-400 cursor-pointer hover:bg-white hover:ring-2 hover:ring-primary-500 hover:border-primary-500 transition-all"
                  onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
                >
                  <span>Search modules, pages...</span>
                  <span className="hidden lg:flex items-center space-x-1">
                    <kbd className="font-sans font-semibold text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded">⌘</kbd>
                    <kbd className="font-sans font-semibold text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded">K</kbd>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative">
              <button 
                onClick={() => {
                  setMailOpen(!isMailOpen);
                  setNotificationOpen(false);
                  setProfileOpen(false);
                }}
                className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-50 transition-colors relative"
              >
                <Mail className="h-5 w-5" />
              </button>

              {/* Messages Dropdown */}
              {isMailOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMailOpen(false)}></div>
                  <div className="absolute right-0 top-12 w-72 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
                    <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                      <h3 className="font-bold text-sm text-slate-800">Messages</h3>
                      <span className="text-xs text-primary-600 cursor-pointer hover:underline">Mark all read</span>
                    </div>
                    <div className="p-6 text-center">
                      <Mail className="h-8 w-8 text-slate-200 mx-auto mb-2" />
                      <p className="text-sm font-medium text-slate-600">No new messages</p>
                      <p className="text-xs text-slate-400 mt-1">You're all caught up!</p>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationOpen(!isNotificationOpen);
                  setMailOpen(false);
                  setProfileOpen(false);
                }}
                className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-50 transition-colors relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Notifications Dropdown */}
              {isNotificationOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotificationOpen(false)}></div>
                  <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <h3 className="font-bold text-sm text-slate-800">Notifications</h3>
                    </div>
                    <div className="px-4 py-3 hover:bg-slate-50 cursor-pointer">
                      <p className="text-sm font-medium text-slate-800">New Product Approval</p>
                      <p className="text-xs text-slate-500 mt-1">Vitamin C Face Wash is awaiting review.</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-slate-50 cursor-pointer border-t border-slate-50">
                      <p className="text-sm font-medium text-slate-800">System Update</p>
                      <p className="text-xs text-slate-500 mt-1">Version 1.2 deployed successfully.</p>
                    </div>
                    <div className="px-4 py-2 border-t border-slate-100 text-center">
                      <span className="text-xs font-semibold text-primary-600 hover:text-primary-700 cursor-pointer">View All</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block"></div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileOpen(!isProfileOpen);
                  setNotificationOpen(false);
                  setMailOpen(false);
                }}
                className="flex items-center cursor-pointer p-1 pr-2 rounded-full hover:bg-slate-50 transition-colors focus:outline-none"
              >
                <div className="h-8 w-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold">
                  {user?.email?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                </div>
                <div className="hidden md:block ml-2 text-sm text-left">
                  <span className="block font-medium text-slate-700 truncate max-w-[120px]">{user?.email}</span>
                  <span className="block text-slate-500 text-xs capitalize">{user?.role}</span>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)}></div>
                  <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50">
                    <Link
                      to="/admin/profile"
                      onClick={() => setProfileOpen(false)}
                      className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center"
                    >
                      <User className="h-4 w-4 mr-2 text-slate-400" />
                      My Profile
                    </Link>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center font-medium"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content Frame */}
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          <Outlet />
        </main>
        <GlobalSearch />
      </div>
    </div>
  );
};
