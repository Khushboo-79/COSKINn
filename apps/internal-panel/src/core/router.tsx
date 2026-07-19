import React, { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from './rbac/AuthContext';

export const RoleRouter = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !user) {
        navigate('/login', { replace: true });
        return;
      }

      // Role router logic
      const access = user.panel_access || [];

      if (access.length > 1 || access.includes('admin')) {
        navigate('/admin', { replace: true });
      } else if (access.length === 1) {
        // Navigate to that specific panel's root
        navigate(`/${access[0]}`, { replace: true });
      } else {
        // No panel access
        navigate('/403', { replace: true });
      }
    }
  }, [user, isAuthenticated, isLoading, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 bg-primary-200 rounded-full mb-4"></div>
        <div className="text-slate-500 font-medium">Routing to your dashboard...</div>
      </div>
    </div>
  );
};

// 403 Forbidden Component
export const ForbiddenScreen = () => {
  const { logout } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <div className="text-red-500 text-6xl font-bold mb-4">403</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
        <p className="text-slate-600 mb-8">
          You don't have permission to access this panel. Please contact your administrator if you believe this is a mistake.
        </p>
        <button
          onClick={logout}
          className="w-full bg-slate-900 text-white font-medium py-3 px-4 rounded-xl hover:bg-slate-800 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};
