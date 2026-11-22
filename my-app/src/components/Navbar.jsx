import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, ArrowRight, User, LogOut, ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#08070b]/85 backdrop-blur-md border-b border-red-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo - Links to /home */}
        <Link to="/home" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:shadow-red-600/50 transition-all duration-300">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white flex items-center">
            AI Career <span className="text-red-500 ml-1.5 drop-shadow-[0_0_12px_rgba(239,68,68,0.6)]">Assistance</span>
          </span>
        </Link>

        {/* Center Navigation Links - Including Home */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
          <Link to="/home" className="hover:text-red-400 transition-colors duration-200">
            Home
          </Link>
          <a href="/home#features" className="hover:text-red-400 transition-colors duration-200">
            Features
          </a>
          <a href="/home#how-it-works" className="hover:text-red-400 transition-colors duration-200">
            How it works
          </a>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              {/* Admin Portal Button - Only visible if logged-in user is an admin */}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-600 border border-red-500/50 transition-all duration-200 shadow-[0_0_18px_rgba(239,68,68,0.45)] transform hover:-translate-y-0.5"
                >
                  <ShieldCheck className="w-4 h-4 text-red-200" />
                  <span>Admin Portal</span>
                </Link>
              )}

              {/* Profile Button for Logged-In User -> Navigates to /profile */}
              <Link
                to="/profile"
                className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium text-gray-200 bg-red-950/40 border border-red-800/40 hover:bg-red-900/50 hover:border-red-600/50 transition-all duration-200 shadow-sm"
              >
                <User className="w-4 h-4 text-red-400" />
                <span>Profile</span>
              </Link>

              <button
                onClick={logout}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-full text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-950/30 transition-all duration-200"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              {/* Profile Button for Non-Logged-In User -> Redirects to /login */}
              <button
                onClick={() => navigate('/login')}
                className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium text-gray-200 bg-red-950/40 border border-red-800/40 hover:bg-red-900/50 hover:border-red-600/50 transition-all duration-200"
                title="Go to Profile (Login Required)"
              >
                <User className="w-4 h-4 text-red-400" />
                <span>Profile</span>
              </button>

              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-200 hover:text-white rounded-full hover:bg-white/5 transition-all duration-200"
              >
                Login
              </Link>

              <Link
                to="/profile"
                className="relative group inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.45)] hover:shadow-[0_0_28px_rgba(239,68,68,0.7)] transform hover:-translate-y-0.5"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
