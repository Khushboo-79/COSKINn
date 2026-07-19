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
              
              {/* Other panels would go here */}
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
