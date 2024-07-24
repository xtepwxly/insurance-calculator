// utils/insuranceUtils.ts

import {
  Product,
  EligibilityOption,
  USState,
  Plan,
  LifeAddInfo,
  IndividualInfo,
  PRODUCTS,
  ELIGIBILITY_OPTIONS,
  US_STATES,
  CostView
} from './insuranceTypes';

import {
  DENTAL_PREMIUMS,
  VISION_PREMIUMS,
  AGE_BANDED_RATES,
  ZIP_CODE_REGIONS,
  STATE_CATEGORIES,
  STD_CONFIG,
  LTD_CONFIG,
  LIFE_ADD_CONFIG,
  ACCIDENT_PREMIUMS,
  CRITICAL_ILLNESS_RATES,
  PRODUCT_ELIGIBILITY_OPTIONS,
  AGE_BANDED_RATES_LIFE
} from './insuranceConfig';

// ... (keep existing utility functions)

type PremiumCalculation = {
  [K in Product]: (
    individualInfo: IndividualInfo,
    plan: Plan,
    lifeAddInfo: LifeAddInfo,
    eligibility: EligibilityOption,
    isOwner: boolean
  ) => number;
};

const getAgeBandedRate = (age: number): number => {
  const ageBand = AGE_BANDED_RATES_LIFE.find(band => age >= band.minAge && age <= band.maxAge);
  return ageBand ? ageBand.rate : 0;
};

const getZipCodeRegion = (zipCode: string): number | null => {
  const zipPrefix = zipCode.substring(0, 3);
  for (const region in ZIP_CODE_REGIONS) {
    if (ZIP_CODE_REGIONS[region].includes(zipPrefix)) {
      return parseInt(region, 10);
    }
  }
  return null;
};

const getStateCategory = (state: USState): string => {
  return Object.keys(STATE_CATEGORIES).find(category => STATE_CATEGORIES[category].includes(state)) || 'Other';
};

const getCriticalIllnessRate = (age: number, eligibility: EligibilityOption): number => {
  let ageGroup: keyof typeof CRITICAL_ILLNESS_RATES;

  if (age < 24) ageGroup = '<24';
  else if (age >= 75) ageGroup = '75+';
  else {
    const lowerBound = Math.floor(age / 5) * 5;
    const upperBound = lowerBound + 4;
    ageGroup = `${lowerBound}-${upperBound}` as keyof typeof CRITICAL_ILLNESS_RATES;
  }

  return CRITICAL_ILLNESS_RATES[ageGroup][eligibility];
};

export function calculatePremiumByCostView(premium: number, costView: CostView): number {
  switch (costView) {
    case 'Monthly':
      return premium;
    case 'Weekly':
      return premium / 4;  // Approximately 52 weeks / 12 months
    case 'Semi-Monthly':
      return premium / 2;
    case 'Annual':
      return premium * 12;
    default:
      console.warn(`Unexpected cost view: ${costView}. Returning monthly premium.`);
      return premium;
  }
}

const PREMIUM_CALCULATIONS: PremiumCalculation = {
  STD: (individualInfo, _plan, _lifeAddInfo, _eligibility, isOwner) => {
    const { ownerAge, ownerAnnualSalary, employeeAge, employeeAnnualSalary } = individualInfo;
    const age = isOwner ? ownerAge : employeeAge;
    const annualSalary = isOwner ? ownerAnnualSalary : employeeAnnualSalary;
    
    const grossWeeklyIncome = Math.min(annualSalary / 52, STD_CONFIG.maxCoveredWeeklyIncome);
    const grossWeeklyBenefitAmount = Math.min(grossWeeklyIncome * STD_CONFIG.benefitPercentage, STD_CONFIG.maxWeeklyBenefit);
    const units = Math.min(grossWeeklyBenefitAmount / 10, STD_CONFIG.maxUnits);
    const ageBandedRate = AGE_BANDED_RATES.find(band => age >= band.minAge && age <= band.maxAge)?.rate || 0.66;
    return units * ageBandedRate;
  },

  LTD: (individualInfo, plan, _lifeAddInfo, _eligibility, isOwner) => {
    const { ownerAnnualSalary, employeeAnnualSalary } = individualInfo;
    const annualSalary = isOwner ? ownerAnnualSalary : employeeAnnualSalary;
    const grossMonthlyIncome = annualSalary / 12;
    const { maxBenefit, costPerHundred } = LTD_CONFIG[plan];
    const units = Math.min(grossMonthlyIncome / 100, maxBenefit / 100);
    return units * costPerHundred;
  },

  'Life / AD&D': (individualInfo, _plan, lifeAddInfo, _eligibility, isOwner) => {
    const { ownerAge, employeeAge } = individualInfo;
    const age = isOwner ? ownerAge : employeeAge;
    const { employeeElectedCoverage, spouseElectedCoverage, numberOfChildren } = lifeAddInfo;

    const individualUnits = Math.min(employeeElectedCoverage / 1000, 150);
    const individualPremium = individualUnits * getAgeBandedRate(age);

    const spouseUnits = Math.min(spouseElectedCoverage / 1000, 20);
    const spousePremium = spouseUnits * getAgeBandedRate(age);

    const childrenPremium = numberOfChildren > 0 ? 2.5 : 0;

    return individualPremium + spousePremium + childrenPremium;
  },

  Accidents: (individualInfo, plan, _lifeAddInfo, eligibility, _isOwner) =>
    ACCIDENT_PREMIUMS[plan][eligibility],

  Dental: (individualInfo, plan, _lifeAddInfo, eligibility, _isOwner) => {
    const { businessZipCode } = individualInfo;
    const region = getZipCodeRegion(businessZipCode);
    if (region === null) {
      console.warn(`No region found for businessZipCode: ${businessZipCode}`);
      return 0;
    }
    return DENTAL_PREMIUMS[plan][region][eligibility] || 0;
  },

  Vision: (individualInfo, plan, _lifeAddInfo, eligibility, _isOwner) => {
    const { state } = individualInfo;
    const stateCategory = getStateCategory(state);
    return VISION_PREMIUMS[stateCategory][plan][eligibility];
  },

  'Critical Illness/Cancer': (individualInfo, _plan, _lifeAddInfo, eligibility, isOwner) => {
    const { ownerAge, employeeAge } = individualInfo;
    const age = isOwner ? ownerAge : employeeAge;
    return getCriticalIllnessRate(age, eligibility);
  }
};

export const calculatePremiums = (
  individualInfo: IndividualInfo,
  plan: Plan,
  lifeAddInfo: LifeAddInfo,
  productEligibility: Record<Product, EligibilityOption>,
  selectedProduct: Product,
  costView: CostView
): Record<Product, number> => {
  const calculatePremium = PREMIUM_CALCULATIONS[selectedProduct];

  if (!calculatePremium) return { [selectedProduct]: 0 } as Record<Product, number>;

  const ownerPremium = calculatePremium(
    individualInfo,
    plan,
    lifeAddInfo,
    productEligibility[selectedProduct],
    true
  );

  const employeePremium = calculatePremium(
    individualInfo,
    plan,
    lifeAddInfo,
    productEligibility[selectedProduct],
    false
  );

  let weightedPremium: number;

  if (selectedProduct === 'LTD' || selectedProduct === 'STD') {
    weightedPremium = ownerPremium;
  } else {
    const totalEmployees = individualInfo.businessEmployees;
    weightedPremium = (ownerPremium + employeePremium * totalEmployees) / (totalEmployees + 1);
  }

  // Apply cost view adjustment
  const adjustedPremium = calculatePremiumByCostView(weightedPremium, costView);

  console.log("Owner Premium", ownerPremium);
  console.log("Employee Premium", employeePremium);
  console.log("Weighted Premium", weightedPremium);
  console.log("Adjusted Premium", adjustedPremium);

  return { [selectedProduct]: adjustedPremium } as Record<Product, number>;
};



// Use `export type` for re-exporting types
export type {
  Product,
  EligibilityOption,
  USState,
  Plan,
  LifeAddInfo,
  IndividualInfo
};

// Use `export` for re-exporting constants
export {
  PRODUCTS,
  ELIGIBILITY_OPTIONS,
  US_STATES,
  DENTAL_PREMIUMS,
  VISION_PREMIUMS,
  AGE_BANDED_RATES,
  ZIP_CODE_REGIONS,
  STATE_CATEGORIES,
  STD_CONFIG,
  LTD_CONFIG,
  LIFE_ADD_CONFIG,
  ACCIDENT_PREMIUMS,
  PRODUCT_ELIGIBILITY_OPTIONS
};
