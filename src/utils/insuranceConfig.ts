// utils/insuranceConfig.ts

import { Product, EligibilityOption, USState, Plan } from './insuranceTypes';

export const PRODUCTS: Product[] = ['LTD', 'STD', 'Life / AD&D', 'Accident', 'Dental', 'Vision', 'Critical Illness/Cancer'];

export const ELIGIBILITY_OPTIONS: EligibilityOption[] = ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'];

export const US_STATES: USState[] = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export const PRODUCT_ELIGIBILITY_OPTIONS: Record<Product, EligibilityOption[]> = {
  LTD: ['Individual'],
  STD: ['Individual'],
  'Life / AD&D': ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'],
  Accident: ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'],
  Dental: ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'],
  Vision: ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'],
  'Critical Illness/Cancer': ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'],
};

export const AGE_BANDED_RATES = [
  { minAge: 0, maxAge: 29, rate: 0.25 },
  { minAge: 30, maxAge: 34, rate: 0.25 },
  { minAge: 35, maxAge: 39, rate: 0.25 },
  { minAge: 40, maxAge: 44, rate: 0.25 },
  { minAge: 45, maxAge: 49, rate: 0.30 },
  { minAge: 50, maxAge: 54, rate: 0.38 },
  { minAge: 55, maxAge: 59, rate: 0.46 },
  { minAge: 60, maxAge: 64, rate: 0.55 },
  { minAge: 65, maxAge: 120, rate: 0.66 }
];

export const AGE_BANDED_RATES_LIFE = [
  { minAge: 0, maxAge: 29, rate: 0.11 },
  { minAge: 30, maxAge: 34, rate: 0.13 },
  { minAge: 35, maxAge: 39, rate: 0.15 },
  { minAge: 40, maxAge: 44, rate: 0.18 },
  { minAge: 45, maxAge: 49, rate: 0.26 },
  { minAge: 50, maxAge: 54, rate: 0.40 },
  { minAge: 55, maxAge: 59, rate: 0.59 },
  { minAge: 60, maxAge: 64, rate: 0.89 },
  { minAge: 65, maxAge: 69, rate: 1.68 },
  { minAge: 70, maxAge: Infinity, rate: 2.71 },
];

export const ACCIDENT_PREMIUMS: Record<Plan, Record<EligibilityOption, number>> = {
  Basic: { Individual: 7.94, 'Individual + Spouse': 15.07, 'Individual + Children': 18.89, Family: 22.27 },
  Premium: { Individual: 11.74, 'Individual + Spouse': 23.05, 'Individual + Children': 27.68, Family: 32.67 }
};

export const VISION_PREMIUMS: Record<string, Record<Plan, Record<EligibilityOption, number>>> = {
  AK: {
    Basic: { Individual: 9.86, 'Individual + Spouse': 19.78, 'Individual + Children': 16.74, Family: 27.61 },
    Premium: { Individual: 12.23, 'Individual + Spouse': 24.52, 'Individual + Children': 20.75, Family: 34.23 }
  },
  'CA,CT,HI,NJ,NV,WA': {
    Basic: { Individual: 8.43, 'Individual + Spouse': 16.91, 'Individual + Children': 14.32, Family: 23.60 },
    Premium: { Individual: 10.51, 'Individual + Spouse': 21.07, 'Individual + Children': 17.84, Family: 29.41 }
  },
  Other: {
    Basic: { Individual: 7.56, 'Individual + Spouse': 15.15, 'Individual + Children': 12.83, Family: 21.15 },
    Premium: { Individual: 9.48, 'Individual + Spouse': 19.00, 'Individual + Children': 16.08, Family: 26.52 }
  }
};

export const DENTAL_PREMIUMS: Record<Plan, Record<number, Record<EligibilityOption, number>>> = {
  Basic: {
    1: { Individual: 20.53, 'Individual + Spouse': 40.82, 'Individual + Children': 45.42, Family: 70.37 },
    2: { Individual: 22.29, 'Individual + Spouse': 44.32, 'Individual + Children': 49.2, Family: 76.29 },
    3: { Individual: 23.6, 'Individual + Spouse': 46.94, 'Individual + Children': 52.39, Family: 81.14 },
    4: { Individual: 25, 'Individual + Spouse': 49.71, 'Individual + Children': 55.29, Family: 85.69 },
    5: { Individual: 28.29, 'Individual + Spouse': 56.25, 'Individual + Children': 62.64, Family: 97.06 },
    6: { Individual: 29.38, 'Individual + Spouse': 58.39, 'Individual + Children': 64.83, Family: 100.5 },
    7: { Individual: 31.97, 'Individual + Spouse': 63.54, 'Individual + Children': 70.54, Family: 109.37 },
    8: { Individual: 34.09, 'Individual + Spouse': 67.77, 'Individual + Children': 75.24, Family: 116.65 },
    9: { Individual: 38.03, 'Individual + Spouse': 75.56, 'Individual + Children': 84.01, Family: 130.19 },
    10: { Individual: 39.75, 'Individual + Spouse': 79.03, 'Individual + Children': 87.81, Family: 136.13 }
  },
  Premium: {
    1: { Individual: 25.62, 'Individual + Spouse': 50.95, 'Individual + Children': 60.29, Family: 92.13 },
    2: { Individual: 29.12, 'Individual + Spouse': 57.93, 'Individual + Children': 68.96, Family: 104.95 },
    3: { Individual: 31.92, 'Individual + Spouse': 63.44, 'Individual + Children': 73.24, Family: 112.55 },
    4: { Individual: 34.51, 'Individual + Spouse': 68.63, 'Individual + Children': 79.38, Family: 121.93 },
    5: { Individual: 39.26, 'Individual + Spouse': 78.07, 'Individual + Children': 89.58, Family: 137.84 },
    6: { Individual: 41.63, 'Individual + Spouse': 82.82, 'Individual + Children': 94.55, Family: 145.69 },
    7: { Individual: 45.92, 'Individual + Spouse': 91.33, 'Individual + Children': 104.93, Family: 161.42 },
    8: { Individual: 50.35, 'Individual + Spouse': 100.12, 'Individual + Children': 114.26, Family: 176.06 },
    9: { Individual: 56.31, 'Individual + Spouse': 111.99, 'Individual + Children': 125.54, Family: 194.25 },
    10: { Individual: 63.18, 'Individual + Spouse': 125.63, 'Individual + Children': 140.87, Family: 217.93 }
  }
};

export const CRITICAL_ILLNESS_RATES: {
  [K in '<24' | '25-29' | '30-34' | '35-39' | '40-44' | '45-49' | '50-54' | '55-59' | '60-64' | '65-69' | '70-74' | '75+']: {
    [E in EligibilityOption]: number
  }
} = {
  '<24': { Individual: 5.55, 'Individual + Spouse': 9.15, 'Individual + Children': 8.10, Family: 11.70 },
  '25-29': { Individual: 6.45, 'Individual + Spouse': 10.35, 'Individual + Children': 8.85, Family: 12.90 },
  '30-34': { Individual: 7.65, 'Individual + Spouse': 12.30, 'Individual + Children': 10.20, Family: 14.85 },
  '35-39': { Individual: 10.05, 'Individual + Spouse': 15.75, 'Individual + Children': 12.45, Family: 18.30 },
  '40-44': { Individual: 13.50, 'Individual + Spouse': 21.00, 'Individual + Children': 16.05, Family: 23.25 },
  '45-49': { Individual: 18.45, 'Individual + Spouse': 28.35, 'Individual + Children': 21.00, Family: 30.90 },
  '50-54': { Individual: 24.30, 'Individual + Spouse': 37.20, 'Individual + Children': 26.85, Family: 39.60 },
  '55-59': { Individual: 33.60, 'Individual + Spouse': 51.15, 'Individual + Children': 36.15, Family: 53.70 },
  '60-64': { Individual: 44.55, 'Individual + Spouse': 67.50, 'Individual + Children': 47.10, Family: 70.05 },
  '65-69': { Individual: 58.95, 'Individual + Spouse': 89.25, 'Individual + Children': 61.50, Family: 91.80 },
  '70-74': { Individual: 77.85, 'Individual + Spouse': 117.60, 'Individual + Children': 80.40, Family: 120.15 },
  '75+': { Individual: 109.05, 'Individual + Spouse': 164.25, 'Individual + Children': 111.60, Family: 166.80 }
};


export const ZIP_CODE_REGIONS: Record<number, string[]> = {
  1: ['350', '351', '354', '355', '360', '361', '363', '364', '366', '367', '368', '369', '716', '717', '718', '719', '720', '721', '723', '728', '335', '400', '401', '402', '403', '405', '406', '407', '408', '409', '411', '412', '413', '414', '415', '416', '417', '418', '425', '426', '427', '150', '151', '153', '154', '155', '156', '157', '158', '159', '160', '161', '166', '248', '255', '257', '260', '265', '454', '456', '376', '380', '381', '382', '383', '384', '780', '783', '784', '785', '794', '798'],
  2: ['352', '356', '357', '358', '359', '362', '365', '856', '722', '724', '725', '726', '727', '729', '404', '410', '420', '421', '060', '061', '062', '063', '064', '322', '323', '324', '325', '326', '327', '328', '336', '337', '346', '347', '349', '470', '471', '473', '474', '700', '701', '704', '713', '714', '080', '082', '444', '445', '447', '453', '455', '457', '744', '748', '766', '767', '779', '781', '782', '793', '797', '799'],
  3: ['853', '855', '857', '859', '937', '320', '321', '329', '338', '339', '341', '342', '344', '310', '312', '313', '314', '317', '318', '319', '832', '834', '460', '461', '462', '466', '472', '476', '478', '479', '508', '514', '515', '516', '635', '638', '639', '640', '644', '645', '646', '647', '653', '654', '655', '657', '590', '597', '890', '283', '430', '431', '435', '437', '438', '439', '440', '441', '442', '443', '446', '450', '451', '452', '152', '162', '163', '164', '165', '167', '170', '171', '290', '291', '292', '294', '297', '299', '570', '571', '572', '573', '574', '575', '576', '577', '372', '985', '990', '991', '992', '993', '994', '247', '249', '250', '251', '252', '253', '254', '256', '258', '259', '261', '263', '264', '266', '267', '268', '822', '823', '824', '825', '827', '828', '829', '830', '831'],
  4: ['850', '851', '852', '863', '864', '919', '920', '921', '928', '934', '935', '939', '952', '958', '800', '801', '805', '806', '807', '067', '330', '333', '334', '301', '302', '306', '307', '308', '309', '315', '316', '398', '833', '835', '838', '463', '464', '465', '467', '468', '469', '475', '477', '660', '661', '664', '665', '666', '670', '671', '673', '041', '043', '044', '045', '046', '047', '048', '049', '206', '214', '215', '218', '219', '013', '014', '015', '018', '019', '023', '025', '026', '386', '387', '388', '389', '390', '391', '392', '393', '394', '396', '397', '630', '633', '634', '636', '637', '641', '648', '652', '656', '658', '591', '592', '593', '594', '595', '596', '680', '889', '891', '081', '083', '084', '122', '123', '124', '125', '126', '127', '129', '132', '133', '134', '135', '136', '144', '146', '147', '149', '270', '278', '279', '280', '287', '432', '433', '434', '436', '448', '449', '458', '169', '176', '177', '179', '189', '190', '194', '196', '370', '371', '373', '374', '377', '378', '379', '385', '840', '842', '843', '844', '847', '224', '225', '229', '233', '234', '235', '237', '239', '243', '245', '246'],
  5: ['860', '900', '901', '902', '905', '914', '915', '916', '931', '945', '946', '947', '948', '950', '071', '072', '073', '086', '087', '117', '119', '130', '131', '137', '138', '139', '145', '271', '272', '273', '274', '275', '281', '284', '285', '286', '288', '289', '444', '445', '447', '453', '455', '457', '735', '736', '739', '740', '743', '192', '193', '028', '295', '841', '846', '201', '220', '221', '222', '223', '226', '227', '228', '244'],
  6: ['996', '995', '998', '906', '907', '908', '910', '911', '912', '913', '917', '918', '926', '927', '949', '953', '954', '955', '959', '960', '961', '802', '809', '815', '065', '066', '068', '069', '836', '837', '600', '601', '603', '605', '606', '608', '463', '464', '465', '467', '468', '469', '475', '477', '502', '503', '507', '509', '510', '511', '512', '513', '520', '522', '523', '524', '525', '526', '527', '528', '662', '668', '669', '672', '675', '678', '679', '039', '210', '211', '216', '016', '017', '020', '021', '022', '488', '489', '491', '492', '498', '499', '550', '551', '553', '554', '555', '558', '559', '560', '561', '562', '563', '564', '565', '566', '567', '598', '599', '681', '683', '684', '685', '686', '687', '688', '689', '690', '691', '692', '693', '895', '897', '898', '077', '078', '088', '089', '104', '109', '580', '581', '582', '583', '584', '585', '586', '587', '588', '570', '571', '572', '573', '574', '575', '576', '577', '780', '783', '784', '785', '794'],
  7: ['997', '602', '607', '065', '066', '068', '069', '210', '211', '216', '016', '017', '020', '021', '022', '070'],
  8: ['076', '079', '105', '114', '115', '103', '106', '107', '108', '110', '111', '116', '118', '100', '102', '112', '113'],
  9: ['999', '943', '944'],
  10: ['101']
};


export const STATE_CATEGORIES: Record<string, USState[]> = {
  AK: ['AK'],
  'CA,CT,HI,NJ,NV,WA': ['CA', 'CT', 'HI', 'NJ', 'NV', 'WA'],
  Other: US_STATES.filter(state => !['AK', 'CA', 'CT', 'HI', 'NJ', 'NV', 'WA'].includes(state))
};

export const PRODUCT_BULLET_POINTS: Record<Product, Record<Plan, string[]>> = {
  'LTD': {
    'Basic': [
      "Income protection",
      "Protects Gross 1099 income",
      "Benefit maximum of $8,333.33 per month",
      "Guaranteed Issue"
    ],
    'Premium': [
      "Protect your ability to earn an income",
      "Protects Gross 1099 income",
      "Benefit maximum of $15,000 per month",
      "Guaranteed Issue"
    ]
  },
  'STD': {
    'Basic': [
      "Income protection",
      "Covers pregnancy",
      "Benefit maximum of $1,200 per week",
      "Guaranteed Issue"
    ],
    'Premium': []
  },
  'Life / AD&D': {
    'Basic': [
      "$150,000 of coverage",
      "Guaranteed issue",
      "Coverage for spouse and children"
    ],
    'Premium': [
      "$150,000 of coverage",
      "Guaranteed issue",
      "Coverage for spouse and children"
    ]
  },
  'Accident': {
    'Basic': [
      "Pays on and off job",
      "Large benefit payouts",
      "25% organized sport bonus"
    ],
    'Premium': [
      "Pays on and off job",
      "Large benefit payouts",
      "25% organized sport bonus"
    ]
  },
  'Vision': {
    'Basic': [
      "Frames and lenses every year",
      "VSP Network"
    ],
    'Premium': [
      "Frames and lenses every year",
      "VSP Network"
    ]
  },
  'Dental': {
    'Basic': [
      "Great benefit if your dentist is in network",
      "$1000 annual maximum per person",
      "Root canals covered in basic at 80% (typically root canals are major coverage)"
    ],
    'Premium': [
      "If your dentist is out-of-network it doesn't matter",
      "Pays the same percentage for out-of-network",
      "$1,500 annual maximum per person",
      "Root canals covered in basic at 80% (typically root canals are major coverage)",
      "$1,000 child ortho (lifetime max)"
    ]
  },
  'Critical Illness/Cancer': {
    'Basic': [
      "Pays a lump sum amount for initial diagnosis",
      "Pays same lump sum for reoccurrence",
      "Pays 100% on the initial diagnosis of invasive cancer",
      "Dozens of covered illnesses"
    ],
    'Premium': [
      "Pays a lump sum amount for initial diagnosis",
      "Pays same lump sum for reoccurrence",
      "Pays 100% on the initial diagnosis of invasive cancer",
      "Dozens of covered illnesses"
    ]
  }
};

export const STD_CONFIG = {
  benefitAmountKey: 0.6,
  unitsKey: 10,
  maxCoverageAmount: 1100,
  maxUnits: 110,
  weeks: 52,
  ageBandRates: [
    { minAge: 0, maxAge: 29, rate: 0.25 },
    { minAge: 30, maxAge: 34, rate: 0.25 },
    { minAge: 35, maxAge: 39, rate: 0.25 },
    { minAge: 40, maxAge: 44, rate: 0.25 },
    { minAge: 45, maxAge: 49, rate: 0.30 },
    { minAge: 50, maxAge: 54, rate: 0.38 },
    { minAge: 55, maxAge: 59, rate: 0.46 },
    { minAge: 60, maxAge: 64, rate: 0.55 },
    { minAge: 65, maxAge: Infinity, rate: 0.66 }
  ],
  plan: 'Basic' as Plan // Add this line to explicitly set the plan for STD
};

export const LTD_CONFIG = {
  unitKey: 100,
  costPerHundred: {
    Basic: 0.209,
    Premium: 0.305
  },
  maxBenefitAmount: {
    Basic: 8333.33,
    Premium: 15000
  },
  maxUnits: {
    Basic: 83.33,
    Premium: 250
  },
  weeks: 52
};

export const LIFE_ADD_CONFIG = {
  max_coverage_amount_individual: 150000,
  max_coverage_amount_spouse: 20000,
  max_coverage_amount_spouse_conditional: 0.5, // 50% of individual coverage
  max_number_of_children: 4,
  units: 1000,
  units_max_individual: 150,
  units_max_spouse: 20,
  children_rate: 2.50,
  ageBandRates: [
    { minAge: 0, maxAge: 29, rate: 0.11 },
    { minAge: 30, maxAge: 34, rate: 0.13 },
    { minAge: 35, maxAge: 39, rate: 0.15 },
    { minAge: 40, maxAge: 44, rate: 0.18 },
    { minAge: 45, maxAge: 49, rate: 0.26 },
    { minAge: 50, maxAge: 54, rate: 0.40 },
    { minAge: 55, maxAge: 59, rate: 0.59 },
    { minAge: 60, maxAge: 64, rate: 0.89 },
    { minAge: 65, maxAge: 69, rate: 1.68 },
    { minAge: 70, maxAge: Infinity, rate: 2.71 }
  ]
};