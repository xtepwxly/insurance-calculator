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

// Utility functions or constants can be added here
const getAgeBandedRate = (age: number): number => {
  const ageBand = AGE_BANDED_RATES_LIFE.find(band => age >= band.minAge && age <= band.maxAge);
  return ageBand ? ageBand.rate : 0;
};
export function calculatePremiumByCostView(premium: number, costView: CostView): number {
  switch (costView) {
    case 'Monthly':
      return premium;
      case 'Weekly':
        return premium / 4;  
    case 'Semi-Monthly':
      return premium / 2;
    case 'Annual':
      return premium * 12;
    default:
      console.warn(`Unexpected cost view: ${costView}. Returning monthly premium.`);
      return premium;
  }
}

export const getCostViewDivisor = (costView: CostView): number => {
  switch (costView) {
    case 'Monthly': return 12;
    case 'Semi-Monthly': return 24;
    case 'Weekly': return 52;
    default: return 12; // Default to Monthly
  }
};

export const calculateLifeADDPremium = (coverageAmount: number, age: number, spouseCoverageAmount: number, numberOfChildren: number): number => {
  const ageBandedRate = getAgeBandedRate(age);

  const individualUnits = Math.min(coverageAmount / 1000, 150);
  const individualPremium = individualUnits * ageBandedRate;

  const spouseUnits = Math.min(spouseCoverageAmount / 1000, 20);
  const spousePremium = spouseUnits * ageBandedRate;

  const childrenPremium = numberOfChildren > 0 ? 2.5 : 0;

  return individualPremium + spousePremium + childrenPremium;
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
    const grossWeeklyIncome = Math.min(annualSalary / 52, STD_CONFIG.maxCoveredWeeklyIncome);
    const grossWeeklyBenefitAmount = Math.min(grossWeeklyIncome * STD_CONFIG.benefitPercentage, STD_CONFIG.maxWeeklyBenefit);
    const units = Math.min(grossWeeklyBenefitAmount / 10, STD_CONFIG.maxUnits);
    const ageBandedRate = AGE_BANDED_RATES.find(band => age >= band.minAge && age <= band.maxAge)?.rate || 0.66;
    return units * ageBandedRate;
  },

  LTD: (_age, annualSalary, plan, _lifeAddInfo, _eligibility, _zipCode, _state) => {
    const grossMonthlyIncome = annualSalary / 12;
    const { maxBenefit, costPerHundred } = LTD_CONFIG[plan];
    const units = Math.min(grossMonthlyIncome / 100, maxBenefit / 100);
    console.log("gross monthly", grossMonthlyIncome)
    console.log("units", units)
    console.log("total", units * costPerHundred)
    return units * costPerHundred;
  },

  'Life / AD&D': (age, _annualSalary, _plan, lifeAddInfo, eligibility, _zipCode, _state) => {
    const { employeeElectedCoverage, spouseElectedCoverage, numberOfChildren } = lifeAddInfo;

    const individualUnits = Math.min(employeeElectedCoverage / 1000, 150);
    const individualPremium = individualUnits * getAgeBandedRate(age);

    const spouseUnits = Math.min(spouseElectedCoverage / 1000, 20);
    const spousePremium = spouseUnits * getAgeBandedRate(age);

    const childrenPremium = numberOfChildren > 0 ? 2.5 : 0;

    return individualPremium + spousePremium + childrenPremium;
  },

  Accidents: (_age, _annualSalary, plan, _lifeAddInfo, eligibility, _zipCode, _state) =>
    ACCIDENT_PREMIUMS[plan][eligibility],

  Dental: (_age, _annualSalary, plan, _lifeAddInfo, eligibility, zipCode, _state) => {
    // Check if the eligibility is supported for Dental
    if (!PRODUCT_ELIGIBILITY_OPTIONS.Dental.includes(eligibility)) {
      console.warn(`Unsupported eligibility option for Dental: ${eligibility}`);
      return 0;
    }
    const region = getZipCodeRegion(zipCode);

    if (
      DENTAL_PREMIUMS[plan] &&
      DENTAL_PREMIUMS[plan][region] &&
      DENTAL_PREMIUMS[plan][region][eligibility]
    ) {
      return DENTAL_PREMIUMS[plan][region][eligibility];
    } else {
      console.warn(`No premium found for Dental: plan=${plan}, region=${region}, eligibility=${eligibility}`);
      return 0;
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

  export const calculatePremiums = (
    individualInfo: IndividualInfo,
    plan: Plan,
    lifeAddInfo: LifeAddInfo,
    productEligibility: Record<Product, EligibilityOption>,
    selectedProduct: Product,
    costView: CostView
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
  const divisor = getCostViewDivisor(costView);
  const adjustedPremium = (premium * 12) / divisor; // Convert to selected cost view
  console.log("Premium", premium)
  console.log("divisor", divisor)
  console.log("adjusted premium", {[selectedProduct]: adjustedPremium} )

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
