import React from 'react';

interface TabsProps {
  activeTab: 'business' | 'owner' | 'employees';
  setActiveTab: (tab: 'business' | 'owner' | 'employees') => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex space-x-2 mb-4">
      <button
        className={`px-4 py-2 rounded-t-lg ${activeTab === 'business' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setActiveTab('business')}
      >
        Business
      </button>
      <button
        className={`px-4 py-2 rounded-t-lg ${activeTab === 'owner' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setActiveTab('owner')}
      >
        Owner
      </button>
      <button
        className={`px-4 py-2 rounded-t-lg ${activeTab === 'employees' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setActiveTab('employees')}
      >
        Employees
      </button>
    </div>
  );
};

export default Tabs;