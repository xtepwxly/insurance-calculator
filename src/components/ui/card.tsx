import React from 'react';
import { cn } from 'utils/insuranceUtils';


interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => (
  <div className={`bg-white shadow-md rounded-xl py-1 px-4	 ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader: React.FC<CardProps> = ({ children, className = '', ...props }) => (
  <div className={`rounded-xl px-4 py-5 border-b border-npm-200 sm:px-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardContent: React.FC<CardProps> = ({ children, className = '', ...props }) => (
  <div className={`rounded-xl px-4 py-5 sm:p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>>
(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))

CardTitle.displayName = "CardTitle"
