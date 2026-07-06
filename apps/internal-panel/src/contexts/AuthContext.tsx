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
  login: (token: string, user: UserProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('internal_panel_token'));
  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem('internal_panel_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!token && !!user;
  
  // Default to SUPER_ADMIN if logged in and has it, else take their first role, else fallback for TS
  const role = user?.roles?.includes(AppRole.SUPER_ADMIN) 
    ? AppRole.SUPER_ADMIN 
    : user?.roles?.[0] || AppRole.PRODUCT_MANAGER;

  const login = (newToken: string, newUser: UserProfile) => {
    localStorage.setItem('internal_panel_token', newToken);
    localStorage.setItem('internal_panel_user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('internal_panel_token');
    localStorage.removeItem('internal_panel_user');
    setToken(null);
    setUser(null);
  };

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
