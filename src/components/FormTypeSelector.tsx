import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { Card, CardHeader, CardContent } from './ui/card';
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

const getType = (props: IndividualInfoFormProps, ownerSalary, setOwnerSalary, handleSalaryChange, handleSalaryBlur, employeeSalary, setEmployeeSalary) => {
  return (type: any) => {
    const TYPES = {
      'Business': (
        <>
          <div>
            <Label htmlFor="businessZipCode">Zip:</Label>
            <Input
              id="businessZipCode"
              name="businessZipCode"
              value={props.individualInfo.businessZipCode}
              onChange={props.handleIndividualInfoChange}
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
              value={props.individualInfo.businessEmployees}
              onChange={props.handleIndividualInfoChange}
              placeholder="Number of Employees"
              min={0}
              max={10}
            />
          </div>
        </>
      ),
      'Owner': (
        <>
          <div>
            <Label htmlFor="ownerAge">Age:</Label>
            <Input
              id="ownerAge"
              name="ownerAge"
              type="number"
              value={props.individualInfo.ownerAge}
              onChange={props.handleIndividualInfoChange}
              placeholder="Owner Age"
            />
          </div>
          <div>
            <Label htmlFor="ownerAnnualSalary">Annual Salary:</Label>
            <Input
              id="ownerAnnualSalary"
              name="ownerAnnualSalary"
              type="text"
              value={ownerSalary}
              onChange={handleSalaryChange(setOwnerSalary)}
              onBlur={() => handleSalaryBlur('ownerAnnualSalary', ownerSalary)}
              placeholder="Owner Annual Salary"
            />
          </div>
        </>
      ),
      'Employees': (
        <>
          <div>
            <Label htmlFor="employeeAge">Age:</Label>
            <Input
              id="employeeAge"
              name="employeeAge"
              type="number"
              value={props.individualInfo.employeeAge}
              onChange={props.handleIndividualInfoChange}
              placeholder="Employee Age"
            />
          </div>
          <div>
            <Label htmlFor="employeeAnnualSalary">Annual Salary:</Label>
            <Input
              id="employeeAnnualSalary"
              name="employeeAnnualSalary"
              type="text"
              value={employeeSalary}
              onChange={handleSalaryChange(setEmployeeSalary)}
              onBlur={() => handleSalaryBlur('employeeAnnualSalary', employeeSalary)}
              placeholder="Employee Annual Salary"
            />
          </div>
        </>
      )
    }
    return TYPES[type as any] ?? 'Business';
  }
}

const FormTypeSelector: React.FC<IndividualInfoFormProps> = ({ individualInfo, handleIndividualInfoChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const tripTypes = ['Business', 'Owner', 'Employees'];

  const [ownerSalary, setOwnerSalary] = useState(formatCurrency(individualInfo.ownerAnnualSalary.toString()));
  const [employeeSalary, setEmployeeSalary] = useState(formatCurrency(individualInfo.employeeAnnualSalary.toString()));

  const handleSalaryChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  const handleSalaryBlur = (field: 'ownerAnnualSalary' | 'employeeAnnualSalary', value: string) => {
    const formattedSalary = formatCurrency(value);
    if (field === 'ownerAnnualSalary') setOwnerSalary(formattedSalary);
    else setEmployeeSalary(formattedSalary);
    handleIndividualInfoChange({
      target: {
        name: field,
        value: formattedSalary.replace(/[^0-9]/g, ''),
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const getWorkerType = getType({ individualInfo, handleIndividualInfoChange }, ownerSalary, setOwnerSalary, handleSalaryChange, handleSalaryBlur, employeeSalary, setEmployeeSalary);

  return (
    <div className="w-full max-w-md px-2 sm:px-0">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {tripTypes.map((type) => (
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
          {tripTypes.map((type, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              {/* <h3 className="text-lg font-medium leading-5">
                {type} options will be displayed here
              </h3> */}
              <div className="md:flex md:flex-row md:items-center md:justify-between">
                {getWorkerType(type)}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default FormTypeSelector;