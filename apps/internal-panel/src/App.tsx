import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const AuditModuleRoutes = lazy(() => import('./modules/audit').then(m => ({ default: m.AuditModuleRoutes })));
const ProductModuleRoutes = lazy(() => import('./modules/product').then(m => ({ default: m.ProductModuleRoutes })));
const InventoryModuleRoutes = lazy(() => import('./modules/inventory').then(m => ({ default: m.InventoryModuleRoutes })));
const OrderModuleRoutes = lazy(() => import('./modules/orders').then(m => ({ default: m.OrderModuleRoutes })));
const CrmModuleRoutes = lazy(() => import('./modules/crm').then(m => ({ default: m.CrmModuleRoutes })));
const AdminModuleRoutes = lazy(() => import('./modules/admin').then(m => ({ default: m.AdminModuleRoutes })));
const MarketingModuleRoutes = lazy(() => import('./modules/marketing'));
const FinanceModuleRoutes = lazy(() => import('./modules/finance'));
const WarehouseModuleRoutes = lazy(() => import('./modules/warehouse'));
const SupportModuleRoutes = lazy(() => import('./modules/support'));
const ContentModuleRoutes = lazy(() => import('./modules/content'));
const HRModuleRoutes = lazy(() => import('./modules/hr'));

import { Login } from './modules/auth/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ROLE_PERMISSIONS, AppRole } from './config/roles';
import { Layout } from './components/layout/Layout';

const AppContent = () => {
  const location = useLocation();
  const { role, isAuthenticated } = useAuth();
  
  const getInitialRoute = (userRole: AppRole) => {
    if (userRole === AppRole.SUPER_ADMIN) return '/admin';
    const paths = ROLE_PERMISSIONS[userRole] || [];
    return paths.length > 0 ? paths[0] : '/login';
  };

  if (location.pathname === '/login') {
    if (isAuthenticated) {
      return <Navigate to={getInitialRoute(role)} replace />;
    }
    return <Login />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }



  return (
    <Layout>
      <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div></div>}>
        <Routes>
          <Route path="/admin/*" element={<ProtectedRoute><AdminModuleRoutes /></ProtectedRoute>} />
          <Route path="/finance/*" element={<ProtectedRoute><FinanceModuleRoutes /></ProtectedRoute>} />
          <Route path="/audit/*" element={<ProtectedRoute><AuditModuleRoutes /></ProtectedRoute>} />
          <Route path="/product/*" element={<ProtectedRoute><ProductModuleRoutes /></ProtectedRoute>} />
          <Route path="/inventory/*" element={<ProtectedRoute><InventoryModuleRoutes /></ProtectedRoute>} />
          <Route path="/orders/*" element={<ProtectedRoute><OrderModuleRoutes /></ProtectedRoute>} />
          <Route path="/crm/*" element={<ProtectedRoute><CrmModuleRoutes /></ProtectedRoute>} />
          <Route path="/warehouse/*" element={<ProtectedRoute><WarehouseModuleRoutes /></ProtectedRoute>} />
          <Route path="/support/*" element={<ProtectedRoute><SupportModuleRoutes /></ProtectedRoute>} />
          <Route path="/marketing/*" element={<ProtectedRoute><MarketingModuleRoutes /></ProtectedRoute>} />
          <Route path="/content/*" element={<ProtectedRoute><ContentModuleRoutes /></ProtectedRoute>} />
          <Route path="/hr/*" element={<ProtectedRoute><HRModuleRoutes /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to={getInitialRoute(role)} replace />} />
        </Routes>
      </Suspense>
    </Layout>
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
