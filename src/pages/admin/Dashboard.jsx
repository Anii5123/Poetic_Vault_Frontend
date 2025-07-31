import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { usePoems } from '../../hooks/usePoems';
import { useNavigate } from 'react-router-dom';
import PoemCard from '../../components/specific/PoemCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Dashboard = () => {
  const { poems, loading, deletePoem, fetchPoems } = usePoems();
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);

  const handleEdit = (poem) => navigate(`/admin/dashboard/edit/${poem._id}`);
  const handleAdd = () => navigate(`/admin/dashboard/add`);
  const handleDelete = async (poem) => {
    if (!window.confirm('Delete this poem?')) return;
    setDeletingId(poem._id);
    await deletePoem(poem._id);
    setDeletingId(null);
    fetchPoems();
  };

  const renderPoemList = () => {
    if (loading) return <LoadingSpinner />;
    if (poems?.length === 0) {
      return <Card className="text-center">No poems yet. Click "Add Poem" to create.</Card>;
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {poems.map((poem) => (
          <PoemCard
            key={poem._id}
            poem={poem}
            onEdit={handleEdit}
            onDelete={handleDelete}
            showActions
            loading={deletingId === poem._id}
          />
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-5xl py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-great-vibes text-poetic-purple">My Poems</h1>
          <Button onClick={handleAdd} variant="primary" size="md">
            + Add Poem
          </Button>
        </div>
        {renderPoemList()}
      </div>
    </Layout>
  );
};

export default Dashboard;
