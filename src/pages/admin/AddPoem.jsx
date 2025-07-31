import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../../components/common/Layout';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Button from '../../components/ui/Button';
import { usePoems } from '../../hooks/usePoems';
import { categories } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

const AddPoem = () => {
  const { createPoem } = usePoems();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload = { ...data };
      if (data.pdf?.[0]) {
        payload.pdf = data.pdf[0];
        delete payload.content;
      }
      await createPoem(payload);
      reset();
      navigate('/admin/dashboard');
    } catch (e) {
      console.error('Poem creation error:', e);
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-great-vibes text-poetic-purple mb-6 text-center">Add New Poem</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" encType="multipart/form-data">
          <Input label="Title" {...register('title', { required: 'Title required' })} error={errors.title?.message} />
          <Textarea
            label="Poem Content"
            {...register('content', {
              required: 'Provide content OR upload PDF',
              maxLength: { value: 10000, message: 'Too long' },
            })}
            error={errors.content?.message}
            rows={8}
            placeholder="Type your poem here..."
          />
          <Input label="PDF File (Optional)" type="file" accept="application/pdf" {...register('pdf')} />
          <Input
            label="Passcode"
            {...register('passcode', { required: 'Passcode required', minLength: { value: 4, message: 'Min 4 digits' } })}
            error={errors.passcode?.message}
            placeholder="e.g. 1234"
          />
          <Input label="Author" {...register('author', { required: 'Author required' })} error={errors.author?.message} />
          <div>
            <label htmlFor="category" className="block mb-1 font-medium">Category</label>
            <select
              id="category"
              {...register('category', { required: true })}
              className="w-full border rounded px-3 py-2"
            >
              {categories.map((cat) => (
                <option value={cat} key={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </div>
          <Button size="lg" loading={isSubmitting} type="submit" className="w-full">
            Create Poem
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default AddPoem;
