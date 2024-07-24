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
  return (
    <Card className="mb-4">
      <CardHeader className="text-xl font-bold">About Your Business</CardHeader>
      <CardContent>
        <FormTypeSelector individualInfo={individualInfo} handleIndividualInfoChange={handleIndividualInfoChange} />
      </CardContent>
    </Card>
  );
};

export default IndividualInfoForm;