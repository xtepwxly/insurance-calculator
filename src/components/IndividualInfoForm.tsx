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
    <Card className="mb-4">
      <CardHeader className="">Individual Information</CardHeader>
      <CardContent className="">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={individualInfo.age}
                onChange={handleIndividualInfoChange}
                placeholder="Age"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="annualSalary">Annual Salary</Label>
              <Input
                id="annualSalary"
                name="annualSalary"
                type="number"
                value={individualInfo.annualSalary}
                onChange={handleIndividualInfoChange}
                placeholder="Annual Salary"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={individualInfo.zipCode}
                onChange={handleIndividualInfoChange}
                placeholder="Zip Code"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select
                id="state"
                value={individualInfo.state}
                onValueChange={(value) => handleIndividualInfoChange({ target: { name: 'state', value } } as React.ChangeEvent<HTMLSelectElement>)}
              >
                <SelectContent>
                  {US_STATES.map((state) => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndividualInfoForm;