import axios from 'axios';

// ✅ Set base URL from .env or fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ✅ Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Request Interceptor: Attach Auth Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor: Handle 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');   // or 'admin' if you're managing both

      // Optional: redirect only if not already on login page
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }

    // Optionally log or toast other errors
    // console.error(error);

    return Promise.reject(error);
  }
);

export default api;
