import React from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import PoemDisplay from '../../components/specific/PoemDisplay';

const PoemView = () => {
  const location = useLocation();
  const poem = location.state?.poem;

  if (!poem) {
    return (
      <Layout>
        <div className="text-center mt-20 text-red-600">No poem data found. Please unlock the poem first.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow-lg">
        <PoemDisplay poem={poem} />
      </div>
    </Layout>
  );
};

export default PoemView;
