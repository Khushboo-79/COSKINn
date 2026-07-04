
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Stub components for each panel
const AdminPanel = () => <div>Admin Panel (2FA Required)</div>;
const FinancePanel = () => <div>Finance Panel (2FA Required)</div>;
const AuditPanel = () => <div>Auditor Panel (Read-only)</div>;
const ProductPanel = () => <div>Product Management</div>;
const InventoryPanel = () => <div>Inventory Management</div>;
const OrdersPanel = () => <div>Order Management</div>;
const WarehousePanel = () => <div>Warehouse Panel</div>;
const SupportPanel = () => <div>Customer Support</div>;
const MarketingPanel = () => <div>Marketing & CRM</div>;
const ContentPanel = () => <div>Content Management</div>;
const HRPanel = () => <div>HR Panel</div>;

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50">
        <nav className="w-64 bg-white border-r p-4 space-y-4">
          <h1 className="text-xl font-bold text-gray-800 mb-8">COSKINn Internal</h1>
          {/* Navigation Links would go here */}
        </nav>
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/admin/*" element={<AdminPanel />} />
            <Route path="/finance/*" element={<FinancePanel />} />
            <Route path="/audit/*" element={<AuditPanel />} />
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
    </BrowserRouter>
  );
};

export default App;
