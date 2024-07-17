import React from 'react';
import { Card, CardHeader, CardContent } from './ui/card';
import { Toggle } from './ui/toggle';

interface CostEstimateProps {
  totalPremium: number;
  costView: 'Monthly' | 'Bi-weekly';
  setCostView: React.Dispatch<React.SetStateAction<'Monthly' | 'Bi-weekly'>>;
}

const CostEstimate: React.FC<CostEstimateProps> = ({ totalPremium, costView, setCostView }) => {
  const formattedPremium = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(costView === 'Monthly' ? totalPremium : totalPremium / 2);

  return (
    <Card className="mb-4 max-w-md mx-auto">
      <CardHeader className="flex justify-between items-center">
        Cost Estimate
        <Toggle
          pressed={costView === 'Monthly'}
          onPressedChange={() => setCostView(prev => prev === 'Monthly' ? 'Bi-weekly' : 'Monthly')}
        >
          {costView}
        </Toggle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-2xl font-bold">
          {formattedPremium} per employee per {costView.toLowerCase()}
        </p>
      </CardContent>
    </Card>
  );
};

export default CostEstimate;