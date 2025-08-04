// src/pages/public/UnlockPoem.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Layout from '../../components/common/Layout';
import { useToast } from '../../hooks/useToast';
import axios from 'axios';
import { baseurl } from '../../utils/constants';

const UnlockPoem = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const body = {
      passcode: data.passcode,
      viewerName: data.viewerName,
    };

    try {
      const response = await axios.post(`${baseurl}/api/poems/unlock`, body, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        toast.success('Poem unlocked successfully!');
        navigate(`/poem/${response.data.poem._id}`, {
          state: { poem: response.data.poem },
        });
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to unlock poem. Please check your passcode.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-great-vibes mb-6 text-center text-poetic-purple">
          Unlock Your Poem
        </h2>
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
