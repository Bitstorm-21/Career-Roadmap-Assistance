import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-[#08070b] flex items-center justify-center text-red-500">
        <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Admin Only Route Component
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-[#08070b] flex items-center justify-center text-red-500">
        <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/profile" replace />;
  return children;
};

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-[#08070b] text-gray-100 selection:bg-red-500 selection:text-white">
      {/* Toast notifications styled for Dark & Red theme */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#140f1a',
            color: '#f3f4f6',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '16px',
            boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 20px -5px rgba(239, 68, 68, 0.3)',
            fontSize: '13px',
          },
          success: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#f87171',
              secondary: '#140f1a',
            },
          },
        }}
      />

      {/* Persistent Navigation */}
      <Navbar />

      {/* Main Content Router */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
          {/* Backwards compatibility for /dashboard */}
          <Route path="/dashboard" element={<Navigate to="/profile" replace />} />
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
