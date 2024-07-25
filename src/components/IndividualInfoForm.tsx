import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import FormTypeSelector from './FormTypeSelector';



interface IndividualInfo {
  businessZipCode: string;
  businessEmployees: number;
  ownerAge: number;
  ownerAnnualSalary: number;
  employeeAge: number;
  employeeAnnualSalary: number;
}

export interface IndividualInfoFormProps {
  individualInfo: IndividualInfo;
  handleIndividualInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const IndividualInfoForm: React.FC<IndividualInfoFormProps> = ({ individualInfo, handleIndividualInfoChange }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="text-xl font-bold">About Your Business</CardHeader>
      <CardContent>
        <FormTypeSelector individualInfo={individualInfo} handleIndividualInfoChange={handleIndividualInfoChange} />
        <span className="ml-2 text-xs text-gray-500">* NOT INCLUDING OWNER</span>
      </CardContent>
    </Card>
  );
};

export default IndividualInfoForm;