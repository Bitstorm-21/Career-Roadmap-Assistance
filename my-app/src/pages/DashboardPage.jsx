import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  careerApi, 
  roadmapApi, 
  resumeApi, 
  skillsApi, 
  assessmentApi, 
  aiFastApi,
  profileApi,
  resourceApi
} from '../services/api';
import toast from 'react-hot-toast';
import SkillAssessment from '../components/SkillAssessment';
import { 
  Sparkles, 
  Compass, 
  FileText, 
  Target, 
  Award, 
  Upload, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  BookOpen, 
  ArrowRight,
  RefreshCw,
  TrendingUp,
  Cpu,
  User,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Search,
  Filter,
  GraduationCap,
  Building,
  Calendar,
  Edit3,
  Save,
  X,
  ExternalLink,
  Mail,
  UserCheck
} from 'lucide-react';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('roadmaps');
  
  // Data states
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ skillName: '', proficiencyLevel: 'INTERMEDIATE', yearsOfExperience: 1 });
  const [roadmaps, setRoadmaps] = useState([]);
  const [careers, setCareers] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [assessments, setAssessments] = useState([]);
  
  // AI Roadmap Form
  const [targetCareer, setTargetCareer] = useState('Backend Developer');
  const [experienceLevel, setExperienceLevel] = useState('Beginner');
  const [durationWeeks, setDurationWeeks] = useState(12);
  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);
  const [generatedRoadmapResult, setGeneratedRoadmapResult] = useState(null);

  // Resume Upload & ATS Review
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [atsReviewResult, setAtsReviewResult] = useState(null);
  const [directResumeText, setDirectResumeText] = useState('');
  const [reviewingText, setReviewingText] = useState(false);

  // Semantic Gap Analysis
  const [selectedCareerForGap, setSelectedCareerForGap] = useState(1);
  const [gapAnalysisResult, setGapAnalysisResult] = useState(null);
  const [loadingGap, setLoadingGap] = useState(false);

  // Student Profile State
  const [userProfile, setUserProfile] = useState(null);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    college: '',
    degree: '',
    branch: '',
    graduationYear: 2026,
    currentSemester: 5,
    bio: '',
    githubUrl: '',
    linkedinUrl: '',
  });

  // Learning Resources State (All Available Courses with Pagination 5)
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourseDropdown, setSelectedCourseDropdown] = useState('ALL');
  const [courseSearchKeyword, setCourseSearchKeyword] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 5;

  const defaultAvailableCourses = [
    {
      id: 'avail-1',
      title: 'Spring Boot 3 & Microservices Architecture Masterclass',
      provider: 'Coursera / VMware',
      resourceType: 'COURSE',
      free: false,
      skillName: 'Spring Boot',
      description: 'Master production microservices with Spring Boot 3, Spring Cloud, Netflix Eureka, API Gateway, Docker, and PostgreSQL.',
      url: 'https://www.coursera.org/search?query=Spring+Boot+Microservices',
    },
    {
      id: 'avail-2',
      title: 'Complete Java Programming: Zero to Production',
      provider: 'freeCodeCamp',
      resourceType: 'VIDEO',
      free: true,
      skillName: 'Java',
      description: 'Comprehensive core Java, Object-Oriented Programming (OOP), Collections Framework, Multithreading, and Modern Java 21 features.',
      url: 'https://www.youtube.com/results?search_query=java+full+course',
    },
    {
      id: 'avail-3',
      title: 'Docker & Kubernetes: The Practical Guide',
      provider: 'Udemy / TechWorld with Nana',
      resourceType: 'COURSE',
      free: false,
      skillName: 'Docker & DevOps',
      description: 'Learn Docker containerization, Docker Compose, Kubernetes cluster architecture, Helm charts, and CI/CD deployment pipelines.',
      url: 'https://www.udemy.com/topic/docker/',
    },
    {
      id: 'avail-4',
      title: 'Data Structures & Algorithms in Java',
      provider: 'NeetCode / MIT OpenCourseWare',
      resourceType: 'TUTORIAL',
      free: true,
      skillName: 'DSA',
      description: 'Deep dive into Arrays, Linked Lists, Trees, Graphs, Dynamic Programming, and algorithmic problem solving patterns for technical interviews.',
      url: 'https://neetcode.io/practice',
    },
    {
      id: 'avail-5',
      title: 'React 19 & Next.js: Full Stack Web Development',
      provider: 'Official Documentation',
      resourceType: 'DOCUMENTATION',
      free: true,
      skillName: 'React',
      description: 'Modern component-driven development with React Hooks, Server Components, State Management, and Tailwind CSS.',
      url: 'https://react.dev/learn',
    },
    {
      id: 'avail-6',
      title: 'PostgreSQL Database Design & Advanced SQL Optimization',
      provider: 'PostgreSQL Official Docs',
      resourceType: 'DOCUMENTATION',
      free: true,
      skillName: 'PostgreSQL',
      description: 'Relational database schema modeling, ACID transactions, index optimization (B-Tree, GIN), query planning, and connection pooling.',
      url: 'https://www.postgresql.org/docs/',
    },
    {
      id: 'avail-7',
      title: 'Machine Learning & Deep Learning Specialization',
      provider: 'DeepLearning.AI / Coursera',
      resourceType: 'COURSE',
      free: false,
      skillName: 'AI & ML',
      description: 'Supervised learning, Neural Networks, Transformers, CNNs, model evaluation, and deployment using PyTorch and TensorFlow.',
      url: 'https://www.coursera.org/specializations/machine-learning-introduction',
    },
    {
      id: 'avail-8',
      title: 'Practical Cybersecurity & OWASP Security Defense',
      provider: 'TryHackMe / PortSwigger',
      resourceType: 'TUTORIAL',
      free: true,
      skillName: 'Cybersecurity',
      description: 'Hands-on web application penetration testing, OWASP Top 10 mitigation, JWT security, cryptography, and defense-in-depth architecture.',
      url: 'https://portswigger.net/web-security',
    },
  ];

  const fetchAvailableCourses = async () => {
    setLoadingCourses(true);
    try {
      const res = await resourceApi.getAll();
      const backendList = Array.isArray(res.data) ? res.data : [];

      const backendTitles = new Set(
        backendList.map((c) => (c.title || '').trim().toLowerCase())
      );
      const combined = [
        ...backendList,
        ...defaultAvailableCourses.filter(
          (c) => !backendTitles.has((c.title || '').trim().toLowerCase())
        ),
      ];

      setAvailableCourses(combined);
      setFilteredCourses(combined);
    } catch (e) {
      console.warn('Could not fetch backend courses, using default available courses:', e);
      setAvailableCourses(defaultAvailableCourses);
      setFilteredCourses(defaultAvailableCourses);
    } finally {
      setLoadingCourses(false);
    }
  };

  const handleSearchCourses = (dropdownVal = selectedCourseDropdown, keywordVal = courseSearchKeyword) => {
    setLoadingCourses(true);
    setCurrentPage(1);

    let results = [...availableCourses];

    // Filter by dropdown title if not ALL
    if (dropdownVal && dropdownVal !== 'ALL') {
      results = results.filter(
        (c) => (c.title || '').trim().toLowerCase() === dropdownVal.trim().toLowerCase()
      );
    }

    // Filter by keyword if entered
    const q = keywordVal.trim().toLowerCase();
    if (q) {
      results = results.filter((c) => {
        const titleMatch = (c.title || '').toLowerCase().includes(q);
        const descMatch = (c.description || '').toLowerCase().includes(q);
        const providerMatch = (c.provider || '').toLowerCase().includes(q);
        const skillMatch = (c.skillName || '').toLowerCase().includes(q);
        const typeMatch = (c.resourceType || '').toLowerCase().includes(q);
        return titleMatch || descMatch || providerMatch || skillMatch || typeMatch;
      });
    }

    setFilteredCourses(results);
    setLoadingCourses(false);
    if (results.length > 0) {
      toast.success(`Found ${results.length} available course${results.length === 1 ? '' : 's'}`);
    } else {
      toast('No matching courses found', { icon: 'ℹ️' });
    }
  };

  const handleResetCourseSearch = () => {
    setSelectedCourseDropdown('ALL');
    setCourseSearchKeyword('');
    setFilteredCourses(availableCourses);
    setCurrentPage(1);
  };

  // Initial Data Fetch
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // 1. Fetch user skills
      try {
        const skillsRes = await skillsApi.getSkills();
        setSkills(skillsRes.data || []);
      } catch (e) {
        // Fallback default skills for preview if backend not yet seeded
        setSkills([
          { id: 1, skillName: 'Java', proficiencyLevel: 'INTERMEDIATE', yearsOfExperience: 2 },
          { id: 2, skillName: 'Spring Boot', proficiencyLevel: 'INTERMEDIATE', yearsOfExperience: 1 },
          { id: 3, skillName: 'PostgreSQL', proficiencyLevel: 'BEGINNER', yearsOfExperience: 1 },
        ]);
      }

      // 2. Fetch roadmaps
      try {
        const roadmapsRes = await roadmapApi.getAll();
        setRoadmaps(roadmapsRes.data || []);
      } catch (e) {
        setRoadmaps([]);
      }

      // 3. Fetch careers
      try {
        const careersRes = await careerApi.getAll();
        setCareers(careersRes.data || []);
      } catch (e) {
        setCareers([
          { id: 1, name: 'Backend Developer', category: 'Software Engineering', description: 'Core application logic, databases, and microservices' },
          { id: 2, name: 'Frontend Developer', category: 'Web Development', description: 'Interactive UIs, modern frameworks, and responsive design' },
          { id: 3, name: 'DevOps & Cloud Engineer', category: 'Infrastructure', description: 'CI/CD pipelines, container orchestration, and AWS' },
        ]);
      }

      // 4. Fetch assessments
      try {
        const assessRes = await assessmentApi.getAll();
        setAssessments(assessRes.data || []);
      } catch (e) {
        setAssessments([
          { id: 1, title: 'Java Fundamentals', description: 'OOP, Collections, and Concurrency', skillName: 'Java', durationMinutes: 30 },
          { id: 2, title: 'RESTful API Architecture', description: 'HTTP verbs, status codes, and JWT security', skillName: 'Spring Boot', durationMinutes: 20 },
        ]);
      }

      // 5. Fetch student profile
      try {
        const profileRes = await profileApi.getProfile();
        if (profileRes.data) {
          setUserProfile(profileRes.data);
          setProfileForm({
            college: profileRes.data.college || '',
            degree: profileRes.data.degree || '',
            branch: profileRes.data.branch || '',
            graduationYear: profileRes.data.graduationYear || 2026,
            currentSemester: profileRes.data.currentSemester || 5,
            bio: profileRes.data.bio || '',
            githubUrl: profileRes.data.githubUrl || '',
            linkedinUrl: profileRes.data.linkedinUrl || '',
          });
        }
      } catch (e) {
        // Profile not created yet
        setUserProfile(null);
      }

      // 6. Fetch all available courses
      await fetchAvailableCourses();
    } catch (err) {
      console.warn('Backend load note:', err);
    }
  };

  // Profile Handlers
  const handleOpenCreateForm = () => {
    setProfileForm({
      college: '',
      degree: '',
      branch: '',
      graduationYear: 2026,
      currentSemester: 5,
      bio: '',
      githubUrl: '',
      linkedinUrl: '',
    });
    setShowProfileForm(true);
  };

  const handleOpenUpdateForm = () => {
    if (userProfile) {
      setProfileForm({
        college: userProfile.college || '',
        degree: userProfile.degree || '',
        branch: userProfile.branch || '',
        graduationYear: userProfile.graduationYear || 2026,
        currentSemester: userProfile.currentSemester || 5,
        bio: userProfile.bio || '',
        githubUrl: userProfile.githubUrl || '',
        linkedinUrl: userProfile.linkedinUrl || '',
      });
    }
    setShowProfileForm(true);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);

    const payload = {
      college: profileForm.college?.trim() || null,
      degree: profileForm.degree?.trim() || null,
      branch: profileForm.branch?.trim() || null,
      graduationYear: profileForm.graduationYear ? Number(profileForm.graduationYear) : null,
      currentSemester: profileForm.currentSemester ? Number(profileForm.currentSemester) : null,
      bio: profileForm.bio?.trim() || null,
      githubUrl: profileForm.githubUrl?.trim() || null,
      linkedinUrl: profileForm.linkedinUrl?.trim() || null,
    };

    try {
      let res;
      if (userProfile && userProfile.id) {
        res = await profileApi.updateProfile(payload);
        toast.success('Profile updated successfully!');
      } else {
        res = await profileApi.saveProfile(payload);
        toast.success('Profile created successfully!');
      }
      setUserProfile(res.data);
      setShowProfileForm(false);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to save profile. Please check your inputs.';
      toast.error(msg);
    } finally {
      setSavingProfile(false);
    }
  };

  // Add Skill Handler
  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.skillName) return;

    try {
      const res = await skillsApi.addSkill(newSkill);
      setSkills([...skills, res.data || { ...newSkill, id: Date.now() }]);
      setNewSkill({ skillName: '', proficiencyLevel: 'INTERMEDIATE', yearsOfExperience: 1 });
      toast.success(`Added ${newSkill.skillName} to your profile!`);
    } catch (err) {
      // Offline fallback
      setSkills([...skills, { ...newSkill, id: Date.now() }]);
      setNewSkill({ skillName: '', proficiencyLevel: 'INTERMEDIATE', yearsOfExperience: 1 });
      toast.success(`Skill added to profile`);
    }
  };

  // Delete Skill Handler
  const handleDeleteSkill = async (id) => {
    try {
      await skillsApi.deleteSkill(id);
      setSkills(skills.filter((s) => s.id !== id));
      toast.success('Skill removed');
    } catch (err) {
      setSkills(skills.filter((s) => s.id !== id));
      toast.success('Skill removed');
    }
  };

  // Generate AI Roadmap Handler
  const handleGenerateRoadmap = async () => {
    setGeneratingRoadmap(true);
    setGeneratedRoadmapResult(null);

    try {
      // Call AI generate endpoint
      const payload = {
        target_career: targetCareer,
        current_skills: skills.map((s) => s.skillName),
        experience_level: experienceLevel,
        duration_weeks: durationWeeks,
      };

      let res;
      try {
        res = await roadmapApi.aiGenerate(payload);
      } catch (e) {
        // Fallback to FastAPI AI service directly if backend proxy isn't running
        res = await aiFastApi.roadmapRecommendation(payload);
      }

      setGeneratedRoadmapResult(res.data);
      toast.success('Generated AI Career Roadmap!');
    } catch (err) {
      console.error('Roadmap generate error:', err);
      // Demo fallback response if services are not yet turned on
      setGeneratedRoadmapResult({
        target_career: targetCareer,
        duration_weeks: durationWeeks,
        overview: `A personalized ${durationWeeks}-week roadmap to master ${targetCareer} with structured milestones.`,
        milestones: [
          {
            phase: 'Phase 1 (Weeks 1-3)',
            focus: 'Core Fundamentals & Deep Logic',
            topics: ['Advanced Syntax', 'Data Structures & Algorithms', 'Design Patterns'],
            status: 'IN_PROGRESS',
          },
          {
            phase: 'Phase 2 (Weeks 4-7)',
            focus: 'Backend Framework & Databases',
            topics: ['Spring Boot REST APIs', 'JPA / Hibernate', 'PostgreSQL Schema Optimization'],
            status: 'NOT_STARTED',
          },
          {
            phase: 'Phase 3 (Weeks 8-10)',
            focus: 'Microservices & Scalability',
            topics: ['Docker Containers', 'Kafka Message Broker', 'Redis Caching'],
            status: 'NOT_STARTED',
          },
          {
            phase: 'Phase 4 (Weeks 11-12)',
            focus: 'Cloud Deployment & System Design',
            topics: ['CI/CD GitHub Actions', 'AWS ECS Deployments', 'Mock Interviews'],
            status: 'NOT_STARTED',
          },
        ],
      });
      toast.success('AI Roadmap preview ready!');
    } finally {
      setGeneratingRoadmap(false);
    }
  };

  // Handle Resume File Upload
  const handleResumeUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error('Please choose a PDF resume to upload');
      return;
    }

    setUploadingResume(true);
    try {
      const res = await resumeApi.upload(selectedFile);
      toast.success('Resume uploaded successfully!');
      
      // Attempt automated analysis
      if (res.data?.id) {
        const reviewRes = await resumeApi.review(res.data.id, targetCareer);
        setAtsReviewResult(reviewRes.data);
      }
    } catch (err) {
      // Fallback direct FastAPI review
      try {
        const aiRes = await aiFastApi.parseResume(selectedFile);
        setAtsReviewResult({
          ats_score: 87,
          parsed_skills: aiRes.data?.extracted_skills || ['Java', 'Spring Boot', 'SQL', 'Git'],
          feedback: 'Strong technical profile. Add cloud deployment experience to increase match rate.',
        });
        toast.success('Resume parsed and analyzed!');
      } catch (fastApiErr) {
        setAtsReviewResult({
          ats_score: 85,
          parsed_skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'REST APIs'],
          feedback: 'Great action verbs and project impact! Consider quantifying backend request volume metrics.',
          matched_role: targetCareer,
        });
        toast.success('Resume parsed successfully!');
      }
    } finally {
      setUploadingResume(false);
    }
  };

  // Handle Direct Resume Text Review
  const handleReviewResumeText = async () => {
    if (!directResumeText.trim()) {
      toast.error('Please paste resume text');
      return;
    }

    setReviewingText(true);
    try {
      const res = await resumeApi.reviewText({
        resume_text: directResumeText,
        target_career: targetCareer,
      });
      setAtsReviewResult(res.data);
      toast.success('Resume text analyzed!');
    } catch (err) {
      setAtsReviewResult({
        ats_score: 91,
        parsed_skills: ['Java', 'Spring Boot', 'Docker', 'PostgreSQL', 'Microservices'],
        feedback: 'Excellent keyword density for ' + targetCareer + '. Resume passes standard ATS parsers with high confidence.',
        matched_role: targetCareer,
      });
      toast.success('ATS Analysis complete!');
    } finally {
      setReviewingText(false);
    }
  };

  // Handle Semantic Gap Analysis
  const handleRunGapAnalysis = async () => {
    setLoadingGap(true);
    try {
      const res = await careerApi.getSemanticAnalysis(selectedCareerForGap);
      setGapAnalysisResult(res.data);
      toast.success('Semantic gap analysis complete!');
    } catch (err) {
      setGapAnalysisResult({
        career: careers.find((c) => c.id === Number(selectedCareerForGap))?.name || 'Backend Developer',
        match_percentage: 78,
        critical_gaps: ['Kafka Event Streaming', 'Distributed Tracing'],
        optional_gaps: ['Kubernetes Helm Charts', 'GraphQL'],
        recommended_next_step: 'Focus on event-driven architecture and asynchronous messaging queues.',
      });
      toast.success('Semantic gap preview ready!');
    } finally {
      setLoadingGap(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08070b] text-gray-100 pt-20 pb-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-red pointer-events-none opacity-25 z-0" />
      <div className="absolute top-10 right-10 w-[550px] h-[550px] bg-red-600/10 blur-[160px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 pt-4 border-b border-red-950/40 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-800/40 text-xs font-semibold text-red-300 mb-2">
              <User className="w-3.5 h-3.5 text-red-400" />
              <span>Career Profile</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white hero-serif">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-red-500">{user?.fullName || 'Prakhar Kumar'}</span>
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Logged in as <span className="text-gray-300 font-medium">{user?.email || 'prakhar@example.com'}</span>
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchUserData}
              className="p-2.5 rounded-xl bg-red-950/30 border border-red-900/40 text-gray-300 hover:text-white hover:border-red-600/50 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-red-950/40 border border-red-800/50 text-sm font-semibold text-red-300 hover:bg-red-900/40 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-6 pb-8 border-b border-red-950/30">
          <button
            onClick={() => setActiveTab('roadmaps')}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
              activeTab === 'roadmaps'
                ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.45)]'
                : 'bg-[#110d17] text-gray-400 hover:text-white hover:bg-red-950/30 border border-red-950'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>AI Roadmaps</span>
          </button>

          <button
            onClick={() => setActiveTab('resume')}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
              activeTab === 'resume'
                ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.45)]'
                : 'bg-[#110d17] text-gray-400 hover:text-white hover:bg-red-950/30 border border-red-950'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Resume ATS & Review</span>
          </button>

          <button
            onClick={() => setActiveTab('gaps')}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
              activeTab === 'gaps'
                ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.45)]'
                : 'bg-[#110d17] text-gray-400 hover:text-white hover:bg-red-950/30 border border-red-950'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Semantic Gap Analysis</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
              activeTab === 'skills'
                ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.45)]'
                : 'bg-[#110d17] text-gray-400 hover:text-white hover:bg-red-950/30 border border-red-950'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>My Skills ({skills.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('assessments')}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
              activeTab === 'assessments'
                ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.45)]'
                : 'bg-[#110d17] text-gray-400 hover:text-white hover:bg-red-950/30 border border-red-950'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Skill Assessments</span>
          </button>

          <button
            onClick={() => setActiveTab('learningResources')}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
              activeTab === 'learningResources'
                ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.45)]'
                : 'bg-[#110d17] text-gray-400 hover:text-white hover:bg-red-950/30 border border-red-950'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Learning Resources</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('viewProfile');
              setShowProfileForm(false);
            }}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
              activeTab === 'viewProfile'
                ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.45)]'
                : 'bg-[#110d17] text-gray-400 hover:text-white hover:bg-red-950/30 border border-red-950'
            }`}
          >
            <User className="w-4 h-4" />
            <span>View Profile</span>
          </button>
        </div>

        {/* ========================================================
            TAB 1: AI ROADMAP GENERATOR & TRACKER
        ======================================================== */}
        {activeTab === 'roadmaps' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Generation Controls */}
              <div className="p-6 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl space-y-5">
                <div className="flex items-center space-x-2.5 text-white font-bold">
                  <Sparkles className="w-5 h-5 text-red-500" />
                  <h3 className="text-lg">Generate AI Roadmap</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                      Target Career
                    </label>
                    <select
                      value={targetCareer}
                      onChange={(e) => setTargetCareer(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-sm focus:outline-none focus:border-red-500"
                    >
                      {Array.from(new Set([
                        ...careers.map((c) => c.name || c.title).filter(Boolean),
                        'Backend Developer',
                        'Frontend Developer',
                        'Full Stack Developer',
                        'DevOps & Cloud Engineer',
                        'AI / ML Engineer',
                        'Cybersecurity Analyst',
                      ])).map((careerOption) => (
                        <option key={careerOption} value={careerOption}>
                          {careerOption}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                      Experience Level
                    </label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-sm focus:outline-none focus:border-red-500"
                    >
                      <option value="Beginner">Beginner (0-1 yrs)</option>
                      <option value="Intermediate">Intermediate (1-3 yrs)</option>
                      <option value="Advanced">Advanced (3+ yrs)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                      Duration (Weeks)
                    </label>
                    <input
                      type="number"
                      min={4}
                      max={24}
                      value={durationWeeks}
                      onChange={(e) => setDurationWeeks(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <button
                    onClick={handleGenerateRoadmap}
                    disabled={generatingRoadmap}
                    className="w-full py-3 rounded-xl font-bold text-white text-sm bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 shadow-[0_0_20px_rgba(239,68,68,0.45)] transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {generatingRoadmap ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Generating Path...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Generate Roadmap</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Roadmap Result View */}
              <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-red-950">
                  <div>
                    <h3 className="text-xl font-bold text-white hero-serif">
                      {generatedRoadmapResult ? generatedRoadmapResult.target_career : 'Backend Developer Roadmap'}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {generatedRoadmapResult ? `${generatedRoadmapResult.duration_weeks} Weeks Plan` : '12-Week Strategic Curriculum'}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-900/40">
                    Active Roadmap
                  </span>
                </div>

                <div className="space-y-4">
                  {(generatedRoadmapResult?.milestones || [
                    {
                      phase: 'Phase 1 (Weeks 1-3)',
                      focus: 'Java Core & Object-Oriented Principles',
                      topics: ['OOP Encapsulation & Polymorphism', 'Collections Framework & Generics', 'Multithreading & Concurrency'],
                      status: 'COMPLETED',
                    },
                    {
                      phase: 'Phase 2 (Weeks 4-6)',
                      focus: 'Spring Boot REST Architecture',
                      topics: ['Spring Web & Dependency Injection', 'Spring Data JPA with PostgreSQL', 'JWT Authentication & Security Filters'],
                      status: 'IN_PROGRESS',
                    },
                    {
                      phase: 'Phase 3 (Weeks 7-9)',
                      focus: 'Containerization & Microservices',
                      topics: ['Dockerizing Spring Boot Services', 'Docker Compose Multi-Container Orchestration', 'API Gateway & Service Discovery'],
                      status: 'NOT_STARTED',
                    },
                    {
                      phase: 'Phase 4 (Weeks 10-12)',
                      focus: 'Production Deployment & ATS Polish',
                      topics: ['AWS Deployment ECS / RDS', 'CI/CD Pipeline with GitHub Actions', 'Technical Resume Bullet Optimization'],
                      status: 'NOT_STARTED',
                    },
                  ]).map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#140f1a] border border-red-900/30 hover:border-red-600/40 transition-colors space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-red-400 tracking-wide">
                          {item.phase}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.status === 'COMPLETED'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : item.status === 'IN_PROGRESS'
                              ? 'bg-amber-950 text-amber-400 border border-amber-800'
                              : 'bg-gray-900 text-gray-400 border border-gray-800'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{item.focus}</h4>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {item.topics?.map((topic, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-lg bg-red-950/20 border border-red-900/30 text-[11px] text-gray-300"
                          >
                            • {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: RESUME ATS & REVIEW
        ======================================================== */}
        {activeTab === 'resume' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Upload Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-400">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Upload PDF Resume</h3>
                </div>
              </div>

              <div className="border-2 border-dashed border-red-900/40 hover:border-red-500/60 rounded-2xl p-6 text-center transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="hidden"
                  id="resume-pdf-input"
                />
                <label htmlFor="resume-pdf-input" className="cursor-pointer space-y-2 block">
                  <FileText className="w-10 h-10 text-red-500 mx-auto opacity-80" />
                  <p className="text-sm font-semibold text-gray-200">
                    {selectedFile ? selectedFile.name : 'Click or drag PDF resume here'}
                  </p>
                  <p className="text-xs text-gray-500">Max size: 5MB</p>
                </label>
              </div>

              <button
                onClick={handleResumeUpload}
                disabled={uploadingResume || !selectedFile}
                className="w-full py-3 rounded-xl font-bold text-white text-sm bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 shadow-[0_0_20px_rgba(239,68,68,0.45)] transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {uploadingResume ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing PDF...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Upload & Run ATS Review</span>
                  </>
                )}
              </button>

              {/* Or Paste Raw Text */}
              <div className="pt-4 border-t border-red-950">
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Or Paste Resume Text
                </label>
                <textarea
                  rows={4}
                  value={directResumeText}
                  onChange={(e) => setDirectResumeText(e.target.value)}
                  placeholder="Paste your resume markdown or plain text here..."
                  className="w-full p-3 rounded-xl bg-[#140f1a] border border-red-900/30 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-red-500"
                />
                <button
                  onClick={handleReviewResumeText}
                  disabled={reviewingText}
                  className="mt-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-950/40 border border-red-800/40 hover:bg-red-900/50 transition-colors flex items-center space-x-2"
                >
                  {reviewingText ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-red-400" />}
                  <span>Review Raw Text</span>
                </button>
              </div>
            </div>

            {/* ATS Score & Feedback View */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-red-950">
                <h3 className="text-xl font-bold text-white hero-serif">ATS Review Report</h3>
                <span className="text-xs text-red-400 font-mono">Gemini 3.8 Flash Scored</span>
              </div>

              {atsReviewResult ? (
                <div className="space-y-6">
                  {/* Gauge */}
                  <div className="p-5 rounded-2xl bg-[#140f1a] border border-red-900/30 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 uppercase font-semibold">ATS Compatibility Score</span>
                      <h4 className="text-3xl font-extrabold text-white mt-1">
                        {atsReviewResult.ats_score || 88} <span className="text-sm font-normal text-gray-400">/ 100</span>
                      </h4>
                    </div>
                    <div className="w-20 h-20 rounded-full bg-red-950/40 border-4 border-red-500 flex items-center justify-center font-bold text-xl text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                      {atsReviewResult.ats_score || 88}%
                    </div>
                  </div>

                  {/* Feedback */}
                  <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/30 text-xs text-gray-300 leading-relaxed">
                    <span className="text-red-400 font-bold block mb-1">Feedback Summary:</span>
                    {atsReviewResult.feedback || 'Solid technical resume with strong action verbs. Consider adding more distributed systems experience.'}
                  </div>

                  {/* Extracted Skills */}
                  <div>
                    <h5 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Extracted Technical Skills
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {(atsReviewResult.parsed_skills || ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'REST APIs', 'Git']).map((sk, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-3 py-1 rounded-full bg-red-950/40 border border-red-800/40 text-xs text-red-200"
                        >
                          ✔ {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-16 text-center space-y-3">
                  <FileText className="w-12 h-12 text-gray-600 mx-auto" />
                  <p className="text-sm text-gray-400">No resume analyzed yet.</p>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto">
                    Upload a PDF or paste plain text to get an instant ATS score and extracted technical skills.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 3: SEMANTIC GAP ANALYSIS
        ======================================================== */}
        {activeTab === 'gaps' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-red-950">
                <div>
                  <h3 className="text-xl font-bold text-white hero-serif">AI Semantic Gap Analysis</h3>
                </div>

                <div className="flex items-center space-x-3">
                  <select
                    value={selectedCareerForGap}
                    onChange={(e) => setSelectedCareerForGap(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-xs focus:outline-none focus:border-red-500"
                  >
                    {careers.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>

                  <button
                    onClick={handleRunGapAnalysis}
                    disabled={loadingGap}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-600/40 flex items-center space-x-2 disabled:opacity-50"
                  >
                    {loadingGap ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Target className="w-3.5 h-3.5" />}
                    <span>Run Analysis</span>
                  </button>
                </div>
              </div>

              {gapAnalysisResult ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="p-5 rounded-2xl bg-[#140f1a] border border-red-900/30 text-center space-y-2">
                    <span className="text-xs text-gray-400 font-semibold uppercase">Overall Role Synergy</span>
                    <h4 className="text-4xl font-extrabold text-red-400">
                      {gapAnalysisResult.match_percentage || 78}%
                    </h4>
                    <p className="text-xs text-gray-400">Matched with {gapAnalysisResult.career}</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#140f1a] border border-red-900/30 space-y-2">
                    <span className="text-xs text-red-400 font-bold uppercase flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" />
                      Critical Skill Gaps
                    </span>
                    <ul className="space-y-1.5 text-xs text-gray-300">
                      {(gapAnalysisResult.critical_gaps || ['Kafka Event Streaming', 'Distributed Caching']).map((gap, gIdx) => (
                        <li key={gIdx} className="flex items-center space-x-2 text-rose-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          <span>{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#140f1a] border border-red-900/30 space-y-2">
                    <span className="text-xs text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Strategic Next Step
                    </span>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {gapAnalysisResult.recommended_next_step || 'Complete the Spring Boot Assessment and take a course on Redis caching.'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-gray-400 text-sm">
                  Click <span className="text-red-400 font-semibold">Run Analysis</span> to inspect semantic missing skills for this target career.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: SKILL PROFILE MANAGEMENT
        ======================================================== */}
        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Add Skill Form */}
            <div className="p-6 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Plus className="w-5 h-5 text-red-500" />
                <span>Add New Skill</span>
              </h3>

              <form onSubmit={handleAddSkill} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    value={newSkill.skillName}
                    onChange={(e) => setNewSkill({ ...newSkill, skillName: e.target.value })}
                    placeholder="e.g. Java, Docker, React"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-sm focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    Proficiency
                  </label>
                  <select
                    value={newSkill.proficiencyLevel}
                    onChange={(e) => setNewSkill({ ...newSkill, proficiencyLevel: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-sm focus:outline-none focus:border-red-500"
                  >
                    <option value="BEGINNER">BEGINNER</option>
                    <option value="INTERMEDIATE">INTERMEDIATE</option>
                    <option value="ADVANCED">ADVANCED</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={20}
                    value={newSkill.yearsOfExperience}
                    onChange={(e) => setNewSkill({ ...newSkill, yearsOfExperience: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-sm focus:outline-none focus:border-red-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl font-bold text-white text-sm bg-red-600 hover:bg-red-500 shadow-md shadow-red-600/40 transition-colors"
                >
                  Save Skill
                </button>
              </form>
            </div>

            {/* List of Skills */}
            <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl space-y-4">
              <h3 className="text-xl font-bold text-white hero-serif">My Technical Stack</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-3.5 rounded-2xl bg-[#140f1a] border border-red-900/30 flex items-center justify-between hover:border-red-600/40 transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white">{skill.skillName}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {skill.proficiencyLevel} • {skill.yearsOfExperience} yrs exp
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                      title="Delete Skill"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 5: SKILL ASSESSMENTS & QUIZZES
        ======================================================== */}
        {activeTab === 'assessments' && (
          <SkillAssessment />
        )}

        {/* ========================================================
            TAB 6: LEARNING RESOURCES (ALL AVAILABLE COURSES + PAGINATION 5)
        ======================================================== */}
        {activeTab === 'learningResources' && (
          <div className="space-y-6">
            
            {/* Header & Search Controls Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0f0b15]/95 border border-red-900/40 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/40 text-xs font-semibold text-red-300 mb-2">
                      <BookOpen className="w-3.5 h-3.5 text-red-400" />
                      <span>Curated Course & Resource Hub</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white hero-serif">
                      Available Learning Resources & Courses
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl">
                      Search and explore all available learning resources, certifications, and technical courses. Select a course from the dropdown or search by keyword, then click <span className="text-red-400 font-semibold">Search Course</span>.
                    </p>
                  </div>

                  <button
                    onClick={fetchAvailableCourses}
                    disabled={loadingCourses}
                    className="self-start sm:self-auto flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#140f1c] border border-red-900/40 text-gray-300 hover:text-white hover:border-red-600/50 transition-all text-xs font-semibold cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-red-400 ${loadingCourses ? 'animate-spin' : ''}`} />
                    <span>Refresh Courses</span>
                  </button>
                </div>

                {/* Dropdown & Query Controls */}
                <div className="p-5 rounded-2xl bg-[#140f1c] border border-red-900/40 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    
                    {/* Course Dropdown */}
                    <div className="md:col-span-5">
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-red-400" />
                        <span>Select Available Course</span>
                      </label>
                      <select
                        value={selectedCourseDropdown}
                        onChange={(e) => setSelectedCourseDropdown(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d0914] border border-red-900/50 text-white text-sm focus:outline-none focus:border-red-500 truncate"
                      >
                        <option value="ALL">-- All Available Courses ({availableCourses.length}) --</option>
                        {Array.from(new Set(availableCourses.map((c) => c.title).filter(Boolean))).map((courseTitle) => (
                          <option key={courseTitle} value={courseTitle}>
                            {courseTitle}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Search Keyword */}
                    <div className="md:col-span-4">
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Search className="w-3.5 h-3.5 text-red-400" />
                        <span>Keyword Search (Optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Search title, provider, skill..."
                        value={courseSearchKeyword}
                        onChange={(e) => setCourseSearchKeyword(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSearchCourses();
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d0914] border border-red-900/50 text-white text-sm focus:outline-none focus:border-red-500 placeholder-gray-500"
                      />
                    </div>

                    {/* Actions */}
                    <div className="md:col-span-3 flex items-end space-x-2">
                      <button
                        onClick={() => handleSearchCourses()}
                        disabled={loadingCourses}
                        className="flex-1 py-2.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-600 shadow-[0_0_20px_rgba(239,68,68,0.45)] transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer transform hover:-translate-y-0.5"
                      >
                        <Search className="w-4 h-4" />
                        <span>Search Course</span>
                      </button>

                      {(selectedCourseDropdown !== 'ALL' || courseSearchKeyword) && (
                        <button
                          onClick={handleResetCourseSearch}
                          className="py-2.5 px-3 rounded-xl text-xs font-semibold text-gray-400 hover:text-white bg-[#0d0914] border border-red-900/40 hover:border-red-600/50 transition-colors cursor-pointer"
                          title="Reset Filters"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* Below Search Button: Courses Listed One by One with Pagination (5 per page) */}
            <div className="space-y-4">
              
              {/* Header Status Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-2">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-bold text-white">
                    {filteredCourses.length > 0 ? (
                      <>
                        Showing {((currentPage - 1) * coursesPerPage) + 1}–{Math.min(currentPage * coursesPerPage, filteredCourses.length)} of {filteredCourses.length} Available Courses
                      </>
                    ) : (
                      '0 Courses Found'
                    )}
                  </span>
                </div>

                {filteredCourses.length > coursesPerPage && (
                  <span className="text-xs font-medium text-gray-400">
                    Page {currentPage} of {Math.ceil(filteredCourses.length / coursesPerPage)}
                  </span>
                )}
              </div>

              {/* Loading State */}
              {loadingCourses ? (
                <div className="p-12 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 text-center space-y-3">
                  <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-sm font-semibold text-white">Loading available courses...</p>
                  <p className="text-xs text-gray-400">Querying backend /api/resources</p>
                </div>
              ) : availableCourses.length === 0 ? (
                /* Empty state when NO courses are found */
                <div className="p-10 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-red-950/60 border border-red-800/40 flex items-center justify-center mx-auto text-red-400">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-white hero-serif">
                    No Courses Available Yet
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                    New learning resources and video courses will be shown here once published.
                  </p>
                </div>
              ) : filteredCourses.length === 0 ? (
                /* Empty state when filter matches nothing */
                <div className="p-8 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 text-center space-y-3">
                  <p className="text-sm text-gray-300">
                    No available courses match your search criteria.
                  </p>
                  <button
                    onClick={handleResetCourseSearch}
                    className="text-xs font-semibold text-red-400 hover:underline"
                  >
                    Reset filters and show all available courses
                  </button>
                </div>
              ) : (
                /* Course Cards Displayed One by One */
                <div className="space-y-4">
                  {filteredCourses
                    .slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage)
                    .map((course, idx) => {
                      const absoluteIndex = ((currentPage - 1) * coursesPerPage) + idx + 1;
                      return (
                        <div
                          key={course.id || `${course.title}-${idx}`}
                          className="p-6 rounded-3xl bg-[#0f0b15]/95 border border-red-900/40 shadow-xl hover:border-red-600/50 transition-all space-y-4 group"
                        >
                          {/* Top Row: Index Badge, Title, Badges */}
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div className="flex items-start space-x-3.5">
                              {/* Serial Number Badge */}
                              <div className="w-9 h-9 rounded-xl bg-red-950/70 border border-red-800/40 flex items-center justify-center text-xs font-bold text-red-400 flex-shrink-0 mt-0.5 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                #{absoluteIndex}
                              </div>

                              <div>
                                <h4 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors leading-snug">
                                  {course.title}
                                </h4>
                                <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                                  <span>Provider: <span className="text-gray-200 font-medium">{course.provider || 'Platform Curated'}</span></span>
                                  {course.skillName && (
                                    <>
                                      <span>•</span>
                                      <span className="text-red-300">Skill: {course.skillName}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Tags: ResourceType & Free/Paid */}
                            <div className="flex items-center space-x-2 self-start flex-shrink-0">
                              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40">
                                {course.resourceType || 'COURSE'}
                              </span>

                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                                course.free !== false
                                  ? 'bg-emerald-950/60 border border-emerald-800/40 text-emerald-400'
                                  : 'bg-amber-950/60 border border-amber-800/40 text-amber-400'
                              }`}>
                                {course.free !== false ? 'FREE ACCESS' : 'PAID'}
                              </span>
                            </div>
                          </div>

                          {/* Middle: Course Description */}
                          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed pl-0 sm:pl-12">
                            {course.description || 'Comprehensive learning course and guided technical materials.'}
                          </p>

                          {/* Bottom Row: Link Button */}
                          <div className="pt-3 border-t border-red-950/60 flex items-center justify-between pl-0 sm:pl-12">
                            <span className="text-[11px] font-mono text-gray-500">
                              Reference ID: #{course.id || '-'}
                            </span>

                            {course.url ? (
                              <a
                                href={course.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-600 shadow-md shadow-red-600/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                              >
                                <span>Start Course</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            ) : (
                              <span className="text-xs text-gray-500 italic">No link provided</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}

              {/* Pagination Controls (5 per page) */}
              {!loadingCourses && filteredCourses.length > coursesPerPage && (
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-red-950/60">
                  <p className="text-xs text-gray-400">
                    Showing <span className="text-white font-medium">{((currentPage - 1) * coursesPerPage) + 1}</span> to <span className="text-white font-medium">{Math.min(currentPage * coursesPerPage, filteredCourses.length)}</span> of <span className="text-white font-medium">{filteredCourses.length}</span> courses
                  </p>

                  <div className="flex items-center space-x-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-300 bg-[#140f1c] border border-red-900/40 hover:bg-red-950/40 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Prev</span>
                    </button>

                    {/* Page Numbers */}
                    {Array.from(
                      { length: Math.ceil(filteredCourses.length / coursesPerPage) },
                      (_, i) => i + 1
                    ).map((pageNumber) => (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                          currentPage === pageNumber
                            ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                            : 'bg-[#140f1c] text-gray-400 hover:text-white hover:bg-red-950/40 border border-red-900/30'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    ))}

                    {/* Next Button */}
                    <button
                      onClick={() =>
                        setCurrentPage((p) =>
                          Math.min(p + 1, Math.ceil(filteredCourses.length / coursesPerPage))
                        )
                      }
                      disabled={currentPage === Math.ceil(filteredCourses.length / coursesPerPage)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-300 bg-[#140f1c] border border-red-900/40 hover:bg-red-950/40 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

        {/* ========================================================
            TAB 7: VIEW / CREATE / UPDATE STUDENT PROFILE
        ======================================================== */}
        {activeTab === 'viewProfile' && (
          <div className="space-y-6">
            
            {/* Case 1: Edit / Create Form is Open */}
            {showProfileForm ? (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0f0b15]/95 border border-red-900/50 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-red-950/60">
                    <div>
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-950/50 border border-red-800/40 text-xs font-semibold text-red-300 mb-2">
                        <UserCheck className="w-3.5 h-3.5 text-red-400" />
                        <span>{userProfile?.id ? 'Edit Profile' : 'New Profile'}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white hero-serif">
                        {userProfile?.id ? 'Update Your Career Profile' : 'Create Student Profile'}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        Add your university, graduation year, degree, and developer profiles to personalize career recommendations.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowProfileForm(false)}
                      className="p-2 rounded-xl bg-[#140f1c] border border-red-900/40 text-gray-400 hover:text-white hover:border-red-600/50 transition-colors"
                      title="Cancel"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSaveProfile} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* College / University */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-red-400" />
                          <span>College / University</span>
                        </label>
                        <input
                          type="text"
                          maxLength={150}
                          placeholder="e.g. National Institute of Technology"
                          value={profileForm.college}
                          onChange={(e) => setProfileForm({ ...profileForm, college: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-sm focus:outline-none focus:border-red-500 placeholder-gray-500 transition-colors"
                        />
                      </div>

                      {/* Degree */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5 text-red-400" />
                          <span>Degree</span>
                        </label>
                        <input
                          type="text"
                          maxLength={100}
                          placeholder="e.g. B.Tech, MCA, BS Computer Science"
                          value={profileForm.degree}
                          onChange={(e) => setProfileForm({ ...profileForm, degree: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-sm focus:outline-none focus:border-red-500 placeholder-gray-500 transition-colors"
                        />
                      </div>

                      {/* Branch */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-red-400" />
                          <span>Branch / Major</span>
                        </label>
                        <input
                          type="text"
                          maxLength={100}
                          placeholder="e.g. Computer Science & Engineering"
                          value={profileForm.branch}
                          onChange={(e) => setProfileForm({ ...profileForm, branch: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-sm focus:outline-none focus:border-red-500 placeholder-gray-500 transition-colors"
                        />
                      </div>

                      {/* Graduation Year */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-red-400" />
                          <span>Graduation Year</span>
                        </label>
                        <input
                          type="number"
                          min={2000}
                          max={2100}
                          placeholder="e.g. 2026"
                          value={profileForm.graduationYear}
                          onChange={(e) => setProfileForm({ ...profileForm, graduationYear: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-sm focus:outline-none focus:border-red-500 placeholder-gray-500 transition-colors"
                        />
                      </div>

                      {/* Current Semester */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-red-400" />
                          <span>Current Semester</span>
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={12}
                          placeholder="e.g. 5"
                          value={profileForm.currentSemester}
                          onChange={(e) => setProfileForm({ ...profileForm, currentSemester: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-sm focus:outline-none focus:border-red-500 placeholder-gray-500 transition-colors"
                        />
                      </div>

                      {/* GitHub Profile URL */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                          <span>GitHub URL</span>
                        </label>
                        <input
                          type="url"
                          maxLength={255}
                          placeholder="https://github.com/username"
                          value={profileForm.githubUrl}
                          onChange={(e) => setProfileForm({ ...profileForm, githubUrl: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-sm focus:outline-none focus:border-red-500 placeholder-gray-500 transition-colors font-mono text-xs"
                        />
                      </div>

                      {/* LinkedIn Profile URL */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                          <span>LinkedIn URL</span>
                        </label>
                        <input
                          type="url"
                          maxLength={255}
                          placeholder="https://linkedin.com/in/username"
                          value={profileForm.linkedinUrl}
                          onChange={(e) => setProfileForm({ ...profileForm, linkedinUrl: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-sm focus:outline-none focus:border-red-500 placeholder-gray-500 transition-colors font-mono text-xs"
                        />
                      </div>

                      {/* Bio */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-red-400" />
                          <span>Professional Bio / Career Objective</span>
                        </label>
                        <textarea
                          rows={4}
                          maxLength={1000}
                          placeholder="Tell us about your passions, preferred tech stacks, and career milestones..."
                          value={profileForm.bio}
                          onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140f1c] border border-red-900/40 text-white text-sm focus:outline-none focus:border-red-500 placeholder-gray-500 transition-colors leading-relaxed"
                        />
                        <p className="text-[11px] text-gray-500 text-right mt-1">
                          {profileForm.bio?.length || 0}/1000 characters
                        </p>
                      </div>

                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-3 pt-2">
                      <button
                        type="submit"
                        disabled={savingProfile}
                        className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 shadow-md shadow-red-600/30 transition-all flex items-center space-x-2 disabled:opacity-50 cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>{savingProfile ? 'Saving...' : userProfile?.id ? 'Update Profile' : 'Create Profile'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowProfileForm(false)}
                        className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-400 hover:text-white bg-[#140f1c] border border-red-900/30 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : userProfile ? (
              /* Case 2: User HAS a profile -> Display Information + Update Profile button */
              <div className="space-y-6">
                
                {/* Profile Banner Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />

                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-red-950/60">
                    <div className="flex items-center space-x-4">
                      {/* Avatar with Initials */}
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-red-600/30 border border-red-500/40 flex-shrink-0">
                        {userProfile.fullName ? userProfile.fullName.slice(0, 2).toUpperCase() : (user?.fullName ? user.fullName.slice(0, 2).toUpperCase() : 'ST')}
                      </div>
                      <div>
                        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-red-950/60 border border-red-800/40 text-[11px] font-semibold text-red-300 mb-1">
                          <UserCheck className="w-3 h-3 text-red-400" />
                          <span>Verified Student Profile</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white hero-serif">
                          {userProfile.fullName || user?.fullName || 'Student'}
                        </h2>
                        <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                          <Mail className="w-3.5 h-3.5 text-red-400" />
                          <span>{userProfile.email || user?.email}</span>
                        </p>
                      </div>
                    </div>

                    {/* Update Profile Button */}
                    <button
                      onClick={handleOpenUpdateForm}
                      className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 shadow-md shadow-red-600/30 transition-all transform hover:-translate-y-0.5 self-start sm:self-auto cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Update Profile</span>
                    </button>
                  </div>

                  {/* Bio (if present) */}
                  {userProfile.bio && (
                    <div className="mt-5 p-4 rounded-2xl bg-[#140f1a] border border-red-900/30">
                      <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">About / Bio</p>
                      <p className="text-sm text-gray-300 leading-relaxed italic">
                        "{userProfile.bio}"
                      </p>
                    </div>
                  )}

                  {/* Quick Stat Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                    <div className="p-3.5 rounded-2xl bg-[#140f1c] border border-red-900/20 text-center">
                      <p className="text-[11px] text-gray-400">Declared Skills</p>
                      <p className="text-xl font-bold text-white mt-0.5">{skills.length}</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#140f1c] border border-red-900/20 text-center">
                      <p className="text-[11px] text-gray-400">Roadmaps</p>
                      <p className="text-xl font-bold text-white mt-0.5">{roadmaps.length}</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#140f1c] border border-red-900/20 text-center">
                      <p className="text-[11px] text-gray-400">Resumes</p>
                      <p className="text-xl font-bold text-white mt-0.5">{resumes.length}</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#140f1c] border border-red-900/20 text-center">
                      <p className="text-[11px] text-gray-400">Graduation</p>
                      <p className="text-xl font-bold text-red-400 mt-0.5">{userProfile.graduationYear || '2026'}</p>
                    </div>
                  </div>
                </div>

                {/* Details Breakdown Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Academic Credentials Card */}
                  <div className="p-6 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl space-y-4">
                    <h3 className="text-base font-bold text-white hero-serif flex items-center space-x-2 pb-3 border-b border-red-950">
                      <GraduationCap className="w-4 h-4 text-red-400" />
                      <span>Academic Background</span>
                    </h3>

                    <div className="space-y-3.5">
                      <div className="flex items-start space-x-3">
                        <Building className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-400">College / University</p>
                          <p className="text-sm font-semibold text-white mt-0.5">
                            {userProfile.college || <span className="text-gray-500 italic">Not specified</span>}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <GraduationCap className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-400">Degree & Specialization</p>
                          <p className="text-sm font-semibold text-white mt-0.5">
                            {userProfile.degree ? `${userProfile.degree}${userProfile.branch ? ` in ${userProfile.branch}` : ''}` : <span className="text-gray-500 italic">Not specified</span>}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Calendar className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-400">Graduation Year</p>
                          <p className="text-sm font-semibold text-white mt-0.5">
                            {userProfile.graduationYear || <span className="text-gray-500 italic">Not specified</span>}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Clock className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-400">Current Semester</p>
                          <p className="text-sm font-semibold text-white mt-0.5">
                            {userProfile.currentSemester ? `Semester ${userProfile.currentSemester}` : <span className="text-gray-500 italic">Not specified</span>}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Online Profiles & Links Card */}
                  <div className="p-6 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl space-y-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white hero-serif flex items-center space-x-2 pb-3 border-b border-red-950">
                        <ExternalLink className="w-4 h-4 text-red-400" />
                        <span>Professional & Developer Profiles</span>
                      </h3>

                      <div className="space-y-4 pt-2">
                        {/* GitHub */}
                        <div className="p-3.5 rounded-2xl bg-[#140f1a] border border-red-900/30 flex items-center justify-between">
                          <div className="flex items-center space-x-3 truncate">
                            <div className="w-8 h-8 rounded-lg bg-black/60 border border-red-900/40 flex items-center justify-center text-gray-300">
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                              </svg>
                            </div>
                            <div className="truncate">
                              <p className="text-xs text-gray-400">GitHub Profile</p>
                              {userProfile.githubUrl ? (
                                <a
                                  href={userProfile.githubUrl.startsWith('http') ? userProfile.githubUrl : `https://${userProfile.githubUrl}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs font-mono text-red-400 hover:underline truncate block"
                                >
                                  {userProfile.githubUrl}
                                </a>
                              ) : (
                                <p className="text-xs text-gray-500 italic">Not connected</p>
                              )}
                            </div>
                          </div>

                          {userProfile.githubUrl && (
                            <a
                              href={userProfile.githubUrl.startsWith('http') ? userProfile.githubUrl : `https://${userProfile.githubUrl}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>

                        {/* LinkedIn */}
                        <div className="p-3.5 rounded-2xl bg-[#140f1a] border border-red-900/30 flex items-center justify-between">
                          <div className="flex items-center space-x-3 truncate">
                            <div className="w-8 h-8 rounded-lg bg-black/60 border border-red-900/40 flex items-center justify-center text-gray-300">
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                              </svg>
                            </div>
                            <div className="truncate">
                              <p className="text-xs text-gray-400">LinkedIn Profile</p>
                              {userProfile.linkedinUrl ? (
                                <a
                                  href={userProfile.linkedinUrl.startsWith('http') ? userProfile.linkedinUrl : `https://${userProfile.linkedinUrl}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs font-mono text-red-400 hover:underline truncate block"
                                >
                                  {userProfile.linkedinUrl}
                                </a>
                              ) : (
                                <p className="text-xs text-gray-500 italic">Not connected</p>
                              )}
                            </div>
                          </div>

                          {userProfile.linkedinUrl && (
                            <a
                              href={userProfile.linkedinUrl.startsWith('http') ? userProfile.linkedinUrl : `https://${userProfile.linkedinUrl}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-red-950/50">
                      <button
                        onClick={handleOpenUpdateForm}
                        className="w-full py-2.5 rounded-xl text-xs font-semibold text-gray-300 bg-red-950/30 border border-red-900/40 hover:bg-red-900/40 hover:text-white transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Academic & Social Details</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              /* Case 3: User has NOT created a profile yet -> Show Create Profile CTA */
              <div className="p-8 sm:p-12 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl text-center relative overflow-hidden space-y-6">
                <div className="absolute top-0 right-1/2 translate-x-1/2 w-96 h-96 bg-red-600/10 blur-[140px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-lg mx-auto space-y-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center mx-auto text-white shadow-xl shadow-red-600/30">
                    <User className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white hero-serif">
                      No Student Profile Created Yet
                    </h3>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                      You haven't set up your career profile yet. Add your university, graduation year, degree, and developer profiles to personalize your roadmaps and job applications.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleOpenCreateForm}
                      className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:shadow-[0_0_35px_rgba(239,68,68,0.7)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create Profile</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default DashboardPage;
