// App.js
import React, { useState, useCallback, useEffect } from 'react';
import CostEstimate from './components/CostEstimate';
import ProductSelector from './components/ProductSelector';
import ProductDetails from './components/ProductDetails';
import IndividualInfoForm from './components/IndividualInfoForm';
import ActiveProductsToggle from './components/ActiveProductsToggle';
import { calculatePremiums, PRODUCTS } from './utils/insuranceUtils';

function App() {
  const [individualInfo, setIndividualInfo] = useState({ age: 45, annualSalary: 400000, zipCode: '07030', state: 'NJ' });
  const [selectedProduct, setSelectedProduct] = useState('LTD');
  const [costView, setCostView] = useState('Monthly');
  const [plan, setPlan] = useState('Basic');
  const [products, setProducts] = useState({
    LTD: true, STD: true, 'Life / AD&D': false, Accidents: true, Vision: false, Dental: false, 'Critical Illness/Cancer': false
  });
  const [productEligibility, setProductEligibility] = useState(
    Object.fromEntries(PRODUCTS.map(product => [product, 'Individual']))
  );
  const [lifeAddInfo, setLifeAddInfo] = useState({
    employeeElectedCoverage: 150000,
    spouseElectedCoverage: 0,
    numberOfChildren: 0
  });
  const [premiums, setPremiums] = useState({});
  const [errors, setErrors] = useState({});

  const handleIndividualInfoChange = (e) => {
    const { name, value } = e.target;
    setIndividualInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleProductToggle = (product) => {
    setProducts(prev => ({ ...prev, [product]: !prev[product] }));
  };

  const handleEligibilityChange = (eligibility) => {
    setProductEligibility(prev => ({ ...prev, [selectedProduct]: eligibility }));
  };

  const handleLifeAddInfoChange = (e) => {
    const { name, value } = e.target;
    setLifeAddInfo(prev => ({ ...prev, [name]: parseInt(value, 10) }));
  };

  const calculateAllPremiums = useCallback(() => {
    const allPremiums = {};
    PRODUCTS.forEach(product => {
      console.log('products', product);
      allPremiums[product] = calculatePremiums(individualInfo, plan, lifeAddInfo, productEligibility, product)[product];
    });
    return allPremiums;
  }, [individualInfo, plan, lifeAddInfo, productEligibility]);

  useEffect(() => {
    setPremiums(calculateAllPremiums());
  }, [calculateAllPremiums]);

  const calculateTotalPremium = () => {
    return Object.entries(products)
      .filter(([_, isActive]) => isActive)
      .reduce((total, [product]) => total + (premiums[product] || 0), 0);
  };

  const validateInputs = () => {
    const newErrors: Record<string, string> = {};
    if (lifeAddInfo.employeeElectedCoverage > 150000) {
      newErrors.employeeElectedCoverage = 'Employee coverage cannot exceed $150,000';
    }
    if (lifeAddInfo.spouseElectedCoverage > 20000) {
      newErrors.spouseElectedCoverage = 'Spouse coverage cannot exceed $20,000';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateInputs();
  }, [lifeAddInfo]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Insurance Calculator</h1>
      
      <CostEstimate 
        totalPremium={calculateTotalPremium()} 
        costView={costView} 
        setCostView={setCostView} 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
          />
        </div>

        <div className="space-y-4">
          <IndividualInfoForm
            individualInfo={individualInfo}
            handleIndividualInfoChange={handleIndividualInfoChange}
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
  );
}

export default App;
