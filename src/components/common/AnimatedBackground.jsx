import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';


const AnimatedBackground = () => {
  const petals = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-poetic-lavender via-poetic-cream to-poetic-peach" />
      
      {/* Floating Petals */}
      {petals.map((petal) => (
        <motion.div
          key={petal}
          className="absolute text-2xl opacity-20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -50,
            rotate: 0,
          }}
          animate={{
            y: window.innerHeight + 50,
            rotate: 360,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        >
          {Math.random() > 0.5 ? '🌸' : '🌺'}
        </motion.div>
      ))}
      
      {/* Floating Hearts */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-lg opacity-10"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
          }}
          animate={{
            y: -50,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeInOut",
          }}
        >
          💖
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedBackground;