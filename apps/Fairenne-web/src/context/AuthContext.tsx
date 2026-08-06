import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('coskin_token'));
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('coskin_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('coskin_token', token);
      // Validate session on mount
      fetch('http://localhost:3000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        if (!res.ok) throw new Error('Session expired');
        return res.json();
      })
      .then(data => {
        if (data && data.sub) {
          // the 'me' endpoint returns payload which contains 'sub' and 'email' etc.
          // Wait, 'me' usually returns req.user which is payload from jwt.
          // In standard NestJS jwt strategy it returns { userId: payload.sub, email: payload.email, roles: payload.roles }
          // We can fetch full profile instead, but let's just use what's there
          const userObj = {
            id: data.userId || data.sub || data.id,
            email: data.email,
            firstName: data.firstName || user?.firstName,
            lastName: data.lastName || user?.lastName,
            roles: data.roles
          };
          setUser(userObj);
          localStorage.setItem('coskin_user', JSON.stringify(userObj));
        }
      })
      .catch(() => {
        logout();
      });
    } else {
      localStorage.removeItem('coskin_token');
      localStorage.removeItem('coskin_user');
    }
  }, [token]);

  const isAuthenticated = !!token && !!user;

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('coskin_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('coskin_token');
    localStorage.removeItem('coskin_user');
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isAuthModalOpen,
      user,
      token,
      login, 
      logout,
      openAuthModal,
      closeAuthModal
    }}>
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
