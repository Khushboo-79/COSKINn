import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './core/rbac/AuthContext';
import { RoleRouter, ForbiddenScreen } from './core/router';
import { LoginScreen } from './modules/auth/LoginScreen';
import { TwoFactorScreen } from './modules/auth/TwoFactorScreen';
import { ForgotPasswordScreen } from './modules/auth/ForgotPasswordScreen';
import { SharedShell } from './components/layout/SharedShell';
import { RequirePanel } from './core/rbac/RequirePanel';
import { AdminRouter } from './modules/admin/AdminRouter';
import { ProductRouter } from './modules/product/ProductRouter';
import { InventoryRouter } from './modules/inventory/InventoryRouter';
import { OrderRouter } from './modules/orders/OrderRouter';
import { WarehouseRouter } from './modules/warehouse/WarehouseRouter';
import { SupportRouter } from './modules/support/SupportRouter';
import { FinanceRouter } from './modules/finance/FinanceRouter';
import { MarketingRouter } from './modules/marketing/MarketingRouter';
import { ContentRouter } from './modules/content/ContentRouter';
import { HrRouter } from './modules/hr/HrRouter';
import { AuditRouter } from './modules/audit/AuditRouter';

// Initialize React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Auth Routes */}
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/auth/2fa" element={<TwoFactorScreen />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordScreen />} />
            <Route path="/403" element={<ForbiddenScreen />} />

            {/* Role-based entry point */}
            <Route path="/" element={<RoleRouter />} />

            {/* Protected Panel Routes (Wrapped in SharedShell) */}
            <Route element={<SharedShell />}>
              {/* Examples of protected panel roots. The real modules will replace these divs. */}
              <Route path="/admin/*" element={
                <RequirePanel panelId="admin">
                  <AdminRouter />
                </RequirePanel>
              } />
              
              <Route path="/product/*" element={
                <RequirePanel panelId="product">
                  <ProductRouter />
                </RequirePanel>
              } />
              
              <Route path="/inventory/*" element={
                <RequirePanel panelId="inventory">
                  <InventoryRouter />
                </RequirePanel>
              } />

              <Route path="/orders/*" element={
                <RequirePanel panelId="orders">
                  <OrderRouter />
                </RequirePanel>
              } />

              <Route path="/warehouse/*" element={
                <RequirePanel panelId="warehouse">
                  <WarehouseRouter />
                </RequirePanel>
              } />

              <Route path="/support/*" element={
                <RequirePanel panelId="support">
                  <SupportRouter />
                </RequirePanel>
              } />

              <Route path="/finance/*" element={
                <RequirePanel panelId="finance">
                  <FinanceRouter />
                </RequirePanel>
              } />

              <Route path="/marketing/*" element={
                <RequirePanel panelId="marketing">
                  <MarketingRouter />
                </RequirePanel>
              } />

              <Route path="/content/*" element={
                <RequirePanel panelId="content">
                  <ContentRouter />
                </RequirePanel>
              } />

              <Route path="/hr/*" element={
                <RequirePanel panelId="hr">
                  <HrRouter />
                </RequirePanel>
              } />

              <Route path="/audit/*" element={
                <RequirePanel panelId="audit">
                  <AuditRouter />
                </RequirePanel>
              } />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
