import React from 'react';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ children, value, onValueChange, className = '' }) => (
  <div className={className}>
    {React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { value, onValueChange } as any);
      }
      return child;
    })}
  </div>
);

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ children, className = '' }) => (
  <div className={`flex ${className}`}>{children}</div>
);

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  onValueChange?: (value: string) => void;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ children, value, onValueChange, className = '' }) => (
  <button
    className={`px-4 py-2 ${className}`}
    onClick={() => onValueChange && onValueChange(value)}
  >
    {children}
  </button>
);