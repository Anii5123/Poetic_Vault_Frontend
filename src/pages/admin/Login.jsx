import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Layout from '../../components/common/Layout';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin/dashboard';

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await login({ email: data.email, password: data.password });
      navigate(from, { replace: true });
    } catch (error) {
      alert(error.message || 'Login failed');
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-20 p-8 shadow-lg bg-white rounded-md">
        <h2 className="text-3xl font-great-vibes text-center mb-6 text-poetic-purple">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input label="Email" type="email" {...register('email', { required: 'Email is required' })} error={errors.email?.message} />
          <Input label="Password" type="password" {...register('password', { required: 'Password is required' })} error={errors.password?.message} />
          <Button size="lg" type="submit" loading={isSubmitting} className="w-full">Login</Button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an admin account? <Link to="/admin/register" className="text-poetic-purple font-semibold">Register</Link>
        </p>
      </div>
    </Layout>
  );
};

export default Login;
