import React, { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import poemService from '../../services/poems';
import StatsCard from '../../components/specific/StatsCard';
import Card from '../../components/ui/Card';
import { BarChart2, Users, BookOpen } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    poemService.getAnalytics()
      .then(res => {
        setData(res.analytics);
      })
      .catch((e) => {
        console.error('Error fetching analytics:', e);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Layout>
        <Card>Loading analytics...</Card>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-5xl p-6">
        <h1 className="text-3xl font-great-vibes text-poetic-purple mb-8">Dashboard Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard icon={<BookOpen />} title="Total Poems" value={data?.totalPoems ?? 0} />
          <StatsCard icon={<Users />} title="Total Views" value={data?.totalViews ?? 0} />
          <StatsCard icon={<BarChart2 />} title="Feedback Count" value={data?.feedbackCount ?? 0} />
        </div>
        <Card>
          <h2 className="text-xl font-semibold mb-2">Poems by Category:</h2>
          <div className="flex flex-wrap gap-4">
            {(data?.categoryStats ?? []).map(cat => (
              <div key={cat._id} className="p-4 bg-poetic-cream rounded shadow text-center flex-1">
                <div className="text-poetic-purple capitalize font-playfair">{cat._id}</div>
                <div className="font-bold text-lg">{cat.count}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Recent Poem Activity:</h2>
          <ul>
            {(data?.recentActivity ?? []).map(item => (
              <li key={item._id} className="mb-2">
                <span className="font-semibold">{item.title}</span> &middot; {item.viewCount} views &middot; updated {formatDate(item.updatedAt)}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Layout>
  );
};

export default Analytics;
