import { BrowserRouter, Routes, Route, Navigate, useLocation, NavLink } from 'react-router-dom';
import { AuditModuleRoutes } from './modules/audit';
import { ProductModuleRoutes } from './modules/product';
import { Package, Search, LayoutDashboard, Settings } from 'lucide-react';

// Stub components for each panel
const AdminPanel = () => <div>Admin Panel (2FA Required)</div>;
const FinancePanel = () => <div>Finance Panel (2FA Required)</div>;
const InventoryPanel = () => <div>Inventory Management</div>;
const OrdersPanel = () => <div>Order Management</div>;
const WarehousePanel = () => <div>Warehouse Panel</div>;
const SupportPanel = () => <div>Customer Support</div>;
const MarketingPanel = () => <div>Marketing & CRM</div>;
const ContentPanel = () => <div>Content Management</div>;
const HRPanel = () => <div>HR Panel</div>;

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
  const isAudit = location.pathname.startsWith('/audit');

  const mainNavItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/product', icon: Package },
    { name: 'Audit', path: '/audit', icon: Search },
    { name: 'Settings', path: '/hr', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-rose-50/20 overflow-hidden font-sans">
      {!isAudit && (
        <nav className="w-64 bg-white/80 backdrop-blur-xl border-r border-rose-100 p-4 space-y-6 flex flex-col shrink-0 shadow-lg shadow-rose-100/50 relative z-20">
          <Logo />
          
          <div className="space-y-1 mt-6 flex-1">
            {mainNavItems.map(item => {
              const isActive = location.pathname.startsWith(item.path);
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-200' 
                      : 'text-gray-600 hover:bg-rose-50 hover:text-rose-600'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'opacity-100' : 'opacity-70'} />
                  <span className="font-semibold text-sm">{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>
      )}
      <main className="flex-1 p-6 relative overflow-hidden flex flex-col">
        {/* Background blobs for premium feel */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 animate-blob"></div>
        <div className="absolute bottom-0 left-20 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -z-10 animate-blob animation-delay-2000"></div>

        {isAudit && (
          <header className="w-full flex items-center justify-center mb-8 relative min-h-[4.25rem] shrink-0">
            <div className="absolute left-0 top-0">
              <Logo />
            </div>
            {(location.pathname === '/audit' || location.pathname === '/audit/') && (
              <h2 className="text-[2rem] font-bold text-rose-900">Auditor Dashboard</h2>
            )}
          </header>
        )}
        
        <div className="flex-1 overflow-hidden relative z-10 bg-white/40 backdrop-blur-3xl rounded-3xl border border-white/60 shadow-xl shadow-rose-100/20 p-2">
          <Routes>
            <Route path="/admin/*" element={<AdminPanel />} />
            <Route path="/finance/*" element={<FinancePanel />} />
            <Route path="/audit/*" element={<AuditModuleRoutes />} />
            <Route path="/product/*" element={<ProductModuleRoutes />} />
            <Route path="/inventory/*" element={<InventoryPanel />} />
            <Route path="/orders/*" element={<OrdersPanel />} />

          <Route path="/warehouse/*" element={<WarehousePanel />} />
          <Route path="/support/*" element={<SupportPanel />} />
          <Route path="/marketing/*" element={<MarketingPanel />} />
          <Route path="/content/*" element={<ContentPanel />} />
          <Route path="/hr/*" element={<HRPanel />} />
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
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
