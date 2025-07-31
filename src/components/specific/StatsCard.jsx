import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon }) => (
  <motion.div
    className="bg-white rounded-lg shadow p-6 flex items-center space-x-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="text-3xl text-poetic-purple">{icon}</div>
    <div>
      <p className="text-lg font-semibold">{value}</p>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  </motion.div>
);

export default StatsCard;
