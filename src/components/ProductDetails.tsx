import React from 'react';
import { Card, CardHeader, CardContent } from './ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';
import { ELIGIBILITY_OPTIONS } from '../utils/insuranceUtils';

interface ProductDetailsProps {
  selectedProduct: string;
  productEligibility: { [key: string]: string };
  handleEligibilityChange: (value: string) => void;
  plan: string;
  setPlan: (value: string) => void;
  premium: number;
  lifeAddInfo: {
    employeeElectedCoverage: number;
    spouseElectedCoverage: number;
    numberOfChildren: number;
  };
  handleLifeAddInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: {
    employeeElectedCoverage?: string;
    spouseElectedCoverage?: string;
  };
  costView: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ 
  selectedProduct, 
  productEligibility, 
  handleEligibilityChange, 
  plan, 
  setPlan, 
  premium,
  lifeAddInfo,
  handleLifeAddInfoChange,
  errors,
  costView
}) => {
  const renderProductContent = () => {
    // ... (implementation remains the same)
  };

  const formattedPremium = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(costView === 'Monthly' ? premium : premium / 2);

  return (
    <Card className=''>
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <h3 className="text-lg font-semibold">{selectedProduct}</h3>
        <Select 
          value={productEligibility[selectedProduct]}
          onValueChange={handleEligibilityChange}
        >
          <SelectContent>
            {ELIGIBILITY_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Select eligibility" />
        </SelectTrigger>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderProductContent()}
        <p className="text-lg font-semibold">{costView} Premium: {formattedPremium}</p>
        {['LTD', 'Accidents', 'Dental', 'Vision'].includes(selectedProduct) && (
          <RadioGroup 
            value={plan}
            onValueChange={setPlan}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Basic" id="basic" />
              <Label htmlFor="basic">Basic</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Premium" id="premium" />
              <Label htmlFor="premium">Premium</Label>
            </div>
          </RadioGroup>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductDetails;