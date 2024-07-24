import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Add any additional props specific to your Input component
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      className={`block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${className}`}
      ref={ref}
      {...props}
    />
  )
);

Input.displayName = 'Input';