import React from 'react';
import { IndividualInfo, EligibilityOption, ELIGIBILITY_OPTIONS } from '../utils/insuranceTypes';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';

import { ZIP_CODE_REGIONS} from '../utils/insuranceConfig';

interface IndividualInfoFormProps {
  individualInfo: IndividualInfo;
  handleIndividualInfoChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { name: string; value: string | number },
    personType: 'owner' | 'employee' | 'business'
  ) => void;
  errors: Record<string, string>;
  activeTab: 'business' | 'owner' | 'employees';
}

interface PersonInfoFormProps {
  personType: 'owner' | 'employee';
  personInfo: IndividualInfo['owner'] | IndividualInfo['employee'];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { name: string; value: string | number }, personType: 'owner' | 'employee') => void;
  errors: Record<string, string>;
}

const PersonInfoForm: React.FC<PersonInfoFormProps> = ({ personType, personInfo, handleChange, errors }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let parsedValue: string | number = value;

    if (name === 'age') {
      parsedValue = parseInt(value) || 0;
    } else if (name === 'annualSalary' || name === 'employeeCoverage' || name === 'spouseCoverage') {
      parsedValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
    }

    handleChange({ name, value: parsedValue }, personType);
  };

  return (
    <Card className="mb-4">
      <h3 className="text-lg font-semibold capitalize">{personType} Information</h3>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <Label htmlFor={`${personType}-age`}>Age</Label>
          <Input
            id={`${personType}-age`}
            name="age"
            value={personInfo.age}
            onChange={handleInputChange}
            className={errors[`${personType}Age`] ? 'border-red-500' : ''}
          />
          {errors[`${personType}Age`] && <p className="text-red-500 text-sm mt-1">{errors[`${personType}Age`]}</p>}
        </div>
        <div>
          <Label htmlFor={`${personType}-annualSalary`}>Annual Salary</Label>
          <Input
            id={`${personType}-annualSalary`}
            name="annualSalary"
            value={formatCurrency(personInfo.annualSalary)}
            onChange={handleInputChange}
            className={errors[`${personType}AnnualSalary`] ? 'border-red-500' : ''}
          />
          {errors[`${personType}AnnualSalary`] && <p className="text-red-500 text-sm mt-1">{errors[`${personType}AnnualSalary`]}</p>}
        </div>
        <div>
          <Label htmlFor={`${personType}-eligibility`}>Eligibility</Label>
          <Select
            value={personInfo.eligibility}
            onValueChange={(value: EligibilityOption) => handleChange({ name: 'eligibility', value }, personType)}
          >
            <SelectTrigger id={`${personType}-eligibility`}>
              <SelectValue>{personInfo.eligibility}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'].map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor={`${personType}-employeeCoverage`}>Employee Coverage</Label>
          <Input
            id={`${personType}-employeeCoverage`}
            name="employeeCoverage"
            value={formatCurrency(personInfo.employeeCoverage)}
            onChange={handleInputChange}
            className={errors[`${personType}EmployeeCoverage`] ? 'border-red-500' : ''}
          />
          {errors[`${personType}EmployeeCoverage`] && <p className="text-red-500 text-sm mt-1">{errors[`${personType}EmployeeCoverage`]}</p>}
        </div>
        <div>
          <Label htmlFor={`${personType}-spouseCoverage`}>Spouse Coverage</Label>
          <Input
            id={`${personType}-spouseCoverage`}
            name="spouseCoverage"
            value={formatCurrency(personInfo.spouseCoverage)}
            onChange={handleInputChange}
            className={errors[`${personType}SpouseCoverage`] ? 'border-red-500' : ''}
          />
          {errors[`${personType}SpouseCoverage`] && <p className="text-red-500 text-sm mt-1">{errors[`${personType}SpouseCoverage`]}</p>}
        </div>
        </div>
    </Card>
  );
};
const getZipCodeRegion = (zipCode: string): number | null => {
  if (!zipCode || typeof zipCode !== 'string') {
    return null; // Return null for invalid input
  }

  const zipPrefix = zipCode.substring(0, 3);
  for (const region in ZIP_CODE_REGIONS) {
    if (ZIP_CODE_REGIONS[region].includes(zipPrefix)) {
      return parseInt(region, 10);
    }
  }
  return null;
};

const IndividualInfoForm: React.FC<IndividualInfoFormProps> = ({
  individualInfo,
  handleIndividualInfoChange,
  errors,
  activeTab,
}) => { 
  return (
    <Card className="mb-4">
      {activeTab === 'business' && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="businessZipCode">Business Zip Code</Label>
            <Input
              id="businessZipCode"
              name="businessZipCode"
              value={individualInfo.businessZipCode || ''} // Use empty string if businessZipCode is falsy
              onChange={(e) => handleIndividualInfoChange(e, 'business')}
            />
          </div>
          <div>
            <Label htmlFor="businessEmployees">Number of Employees</Label>
            <Input
              id="businessEmployees"
              name="businessEmployees"
              type="number"
              value={individualInfo.businessEmployees}
              onChange={(e) => handleIndividualInfoChange(e, 'business')}
            />
          </div>
        </div>
      )}
      {activeTab === 'owner' && (
        <PersonInfoForm
          personType="owner"
          personInfo={individualInfo.owner}
          handleChange={handleIndividualInfoChange}
          errors={errors}
        />
      )}
      {activeTab === 'employees' && (
        <PersonInfoForm
          personType="employee"
          personInfo={individualInfo.employee}
          handleChange={handleIndividualInfoChange}
          errors={errors}
          
        />
        
      )}
    </Card>
  );
};

export default IndividualInfoForm;