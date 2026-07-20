import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import apiClient from '../utils/apiClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  // Initialize session on mount
  useEffect(() => {
    const initSession = async () => {
      const sessionStr = localStorage.getItem('coskinn_session');
      if (sessionStr) {
        try {
          const session = JSON.parse(sessionStr);
          if (session.user && session.token) {
            setUser(session.user);
            
            try {
              const res = await apiClient.get('/customer/me');
              if (res.data) {
                setUser(res.data);
                session.user = res.data;
                localStorage.setItem('coskinn_session', JSON.stringify(session));
              }
            } catch (err) {
              console.error("Failed to fetch fresh profile", err);
            }
          }
        } catch (e) {
          console.error("Failed to parse session", e);
        }
      }
      setLoading(false);
    };
    initSession();
  }, []);

  const sendMobileOtp = async (phone) => {
    // Format to E.164 if it's a 10 digit Indian number
    const formattedPhone = phone.length === 10 ? `+91${phone}` : phone;
    const response = await apiClient.post('/auth/send-otp', { phone: formattedPhone });
    return response.data;
  };

  const verifyMobileOtp = async (phone, otp) => {
    const formattedPhone = phone.length === 10 ? `+91${phone}` : phone;
    const response = await apiClient.post('/auth/verify-otp', { phone: formattedPhone, otp });
    
    if (response.data && response.data.access_token) {
      const sessionUser = {
        ...response.data.user,
      };
      
      const sessionData = {
        user: sessionUser,
        token: response.data.access_token,
        refreshToken: response.data.refresh_token
      };
      
      setUser(sessionUser);
      localStorage.setItem('coskinn_session', JSON.stringify(sessionData));
      return sessionData;
    }
    throw new Error('Authentication failed');
  };

  const updateUserProfile = async (updatedData) => {
    const res = await apiClient.put('/customer/profile', updatedData);
    const freshUser = res.data;
    
    setUser(freshUser);
    
    const sessionStr = localStorage.getItem('coskinn_session');
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        session.user = freshUser;
        localStorage.setItem('coskinn_session', JSON.stringify(session));
      } catch (e) {
        console.error("Failed to update session", e);
      }
    }
    
    return freshUser;
  };

  const logout = async () => {
    const sessionStr = localStorage.getItem('coskinn_session');
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        if (session.refreshToken) {
          // Attempt to logout on backend, ignore errors if token already expired
          await apiClient.post('/auth/logout', { refreshToken: session.refreshToken }).catch(() => {});
        }
      } catch (e) {
        console.error("Failed to parse session during logout", e);
      }
    }
    setUser(null);
    localStorage.removeItem('coskinn_session');
  };

  useEffect(() => {
    const handleLogoutEvent = () => {
      logout();
    };
    window.addEventListener('auth:logout', handleLogoutEvent);
    return () => window.removeEventListener('auth:logout', handleLogoutEvent);
  }, []);

  const memoizedContextValue = useMemo(() => ({
    user,
    loading,
    sendMobileOtp,
    verifyMobileOtp,
    logout,
    updateUserProfile,
    isAuthModalOpen,
    setIsAuthModalOpen,
    openAuthModal,
    closeAuthModal
  }), [user, loading, isAuthModalOpen]);

  return (
    <AuthContext.Provider value={memoizedContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
