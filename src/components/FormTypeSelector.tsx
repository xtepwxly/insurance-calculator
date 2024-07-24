import React, { useState } from 'react';
import { Tab } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const FormTypeSelector = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const tripTypes = ['Roundtrip', 'One-way', 'Multi-city'];

  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {tripTypes.map((type) => (
            <Tab
              key={type}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {type}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {tripTypes.map((type, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <h3 className="text-lg font-medium leading-5">
                {type} options will be displayed here
              </h3>
              {/* Add your specific inputs for each trip type here */}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default FormTypeSelector;