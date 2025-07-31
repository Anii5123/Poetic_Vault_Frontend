import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';

const Textarea = forwardRef(({ label, error, className = '', rows = 4, ...props }, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 font-playfair">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={clsx(
          'w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-poetic-purple focus:border-transparent',
          'transition-all duration-200 font-playfair resize-none',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        aria-invalid={!!error}
        aria-label={label || 'Textarea field'}
        {...props}
      />
      {error && <p className="text-sm text-red-600 font-playfair">{error}</p>}
    </div>
  );
});

Textarea.displayName = 'Textarea';

Textarea.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  rows: PropTypes.number,
};


export default Textarea;
