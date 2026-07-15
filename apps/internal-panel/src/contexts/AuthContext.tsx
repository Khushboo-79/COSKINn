import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { AppRole } from '../config/roles';

export interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: AppRole[];
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  role: AppRole; // The primary active role
  login: (token: string, refreshToken: string | null, user: UserProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('internal_panel_token'));
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const savedUser = localStorage.getItem('internal_panel_user');
      return savedUser && savedUser !== 'undefined' ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      localStorage.removeItem('internal_panel_user');
      return null;
    }
  });

  const isAuthenticated = !!token && !!user;
  
  // Default to SUPER_ADMIN if logged in and has it, else take their first role, else fallback for TS
  const role = user?.roles?.includes(AppRole.SUPER_ADMIN) 
    ? AppRole.SUPER_ADMIN 
    : user?.roles?.[0] || AppRole.PRODUCT_MANAGER;

  const login = (newToken: string, newRefreshToken: string | null, newUser: UserProfile) => {
    localStorage.setItem('internal_panel_token', newToken);
    if (newRefreshToken) {
      localStorage.setItem('internal_panel_refresh_token', newRefreshToken);
    }
    localStorage.setItem('internal_panel_user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('internal_panel_token');
    localStorage.removeItem('internal_panel_refresh_token');
    localStorage.removeItem('internal_panel_user');
    setToken(null);
    setUser(null);
  };

  // Listen for the global 'auth-expired' event fired by axios interceptor
  React.useEffect(() => {
    const handleAuthExpired = () => {
      logout();
    };
    window.addEventListener('auth-expired', handleAuthExpired);
    return () => {
      window.removeEventListener('auth-expired', handleAuthExpired);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
