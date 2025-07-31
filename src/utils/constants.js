// Poem categories
export const categories = [
  'love',
  'friendship',
  'motivation',
  'nature',
  'other'
];

// API endpoints (relative to base URL)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile'
  },
  POEMS: {
    BASE: '/poems',
    ANALYTICS: '/poems/analytics',
    UNLOCK: (id) => `/poems/unlock/${id}`
  },
  FEEDBACK: {
    BASE: '/feedback',
    STATS: '/feedback/stats',
    MARK_READ: (id) => `/feedback/${id}/read`
  }
};

// Toast types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
};

// Form validation rules
export const VALIDATION_RULES = {
  TITLE: {
    REQUIRED: 'Title is required',
    MIN_LENGTH: 1,
    MAX_LENGTH: 200
  },
  PASSCODE: {
    REQUIRED: 'Passcode is required',
    MIN_LENGTH: 4,
    MIN_LENGTH_MSG: 'Passcode must be at least 4 characters'
  },
  CONTENT: {
    MAX_LENGTH: 10000,
    MAX_LENGTH_MSG: 'Content must not exceed 10000 characters'
  },
  VIEWER_NAME: {
    REQUIRED: 'Name is required',
    MIN_LENGTH: 1,
    MAX_LENGTH: 100
  },
  FEEDBACK: {
    MESSAGE_MAX_LENGTH: 500,
    RATING_MIN: 1,
    RATING_MAX: 5
  }
};

// File upload constraints
export const FILE_CONSTRAINTS = {
  PDF: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ACCEPTED_TYPES: ['application/pdf'],
    ERROR_MESSAGES: {
      SIZE: 'File size must not exceed 10MB',
      TYPE: 'Only PDF files are allowed'
    }
  }
};

// Default values
export const DEFAULTS = {
  AUTHOR: 'Anonymous',
  CATEGORY: 'other',
  PAGINATION: {
    PAGE: 1,
    LIMIT: 10
  }
};

// App configuration
export const APP_CONFIG = {
  NAME: 'Poetic Vault',
  DESCRIPTION: 'Unlock personalized poems with a secret passcode',
  VERSION: '1.0.0'
};


export const baseurl =
  // "https://poetic-vault-backend.onrender.com"
  "http://localhost:5000"
