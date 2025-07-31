// FeedbackForm.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Heart, MessageCircle, Star } from 'lucide-react';
import Button from '../ui/Button';
import Textarea from '../ui/Textarea';
import Card from '../ui/Card';
import { useToast } from '../../context/ToastContext';
import poemService from '../../services/poems';

const FeedbackForm = ({ poem, onSubmit }) => {
  const [liked, setLiked] = useState(null);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitFeedback = async (data) => {
    if (liked === null) {
      toast.error('Please let us know if you liked the poem!');
      return;
    }

    setLoading(true);
    try {
      await poemService.submitFeedback({
        poemId: poem._id,
        viewerName: data.viewerName,
        liked,
        message: data.message,
        rating: rating || undefined,
      });

      toast.success('Thank you for your feedback! 💖');
      reset();
      setLiked(null);
      setRating(0);

      if (onSubmit) onSubmit();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h3 className="text-2xl font-great-vibes text-poetic-purple mb-2">
            Share Your Thoughts
          </h3>
          <p className="text-gray-600 font-playfair">
            Your feedback means the world! ✨
          </p>
        </div>

        <form onSubmit={handleSubmit(submitFeedback)} className="space-y-6">
          <div>
            <label htmlFor="viewerName" className="block text-sm font-medium text-gray-700 font-playfair mb-2">
              Your Name
            </label>
            <input
              id="viewerName"
              {...register('viewerName', {
                required: 'Please enter your name',
                minLength: { value: 1, message: 'Name is required' }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-poetic-purple font-playfair"
              placeholder="Enter your beautiful name..."
            />
            {errors.viewerName && (
              <p className="text-red-600 text-sm mt-1">{errors.viewerName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="liked" className="block text-sm font-medium text-gray-700 font-playfair mb-3">
                Did you like this poem?
            </label>
            <div id="liked" className="flex justify-center space-x-6">...</div>

            <div className="flex justify-center space-x-6">
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setLiked(true)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${liked === true ? 'bg-pink-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-pink-100'}`}
              >
                <Heart className={`w-5 h-5 ${liked === true ? 'fill-current' : ''}`} />
                <span>Love it!</span>
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setLiked(false)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${liked === false ? 'bg-gray-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <MessageCircle className="w-5 h-5" />
                <span>Not quite</span>
              </motion.button>
            </div>
          </div>

          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 font-playfair mb-3">
                Rate this poem (optional)
            </label>
            <div id="rating" className="flex justify-center space-x-1">...</div>

            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRating(star)}
                  className="p-1"
                >
                  <Star className={`w-6 h-6 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                </motion.button>
              ))}
            </div>
          </div>

          <Textarea
            label="Your Message (optional)"
            placeholder="Share your thoughts, feelings, or what this poem meant to you..."
            rows={4}
            {...register('message')}
          />

          <Button type="submit" loading={loading} className="w-full" size="lg">
            Send Feedback 💖
          </Button>
        </form>
      </motion.div>
    </Card>
  );
};

FeedbackForm.propTypes = {
  poem: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string,
    author: PropTypes.string,
    content: PropTypes.string,
    pdfUrl: PropTypes.string,
    category: PropTypes.string
  }).isRequired,
  onSubmit: PropTypes.func
};

export default FeedbackForm;
