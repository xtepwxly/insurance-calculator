// utils/insuranceTypes.ts

export type Product = 'LTD' | 'STD' | 'Life / AD&D' | 'Accidents' | 'Dental' | 'Vision' | 'Critical Illness/Cancer';

export type EligibilityOption = 'Individual' | 'Individual + Spouse' | 'Individual + Children' | 'Family';

export type USState = 
  | 'AL' | 'AK' | 'AZ' | 'AR' | 'CA' | 'CO' | 'CT' | 'DE' | 'FL' | 'GA'
  | 'HI' | 'ID' | 'IL' | 'IN' | 'IA' | 'KS' | 'KY' | 'LA' | 'ME' | 'MD'
  | 'MA' | 'MI' | 'MN' | 'MS' | 'MO' | 'MT' | 'NE' | 'NV' | 'NH' | 'NJ'
  | 'NM' | 'NY' | 'NC' | 'ND' | 'OH' | 'OK' | 'OR' | 'PA' | 'RI' | 'SC'
  | 'SD' | 'TN' | 'TX' | 'UT' | 'VT' | 'VA' | 'WA' | 'WV' | 'WI' | 'WY';

export type Plan = 'Basic' | 'Premium';

export interface LifeAddInfo {
  employeeElectedCoverage: number;
  spouseElectedCoverage: number;
  numberOfChildren: number;
}

export interface IndividualInfo {
  age: number;
  annualSalary: number;
  zipCode: string;
  state: USState;
}

export type CostView = 'Monthly' | 'Semi-Monthly' | 'Bi-Weekly' | 'Weekly';

export interface PremiumResult {
  [key: string]: number;
}

// If you need to export the arrays of options, you can do so like this:
export const PRODUCTS: Product[] = ['LTD', 'STD', 'Life / AD&D', 'Accidents', 'Dental', 'Vision', 'Critical Illness/Cancer'];
export const ELIGIBILITY_OPTIONS: EligibilityOption[] = ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'];
export const US_STATES: USState[] = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];