import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/auth';
import { useQuery } from '@tanstack/react-query';

interface User {
  id: string;
  email: string;
  role: string;
  panel_access: string[];
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));

  // Fetch current user if token exists
  const { data: user, isLoading, isError, refetch } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authApi.getCurrentUser,
    enabled: !!token,
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      // Token might be invalid or expired
      localStorage.removeItem('access_token');
      setToken(null);
    }
  }, [isError]);

  const login = (newToken: string) => {
    localStorage.setItem('access_token', newToken);
    setToken(newToken);
    refetch();
  };

  const logout = async () => {
    try {
      if (token) await authApi.logout();
    } catch (e) {
      console.error(e);
    } finally {
      localStorage.removeItem('access_token');
      setToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
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
