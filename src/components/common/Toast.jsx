import React from 'react';
import { Toaster } from 'react-hot-toast';

const Toast = () => (
  <Toaster
    position="top-right"
    reverseOrder={false}
    gutter={8}
    containerStyle={{
      top: 20,
      right: 20,
    }}
    toastOptions={{
      // Default options for all toasts
      className: 'font-playfair',
      style: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#fff',
        borderRadius: '10px',
        padding: '14px 20px',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.5)',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      },
      success: {
        iconTheme: {
          primary: '#ffffff',
          secondary: '#10b981',
        },
      },
      error: {
        iconTheme: {
          primary: '#ffffff',
          secondary: '#ef4444',
        },
      },
      duration: 4000,
    }}
  />
);

export default Toast;
