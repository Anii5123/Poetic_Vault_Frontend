// src/pages/UnlockPoem.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Layout from '../../components/common/Layout';
import poemService from '../../services/poems';
import { useToast } from '../../hooks/useToast'; // ✅ Correct import

const UnlockPoem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast(); // ✅ Correct usage
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await poemService.unlockPoem(id, data.passcode, data.viewerName);
      toast.success('Poem unlocked successfully!');
      navigate(`/poem/${id}`, { state: { poem: res.poem } });
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to unlock poem. Please check your passcode.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-great-vibes mb-6 text-center text-poetic-purple">Unlock Your Poem</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Your Name"
            {...register('viewerName', { required: 'Please enter your name' })}
            error={errors.viewerName?.message}
            placeholder="Your beautiful name..."
          />
          <Input
            label="Passcode"
            type="password"
            {...register('passcode', { required: 'Please enter the passcode' })}
            error={errors.passcode?.message}
            placeholder="Enter passcode"
          />
          <Button 
            size="lg" 
            className="w-full" 
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Unlocking...' : 'Unlock'}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default UnlockPoem;
