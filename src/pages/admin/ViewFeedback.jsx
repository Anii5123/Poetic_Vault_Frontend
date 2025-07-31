import React, { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import poemService from '../../services/poems';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { formatDate } from '../../utils/helpers';

const ViewFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const res = await poemService.getFeedback();
      setFeedback(res.feedback);
    } catch (e) {
      console.error('Failed to fetch feedback:', e);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await poemService.markFeedbackAsRead(id);
      await fetchFeedback();
    } catch (e) {
      console.error('Mark as read failed:', e);
    }
  };

  const deleteFeedback = async (id) => {
    if (!window.confirm('Delete this feedback?')) return;
    try {
      await poemService.deleteFeedback(id);
      await fetchFeedback();
    } catch (e) {
      console.error('Failed to delete feedback:', e);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const renderFeedback = () => {
    if (loading) {
      return <Card>Loading feedback...</Card>;
    }
    if (feedback.length === 0) {
      return <Card>No feedback found.</Card>;
    }

    return (
      <div className="space-y-6">
        {feedback.map((item) => (
          <Card key={item._id}>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{item.viewerName} – {item.liked ? '❤️' : '💭'}</div>
                <div className="text-sm text-gray-500">{formatDate(item.createdAt)}</div>
                <div className="text-poetic-purple font-playfair">{item.poem?.title || ''}</div>
              </div>
              <div>
                {!item.isRead && (
                  <Button variant="secondary" onClick={() => markAsRead(item._id)} size="sm" className="mr-2">
                    Mark as Read
                  </Button>
                )}
                <Button variant="ghost" onClick={() => deleteFeedback(item._id)} size="sm" className="text-red-600">
                  Delete
                </Button>
              </div>
            </div>
            {item.rating && (
              <div className="text-yellow-500 my-2">
                {'⭐'.repeat(item.rating)} ({item.rating}/5)
              </div>
            )}
            {item.message && (
              <div className="mt-3">
                <span className="italic">{item.message}</span>
              </div>
            )}
          </Card>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-3xl font-great-vibes text-poetic-purple mb-6">Poem Feedback</h1>
        {renderFeedback()}
      </div>
    </Layout>
  );
};

export default ViewFeedback;
