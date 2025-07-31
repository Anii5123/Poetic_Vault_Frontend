import api from './api';

class PoemService {
  // ✅ Create a new poem
  async createPoem(poemData) {
    try {
      const formData = new FormData();
      Object.keys(poemData).forEach((key) => {
        if (poemData[key] !== null && poemData[key] !== undefined) {
          formData.append(key, poemData[key]);
        }
      });

      const response = await api.post('/poems', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create poem');
    }
  }

  // ✅ Fetch all poems with pagination
  async getPoems(page = 1, limit = 10) {
    try {
      const response = await api.get(`/poems?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch poems');
    }
  }

  // ✅ Get a single poem by ID
  async getPoem(id) {
    try {
      const response = await api.get(`/poems/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch poem');
    }
  }

  // ✅ Update poem by ID
  async updatePoem(id, poemData) {
    try {
      const formData = new FormData();
      Object.keys(poemData).forEach((key) => {
        if (poemData[key] !== null && poemData[key] !== undefined) {
          formData.append(key, poemData[key]);
        }
      });

      const response = await api.put(`/poems/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update poem');
    }
  }

  // ✅ Delete poem
  async deletePoem(id) {
    try {
      const response = await api.delete(`/poems/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete poem');
    }
  }

  // ✅ Unlock a poem with passcode (public)
  async unlockPoem(id, passcode, viewerName) {
    try {
      const response = await api.post(`/poems/unlock/${id}`, {
        passcode,
        viewerName,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to unlock poem');
    }
  }

  // ✅ Get analytics (admin)
  async getAnalytics() {
    try {
      const response = await api.get('/poems/analytics');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch analytics');
    }
  }

  // ✅ Submit feedback (public)
  async submitFeedback(feedbackData) {
    try {
      const response = await api.post('/feedback', feedbackData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to submit feedback');
    }
  }

  // ✅ Get feedback (admin)
  async getFeedback(page = 1, limit = 10, poemId = null) {
    try {
      let url = `/feedback?page=${page}&limit=${limit}`;
      if (poemId) {
        url += `&poemId=${poemId}`;
      }
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch feedback');
    }
  }

  // ✅ Get feedback stats (admin)
  async getFeedbackStats() {
    try {
      const response = await api.get('/feedback/stats');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch feedback stats');
    }
  }

  // ✅ Mark feedback as read (admin)
  async markFeedbackAsRead(id) {
    try {
      const response = await api.patch(`/feedback/${id}/read`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to mark feedback as read');
    }
  }

  // ✅ Delete feedback (admin)
  async deleteFeedback(id) {
    try {
      const response = await api.delete(`/feedback/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete feedback');
    }
  }
}

export default new PoemService();
