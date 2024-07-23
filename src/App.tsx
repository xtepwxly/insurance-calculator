import React, { useState, useCallback, useEffect } from 'react';
import './styles/global.css';
import './styles/ProductTabs.css';
import './styles/App.css';
import { Product, EligibilityOption, IndividualInfo, LifeAddInfo, Plan, PremiumResult, USState, CostView } from './utils/insuranceTypes';
import { calculatePremiums, PRODUCTS, ELIGIBILITY_OPTIONS, PRODUCT_ELIGIBILITY_OPTIONS } from './utils/insuranceUtils';
import CostEstimate from './components/CostEstimate';
import ProductSelector from './components/ProductSelector';
import ProductDetails from './components/ProductDetails';
import IndividualInfoForm from './components/IndividualInfoForm';
import ActiveProductsToggle from './components/ActiveProductsToggle';
import { findStateByZipCode } from './utils/loadStateFromZip';
import {CardContent, CardHeader, Card } from 'components/ui/card';
import {Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from 'components/ui/select';


const initialIndividualInfo: IndividualInfo = {
  age: 45,
  annualSalary: 400000,
  zipCode: '07030',
  state: 'NJ' as USState
};

const initialLifeAddInfo: LifeAddInfo = {
  employeeElectedCoverage: 150000,
  spouseElectedCoverage: 20000,
  numberOfChildren: 2,
};

const initialProducts: Record<Product, boolean> = {
  LTD: true, STD: true, 'Life / AD&D': false, Accidents: true, Vision: false, Dental: false, 'Critical Illness/Cancer': false
};

function App() {
  const [individualInfo, setIndividualInfo] = useState<IndividualInfo>(initialIndividualInfo);
  const [selectedProduct, setSelectedProduct] = useState<Product>('LTD');
  const [costView, setCostView] = useState<CostView>('Monthly');
  const [plan, setPlan] = useState<Plan>('Basic');
  const [products, setProducts] = useState<Record<Product, boolean>>(initialProducts);
  const [productEligibility, setProductEligibility] = useState<Record<Product, EligibilityOption>>(
    Object.fromEntries(PRODUCTS.map(product => [product, 'Individual'])) as Record<Product, EligibilityOption>
  );
  const [lifeAddInfo, setLifeAddInfo] = useState<LifeAddInfo>(initialLifeAddInfo);
  const [premiums, setPremiums] = useState<PremiumResult>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setIndividualInfo((prev) => {
      const updatedInfo = { ...prev, [name]: value };
      if (name === 'zipCode' && value.length === 5) {
        const state = findStateByZipCode(value) as USState | null;
        return { ...updatedInfo, state: state ?? prev.state };
      }
      return updatedInfo;
    });
  }, []);

  const handleProductToggle = useCallback((product: Product) => {
    setProducts(prev => ({ ...prev, [product]: !prev[product] }));
  }, []);

  const handleEligibilityChange = useCallback((eligibility: EligibilityOption) => {
    setProductEligibility(prev => ({ ...prev, [selectedProduct]: eligibility }));
  }, [selectedProduct]);

  const handleLifeAddInfoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLifeAddInfo(prev => ({ ...prev, [name]: parseInt(value, 10) }));
  }, []);

  const calculateAllPremiums = useCallback(() => {
    const allPremiums: PremiumResult = {};
    PRODUCTS.forEach(product => {
      allPremiums[product] = calculatePremiums(individualInfo, plan, lifeAddInfo, productEligibility, product, costView)[product];
    });
    return allPremiums;
  }, [individualInfo, plan, lifeAddInfo, productEligibility]);

  useEffect(() => {
    setPremiums(calculateAllPremiums());
  }, [calculateAllPremiums]);

  const calculateTotalPremium = useCallback(() => {
    return Object.entries(products)
      .filter(([_, isActive]) => isActive)
      .reduce((total, [product]) => total + (premiums[product] || 0), 0);
  }, [products, premiums]);

  const validateInputs = useCallback(() => {
    const newErrors: Record<string, string> = {};
    if (lifeAddInfo.employeeElectedCoverage > 150000) {
      newErrors.employeeElectedCoverage = 'Employee coverage cannot exceed $150,000';
    }
    if (lifeAddInfo.spouseElectedCoverage > 20000) {
      newErrors.spouseElectedCoverage = 'Spouse coverage cannot exceed $20,000';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [lifeAddInfo]);

  useEffect(() => {
    validateInputs();
  }, [validateInputs]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="top-0 left-0 p-4">
        <h1 className="text-center text-2xl font-bold">Ask Paul</h1>
      </div>
      <div className="container mx-auto p-4 flex flex-grow overflow-y-auto md:pr-10">
        <div className="main-container flex w-full md:gap-24">
          <div className="md:w-3/4 flex flex-col items-center">
            <div className="w-full md:mb-4 md:mt-16">
              <IndividualInfoForm
                individualInfo={individualInfo}
                handleIndividualInfoChange={handleInputChange}
              />
            </div>
            <div className="w-full">
              <div className="product-tabs-container">
                <ProductSelector
                  selectedProduct={selectedProduct}
                  setSelectedProduct={setSelectedProduct}
                  products={PRODUCTS}
                />
                <ProductDetails
                  selectedProduct={selectedProduct}
                  productEligibility={productEligibility}
                  handleEligibilityChange={handleEligibilityChange}
                  plan={plan}
                  setPlan={setPlan}
                  premium={premiums[selectedProduct]}
                  lifeAddInfo={lifeAddInfo}
                  handleLifeAddInfoChange={handleLifeAddInfoChange}
                  errors={errors}
                  costView={costView}
                  individualInfo={individualInfo}
                  handleIndividualInfoChange={handleInputChange}
                  PRODUCT_ELIGIBILITY_OPTIONS={PRODUCT_ELIGIBILITY_OPTIONS}
                />
              </div>
            </div>
          </div>
          <div className="rightrail w-1/4 space-y-4 overflow-y-auto">
          <CardHeader className="md:text-lg font-semibold flex justify-between items-center">
          Cost View
          <Select 
        value={costView} 
        onValueChange={(value: CostView) => setCostView(value)}
      >
                <SelectTrigger className="w-[180px]">
          <SelectValue>{costView}</SelectValue>
        </SelectTrigger>

  <SelectContent>
    <SelectItem value="Monthly">Monthly</SelectItem>
    <SelectItem value="Semi-Monthly">Semi-Monthly</SelectItem>
    <SelectItem value="Weekly">Weekly</SelectItem>
    <SelectItem value="Annual">Annual</SelectItem>
  </SelectContent>
</Select>
        </CardHeader>
        <CostEstimate
              totalPremium={calculateTotalPremium()}
              costView={costView}
              setCostView={setCostView}
            />
            <ActiveProductsToggle
              products={products}
              handleProductToggle={handleProductToggle}
              premiums={premiums}
              costView={costView}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;