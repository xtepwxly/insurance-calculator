import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface IndividualInfo {
  businessZipCode: string;
  businessEmployees: number;
  ownerAge: number;
  ownerAnnualSalary: number;
  employeeAge: number;
  employeeAnnualSalary: number;
}

interface IndividualInfoFormProps {
  individualInfo: IndividualInfo;
  handleIndividualInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

  return (
    <Card className="mb-4">
      <CardHeader className="text-xl font-bold">About Your Business</CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Business</h3>
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
              <Label htmlFor="businessEmployees"># of Employees: {individualInfo.businessEmployees}</Label>
              <Input
                id="businessEmployees"
                name="businessEmployees"
                type="number"
                value={individualInfo.businessEmployees}
                onChange={handleIndividualInfoChange}
                placeholder="Number of Employees"
                className="w-full"
              />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Owner</h3>
            <div>
              <Label htmlFor="ownerAge">Age: {individualInfo.ownerAge}</Label>
              <Input
                id="ownerAge"
                name="ownerAge"
                type="number"
                value={individualInfo.ownerAge}
                onChange={handleIndividualInfoChange}
                placeholder="Owner Age"
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="ownerAnnualSalary">Annual Salary: {ownerSalary}</Label>
              <Input
                id="ownerAnnualSalary"
                name="ownerAnnualSalary"
                type="text"
                value={ownerSalary}
                onChange={handleSalaryChange(setOwnerSalary)}
                onBlur={() => handleSalaryBlur('ownerAnnualSalary', ownerSalary)}
                placeholder="Owner Annual Salary"
                className="w-full"
              />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Employees</h3>
            <div>
              <Label htmlFor="employeeAge">Age: {individualInfo.employeeAge}</Label>
              <Input
                id="employeeAge"
                name="employeeAge"
                type="number"
                value={individualInfo.employeeAge}
                onChange={handleIndividualInfoChange}
                placeholder="Employee Age"
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="employeeAnnualSalary">Annual Salary: {employeeSalary}</Label>
              <Input
                id="employeeAnnualSalary"
                name="employeeAnnualSalary"
                type="text"
                value={employeeSalary}
                onChange={handleSalaryChange(setEmployeeSalary)}
                onBlur={() => handleSalaryBlur('employeeAnnualSalary', employeeSalary)}
                placeholder="Employee Annual Salary"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndividualInfoForm;