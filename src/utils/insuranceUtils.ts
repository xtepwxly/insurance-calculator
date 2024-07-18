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
  US_STATES
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
  CRITICAL_ILLNESS_RATES
} from './insuranceConfig';

// Utility functions or constants can be added here
const getAgeBandedRate = (age: number): number => {
  const band = AGE_BANDED_RATES.find(band => age >= band.minAge && age <= band.maxAge);
  return band ? band.rate : AGE_BANDED_RATES[AGE_BANDED_RATES.length - 1].rate;
};

const getZipCodeRegion = (zipCode: string): number => {
  const region = Object.entries(ZIP_CODE_REGIONS).find(([_, zips]) =>
    zips.some(zipPrefix => zipCode.startsWith(zipPrefix))
  );
  return region ? parseInt(region[0]) : 1; // Default to region 1 if not found
};

const getStateCategory = (state: USState): string => {
  return Object.keys(STATE_CATEGORIES).find(category => STATE_CATEGORIES[category].includes(state)) || 'Other';
};

type PremiumCalculation = {
  [K in Product]: (
    age: number,
    annualSalary: number,
    plan: Plan,
    lifeAddInfo: LifeAddInfo,
    eligibility: EligibilityOption,
    zipCode: string,
    state: USState
  ) => number;
};

type CriticalIllnessAgeGroup = keyof typeof CRITICAL_ILLNESS_RATES;

const getCriticalIllnessRate = (age: number, eligibility: EligibilityOption): number => {
  let ageGroup: CriticalIllnessAgeGroup;

  if (age < 24) ageGroup = '<24';
  else if (age >= 75) ageGroup = '75+';
  else {
    const lowerBound = Math.floor(age / 5) * 5;
    const upperBound = lowerBound + 4;
    ageGroup = `${lowerBound}-${upperBound}` as CriticalIllnessAgeGroup;
  }

  return CRITICAL_ILLNESS_RATES[ageGroup][eligibility];
};

const PREMIUM_CALCULATIONS: PremiumCalculation = {
  STD: (age, annualSalary, _plan, _lifeAddInfo, _eligibility, _zipCode, _state) => {
    const grossWeeklyIncome = annualSalary / 52;
    const grossWeeklyBenefitAmount = Math.min(grossWeeklyIncome * STD_CONFIG.benefitPercentage, STD_CONFIG.maxWeeklyBenefit);
    const units = Math.min(grossWeeklyBenefitAmount / 10, STD_CONFIG.maxUnits);
    return units * getAgeBandedRate(age);
  },

  LTD: (_age, annualSalary, plan, _lifeAddInfo, _eligibility, _zipCode, _state) => {
    const grossMonthlyIncome = annualSalary / 12;
    const { maxBenefit, costPerHundred } = LTD_CONFIG[plan];
    const units = Math.min(grossMonthlyIncome / 100, maxBenefit / 100);
    return units * costPerHundred;
  },

  'Life / AD&D': (age, _annualSalary, _plan, lifeAddInfo, eligibility, _zipCode, _state) => {
    const { employeeElectedCoverage, spouseElectedCoverage, numberOfChildren } = lifeAddInfo;
    const ageFactor = age / 100;
    let totalCoverage = employeeElectedCoverage;
    if (eligibility.includes('Spouse')) totalCoverage += spouseElectedCoverage;
    if (eligibility.includes('Children')) totalCoverage += numberOfChildren * LIFE_ADD_CONFIG.childCoverage;
    return (totalCoverage / 1000) * LIFE_ADD_CONFIG.baseRate * (1 + ageFactor);
  },

  Accidents: (_age, _annualSalary, plan, _lifeAddInfo, eligibility, _zipCode, _state) =>
    ACCIDENT_PREMIUMS[plan][eligibility],

  Dental: (_age, _annualSalary, plan, _lifeAddInfo, eligibility, zipCode, _state) => {
    const getZipCodeRegion = (zipCode: string): number => {
      for (const [region, prefixes] of Object.entries(ZIP_CODE_REGIONS)) {
        if (prefixes.some(prefix => zipCode.startsWith(prefix))) {
          return parseInt(region);
        }
      }
      return 1; // Default to region 1 if no match is found
    };
      const region = getZipCodeRegion(zipCode);
  
  // Ensure the plan, region, and eligibility exist in DENTAL_PREMIUMS
  if (
    DENTAL_PREMIUMS[plan] &&
    DENTAL_PREMIUMS[plan][region] &&
    DENTAL_PREMIUMS[plan][region][eligibility]
  ) {
    return DENTAL_PREMIUMS[plan][region][eligibility];
  } else {
    console.warn(`No premium found for Dental: plan=${plan}, region=${region}, eligibility=${eligibility}`);
    return 0; // Return 0 or some default value if the specific combination is not found
  }
},
  

  Vision: (_age, _annualSalary, plan, _lifeAddInfo, eligibility, _zipCode, state) => {
    const stateCategory = getStateCategory(state);
    return VISION_PREMIUMS[stateCategory][plan][eligibility];
  },

  'Critical Illness/Cancer': (age, _annualSalary, _plan, _lifeAddInfo, eligibility, _zipCode, _state) => {
    return getCriticalIllnessRate(age, eligibility);
  }
};
export const PRODUCT_ELIGIBILITY_OPTIONS: Record<string, string[]> = {
  LTD: ['Individual'],
  STD: ['Individual'],
  'Life / AD&D': ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'],
  Accidents: ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'],
  Dental: ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'],
  Vision: ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'],
  'Critical Illness/Cancer': ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'],
};
export const calculatePremiums = (
  individualInfo: IndividualInfo,
  plan: Plan,
  lifeAddInfo: LifeAddInfo,
  productEligibility: Record<Product, EligibilityOption>,
  selectedProduct: Product
): Record<Product, number> => {
  const { age, annualSalary, zipCode, state } = individualInfo;
  const calculatePremium = PREMIUM_CALCULATIONS[selectedProduct];

  if (!calculatePremium) return { [selectedProduct]: 0 } as Record<Product, number>;

  const premium = calculatePremium(
    age,
    annualSalary,
    plan,
    lifeAddInfo,
    productEligibility[selectedProduct],
    zipCode,
    state
  );

  return { [selectedProduct]: premium } as Record<Product, number>;
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
  ACCIDENT_PREMIUMS
};
