import React from 'react';
import PropTypes from 'prop-types'; // ✅ Import this
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';

const Layout = ({ children, showBackground = true }) => {
  return (
    <div className="min-h-screen relative">
      {showBackground && <AnimatedBackground />}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {children}
      </motion.main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  showBackground: PropTypes.bool
};

export default Layout;
