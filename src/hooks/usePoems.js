import { useState, useEffect, useCallback } from 'react';
import poemService from '../services/poems';
import { useToast } from '../hooks/useToast'; // ✅ Correct


export const usePoems = () => {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 1,
    hasNext: false,
    hasPrev: false,
  });

  const toast = useToast();

  // Fetch poems with pagination
  const fetchPoems = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const response = await poemService.getPoems(page, limit);
      setPoems(response.poems || []);
      setPagination(response.pagination || {});
    } catch (err) {
      const message = err.message || 'Failed to fetch poems';
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Create poem
  const createPoem = async (poemData) => {
    try {
      const response = await poemService.createPoem(poemData);
      toast.success('Poem created successfully ✨');
      await fetchPoems(); // refresh
      return response;
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  // Update poem
  const updatePoem = async (id, poemData) => {
    try {
      const response = await poemService.updatePoem(id, poemData);
      toast.success('Poem updated successfully 📝');
      await fetchPoems(); // refresh
      return response;
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  // Delete poem (optimistic)
  const deletePoem = async (id) => {
    try {
      await poemService.deletePoem(id);
      setPoems(prev => prev.filter(poem => poem._id !== id));
      toast.success('Poem deleted successfully 🗑️');
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  // Get single poem
  const getPoem = async (id) => {
    try {
      const response = await poemService.getPoem(id);
      return response.poem || response;
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  // Unlock a public poem
  const unlockPoem = async (id, passcode, viewerName) => {
    try {
      return await poemService.unlockPoem(id, passcode, viewerName);
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  // Submit feedback
  const submitFeedback = async (feedbackData) => {
    try {
      const response = await poemService.submitFeedback(feedbackData);
      toast.success('Feedback submitted successfully 💌');
      return response;
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  // On mount
  useEffect(() => {
    fetchPoems();
  }, [fetchPoems]);

  return {
    poems,
    loading,
    error,
    pagination,
    fetchPoems,
    createPoem,
    updatePoem,
    deletePoem,
    getPoem,
    unlockPoem,
    submitFeedback,
  };
};
