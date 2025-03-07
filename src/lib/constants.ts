// Application constants

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  SETTINGS: '/settings',
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
  THEME: 'theme',
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USER: {
    PROFILE: '/user/profile',
    SETTINGS: '/user/settings',
  },
  DASHBOARD: {
    STATS: '/dashboard/stats',
    ACTIVITY: '/dashboard/activity',
  },
};

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'Ce champ est requis',
  EMAIL_INVALID: 'Adresse email invalide',
  PASSWORD_MIN_LENGTH: 'Le mot de passe doit contenir au moins 8 caractères',
  PASSWORD_MISMATCH: 'Les mots de passe ne correspondent pas',
};

// API URL
export const API_URL = import.meta.env.VITE_API_URL;

// Debug flag
export const DEBUG = import.meta.env.DEBUG === 'true';
