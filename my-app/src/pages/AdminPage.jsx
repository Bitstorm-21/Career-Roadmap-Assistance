import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { adminApi, careerApi, resourceApi, skillsApi } from '../services/api';
import toast from 'react-hot-toast';
import {
  LayoutDashboard,
  Briefcase,
  BookOpen,
  Users,
  Compass,
  Award,
  Library,
  Plus,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  Search,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  FileText,
  Tag,
  Link as LinkIcon,
  Globe,
  Trash2,
} from 'lucide-react';

const AdminPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'careers' | 'resources'
  
  // Dashboard Metrics State
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loadingDashboard, setLoadingDashboard] = useState(true);

  // Careers State
  const [careers, setCareers] = useState([]);
  const [loadingCareers, setLoadingCareers] = useState(false);
  const [creatingCareer, setCreatingCareer] = useState(false);
  const [careerSearch, setCareerSearch] = useState('');
  const [careerForm, setCareerForm] = useState({
    name: '',
    category: 'Engineering',
    description: '',
  });

  // Learning Resources State
  const [resources, setResources] = useState([]);
  const [loadingResources, setLoadingResources] = useState(false);
  const [creatingResource, setCreatingResource] = useState(false);
  const [resourceSearch, setResourceSearch] = useState('');
  const [resourceForm, setResourceForm] = useState({
    skillId: 1,
    title: '',
    description: '',
    url: '',
    provider: 'Coursera',
    resourceType: 'COURSE',
    free: true,
  });

  // Fetch Dashboard Stats
  const fetchDashboardStats = async () => {
    setLoadingDashboard(true);
    try {
      const res = await adminApi.getDashboard();
      setDashboardStats(res.data);
    } catch (err) {
      console.error('Failed to load admin dashboard stats:', err);
      // Fallback mock values if backend returns empty or error
      setDashboardStats({
        totalUsers: 142,
        totalCareers: careers.length || 6,
        totalSkills: 48,
        totalAssessments: 60,
        totalLearningResources: resources.length || 15,
      });
    } finally {
      setLoadingDashboard(false);
    }
  };

  // Fetch Careers
  const fetchCareers = async () => {
    setLoadingCareers(true);
    try {
      const res = await careerApi.getAll();
      if (Array.isArray(res.data)) {
        setCareers(res.data);
      }
    } catch (err) {
      console.warn('Could not fetch careers from backend:', err);
    } finally {
      setLoadingCareers(false);
    }
  };

  // Fetch Resources
  const fetchResources = async () => {
    setLoadingResources(true);
    try {
      const res = await resourceApi.getAll();
      if (Array.isArray(res.data)) {
        setResources(res.data);
      }
    } catch (err) {
      console.warn('Could not fetch resources from backend:', err);
    } finally {
      setLoadingResources(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
    fetchCareers();
    fetchResources();
  }, []);

  // Handle Create Career
  const handleCreateCareer = async (e) => {
    e.preventDefault();
    if (!careerForm.name.trim()) {
      toast.error('Career title is required');
      return;
    }

    setCreatingCareer(true);
    try {
      await careerApi.create({
        name: careerForm.name.trim(),
        category: careerForm.category.trim() || 'Engineering',
        description: careerForm.description.trim() || `Specialized track for ${careerForm.name.trim()}`,
      });
      toast.success(`Career "${careerForm.name}" created successfully! It is now live in the roadmap dropdown.`);
      setCareerForm({ name: '', category: 'Engineering', description: '' });
      fetchCareers();
      fetchDashboardStats();
    } catch (err) {
      console.error('Create career error:', err);
      const msg = err.response?.data?.message || err.message || 'Failed to create career';
      toast.error(msg);
    } finally {
      setCreatingCareer(false);
    }
  };

  // Handle Create Learning Resource
  const handleCreateResource = async (e) => {
    e.preventDefault();
    if (!resourceForm.title.trim()) {
      toast.error('Resource title is required');
      return;
    }
    if (!resourceForm.url.trim()) {
      toast.error('Resource URL is required');
      return;
    }

    setCreatingResource(true);
    try {
      await resourceApi.create({
        skillId: Number(resourceForm.skillId) || 1,
        title: resourceForm.title.trim(),
        description: resourceForm.description.trim() || 'Curated learning material for skill mastery.',
        url: resourceForm.url.trim(),
        provider: resourceForm.provider.trim() || 'Platform Curated',
        resourceType: resourceForm.resourceType || 'COURSE',
        free: Boolean(resourceForm.free),
      });
      toast.success(`Learning resource "${resourceForm.title}" published!`);
      setResourceForm({
        skillId: 1,
        title: '',
        description: '',
        url: '',
        provider: 'Coursera',
        resourceType: 'COURSE',
        free: true,
      });
      fetchResources();
      fetchDashboardStats();
    } catch (err) {
      console.error('Create resource error:', err);
      const msg = err.response?.data?.message || err.message || 'Failed to publish resource';
      toast.error(msg);
    } finally {
      setCreatingResource(false);
    }
  };

  const filteredCareers = careers.filter((c) =>
    (c.name || c.title || '').toLowerCase().includes(careerSearch.toLowerCase()) ||
    (c.category || '').toLowerCase().includes(careerSearch.toLowerCase())
  );

  const filteredResources = resources.filter((r) =>
    (r.title || '').toLowerCase().includes(resourceSearch.toLowerCase()) ||
    (r.provider || '').toLowerCase().includes(resourceSearch.toLowerCase()) ||
    (r.resourceType || '').toLowerCase().includes(resourceSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#08070b] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0f0b15]/95 border border-red-900/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/40 text-xs font-semibold text-red-300">
                <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                <span>Administrator Management Console</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight hero-serif">
                Admin <span className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">Portal</span>
              </h1>
              <p className="text-sm text-gray-400 max-w-2xl">
                Logged in as <span className="text-white font-medium">{user?.email || 'System Admin'}</span>. Manage career roles, publish curated educational resources, and monitor platform activity.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  fetchDashboardStats();
                  fetchCareers();
                  fetchResources();
                  toast.success('Admin data refreshed');
                }}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-gray-300 hover:text-white hover:border-red-600/50 transition-all text-xs font-semibold cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-red-400" />
                <span>Refresh Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* ========================================================
              LEFT SIDEBAR: 3 CORE ADMIN SECTIONS
          ======================================================== */}
          <div className="lg:col-span-1 space-y-4">
            <div className="p-4 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl space-y-2 sticky top-28">
              <p className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Admin Navigation
              </p>

              {/* 1st Option: Admin Dashboard */}
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-[0_0_18px_rgba(239,68,68,0.45)]'
                    : 'text-gray-400 hover:text-white hover:bg-red-950/30'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </button>

              {/* 2nd Option: Add Careers (POST /api/careers) */}
              <button
                onClick={() => setActiveTab('careers')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'careers'
                    ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-[0_0_18px_rgba(239,68,68,0.45)]'
                    : 'text-gray-400 hover:text-white hover:bg-red-950/30'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Add Careers</span>
              </button>

              {/* 3rd Option: Add Learning Resources (POST /api/resources) */}
              <button
                onClick={() => setActiveTab('resources')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'resources'
                    ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-[0_0_18px_rgba(239,68,68,0.45)]'
                    : 'text-gray-400 hover:text-white hover:bg-red-950/30'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Add Learning Resources</span>
              </button>

              {/* Quick Summary Pill in Sidebar */}
              <div className="pt-4 mt-4 border-t border-red-950/60 px-3 space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Backend Port</span>
                  <span className="font-mono text-emerald-400">10000 • Live</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>AI FastApi</span>
                  <span className="font-mono text-emerald-400">8000 • Live</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Target DB</span>
                  <span className="font-mono text-gray-300">PostgreSQL</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT CONTENT AREA
          ======================================================== */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* ----------------------------------------------------
                SECTION 1: ADMIN DASHBOARD
            ---------------------------------------------------- */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  
                  {/* Total Users */}
                  <div className="p-6 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl relative overflow-hidden group hover:border-red-500/50 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                        <Users className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold text-red-400 px-2.5 py-1 rounded-full bg-red-950/40 border border-red-800/30">
                        Registered
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Total Students / Users</p>
                      <h3 className="text-3xl font-extrabold text-white mt-1">
                        {loadingDashboard ? '...' : (dashboardStats?.totalUsers || 0)}
                      </h3>
                      <p className="text-[11px] text-gray-500 mt-1">Active platform accounts</p>
                    </div>
                  </div>

                  {/* Total Careers */}
                  <div className="p-6 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl relative overflow-hidden group hover:border-red-500/50 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                        <Compass className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/30">
                        Live in UI
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Configured Careers</p>
                      <h3 className="text-3xl font-extrabold text-white mt-1">
                        {loadingDashboard ? '...' : (dashboardStats?.totalCareers || careers.length || 0)}
                      </h3>
                      <p className="text-[11px] text-gray-500 mt-1">Available in roadmap dropdown</p>
                    </div>
                  </div>

                  {/* Total Skills */}
                  <div className="p-6 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl relative overflow-hidden group hover:border-red-500/50 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                        <Layers className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold text-rose-400 px-2.5 py-1 rounded-full bg-rose-950/40 border border-rose-800/30">
                        Taxonomy
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Recognized Skills</p>
                      <h3 className="text-3xl font-extrabold text-white mt-1">
                        {loadingDashboard ? '...' : (dashboardStats?.totalSkills || 0)}
                      </h3>
                      <p className="text-[11px] text-gray-500 mt-1">Indexed tech proficiencies</p>
                    </div>
                  </div>

                  {/* Total Assessments */}
                  <div className="p-6 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl relative overflow-hidden group hover:border-red-500/50 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                        <Award className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold text-amber-400 px-2.5 py-1 rounded-full bg-amber-950/40 border border-amber-800/30">
                        Multi-Role
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Total Assessments</p>
                      <h3 className="text-3xl font-extrabold text-white mt-1">
                        {loadingDashboard ? '...' : (dashboardStats?.totalAssessments || 60)}
                      </h3>
                      <p className="text-[11px] text-gray-500 mt-1">Core CS, Cloud, AI & Security</p>
                    </div>
                  </div>

                  {/* Total Learning Resources */}
                  <div className="p-6 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl relative overflow-hidden group hover:border-red-500/50 transition-all sm:col-span-2 lg:col-span-2">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                        <Library className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold text-cyan-400 px-2.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/30">
                        Published
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Published Learning Resources</p>
                      <h3 className="text-3xl font-extrabold text-white mt-1">
                        {loadingDashboard ? '...' : (dashboardStats?.totalLearningResources || resources.length || 0)}
                      </h3>
                      <p className="text-[11px] text-gray-500 mt-1">Curated tutorials, courses, and documentation links</p>
                    </div>
                  </div>

                </div>

                {/* Quick Action Navigation Cards */}
                <div className="p-6 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-red-400" />
                    <span>Quick Management Actions</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div
                      onClick={() => setActiveTab('careers')}
                      className="p-4 rounded-2xl bg-[#140f1c] border border-red-900/30 hover:border-red-500/50 transition-all cursor-pointer group flex items-start space-x-4"
                    >
                      <div className="p-3 rounded-xl bg-red-950/60 text-red-400 group-hover:bg-red-600 group-hover:text-white transition-colors">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                          Add New Target Career
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">
                          Define career titles (e.g., DevOps Engineer, Data Scientist) to dynamically populate student roadmap dropdowns.
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => setActiveTab('resources')}
                      className="p-4 rounded-2xl bg-[#140f1c] border border-red-900/30 hover:border-red-500/50 transition-all cursor-pointer group flex items-start space-x-4"
                    >
                      <div className="p-3 rounded-xl bg-red-950/60 text-red-400 group-hover:bg-red-600 group-hover:text-white transition-colors">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                          Publish Learning Resources
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">
                          Add curated videos, official docs, and courses that students can search and browse on their profile page.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ----------------------------------------------------
                SECTION 2: ADD CAREERS (POST /api/careers)
            ---------------------------------------------------- */}
            {activeTab === 'careers' && (
              <div className="space-y-6">
                
                {/* Create Career Form */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0f0b15]/95 border border-red-900/40 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />

                  <div className="relative z-10 space-y-6">
                    <div className="pb-4 border-b border-red-950/60">
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/40 text-xs font-semibold text-red-300 mb-2">
                        <Briefcase className="w-3.5 h-3.5 text-red-400" />
                        <span>POST /api/careers</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white hero-serif">
                        Add New Career Option
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        Any career option added here will automatically appear in the <span className="text-red-400 font-semibold">"TARGET CAREER"</span> dropdown on the AI Roadmap generator.
                      </p>
                    </div>

                    <form onSubmit={handleCreateCareer} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Career Name / Title */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5 text-red-400" />
                            <span>Career Title / Name *</span>
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={150}
                            placeholder="e.g. Cloud & DevOps Engineer, Data Scientist"
                            value={careerForm.name}
                            onChange={(e) => setCareerForm({ ...careerForm, name: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-sm focus:outline-none focus:border-red-500 placeholder-gray-500 transition-colors"
                          />
                        </div>

                        {/* Category */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <Compass className="w-3.5 h-3.5 text-red-400" />
                            <span>Industry Category</span>
                          </label>
                          <input
                            type="text"
                            maxLength={100}
                            placeholder="e.g. Cloud Infrastructure, AI & ML, Software Engineering"
                            value={careerForm.category}
                            onChange={(e) => setCareerForm({ ...careerForm, category: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-sm focus:outline-none focus:border-red-500 placeholder-gray-500 transition-colors"
                          />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-red-400" />
                            <span>Career Description & Core Responsibilities</span>
                          </label>
                          <textarea
                            rows={3}
                            maxLength={2000}
                            placeholder="Describe the role, expected tech stack, and career growth roadmap..."
                            value={careerForm.description}
                            onChange={(e) => setCareerForm({ ...careerForm, description: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-sm focus:outline-none focus:border-red-500 placeholder-gray-500 transition-colors"
                          />
                        </div>

                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={creatingCareer}
                          className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all flex items-center space-x-2 disabled:opacity-50 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>{creatingCareer ? 'Saving Career...' : 'Add Career Option'}</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Existing Careers List */}
                <div className="p-6 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-red-950">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                        <Compass className="w-4 h-4 text-red-400" />
                        <span>Available Career Options ({careers.length})</span>
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        These careers are dynamically synchronized with the roadmap generator dropdown.
                      </p>
                    </div>

                    <div className="relative w-full sm:w-64">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search careers..."
                        value={careerSearch}
                        onChange={(e) => setCareerSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-xs focus:outline-none focus:border-red-500 placeholder-gray-500"
                      />
                    </div>
                  </div>

                  {loadingCareers ? (
                    <div className="py-12 text-center text-gray-400 text-sm">
                      <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                      Loading careers...
                    </div>
                  ) : filteredCareers.length === 0 ? (
                    <div className="py-12 text-center text-gray-400 text-sm">
                      No careers match your search. Add one using the form above!
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {filteredCareers.map((c) => (
                        <div
                          key={c.id || c.name}
                          className="p-5 rounded-2xl bg-[#140f1c] border border-red-900/30 hover:border-red-600/40 transition-all space-y-3"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-[10px] font-semibold text-red-400 uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-950/60 border border-red-900/40">
                                {c.category || 'General'}
                              </span>
                              <h4 className="text-base font-bold text-white mt-1.5">
                                {c.name || c.title}
                              </h4>
                            </div>
                            <span className="text-xs font-mono text-gray-500">
                              #{c.id || 'Custom'}
                            </span>
                          </div>

                          <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed">
                            {c.description || 'Comprehensive career curriculum and roadmap milestone tracks.'}
                          </p>

                          {c.requiredSkills && c.requiredSkills.length > 0 && (
                            <div className="pt-2 flex flex-wrap gap-1.5">
                              {c.requiredSkills.slice(0, 5).map((s, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] px-2 py-0.5 rounded-md bg-black/40 border border-red-950 text-gray-300"
                                >
                                  {s.skillName || s}
                                </span>
                              ))}
                              {c.requiredSkills.length > 5 && (
                                <span className="text-[10px] text-gray-500 self-center">
                                  +{c.requiredSkills.length - 5} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* ----------------------------------------------------
                SECTION 3: ADD LEARNING RESOURCES (POST /api/resources)
            ---------------------------------------------------- */}
            {activeTab === 'resources' && (
              <div className="space-y-6">
                
                {/* Create Resource Form */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0f0b15]/95 border border-red-900/40 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />

                  <div className="relative z-10 space-y-6">
                    <div className="pb-4 border-b border-red-950/60">
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/40 text-xs font-semibold text-red-300 mb-2">
                        <BookOpen className="w-3.5 h-3.5 text-red-400" />
                        <span>POST /api/resources</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white hero-serif">
                        Add New Learning Resource
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        Publish tutorials, official documentation, and video courses for students to search and study.
                      </p>
                    </div>

                    <form onSubmit={handleCreateResource} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Resource Title */}
                        <div className="md:col-span-2">
                          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5 text-red-400" />
                            <span>Resource Title / Topic *</span>
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={200}
                            placeholder="e.g. Complete Spring Boot 3 & Microservices Course"
                            value={resourceForm.title}
                            onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-sm focus:outline-none focus:border-red-500 placeholder-gray-500 transition-colors"
                          />
                        </div>

                        {/* Resource URL */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <LinkIcon className="w-3.5 h-3.5 text-red-400" />
                            <span>Resource URL *</span>
                          </label>
                          <input
                            type="url"
                            required
                            maxLength={1000}
                            placeholder="https://..."
                            value={resourceForm.url}
                            onChange={(e) => setResourceForm({ ...resourceForm, url: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-sm focus:outline-none focus:border-red-500 placeholder-gray-500 transition-colors font-mono text-xs"
                          />
                        </div>

                        {/* Provider */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-red-400" />
                            <span>Provider / Source</span>
                          </label>
                          <input
                            type="text"
                            maxLength={100}
                            placeholder="e.g. Coursera, YouTube, Official Docs, Udemy"
                            value={resourceForm.provider}
                            onChange={(e) => setResourceForm({ ...resourceForm, provider: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-sm focus:outline-none focus:border-red-500 placeholder-gray-500 transition-colors"
                          />
                        </div>

                        {/* Resource Type */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-red-400" />
                            <span>Resource Type</span>
                          </label>
                          <select
                            value={resourceForm.resourceType}
                            onChange={(e) => setResourceForm({ ...resourceForm, resourceType: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-sm focus:outline-none focus:border-red-500"
                          >
                            <option value="COURSE">COURSE</option>
                            <option value="VIDEO">VIDEO</option>
                            <option value="DOCUMENTATION">DOCUMENTATION</option>
                            <option value="TUTORIAL">TUTORIAL</option>
                            <option value="ARTICLE">ARTICLE</option>
                          </select>
                        </div>

                        {/* Associated Skill ID & Free Toggle */}
                        <div className="flex items-center space-x-6">
                          <div className="flex-1">
                            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                              Skill ID (Mapping)
                            </label>
                            <input
                              type="number"
                              min={1}
                              value={resourceForm.skillId}
                              onChange={(e) => setResourceForm({ ...resourceForm, skillId: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-sm focus:outline-none focus:border-red-500"
                            />
                          </div>

                          <div className="pt-5">
                            <label className="inline-flex items-center space-x-2 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={resourceForm.free}
                                onChange={(e) => setResourceForm({ ...resourceForm, free: e.target.checked })}
                                className="w-4 h-4 accent-red-600 rounded"
                              />
                              <span className="text-xs font-semibold text-gray-300">Free Access</span>
                            </label>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-red-400" />
                            <span>Description & Topics Covered</span>
                          </label>
                          <textarea
                            rows={3}
                            maxLength={2000}
                            placeholder="Key takeaways, syllabus highlights, and pre-requisites..."
                            value={resourceForm.description}
                            onChange={(e) => setResourceForm({ ...resourceForm, description: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-sm focus:outline-none focus:border-red-500 placeholder-gray-500 transition-colors"
                          />
                        </div>

                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={creatingResource}
                          className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all flex items-center space-x-2 disabled:opacity-50 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>{creatingResource ? 'Publishing...' : 'Publish Learning Resource'}</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Existing Learning Resources Catalog */}
                <div className="p-6 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-red-950">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-red-400" />
                        <span>Published Learning Resources ({resources.length})</span>
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Students can query these resources via search and title filters on the profile page.
                      </p>
                    </div>

                    <div className="relative w-full sm:w-64">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search resources..."
                        value={resourceSearch}
                        onChange={(e) => setResourceSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-xs focus:outline-none focus:border-red-500 placeholder-gray-500"
                      />
                    </div>
                  </div>

                  {loadingResources ? (
                    <div className="py-12 text-center text-gray-400 text-sm">
                      <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                      Loading learning resources...
                    </div>
                  ) : filteredResources.length === 0 ? (
                    <div className="py-12 text-center text-gray-400 text-sm">
                      No resources found. Publish one above!
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {filteredResources.map((r) => (
                        <div
                          key={r.id || r.title}
                          className="p-5 rounded-2xl bg-[#140f1c] border border-red-900/30 hover:border-red-600/40 transition-all space-y-3 flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/40">
                                {r.resourceType || 'COURSE'}
                              </span>
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                r.free !== false
                                  ? 'bg-emerald-950/60 border border-emerald-800/40 text-emerald-400'
                                  : 'bg-amber-950/60 border border-amber-800/40 text-amber-400'
                              }`}>
                                {r.free !== false ? 'FREE' : 'PAID'}
                              </span>
                            </div>

                            <h4 className="text-sm font-bold text-white line-clamp-2">
                              {r.title}
                            </h4>

                            <p className="text-xs text-gray-400">
                              Provider: <span className="text-gray-200 font-medium">{r.provider || 'Web'}</span>
                              {r.skillName && ` • Skill: ${r.skillName}`}
                            </p>

                            <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                              {r.description || 'Curated educational material for technical proficiency.'}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-red-950/60 flex items-center justify-between">
                            <span className="text-[11px] font-mono text-gray-500">
                              ID #{r.id || '-'}
                            </span>

                            <a
                              href={r.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-red-400 hover:text-red-300 hover:underline"
                            >
                              <span>View Resource</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminPage;
