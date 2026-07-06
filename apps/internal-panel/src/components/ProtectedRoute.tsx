import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { hasPermission } from '../config/roles';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { role } = useAuth();
  const location = useLocation();

  if (!hasPermission(role, location.pathname)) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h2 className="text-3xl font-bold text-rose-900 mb-2">Access Denied</h2>
        <p className="text-slate-600 mb-6">Your current role ({role}) does not have permission to view this page.</p>
        <Navigate to="/admin" replace />
      </div>
    );
  }

  return <>{children}</>;
};
