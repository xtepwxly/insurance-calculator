import React, { useState } from 'react';
import '../styles/Dropdown.css';
import '../styles/global.css';
import { Card, CardHeader, CardContent } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';
import { Product, EligibilityOption, Plan, LifeAddInfo, IndividualInfo, CostView } from '../utils/insuranceTypes';
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
  costView: CostView;
  individualInfo: IndividualInfo;
  handleIndividualInfoChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  PRODUCT_ELIGIBILITY_OPTIONS: Record<Product, EligibilityOption[]>;
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [employeeElectedCoverage, setEmployeeElectedCoverage] = useState(formatCurrency(lifeAddInfo.employeeElectedCoverage.toString()));
  const [spouseElectedCoverage, setSpouseElectedCoverage] = useState(formatCurrency(lifeAddInfo.spouseElectedCoverage.toString()));

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option: EligibilityOption) => {
    handleEligibilityChange(option);
    setIsDropdownOpen(false);
  };

  const handleEmployeeCoverageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmployeeElectedCoverage(value);
  };

  const handleEmployeeCoverageBlur = () => {
    const formattedCoverage = formatCurrency(employeeElectedCoverage);
    setEmployeeElectedCoverage(formattedCoverage);
    handleLifeAddInfoChange({
      target: {
        name: 'employeeElectedCoverage',
        value: formattedCoverage.replace(/[^0-9]/g, ''),
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleSpouseCoverageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSpouseElectedCoverage(value);
  };

  const handleSpouseCoverageBlur = () => {
    const formattedCoverage = formatCurrency(spouseElectedCoverage);
    setSpouseElectedCoverage(formattedCoverage);
    handleLifeAddInfoChange({
      target: {
        name: 'spouseElectedCoverage',
        value: formattedCoverage.replace(/[^0-9]/g, ''),
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const renderIndividualInfoFields = () => {
    switch (selectedProduct) {
      case 'STD':
        return <></>;
      default:
        return null;
    }
  };

  const renderProductBoxFields = () => {
    return (
      <>
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
                type="text"
                value={employeeElectedCoverage}
                onChange={handleEmployeeCoverageChange}
                onBlur={handleEmployeeCoverageBlur}
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
                  type="text"
                  value={spouseElectedCoverage}
                  onChange={handleSpouseCoverageChange}
                  onBlur={handleSpouseCoverageBlur}
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

  const renderEligibilityField = () => {
    const dropdownClass = (selectedProduct === 'Life / AD&D' ? 'dropdown dropdown-wide' : 'dropdown') + ' md:min-w-52';
    return (
      <div className={dropdownClass}>
        <button className="dropdown-btn" onClick={toggleDropdown}>
          <span>{productEligibility[selectedProduct] || "Select eligibility"}</span>
          <span className={`arrow ${isDropdownOpen ? 'arrow-rotate' : ''}`}></span>
        </button>
        <ul className={`dropdown-content ${isDropdownOpen ? 'menu-open' : ''}`}>
          {PRODUCT_ELIGIBILITY_OPTIONS[selectedProduct].map((option) => (
            <li key={option} onClick={() => handleOptionClick(option)}>
              <a href="#">{option}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const formattedPremium = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(costView === 'Monthly' as CostView ? premium : premium / 2);

  return (
    <Card className='border-solid border-2'>
      <CardHeader className="sticky top-0 bg-white z-10 flex justify-between items-center">
        <h3 className="md:text-lg font-semibold">{selectedProduct}</h3>
        <div className="flex space-x-4 items-center">
          {renderProductBoxFields()}
          {renderEligibilityField()}
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
          <p className="md:text-lg font-semibold">{costView} Premium: {formattedPremium}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
