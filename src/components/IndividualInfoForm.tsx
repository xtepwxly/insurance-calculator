import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface IndividualInfo {
  age: number;
  annualSalary: number;
  zipCode: string;
  state: string;
}

interface IndividualInfoFormProps {
  individualInfo: IndividualInfo;
  handleIndividualInfoChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
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

const IndividualInfoForm: React.FC<IndividualInfoFormProps> = ({ individualInfo, handleIndividualInfoChange }) => {
  const [annualSalary, setAnnualSalary] = useState(formatCurrency(individualInfo.annualSalary.toString()));

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAnnualSalary(value);
  };

  const handleSalaryBlur = () => {
    const formattedSalary = formatCurrency(annualSalary);
    setAnnualSalary(formattedSalary);
    handleIndividualInfoChange({
      target: {
        name: 'annualSalary',
        value: formattedSalary.replace(/[^0-9]/g, ''),
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <Card className="mb-1">
      <CardHeader className="text-xl font-bold">Individual Information</CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="space-y-2 md:w-40">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              name="age"
              type="number"
              value={individualInfo.age}
              onChange={handleIndividualInfoChange}
              placeholder="Age"
              className="w-full"
              maxLength={2}
            />
          </div>
          <div className="space-y-2 md:w-40">
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              name="zipCode"
              value={individualInfo.zipCode}
              onChange={handleIndividualInfoChange}
              placeholder="Zip Code"
              className="w-full"
              maxLength={5}
            />
          </div>
          <div className="space-y-2 md:w-40">
            <Label htmlFor="annualSalary">Annual Salary</Label>
            <Input
              id="annualSalary"
              name="annualSalary"
              type="text"
              value={annualSalary}
              onChange={handleSalaryChange}
              onBlur={handleSalaryBlur}
              placeholder="Annual Salary"
              className="w-full"
              maxLength={10}
              />
              </div>
            </div>
          </CardContent>
        </Card>
      );
    };
    
    export default IndividualInfoForm;