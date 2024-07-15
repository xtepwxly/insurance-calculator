// utils/insuranceUtils.js

export const PRODUCTS = ['LTD', 'STD', 'Life / AD&D', 'Accidents', 'Dental', 'Vision', 'Critical Illness/Cancer'];
export const ELIGIBILITY_OPTIONS = ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'];
export const US_STATES = ['AL', 'AK', 'AZ', /* ... all other states ... */, 'WY'];

export const zipCodeRegions = {
  1: ['350', '351', '354', /* ... other zip codes ... */],
  2: ['352', '356', '357', /* ... other zip codes ... */],
  // ... other regions ...
};

export const DENTAL_RATES = {
  Basic: {
    1: { Individual: 20.53, 'Individual + Spouse': 40.82, 'Individual + Children': 45.42, Family: 70.37 },
    2: { Individual: 22.29, 'Individual + Spouse': 44.32, 'Individual + Children': 49.2, Family: 76.29 },
    // ... other regions ...
  },
  Premium: {
    1: { Individual: 25.62, 'Individual + Spouse': 50.95, 'Individual + Children': 60.29, Family: 92.13 },
    2: { Individual: 29.12, 'Individual + Spouse': 57.93, 'Individual + Children': 68.96, Family: 104.95 },
    // ... other regions ...
  }
};

export const VISION_RATES = {
  // ... vision rates data ...
};

export const LIFE_ADD_AGE_RATES = {
  '<30': 0.11, '30-34': 0.13, '35-39': 0.15, /* ... other age ranges ... */
};

export const getAgeBandedRate = (age) => {
  // ... implementation ...
};

export const calculatePremiums = (individualInfo, plan, lifeAddInfo, productEligibility, selectedProduct) => {
  // ... implementation of premium calculations for each product ...
  return individualInfo;
};

// ... any other utility functions ...
