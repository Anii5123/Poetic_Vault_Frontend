import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Button from '../../components/ui/Button';

const Landing = () => (
  <Layout>
    <div className="min-h-screen flex flex-col justify-center items-center px-4 text-center">
      <h1 className="text-6xl font-great-vibes mb-4 text-poetic-purple">Welcome to Poetic Vault</h1>
      <p className="max-w-xl text-lg mb-8 font-playfair">
        Unlock personalized poems with a secret passcode. Share emotions and memories beautifully.
      </p>
      <div className="space-x-4">
        <Link to="/unlock/poem-id">
          <Button variant="primary" size="lg">
            Unlock a Poem
          </Button>
        </Link>
        <Link to="/admin/login">
          <Button variant="outline" size="lg">
            Admin Login
          </Button>
        </Link>
      </div>
      <div className="mt-8 text-sm text-gray-600">
        <p>Need a poem ID? Contact the poem creator for your unique unlock link.</p>
      </div>
    </div>
  </Layout>
);

export default Landing;