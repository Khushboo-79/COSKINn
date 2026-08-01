import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface RequirePanelProps {
  children: React.ReactNode;
  panelId: string;
}

export const RequirePanel: React.FC<RequirePanelProps> = ({ children, panelId }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>; // Could use a better loader
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Super admin check or specific panel check
  const hasAccess = user.panel_access.includes('admin') || user.panel_access.includes(panelId);

  if (!hasAccess) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};

interface RequirePermissionProps {
  children: React.ReactNode;
  permission: string;
  fallback?: React.ReactNode;
}

export const RequirePermission: React.FC<RequirePermissionProps> = ({ children, permission, fallback = null }) => {
  const { user } = useAuth();

  const hasPermission = user?.permissions.includes(permission) || user?.panel_access.includes('admin');

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
