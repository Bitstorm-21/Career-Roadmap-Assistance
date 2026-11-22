import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, User, Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userName || !formData.email || !formData.password) {
      return;
    }

    setLoading(true);
    // In our backend API specification: POST /api/auth/register with { fullName, email, password }
    const result = await register(formData.userName, formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      // Navigate to login so user can log in with new credentials
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#08070b] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Ambience: Red atmospheric glows & grid */}
      <div className="absolute inset-0 bg-grid-red pointer-events-none opacity-30 z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/15 blur-[160px] rounded-full pointer-events-none z-0" />

      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-sm text-gray-400 hover:text-white bg-red-950/20 hover:bg-red-900/30 border border-red-900/30 px-4 py-2 rounded-full transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Register Card - Matching Image 4 layout in Red & Dark Theme */}
      <div className="relative z-10 w-full max-w-md">
        <div className="relative rounded-3xl bg-[#0e0b14]/90 backdrop-blur-xl border border-red-900/40 p-8 sm:p-10 shadow-[0_0_50px_rgba(239,68,68,0.18)] hover:shadow-[0_0_65px_rgba(239,68,68,0.28)] transition-all duration-300">
          
          {/* Top Circular Badge with UserPlus Icon */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-red-600 to-rose-700 flex items-center justify-center shadow-lg shadow-red-600/40 mb-4 border border-red-400/30">
              <UserPlus className="w-8 h-8 text-white ml-0.5" />
            </div>
            
            <h2 className="text-3xl font-extrabold text-white tracking-tight hero-serif">
              Register Here
            </h2>
            <p className="text-xs text-gray-400 mt-1.5 text-center">
              Create your account to unlock AI roadmaps and skill analysis
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* UserName Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                UserName
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="userName"
                  autoComplete="name"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#140f1a] border border-red-900/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#140f1a] border border-red-900/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#140f1a] border border-red-900/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button (Matching Gradient Red from image) */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-3.5 px-4 rounded-xl font-bold text-white text-base bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-600 shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:shadow-[0_0_35px_rgba(239,68,68,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Register</span>
              )}
            </button>
          </form>

          {/* Toggle link matching Image 4: 'Already have an account? Login' */}
          <div className="mt-8 text-center pt-5 border-t border-red-950/40">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-red-400 hover:text-red-300 underline underline-offset-4 ml-1 transition-colors"
              >
                Login
              </Link>
            </p>
          </div>



        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
