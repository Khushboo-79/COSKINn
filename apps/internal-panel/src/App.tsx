import { BrowserRouter, Routes, Route, Navigate, useLocation, NavLink } from 'react-router-dom';
import { AuditModuleRoutes } from './modules/audit';
import { ProductModuleRoutes } from './modules/product';
import { InventoryModuleRoutes } from './modules/inventory';
import { OrderModuleRoutes } from './modules/orders';
import { CrmModuleRoutes } from './modules/crm';
import { Login } from './modules/auth/Login';
import AdminPanel from './modules/admin/AdminPanel';
import MarketingPanel from './modules/marketing/MarketingPanel';
import { 
  Package, Search, LayoutDashboard, 
  DollarSign, Box, ShoppingCart, Truck, 
  Headphones, Megaphone, FileText, Users, LogOut
} from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { hasPermission } from './config/roles';

import FinancePanel from './modules/finance/FinancePanel';
import WarehousePanel from './modules/warehouse/WarehousePanel';
import SupportPanel from './modules/support/SupportPanel';
import ContentPanel from './modules/content/ContentPanel';
import HRPanel from './modules/hr/HRPanel';

const Logo = () => (
  <div className="flex items-end relative px-4">
    <img src="/logo.webp" alt="C" className="h-[3.5rem] w-[3.5rem] object-contain -mr-1" />
    <span style={{ fontFamily: '"Expletus Sans", sans-serif' }} className="text-[2rem] leading-none font-medium tracking-wide text-black mb-1 flex items-baseline">
      OSK
      <span className="relative inline-block px-[1px]">
        <img src="/coskinLogo.webp" alt="Heart" className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-[14px] h-[10px] object-contain" />
        <span className="text-transparent relative z-10" style={{ textShadow: "0 0 0 black" }}>I</span>
      </span>
      N<span className="text-2xl ml-0.5">n</span>
    </span>
  </div>
);

const AppContent = () => {
  const location = useLocation();
  const { role, isAuthenticated, user, logout } = useAuth();
  
  if (location.pathname === '/login') {
    if (isAuthenticated) {
      return <Navigate to="/admin" replace />;
    }
    return <Login />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }



  const mainNavItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'CRM', path: '/crm', icon: Users },
    { name: 'Products', path: '/product', icon: Package },
    { name: 'Finance', path: '/finance', icon: DollarSign },
    { name: 'Inventory', path: '/inventory', icon: Box },
    { name: 'Orders', path: '/orders', icon: ShoppingCart },
    { name: 'Warehouse', path: '/warehouse', icon: Truck },
    { name: 'Support', path: '/support', icon: Headphones },
    { name: 'Marketing', path: '/marketing', icon: Megaphone },
    { name: 'Content', path: '/content', icon: FileText },
    { name: 'Audit', path: '/audit', icon: Search },
    { name: 'HR', path: '/hr', icon: Users },
  ];

  // Filter items based on role
  const visibleNavItems = mainNavItems.filter(item => hasPermission(role, item.path));

  return (
    <div className="flex h-screen bg-rose-50/20 overflow-hidden font-sans">
      <nav className="w-64 bg-white/80 backdrop-blur-xl border-r border-rose-100 p-4 space-y-6 flex flex-col shrink-0 shadow-lg shadow-rose-100/50 relative z-20 overflow-y-auto">
        <Logo />
        
        <div className="space-y-1 mt-6 flex-1">
          {visibleNavItems.map(item => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-brand-gradient text-white shadow-md shadow-brand/30' 
                    : 'text-gray-600 hover:bg-brand/10 hover:text-brand'
                }`}
              >
                <Icon size={20} className={isActive ? 'opacity-100' : 'opacity-70'} />
                <span className="font-semibold text-sm">{item.name}</span>
              </NavLink>
            );
          })}
        </div>
        
        <div className="mt-auto border-t border-rose-100 pt-4">
          <div className="px-4 mb-2">
            <p className="text-xs text-gray-400 font-medium">LOGGED IN AS</p>
            <p className="text-sm font-semibold text-gray-800 truncate">{user?.email}</p>
            <p className="text-xs text-brand font-semibold mt-0.5">{role.replace('_', ' ')}</p>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 text-red-600 hover:bg-red-50"
          >
            <LogOut size={20} className="opacity-70" />
            <span className="font-semibold text-sm">Sign Out</span>
          </button>
        </div>
      </nav>
      <main className="flex-1 p-6 relative overflow-hidden flex flex-col">
        {/* Background blobs for premium feel */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 animate-blob"></div>
        <div className="absolute bottom-0 left-20 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -z-10 animate-blob animation-delay-2000"></div>

        <div className="flex-1 overflow-hidden relative z-10 bg-white/40 backdrop-blur-3xl rounded-3xl border border-white/60 shadow-xl shadow-rose-100/20 p-2">
          <Routes>
            <Route path="/admin/*" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
            <Route path="/finance/*" element={<ProtectedRoute><FinancePanel /></ProtectedRoute>} />
            <Route path="/audit/*" element={<ProtectedRoute><AuditModuleRoutes /></ProtectedRoute>} />
            <Route path="/product/*" element={<ProtectedRoute><ProductModuleRoutes /></ProtectedRoute>} />
            <Route path="/inventory/*" element={<ProtectedRoute><InventoryModuleRoutes /></ProtectedRoute>} />
            <Route path="/orders/*" element={<ProtectedRoute><OrderModuleRoutes /></ProtectedRoute>} />
            <Route path="/crm/*" element={<ProtectedRoute><CrmModuleRoutes /></ProtectedRoute>} />
            <Route path="/warehouse/*" element={<ProtectedRoute><WarehousePanel /></ProtectedRoute>} />
            <Route path="/support/*" element={<ProtectedRoute><SupportPanel /></ProtectedRoute>} />
            <Route path="/marketing/*" element={<ProtectedRoute><MarketingPanel /></ProtectedRoute>} />
            <Route path="/content/*" element={<ProtectedRoute><ContentPanel /></ProtectedRoute>} />
            <Route path="/hr/*" element={<ProtectedRoute><HRPanel /></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/admin" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
