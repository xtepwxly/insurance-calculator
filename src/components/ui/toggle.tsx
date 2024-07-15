import React from 'react';

export const Toggle = ({ children, pressed, onPressedChange, className, ...props }) => (
  <button
    className={`px-3 py-2 rounded-md ${
      pressed ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
    } ${className}`}
    onClick={() => onPressedChange(!pressed)}
    aria-pressed={pressed}
    {...props}
  >
    {children}
  </button>
);
