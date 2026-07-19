import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../core/rbac/AuthContext';
import { 
  Menu, X, Search, Bell, Mail, LogOut, User,
  LayoutDashboard, ShoppingBag, Package, ShoppingCart, 
  Truck, HeadphonesIcon, FileText, Megaphone,
  Briefcase, ShieldCheck, DollarSign
} from 'lucide-react';

const PANEL_ROUTES = [
  { id: 'admin', path: '/admin', label: 'Admin', icon: ShieldCheck },
  { id: 'product', path: '/product', label: 'Product Mgmt', icon: ShoppingBag },
  { id: 'inventory', path: '/inventory', label: 'Inventory', icon: Package },
  { id: 'orders', path: '/orders', label: 'Order Mgmt', icon: ShoppingCart },
  { id: 'warehouse', path: '/warehouse', label: 'Warehouse', icon: Truck },
  { id: 'support', path: '/support', label: 'Support', icon: HeadphonesIcon },
  { id: 'finance', path: '/finance', label: 'Tax & Finance', icon: DollarSign },
  { id: 'marketing', path: '/marketing', label: 'Marketing/CRM', icon: Megaphone },
  { id: 'content', path: '/content', label: 'Content', icon: FileText },
  { id: 'hr', path: '/hr', label: 'HR', icon: Briefcase },
  { id: 'audit', path: '/audit', label: 'Auditor', icon: ShieldCheck },
];

export const SharedShell = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // Filter available routes based on panel_access
  const availableRoutes = PANEL_ROUTES.filter(route => 
    user?.panel_access.includes('admin') || user?.panel_access.includes(route.id)
  );

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans">
      
      {/* Mobile Overlay */}
      {!isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 md:hidden" 
          onClick={() => setSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? '-translate-x-full md:translate-x-0 md:w-20' : 'translate-x-0 w-64'
        } fixed md:relative z-30 inset-y-0 left-0 bg-slate-900 text-slate-300 transition-all duration-300 ease-in-out flex flex-col shadow-xl`}
      >
        <div className="h-16 flex items-center justify-between px-4 bg-slate-950 border-b border-slate-800">
          {!isSidebarOpen && <span className="font-bold text-white text-lg tracking-wide">COSKINn</span>}
          {isSidebarOpen && <span className="font-bold text-white text-lg mx-auto">CO</span>}
          <button onClick={toggleSidebar} className="text-slate-400 hover:text-white md:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 space-y-1">
          {availableRoutes.map((route) => {
            const Icon = route.icon;
            const isActive = location.pathname.startsWith(route.path);
            
            return (
              <Link
                key={route.id}
                to={route.path}
                className={`flex items-center px-4 py-3 mx-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary-600 text-white' 
                    : 'hover:bg-slate-800 hover:text-white'
                } ${isSidebarOpen ? 'justify-center' : ''}`}
                title={isSidebarOpen ? route.label : ''}
              >
                <Icon className={`h-5 w-5 flex-shrink-0 ${isSidebarOpen ? '' : 'mr-3'}`} />
                {!isSidebarOpen && <span className="font-medium truncate">{route.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <button 
            onClick={logout}
            className={`flex items-center text-slate-400 hover:text-white transition-colors w-full ${isSidebarOpen ? 'justify-center' : ''}`}
          >
            <LogOut className="h-5 w-5" />
            {!isSidebarOpen && <span className="ml-3 font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 z-10 shadow-sm">
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
                <input
                  type="text"
                  placeholder="Global search..."
                  className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-full bg-slate-50 text-sm focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-50 transition-colors">
              <Mail className="h-5 w-5" />
            </button>
            <button className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-50 transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block"></div>
            <div className="flex items-center cursor-pointer">
              <div className="h-8 w-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold">
                {user?.email?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
              </div>
              <div className="hidden md:block ml-2 text-sm">
                <span className="block font-medium text-slate-700 truncate max-w-[120px]">{user?.email}</span>
                <span className="block text-slate-500 text-xs capitalize">{user?.role}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Frame */}
        <main className="flex-1 overflow-auto bg-background p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
