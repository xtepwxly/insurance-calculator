import React from 'react';
import '../styles/global.css';
import { Card, CardHeader, CardContent } from './ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';
import { Product, EligibilityOption, Plan, LifeAddInfo, IndividualInfo } from '../utils/insuranceTypes';
import { PRODUCT_BULLET_POINTS, PRODUCT_ELIGIBILITY_OPTIONS } from '../utils/insuranceConfig';

interface ProductDetailsProps {
  selectedProduct: Product;
  productEligibility: Record<Product, EligibilityOption>;
  handleEligibilityChange: (eligibility: EligibilityOption) => void;
  plan: Plan;
  setPlan: (newPlan: Plan) => void;
  premium: number;
  lifeAddInfo: LifeAddInfo;
  handleLifeAddInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
  costView: 'Month' | 'Bi-weekly';
  individualInfo: IndividualInfo;
  handleIndividualInfoChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  PRODUCT_ELIGIBILITY_OPTIONS: Record<Product, EligibilityOption[]>;
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
  costView,
  individualInfo,
  handleIndividualInfoChange,
  PRODUCT_ELIGIBILITY_OPTIONS
}) => {
  const bulletPoints = PRODUCT_BULLET_POINTS[selectedProduct][plan];

  const renderIndividualInfoFields = () => {
    switch (selectedProduct) {
      case 'STD':
        return (
          <>
          </>
        );
      default:
        return null;
    }
  };

  const renderProductBoxFields = () => {
    return (
      <>
        <Select
  value={productEligibility[selectedProduct]}
  onValueChange={(value: string) => handleEligibilityChange(value as EligibilityOption)}
>
  <SelectTrigger className="w-full sm:w-[180px]">
    <SelectValue placeholder="Select eligibility" />
  </SelectTrigger>
  <SelectContent>
  {PRODUCT_ELIGIBILITY_OPTIONS[selectedProduct].map((option) => (
    <SelectItem key={option} value={option}>{option}</SelectItem>
  ))}
</SelectContent>
</Select>
  
        {['LTD', 'Accidents', 'Dental', 'Vision'].includes(selectedProduct) && (
          <RadioGroup
            value={plan}
            onValueChange={(value: string) => setPlan(value as Plan)}
            className="flex space-x-4"
          >
            <RadioGroupItem value="Basic">Basic</RadioGroupItem>
            <RadioGroupItem value="Premium">Premium</RadioGroupItem>
          </RadioGroup>
        )}
  
        {selectedProduct === 'Life / AD&D' && (  
          <>
            <div>
              <Label htmlFor="employeeElectedCoverage">Employee Elected Coverage</Label>
              <Input
                id="employeeElectedCoverage"
                name="employeeElectedCoverage"
                type="number"
                value={lifeAddInfo.employeeElectedCoverage}
                onChange={handleLifeAddInfoChange}
              />
              {errors.employeeElectedCoverage && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.employeeElectedCoverage}</AlertDescription>
                </Alert>
              )}
            </div>
            {(productEligibility[selectedProduct] === 'Individual + Spouse' ||
              productEligibility[selectedProduct] === 'Family') && (
                <div>
                  <Label htmlFor="spouseElectedCoverage">Spouse Elected Coverage</Label>
                  <Input
                    id="spouseElectedCoverage"
                    name="spouseElectedCoverage"
                    type="number"
                    value={lifeAddInfo.spouseElectedCoverage}
                    onChange={handleLifeAddInfoChange}
                  />
                  {errors.spouseElectedCoverage && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.spouseElectedCoverage}</AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            {(productEligibility[selectedProduct] === 'Individual + Children' ||
              productEligibility[selectedProduct] === 'Family') && (
                <div>
                  <Label htmlFor="numberOfChildren">Number of Children</Label>
                  <Input
                    id="numberOfChildren"
                    name="numberOfChildren"
                    type="number"
                    value={lifeAddInfo.numberOfChildren}
                    onChange={handleLifeAddInfoChange}
                  />
                </div>
              )}
          </>
        )}
      </>
    );
  };

  const formattedPremium = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(costView === 'Month' ? premium : premium / 2);

  return (
    <Card className='border-solid border-2'>
      <CardHeader className="sticky top-0 bg-white z-10 flex justify-between items-center">
        <h3 className="text-lg font-semibold">{selectedProduct}</h3>
        <div className="flex space-x-4">
          {renderProductBoxFields()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 relative">
        <ul className="list-disc list-inside mt-2">
          {bulletPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
        {renderIndividualInfoFields()}
        <div className="bottom-0 right-0 p-4">
          <p className="text-lg font-semibold">{costView} Premium: {formattedPremium}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;