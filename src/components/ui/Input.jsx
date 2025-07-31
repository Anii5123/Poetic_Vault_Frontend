import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';

const Input = forwardRef(({ label, error, className = '', type = 'text', ...props }, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 font-playfair">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={clsx(
          'w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-poetic-purple focus:border-transparent',
          'transition-all duration-200 font-playfair',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        aria-invalid={!!error}
        aria-label={label || 'Input field'}
        {...props}
      />
      {error && <p className="text-sm text-red-600 font-playfair">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

// SonarLint false positive: 'PropTypes' is NOT deprecated (javascript:S1874)
Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
};




export default Input;

