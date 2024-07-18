import React from 'react';
import { Card, CardHeader, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { US_STATES } from '../utils/insuranceUtils';

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

const IndividualInfoForm: React.FC<IndividualInfoFormProps> = ({ individualInfo, handleIndividualInfoChange }) => {
  return (
    <Card className="mb-4 max-w-xl mx-auto">
      <CardHeader className="text-xl font-bold">Individual Information</CardHeader>
      <CardContent>
        <div className="flex space-x-4">
          <div className="space-y-2 w-16">
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
          <div className="space-y-2 w-24">
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
          <div className="space-y-2 w-40">
            <Label htmlFor="annualSalary">Annual Salary</Label>
            <Input
              id="annualSalary"
              name="annualSalary"
              type="number"
              value={individualInfo.annualSalary}
              onChange={handleIndividualInfoChange}
              placeholder="Annual Salary"
              className="w-full"
              maxLength={10}
            />
          </div>
          <div className="space-y-2 flex-1">
            <Label htmlFor="state">State</Label>
            <Select
              id="state"
              value={individualInfo.state}
              onValueChange={(value) => handleIndividualInfoChange({ target: { name: 'state', value } } as React.ChangeEvent<HTMLSelectElement>)}
              className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500"
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {US_STATES.map((state) => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndividualInfoForm;
