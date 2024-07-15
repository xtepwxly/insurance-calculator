import React from 'react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive';
}

export const Alert: React.FC<AlertProps> = ({ children, variant = 'default', className = '', ...props }) => (
  <div
    className={`p-4 rounded-md ${
      variant === 'destructive' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
    } ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const AlertDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ children, className = '', ...props }) => (
  <p className={`mt-2 text-sm ${className}`} {...props}>
    {children}
  </p>
);