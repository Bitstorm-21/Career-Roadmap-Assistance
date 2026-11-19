import axios from 'axios';

// Fetch API base URLs from .env file
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:10000';
export const AI_SERVICE_URL = import.meta.env.VITE_AI_SERVICE_URL || 'http://localhost:8000';

// Spring Boot Backend Axios Instance
export const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token from localStorage to every outgoing backend request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('career_jwt') || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Python FastAPI AI Service Instance
export const aiApi = axios.create({
  baseURL: AI_SERVICE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authentication APIs
export const authApi = {
  register: (data) => api.post('/api/auth/register', data), // { fullName, email, password }
  login: (data) => api.post('/api/auth/login', data),       // { email, password }
  logout: () => api.post('/api/auth/logout'),
  getMe: () => api.get('/api/auth/me'),
};

// Profile APIs
export const profileApi = {
  getProfile: () => api.get('/api/profile/me'),
  saveProfile: (data) => api.post('/api/profile/me', data),
  updateProfile: (data) => api.put('/api/profile/me', data),
};

// Student Skills APIs
export const skillsApi = {
  getSkills: () => api.get('/api/skills/me'),
  addSkill: (data) => api.post('/api/skills/me', data), // { skillName, proficiencyLevel, yearsOfExperience }
  updateSkill: (id, data) => api.put(`/api/skills/me/${id}`, data),
  deleteSkill: (id) => api.delete(`/api/skills/me/${id}`),
};

// Resume Management & ATS APIs
export const resumeApi = {
  getAll: () => api.get('/api/resumes'),
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/api/resumes/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  analyze: (resumeId) => api.post(`/api/resumes/${resumeId}/analyze`),
  review: (resumeId, targetCareer = '') =>
    api.post(`/api/resumes/${resumeId}/review${targetCareer ? `?targetCareer=${encodeURIComponent(targetCareer)}` : ''}`),
  reviewText: (data) => api.post('/api/resumes/review-text', data), // { resume_text, target_career }
  skillAnalysis: (resumeId, targetCareer = '') =>
    api.post(`/api/resumes/${resumeId}/skill-analysis${targetCareer ? `?targetCareer=${encodeURIComponent(targetCareer)}` : ''}`),
};

// Careers & Recommendations APIs
export const careerApi = {
  getAll: () => api.get('/api/careers'),
  getById: (id) => api.get(`/api/careers/${id}`),
  getRecommended: () => api.get('/api/recommendations/careers'),
  getSkillGaps: (careerId) => api.get(`/api/recommendations/careers/${careerId}/skill-gaps`),
  getSemanticAnalysis: (careerId) => api.get(`/api/recommendations/careers/${careerId}/semantic-analysis`),
};

// Roadmaps APIs
export const roadmapApi = {
  getAll: () => api.get('/api/roadmaps'),
  getById: (id) => api.get(`/api/roadmaps/${id}`),
  create: (data) => api.post('/api/roadmaps', data), // { careerId, title }
  updateItemStatus: (roadmapId, itemId, status) =>
    api.patch(`/api/roadmaps/${roadmapId}/items/${itemId}/status`, { status }),
  aiRecommend: (careerId, experienceLevel = 'Beginner', durationWeeks = 12) =>
    api.post(`/api/roadmaps/ai-recommend?careerId=${careerId}&experienceLevel=${experienceLevel}&durationWeeks=${durationWeeks}`),
  aiGenerate: (data) => api.post('/api/roadmaps/ai-generate', data),
};

// Assessments APIs
export const assessmentApi = {
  getAll: () => api.get('/api/assessments'),
  getQuestions: (assessmentId) => api.get(`/api/assessments/${assessmentId}/questions`),
  startAttempt: (assessmentId) => api.post(`/api/assessments/${assessmentId}/attempts`),
  submitAttempt: (attemptId, answers) =>
    api.post(`/api/assessments/attempts/${attemptId}/submit`, { answers }),
  getAttemptResult: (attemptId) => api.get(`/api/assessments/attempts/${attemptId}/result`),
  getMyAttempts: () => api.get('/api/assessments/my-attempts'),
};

// Resources & Progress
export const resourceApi = {
  getAll: () => api.get('/api/resources'),
};

export const progressApi = {
  getSummary: () => api.get('/api/progress/summary'),
  getRoadmapProgress: (roadmapId) => api.get(`/api/progress/roadmaps/${roadmapId}`),
};

// Direct Python FastAPI AI Service APIs
export const aiFastApi = {
  checkHealth: () => aiApi.get('/health'),
  parseResume: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return aiApi.post('/parse-resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  extractSkills: (text) => aiApi.post('/extract-skills', { extracted_text: text }),
  resumeReview: (resumeText, targetCareer) =>
    aiApi.post('/resume-review', { resume_text: resumeText, target_career: targetCareer }),
  roadmapRecommendation: (data) => aiApi.post('/roadmap-recommendation', data),
  skillAnalysis: (data) => aiApi.post('/skill-analysis', data),
};

export default api;
