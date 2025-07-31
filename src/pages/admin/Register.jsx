import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      navigate('/admin/dashboard');
    } catch (error) {
      alert(error.message || 'Registration failed');
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-20 bg-white p-8 shadow-lg rounded-xl">
        <h2 className="text-3xl font-great-vibes text-center mb-6 text-poetic-purple">Admin Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Username"
            {...register('username', { required: 'Username required', minLength: { value: 3, message: 'Min 3 chars' } })}
            error={errors.username?.message}
          />
          <Input
            label="Email"
            type="email"
            {...register('email', { required: 'Email required' })}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            {...register('password', {
              required: 'Password required',
              minLength: { value: 6, message: 'Min 6 chars' }
            })}
            error={errors.password?.message}
          />
          <Button size="lg" type="submit" loading={isSubmitting} className="w-full">Register</Button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/admin/login" className="text-poetic-purple font-semibold">Login</Link>
        </p>
      </div>
    </Layout>
  );
};

export default Register;
