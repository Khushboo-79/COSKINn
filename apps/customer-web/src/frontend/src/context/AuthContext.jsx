import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize session on mount
  useEffect(() => {
    const session = localStorage.getItem('coskinn_session');
    if (session) {
      setUser(JSON.parse(session));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('coskinn_users') || '[]');
        const existingUser = users.find(u => u.email === email && u.password === password);
        
        if (existingUser) {
          const sessionUser = { name: existingUser.name, email: existingUser.email, mobile: existingUser.mobile };
          setUser(sessionUser);
          localStorage.setItem('coskinn_session', JSON.stringify(sessionUser));
          resolve(sessionUser);
        } else {
          reject(new Error('Invalid email or password.'));
        }
      }, 800); // Simulate network delay
    });
  };

  const register = (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('coskinn_users') || '[]');
        if (users.find(u => u.email === userData.email)) {
          reject(new Error('Email is already registered.'));
          return;
        }

        const newUser = {
          name: userData.name,
          email: userData.email,
          mobile: userData.mobile,
          password: userData.password,
        };
        
        users.push(newUser);
        localStorage.setItem('coskinn_users', JSON.stringify(users));
        
        resolve(true);
      }, 1000);
    });
  };

  const authenticateOTPUser = (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('coskinn_users') || '[]');
        let existingUserIndex = users.findIndex(u => u.mobile === userData.mobile);
        
        let sessionUser = { name: userData.name, email: userData.email, mobile: userData.mobile };
        
        if (existingUserIndex >= 0) {
          // Update existing user with new details if provided
          users[existingUserIndex] = { ...users[existingUserIndex], ...sessionUser };
        } else {
          // Register new user
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
      const sessionUser = { name: existingUser.name, email: existingUser.email, mobile: existingUser.mobile };
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
      const sessionUser = { name: existingUser.name, email: existingUser.email, mobile: existingUser.mobile };
      setUser(sessionUser);
      localStorage.setItem('coskinn_session', JSON.stringify(sessionUser));
      return sessionUser;
    }
    throw new Error("User not found.");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('coskinn_session');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, authenticateOTPUser, checkMobileExists, checkEmailExists, loginWithMobile, loginWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
