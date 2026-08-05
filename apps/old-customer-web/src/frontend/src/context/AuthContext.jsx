import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import apiClient from '../utils/apiClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const openAuthModal = () => setIsAuthModalOpen(true);

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setPendingAction(null);
  };

  const executeProtectedAction = useCallback((action) => {
    if (user) {
      action();
    } else {
      setPendingAction(() => action);
      setIsAuthModalOpen(true);
    }
  }, [user]);

  useEffect(() => {
    if (user && pendingAction) {
      const actionToRun = pendingAction;
      setPendingAction(null);
      actionToRun();
    }
  }, [user, pendingAction]);

  const mergeAndPersistProfile = (baseUser = {}, updates = {}, saveToStorage = false) => {
    const safeBase = baseUser || {};
    const userKey = safeBase.userId || safeBase.id || safeBase.mobile || safeBase.phone || safeBase.email || 'default';
    const storedStr = localStorage.getItem('fairenne_profile_' + userKey);
    let stored = {};
    if (storedStr) {
      try { stored = JSON.parse(storedStr); } catch (e) { }
    }

    const merged = {
      ...stored,
      ...safeBase,
      ...updates,
    };

    let nameVal = updates.name !== undefined ? updates.name : safeBase.name;
    if (!nameVal && (safeBase.firstName || updates.firstName)) {
      const f = updates.firstName || safeBase.firstName || '';
      const l = updates.lastName || safeBase.lastName || '';
      nameVal = `${f} ${l}`.trim();
    }
    merged.name = nameVal || stored.name || (safeBase.phone || safeBase.mobile ? `Member ${String(safeBase.phone || safeBase.mobile).slice(-4)}` : 'User');

    merged.mobile = updates.mobile !== undefined ? updates.mobile : (safeBase.mobile || safeBase.phone || stored.mobile || stored.phone || '');
    merged.phone = merged.mobile;

    merged.email = updates.email !== undefined ? updates.email : (safeBase.email !== undefined ? safeBase.email : (stored.email || ''));

    let dobVal = (updates.dob !== undefined && updates.dob !== null && updates.dob !== '')
      ? updates.dob
      : (safeBase.dob || safeBase.dateOfBirth || stored.dob || '');
    if (dobVal && typeof dobVal === 'string' && dobVal.includes('T')) {
      dobVal = dobVal.split('T')[0];
    }
    merged.dob = dobVal || '';

    merged.gender = (updates.gender !== undefined ? updates.gender : (safeBase.gender || stored.gender || 'female')).toLowerCase();

    merged.skinType = updates.skinType !== undefined ? updates.skinType : (safeBase.skinType || safeBase.skinProfile?.skinType || stored.skinType || 'Combination');
    merged.goals = updates.goals !== undefined ? updates.goals : (safeBase.goals || stored.goals || 'Anti-aging, Hydration');
    merged.favCategory = updates.favCategory !== undefined ? updates.favCategory : (safeBase.favCategory || stored.favCategory || 'Serums & Essences');
    merged.favShade = updates.favShade !== undefined ? updates.favShade : (safeBase.favShade || stored.favShade || 'Rosewood Blush');

    merged.avatarUrl = updates.avatarUrl !== undefined ? updates.avatarUrl : (safeBase.avatarUrl || stored.avatarUrl || null);

    if (saveToStorage) {
      const toSave = {
        id: merged.id,
        name: merged.name,
        email: merged.email,
        mobile: merged.mobile,
        phone: merged.mobile,
        dob: merged.dob,
        gender: merged.gender,
        skinType: merged.skinType,
        goals: merged.goals,
        favCategory: merged.favCategory,
        favShade: merged.favShade,
        avatarUrl: merged.avatarUrl
      };
      localStorage.setItem('fairenne_profile_' + userKey, JSON.stringify(toSave));
    }

    return merged;
  };

  // Initialize session on mount
  useEffect(() => {
    const initSession = async () => {
      const sessionStr = localStorage.getItem('fairenne_session');
      if (sessionStr) {
        try {
          const session = JSON.parse(sessionStr);
          // Handle both { user, token } format and direct user object format
          const currentUser = session.user || session;

          if (currentUser && (currentUser.mobile || currentUser.email || currentUser.name || currentUser.firstName)) {
            const initialMerged = mergeAndPersistProfile(currentUser, {}, false);
            setUser(initialMerged);

            if (session.token) {
              try {
                const res = await apiClient.get('/auth/me');
                if (res.data) {
                  const profRes = await apiClient.get('/customer/me').catch(() => null);
                  const incoming = profRes?.data
                    ? { ...res.data, ...profRes.data, id: res.data.id }
                    : res.data;
                  const freshMerged = mergeAndPersistProfile(incoming, {}, true);
                  setUser(freshMerged);
                  session.user = freshMerged;
                  localStorage.setItem('fairenne_session', JSON.stringify(session));
                }
              } catch (err) {
                console.error("Failed to fetch fresh profile from /auth/me", err);
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
    const response = await apiClient.post('/auth/send-otp', { phone: formattedPhone });
    return response.data;
  };

  /**
   * Checks if a mobile number is already registered.
   * Uses the fairenne_registered_numbers list that is populated
   * every time a user successfully verifies an OTP (sign up or sign in).
   * Returns true if the number is known to be registered.
   */
  const checkMobileRegistered = (phone) => {
    const formattedPhone = phone.length === 10 ? `+91${phone}` : phone;
    const raw10 = phone.replace(/^\+91/, '');
    try {
      const list = JSON.parse(localStorage.getItem('fairenne_registered_numbers') || '[]');
      return list.includes(formattedPhone) || list.includes(raw10) || list.includes(phone);
    } catch (e) {
      return false;
    }
  };

  const verifyMobileOtp = async (phone, otp, options = {}) => {
    const formattedPhone = phone.length === 10 ? `+91${phone}` : phone;
    const response = await apiClient.post('/auth/verify-otp', { phone: formattedPhone, otp });

    if (response.data && response.data.access_token) {
      const profRes = await apiClient.get('/customer/me', {
        headers: { Authorization: `Bearer ${response.data.access_token}` }
      }).catch(() => null);

      const incoming = profRes?.data
        ? { ...response.data.user, ...profRes.data, id: response.data.user.id }
        : response.data.user;

      let registeredList = [];
      try {
        registeredList = JSON.parse(localStorage.getItem('fairenne_registered_numbers') || '[]');
      } catch (e) {
        registeredList = [];
      }
      const defaultRegistered = ['+919876543210', '9876543210'];

      const isRegistered = Boolean(
        incoming.firstName ||
        incoming.lastName ||
        incoming.email ||
        (profRes?.data && profRes.data.id) ||
        registeredList.includes(formattedPhone) ||
        registeredList.includes(phone) ||
        defaultRegistered.includes(formattedPhone) ||
        defaultRegistered.includes(phone)
      );

      // On Sign In screen, if the entered number has never been registered, do NOT log the user in
      if (options.isSignIn && !isRegistered) {
        return { unregistered: true, phone: formattedPhone };
      }

      if (!registeredList.includes(formattedPhone)) {
        registeredList.push(formattedPhone);
        registeredList.push(phone);
        try {
          localStorage.setItem('fairenne_registered_numbers', JSON.stringify(registeredList));
        } catch (e) { }
      }

      const sessionUser = mergeAndPersistProfile(incoming, {}, true);

      const sessionData = {
        user: sessionUser,
        token: response.data.access_token,
        refreshToken: response.data.refresh_token
      };

      setUser(sessionUser);
      localStorage.setItem('fairenne_session', JSON.stringify(sessionData));
      return sessionData;
    }
    throw new Error('Authentication failed');
  };

  const updateUserProfile = async (updatedData) => {
    const backendPayload = {};
    let hasBackendField = false;

    if (updatedData.name !== undefined) {
      const parts = updatedData.name.trim().split(/\s+/);
      backendPayload.firstName = parts[0] || '';
      backendPayload.lastName = parts.slice(1).join(' ') || '';
      hasBackendField = true;
    } else {
      if (updatedData.firstName !== undefined) {
        backendPayload.firstName = updatedData.firstName;
        hasBackendField = true;
      }
      if (updatedData.lastName !== undefined) {
        backendPayload.lastName = updatedData.lastName;
        hasBackendField = true;
      }
    }

    if (updatedData.email !== undefined) {
      backendPayload.email = updatedData.email;
      hasBackendField = true;
    }
    if (updatedData.dob !== undefined && updatedData.dob !== '') {
      backendPayload.dateOfBirth = new Date(updatedData.dob).toISOString();
      hasBackendField = true;
    }
    if (updatedData.gender !== undefined) {
      backendPayload.gender = updatedData.gender.toLowerCase();
      hasBackendField = true;
    }
    if (updatedData.skinType !== undefined) {
      backendPayload.skinType = updatedData.skinType;
      hasBackendField = true;
    }

    let backendResData = null;
    if (hasBackendField) {
      try {
        const res = await apiClient.put('/customer/profile', backendPayload);
        backendResData = res.data;
      } catch (err) {
        console.warn("Backend /customer/profile put warning:", err);
      }
    }

    const current = user || {};
    const safeBackendData = backendResData
      ? { ...backendResData, id: current.id || backendResData.userId || backendResData.id }
      : {};
    const freshUser = mergeAndPersistProfile(
      { ...current, ...safeBackendData },
      updatedData,
      true
    );

    setUser(freshUser);

    const sessionStr = localStorage.getItem('fairenne_session');
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        session.user = freshUser;
        localStorage.setItem('fairenne_session', JSON.stringify(session));
      } catch (e) {
        console.error("Failed to update session", e);
      }
    }

    return freshUser;
  };

  const logout = async () => {
    const sessionStr = localStorage.getItem('fairenne_session');
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        if (session.refreshToken) {
          // Attempt to logout on backend, ignore errors if token already expired
          await apiClient.post('/auth/logout', { refreshToken: session.refreshToken }).catch(() => { });
        }
      } catch (e) {
        console.error("Failed to parse session during logout", e);
      }
    }

    // NOTE: We intentionally keep fairenne_profile_* keys so that avatarUrl,
    // name, and other profile details persist across logout/login for the same user.
    // Only session tokens, cart, wishlist, and orders are cleared on logout.
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (
        k && (
          k.startsWith('fairenne_cart') ||
          k.startsWith('fairenne_membership') ||
          k.startsWith('fairenne_address') ||
          k.startsWith('fairenne_wishlist') ||
          k.startsWith('fairenne_order') ||
          k === 'fairenne_session' ||
          k === 'fairenne_token' ||
          k === 'access_token' ||
          k === 'refresh_token'
        )
      ) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));

    setUser(null);
    window.dispatchEvent(new Event('auth:clear_cache'));
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
    checkMobileRegistered,
    logout,
    updateUserProfile,
    isAuthModalOpen,
    setIsAuthModalOpen,
    openAuthModal,
    closeAuthModal,
    executeProtectedAction
  }), [user, loading, isAuthModalOpen, executeProtectedAction]);

  return (
    <AuthContext.Provider value={memoizedContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
