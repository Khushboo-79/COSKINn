import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuditModuleRoutes } from './modules/audit';

// Stub components for each panel
const AdminPanel = () => <div>Admin Panel (2FA Required)</div>;
const FinancePanel = () => <div>Finance Panel (2FA Required)</div>;
const ProductPanel = () => <div>Product Management</div>;
const InventoryPanel = () => <div>Inventory Management</div>;
const OrdersPanel = () => <div>Order Management</div>;
const WarehousePanel = () => <div>Warehouse Panel</div>;
const SupportPanel = () => <div>Customer Support</div>;
const MarketingPanel = () => <div>Marketing & CRM</div>;
const ContentPanel = () => <div>Content Management</div>;
const HRPanel = () => <div>HR Panel</div>;

const Logo = () => (
  <div className="flex items-end relative">
    <img src="/logo.webp" alt="C" className="h-[4.25rem] w-[4.25rem] object-contain -mr-2" />
    <span style={{ fontFamily: '"Expletus Sans", sans-serif' }} className="text-[2.5rem] leading-none font-medium tracking-wide text-black mb-1.5 flex items-baseline">
      OSK
      <span className="relative inline-block px-[1px]">
        <img src="/coskinLogo.webp" alt="Heart" className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-[18px] h-[14px] object-contain" />
        <span className="text-transparent relative z-10" style={{ textShadow: "0 0 0 black" }}>I</span>
      </span>
      N<span className="text-3xl ml-0.5">n</span>
    </span>
  </div>
);

const AppContent = () => {
  const location = useLocation();
  const isAudit = location.pathname.startsWith('/audit');

  return (
    <div className="flex min-h-screen bg-rose-50/30">
      {!isAudit && (
        <nav className="w-64 bg-white border-r border-rose-100 p-4 space-y-4 shrink-0">
          <Logo />
          {/* Navigation Links would go here */}
        </nav>
      )}
      <main className="flex-1 p-8 overflow-x-hidden">
        {isAudit && (
          <header className="w-full flex items-center justify-center mb-8 relative min-h-[4.25rem]">
            <div className="absolute left-0 top-0">
              <Logo />
            </div>
            {(location.pathname === '/audit' || location.pathname === '/audit/') && (
              <h2 className="text-[2rem] font-bold text-rose-900">Auditor Dashboard</h2>
            )}
          </header>
        )}
        <Routes>
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="/finance/*" element={<FinancePanel />} />
          <Route path="/audit/*" element={<AuditModuleRoutes />} />
          <Route path="/product/*" element={<ProductPanel />} />
          <Route path="/inventory/*" element={<InventoryPanel />} />
          <Route path="/orders/*" element={<OrdersPanel />} />
          <Route path="/warehouse/*" element={<WarehousePanel />} />
          <Route path="/support/*" element={<SupportPanel />} />
          <Route path="/marketing/*" element={<MarketingPanel />} />
          <Route path="/content/*" element={<ContentPanel />} />
          <Route path="/hr/*" element={<HRPanel />} />
          <Route path="/" element={<Navigate to="/admin" replace />} />
        </Routes>
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
