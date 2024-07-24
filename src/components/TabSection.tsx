import React, { useState } from 'react';

const TabSection = () => {
  const [activeTab, setActiveTab] = useState('Document');

  const tabs = [
    { name: 'All boards', icon: '📋' },
    { name: 'Insights', icon: '💡' },
    { name: 'Grid', icon: '🔲' },
    { name: 'Timeline', icon: '📅' },
    { name: 'Columns', icon: '🗂' },
    { name: 'Document', icon: '📄' },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex space-x-2 p-2 bg-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out
              ${activeTab === tab.name
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            onClick={() => setActiveTab(tab.name)}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabSection;