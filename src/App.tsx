import React, { useState, useCallback, useEffect } from 'react';
import './styles/global.css';
import './styles/ProductTabs.css';
import './styles/App.css';
import { Product, IndividualInfo, Plan, USState, CostView } from './utils/insuranceTypes';
import { calculatePremiums, } from './utils/insuranceUtils';
import CostEstimate from './components/CostEstimate';
import ProductDetails from './components/ProductDetails';
import IndividualInfoForm from './components/IndividualInfoForm';
import ActiveProductsList from './components/ActiveProductsToggle';
import { findStateByZipCode } from './utils/loadStateFromZip';
import { CardContent, CardHeader, Card } from 'components/ui/card';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from 'components/ui/select';
import Tabs from 'components/ui/tabs';
import ProductSelector from 'components/ProductSelector';
import { PRODUCTS } from './utils/insuranceConfig';

type PremiumResult = Record<Product, number>;

const initialIndividualInfo: IndividualInfo = {
  businessZipCode: '07030',
  businessEmployees: 3,
  state: 'NJ' as USState,
  owner: {
    age: 45,
    annualSalary: 200000,
    eligibility: 'Individual',
    employeeCoverage: 150000,
    spouseCoverage: 20000,
    numberOfChildren: 2,
  },
  employee: {
    age: 35,
    annualSalary: 30000,
    eligibility: 'Individual',
    employeeCoverage: 150000,
    spouseCoverage: 20000,
    numberOfChildren: 2,
  }
};

const initialProducts: Record<Product, boolean> = {
  LTD: true, STD: true, 'Life / AD&D': true, Accident: true, Vision: true, Dental: true, 'Critical Illness/Cancer': true
};

const initialPremiums: PremiumResult = {
  LTD: 0,
  STD: 0,
  'Life / AD&D': 0,
  Accident: 0,
  Vision: 0,
  Dental: 0,
  'Critical Illness/Cancer': 0
};

function App() {
  const [individualInfo, setIndividualInfo] = useState<IndividualInfo>(initialIndividualInfo);
  const [selectedProduct, setSelectedProduct] = useState<Product>('LTD');
  const [costView, setCostView] = useState<CostView>('Monthly');
  const [plan, setPlan] = useState<Plan>('Basic');
  const [products, setProducts] = useState<Record<Product, boolean>>(initialProducts);
  const [premiums, setPremiums] = useState<PremiumResult>(initialPremiums);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { name: string; value: string | number },
    personType: 'owner' | 'employee' | 'business'
  ) => {
    const name = 'target' in e ? e.target.name : e.name;
    const value = 'target' in e ? e.target.value : e.value;
    
    setIndividualInfo((prev) => {
      if (name === 'businessZipCode' || name === 'businessEmployees') {
        console.log({ ...prev, [name]: value })
        return { ...prev, [name]: parseInt(value as string, 10)};
      } else {
        console.log({
          ...prev,
          [personType]: {
            ...prev[personType],
            [name]: value,
          }
        })
        return {
          ...prev,
          [personType]: {
            ...prev[personType],
            [name]: value,
          }
        };
      }
    });
  }, []);

  const [productPlans, setProductPlans] = useState<Record<Product, Plan>>(() => 
    PRODUCTS.reduce((acc, product) => ({
      ...acc,
      [product]: product === 'STD' ? 'Basic' : 'Basic'
    }), {} as Record<Product, Plan>)
  );

  const setProductPlan = useCallback((product: Product, plan: Plan) => {
    setProductPlans(prev => ({ ...prev, [product]: plan }));
  }, []);

  const recalculatePremium = useCallback((product: Product, plan: Plan) => {
    // For LTD, only recalculate if annualSalary or plan changes
  if (product === 'LTD') {
    const newPremium = calculatePremiums(individualInfo, plan, product, costView);
    setPremiums(prev => ({
      ...prev,
      [product]: newPremium 
    }));
  } else {
    // For other products, recalculate as before
    const newPremium = calculatePremiums(individualInfo, plan, product, costView);
    setPremiums(prev => ({
      ...prev,
      [product]: newPremium 
    }));
  }
}, [individualInfo, costView, calculatePremiums]);

  // const handleCalculate = () => {
  //   setIsExpanded(false);
  //   setPremiums(calculateAllPremiums());
  // };

  const calculateAllPremiums = useCallback(() => {
    const allPremiums: PremiumResult = { ...initialPremiums };
    PRODUCTS.forEach(product => {
      allPremiums[product] = calculatePremiums(individualInfo, plan, product, costView);
    });

    return allPremiums;
  }, [individualInfo, costView]);

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
    ['owner', 'employee'].forEach((personType) => {
      const person = individualInfo[personType as 'owner' | 'employee'];
      if (person.employeeCoverage < 5000 || person.employeeCoverage > 150000) {
        newErrors[`${personType}EmployeeCoverage`] = 'Employee coverage must be between $5,000 and $150,000';
      }
      if (person.spouseCoverage > Math.min(person.employeeCoverage * 0.5, 20000)) {
        newErrors[`${personType}SpouseCoverage`] = 'Spouse coverage cannot exceed 50% of employee coverage or $20,000, whichever is less';
      }
    });
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }, [individualInfo]);

  useEffect(() => {
    validateInputs();
  }, [validateInputs]);

  const [activeTab, setActiveTab] = useState<'business' | 'owner' | 'employees'>('business');
  // const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="top-0 left-0 p-4">
        <h1 className="text-center text-2xl font-bold">Ask Paul</h1>
      </div>
      <div className="container mx-auto p-4 flex flex-grow overflow-y-auto md:pr-10">
        <div className="main-container flex w-full md:gap-24">
          <div className="md:w-3/4 flex flex-col items-center">
            <div className="w-full md:mb-2 p-1 md:mt-2">
              <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <IndividualInfoForm
                  individualInfo={individualInfo}
                  handleIndividualInfoChange={handleInputChange}
                  errors={errors}
                  activeTab={activeTab}
                />
              {/* {isExpanded && (
                <button
                  onClick={handleCalculate}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Calculate
                </button>
              )} */}
            </div>
            <div className="product-tabs-container">
                <ProductSelector
                  selectedProduct={selectedProduct}
                  setSelectedProduct={setSelectedProduct}
                  products={PRODUCTS}
                />
            <div className="w-full">
            <ProductDetails
              selectedProduct={selectedProduct}
              plans={productPlans}
              setProductPlan={setProductPlan}
              premium={premiums[selectedProduct]}
              individualInfo={individualInfo}
              handleIndividualInfoChange={handleInputChange}
              errors={errors}
              costView={costView}
              recalculatePremium={recalculatePremium}  // Add this line
              personType={activeTab === 'owner' ? 'owner' : 'employee'}

            />
              </div>
            </div>
          </div>
          <div className="rightrail w-1/4 space-y-4 overflow-y-auto">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Cost View</span>
              <Select
                value={costView}
                onValueChange={(value: CostView) => setCostView(value)}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue>{costView}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Semi-Monthly">Semi-Monthly</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Annual">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <CostEstimate
              totalPremium={calculateTotalPremium()}
              costView={costView}
              businessEmployees={individualInfo.businessEmployees}
            />
            <ActiveProductsList
              products={products}
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