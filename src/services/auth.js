import api from './api';

class AuthService {
  // ✅ Register new admin
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      const { token, admin } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('admin', JSON.stringify(admin));

      return { token, admin };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  // ✅ Login existing admin
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, admin } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('admin', JSON.stringify(admin));

      return { token, admin };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  // ✅ Logout admin
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    window.location.href = '/admin/login'; // or '/' if redirecting to home
  }

  // ✅ Get admin profile from API
  async getProfile() {
    try {
      const response = await api.get('/auth/profile');
      return response.data.admin;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch profile');
    }
  }

  // ✅ Check if authenticated
  isAuthenticated() {
    return !!this.getToken();
  }

  // ✅ Get auth token from localStorage
  getToken() {
    return localStorage.getItem('token');
  }

  // ✅ Get current admin from localStorage
  getCurrentAdmin() {
    const admin = localStorage.getItem('admin');
    return admin ? JSON.parse(admin) : null;
  }
}

export default new AuthService();
