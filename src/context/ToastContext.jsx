// src/context/ToastContext.jsx
import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const toastFunctions = useMemo(() => ({
    success: (message) =>
      toast.success(message, {
        duration: 4000,
        style: {
          background: '#10b981',
          color: '#ffffff',
          borderRadius: '10px',
          padding: '16px',
        },
        iconTheme: {
          primary: '#ffffff',
          secondary: '#10b981',
        },
      }),

    error: (message) =>
      toast.error(message, {
        duration: 5000,
        style: {
          background: '#ef4444',
          color: '#ffffff',
          borderRadius: '10px',
          padding: '16px',
        },
        iconTheme: {
          primary: '#ffffff',
          secondary: '#ef4444',
        },
      }),

    loading: (message) =>
      toast.loading(message, {
        style: {
          background: '#6366f1',
          color: '#ffffff',
          borderRadius: '10px',
          padding: '16px',
        },
      }),

    custom: (message, options = {}) =>
      toast(message, {
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#ffffff',
          borderRadius: '15px',
          padding: '16px',
          boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
        },
        ...options,
      }),
  }), []);

  return (
    <ToastContext.Provider value={toastFunctions}>
      {children}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerStyle={{ top: 20, right: 20 }}
        toastOptions={{
          className: 'font-playfair',
          style: { fontSize: '14px', fontWeight: '500' },
        }}
      />
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ToastContext;
