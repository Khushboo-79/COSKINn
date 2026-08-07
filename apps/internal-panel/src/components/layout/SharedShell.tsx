import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../core/rbac/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../../core/api/admin';
import { supportApi } from '../../core/api/support';
import {
  Menu, X, Search, Bell, Mail, LogOut,
  LayoutDashboard, ShoppingBag, Package, ShoppingCart,
  Truck, HeadphonesIcon, FileText, Megaphone,
  Briefcase, ShieldCheck, DollarSign, ShieldAlert, Boxes, Box,
  RefreshCw, MessageSquare, AlertCircle, PackageCheck, CheckCircle2
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

  // Fetch real notifications from backend
  const { data: notifications = [] } = useQuery({
    queryKey: ['admin', 'notifications'],
    queryFn: adminApi.getNotifications,
    refetchInterval: 60000,
  });

  // Fetch real support tickets for messages
  const { data: tickets = [] } = useQuery({
    queryKey: ['support', 'open-tickets'],
    queryFn: () => supportApi.getTickets('OPEN'),
    refetchInterval: 60000,
  });

  const openTickets = (tickets as any[]).slice(0, 5);

  const unreadCount = notifications.filter((n: any) => !n.read).length;

  const NOTIF_ICONS: Record<string, React.ElementType> = {
    AlertCircle,
    PackageCheck,
    Bell,
    CheckCircle2,
  };

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
          className="fixed inset-0 bg-slate-900/50 z-20 md:hidden print:hidden"
          onClick={() => setSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? '-translate-x-full md:translate-x-0 md:w-20' : 'translate-x-0 w-64'
          } fixed md:relative z-30 inset-y-0 left-0 bg-gradient-to-b from-[#fff0f2] to-[#FFDAB9]/20 border-r border-primary-200 text-slate-700 transition-all duration-300 ease-in-out flex flex-col shadow-sm print:hidden`}
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
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden print:overflow-visible">

        {/* Topbar */}
        <header className="h-16 bg-gradient-to-r from-[#fff0f2]/90 to-[#FFDAB9]/40 backdrop-blur-md border-b border-primary-200/50 flex items-center justify-between px-4 lg:px-8 z-10 shadow-sm relative print:hidden">
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
                {openTickets.length > 0 && (
                  <span className="absolute top-1 right-1 h-4 w-4 bg-blue-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                    {openTickets.length > 9 ? '9+' : openTickets.length}
                  </span>
                )}
              </button>

              {/* Messages Dropdown */}
              {isMailOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMailOpen(false)}></div>
                  <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
                    <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                      <h3 className="font-bold text-sm text-slate-800">Support Messages</h3>
                      {openTickets.length > 0 && <span className="text-xs bg-blue-100 text-blue-600 font-bold px-2 py-0.5 rounded-full">{openTickets.length} open</span>}
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {openTickets.length === 0 ? (
                        <div className="p-6 text-center">
                          <Mail className="h-8 w-8 text-slate-200 mx-auto mb-2" />
                          <p className="text-sm font-medium text-slate-600">No open tickets</p>
                          <p className="text-xs text-slate-400 mt-1">You're all caught up!</p>
                        </div>
                      ) : (
                        openTickets.map((ticket: any) => (
                          <Link
                            key={ticket.id}
                            to="/support"
                            onClick={() => setMailOpen(false)}
                            className="px-4 py-3 hover:bg-slate-100 cursor-pointer border-b border-slate-50 block transition-colors"
                          >
                            <div className="flex items-start gap-2">
                              <div className="h-7 w-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                                {ticket.user?.firstName?.charAt(0) || ticket.customerName?.charAt(0) || 'C'}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-800 truncate">{ticket.subject}</p>
                                <p className="text-xs text-slate-500 mt-0.5">{ticket.user?.firstName || ticket.customerName || 'Customer'}</p>
                              </div>
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-600 flex-shrink-0">OPEN</span>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                    <div className="px-4 py-2 border-t border-slate-100 text-center">
                      <Link to="/support" onClick={() => setMailOpen(false)} className="text-xs font-semibold text-primary-600 hover:text-primary-700">View All Tickets</Link>
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
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotificationOpen(false)}></div>
                  <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center">
                      <h3 className="font-bold text-sm text-slate-800">Notifications</h3>
                      {unreadCount > 0 && <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">{unreadCount} new</span>}
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center">
                          <CheckCircle2 className="h-8 w-8 text-slate-200 mx-auto mb-2" />
                          <p className="text-sm text-slate-500">All clear! No alerts.</p>
                        </div>
                      ) : (
                        notifications.map((notif: any) => {
                          const Icon = NOTIF_ICONS[notif.iconType] || Bell;
                          const navTo = notif.id === 'notif-stock' ? '/inventory'
                            : notif.id === 'notif-tickets' ? '/support'
                            : notif.id === 'notif-orders' ? '/orders'
                            : '/admin';
                          return (
                            <Link
                              key={notif.id}
                              to={navTo}
                              onClick={() => setNotificationOpen(false)}
                              className={`px-4 py-3 hover:bg-slate-100 border-b border-slate-50 flex items-start gap-3 transition-colors ${!notif.read ? 'bg-orange-50/40' : ''}`}
                            >
                              <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${notif.bg}`}>
                                <Icon className={`h-4 w-4 ${notif.color}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-800">{notif.title}</p>
                                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{notif.message}</p>
                                <p className="text-[10px] text-slate-400 mt-1">{notif.time}</p>
                              </div>
                              {!notif.read && <div className="h-2 w-2 bg-red-400 rounded-full flex-shrink-0 mt-1"></div>}
                            </Link>
                          );
                        })
                      )}
                    </div>
                    <div className="px-4 py-2 border-t border-slate-100 text-center">
                      <Link to="/admin" onClick={() => setNotificationOpen(false)} className="text-xs font-semibold text-primary-600 hover:text-primary-700">View Dashboard</Link>
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

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent relative z-0 print:overflow-visible print:h-auto">
          <div className="container mx-auto px-4 py-8 max-w-[1400px] print:p-0 print:m-0 print:max-w-none">
            <Outlet />
          </div>
        </main>
        <GlobalSearch />
      </div>
    </div>
  );
};
