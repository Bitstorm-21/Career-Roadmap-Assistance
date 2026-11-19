import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Search, 
  FileText, 
  BarChart3, 
  Target, 
  Compass, 
  Cpu, 
  BookOpen, 
  Award, 
  Layers,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import statueImg from '../assets/statue-bg.png';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('roadmaps');
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#08070b] text-gray-100 overflow-x-hidden pt-20">
      {/* Background Ambience: Subtle red gradients & grid pattern */}
      <div className="absolute inset-0 bg-grid-red pointer-events-none opacity-40 z-0" />
      <div className="absolute top-0 left-1/4 w-[650px] h-[650px] bg-red-600/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-rose-900/15 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* ========================================================
          HERO SECTION (Matching Reference Images 1 & 2)
      ======================================================== */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 lg:pt-14 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Artwork (The Statue with Glowing Astrological/Math Rings) */}
          <div className="lg:col-span-5 relative flex items-center justify-center order-2 lg:order-1">
            {/* Glowing Rings Background matching the uploaded artwork */}
            <div className="relative w-full max-w-[440px] aspect-square flex items-center justify-center">
              {/* Outer Circular Ring with Red Glow */}
              <div className="absolute inset-0 rounded-full border border-red-500/30 animate-pulse-glow shadow-[0_0_50px_rgba(239,68,68,0.2)]" />
              <div className="absolute inset-4 rounded-full border border-dashed border-red-600/20 animate-spin" style={{ animationDuration: '60s' }} />
              <div className="absolute inset-10 rounded-full border border-red-500/15" />
              
              {/* Glowing Red Aura behind Statue */}
              <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-red-600/30 via-rose-500/20 to-transparent blur-3xl pointer-events-none" />

              {/* Statue Image (The user's 4th/5th image) */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden p-2 flex items-center justify-center group">
                <img
                  src={statueImg}
                  alt="AI Philosophy Statue"
                  className="w-full h-full object-cover rounded-2xl drop-shadow-[0_15px_35px_rgba(239,68,68,0.25)] filter brightness-95 contrast-105 transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to public folder path if needed
                    e.currentTarget.src = '/statue-bg.png';
                  }}
                />
                
                {/* Red radial gradient overlay to seamlessly blend with dark background */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08070b] via-transparent to-transparent opacity-85 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#08070b]/60 via-transparent to-[#08070b]/60 pointer-events-none" />

                {/* Ambient Tag on Artwork */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-red-900/40 text-xs flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="text-gray-300 font-medium">Intelligent Career Engine</span>
                  </div>
                  <span className="text-red-400 font-mono text-[10px] tracking-wider uppercase">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center-Right Column: Headline & Hero Content */}
          <div className="lg:col-span-7 space-y-7 order-1 lg:order-2">
            
            {/* Top Glowing Pill Badge (Matching Image: '● AI-Powered Job Applications') */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-950/40 border border-red-800/40 backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] animate-pulse" />
              <span className="text-xs font-semibold tracking-wide text-red-200">
                AI-Powered Job Applications
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white hero-serif leading-[1.15]">
              Land your next role <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-red-400 drop-shadow-[0_0_25px_rgba(239,68,68,0.4)]">
                with AI
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-300 max-w-xl leading-relaxed font-light">
              AI Career Assistance helps you discover relevant jobs, match your skills, personalize your applications, and track every opportunity from one place.
            </p>

            {/* CTAs - Hidden if logged in, takes to /profile */}
            {!isAuthenticated && (
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/profile"
                  className="inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-full text-base font-semibold text-white bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 transition-all duration-300 shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:shadow-[0_0_35px_rgba(239,68,68,0.7)] transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            )}

            {/* Checklist items below buttons (Matching Image 2: AI Job Matching, Resume Intelligence, Application Tracking) */}
            <div className="flex flex-wrap items-center gap-6 pt-3 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-red-500" />
                <span>AI Job Matching</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-red-500" />
                <span>Resume Intelligence</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-red-500" />
                <span>Application Tracking</span>
              </div>
            </div>

            {/* Floating Quick Action Cards on the right side (Matching Image 1 & 2 cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {/* Card 1: Find Jobs */}
              <div className="p-4 rounded-2xl bg-[#110d15]/80 backdrop-blur-md border border-red-900/30 hover:border-red-600/50 shadow-lg shadow-black/40 hover:shadow-red-950/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-400 mb-3 group-hover:scale-110 transition-transform">
                  <Search className="w-5 h-5" />
                </div>
                <h4 className="text-white font-semibold text-sm group-hover:text-red-400 transition-colors">
                  Find Jobs
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  Discover personalized opportunities
                </p>
              </div>

              {/* Card 2: Apply with AI */}
              <div className="p-4 rounded-2xl bg-[#110d15]/80 backdrop-blur-md border border-red-900/30 hover:border-red-600/50 shadow-lg shadow-black/40 hover:shadow-red-950/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-400 mb-3 group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="text-white font-semibold text-sm group-hover:text-red-400 transition-colors">
                  Apply with AI
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  Generate tailored applications
                </p>
              </div>

              {/* Card 3: Track Progress */}
              <div className="p-4 rounded-2xl bg-[#110d15]/80 backdrop-blur-md border border-red-900/30 hover:border-red-600/50 shadow-lg shadow-black/40 hover:shadow-red-950/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-400 mb-3 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h4 className="text-white font-semibold text-sm group-hover:text-red-400 transition-colors">
                  Track Progress
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  Monitor your journey to success
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          HOW IT WORKS (3-STEP PIPELINE)
      ======================================================== */}
      <section id="how-it-works" className="relative z-10 py-20 border-t border-red-950/40 bg-[#09080e]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-3">
              How It Works
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white hero-serif">
              Three Steps from Resume to Dream Job
            </h3>
            <p className="mt-4 text-gray-400">
              Our intelligent system connects your resume with advanced AI to generate custom milestones, analyze gaps, and test your skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="relative p-6 rounded-2xl bg-[#110d17]/80 border border-red-900/30 hover:border-red-600/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-900 text-white font-bold flex items-center justify-center mb-5 shadow-lg shadow-red-600/30">
                01
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Upload & Parse Resume</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Stream your PDF to our AI service. We parse 7 skill categories and calculate your instant ATS compatibility score.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 rounded-2xl bg-[#110d17]/80 border border-red-900/30 hover:border-red-600/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-900 text-white font-bold flex items-center justify-center mb-5 shadow-lg shadow-red-600/30">
                02
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Semantic Gap Analysis</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Our AI compares your current skills against industry career benchmarks to highlight critical missing requirements.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 rounded-2xl bg-[#110d17]/80 border border-red-900/30 hover:border-red-600/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-900 text-white font-bold flex items-center justify-center mb-5 shadow-lg shadow-red-600/30">
                03
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Dynamic AI Roadmaps</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Receive weekly learning milestones with curated video resources, and validate your mastery through built-in assessments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FEATURE SHOWCASE TABS
      ======================================================== */}
      <section id="features" className="relative z-10 py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-3">
            Powerful Platform Features
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white hero-serif">
            Designed for Modern Engineers & Students
          </h3>
          <p className="mt-3 text-gray-400">
            Powerful tools to accelerate your career journey.
          </p>

          {/* Feature Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setActiveTab('roadmaps')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'roadmaps'
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                  : 'bg-red-950/20 text-gray-300 hover:bg-red-950/40 border border-red-900/30'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>AI Roadmaps</span>
            </button>

            <button
              onClick={() => setActiveTab('resume')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'resume'
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                  : 'bg-red-950/20 text-gray-300 hover:bg-red-950/40 border border-red-900/30'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>ATS Resume Review</span>
            </button>

            <button
              onClick={() => setActiveTab('gap')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'gap'
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                  : 'bg-red-950/20 text-gray-300 hover:bg-red-950/40 border border-red-900/30'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Semantic Gap Analysis</span>
            </button>

            <button
              onClick={() => setActiveTab('assessments')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'assessments'
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                  : 'bg-red-950/20 text-gray-300 hover:bg-red-950/40 border border-red-900/30'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Skill Assessments</span>
            </button>
          </div>
        </div>

        {/* Tab Preview Display */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[100px] pointer-events-none" />

          {activeTab === 'roadmaps' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center space-x-2 text-xs font-semibold px-3 py-1 rounded-full bg-red-950/50 border border-red-800/40 text-red-300">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Dynamic AI Learning Paths</span>
                </div>
                <h4 className="text-3xl font-bold text-white hero-serif">
                  Personalized 12-Week Milestones
                </h4>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Our algorithm creates dynamic roadmaps tailored to your career goal (e.g., Backend Developer, Full Stack, Data Engineer). Track status from NOT_STARTED to COMPLETED with step-by-step progress tracking.
                </p>
                <div className="space-y-2.5">
                  <div className="flex items-center space-x-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-red-500" />
                    <span>Curated video tutorials and documentation links for every milestone</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-red-500" />
                    <span>Granular progress summary with completion percentage</span>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="inline-flex items-center space-x-2 text-sm font-semibold text-red-400 hover:text-red-300 pt-2"
                >
                  <span>Generate your first roadmap</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Mockup Card */}
              <div className="p-5 rounded-2xl bg-black/60 border border-red-900/40 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-red-950">
                  <span className="text-red-400 font-bold">Roadmap: Backend Developer</span>
                  <span className="text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded">Active</span>
                </div>
                <div className="p-3 rounded-lg bg-red-950/20 border border-red-900/20">
                  <span className="text-gray-400">Week 1-2:</span> <span className="text-white">Core Java, OOP & Multithreading</span>
                  <div className="w-full bg-gray-800 h-1.5 rounded-full mt-2">
                    <div className="bg-red-500 h-1.5 rounded-full w-[100%]" />
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-red-950/20 border border-red-900/20">
                  <span className="text-gray-400">Week 3-5:</span> <span className="text-white">Spring Boot REST APIs & Hibernate</span>
                  <div className="w-full bg-gray-800 h-1.5 rounded-full mt-2">
                    <div className="bg-red-500 h-1.5 rounded-full w-[65%]" />
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-red-950/20 border border-red-900/20 opacity-60">
                  <span className="text-gray-400">Week 6-8:</span> <span className="text-white">Docker, Microservices & PostgreSQL</span>
                  <div className="w-full bg-gray-800 h-1.5 rounded-full mt-2">
                    <div className="bg-gray-700 h-1.5 rounded-full w-[15%]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'resume' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center space-x-2 text-xs font-semibold px-3 py-1 rounded-full bg-red-950/50 border border-red-800/40 text-red-300">
                  <FileText className="w-3.5 h-3.5" />
                  <span>ATS Scoring & Resume Parsing</span>
                </div>
                <h4 className="text-3xl font-bold text-white hero-serif">
                  Automated Technical Skill Extraction
                </h4>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Upload your PDF resume to extract skills across 7 domains including Languages, Frameworks, Databases, and Cloud tools. Get instant feedback on formatting, keyword strength, and role suitability.
                </p>
                <div className="space-y-2.5">
                  <div className="flex items-center space-x-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-red-500" />
                    <span>Scored out of 100 with clear actionable improvement bullets</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-red-500" />
                    <span>Auto-syncs extracted skills with your user profile</span>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="inline-flex items-center space-x-2 text-sm font-semibold text-red-400 hover:text-red-300 pt-2"
                >
                  <span>Review your resume now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Mockup Card */}
              <div className="p-5 rounded-2xl bg-black/60 border border-red-900/40 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">ATS Compatibility Score</span>
                  <span className="text-2xl font-extrabold text-red-400">88/100</span>
                </div>
                <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-red-600 to-rose-400 h-2.5 rounded-full w-[88%]" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded bg-red-950/30 border border-red-900/30 text-gray-300">
                    <span className="text-red-400 font-bold block mb-1">Extracted Skills</span>
                    Java, Spring Boot, Docker, SQL
                  </div>
                  <div className="p-2 rounded bg-red-950/30 border border-red-900/30 text-gray-300">
                    <span className="text-red-400 font-bold block mb-1">Suggested Additions</span>
                    Kubernetes, Kafka, Redis
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gap' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center space-x-2 text-xs font-semibold px-3 py-1 rounded-full bg-red-950/50 border border-red-800/40 text-red-300">
                  <Target className="w-3.5 h-3.5" />
                  <span>Deep Semantic Match</span>
                </div>
                <h4 className="text-3xl font-bold text-white hero-serif">
                  Know Exactly What You're Missing
                </h4>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Unlike basic keyword matchers, our AI performs semantic reasoning to understand how your existing knowledge translates to the target role.
                </p>
                <div className="space-y-2.5">
                  <div className="flex items-center space-x-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-red-500" />
                    <span>Identifies critical prerequisites versus optional skills</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-red-500" />
                    <span>Provides direct links to learning resources for missing skills</span>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="inline-flex items-center space-x-2 text-sm font-semibold text-red-400 hover:text-red-300 pt-2"
                >
                  <span>Analyze your skill gaps</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Mockup Card */}
              <div className="p-5 rounded-2xl bg-black/60 border border-red-900/40 space-y-3">
                <div className="text-sm font-bold text-white mb-2">Target: Backend Engineer Gap Report</div>
                <div className="flex items-center justify-between text-xs p-2 rounded bg-emerald-950/30 border border-emerald-900/30 text-emerald-400">
                  <span>✔ Java & Spring Boot</span>
                  <span>Matched (85%)</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2 rounded bg-amber-950/30 border border-amber-900/30 text-amber-400">
                  <span>▲ PostgreSQL Schema Design</span>
                  <span>Intermediate Needed</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2 rounded bg-red-950/40 border border-red-900/40 text-red-400">
                  <span>✕ Distributed Caching (Redis)</span>
                  <span>Critical Missing</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'assessments' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center space-x-2 text-xs font-semibold px-3 py-1 rounded-full bg-red-950/50 border border-red-800/40 text-red-300">
                  <Award className="w-3.5 h-3.5" />
                  <span>Validation & Certification</span>
                </div>
                <h4 className="text-3xl font-bold text-white hero-serif">
                  Test and Verify Your Competence
                </h4>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Take timed technical quizzes on Java, Spring Boot, Databases, and System Design to prove your skill proficiency before sending out applications.
                </p>
                <div className="space-y-2.5">
                  <div className="flex items-center space-x-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-red-500" />
                    <span>Real-time score calculation and detailed answers breakdown</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-red-500" />
                    <span>Verified skill badges added to your public profile</span>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="inline-flex items-center space-x-2 text-sm font-semibold text-red-400 hover:text-red-300 pt-2"
                >
                  <span>Start Skill Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Mockup Card */}
              <div className="p-5 rounded-2xl bg-black/60 border border-red-900/40 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-white font-bold pb-2 border-b border-red-950">
                  <span>Quiz: Java Fundamentals</span>
                  <span className="text-red-400">30 Mins</span>
                </div>
                <p className="text-gray-300">
                  Q: What is the default value of an uninitialized int variable in a Java class?
                </p>
                <div className="space-y-1.5 pt-1">
                  <div className="p-2 rounded bg-red-950/20 border border-red-900/20 text-gray-400">A) null</div>
                  <div className="p-2 rounded bg-red-600/30 border border-red-500 text-white font-bold">B) 0  (Selected)</div>
                  <div className="p-2 rounded bg-red-950/20 border border-red-900/20 text-gray-400">C) undefined</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          BOTTOM CALL TO ACTION BANNER (Hidden if user is logged in)
      ======================================================== */}
      {!isAuthenticated && (
        <section className="relative z-10 py-20 bg-gradient-to-b from-transparent via-red-950/20 to-[#08070b]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h3 className="text-3xl sm:text-5xl font-extrabold text-white hero-serif leading-tight">
              Ready to Accelerate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-red-500">
                Software Career?
              </span>
            </h3>
            <p className="text-gray-300 max-w-xl mx-auto text-base">
              Join thousands of aspiring developers leveling up with AI roadmaps, ATS resume reviews, and targeted skill assessments.
            </p>
            <div className="pt-2">
              <Link
                to="/register"
                className="inline-flex items-center space-x-2 px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 shadow-[0_0_30px_rgba(239,68,68,0.6)] hover:shadow-[0_0_45px_rgba(239,68,68,0.8)] transition-all duration-300 transform hover:-translate-y-1"
              >
                <span>Get Started for Free</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Video / Demo Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl p-6 rounded-3xl bg-[#110d18] border border-red-900/50 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-red-950">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-red-500" />
                <span>AI Career Assistance Platform Overview</span>
              </h3>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-950/60 border border-red-600 flex items-center justify-center mx-auto text-red-500 animate-pulse">
                <Play className="w-8 h-8 fill-red-500 ml-1" />
              </div>
              <p className="text-gray-300 text-sm max-w-md mx-auto">
                Your AI-powered career companion. Build your personalized roadmap and land your dream tech role.
              </p>
              <div className="pt-2">
                <Link
                  to="/login"
                  onClick={() => setVideoModalOpen(false)}
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/40"
                >
                  <span>Go to Login</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
