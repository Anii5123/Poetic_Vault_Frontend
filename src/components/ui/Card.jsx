import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const Card = ({
  children,
  className = '',
  hover = true,
  glass = false,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' } : {}}
      className={clsx(
        'rounded-xl p-6 transition-all duration-300',
        glass ? 'glass-effect' : 'bg-white shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;