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
          const sessionUser = { name: existingUser.name, email: existingUser.email };
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem('coskinn_session');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
