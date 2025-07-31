import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Layout from '../../components/common/Layout';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Button from '../../components/ui/Button';
import { usePoems } from '../../hooks/usePoems';
import { categories } from '../../utils/constants';

const EditPoem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { poems, updatePoem, fetchPoems } = usePoems();
  const [current, setCurrent] = useState(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    const poem = poems.find((p) => p._id === id);
    if (poem) {
      setCurrent(poem);
      reset(poem);
    } else {
      fetchPoems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, poems]);

  const onSubmit = async (data) => {
    try {
      const payload = { ...data };
      if (data.pdf?.[0]) {
        payload.pdf = data.pdf[0];
      }
      await updatePoem(id, payload);
      navigate('/admin/dashboard');
    } catch (e) {
      console.error('Update poem error:', e);
    }
  };

  if (!current) {
    return (
      <Layout>
        <div className="text-center mt-20">Loading poem...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-great-vibes text-poetic-purple mb-6 text-center">Edit Poem</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" encType="multipart/form-data">
          <Input label="Title" {...register('title', { required: 'Title required' })} error={errors.title?.message} />
          <Textarea label="Poem Content" rows={8} {...register('content')} />
          <Input label="PDF File (Upload to replace)" type="file" accept="application/pdf" {...register('pdf')} />
          <Input label="Passcode" {...register('passcode', { required: 'Passcode required', minLength: 4 })} error={errors.passcode?.message} />
          <Input label="Author" {...register('author', { required: 'Author required' })} error={errors.author?.message} />
          <div>
            <label htmlFor="category" className="block mb-1 font-medium">Category</label>
            <select
              id="category"
              {...register('category', { required: true })}
              className="w-full border rounded px-3 py-2"
              defaultValue={current?.category}
            >
              {categories.map((cat) => (
                <option value={cat} key={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </div>
          <Button size="lg" loading={isSubmitting} type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default EditPoem;
