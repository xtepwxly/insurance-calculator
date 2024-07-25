import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { IndividualInfoFormProps } from './IndividualInfoForm';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const formatCurrency = (value: string) => {
  const numberValue = parseFloat(value.replace(/[^0-9]/g, ''));
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(isNaN(numberValue) ? 0 : numberValue);
};

const FormTypeSelector: React.FC<IndividualInfoFormProps> = ({ individualInfo, handleIndividualInfoChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const personTypes = ['Business', 'Owner', 'Employees'];

  const handleSalaryBlur = (field: 'ownerAnnualSalary' | 'employeeAnnualSalary', value: string) => {
    const formattedSalary = formatCurrency(value);
    handleIndividualInfoChange({
      target: {
        name: field,
        value: formattedSalary.replace(/[^0-9]/g, ''),
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="w-full max-w-md px-2 sm:px-0">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {personTypes.map((type) => (
            <Tab
              key={type}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-xl py-2.5 text-sm font-medium leading-5 text-blue-700',
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
          <Tab.Panel
            className={classNames(
              'rounded-xl bg-white p-3',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
            )}
          >
            <div className="md:flex md:flex-row md:items-center md:justify-between">
              <div>
                <Label htmlFor="businessZipCode">Zip:</Label>
                <Input
                  id="businessZipCode"
                  name="businessZipCode"
                  value={individualInfo.businessZipCode}
                  onChange={handleIndividualInfoChange}
                  placeholder="Business Zip Code"
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="businessEmployees"># of Employees:</Label>
                <Input
                  id="businessEmployees"
                  name="businessEmployees"
                  type="number"
                  value={individualInfo.businessEmployees}
                  onChange={handleIndividualInfoChange}
                  placeholder="Number of Employees"
                  min={0}
                  max={10}
                />
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <div className="md:flex md:flex-row md:items-center md:justify-between">
                <div>
                  <Label htmlFor="ownerAge">Age:</Label>
                  <Input
                    id="ownerAge"
                    name="ownerAge"
                    type="number"
                    value={individualInfo.ownerAge}
                    onChange={handleIndividualInfoChange}
                    placeholder="Owner Age"
                  />
                </div>
                <div>
                  <Label htmlFor="ownerAnnualSalary">Annual Salary:</Label>
                  <Input
                    id="ownerAnnualSalary"
                    name="ownerAnnualSalary"
                    type="text"
                    value={individualInfo.ownerAnnualSalary}
                    onChange={handleIndividualInfoChange}
                    onBlur={() => handleSalaryBlur('ownerAnnualSalary', String(individualInfo.ownerAnnualSalary))}
                    placeholder="Owner Annual Salary"
                  />
                </div>
              </div>
          </Tab.Panel>
          <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <div className="md:flex md:flex-row md:items-center md:justify-between">
                <div>
                  <Label htmlFor="employeeAge">Age:</Label>
                  <Input
                    id="employeeAge"
                    name="employeeAge"
                    type="number"
                    value={individualInfo.employeeAge}
                    onChange={handleIndividualInfoChange}
                    placeholder="Employee Age"
                  />
                </div>
                <div>
                  <Label htmlFor="employeeAnnualSalary">Annual Salary:</Label>
                  <Input
                    id="employeeAnnualSalary"
                    name="employeeAnnualSalary"
                    type="text"
                    value={individualInfo.employeeAnnualSalary}
                    onChange={handleIndividualInfoChange}
                    onBlur={() => handleSalaryBlur('employeeAnnualSalary', String(individualInfo.employeeAnnualSalary))}
                    placeholder="Employee Annual Salary"
                  />
                </div>
              </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default FormTypeSelector;