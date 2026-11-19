import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('career_jwt') || localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Initialize auth on load
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('career_jwt') || localStorage.getItem('token');
      if (storedToken) {
        try {
          const res = await authApi.getMe();
          setUser(res.data);
        } catch (err) {
          console.warn('Could not restore user session from backend, using cached credentials if any:', err);
          // If offline or backend error, keep token or check user
          const savedUser = localStorage.getItem('cached_user');
          if (savedUser) {
            try {
              setUser(JSON.parse(savedUser));
            } catch (e) {}
          }
        }
      }
      setLoading(false);
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
      if (!userData || !userData.email) {
        try {
          const meRes = await authApi.getMe();
          userData = meRes.data;
        } catch (e) {
          userData = { email, fullName: email.split('@')[0] };
        }
      }
      
      setUser(userData);
      localStorage.setItem('cached_user', JSON.stringify(userData));
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
      localStorage.removeItem('career_jwt');
      localStorage.removeItem('token');
      localStorage.removeItem('cached_user');
      setToken(null);
      setUser(null);
      toast.success('Logged out successfully.');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user || !!token,
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
