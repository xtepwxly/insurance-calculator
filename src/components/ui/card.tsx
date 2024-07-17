import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => (
  <div className={`bg-white shadow-md rounded-lg ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader: React.FC<CardProps> = ({ children, className = '', ...props }) => (
  <div className={`px-4 py-5 border-b border-gray-200 sm:px-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardContent: React.FC<CardProps> = ({ children, className = '', ...props }) => (
  <div className={`px-4 py-5 sm:p-6 ${className}`} {...props}>
    {children}
  </div>
);