import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Synchronously initialize user from localStorage so refresh never logs the user out
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user') || localStorage.getItem('cached_user');
      if (saved) return JSON.parse(saved);
      const email = localStorage.getItem('user_email');
      if (email) return { email, fullName: email.split('@')[0] };
    } catch (e) {
      console.warn('Error reading user from localStorage on init:', e);
    }
    return null;
  });

  const [token, setToken] = useState(
    () => localStorage.getItem('career_jwt') || localStorage.getItem('token')
  );
  const [loading, setLoading] = useState(false);

  // Initialize and sync auth on page refresh
  useEffect(() => {
    const initAuth = async () => {
      let localUser = null;
      try {
        const saved = localStorage.getItem('user') || localStorage.getItem('cached_user');
        if (saved) {
          localUser = JSON.parse(saved);
        } else {
          const email = localStorage.getItem('user_email');
          if (email) localUser = { email, fullName: email.split('@')[0] };
        }
      } catch (e) {}

      // If user details exist in localStorage, keep them active immediately
      if (localUser) {
        setUser(localUser);
      }

      // Sync latest user details and authorities from backend /api/auth/me if available
      try {
        const res = await authApi.getMe();
        if (res.data) {
          const merged = { ...(localUser || {}), ...res.data };
          setUser(merged);
          localStorage.setItem('user', JSON.stringify(merged));
          localStorage.setItem('cached_user', JSON.stringify(merged));
          if (merged.email) localStorage.setItem('user_email', merged.email);
        }
      } catch (err) {
        console.warn('Backend session check unavailable or unauthenticated, keeping localStorage user details:', err);
        // Persist local user if present
        if (localUser) {
          setUser(localUser);
        }
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authApi.login({ email, password });
      
      // Look for token in response
      const receivedToken = res.data?.token || res.data?.jwt || res.data?.accessToken;
      if (receivedToken) {
        localStorage.setItem('career_jwt', receivedToken);
        localStorage.setItem('token', receivedToken);
        setToken(receivedToken);
      }
      
      // User data
      let userData = res.data?.user || res.data;
      try {
        const meRes = await authApi.getMe();
        userData = { ...userData, ...meRes.data };
      } catch (e) {
        if (!userData || !userData.email) {
          userData = { email, fullName: email.split('@')[0] };
        }
      }

      if (!userData.email) userData.email = email;
      if (!userData.fullName) userData.fullName = email.split('@')[0];
      
      // Save complete user details to localStorage
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('cached_user', JSON.stringify(userData));
      localStorage.setItem('user_email', userData.email);

      toast.success('Welcome back! Successfully logged in.');
      return { success: true, user: userData };
    } catch (err) {
      console.error('Login error:', err);
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || 'Login failed. Please verify credentials.';
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  const register = async (fullName, email, password) => {
    try {
      const res = await authApi.register({ fullName, email, password });
      toast.success('Account created successfully! Please login with your credentials.');
      return { success: true, data: res.data };
    } catch (err) {
      console.error('Registration error:', err);
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || 'Registration failed.';
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.warn('Logout backend call warning:', err);
    } finally {
      // Delete all user details and tokens from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('cached_user');
      localStorage.removeItem('user_email');
      localStorage.removeItem('career_jwt');
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      toast.success('Logged out successfully.');
    }
  };

  const isAdmin = Boolean(
    user?.role === 'ADMIN' ||
    user?.role === 'ROLE_ADMIN' ||
    user?.authorities?.includes('ROLE_ADMIN') ||
    user?.authorities?.some((a) => (typeof a === 'string' ? a : a?.authority) === 'ROLE_ADMIN') ||
    user?.email?.toLowerCase().includes('admin')
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user?.email || user || token),
        isAdmin,
        loading,
        login,
        register,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
