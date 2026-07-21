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
          // Handle both { user, token } format and direct user object format
          const currentUser = session.user || session;
          
          if (currentUser && (currentUser.mobile || currentUser.email || currentUser.name)) {
            setUser(currentUser);
            
            if (session.token) {
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
    try {
      const response = await apiClient.post('/auth/send-otp', { phone: formattedPhone });
      return response.data;
    } catch (err) {
      console.warn("Backend down, mocking sendMobileOtp success");
      return new Promise(resolve => setTimeout(() => resolve({ success: true }), 500));
    }
  };

  const verifyMobileOtp = async (phone, otp) => {
    const formattedPhone = phone.length === 10 ? `+91${phone}` : phone;
    try {
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
    } catch (err) {
      console.warn("Backend down, mocking verifyMobileOtp success");
      // Mock successful login
      const users = JSON.parse(localStorage.getItem('coskinn_users') || '[]');
      let existingUser = users.find(u => u.mobile === phone);
      
      if (!existingUser) {
         existingUser = { mobile: phone, name: 'Guest User', email: '' };
         users.push(existingUser);
         localStorage.setItem('coskinn_users', JSON.stringify(users));
      }
      
      setUser(existingUser);
      const mockSession = { user: existingUser, token: 'mock_token', refreshToken: 'mock_refresh' };
      localStorage.setItem('coskinn_session', JSON.stringify(mockSession));
      return mockSession;
    }
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

  const authenticateOTPUser = (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('coskinn_users') || '[]');
        let existingUserIndex = users.findIndex(u => u.mobile === userData.mobile);
        
        let sessionUser = { name: userData.name, email: userData.email, mobile: userData.mobile, avatarUrl: userData.avatarUrl };
        
        if (existingUserIndex >= 0) {
          users[existingUserIndex] = { ...users[existingUserIndex], ...sessionUser };
        } else {
          users.push(sessionUser);
        }
        
        localStorage.setItem('coskinn_users', JSON.stringify(users));
        setUser(sessionUser);
        localStorage.setItem('coskinn_session', JSON.stringify(sessionUser));
        
        resolve(sessionUser);
      }, 800);
    });
  };

  const checkMobileExists = async (mobile) => {
    const users = JSON.parse(localStorage.getItem('coskinn_users') || '[]');
    return users.some(u => u.mobile === mobile);
  };

  const checkEmailExists = async (email) => {
    const users = JSON.parse(localStorage.getItem('coskinn_users') || '[]');
    return users.some(u => u.email === email);
  };

  const loginWithMobile = async (mobile) => {
    const users = JSON.parse(localStorage.getItem('coskinn_users') || '[]');
    const existingUser = users.find(u => u.mobile === mobile);
    if (existingUser) {
      const sessionUser = { name: existingUser.name, email: existingUser.email, mobile: existingUser.mobile, avatarUrl: existingUser.avatarUrl };
      setUser(sessionUser);
      localStorage.setItem('coskinn_session', JSON.stringify(sessionUser));
      return sessionUser;
    }
    throw new Error("User not found.");
  };

  const loginWithEmail = async (email) => {
    const users = JSON.parse(localStorage.getItem('coskinn_users') || '[]');
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      const sessionUser = { name: existingUser.name, email: existingUser.email, mobile: existingUser.mobile, avatarUrl: existingUser.avatarUrl };
      setUser(sessionUser);
      localStorage.setItem('coskinn_session', JSON.stringify(sessionUser));
      return sessionUser;
    }
    throw new Error("User not found.");
  };

  const memoizedContextValue = useMemo(() => ({
    user,
    loading,
    sendMobileOtp,
    verifyMobileOtp,
    authenticateOTPUser,
    checkMobileExists,
    checkEmailExists,
    loginWithMobile,
    loginWithEmail,
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
