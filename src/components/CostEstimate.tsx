import React from 'react';
import { Card, CardHeader, CardContent } from './ui/card';
import { CostView } from 'utils/insuranceTypes';
import { calculatePremiumByCostView } from '../utils/insuranceUtils';

interface CostEstimateProps {
  totalPremium: number;
  costView: CostView;
  setCostView: React.Dispatch<React.SetStateAction<CostView>>;
  businessEmployees: number;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

const CostEstimate: React.FC<CostEstimateProps> = ({ totalPremium, costView, setCostView, businessEmployees }) => {
  const perEmployeePremium = calculatePremiumByCostView(totalPremium, costView);
  const totalCost = perEmployeePremium * (businessEmployees + 1);

  const formattedPerEmployeePremium = formatCurrency(perEmployeePremium);
  const formattedTotalCost = formatCurrency(totalCost);

  return (
    <Card className="mb-4 w-full sticky top-4">
      <CardHeader className="flex justify-between items-center">
        <h2 className="md:text-lg font-semibold">Cost Summary</h2>    
      </CardHeader>
      <CardContent>
        <h2 className="md:text-lg font-semibold text-center">Per Employee</h2>    
        <p className="text-center text-2xl font-light">
          {formattedPerEmployeePremium} / {costView.toLowerCase()}
        </p>
        <h3 className="md:text-lg font-semibold text-center pt-3">Total</h3>    
        <p className="text-center text-lg font-light">
          {formattedTotalCost} / {costView.toLowerCase()}
        </p>
      </CardContent>
    </Card>
  );
};

export default CostEstimate;