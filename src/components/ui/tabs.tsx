// src/components/ui/tabs.tsx

import React from 'react';

interface TabsProps {
  children: React.ReactNode;
}

interface TabsTriggerProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  return <div className="tabs">{children}</div>;
};

export const TabsList: React.FC<TabsProps> = ({ children }) => {
  return <div className="tabs-list flex border-b border-gray-300 mb-4">{children}</div>;
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ onClick, children }) => {
  return (
    <button
      className="tabs-trigger px-4 py-2 text-gray-600 hover:text-blue-600 focus:text-blue-600 border-b-2 border-transparent focus:border-blue-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default { Tabs, TabsList, TabsTrigger };
