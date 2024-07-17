import React, { useState, useCallback, useEffect } from 'react';
import './styles/global.css'; // Add this import
import { Product, EligibilityOption, IndividualInfo, LifeAddInfo, Plan, PremiumResult } from './utils/insuranceTypes';
import { calculatePremiums, PRODUCTS, ELIGIBILITY_OPTIONS } from './utils/insuranceUtils';
import CostEstimate from './components/CostEstimate';
import ProductSelector from './components/ProductSelector';
import ProductDetails from './components/ProductDetails';
import IndividualInfoForm from './components/IndividualInfoForm';
import ActiveProductsToggle from './components/ActiveProductsToggle';

const initialIndividualInfo: IndividualInfo = {
  age: 45,
  annualSalary: 400000,
  zipCode: '07030',
  state: 'NJ'
};

const initialLifeAddInfo: LifeAddInfo = {
  employeeElectedCoverage: 150000,
  spouseElectedCoverage: 20000,
  numberOfChildren: 2
};

const initialProducts: Record<Product, boolean> = {
  LTD: true, STD: true, 'Life / AD&D': false, Accidents: true, Vision: false, Dental: false, 'Critical Illness/Cancer': false
};

function App() {
  const [individualInfo, setIndividualInfo] = useState<IndividualInfo>(initialIndividualInfo);
  const [selectedProduct, setSelectedProduct] = useState<Product>('LTD');
  const [costView, setCostView] = useState<'Monthly' | 'Bi-weekly'>('Monthly');
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
    setIndividualInfo(prev => ({ ...prev, [name]: value }));
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
      allPremiums[product] = calculatePremiums(individualInfo, plan, lifeAddInfo, productEligibility, product)[product];
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
      <div className="container mx-auto p-4 flex flex-grow overflow-y-auto">
        <div className='main-container'>
          <div className='flex'>
            <h1 className="text-2xl font-bold mb-4 text-center">JOHN</h1>
            <CostEstimate
              totalPremium={calculateTotalPremium()}
              costView={costView}
              setCostView={setCostView}
            />
          </div>
          <div className="flex px-16  gap-4">
            <div className="lg:col-span-2 space-y-4">
              <ProductSelector
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
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
                eligibilityOptions={ELIGIBILITY_OPTIONS}
              />
            </div>
          </div>

        </div>
        <div className='rightrail'>
          <div className="space-y-4">
            <IndividualInfoForm
              individualInfo={individualInfo}
              handleIndividualInfoChange={handleInputChange}
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